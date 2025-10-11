/**
 * AtomixGlassComprehensivePreview.stories.tsx
 *
 * A comprehensive showcase of the AtomixGlass component combining the best elements
 * from both existing stories files. This preview demonstrates the full range of
 * capabilities, use cases, and configuration options available in AtomixGlass.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import type { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from './AtomixGlass';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import React from 'react';
import type { RefObject } from 'react';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Callout } from '../Callout/Callout';
import {
  BackgroundWrapper as SharedBackgroundWrapper,
  backgrounds,
  backgroundImages as sharedBackgroundImages,
} from './stories/shared-components';

/**
 * Comprehensive meta configuration combining features from both stories
 */
const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Comprehensive Preview',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AtomixGlass Comprehensive Preview

This comprehensive showcase demonstrates the full range of AtomixGlass capabilities, combining the best elements from multiple story implementations. Explore different modes, interactive features, real-world applications, and optimization techniques.

## Key Features Demonstrated:
- **4 Glass Effect Modes**: Standard, Polar, Prominent, and Shader
- **Interactive Mouse Tracking**: Real-time displacement based on mouse movement
- **Performance Optimizations**: Mobile-friendly configurations and optimization techniques
- **Real-world Applications**: UI examples including mobile interfaces, Apple-inspired designs, and accessibility features
- **Customization Options**: Comprehensive controls for all visual parameters
        `,
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the glass effect',
    },
    displacementScale: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      description: 'Intensity of the displacement effect (0-200)',
    },
    blurAmount: {
      control: { type: 'range', min: -1, max: 1, step: 0.001 },
      description: 'Blur amount for the backdrop effect',
    },
    saturation: {
      control: { type: 'range', min: 100, max: 300, step: 5 },
      description: 'Color saturation percentage (100 = normal)',
    },
    aberrationIntensity: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      description: 'Chromatic aberration effect intensity',
    },
    elasticity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Mouse interaction responsiveness (0-1)',
    },
    cornerRadius: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Border radius in pixels',
    },
    overLight: {
      control: 'boolean',
      description: 'Optimize appearance for light backgrounds',
    },
    mode: {
      control: 'select',
      options: ['standard', 'polar', 'prominent', 'shader'],
      description: 'Glass effect rendering mode',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Enhanced Background Wrapper with dynamic background support
 */
interface BackgroundWrapperProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundIndex?: number;
  height?: string;
  width?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

/**
 * Interactive Container for mouse tracking across the entire viewport
 */
interface InteractiveContainerProps {
  children: (
    mousePos: { x: number; y: number },
    mouseOffset: { x: number; y: number },
    containerRef: RefObject<HTMLDivElement>
  ) => React.ReactNode;
  backgroundImage?: string;
  style?: React.CSSProperties;
}

/**
 * Collection of high-quality backgrounds optimized for glass effects
 */
const backgroundImages = [
  // Tech/Digital
  'https://images.unsplash.com/photo-1530569427831-a0a4b8a0d206?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // Purple Nebula
  'https://live.staticflickr.com/5472/30982547010_2a76a81546_k.jpg',
  // Urban Night
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop',
  // Abstract Waves
  'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop',
  // Natural Mountain
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  // Light Gradient
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // Interactive Space
  'https://images.unsplash.com/photo-1663882658055-40f1d4249867?q=80&w=3807&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

/**
 * Enhanced Background Wrapper Component
 */
const BackgroundWrapper = ({
  children,
  backgroundImage,
  backgroundIndex,
  height = '100vh',
  width = '100vw',
  style = {},
  interactive = false,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.3)',
  overlayOpacity = 0.3,
}: BackgroundWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const bgImage =
    backgroundIndex !== undefined ? backgroundImages[backgroundIndex] : backgroundImage;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && interactive) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = ((e.clientX - centerX) / rect.width) * 50;
        const offsetY = ((e.clientY - centerY) / rect.height) * 50;

        setBackgroundPosition({ x: offsetX, y: offsetY });
      }
    },
    [interactive]
  );

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef && interactive) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      return () => currentRef.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width,
        minHeight: height,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundColor: !bgImage ? '#1a1a2e' : undefined,
        backgroundSize: interactive ? '120%' : 'cover',
        backgroundPosition: interactive
          ? `calc(50% + ${backgroundPosition.x}px) calc(50% + ${backgroundPosition.y}px)`
          : 'center',
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...style,
      }}
    >
      {/* Overlay */}
      {(overlay || overlayOpacity > 0) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlay ? overlayColor : 'transparent',
            opacity: overlay ? overlayOpacity : 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', width: '100%', minHeight: '100%' }}>{children}</div>
    </div>
  );
};

/**
 * Interactive Container with mouse tracking
 */
const InteractiveContainer = ({ children }: InteractiveContainerProps) => {
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
    return () => currentRef?.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return <div ref={containerRef}>{children(mousePos, mouseOffset, containerRef)}</div>;
};

/**
 * COMPREHENSIVE SHOWCASE STORY
 *
 * This is the main showcase that demonstrates all AtomixGlass capabilities
 * in a single, comprehensive interface with multiple sections.
 */
export const ComprehensiveShowcase: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeSection, setActiveSection] = useState('overview');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedMode, setSelectedMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>(
      'standard'
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      displacementScale: 15,
      blurAmount: 0,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      cornerRadius: 20,
      overLight: false,
    });

    const sections = [
      { id: 'overview', label: '🏠 Overview', desc: 'Introduction and basic features' },
      { id: 'modes', label: '🎨 Modes', desc: 'All 4 glass effect modes' },
      { id: 'interactive', label: '🖱️ Interactive', desc: 'Mouse tracking effects' },
      { id: 'applications', label: '📱 Applications', desc: 'Real-world examples' },
      { id: 'playground', label: '🎮 Playground', desc: 'Live customization' },
      { id: 'performance', label: '⚡ Performance', desc: 'Optimization guide' },
    ];

    const modes = [
      {
        id: 'standard',
        name: 'Standard',
        desc: 'Balanced glass effect with uniform displacement',
        settings: { displacementScale: 120, aberrationIntensity: 2, saturation: 140 },
      },
      {
        id: 'polar',
        name: 'Polar',
        desc: 'Radial distortion creating circular patterns',
        settings: { displacementScale: 100, aberrationIntensity: 1.5, saturation: 160 },
      },
      {
        id: 'prominent',
        name: 'Prominent',
        desc: 'Enhanced effects for important UI elements',
        settings: { displacementScale: 150, aberrationIntensity: 3, saturation: 180 },
      },
      {
        id: 'shader',
        name: 'Shader',
        desc: 'Advanced WebGL-based liquid animations',
        settings: { displacementScale: 200, aberrationIntensity: 4, saturation: 200 },
      },
    ];

    const renderSection = () => {
      switch (activeSection) {
        case 'overview':
          return (
            <div
              style={{
                paddingTop: '5rem',
                paddingBottom: '4rem',
                paddingLeft: '1.25rem',
                paddingRight: '1.25rem',
              }}
            >
              <div className="o-container">
                {/* Hero Section */}
                <div className="u-mb-12 u-text-center">
                  <AtomixGlass
                    displacementScale={120}
                    blurAmount={0}
                    saturation={140}
                    aberrationIntensity={2}
                    cornerRadius={30}
                  >
                    <div style={{ padding: '3rem 4rem' }}>
                      <h1
                        className="u-mb-5 u-fw-semibold"
                        style={{
                          fontSize: '3rem',
                          background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        AtomixGlass
                      </h1>
                      <p
                        className="u-mb-8"
                        style={{
                          fontSize: '1.25rem',
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.9)',
                        }}
                      >
                        Create stunning glass morphism effects with realistic light refraction,
                        chromatic aberration, and interactive animations.
                      </p>
                      <div
                        className="u-d-flex u-justify-content-center u-flex-wrap"
                        style={{ gap: '1.25rem' }}
                      >
                        <Button variant="primary" size="lg">
                          Explore Features
                        </Button>
                        <Button variant="outline-light" size="lg">
                          View Documentation
                        </Button>
                      </div>
                    </div>
                  </AtomixGlass>
                </div>

                {/* Feature Grid */}
                <div className="o-grid">
                  {[
                    {
                      icon: '🎨',
                      title: '4 Glass Modes',
                      desc: 'Standard, Polar, Prominent, and Shader modes for different visual effects',
                    },
                    {
                      icon: '🖱️',
                      title: 'Interactive Effects',
                      desc: 'Real-time mouse tracking with customizable elasticity and responsiveness',
                    },
                    {
                      icon: '⚡',
                      title: 'Performance Optimized',
                      desc: 'Hardware-accelerated rendering with mobile-friendly configurations',
                    },
                    {
                      icon: '♿',
                      title: 'Accessible Design',
                      desc: 'WCAG 2.1 AA compliant with reduced motion and contrast support',
                    },
                  ].map((feature, index) => (
                    <div key={index} className="o-grid__col o-grid__col--3">
                      <Card
                        glass={{
                          displacementScale: 80,
                          blurAmount: 0,
                          saturation: 120,
                          aberrationIntensity: 1,
                          cornerRadius: 20,
                        }}
                        styles={{ height: '100%' }}
                      >
                        <div className="u-text-center" style={{ padding: '1.75rem' }}>
                          <div className="u-mb-4" style={{ fontSize: '3rem' }}>
                            {feature.icon}
                          </div>
                          <h3 className="u-mb-3 u-fw-medium" style={{ fontSize: '1.25rem' }}>
                            {feature.title}
                          </h3>
                          <p style={{ lineHeight: 1.5, opacity: 0.8 }}>{feature.desc}</p>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'modes':
          return (
            <div
              style={{
                paddingTop: '5rem',
                paddingBottom: '4rem',
                paddingLeft: '1.25rem',
                paddingRight: '1.25rem',
              }}
            >
              <div className="o-container">
                <div className="u-text-center u-mb-12">
                  <h2 className="u-mb-5 u-fw-semibold u-text-white" style={{ fontSize: '2.5rem' }}>
                    Glass Effect Modes
                  </h2>
                  <p
                    className="u-text-white u-mx-auto"
                    style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px' }}
                  >
                    Each mode provides unique visual characteristics optimized for different use
                    cases
                  </p>
                </div>

                <div className="o-grid">
                  {modes.map(mode => (
                    <div
                      key={mode.id}
                      className="o-grid__col o-grid__col--3"
                      style={{ marginBottom: '2rem' }}
                    >
                      <Card
                        glass={{
                          mode: mode.id as any,
                          displacementScale: mode.settings.displacementScale,
                          aberrationIntensity: mode.settings.aberrationIntensity,
                          saturation: mode.settings.saturation,
                          cornerRadius: 20,
                        }}
                        onClick={() => setSelectedMode(mode.id as any)}
                      >
                        <div className="u-text-center">
                          <Callout variant="success" glass oneLine className="u-mb-2">
                            <h4>✨ {mode.name} Mode</h4>
                          </Callout>

                          <p
                            className="u-mb-5"
                            style={{ fontSize: '1rem', lineHeight: 1.5, opacity: 0.8 }}
                          >
                            {mode.desc}
                          </p>

                          {/* Settings Display */}
                          <div
                            className="u-d-flex u-justify-content-center u-flex-wrap"
                            style={{ gap: '0.5rem' }}
                          >
                            <span
                              className="u-fs-xs"
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '50rem',
                                background: 'rgba(255,255,255,0.15)',
                              }}
                            >
                              Displacement: {mode.settings.displacementScale}
                            </span>
                            <span
                              className="u-fs-xs"
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '50rem',
                                background: 'rgba(255,255,255,0.15)',
                              }}
                            >
                              Aberration: {mode.settings.aberrationIntensity}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'interactive':
          return (
            <InteractiveContainer>
              {(mousePos, mouseOffset, containerRef) => (
                <div
                  className="u-d-flex u-flex-column u-align-items-center"
                  style={{ gap: '2.5rem', padding: '2.5rem' }}
                >
                  <h2
                    className="u-text-center u-text-white u-fw-semibold u-mb-8"
                    style={{
                      fontSize: '2.5rem',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    Interactive Mouse Tracking
                  </h2>

                  <AtomixGlass
                    mouseOffset={mouseOffset}
                    mouseContainer={containerRef}
                    displacementScale={150}
                    blurAmount={0}
                    saturation={160}
                    aberrationIntensity={3}
                    elasticity={0.3}
                    cornerRadius={25}
                    mode={selectedMode}
                  >
                    <div className="u-text-center" style={{ padding: '3rem 4rem' }}>
                      <h3
                        className="u-mb-5 u-text-white u-fw-medium"
                        style={{ fontSize: '1.8rem' }}
                      >
                        Move Your Mouse
                      </h3>
                      <p
                        className="u-mb-5"
                        style={{ fontSize: '1.1rem', lineHeight: 1.5, opacity: 0.9 }}
                      >
                        Watch the glass effect respond to your mouse movement with real-time
                        displacement and distortion effects.
                      </p>
                      <div className="o-grid">
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-sm">
                            Mode: <strong>{selectedMode}</strong>
                          </div>
                        </div>
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-sm">
                            Elasticity: <strong>{settings.elasticity}</strong>
                          </div>
                        </div>
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-sm">
                            Mouse X: <strong>{Math.round(mouseOffset.x)}</strong>
                          </div>
                        </div>
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-sm">
                            Mouse Y: <strong>{Math.round(mouseOffset.y)}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AtomixGlass>

                  {/* Mode Selector */}
                  <div
                    className="u-d-flex u-flex-wrap u-justify-content-center"
                    style={{ gap: '1rem' }}
                  >
                    {modes.map(mode => (
                      <Button
                        key={mode.id}
                        variant={selectedMode === mode.id ? 'primary' : 'outline-light'}
                        rounded
                        onClick={() => setSelectedMode(mode.id as any)}
                      >
                        {mode.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </InteractiveContainer>
          );

        case 'applications':
          return (
            <div className="u-pt-20 u-pb-16 u-px-5">
              <div className="o-container">
                <div className="u-text-center u-mb-12">
                  <h2 className="u-mb-5 u-fw-semibold u-text-white" style={{ fontSize: '2.5rem' }}>
                    Real-World Applications
                  </h2>
                  <p
                    className="u-text-lg u-opacity-80 u-text-white u-mx-auto"
                    style={{ maxWidth: '600px' }}
                  >
                    See how AtomixGlass transforms user interfaces across different platforms
                  </p>
                </div>

                <div className="o-grid">
                  <div className="o-grid__row">
                    {/* Mobile UI Example */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 100,
                          blurAmount: 0,
                          saturation: 130,
                          aberrationIntensity: 1.5,
                          cornerRadius: 20,
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-5 u-text-xl u-fw-medium u-flex u-items-center u-gap-2">
                            📱 Mobile Interface
                          </h3>
                          <div
                            className="u-mx-auto u-mb-5 u-relative u-overflow-hidden"
                            style={{
                              width: '200px',
                              height: '300px',
                              borderRadius: '25px',
                              background: 'rgba(0,0,0,0.3)',
                            }}
                          >
                            <AtomixGlass
                              displacementScale={60}
                              blurAmount={0}
                              saturation={120}
                              aberrationIntensity={1}
                              cornerRadius={15}
                              style={{ margin: '20px 15px' }}
                            >
                              <div className="u-p-4 u-text-center">
                                <div className="u-text-sm u-fw-medium">Navigation</div>
                              </div>
                            </AtomixGlass>
                          </div>
                          <p className="u-text-sm u-opacity-80" style={{ lineHeight: 1.5 }}>
                            Touch-optimized glass effects for mobile applications with reduced
                            complexity for better performance.
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* Desktop UI Example */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 120,
                          blurAmount: 0,
                          saturation: 150,
                          aberrationIntensity: 2,
                          cornerRadius: 20,
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-5 u-text-xl u-fw-medium u-flex u-items-center u-gap-2">
                            🖥️ Desktop Application
                          </h3>
                          <div
                            className="u-p-5 u-mb-5 u-rounded-md"
                            style={{ background: 'rgba(0,0,0,0.2)' }}
                          >
                            <div className="u-flex u-gap-2 u-mb-4">
                              {['🔴', '🟡', '🟢'].map((dot, i) => (
                                <div key={i} className="u-text-xs">
                                  {dot}
                                </div>
                              ))}
                            </div>
                            <div className="u-text-xs u-opacity-70">
                              Advanced glass effects with full mouse tracking and complex
                              interactions
                            </div>
                          </div>
                          <p className="u-text-sm u-opacity-80" style={{ lineHeight: 1.5 }}>
                            Rich desktop experiences with advanced shader effects and interactive
                            animations.
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* Apple-style UI Example */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 140,
                          blurAmount: 0,
                          saturation: 160,
                          aberrationIntensity: 2.5,
                          cornerRadius: 20,
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-5 u-text-xl u-fw-medium u-flex u-items-center u-gap-2">
                            🍎 Apple-inspired Design
                          </h3>
                          <div
                            className="u-mb-5"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '10px',
                            }}
                          >
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className="u-flex u-items-center u-justify-center u-rounded-md"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
                                  fontSize: '1.2rem',
                                }}
                              >
                                {['📱', '🎵', '📧', '🗺️', '☀️', '📝'][i]}
                              </div>
                            ))}
                          </div>
                          <p className="u-text-sm u-opacity-80" style={{ lineHeight: 1.5 }}>
                            macOS and iOS-style frosted glass effects with realistic light
                            refraction.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'playground':
          return (
            <div
              className="u-d-flex u-vh-100"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {/* Control Panel */}
              <div
                className="u-p-8 u-overflow-y-auto"
                style={{
                  width: '400px',
                  background: 'rgba(0,0,0,0.8)',
                }}
              >
                <h3
                  className="u-mb-8 u-text-center u-text-white u-fw-medium"
                  style={{ fontSize: '1.5rem' }}
                >
                  Playground Controls
                </h3>

                {/* Settings Controls */}
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="u-mb-6">
                    <div className="u-d-flex u-justify-content-between u-mb-2 u-text-white">
                      <label className="u-fs-sm u-fw-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <span className="u-fs-sm">
                        {typeof value === 'boolean' ? (value ? 'On' : 'Off') : value}
                      </span>
                    </div>

                    {typeof value === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={e => setSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                      />
                    ) : (
                      <input
                        type="range"
                        min={key === 'blurAmount' ? -1 : 0}
                        max={
                          key === 'displacementScale'
                            ? 200
                            : key === 'saturation'
                              ? 300
                              : key === 'aberrationIntensity'
                                ? 10
                                : key === 'cornerRadius'
                                  ? 100
                                  : 1
                        }
                        step={key === 'aberrationIntensity' || key === 'elasticity' ? 0.1 : 1}
                        value={value as number}
                        onChange={e =>
                          setSettings(prev => ({
                            ...prev,
                            [key]: parseFloat(e.target.value),
                          }))
                        }
                        className="u-w-100"
                        style={{
                          accentColor: '#7AFFD7',
                          height: '6px',
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* Mode Selector */}
                <div className="u-mb-6">
                  <label className="u-d-block u-mb-2 u-text-white u-fs-sm u-fw-medium">
                    Glass Mode
                  </label>
                  <select
                    value={selectedMode}
                    onChange={e => setSelectedMode(e.target.value as any)}
                    className="u-w-100 u-p-2 u-rounded u-text-white"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    {modes.map(mode => (
                      <option key={mode.id} value={mode.id} style={{ background: '#333' }}>
                        {mode.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Button */}
                <Button
                  variant="primary"
                  size="md"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setSettings({
                      displacementScale: 120,
                      blurAmount: 0,
                      saturation: 140,
                      aberrationIntensity: 2,
                      elasticity: 0.15,
                      cornerRadius: 20,
                      overLight: false,
                    });
                    setSelectedMode('standard');
                  }}
                >
                  Reset to Defaults
                </Button>
              </div>

              {/* Preview Area */}
              <div
                className="u-flex-fill u-d-flex u-align-items-center u-justify-content-center"
                style={{ padding: '2.5rem' }}
              >
                <AtomixGlass {...settings} mode={selectedMode} style={{ maxWidth: '500px' }}>
                  <div className="u-text-center" style={{ padding: '3rem' }}>
                    <h3 className="u-mb-5 u-text-white u-fw-medium" style={{ fontSize: '1.8rem' }}>
                      Live Preview
                    </h3>
                    <p
                      className="u-mb-6"
                      style={{ fontSize: '1.1rem', lineHeight: 1.5, opacity: 0.9 }}
                    >
                      Adjust the controls on the left to see real-time changes to the glass effect.
                      Experiment with different modes and settings to find your perfect
                      configuration.
                    </p>
                    <div
                      className="u-d-flex u-justify-content-center u-flex-wrap"
                      style={{ gap: '1rem' }}
                    >
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="outline-light">Secondary</Button>
                    </div>
                  </div>
                </AtomixGlass>
              </div>
            </div>
          );

        case 'performance':
          return (
            <div className="u-pt-20 u-pb-16 u-px-5">
              <div className="o-container">
                <div className="u-text-center u-mb-12">
                  <h2 className="u-mb-5 u-fw-semibold u-text-white" style={{ fontSize: '2.5rem' }}>
                    Performance Optimization
                  </h2>
                  <p
                    className="u-text-lg u-opacity-80 u-text-white u-mx-auto"
                    style={{ maxWidth: '600px' }}
                  >
                    Learn how to optimize AtomixGlass for different performance requirements
                  </p>
                </div>

                <div className="o-grid u-mb-12">
                  <div className="o-grid__row">
                    {/* High Performance */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 60,
                          blurAmount: 0,
                          saturation: 120,
                          aberrationIntensity: 0.5,
                          cornerRadius: 15,
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-4 u-text-xl u-fw-medium" style={{ color: '#00FF88' }}>
                            ⚡ High Performance
                          </h3>
                          <p className="u-mb-5 u-text-base" style={{ lineHeight: 1.5 }}>
                            Optimized for mobile devices and low-end hardware
                          </p>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Displacement Scale: 60</li>
                            <li>Blur Amount: 0</li>
                            <li>Aberration: 0.5</li>
                            <li>Mode: Standard</li>
                            <li>Best for: Mobile, multiple instances</li>
                          </ul>
                        </div>
                      </Card>
                    </div>

                    {/* Balanced */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 120,
                          blurAmount: 0,
                          saturation: 140,
                          aberrationIntensity: 2,
                          cornerRadius: 20,
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-4 u-text-xl u-fw-medium" style={{ color: '#FFD700' }}>
                            ⚖️ Balanced
                          </h3>
                          <p className="u-mb-5 u-text-base" style={{ lineHeight: 1.5 }}>
                            Good balance of performance and visual quality
                          </p>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Displacement Scale: 120</li>
                            <li>Blur Amount: 0</li>
                            <li>Aberration: 2</li>
                            <li>Mode: Standard/Polar</li>
                            <li>Best for: Desktop apps, modern devices</li>
                          </ul>
                        </div>
                      </Card>
                    </div>

                    {/* High Quality */}
                    <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                      <Card
                        glass={{
                          displacementScale: 200,
                          blurAmount: 0,
                          saturation: 180,
                          aberrationIntensity: 4,
                          cornerRadius: 25,
                          mode: 'shader',
                        }}
                        className="u-h-full"
                      >
                        <div className="u-p-7">
                          <h3 className="u-mb-4 u-text-xl u-fw-medium" style={{ color: '#FF6B6B' }}>
                            ✨ High Quality
                          </h3>
                          <p className="u-mb-5 u-text-base" style={{ lineHeight: 1.5 }}>
                            Maximum visual impact for hero sections
                          </p>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Displacement Scale: 200</li>
                            <li>Blur Amount: 0</li>
                            <li>Aberration: 4</li>
                            <li>Mode: Shader/Prominent</li>
                            <li>Best for: Hero sections, high-end devices</li>
                          </ul>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Performance Tips */}
                <Card
                  glass={{
                    displacementScale: 100,
                    blurAmount: 0,
                    saturation: 130,
                    aberrationIntensity: 1.5,
                    cornerRadius: 20,
                  }}
                >
                  <div className="u-p-10">
                    <h3 className="u-mb-6 u-text-center u-fw-medium" style={{ fontSize: '1.5rem' }}>
                      💡 Performance Best Practices
                    </h3>

                    <div className="o-grid">
                      <div className="o-grid__row">
                        <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg">
                          <h4 className="u-mb-4 u-fw-medium" style={{ color: '#7AFFD7' }}>
                            Mobile Optimization
                          </h4>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Reduce displacement scale below 100</li>
                            <li>Use minimal blur amounts</li>
                            <li>Prefer standard mode</li>
                            <li>Limit to 2-3 instances per page</li>
                          </ul>
                        </div>

                        <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg">
                          <h4 className="u-mb-4 u-fw-medium" style={{ color: '#7AFFD7' }}>
                            Memory Management
                          </h4>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Use React.memo for static content</li>
                            <li>Debounce mouse tracking</li>
                            <li>Clean up event listeners</li>
                            <li>Monitor GPU usage</li>
                          </ul>
                        </div>

                        <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg">
                          <h4 className="u-mb-4 u-fw-medium" style={{ color: '#7AFFD7' }}>
                            Accessibility
                          </h4>
                          <ul className="u-text-sm u-ps-5" style={{ lineHeight: 1.6 }}>
                            <li>Respect prefers-reduced-motion</li>
                            <li>Ensure sufficient contrast</li>
                            <li>Provide fallback styles</li>
                            <li>Test with screen readers</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <BackgroundWrapper
        backgroundIndex={1}
        interactive={activeSection === 'interactive'}
        height="auto"
        style={{
          position: 'relative',
          fontFamily: 'Inter, system-ui, sans-serif',
          minHeight: '100vh',
        }}
      >
        {/* Navigation */}
        <div
          className="u-position-fixed u-top-0 u-start-0 u-end-0 u-z-dropdown u-d-flex u-justify-content-center"
          style={{ top: '20px', left: '20px', right: '20px' }}
        >
          <AtomixGlass
            displacementScale={60}
            blurAmount={0}
            saturation={120}
            aberrationIntensity={1}
            cornerRadius={50}
          >
            <div className="u-d-flex u-gap-1 u-p-2 u-px-4 u-flex-wrap u-justify-content-center">
              {sections.map(section => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'primary' : 'ghost'}
                  size="sm"
                  rounded
                  onClick={() => setActiveSection(section.id)}
                  className="u-fs-xs u-text-nowrap"
                  title={section.desc}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </AtomixGlass>
        </div>

        {/* Content Area */}
        <div
          className="u-w-100"
          style={{
            paddingTop: activeSection === 'playground' ? '0' : '100px',
            minHeight: '100vh',
          }}
        >
          {renderSection()}
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
# Comprehensive AtomixGlass Showcase

This comprehensive preview combines the best features from multiple AtomixGlass story implementations, providing a complete exploration of all capabilities.

## 🏠 Overview Section
- Hero introduction with gradient text effects
- Feature grid with icon highlights
- Call-to-action buttons and navigation

## 🎨 Modes Section
- All 4 glass modes demonstrated with optimal settings
- Interactive mode selection with visual feedback
- Real-time settings comparison displays

## 🖱️ Interactive Section
- Real-time mouse tracking with position display
- Dynamic displacement effects based on cursor movement
- Live parameter updates and mode switching

## 📱 Applications Section
- Mobile interface examples with responsive designs
- Desktop application UI demonstrations
- Apple-inspired premium interface patterns

## 🎮 Playground Section
- Comprehensive live customization controls
- Real-time visual preview updates
- Quick reset to default configuration
- All parameters adjustable via range sliders

## ⚡ Performance Section
- Three optimization tiers: High Performance, Balanced, High Quality
- Configuration recommendations for different use cases
- Best practices for mobile and desktop deployments
- Accessibility considerations and guidelines

Navigate between sections using the floating navigation bar at the top to explore all AtomixGlass capabilities in detail.
        `,
      },
    },
    layout: 'fullscreen',
  },
};

/**
 * Production-Ready UI Examples
 *
 * Real-world interface patterns using AtomixGlass in production scenarios.
 */
export const ProductionExamples: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundIndex={2}
      height="auto"
      style={{ minHeight: '100vh', paddingBottom: '4rem' }}
    >
      <div className="u-pt-20 u-pb-16 u-px-5">
        <div className="o-container">
          <div className="u-text-center u-mb-12">
            <h2
              className="u-mb-5 u-fw-bold u-text-white"
              style={{ fontSize: '3rem', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Production UI Examples
            </h2>
            <p
              className="u-text-lg u-opacity-90 u-text-white u-mx-auto"
              style={{ maxWidth: '700px', fontSize: '1.25rem' }}
            >
              Real-world interface patterns built with AtomixGlass for modern applications
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="u-mb-16">
            <h3 className="u-mb-6 u-text-white u-fw-semibold" style={{ fontSize: '2rem' }}>
              Dashboard Cards
            </h3>
            <div className="o-grid">
              <div className="o-grid__row">
                {[
                  {
                    icon: '📊',
                    title: 'Analytics',
                    value: '24,531',
                    change: '+12.5%',
                    color: '#3B82F6',
                  },
                  {
                    icon: '👥',
                    title: 'Active Users',
                    value: '8,429',
                    change: '+5.2%',
                    color: '#10B981',
                  },
                  {
                    icon: '💰',
                    title: 'Revenue',
                    value: '$47,293',
                    change: '+18.4%',
                    color: '#8B5CF6',
                  },
                  {
                    icon: '📈',
                    title: 'Growth Rate',
                    value: '23.8%',
                    change: '+3.1%',
                    color: '#F59E0B',
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="o-grid__col o-grid__col--12 o-grid__col--6@md o-grid__col--3@lg u-mb-8"
                  >
                    <AtomixGlass
                      displacementScale={100}
                      blurAmount={0}
                      saturation={140}
                      aberrationIntensity={1.5}
                      cornerRadius={20}
                      elasticity={0.2}
                    >
                      <div className="u-p-6">
                        <div className="u-d-flex u-justify-content-between u-align-items-start u-mb-4">
                          <div style={{ fontSize: '2.5rem', opacity: 0.9 }}>{stat.icon}</div>
                          <span
                            className="u-fs-sm u-fw-semibold"
                            style={{
                              color: '#10B981',
                              padding: '4px 12px',
                              borderRadius: '12px',
                              background: 'rgba(16, 185, 129, 0.2)',
                            }}
                          >
                            {stat.change}
                          </span>
                        </div>
                        <h4 className="u-mb-2 u-text-white u-opacity-80 u-fs-sm">{stat.title}</h4>
                        <p className="u-mb-0 u-fw-bold u-text-white" style={{ fontSize: '2rem' }}>
                          {stat.value}
                        </p>
                      </div>
                    </AtomixGlass>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="u-mb-16">
            <h3 className="u-mb-6 u-text-white u-fw-semibold" style={{ fontSize: '2rem' }}>
              Pricing Tables
            </h3>
            <div className="o-grid">
              <div className="o-grid__row">
                {[
                  {
                    name: 'Starter',
                    price: '$19',
                    features: ['5 Projects', '10GB Storage', 'Basic Support'],
                    highlight: false,
                  },
                  {
                    name: 'Professional',
                    price: '$49',
                    features: ['20 Projects', '100GB Storage', 'Priority Support', 'API Access'],
                    highlight: true,
                  },
                  {
                    name: 'Enterprise',
                    price: '$99',
                    features: [
                      'Unlimited Projects',
                      '1TB Storage',
                      '24/7 Support',
                      'Advanced API',
                      'Custom Domain',
                    ],
                    highlight: false,
                  },
                ].map((plan, index) => (
                  <div key={index} className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                    <AtomixGlass
                      displacementScale={plan.highlight ? 150 : 100}
                      blurAmount={0}
                      saturation={plan.highlight ? 160 : 130}
                      aberrationIntensity={plan.highlight ? 3 : 1.5}
                      cornerRadius={24}
                      elasticity={0.2}
                      style={{
                        transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s',
                      }}
                    >
                      <div className="u-p-8 u-text-center">
                        {plan.highlight && (
                          <div className="u-mb-3">
                            <span
                              style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                              }}
                            >
                              MOST POPULAR
                            </span>
                          </div>
                        )}
                        <h4
                          className="u-mb-3 u-text-white u-fw-semibold"
                          style={{ fontSize: '1.5rem' }}
                        >
                          {plan.name}
                        </h4>
                        <div className="u-mb-6">
                          <span className="u-fw-bold u-text-white" style={{ fontSize: '3rem' }}>
                            {plan.price}
                          </span>
                          <span className="u-text-white u-opacity-70">/month</span>
                        </div>
                        <ul className="u-mb-6 u-ps-0" style={{ listStyle: 'none' }}>
                          {plan.features.map((feature, i) => (
                            <li key={i} className="u-mb-2 u-text-white u-opacity-90">
                              ✓ {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant={plan.highlight ? 'primary' : 'outline-light'}
                          size="md"
                          style={{ width: '100%' }}
                        >
                          Get Started
                        </Button>
                      </div>
                    </AtomixGlass>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div>
            <h3 className="u-mb-6 u-text-white u-fw-semibold" style={{ fontSize: '2rem' }}>
              Navigation Components
            </h3>
            <AtomixGlass
              displacementScale={80}
              blurAmount={0}
              saturation={130}
              aberrationIntensity={1.2}
              cornerRadius={16}
            >
              <div className="u-p-2" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Home', 'Features', 'Pricing', 'Documentation', 'Blog', 'Contact'].map(
                  (item, index) => (
                    <Button key={index} variant={index === 0 ? 'primary' : 'ghost'} size="md">
                      {item}
                    </Button>
                  )
                )}
              </div>
            </AtomixGlass>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Production-ready UI examples demonstrating AtomixGlass in real-world interface patterns including dashboard cards, pricing tables, and navigation components.',
      },
    },
    layout: 'fullscreen',
  },
};

/**
 * Accessibility Features Demonstration
 *
 * Shows how AtomixGlass supports accessibility features and WCAG compliance.
 */
export const AccessibilityShowcase: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reducedMotion, setReducedMotion] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [highContrast, setHighContrast] = useState(false);

    return (
      <BackgroundWrapper backgroundIndex={0} height="auto" style={{ minHeight: '100vh' }}>
        <div className="u-pt-20 u-pb-16 u-px-5">
          <div className="o-container" style={{ maxWidth: '1200px' }}>
            <div className="u-text-center u-mb-12">
              <h2 className="u-mb-5 u-fw-bold u-text-white" style={{ fontSize: '3rem' }}>
                Accessibility Features
              </h2>
              <p
                className="u-text-lg u-opacity-90 u-text-white u-mx-auto"
                style={{ maxWidth: '700px' }}
              >
                AtomixGlass is designed with accessibility in mind, supporting WCAG 2.1 AA standards
              </p>
            </div>

            {/* Controls */}
            <div className="u-mb-12 u-d-flex u-justify-content-center u-gap-4 u-flex-wrap">
              <AtomixGlass displacementScale={60} aberrationIntensity={0.5} cornerRadius={12}>
                <Button
                  variant={reducedMotion ? 'primary' : 'outline-light'}
                  onClick={() => setReducedMotion(!reducedMotion)}
                  size="md"
                >
                  {reducedMotion ? '✓ ' : ''}Reduced Motion
                </Button>
              </AtomixGlass>
              <AtomixGlass displacementScale={60} aberrationIntensity={0.5} cornerRadius={12}>
                <Button
                  variant={highContrast ? 'primary' : 'outline-light'}
                  onClick={() => setHighContrast(!highContrast)}
                  size="md"
                >
                  {highContrast ? '✓ ' : ''}High Contrast
                </Button>
              </AtomixGlass>
            </div>

            {/* Accessibility Examples */}
            <div className="o-grid">
              <div className="o-grid__row">
                {/* Reduced Motion Example */}
                <div className="o-grid__col o-grid__col--12 o-grid__col--6@lg u-mb-8">
                  <AtomixGlass
                    displacementScale={reducedMotion ? 40 : 100}
                    aberrationIntensity={reducedMotion ? 0.5 : 2}
                    saturation={130}
                    cornerRadius={20}
                    elasticity={reducedMotion ? 0 : 0.2}
                  >
                    <div className="u-p-8">
                      <h3
                        className="u-mb-4 u-text-white u-fw-semibold"
                        style={{ fontSize: '1.5rem' }}
                      >
                        ♿ Reduced Motion Support
                      </h3>
                      <p className="u-mb-4 u-opacity-90" style={{ lineHeight: 1.6 }}>
                        When reduced motion is enabled, glass effects are minimized to reduce visual
                        discomfort:
                      </p>
                      <ul className="u-ps-5" style={{ lineHeight: 1.8 }}>
                        <li>Lower displacement scale (40 vs 100)</li>
                        <li>Reduced aberration intensity (0.5 vs 2)</li>
                        <li>Disabled elasticity animations</li>
                        <li>Respects prefers-reduced-motion CSS media query</li>
                      </ul>
                    </div>
                  </AtomixGlass>
                </div>

                {/* High Contrast Example */}
                <div className="o-grid__col o-grid__col--12 o-grid__col--6@lg u-mb-8">
                  <AtomixGlass
                    displacementScale={100}
                    aberrationIntensity={highContrast ? 0 : 2}
                    saturation={highContrast ? 100 : 140}
                    cornerRadius={20}
                    overLight={highContrast}
                  >
                    <div className="u-p-8">
                      <h3
                        className="u-mb-4 u-fw-semibold"
                        style={{ fontSize: '1.5rem', color: highContrast ? '#000' : '#fff' }}
                      >
                        👁️ High Contrast Mode
                      </h3>
                      <p
                        className="u-mb-4"
                        style={{
                          lineHeight: 1.6,
                          opacity: highContrast ? 1 : 0.9,
                          color: highContrast ? '#000' : '#fff',
                        }}
                      >
                        High contrast mode enhances readability by adjusting visual effects:
                      </p>
                      <ul
                        className="u-ps-5"
                        style={{ lineHeight: 1.8, color: highContrast ? '#000' : '#fff' }}
                      >
                        <li>Removes chromatic aberration</li>
                        <li>Normalizes color saturation</li>
                        <li>Optimized text contrast ratios</li>
                        <li>WCAG AAA compliance for text</li>
                      </ul>
                    </div>
                  </AtomixGlass>
                </div>

                {/* Keyboard Navigation */}
                <div className="o-grid__col o-grid__col--12 u-mb-8">
                  <AtomixGlass
                    displacementScale={100}
                    aberrationIntensity={1.5}
                    saturation={140}
                    cornerRadius={20}
                  >
                    <div className="u-p-8">
                      <h3
                        className="u-mb-4 u-text-white u-fw-semibold"
                        style={{ fontSize: '1.5rem' }}
                      >
                        ⌨️ Keyboard Navigation & Screen Reader Support
                      </h3>
                      <div className="o-grid">
                        <div className="o-grid__row">
                          <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                            <p className="u-mb-4 u-opacity-90" style={{ lineHeight: 1.6 }}>
                              All interactive elements are fully keyboard accessible:
                            </p>
                            <ul className="u-ps-5 u-mb-4" style={{ lineHeight: 1.8 }}>
                              <li>Tab navigation support</li>
                              <li>Focus indicators preserved</li>
                              <li>Enter/Space activation</li>
                              <li>Escape to close modals</li>
                            </ul>
                          </div>
                          <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                            <p className="u-mb-4 u-opacity-90" style={{ lineHeight: 1.6 }}>
                              Screen reader compatibility ensures inclusive access:
                            </p>
                            <ul className="u-ps-5" style={{ lineHeight: 1.8 }}>
                              <li>Proper ARIA labels</li>
                              <li>Semantic HTML structure</li>
                              <li>Descriptive alt text</li>
                              <li>Live region announcements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AtomixGlass>
                </div>
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
          'Comprehensive accessibility features demonstration including reduced motion support, high contrast mode, keyboard navigation, and screen reader compatibility following WCAG 2.1 AA standards.',
      },
    },
    layout: 'fullscreen',
  },
};

/**
 * Quick Mode Comparison - Side-by-side view of all modes
 */
export const ModeComparison: Story = {
  render: () => (
    <BackgroundWrapper backgroundIndex={1} height="auto" style={{ minHeight: '80vh' }}>
      <div className="u-pt-20 u-pb-16 u-px-5">
        <div className="o-container">
          <h2
            className="u-mb-8 u-text-center u-text-white u-fw-semibold"
            style={{ fontSize: '2.5rem' }}
          >
            Mode Comparison
          </h2>

          <div className="o-grid">
            <div className="o-grid__row">
              {[
                { mode: 'standard', name: 'Standard', displacement: 120, aberration: 2 },
                { mode: 'polar', name: 'Polar', displacement: 100, aberration: 1.5 },
                { mode: 'prominent', name: 'Prominent', displacement: 150, aberration: 3 },
                { mode: 'shader', name: 'Shader', displacement: 200, aberration: 4 },
              ].map(config => (
                <div
                  key={config.mode}
                  className="o-grid__col o-grid__col--12 o-grid__col--6@md o-grid__col--3@lg u-mb-8"
                >
                  <Card
                    glass={{
                      mode: config.mode as any,
                      displacementScale: config.displacement,
                      aberrationIntensity: config.aberration,
                      saturation: 140,
                      cornerRadius: 20,
                    }}
                    className="u-h-full"
                  >
                    <div className="u-p-7 u-text-center">
                      <h3 className="u-mb-3 u-text-xl u-fw-medium u-text-white">{config.name}</h3>
                      <p className="u-mb-4 u-text-sm u-opacity-80">Mode: {config.mode}</p>
                      <div className="u-text-xs u-flex u-flex-column u-gap-1">
                        <div>Displacement: {config.displacement}</div>
                        <div>Aberration: {config.aberration}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Quick side-by-side comparison of all four AtomixGlass modes with their optimal settings.',
      },
    },
  },
};

/**
 * Interactive Demo - Enhanced mouse tracking example
 */
export const InteractiveDemo: Story = {
  render: () => (
    <InteractiveContainer>
      {(mousePos, mouseOffset, containerRef) => (
        <div className="u-flex u-flex-column u-items-center u-gap-8">
          <AtomixGlass
            mouseOffset={mouseOffset}
            mouseContainer={containerRef}
            displacementScale={150}
            blurAmount={0}
            saturation={160}
            aberrationIntensity={3}
            elasticity={0.3}
            cornerRadius={25}
            mode="shader"
          >
            <div className="u-p-12 u-px-18 u-text-center">
              <h2 className="u-mb-5 u-text-white u-fw-semibold" style={{ fontSize: '2rem' }}>
                Interactive Glass Effect
              </h2>
              <p className="u-mb-6 u-text-lg u-opacity-90" style={{ lineHeight: 1.5 }}>
                Move your mouse to see real-time displacement and distortion effects
              </p>
              <div className="u-p-4 u-rounded-md" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="o-grid">
                  <div className="o-grid__row">
                    <div className="o-grid__col o-grid__col--6">
                      <div className="u-text-sm">
                        Mouse X: <strong>{Math.round(mouseOffset.x)}</strong>
                      </div>
                    </div>
                    <div className="o-grid__col o-grid__col--6">
                      <div className="u-text-sm">
                        Mouse Y: <strong>{Math.round(mouseOffset.y)}</strong>
                      </div>
                    </div>
                    <div className="o-grid__col o-grid__col--6">
                      <div className="u-text-sm">
                        Position X: <strong>{mousePos.x}</strong>
                      </div>
                    </div>
                    <div className="o-grid__col o-grid__col--6">
                      <div className="u-text-sm">
                        Position Y: <strong>{mousePos.y}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AtomixGlass>
        </div>
      )}
    </InteractiveContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration with real-time mouse tracking and live position display.',
      },
    },
  },
};

/**
 * Advanced Playground - Enhanced playground with presets and code export
 *
 * Professional-grade interactive configuration tool with preset management,
 * code generation, and performance monitoring.
 */
export const AdvancedPlayground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      displacementScale: 120,
      blurAmount: 0,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      cornerRadius: 20,
      overLight: false,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedMode, setSelectedMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>(
      'standard'
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showCode, setShowCode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [copiedCode, setCopiedCode] = useState(false);

    const presets = {
      minimal: {
        name: 'Minimal',
        icon: '🌿',
        settings: {
          displacementScale: 40,
          blurAmount: 0,
          saturation: 110,
          aberrationIntensity: 0.5,
          elasticity: 0.05,
          cornerRadius: 12,
          overLight: false,
        },
        mode: 'standard' as const,
      },
      standard: {
        name: 'Standard',
        icon: '⚖️',
        settings: {
          displacementScale: 120,
          blurAmount: 0,
          saturation: 140,
          aberrationIntensity: 2,
          elasticity: 0.15,
          cornerRadius: 20,
          overLight: false,
        },
        mode: 'standard' as const,
      },
      premium: {
        name: 'Premium',
        icon: '💎',
        settings: {
          displacementScale: 180,
          blurAmount: 0,
          saturation: 170,
          aberrationIntensity: 3.5,
          elasticity: 0.25,
          cornerRadius: 28,
          overLight: false,
        },
        mode: 'prominent' as const,
      },
      dramatic: {
        name: 'Dramatic',
        icon: '🎭',
        settings: {
          displacementScale: 200,
          blurAmount: 0,
          saturation: 200,
          aberrationIntensity: 5,
          elasticity: 0.35,
          cornerRadius: 32,
          overLight: false,
        },
        mode: 'shader' as const,
      },
    };

    const applyPreset = (presetKey: keyof typeof presets) => {
      const preset = presets[presetKey];
      setSettings(preset.settings);
      setSelectedMode(preset.mode);
    };

    const generateCode = () => {
      return `<AtomixGlass
  displacementScale={${settings.displacementScale}}
  blurAmount={${settings.blurAmount}}
  saturation={${settings.saturation}}
  aberrationIntensity={${settings.aberrationIntensity}}
  elasticity={${settings.elasticity}}
  cornerRadius={${settings.cornerRadius}}
  overLight={${settings.overLight}}
  mode="${selectedMode}"
>
  <div className="your-content">
    {/* Your content here */}
  </div>
</AtomixGlass>`;
    };

    const copyCode = () => {
      navigator.clipboard.writeText(generateCode());
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    };

    const exportConfig = () => {
      const config = { ...settings, mode: selectedMode };
      const dataStr = JSON.stringify(config, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'atomix-glass-config.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    };

    // Calculate performance score
    const performanceScore = Math.max(
      0,
      Math.min(
        100,
        100 -
          settings.displacementScale * 0.15 -
          Math.abs(settings.blurAmount) * 20 -
          settings.aberrationIntensity * 3 -
          settings.elasticity * 20
      )
    );

    const getPerformanceColor = () => {
      if (performanceScore >= 80) return '#10B981';
      if (performanceScore >= 60) return '#F59E0B';
      return '#EF4444';
    };

    const getPerformanceLabel = () => {
      if (performanceScore >= 80) return 'Excellent';
      if (performanceScore >= 60) return 'Good';
      if (performanceScore >= 40) return 'Fair';
      return 'Heavy';
    };

    return (
      <BackgroundWrapper backgroundIndex={1} height="100vh" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Control Panel */}
          <div
            style={{
              width: '420px',
              height: '100vh',
              overflowY: 'auto',
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="u-mb-8">
              <h2 className="u-mb-2 u-text-white u-fw-bold" style={{ fontSize: '2rem' }}>
                Advanced Playground
              </h2>
              <p className="u-text-white u-opacity-70 u-fs-sm">
                Fine-tune every parameter with live preview
              </p>
            </div>

            {/* Performance Indicator */}
            <div
              className="u-mb-6 u-p-4 u-rounded"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `2px solid ${getPerformanceColor()}`,
              }}
            >
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-text-white u-fw-semibold">Performance Score</span>
                <span className="u-fw-bold" style={{ color: getPerformanceColor() }}>
                  {Math.round(performanceScore)}/100
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${performanceScore}%`,
                    background: getPerformanceColor(),
                    transition: 'all 0.3s',
                  }}
                />
              </div>
              <div
                className="u-mt-2 u-text-center u-fs-xs"
                style={{ color: getPerformanceColor() }}
              >
                {getPerformanceLabel()} -{' '}
                {performanceScore >= 80
                  ? 'Suitable for all devices'
                  : performanceScore >= 60
                    ? 'Good for modern devices'
                    : 'Best for high-end hardware'}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="u-mb-6">
              <label className="u-d-block u-mb-3 u-text-white u-fw-semibold">Quick Presets</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key as keyof typeof presets)}
                    style={{
                      padding: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{preset.icon}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="u-mb-5">
                <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                  <label
                    className="u-text-white u-fs-sm u-fw-medium"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <span className="u-text-white u-opacity-80 u-fs-sm u-fw-semibold">
                    {typeof value === 'boolean'
                      ? value
                        ? 'On'
                        : 'Off'
                      : typeof value === 'number'
                        ? value.toFixed(
                            key.includes('Amount') ||
                              key.includes('elasticity') ||
                              key.includes('aberration')
                              ? 2
                              : 0
                          )
                        : value}
                  </span>
                </div>
                {typeof value === 'boolean' ? (
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={e => setSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                      style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                    />
                  </label>
                ) : (
                  <input
                    type="range"
                    min={key === 'blurAmount' ? -1 : 0}
                    max={
                      key === 'displacementScale'
                        ? 200
                        : key === 'saturation'
                          ? 300
                          : key === 'aberrationIntensity'
                            ? 10
                            : key === 'cornerRadius'
                              ? 100
                              : 1
                    }
                    step={
                      key === 'aberrationIntensity' || key === 'elasticity' || key === 'blurAmount'
                        ? 0.01
                        : 1
                    }
                    value={value as number}
                    onChange={e =>
                      setSettings(prev => ({ ...prev, [key]: parseFloat(e.target.value) }))
                    }
                    style={{ width: '100%', height: '6px', accentColor: '#7AFFD7' }}
                  />
                )}
              </div>
            ))}

            {/* Mode Selector */}
            <div className="u-mb-6">
              <label className="u-d-block u-mb-2 u-text-white u-fw-semibold">Glass Mode</label>
              <select
                value={selectedMode}
                onChange={e => setSelectedMode(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                }}
              >
                <option value="standard" style={{ background: '#1a1a1a' }}>
                  Standard
                </option>
                <option value="polar" style={{ background: '#1a1a1a' }}>
                  Polar
                </option>
                <option value="prominent" style={{ background: '#1a1a1a' }}>
                  Prominent
                </option>
                <option value="shader" style={{ background: '#1a1a1a' }}>
                  Shader
                </option>
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowCode(!showCode)}
                style={{ width: '100%' }}
              >
                {showCode ? '👁️ Hide Code' : '💻 Show Code'}
              </Button>
              <Button
                variant="outline-light"
                size="md"
                onClick={copyCode}
                style={{ width: '100%' }}
              >
                {copiedCode ? '✓ Copied!' : '📋 Copy Code'}
              </Button>
              <Button
                variant="outline-light"
                size="md"
                onClick={exportConfig}
                style={{ width: '100%' }}
              >
                💾 Export Config
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setSettings({
                    displacementScale: 120,
                    blurAmount: 0,
                    saturation: 140,
                    aberrationIntensity: 2,
                    elasticity: 0.15,
                    cornerRadius: 20,
                    overLight: false,
                  });
                  setSelectedMode('standard');
                }}
                style={{ width: '100%' }}
              >
                🔄 Reset
              </Button>
            </div>
          </div>

          {/* Preview Area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              position: 'relative',
            }}
          >
            {showCode ? (
              <div style={{ width: '100%', maxWidth: '700px' }}>
                <AtomixGlass
                  displacementScale={80}
                  aberrationIntensity={1}
                  cornerRadius={16}
                  saturation={120}
                >
                  <div style={{ padding: '2rem' }}>
                    <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
                      <h3 className="u-text-white u-fw-semibold" style={{ fontSize: '1.5rem' }}>
                        Generated Code
                      </h3>
                      <Button variant="primary" size="sm" onClick={copyCode}>
                        {copiedCode ? '✓ Copied' : 'Copy'}
                      </Button>
                    </div>
                    <pre
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        overflow: 'auto',
                        maxHeight: '500px',
                        color: '#7AFFD7',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <code>{generateCode()}</code>
                    </pre>
                  </div>
                </AtomixGlass>
              </div>
            ) : (
              <AtomixGlass
                {...settings}
                mode={selectedMode}
                style={{ maxWidth: '600px', width: '100%' }}
              >
                <div style={{ padding: '3rem', textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 20px',
                      borderRadius: '24px',
                      background: 'rgba(122, 255, 215, 0.2)',
                      color: '#7AFFD7',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '1.5rem',
                    }}
                  >
                    ✨ LIVE PREVIEW
                  </div>
                  <h2 className="u-mb-4 u-text-white u-fw-bold" style={{ fontSize: '2.5rem' }}>
                    AtomixGlass
                  </h2>
                  <p
                    className="u-mb-6 u-opacity-90"
                    style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
                  >
                    Adjust the controls on the left to see real-time changes. Each parameter affects
                    the visual appearance and performance characteristics of the glass effect.
                  </p>
                  <div
                    className="u-d-flex u-justify-content-center u-flex-wrap"
                    style={{ gap: '1rem' }}
                  >
                    <Button variant="primary" size="lg">
                      Primary Action
                    </Button>
                    <Button variant="outline-light" size="lg">
                      Secondary
                    </Button>
                  </div>
                  <div
                    className="u-mt-8 u-p-4 u-rounded"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    <div className="o-grid">
                      <div className="o-grid__row">
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-xs u-opacity-80">Mode</div>
                          <div className="u-fw-bold">{selectedMode}</div>
                        </div>
                        <div className="o-grid__col o-grid__col--6">
                          <div className="u-fs-xs u-opacity-80">Displacement</div>
                          <div className="u-fw-bold">{settings.displacementScale}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AtomixGlass>
            )}
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced interactive playground with preset configurations, code generation, configuration export, and real-time performance monitoring. Perfect for fine-tuning AtomixGlass for your specific use case.',
      },
    },
    layout: 'fullscreen',
  },
};

/**
 * Responsive Design Showcase
 *
 * Demonstrates how AtomixGlass adapts to different screen sizes and device types.
 */
export const ResponsiveDesign: Story = {
  render: () => (
    <BackgroundWrapper backgroundIndex={3} height="auto" style={{ minHeight: '100vh' }}>
      <div className="u-pt-20 u-pb-16 u-px-5">
        <div className="o-container">
          <div className="u-text-center u-mb-12">
            <h2 className="u-mb-5 u-fw-bold u-text-white" style={{ fontSize: '3rem' }}>
              Responsive Design
            </h2>
            <p
              className="u-text-lg u-opacity-90 u-text-white u-mx-auto"
              style={{ maxWidth: '700px' }}
            >
              AtomixGlass automatically optimizes for different screen sizes with recommended
              configurations
            </p>
          </div>

          <div className="o-grid">
            <div className="o-grid__row">
              {/* Mobile Configuration */}
              <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                <div className="u-text-center u-mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📱</div>
                  <h3 className="u-text-white u-fw-semibold" style={{ fontSize: '1.5rem' }}>
                    Mobile
                  </h3>
                  <p className="u-text-white u-opacity-70 u-fs-sm">320px - 767px</p>
                </div>
                <AtomixGlass
                  displacementScale={60}
                  blurAmount={0}
                  saturation={120}
                  aberrationIntensity={0.8}
                  elasticity={0.08}
                  cornerRadius={16}
                >
                  <div className="u-p-6">
                    <h4 className="u-mb-3 u-text-white u-fw-semibold">Optimized for Mobile</h4>
                    <ul className="u-ps-5 u-text-sm u-mb-4" style={{ lineHeight: 1.8 }}>
                      <li>Lower displacement (60)</li>
                      <li>Minimal aberration (0.8)</li>
                      <li>Reduced elasticity (0.08)</li>
                      <li>Touch-optimized</li>
                    </ul>
                    <Button variant="primary" size="sm" style={{ width: '100%' }}>
                      Mobile Action
                    </Button>
                  </div>
                </AtomixGlass>
              </div>

              {/* Tablet Configuration */}
              <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                <div className="u-text-center u-mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📱</div>
                  <h3 className="u-text-white u-fw-semibold" style={{ fontSize: '1.5rem' }}>
                    Tablet
                  </h3>
                  <p className="u-text-white u-opacity-70 u-fs-sm">768px - 1023px</p>
                </div>
                <AtomixGlass
                  displacementScale={100}
                  blurAmount={0}
                  saturation={130}
                  aberrationIntensity={1.5}
                  elasticity={0.15}
                  cornerRadius={20}
                >
                  <div className="u-p-6">
                    <h4 className="u-mb-3 u-text-white u-fw-semibold">Balanced for Tablet</h4>
                    <ul className="u-ps-5 u-text-sm u-mb-4" style={{ lineHeight: 1.8 }}>
                      <li>Moderate displacement (100)</li>
                      <li>Balanced aberration (1.5)</li>
                      <li>Standard elasticity (0.15)</li>
                      <li>Touch & hover support</li>
                    </ul>
                    <Button variant="primary" size="md" style={{ width: '100%' }}>
                      Tablet Action
                    </Button>
                  </div>
                </AtomixGlass>
              </div>

              {/* Desktop Configuration */}
              <div className="o-grid__col o-grid__col--12 o-grid__col--4@lg u-mb-8">
                <div className="u-text-center u-mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖥️</div>
                  <h3 className="u-text-white u-fw-semibold" style={{ fontSize: '1.5rem' }}>
                    Desktop
                  </h3>
                  <p className="u-text-white u-opacity-70 u-fs-sm">1024px+</p>
                </div>
                <AtomixGlass
                  displacementScale={150}
                  blurAmount={0}
                  saturation={160}
                  aberrationIntensity={3}
                  elasticity={0.25}
                  cornerRadius={24}
                >
                  <div className="u-p-6">
                    <h4 className="u-mb-3 u-text-white u-fw-semibold">Enhanced for Desktop</h4>
                    <ul className="u-ps-5 u-text-sm u-mb-4" style={{ lineHeight: 1.8 }}>
                      <li>High displacement (150)</li>
                      <li>Enhanced aberration (3)</li>
                      <li>Fluid elasticity (0.25)</li>
                      <li>Full interactive effects</li>
                    </ul>
                    <Button variant="primary" size="lg" style={{ width: '100%' }}>
                      Desktop Action
                    </Button>
                  </div>
                </AtomixGlass>
              </div>
            </div>
          </div>

          {/* Responsive Best Practices */}
          <div className="u-mt-12">
            <AtomixGlass
              displacementScale={100}
              aberrationIntensity={1.5}
              saturation={140}
              cornerRadius={20}
            >
              <div className="u-p-8">
                <h3
                  className="u-mb-6 u-text-white u-fw-semibold u-text-center"
                  style={{ fontSize: '2rem' }}
                >
                  📋 Responsive Best Practices
                </h3>
                <div
                  className="o-
grid"
                >
                  <div className="o-grid__row">
                    <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                      <h4 className="u-mb-3 u-text-white u-fw-medium">Use Media Queries</h4>
                      <p className="u-opacity-90" style={{ lineHeight: 1.6 }}>
                        Adjust glass effect parameters based on viewport size using CSS media
                        queries or JavaScript matchMedia API for optimal performance across devices.
                      </p>
                    </div>
                    <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                      <h4 className="u-mb-3 u-text-white u-fw-medium">Test on Real Devices</h4>
                      <p className="u-opacity-90" style={{ lineHeight: 1.6 }}>
                        Always test on actual devices to ensure performance and visual quality meet
                        expectations, especially on mobile devices with varying hardware
                        capabilities.
                      </p>
                    </div>
                    <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                      <h4 className="u-mb-3 u-text-white u-fw-medium">Progressive Enhancement</h4>
                      <p className="u-opacity-90" style={{ lineHeight: 1.6 }}>
                        Start with minimal effects for all devices and progressively enhance the
                        experience for capable hardware using feature detection.
                      </p>
                    </div>
                    <div className="o-grid__col o-grid__col--12 o-grid__col--6@md">
                      <h4 className="u-mb-3 u-text-white u-fw-medium">Touch Considerations</h4>
                      <p className="u-opacity-90" style={{ lineHeight: 1.6 }}>
                        Reduce or disable hover effects on touch devices. Consider larger touch
                        targets and ensure interactive elements remain accessible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive responsive design guide showing optimized AtomixGlass configurations for mobile, tablet, and desktop devices with best practices for each screen size.',
      },
    },
    layout: 'fullscreen',
  },
};
