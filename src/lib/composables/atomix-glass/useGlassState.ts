import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AtomixGlassProps } from '../../types/components';

interface UseGlassStateProps {
  reducedMotion?: boolean;
  highContrast?: boolean;
  disableEffects?: boolean;
  onClick?: () => void;
}

export function useGlassState({
  reducedMotion = false,
  highContrast = false,
  disableEffects = false,
  onClick,
}: UseGlassStateProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [userPrefersHighContrast, setUserPrefersHighContrast] = useState(false);

  // Media query handlers
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    try {
      const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const mediaQueryHighContrast = window.matchMedia('(prefers-contrast: high)');

      setUserPrefersReducedMotion(mediaQueryReducedMotion.matches);
      setUserPrefersHighContrast(mediaQueryHighContrast.matches);

      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setUserPrefersReducedMotion(e.matches);
      };

      const handleHighContrastChange = (e: MediaQueryListEvent) => {
        setUserPrefersHighContrast(e.matches);
      };

      if (mediaQueryReducedMotion.addEventListener) {
        mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);
        mediaQueryHighContrast.addEventListener('change', handleHighContrastChange);
      } else if (mediaQueryReducedMotion.addListener) {
        mediaQueryReducedMotion.addListener(handleReducedMotionChange);
        mediaQueryHighContrast.addListener(handleHighContrastChange);
      }

      return () => {
        try {
          if (mediaQueryReducedMotion.removeEventListener) {
            mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
            mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
          } else if (mediaQueryReducedMotion.removeListener) {
            mediaQueryReducedMotion.removeListener(handleReducedMotionChange);
            mediaQueryHighContrast.removeListener(handleHighContrastChange);
          }
        } catch (cleanupError) {
          console.error('AtomixGlass: Error cleaning up media query listeners:', cleanupError);
        }
      };
    } catch (error) {
      console.error('AtomixGlass: Error setting up media queries:', error);
      return undefined;
    }
  }, []);

  const effectiveReducedMotion = useMemo(
    () => reducedMotion || userPrefersReducedMotion,
    [reducedMotion, userPrefersReducedMotion]
  );

  const effectiveHighContrast = useMemo(
    () => highContrast || userPrefersHighContrast,
    [highContrast, userPrefersHighContrast]
  );

  const effectiveDisableEffects = useMemo(
    () => disableEffects || effectiveReducedMotion,
    [disableEffects, effectiveReducedMotion]
  );

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

  return {
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
  };
}
