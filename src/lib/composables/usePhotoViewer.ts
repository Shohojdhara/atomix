import React, { useState, useEffect, useCallback, useRef } from 'react';

interface UsePhotoViewerProps {
  images: (string | { src: string; [key: string]: any })[];
  startIndex?: number;
  enableGestures?: boolean;
  onImageChange?: (index: number) => void;
  onClose?: () => void;
}

interface ImageState {
  zoomLevel: number;
  position: { x: number; y: number };
  rotation: number;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export const usePhotoViewer = ({ 
  images, 
  startIndex = 0, 
  enableGestures = true, 
  onImageChange, 
  onClose 
}: UsePhotoViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [momentumZoom, setMomentumZoom] = useState({ velocity: 0, timestamp: 0 });
  
  // Ref for the image element
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track touch points for pinch zoom
  const touchPointsRef = useRef<{ x: number; y: number }[]>([]);
  const lastDistanceRef = useRef<number | null>(null);
  const lastMidpointRef = useRef<{ x: number; y: number } | null>(null);
  const lastWheelTime = useRef<number>(0);
  const momentumTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate dragging bounds based on zoom level and image dimensions
  const calculateBounds = useCallback((zoomLevel: number, rotation: number) => {
    if (!isMounted || !imageRef.current || !containerRef.current) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const image = imageRef.current;
    const container = containerRef.current;
    
    // Additional safety check for DOM readiness
    if (!image.naturalWidth && !image.width) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    
    // Get natural image dimensions
    const imageWidth = image.naturalWidth || image.width || 800;
    const imageHeight = image.naturalHeight || image.height || 600;
    
    // Get container dimensions with null check
    try {
      const containerRect = container.getBoundingClientRect();
      if (!containerRect || containerRect.width === 0 || containerRect.height === 0) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
      }
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
    
    // Calculate image display dimensions considering rotation
    const rotationRad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotationRad));
    const sin = Math.abs(Math.sin(rotationRad));
    
    // Calculate the actual display size of the image
    const aspectRatio = imageWidth / imageHeight;
    let displayWidth, displayHeight;
    
    if (containerWidth / containerHeight > aspectRatio) {
      displayHeight = Math.min(containerHeight * 0.9, imageHeight);
      displayWidth = displayHeight * aspectRatio;
    } else {
      displayWidth = Math.min(containerWidth * 0.9, imageWidth);
      displayHeight = displayWidth / aspectRatio;
    }
    
    // Account for rotation in bounds calculation
    const rotatedWidth = displayWidth * cos + displayHeight * sin;
    const rotatedHeight = displayWidth * sin + displayHeight * cos;
    
    // Calculate scaled dimensions
    const scaledWidth = rotatedWidth * zoomLevel;
    const scaledHeight = rotatedHeight * zoomLevel;
    
    // Calculate bounds - how far we can drag
    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
    
      return {
        minX: -maxX,
        maxX: maxX,
        minY: -maxY,
        maxY: maxY
      };
    } catch (error) {
      console.warn('PhotoViewer: Error calculating bounds', error);
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
  }, [isMounted]);

  // Constrain position within bounds
  const constrainPosition = useCallback((position: { x: number; y: number }, bounds: ImageState['bounds']) => {
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, position.y))
    };
  }, []);

  // Mount tracking and ensure the current index is within bounds
  useEffect(() => {
    setIsMounted(true);
    if (startIndex < 0 || startIndex >= images.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(startIndex);
    }
    return () => setIsMounted(false);
  }, [images, startIndex]);

  // Handle modal open/close body class
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('is-open-photoviewer');
    } else {
      document.body.classList.remove('is-open-photoviewer');
    }
  }, [isModalOpen]);

  // Initialize state for current image when index changes
  useEffect(() => {
    if (isModalOpen) {
      setImageStates(prev => {
        if (!prev[currentIndex]) {
          return {
            ...prev,
            [currentIndex]: {
              zoomLevel: 1,
              position: { x: 0, y: 0 },
              rotation: 0,
              bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
            }
          };
        }
        return prev;
      });
    }
  }, [isModalOpen, currentIndex]);
  
  // Call onImageChange callback when current index changes
  useEffect(() => {
    if (onImageChange) {
      onImageChange(currentIndex);
    }
  }, [currentIndex, onImageChange]);

  // Update bounds when image loads or dimensions change
  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    
    const updateImageBounds = (): void => {
      if (!isMounted || !image || !container) return undefined;
      
      setImageStates(prev => {
        const currentState = prev[currentIndex] || {
          zoomLevel: 1,
          position: { x: 0, y: 0 },
          rotation: 0,
          bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
        };
        
        const newBounds = calculateBounds(currentState.zoomLevel, currentState.rotation);
        const constrainedPosition = constrainPosition(currentState.position, newBounds);
        
        return {
          ...prev,
          [currentIndex]: {
            ...currentState,
            bounds: newBounds,
            position: constrainedPosition
          }
        };
      });
    };
    
    if (image && container && image.complete && isMounted) {
      updateImageBounds();
      return undefined;
    } else if (image && container && isMounted) {
      image.addEventListener('load', updateImageBounds);
      return () => image.removeEventListener('load', updateImageBounds);
    }
    return undefined;
  }, [currentIndex, calculateBounds, constrainPosition, isMounted]);

  // Handle window resize
  useEffect(() => {
    const handleResize = (): void => {
      if (!isMounted || !imageRef.current || !containerRef.current) return undefined;
      
      setImageStates(prev => {
        const currentState = prev[currentIndex] || {
          zoomLevel: 1,
          position: { x: 0, y: 0 },
          rotation: 0,
          bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
        };
        
        const newBounds = calculateBounds(currentState.zoomLevel, currentState.rotation);
        const constrainedPosition = constrainPosition(currentState.position, newBounds);
        
        return {
          ...prev,
          [currentIndex]: {
            ...currentState,
            bounds: newBounds,
            position: constrainedPosition
          }
        };
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, calculateBounds, constrainPosition, isMounted]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentIndex, images.length]);

  const setZoomLevel = useCallback((zoom: number | ((prev: number) => number)) => {
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      const newZoom = typeof zoom === 'function' ? zoom(currentState.zoomLevel) : zoom;
      const clampedZoom = Math.max(0.1, Math.min(5, newZoom));
      
      const newBounds = calculateBounds(clampedZoom, currentState.rotation);
      const constrainedPosition = constrainPosition(currentState.position, newBounds);
      
      return {
        ...prev,
        [currentIndex]: {
          ...currentState,
          zoomLevel: clampedZoom,
          bounds: newBounds,
          position: constrainedPosition
        }
      };
    });
  }, [isMounted, currentIndex, calculateBounds, constrainPosition]);

  const setImagePosition = useCallback((position: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => {
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      const newPosition = typeof position === 'function' ? position(currentState.position) : position;
      const constrainedPosition = constrainPosition(newPosition, currentState.bounds);
      
      return {
        ...prev,
        [currentIndex]: {
          ...currentState,
          position: constrainedPosition
        }
      };
    });
  }, [currentIndex, constrainPosition]);

  const setRotationAngle = useCallback((rotation: number | ((prev: number) => number)) => {
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      const newRotation = typeof rotation === 'function' ? rotation(currentState.rotation) : rotation;
      const normalizedRotation = ((newRotation % 360) + 360) % 360;
      
      const newBounds = calculateBounds(currentState.zoomLevel, normalizedRotation);
      const constrainedPosition = constrainPosition(currentState.position, newBounds);
      
      return {
        ...prev,
        [currentIndex]: {
          ...currentState,
          rotation: normalizedRotation,
          bounds: newBounds,
          position: constrainedPosition
        }
      };
    });
  }, [isMounted, currentIndex, calculateBounds, constrainPosition]);

  // Handle mouse wheel for zooming with proper bounds
  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (!isMounted || !event || !event.currentTarget) return;
    
    // Additional safety check for the target element
    const target = event.currentTarget;
    if (!target || typeof target.getBoundingClientRect !== 'function') return;
    
    // Storybook-specific safety check - ensure DOM is ready
    if (typeof window !== 'undefined' && window.location?.href?.includes('storybook')) {
      try {
        // Test if getBoundingClientRect works before proceeding
        const testRect = target.getBoundingClientRect();
        if (!testRect || testRect.width === 0 || testRect.height === 0) return;
      } catch (e) {
        return;
      }
    }
    
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      // Advanced gesture detection for different input methods
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const isTrackpadPinch = event.ctrlKey && isMac;
      const hasHorizontalScroll = Math.abs(event.deltaX) > 0;
      const isTrackpadScroll = !event.ctrlKey && hasHorizontalScroll && isMac;
      const isMagicMouse = !event.ctrlKey && !hasHorizontalScroll && isMac;
      const isRegularMouse = !isMac;
      
      // Handle different input methods with appropriate sensitivity
      let zoomAmount: number;
      let shouldPreventDefault = false;
      
      if (isTrackpadPinch) {
        // MacBook trackpad pinch zoom - natural, high sensitivity
        zoomAmount = event.deltaY * -0.02;
        shouldPreventDefault = true;
      } else if (isTrackpadScroll) {
        // MacBook trackpad scroll with two fingers
        if (currentState.zoomLevel > 1) {
          // Only zoom when already zoomed in, otherwise allow natural scroll
          zoomAmount = event.deltaY * -0.003;
          shouldPreventDefault = true;
        } else {
          return prev; // Allow page scroll when not zoomed
        }
      } else if (isMagicMouse) {
        // Apple Magic Mouse - less sensitive
        zoomAmount = event.deltaY * -0.004;
        shouldPreventDefault = true;
      } else if (isRegularMouse) {
        // Regular mouse wheel - medium sensitivity
        zoomAmount = event.deltaY * -0.006;
        shouldPreventDefault = true;
      } else {
        // Fallback for other input methods
        zoomAmount = event.deltaY * -0.005;
        shouldPreventDefault = true;
      }
      
      if (shouldPreventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Add momentum for trackpad gestures
      const currentTime = Date.now();
      const timeDelta = currentTime - lastWheelTime.current;
      lastWheelTime.current = currentTime;
      
      // Calculate velocity for momentum (trackpad specific)
      if (isTrackpadPinch && timeDelta < 100) {
        const velocity = Math.abs(zoomAmount) / timeDelta;
        setMomentumZoom({ velocity, timestamp: currentTime });
        
        // Clear any existing momentum timeout
        if (momentumTimeoutRef.current) {
          clearTimeout(momentumTimeoutRef.current);
        }
        
        // Apply momentum decay after gesture ends
        momentumTimeoutRef.current = setTimeout(() => {
          const decayFactor = 0.95;
          const minVelocity = 0.001;
          
          const applyMomentum = () => {
            setMomentumZoom(prev => {
              if (prev.velocity < minVelocity) return prev;
              
              const newVelocity = prev.velocity * decayFactor;
              const momentumZoomAmount = newVelocity * (zoomAmount > 0 ? 1 : -1);
              
              // Apply momentum zoom
              setImageStates(current => {
                const state = current[currentIndex] || {
                  zoomLevel: 1,
                  position: { x: 0, y: 0 },
                  rotation: 0,
                  bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
                };
                
                const newZoom = Math.max(0.1, Math.min(5, state.zoomLevel + momentumZoomAmount));
                if (newZoom === state.zoomLevel) return current;
                
                const newBounds = calculateBounds(newZoom, state.rotation);
                const constrainedPosition = constrainPosition(state.position, newBounds);
                
                return {
                  ...current,
                  [currentIndex]: {
                    ...state,
                    zoomLevel: newZoom,
                    bounds: newBounds,
                    position: constrainedPosition
                  }
                };
              });
              
              if (newVelocity >= minVelocity) {
                requestAnimationFrame(applyMomentum);
              }
              
              return { velocity: newVelocity, timestamp: Date.now() };
            });
          };
          
          requestAnimationFrame(applyMomentum);
        }, 50);
      }
      
      // Safe getBoundingClientRect call with error handling
      let rect;
      try {
        rect = target.getBoundingClientRect();
      } catch (error) {
        console.warn('PhotoViewer: Error getting bounding rect', error);
        return prev;
      }
      
      if (!rect || rect.width === 0 || rect.height === 0) return prev;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const cursorX = event.clientX - rect.left - centerX;
      const cursorY = event.clientY - rect.top - centerY;
      
      const oldZoom = currentState.zoomLevel;
      const newZoom = Math.max(0.1, Math.min(5, oldZoom + zoomAmount));
      
      if (newZoom !== oldZoom) {
        const zoomFactor = newZoom / oldZoom;
        const newBounds = calculateBounds(newZoom, currentState.rotation);
        
        // Calculate new position to zoom towards cursor
        const newPosition = {
          x: currentState.position.x + cursorX * (1 - zoomFactor) * 0.5,
          y: currentState.position.y + cursorY * (1 - zoomFactor) * 0.5
        };
        
        const constrainedPosition = constrainPosition(newPosition, newBounds);
        
        return {
          ...prev,
          [currentIndex]: {
            ...currentState,
            zoomLevel: newZoom,
            bounds: newBounds,
            position: constrainedPosition
          }
        };
      }
      return prev;
    });
  }, [isMounted, currentIndex, calculateBounds, constrainPosition]);

  // Handle double click to zoom with smart zoom levels
  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    if (!isMounted || !event || !event.currentTarget) return;
    
    const target = event.currentTarget;
    if (!target || typeof target.getBoundingClientRect !== 'function') return;
    
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      let rect;
      try {
        rect = target.getBoundingClientRect();
      } catch (error) {
        console.warn('PhotoViewer: Error getting bounding rect in double click', error);
        return prev;
      }
      
      if (!rect || rect.width === 0 || rect.height === 0) return prev;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const cursorX = event.clientX - rect.left - centerX;
      const cursorY = event.clientY - rect.top - centerY;
      
      let newZoom: number;
      let newPosition = { x: 0, y: 0 };
      
      if (currentState.zoomLevel < 1.5) {
        newZoom = 2;
        // Zoom towards cursor
        newPosition = {
          x: -cursorX * 0.5,
          y: -cursorY * 0.5
        };
      } else if (currentState.zoomLevel < 3) {
        newZoom = 4;
        newPosition = {
          x: -cursorX * 0.75,
          y: -cursorY * 0.75
        };
      } else {
        newZoom = 1;
        newPosition = { x: 0, y: 0 };
      }
      
      const newBounds = calculateBounds(newZoom, currentState.rotation);
      const constrainedPosition = constrainPosition(newPosition, newBounds);
      
      return {
        ...prev,
        [currentIndex]: {
          ...currentState,
          zoomLevel: newZoom,
          bounds: newBounds,
          position: constrainedPosition
        }
      };
    });
  }, [isMounted, currentIndex, calculateBounds, constrainPosition]);

  // Handle mouse down for panning
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => {
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      if (currentState.zoomLevel > 1) {
        event.preventDefault();
        setIsDragging(true);
        setStartDragPosition({ 
          x: event.clientX - currentState.position.x, 
          y: event.clientY - currentState.position.y 
        });
      }
      return prev;
    });
  }, [currentIndex]);

  // Handle mouse move for panning with bounds
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement | HTMLImageElement, MouseEvent>) => {
    if (!isDragging) return;
    
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      const newPosition = {
        x: event.clientX - startDragPosition.x,
        y: event.clientY - startDragPosition.y
      };
      
      const constrainedPosition = constrainPosition(newPosition, currentState.bounds);
      
      return {
        ...prev,
        [currentIndex]: {
          ...currentState,
          position: constrainedPosition
        }
      };
    });
  }, [isDragging, startDragPosition, currentIndex, constrainPosition]);

  // Handle mouse up for panning
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Touch handlers for mobile gestures with bounds
  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLImageElement | HTMLDivElement>) => {
    if (!enableGestures) return;
    
    const touches = event.touches;
    
    // Always prevent default for multi-touch to stop page zoom
    if (touches.length > 1) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    touchPointsRef.current = Array.from(touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY
    }));
    
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      if (touches.length === 1 && currentState.zoomLevel > 1) {
        setIsDragging(true);
        setStartDragPosition({
          x: touches[0].clientX - currentState.position.x,
          y: touches[0].clientY - currentState.position.y
        });
      } else if (touches.length === 2) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        lastDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
        
        lastMidpointRef.current = {
          x: (touches[0].clientX + touches[1].clientX) / 2,
          y: (touches[0].clientY + touches[1].clientY) / 2
        };
      }
      return prev;
    });
  }, [enableGestures, currentIndex]);

  // Handle touch move for dragging and pinch zoom with bounds
  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLImageElement | HTMLDivElement>) => {
    if (!enableGestures) return;
    
    const touches = event.touches;
    
    // Always prevent default for multi-touch gestures to stop page zoom
    if (touches.length > 1) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setImageStates(prev => {
      const currentState = prev[currentIndex] || {
        zoomLevel: 1,
        position: { x: 0, y: 0 },
        rotation: 0,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
      };
      
      // Prevent default for single touch when zoomed in to avoid conflicts
      if (currentState.zoomLevel > 1 && touches.length === 1) {
        event.preventDefault();
      }
      
      if (touches.length === 1 && isDragging && currentState.zoomLevel > 1) {
        const newPosition = {
          x: touches[0].clientX - startDragPosition.x,
          y: touches[0].clientY - startDragPosition.y
        };
        const constrainedPosition = constrainPosition(newPosition, currentState.bounds);
        
        return {
          ...prev,
          [currentIndex]: {
            ...currentState,
            position: constrainedPosition
          }
        };
      } else if (touches.length === 2 && lastDistanceRef.current !== null) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const zoomDelta = (distance - lastDistanceRef.current) * 0.005;
        lastDistanceRef.current = distance;
        
        const currentMidpoint = {
          x: (touches[0].clientX + touches[1].clientX) / 2,
          y: (touches[0].clientY + touches[1].clientY) / 2
        };
        
        const oldZoom = currentState.zoomLevel;
        const newZoom = Math.max(0.1, Math.min(5, oldZoom + zoomDelta));
        
        if (newZoom !== oldZoom && lastMidpointRef.current) {
          let rect;
          try {
            rect = event.currentTarget.getBoundingClientRect();
          } catch (error) {
            console.warn('PhotoViewer: Error getting bounding rect in touch move', error);
            return prev;
          }
          
          if (!rect || rect.width === 0 || rect.height === 0) return prev;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const midpointX = currentMidpoint.x - rect.left - centerX;
          const midpointY = currentMidpoint.y - rect.top - centerY;
          
          const zoomFactor = newZoom / oldZoom;
          const newBounds = calculateBounds(newZoom, currentState.rotation);
          
          const newPosition = {
            x: currentState.position.x + midpointX * (1 - zoomFactor) * 0.5,
            y: currentState.position.y + midpointY * (1 - zoomFactor) * 0.5
          };
          
          const constrainedPosition = constrainPosition(newPosition, newBounds);
          
          lastMidpointRef.current = currentMidpoint;
          
          return {
            ...prev,
            [currentIndex]: {
              ...currentState,
              zoomLevel: newZoom,
              bounds: newBounds,
              position: constrainedPosition
            }
          };
        }
        
        lastMidpointRef.current = currentMidpoint;
      }
      return prev;
    });
  }, [isMounted, enableGestures, isDragging, startDragPosition, currentIndex, constrainPosition, calculateBounds]);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastDistanceRef.current = null;
    lastMidpointRef.current = null;
  }, []);

  // Get current state values without causing re-renders
  const currentState = imageStates[currentIndex] || {
    zoomLevel: 1,
    position: { x: 0, y: 0 },
    rotation: 0,
    bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  };

  return {
    currentIndex,
    isModalOpen,
    zoomLevel: currentState.zoomLevel,
    imagePosition: currentState.position,
    isDragging,
    isFullscreen,
    rotationAngle: currentState.rotation,
    showInfo,
    imageRef,
    containerRef,
    isTransitioning,
    setCurrentIndex,
    setZoomLevel,
    setImagePosition,
    setIsDragging,
    setIsFullscreen,
    setRotationAngle,
    setShowInfo,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
    resetImageState: () => {
      setImageStates(prev => ({
        ...prev,
        [currentIndex]: {
          zoomLevel: 1,
          position: { x: 0, y: 0 },
          rotation: 0,
          bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
        }
      }));
    }
  };
};