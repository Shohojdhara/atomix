/**
 * Theme Adapter
 * 
 * Converts between Theme objects and DesignTokens
 */

import type { Theme } from '../types';
import type { AtomixConfig } from '../../config';
import { type DesignTokens, defaultTokens, createTokens } from '../tokens/tokens';

/**
 * Convert a Theme object to DesignTokens
 */
export function themeToDesignTokens(theme: Theme): DesignTokens {
  const tokens: Partial<DesignTokens> = {};

  // Convert colors
  if (theme.palette) {
    // Primary color
    if (theme.palette.primary) {
      const primaryMain = theme.palette.primary.main;
      tokens.primary = primaryMain;
      const rgb = hexToRgb(primaryMain);
      if (rgb) tokens['primary-rgb'] = rgb;
    }

    // Secondary color
    if (theme.palette.secondary) {
      const secondaryMain = theme.palette.secondary.main;
      tokens.secondary = secondaryMain;
      const rgb = hexToRgb(secondaryMain);
      if (rgb) tokens['secondary-rgb'] = rgb;
    }

    // Other colors
    const colorKeys = ['error', 'warning', 'info', 'success'] as const;
    for (const key of colorKeys) {
      if (theme.palette[key]) {
        const colorMain = theme.palette[key]!.main;
        tokens[key] = colorMain;
        const rgb = hexToRgb(colorMain);
        if (rgb) tokens[`${key}-rgb` as keyof DesignTokens] = rgb as any;
      }
    }

    // Background colors
    if (theme.palette.background) {
      tokens['body-bg'] = theme.palette.background.default;
    }

    // Text colors
    if (theme.palette.text) {
      tokens['body-color'] = theme.palette.text.primary;
    }
  }

  // Convert typography
  if (theme.typography) {
    tokens['body-font-family'] = theme.typography.fontFamily;
    tokens['body-font-size'] = `${theme.typography.fontSize}px`;
    tokens['font-weight-normal'] = `${theme.typography.fontWeightRegular}`;
    tokens['font-weight-bold'] = `${theme.typography.fontWeightBold}`;
  }

  // Convert spacing
  if (typeof theme.spacing === 'function') {
    // If spacing is a function, call it with some values to get results
    tokens['spacing-1'] = theme.spacing(1);
    tokens['spacing-2'] = theme.spacing(2);
    tokens['spacing-4'] = theme.spacing(4);
  }

  // Convert breakpoints
  if (theme.breakpoints?.values) {
    tokens['breakpoint-xs'] = `${theme.breakpoints.values.xs}px`;
    tokens['breakpoint-sm'] = `${theme.breakpoints.values.sm}px`;
    tokens['breakpoint-md'] = `${theme.breakpoints.values.md}px`;
    tokens['breakpoint-lg'] = `${theme.breakpoints.values.lg}px`;
    tokens['breakpoint-xl'] = `${theme.breakpoints.values.xl}px`;
  }

  // Convert shadows
  if (theme.shadows) {
    tokens['box-shadow'] = theme.shadows[2]; // Use a moderate shadow
    tokens['box-shadow-sm'] = theme.shadows[1];
    tokens['box-shadow-lg'] = theme.shadows[3];
  }

  // Convert transitions
  if (theme.transitions) {
    tokens['transition-duration-base'] = `${theme.transitions.duration.standard}ms`;
  }

  // Convert z-index
  if (theme.zIndex) {
    tokens['z-modal'] = `${theme.zIndex.modal}`;
    tokens['z-popover'] = `${theme.zIndex.popover}`;
    tokens['z-tooltip'] = `${theme.zIndex.tooltip}`;
  }

  // Convert border radius
  if (theme.borderRadius) {
    const baseRadius = theme.borderRadius.base;
    tokens['border-radius'] = typeof baseRadius === 'number' 
      ? `${baseRadius}px` 
      : baseRadius;
  }

  // Add advanced feature tokens if available in theme
  if (theme.custom) {
    // Interactive Effects (Phase 2)
    if (theme.custom.interactiveEffects) {
      const ie = theme.custom.interactiveEffects;
      
      // Vortex effects
      if (ie.vortex) {
        tokens['interactive-vortex-enabled'] = String(ie.vortex.enabled ?? false);
        tokens['interactive-vortex-strength'] = String(ie.vortex.strength ?? 0.5);
        tokens['interactive-vortex-radius'] = String(ie.vortex.radius ?? 100);
        tokens['interactive-vortex-decay'] = String(ie.vortex.decay ?? 0.8);
      }
      
      // Chromatic aberration
      if (ie.chromaticAberration) {
        tokens['interactive-chromatic-enabled'] = String(ie.chromaticAberration.enabled ?? false);
        tokens['interactive-chromatic-mode'] = ie.chromaticAberration.mode ?? 'lateral';
        tokens['interactive-chromatic-red-shift'] = String(ie.chromaticAberration.redShift ?? 0.02);
        tokens['interactive-chromatic-green-shift'] = String(ie.chromaticAberration.greenShift ?? 0);
        tokens['interactive-chromatic-blue-shift'] = String(ie.chromaticAberration.blueShift ?? -0.02);
        tokens['interactive-chromatic-edge-only'] = String(ie.chromaticAberration.edgeOnly ?? false);
        tokens['interactive-chromatic-edge-threshold'] = String(ie.chromaticAberration.edgeThreshold ?? 0.5);
      }
      
      // Mouse interaction
      if (ie.mouseInteraction) {
        tokens['interactive-mouse-sensitivity'] = String(ie.mouseInteraction.sensitivity ?? 1.0);
        tokens['interactive-mouse-trail-effect'] = String(ie.mouseInteraction.trailEffect ?? false);
      }
      
      // Animation speed
      if (ie.animationSpeed) {
        tokens['interactive-animation-speed-base'] = String(ie.animationSpeed.base ?? 1.0);
        tokens['interactive-animation-speed-multiplier'] = String(ie.animationSpeed.timeMultiplier ?? 1.0);
      }
    }
    
    // Optimization (Phase 3)
    if (theme.custom.optimization) {
      const opt = theme.custom.optimization;
      
      // Responsive breakpoints
      if (opt.responsive) {
        if (opt.responsive.breakpoints) {
          tokens['optimization-breakpoint-mobile'] = opt.responsive.breakpoints.mobile ?? '0px';
          tokens['optimization-breakpoint-tablet'] = opt.responsive.breakpoints.tablet ?? '768px';
          tokens['optimization-breakpoint-desktop'] = opt.responsive.breakpoints.desktop ?? '1024px';
          tokens['optimization-breakpoint-wide'] = opt.responsive.breakpoints.wide ?? '1440px';
        }
        
        if (opt.responsive.deviceScaling) {
          tokens['optimization-device-scaling-mobile'] = String(opt.responsive.deviceScaling.mobile ?? 0.5);
          tokens['optimization-device-scaling-tablet'] = String(opt.responsive.deviceScaling.tablet ?? 0.75);
          tokens['optimization-device-scaling-desktop'] = String(opt.responsive.deviceScaling.desktop ?? 1.0);
        }
      }
      
      // Performance settings
      if (opt.performance) {
        tokens['optimization-performance-fps-target'] = String(opt.performance.fpsTarget ?? 60);
        tokens['optimization-auto-scaling-enabled'] = String(opt.performance.autoScaling ?? false);
      }
      
      // Auto-scaling settings
      if (opt.autoScaling) {
        tokens['optimization-auto-scaling-enabled'] = String(opt.autoScaling.enabled ?? false);
        tokens['optimization-auto-scaling-low-end'] = String(opt.autoScaling.qualityThresholds?.lowEnd ?? 0.5);
        tokens['optimization-auto-scaling-mid-range'] = String(opt.autoScaling.qualityThresholds?.midRange ?? 0.75);
        tokens['optimization-auto-scaling-high-end'] = String(opt.autoScaling.qualityThresholds?.highEnd ?? 1.0);
      }
    }
    
    // Visual Polish (Phase 4)
    if (theme.custom.visualPolish) {
      const vp = theme.custom.visualPolish;
      
      if (vp.borders) {
        tokens['visual-polish-border-iridescent-glow'] = String(vp.borders.iridescentGlow ?? false);
        tokens['visual-polish-border-shimmer-effect'] = String(vp.borders.shimmerEffect ?? false);
        tokens['visual-polish-border-beveled-edges'] = String(vp.borders.beveledEdges ?? false);
        tokens['visual-polish-border-pulsing-glow'] = String(vp.borders.pulsingGlow ?? false);
      }
      
      if (vp.contentAwareBlur) {
        tokens['visual-polish-content-aware-blur-enabled'] = String(vp.contentAwareBlur.enabled ?? false);
        tokens['visual-polish-content-aware-depth-detection'] = String(vp.contentAwareBlur.depthDetection ?? false);
        tokens['visual-polish-content-aware-edge-preservation'] = String(vp.contentAwareBlur.edgePreservation ?? false);
        tokens['visual-polish-content-aware-variable-radius'] = String(vp.contentAwareBlur.variableRadius ?? false);
      }
      
      if (vp.holographicEffects) {
        tokens['visual-polish-holographic-enabled'] = String(vp.holographicEffects.enabled ?? false);
        tokens['visual-polish-holographic-rainbow-diffraction'] = String(vp.holographicEffects.rainbowDiffraction ?? false);
        tokens['visual-polish-holographic-scanline-animation'] = String(vp.holographicEffects.scanlineAnimation ?? false);
        tokens['visual-polish-holographic-grid-overlay'] = String(vp.holographicEffects.gridOverlay ?? false);
        tokens['visual-polish-holographic-data-stream'] = String(vp.holographicEffects.dataStream ?? false);
        tokens['visual-polish-holographic-pulse-rings'] = String(vp.holographicEffects.pulseRings ?? false);
      }
    }
  }

  // Create full tokens object with defaults
  return createTokens(tokens);
}

/**
 * Convert DesignTokens to a Theme object
 */
export function designTokensToTheme(tokens: DesignTokens): Theme {
  // Implementation would go here if needed
  // For now, we're primarily concerned with the direction from theme to tokens
  throw new Error('designTokensToTheme not yet implemented');
}

/**
 * Converts an AtomixConfig to DesignTokens
 * 
 * This function maps the configuration from the user-facing format
 * to the internal DesignTokens format used by the theme system.
 * 
 * @param config - The configuration object to convert
 * @returns DesignTokens object ready for theme generation
 * 
 * @example
 * ```typescript
 * import { configToTokens } from '@shohojdhara/atomix/theme';
 * 
 * const config = { 
 *   prefix: 'myapp',
 *   theme: { extend: { colors: { primary: { main: '#7AFFD7' } } } }
 * };
 * const tokens = configToTokens(config);
 * ```
 */
export function configToTokens(config: AtomixConfig): DesignTokens {
  const prefix = config.prefix || 'atomix';
  const theme = config.theme || {};
  
  // Start with default tokens
  let tokens: DesignTokens = { ...defaultTokens };
  
  // Apply theme extensions
  if (theme.extend) {
    // Apply extensions to tokens
    Object.entries(theme.extend).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          // Map theme categories to token names
          const tokenName = `${category}-${key}`;
          
          if (typeof value === 'string' || typeof value === 'number') {
            tokens[tokenName as keyof DesignTokens] = String(value);
          } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects like color scales
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              if (typeof nestedValue === 'string' || typeof nestedValue === 'number') {
                tokens[`${tokenName}-${nestedKey}` as keyof DesignTokens] = String(nestedValue);
              }
            });
          }
        });
      }
    });
  }
  
  // Apply theme tokens if provided (completely replacing defaults)
  if (theme.tokens) {
    tokens = { ...tokens, ...theme.tokens } as DesignTokens;
  }
  
  // Apply advanced features if available in config
  if (config) {
    // Interactive Effects (Phase 2)
    if (config.interactiveEffects) {
      const ie = config.interactiveEffects;
      
      // Vortex effects
      if (ie.vortex) {
        tokens['interactive-vortex-enabled'] = String(ie.vortex.enabled ?? false);
        tokens['interactive-vortex-strength'] = String(ie.vortex.strength ?? 0.5);
        tokens['interactive-vortex-radius'] = String(ie.vortex.radius ?? 100);
        tokens['interactive-vortex-decay'] = String(ie.vortex.decay ?? 0.8);
        tokens['interactive-vortex-curl-noise'] = String(ie.vortex.curlNoise ?? false);
        tokens['interactive-vortex-velocity-tracking'] = String(ie.vortex.velocityTracking ?? false);
      }
      
      // Chromatic aberration
      if (ie.chromaticAberration) {
        tokens['interactive-chromatic-enabled'] = String(ie.chromaticAberration.enabled ?? false);
        tokens['interactive-chromatic-mode'] = ie.chromaticAberration.mode ?? 'lateral';
        tokens['interactive-chromatic-red-shift'] = String(ie.chromaticAberration.redShift ?? 0.02);
        tokens['interactive-chromatic-green-shift'] = String(ie.chromaticAberration.greenShift ?? 0);
        tokens['interactive-chromatic-blue-shift'] = String(ie.chromaticAberration.blueShift ?? -0.02);
        tokens['interactive-chromatic-edge-only'] = String(ie.chromaticAberration.edgeOnly ?? false);
        tokens['interactive-chromatic-edge-threshold'] = String(ie.chromaticAberration.edgeThreshold ?? 0.5);
      }
      
      // Mouse interaction
      if (ie.mouseInteraction) {
        tokens['interactive-mouse-sensitivity'] = String(ie.mouseInteraction.sensitivity ?? 1.0);
        tokens['interactive-mouse-trail-effect'] = String(ie.mouseInteraction.trailEffect ?? false);
        tokens['interactive-mouse-pressure-sensitivity'] = String(ie.mouseInteraction.pressureSensitivity ?? false);
      }
      
      // Animation speed
      if (ie.animationSpeed) {
        tokens['interactive-animation-speed-base'] = String(ie.animationSpeed.base ?? 1.0);
        tokens['interactive-animation-speed-multiplier'] = String(ie.animationSpeed.timeMultiplier ?? 1.0);
      }
    }
    
    // Optimization (Phase 3)
    if (config.optimization) {
      const opt = config.optimization;
      
      // Responsive breakpoints
      if (opt.responsive) {
        if (opt.responsive.breakpoints) {
          tokens['optimization-breakpoint-mobile'] = opt.responsive.breakpoints.mobile ?? '0px';
          tokens['optimization-breakpoint-tablet'] = opt.responsive.breakpoints.tablet ?? '768px';
          tokens['optimization-breakpoint-desktop'] = opt.responsive.breakpoints.desktop ?? '1024px';
          tokens['optimization-breakpoint-wide'] = opt.responsive.breakpoints.wide ?? '1440px';
        }
        
        if (opt.responsive.deviceScaling) {
          tokens['optimization-device-scaling-mobile'] = String(opt.responsive.deviceScaling.mobile ?? 0.5);
          tokens['optimization-device-scaling-tablet'] = String(opt.responsive.deviceScaling.tablet ?? 0.75);
          tokens['optimization-device-scaling-desktop'] = String(opt.responsive.deviceScaling.desktop ?? 1.0);
        }
      }
      
      // Performance settings
      if (opt.performance) {
        tokens['optimization-performance-fps-target'] = String(opt.performance.fpsTarget ?? 60);
        tokens['optimization-auto-scaling-enabled'] = String(opt.performance.autoScaling ?? false);
        tokens['optimization-monitor-dashboard-enabled'] = String(opt.performance.monitorDashboard ?? false);
      }
      
      // Auto-scaling settings
      if (opt.autoScaling) {
        tokens['optimization-auto-scaling-enabled'] = String(opt.autoScaling.enabled ?? false);
        tokens['optimization-auto-scaling-low-end'] = String(opt.autoScaling.qualityThresholds?.lowEnd ?? 0.5);
        tokens['optimization-auto-scaling-mid-range'] = String(opt.autoScaling.qualityThresholds?.midRange ?? 0.75);
        tokens['optimization-auto-scaling-high-end'] = String(opt.autoScaling.qualityThresholds?.highEnd ?? 1.0);
      }
    }
    
    // Visual Polish (Phase 4)
    if (config.visualPolish) {
      const vp = config.visualPolish;
      
      if (vp.borders) {
        tokens['visual-polish-border-iridescent-glow'] = String(vp.borders.iridescentGlow ?? false);
        tokens['visual-polish-border-shimmer-effect'] = String(vp.borders.shimmerEffect ?? false);
        tokens['visual-polish-border-beveled-edges'] = String(vp.borders.beveledEdges ?? false);
        tokens['visual-polish-border-pulsing-glow'] = String(vp.borders.pulsingGlow ?? false);
      }
      
      if (vp.contentAwareBlur) {
        tokens['visual-polish-content-aware-blur-enabled'] = String(vp.contentAwareBlur.enabled ?? false);
        tokens['visual-polish-content-aware-depth-detection'] = String(vp.contentAwareBlur.depthDetection ?? false);
        tokens['visual-polish-content-aware-edge-preservation'] = String(vp.contentAwareBlur.edgePreservation ?? false);
        tokens['visual-polish-content-aware-variable-radius'] = String(vp.contentAwareBlur.variableRadius ?? false);
      }
      
      if (vp.holographicEffects) {
        tokens['visual-polish-holographic-enabled'] = String(vp.holographicEffects.enabled ?? false);
        tokens['visual-polish-holographic-rainbow-diffraction'] = String(vp.holographicEffects.rainbowDiffraction ?? false);
        tokens['visual-polish-holographic-scanline-animation'] = String(vp.holographicEffects.scanlineAnimation ?? false);
        tokens['visual-polish-holographic-grid-overlay'] = String(vp.holographicEffects.gridOverlay ?? false);
        tokens['visual-polish-holographic-data-stream'] = String(vp.holographicEffects.dataStream ?? false);
        tokens['visual-polish-holographic-pulse-rings'] = String(vp.holographicEffects.pulseRings ?? false);
      }
    }
  }
  
  // Apply prefix to all tokens
  const prefixedTokens: DesignTokens = {} as DesignTokens;
  Object.entries(tokens).forEach(([key, value]) => {
    // If the token key already starts with the prefix, use as-is
    // Otherwise, add the prefix
    const prefixedKey = key.startsWith(prefix) ? key : `${prefix}-${key}`;
    prefixedTokens[prefixedKey as keyof DesignTokens] = value;
  });
  
  return prefixedTokens;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): string {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || !result[1] || !result[2] || !result[3]) {
    return '0, 0, 0';
  }
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Converts DesignTokens to CSS variables
 *
 * @param tokens - The tokens to convert
 * @returns A record of CSS variable names and values
 */
export function designTokensToCSSVars(tokens: Partial<DesignTokens>): Record<string, string> {
  const cssVars: Record<string, string> = {};

  Object.entries(tokens).forEach(([key, value]) => {
    if (value !== undefined) {
      cssVars[`--atomix-${key}`] = String(value);
    }
  });

  return cssVars;
}
