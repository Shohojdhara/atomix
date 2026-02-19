import { useCallback, useMemo } from 'react';
import type { OverLightConfig, OverLightObjectConfig, MousePosition } from '../../types/components';
import { calculateMouseInfluence } from '../../../components/AtomixGlass/glass-utils';

interface UseGlassOverLightConfigProps {
  overLight: OverLightConfig;
  detectedOverLight: boolean;
  mouseOffset: MousePosition;
  isHovered: boolean;
  isActive: boolean;
  debugOverLight?: boolean;
}

export function useGlassOverLightConfig({
  overLight,
  detectedOverLight,
  mouseOffset,
  isHovered,
  isActive,
  debugOverLight = false,
}: UseGlassOverLightConfigProps) {
  /**
   * Get effective overLight value based on configuration
   * - boolean: returns the boolean value directly
   * - 'auto': returns detectedOverLight (auto-detected from background)
   * - object: returns detectedOverLight (auto-detected, but config object provides customization)
   */
  const getEffectiveOverLight = useCallback(() => {
    if (typeof overLight === 'boolean') {
      return overLight;
    }
    if (overLight === 'auto') {
      return detectedOverLight;
    }
    if (typeof overLight === 'object' && overLight !== null) {
      return detectedOverLight;
    }
    // Default to false for safety when overLight is undefined or invalid
    return false;
  }, [overLight, detectedOverLight]);

  /**
   * Validate and clamp a numeric config value
   * @param value - The value to validate
   * @param min - Minimum allowed value
   * @param max - Maximum allowed value
   * @param defaultValue - Default value if validation fails
   * @returns Validated and clamped value
   */
  const validateConfigValue = useCallback(
    (value: unknown, min: number, max: number, defaultValue: number): number => {
      if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        return defaultValue;
      }
      return Math.min(max, Math.max(min, value));
    },
    []
  );

  const overLightConfig = useMemo(() => {
    const isOverLight = getEffectiveOverLight();
    const mouseInfluence = calculateMouseInfluence(mouseOffset);
    const hoverIntensity = isHovered ? 1.4 : 1;
    const activeIntensity = isActive ? 1.6 : 1;

    // More robust overlight configuration with better defaults and clamping
    const baseOpacity = isOverLight ? Math.min(0.6, Math.max(0.2, 0.5 * hoverIntensity * activeIntensity)) : 0;

    const baseConfig = {
      isOverLight,
      threshold: 0.7,
      opacity: baseOpacity,
      contrast: Math.min(1.6, Math.max(1.0, 1.4 + mouseInfluence * 0.1)),
      brightness: Math.min(1.1, Math.max(0.8, 0.9 + mouseInfluence * 0.05)),
      saturationBoost: 1.3, // Fixed value — dynamic saturation amplifies perceived displacement
      shadowIntensity: Math.min(1.2, Math.max(0.5, 0.9 + mouseInfluence * 0.2)),
      borderOpacity: Math.min(1.0, Math.max(0.3, 0.7 + mouseInfluence * 0.1)),
    };

    if (typeof overLight === 'object' && overLight !== null) {
      const objConfig = overLight as OverLightObjectConfig;

      // Validate and apply object config values with proper clamping
      const validatedThreshold = validateConfigValue(objConfig.threshold, 0.1, 1.0, baseConfig.threshold);
      const validatedOpacity = validateConfigValue(objConfig.opacity, 0.1, 1.0, baseConfig.opacity);
      const validatedContrast = validateConfigValue(objConfig.contrast, 0.5, 2.5, baseConfig.contrast);
      const validatedBrightness = validateConfigValue(objConfig.brightness, 0.5, 2.0, baseConfig.brightness);
      const validatedSaturationBoost = validateConfigValue(objConfig.saturationBoost, 0.5, 3.0, baseConfig.saturationBoost);

      const finalConfig = {
        ...baseConfig,
        threshold: validatedThreshold,
        opacity: validatedOpacity * hoverIntensity * activeIntensity,
        contrast: Math.min(1.6, validatedContrast + mouseInfluence * 0.1),
        brightness: Math.min(1.1, validatedBrightness + mouseInfluence * 0.05),
        saturationBoost: validatedSaturationBoost, // Use validated value directly, no mouse influence
      };

      // Debug logging
      if ((typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') && debugOverLight) {
        console.log('[AtomixGlass] OverLight Config:', {
          isOverLight,
          config: {
            threshold: finalConfig.threshold.toFixed(3),
            opacity: finalConfig.opacity.toFixed(3),
            contrast: finalConfig.contrast.toFixed(3),
            brightness: finalConfig.brightness.toFixed(3),
            saturationBoost: finalConfig.saturationBoost.toFixed(3),
            shadowIntensity: finalConfig.shadowIntensity.toFixed(3),
            borderOpacity: finalConfig.borderOpacity.toFixed(3),
          },
          input: {
            threshold: objConfig.threshold,
            opacity: objConfig.opacity,
            contrast: objConfig.contrast,
            brightness: objConfig.brightness,
            saturationBoost: objConfig.saturationBoost,
          },
          dynamic: {
            mouseInfluence: mouseInfluence.toFixed(3),
            hoverIntensity: hoverIntensity.toFixed(3),
            activeIntensity: activeIntensity.toFixed(3),
          },
          timestamp: new Date().toISOString(),
        });
      }

      return finalConfig;
    }

    // Debug logging for non-object configs
    if ((typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') && debugOverLight) {
      console.log('[AtomixGlass] OverLight Config:', {
        isOverLight,
        configType: typeof overLight === 'boolean' ? (overLight ? 'true' : 'false') : overLight,
        config: {
          threshold: baseConfig.threshold.toFixed(3),
          opacity: baseConfig.opacity.toFixed(3),
          contrast: baseConfig.contrast.toFixed(3),
          brightness: baseConfig.brightness.toFixed(3),
          saturationBoost: baseConfig.saturationBoost.toFixed(3),
          shadowIntensity: baseConfig.shadowIntensity.toFixed(3),
          borderOpacity: baseConfig.borderOpacity.toFixed(3),
        },
        dynamic: {
          mouseInfluence: mouseInfluence.toFixed(3),
          hoverIntensity: hoverIntensity.toFixed(3),
          activeIntensity: activeIntensity.toFixed(3),
        },
        timestamp: new Date().toISOString(),
      });
    }

    return baseConfig;
  }, [overLight, getEffectiveOverLight, mouseOffset, isHovered, isActive, validateConfigValue, debugOverLight]);

  return { overLightConfig };
}
