import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Textarea value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    cols: {
      control: 'number',
      description: 'Number of average character widths',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color variant of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the textarea is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the textarea is valid',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic textarea
export const Basic: Story = {
  args: {
    placeholder: 'Enter text here',
    rows: 4,
  },
};

// With value
export const WithValue: Story = {
  args: {
    value: 'This is some sample text in the textarea.',
    rows: 4,
  },
};

// Textarea sizes
export const Sizes: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea size="sm" placeholder="Small textarea" rows={3} />
      <Textarea size="md" placeholder="Medium textarea (default)" rows={3} />
      <Textarea size="lg" placeholder="Large textarea" rows={3} />
    </div>
  ),
};

// Textarea rows
export const Rows: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Textarea placeholder="2 rows" rows={2} />
      <Textarea placeholder="4 rows" rows={4} />
      <Textarea placeholder="6 rows" rows={6} />
    </div>
  ),
};

// Textarea variants
export const Variants: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
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
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
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
