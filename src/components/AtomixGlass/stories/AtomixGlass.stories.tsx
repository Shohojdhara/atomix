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
  <div style={{
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Story />
  </div>
);

const withGlassBackground = (Story: any) => (
  <div style={{
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Story />
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
    layout: 'centered',
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
        defaultValue: { summary: '"auto"' },
        type: { summary: 'boolean | "auto"' },
      },
    },
    mode: {
      control: { type: 'select' },
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
    reducedMotion: {
      control: 'boolean',
      description: 'Override for reduced motion preference (default: false)',
      table: { defaultValue: { summary: 'false' } },
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
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0', color: 'white' }}>Basic Glass Effect</h2>
        <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)' }}>
          This is a basic AtomixGlass component with default settings.
        </p>
        <Button variant="primary" glass>Click Me</Button>
      </div>
    ),
  },
  decorators: [withGlassBackground],
  parameters: {
    docs: {
      description: {
        story: 'The basic usage of the AtomixGlass component with default configuration.'
      }
    }
  }
};

export const WithAllProps: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0', color: 'white', fontSize: '24px' }}>Fully Configured Glass</h2>
        <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
          This glass component uses all configurable properties.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button variant="primary" glass>Primary</Button>
          <Button variant="outline-primary" glass>Outline</Button>
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
    onClick: mockHandlers.onClick,
  },
  decorators: [withBackground(backgroundImages[0])],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates AtomixGlass with all configurable props set to custom values.'
      }
    }
  }
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

export const WithDifferentModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showcases the different rendering modes available in the AtomixGlass component.'
      }
    }
  },
  render: () => {
    const modes = ['standard', 'polar', 'prominent', 'shader'] as const;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%', maxWidth: '1200px' }}>
        {modes.map(mode => (
          <AtomixGlass 
            key={mode} 
            mode={mode as any}
            displacementScale={60}
            blurAmount={0.3}
            saturation={140}
            cornerRadius={20}
            style={{ padding: '24px', textAlign: 'center' }}
          >
            <h3 style={{ margin: '0 0 12px 0', color: 'white' }}>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              {mode === 'standard' && 'Balanced displacement and aberration'}
              {mode === 'polar' && 'Circular refraction pattern'}
              {mode === 'prominent' && 'Enhanced displacement with stronger edge effects'}
              {mode === 'shader' && 'Advanced shader-based displacement'}
            </p>
          </AtomixGlass>
        ))}
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
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px 0', color: 'white', fontSize: '24px' }}>Custom Styled Glass</h2>
        <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
          This glass uses custom styling properties.
        </p>
        <Badge variant="primary" label="Premium Effect" glass />
      </div>
    ),
    displacementScale: 70,
    blurAmount: 0.4,
    saturation: 160,
    aberrationIntensity: 1.8,
    cornerRadius: 30,
    style: {
      width: '400px',
      height: '300px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    }
  },
  decorators: [withBackground(backgroundImages[2])],
  parameters: {
    docs: {
      description: {
        story: 'Shows how to customize the AtomixGlass component with additional CSS styles.'
      }
    }
  }
};

// ============================================================================
// INTEGRATION STORIES
// ============================================================================

export const WithOtherComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how AtomixGlass integrates with other components in the design system.'
      }
    }
  },
  render: () => {
    return (
      <AtomixGlass
        displacementScale={85}
        blurAmount={0.6}
        saturation={170}
        aberrationIntensity={2.2}
        elasticity={0.18}
        cornerRadius={28}
        style={{ padding: '40px', maxWidth: '500px', textAlign: 'center' }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '28px' }}>Integrated UI</h2>
          <p style={{ margin: '0', color: 'rgba(255,255,255,0.9)' }}>Glass effect with multiple components</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" glass style={{ width: '100%' }}>Primary Action</Button>
          <Button variant="secondary" glass style={{ width: '100%' }}>Secondary Action</Button>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Badge variant="success" label="Success" glass />
            <Badge variant="warning" label="Warning" glass />
          </div>
        </div>
      </AtomixGlass>
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
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '20px' }}>Mobile Optimized</h3>
        <p style={{ margin: '0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
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
  },
  decorators: [withGlassBackground],
  parameters: {
    docs: {
      description: {
        story: 'Optimized configuration for mobile devices with reduced performance impact.'
      }
    }
  }
};

export const WithManyInstances: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple instances of AtomixGlass in a single view - useful for performance testing.'
      }
    }
  },
  render: () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%', maxWidth: '1000px' }}>
        {[1, 2, 3, 4].map((index) => (
          <AtomixGlass
            key={index}
            displacementScale={40}
            blurAmount={0.25}
            saturation={130}
            aberrationIntensity={1.2}
            elasticity={0.1}
            cornerRadius={16}
            style={{ padding: '20px', textAlign: 'center' }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '18px' }}>Glass #{index}</h4>
            <p style={{ margin: '0', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              Instance #{index} of AtomixGlass
            </p>
          </AtomixGlass>
        ))}
      </div>
    );
  },
  decorators: [withBackground(backgroundImages[3])],
};