import React from 'react';
import type { AtomixGlassProps, GlassSize, MousePosition } from '../types/components';
import { ATOMIX_GLASS } from '../constants/components';
import { useGlassState } from './atomix-glass/useGlassState';
import { useGlassCornerRadius } from './atomix-glass/useGlassCornerRadius';
import { useGlassBackgroundDetection } from './atomix-glass/useGlassBackgroundDetection';
import { useGlassMouseTracking } from './atomix-glass/useGlassMouseTracking';
import { useGlassSize } from './atomix-glass/useGlassSize';
import { useGlassTransforms } from './atomix-glass/useGlassTransforms';
import { useGlassOverLight } from './atomix-glass/useGlassOverLight';

interface UseAtomixGlassOptions extends Omit<AtomixGlassProps, 'children'> {
  glassRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

interface UseAtomixGlassReturn {
  // State
  isHovered: boolean;
  isActive: boolean;
  glassSize: GlassSize;
  dynamicCornerRadius: number;
  effectiveCornerRadius: number;
  effectiveReducedMotion: boolean;
  effectiveHighContrast: boolean;
  effectiveDisableEffects: boolean;
  detectedOverLight: boolean;
  globalMousePosition: MousePosition;
  mouseOffset: MousePosition;

  // OverLight config
  overLightConfig: {
    isOverLight: boolean;
    threshold: number;
    opacity: number;
    contrast: number;
    brightness: number;
    saturationBoost: number;
    shadowIntensity: number;
    borderOpacity: number;
  };

  // Transform calculations
  elasticTranslation: { x: number; y: number };
  directionalScale: string;
  transformStyle: string;

  // Event handlers
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Composable hook for AtomixGlass component logic
 * Manages all state, calculations, and event handlers
 * Refactored to use smaller, focused hooks for better maintainability
 */
export function useAtomixGlass({
  glassRef,
  contentRef,
  cornerRadius,
  globalMousePosition: externalGlobalMousePosition,
  mouseOffset: externalMouseOffset,
  mouseContainer,
  overLight = ATOMIX_GLASS.DEFAULTS.OVER_LIGHT,
  reducedMotion = false,
  highContrast = false,
  disableEffects = false,
  elasticity = 0.05,
  onClick,
  debugCornerRadius = false,
  debugOverLight = false,
  children,
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // 1. State Management
  const {
    isHovered,
    isActive,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveDisableEffects,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  } = useGlassState({
    reducedMotion,
    highContrast,
    disableEffects,
    onClick,
  });

  // 2. Corner Radius
  const { dynamicCornerRadius, effectiveCornerRadius } = useGlassCornerRadius({
    contentRef,
    cornerRadius,
    children,
    debugCornerRadius,
  });

  // 3. Background Detection
  const { detectedOverLight } = useGlassBackgroundDetection({
    glassRef,
    overLight,
    debugOverLight,
  });

  // 4. Mouse Tracking
  const { globalMousePosition, mouseOffset, cachedRectRef } = useGlassMouseTracking({
    glassRef,
    mouseContainer,
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
  });

  // 5. Size Management
  const { glassSize } = useGlassSize({
    glassRef,
    effectiveCornerRadius,
    cachedRectRef,
  });

  // 6. Transforms
  const { elasticTranslation, directionalScale, transformStyle } = useGlassTransforms({
    glassRef,
    globalMousePosition,
    glassSize,
    overLight,
    detectedOverLight,
    elasticity,
    effectiveDisableEffects,
    isActive,
    onClick,
  });

  // 7. OverLight Config
  const { overLightConfig } = useGlassOverLight({
    overLight,
    detectedOverLight,
    mouseOffset,
    isHovered,
    isActive,
    debugOverLight,
  });

  return {
    // State
    isHovered,
    isActive,
    glassSize,
    dynamicCornerRadius,
    effectiveCornerRadius,
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveDisableEffects,
    detectedOverLight,
    globalMousePosition,
    mouseOffset,

    // OverLight config
    overLightConfig,

    // Transform calculations
    elasticTranslation,
    directionalScale,
    transformStyle,

    // Event handlers
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
  };
}
