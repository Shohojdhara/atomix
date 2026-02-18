import React, { ReactNode } from 'react';


// ============================================================================
// AtomixGlass Types
// ============================================================================

/**
 * Displacement mode for glass effect
 */
export type DisplacementMode = 'standard' | 'polar' | 'prominent' | 'shader';


/**
 * Mouse position coordinates
 */
export interface MousePosition {
  x: number;
  y: number;
}


/**
 * Glass component size dimensions
 */
export interface GlassSize {
  width: number;
  height: number;
}


/**
 * OverLight configuration - can be boolean, 'auto', or object with settings
 *
 * @example
 * // Boolean - explicit control
 * overLight={true}
 *
 * @example
 * // Auto-detection - automatically detects background brightness
 * overLight="auto"
 *
 * @example
 * // Object config - auto-detection with custom settings
 * overLight={{
 *   threshold: 0.8,
 *   opacity: 0.6,
 *   contrast: 1.8,
 *   brightness: 1.0,
 *   saturationBoost: 1.5
 * }}
 */
export type OverLightConfig = boolean | 'auto' | OverLightObjectConfig;


/**
 * OverLight object configuration
 *
 * When using object mode, the component will auto-detect background brightness
 * and apply the custom settings. All properties are optional and will use
 * sensible defaults if not provided.
 *
 * @example
 * // Minimal config - only threshold
 * overLight={{ threshold: 0.8 }}
 *
 * @example
 * // Full config with all properties
 * overLight={{
 *   threshold: 0.75,
 *   opacity: 0.6,
 *   contrast: 1.8,
 *   brightness: 1.1,
 *   saturationBoost: 1.5
 * }}
 */
export interface OverLightObjectConfig {
  /**
   * Luminance threshold for auto-detection (0.1 - 1.0)
   *
   * Backgrounds with average luminance above this threshold will be
   * considered "light" and trigger overLight mode.
   *
   * @default 0.7
   * @minimum 0.1
   * @maximum 1.0
   *
   * @example
   * // More sensitive detection (triggers on lighter backgrounds)
   * threshold: 0.6
   *
   * @example
   * // Less sensitive detection (only very light backgrounds)
   * threshold: 0.85
   */
  threshold?: number;

  /**
   * Base opacity for overLight layers (0.1 - 1.0)
   *
   * Controls the opacity of the base and overlay layers when overLight
   * mode is active. This value is multiplied by hover/active intensity
   * multipliers for dynamic effects.
   *
   * @default 0.5 (dynamic, depends on hover/active state)
   * @minimum 0.1
   * @maximum 1.0
   *
   * @example
   * // Subtle overlay
   * opacity: 0.3
   *
   * @example
   * // Strong overlay
   * opacity: 0.7
   */
  opacity?: number;

  /**
   * Contrast enhancement multiplier (0.5 - 2.5)
   *
   * Increases the contrast of the glass effect for better visibility
   * on light backgrounds. Higher values create more dramatic effects.
   *
   * @default 1.4 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 2.5
   *
   * @example
   * // Subtle contrast boost
   * contrast: 1.2
   *
   * @example
   * // High contrast for maximum visibility
   * contrast: 2.0
   */
  contrast?: number;

  /**
   * Brightness adjustment multiplier (0.5 - 2.0)
   *
   * Adjusts the overall brightness of the glass effect. Values above 1.0
   * brighten the effect, while values below 1.0 darken it.
   *
   * @default 0.85 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 2.0
   *
   * @example
   * // Neutral brightness
   * brightness: 1.0
   *
   * @example
   * // Brighter effect
   * brightness: 1.2
   */
  brightness?: number;

  /**
   * Saturation boost multiplier (0.5 - 3.0)
   *
   * Enhances color saturation for more vibrant glass effects on light
   * backgrounds. This works in conjunction with the base saturation prop.
   *
   * @default 1.3 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 3.0
   *
   * @example
   * // Moderate saturation boost
   * saturationBoost: 1.2
   *
   * @example
   * // High saturation for vivid effects
   * saturationBoost: 2.0
   */
  saturationBoost?: number;
}


/**
 * AtomixGlass component props interface
 */
export interface AtomixGlassProps {
  children?: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  globalMousePosition?: MousePosition;
  mouseOffset?: MousePosition;
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  padding?: string;
  style?: React.CSSProperties;
  overLight?: OverLightConfig;
  mode?: DisplacementMode;
  onClick?: () => void;

  /**
   * Shader variant for shader mode
   */
  shaderVariant?: 'liquidGlass' | 'premiumGlass' | 'appleFluid' | 'liquidMetal' | 'plasma' | 'waves' | 'noise';

  /**
   * Accessibility props
   */
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;

  /**
   * Performance and accessibility options
   */
  reducedMotion?: boolean;
  highContrast?: boolean;
  disableEffects?: boolean;
  enableLiquidBlur?: boolean;
  enableBorderEffect?: boolean;
  enableOverLightLayers?: boolean;

  /**
   * Performance monitoring
   */
  enablePerformanceMonitoring?: boolean;

  /**
   * Debug mode for cornerRadius extraction
   */
  debugCornerRadius?: boolean;

  /**
   * Debug mode for overLight detection and configuration
   *
   * When enabled, logs detailed information about:
   * - Auto-detection results (luminance values, threshold comparison)
   * - Final overLight configuration values
   * - Detection timing and performance
   *
   * Useful for debugging auto-detection issues and fine-tuning thresholds.
   *
   * @default false
   *
   * @example
   * <AtomixGlass overLight="auto" debugOverLight={true}>
   *   Content
   * </AtomixGlass>
   */
  debugOverLight?: boolean;
}
