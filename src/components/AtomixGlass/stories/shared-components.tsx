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

/**
 * Interactive Story Container
 *
 * A container that provides mouse tracking and interactive background effects
 * for enhanced storytelling and demonstration purposes.
 */
export interface StoryContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  interactive?: boolean;
}

/**
 * Interactive Wrapper Component
 *
 * Provides mouse position tracking and offset calculations for interactive stories
 */
export interface InteractiveWrapperProps {
  children: (
    mousePos: { x: number; y: number },
    mouseOffset: { x: number; y: number },
    containerRef: RefObject<HTMLDivElement>
  ) => React.ReactNode;
}

/**
 * Collection of high-quality background images for different moods and scenarios
 *
 * This array provides a variety of background options that work well with the
 * AtomixGlass component, showcasing different visual styles and contexts.
 */
export const backgroundImages = [
  // 0: Modern office interior with natural lighting
  'https://images.pexels.com/photos/5653101/pexels-photo-5653101.jpeg',
  // 1: Beautiful natural landscape - mountains and lake
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 2: Urban cityscape with modern buildings
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 3: Forest path with sunlight filtering through trees
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 4: Ocean waves and beach scene
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 5: Modern architecture with glass facades
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 6: Cozy café interior with warm lighting
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 7: Desert landscape with dramatic sky
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 8: Tropical paradise with palm trees and ocean
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 9: Modern library or workspace with natural light
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

/**
 * Legacy backgrounds object for backward compatibility
 * @deprecated Use backgroundImages array instead
 */
export const backgrounds = {
  // Office and workspace environments
  blueGradient: backgroundImages[0], // Modern office interior
  purpleGradient: backgroundImages[1], // Mountain landscape
  greenGradient: backgroundImages[3], // Forest path

  // Apple-inspired natural scenes
  macosWallpaper: backgroundImages[1], // Mountain landscape
  iosWallpaper: backgroundImages[4], // Ocean waves

  // Nature scenes
  mountains: backgroundImages[1], // Mountain landscape
  ocean: backgroundImages[4], // Ocean waves

  // Urban environments
  cityNight: backgroundImages[2], // Urban cityscape
  cityDay: backgroundImages[5], // Modern architecture

  // Interior spaces
  abstract1: backgroundImages[6], // Cozy café interior
  abstract2: backgroundImages[9], // Modern library

  // Video backgrounds
  videoBackground:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

/**
 * BackgroundWrapper Component Implementation
 *
 * Renders a container with a background image and optional overlay,
 * providing a consistent environment for showcasing the AtomixGlass component.
 *
 * @param props - BackgroundWrapperProps
 * @returns JSX.Element
 */
export const BackgroundWrapper = ({
  children,
  backgroundImage,
  backgroundIndex,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0)',
  overlayOpacity = 0,
  height = '97vh',
  width = '97vw',
  borderRadius = '12px',
  className = '',
  style = {},
}: BackgroundWrapperProps) => {
  // If backgroundIndex is provided, use it to select from the backgroundImages array
  const bgImage =
    backgroundIndex !== undefined ? backgroundImages[backgroundIndex] : backgroundImage;

  // Apply default overlay settings if overlay flag is true using nullish coalescing
  const finalOverlayColor = overlay ? 'rgba(0,0,0,0.5)' : (overlayColor ?? 'rgba(0,0,0,0)');
  const finalOverlayOpacity = overlay ? 0.5 : (overlayOpacity ?? 0);

  return (
    <div
      className={`c-atomix-glass-background ${className}`}
      style={{
        position: 'relative',
        height: height,
        width: width,
        backgroundColor: !bgImage ? '#1a1a2e' : undefined, // Fallback color if no image
        background: bgImage
          ? `url(${bgImage}) ${finalOverlayOpacity && ',' + finalOverlayColor}`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius,
        overflow: 'auto',
        ...style,
      }}
    >
     
      {children}
    </div>
  );
};

/**
 * Interactive Story Container Component
 *
 * A container that provides mouse tracking and interactive background effects
 * for enhanced storytelling and demonstration purposes.
 */
export const StoryContainer = ({
  children,
  style = {},
  interactive = false,
}: StoryContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && interactive) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate offset as a percentage
        const offsetX = ((e.clientX - centerX) / rect.width) * 100;
        const offsetY = ((e.clientY - centerY) / rect.height) * 100;

        setBackgroundPosition({ x: offsetX, y: offsetY });
      }
    },
    [interactive]
  );

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef && interactive) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      return () => {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      };
    }
    return undefined;
  }, [handleMouseMove, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: interactive
          ? 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          : undefined,
        backgroundSize: interactive ? '160%' : 'cover',
        backgroundPosition: interactive
          ? `calc(50% + ${backgroundPosition.x}px) calc(50% + ${backgroundPosition.y}px)`
          : 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Interactive Wrapper Component
 *
 * Provides mouse position tracking and offset calculations for interactive stories
 */
export const InteractiveWrapper = ({ children }: InteractiveWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      });
    }
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);
    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {children(mousePos, mouseOffset, containerRef)}
    </div>
  );
};
