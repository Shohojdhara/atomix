/**
 * Phase 1 Animation Features Stories
 * 
 * Demonstrates the new time-based animation system and multi-layer distortion effects
 * implemented in Phase 1 of the AtomixGlass Feature Implementation roadMap.
 * 
 * Features:
 * - Feature 1.1: Time-Based Animation System
 * - Feature 1.2: Multi-Layer Distortion System (FBM)
 * 
 * @see IMPLEMENTATION_PLAN.md for detailed specifications
 */

import type { Meta, StoryObj } from '@storybook/react';
import { AtomixGlass } from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages } from './shared-components';

const meta = {
  title: 'Components/AtomixGlass/Features/Animation Features',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Phase 1 Animation Features

This story showcases the newly implemented Phase 1 features for AtomixGlass:

### Feature 1.1: Time-Based Animation System
Continuous time-driven animations for organic, flowing glass effects that evolve over time without user interaction.

**Key Capabilities:**
- Breathing Effect: Subtle scale/opacity pulsing (0.5-2 second cycles)
- Flow Animation: Continuous liquid movement
- Wave Propagation: Radial waves emanating from center
- Configurable animation speed (0.5x - 5.0x)

### Feature 1.2: Multi-Layer Distortion System
Fractal Brownian Motion (FBM) noise with multiple octaves creating complex, layered distortion effects.

**Quality Presets:**
- Low: 2 octaves (mobile optimized)
- Medium: 4 octaves (tablet)
- High: 5 octaves (desktop default)
- Ultra: 7 octaves (high-end devices)

**Performance Note:** These features are GPU-accelerated and automatically respect \`prefers-reduced-motion\` preferences.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Phase 1 Animation Controls
    withTimeAnimation: {
      control: 'boolean',
      description: 'Enable continuous time-based animations',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: 'true' },
      },
    },
    animationSpeed: {
      control: { type: 'range', min: 0.1, max: 5.0, step: 0.1 },
      description: 'Animation speed multiplier',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: '1.0' },
      },
    },
    withMultiLayerDistortion: {
      control: 'boolean',
      description: 'Enable multi-layer FBM distortion',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: 'false' },
      },
    },
    distortionOctaves: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Number of noise octaves for FBM',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: '5' },
      },
    },
    distortionLacunarity: {
      control: { type: 'range', min: 1.0, max: 4.0, step: 0.1 },
      description: 'Frequency multiplier per octave',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: '2.0' },
      },
    },
    distortionGain: {
      control: { type: 'range', min: 0.1, max: 1.0, step: 0.05 },
      description: 'Amplitude multiplier per octave',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: '0.5' },
      },
    },
    distortionQuality: {
      control: {
        type: 'select',
        options: ['low', 'medium', 'high', 'ultra'],
      },
      description: 'Quality preset for distortion effects',
      table: {
        category: 'Phase 1 - Animation',
        defaultValue: { summary: 'high' },
      },
    },
    mode: {
      control: {
        type: 'select',
        options: ['standard', 'polar', 'prominent', 'shader'],
      },
      description: 'Glass effect mode (shader mode recommended for animations)',
      table: {
        category: 'Visual',
        defaultValue: { summary: 'standard' },
      },
    },
  },
} satisfies Meta<typeof AtomixGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Animation Demo
 * 
 * Showcases the default time-based animation settings with shader mode.
 * Notice the organic, flowing liquid effect that runs continuously.
 */
export const DefaultAnimation: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '60px 40px' }}>
        <div
          className="u-mb-6"
          style={{
            fontSize: '64px',
            marginBottom: '24px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          }}
        >
          ✨
        </div>
        <h2
          className="u-mt-0 u-mb-3 u-text-5xl u-font-bold u-text-gradient-primary"
          style={{
            margin: '0 0 12px 0',
            fontSize: '32px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Time-Based Animation
        </h2>
        <p className="u-m-0 u-text-base u-opacity-90">
          Organic liquid glass effect with continuous flow
        </p>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 1.0,
    withMultiLayerDistortion: true,
    distortionQuality: 'high',
    mode: 'shader',
    displacementScale: 60,
    blurAmount: 1,
    saturation: 140,
    borderRadius: 24,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[0]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Breathing Effect
 * 
 * Demonstrates subtle breathing animation with slow pulse cycle.
 * Best for cards and containers that need gentle attention.
 */
export const BreathingEffect: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '40px' }}>
        <h2 className="u-mt-0 u-mb-2 u-text-xl u-font-semibold">
          Breathing Glass
        </h2>
        <p className="u-m-0 u-text-sm u-opacity-80">
          Subtle pulse animation
        </p>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 0.5, // Slower for breathing effect
    withMultiLayerDistortion: false,
    mode: 'standard',
    displacementScale: 40,
    blurAmount: 2,
    saturation: 120,
    borderRadius: 20,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[1]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Ultra Distortion
 * 
 * Maximum detail with 7 octaves of FBM noise.
 * Creates highly complex, organic liquid patterns.
 */
export const UltraDistortion: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '60px 40px' }}>
        <div
          className="u-mx-auto u-mb-6 u-flex u-items-center u-justify-center u-rounded-lg"
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          🌊
        </div>
        <h2 className="u-mt-0 u-mb-2 u-text-2xl u-font-bold">
          Ultra Distortion
        </h2>
        <p className="u-m-0 u-text-xs u-opacity-80">
          7 octaves of FBM complexity
        </p>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 1.2,
    withMultiLayerDistortion: true,
    distortionQuality: 'ultra',
    distortionOctaves: 7,
    distortionLacunarity: 2.0,
    distortionGain: 0.5,
    mode: 'shader',
    displacementScale: 80,
    blurAmount: 0.5,
    saturation: 160,
    borderRadius: 28,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[2]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Mobile Optimized
 * 
 * Low distortion quality (2 octaves) optimized for mobile performance.
 * Maintains visual appeal while minimizing GPU load.
 */
export const MobileOptimized: Story = {
  args: {
    children: (
      <div className="u-text-white" style={{ padding: '40px 32px' }}>
        <h3 className="u-mt-0 u-mb-2 u-text-lg u-font-semibold">
          Mobile Optimized
        </h3>
        <p className="u-m-0 u-text-xs u-opacity-85">
          2 octaves • Low power
        </p>
        <div
          className="u-mt-4 u-p-3 u-bg-white/10 u-rounded-md u-text-xs"
          style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '12px',
          }}
        >
          Perfect for battery-conscious users
        </div>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 1.0,
    withMultiLayerDistortion: true,
    distortionQuality: 'low',
    distortionOctaves: 2,
    mode: 'standard',
    displacementScale: 50,
    blurAmount: 2,
    saturation: 130,
    borderRadius: 16,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[3]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Slow Motion
 * 
 * Reduced animation speed for calm, meditative effects.
 * Great for wellness and mindfulness applications.
 */
export const SlowMotion: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '60px 40px' }}>
        <div
          className="u-text-6xl u-mb-5"
          style={{
            fontSize: '56px',
            marginBottom: '20px',
          }}
        >
          🧘
        </div>
        <h2 className="u-mt-0 u-mb-3 u-text-2xl u-font-semibold">
          Slow Motion
        </h2>
        <p className="u-m-0 u-text-base u-opacity-90">
          Calming 0.3x speed
        </p>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 0.3, // Very slow
    withMultiLayerDistortion: true,
    distortionQuality: 'medium',
    mode: 'shader',
    displacementScale: 45,
    blurAmount: 3,
    saturation: 110,
    borderRadius: 24,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[4]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Fast Flow
 * 
 * High-speed animation for dynamic, energetic effects.
 * Suitable for sports, action, and high-energy content.
 */
export const FastFlow: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '60px 40px' }}>
        <div
          className="u-text-6xl u-mb-5"
          style={{
            fontSize: '56px',
            marginBottom: '20px',
          }}
        >
          ⚡
        </div>
        <h2 className="u-mt-0 u-mb-3 u-text-2xl u-font-bold">
          Fast Flow
        </h2>
        <p className="u-m-0 u-text-base u-opacity-90">
          Energetic 2.5x speed
        </p>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 2.5, // Fast
    withMultiLayerDistortion: true,
    distortionQuality: 'high',
    mode: 'shader',
    displacementScale: 70,
    blurAmount: 1,
    saturation: 150,
    borderRadius: 24,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[5]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * No Animation (Static)
 * 
 * Demonstrates disabled time-based animations for static glass effect.
 * Useful for reducing motion or improving performance.
 */
export const NoAnimation: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '40px' }}>
        <h2 className="u-mt-0 u-mb-2 u-text-xl u-font-semibold">
          Static Glass
        </h2>
        <p className="u-m-0 u-text-sm u-opacity-80">
          Time animations disabled
        </p>
      </div>
    ),
    withTimeAnimation: false,
    withMultiLayerDistortion: false,
    mode: 'standard',
    displacementScale: 40,
    blurAmount: 2,
    saturation: 140,
    borderRadius: 20,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[0]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Custom FBM Parameters
 * 
 * Fine-tuned control over FBM lacunarity and gain.
 * For advanced users who want specific distortion characteristics.
 */
export const CustomFBMParameters: Story = {
  args: {
    children: (
      <div className="u-text-white" style={{ padding: '60px 40px' }}>
        <h2 className="u-mt-0 u-mb-3 u-text-2xl u-font-bold">
          Custom FBM
        </h2>
        <div className="u-text-sm u-opacity-85 u-leading-relaxed">
          <div>Octaves: 6</div>
          <div>Lacunarity: 2.5</div>
          <div>Gain: 0.65</div>
        </div>
      </div>
    ),
    withTimeAnimation: true,
    animationSpeed: 1.0,
    withMultiLayerDistortion: true,
    distortionOctaves: 6,
    distortionLacunarity: 2.5, // Higher frequency progression
    distortionGain: 0.65, // Slower amplitude decay
    distortionQuality: 'high', // Overridden by custom values
    mode: 'shader',
    displacementScale: 65,
    blurAmount: 1.5,
    saturation: 145,
    borderRadius: 24,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[1]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Accessibility - Reduced Motion
 * 
 * Automatically respects prefers-reduced-motion preference.
 * When enabled, all time-based animations are disabled.
 */
export const AccessibilityReducedMotion: Story = {
  args: {
    children: (
      <div className="u-text-center u-text-white" style={{ padding: '40px' }}>
        <div className="u-text-5xl u-mb-4">♿</div>
        <h2 className="u-mt-0 u-mb-2 u-text-lg u-font-semibold">
          Reduced Motion
        </h2>
        <p className="u-m-0 u-text-sm u-opacity-80">
          Respects accessibility preferences
        </p>
      </div>
    ),
    withTimeAnimation: true, // Will be disabled by reducedMotion
    reducedMotion: true, // Explicitly enable reduced motion
    withMultiLayerDistortion: false,
    mode: 'standard',
    displacementScale: 40,
    blurAmount: 2,
    saturation: 130,
    borderRadius: 20,
  },
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[2]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};

/**
 * Performance Comparison
 * 
 * Side-by-side comparison of different quality presets.
 * Use this to choose the right balance for your use case.
 */
export const PerformanceComparison: Story = {
  render: () => (
    <div className="u-grid u-gap-6" style={{  gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {/* Low Quality */}
      <div>
        <AtomixGlass
          withTimeAnimation={true}
          animationSpeed={1.0}
          withMultiLayerDistortion={true}
          distortionQuality="low"
          mode="shader"
          displacementScale={50}
          blurAmount={2}
          saturation={130}
          borderRadius={20}
          height={200}
        >
          <div className="u-p-6 u-text-center u-text-white" style={{ padding: '24px', color: 'white', textAlign: 'center' }}>
            <div className="u-text-4xl u-mb-3">📱</div>
            <h3 className="u-mt-0 u-mb-1 u-text-sm u-font-semibold">
              Low
            </h3>
            <p className="u-m-0 u-text-xs u-opacity-80">
              2 octaves • Mobile
            </p>
          </div>
        </AtomixGlass>
      </div>

      {/* Medium Quality */}
      <div>
        <AtomixGlass
          withTimeAnimation={true}
          animationSpeed={1.0}
          withMultiLayerDistortion={true}
          distortionQuality="medium"
          mode="shader"
          displacementScale={50}
          blurAmount={2}
          saturation={130}
          borderRadius={20}
          height={200}
        >
          <div className="u-p-6 u-text-center u-text-white" style={{ padding: '24px', color: 'white', textAlign: 'center' }}>
            <div className="u-text-4xl u-mb-3">💻</div>
            <h3 className="u-mt-0 u-mb-1 u-text-sm u-font-semibold">
              Medium
            </h3>
            <p className="u-m-0 u-text-xs u-opacity-80">
              4 octaves • Tablet
            </p>
          </div>
        </AtomixGlass>
      </div>

      {/* High Quality */}
      <div>
        <AtomixGlass
          withTimeAnimation={true}
          animationSpeed={1.0}
          withMultiLayerDistortion={true}
          distortionQuality="high"
          mode="shader"
          displacementScale={50}
          blurAmount={2}
          saturation={130}
          borderRadius={20}
          height={200}
        >
          <div className="u-p-6 u-text-center u-text-white" style={{ padding: '24px', color: 'white', textAlign: 'center' }}>
            <div className="u-text-4xl u-mb-3">🖥️</div>
            <h3 className="u-mt-0 u-mb-1 u-text-sm u-font-semibold">
              High
            </h3>
            <p className="u-m-0 u-text-xs u-opacity-80">
              5 octaves • Desktop
            </p>
          </div>
        </AtomixGlass>
      </div>

      {/* Ultra Quality */}
      <div>
        <AtomixGlass
          withTimeAnimation={true}
          animationSpeed={1.0}
          withMultiLayerDistortion={true}
          distortionQuality="ultra"
          mode="shader"
          displacementScale={50}
          blurAmount={2}
          saturation={130}
          borderRadius={20}
          height={200}
        >
          <div className="u-p-6 u-text-center u-text-white" style={{ padding: '24px', color: 'white', textAlign: 'center' }}>
            <div className="u-text-4xl u-mb-3">🚀</div>
            <h3 className="u-mt-0 u-mb-1 u-text-sm u-font-semibold">
              Ultra
            </h3>
            <p className="u-m-0 u-text-xs u-opacity-80">
              7 octaves • High-end
            </p>
          </div>
        </AtomixGlass>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <BackgroundWrapper backgroundImage={backgroundImages[0]}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
};