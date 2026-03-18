import type { GlassParams, ResponsiveBreakpoint } from '../../lib/types/glass';

/**
 * Mobile optimization presets
 * 
 * These presets adjust glass effect parameters based on device performance tier
 * to ensure smooth animations and responsive interactions.
 */

/**
 * Performance preset - Maximum FPS, reduced quality
 * Best for low-end devices or when battery saving is priority
 */
export const PERFORMANCE_PRESET: GlassParams = {
  distortionOctaves: 2,           // Minimal FBM layers
  displacementScale: 50,          // Subtle displacement
  blurAmount: 5,                  // Light blur
  saturation: 80,                 // Reduced saturation
  aberrationIntensity: 0.3,       // Minimal chromatic aberration
  animationSpeed: 0.8,            // Slightly slower for performance
  chromaticIntensity: 0.3,        // Low chromatic effect
  distortionLacunarity: 1.5,      // Simpler noise pattern
  distortionGain: 0.3,            // Lower gain for smoother effect
};

/**
 * Balanced preset - Good quality with reasonable performance
 * Default preset for most mobile devices
 */
export const BALANCED_PRESET: GlassParams = {
  distortionOctaves: 3,           // Moderate FBM layers
  displacementScale: 75,          // Medium displacement
  blurAmount: 8,                  // Moderate blur
  saturation: 90,                 // Near-full saturation
  aberrationIntensity: 0.5,       // Moderate chromatic aberration
  animationSpeed: 1.0,            // Normal speed
  chromaticIntensity: 0.5,        // Moderate chromatic effect
  distortionLacunarity: 2.0,      // Standard noise pattern
  distortionGain: 0.4,            // Balanced gain
};

/**
 * Quality preset - Maximum visual fidelity
 * For high-end devices with powerful GPUs
 */
export const QUALITY_PRESET: GlassParams = {
  distortionOctaves: 4,           // More FBM layers for detail
  displacementScale: 100,         // Stronger displacement
  blurAmount: 12,                 // Smoother blur
  saturation: 100,                // Full saturation
  aberrationIntensity: 0.7,       // Pronounced chromatic aberration
  animationSpeed: 1.2,            // Slightly faster for drama
  chromaticIntensity: 0.7,        // Strong chromatic effect
  distortionLacunarity: 2.2,      // Richer noise pattern
  distortionGain: 0.5,            // Higher gain for more contrast
};

/**
 * Get preset by name
 */
export function getDevicePreset(presetName: 'performance' | 'balanced' | 'quality'): GlassParams {
  switch (presetName) {
    case 'performance':
      return PERFORMANCE_PRESET;
    case 'balanced':
      return BALANCED_PRESET;
    case 'quality':
      return QUALITY_PRESET;
    default:
      return BALANCED_PRESET;
  }
}

/**
 * Mobile-optimized responsive breakpoints
 * Automatically applies appropriate presets based on viewport size
 */
export const MOBILE_OPTIMIZED_BREAKPOINTS: Record<string, ResponsiveBreakpoint> = {
  /** Desktop - Full quality */
  desktop: {
    minWidth: 1024,
    params: {
      distortionOctaves: 6,
      displacementScale: 150,
      blurAmount: 15,
      saturation: 100,
      aberrationIntensity: 1.0,
      animationSpeed: 1.0,
      chromaticIntensity: 1.0,
      distortionLacunarity: 2.5,
      distortionGain: 0.6,
    }
  },
  
  /** Laptop - High quality */
  laptop: {
    minWidth: 768,
    params: {
      ...QUALITY_PRESET,
      distortionOctaves: 5,
      displacementScale: 120,
    }
  },
  
  /** Tablet - Balanced quality */
  tablet: {
    minWidth: 640,
    params: {
      ...BALANCED_PRESET,
      distortionOctaves: 4,
      displacementScale: 90,
    }
  },
  
  /** Mobile - Performance optimized */
  mobile: {
    maxWidth: 639,
    params: {
      ...PERFORMANCE_PRESET,
      distortionOctaves: 3,
      displacementScale: 75,
      blurAmount: 6,
    }
  },
  
  /** Small mobile - Maximum performance */
  mobileSmall: {
    maxWidth: 375,
    params: {
      ...PERFORMANCE_PRESET,
      distortionOctaves: 2,
      displacementScale: 50,
      blurAmount: 4,
      saturation: 70,
    }
  },
};

/**
 * Get mobile-optimized parameters for current viewport
 * Can be used standalone or with useResponsiveGlass hook
 */
export function getMobileOptimizedParams(viewportWidth: number): GlassParams {
  if (viewportWidth >= 1024) {
    return MOBILE_OPTIMIZED_BREAKPOINTS.desktop?.params || BALANCED_PRESET;
  } else if (viewportWidth >= 768) {
    return MOBILE_OPTIMIZED_BREAKPOINTS.laptop?.params || BALANCED_PRESET;
  } else if (viewportWidth >= 640) {
    return MOBILE_OPTIMIZED_BREAKPOINTS.tablet?.params || BALANCED_PRESET;
  } else if (viewportWidth >= 375) {
    return MOBILE_OPTIMIZED_BREAKPOINTS.mobile?.params || PERFORMANCE_PRESET;
  } else {
    return MOBILE_OPTIMIZED_BREAKPOINTS.mobileSmall?.params || PERFORMANCE_PRESET;
  }
}

/**
 * Device detection utilities
 */
export const DeviceDetector = {
  /** Check if device is mobile */
  isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  /** Check if device is tablet */
  isTablet(): boolean {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= 640 && width < 1024 && this.isMobile();
  },
  
  /** Get recommended preset based on device type */
  getRecommendedPreset(): 'performance' | 'balanced' | 'quality' {
    if (!this.isMobile()) return 'quality';
    if (this.isTablet()) return 'balanced';
    return 'performance';
  },
  
  /** Get device pixel ratio */
  getPixelRatio(): number {
    if (typeof window === 'undefined') return 1;
    return window.devicePixelRatio || 1;
  },
  
  /** Check if device has touch support */
  hasTouchSupport(): boolean {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
};
