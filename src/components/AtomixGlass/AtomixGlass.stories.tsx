/**
 * AtomixGlass.stories.tsx
 *
 * This file contains comprehensive Storybook stories for the AtomixGlass component, showcasing
 * various use cases, configurations, and best practices. The stories demonstrate
 * the component's versatility and provide examples for developers to reference.
 *\
 * @package Atomix
 * @component AtomixGlass
 */

import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from './AtomixGlass';
import Button from '../Button/Button';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import React from 'react';
import type { RefObject } from 'react';
import { BoxArrowDownIcon } from '@phosphor-icons/react';

/**
 * Storybook meta configuration for AtomixGlass component
 *
 * This defines the component's metadata, documentation, and controls
 * for the Storybook interface.
 */
const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A glass-like component with chromatic aberration and displacement effects. The component provides a modern, frosted glass aesthetic with interactive hover effects. This component is ideal for creating modern UI elements with depth and visual interest.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the glass effect',
    },
    displacementScale: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Displacement scale for the glass effect (default: 70)',
      table: { defaultValue: { summary: '70' } },
    },
    blurAmount: {
      control: { type: 'range', min: 0, max: 10, step: 0.5 },
      description: 'Blur amount for the backdrop (default: 0.0625)',
      table: { defaultValue: { summary: '0.0625' } },
    },
    saturation: {
      control: { type: 'range', min: 100, max: 300, step: 5 },
      description: 'Saturation percentage for the backdrop (default: 140)',
      table: { defaultValue: { summary: '140' } },
    },
    aberrationIntensity: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      description: 'Chromatic aberration intensity (default: 2)',
      table: { defaultValue: { summary: '2' } },
    },
    elasticity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Elasticity factor for mouse interactions (default: 0.15)',
      table: { defaultValue: { summary: '0.15' } },
    },
    cornerRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Corner radius in pixels (default: 20)',
      table: { defaultValue: { summary: '20' } },
    },
    globalMousePosition: {
      control: 'object',
      description: 'External global mouse position { x: number; y: number }',
    },
    mouseOffset: {
      control: 'object',
      description: 'External mouse offset { x: number; y: number }',
    },
    mouseContainer: {
      control: false,
      description: 'React ref object for mouse container element',
    },
    padding: {
      control: 'text',
      description: 'Padding for the glass container (default: "0 0")',
      table: { defaultValue: { summary: '"0 0"' } },
    },
    overLight: {
      control: 'boolean',
      description: 'Whether the glass is over a light background (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
    mode: {
      control: 'select',
      options: ['standard', 'polar', 'prominent', 'shader'],
      description: 'Glass effect mode (default: "standard")',
      table: { defaultValue: { summary: '"standard"' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    style: {
      control: 'object',
      description: 'CSS style object',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA describedby attribute for accessibility',
    },
    role: {
      control: 'text',
      description: 'ARIA role attribute',
    },
    tabIndex: {
      control: 'number',
      description: 'Tab index for keyboard navigation',
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Override for reduced motion preference (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
    highContrast: {
      control: 'boolean',
      description: 'Override for high contrast preference (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
    disableEffects: {
      control: 'boolean',
      description: 'Disable all visual effects (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
    enablePerformanceMonitoring: {
      control: 'boolean',
      description: 'Enable performance monitoring (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Enhanced BackgroundWrapper Component
 *
 * A utility component used throughout the stories to provide consistent background
 * styling and overlay effects. This wrapper creates a visually appealing container
 * for showcasing the AtomixGlass component in various scenarios.
 *
 * @component BackgroundWrapper
 */
interface BackgroundWrapperProps {
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
}

/**
 * Interactive Story Container
 *
 * A container that provides mouse tracking and interactive background effects
 * for enhanced storytelling and demonstration purposes.
 */
interface StoryContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  interactive?: boolean;
}

/**
 * Interactive Wrapper Component
 *
 * Provides mouse position tracking and offset calculations for interactive stories
 */
interface InteractiveWrapperProps {
  children: (
    mousePos: { x: number; y: number },
    mouseOffset: { x: number; y: number },
    containerRef: RefObject<HTMLDivElement>
  ) => React.ReactNode;
}

/**
 * BackgroundWrapper Component Implementation
 *
 * Renders a container with a background image and optional overlay,
 * providing a consistent environment for showcasing the AtomixGlass component.
 *
 * @param props - BackgroundWrapperProps
 * @returns JSX.Element
 */
const BackgroundWrapper = ({
  children,
  backgroundImage,
  backgroundIndex,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0)',
  overlayOpacity = 0,
  height = '90vh',
  width = '90vw',
  borderRadius = '12px',
  padding = '24px',
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
      className={`atomix-glass-background ${className}`}
      style={{
        position: 'relative',
        width: width,
        minHeight: height,
        height: '100%',
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
        padding: padding,
        ...style,
      }}
    >
      {/* Overlay for better contrast and visual appeal */}
      {finalOverlayOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: finalOverlayColor,
            opacity: finalOverlayOpacity,
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Interactive Story Container Component
 *
 * A container that provides mouse tracking and interactive background effects
 * for enhanced storytelling and demonstration purposes.
 */
const StoryContainer = ({ children, style = {}, interactive = false }: StoryContainerProps) => {
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
const InteractiveWrapper = ({ children }: InteractiveWrapperProps) => {
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

/**
 * Collection of high-quality background images for different moods and scenarios
 *
 * This array provides a variety of background options that work well with the
 * AtomixGlass component, showcasing different visual styles and contexts.
 */
const backgroundImages = [
  // 0: Modern office interior with natural lighting
  'https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  // 1: Beautiful natural landscape - mountains and lake
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 2: Urban cityscape with modern buildings
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
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
const backgrounds = {
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
 * Default showcase of the AtomixGlass component
 *
 * This story demonstrates the default configuration of the AtomixGlass component
 * with carefully selected parameters to achieve an optimal glass effect. It serves
 * as a reference implementation with balanced settings suitable for most use cases.
 *
 * Key features demonstrated:
 * - Balanced displacement scale for subtle distortion
 * - Moderate blur amount for the frosted glass effect
 * - Enhanced saturation for visual appeal
 * - Subtle chromatic aberration for depth
 * - Interactive hover effects for engagement
 */
export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', textAlign: 'center', maxWidth: '400px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 600 }}>AtomixGlass</h2>
        <p style={{ margin: '0 0 20px 0', fontSize: '16px', lineHeight: 1.6 }}>
          A premium glass morphism component with realistic light refraction, chromatic aberration,
          and interactive effects.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" glass>Explore</Button>
          <Button variant="outline-primary" glass>Learn More</Button>
        </div>
      </div>
    ),
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage={backgroundImages[0]}
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'The default configuration of AtomixGlass with optimal parameters for a realistic glass effect. This component mimics the Apple-style liquid glass UI with chromatic aberration and displacement effects.',
      },
    },
  },
};

/**
 * Mode Showcase - Demonstrates the visual differences between the various modes
 *
 * This story showcases all available modes of the AtomixGlass component with
 * optimized settings for each mode to highlight their unique characteristics.
 */
/**
 * Modes Story
 *
 * This story demonstrates the different modes available in the AtomixGlass component.
 * Each mode provides a unique visual effect with different displacement patterns,
 * blur amounts, and aberration intensities. This showcase allows users to compare
 * the different modes side by side and understand their visual characteristics.
 *
 * Modes demonstrated:
 * - standard: Balanced displacement and aberration
 * - polar: Circular refraction pattern
 * - prominent: Enhanced displacement with stronger edge effects
 * - shader: Advanced shader-based displacement for maximum visual impact
 */
export const Modes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Showcases the different modes available in the AtomixGlass component, highlighting their unique visual characteristics.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeMode, setActiveMode] = useState<string | null>(null);
    const modes = ['standard', 'polar', 'prominent', 'shader'] as const;

    // Different settings for each mode to highlight their unique characteristics
    const modeSettings = {
      standard: {
        displacementScale: 150,
        blurAmount: 0,
        shaderVariant: 'premiumGlass',
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Standard glass effect with balanced displacement and aberration',
        color: '#ffffff',
      },
      polar: {
        displacementScale: 120,
        blurAmount: 0,
        shaderVariant: 'premiumGlass',
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Polar displacement creates a circular refraction pattern',
        color: '#f0f8ff',
      },
      prominent: {
        shaderVariant: 'premiumGlass',
        displacementScale: 100,
        blurAmount: 0,
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Enhanced displacement with stronger edge effects',
        color: '#ffffff',
      },
      shader: {
        displacementScale: 190,
        shaderVariant: 'premiumGlass',
        blurAmount: 0,
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Advanced shader-based displacement for maximum visual impact',
        color: '#e6f7ff',
      },
    };

    // Handle mouse enter/leave for cards
    const handleMouseEnter = (mode: string) => {
      setActiveMode(mode);
    };

    const handleMouseLeave = () => {
      setActiveMode(null);
    };

    return (
      <BackgroundWrapper
        backgroundImage="https://plus.unsplash.com/premium_photo-1728613098996-af5b4ee51be8?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        overlay={true}
      >
        <div>
          <div
            style={{
              padding: '20px 0',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                margin: '0 0 10px 0',
                fontSize: '32px',
                fontWeight: 500,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              AtomixGlass Modes
            </h2>
            <p
              style={{
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Hover over each card to see how different modes affect the appearance and behavior of
              the glass effect.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: 'center',
              gap: '24px',
              width: '70vw',
            }}
          >
            {modes.map(mode => {
              const settings = modeSettings[mode];
              const isActive = activeMode === mode;

              return (
                <AtomixGlass
                  key={mode}
                  mode={mode}
                  displacementScale={settings.displacementScale}
                  blurAmount={settings.blurAmount}
                  saturation={settings.saturation}
                  shaderVariant={settings.shaderVariant as any}
                  elasticity={0.2}
                  cornerRadius={40}
                  onClick={() => handleMouseEnter(mode)}
                  overLight={false}
                >
                  <div
                    style={{
                      padding: '20px 40px',
                      textAlign: 'center',
                      maxWidth: '350px',
                      minHeight: '200px',
                      width: '100%',
                      textShadow: '1px 2px 6px rgba(0,0,0,0.7)',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: settings.color,
                      }}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                    </h3>
                    <p
                      style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        color: settings.color,
                      }}
                    >
                      {settings.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backdropFilter: 'blur(2px)',
                          background: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        Displacement: {settings.displacementScale}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(2px)',
                        }}
                      >
                        Blur: {settings.blurAmount}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backdropFilter: 'blur(2px)',
                          background: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        Aberration: {settings.aberrationIntensity}
                      </span>
                    </div>
                  </div>
                </AtomixGlass>
              );
            })}
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
};


/**
 * Performance Optimization Dashboard
 *
 * Demonstrates enterprise-grade performance optimization techniques with side-by-side
 * comparisons of different configuration strategies and their impact on rendering efficiency.
 */
export const PerformanceOptimization: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive performance optimization guide showcasing three distinct configuration profiles: High Performance (mobile-optimized), Balanced (desktop standard), and Premium (high-end hardware). Each profile demonstrates the trade-offs between visual fidelity and rendering performance.',
      },
    },
  },
  render: () => (
    <BackgroundWrapper backgroundImage={'https://images.unsplash.com/photo-1706705618478-505e088180c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532'} padding="60px 20px">
      <div style={{  margin: '0 auto', width: '100%' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1
            style={{
              color: '#fff',
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Performance Optimization
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.25rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Fine-tune AtomixGlass for optimal performance across different device capabilities
          </p>
        </div>

        {/* Performance Guidelines */}
        <AtomixGlass
          displacementScale={60}
          blurAmount={3}
          saturation={130}
          aberrationIntensity={1.2}
          elasticity={0}
          cornerRadius={16}
          mode="prominent"
          style={{ marginBottom: '48px' }}
        >
          <div style={{ padding: '32px' }}>
            <h2
              style={{
                color: '#fff',
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '24px',
                marginTop: 0,
              }}
            >
              Best Practices & Guidelines
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                color: '#fff',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  ⚡
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Limit Instances
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Use 3-5 glass components maximum per view to maintain optimal frame rates
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  📱
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Mobile Optimization
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Reduce complexity on mobile: lower displacement scale and disable hover effects
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  🎯
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                  Strategic Placement
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.85, margin: 0 }}>
                  Apply glass effects to focal points only—cards, modals, and navigation elements
                </p>
              </div>
            </div>
          </div>
        </AtomixGlass>

        {/* Configuration Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {/* High Performance Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#34C759',
                  boxShadow: '0 0 12px rgba(52, 199, 89, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                High Performance
              </h3>
            </div>
            <AtomixGlass
              displacementScale={25}
              blurAmount={0.2}
              saturation={120}
              aberrationIntensity={0.8}
              elasticity={0.8}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(52, 199, 89, 0.2)',
                    color: '#34C759',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>🚀</span>
                  <span>OPTIMIZED</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  Mobile-First Configuration
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>25</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.2</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>120%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.8</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.8</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>Mobile devices & tablets</li>
                      <li>Multiple glass instances</li>
                      <li>Battery-constrained devices</li>
                      <li>Background animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>

          {/* Balanced Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9500',
                  boxShadow: '0 0 12px rgba(255, 149, 0, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Balanced
              </h3>
            </div>
            <AtomixGlass
              displacementScale={55}
              blurAmount={0.4}
              saturation={150}
              aberrationIntensity={1.8}
              elasticity={0.15}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 149, 0, 0.2)',
                    color: '#FF9500',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>⚖️</span>
                  <span>RECOMMENDED</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  Production Standard
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>55</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.4</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>150%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>1.8</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.15</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>Desktop applications</li>
                      <li>Modern web browsers</li>
                      <li>Mid-range devices</li>
                      <li>General use cases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>

          {/* Premium Profile */}
          <div>
            <div
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#AF52DE',
                  boxShadow: '0 0 12px rgba(175, 82, 222, 0.6)',
                }}
              />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Premium
              </h3>
            </div>
            <AtomixGlass
              displacementScale={85}
              blurAmount={0.8}
              saturation={180}
              aberrationIntensity={3.2}
              elasticity={0.22}
              cornerRadius={12}
              mode="standard"
              style={{ height: '100%', minHeight: '400px' }}
            >
              <div
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(175, 82, 222, 0.2)',
                    color: '#AF52DE',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span>✨</span>
                  <span>PREMIUM</span>
                </div>
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                  }}
                >
                  High-Fidelity Visual
                </h4>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '12px',
                        fontSize: '0.9375rem',
                        lineHeight: '1.8',
                      }}
                    >
                      <span style={{ opacity: 0.85 }}>Displacement Scale:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>85</span>
                      <span style={{ opacity: 0.85 }}>Blur Amount:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.8</span>
                      <span style={{ opacity: 0.85 }}>Saturation:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>180%</span>
                      <span style={{ opacity: 0.85 }}>Aberration:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>3.2</span>
                      <span style={{ opacity: 0.85 }}>Elasticity:</span>
                      <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>0.22</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Best For:</strong>
                    <ul style={{ margin: 0, paddingLeft: '20px', opacity: 0.85 }}>
                      <li>High-end hardware</li>
                      <li>Hero sections & CTAs</li>
                      <li>Premium experiences</li>
                      <li>Single focal elements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
};
