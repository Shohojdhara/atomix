import type { CSSProperties } from 'react';
import React from 'react';
import type { MousePosition, GlassSize } from '../../lib/types/components';
import { ATOMIX_GLASS } from '../../lib/constants/components';

const { CONSTANTS } = ATOMIX_GLASS;

/**
 * Calculate distance between two points
 */
export const calculateDistance = (pos1: MousePosition, pos2: MousePosition): number => {
  if (
    !pos1 ||
    !pos2 ||
    typeof pos1.x !== 'number' ||
    typeof pos1.y !== 'number' ||
    typeof pos2.x !== 'number' ||
    typeof pos2.y !== 'number'
  ) {
    return 0;
  }
  const deltaX = pos1.x - pos2.x;
  const deltaY = pos1.y - pos2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

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
  // More responsive calculation for overlight effects
  const influence = Math.sqrt(mouseOffset.x * mouseOffset.x + mouseOffset.y * mouseOffset.y) / CONSTANTS.MOUSE_INFLUENCE_DIVISOR;
  return Math.min(1.5, influence); // Cap influence for better control
};

/**
 * Calculate overlight intensity based on background and mouse position
 */
export const calculateOverLightIntensity = (
  mouseOffset: MousePosition,
  baseIntensity: number
): number => {
  if (!mouseOffset || typeof mouseOffset.x !== 'number' || typeof mouseOffset.y !== 'number') {
    return baseIntensity;
  }
  
  // Calculate additional intensity based on mouse position
  const mouseInfluence = calculateMouseInfluence(mouseOffset);
  return Math.min(1.0, baseIntensity * (1 + mouseInfluence * 0.3));
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
export const extractBorderRadiusFromElement = (element: React.ReactElement): number | null => {
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

