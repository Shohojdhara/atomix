import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import Chart from './Chart';
import { ChartProps } from './types';

interface AnimatedChartProps extends Omit<ChartProps, 'type'> {
  chartType?: 'line' | 'bar' | 'area';
  animationConfig?: {
    duration?: number;
    easing?: 'ease-out' | 'bounce';
  };
  particleEffects?: {
    enabled: boolean;
    count: number;
    colors: string[];
    speed: number;
    size: number;
  };
}

const AnimatedChart = memo(
  forwardRef<HTMLDivElement, AnimatedChartProps>(
    ({ datasets = [], config = {}, chartType = 'line', particleEffects, ...props }, ref) => {
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const animationRef = useRef<number>(0);
      const timeRef = useRef(0);
      const particlesRef = useRef<
        Array<{
          x: number;
          y: number;
          vx: number;
          vy: number;
          life: number;
          size: number;
          color: string;
          dataIndex?: number;
        }>
      >([]);

      const animate = useCallback(
        (timestamp?: number) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const { width, height } = canvas;
          const time = timeRef.current * 0.02;

          // Create gradient background
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, '#0a0a0a');
          gradient.addColorStop(0.5, '#1a1a2e');
          gradient.addColorStop(1, '#16213e');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          // Calculate data-based wave positions
          const dataPoints = datasets[0]?.data || [];
          const maxValue = Math.max(...dataPoints.map(d => d.value));
          const minValue = Math.min(...dataPoints.map(d => d.value));
          const valueRange = maxValue - minValue || 1;

          // Generate particles based on data
          if (particlesRef.current.length < (particleEffects?.count || 800)) {
            for (let i = 0; i < 3; i++) {
              const dataIndex = Math.floor(Math.random() * dataPoints.length);
              const dataPoint = dataPoints[dataIndex];

              if (dataPoint) {
                const normalizedValue = (dataPoint.value - minValue) / valueRange;
                const dataX = (dataIndex / (dataPoints.length - 1)) * width;
                const dataY = height - normalizedValue * height * 0.6 - height * 0.2;

                particlesRef.current.push({
                  x: dataX + (Math.random() - 0.5) * 50,
                  y: dataY + (Math.random() - 0.5) * 30,
                  vx: (Math.random() - 0.5) * (particleEffects?.speed || 2),
                  vy: -Math.random() * 2 - 0.5,
                  life: 1,
                  size: (particleEffects?.size || 2) * (0.5 + normalizedValue * 0.5),
                  color:
                    particleEffects?.colors?.[dataIndex % (particleEffects.colors.length || 1)] ||
                    '#22c55e',
                  dataIndex,
                });
              }
            }
          }

          // Update and draw particles
          particlesRef.current = particlesRef.current.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.008;
            particle.vy += 0.015;

            if (particle.life <= 0 || particle.y > height + 50) return false;

            // Data-influenced wave effect
            const dataInfluence =
              particle.dataIndex !== undefined && dataPoints[particle.dataIndex]
                ? dataPoints[particle.dataIndex].value / maxValue
                : 0.5;

            const waveOffset =
              Math.sin(particle.x * 0.01 + time) * 20 * dataInfluence +
              Math.sin(particle.x * 0.008 + time * 1.2) * 15;
            const finalY = particle.y + waveOffset;

            ctx.save();
            ctx.globalAlpha = particle.life * 0.8;
            ctx.beginPath();
            ctx.arc(particle.x, finalY, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            ctx.shadowBlur = 8;
            ctx.shadowColor = particle.color;
            ctx.fill();
            ctx.restore();

            return true;
          });

          // Draw data-based flowing lines
          if (dataPoints.length > 1) {
            const colors = particleEffects?.colors || ['#22c55e'];
            colors.forEach((color, index) => {
              ctx.strokeStyle = color;
              ctx.lineWidth = 2;
              ctx.globalAlpha = 0.6;
              ctx.beginPath();

              dataPoints.forEach((point, i) => {
                const x = (i / (dataPoints.length - 1)) * width;
                const normalizedValue = (point.value - minValue) / valueRange;
                const baseY = height - normalizedValue * height * 0.6 - height * 0.2;
                const y = baseY + Math.sin(x * 0.008 + time + index) * 30;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              });
              ctx.stroke();
            });
          }

          // Draw grid
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.2;

          for (let x = 0; x < width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }

          timeRef.current += 1;
          animationRef.current = requestAnimationFrame(animate);
        },
        [particleEffects, datasets]
      );

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate(0);

        return () => {
          window.removeEventListener('resize', resizeCanvas);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      }, [animate]);

      return (
        <Chart ref={ref} type={chartType} datasets={datasets} config={config} {...props}>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
            }}
          />
        </Chart>
      );
    }
  )
);

AnimatedChart.displayName = 'AnimatedChart';
export default AnimatedChart;
