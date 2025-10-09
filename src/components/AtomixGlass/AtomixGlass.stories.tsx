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
          <button className="c-btn c-btn--primary">Explore</button>
          <button className="c-btn c-btn--outline-light">Learn More</button>
        </div>
      </div>
    ),
    displacementScale: 100, // Using component default
    blurAmount: 1, // Using component default
    saturation: 140, // Using component default
    aberrationIntensity: 2, // Using component default
    elasticity: 0.15, // Using component default
    cornerRadius: 40, // Using component default
    padding: '0 0', // Using component default
    overLight: false, // Using component default
    mode: 'standard', // Using component default
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage={backgrounds.blueGradient}
        height="70vh"
        width="90vw"
        overlayOpacity={0.1}
        overlayColor="rgba(0,0,0,0.2)"
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

// Interactive demo with controls
export const Interactive: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isClicked, setIsClicked] = useState(false);

    return (
      <BackgroundWrapper
        backgroundImage={backgrounds.purpleGradient}
        height="65vh"
        overlayOpacity={0.15}
      >
        <AtomixGlass
          {...args}
          onClick={() => {
            setIsActive(!isActive);
            setIsClicked(!isClicked);
          }}
        >
          <div style={{ padding: '30px', textAlign: 'center', minWidth: '300px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: 500 }}>
              Interactive Glass
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', lineHeight: 1.5 }}>
              {isClicked
                ? 'Thanks for clicking!'
                : 'Hover and click to see the interactive effects in action.'}
            </p>
            <button
              className={`c-btn c-btn--${isClicked ? 'success' : 'primary'}`}
              style={{ transition: 'all 0.3s ease' }}
            >
              {isClicked ? 'Clicked!' : 'Click Me'}
            </button>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  args: {
    displacementScale: 15,
    blurAmount: 0.0625,
    saturation: 200,
    aberrationIntensity: 3,
    elasticity: 0.2,
    cornerRadius: 15,
    padding: '0 0',
    overLight: false,
    mode: 'standard',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive example that demonstrates the hover and click effects of the AtomixGlass component. Try hovering and clicking to see the glass react to user interactions.',
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
 * ModeShowcase Story
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
export const ModeShowcase: Story = {
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
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Standard glass effect with balanced displacement and aberration',
        color: '#ffffff',
      },
      polar: {
        displacementScale: 120,
        blurAmount: 0,
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Polar displacement creates a circular refraction pattern',
        color: '#f0f8ff',
      },
      prominent: {
        displacementScale: 100,
        blurAmount: 0,
        saturation: 140,
        aberrationIntensity: 'default',
        description: 'Enhanced displacement with stronger edge effects',
        color: '#ffffff',
      },
      shader: {
        displacementScale: 200,
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
        height="95vh"
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
 * Apple-inspired UI example showcasing the liquid glass effect
 *
 * This story demonstrates how to create Apple-like interfaces using the AtomixGlass component,
 * mimicking the frosted glass effect seen in macOS and iOS with realistic design elements
 * and interactions that closely resemble Apple's design language.
 */
export const AppleInspiredUI: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentTime, setCurrentTime] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hoverDockItem, setHoverDockItem] = useState<number | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notificationCount, setNotificationCount] = useState(3);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Update time every minute
      const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      };

      updateTime(); // Initial call
      const interval = setInterval(updateTime, 60000);

      return () => clearInterval(interval);
    }, []);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    // Apple-style app icons with gradient backgrounds
    const appIcons = [
      { name: 'Photos', color: 'linear-gradient(135deg, #FF9500, #FF2D55)', symbol: '📷' },
      { name: 'Music', color: 'linear-gradient(135deg, #FF2D55, #AF52DE)', symbol: '🎵' },
      { name: 'Mail', color: 'linear-gradient(135deg, #5AC8FA, #007AFF)', symbol: '✉️' },
      { name: 'Maps', color: 'linear-gradient(135deg, #34C759, #5AC8FA)', symbol: '🗺️' },
      { name: 'Weather', color: 'linear-gradient(135deg, #007AFF, #5AC8FA)', symbol: '☀️' },
      { name: 'Notes', color: 'linear-gradient(135deg, #FFCC00, #FF9500)', symbol: '📝' },
    ];

    // Dock apps with more realistic icons
    const dockApps = [
      { name: 'Finder', symbol: '🔍', color: 'linear-gradient(135deg, #1E88E5, #64B5F6)' },
      { name: 'Safari', symbol: '🧭', color: 'linear-gradient(135deg, #039BE5, #81D4FA)' },
      { name: 'Messages', symbol: '💬', color: 'linear-gradient(135deg, #43A047, #81C784)' },
      { name: 'Calendar', symbol: '📅', color: 'linear-gradient(135deg, #E53935, #EF5350)' },
      { name: 'Photos', symbol: '🖼️', color: 'linear-gradient(135deg, #8E24AA, #BA68C8)' },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={'https://images.pexels.com/photos/18772443/pexels-photo-18772443.jpeg'}
        height="90vh"
        style={{ maxWidth: '90vw', padding: '10px' }}
      >
        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '90vh',
            width: '100%',
          }}
        >
          {/* Top menu bar - macOS style with improved design */}

          <AtomixGlass
            displacementScale={15}
            blurAmount={2}
            saturation={150}
            aberrationIntensity={0.2}
            cornerRadius={8}
            mode="shader"
            elasticity={0}
          >
            <div
              style={{
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '77vw',
              }}
            >
              {/* Apple logo and app menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#fff' }}>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '22px' }}>🍎</span>
                  <span>Atomix</span>
                </span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['Finder', 'File', 'Edit', 'View', 'Window', 'Help'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab.toLowerCase())}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor:
                          activeTab === tab.toLowerCase()
                            ? 'rgba(255,255,255,0.15)'
                            : 'transparent',
                        transition: 'all 0.2s ease',
                        fontSize: '13px',
                        fontWeight: activeTab === tab.toLowerCase() ? 600 : 400,
                        color: 'inherit',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#fff' }}>
                {/* Battery indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '10px',
                      border: '1px solid currentColor',
                      borderRadius: '2px',
                      position: 'relative',
                      marginRight: '2px',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '1px',
                        top: '1px',
                        bottom: '1px',
                        width: '12px',
                        backgroundColor: 'currentColor',
                        borderRadius: '1px',
                      }}
                    ></span>
                    <span
                      style={{
                        position: 'absolute',
                        right: '-4px',
                        top: '2px',
                        width: '2px',
                        height: '6px',
                        backgroundColor: 'currentColor',
                        borderRadius: '0 1px 1px 0',
                      }}
                    ></span>
                  </span>
                  <span>75%</span>
                </div>

                {/* WiFi icon */}
                <div style={{ fontSize: '14px' }}>📶</div>

                {/* Time */}
                <span style={{ fontSize: '13px', fontWeight: 500 }}>
                  {currentTime || '10:30 AM'}
                </span>

                {/* User profile */}
                <div
                  style={{
                    position: 'relative',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #64B5F6, #1976D2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  }}
                >
                  A
                  {notificationCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: '#FF3B30',
                        color: 'white',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.8)',
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AtomixGlass>
          {/* Center widget - iOS style with improved design */}
          <AtomixGlass
            displacementScale={15}
            blurAmount={2}
            saturation={150}
            aberrationIntensity={0.1}
            cornerRadius={24}
            mode="shader"
          >
            <div style={{ padding: '30px' }}>
              <h2
                style={{
                  marginTop: 0,
                  fontSize: '26px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome to Atomix OS
              </h2>

              {/* App grid with improved styling */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '28px',
                }}
              >
                {appIcons.map(app => (
                  <div
                    key={app.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: app.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                        transform: 'translateY(0)',
                        // Note: React inline styles don't support pseudo-classes like :hover
                        // For hover effects, use CSS classes or onMouseEnter/onMouseLeave handlers
                      }}
                    >
                      {app.symbol}
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        opacity: 0.9,
                      }}
                    >
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Notification card with improved design */}
              <AtomixGlass
                displacementScale={12}
                blurAmount={5}
                saturation={130}
                aberrationIntensity={1}
                cornerRadius={16}
                elasticity={0}
                mode="shader"
              >
                <div style={{ padding: '18px', fontSize: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>📣</span>
                      <span>Notifications</span>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: 'rgba(255,45,85,0.2)',
                        color: '#FF2D55',
                        fontWeight: 600,
                      }}
                    >
                      {notificationCount} New
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '10px 0',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                        New Atomix Glass Component
                      </div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>
                        Experience the next generation of UI effects
                      </div>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      ✨
                    </div>
                  </div>
                </div>
              </AtomixGlass>
            </div>
          </AtomixGlass>

          {/* Bottom dock - macOS style with improved design and hover effects */}
          <AtomixGlass
            displacementScale={15}
            blurAmount={2}
            saturation={140}
            aberrationIntensity={1.2}
            cornerRadius={24}
            mode="polar"
            style={{
              maxWidth: '600px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                padding: '6px',
              }}
            >
              {dockApps.map((app, index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: app.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform:
                      hoverDockItem === index
                        ? 'translateY(-10px) scale(1.1)'
                        : 'translateY(0) scale(1)',
                    boxShadow:
                      hoverDockItem === index
                        ? '0 10px 20px rgba(0,0,0,0.2)'
                        : '0 4px 10px rgba(0,0,0,0.1)',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoverDockItem(index)}
                  onMouseLeave={() => setHoverDockItem(null)}
                >
                  {app.symbol}
                  {/* App name tooltip on hover */}
                  {hoverDockItem === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.name}
                    </div>
                  )}
                </div>
              ))}

              {/* Separator line */}
              <div
                style={{
                  width: '1px',
                  height: '30px',
                  background: 'rgba(255,255,255,0.3)',
                  margin: '0 4px',
                }}
              ></div>

              {/* Trash icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform:
                    hoverDockItem === 999
                      ? 'translateY(-10px) scale(1.1)'
                      : 'translateY(0) scale(1)',
                  boxShadow:
                    hoverDockItem === 999
                      ? '0 10px 20px rgba(0,0,0,0.2)'
                      : '0 4px 10px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={() => setHoverDockItem(999)}
                onMouseLeave={() => setHoverDockItem(null)}
              >
                🗑️
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An enhanced Apple-inspired UI example showcasing how to create macOS and iOS-like interfaces using the AtomixGlass component. This example includes a realistic menu bar with status icons, app grid with gradient icons, notification center, and an interactive dock with hover effects - all with the signature Apple frosted glass aesthetic.',
      },
    },
  },
};

// Hero section example
export const HeroExample: Story = {
  render: () => (
    <BackgroundWrapper backgroundImage={backgroundImages[0]} height="90vh">
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <AtomixGlass
            displacementScale={45}
            blurAmount={0.08}
            saturation={170}
            aberrationIntensity={2.5}
            elasticity={0.18}
            cornerRadius={30}
            mode="standard"
            style={{ maxWidth: '800px' }}
          >
            <div style={{ padding: '40px 60px', color: 'white' }}>
              <h1 style={{ marginTop: 0, fontSize: '2.5rem' }}>Modern Glass UI</h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Create stunning interfaces with the AtomixGlass component. Perfect for modern, sleek
                designs that stand out.
              </p>
              <div
                style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline-light">Learn More</button>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </div>
    </BackgroundWrapper>
  ),
};

export const PerformanceOptimization: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates performance optimization techniques for the AtomixGlass component. It shows how different settings affect performance and provides best practices for optimal usage.',
      },
    },
  },
  render: () => (
    <BackgroundWrapper backgroundIndex={3} overlay={true}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ color: '#fff', marginBottom: '30px', textAlign: 'center' }}>
          Performance Optimization Guide
        </h2>

        <div
          style={{
            marginBottom: '40px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ color: '#fff', marginBottom: '15px' }}>Best Practices</h3>
          <ul style={{ color: '#fff', lineHeight: '1.6' }}>
            <li>
              <strong>Limit the number of instances</strong> - Use AtomixGlass components sparingly
              on a single page
            </li>
            <li>
              <strong>Optimize size</strong> - Smaller glass components perform better than
              full-screen ones
            </li>
            <li>
              <strong>Reduce complexity for mobile</strong> - Use simpler settings on mobile devices
            </li>
            <li>
              <strong>Disable effects when not needed</strong> - Turn off hover effects for
              non-interactive elements
            </li>
            <li>
              <strong>Use appropriate mode</strong> - Choose the right mode based on performance
              requirements
            </li>
          </ul>
        </div>

        <div className="o-grid">
          <div className="o-grid__row">
            <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>
                High Performance Configuration
              </h3>
              <AtomixGlass
                displacementScale={25}
                blurAmount={0.02}
                saturation={120}
                aberrationIntensity={0.8}
                elasticity={0.1}
                cornerRadius={10}
                mode="standard"
                reducedMotion={false}
                disableEffects={false}
                style={{ height: '100%', minHeight: '200px' }}
              >
                <div style={{ padding: '20px' }}>
                  <h4 style={{ marginTop: 0 }}>Optimized for Performance</h4>
                  <p>This configuration prioritizes performance over visual effects:</p>
                  <ul>
                    <li>Low displacement scale (25)</li>
                    <li>Minimal blur amount (0.02)</li>
                    <li>Reduced saturation (120%)</li>
                    <li>Simple mode with no hover effects</li>
                    <li>No border effects</li>
                  </ul>
                  <p>
                    <strong>Best for:</strong> Mobile devices, pages with multiple instances, or
                    low-end hardware
                  </p>
                </div>
              </AtomixGlass>
            </div>

            <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
              <h3 style={{ color: '#fff', marginBottom: '15px' }}>Balanced Configuration</h3>
              <AtomixGlass
                displacementScale={55}
                blurAmount={0.04}
                saturation={150}
                aberrationIntensity={1.8}
                elasticity={0.15}
                cornerRadius={15}
                mode="standard"
                enablePerformanceMonitoring={true}
                style={{ height: '100%', minHeight: '200px' }}
              >
                <div style={{ padding: '20px' }}>
                  <h4 style={{ marginTop: 0 }}>Balanced Approach</h4>
                  <p>This configuration balances performance and visual appeal:</p>
                  <ul>
                    <li>Moderate displacement scale (55)</li>
                    <li>Medium blur amount (0.04)</li>
                    <li>Balanced saturation (150%)</li>
                    <li>Normal mode with subtle hover effects</li>
                    <li>Minimal border effects</li>
                  </ul>
                  <p>
                    <strong>Best for:</strong> Most desktop applications and modern devices
                  </p>
                </div>
              </AtomixGlass>
            </div>
          </div>

          <div className="o-grid__row" style={{ marginTop: '30px' }}>
            <div className="o-grid__col o-grid__col--12">
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '20px',
                  borderRadius: '10px',
                }}
              >
                <h3 style={{ color: '#fff', marginBottom: '15px' }}>Performance Monitoring Tips</h3>
                <ol style={{ color: '#fff', lineHeight: '1.6' }}>
                  <li>Use browser developer tools to monitor performance</li>
                  <li>Check for dropped frames in the Performance panel</li>
                  <li>Monitor GPU usage when using advanced effects</li>
                  <li>Test on various devices to ensure consistent performance</li>
                  <li>
                    Consider using the <code>React.memo</code> HOC to prevent unnecessary re-renders
                  </li>
                </ol>

                <div
                  style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '5px',
                  }}
                >
                  <h4 style={{ color: '#fff', marginBottom: '10px' }}>
                    Code Example: Optimized Usage
                  </h4>
                  <pre
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: '15px',
                      borderRadius: '5px',
                      overflow: 'auto',
                    }}
                  >
                    <code style={{ color: '#e6e6e6', display: 'block', fontFamily: 'monospace' }}>
                      {`import React, { memo } from 'react';
import AtomixGlass from './AtomixGlass';

// Use memo to prevent unnecessary re-renders
const OptimizedGlassCard = memo(({ title, content }) => {
  // Adjust settings based on device capability
  const isMobile = window.innerWidth < 768;

  return (
    <AtomixGlass
      displacementScale={isMobile ? 10 : 20}
      blurAmount={isMobile ? 5 : 10}
      saturation={isMobile ? 120 : 150}
      aberrationIntensity={isMobile ? 0.5 : 1.5}
      mode={isMobile ? "simple" : "normal"}
      showHoverEffects={!isMobile}
    >
      <div style={{ padding: '20px' }}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </AtomixGlass>
  );
});

export default OptimizedGlassCard;`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
};

/**
 * Interactive Playground story with dynamic controls for all component props
 *
 * This story provides a comprehensive playground for experimenting with all
 * AtomixGlass component properties in real-time.
 */
export const InteractivePlayground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      displacementScale: 70,
      blurAmount: 1,
      saturation: 140,
      aberrationIntensity: 2,
      cornerRadius: 20,
      mode: 'standard' as const,
      showBorderEffects: true,
      showHoverEffects: true,
      overLight: false,
      background: backgrounds.blueGradient,
      useVideoBackground: false,
      elasticity: 0.15,
    });

    const handleChange = (property: string, value: any) => {
      setSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    const modes = ['standard', 'polar', 'prominent', 'shader'] as const;
    const backgroundOptions = Object.entries(backgrounds).map(([key, value]) => ({
      label: key,
      value,
    }));

    // Control panel styles
    const controlPanelStyle = {
      width: '400px',
      padding: '20px',
      borderRadius: '12px',
      background: 'rgba(0,0,0,0.7)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      color: 'white',
      fontSize: '14px',
    };

    const sliderContainerStyle = {
      marginBottom: '16px',
    };

    const sliderLabelStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px',
    };

    const sliderStyle = {
      width: '100%',
      accentColor: '#6366f1',
    };

    const selectStyle = {
      width: '100%',
      padding: '8px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '4px',
      marginBottom: '16px',
    };

    const checkboxContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      gap: '8px',
    };

    return (
      <BackgroundWrapper
        backgroundImage={settings.useVideoBackground ? 'transparent' : settings.background}
        height="80vh"
        style={{ maxWidth: '1400px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Control Panel */}
        <div style={controlPanelStyle}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', textAlign: 'center' }}>
            AtomixGlass Controls
          </h3>

          {/* Displacement Scale */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="displacementScale">Displacement Scale</label>
              <span>{settings.displacementScale}</span>
            </div>
            <input
              type="range"
              id="displacementScale"
              min="0"
              max="100"
              value={settings.displacementScale}
              onChange={e => handleChange('displacementScale', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Blur Amount */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="blurAmount">Blur Amount</label>
              <span>{settings.blurAmount}</span>
            </div>
            <input
              type="range"
              id="blurAmount"
              min="0"
              max="20"
              step="0.05"
              value={settings.blurAmount}
              onChange={e => handleChange('blurAmount', parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Saturation */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="saturation">Saturation</label>
              <span>{settings.saturation}%</span>
            </div>
            <input
              type="range"
              id="saturation"
              min="0"
              max="300"
              value={settings.saturation}
              onChange={e => handleChange('saturation', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Aberration Intensity */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="aberrationIntensity">Aberration Intensity</label>
              <span>{settings.aberrationIntensity}</span>
            </div>
            <input
              type="range"
              id="aberrationIntensity"
              min="0"
              max="10"
              step="0.1"
              value={settings.aberrationIntensity}
              onChange={e => handleChange('aberrationIntensity', parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Corner Radius */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="cornerRadius">Corner Radius</label>
              <span>{settings.cornerRadius}px</span>
            </div>
            <input
              type="range"
              id="cornerRadius"
              min="0"
              max="50"
              value={settings.cornerRadius}
              onChange={e => handleChange('cornerRadius', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Elasticity */}
          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <label htmlFor="elasticity">Elasticity</label>
              <span>{settings.elasticity}</span>
            </div>
            <input
              type="range"
              id="elasticity"
              min="0"
              max="1"
              step="0.01"
              value={settings.elasticity}
              onChange={e => handleChange('elasticity', e.target.value)}
              style={sliderStyle}
            />
          </div>

          {/* Mode Select */}
          <label htmlFor="mode" style={{ display: 'block', marginBottom: '6px' }}>
            Mode
          </label>
          <select
            id="mode"
            value={settings.mode}
            onChange={e => handleChange('mode', e.target.value)}
            style={selectStyle}
          >
            {modes.map(mode => (
              <option key={mode} value={mode}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </option>
            ))}
          </select>

          {/* Background Select */}
          <label htmlFor="background" style={{ display: 'block', marginBottom: '6px' }}>
            Background
          </label>
          <select
            id="background"
            value={settings.background}
            onChange={e => handleChange('background', e.target.value)}
            style={selectStyle}
          >
            {backgroundOptions.map(option => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Checkboxes */}
          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="showBorderEffects"
              checked={settings.showBorderEffects}
              onChange={e => handleChange('showBorderEffects', e.target.checked)}
            />
            <label htmlFor="showBorderEffects">Show Border Effects</label>
          </div>

          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="showHoverEffects"
              checked={settings.showHoverEffects}
              onChange={e => handleChange('showHoverEffects', e.target.checked)}
            />
            <label htmlFor="showHoverEffects">Show Hover Effects</label>
          </div>

          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="overLight"
              checked={settings.overLight}
              onChange={e => handleChange('overLight', e.target.checked)}
            />
            <label htmlFor="overLight">Over Light</label>
          </div>

          <div style={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="useVideoBackground"
              checked={settings.useVideoBackground}
              onChange={e => handleChange('useVideoBackground', e.target.checked)}
            />
            <label htmlFor="useVideoBackground">Use Video Background</label>
          </div>
        </div>

        {/* Video Background */}
        {settings.useVideoBackground && (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source src={backgrounds.videoBackground} type="video/mp4" />
          </video>
        )}

        {/* Glass Component Preview */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            paddingLeft: '300px', // Make room for the control panel
          }}
        >
          <AtomixGlass
            displacementScale={settings.displacementScale}
            blurAmount={settings.blurAmount}
            saturation={settings.saturation}
            aberrationIntensity={settings.aberrationIntensity}
            cornerRadius={settings.cornerRadius}
            mode={settings.mode}
            overLight={settings.overLight}
            elasticity={settings.elasticity}
            style={{ width: '400px', maxWidth: '100%' }}
          >
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0, fontSize: '24px', fontWeight: 500, marginBottom: '16px' }}>
                Interactive Preview
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
                Adjust the controls on the left to see how different properties affect the glass
                effect in real-time.
                {settings.useVideoBackground &&
                  ' Try the video background for an enhanced experience!'}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <Button label="Primary" variant="primary" glass={{ elasticity: 0 }} />
                <Button label="secondary" variant="secondary" glass={{ elasticity: 0 }} />
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive playground that allows you to experiment with all AtomixGlass component properties in real-time. Use the control panel to adjust settings and see how they affect the appearance and behavior of the glass effect. Toggle the video background option to see how the glass effect works with dynamic content.',
      },
    },
  },
};

// Accessibility example
/**
 * Accessible Example - Demonstrates accessibility best practices
 *
 * This story showcases how to implement accessibility features with AtomixGlass
 * components, ensuring they are usable by people with disabilities.
 */
export const AccessibleExample: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage={backgrounds.abstract2}
      height="70vh"
      width="90vw"
      overlayOpacity={0.1}
      aria-hidden="false"
    >
      <AtomixGlass
        displacementScale={40}
        blurAmount={1}
        saturation={160}
        aberrationIntensity={1.5}
        elasticity={0}
        cornerRadius={15}
        aria-label="Contact form container"
        aria-describedby="form-description"
        role="region"
        tabIndex={-1}
        reducedMotion={false}
        highContrast={false}
        style={{
          width: '400px',
          cursor: 'default',
        }}
      >
        <div style={{ padding: '30px' }}>
          <h2
            id="form-title"
            style={{
              marginTop: 0,
              fontSize: '24px',
              marginBottom: '20px',
              color: '#ffffff',
            }}
          >
            Contact Us
          </h2>
          width: '80%',
          {/* Adding description for screen readers */}
          <p id="form-description" style={{ marginBottom: '20px', fontSize: '16px' }}>
            Please fill out the form below to get in touch with our team.
          </p>
          <form aria-describedby="form-description">
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Name{' '}
                <span aria-hidden="true" style={{ color: '#ff3b30' }}>
                  *
                </span>
              </label>
              <input
                id="name"
                type="text"
                aria-required="true"
                aria-invalid="false"
                aria-describedby="name-error"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '16px',
                }}
              />
              <div
                id="name-error"
                role="alert"
                style={{
                  height: '20px',
                  fontSize: '14px',
                  color: '#ff3b30',
                  marginTop: '4px',
                }}
              ></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Email{' '}
                <span aria-hidden="true" style={{ color: '#ff3b30' }}>
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                aria-required="true"
                aria-invalid="false"
                aria-describedby="email-error"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '16px',
                }}
              />
              <div
                id="email-error"
                role="alert"
                style={{
                  height: '20px',
                  fontSize: '14px',
                  color: '#ff3b30',
                  marginTop: '4px',
                }}
              ></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                }}
              >
                Message{' '}
                <span aria-hidden="true" style={{ color: '#ff3b30' }}>
                  *
                </span>
              </label>
              <textarea
                id="message"
                rows={4}
                aria-required="true"
                aria-invalid="false"
                aria-describedby="message-error"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '16px',
                  resize: 'vertical',
                }}
              />
              <div
                id="message-error"
                role="alert"
                style={{
                  height: '20px',
                  fontSize: '14px',
                  color: '#ff3b30',
                  marginTop: '4px',
                }}
              ></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="privacy-policy"
                  type="checkbox"
                  aria-required="true"
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                  }}
                />
                <label htmlFor="privacy-policy">
                  I agree to the{' '}
                  <a href="#" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <button type="submit" className="c-btn c-btn--primary" aria-label="Submit contact form">
              Send Message
            </button>
          </form>
        </div>
      </AtomixGlass>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'An example showcasing accessibility features with the AtomixGlass component. This form includes proper ARIA attributes, semantic HTML, and keyboard navigation support.',
      },
    },
  },
};

/**
 * Mobile UI Example - Showcases the component on smaller screens
 *
 * This story demonstrates how AtomixGlass components can be used to create
 * mobile-friendly interfaces with responsive design and touch interactions.
 */
export const MobileUIExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notificationCount, setNotificationCount] = useState(3);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    const clearNotifications = () => {
      setNotificationCount(0);
    };

    // Mobile device frame styles
    const phoneFrameStyle = {
      width: '375px',
      height: '667px',
      borderRadius: '36px',
      padding: '12px',
      boxShadow: '0 -25px 50px 12px rgba(255, 255, 255, 0.3)',
      position: 'relative' as const,
      backdropFilter: 'blur(12px)',
    };

    const phoneScreenStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '24px',
      position: 'relative' as const,
      backgroundImage:
        'url(https://images.unsplash.com/photo-1759691397916-abc3fe1dbb43?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover' as const,
      backgroundPosition: 'center' as const,
      color: 'white',
    };

    const phoneNotchStyle = {
      position: 'absolute' as const,
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '180px',
      height: '30px',
      borderBottomLeftRadius: '14px',
      borderBottomRightRadius: '14px',
      background: '#000',
      zIndex: 10,
    };

    // App content styles
    const appContentStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
    };

    const headerStyle = {
      padding: '50px 20px 15px',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '24px',
      background: 'linear-gradient(to bottom, rgba(255,255,255, 0.2), rgba(0,0,0,0.1))',
    };

    const mainContentStyle = {
      flex: 1,
      padding: '0 15px',
    };

    // Tab content based on active tab
    const renderTabContent = () => {
      switch (activeTab) {
        case 'home':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={24}
                mode="prominent"
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                    borderRadius: '24px',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'white' }}>
                    Welcome Back
                  </h3>
                  <p
                    style={{
                      margin: '0 0 15px 0',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: 'white',
                    }}
                  >
                    Your daily summary and activity feed
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '15px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      👤
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: 'white' }}>User Profile</div>
                      <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                        View your account
                      </div>
                    </div>
                  </div>
                </div>
              </AtomixGlass>

              <div style={{ height: '15px' }} />

              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                saturation={185}
                elasticity={0.2}
                cornerRadius={30}
                mode="standard"
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(0,0,0,0.1))',
                    borderRadius: '30px',
                  }}
                >
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: 'white' }}>
                    Recent Activity
                  </h3>
                  {[1, 2, 3].map(item => (
                    <div
                      key={item}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.15), rgba(0,0,0,0.15))',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          color: 'white',
                          background:
                            'linear-gradient(to left, rgba(255,255,255,0.15), rgba(0,0,0,0.15))',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {item === 1 ? '📝' : item === 2 ? '🔔' : '💬'}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: 'white' }}>
                          {item === 1
                            ? 'New document created'
                            : item === 2
                              ? 'Reminder: Meeting at 3 PM'
                              : 'New message from Sarah'}
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                          {item === 1 ? '5 minutes ago' : item === 2 ? '1 hour ago' : '3 hours ago'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AtomixGlass>
            </div>
          );
        case 'search':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={220}
                blurAmount={0}
                cornerRadius={15}
                mode="shader"
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '15px',
                    borderRadius: '15px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      background: 'linear-gradient(to top, rgba(255,255,255,0.3), rgba(0,0,0,0.3))',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search..."
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'white',
                        width: '100%',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>
              </AtomixGlass>

              <div style={{ height: '15px' }} />

              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={15}
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '15px',
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>
                    Search Categories
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['Photos', 'Documents', 'Messages', 'Settings'].map(category => (
                      <div
                        key={category}
                        style={{
                          padding: '15px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          textAlign: 'center',
                          fontSize: '14px',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </AtomixGlass>
            </div>
          );
        case 'notifications':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={15}
                mode="standard"
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>Notifications</h3>
                    <button
                      onClick={clearNotifications}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        fontSize: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      Clear All
                    </button>
                  </div>

                  {notificationCount > 0 ? (
                    Array.from({ length: notificationCount }).map((_, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          backdropFilter: 'blur(10px)',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '16px',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            {index === 0 ? '📱' : index === 1 ? '🔔' : '✉️'}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>
                              {index === 0
                                ? 'New Login Detected'
                                : index === 1
                                  ? 'Calendar Reminder'
                                  : 'New Message'}
                            </div>
                            <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                              {index === 0
                                ? 'A new device logged into your account'
                                : index === 1
                                  ? 'Meeting with design team in 30 minutes'
                                  : 'Sarah sent you a new message'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '30px 0',
                        opacity: 0.7,
                        fontSize: '14px',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      No new notifications
                    </div>
                  )}
                </div>
              </AtomixGlass>
            </div>
          );
        case 'profile':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={120}
                blurAmount={0}
                saturation={180}
                elasticity={0.16}
                cornerRadius={15}
                mode="standard"
                onClick={() => null}
                overLight={false}
              >
                <div
                  style={{
                    padding: '25px 20px',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      marginBottom: '15px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    👤
                  </div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'white' }}>
                    User Name
                  </h3>
                  <p
                    style={{ margin: '0 0 20px 0', fontSize: '14px', opacity: 0.7, color: 'white' }}
                  >
                    user@example.com
                  </p>
                  <Button label="Edit Profile" variant="erorr" size="md" />
                  <Button
                    glass
                    label="Settings"
                    variant="dark"
                    size="md"
                  />
                    
                </div>
              </AtomixGlass>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1649718347807-322222472ed9?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        height="90vh"
        style={{
          maxWidth: '1400px',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '300px' }}>
            <h2
              style={{
                margin: '0 0 20px 0',
                fontSize: '28px',
                fontWeight: 500,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Mobile UI Example
            </h2>

            <p
              style={{
                fontSize: '16px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              AtomixGlass components optimized for mobile interfaces with touch-friendly controls
            </p>
          </div>
          {/* Phone frame */}
          <div style={phoneFrameStyle}>
            <div style={phoneScreenStyle}>
              <div style={phoneNotchStyle} />

              {/* App content */}
              <div style={appContentStyle}>
                {/* Header */}
                <AtomixGlass
                  displacementScale={260}
                  blurAmount={2}
                  saturation={180}
                  elasticity={0}
                  cornerRadius={26}
                  mode="shader"
                  onClick={() => null}
                  overLight={false}
                >
                  <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '18px' }}>
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      👤
                    </div>
                  </div>
                </AtomixGlass>

                {/* Main content area */}
                <div style={mainContentStyle}>{renderTabContent()}</div>

                {/* Bottom navigation */}
                <AtomixGlass
                  displacementScale={100}
                  blurAmount={0}
                  elasticity={0}
                  cornerRadius={18}
                  mode="shader"
                  onClick={() => null}
                  overLight={false}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      padding: '5px 10px',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.1))',
                      borderRadius: '18px',
                    }}
                  >
                    {[
                      { id: 'home', icon: '🏠' },
                      { id: 'search', icon: '🔍' },
                      { id: 'notifications', icon: '🔔', badge: notificationCount },
                      { id: 'profile', icon: '👤' },
                    ].map(tab => (
                      <div
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          opacity: activeTab === tab.id ? 1 : 0.6,
                          position: 'relative',
                          padding: '10px 20px',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '10px',
                          background: 'linear-gradient(to left, rgba(255,255,255,0.5), rgba(0,0,0,0.5))',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{tab.icon}</div>
                        {tab.badge && tab.badge > 0 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-5px',
                              background: 'linear-gradient(to top, rgba(255,0,0,0.6), rgba(255,0,0,7))',
                              color: 'white',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            {tab.badge}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AtomixGlass>
              </div>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates how AtomixGlass components can be optimized for mobile interfaces. The design showcases a complete mobile app UI with navigation tabs, responsive layouts, and touch-friendly controls. The glass effect provides a modern and elegant look while maintaining excellent readability and usability on smaller screens.',
      },
    },
  },
};

// Theme switching example
export const ThemeSwitching: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
      <BackgroundWrapper
        backgroundImage={
          theme === 'light'
            ? backgroundImages[6] // Cozy café interior for light theme
            : backgroundImages[7] // Desert landscape for dark theme
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <AtomixGlass
            displacementScale={60}
            blurAmount={1}
            saturation={theme === 'light' ? 120 : 160}
            aberrationIntensity={2.2}
            elasticity={0.15}
            cornerRadius={20}
            overLight={true}
            mode="standard"
            style={{ width: '350px' }}
          >
            <div style={{ padding: '25px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0 }}>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</h2>
              <p>The glass effect adapts to different background themes.</p>
              <button
                className={`u-mt-4 c-btn c-btn--${theme === 'light' ? 'primary' : 'outline-light'}`}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
              </button>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
};

/**
 * Video Background Example
 * Demonstrates the glass effect over a moving video background
 */
export const VideoBackground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [glassSettings, setGlassSettings] = useState({
      displacementScale: 80,
      blurAmount: 0,
      saturation: 150,
      aberrationIntensity: 0,
      cornerRadius: 24,
      mode: 'standard' as const,
    });

    const updateSettings = (property: string, value: any) => {
      setGlassSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    return (
      <div style={{ position: 'relative', height: '80vh', width: '90vw', overflow: 'hidden' }}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={backgrounds.videoBackground} type="video/mp4" />
        </video>

        {/* Content over video */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '40px',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Main Glass Card */}
          <AtomixGlass
            displacementScale={glassSettings.displacementScale}
            blurAmount={glassSettings.blurAmount}
            saturation={glassSettings.saturation}
            aberrationIntensity={glassSettings.aberrationIntensity}
            cornerRadius={glassSettings.cornerRadius}
            mode={glassSettings.mode}
            style={{ width: '400px', maxWidth: '100%' }}
          >
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0, fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>
                Glass Over Video
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.9 }}>
                Experience the stunning glass morphism effect overlaid on dynamic video content. The
                glass element creates a sophisticated focal point while maintaining visual harmony
                with the moving background.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline">Learn More</button>
              </div>
            </div>
          </AtomixGlass>

          {/* Side Control Panel */}
          <AtomixGlass
            displacementScale={40}
            blurAmount={0.06}
            saturation={120}
            aberrationIntensity={1.5}
            cornerRadius={16}
            mode="standard"
            style={{ width: '300px', maxWidth: '100%' }}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '20px' }}>
                Live Controls
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Displacement: {glassSettings.displacementScale}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={glassSettings.displacementScale}
                  onChange={e => updateSettings('displacementScale', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Blur: {glassSettings.blurAmount}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={glassSettings.blurAmount}
                  onChange={e => updateSettings('blurAmount', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Saturation: {glassSettings.saturation}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={glassSettings.saturation}
                  onChange={e => updateSettings('saturation', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Aberration: {glassSettings.aberrationIntensity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={glassSettings.aberrationIntensity}
                  onChange={e => updateSettings('aberrationIntensity', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Corner Radius: {glassSettings.cornerRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glassSettings.cornerRadius}
                  onChange={e => updateSettings('cornerRadius', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <button
                className="c-btn c-btn--secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setGlassSettings({
                    displacementScale: 80,
                    blurAmount: 0.08,
                    saturation: 150,
                    aberrationIntensity: 2.5,
                    cornerRadius: 24,
                    mode: 'standard',
                  });
                }}
              >
                Reset Defaults
              </button>
            </div>
          </AtomixGlass>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases the AtomixGlass component over a dynamic video background, demonstrating how the glass effect creates stunning visual hierarchy and focus over moving content. Use the live controls to experiment with different settings and see how they affect the glass appearance in real-time.',
      },
    },
  },
};
