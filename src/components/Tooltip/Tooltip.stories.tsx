import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { AtomixGlassProps } from '../../lib/types/components';
import { Tooltip } from './Tooltip';

// Helper type for glass props in stories (without children requirement)
type GlassProps = boolean | Omit<AtomixGlassProps, 'children'>;

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Tooltip

## Overview

Tooltip displays contextual information when users hover over or click on an element. It supports multiple positions, triggers, and can include rich content. Tooltips are useful for providing additional context without cluttering the interface.

## Features

- Multiple position options (top, bottom, left, right with corners)
- Hover and click triggers
- Configurable delays and offsets
- Glass morphism effect
- Rich content support
- Accessible design
- Responsive behavior

## Accessibility

- Screen reader: Tooltip content announced appropriately
- ARIA support: Proper roles and properties for tooltip components
- Keyboard support: Accessible via keyboard navigation
- Focus management: Maintains focus on trigger element

## Usage Examples

### Basic Usage

\`\`\`tsx
<Tooltip 
  content="Tooltip text"
  position="top"
>
  <button>Hover me</button>
</Tooltip>
\`\`\`

### With Glass Effect

\`\`\`tsx
<Tooltip 
  content="Tooltip text"
  position="top"
  glass={true}
>
  <button>Hover me</button>
</Tooltip>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| position | Position | 'top' | Position of the tooltip relative to the trigger |
| trigger | 'hover' \\| 'click' | 'hover' | How the tooltip is triggered |
| delay | number | 200 | Delay in milliseconds before showing tooltip |
| offset | number | 10 | Offset distance from the trigger element |
| glass | boolean \\| GlassProps | false | Enable glass morphism effect |
| content | ReactNode | - | Content to display in the tooltip |
| children | ReactNode | - | Trigger element for the tooltip |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Position of the tooltip relative to the trigger',
      table: {
        type: { summary: 'Position' },
        defaultValue: { summary: 'top' },
      },
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click'],
      description: 'How the tooltip is triggered',
      table: {
        type: { summary: '"hover" | "click"' },
        defaultValue: { summary: 'hover' },
      },
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before showing tooltip',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    offset: {
      control: { type: 'number' },
      description: 'Offset distance from the trigger element',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean | GlassProps' },
        defaultValue: { summary: false },
      },
    },
    content: {
      control: 'object',
      description: 'Content to display in the tooltip',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Hover me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">This is a tooltip on top</p>,
    position: 'top',
    trigger: 'hover',
  } as any,
  parameters: {
    docs: {
      description: {
        story: 'Default tooltip with top position and hover trigger.',
      },
    },
  },
};

export const ClickTrigger: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Click me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">Click anywhere to close this tooltip</p>,
    position: 'top',
    trigger: 'click',
  } as any,
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with click trigger instead of hover.',
      },
    },
  },
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '20px', 
      padding: '50px',
      alignItems: 'center',
      justifyItems: 'center',
      height: '500px'
    }}>
      <div>
        <Tooltip content="Top Left Tooltip">
          <button className="c-btn c-btn--primary">Top Left</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Top Tooltip" position="top">
          <button className="c-btn c-btn--primary">Top</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Top Right Tooltip" position="top-right">
          <button className="c-btn c-btn--primary">Top Right</button>
        </Tooltip>
      </div>
      
      <div>
        <Tooltip content="Left Tooltip" position="left">
          <button className="c-btn c-btn--primary">Left</button>
        </Tooltip>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <p>All tooltip positions</p>
      </div>
      
      <div>
        <Tooltip content="Right Tooltip" position="right">
          <button className="c-btn c-btn--primary">Right</button>
        </Tooltip>
      </div>
      
      <div>
        <Tooltip content="Bottom Left Tooltip" position="bottom-left">
          <button className="c-btn c-btn--primary">Bottom Left</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Bottom Tooltip" position="bottom">
          <button className="c-btn c-btn--primary">Bottom</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Bottom Right Tooltip" position="bottom-right">
          <button className="c-btn c-btn--primary">Bottom Right</button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available tooltip positions demonstrated.',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  render: args => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '100px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '300px'
    }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Hover me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">Tooltip with glass effect applied</p>,
    position: 'top',
    trigger: 'hover',
    glass: true,
  } as any,
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with glass morphism effect applied.',
      },
    },
  },
};

/**
 * Glass morphism tooltip example.
 */
export const GlassTooltip: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Hover me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">This is a glass tooltip</p>,
    position: 'top',
    trigger: 'hover',
    glass: true,
  } as any,
  decorators: [
    Story => (
      <div
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1764066183840-9afb28867988?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100dvh',
          width: '100dvw',
          margin: 0,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass tooltip with custom settings.
 */
export const GlassTooltipCustom: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Hover me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">Custom glass tooltip with enhanced effects</p>,
    position: 'top',
    trigger: 'hover',
    glass: {
      displacementScale: 60,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 1,
      cornerRadius: 12,
      mode: 'polar',
    } as GlassProps,
  } as any,
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1758843412266-e8661a80ada2?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100dvh',
          width: '100dvw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass tooltip with click trigger.
 */
export const GlassTooltipClick: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Click me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">Click to show glass tooltip</p>,
    position: 'top',
    trigger: 'click',
    glass: true,
  } as any,
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1658937364065-60f3f6818724?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100dvh',
          width: '100dvw',
          margin: 0,
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass tooltip with different positions.
 */
export const GlassTooltipPositions: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Hover me</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: <p className="u-mb-0">Glass tooltip in different positions</p>,
    position: 'top',
    trigger: 'hover',
    glass: true,
  } as any,
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1657617053432-09e4adf998bb?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100dvh',
          width: '100dvw',
          margin: 0,
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass tooltip with rich content.
 */
export const GlassTooltipRich: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Tooltip {...args}>
        <button className="c-btn c-btn--primary">Click for rich content</button>
      </Tooltip>
    </div>
  ),
  args: {
    content: (
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '8px' }}>Glass Rich Tooltip</h4>
        <ul style={{ margin: 0, paddingLeft: '16px' }}>
          <li>Beautiful glass effect</li>
          <li>Supports rich content</li>
          <li>Modern design</li>
        </ul>
      </div>
    ),
    position: 'bottom',
    trigger: 'click',
    offset: 15,
    glass: true,
  } as any,
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1685334466570-6c6162e242b6?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100dvh',
          width: '100dvw',
          margin: 0,
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
