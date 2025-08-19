import { useCallback, useRef, useState } from 'react';

interface InteractionState {
  isDragging: boolean;
  isZooming: boolean;
  lastPointerPos: { x: number; y: number } | null;
  zoomLevel: number;
  panOffset: { x: number; y: number };
}

export function useChartInteractions() {
  const [state, setState] = useState<InteractionState>({
    isDragging: false,
    isZooming: false,
    lastPointerPos: null,
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
  });

  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTime = useRef(0);

  // Improved wheel handling for both mouse and trackpad
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    const now = Date.now();
    const timeDelta = now - lastWheelTime.current;
    lastWheelTime.current = now;

    // Detect trackpad vs mouse wheel
    const isTrackpad = Math.abs(event.deltaY) < 50 && timeDelta < 50;
    const sensitivity = isTrackpad ? 0.01 : 0.1;
    
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }

    setState(prev => {
      const rect = (event.target as Element).getBoundingClientRect();
      const centerX = event.clientX - rect.left;
      const centerY = event.clientY - rect.top;
      
      // Zoom calculation
      const zoomFactor = 1 - (event.deltaY * sensitivity);
      const newZoomLevel = Math.max(0.1, Math.min(10, prev.zoomLevel * zoomFactor));
      
      // Pan to zoom center
      const zoomRatio = newZoomLevel / prev.zoomLevel;
      const newPanOffset = {
        x: centerX - (centerX - prev.panOffset.x) * zoomRatio,
        y: centerY - (centerY - prev.panOffset.y) * zoomRatio,
      };

      return {
        ...prev,
        zoomLevel: newZoomLevel,
        panOffset: newPanOffset,
        isZooming: true,
      };
    });

    wheelTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isZooming: false }));
    }, 150);
  }, []);

  // Unified pointer events for mouse and touch
  const handlePointerDown = useCallback((event: PointerEvent) => {
    setState(prev => ({
      ...prev,
      isDragging: true,
      lastPointerPos: { x: event.clientX, y: event.clientY },
    }));
    (event.target as Element).setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    setState(prev => {
      if (!prev.isDragging || !prev.lastPointerPos) return prev;

      const deltaX = event.clientX - prev.lastPointerPos.x;
      const deltaY = event.clientY - prev.lastPointerPos.y;

      return {
        ...prev,
        panOffset: {
          x: prev.panOffset.x + deltaX,
          y: prev.panOffset.y + deltaY,
        },
        lastPointerPos: { x: event.clientX, y: event.clientY },
      };
    });
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent) => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      lastPointerPos: null,
    }));
    (event.target as Element).releasePointerCapture(event.pointerId);
  }, []);

  const resetView = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoomLevel: 1,
      panOffset: { x: 0, y: 0 },
    }));
  }, []);

  return {
    state,
    handlers: {
      onWheel: handleWheel,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
    resetView,
  };
}