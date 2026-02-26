import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Textarea } from './Textarea';
import { SIZES, THEME_COLORS } from '../../lib/constants/components';

const meta = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Textarea

## Overview

Textarea component provides a multi-line text input field for longer content. It supports various sizes, validation states, and can be customized with different variants. Textareas are ideal for comments, descriptions, or any content requiring multiple lines of input.

## Features

- Multi-line text input
- Various size options
- Color variants
- Validation states (valid/invalid)
- Placeholder support
- Disabled state
- Glass morphism effect
- Accessible design
- Responsive behavior

## Accessibility

- Keyboard support: Navigate and input text with keyboard
- Screen reader: Label and content announced properly
- ARIA support: Proper roles and properties for textarea components
- Focus management: Visible focus indicators maintained

## Usage Examples

### Basic Usage

\`\`\`tsx
<Textarea 
  placeholder="Enter your text here"
  rows={4}
  onChange={handleChange}
/>
\`\`\`

### With Value

\`\`\`tsx
<Textarea 
  value={textValue}
  placeholder="Enter your text here"
  rows={6}
  onChange={handleChange}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| value | string | - | Textarea value |
| placeholder | string | - | Placeholder text |
| rows | number | 2 | Number of visible text lines |
| cols | number | - | Number of average character widths |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size of the textarea |
| variant | ThemeColor | 'secondary' | Color variant of the textarea |
| disabled | boolean | false | Whether the textarea is disabled |
| invalid | boolean | false | Whether the textarea is invalid |
| valid | boolean | false | Whether the textarea is valid |
| glass | boolean | false | Enable glass morphism effect |
| defaultValue | string | - | Initial value for uncontrolled textarea |
| onChange | (event: ChangeEvent) => void | - | Callback when textarea value changes |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Textarea value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 2 },
      },
    },
    cols: {
      control: 'number',
      description: 'Number of average character widths',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '-' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the textarea',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'Color variant of the textarea',
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'secondary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the textarea is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    valid: {
      control: 'boolean',
      description: 'Whether the textarea is valid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value for uncontrolled textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when textarea value changes',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic textarea
export const BasicUsage: Story = {
  args: {
    placeholder: 'Enter text here',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic textarea with placeholder and 4 rows.',
      },
    },
  },
};

/**
 * Textarea using defaultValue for uncontrolled component pattern.
 */
export const Uncontrolled: Story = {
  args: {
    defaultValue: 'Initial value',
    placeholder: 'Type something...',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled textarea with initial value.',
      },
    },
  },
};

// With value
export const WithValue: Story = {
  args: {
    value: 'This is some sample text in the textarea.',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with pre-filled value.',
      },
    },
  },
};

// Textarea sizes
export const Sizes: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea placeholder="Small textarea" size="sm" rows={2} />
      <Textarea placeholder="Medium textarea" size="md" rows={3} />
      <Textarea placeholder="Large textarea" size="lg" rows={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea in all available sizes.',
      },
    },
  },
};

// Textarea rows
export const Rows: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea placeholder="2 rows" rows={2} />
      <Textarea placeholder="4 rows" rows={4} />
      <Textarea placeholder="6 rows" rows={6} />
    </div>
  ),
};

// Textarea variants
export const Variants: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea variant="primary" placeholder="Primary textarea" rows={2} />
      <Textarea variant="secondary" placeholder="Secondary textarea" rows={2} />
      <Textarea variant="success" placeholder="Success textarea" rows={2} />
      <Textarea variant="error" placeholder="Error textarea" rows={2} />
      <Textarea variant="warning" placeholder="Warning textarea" rows={2} />
      <Textarea variant="info" placeholder="Info textarea" rows={2} />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea placeholder="Default textarea" rows={2} />
      <Textarea placeholder="Disabled textarea" disabled rows={2} />
      <Textarea placeholder="Valid textarea" valid rows={2} />
      <Textarea placeholder="Invalid textarea" invalid rows={2} />
      <Textarea
        placeholder="Read-only textarea"
        readOnly
        value="This content cannot be edited"
        rows={2}
      />
    </div>
  ),
};

// Glass Effect
export const Glass: Story = {
  args: {
    placeholder: 'Glass Textarea',
    rows: 4,
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Textarea {...args} />
    </div>
  ),
};

// Glass Variants
export const GlassVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
        padding: '2rem',
        borderRadius: '12px',
      }}
    >
      <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
        Glass Textarea Variants
      </h3>
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '400px' }}>
        <Textarea placeholder="Small Glass" size="sm" rows={3} glass />
        <Textarea placeholder="Medium Glass" size="md" rows={3} glass />
        <Textarea placeholder="Large Glass" size="lg" rows={3} glass />
        <Textarea placeholder="Primary Glass" variant="primary" rows={3} glass />
        <Textarea placeholder="Success Glass" variant="success" rows={3} glass />
        <Textarea
          placeholder="Custom Glass"
          rows={4}
          glass={{
            displacementScale: 80,
            blurAmount: 2,
            saturation: 200,
            aberrationIntensity: 2,
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  ),
};

// Glass Showcase
export const GlassShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Basic Glass */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Glass Textarea on Background
        </h3>
        <div className="u-flex u-flex-column u-gap-3" style={{ width: '400px' }}>
          <Textarea placeholder="Write your message..." rows={4} glass />
          <Textarea placeholder="Additional notes..." rows={3} glass />
        </div>
      </div>

      {/* Different Glass Modes */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Glass Modes</h3>
        <div className="u-flex u-flex-column u-gap-3" style={{ width: '400px' }}>
          <Textarea placeholder="Standard Mode" rows={3} glass={{ mode: 'standard' }} />
          <Textarea placeholder="Polar Mode" rows={3} glass={{ mode: 'polar' }} />
          <Textarea placeholder="Prominent Mode" rows={3} glass={{ mode: 'prominent' }} />
          <Textarea placeholder="Shader Mode" rows={3} glass={{ mode: 'shader' }} />
        </div>
      </div>
    </div>
  ),
};
