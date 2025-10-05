// Adapted from https://github.com/shuding/liquid-glass

export interface Vec2 {
  x: number;
  y: number;
}

export interface ShaderOptions {
  width: number;
  height: number;
  fragment: (uv: Vec2, mousePosition?: Vec2) => Vec2;
  mousePosition?: Vec2;
}

// Constants
const MIN_SCALE = 1;
const EDGE_SMOOTHING_FACTOR = 0.2;
const EDGE_FADE_PIXELS = 2;
const NORMALIZATION_CLAMP = { min: 0, max: 255 };

// Utility functions
const smoothStep = (a: number, b: number, t: number): number => {
  const clamped = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return clamped * clamped * (3 - 2 * clamped);
};

const calculateLength = (x: number, y: number): number => {
  return Math.sqrt(x * x + y * y);
};

const roundedRectSDF = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): number => {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + calculateLength(Math.max(qx, 0), Math.max(qy, 0)) - radius;
};

const createTexture = (x: number, y: number): Vec2 => ({ x, y });

// Validation helpers
const validateVec2 = (vec: Vec2): boolean => {
  return vec && typeof vec.x === 'number' && typeof vec.y === 'number' && 
         !isNaN(vec.x) && !isNaN(vec.y);
};

const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Shader fragment functions for different effects
export const fragmentShaders = {
  liquidGlass: (uv: Vec2, mousePosition?: Vec2): Vec2 => {
    if (!validateVec2(uv)) {
      return { x: 0.5, y: 0.5 };
    }
    
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    
    // Enhanced distortion with mouse influence
    const mouseX = mousePosition && validateVec2(mousePosition) ? mousePosition.x - 0.5 : 0;
    const mouseY = mousePosition && validateVec2(mousePosition) ? mousePosition.y - 0.5 : 0;
    const mouseDistance = calculateLength(mouseX, mouseY);
    
    // Enhanced Apple-like liquid distortion
    const distanceToEdge = roundedRectSDF(ix, iy, 0.4, 0.3, 0.35);
    const baseDisplacement = smoothStep(0.8, 0, distanceToEdge - 0.05);
    
    // Apple-style liquid flow effect
    const flowX = Math.sin((ix + mouseX * 2) * 8) * 0.02;
    const flowY = Math.cos((iy + mouseY * 2) * 8) * 0.02;
    
    // Mouse-influenced ripple effect with Apple-like characteristics
    const ripple = Math.sin((ix - mouseX) * 10 + (iy - mouseY) * 10) * 0.025 * mouseDistance;
    const liquidFlow = (flowX + flowY) * mouseDistance * 0.5;
    
    const displacement = baseDisplacement + ripple + liquidFlow;
    
    const scaled = smoothStep(0, 1, displacement * 1.1);
    return createTexture(
      clampValue(ix * scaled + 0.5, 0, 1), 
      clampValue(iy * scaled + 0.5, 0, 1)
    );
  },
};

export type FragmentShaderType = keyof typeof fragmentShaders;

export class ShaderDisplacementGenerator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvasDPI = 1;

  constructor(private options: ShaderOptions) {
    if (!this.validateOptions(options)) {
      throw new Error('Invalid shader options provided');
    }
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.max(1, options.width * this.canvasDPI);
    this.canvas.height = Math.max(1, options.height * this.canvasDPI);
    this.canvas.style.display = 'none';

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('AtomixGlass: Could not get 2D canvas context');
    }
    this.context = context;
  }
  
  private validateOptions(options: ShaderOptions): boolean {
    return options && 
           typeof options.width === 'number' && options.width > 0 &&
           typeof options.height === 'number' && options.height > 0 &&
           typeof options.fragment === 'function';
  }

  updateShader(mousePosition?: Vec2): string {
    const w = this.options.width * this.canvasDPI;
    const h = this.options.height * this.canvasDPI;

    let maxScale = 0;
    const rawValues: number[] = [];

    // Calculate displacement values with enhanced smoothing
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const uv: Vec2 = { x: x / w, y: y / h };

        const pos = this.options.fragment(uv, mousePosition);
        let dx = pos.x * w - x;
        let dy = pos.y * h - y;
        
        // Apply edge smoothing for Apple-like effect
        const edgeX = Math.min(x / w, (w - x) / w) * 2;
        const edgeY = Math.min(y / h, (h - y) / h) * 2;
        const edgeFactor = Math.min(edgeX, edgeY);
        
        dx *= smoothStep(0, EDGE_SMOOTHING_FACTOR, edgeFactor);
        dy *= smoothStep(0, EDGE_SMOOTHING_FACTOR, edgeFactor);

        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }
    }

    // Improved normalization to prevent artifacts while maintaining intensity
    maxScale = Math.max(maxScale, MIN_SCALE);

    // Create ImageData and fill it
    const imageData = this.context.createImageData(w, h);
    const data = imageData.data;

    // Convert to image data with smoother normalization
    let rawIndex = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = rawValues[rawIndex++] || 0;
        const dy = rawValues[rawIndex++] || 0;

        // Smooth the displacement values at edges to prevent hard transitions
        const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1);
        const edgeFactor = Math.min(1, edgeDistance / EDGE_FADE_PIXELS);

        const smoothedDx = dx * edgeFactor;
        const smoothedDy = dy * edgeFactor;

        const r = smoothedDx / maxScale + 0.5;
        const g = smoothedDy / maxScale + 0.5;

        const pixelIndex = (y * w + x) * 4;
        data[pixelIndex] = clampValue(r * 255, NORMALIZATION_CLAMP.min, NORMALIZATION_CLAMP.max); // Red channel (X displacement)
        data[pixelIndex + 1] = clampValue(g * 255, NORMALIZATION_CLAMP.min, NORMALIZATION_CLAMP.max); // Green channel (Y displacement)
        data[pixelIndex + 2] = clampValue(g * 255, NORMALIZATION_CLAMP.min, NORMALIZATION_CLAMP.max); // Blue channel (Y displacement for SVG filter compatibility)
        data[pixelIndex + 3] = 255; // Alpha channel
      }
    }

    this.context.putImageData(imageData, 0, 0);
    return this.canvas.toDataURL();
  }

  destroy(): void {
    this.canvas.remove();
  }

  getScale(): number {
    return this.canvasDPI;
  }
}
