import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Tabs component organizes content into multiple panels accessible via tab navigation. It provides a clean interface for switching between different views or sections of content. Tabs support keyboard navigation and can include rich content in each panel.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: { type: 'number' },
      description: 'The index of the currently active tab',
      defaultValue: 0,
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Tabs
export const Default: Story = {
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
};

export const WithRichContent: Story = {
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
    } as any,
  },
  render: (args: any) => (
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