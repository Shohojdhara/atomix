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
import type { RefObject, ErrorInfo } from 'react';
import type { StoryErrorBoundaryProps } from './types';

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
  height = '100vh',
  width = '100vw',
  borderRadius = '0',
  padding = '0',
  className = '',
  style = {},
  interactive = false,
  'aria-hidden': ariaHidden,
}) => {
  // Use the background image if provided, otherwise use the indexed one from backgroundImages
  const bgImage =
    backgroundImage ||
    (backgroundIndex !== undefined ? backgroundImages[backgroundIndex] : backgroundImages[0]);

  const bgStyle = {
    backgroundImage: bgImage ? `url(${bgImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height,
    width,
    borderRadius,
    ...style,
  };

  return (
    <div
      className={`u-relative u-overflow-hidden u-flex u-items-center u-justify-center ${className}`}
      style={bgStyle}
      aria-hidden={ariaHidden}
    >
      {overlay && (
        <div
          className="u-absolute u-inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            padding,
            objectPosition: 'center',
            objectFit: 'cover',
            backgroundPosition: 'fixed'
          }}
        />
      )}
      <div
        className="u-relative u-z-10 u-w-100 u-h-100 u-flex u-items-center u-justify-center"
        style={{ padding }}
      >
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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !parallax) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = ((x - centerX) / centerX) * parallaxStrength;
      const moveY = ((y - centerY) / centerY) * parallaxStrength;

      setPosition({ x: -moveX, y: -moveY });
    },
    [parallax, parallaxStrength]
  );

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
            zIndex: -1,
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
  'https://images.unsplash.com/photo-1773609108583-4f0040c75e7f?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593433073755-4233a78ee359?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1773062278803-0643c4782445?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

/**
 * StoryErrorBoundary Component
 *
 * Error boundary wrapper for stories to gracefully handle rendering errors.
 * Provides a fallback UI and error logging for better developer experience.
 */
export class StoryErrorBoundary extends React.Component<
  StoryErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: StoryErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Story rendering error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="u-flex u-items-center u-justify-center u-p-5"
          style={{
            minHeight: '400px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '12px',
            border: '2px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div className="u-text-center">
            <h3
              className="u-mb-2 u-text-xl u-font-bold"
              style={{ color: '#dc2626' }}
            >
              Story Rendering Error
            </h3>
            <p className="u-mb-4 u-text-sm" style={{ color: '#7f1d1d' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="u-px-4 u-py-2 u-bg-red-600 u-text-white u-rounded u-cursor-pointer u-border-none u-transition-color u-hover-bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * FallbackBackground Component
 *
 * Provides a gradient fallback when background images fail to load.
 * Used as a safety net for broken external image URLs.
 */
export const FallbackBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`u-absolute u-inset-0 ${className}`}
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      zIndex: -1,
    }}
  />
);
