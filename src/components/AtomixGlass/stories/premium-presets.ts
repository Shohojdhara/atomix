/**
 * Premium / Apple liquid-glass presets for AtomixGlass Storybook stories.
 * Centralizes tuned displacement, blur, and saturation so previews stay consistent.
 */
import type { AtomixGlassProps } from '../../../lib/types/components';

/** Curated backgrounds that show frost, tint, and depth well */
export const premiumBackgrounds = [
  'https://images.unsplash.com/photo-1614188973043-4ed7d383de37?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2128',
  'https://images.unsplash.com/photo-1593433073755-4233a78ee359?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000',
] as const;

/** Apple Music–style dark canvas when no photo is needed */
export const premiumDarkCanvas =
  'radial-gradient(ellipse 110% 90% at 65% 15%, #5c1030 0%, #1a0a12 42%, #0a0a0c 100%)';

export type PremiumGlassPreset = Pick<
  AtomixGlassProps,
  | 'displacementScale'
  | 'blurAmount'
  | 'saturation'
  | 'aberrationIntensity'
  | 'elasticity'
  | 'borderRadius'
  | 'mode'
  | 'withLiquidBlur'
  | 'withTimeAnimation'
  | 'withMultiLayerDistortion'
  | 'distortionQuality'
  | 'animationSpeed'
  | 'shaderVariant'
>;

/** Production-tuned glass recipes */
export const PREMIUM_GLASS = {
  /** Sidebar, nav bar, player chrome — minimal warp, deep blur */
  chrome: {
    displacementScale: 24,
    blurAmount: 24,
    saturation: 180,
    aberrationIntensity: 0.4,
    elasticity: 0,
    borderRadius: 12,
  },
  /** Cards, modals, panels */
  card: {
    displacementScale: 28,
    blurAmount: 20,
    saturation: 180,
    aberrationIntensity: 0.56,
    elasticity: 0.05,
    borderRadius: 16,
  },
  /** Floating pills, toolbars */
  pill: {
    displacementScale: 22,
    blurAmount: 22,
    saturation: 180,
    aberrationIntensity: 0.35,
    elasticity: 0,
    borderRadius: 999,
  },
  /** Marketing hero — more presence, still refined */
  hero: {
    displacementScale: 48,
    blurAmount: 28,
    saturation: 185,
    aberrationIntensity: 1.2,
    elasticity: 0.08,
    borderRadius: 24,
    mode: 'prominent' as const,
    withLiquidBlur: true,
    withTimeAnimation: true,
    withMultiLayerDistortion: true,
    distortionQuality: 'high' as const,
  },
  /** Shader + FBM demos */
  liquid: {
    displacementScale: 40,
    blurAmount: 26,
    saturation: 185,
    aberrationIntensity: 1,
    elasticity: 0.06,
    borderRadius: 22,
    mode: 'shader' as const,
    withTimeAnimation: true,
    withMultiLayerDistortion: true,
    withLiquidBlur: true,
    distortionQuality: 'high' as const,
    animationSpeed: 1,
    shaderVariant: 'liquidGlass' as const,
  },
  /** Cinematic / showcase */
  cinematic: {
    displacementScale: 56,
    blurAmount: 32,
    saturation: 190,
    aberrationIntensity: 1.4,
    elasticity: 0.1,
    borderRadius: 28,
    mode: 'shader' as const,
    withTimeAnimation: true,
    withMultiLayerDistortion: true,
    withLiquidBlur: true,
    distortionQuality: 'ultra' as const,
    animationSpeed: 1.1,
    shaderVariant: 'appleFluid' as const,
  },
} satisfies Record<string, PremiumGlassPreset>;

export const premiumTypography = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  titleGradient:
    'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.72) 100%)',
  muted: 'rgba(255,255,255,0.72)',
  dim: 'rgba(255,255,255,0.45)',
} as const;

/** Playground sidebar preset bundle (settings object shape) */
export const createPlaygroundPresetSettings = (
  glass: PremiumGlassPreset,
  extras: Record<string, unknown> = {}
) => ({
  displacementScale: glass.displacementScale ?? 28,
  blurAmount: glass.blurAmount ?? 20,
  saturation: glass.saturation ?? 180,
  aberrationIntensity: glass.aberrationIntensity ?? 0.56,
  elasticity: glass.elasticity ?? 0,
  borderRadius: glass.borderRadius ?? 16,
  overLight: false,
  reducedMotion: false,
  highContrast: false,
  withoutEffects: false,
  withLiquidBlur: Boolean(glass.withLiquidBlur),
  withBorder: true,
  withTimeAnimation: Boolean(glass.withTimeAnimation),
  animationSpeed: glass.animationSpeed ?? 1,
  withMultiLayerDistortion: Boolean(glass.withMultiLayerDistortion),
  distortionOctaves: 5,
  distortionLacunarity: 2,
  distortionGain: 0.5,
  distortionQuality: (glass.distortionQuality ?? 'high') as 'low' | 'medium' | 'high' | 'ultra',
  devicePreset: 'quality' as const,
  disableResponsiveBreakpoints: false,
  debugPerformance: false,
  debugOverLight: false,
  ...extras,
});

export const PLAYGROUND_PRESETS = {
  apple: {
    name: 'Apple Chrome',
    icon: '',
    settings: createPlaygroundPresetSettings(PREMIUM_GLASS.chrome, {
      withTimeAnimation: false,
      devicePreset: 'balanced' as const,
    }),
    mode: 'standard' as const,
    shader: 'liquidGlass' as const,
  },
  card: {
    name: 'Premium Card',
    icon: '💎',
    settings: createPlaygroundPresetSettings(PREMIUM_GLASS.card),
    mode: 'standard' as const,
    shader: 'liquidGlass' as const,
  },
  liquid: {
    name: 'Liquid Glass',
    icon: '💧',
    settings: createPlaygroundPresetSettings(PREMIUM_GLASS.liquid, {
      animationSpeed: 1.1,
      distortionOctaves: 5,
    }),
    mode: 'shader' as const,
    shader: 'appleFluid' as const,
  },
  hero: {
    name: 'Hero',
    icon: '✨',
    settings: createPlaygroundPresetSettings(PREMIUM_GLASS.hero, {
      distortionOctaves: 4,
    }),
    mode: 'prominent' as const,
    shader: 'liquidGlass' as const,
  },
  cinematic: {
    name: 'Cinematic',
    icon: '🎬',
    settings: createPlaygroundPresetSettings(PREMIUM_GLASS.cinematic, {
      animationSpeed: 1.2,
      distortionOctaves: 6,
      distortionLacunarity: 2.2,
    }),
    mode: 'shader' as const,
    shader: 'appleFluid' as const,
  },
} as const;

/** Default playground starting point */
export const PLAYGROUND_DEFAULT_SETTINGS = PLAYGROUND_PRESETS.apple.settings;
