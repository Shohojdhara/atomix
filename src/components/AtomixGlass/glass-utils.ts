import type { CSSProperties } from 'react';
import React from 'react';
import type { DisplacementMode, GlassSize, MousePosition } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';

const { CONSTANTS } = ATOMIX_GLASS;

/**
 * Canonical 2D vector type shared across the glass math/shader utilities.
 *
 * Structurally identical to {@link MousePosition}; re-exported by `shader-utils`
 * as the public `Vec2`.
 */
export interface Vec2 {
  x: number;
  y: number;
}

/**
 * Calculate element center from bounding rect
 */
export const calculateElementCenter = (rect: DOMRect | null): MousePosition => {
  if (!rect) {
    return { x: 0, y: 0 };
  }
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

/**
 * Calculate mouse influence on glass effect with enhanced overlight support
 */
export const calculateMouseInfluence = (mouseOffset: MousePosition): number => {
  if (!mouseOffset || typeof mouseOffset.x !== 'number' || typeof mouseOffset.y !== 'number') {
    return 0;
  }
  // Clamp influence to keep mouse response subtle and stable.
  const influence =
    Math.sqrt(mouseOffset.x * mouseOffset.x + mouseOffset.y * mouseOffset.y) /
    CONSTANTS.MOUSE_INFLUENCE_DIVISOR;
  return Math.min(0.8, influence); // Tighter cap to prevent blur/filter blow-out
};




/**
 * Clamp blur value to minimum and maximum with overlight consideration
 */
export const clampBlur = (value: number): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    return CONSTANTS.MIN_BLUR;
  }
  // Allow slightly higher blur for overlight effects
  return Math.max(CONSTANTS.MIN_BLUR, Math.min(50, value));
};

/**
 * Validate glass size dimensions
 */
export const validateGlassSize = (size: GlassSize): boolean => {
  return (
    size &&
    typeof size.width === 'number' &&
    typeof size.height === 'number' &&
    size.width > 0 &&
    size.height > 0 &&
    size.width <= CONSTANTS.MAX_SIZE &&
    size.height <= CONSTANTS.MAX_SIZE
  );
};

/**
 * Parse border-radius value from string or number
 */
export const parseBorderRadiusValue = (value: string | number | undefined): number => {
  if (typeof value === 'number') return Math.max(0, value);
  if (typeof value !== 'string' || !value.trim()) return CONSTANTS.DEFAULT_CORNER_RADIUS;

  const trimmedValue = value.trim();

  // Handle px values
  if (trimmedValue.endsWith('px')) {
    const parsed = parseFloat(trimmedValue);
    return isNaN(parsed) ? CONSTANTS.DEFAULT_CORNER_RADIUS : Math.max(0, parsed);
  }

  // Handle rem values (assume 16px = 1rem)
  if (trimmedValue.endsWith('rem')) {
    const parsed = parseFloat(trimmedValue);
    return isNaN(parsed) ? CONSTANTS.DEFAULT_CORNER_RADIUS : Math.max(0, parsed * 16);
  }

  // Handle em values (assume 16px = 1em for simplicity)
  if (trimmedValue.endsWith('em')) {
    const parsed = parseFloat(trimmedValue);
    return isNaN(parsed) ? CONSTANTS.DEFAULT_CORNER_RADIUS : Math.max(0, parsed * 16);
  }

  // Handle percentage (convert to approximate px value, assuming 200px container)
  if (trimmedValue.endsWith('%')) {
    const parsed = parseFloat(trimmedValue);
    return isNaN(parsed) ? CONSTANTS.DEFAULT_CORNER_RADIUS : Math.max(0, (parsed / 100) * 200);
  }

  // Handle unitless numbers
  const numValue = parseFloat(trimmedValue);
  return isNaN(numValue) ? CONSTANTS.DEFAULT_CORNER_RADIUS : Math.max(0, numValue);
};

/**
 * Extract border-radius from CSS style object
 */
export const extractBorderRadiusFromStyle = (style: CSSProperties | undefined): number | null => {
  if (!style) {
    return null;
  }

  // Check various border-radius properties
  const borderRadius =
    style.borderRadius ||
    style.borderTopLeftRadius ||
    style.borderTopRightRadius ||
    style.borderBottomLeftRadius ||
    style.borderBottomRightRadius;

  if (borderRadius !== undefined) {
    const parsed = parseBorderRadiusValue(borderRadius);
    return parsed;
  }

  return null;
};

/**
 * Extract border-radius from DOM element computed styles
 */
export const extractBorderRadiusFromDOMElement = (element: HTMLElement | null): number | null => {
  if (!element || typeof window === 'undefined') {
    return null;
  }

  try {
    const computedStyles = window.getComputedStyle(element);
    const borderRadius =
      computedStyles.borderRadius ||
      computedStyles.borderTopLeftRadius ||
      computedStyles.borderTopRightRadius ||
      computedStyles.borderBottomLeftRadius ||
      computedStyles.borderBottomRightRadius;

    if (borderRadius && borderRadius !== '0px' && borderRadius !== 'auto') {
      const parsed = parseBorderRadiusValue(borderRadius);
      return parsed > 0 ? parsed : null;
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Extract border-radius from React element
 */
export const extractBorderRadiusFromElement = (element: React.ReactElement<any>): number | null => {
  if (!element || !element.props) {
    return null;
  }

  // Check inline styles first (highest priority)
  if (element.props.style) {
    const radiusFromStyle = extractBorderRadiusFromStyle(element.props.style);
    if (radiusFromStyle !== null && radiusFromStyle > 0) {
      return radiusFromStyle;
    }
  }

  // If element has children, recursively check them
  if (element.props.children) {
    const childRadius = extractBorderRadiusFromChildren(element.props.children);
    if (childRadius > 0 && childRadius !== CONSTANTS.DEFAULT_CORNER_RADIUS) {
      return childRadius;
    }
  }

  return null;
};

/**
 * Extract border-radius from React children
 */
export const extractBorderRadiusFromChildren = (children: React.ReactNode): number => {
  if (!children) {
    return CONSTANTS.DEFAULT_CORNER_RADIUS;
  }

  try {
    const childArray = React.Children.toArray(children);

    for (let i = 0; i < childArray.length; i++) {
      const child = childArray[i];

      if (React.isValidElement(child)) {
        const radius = extractBorderRadiusFromElement(child);
        if (radius !== null) {
          return radius;
        }
      }
    }
  } catch (error) {
    // Silently handle errors
  }

  return CONSTANTS.DEFAULT_CORNER_RADIUS;
};

/**
 * Smoothstep interpolation — hermite S-curve
 * Creates a smooth ease-in / ease-out transition from 0 to 1.
 * `t` is clamped to [0, 1] before evaluation.
 */
export const smoothstep = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
};

/**
 * Linear interpolation between `a` and `b` by factor `t` ∈ [0, 1]
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

/**
 * Soft clamp — exponentially approaches `max` without a hard cutoff.
 * Gives a natural deceleration curve near the limit.
 */
export const softClamp = (value: number, max: number): number => {
  if (max <= 0) return 0;
  return max * (1 - Math.exp(-value / max));
};

/**
 * Clamp a value to the `[min, max]` range. Returns `min` for non-finite input.
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, value));
};

/**
 * Two-edge smoothstep (GLSL semantics) — Hermite interpolation between `edge0`
 * and `edge1`. Reuses {@link smoothstep} after normalizing `x` into `[0, 1]`.
 */
export const smoothstepEdge = (edge0: number, edge1: number, x: number): number => {
  if (typeof edge0 !== 'number' || typeof edge1 !== 'number' || typeof x !== 'number') {
    return 0;
  }
  return smoothstep((x - edge0) / (edge1 - edge0));
};

/**
 * Cubic ease-in-out curve. `t` is clamped to `[0, 1]`.
 */
export const easeInOutCubic = (t: number): number => {
  if (typeof t !== 'number' || isNaN(t)) {
    return 0;
  }
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
};

/**
 * Quartic ease-out curve. `t` is clamped to `[0, 1]`.
 */
export const easeOutQuart = (t: number): number => {
  if (typeof t !== 'number' || isNaN(t)) {
    return 0;
  }
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 4);
};

/**
 * Overflow-safe Euclidean length of a 2D vector.
 */
export const vec2Length = (x: number, y: number): number => {
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    return 0;
  }
  const maxComponent = Math.max(Math.abs(x), Math.abs(y));
  if (maxComponent === 0) return 0;
  const scaledX = x / maxComponent;
  const scaledY = y / maxComponent;
  return maxComponent * Math.sqrt(scaledX * scaledX + scaledY * scaledY);
};

/**
 * Resolves the hover/active intensity multipliers from interaction state.
 *
 * Single source of truth for the `HOVER_INTENSITY` / `ACTIVE_INTENSITY`
 * multipliers shared by the hook and the imperative style updater.
 */
export const getInteractionIntensity = (
  isHovered: boolean,
  isActive: boolean
): { hoverIntensity: number; activeIntensity: number } => ({
  hoverIntensity: isHovered ? CONSTANTS.INTERACTION.HOVER_INTENSITY : 1,
  activeIntensity: isActive ? CONSTANTS.INTERACTION.ACTIVE_INTENSITY : 1,
});

/**
 * Spring-damper integration helper
 * Calculates the next value based on velocity, stiffness, and damping.
 */
export const calculateSpring = (
  current: number,
  target: number,
  velocity: number,
  stiffness: number = 0.1,
  damping: number = 0.8
): { value: number; velocity: number } => {
  const force = (target - current) * stiffness;
  const newVelocity = (velocity + force) * damping;
  const newValue = current + newVelocity;
  return { value: newValue, velocity: newVelocity };
};

/**
 * Calculate velocity from position delta and time
 */
export const calculateVelocity = (
  current: number,
  previous: number,
  deltaTime: number
): number => {
  if (deltaTime <= 0) return 0;
  return (current - previous) / deltaTime;
};

/**
 * Layout, sizing, and effect-resolution utilities for AtomixGlass.
 *
 * The root wrapper exposes CSS custom properties; the container owns layout and
 * backdrop-filter. Helpers in this section keep decorative layers aligned with
 * the container across fixed, sticky, and in-flow positioning modes.
 */

/** Subset of CSS layout properties used for glass positioning. */
export type GlassLayoutPosition = Pick<
  CSSProperties,
  'position' | 'top' | 'left' | 'right' | 'bottom' | 'inset'
>;

/** Inset values formatted for `--atomix-glass-*` custom properties. */
export interface GlassLayerInsetVars {
  top: string;
  left: string;
  right: string;
  bottom: string;
}

/**
 * Normalizes a layout inset for use in CSS custom properties.
 *
 * @param value - Raw inset from `style` (number, px string, or `auto`).
 * @param fallback - Value used when `value` is undefined.
 */
export function formatGlassInsetValue(
  value: string | number | undefined,
  fallback: string | number = 'auto'
): string {
  if (value === undefined) {
    return typeof fallback === 'number' ? `${fallback}px` : String(fallback);
  }
  if (value === 'auto') {
    return 'auto';
  }
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Determines whether the glass should use fixed/sticky layout semantics.
 *
 * @param explicit - Value of the `isFixedOrSticky` prop.
 * @param position - `position` from the consumer `style` object.
 */
export function isGlassFixedOrSticky(
  explicit?: boolean,
  position?: CSSProperties['position']
): boolean {
  return Boolean(explicit || position === 'fixed' || position === 'sticky');
}

/**
 * Extracts layout-related properties from a React `CSSProperties` object.
 */
export function pickGlassLayoutStyle(style: CSSProperties): GlassLayoutPosition {
  const { position, top, left, right, bottom, inset } = style;
  return {
    ...(position != null && { position }),
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(inset !== undefined && { inset }),
  };
}

/**
 * Resolves inset custom properties for decorative layers (hover, borders, backgrounds).
 *
 * For fixed and sticky modes, insets mirror the container so sibling layers remain
 * aligned. In-flow modes, insets follow the consumer `style` when a non-default
 * `position` is provided.
 */
export function getGlassLayerInsetVars(
  isFixedOrSticky: boolean,
  restStyle: CSSProperties
): GlassLayerInsetVars {
  if (isFixedOrSticky) {
    return {
      top: formatGlassInsetValue(restStyle.top, 0),
      left: formatGlassInsetValue(restStyle.left, 0),
      right: formatGlassInsetValue(restStyle.right, 'auto'),
      bottom: formatGlassInsetValue(restStyle.bottom, 'auto'),
    };
  }

  const position = restStyle.position;
  const usesCustomPosition =
    position != null && position !== 'static' && position !== 'relative';

  if (!usesCustomPosition) {
    return { top: '0px', left: '0px', right: 'auto', bottom: 'auto' };
  }

  return {
    top: formatGlassInsetValue(restStyle.top, 0),
    left: formatGlassInsetValue(restStyle.left, 0),
    right: formatGlassInsetValue(restStyle.right, 'auto'),
    bottom: formatGlassInsetValue(restStyle.bottom, 'auto'),
  };
}

/**
 * Resolves the `--atomix-glass-position` value for decorative layers.
 *
 * Fixed/sticky layers use the same positioning mode as the container; in-flow
 * layers default to the internal absolute positioning context.
 */
export function getGlassLayerPositionVar(
  isFixedOrSticky: boolean,
  positionStyles: GlassLayoutPosition,
  restStyle: CSSProperties
): string {
  if (!isFixedOrSticky) {
    return `${positionStyles.position}`;
  }
  const layout = pickGlassLayoutStyle(restStyle);
  return `${layout.position ?? restStyle.position ?? 'fixed'}`;
}

/**
 * Returns the internal positioning context for effect layers relative to the root.
 */
export function getGlassInternalPositionStyles(
  isFixedOrSticky: boolean,
  restStyle: CSSProperties
): GlassLayoutPosition {
  return {
    position: (isFixedOrSticky
      ? 'absolute'
      : restStyle.position || 'absolute') as CSSProperties['position'],
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
  };
}

/**
 * Computes `--atomix-glass-width` and `--atomix-glass-height` values.
 *
 * Fixed/sticky elements prefer explicit dimensions or measured size; in-flow
 * elements default to `100%`.
 */
export function resolveGlassAdjustedSize(options: {
  width?: string | number;
  height?: string | number;
  restStyle: CSSProperties;
  glassSize: GlassSize;
  isFixedOrSticky: boolean;
}): { width: string; height: string } {
  const { width, height, restStyle, glassSize, isFixedOrSticky } = options;

  const resolveLength = (value: string | number | undefined, measured: number): string => {
    if (value !== undefined && isFixedOrSticky) {
      return typeof value === 'number' ? `${value}px` : value;
    }
    if (measured > 0 && isFixedOrSticky) {
      return `${measured}px`;
    }
    return '100%';
  };

  const effectiveWidth = width ?? restStyle.width;
  const effectiveHeight = height ?? restStyle.height;

  return {
    width: resolveLength(effectiveWidth, glassSize.width),
    height: resolveLength(effectiveHeight, glassSize.height),
  };
}

/** Input parameters for {@link buildGlassRootCssVariables}. */
export interface GlassRootCssVarsInput {
  effectiveBorderRadius: number;
  transformStyle?: string;
  adjustedSize: { width: string; height: string };
  isOverLight: boolean;
  customZIndex?: string | number;
  isFixedOrSticky: boolean;
  positionStyles: GlassLayoutPosition;
  restStyle: CSSProperties;
  /** Rim width — maps to `--atomix-glass-border-width`. */
  borderWidth?: string;
}

/**
 * Builds the CSS custom properties applied to the root `.c-atomix-glass` element.
 *
 * These variables drive layer geometry, transforms, and stacking offsets. They
 * must not include layout properties that would interfere with backdrop-filter.
 */
export function buildGlassRootCssVariables(input: GlassRootCssVarsInput): CSSProperties {
  const {
    effectiveBorderRadius,
    transformStyle,
    adjustedSize,
    isOverLight,
    customZIndex,
    isFixedOrSticky,
    positionStyles,
    restStyle,
    borderWidth = ATOMIX_GLASS.BORDER.DEFAULT_WIDTH,
  } = input;

  const layerPosition = getGlassLayerPositionVar(isFixedOrSticky, positionStyles, restStyle);
  const layerInsets = getGlassLayerInsetVars(isFixedOrSticky, restStyle);

  return {
    ...(customZIndex !== undefined && { '--atomix-glass-base-z-index': customZIndex }),
    '--atomix-glass-radius': `${effectiveBorderRadius}px`,
    '--atomix-glass-transform': transformStyle || 'none',
    '--atomix-glass-container-position': layerPosition,
    '--atomix-glass-position': layerPosition,
    '--atomix-glass-top': layerInsets.top,
    '--atomix-glass-left': layerInsets.left,
    '--atomix-glass-right': layerInsets.right,
    '--atomix-glass-bottom': layerInsets.bottom,
    '--atomix-glass-width': adjustedSize.width,
    '--atomix-glass-height': adjustedSize.height,
    // Aliases maintained for backward compatibility and consumer overrides.
    '--atomix-glass-container-width': adjustedSize.width,
    '--atomix-glass-container-height': adjustedSize.height,
    [ATOMIX_GLASS.BORDER.WIDTH_CSS_VAR]: borderWidth,
    '--atomix-glass-blend-mode': isOverLight ? 'multiply' : 'overlay',
  } as CSSProperties;
}

/** Resolved visual effect values passed to {@link AtomixGlassContainer}. */
export interface ResolvedGlassContainerEffects {
  displacementScale: number;
  blurAmount: number;
  saturation: number;
  aberrationIntensity: number;
  mouseOffset: MousePosition;
  globalMousePosition: MousePosition;
}

/**
 * Applies mode-specific multipliers and accessibility overrides to container effects.
 */
export function resolveGlassContainerEffects(options: {
  displacementScale: number;
  blurAmount: number;
  saturation: number;
  aberrationIntensity: number;
  mode: DisplacementMode;
  effectiveWithoutEffects: boolean;
  effectiveHighContrast: boolean;
  isOverLight: boolean;
  saturationBoost: number;
  mouseOffset: MousePosition;
  globalMousePosition: MousePosition;
}): ResolvedGlassContainerEffects {
  const { MULTIPLIERS, SATURATION } = ATOMIX_GLASS.CONSTANTS;
  const zeroMouse: MousePosition = { x: 0, y: 0 };

  const resolveSaturation = (): number => {
    if (options.effectiveHighContrast) {
      return SATURATION.HIGH_CONTRAST;
    }
    if (options.isOverLight) {
      return options.saturation * options.saturationBoost;
    }
    return options.saturation;
  };

  if (options.effectiveWithoutEffects) {
    return {
      displacementScale: 0,
      blurAmount: 0,
      saturation: resolveSaturation(),
      aberrationIntensity: 0,
      mouseOffset: zeroMouse,
      globalMousePosition: zeroMouse,
    };
  }

  let resolvedDisplacement = options.displacementScale;
  if (options.mode === 'shader') {
    resolvedDisplacement *= MULTIPLIERS.SHADER_DISPLACEMENT;
  } else if (options.isOverLight) {
    resolvedDisplacement *= MULTIPLIERS.OVER_LIGHT_DISPLACEMENT;
  }

  let resolvedAberration = options.aberrationIntensity;
  if (options.mode === 'shader') {
    resolvedAberration *= MULTIPLIERS.SHADER_ABERRATION;
  }

  return {
    displacementScale: resolvedDisplacement,
    blurAmount: options.blurAmount,
    saturation: resolveSaturation(),
    aberrationIntensity: resolvedAberration,
    mouseOffset: options.mouseOffset,
    globalMousePosition: options.globalMousePosition,
  };
}

/** Coerces a value to a finite number, returning `fallback` when invalid. */
export function toSafeNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && !isNaN(value) ? value : fallback;
}

export type DistortionQuality = 'low' | 'medium' | 'high' | 'ultra';

/**
 * Calculates the target frame rate for shader time-animation loops.
 *
 * Balances visual quality against distortion complexity and `animationSpeed`.
 */
export function getShaderAnimationTargetFps(options: {
  distortionQuality: DistortionQuality | string;
  animationSpeed?: number;
  withMultiLayerDistortion?: boolean;
  distortionOctaves?: number;
  distortionLacunarity?: number;
  distortionGain?: number;
}): number {
  const {
    distortionQuality,
    animationSpeed = 1,
    withMultiLayerDistortion,
    distortionOctaves = 3,
    distortionLacunarity = 2,
    distortionGain = 0.5,
  } = options;

  const baseFps =
    distortionQuality === 'ultra'
      ? 60
      : distortionQuality === 'high'
        ? 30
        : distortionQuality === 'medium'
          ? 24
          : 20;

  const effectiveSpeed = Math.max(0.5, Math.min(2, animationSpeed));
  const complexity = withMultiLayerDistortion
    ? Math.max(
        1,
        distortionOctaves / 3 +
          Math.max(0, distortionLacunarity - 2) * 0.25 +
          Math.max(0, distortionGain - 0.5)
      )
    : 1;

  return Math.max(12, Math.min(60, Math.round((baseFps * effectiveSpeed) / complexity)));
}

/**
 * Computes per-channel displacement scale for the SVG chromatic-aberration filter.
 */
export function getChromaticDisplacementScale(
  mode: DisplacementMode,
  displacementScale: number,
  aberrationIntensity: number,
  channelFactor: number
): number {
  const sign = mode === 'shader' ? 1 : -1;
  return displacementScale * (sign - aberrationIntensity * channelFactor);
}

/**
 * Get displacement map URL based on mode
 */
export const getDisplacementMap = (
  mode: 'standard' | 'polar' | 'prominent' | 'shader',
  displacementMap: string,
  polarDisplacementMap: string,
  prominentDisplacementMap: string,
  shaderMapUrl?: string
): string => {
  switch (mode) {
    case 'standard':
      return displacementMap;
    case 'polar':
      return polarDisplacementMap;
    case 'prominent':
      return prominentDisplacementMap;
    case 'shader':
      return shaderMapUrl || displacementMap;
    default:
      console.warn('AtomixGlass: Invalid displacement mode');
      return displacementMap;
  }
};

/**
 * Module-level LRU cache for shader displacement maps.
 *
 * Shared across all `AtomixGlassContainer` instances so identical size and
 * variant combinations are generated once.
 */
export const MAX_CACHE_SIZE = 15;

export interface ShaderCacheEntry {
  url: string;
  timestamp: number;
}

/** Module-level LRU cache shared by all container instances. */
export const sharedShaderCache = new Map<string, ShaderCacheEntry>();

/**
 * Retrieve a cached shader URL, updating its LRU timestamp.
 * Returns `null` on a cache miss.
 */
export const getCachedShader = (key: string): string | null => {
  const entry = sharedShaderCache.get(key);
  if (entry) {
    entry.timestamp = Date.now();
    return entry.url;
  }
  return null;
};

/**
 * Store a shader URL in the LRU cache, evicting the oldest entry when full.
 */
export const setCachedShader = (key: string, url: string): void => {
  if (sharedShaderCache.size >= MAX_CACHE_SIZE) {
    const entries = Array.from(sharedShaderCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const oldest = entries[0];
    if (oldest) {
      sharedShaderCache.delete(oldest[0]);
    }
  }
  sharedShaderCache.set(key, { url, timestamp: Date.now() });

  if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') {
    if (sharedShaderCache.size >= MAX_CACHE_SIZE * 0.8) {
      console.log(
        `AtomixGlass: Shader cache size: ${String(sharedShaderCache.size).replace(/[\r\n]/g, '')}/${String(MAX_CACHE_SIZE).replace(/[\r\n]/g, '')}`
      );
    }
  }
};
