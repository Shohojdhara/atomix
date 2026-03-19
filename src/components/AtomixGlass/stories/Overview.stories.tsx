/**
 * Overview.stories.tsx
 *
 * Overview and basic usage for AtomixGlass
 *
 * @package Atomix
 * @component AtomixGlass
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import AtomixGlass from '../AtomixGlass';
import Button from '../../Button/Button';
import { BackgroundWrapper, backgroundImages } from './shared-components';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Type helper for story props without children requirement
 */
type AtomixGlassStoryProps = Omit<React.ComponentProps<typeof AtomixGlass>, 'children'> & {
  children?: React.ReactNode;
};

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Event handlers for documentation
 */
const mockHandlers = {
  onClick: fn(),
  onAction: fn(),
  onChange: fn(),
};

// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AtomixGlass

## Overview

AtomixGlass is a premium glass morphism component with realistic light refraction, chromatic aberration, and interactive effects. Perfect for cards, modals, and premium UI elements that need visual depth and elegance.

## Features

- Realistic glass effect with displacement and blur
- Chromatic aberration for depth perception
- Interactive hover effects with mouse tracking
- Multiple rendering modes (standard, polar, prominent, shader)
- Highly customizable parameters
- Performance optimized for smooth animations

## Accessibility

- Keyboard support: Full keyboard navigation compatibility
- Screen reader: Proper ARIA labels and descriptions
- ARIA support: All standard ARIA attributes supported
- Focus management: Proper focus handling within the component

## Usage Examples

### Basic Usage

\`\`\`typescript
<AtomixGlass>
  <div>Your content here</div>
</AtomixGlass>
\`\`\`

### With Custom Configuration

\`\`\`typescript
<AtomixGlass 
  displacementScale={80}
  blurAmount={0.5}
  saturation={140}
  aberrationIntensity={2}
>
  <div>Your premium content here</div>
</AtomixGlass>
\`\`\`

## API Reference

### Props

| Prop     | Type           | Default   | Description             |
| -------- | -------------- | --------- | ----------------------- |
| children | ReactNode      | undefined | Content to display inside the glass effect |
| displacementScale | number | 70 | Displacement scale for the glass effect |
| blurAmount | number | 0.0625 | Blur amount for the backdrop |
| saturation | number | 140 | Saturation percentage for the backdrop |
| aberrationIntensity | number | 2 | Chromatic aberration intensity |
| elasticity | number | 0.15 | Elasticity factor for mouse interactions |
| borderRadius | number | 20 | Corner radius in pixels |
| overLight | boolean/object | "auto" | OverLight configuration mode |
| mode | "standard/polar/prominent/shader" | "standard" | Glass effect mode |
| onClick | function | undefined | Click event handler |

## Design Tokens

Used design tokens:

- \`--atomix-glass-displacement-scale\`: Displacement scale value
- \`--atomix-glass-blur-amount\`: Blur amount value
- \`--atomix-glass-saturation\`: Saturation value
- \`--atomix-glass-aberration-intensity\`: Aberration intensity value

## Notes

This component is performance-intensive. Use sparingly and consider performance implications on mobile devices.
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the glass effect',
      table: {
        category: 'Content',
        defaultValue: { summary: '-' },
      },
    },
    displacementScale: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Displacement scale for the glass effect (default: 70)',
      table: {
        category: 'Visual',
        defaultValue: { summary: '70' },
      },
    },
    blurAmount: {
      control: { type: 'range', min: 0, max: 10, step: 0.5 },
      description: 'Blur amount for the backdrop (default: 0.0625)',
      table: {
        category: 'Visual',
        defaultValue: { summary: '0.0625' },
      },
    },
    saturation: {
      control: { type: 'range', min: 100, max: 300, step: 5 },
      description: 'Saturation percentage for the backdrop (default: 140)',
      table: {
        category: 'Visual',
        defaultValue: { summary: '140' },
      },
    },
    aberrationIntensity: {
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      description: 'Chromatic aberration intensity (default: 2)',
      table: {
        category: 'Visual',
        defaultValue: { summary: '2' },
      },
    },
    elasticity: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Elasticity factor for mouse interactions (default: 0.15)',
      table: {
        category: 'Interaction',
        defaultValue: { summary: '0.15' },
      },
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Corner radius in pixels (default: 20)',
      table: {
        category: 'Visual',
        defaultValue: { summary: '20' },
      },
    },
    overLight: {
      control: {
        type: 'select',
        labels: {
          false: 'false (Dark Background)',
          true: 'true (Light Background)',
          auto: 'auto (Auto-detect)',
        },
      },
      options: [false, true, 'auto'],
      description: 'OverLight configuration mode',
      table: {
        category: 'Visual',
        defaultValue: { summary: '"auto"' },
        type: { summary: 'boolean | "auto"' },
      },
    },
    mode: {
      control: { type: 'inline-radio', options: ['standard', 'polar', 'prominent', 'shader'] },
      description: 'Glass effect mode (default: "standard")',
      table: {
        category: 'Visual',
        defaultValue: { summary: '"standard"' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
      },
    },
    padding: {
      control: { type: 'text' },
      description: 'Padding for the glass component',
      table: {
        category: 'Style',
        defaultValue: { summary: '0' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the glass component',
      table: {
        category: 'Style',
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the glass component',
      table: {
        category: 'Style',
        defaultValue: { summary: 'undefined' },
      },
    },
    devicePreset: {
      control: { type: 'inline-radio', options: ['performance', 'balanced', 'quality'] },
      description: 'Device preset for responsive optimization (default: "balanced")',
      table: {
        category: 'Performance',
        defaultValue: { summary: '"balanced"' },
      },
    },
    disableResponsiveBreakpoints: {
      control: 'boolean',
      description: 'Disable responsive breakpoint system (default: false)',
      table: {
        category: 'Performance',
        defaultValue: { summary: 'false' },
      },
    },
    withTimeAnimation: {
      control: 'boolean',
      description: 'Enable time-based animation (Phase 1, default: true)',
      table: {
        category: 'Animation',
        defaultValue: { summary: 'true' },
      },
    },
    animationSpeed: {
      control: { type: 'range', min: 0, max: 3, step: 0.1 },
      description: 'Animation speed multiplier (Phase 1, default: 1.0)',
      table: {
        category: 'Animation',
        defaultValue: { summary: '1.0' },
      },
    },
    withMultiLayerDistortion: {
      control: 'boolean',
      description: 'Enable multi-layer distortion using FBM (Phase 1, default: false)',
      table: {
        category: 'Animation',
        defaultValue: { summary: 'false' },
      },
    },
    distortionOctaves: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Number of octaves for FBM distortion (Phase 1, default: 5)',
      table: {
        category: 'Animation',
        defaultValue: { summary: '5' },
      },
    },
    distortionLacunarity: {
      control: { type: 'range', min: 1, max: 4, step: 0.1 },
      description: 'Lacunarity for FBM distortion (Phase 1, default: 2.0)',
      table: {
        category: 'Animation',
        defaultValue: { summary: '2.0' },
      },
    },
    distortionGain: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Gain for FBM distortion (Phase 1, default: 0.5)',
      table: {
        category: 'Animation',
        defaultValue: { summary: '0.5' },
      },
    },
    distortionQuality: {
      control: { type: 'select', options: ['low', 'medium', 'high', 'ultra'] },
      description: 'Quality preset for FBM distortion (Phase 1, default: "high")',
      table: {
        category: 'Animation',
        defaultValue: { summary: '"high"' },
      },
    },
    debugPerformance: {
      control: 'boolean',
      description: 'Enable performance monitoring dashboard (development only)',
      table: {
        category: 'Debug',
        defaultValue: { summary: 'false' },
      },
    },
    debugBorderRadius: {
      control: 'boolean',
      description: 'Debug mode for corner radius extraction',
      table: {
        category: 'Debug',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        category: 'Style',
        defaultValue: { summary: '-' },
      },
    },
    style: {
      control: 'object',
      description: 'CSS style object',
      table: {
        category: 'Style',
        defaultValue: { summary: '{}' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: '-' },
      },
    },
    reducedMotion: {
      control: 'boolean',
      description: 'Override for reduced motion preference (default: false)',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof AtomixGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// BASIC USAGE STORIES
// ============================================================================

export const BasicUsage: Story = {
  args: {
    children: (
      <div className="u-text-center u-flex u-flex-column u-items-center u-justify-center">
        <h2 className="u-mb-4 u-mt-0 u-text-white u-text-2xl u-font-bold">Basic Glass Effect</h2>
        <p className="u-mb-6 u-mt-0 u-text-white u-opacity-90 u-text-base">
          This is a basic AtomixGlass component with default settings.
        </p>
        <Button variant="primary" glass>
          Click Me
        </Button>
      </div>
    ),
    padding: '32px', // Increased padding for better visual appearance
  },
  decorators: [
    Story => (
      <BackgroundWrapper backgroundImage={backgroundImages[2]} overlay overlayOpacity={0.2}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'The basic usage of the AtomixGlass component with default configuration.',
      },
    },
  },
};

export const WithAllProps: Story = {
  args: {
    children: (
      <div className="u-text-center">
        <h2 className="u-mb-4 u-mt-0 u-text-white u-text-2xl u-font-bold">Fully Configured Glass</h2>
        <p className="u-mb-6 u-mt-0 u-text-white u-opacity-90 u-text-base">
          This glass component uses all configurable props.
        </p>
        <div className="u-flex u-gap-4 u-justify-center">
          <Button variant="primary" glass>
            Primary
          </Button>
          <Button variant="outline-primary" glass>
            Outline
          </Button>
        </div>
      </div>
    ),
    displacementScale: 80,
    blurAmount: 0.5,
    saturation: 150,
    aberrationIntensity: 2.5,
    elasticity: 0.2,
    borderRadius: 24,
    mode: 'standard',
    overLight: true,
    padding: '32px', // Increased padding for better visual appearance
    devicePreset: 'balanced',
    withTimeAnimation: true,
    animationSpeed: 1.0,
    withMultiLayerDistortion: false,
    distortionOctaves: 5,
    distortionLacunarity: 2.0,
    distortionGain: 0.5,
    distortionQuality: 'high',
    onClick: mockHandlers.onClick,
  },
  decorators: [
    Story => (
      <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.3}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates AtomixGlass with all configurable props set to custom values.',
      },
    },
  },
};

export const PerformanceOptimized: Story = {
  args: {
    children: (
      <div className="u-text-center u-flex u-flex-column u-items-center u-justify-center">
        <h2 className="u-mb-4 u-mt-0 u-text-white u-text-2xl u-font-bold">Performance Mode</h2>
        <p className="u-mb-6 u-mt-0 u-text-white u-opacity-90 u-text-base">
          Optimized for mobile devices with reduced quality presets.
        </p>
        <Button variant="primary" glass>
          Mobile Optimized
        </Button>
      </div>
    ),
    devicePreset: 'performance',
    disableResponsiveBreakpoints: false,
    distortionQuality: 'low',
    distortionOctaves: 2,
    displacementScale: 50,
    blurAmount: 0,
    saturation: 120,
    aberrationIntensity: 1.5,
    padding: '32px',
  },
  decorators: [
    Story => (
      <BackgroundWrapper backgroundImage={backgroundImages[2]} overlay overlayOpacity={0.2}>
        <Story />
      </BackgroundWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows AtomixGlass optimized for performance on mobile devices using devicePreset="performance" and reduced distortion quality.',
      },
    },
  },
};
