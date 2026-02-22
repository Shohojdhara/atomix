/**
 * ShaderVariants.stories.tsx
 *
 * Professional showcase of Apple-style shader variants with modern design.
 * Features premium liquid glass effects with advanced visual rendering.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper } from './shared-components';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Features/Shaders',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Experience premium Apple-style shader variants with advanced GPU-accelerated effects. Each variant features unique characteristics including time-based animations, organic flow patterns, and sophisticated visual rendering.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Liquid Glass Variant
 *
 * Enhanced liquid glass with time-based animations and multi-layered organic distortion.
 * Perfect for hero sections and premium content areas.
 */
export const LiquidGlass: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(102, 126, 234, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>💧</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '38px',
            fontWeight: 700,
            background: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Liquid Glass
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '18px',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Experience fluid, time-based animations with multi-layered organic distortion and
          chromatic aberration effects that create living, breathing glass.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Time Animation', 'Multi-Layer', 'Chromatic FX', 'Organic Flow'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'liquidGlass',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=3029&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Liquid Glass features time-based animations with multi-layered distortion. Ideal for premium hero sections and feature highlights.',
      },
    },
  },
};

/**
 * Apple Fluid Variant
 *
 * Premium fluid glass inspired by Apple's design language.
 * Features vortex effects and 5-octave noise for organic, flowing visuals.
 */
export const AppleFluid: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(245, 87, 108, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>🌊</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '38px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Apple Fluid
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '18px',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Apple-inspired fluid dynamics with vortex effects and high-quality 5-octave noise. Mouse
          interactions create mesmerizing, organic flow patterns.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Vortex FX', '5-Octave', 'Apple Style', 'Interactive'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(245, 87, 108, 0.2)',
                border: '1px solid rgba(245, 87, 108, 0.3)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'appleFluid',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Apple Fluid delivers premium vortex effects with 5-octave noise. Mouse interactions create dynamic, flowing patterns inspired by Apple design.',
      },
    },
  },
};

/**
 * Premium Glass Variant
 *
 * High-end glass rendering with advanced refraction and multi-layer depth.
 * Offers the best performance-to-quality ratio among shader variants.
 */
export const PremiumGlass: Story = {
  args: {
    children: (
      <div style={{ padding: '44px 40px', textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 20px 48px rgba(79, 172, 254, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              opacity: 0.4,
              filter: 'blur(20px)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>💎</span>
        </div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '38px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Premium Glass
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '18px',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Advanced refraction with multi-layer depth effects and edge-aware rendering. The optimal
          balance of quality and performance for production applications.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {['Advanced Refraction', 'Multi-Depth', 'Edge-Aware', 'Optimized'].map(tag => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(79, 172, 254, 0.2)',
                border: '1px solid rgba(79, 172, 254, 0.3)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    displacementScale: 25,
    blurAmount: 1.5,
    saturation: 150,
    aberrationIntensity: 2,
    elasticity: 0.2,
    cornerRadius: 32,
    mode: 'shader',
    shaderVariant: 'premiumGlass',
  },
  decorators: [
    Story => (
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop"
        height="100vh"
        width="100vw"
        overlayOpacity={0.3}
        borderRadius="0"
      >
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Premium Glass offers advanced refraction with optimal performance. Best choice for production applications requiring high-quality shader effects.',
      },
    },
  },
};
