import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ChartProps } from '../../lib/types/components';

interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionHeatmapProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Contribution data for the year
   */
  data: ContributionData[];
  
  /**
   * Year to display
   */
  year?: number;
  
  /**
   * Color scheme
   */
  colorScheme?: 'github' | 'blue' | 'green' | 'purple';
  
  /**
   * Cell size
   */
  cellSize?: number;
  
  /**
   * Cell spacing
   */
  cellSpacing?: number;
  
  /**
   * Show month labels
   */
  showMonthLabels?: boolean;
  
  /**
   * Show day labels
   */
  showDayLabels?: boolean;
  
  /**
   * Show legend
   */
  showLegend?: boolean;
  
  /**
   * Tooltip formatter
   */
  tooltipFormatter?: (data: ContributionData) => string;
  
  /**
   * Click handler
   */
  onCellClick?: (data: ContributionData) => void;
}

const ContributionHeatmap = memo(
  forwardRef<HTMLDivElement, ContributionHeatmapProps>(
    ({
      data = [],
      year = new Date().getFullYear(),
      colorScheme = 'github',
      cellSize = 12,
      cellSpacing = 2,
      showMonthLabels = true,
      showDayLabels = true,
      showLegend = true,
      tooltipFormatter,
      onCellClick,
      className = '',
      ...props
    }, ref) => {
      const [hoveredCell, setHoveredCell] = useState<ContributionData | null>(null);
      const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

      // Color schemes matching GitHub's design
      const colorSchemes = {
        github: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        blue: ['#ebedf0', '#9ecae1', '#6baed6', '#4292c6', '#2171b5'],
        green: ['#ebedf0', '#a1d99b', '#74c476', '#41ab5d', '#238b45'],
        purple: ['#ebedf0', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6'],
      };

      // Generate calendar grid
      const calendarData = useMemo(() => {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        const weeks = [];
        const months = [];
        
        // Get first Sunday of the year (or before)
        const firstSunday = new Date(startDate);
        firstSunday.setDate(startDate.getDate() - startDate.getDay());
        
        let currentDate = new Date(firstSunday);
        let weekIndex = 0;
        
        while (currentDate <= endDate || weekIndex < 53) {
          const week = [];
          let monthChanged = false;
          
          for (let day = 0; day < 7; day++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const contributionData = data.find(d => d.date === dateStr);
            const isCurrentYear = currentDate.getFullYear() === year;
            
            // Track month changes for labels
            if (day === 0 && currentDate.getDate() <= 7) {
              months.push({
                week: weekIndex,
                month: currentDate.toLocaleDateString('en', { month: 'short' }),
                x: weekIndex * (cellSize + cellSpacing)
              });
            }
            
            week.push({
              date: dateStr,
              count: isCurrentYear ? (contributionData?.count || 0) : 0,
              level: isCurrentYear ? (contributionData?.level || 0) : 0,
              isCurrentYear,
              dayOfWeek: day,
              weekIndex
            });
            
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          weeks.push(week);
          weekIndex++;
          
          if (weekIndex >= 53) break;
        }
        
        return { weeks, months };
      }, [data, year, cellSize, cellSpacing]);

      const handleCellHover = useCallback((cellData: any, event?: React.MouseEvent) => {
        if (!cellData.isCurrentYear) return;
        
        setHoveredCell(cellData);
        
        if (event) {
          setTooltipPosition({
            x: event.clientX,
            y: event.clientY,
          });
        }
      }, []);

      const handleCellClick = useCallback((cellData: any) => {
        if (!cellData.isCurrentYear || !onCellClick) return;
        onCellClick(cellData);
      }, [onCellClick]);

      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const colors = colorSchemes[colorScheme];
      
      const svgWidth = calendarData.weeks.length * (cellSize + cellSpacing) + 100;
      const svgHeight = 7 * (cellSize + cellSpacing) + 80;

      return (
        <div 
          ref={ref} 
          className={`c-contribution-heatmap ${className}`}
          {...props}
        >
          <svg width={svgWidth} height={svgHeight} className="c-contribution-heatmap__svg">
            {/* Month labels */}
            {showMonthLabels && calendarData.months.map((month, i) => (
              <text
                key={`month-${i}`}
                x={50 + month.x + cellSize / 2}
                y={20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--atomix-gray-7)"
                fontWeight="500"
              >
                {month.month}
              </text>
            ))}

            {/* Day labels */}
            {showDayLabels && dayLabels.map((day, i) => {
              // Only show Mon, Wed, Fri to avoid crowding
              if (i % 2 === 0) return null;
              return (
                <text
                  key={`day-${i}`}
                  x={35}
                  y={40 + i * (cellSize + cellSpacing) + cellSize / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill="var(--atomix-gray-7)"
                  fontWeight="500"
                >
                  {day}
                </text>
              );
            })}

            {/* Contribution cells */}
            {calendarData.weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const x = 50 + weekIndex * (cellSize + cellSpacing);
                const y = 35 + dayIndex * (cellSize + cellSpacing);
                const color = day.isCurrentYear ? (colors[day.level] || colors[0]) : colors[0];
                const isHovered = hoveredCell?.date === day.date;
                
                return (
                  <rect
                    key={`${weekIndex}-${dayIndex}`}
                    x={x}
                    y={y}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    fill={color}
                    stroke={isHovered ? 'var(--atomix-primary-6)' : 'transparent'}
                    strokeWidth={isHovered ? 1 : 0}
                    className="c-contribution-heatmap__cell"
                    onMouseEnter={(e) => handleCellHover(day, e)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => handleCellClick(day)}
                    style={{
                      cursor: day.isCurrentYear ? 'pointer' : 'default',
                      opacity: day.isCurrentYear ? 1 : 0.3,
                      transition: 'all 0.2s ease',
                      transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                      filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
                    }}
                  />
                );
              })
            )}

            {/* Legend */}
            {showLegend && (
              <g transform={`translate(${svgWidth - 150}, ${svgHeight - 25})`}>
                <text
                  x="0"
                  y="-5"
                  fontSize="11"
                  fill="var(--atomix-gray-6)"
                  fontWeight="500"
                >
                  Less
                </text>
                
                {colors.map((color, i) => (
                  <rect
                    key={i}
                    x={25 + i * 14}
                    y={-15}
                    width={12}
                    height={12}
                    fill={color}
                    rx={2}
                  />
                ))}
                
                <text
                  x={25 + colors.length * 14 + 5}
                  y="-5"
                  fontSize="11"
                  fill="var(--atomix-gray-6)"
                  fontWeight="500"
                >
                  More
                </text>
              </g>
            )}
          </svg>

          {/* Tooltip */}
          {hoveredCell && (
            <div
              className="c-contribution-heatmap__tooltip"
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 10,
                transform: 'translateY(-100%)',
                background: 'var(--atomix-gray-9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                pointerEvents: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {tooltipFormatter ? 
                tooltipFormatter(hoveredCell) : 
                `${hoveredCell.date}: ${hoveredCell.count} contributions`
              }
            </div>
          )}
        </div>
      );
    }
  )
);

ContributionHeatmap.displayName = 'ContributionHeatmap';

/**
 * Generate sample contribution data
 */
export const generateContributionData = (year: number = new Date().getFullYear()): ContributionData[] => {
  const data: ContributionData[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const count = Math.floor(Math.random() * 15);
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (count === 0) level = 0;
    else if (count <= 3) level = 1;
    else if (count <= 6) level = 2;
    else if (count <= 10) level = 3;
    else level = 4;
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      count,
      level
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

export default ContributionHeatmap;
export type { ContributionHeatmapProps, ContributionData };