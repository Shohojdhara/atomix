/**
 * PresetGallery.stories.tsx
 *
 * Gallery of pre-configured AtomixGlass presets for common use cases.
 * Provides quick starting points for different glass effects and styles.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';

import { Button } from '../../Button/Button';
import { Badge } from '../../Badge';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Preset Gallery',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Curated collection of pre-configured AtomixGlass presets for common design scenarios. Each preset is optimized for specific use cases and can be customized further.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: baseArgTypes,
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Crystal Clear Preset
 *
 * Minimal glass effect with subtle distortion - perfect for clean, modern interfaces.
 */
export const CrystalClear: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[2]}>
        <div style={{ maxWidth: '500px' }}>
          <AtomixGlass
            displacementScale={40}
            blurAmount={0.75}
            saturation={120}
            aberrationIntensity={1.5}
            borderRadius={20}
            mode="standard"
            padding="40px"
          >
            <div className="u-text-center u-text-white">
              <Badge variant="secondary" className="u-mb-3">Crystal Clear</Badge>
              <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                Minimal Glass Effect
              </h2>
              <p className="u-text-sm u-opacity-90 u-mb-4" style={{ lineHeight: 1.6 }}>
                Clean and subtle glass morphism with minimal distortion. Perfect for 
                modern, minimalist interfaces that need just a touch of depth.
              </p>
              <div className="u-flex u-gap-2 u-justify-center" style={{ gap: '8px' }}>
                <Button glass size="sm" variant="primary">Primary</Button>
                <Button glass size="sm" variant="outline-light">Secondary</Button>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Minimal preset with low displacement (40), moderate blur (0.75), and subtle aberration (1.5) for clean interfaces.',
      },
    },
  },
};

/**
 * Frosted Glass Preset
 *
 * Classic frosted glass effect with strong blur - ideal for cards and modals.
 */
export const FrostedGlass: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[6]} overlay overlayOpacity={0.3}>
        <div style={{ maxWidth: '500px' }}>
          <AtomixGlass
            displacementScale={60}
            blurAmount={2}
            saturation={130}
            aberrationIntensity={2}
            borderRadius={24}
            mode="standard"
            padding="40px"
          >
            <div className="u-text-center u-text-white">
              <Badge variant="primary" className="u-mb-3">Frosted Glass</Badge>
              <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                Classic Frosted Effect
              </h2>
              <p className="u-text-sm u-opacity-90 u-mb-4" style={{ lineHeight: 1.6 }}>
                Strong blur creates a pronounced frosted glass appearance. Excellent 
                for cards, modals, and overlays that need to stand out.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginTop: '24px',
                }}
              >
                {[
                  { label: 'Blur', value: '2.0' },
                  { label: 'Displacement', value: '60' },
                  { label: 'Saturation', value: '130%' },
                  { label: 'Aberration', value: '2.0' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      padding: '12px',
                      borderRadius: '12px',
                    }}
                  >
                    <p className="u-m-0 u-text-xs u-opacity-70">{stat.label}</p>
                    <p className="u-m-0 u-text-lg u-font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Classic frosted glass preset with high blur (2.0), moderate displacement (60), and balanced saturation (130%).',
      },
    },
  },
};

/**
 * Liquid Chrome Preset
 *
 * High-distortion metallic liquid effect using shader mode.
 */
export const LiquidChrome: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.4}>
        <div style={{ maxWidth: '500px' }}>
          <AtomixGlass
            displacementScale={90}
            blurAmount={1.5}
            saturation={180}
            aberrationIntensity={3}
            borderRadius={28}
            mode="shader"
            shaderVariant="liquidGlass"
            padding="40px"
          >
            <div className="u-text-center u-text-white">
              <Badge variant="success" className="u-mb-3">Liquid Chrome</Badge>
              <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                Metallic Liquid Effect
              </h2>
              <p className="u-text-sm u-opacity-90 u-mb-4" style={{ lineHeight: 1.6 }}>
                High-displacement shader-based effect creating a flowing, metallic 
                liquid appearance. Perfect for premium, eye-catching designs.
              </p>
              
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  padding: '20px',
                  borderRadius: '16px',
                  marginTop: '24px',
                }}
              >
                <p className="u-m-0 u-text-xs u-font-semibold u-mb-2">Best For:</p>
                <ul
                  className="u-m-0 u-text-sm u-opacity-90"
                  style={{ textAlign: 'left', paddingLeft: '20px' }}
                >
                  <li>Premium product showcases</li>
                  <li>Hero sections</li>
                  <li>Feature highlights</li>
                  <li>Landing page focal points</li>
                </ul>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Premium liquid chrome preset using shader mode with high displacement (90), elevated saturation (180%), and strong aberration (3).',
      },
    },
  },
};

/**
 * Apple Fluid Preset
 *
 * Apple-inspired fluid glass effect with organic movement.
 */
export const AppleFluid: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[4]} overlay overlayOpacity={0.3}>
        <div style={{ maxWidth: '500px' }}>
          <AtomixGlass
            displacementScale={75}
            blurAmount={1}
            saturation={150}
            aberrationIntensity={2.5}
            borderRadius={26}
            mode="shader"
            shaderVariant="appleFluid"
            padding="40px"
          >
            <div className="u-text-center u-text-white">
              <Badge variant="outline-light" className="u-mb-3">Apple Fluid</Badge>
              <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                Organic Fluid Motion
              </h2>
              <p className="u-text-sm u-opacity-90 u-mb-4" style={{ lineHeight: 1.6 }}>
                Inspired by Apple's fluid design language. Creates smooth, organic 
                glass distortions that feel alive and dynamic.
              </p>
              
              <div className="u-flex u-gap-2 u-justify-center u-flex-wrap" style={{ gap: '8px' }}>
                <Badge variant="secondary">Balanced</Badge>
                <Badge variant="secondary">Organic</Badge>
                <Badge variant="secondary">Dynamic</Badge>
              </div>
              
              <Button glass size="lg" variant="primary" className="u-mt-4">
                Explore Preset
              </Button>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Apple-inspired fluid preset with shader mode, balanced displacement (75), and enhanced saturation (150%) for organic effects.',
      },
    },
  },
};

/**
 * Performance Mode Preset
 *
 * Optimized for mobile devices with reduced effects for better performance.
 */
export const PerformanceMode: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[1]}>
        <div style={{ maxWidth: '500px' }}>
          <AtomixGlass
            displacementScale={50}
            blurAmount={0}
            saturation={120}
            aberrationIntensity={1.5}
            borderRadius={20}
            mode="standard"
            devicePreset="performance"
            disableResponsiveBreakpoints={false}
            padding="40px"
          >
            <div className="u-text-center u-text-white">
              <Badge variant="success" className="u-mb-3">Performance Mode</Badge>
              <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                Mobile Optimized
              </h2>
              <p className="u-text-sm u-opacity-90 u-mb-4" style={{ lineHeight: 1.6 }}>
                Reduced effects for optimal performance on mobile devices. Maintains 
                the glass aesthetic while minimizing GPU load.
              </p>
              
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  padding: '16px',
                  borderRadius: '12px',
                  marginTop: '20px',
                }}
              >
                <p className="u-m-0 u-text-xs u-font-semibold" style={{ color: '#86efac' }}>
                  ✓ Optimized for 60 FPS on mobile
                </p>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Performance-optimized preset with zero blur, low displacement (50), and reduced saturation (120%) for mobile devices.',
      },
    },
  },
};
