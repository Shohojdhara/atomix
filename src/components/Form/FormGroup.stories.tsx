import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Form/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the form group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the form control this label is for',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the field is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the field is valid',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form group with text input
export const WithInput: Story = {
  args: {
    label: 'Name',
    htmlFor: 'name',
    helperText: 'Enter your full name',
    children: <Input id="name" placeholder="John Doe" />,
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
};

// With validation states
export const ValidationStates: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <FormGroup
        label="Username"
        htmlFor="username"
        helperText="Username is available"
        valid
      >
        <Input id="username" value="johndoe" valid />
      </FormGroup>
      
      <FormGroup
        label="Password"
        htmlFor="password"
        helperText="Password must be at least 8 characters"
        invalid
      >
        <Input id="password" type="password" value="1234" invalid />
      </FormGroup>
    </div>
  ),
};

// Different form control types
export const FormControls: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <FormGroup label="Name" htmlFor="demo-name">
        <Input id="demo-name" placeholder="Enter your name" />
      </FormGroup>
      
      <FormGroup label="Country" htmlFor="demo-country">
        <Select
          id="demo-country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
          placeholder="Select a country"
        />
      </FormGroup>
      
      <FormGroup label="Message" htmlFor="demo-message">
        <Textarea
          id="demo-message"
          rows={3}
          placeholder="Enter your message"
        />
      </FormGroup>
      
      <FormGroup>
        <Checkbox
          id="demo-agree"
          label="I agree to the terms and conditions"
        />
      </FormGroup>
      
      <FormGroup label="Notification preference">
        <div className="u-d-flex u-flex-column u-gap-2">
          <Radio
            id="notify-email"
            name="notification"
            value="email"
            label="Email"
            checked
          />
          <Radio
            id="notify-sms"
            name="notification"
            value="sms"
            label="SMS"
          />
          <Radio
            id="notify-push"
            name="notification"
            value="push"
            label="Push Notification"
          />
        </div>
      </FormGroup>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <FormGroup
        label="Small"
        htmlFor="small-input"
        size="sm"
        helperText="This is a small form group"
      >
        <Input id="small-input" size="sm" placeholder="Small input" />
      </FormGroup>
      
      <FormGroup
        label="Medium (Default)"
        htmlFor="medium-input"
        helperText="This is a medium form group"
      >
        <Input id="medium-input" placeholder="Medium input" />
      </FormGroup>
      
      <FormGroup
        label="Large"
        htmlFor="large-input"
        size="lg"
        helperText="This is a large form group"
      >
        <Input id="large-input" size="lg" placeholder="Large input" />
      </FormGroup>
    </div>
  ),
}; 