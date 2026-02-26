import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { globalMouseTracker } from '../shared-mouse-tracker';
import { calculateElementCenter } from '../../../components/AtomixGlass/glass-utils';
import type { MousePosition } from '../../types/components';

interface UseGlassMouseTrackingProps {
  glassRef: React.RefObject<HTMLDivElement>;
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  externalGlobalMousePosition?: MousePosition;
  externalMouseOffset?: MousePosition;
  effectiveWithoutEffects?: boolean;
}

export function useGlassMouseTracking({
  glassRef,
  mouseContainer,
  externalGlobalMousePosition,
  externalMouseOffset,
  effectiveWithoutEffects = false,
}: UseGlassMouseTrackingProps) {
  const [internalGlobalMousePosition, setInternalGlobalMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [internalMouseOffset, setInternalMouseOffset] = useState<MousePosition>({ x: 0, y: 0 });

  // Mouse tracking using shared global tracker
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

      if (effectiveWithoutEffects) {
        return;
      }

      const container = mouseContainer?.current || glassRef.current;
      if (!container) {
        return;
      }

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
    },
    [
      mouseContainer,
      glassRef,
      externalGlobalMousePosition,
      externalMouseOffset,
      effectiveWithoutEffects,
    ]
  );

  // Subscribe to shared mouse tracker
  useEffect(() => {
    if (externalGlobalMousePosition && externalMouseOffset) {
      // External mouse position provided, don't subscribe
      return undefined;
    }

    if (effectiveWithoutEffects) {
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
    effectiveWithoutEffects,
  ]);

  return {
    globalMousePosition,
    mouseOffset,
    cachedRectRef,
  };
}
