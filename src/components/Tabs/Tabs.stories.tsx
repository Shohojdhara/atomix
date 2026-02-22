import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { AtomixGlassProps } from '../../lib/types/components';
import { Tabs } from './Tabs';

// Helper type for glass props in stories (without children requirement)
type GlassProps = boolean | Omit<AtomixGlassProps, 'children'>;

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Tabs

## Overview

Tabs organize content into multiple panels accessible via tab navigation. It provides a clean interface for switching between different views or sections of content. Tabs support keyboard navigation and can include rich content in each panel.

## Features

- Multiple tab panels with distinct content
- Keyboard navigation support
- Active tab indication
- Glass morphism effect option
- Rich content support
- Accessible design
- Responsive behavior

## Accessibility

- Keyboard support: Navigate tabs with arrow keys, activate with Enter/Space
- Screen reader: Tab labels and content announced properly
- ARIA support: Proper roles and properties for tab components
- Focus management: Maintains focus on active tab element

## Usage Examples

### Basic Usage

\`\`\`tsx
<Tabs 
  items={[
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>
\`\`\`

### With Glass Effect

\`\`\`tsx
<Tabs 
  glass={true}
  items={[
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| activeIndex | number | 0 | The index of the currently active tab |
| items | TabItem[] | [] | Array of tab items with labels and content |
| glass | boolean \\| GlassProps | false | Enable glass morphism effect |
| onChange | (index: number) => void | - | Callback when active tab changes |
| className | string | - | Additional CSS classes for the component |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: { type: 'number' },
      description: 'The index of the currently active tab',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean | GlassProps' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      action: 'tab changed',
      description: 'Callback when active tab changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: args => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    items: [
      {
        label: 'Tab 1',
        content: <p>This is the content for Tab 1. Default tab content.</p>,
      },
      {
        label: 'Tab 2',
        content: <p>This is the content for Tab 2. It contains different information.</p>,
      },
      {
        label: 'Tab 3',
        content: <p>This is the content for Tab 3. Another unique content section.</p>,
      },
    ],
    activeIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs component with three tabs.',
      },
    },
  },
};

export const WithDifferentActiveTab: Story = {
  render: args => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    items: [
      {
        label: 'Tab 1',
        content: <p>This is the content for Tab 1.</p>,
      },
      {
        label: 'Tab 2',
        content: <p>This is the content for Tab 2. It's initially active.</p>,
      },
      {
        label: 'Tab 3',
        content: <p>This is the content for Tab 3.</p>,
      },
    ],
    activeIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with a different tab initially active (Tab 2).',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  render: args => (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '300px',
      }}
    >
      <Tabs {...args} />
    </div>
  ),
  args: {
    items: [
      {
        label: 'Tab 1',
        content: <p>This is the content for Tab 1 with glass effect.</p>,
      },
      {
        label: 'Tab 2',
        content: <p>This is the content for Tab 2 with glass effect.</p>,
      },
      {
        label: 'Tab 3',
        content: <p>This is the content for Tab 3 with glass effect.</p>,
      },
    ],
    activeIndex: 0,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with glass morphism effect applied.',
      },
    },
  },
};

/**
 * Tabs with rich content including headings, lists, and tables.
 */
export const WithRichContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates tabs containing rich HTML content including headings, lists, and tables, showing the flexibility of the tabs component.',
      },
    },
  },
  render: args => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px' }}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    items: [
      {
        label: 'Features',
        content: (
          <div>
            <h3>Key Features</h3>
            <ul>
              <li>Responsive design</li>
              <li>Accessible navigation</li>
              <li>Smooth transitions</li>
            </ul>
          </div>
        ),
      },
      {
        label: 'Specifications',
        content: (
          <div>
            <h3>Technical Specifications</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    Property
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Size</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Medium</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Material</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Aluminum</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        label: 'Reviews',
        content: (
          <div>
            <h3>Customer Reviews</h3>
            <div style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
              <p style={{ marginBottom: '5px' }}>
                <strong>John D.</strong> ★★★★★
              </p>
              <p>Great product, highly recommended!</p>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
              <p style={{ marginBottom: '5px' }}>
                <strong>Sarah T.</strong> ★★★★☆
              </p>
              <p>Very good quality and fast shipping.</p>
            </div>
          </div>
        ),
      },
    ],
    activeIndex: 0,
  },
};

/**
 * Tabs with glass morphism effect enabled.
 */
export const Glass: Story = {
  args: {
    items: [
      {
        label: 'Glass Tab 1',
        content: <p>This is the content for Glass Tab 1 with glass morphism effect.</p>,
      },
      {
        label: 'Glass Tab 2',
        content: <p>This is the content for Glass Tab 2 with glass morphism effect.</p>,
      },
      {
        label: 'Glass Tab 3',
        content: <p>This is the content for Glass Tab 3 with glass morphism effect.</p>,
      },
    ],
    activeIndex: 0,
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Tabs {...args} />
      </div>
    </div>
  ),
};

/**
 * Tabs with custom glass morphism settings.
 */
export const GlassCustom: Story = {
  args: {
    items: [
      {
        label: 'Custom Glass Tab 1',
        content: <p>This tab has custom glass morphism settings.</p>,
      },
      {
        label: 'Custom Glass Tab 2',
        content: <p>Enhanced glass effect with custom parameters.</p>,
      },
      {
        label: 'Custom Glass Tab 3',
        content: <p>Another tab with the same custom glass settings.</p>,
      },
    ],
    activeIndex: 0,
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    } as GlassProps,
  },
  render: args => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Tabs {...args} />
      </div>
    </div>
  ),
};
