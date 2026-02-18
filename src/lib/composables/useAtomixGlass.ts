import React, { useCallback, useState } from 'react';
import type { AtomixGlassProps, GlassSize, MousePosition } from '../types/components';
import { ATOMIX_GLASS } from '../constants/components';
import { useGlassMediaPreferences } from './atomix-glass/useGlassMediaPreferences';
import { useGlassCornerRadius } from './atomix-glass/useGlassCornerRadius';
import { useGlassMouseTracker } from './atomix-glass/useGlassMouseTracker';
import { useGlassSize } from './atomix-glass/useGlassSize';
import { useGlassBackgroundDetection } from './atomix-glass/useGlassBackgroundDetection';
import { useGlassOverLightConfig } from './atomix-glass/useGlassOverLightConfig';
import { useGlassTransforms } from './atomix-glass/useGlassTransforms';

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
  handleMouseMove: (e: MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Composable hook for AtomixGlass component logic
 * Manages all state, calculations, and event handlers
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
  enablePerformanceMonitoring = false,
  children,
}: UseAtomixGlassOptions): UseAtomixGlassReturn {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // 1. Media Preferences
  const {
    effectiveReducedMotion,
    effectiveHighContrast,
    effectiveDisableEffects,
  } = useGlassMediaPreferences({
    reducedMotion,
    highContrast,
    disableEffects,
  });

  // 2. Corner Radius
  const {
    dynamicCornerRadius,
    effectiveCornerRadius,
  } = useGlassCornerRadius({
    contentRef,
    cornerRadius,
    children,
    debugCornerRadius,
  });

  // 3. Mouse Tracking
  const {
    globalMousePosition,
    mouseOffset,
    cachedRectRef,
  } = useGlassMouseTracker({
    glassRef,
    mouseContainer,
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
    enablePerformanceMonitoring,
  });

  // 4. Size Management
  const { glassSize } = useGlassSize({
    glassRef,
    effectiveCornerRadius,
    cachedRectRef,
  });

  // 5. Background Detection
  const { detectedOverLight } = useGlassBackgroundDetection({
    glassRef,
    overLight,
    debugOverLight,
  });

  // 6. OverLight Config
  const { overLightConfig } = useGlassOverLightConfig({
    overLight,
    detectedOverLight,
    mouseOffset,
    isHovered,
    isActive,
    debugOverLight,
  });

  // 7. Transforms
  const {
    elasticTranslation,
    directionalScale,
    transformStyle,
  } = useGlassTransforms({
    glassRef,
    glassSize,
    globalMousePosition,
    overLight,
    detectedOverLight,
    elasticity,
    effectiveDisableEffects,
    isActive,
    onClick,
  });

  // Event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleMouseDown = useCallback(() => setIsActive(true), []);
  const handleMouseUp = useCallback(() => setIsActive(false), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  // Mouse tracking is now handled by shared global tracker
  const handleMouseMove = useCallback((_e: MouseEvent) => {
    // Mouse tracking handled by shared global tracker
  }, []);

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
    handleMouseMove,
    handleKeyDown,
  };
}
