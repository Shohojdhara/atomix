import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Checkbox } from './Checkbox';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Form/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# FormGroup

## Overview

FormGroup component provides a structured wrapper for form fields, including labels, inputs, helper text, and error messages. It ensures proper accessibility, consistent spacing, and validation state display. FormGroups are essential for creating well-organized and accessible forms.

## Features

- Structured form field wrapper
- Label support
- Helper text display
- Validation states (valid/invalid)
- Required field indicator
- Consistent spacing
- Accessible design
- Responsive behavior

## Accessibility

- Screen reader: Labels and form controls announced properly
- ARIA support: Proper associations between labels and controls
- Keyboard support: Navigate form with keyboard
- Focus management: Maintains focus on interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<FormGroup 
  label="Field Label" 
  htmlFor="fieldId"
  helperText="Helper text"
>
  <Input id="fieldId" placeholder="Placeholder" />
</FormGroup>
\`\`\`

### With Validation

\`\`\`tsx
<FormGroup 
  label="Field Label" 
  htmlFor="fieldId"
  required={true}
  valid={isValid}
>
  <Input id="fieldId" placeholder="Placeholder" />
</FormGroup>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| label | string | - | Label for the form group |
| helperText | string | - | Helper text displayed below the input |
| htmlFor | string | - | ID of the form control this label is for |
| required | boolean | false | Whether the field is required |
| invalid | boolean | false | Whether the field is invalid |
| valid | boolean | false | Whether the field is valid |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size variant |
| children | ReactNode | - | Form control element to wrap |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the form group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the form control this label is for',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the field is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    valid: {
      control: 'boolean',
      description: 'Whether the field is valid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size variant',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: 'object',
      description: 'Form control element to wrap',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form group with text
export const BasicUsage: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    helperText: 'Enter your username',
    required: true,
    children: <Input id="username" placeholder="Enter username" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic form group with label, helper text and required indicator.',
      },
    },
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    required: true,
    helperText: 'We will never share your email',
    children: <Input id="email" type="email" placeholder="name@example.com" required />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form group with required field indicator.',
      },
    },
  },
};

// With validation states
export const ValidationStates: Story = {
  args: {
    children: <Input id="username" placeholder="Enter username" />,
    label: 'Validation States',
    htmlFor: 'username',
    helperText: 'This is a helper text',
    required: true,
  },
  render: args => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <FormGroup label="Username" htmlFor="username" helperText="Username is available" valid>
        <Input id="username" value="johndoe" valid />
      </FormGroup>

      <FormGroup
        label="Password"
        htmlFor="password"
        helperText="Password must be at least 8 characters"
        invalid
      >
        <Input id="password" type="password" value="123" invalid />
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form group with different validation states.',
      },
    },
  },
};

// Different form control types
export const FormControls: Story = {
  args: {
    children: <Input id="text-input" placeholder="Type something..." />,
    label: 'Form Controls',
    htmlFor: 'text-input',
  },
  render: args => (
    <div style={{ display: 'grid', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <FormGroup label="Text Input" htmlFor="text-input">
        <Input id="text-input" placeholder="Type something..." />
      </FormGroup>

      <FormGroup label="Select" htmlFor="select">
        <Select
          id="select"
          options={[
            { value: '', label: 'Select an option' },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
        />
      </FormGroup>

      <FormGroup label="Checkbox" htmlFor="checkbox">
        <Checkbox id="checkbox" label="Check me" />
      </FormGroup>

      <FormGroup label="Radio" htmlFor="radio">
        <Radio id="radio" name="radio-group" label="Select me" />
      </FormGroup>

      <FormGroup label="Textarea" htmlFor="textarea">
        <Textarea id="textarea" placeholder="Enter your message..." rows={3} />
      </FormGroup>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  args: {
    children: <Input id="small-input" size="sm" placeholder="Small input..." />,
    label: 'Input Sizes',
    htmlFor: 'small-input',
    size: 'sm',
  },
  render: args => (
    <div style={{ display: 'grid', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <FormGroup label="Small Input" htmlFor="small-input" size="sm">
        <Input id="small-input" size="sm" placeholder="Small input..." />
      </FormGroup>

      <FormGroup label="Medium Input (default)" htmlFor="medium-input" size="md">
        <Input id="medium-input" size="md" placeholder="Medium input..." />
      </FormGroup>

      <FormGroup label="Large Input" htmlFor="large-input" size="lg">
        <Input id="large-input" size="lg" placeholder="Large input..." />
      </FormGroup>
    </div>
  ),
};
