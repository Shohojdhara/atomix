/**
 * Glass effect parameters for responsive breakpoints
 */
export interface GlassParams {
  distortionOctaves?: number;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  animationSpeed?: number;
  chromaticIntensity?: number;
  distortionLacunarity?: number;
  distortionGain?: number;
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveBreakpoint {
  maxWidth?: number;
  minWidth?: number;
  params: GlassParams;
}

/**
 * Design system theme tokens for glass component
 */
export interface GlassThemeTokens {
  glassOpacity?: string;
  glassBlur?: string;
  glassBorderRadius?: string;
  glassBorderColor?: string;
  glassShadow?: string;
  glassSaturation?: string;
}
