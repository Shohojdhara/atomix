import React, { useCallback, useMemo } from 'react';
import { ATOMIX_GLASS } from '../../constants/components';
import {
  calculateDistance,
  calculateElementCenter,
  validateGlassSize,
} from '../../../components/AtomixGlass/glass-utils';
import type { GlassSize, MousePosition, OverLightConfig } from '../../types/components';

const { CONSTANTS } = ATOMIX_GLASS;

interface UseGlassTransformsProps {
  glassRef: React.RefObject<HTMLDivElement>;
  globalMousePosition: MousePosition;
  glassSize: GlassSize;
  overLight: OverLightConfig;
  detectedOverLight: boolean;
  elasticity?: number;
  effectiveWithoutEffects?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function useGlassTransforms({
  glassRef,
  globalMousePosition,
  glassSize,
  overLight,
  detectedOverLight,
  elasticity = 0.05,
  effectiveWithoutEffects = false,
  isActive = false,
  onClick,
}: UseGlassTransformsProps) {
  const calculateDirectionalScale = useCallback(() => {
    // Disable directional scaling if overLight is active (to prevent zooming/distorting the premium glass effect)
    const isOverLightActive =
      overLight === true ||
      (overLight === 'auto' && detectedOverLight) ||
      (typeof overLight === 'object' && overLight !== null && detectedOverLight);

    if (isOverLightActive) {
      return 'scale(1)';
    }

    if (
      !globalMousePosition.x ||
      !globalMousePosition.y ||
      !glassRef.current ||
      !validateGlassSize(glassSize)
    ) {
      return 'scale(1)';
    }

    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);
    const deltaX = globalMousePosition.x - center.x;
    const deltaY = globalMousePosition.y - center.y;

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - glassSize.width / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - glassSize.height / 2);
    const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });

    if (edgeDistance > CONSTANTS.ACTIVATION_ZONE) {
      return 'scale(1)';
    }

    const fadeInFactor = 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
    const centerDistance = calculateDistance(globalMousePosition, center);

    if (centerDistance === 0) {
      return 'scale(1)';
    }

    const normalizedX = deltaX / centerDistance;
    const normalizedY = deltaY / centerDistance;
    const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

    const scaleX =
      1 +
      Math.abs(normalizedX) * stretchIntensity * 0.3 -
      Math.abs(normalizedY) * stretchIntensity * 0.15;
    const scaleY =
      1 +
      Math.abs(normalizedY) * stretchIntensity * 0.3 -
      Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }, [globalMousePosition, elasticity, glassSize, glassRef, overLight, detectedOverLight]);

  const calculateFadeInFactor = useCallback(() => {
    if (
      !globalMousePosition.x ||
      !globalMousePosition.y ||
      !glassRef.current ||
      !validateGlassSize(glassSize)
    ) {
      return 0;
    }

    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    const edgeDistanceX = Math.max(
      0,
      Math.abs(globalMousePosition.x - center.x) - glassSize.width / 2
    );
    const edgeDistanceY = Math.max(
      0,
      Math.abs(globalMousePosition.y - center.y) - glassSize.height / 2
    );
    const edgeDistance = calculateDistance({ x: edgeDistanceX, y: edgeDistanceY }, { x: 0, y: 0 });

    return edgeDistance > CONSTANTS.ACTIVATION_ZONE
      ? 0
      : 1 - edgeDistance / CONSTANTS.ACTIVATION_ZONE;
  }, [globalMousePosition, glassSize, glassRef]);

  const calculateElasticTranslation = useCallback(() => {
    if (!glassRef.current) {
      return { x: 0, y: 0 };
    }

    const fadeInFactor = calculateFadeInFactor();
    const rect = glassRef.current.getBoundingClientRect();
    const center = calculateElementCenter(rect);

    return {
      x: (globalMousePosition.x - center.x) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePosition.y - center.y) * elasticity * 0.1 * fadeInFactor,
    };
  }, [globalMousePosition, elasticity, calculateFadeInFactor, glassRef]);

  const elasticTranslation = useMemo(() => {
    if (effectiveWithoutEffects) {
      return { x: 0, y: 0 };
    }
    return calculateElasticTranslation();
  }, [calculateElasticTranslation, effectiveWithoutEffects]);

  const directionalScale = useMemo(() => {
    if (effectiveWithoutEffects) {
      return 'scale(1)';
    }
    return calculateDirectionalScale();
  }, [calculateDirectionalScale, effectiveWithoutEffects]);

  const transformStyle = useMemo(() => {
    if (effectiveWithoutEffects) {
      return isActive && Boolean(onClick) ? 'scale(0.98)' : 'scale(1)';
    }
    return `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${isActive && Boolean(onClick) ? 'scale(0.96)' : directionalScale}`;
  }, [elasticTranslation, isActive, onClick, directionalScale, effectiveWithoutEffects]);

  return {
    elasticTranslation,
    directionalScale,
    transformStyle,
  };
}
