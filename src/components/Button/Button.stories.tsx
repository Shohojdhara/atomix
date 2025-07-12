import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-info',
        'outline-warning',
        'outline-danger',
        'outline-light',
        'outline-dark',
        'link',
      ],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    icon: {
      control: 'text',
      description: 'Optional icon element to display in the button',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button should only display an icon',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the button should have a fully rounded (pill) shape',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icon component for stories
const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// Primary Buttons
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    label: 'Info Button',
    variant: 'info',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Button',
    variant: 'error',
    size: 'md',
  },
};

// Outline Buttons
export const OutlinePrimary: Story = {
  args: {
    label: 'Outline Primary',
    variant: 'outline-primary',
    size: 'md',
  },
};

export const OutlineSecondary: Story = {
  args: {
    label: 'Outline Secondary',
    variant: 'outline-secondary',
    size: 'md',
  },
};

// Link Button
export const LinkButton: Story = {
  args: {
    label: 'Link Button',
    variant: 'link',
    size: 'md',
  },
};

// Button Sizes
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
  },
};

export const IconOnly: Story = {
  args: {
    label: 'Add',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
    iconOnly: true,
  },
};

// Group of Button Variants
export const AllVariants: Story = {
  args: {
    label: 'Button',
    variant: 'success',
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Success" variant="success" />
      <Button label="Info" variant="info" />
      <Button label="Warning" variant="warning" />
      <Button label="Error" variant="error" />
      <Button label="Light" variant="light" />
      <Button label="Dark" variant="dark" />
    </div>
  ),
};

// Group of Outline Button Variants
export const AllOutlineVariants: Story = {
  args: {
    label: 'Button',
    variant: 'outline-primary',
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <Button label="Outline Primary" variant="outline-primary" />
      <Button label="Outline Secondary" variant="outline-secondary" />
      <Button label="Outline Success" variant="outline-success" />
      <Button label="Outline Info" variant="outline-info" />
      <Button label="Outline Warning" variant="outline-warning" />
      <Button label="Outline Error" variant="outline-error" />
      <Button label="Outline Light" variant="outline-light" />
      <Button label="Outline Dark" variant="outline-dark" />
    </div>
  ),
};

// Group of Button Sizes
export const AllSizes: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
  render: () => (
    <div className="u-d-flex u-align-items-center u-gap-2">
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </div>
  ),
};

// Icon Buttons
export const IconButtonVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    icon: <Icon />,
    iconOnly: true,
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <Button label="Add" variant="primary" icon={<Icon />} />
      <Button label="Add" variant="secondary" icon={<Icon />} />
      <Button label="Add" variant="success" icon={<Icon />} />
      <Button label="Add" variant="primary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="secondary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="success" icon={<Icon />} iconOnly />
    </div>
  ),
};

// Rounded Button
export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    variant: 'primary',
    size: 'md',
    rounded: true,
  },
};

// Group of Rounded Buttons
export const RoundedVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    rounded: true,
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <Button label="Primary" variant="primary" rounded />
      <Button label="Secondary" variant="secondary" rounded />
      <Button label="Success" variant="success" rounded />
      <Button label="Info" variant="info" rounded />
      <Button label="Warning" variant="warning" rounded />
      <Button label="Error" variant="error" rounded />
      <Button label="Light" variant="light" rounded />
      <Button label="Dark" variant="dark" rounded />
    </div>
  ),
};
