import React, { useEffect, useState } from 'react';
import { ATOMIX_GLASS } from '../../constants/components';
import { validateGlassSize } from '../../../components/AtomixGlass/glass-utils';
import type { GlassSize } from '../../types/components';

const { CONSTANTS } = ATOMIX_GLASS;

interface UseGlassSizeProps {
  glassRef: React.RefObject<HTMLDivElement>;
  effectiveBorderRadius: number;
  cachedRectRef?: React.MutableRefObject<DOMRect | null>;
}

export function useGlassSize({
  glassRef,
  effectiveBorderRadius,
  cachedRectRef,
}: UseGlassSizeProps) {
  const [glassSize, setGlassSize] = useState<GlassSize>({ width: 270, height: 69 });

  useEffect(() => {
    const isValidElement = (element: HTMLElement | null): element is HTMLElement =>
      element !== null && element instanceof HTMLElement && element.isConnected;

    const validateSize = (size: GlassSize): boolean =>
      validateGlassSize(size) &&
      size.width <= CONSTANTS.MAX_SIZE &&
      size.height <= CONSTANTS.MAX_SIZE;

    let rafId: number | null = null;
    let lastSize = { width: 0, height: 0 };
    let lastCornerRadius = effectiveBorderRadius;

    const updateGlassSize = (forceUpdate = false): void => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!isValidElement(glassRef.current)) {
          rafId = null;
          return;
        }

        const rect = glassRef.current.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          rafId = null;
          return;
        }

        // Measure actual rendered size without artificial offsets to avoid feedback loops
        const newSize: GlassSize = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };

        const cornerRadiusChanged = lastCornerRadius !== effectiveBorderRadius;
        const dimensionsChanged =
          Math.abs(newSize.width - lastSize.width) > 1 ||
          Math.abs(newSize.height - lastSize.height) > 1;

        if ((forceUpdate || cornerRadiusChanged || dimensionsChanged) && validateSize(newSize)) {
          lastSize = newSize;
          lastCornerRadius = effectiveBorderRadius;
          setGlassSize(newSize);
        }

        rafId = null;
      });
    };

    let resizeTimeoutId: NodeJS.Timeout | null = null;
    const debouncedResizeHandler = (): void => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => updateGlassSize(false), 16);
    };

    const initialTimeoutId = setTimeout(() => updateGlassSize(true), 0);

    let resizeObserver: ResizeObserver | null = null;
    let resizeDebounceTimeout: NodeJS.Timeout | null = null;

    // ResizeObserver has 98%+ browser support, no need for fallback
    if (typeof ResizeObserver !== 'undefined' && isValidElement(glassRef.current)) {
      try {
        resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === glassRef.current) {
              // Update cached rect when size changes
              if (glassRef.current && cachedRectRef) {
                cachedRectRef.current = glassRef.current.getBoundingClientRect();
              }
              // Debounce resize updates to match RAF timing (16ms)
              if (resizeDebounceTimeout) clearTimeout(resizeDebounceTimeout);
              resizeDebounceTimeout = setTimeout(() => updateGlassSize(false), 16);
              break;
            }
          }
        });
        resizeObserver.observe(glassRef.current);
      } catch (error) {
        console.warn('AtomixGlass: ResizeObserver not available, using window resize only', error);
      }
    }

    window.addEventListener('resize', debouncedResizeHandler, { passive: true });

    return () => {
      clearTimeout(initialTimeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (resizeDebounceTimeout) clearTimeout(resizeDebounceTimeout);
      window.removeEventListener('resize', debouncedResizeHandler);
      resizeObserver?.disconnect();
    };
  }, [effectiveBorderRadius, glassRef, cachedRectRef]);

  return { glassSize };
}
