/**
 * Animation System for AtomixGlass Component
 * 
 * Implements Phase 1 features from the AtomixGlass Feature Implementation Roadmap:
 * - Feature 1.1: Time-Based Animation System
 * - Feature 1.2: Multi-Layer Distortion System (FBM)
 * 
 * @packageDocumentation
 */

import { ATOMIX_GLASS } from '../../lib/constants/components';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Animation state interface for tracking time-based animations
 */
export interface AnimationState {
  /** Whether animation is currently running */
  isAnimating: boolean;
  /** Timestamp when animation started */
  startTime: number;
  /** Total elapsed time in milliseconds */
  elapsedTime: number;
  /** Request animation frame ID for cleanup */
  animationFrameId: number | null;
}

/**
 * Animation configuration options
 */
export interface AnimationConfig {
  /** Enable time-based animations */
  withTimeAnimation: boolean;
  /** Animation speed multiplier (0.1 - 5.0) */
  animationSpeed: number;
  /** Reduced motion preference */
  reducedMotion?: boolean;
}

/**
 * Fractal Brownian Motion (FBM) configuration
 */
export interface FBMConfig {
  /** Number of noise octaves */
  octaves: number;
  /** Frequency multiplier per octave (lacunarity) */
  lacunarity: number;
  /** Amplitude multiplier per octave (gain) */
  gain: number;
  /** Time value for animation */
  time?: number;
}

/**
 * 2D vector interface for shader calculations
 */
export interface Vec2 {
  x: number;
  y: number;
}

/**
 * Noise function type
 */
export type NoiseFunction = (x: number, y: number) => number;

// ============================================================================
// Animation Loop Infrastructure (Feature 1.1)
// ============================================================================

/**
 * Creates and manages the animation loop for time-based effects
 * 
 * @param config - Animation configuration
 * @param onFrameUpdate - Callback fired on each animation frame with elapsed time
 * @returns Object with control methods (start, stop, updateConfig)
 * 
 * @example
 * ```typescript
 * const animator = createAnimationLoop(
 *   { withTimeAnimation: true, animationSpeed: 1.0 },
 *   (elapsedTime) => {
 *     // Update shader uniforms or CSS variables
 *     console.log(`Elapsed: ${elapsedTime}ms`);
 *   }
 * );
 * 
 * // Start animation
 * animator.start();
 * 
 * // Stop animation
 * animator.stop();
 * ```
 */
export function createAnimationLoop(
  config: AnimationConfig,
  onFrameUpdate: (elapsedTime: number, deltaTime: number) => void
) {
  let state: AnimationState = {
    isAnimating: false,
    startTime: 0,
    elapsedTime: 0,
    animationFrameId: null,
  };

  let lastFrameTime = 0;

  /**
   * Internal animation frame handler
   */
  const animate = (currentTime: number) => {
    if (!state.isAnimating) return;

    // Calculate delta time for smooth animations
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    // Apply animation speed multiplier
    const scaledDelta = deltaTime * config.animationSpeed;
    state.elapsedTime += scaledDelta;

    // Fire update callback
    onFrameUpdate(state.elapsedTime, scaledDelta);

    // Continue animation loop
    state.animationFrameId = requestAnimationFrame(animate);
  };

  /**
   * Start the animation loop
   */
  const start = () => {
    if (state.isAnimating || !config.withTimeAnimation || config.reducedMotion) {
      return;
    }

    state.isAnimating = true;
    state.startTime = performance.now();
    state.elapsedTime = 0;
    lastFrameTime = state.startTime;
    state.animationFrameId = requestAnimationFrame(animate);
  };

  /**
   * Stop the animation loop and cleanup
   */
  const stop = () => {
    if (!state.isAnimating) return;

    state.isAnimating = false;
    if (state.animationFrameId !== null) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }
  };

  /**
   * Update animation configuration dynamically
   */
  const updateConfig = (newConfig: Partial<AnimationConfig>) => {
    config = { ...config, ...newConfig };
    
    // Restart if animation was stopped due to reduced motion
    if (!config.reducedMotion && config.withTimeAnimation && !state.isAnimating) {
      start();
    } else if (config.reducedMotion && state.isAnimating) {
      stop();
    }
  };

  /**
   * Get current animation state
   */
  const getState = (): AnimationState => ({ ...state });

  /**
   * Get current elapsed time
   */
  const getElapsedTime = (): number => state.elapsedTime;

  return {
    start,
    stop,
    updateConfig,
    getState,
    getElapsedTime,
  };
}

// ============================================================================
// Noise Functions for FBM (Feature 1.2)
// ============================================================================

/**
 * Perlin noise implementation for smooth gradient noise
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns Noise value in range [0, 1]
 */
export function perlinNoise(x: number, y: number): number {
  // Simplified Perlin noise using pseudo-random gradients
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  // Smoothstep interpolation
  const u = fade(xf);
  const v = fade(yf);

  // Hash coordinates of cube corners (with bounds checking)
  const A = (p[X]! + Y) & 255;
  const B = (p[X + 1]! + Y) & 255;

  // Get gradient values with non-null assertions (Perlin table is fully populated)
  const ga = grad(p[A]!, xf, yf);
  const gb = grad(p[B]!, xf - 1, yf);
  const gc = grad(p[(A + 1) & 255]!, xf, yf - 1);
  const gd = grad(p[(B + 1) & 255]!, xf - 1, yf - 1);

  // Interpolate results
  const lerpX1 = lerp(ga, gb, u);
  const lerpX2 = lerp(gc, gd, u);
  const result = lerp(lerpX1, lerpX2, v);

  // Scale to [0, 1] range
  return (result + 1) / 2;
}

/**
 * Simplex noise - faster alternative to Perlin noise
 * Better for mobile and low-end devices
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns Noise value in range [0, 1]
 */
export function simplexNoise(x: number, y: number): number {
  // Skewing and unskewing factors for 2D
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;

  // Skew input space to determine which simplex cell we're in
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);

  const t = (i + j) * G2;
  const X0 = i - t;
  const Y0 = j - t;

  // Unskew back to (x,y) space
  const x0 = x - X0;
  const y0 = y - Y0;

  // Determine which simplex we're in
  let i1, j1;
  if (x0 > y0) {
    i1 = 1;
    j1 = 0;
  } else {
    i1 = 0;
    j1 = 1;
  }

  // Offsets for remaining corners
  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;

  // Work out the hashed gradient indices
  const ii = i & 255;
  const jj = j & 255;

  // Calculate contribution from three corners
  let n0 = 0, n1 = 0, n2 = 0;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    const gi0 = perm[ii + perm[jj]!]! % 12;
    t0 *= t0;
    n0 = t0 * t0 * grad(gi0, x0, y0);
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    const gi1 = perm[ii + i1 + perm[jj + j1]!]! % 12;
    t1 *= t1;
    n1 = t1 * t1 * grad(gi1, x1, y1);
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    const gi2 = perm[ii + 1 + perm[jj + 1]!]! % 12;
    t2 *= t2;
    n2 = t2 * t2 * grad(gi2, x2, y2);
  }

  // Scale to [0, 1] range
  return 70 * (n0 + n1 + n2) + 0.5;
}

/**
 * Value noise - simpler but lower quality than Perlin/Simplex
 * Good fallback for low-end devices
 */
export function valueNoise(x: number, y: number): number {
  const X = Math.floor(x);
  const Y = Math.floor(y);

  const xf = x - X;
  const yf = y - Y;

  // Smooth interpolation
  const u = fade(xf);
  const v = fade(yf);

  // Hash grid values
  const n00 = hash(X, Y);
  const n01 = hash(X, Y + 1);
  const n10 = hash(X + 1, Y);
  const n11 = hash(X + 1, Y + 1);

  // Bilinear interpolation
  const nx0 = lerp(n00, n10, u);
  const nx1 = lerp(n01, n11, u);
  const result = lerp(nx0, nx1, v);

  return result;
}

// ============================================================================
// Fractal Brownian Motion (FBM) Engine (Feature 1.2)
// ============================================================================

/**
 * Creates an FBM engine with configurable parameters
 * 
 * @param config - FBM configuration (octaves, lacunarity, gain)
 * @returns Object with fbm function
 * 
 * @example
 * ```typescript
 * const fbmEngine = createFBMEngine({ octaves: 5, lacunarity: 2, gain: 0.5 });
 * 
 * // Generate noise at position (0.5, 0.5) with time animation
 * const noiseValue = fbmEngine.fbm(0.5, 0.5, Date.now());
 * ```
 */
export function createFBMEngine(config: FBMConfig) {
  /**
   * Fractal Brownian Motion function
   * Combines multiple octaves of noise for complex, natural patterns
   * 
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param time - Optional time value for animation
   * @returns FBM noise value in range [0, 1]
   */
  const fbm = (x: number, y: number, time: number = 0): number => {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    let phase = time * 0.001; // Convert to seconds for reasonable animation speed

    for (let i = 0; i < config.octaves; i++) {
      // Apply time-based phase shift to all octaves
      value += perlinNoise(
        x * frequency + phase,
        y * frequency + phase
      ) * amplitude;

      frequency *= config.lacunarity; // Increase frequency
      amplitude *= config.gain; // Decrease amplitude
    }

    return value;
  };

  /**
   * Get FBM with simple time factor
   */
  const fbmWithTime = (x: number, y: number, time: number): number => {
    return fbm(x, y, time);
  };

  return {
    fbm,
    fbmWithTime,
  };
}

/**
 * Gets optimal FBM config based on quality preset
 * 
 * @param quality - Quality preset level
 * @returns FBM configuration for the quality level
 */
export function getFBMConfigForQuality(quality: 'low' | 'medium' | 'high' | 'ultra'): FBMConfig {
  const presets = ATOMIX_GLASS.CONSTANTS.DISTORTION_QUALITY_PRESETS;
  return presets[quality];
}

// ============================================================================
// Shader Utility Functions for Time-Based Effects
// ============================================================================

/**
 * Liquid glass distortion with time-based animation
 * Uses FBM to create organic, flowing liquid effects
 * 
 * @param uv - UV coordinates (normalized 0-1)
 * @param time - Elapsed time in milliseconds
 * @param config - FBM configuration
 * @returns Distorted UV coordinates
 */
export function liquidGlassWithTime(uv: Vec2, time: number, config: FBMConfig): Vec2 {
  const fbmEngine = createFBMEngine(config);
  
  // Animate noise with time
  const animatedNoise = fbmEngine.fbmWithTime(
    uv.x * 2 + time * 0.0001,
    uv.y * 2 + time * 0.00015,
    time
  );

  return {
    x: uv.x + (animatedNoise - 0.5) * 0.04,
    y: uv.y + (animatedNoise - 0.5) * 0.04,
  };
}

/**
 * Breathing effect - subtle scale/opacity pulsing
 * 
 * @param time - Elapsed time in milliseconds
 * @param cycle - Breathing cycle duration in ms (default: 2000ms)
 * @returns Breathing factor in range [0, 1]
 */
export function breathingEffect(time: number, cycle: number = 2000): number {
  const phase = (time % cycle) / cycle;
  // Sine wave for smooth breathing
  return 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
}

/**
 * Flow animation - continuous liquid movement in one direction
 * 
 * @param uv - UV coordinates
 * @param time - Elapsed time
 * @param speedX - Horizontal flow speed
 * @param speedY - Vertical flow speed
 * @returns Animated UV coordinates
 */
export function flowAnimation(uv: Vec2, time: number, speedX: number = 0.1, speedY: number = 0.15): Vec2 {
  return {
    x: uv.x + time * speedX * 0.0001,
    y: uv.y + time * speedY * 0.0001,
  };
}

/**
 * Wave propagation - radial waves emanating from center
 * 
 * @param uv - UV coordinates (centered at 0.5, 0.5)
 * @param time - Elapsed time
 * @param speed - Wave propagation speed
 * @param amplitude - Wave height
 * @returns Displaced UV coordinates
 */
export function wavePropagation(
  uv: Vec2,
  time: number,
  speed: number = 0.05,
  amplitude: number = 0.02
): Vec2 {
  const center: Vec2 = { x: 0.5, y: 0.5 };
  const dx = uv.x - center.x;
  const dy = uv.y - center.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Radial wave
  const wave = Math.sin(distance * 20 - time * speed) * amplitude;

  return {
    x: uv.x + dx * wave,
    y: uv.y + dy * wave,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Fade curve for smooth interpolation (Perlin's fade function)
 */
function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Linear interpolation
 */
function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

/**
 * Gradient calculation for Perlin noise
 */
function grad(hash: number, x: number, y: number): number {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/**
 * Hash function for deterministic randomness
 */
function hash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Permutation table for Perlin noise
 */
const p: number[] = (() => {
  const permutation: number[] = [];
  for (let i = 0; i < 256; i++) {
    permutation[i] = Math.floor(Math.random() * 256);
  }
  // Duplicate for overflow handling
  return [...permutation, ...permutation];
})();

/**
 * Gradient indices for Simplex noise
 */
const perm: number[] = (() => {
  const permutation: number[] = [];
  for (let i = 0; i < 256; i++) {
    permutation[i] = Math.floor(Math.random() * 256);
  }
  return [...permutation, ...permutation];
})();

// ============================================================================
// Exports
// ============================================================================

export default {
  createAnimationLoop,
  createFBMEngine,
  getFBMConfigForQuality,
  liquidGlassWithTime,
  breathingEffect,
  flowAnimation,
  wavePropagation,
  perlinNoise,
  simplexNoise,
  valueNoise,
};