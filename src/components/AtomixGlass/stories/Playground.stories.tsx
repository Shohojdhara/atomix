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
import { useState, useEffect, useCallback, useRef } from 'react';
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
    borderRadius: {
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
    withoutEffects: {
      control: 'boolean',
      description: 'Disable all visual effects (default: false)',
      table: { defaultValue: { summary: 'false' } },
    },
    debugPerformance: {
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
interface BgItem {
  url: string;
  label: string;
  tag: 'dark' | 'colorful' | 'light' | 'nature';
}

interface BackgroundWrapperProps {
  /** Child elements to render inside the wrapper */
  children: React.ReactNode;
  /** Array of background image objects */
  backgrounds?: BgItem[];
  /** Active background index */
  activeIndex?: number;
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
          key={bg.url}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)',
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
    const [settings, setSettings] = useState<{
      displacementScale: number;
      blurAmount: number;
      saturation: number;
      aberrationIntensity: number;
      elasticity: number;
      borderRadius: number;
      overLight: boolean;
      reducedMotion: boolean;
      highContrast: boolean;
      withoutEffects: boolean;
      withLiquidBlur: boolean;
      withBorder: boolean;
      withTimeAnimation: boolean;
      animationSpeed: number;
      withMultiLayerDistortion: boolean;
      distortionOctaves: number;
      distortionLacunarity: number;
      distortionGain: number;
      distortionQuality: 'low' | 'medium' | 'high' | 'ultra';
      devicePreset: 'performance' | 'balanced' | 'quality';
      disableResponsiveBreakpoints: boolean;
      debugPerformance: boolean;
      debugOverLight: boolean;
    }>({
      displacementScale: 40,
      blurAmount: 1,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      borderRadius: 20,
      overLight: false,
      reducedMotion: false,
      highContrast: false,
      withoutEffects: false,
      withLiquidBlur: false,
      withBorder: true,
      withTimeAnimation: true,
      animationSpeed: 1.0,
      withMultiLayerDistortion: false,
      distortionOctaves: 3,
      distortionLacunarity: 2.0,
      distortionGain: 0.5,
      distortionQuality: 'medium',
      devicePreset: 'balanced',
      disableResponsiveBreakpoints: false,
      debugPerformance: false,
      debugOverLight: false,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [autoPlay, setAutoPlay] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTag, setActiveTag] = useState<'all' | 'dark' | 'colorful' | 'light' | 'nature'>(
      'all'
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedMode, setSelectedMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>(
      'standard'
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedShader, setSelectedShader] = useState<
      'liquidGlass' | 'plasma' | 'waves' | 'noise' | 'appleFluid' | 'liquidMetal'
    >('liquidGlass');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showCode, setShowCode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [copiedCode, setCopiedCode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [controlTab, setControlTab] = useState<'optics' | 'animation' | 'responsive' | 'flags'>('optics');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const backgroundsArrayRef = useRef<typeof backgrounds | null>(null);

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
          borderRadius: 12,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          withoutEffects: false,
          withLiquidBlur: false,
          withBorder: true,
          withTimeAnimation: false,
          animationSpeed: 1.0,
          withMultiLayerDistortion: false,
          distortionOctaves: 3,
          distortionLacunarity: 2.0,
          distortionGain: 0.5,
          distortionQuality: 'medium' as const,
          devicePreset: 'balanced' as const,
          disableResponsiveBreakpoints: false,
          debugPerformance: false,
          debugOverLight: false,
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
          borderRadius: 20,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          withoutEffects: false,
          withLiquidBlur: false,
          withBorder: true,
          withTimeAnimation: true,
          animationSpeed: 1.0,
          withMultiLayerDistortion: false,
          distortionOctaves: 3,
          distortionLacunarity: 2.0,
          distortionGain: 0.5,
          distortionQuality: 'medium' as const,
          devicePreset: 'balanced' as const,
          disableResponsiveBreakpoints: false,
          debugPerformance: false,
          debugOverLight: false,
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
          borderRadius: 28,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          withoutEffects: false,
          withLiquidBlur: true,
          withBorder: true,
          withTimeAnimation: true,
          animationSpeed: 1.2,
          withMultiLayerDistortion: true,
          distortionOctaves: 5,
          distortionLacunarity: 2.5,
          distortionGain: 0.6,
          distortionQuality: 'high' as const,
          devicePreset: 'quality' as const,
          disableResponsiveBreakpoints: false,
          debugPerformance: false,
          debugOverLight: false,
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
          borderRadius: 32,
          overLight: false,
          reducedMotion: false,
          highContrast: false,
          withoutEffects: false,
          withLiquidBlur: true,
          withBorder: true,
          withTimeAnimation: true,
          animationSpeed: 1.5,
          withMultiLayerDistortion: true,
          distortionOctaves: 6,
          distortionLacunarity: 3.0,
          distortionGain: 0.7,
          distortionQuality: 'ultra' as const,
          devicePreset: 'quality' as const,
          disableResponsiveBreakpoints: false,
          debugPerformance: false,
          debugOverLight: false,
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
  borderRadius={${settings.borderRadius}}
  overLight={${settings.overLight}}
  mode="${selectedMode}"
  shaderVariant="${selectedShader}"
  reducedMotion={${settings.reducedMotion}}
  highContrast={${settings.highContrast}}
  withoutEffects={${settings.withoutEffects}}
  withLiquidBlur={${settings.withLiquidBlur}}
  withBorder={${settings.withBorder}}
  withTimeAnimation={${settings.withTimeAnimation}}
  animationSpeed={${settings.animationSpeed}}
  withMultiLayerDistortion={${settings.withMultiLayerDistortion}}
  distortionOctaves={${settings.distortionOctaves}}
  distortionLacunarity={${settings.distortionLacunarity}}
  distortionGain={${settings.distortionGain}}
  distortionQuality="${settings.distortionQuality}"
  devicePreset="${settings.devicePreset}"
  disableResponsiveBreakpoints={${settings.disableResponsiveBreakpoints}}
>
  <div className="your-content">
    {/* Your content here */}
  </div>
</AtomixGlass>`;
    };

    // ... rest of the component

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!autoPlay) return;
      const interval = setInterval(() => {
        setBackgroundIndex(prev => (prev + 1) % (backgroundsArrayRef.current?.length ?? 20));
      }, 4000);
      return () => clearInterval(interval);
    }, [autoPlay]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight')
          setBackgroundIndex(prev => (prev + 1) % (backgroundsArrayRef.current?.length ?? 20));
        if (e.key === 'ArrowLeft')
          setBackgroundIndex(
            prev =>
              (prev - 1 + (backgroundsArrayRef.current?.length ?? 20)) %
              (backgroundsArrayRef.current?.length ?? 20)
          );
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, []);

    const options = [
      { value: 'liquidGlass', label: 'Liquid Glass (Standard)' },
      { value: 'premiumGlass', label: 'Premium Glass' },
      { value: 'appleFluid', label: 'Apple Fluid' },
      { value: 'liquidMetal', label: 'Liquid Metal' },
      { value: 'basiBasi', label: 'Expert (BasiBasi)' },
      { value: 'plasma', label: 'Plasma (Legacy)' },
      { value: 'waves', label: 'Waves (Legacy)' },
      { value: 'noise', label: 'Noise (Legacy)' },
    ];

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

    // Backgrounds curated for glass testing: vivid colors, high contrast, varied light conditions
    const backgrounds: {
      url: string;
      label: string;
      tag: 'dark' | 'colorful' | 'light' | 'nature';
    }[] = [
      {
        url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600',
        label: 'Rainbow Gradient',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600',
        label: 'Mountain Peaks',
        tag: 'nature',
      },
      {
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1600',
        label: 'Aurora Borealis',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600',
        label: 'Neon City',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600',
        label: 'Purple Nebula',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1600',
        label: 'Liquid Ink',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&q=80&w=1600',
        label: 'Ocean Waves',
        tag: 'nature',
      },
      {
        url: 'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?auto=format&fit=crop&q=80&w=1600',
        label: 'Pink Sunset',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=1600',
        label: 'Starfield',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&q=80&w=1600',
        label: 'Flower Bloom',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
        label: 'Alpine Lake',
        tag: 'nature',
      },
      {
        url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1600',
        label: 'Coral Reef',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&q=80&w=1600',
        label: 'Storm Clouds',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1600',
        label: 'Green Forest',
        tag: 'nature',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600',
        label: 'Tropical Beach',
        tag: 'light',
      },
      {
        url: 'https://images.unsplash.com/photo-1544553543-ad91a1373103?auto=format&fit=crop&q=80&w=1600',
        label: 'Abstract Prism',
        tag: 'colorful',
      },
      {
        url: 'https://images.unsplash.com/photo-1517816630506-a8c5ccf61608?auto=format&fit=crop&q=80&w=1600',
        label: 'Desert Dunes',
        tag: 'light',
      },
      {
        url: 'https://images.unsplash.com/photo-1553984840-b8cbc34f5215?auto=format&fit=crop&q=80&w=1600',
        label: 'Neon Lights',
        tag: 'dark',
      },
      {
        url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=1600',
        label: 'Sunrise Mist',
        tag: 'light',
      },
      {
        url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1600',
        label: 'Vivid Abstract',
        tag: 'colorful',
      },
    ];

    return (
      <BackgroundWrapper backgrounds={backgrounds} activeIndex={backgroundIndex} padding="0">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          .premium-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            border: 2px solid #7AFFD7;
            margin-top: -6px;
            transition: transform 0.2s;
          }
          .premium-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          .premium-slider::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            height: 4px;
            background: transparent;
          }
        `,
          }}
        />
        <div className="u-w-100 u-p-3 u-p-lg-4" style={{ boxSizing: 'border-box' }}>
          <div
            className="u-grid u-gap-3 u-mx-auto"
            style={{
              gridTemplateColumns: 'minmax(300px, 340px) 1fr',
              maxWidth: '1600px',
              height: '100%',
              maxHeight: '100%',
            }}
          >
            {/* Control Panel Sidebar */}
            <div className="u-h-100 u-relative">
              <AtomixGlass blurAmount={3} elasticity={0} displacementScale={100} borderRadius={20}>
                <div
                  className="u-h-100 u-p-3 custom-scrollbar"
                  style={{
                    overflowY: 'auto',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                  }}
                >
                  {/* === HEADER === */}
                  <div className="u-mb-4">
                    <div
                      className="u-p-2 u-rounded u-mb-3"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                        border: '1px solid rgba(102,126,234,0.3)',
                      }}
                    >
                      <div className="u-flex u-items-center u-gap-3">
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            flexShrink: 0,
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.5)',
                          }}
                        >
                          ✦
                        </div>
                        <div>
                          <div
                            className="u-font-bold u-text-sm"
                            style={{
                              background:
                                'linear-gradient(90deg, #fff 0%, rgba(122,255,215,0.9) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              letterSpacing: '-0.3px',
                            }}
                          >
                            AtomixGlass Playground
                          </div>
                          <div className="u-text-xs u-opacity-60 u-mt-1">Live parameter editor</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  <div
                    className="u-mb-4 u-p-2 u-rounded"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${getPerformanceColor()}`,
                    }}
                  >
                    <div className="u-flex u-justify-between u-items-center u-mb-2">
                      <span className="u-text-white u-font-semibold u-text-xs">
                        Performance Score
                      </span>
                      <span
                        className="u-font-bold u-text-sm"
                        style={{ color: getPerformanceColor() }}
                      >
                        {Math.round(performanceScore)}/100
                      </span>
                    </div>
                    <div
                      className="u-w-100 u-rounded u-overflow-hidden"
                      style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <div
                        className="u-h-100"
                        style={{
                          width: `${performanceScore}%`,
                          background: getPerformanceColor(),
                          transition: 'all 0.3s ease-out',
                        }}
                      />
                    </div>
                    <div
                      className="u-mt-1 u-text-center u-font-medium"
                      style={{ color: getPerformanceColor(), fontSize: '10px' }}
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
                  <div className="u-mb-4">
                    <label
                      className="u-block u-mb-2 u-text-white u-font-semibold u-text-xs"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      ⚡ Quick Presets
                    </label>
                    <div
                      className="u-grid u-gap-2"
                      style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
                    >
                      {Object.entries(presets).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => applyPreset(key as keyof typeof presets)}
                          className="u-px-1 u-py-1 u-rounded u-text-white u-text-center u-relative u-overflow-hidden u-flex u-flex-column u-items-center u-justify-center"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          }}
                        >
                          <div
                            className="u-mb-1"
                            style={{
                              fontSize: '1.25rem',
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                            }}
                          >
                            {preset.icon}
                          </div>
                          <div
                            className="u-font-bold"
                            style={{ fontSize: '9px', letterSpacing: '0.3px' }}
                          >
                            {preset.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* === TAB NAVIGATION === */}
                  <div
                    className="u-flex u-gap-2 u-mb-4 u-p-1 u-rounded-pill"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {(['optics', 'animation', 'responsive', 'flags'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setControlTab(tab)}
                        className="u-flex-grow-1 u-py-2 u-text-xs u-font-bold u-rounded-pill u-cursor-pointer"
                        style={{
                          background: controlTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                          color: controlTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
                          border: 'none',
                          textTransform: 'capitalize',
                          transition: 'all 0.2s',
                          boxShadow: controlTab === tab ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div style={{ minHeight: '300px' }}>
                    {/* === CONTROLS: OPTICS === */}
                    {controlTab === 'optics' && (
                      <div className="u-mb-4 u-animation-fade-in">
                        <div className="u-flex u-items-center u-gap-2 u-mb-3">
                          <div
                            style={{
                              width: '3px',
                              height: '14px',
                              background: 'linear-gradient(180deg, #7AFFD7 0%, #667eea 100%)',
                              borderRadius: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            className="u-text-xs u-font-bold u-opacity-60"
                            style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                          >
                            Optics
                          </span>
                        </div>
                        {(
                          [
                            'displacementScale',
                            'blurAmount',
                            'saturation',
                            'aberrationIntensity',
                          ] as const
                        ).map(key => {
                          const value = settings[key];
                          const max =
                            key === 'displacementScale'
                              ? 200
                              : key === 'saturation'
                                ? 300
                                : key === 'aberrationIntensity'
                                  ? 10
                                  : key === 'blurAmount'
                                    ? 10
                                    : 1;
                          const step =
                            key === 'aberrationIntensity' || key === 'blurAmount' ? 0.01 : 1;
                          const label = key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, s => s.toUpperCase());
                          return (
                            <div key={key} className="u-mb-4">
                              <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                <label className="u-text-xs u-font-medium u-opacity-80">
                                  {label}
                                </label>
                                <span
                                  className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                  style={{
                                    background: 'rgba(122,255,215,0.12)',
                                    color: '#7AFFD7',
                                    fontVariantNumeric: 'tabular-nums',
                                    minWidth: '40px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {(value as number).toFixed(
                                    key === 'aberrationIntensity' || key === 'blurAmount' ? 2 : 0
                                  )}
                                </span>
                              </div>
                              <div className="u-relative" style={{ height: '20px' }}>
                                <input
                                  type="range"
                                  min={0}
                                  max={max}
                                  step={step}
                                  value={value as number}
                                  onChange={e =>
                                    setSettings(prev => ({
                                      ...prev,
                                      [key]: parseFloat(e.target.value),
                                    }))
                                  }
                                  className="premium-slider u-absolute u-w-100 u-m-0"
                                  style={{
                                    height: '2px',
                                    background: `linear-gradient(to right, #7AFFD7 ${((value as number) / max) * 100}%, rgba(255,255,255,0.15) ${((value as number) / max) * 100}%)`,
                                    borderRadius: '2px',
                                    outline: 'none',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* === CONTROLS: ANIMATION (PHASE 1) === */}
                    {controlTab === 'animation' && (
                      <>
                        <div className="u-mb-4 u-animation-fade-in">
                          <div className="u-flex u-items-center u-gap-2 u-mb-3">
                            <div
                              style={{
                                width: '3px',
                                height: '14px',
                                background: 'linear-gradient(180deg, #a78bfa 0%, #ec4899 100%)',
                                borderRadius: '2px',
                                flexShrink: 0,
                              }}
                            />
                            <span
                              className="u-text-xs u-font-bold u-opacity-60"
                              style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                            >
                              Physics
                            </span>
                          </div>
                          {(['elasticity', 'borderRadius'] as const).map(key => {
                            const value = settings[key];
                            const max = key === 'borderRadius' ? 100 : 1;
                            const step = key === 'elasticity' ? 0.01 : 1;
                            const label = key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, s => s.toUpperCase());
                            return (
                              <div key={key} className="u-mb-4">
                                <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                  <label className="u-text-xs u-font-medium u-opacity-80">
                                    {label}
                                  </label>
                                  <span
                                    className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                    style={{
                                      background: 'rgba(167,139,250,0.12)',
                                      color: '#a78bfa',
                                      fontVariantNumeric: 'tabular-nums',
                                      minWidth: '40px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {(value as number).toFixed(key === 'elasticity' ? 2 : 0)}
                                  </span>
                                </div>
                                <div className="u-relative" style={{ height: '20px' }}>
                                  <input
                                    type="range"
                                    min={0}
                                    max={max}
                                    step={step}
                                    value={value as number}
                                    onChange={e =>
                                      setSettings(prev => ({
                                        ...prev,
                                        [key]: parseFloat(e.target.value),
                                      }))
                                    }
                                    className="premium-slider u-absolute u-w-100 u-m-0"
                                    style={{
                                      height: '2px',
                                      background: `linear-gradient(to right, #a78bfa ${((value as number) / max) * 100}%, rgba(255,255,255,0.15) ${((value as number) / max) * 100}%)`,
                                      borderRadius: '2px',
                                      outline: 'none',
                                      appearance: 'none',
                                      WebkitAppearance: 'none',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Animation System Controls */}
                        <div className="u-mb-4 u-animation-fade-in">
                          <div className="u-flex u-items-center u-gap-2 u-mb-3">
                            <div
                              style={{
                                width: '3px',
                                height: '14px',
                                background: 'linear-gradient(180deg, #f472b6 0%, #a78bfa 100%)',
                                borderRadius: '2px',
                                flexShrink: 0,
                              }}
                            />
                            <span
                              className="u-text-xs u-font-bold u-opacity-60"
                              style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                            >
                              Animation System
                            </span>
                          </div>

                          {/* Time Animation Toggle */}
                          <div className="u-mb-3">
                            <button
                              onClick={() => setSettings(prev => ({ ...prev, withTimeAnimation: !prev.withTimeAnimation }))}
                              className="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded u-text-start u-w-100"
                              style={{
                                background: settings.withTimeAnimation
                                  ? 'rgba(244,114,182,0.15)'
                                  : 'rgba(255,255,255,0.04)',
                                border: settings.withTimeAnimation
                                  ? '1px solid rgba(244,114,182,0.45)'
                                  : '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              <div
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: settings.withTimeAnimation ? '#f472b6' : 'rgba(255,255,255,0.2)',
                                  flexShrink: 0,
                                  boxShadow: settings.withTimeAnimation ? '0 0 8px rgba(244,114,182,0.6)' : 'none',
                                }}
                              />
                              <span
                                className="u-text-xs u-font-medium"
                                style={{ 
                                  color: settings.withTimeAnimation ? '#f472b6' : 'rgba(255,255,255,0.6)',
                                  flex: 1 
                                }}
                              >
                                Time Animation
                              </span>
                            </button>
                          </div>

                          {/* Animation Speed */}
                          {settings.withTimeAnimation && (
                            <div className="u-mb-4">
                              <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                <label className="u-text-xs u-font-medium u-opacity-80">
                                  Animation Speed
                                </label>
                                <span
                                  className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                  style={{
                                    background: 'rgba(244,114,182,0.12)',
                                    color: '#f472b6',
                                    fontVariantNumeric: 'tabular-nums',
                                    minWidth: '40px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {settings.animationSpeed.toFixed(1)}x
                                </span>
                              </div>
                              <div className="u-relative" style={{ height: '20px' }}>
                                <input
                                  type="range"
                                  min={0}
                                  max={3}
                                  step={0.1}
                                  value={settings.animationSpeed}
                                  onChange={e =>
                                    setSettings(prev => ({
                                      ...prev,
                                      animationSpeed: parseFloat(e.target.value),
                                    }))
                                  }
                                  className="premium-slider u-absolute u-w-100 u-m-0"
                                  style={{
                                    height: '2px',
                                    background: `linear-gradient(to right, #f472b6 ${((settings.animationSpeed / 3) * 100)}%, rgba(255,255,255,0.15) ${((settings.animationSpeed / 3) * 100)}%)`,
                                    borderRadius: '2px',
                                    outline: 'none',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Multi-Layer Distortion Toggle */}
                          <div className="u-mb-3">
                            <button
                              onClick={() => setSettings(prev => ({ ...prev, withMultiLayerDistortion: !prev.withMultiLayerDistortion }))}
                              className="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded u-text-start u-w-100"
                              style={{
                                background: settings.withMultiLayerDistortion
                                  ? 'rgba(167,139,250,0.15)'
                                  : 'rgba(255,255,255,0.04)',
                                border: settings.withMultiLayerDistortion
                                  ? '1px solid rgba(167,139,250,0.45)'
                                  : '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              <div
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: settings.withMultiLayerDistortion ? '#a78bfa' : 'rgba(255,255,255,0.2)',
                                  flexShrink: 0,
                                  boxShadow: settings.withMultiLayerDistortion ? '0 0 8px rgba(167,139,250,0.6)' : 'none',
                                }}
                              />
                              <span
                                className="u-text-xs u-font-medium"
                                style={{ 
                                  color: settings.withMultiLayerDistortion ? '#a78bfa' : 'rgba(255,255,255,0.6)',
                                  flex: 1 
                                }}
                              >
                                Multi-Layer Distortion
                              </span>
                            </button>
                          </div>

                          {/* FBM Parameters */}
                          {settings.withMultiLayerDistortion && (
                            <>
                              {/* Octaves */}
                              <div className="u-mb-3">
                                <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                  <label className="u-text-xs u-font-medium u-opacity-80">
                                    Octaves
                                  </label>
                                  <span
                                    className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                    style={{
                                      background: 'rgba(167,139,250,0.12)',
                                      color: '#a78bfa',
                                      fontVariantNumeric: 'tabular-nums',
                                      minWidth: '40px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {settings.distortionOctaves}
                                  </span>
                                </div>
                                <div className="u-relative" style={{ height: '20px' }}>
                                  <input
                                    type="range"
                                    min={1}
                                    max={8}
                                    step={1}
                                    value={settings.distortionOctaves}
                                    onChange={e =>
                                      setSettings(prev => ({
                                        ...prev,
                                        distortionOctaves: parseInt(e.target.value),
                                      }))
                                    }
                                    className="premium-slider u-absolute u-w-100 u-m-0"
                                    style={{
                                      height: '2px',
                                      background: `linear-gradient(to right, #a78bfa ${(settings.distortionOctaves / 8) * 100}%, rgba(255,255,255,0.15) ${(settings.distortionOctaves / 8) * 100}%)`,
                                      borderRadius: '2px',
                                      outline: 'none',
                                      appearance: 'none',
                                      WebkitAppearance: 'none',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Lacunarity */}
                              <div className="u-mb-3">
                                <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                  <label className="u-text-xs u-font-medium u-opacity-80">
                                    Lacunarity
                                  </label>
                                  <span
                                    className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                    style={{
                                      background: 'rgba(167,139,250,0.12)',
                                      color: '#a78bfa',
                                      fontVariantNumeric: 'tabular-nums',
                                      minWidth: '40px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {settings.distortionLacunarity.toFixed(1)}
                                  </span>
                                </div>
                                <div className="u-relative" style={{ height: '20px' }}>
                                  <input
                                    type="range"
                                    min={1}
                                    max={4}
                                    step={0.1}
                                    value={settings.distortionLacunarity}
                                    onChange={e =>
                                      setSettings(prev => ({
                                        ...prev,
                                        distortionLacunarity: parseFloat(e.target.value),
                                      }))
                                    }
                                    className="premium-slider u-absolute u-w-100 u-m-0"
                                    style={{
                                      height: '2px',
                                      background: `linear-gradient(to right, #a78bfa ${((settings.distortionLacunarity - 1) / 3) * 100}%, rgba(255,255,255,0.15) ${((settings.distortionLacunarity - 1) / 3) * 100}%)`,
                                      borderRadius: '2px',
                                      outline: 'none',
                                      appearance: 'none',
                                      WebkitAppearance: 'none',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Gain */}
                              <div className="u-mb-3">
                                <div className="u-flex u-justify-between u-items-baseline u-mb-1">
                                  <label className="u-text-xs u-font-medium u-opacity-80">
                                    Gain
                                  </label>
                                  <span
                                    className="u-text-xs u-font-bold u-px-2 u-py-1 u-rounded"
                                    style={{
                                      background: 'rgba(167,139,250,0.12)',
                                      color: '#a78bfa',
                                      fontVariantNumeric: 'tabular-nums',
                                      minWidth: '40px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {settings.distortionGain.toFixed(2)}
                                  </span>
                                </div>
                                <div className="u-relative" style={{ height: '20px' }}>
                                  <input
                                    type="range"
                                    min={0.1}
                                    max={1}
                                    step={0.01}
                                    value={settings.distortionGain}
                                    onChange={e =>
                                      setSettings(prev => ({
                                        ...prev,
                                        distortionGain: parseFloat(e.target.value),
                                      }))
                                    }
                                    className="premium-slider u-absolute u-w-100 u-m-0"
                                    style={{
                                      height: '2px',
                                      background: `linear-gradient(to right, #a78bfa ${((settings.distortionGain - 0.1) / 0.9) * 100}%, rgba(255,255,255,0.15) ${((settings.distortionGain - 0.1) / 0.9) * 100}%)`,
                                      borderRadius: '2px',
                                      outline: 'none',
                                      appearance: 'none',
                                      WebkitAppearance: 'none',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    
                    {/* === CONTROLS: RESPONSIVE & PERFORMANCE === */}
                    {controlTab === 'responsive' && (
                      <div className="u-mb-4 u-animation-fade-in">
                        <div className="u-flex u-items-center u-gap-2 u-mb-3">
                          <div
                            style={{
                              width: '3px',
                              height: '14px',
                              background: 'linear-gradient(180deg, #10b981 0%, #3b82f6 100%)',
                              borderRadius: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            className="u-text-xs u-font-bold u-opacity-60"
                            style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                          >
                            Responsive & Performance
                          </span>
                        </div>
                    
                        {/* Device Preset Selector */}
                        <div className="u-mb-4">
                          <label className="u-block u-mb-2 u-text-white u-font-semibold u-text-xs">
                            Device Preset
                          </label>
                          <div
                            className="u-grid u-gap-2"
                            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                          >
                            {(['performance', 'balanced', 'quality'] as const).map(preset => (
                              <button
                                key={preset}
                                onClick={() => setSettings(prev => ({ ...prev, devicePreset: preset }))}
                                className="u-py-2 u-rounded u-text-center u-text-xs u-font-bold"
                                style={{
                                  background:
                                    settings.devicePreset === preset
                                      ? 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(59,130,246,0.2) 100%)'
                                      : 'rgba(255,255,255,0.05)',
                                  border:
                                    settings.devicePreset === preset
                                      ? '1px solid rgba(16,185,129,0.5)'
                                      : '1px solid rgba(255,255,255,0.1)',
                                  color: settings.devicePreset === preset ? '#10b981' : 'rgba(255,255,255,0.55)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  outline: 'none',
                                  textTransform: 'capitalize',
                                  boxShadow:
                                    settings.devicePreset === preset ? '0 2px 12px rgba(16,185,129,0.15)' : 'none',
                                }}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                          <p className="u-mt-2 u-text-xs u-opacity-60">
                            {settings.devicePreset === 'performance' && '⚡ Optimized for low-end devices with reduced quality'}
                            {settings.devicePreset === 'balanced' && '⚖️ Balanced quality and performance (recommended)'}
                            {settings.devicePreset === 'quality' && '💎 Maximum visual quality for high-end devices'}
                          </p>
                        </div>
                    
                        {/* Disable Responsive Breakpoints Toggle */}
                        <div className="u-mb-4">
                          <button
                            onClick={() => setSettings(prev => ({ ...prev, disableResponsiveBreakpoints: !prev.disableResponsiveBreakpoints }))}
                            className="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded u-text-start u-w-100"
                            style={{
                              background: settings.disableResponsiveBreakpoints
                                ? 'rgba(239,68,68,0.15)'
                                : 'rgba(255,255,255,0.04)',
                              border: settings.disableResponsiveBreakpoints
                                ? '1px solid rgba(239,68,68,0.45)'
                                : '1px solid rgba(255,255,255,0.1)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: settings.disableResponsiveBreakpoints ? '#ef4444' : 'rgba(255,255,255,0.2)',
                                flexShrink: 0,
                                boxShadow: settings.disableResponsiveBreakpoints ? '0 0 8px rgba(239,68,68,0.6)' : 'none',
                              }}
                            />
                            <span
                              className="u-text-xs u-font-medium"
                              style={{ 
                                color: settings.disableResponsiveBreakpoints ? '#ef4444' : 'rgba(255,255,255,0.6)',
                                flex: 1 
                              }}
                            >
                              Disable Responsive Breakpoints
                            </span>
                          </button>
                          <p className="u-mt-1 u-text-xs u-opacity-50">
                            When enabled, prevents automatic parameter adjustment based on viewport size
                          </p>
                        </div>
                    
                        {/* Debug Options */}
                        <div className="u-mb-3">
                          <label className="u-block u-mb-2 u-text-white u-font-semibold u-text-xs">
                            🔍 Debug Options
                          </label>
                          <div className="u-grid u-gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            {(
                              [
                                'debugPerformance',
                                'debugOverLight',
                              ] as const
                            ).map(key => {
                              const isOn = settings[key] as boolean;
                              const label = key
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, s => s.toUpperCase());
                              return (
                                <button
                                  key={key}
                                  onClick={() => setSettings(prev => ({ ...prev, [key]: !isOn }))}
                                  className="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded u-text-start"
                                  style={{
                                    background: isOn
                                      ? 'rgba(59,130,246,0.15)'
                                      : 'rgba(255,255,255,0.04)',
                                    border: isOn
                                      ? '1px solid rgba(59,130,246,0.45)'
                                      : '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      background: isOn ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                                      flexShrink: 0,
                                      boxShadow: isOn ? '0 0 8px rgba(59,130,246,0.6)' : 'none',
                                      transition: 'all 0.2s',
                                    }}
                                  />
                                  <span
                                    className="u-text-xs u-font-medium"
                                    style={{ color: isOn ? '#3b82f6' : 'rgba(255,255,255,0.6)' }}
                                  >
                                    {label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* === CONTROLS: ACCESSIBILITY FLAGS === */}
                    {controlTab === 'flags' && (
                      <div className="u-mb-4 u-animation-fade-in">
                        <div className="u-flex u-items-center u-gap-2 u-mb-3">
                          <div
                            style={{
                              width: '3px',
                              height: '14px',
                              background: 'linear-gradient(180deg, #f59e0b 0%, #ef4444 100%)',
                              borderRadius: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            className="u-text-xs u-font-bold u-opacity-60"
                            style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                          >
                            Flags
                          </span>
                        </div>
                        <div className="u-grid u-gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                          {(
                            [
                              'overLight',
                              'reducedMotion',
                              'highContrast',
                              'withoutEffects',
                              'withLiquidBlur',
                              'withBorder',
                            ] as const
                          ).map(key => {
                            const isOn = settings[key] as boolean;
                            const label = key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, s => s.toUpperCase());
                            return (
                              <button
                                key={key}
                                onClick={() => setSettings(prev => ({ ...prev, [key]: !isOn }))}
                                className="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded u-text-start"
                                style={{
                                  background: isOn
                                    ? 'rgba(122,255,215,0.1)'
                                    : 'rgba(255,255,255,0.04)',
                                  border: isOn
                                    ? '1px solid rgba(122,255,215,0.35)'
                                    : '1px solid rgba(255,255,255,0.1)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  outline: 'none',
                                }}
                              >
                                <div
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: isOn ? '#7AFFD7' : 'rgba(255,255,255,0.2)',
                                    flexShrink: 0,
                                    boxShadow: isOn ? '0 0 8px rgba(122,255,215,0.6)' : 'none',
                                    transition: 'all 0.2s',
                                  }}
                                />
                                <span
                                  className="u-text-xs u-font-medium"
                                  style={{ color: isOn ? '#7AFFD7' : 'rgba(255,255,255,0.6)' }}
                                >
                                  {label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* === GLASS MODE === */}
                  <div className="u-mb-4">
                    <div className="u-flex u-items-center u-gap-2 u-mb-2">
                      <div
                        style={{
                          width: '3px',
                          height: '14px',
                          background: 'linear-gradient(180deg, #60a5fa 0%, #7AFFD7 100%)',
                          borderRadius: '2px',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        className="u-text-xs u-font-bold u-opacity-60"
                        style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                      >
                        Glass Mode
                      </span>
                    </div>
                    <div
                      className="u-grid u-gap-2"
                      style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
                    >
                      {(['standard', 'polar', 'prominent', 'shader'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => setSelectedMode(mode)}
                          className="u-py-2 u-rounded u-text-center u-text-xs u-font-bold"
                          style={{
                            background:
                              selectedMode === mode
                                ? 'linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(122,255,215,0.2) 100%)'
                                : 'rgba(255,255,255,0.05)',
                            border:
                              selectedMode === mode
                                ? '1px solid rgba(122,255,215,0.5)'
                                : '1px solid rgba(255,255,255,0.1)',
                            color: selectedMode === mode ? '#7AFFD7' : 'rgba(255,255,255,0.55)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            outline: 'none',
                            textTransform: 'capitalize',
                            boxShadow:
                              selectedMode === mode ? '0 2px 12px rgba(122,255,215,0.15)' : 'none',
                          }}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* === SHADER VARIANT === */}
                  {selectedMode === 'shader' && (
                    <div className="u-mb-4">
                      <div className="u-flex u-items-center u-gap-2 u-mb-2">
                        <div
                          style={{
                            width: '3px',
                            height: '14px',
                            background: 'linear-gradient(180deg, #f472b6 0%, #a78bfa 100%)',
                            borderRadius: '2px',
                            flexShrink: 0,
                          }}
                        />
                        <span
                          className="u-text-xs u-font-bold u-opacity-60"
                          style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                        >
                          Shader Variant
                        </span>
                      </div>
                      <div className="u-grid u-gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {options.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setSelectedShader(opt.value as any)}
                            className="u-py-2 u-px-3 u-rounded u-text-start u-text-xs u-font-medium"
                            style={{
                              background:
                                selectedShader === opt.value
                                  ? 'rgba(167,139,250,0.15)'
                                  : 'rgba(255,255,255,0.04)',
                              border:
                                selectedShader === opt.value
                                  ? '1px solid rgba(167,139,250,0.45)'
                                  : '1px solid rgba(255,255,255,0.08)',
                              color:
                                selectedShader === opt.value ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              outline: 'none',
                            }}
                          >
                            {opt.label.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Background Control */}
                  <div className="u-mb-4">
                    {/* Header row: label + nav controls */}
                    <div className="u-flex u-items-center u-justify-between u-mb-2">
                      <label className="u-block u-text-white u-font-semibold u-text-sm">
                        🌄 Background
                      </label>
                      <div className="u-flex u-items-center u-gap-2">
                        {/* Prev / Next */}
                        <button
                          onClick={() =>
                            setBackgroundIndex(
                              prev => (prev - 1 + backgrounds.length) % backgrounds.length
                            )
                          }
                          title="Previous background (←)"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '6px',
                            color: '#fff',
                            cursor: 'pointer',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          ‹
                        </button>
                        <span
                          className="u-text-xs u-opacity-60"
                          style={{
                            minWidth: '36px',
                            textAlign: 'center',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {backgroundIndex + 1}/{backgrounds.length}
                        </span>
                        <button
                          onClick={() =>
                            setBackgroundIndex(prev => (prev + 1) % backgrounds.length)
                          }
                          title="Next background (→)"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '6px',
                            color: '#fff',
                            cursor: 'pointer',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          ›
                        </button>
                        {/* Auto-play */}
                        <button
                          onClick={() => setAutoPlay(p => !p)}
                          title={autoPlay ? 'Pause slideshow' : 'Start slideshow'}
                          style={{
                            background: autoPlay
                              ? 'rgba(122,255,215,0.15)'
                              : 'rgba(255,255,255,0.08)',
                            border: autoPlay
                              ? '1px solid rgba(122,255,215,0.4)'
                              : '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '6px',
                            color: autoPlay ? '#7AFFD7' : 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '13px',
                            transition: 'all 0.2s',
                          }}
                        >
                          {autoPlay ? '⏸' : '▶'}
                        </button>
                      </div>
                    </div>
                    {/* Tag filter row */}
                    <div className="u-flex u-gap-2 u-mb-3" style={{ flexWrap: 'wrap' }}>
                      {(['all', 'dark', 'colorful', 'light', 'nature'] as const).map(tag => (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(tag)}
                          style={{
                            padding: '2px 10px',
                            borderRadius: '20px',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            border:
                              activeTag === tag
                                ? '1px solid rgba(122,255,215,0.5)'
                                : '1px solid rgba(255,255,255,0.15)',
                            background:
                              activeTag === tag
                                ? 'rgba(122,255,215,0.15)'
                                : 'rgba(255,255,255,0.06)',
                            color: activeTag === tag ? '#7AFFD7' : 'rgba(255,255,255,0.55)',
                            transition: 'all 0.18s',
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    {/* Thumbnail grid */}
                    <div
                      className="u-grid u-gap-2"
                      style={{
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        paddingRight: '4px',
                      }}
                    >
                      {backgrounds
                        .map((bg, idx) => ({ bg, idx }))
                        .filter(({ bg }) => activeTag === 'all' || bg.tag === activeTag)
                        .map(({ bg, idx }) => (
                          <button
                            key={idx}
                            onClick={() => setBackgroundIndex(idx)}
                            className="u-relative u-rounded u-overflow-hidden u-cursor-pointer"
                            title={bg.label}
                            style={{
                              aspectRatio: '1.4',
                              border:
                                backgroundIndex === idx
                                  ? '2px solid #7AFFD7'
                                  : '2px solid rgba(255,255,255,0.1)',
                              padding: 0,
                              background: 'transparent',
                              transition: 'all 0.2s',
                              transform: backgroundIndex === idx ? 'scale(0.95)' : 'scale(1)',
                              opacity: backgroundIndex === idx ? 1 : 0.7,
                              boxShadow:
                                backgroundIndex === idx
                                  ? '0 0 0 1px rgba(122,255,215,0.3), 0 4px 12px rgba(0,0,0,0.3)'
                                  : 'none',
                            }}
                            onMouseEnter={e => {
                              if (backgroundIndex !== idx) {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'scale(1.06)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                              }
                            }}
                            onMouseLeave={e => {
                              if (backgroundIndex !== idx) {
                                e.currentTarget.style.opacity = '0.7';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                              }
                            }}
                          >
                            <img
                              src={bg.url}
                              alt={bg.label}
                              className="u-w-100 u-h-100"
                              style={{ objectFit: 'cover', display: 'block' }}
                            />
                            {backgroundIndex === idx && (
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'rgba(122,255,215,0.12)',
                                  display: 'flex',
                                  alignItems: 'flex-end',
                                  padding: '3px 4px',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '8px',
                                    fontWeight: 700,
                                    color: '#7AFFD7',
                                    letterSpacing: '0.3px',
                                    lineHeight: 1,
                                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                  }}
                                >
                                  ✓ Active
                                </span>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                    {/* Current bg label */}
                    <div className="u-mt-2 u-flex u-items-center u-gap-2">
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#7AFFD7',
                          boxShadow: '0 0 6px rgba(122,255,215,0.6)',
                          flexShrink: 0,
                        }}
                      />
                      <span className="u-text-xs u-opacity-70" style={{ fontWeight: 600 }}>
                        {backgrounds[backgroundIndex]?.label}
                      </span>
                      <span
                        className="u-text-xs u-opacity-40"
                        style={{ textTransform: 'capitalize', marginLeft: 'auto' }}
                      >
                        {backgrounds[backgroundIndex]?.tag}
                      </span>
                    </div>
                    <div className="u-mt-1 u-text-xs u-opacity-35" style={{ letterSpacing: '0.3px' }}>
                      Use ← → arrow keys to navigate
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="u-grid u-gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowCode(!showCode)}
                      className="u-w-100"
                    >
                      {showCode ? '👁️ Hide' : '💻 Code'}
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={copyCode}
                      className="u-w-100 u-relative u-overflow-hidden"
                    >
                      {copiedCode ? (
                        <span className="u-text-success u-font-bold">✓ Copied!</span>
                      ) : (
                        '📋 Copy'
                      )}
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={exportConfig}
                      className="u-w-100"
                    >
                      💾 Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSettings({
                          displacementScale: 120,
                          blurAmount: 0,
                          saturation: 140,
                          aberrationIntensity: 2,
                          elasticity: 0.15,
                          borderRadius: 20,
                          overLight: false,
                          reducedMotion: false,
                          highContrast: false,
                          withoutEffects: false,
                          withLiquidBlur: false,
                          withBorder: true,
                          withTimeAnimation: true,
                          animationSpeed: 1.0,
                          withMultiLayerDistortion: false,
                          distortionOctaves: 3,
                          distortionLacunarity: 2.0,
                          distortionGain: 0.5,
                          distortionQuality: 'medium',
                          devicePreset: 'balanced',
                          disableResponsiveBreakpoints: false,
                          debugPerformance: false,
                          debugOverLight: false,
                        });
                        setSelectedMode('standard');
                        setSelectedShader('liquidGlass');
                      }}
                      className="u-w-100"
                    >
                      🔄 Reset
                    </Button>
                  </div>
                </div>
              </AtomixGlass>
            </div>
            {/* Preview Area */}
            <div className="u-h-100 u-flex u-items-center u-justify-center u-relative u-overflow-hidden">
              <div className="u-w-100 u-h-100 u-flex u-items-center u-justify-center u-p-2 u-p-lg-4">
                {showCode ? (
                  <div className="u-w-100 u-h-100 u-flex u-items-center">
                    <AtomixGlass
                      displacementScale={80}
                      aberrationIntensity={1}
                      borderRadius={20}
                      saturation={120}
                    >
                      <div className="u-p-6">
                        <div className="u-flex u-justify-between u-items-center u-mb-6">
                          <div>
                            <h3
                              className="u-m-0 u-font-bold u-text-xl"
                              style={{
                                background:
                                  'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              💻 Generated Code
                            </h3>
                            <p className="u-m-0 u-text-sm u-text-white u-opacity-70 u-mt-1">
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
                          className="custom-scrollbar u-rounded u-text-sm"
                          style={{
                            overflowX: 'auto',
                            overflowY: 'auto',
                            background: 'rgba(0,0,0,0.6)',
                            padding: '1.75rem',
                            maxHeight: '400px',
                            color: '#7AFFD7',
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
                    borderRadius={settings.borderRadius}
                    overLight={settings.overLight}
                    mode={selectedMode}
                    shaderVariant={selectedShader as any}
                    reducedMotion={settings.reducedMotion}
                    highContrast={settings.highContrast}
                    withoutEffects={settings.withoutEffects}
                    withLiquidBlur={settings.withLiquidBlur}
                    withBorder={settings.withBorder}
                    withTimeAnimation={settings.withTimeAnimation}
                    animationSpeed={settings.animationSpeed}
                    withMultiLayerDistortion={settings.withMultiLayerDistortion}
                    distortionOctaves={settings.distortionOctaves}
                    distortionLacunarity={settings.distortionLacunarity}
                    distortionGain={settings.distortionGain}
                    distortionQuality={settings.distortionQuality}
                    devicePreset={settings.devicePreset}
                    disableResponsiveBreakpoints={settings.disableResponsiveBreakpoints}
                    debugPerformance={settings.debugPerformance}
                  >
                    <div className="u-h-100 u-w-100 custom-scrollbar" style={{ overflowY: 'auto' }}>
                      <div className="u-p-4 u-p-lg-5 u-text-center">
                        <div
                          className="u-inline-flex u-items-center u-gap-2 u-px-3 u-py-1 u-rounded-pill u-mb-4 u-text-xs u-font-bold"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(122, 255, 215, 0.2) 0%, rgba(102, 126, 234, 0.2) 100%)',
                            border: '1px solid rgba(122, 255, 215, 0.3)',
                            color: '#7AFFD7',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 16px rgba(122, 255, 215, 0.1)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <span className="u-text-base">✨</span>
                          <span>LIVE PREVIEW</span>
                        </div>

                        <div className="u-w-100 u-flex u-justify-center u-mb-6">
                          <div
                            className="u-flex u-items-center u-justify-center u-rounded-circle"
                            style={{
                              width: '80px',
                              height: '80px',
                              background:
                                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              fontSize: '48px',
                              boxShadow:
                                '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255,255,255,0.4)',
                              backdropFilter: 'blur(12px)',
                              animation: 'float 6s ease-in-out infinite',
                            }}
                          >
                            <style>{`
                            @keyframes float {
                              0% { transform: translateY(0px) rotate(0deg); }
                              50% { transform: translateY(-10px) rotate(5deg); }
                              100% { transform: translateY(0px) rotate(0deg); }
                            }
                          `}</style>
                            💎
                          </div>
                        </div>

                        <h2
                          className="u-mb-2 u-font-bold"
                          style={{
                            fontSize: '2.5rem',
                            lineHeight: '1.1',
                            background:
                              'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.6) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-1.5px',
                            textShadow: '0 4px 24px rgba(255,255,255,0.2)',
                          }}
                        >
                          Atomix Glass
                        </h2>
                        <p
                          className="u-mb-6 u-mx-auto u-opacity-90"
                          style={{
                            fontSize: '1rem',
                            lineHeight: 1.5,
                            maxWidth: '540px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                          }}
                        >
                          A meticulously crafted, highly performant WebGL displacement system for
                          creating stunning frosted glass effects in modern web applications.
                        </p>

                        <div className="u-flex u-justify-center u-gap-3 u-flex-wrap">
                          <Button
                            variant="primary"
                            size="md"
                            className="u-px-5 u-font-bold"
                            style={{ borderRadius: '12px' }}
                          >
                            Get Started Today
                          </Button>
                          <Button
                            variant="outline-light"
                            size="md"
                            className="u-px-5 u-font-bold"
                            style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}
                          >
                            View Documentation
                          </Button>
                        </div>
                        {/* Dynamic Info Panel */}
                        <div className="u-mt-6 u-grid u-gap-3">
                          {/* Current Configuration */}
                          <div
                            className="u-p-4 u-rounded u-text-start"
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <div
                              className="u-mb-3 u-font-bold u-text-sm"
                              style={{ color: '#7AFFD7', letterSpacing: '0.5px' }}
                            >
                              📊 Current Configuration Stack
                            </div>
                            <div
                              className="u-grid u-gap-3"
                              style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}
                            >
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">Mode</span>
                                <span
                                  className="u-text-sm u-font-bold u-text-white"
                                  style={{ textTransform: 'capitalize' }}
                                >
                                  {selectedMode}
                                </span>
                              </div>
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">Shader</span>
                                <span
                                  className="u-text-sm u-font-bold u-text-white"
                                  style={{ textTransform: 'capitalize' }}
                                >
                                  {selectedShader}
                                </span>
                              </div>
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">
                                  Displacement
                                </span>
                                <span className="u-text-sm u-font-bold u-text-white">
                                  {settings.displacementScale}px
                                </span>
                              </div>
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">
                                  Aberration
                                </span>
                                <span className="u-text-sm u-font-bold u-text-white">
                                  {settings.aberrationIntensity.toFixed(1)}
                                </span>
                              </div>
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">Blur</span>
                                <span className="u-text-sm u-font-bold u-text-white">
                                  {settings.blurAmount.toFixed(2)}
                                </span>
                              </div>
                              <div className="u-flex u-flex-column u-gap-1">
                                <span className="u-text-xs u-opacity-60 u-font-medium">
                                  Elasticity
                                </span>
                                <span className="u-text-sm u-font-bold u-text-white">
                                  {settings.elasticity.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Visual Characteristics */}
                          <div
                            className="u-p-4 u-rounded u-text-start"
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <div
                              className="u-mb-3 u-font-bold u-text-sm"
                              style={{ color: '#7AFFD7', letterSpacing: '0.5px' }}
                            >
                              🎨 Visual Characteristics
                            </div>
                            <div className="u-flex u-flex-wrap u-gap-2">
                              <div
                                className="u-px-3 u-py-1 u-rounded-pill u-text-xs u-font-bold"
                                style={{
                                  background: settings.withLiquidBlur
                                    ? 'rgba(122, 255, 215, 0.15)'
                                    : 'rgba(255,255,255,0.05)',
                                  border: settings.withLiquidBlur
                                    ? '1px solid rgba(122, 255, 215, 0.4)'
                                    : '1px solid transparent',
                                  color: settings.withLiquidBlur
                                    ? '#7AFFD7'
                                    : 'rgba(255,255,255,0.6)',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {settings.withLiquidBlur ? '✓' : '○'} Liquid Blur
                              </div>
                              <div
                                className="u-px-3 u-py-1 u-rounded-pill u-text-xs u-font-bold"
                                style={{
                                  background: settings.withBorder
                                    ? 'rgba(122, 255, 215, 0.15)'
                                    : 'rgba(255,255,255,0.05)',
                                  border: settings.withBorder
                                    ? '1px solid rgba(122, 255, 215, 0.4)'
                                    : '1px solid transparent',
                                  color: settings.withBorder ? '#7AFFD7' : 'rgba(255,255,255,0.6)',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {settings.withBorder ? '✓' : '○'} Border Effect
                              </div>
                              <div
                                className="u-px-3 u-py-1 u-rounded-pill u-text-xs u-font-bold"
                                style={{
                                  background: settings.reducedMotion
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : 'rgba(255,255,255,0.05)',
                                  border: settings.reducedMotion
                                    ? '1px solid rgba(239, 68, 68, 0.4)'
                                    : '1px solid transparent',
                                  color: settings.reducedMotion
                                    ? '#EF4444'
                                    : 'rgba(255,255,255,0.6)',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {settings.reducedMotion ? '✓' : '○'} Reduced Motion
                              </div>
                              <div
                                className="u-px-3 u-py-1 u-rounded-pill u-text-xs u-font-bold"
                                style={{
                                  background: settings.highContrast
                                    ? 'rgba(245, 158, 11, 0.15)'
                                    : 'rgba(255,255,255,0.05)',
                                  border: settings.highContrast
                                    ? '1px solid rgba(245, 158, 11, 0.4)'
                                    : '1px solid transparent',
                                  color: settings.highContrast
                                    ? '#F59E0B'
                                    : 'rgba(255,255,255,0.6)',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {settings.highContrast ? '✓' : '○'} High Contrast
                              </div>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div
                            className="u-p-4 u-rounded u-text-start"
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.12)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <div
                              className="u-mb-3 u-font-bold u-text-sm"
                              style={{ color: '#7AFFD7', letterSpacing: '0.5px' }}
                            >
                              📈 Quick Stats
                            </div>
                            <div
                              className="u-grid u-gap-3"
                              style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
                            >
                              <div className="u-flex u-items-center u-text-sm">
                                <span className="u-opacity-60 u-font-medium">Saturation:</span>
                                <span className="u-font-bold u-ml-2">{settings.saturation}%</span>
                              </div>
                              <div className="u-flex u-items-center u-text-sm">
                                <span className="u-opacity-60 u-font-medium">Radius:</span>
                                <span className="u-font-bold u-ml-2">
                                  {settings.borderRadius}px
                                </span>
                              </div>
                              <div className="u-flex u-items-center u-text-sm">
                                <span className="u-opacity-60 u-font-medium">Bg:</span>
                                <span className="u-font-bold u-ml-2">
                                  {backgroundIndex + 1}/{backgrounds.length}
                                </span>
                              </div>
                              <div className="u-flex u-items-center u-text-sm">
                                <span className="u-opacity-60 u-font-medium">Effects:</span>
                                <span className="u-font-bold u-ml-2">
                                  {settings.withoutEffects ? 'Off' : 'On'}
                                </span>
                              </div>
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
