import React, { useEffect, useMemo, useState } from 'react';
import { ATOMIX_GLASS } from '../../constants/components';
import {
  extractBorderRadiusFromChildren,
  extractBorderRadiusFromDOMElement,
} from '../../../components/AtomixGlass/glass-utils';

const { CONSTANTS } = ATOMIX_GLASS;

interface UseGlassCornerRadiusProps {
  contentRef: React.RefObject<HTMLDivElement>;
  cornerRadius?: number;
  children?: React.ReactNode;
  debugCornerRadius?: boolean;
}

export function useGlassCornerRadius({
  contentRef,
  cornerRadius,
  children,
  debugCornerRadius = false,
}: UseGlassCornerRadiusProps) {
  const [dynamicCornerRadius, setDynamicCornerRadius] = useState<number>(
    CONSTANTS.DEFAULT_CORNER_RADIUS
  );

  const effectiveCornerRadius = useMemo(() => {
    if (cornerRadius !== undefined) {
      const result = Math.max(0, cornerRadius);
      return result;
    }

    const result = Math.max(0, dynamicCornerRadius);
    return result;
  }, [cornerRadius, dynamicCornerRadius]);

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
          debugCornerRadius
        ) {
          console.error('[AtomixGlass] Error extracting corner radius:', error);
        }
      }
    };

    extractRadius();
    const timeoutId = setTimeout(extractRadius, 100);
    return () => clearTimeout(timeoutId);
  }, [children, debugCornerRadius, contentRef]);

  return {
    dynamicCornerRadius,
    effectiveCornerRadius,
  };
}
