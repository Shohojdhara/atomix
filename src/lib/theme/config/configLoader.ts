/**
 * Theme Configuration Loader
 *
 * Provides functions to load theme configurations from atomix.config.ts
 * Now also supports atomix.config.js and atomix.config.json
 * Includes both sync and async versions, with automatic fallbacks
 */

import type { Theme } from '../types';
import type { DesignTokens } from '../tokens/tokens';
import { createTokens } from '../tokens/tokens';
import { themeToDesignTokens } from '../adapters/themeAdapter';

/**
 * Load theme from config file (synchronous, Node.js only)
 * @param configPath - Path to config file (default: atomix.config.ts)
 * @returns DesignTokens from theme configuration
 * @throws Error if config loading is not available in browser environment
 */
export function loadThemeFromConfigSync(options?: { configPath?: string; required?: boolean }): DesignTokens {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfigSync: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // Use dynamic import to load the config loader
  // This allows bundlers to handle external dependencies properly
  let loadAtomixConfig: any;
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const req = typeof require !== 'undefined' ? require : undefined;
    if (!req) throw new Error('require is not available');
    const { loadAtomixConfig: loader } = req('../../config/loader');
    loadAtomixConfig = loader;
  } catch (error) {
    if (options?.required !== false) {
      throw new Error('Config loader module not available');
    }
    // Return empty tokens if config is not required
    return createTokens({});
  }

  const config = loadAtomixConfig({
    configPath: options?.configPath,
    required: options?.required !== false,
  });

  if (!config?.theme) {
    return createTokens({});
  }

  if (isThemeObject(config.theme)) {
    return themeToDesignTokens(config.theme);
  }

  // Handle the config.theme object which has extend/tokens/themes properties
  // Extract the actual tokens from the theme configuration
  const themeConfig = config.theme;
  let tokensToApply = {};
  
  if (themeConfig.tokens) {
    // If tokens is provided, use it as the base
    tokensToApply = themeConfig.tokens;
  } else if (themeConfig.extend) {
    // If only extend is provided, use it as overrides
    tokensToApply = themeConfig.extend;
  }

  // Apply advanced feature configurations as tokens
  if (config.interactiveEffects) {
    // Vortex effects
    if (config.interactiveEffects.vortex) {
      tokensToApply = {
        ...tokensToApply,
        'interactive-vortex-enabled': String(config.interactiveEffects.vortex.enabled ?? false),
        'interactive-vortex-strength': String(config.interactiveEffects.vortex.strength ?? 0.5),
        'interactive-vortex-radius': String(config.interactiveEffects.vortex.radius ?? 100),
        'interactive-vortex-decay': String(config.interactiveEffects.vortex.decay ?? 0.8),
      };
    }
    
    // Chromatic aberration
    if (config.interactiveEffects.chromaticAberration) {
      tokensToApply = {
        ...tokensToApply,
        'interactive-chromatic-enabled': String(config.interactiveEffects.chromaticAberration.enabled ?? false),
        'interactive-chromatic-mode': config.interactiveEffects.chromaticAberration.mode ?? 'lateral',
        'interactive-chromatic-red-shift': String(config.interactiveEffects.chromaticAberration.redShift ?? 0.02),
        'interactive-chromatic-green-shift': String(config.interactiveEffects.chromaticAberration.greenShift ?? 0),
        'interactive-chromatic-blue-shift': String(config.interactiveEffects.chromaticAberration.blueShift ?? -0.02),
        'interactive-chromatic-edge-only': String(config.interactiveEffects.chromaticAberration.edgeOnly ?? false),
        'interactive-chromatic-edge-threshold': String(config.interactiveEffects.chromaticAberration.edgeThreshold ?? 0.5),
      };
    }
    
    // Mouse interaction
    if (config.interactiveEffects.mouseInteraction) {
      tokensToApply = {
        ...tokensToApply,
        'interactive-mouse-sensitivity': String(config.interactiveEffects.mouseInteraction.sensitivity ?? 1.0),
        'interactive-mouse-trail-effect': String(config.interactiveEffects.mouseInteraction.trailEffect ?? false),
      };
    }
    
    // Animation speed
    if (config.interactiveEffects.animationSpeed) {
      tokensToApply = {
        ...tokensToApply,
        'interactive-animation-speed-base': String(config.interactiveEffects.animationSpeed.base ?? 1.0),
        'interactive-animation-speed-multiplier': String(config.interactiveEffects.animationSpeed.timeMultiplier ?? 1.0),
      };
    }
  }
  
  // Apply optimization configurations as tokens
  if (config.optimization) {
    // Responsive breakpoints
    if (config.optimization.responsive) {
      if (config.optimization.responsive.breakpoints) {
        tokensToApply = {
          ...tokensToApply,
          'optimization-breakpoint-mobile': config.optimization.responsive.breakpoints.mobile ?? '0px',
          'optimization-breakpoint-tablet': config.optimization.responsive.breakpoints.tablet ?? '768px',
          'optimization-breakpoint-desktop': config.optimization.responsive.breakpoints.desktop ?? '1024px',
          'optimization-breakpoint-wide': config.optimization.responsive.breakpoints.wide ?? '1440px',
        };
      }
      
      if (config.optimization.responsive.deviceScaling) {
        tokensToApply = {
          ...tokensToApply,
          'optimization-device-scaling-mobile': String(config.optimization.responsive.deviceScaling.mobile ?? 0.5),
          'optimization-device-scaling-tablet': String(config.optimization.responsive.deviceScaling.tablet ?? 0.75),
          'optimization-device-scaling-desktop': String(config.optimization.responsive.deviceScaling.desktop ?? 1.0),
        };
      }
    }
    
    // Performance settings
    if (config.optimization.performance) {
      tokensToApply = {
        ...tokensToApply,
        'optimization-performance-fps-target': String(config.optimization.performance.fpsTarget ?? 60),
        'optimization-auto-scaling-enabled': String(config.optimization.performance.autoScaling ?? false),
      };
    }
    
    // Auto-scaling settings
    if (config.optimization.autoScaling) {
      tokensToApply = {
        ...tokensToApply,
        'optimization-auto-scaling-enabled': String(config.optimization.autoScaling.enabled ?? false),
        'optimization-auto-scaling-low-end': String(config.optimization.autoScaling.qualityThresholds?.lowEnd ?? 0.5),
        'optimization-auto-scaling-mid-range': String(config.optimization.autoScaling.qualityThresholds?.midRange ?? 0.75),
        'optimization-auto-scaling-high-end': String(config.optimization.autoScaling.qualityThresholds?.highEnd ?? 1.0),
      };
    }
  }
  
  // Apply visual polish configurations as tokens
  if (config.visualPolish) {
    if (config.visualPolish.borders) {
      tokensToApply = {
        ...tokensToApply,
        'visual-polish-border-iridescent-glow': String(config.visualPolish.borders.iridescentGlow ?? false),
        'visual-polish-border-shimmer-effect': String(config.visualPolish.borders.shimmerEffect ?? false),
        'visual-polish-border-beveled-edges': String(config.visualPolish.borders.beveledEdges ?? false),
        'visual-polish-border-pulsing-glow': String(config.visualPolish.borders.pulsingGlow ?? false),
      };
    }
    
    if (config.visualPolish.contentAwareBlur) {
      tokensToApply = {
        ...tokensToApply,
        'visual-polish-content-aware-blur-enabled': String(config.visualPolish.contentAwareBlur.enabled ?? false),
        'visual-polish-content-aware-depth-detection': String(config.visualPolish.contentAwareBlur.depthDetection ?? false),
        'visual-polish-content-aware-edge-preservation': String(config.visualPolish.contentAwareBlur.edgePreservation ?? false),
        'visual-polish-content-aware-variable-radius': String(config.visualPolish.contentAwareBlur.variableRadius ?? false),
      };
    }
    
    if (config.visualPolish.holographicEffects) {
      tokensToApply = {
        ...tokensToApply,
        'visual-polish-holographic-enabled': String(config.visualPolish.holographicEffects.enabled ?? false),
        'visual-polish-holographic-rainbow-diffraction': String(config.visualPolish.holographicEffects.rainbowDiffraction ?? false),
        'visual-polish-holographic-scanline-animation': String(config.visualPolish.holographicEffects.scanlineAnimation ?? false),
        'visual-polish-holographic-grid-overlay': String(config.visualPolish.holographicEffects.gridOverlay ?? false),
        'visual-polish-holographic-data-stream': String(config.visualPolish.holographicEffects.dataStream ?? false),
        'visual-polish-holographic-pulse-rings': String(config.visualPolish.holographicEffects.pulseRings ?? false),
      };
    }
  }

  return createTokens(tokensToApply);
}

/**
 * Load theme from config file (asynchronous)
 * @param configPath - Path to config file (default: atomix.config.ts)
 * @returns Promise resolving to DesignTokens from theme configuration
 */
export async function loadThemeFromConfig(options?: { configPath?: string; required?: boolean }): Promise<DesignTokens> {
  // In browser environments, config loading is not supported
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfig: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // In browser environments, config loading is not supported
  if (typeof window !== 'undefined') {
    throw new Error('loadThemeFromConfig: Not available in browser environment. Config loading requires Node.js/SSR environment.');
  }

  // Dynamically import the loader to avoid bundling issues in browser
  let config: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const req = typeof require !== 'undefined' ? require : undefined;
    if (!req) throw new Error('require is not available');
    const { loadAtomixConfig: loader } = req('../../config/loader');
    loadAtomixConfig = loader;
    config = loadAtomixConfig({ configPath: options?.configPath, required: options?.required !== false });
  } catch (error) {
    // If loadAtomixConfig is not available (e.g., in browser bundle), provide helpful error
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      throw new Error('loadThemeFromConfig: Config loader not available. This function requires Node.js/SSR environment.');
    }
    throw error;
  }

  if (!config || !config.theme) {
    throw new Error(`Config file ${options?.configPath || 'atomix.config.ts'} does not contain theme configuration.`);
  }

  // Extract tokens from config
  const tokens = config.theme.tokens || config.theme.extend || {};

  if (Object.keys(tokens).length === 0) {
    throw new Error(`Config file ${options?.configPath || 'atomix.config.ts'} has empty theme configuration.`);
  }

  // Convert nested structure to flat tokens
  return flattenConfigTokens(tokens, config.prefix || 'atomix');
}

// Helper function to convert nested config structure to flat tokens
function flattenConfigTokens(tokens: any, prefix: string): DesignTokens {
  const flat: Partial<DesignTokens> = {};

  // Flatten colors
  if (tokens.colors) {
    if (typeof tokens.colors === 'object') {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          flat[key as keyof DesignTokens] = String(value);
        } else if (value && typeof value === 'object' && 'main' in value) {
          // Handle palette color objects
          const colorObj = value as any;
          flat[key as keyof DesignTokens] = String(colorObj.main);
          
          // Handle color scales
          if (colorObj['1']) {
            for (let i = 1; i <= 10; i++) {
              if (colorObj[i]) {
                flat[`${key}-${i}` as keyof DesignTokens] = String(colorObj[i]);
              }
            }
          }
        }
      });
    }
  }

  // Flatten typography
  if (tokens.typography) {
    if (tokens.typography.fontFamilies) {
      Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
        if (value) flat[`font-${key}` as keyof DesignTokens] = String(value);
      });
    }
    
    if (tokens.typography.fontSizes) {
      Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
        if (value) flat[`font-size-${key}` as keyof DesignTokens] = String(value);
      });
    }
    
    if (tokens.typography.fontWeights) {
      Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
        if (value) flat[`font-weight-${key}` as keyof DesignTokens] = String(value);
      });
    }
    
    if (tokens.typography.lineHeights) {
      Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
        if (!value) return;
        if (key === 'base' || key === 'default') {
          flat['line-height-base' as keyof DesignTokens] = String(value);
        } else {
          flat[`line-height-${key}` as keyof DesignTokens] = String(value);
        }
      });
    }
  }

  // Flatten spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      if (value) flat[`spacing-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Flatten borderRadius
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      if (value) flat[`border-radius-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Flatten shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      if (value) flat[`shadow-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Flatten zIndex
  if (tokens.zIndex) {
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      if (value) flat[`z-index-${key}` as keyof DesignTokens] = String(value);
    });
  }

  // Flatten transitions
  if (tokens.transitions) {
    if (tokens.transitions.durations) {
      Object.entries(tokens.transitions.durations).forEach(([key, value]) => {
        if (value) flat[`transition-${key}` as keyof DesignTokens] = String(value);
      });
    }
  }

  return createTokens(flat);
}

// Helper type guard function
function isThemeObject(obj: any): obj is Theme {
  return obj && typeof obj === 'object' && (
    obj.palette || 
    obj.typography || 
    obj.spacing || 
    obj.breakpoints ||
    obj.colors
  );
}