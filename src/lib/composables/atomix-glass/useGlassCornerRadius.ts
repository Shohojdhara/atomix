import React, { useEffect, useMemo, useState } from 'react';
import { ATOMIX_GLASS } from '../../constants/components';
import {
  extractBorderRadiusFromChildren,
  extractBorderRadiusFromDOMElement,
} from '../../../components/AtomixGlass/glass-utils';

const { CONSTANTS } = ATOMIX_GLASS;

interface UseGlassCornerRadiusProps {
  contentRef: React.RefObject<HTMLDivElement>;
  borderRadius?: number;
  children?: React.ReactNode;
  debugBorderRadius?: boolean;
}

export function useGlassCornerRadius({
  contentRef,
  borderRadius,
  children,
  debugBorderRadius = false,
}: UseGlassCornerRadiusProps) {
  const [dynamicBorderRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );

  const effectiveBorderRadius = useMemo(() => {
    if (borderRadius !== undefined) {
      const result = Math.max(0, borderRadius);
      return result;
    }

    const result = Math.max(0, dynamicBorderRadius);
    return result;
  }, [borderRadius, dynamicBorderRadius]);

  // Extract border-radius from children
  useEffect(() => {
    const extractRadius = () => {
      try {
        let extractedRadius: number | null = null;

        if (contentRef.current) {
          const firstChild = contentRef.current.firstElementChild as HTMLElement;
          if (firstChild) {
            const domRadius = extractBorderRadiusFromDOMElement(firstChild);
            if (domRadius !== null && domRadius > 0) {
              extractedRadius = domRadius;
            }
          }
        }

        if (extractedRadius === null) {
          const childRadius = extractBorderRadiusFromChildren(children);
          if (childRadius > 0 && childRadius !== CONSTANTS.DEFAULT_CORNER_RADIUS) {
            extractedRadius = childRadius;
          }
        }

        if (extractedRadius !== null && extractedRadius > 0) {
          setDynamicCornerRadius(extractedRadius);
        }
      } catch (error) {
        if (
          (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') &&
          debugBorderRadius
        ) {
          console.error('[AtomixGlass] Error extracting corner radius:', error);
        }
      }
    };

    extractRadius();
    const timeoutId = setTimeout(extractRadius, 100);
    return () => clearTimeout(timeoutId);
  }, [children, debugBorderRadius, contentRef]);

  return {
    dynamicBorderRadius,
    effectiveBorderRadius,
  };
}
