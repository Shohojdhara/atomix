/**
 * Phase 1 Animation Features — premium Storybook previews
 *
 * Time-based animation and FBM distortion with Apple-tuned glass defaults.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AtomixGlass } from '../AtomixGlass';
import { PremiumScene } from './shared-components';
import { PREMIUM_GLASS, premiumTypography } from './premium-presets';

const premiumPanel = (icon: string, title: string, subtitle: string) => (
  <div
    className="u-text-center u-text-white"
    style={{
      padding: '56px 44px',
      fontFamily: premiumTypography.fontFamily,
      minWidth: '280px',
    }}
  >
    <div
      style={{
        fontSize: '52px',
        marginBottom: '20px',
        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
      }}
    >
      {icon}
    </div>
    <h2
      style={{
        margin: '0 0 10px',
        fontSize: '28px',
        fontWeight: 700,
        background: premiumTypography.titleGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {title}
    </h2>
    <p style={{ margin: 0, fontSize: '15px', color: premiumTypography.muted, lineHeight: 1.5 }}>
      {subtitle}
    </p>
  </div>
);

const premiumDecorator = (photoIndex = 0) => [
  (Story: () => React.ReactNode) => (
    <PremiumScene photoIndex={photoIndex} height="100vh">
      <Story />
    </PremiumScene>
  ),
];

const meta = {
  title: 'Components/AtomixGlass/Features/Animation Features',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Premium animation demos for AtomixGlass — shader flow, FBM layers, and time-based motion
using production glass tuning (deep blur, 180% saturation, restrained displacement).

Respects \`prefers-reduced-motion\` when \`reducedMotion\` is set.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    withTimeAnimation: {
      control: 'boolean',
      table: { category: 'Animation', defaultValue: { summary: 'true' } },
    },
    animationSpeed: {
      control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
      table: { category: 'Animation', defaultValue: { summary: '1.0' } },
    },
    withMultiLayerDistortion: {
      control: 'boolean',
      table: { category: 'Animation', defaultValue: { summary: 'true' } },
    },
    distortionQuality: {
      control: { type: 'select', options: ['low', 'medium', 'high', 'ultra'] },
      table: { category: 'Animation', defaultValue: { summary: 'high' } },
    },
    mode: {
      control: { type: 'select', options: ['standard', 'polar', 'prominent', 'shader'] },
      table: { category: 'Visual', defaultValue: { summary: 'shader' } },
    },
  },
} satisfies Meta<typeof AtomixGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

const liquidArgs = {
  ...PREMIUM_GLASS.liquid,
  elasticity: 0,
} as const;

export const DefaultAnimation: Story = {
  args: {
    children: premiumPanel('✨', 'Time-Based Animation', 'Organic liquid glass — continuous flow'),
    ...liquidArgs,
  },
  decorators: premiumDecorator(0),
};

export const BreathingEffect: Story = {
  args: {
    children: premiumPanel('🫧', 'Breathing Glass', 'Slow 0.5× pulse for calm surfaces'),
    ...PREMIUM_GLASS.card,
    withTimeAnimation: true,
    animationSpeed: 0.5,
    withMultiLayerDistortion: false,
    mode: 'standard',
  },
  decorators: premiumDecorator(1),
};

export const UltraDistortion: Story = {
  args: {
    children: premiumPanel('🌊', 'Ultra Distortion', '7 FBM octaves — maximum organic detail'),
    ...PREMIUM_GLASS.cinematic,
    distortionQuality: 'ultra',
    distortionOctaves: 7,
    animationSpeed: 1.1,
  },
  decorators: premiumDecorator(2),
};

export const MobileOptimized: Story = {
  args: {
    children: (
      <div
        className="u-text-white"
        style={{
          padding: '44px 36px',
          fontFamily: premiumTypography.fontFamily,
          maxWidth: '300px',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 600 }}>Mobile Optimized</h3>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: premiumTypography.muted }}>
          2 octaves · low GPU load
        </p>
        <div
          style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.08)',
            fontSize: '12px',
            color: premiumTypography.dim,
          }}
        >
          Ideal for battery-conscious layouts
        </div>
      </div>
    ),
    ...PREMIUM_GLASS.chrome,
    withTimeAnimation: true,
    withMultiLayerDistortion: true,
    distortionQuality: 'low',
    distortionOctaves: 2,
    mode: 'standard',
  },
  decorators: premiumDecorator(3),
};

export const SlowMotion: Story = {
  args: {
    children: premiumPanel('🧘', 'Slow Motion', '0.3× speed — meditative glass flow'),
    ...liquidArgs,
    animationSpeed: 0.3,
    distortionQuality: 'medium',
  },
  decorators: premiumDecorator(4),
};

export const FastFlow: Story = {
  args: {
    children: premiumPanel('⚡', 'Fast Flow', '2.5× speed — energetic shader motion'),
    ...liquidArgs,
    animationSpeed: 2.5,
  },
  decorators: premiumDecorator(5),
};

export const NoAnimation: Story = {
  args: {
    children: premiumPanel('◇', 'Static Glass', 'Time animation off — pure frost'),
    ...PREMIUM_GLASS.chrome,
    withTimeAnimation: false,
    withMultiLayerDistortion: false,
    mode: 'standard',
  },
  decorators: premiumDecorator(0),
};

export const CustomFBMParameters: Story = {
  args: {
    children: (
      <div
        className="u-text-white"
        style={{ padding: '52px 40px', fontFamily: premiumTypography.fontFamily }}
      >
        <h2 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700 }}>Custom FBM</h2>
        <div style={{ fontSize: '14px', color: premiumTypography.muted, lineHeight: 1.7 }}>
          <div>Octaves: 6</div>
          <div>Lacunarity: 2.5</div>
          <div>Gain: 0.65</div>
        </div>
      </div>
    ),
    ...liquidArgs,
    distortionOctaves: 6,
    distortionLacunarity: 2.5,
    distortionGain: 0.65,
  },
  decorators: premiumDecorator(1),
};

export const AccessibilityReducedMotion: Story = {
  args: {
    children: premiumPanel('♿', 'Reduced Motion', 'Animations disabled for accessibility'),
    ...PREMIUM_GLASS.chrome,
    withTimeAnimation: true,
    reducedMotion: true,
    withMultiLayerDistortion: false,
    mode: 'standard',
  },
  decorators: premiumDecorator(2),
};

const comparisonCell = (
  icon: string,
  label: string,
  detail: string,
  quality: 'low' | 'medium' | 'high' | 'ultra'
) => (
  <AtomixGlass
    {...PREMIUM_GLASS.liquid}
    distortionQuality={quality}
    elasticity={0}
    style={{ minHeight: '200px' }}
  >
    <div
      className="u-p-6 u-text-center u-text-white"
      style={{ padding: '28px', textAlign: 'center', fontFamily: premiumTypography.fontFamily }}
    >
      <div style={{ fontSize: '36px', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600 }}>{label}</h3>
      <p style={{ margin: 0, fontSize: '12px', color: premiumTypography.dim }}>{detail}</p>
    </div>
  </AtomixGlass>
);

export const PerformanceComparison: Story = {
  render: () => (
    <div
      className="u-grid u-gap-6 u-p-6"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {comparisonCell('📱', 'Low', '2 octaves · Mobile', 'low')}
      {comparisonCell('💻', 'Medium', '4 octaves · Tablet', 'medium')}
      {comparisonCell('🖥️', 'High', '5 octaves · Desktop', 'high')}
      {comparisonCell('🚀', 'Ultra', '7 octaves · High-end', 'ultra')}
    </div>
  ),
  decorators: premiumDecorator(0),
};
