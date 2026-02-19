import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MousePosition } from '../../types/components';
import { globalMouseTracker } from '../shared-mouse-tracker';
import { calculateElementCenter } from '../../../components/AtomixGlass/glass-utils';

interface UseGlassMouseTrackerProps {
  glassRef: React.RefObject<HTMLDivElement>;
  mouseContainer?: React.RefObject<HTMLDivElement>;
  externalGlobalMousePosition?: MousePosition;
  externalMouseOffset?: MousePosition;
  effectiveDisableEffects: boolean;
  enablePerformanceMonitoring?: boolean;
}

export function useGlassMouseTracker({
  glassRef,
  mouseContainer,
  externalGlobalMousePosition,
  externalMouseOffset,
  effectiveDisableEffects,
  enablePerformanceMonitoring = false,
}: UseGlassMouseTrackerProps) {
  const [internalGlobalMousePosition, setInternalGlobalMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [internalMouseOffset, setInternalMouseOffset] = useState<MousePosition>({ x: 0, y: 0 });

  // Cache bounding rect to avoid repeated getBoundingClientRect calls
  const cachedRectRef = useRef<DOMRect | null>(null);
  const updateRectRef = useRef<number | null>(null);

  const globalMousePosition = useMemo(
    () => externalGlobalMousePosition || internalGlobalMousePosition,
    [externalGlobalMousePosition, internalGlobalMousePosition]
  );

  const mouseOffset = useMemo(
    () => externalMouseOffset || internalMouseOffset,
    [externalMouseOffset, internalMouseOffset]
  );

  // Handle mouse position updates from shared tracker
  const handleGlobalMousePosition = useCallback(
    (globalPos: MousePosition) => {
      if (externalGlobalMousePosition && externalMouseOffset) {
        // External mouse position provided, skip internal tracking
        return;
      }

      if (effectiveDisableEffects) {
        return;
      }

      const container = mouseContainer?.current || glassRef.current;
      if (!container) {
        return;
      }

      const startTime = enablePerformanceMonitoring ? performance.now() : 0;

      // Use cached rect if available, otherwise get new one
      let rect = cachedRectRef.current;
      if (!rect || rect.width === 0 || rect.height === 0) {
        rect = container.getBoundingClientRect();
        cachedRectRef.current = rect;
      }

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const center = calculateElementCenter(rect);

      // Calculate offset relative to this container
      const newOffset = {
        x: ((globalPos.x - center.x) / rect.width) * 100,
        y: ((globalPos.y - center.y) / rect.height) * 100,
      };

      // React 18 automatically batches these updates
      setInternalMouseOffset(newOffset);
      setInternalGlobalMousePosition(globalPos);

      if ((typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') && enablePerformanceMonitoring) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        // if (duration > 5) {
        //   console.warn(`AtomixGlass: Mouse tracking took ${duration.toFixed(2)}ms`);
        // }
      }
    },
    [
      mouseContainer,
      glassRef,
      externalGlobalMousePosition,
      externalMouseOffset,
      effectiveDisableEffects,
      enablePerformanceMonitoring,
    ]
  );

  // Subscribe to shared mouse tracker
  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      // External mouse position provided, don't subscribe
      return undefined;
    }

    if (effectiveDisableEffects) {
      // Effects disabled, don't subscribe
      return undefined;
    }

    // Subscribe to shared tracker
    const unsubscribe = globalMouseTracker.subscribe(handleGlobalMousePosition);

    // Update cached rect when container size changes
    const updateRect = () => {
      if (updateRectRef.current !== null) {
        cancelAnimationFrame(updateRectRef.current);
      }
      updateRectRef.current = requestAnimationFrame(() => {
        const container = mouseContainer?.current || glassRef.current;
        if (container) {
          cachedRectRef.current = container.getBoundingClientRect();
        }
        updateRectRef.current = null;
      });
    };

    // Use ResizeObserver to update cached rect when container size changes
    const container = mouseContainer?.current || glassRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateRect);
      resizeObserver.observe(container);
    }

    return () => {
      unsubscribe();
      if (updateRectRef.current !== null) {
        cancelAnimationFrame(updateRectRef.current);
        updateRectRef.current = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    handleGlobalMousePosition,
    mouseContainer,
    glassRef,
    externalGlobalMousePosition,
    externalMouseOffset,
    effectiveDisableEffects,
  ]);

  return {
    globalMousePosition,
    mouseOffset,
    cachedRectRef,
  };
}
