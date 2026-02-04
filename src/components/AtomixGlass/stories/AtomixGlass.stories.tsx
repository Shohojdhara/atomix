/**
 * AtomixGlass.stories.tsx
 *
 * Comprehensive Storybook stories for AtomixGlass
 *
 * @package Atomix
 * @component AtomixGlass
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState, useEffect, useCallback, useRef } from 'react';
import React from 'react';
import type { RefObject } from 'react';
import AtomixGlass from '../AtomixGlass';
import Button from '../../Button/Button';
import Badge from '../../Badge/Badge';
import Card from '../../Card/Card';

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
// SHARED UTILITIES & CONSTANTS
// ============================================================================

/**
 * Reusable decorators for common story patterns
 */
const withBackground = (image: string) => (Story: any) => (
  <div
    className="u-bg-cover u-min-h-screen u-w-full u-flex u-items-center u-justify-center"
    style={{
      backgroundImage: `url(${image})`,
    }}
  >
    <div className="u-w-full u-h-full">
      <Story />
    </div>
  </div>
);

const withGlassBackground = (Story: any) => (
  <div
    className="u-bg-gradient-to-br u-from-indigo-500 u-via-purple-500 u-to-blue-500 u-min-h-screen u-w-full u-flex u-items-center u-justify-center"
  >
    <div className="u-w-full u-h-full">
      <Story />
    </div>
  </div>
);

/**
 * Collection of high-quality background images for different moods and scenarios
 */
const backgroundImages = [
  'https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

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
| cornerRadius | number | 20 | Corner radius in pixels |
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
    cornerRadius: {
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
        defaultValue: { summary: '24px' },
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
      <div className="u-text-center">
        <h2 className="u-mb-4 u-mt-0 u-text-white u-text-28">Basic Glass Effect</h2>
        <p className="u-mb-6 u-mt-0 u-text-white u-opacity-90">
          This is a basic AtomixGlass component with default settings.
        </p>
        <Button variant="primary" glass>
          Click Me
        </Button>
      </div>
    ),
    padding: '32px', // Increased padding for better visual appearance
  },
  decorators: [withGlassBackground],
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
        <h2 className="u-mb-4 u-mt-0 u-text-white u-text-24">Fully Configured Glass</h2>
        <p className="u-mb-6 u-mt-0 u-text-white u-opacity-90 u-text-16">
          This glass component uses all configurable properties.
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
    cornerRadius: 24,
    mode: 'standard',
    overLight: true,
    padding: '32px', // Increased padding for better visual appearance
    onClick: mockHandlers.onClick,
  },
  decorators: [withBackground(backgroundImages[0])],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates AtomixGlass with all configurable props set to custom values.',
      },
    },
  },
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

export const WithDifferentModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showcases the different rendering modes available in the AtomixGlass component.',
      },
    },
  },
  render: () => {
    const modes = ['standard', 'polar', 'prominent', 'shader'] as const;

    return (
      <div className="u-w-full u-min-h-screen">
        <div className="u-grid u-grid-cols-1 u_md-grid-cols-2 u_xl-grid-cols-4 u-gap-6 u-w-full u-max-w-7xl u-mx-auto u-p-4">
          {modes.map(mode => (
            <AtomixGlass
              key={mode}
              mode={mode}
              displacementScale={60}
              blurAmount={0.3}
              saturation={140}
              cornerRadius={20}
              padding="32px" // Increased padding for better visual appearance
              className="u-text-center u-h-full"
            >
              <h3 className="u-m-0 u-text-white u-text-lg u-font-semibold u-mb-2">
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </h3>
              <p className="u-m-0 u-text-white u-opacity-80 u-text-sm">
                {mode === 'standard' && 'Balanced displacement and aberration'}
                {mode === 'polar' && 'Circular refraction pattern'}
                {mode === 'prominent' && 'Enhanced displacement with stronger edge effects'}
                {mode === 'shader' && 'Advanced shader-based displacement'}
              </p>
            </AtomixGlass>
          ))}
        </div>
      </div>
    );
  },
  decorators: [withBackground(backgroundImages[1])],
};

// ============================================================================
// ADVANCED CONFIGURATION STORIES
// ============================================================================

export const WithCustomStyling: Story = {
  args: {
    children: (
      <div className="u-text-center">
        <h2 className="u-text-4 u-font-semibold u-mb-4 u-text-white">Custom Styled Glass</h2>
        <p className="u-text-base u-mb-6 u-text-white">This glass uses custom styling properties.</p>
        <Button
          variant="primary"
          className="u-rounded-lg u-py-3 u-px-6"
          style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
        >
          Premium Effect
        </Button>
      </div>
    ),
    displacementScale: 70,
    blurAmount: 0.4,
    saturation: 160,
    aberrationIntensity: 1.8,
    cornerRadius: 30,
    padding: '40px', // Increased padding for better visual appearance
    style: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transition: 'transform 0.3s ease-in-out',
    },
  },
  decorators: [withBackground(backgroundImages[2])],
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to customize the AtomixGlass component with additional CSS styles and enhanced interactivity.',
      },
    },
  },
};


// ============================================================================
// INTEGRATION STORIES
// ============================================================================

export const WithOtherComponents: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how AtomixGlass integrates with other components in the design system.',
      },
    },
  },
  render: () => {
    return (
      <div className="u-w-full u-h-screen u-flex u-items-center u-justify-center">
        <AtomixGlass
          displacementScale={85}
          blurAmount={0.6}
          saturation={170}
          aberrationIntensity={2.2}
          elasticity={0.18}
          cornerRadius={28}
          padding="36px" // Increased padding for better visual appearance
          className="u-w-11/12 u-max-w-2xl"
        >
          <div className="u-mb-6">
            <h2 className="u-m-0 u-text-white u-text-28 u-mb-2">
              Integrated UI
            </h2>
            <p className="u-m-0 u-text-white u-opacity-90">
              Glass effect with multiple components
            </p>
          </div>

          <div className="u-flex u-flex-col u-gap-4 u-items-center">
            <Button variant="primary" glass className="u-w-full">
              Primary Action
            </Button>
            <Button variant="secondary" glass className="u-w-full">
              Secondary Action
            </Button>

            <div className="u-flex u-gap-3 u-mt-4">
              <Badge variant="success" label="Success" glass />
              <Badge variant="warning" label="Warning" glass />
            </div>
          </div>
        </AtomixGlass>
      </div>
    );
  },
  decorators: [withBackground(backgroundImages[0])],
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const OptimizedForMobile: Story = {
  args: {
    children: (
      <div className="u-text-center">
        <h3 className="u-m-0 u-text-white u-text-20 u-mb-3">Mobile Optimized</h3>
        <p className="u-m-0 u-text-white u-opacity-90 u-text-14">
          Lower intensity settings for better mobile performance
        </p>
      </div>
    ),
    displacementScale: 30, // Lower for performance
    blurAmount: 0.2,
    saturation: 120,
    aberrationIntensity: 1.0,
    elasticity: 0.1,
    cornerRadius: 16,
    padding: '28px', // Increased padding for better visual appearance
  },
  decorators: [withGlassBackground],
  parameters: {
    docs: {
      description: {
        story: 'Optimized configuration for mobile devices with reduced performance impact.',
      },
    },
  },
};

export const WithManyInstances: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows multiple instances of AtomixGlass in a single view - useful for performance testing.',
      },
    },
  },
  render: () => {
    return (
      <div className="u-flex u-flex-wrap u-gap-6 u-w-full u-py-60 u-max-w-7xl u-mx-auto u-p-4">
        {[1, 2, 3, 4].map(index => (
          <AtomixGlass
            key={index}
            displacementScale={40}
            blurAmount={0.25}
            saturation={130}
            aberrationIntensity={1.2}
            elasticity={0.1}
            cornerRadius={16}
            padding="28px" // Increased padding for better visual appearance
            className="u-text-center u-h-full"
          >
            <h4 className="u-m-0 u-text-white u-text-18 u-mb-2">
              Glass #{index}
            </h4>
            <p className="u-m-0 u-text-white u-opacity-80 u-text-14">
              Instance #{index} of AtomixGlass
            </p>
          </AtomixGlass>
        ))}
      </div>
    );
  },
  decorators: [withBackground(backgroundImages[3])],
};
