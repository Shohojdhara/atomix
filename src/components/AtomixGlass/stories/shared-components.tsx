/**
 * shared-components.tsx
 *
 * Shared utility components used across AtomixGlass stories.
 * These components provide consistent styling and functionality for showcasing
 * the AtomixGlass component in various scenarios.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Enhanced BackgroundWrapper Component
 *
 * A utility component used throughout the stories to provide consistent background
 * styling and overlay effects. This wrapper creates a visually appealing container
 * for showcasing the AtomixGlass component in various scenarios.
 *
 * @component BackgroundWrapper
 */
export interface BackgroundWrapperProps {
  /** Child elements to render inside the wrapper */
  children: React.ReactNode;
  /** Background image URL or index from the backgroundImages array */
  backgroundImage?: string;
  /** Background index to use from the predefined array */
  backgroundIndex?: number;
  /** Optional overlay flag for quick overlay application */
  overlay?: boolean;
  /** Custom overlay color in CSS format */
  overlayColor?: string;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Container height */
  height?: string;
  /** Container width */
  width?: string;
  /** Container border radius */
  borderRadius?: string;
  /** Container padding */
  padding?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Enable interactive background movement */
  interactive?: boolean;
  /** ARIA hidden attribute */
  'aria-hidden'?: 'true' | 'false' | boolean;
}

export const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  backgroundImage,
  backgroundIndex,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 0.5,
  height = '98vh',
  width = '98vw',
  borderRadius = '0',
  padding = '0',
  className = '',
  style = {},
  interactive = false,
  'aria-hidden': ariaHidden,
}) => {
  // Use the background image if provided, otherwise use the indexed one from backgroundImages
  const bgImage = backgroundImage || (backgroundIndex !== undefined ? backgroundImages[backgroundIndex] : backgroundImages[0]);
  
  const bgStyle = {
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    height,
    width,
    borderRadius,
    padding,
    ...style
  };

  return (
    <div 
      className={`u-relative u-overflow-hidden ${className}`}
      style={bgStyle}
      aria-hidden={ariaHidden}
    >
      {overlay && (
        <div 
          className="u-absolute u-inset-0"
          style={{ 
            backgroundColor: overlayColor, 
            opacity: overlayOpacity 
          }} 
        />
      )}
      <div className="u-relative u-z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * Interactive Story Container
 *
 * A container that provides mouse tracking and interactive background effects
 * for enhanced storytelling and demonstration purposes.
 */
export interface StoryContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  parallax?: boolean;
  parallaxStrength?: number;
}

export const StoryContainer: React.FC<StoryContainerProps> = ({
  children,
  className = '',
  style = {},
  parallax = false,
  parallaxStrength = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !parallax) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = ((x - centerX) / centerX) * parallaxStrength;
    const moveY = ((y - centerY) / centerY) * parallaxStrength;
    
    setPosition({ x: -moveX, y: -moveY });
  }, [parallax, parallaxStrength]);

  useEffect(() => {
    if (!parallax) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mousemove', handleMouseMove as any);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, [handleMouseMove, parallax]);

  return (
    <div 
      ref={containerRef}
      className={`u-relative u-overflow-hidden u-w-full u-h-screen ${className}`}
      style={style}
    >
      {parallax ? (
        <div 
          className="u-absolute u-inset-0 u-transition-transform u-duration-100 u-ease-linear"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: -1
          }}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

/**
 * Collection of high-quality background images for different moods and scenarios
 */
export const backgroundImages = [
  'https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
