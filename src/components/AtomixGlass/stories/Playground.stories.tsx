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
import AtomixGlass from '../AtomixGlass';
import Button from '../../Button/Button';
import { Toggle } from '../../Toggle/Toggle';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import React from 'react';
import type { RefObject } from 'react';

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
  /** Array of background images */
  backgrounds?: string[];
  /** Active background index */
  activeIndex?: number;
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
  backgrounds = [],
  activeIndex = 0,
  height = '100vh',
  width = '100vw',
  borderRadius = '0',
  padding = '24px',
  className = '',
  style = {},
}: BackgroundWrapperProps) => {
  return (
    <div
      className={`c-atomix-glass-background ${className}`}
      style={{
        width,
        minHeight: height,
        backgroundColor: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius,
        padding,
        overflow: 'hidden',
        ...style,
      }}
    >
      {backgrounds.map((bg, i) => (
        <div
          key={bg}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activeIndex ? 1 : 0,
            visibility: i === activeIndex ? 'visible' : 'hidden',
            transition: 'opacity 800ms ease-in-out',
          }}
        />
      ))}
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
 * Playground - Enhanced playground with presets and code export
 *
 * Professional-grade interactive configuration tool with preset management,
 * code generation, and performance monitoring.
 */
export const Playground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      displacementScale: 40,
      blurAmount: 1,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      cornerRadius: 20,
      overLight: false,
      reducedMotion: false,
      highContrast: false,
      disableEffects: false,
      enableLiquidBlur: false,
      enableBorderEffect: true,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedMode, setSelectedMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>(
      'standard'
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedShader, setSelectedShader] = useState<
      'liquidGlass' | 'plasma' | 'waves' | 'noise'
    >('liquidGlass');
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
          blurAmount: 0.5,
          saturation: 110,
          aberrationIntensity: 0.5,
          elasticity: 0.05,
          cornerRadius: 12,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          disableEffects: false,
          enableLiquidBlur: false,
          enableBorderEffect: true,
        },
        mode: 'standard' as const,
        shader: 'liquidGlass' as const,
      },
      standard: {
        name: 'Standard',
        icon: '⚖️',
        settings: {
          displacementScale: 120,
          blurAmount: 1,
          saturation: 140,
          aberrationIntensity: 2,
          elasticity: 0.15,
          cornerRadius: 20,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          disableEffects: false,
          enableLiquidBlur: false,
          enableBorderEffect: true,
        },
        mode: 'standard' as const,
        shader: 'liquidGlass' as const,
      },
      premium: {
        name: 'Premium',
        icon: '💎',
        settings: {
          displacementScale: 180,
          blurAmount: 1.5,
          saturation: 170,
          aberrationIntensity: 3.5,
          elasticity: 0.25,
          cornerRadius: 28,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          disableEffects: false,
          enableLiquidBlur: true,
          enableBorderEffect: true,
        },
        mode: 'prominent' as const,
        shader: 'plasma' as const,
      },
      dramatic: {
        name: 'Dramatic',
        icon: '🎭',
        settings: {
          displacementScale: 200,
          blurAmount: 1,
          saturation: 200,
          aberrationIntensity: 5,
          elasticity: 0.35,
          cornerRadius: 32,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          disableEffects: false,
          enableLiquidBlur: true,
          enableBorderEffect: true,
        },
        mode: 'shader' as const,
        shader: 'waves' as const,
      },
    };

    const applyPreset = (presetKey: keyof typeof presets) => {
      const preset = presets[presetKey];
      setSettings(preset.settings as any);
      setSelectedMode(preset.mode);
      setSelectedShader(preset.shader);
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
  shaderVariant="${selectedShader}"
  reducedMotion={${settings.reducedMotion}}
  highContrast={${settings.highContrast}}
  disableEffects={${settings.disableEffects}}
  enableLiquidBlur={${settings.enableLiquidBlur}}
  enableBorderEffect={${settings.enableBorderEffect}}
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
      const config = { ...settings, mode: selectedMode, shaderVariant: selectedShader };
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
          Math.abs(settings.blurAmount) * 2 -
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

    const backgrounds = [
      'https://images.unsplash.com/photo-1651483554034-8defec113cf2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2074',
      'https://images.unsplash.com/photo-1734760858517-ff3e30c4a420?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
      'https://images.unsplash.com/photo-1590634875052-89c137f8df21?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072',
      'https://images.unsplash.com/photo-1592880476174-2932b3061c30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1591241902480-6cf22542003c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2013',
      'https://images.unsplash.com/photo-1706983677486-3ac9ecbad2e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132',
      'https://images.unsplash.com/photo-1591322874022-2f5daab8d3d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1709653600438-08b8088fe0c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
      'https://images.unsplash.com/photo-1670758144077-b655e19c75e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
      'https://images.unsplash.com/photo-1719583225873-ea5993eb4fcd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1639135650365-516c5bdb40fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2073',
      'https://images.unsplash.com/photo-1760592150404-adacb88548e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035',
      'https://images.unsplash.com/photo-1638403338703-672ec4b3c19e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
      'https://images.unsplash.com/photo-1639680774410-ced42af91b80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
      'https://images.unsplash.com/photo-1636757577341-5c135250786d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
      'https://images.unsplash.com/photo-1653443688877-ff1d74f1e4a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
      'https://images.unsplash.com/photo-1495164678535-ecbd76d9fa7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2669',
      'https://images.unsplash.com/photo-1742502575383-b908da0fb3ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2673',
      'https://images.unsplash.com/photo-1627057075078-26c7caf11dc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2674',
    ];

    return (
      <BackgroundWrapper backgrounds={backgrounds} activeIndex={backgroundIndex}>
        <div className="o-container">
          <div className="o-grid">
            <div className="o-grid__col o-grid__col--4">
              {/* Control Panel */}

              <AtomixGlass blurAmount={10} elasticity={0} displacementScale={20} padding="20px">
                <div
                  style={{
                    height: '90vh',
                    overflowY: 'auto',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    padding: '20px',
                  }}
                >
                  <div className="u-mb-8">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        }}
                      >
                        🎮
                      </div>
                      <div>
                        <h2
                          className="u-m-0 u-text-white u-fw-bold"
                          style={{
                            fontSize: '1.75rem',
                            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Advanced Playground
                        </h2>
                        <p
                          className="u-m-0 u-text-white u-opacity-80"
                          style={{ fontSize: '13px', marginTop: '4px' }}
                        >
                          Fine-tune every parameter with live preview
                        </p>
                      </div>
                    </div>
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
                    <label
                      className="u-d-block u-mb-3 u-text-white u-fw-semibold"
                      style={{ fontSize: '14px', letterSpacing: '0.5px' }}
                    >
                      ⚡ Quick Presets
                    </label>
                    <div
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}
                    >
                      {Object.entries(presets).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => applyPreset(key as keyof typeof presets)}
                          style={{
                            padding: '16px 12px',
                            background: 'rgba(255,255,255,0.08)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '16px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2rem',
                              marginBottom: '8px',
                              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                            }}
                          >
                            {preset.icon}
                          </div>
                          <div
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              letterSpacing: '0.3px',
                            }}
                          >
                            {preset.name}
                          </div>
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
                        <Toggle
                          initialOn={value}
                          onToggleOn={() => setSettings(prev => ({ ...prev, [key]: true }))}
                          onToggleOff={() => setSettings(prev => ({ ...prev, [key]: false }))}
                        />
                      ) : (
                        <input
                          type="range"
                          min={0}
                          max={
                            key === 'displacementScale'
                              ? 200
                              : key === 'saturation'
                                ? 300
                                : key === 'aberrationIntensity'
                                  ? 10
                                  : key === 'cornerRadius'
                                    ? 100
                                    : key === 'blurAmount'
                                      ? 10
                                      : 1
                          }
                          step={
                            key === 'aberrationIntensity' ||
                            key === 'elasticity' ||
                            key === 'blurAmount'
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
                  <div className="u-mb-5">
                    <label className="u-d-block u-mb-2 u-text-white u-fw-semibold">
                      Glass Mode
                    </label>
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

                  {/* Shader Variant Selector */}
                  {selectedMode === 'shader' && (
                    <div className="u-mb-5">
                      <label className="u-d-block u-mb-2 u-text-white u-fw-semibold">
                        Shader Variant
                      </label>
                      <select
                        value={selectedShader}
                        onChange={e => setSelectedShader(e.target.value as any)}
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
                        <option value="liquidGlass" style={{ background: '#1a1a1a' }}>
                          Liquid Glass
                        </option>
                        <option value="plasma" style={{ background: '#1a1a1a' }}>
                          Plasma
                        </option>
                        <option value="waves" style={{ background: '#1a1a1a' }}>
                          Waves
                        </option>
                        <option value="noise" style={{ background: '#1a1a1a' }}>
                          Noise
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Background Control */}
                  <div className="u-mb-6">
                    <label className="u-d-block u-mb-2 u-text-white u-fw-semibold">
                      Background Image
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={backgrounds.length}
                      step={1}
                      value={backgroundIndex}
                      onChange={e => setBackgroundIndex(parseInt(e.target.value))}
                      style={{ width: '100%', height: '6px', accentColor: '#7AFFD7' }}
                    />
                    <div className="u-mt-2 u-text-center u-text-white u-opacity-70 u-fs-xs">
                      Background {backgroundIndex + 1} of {backgrounds.length}
                    </div>
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
                          reducedMotion: false,
                          highContrast: false,
                          disableEffects: false,
                          enableLiquidBlur: false,
                          enableBorderEffect: true,
                        });
                        setSelectedMode('standard');
                        setSelectedShader('liquidGlass');
                      }}
                      style={{ width: '100%' }}
                    >
                      🔄 Reset
                    </Button>
                  </div>
                </div>
              </AtomixGlass>
            </div>
            {/* Preview Area */}
            <div className="o-grid__col o-grid__col--8">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem',
                }}
              >
                {showCode ? (
                  <div style={{ width: '100%' }}>
                    <AtomixGlass
                      displacementScale={80}
                      aberrationIntensity={1}
                      cornerRadius={16}
                      saturation={120}
                    >
                      <div style={{ padding: '2.5rem' }}>
                        <div
                          className="u-d-flex u-justify-content-between u-align-items-center u-mb-4"
                          style={{ marginBottom: '24px' }}
                        >
                          <div>
                            <h3
                              className="u-m-0 u-fw-bold"
                              style={{
                                fontSize: '1.75rem',
                                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '8px',
                              }}
                            >
                              💻 Generated Code
                            </h3>
                            <p
                              className="u-m-0"
                              style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.7)',
                              }}
                            >
                              Copy this code to use in your project
                            </p>
                          </div>
                          <Button
                            variant="primary"
                            size="md"
                            onClick={copyCode}
                            style={{
                              minWidth: '120px',
                              boxShadow: copiedCode
                                ? '0 4px 16px rgba(122, 255, 215, 0.4)'
                                : 'none',
                            }}
                          >
                            {copiedCode ? '✓ Copied!' : '📋 Copy Code'}
                          </Button>
                        </div>
                        <pre
                          style={{
                            background: 'rgba(0,0,0,0.6)',
                            padding: '1.75rem',
                            borderRadius: '12px',
                            overflow: 'auto',
                            maxHeight: '500px',
                            color: '#7AFFD7',
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            border: '1px solid rgba(122, 255, 215, 0.2)',
                            fontFamily: 'Monaco, "Courier New", monospace',
                            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                          }}
                        >
                          <code>{generateCode()}</code>
                        </pre>
                      </div>
                    </AtomixGlass>
                  </div>
                ) : (
                  <AtomixGlass
                    displacementScale={settings.displacementScale}
                    blurAmount={settings.blurAmount}
                    saturation={settings.saturation}
                    aberrationIntensity={settings.aberrationIntensity}
                    elasticity={settings.elasticity}
                    cornerRadius={settings.cornerRadius}
                    overLight={settings.overLight}
                    mode={selectedMode}
                    shaderVariant={selectedShader as any}
                    reducedMotion={settings.reducedMotion}
                    highContrast={settings.highContrast}
                    disableEffects={settings.disableEffects}
                    enableLiquidBlur={settings.enableLiquidBlur}
                    enableBorderEffect={settings.enableBorderEffect}
                    style={{ width: '100%' }}
                  >
                    <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 24px',
                          borderRadius: '28px',
                          background: 'linear-gradient(135deg, rgba(122, 255, 215, 0.25) 0%, rgba(102, 126, 234, 0.25) 100%)',
                          border: '1px solid rgba(122, 255, 215, 0.3)',
                          color: '#7AFFD7',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          marginBottom: '2rem',
                          boxShadow: '0 4px 16px rgba(122, 255, 215, 0.2)',
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>✨</span>
                        <span>LIVE PREVIEW</span>
                      </div>
                      <div
                        style={{
                          width: '96px',
                          height: '96px',
                          margin: '0 auto 24px',
                          borderRadius: '24px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px',
                          boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                        }}
                      >
                        ✨
                      </div>
                      <h2
                        className="u-mb-4 u-fw-bold"
                        style={{
                          fontSize: '2.75rem',
                          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          letterSpacing: '-1px',
                        }}
                      >
                        AtomixGlass
                      </h2>
                      <p
                        className="u-mb-6"
                        style={{
                          fontSize: '1.125rem',
                          lineHeight: 1.7,
                          color: 'rgba(255, 255, 255, 0.9)',
                          maxWidth: '600px',
                          margin: '0 auto 2rem',
                        }}
                      >
                        Adjust the controls on the left to see real-time changes. Each parameter
                        affects the visual appearance and performance characteristics of the glass
                        effect.
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
                      {/* Dynamic Info Panel */}
                      <div className="u-mt-8" style={{ display: 'grid', gap: '1rem' }}>
                        {/* Current Configuration */}
                        <div
                          className="u-p-4 u-rounded"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          <div
                            className="u-mb-3 u-fw-semibold u-fs-sm"
                            style={{ color: '#7AFFD7' }}
                          >
                            📊 Current Configuration
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                              gap: '0.75rem',
                            }}
                          >
                            <div>
                              <div className="u-fs-xs u-opacity-70">Mode</div>
                              <div
                                className="u-fw-semibold"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {selectedMode}
                              </div>
                            </div>
                            <div>
                              <div className="u-fs-xs u-opacity-70">Shader</div>
                              <div
                                className="u-fw-semibold"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {selectedShader}
                              </div>
                            </div>
                            <div>
                              <div className="u-fs-xs u-opacity-70">Displacement</div>
                              <div className="u-fw-semibold">{settings.displacementScale}px</div>
                            </div>
                            <div>
                              <div className="u-fs-xs u-opacity-70">Aberration</div>
                              <div className="u-fw-semibold">
                                {settings.aberrationIntensity.toFixed(1)}
                              </div>
                            </div>
                            <div>
                              <div className="u-fs-xs u-opacity-70">Blur</div>
                              <div className="u-fw-semibold">{settings.blurAmount.toFixed(2)}</div>
                            </div>
                            <div>
                              <div className="u-fs-xs u-opacity-70">Elasticity</div>
                              <div className="u-fw-semibold">{settings.elasticity.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Visual Characteristics */}
                        <div
                          className="u-p-4 u-rounded"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          <div
                            className="u-mb-3 u-fw-semibold u-fs-sm"
                            style={{ color: '#7AFFD7' }}
                          >
                            🎨 Visual Characteristics
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div
                              style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                background: settings.enableLiquidBlur
                                  ? 'rgba(122, 255, 215, 0.2)'
                                  : 'rgba(255,255,255,0.1)',
                                fontSize: '0.75rem',
                                border: settings.enableLiquidBlur
                                  ? '1px solid #7AFFD7'
                                  : '1px solid transparent',
                              }}
                            >
                              {settings.enableLiquidBlur ? '✓' : '○'} Liquid Blur
                            </div>
                            <div
                              style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                background: settings.enableBorderEffect
                                  ? 'rgba(122, 255, 215, 0.2)'
                                  : 'rgba(255,255,255,0.1)',
                                fontSize: '0.75rem',
                                border: settings.enableBorderEffect
                                  ? '1px solid #7AFFD7'
                                  : '1px solid transparent',
                              }}
                            >
                              {settings.enableBorderEffect ? '✓' : '○'} Border Effect
                            </div>
                            <div
                              style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                background: settings.reducedMotion
                                  ? 'rgba(239, 68, 68, 0.2)'
                                  : 'rgba(255,255,255,0.1)',
                                fontSize: '0.75rem',
                                border: settings.reducedMotion
                                  ? '1px solid #EF4444'
                                  : '1px solid transparent',
                              }}
                            >
                              {settings.reducedMotion ? '✓' : '○'} Reduced Motion
                            </div>
                            <div
                              style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                background: settings.highContrast
                                  ? 'rgba(245, 158, 11, 0.2)'
                                  : 'rgba(255,255,255,0.1)',
                                fontSize: '0.75rem',
                                border: settings.highContrast
                                  ? '1px solid #F59E0B'
                                  : '1px solid transparent',
                              }}
                            >
                              {settings.highContrast ? '✓' : '○'} High Contrast
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div
                          className="u-p-4 u-rounded"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          <div
                            className="u-mb-3 u-fw-semibold u-fs-sm"
                            style={{ color: '#7AFFD7' }}
                          >
                            📈 Quick Stats
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr',
                              gap: '0.75rem',
                              fontSize: '0.875rem',
                            }}
                          >
                            <div>
                              <span className="u-opacity-70">Saturation:</span>
                              <span className="u-fw-semibold u-ml-2">{settings.saturation}%</span>
                            </div>
                            <div>
                              <span className="u-opacity-70">Radius:</span>
                              <span className="u-fw-semibold u-ml-2">
                                {settings.cornerRadius}px
                              </span>
                            </div>
                            <div>
                              <span className="u-opacity-70">Background:</span>
                              <span className="u-fw-semibold u-ml-2">
                                {backgroundIndex + 1}/{backgrounds.length}
                              </span>
                            </div>
                            <div>
                              <span className="u-opacity-70">Effects:</span>
                              <span className="u-fw-semibold u-ml-2">
                                {settings.disableEffects ? 'Disabled' : 'Enabled'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AtomixGlass>
                )}
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
          'Advanced interactive playground with preset configurations, code generation, configuration export, and real-time performance monitoring. Perfect for fine-tuning AtomixGlass for your specific use case.',
      },
    },
    layout: 'fullscreen',
  },
};
