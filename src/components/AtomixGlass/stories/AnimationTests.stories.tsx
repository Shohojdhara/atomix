/**
 * Quick Test Story for Phase 1 Animations
 * 
 * This is a minimal test to verify the animation pipeline is working
 */

import type { Meta, StoryObj } from '@storybook/react';
import { AtomixGlass } from '../AtomixGlass';

const meta = {
  title: 'Testing/Phase 1 Animation Quick Test',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'], // Exclude from production docs - test stories only
  argTypes: {
    withTimeAnimation: { control: 'boolean' },
    animationSpeed: { control: { type: 'range', min: 0.1, max: 5.0, step: 0.1 } },
    distortionOctaves: { control: { type: 'range', min: 1, max: 8, step: 1 } },
    distortionQuality: { 
      control: 'select', 
      options: ['low', 'medium', 'high', 'ultra'] 
    },
  },
} satisfies Meta<typeof AtomixGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default test with animations enabled
export const Animated: Story = {
  args: {
    children: (
      <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
        <h2>Phase 1 Animation Test</h2>
        <p>If you see flowing liquid glass effects, it's working!</p>
      </div>
    ),
    mode: 'shader',
    withTimeAnimation: true,
    animationSpeed: 1.0,
    distortionOctaves: 4,
    distortionQuality: 'high',
    displacementScale: 30,
    blurAmount: 8,
    saturation: 180,
    aberrationIntensity: 3,
    // Dark background to make effects visible
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
};

// Comparison: Same config without animations
export const Static: Story = {
  args: {
    ...Animated.args,
    withTimeAnimation: false,
  },
};

// Speed comparison
export const FastAnimation: Story = {
  args: {
    ...Animated.args,
    animationSpeed: 3.0,
  },
};

export const SlowAnimation: Story = {
  args: {
    ...Animated.args,
    animationSpeed: 0.3,
  },
};

// High complexity FBM
export const HighDetailFBM: Story = {
  args: {
    ...Animated.args,
    distortionOctaves: 7,
    distortionQuality: 'ultra',
  },
};

// Mobile optimized (low quality)
export const MobileOptimized: Story = {
  args: {
    ...Animated.args,
    distortionOctaves: 2,
    distortionQuality: 'low',
  },
};
