import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { GlassContainerProps, MousePosition } from '../types/components';

/**
 * Custom hook for managing GlassContainer state and interactions
 */
export function useGlassContainer(props: GlassContainerProps) {
  const {
    glassSize = { width: 270, height: 69 },
    elasticity = 0.15,
    mouseContainer,
    globalMousePos: externalGlobalMousePos,
    mouseOffset: externalMouseOffset,
  } = props;

  const filterId = useId();
  const glassRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentGlassSize, setCurrentGlassSize] = useState(glassSize);
  const [internalGlobalMousePos, setInternalGlobalMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [internalMouseOffset, setInternalMouseOffset] = useState<MousePosition>({ x: 0, y: 0 });

  // Use external mouse position if provided, otherwise use internal
  const globalMousePos = externalGlobalMousePos || internalGlobalMousePos;
  const mouseOffset = externalMouseOffset || internalMouseOffset;

  // Internal mouse tracking
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = mouseContainer?.current || glassRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setInternalMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      });

      setInternalGlobalMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [mouseContainer]
  );

  // Set up mouse tracking if no external mouse position is provided
  useEffect(() => {
    if (externalGlobalMousePos && externalMouseOffset) return;

    const container = mouseContainer?.current || glassRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, mouseContainer, externalGlobalMousePos, externalMouseOffset]);

  // Calculate directional scaling based on mouse position
  const calculateDirectionalScale = useCallback(() => {
    if (!globalMousePos.x || !globalMousePos.y || !glassRef.current) {
      return 'scale(1)';
    }

    const rect = glassRef.current.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = currentGlassSize.width;
    const pillHeight = currentGlassSize.height;

    const deltaX = globalMousePos.x - pillCenterX;
    const deltaY = globalMousePos.y - pillCenterY;

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    const activationZone = 200;
    if (edgeDistance > activationZone) return 'scale(1)';

    const fadeInFactor = 1 - edgeDistance / activationZone;
    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (centerDistance === 0) return 'scale(1)';

    const normalizedX = deltaX / centerDistance;
    const normalizedY = deltaY / centerDistance;
    const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

    const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
    const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }, [globalMousePos, elasticity, currentGlassSize]);

  // Calculate elastic translation
  const calculateElasticTranslation = useCallback(() => {
    if (!glassRef.current) return { x: 0, y: 0 };

    const rect = glassRef.current.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const pillWidth = currentGlassSize.width;
    const pillHeight = currentGlassSize.height;

    const edgeDistanceX = Math.max(0, Math.abs(globalMousePos.x - pillCenterX) - pillWidth / 2);
    const edgeDistanceY = Math.max(0, Math.abs(globalMousePos.y - pillCenterY) - pillHeight / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    const activationZone = 200;
    const fadeInFactor = edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone;

    return {
      x: (globalMousePos.x - pillCenterX) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePos.y - pillCenterY) * elasticity * 0.1 * fadeInFactor,
    };
  }, [globalMousePos, elasticity, currentGlassSize]);

  // Update glass size
  useEffect(() => {
    const updateGlassSize = () => {
      if (glassRef.current) {
        const rect = glassRef.current.getBoundingClientRect();
        setCurrentGlassSize({ width: rect.width, height: rect.height });
      }
    };

    updateGlassSize();
    window.addEventListener('resize', updateGlassSize);
    return () => window.removeEventListener('resize', updateGlassSize);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    filterId,
    glassRef,
    isHovered,
    isActive,
    currentGlassSize,
    globalMousePos,
    mouseOffset,
    calculateDirectionalScale,
    calculateElasticTranslation,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
  };
}

export default useGlassContainer;