import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The ButtonGroup component groups multiple buttons together, creating a visually connected set of buttons with proper border radius handling. Buttons in a group share borders and have rounded corners only on the outer edges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    role: {
      control: 'text',
      description: 'ARIA role for the button group',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Button Groups
export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Left" />
      <Button label="Middle" />
      <Button label="Right" />
    </ButtonGroup>
  ),
};

export const TwoButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Cancel" variant="secondary" />
      <Button label="Save" variant="primary" />
    </ButtonGroup>
  ),
};

export const ThreeButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Previous" variant="secondary" />
      <Button label="Next" variant="primary" />
      <Button label="Finish" variant="success" />
    </ButtonGroup>
  ),
};

// Variant Combinations
export const PrimaryGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="One" variant="primary" />
      <Button label="Two" variant="primary" />
      <Button label="Three" variant="primary" />
    </ButtonGroup>
  ),
};

export const SecondaryGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="One" variant="secondary" />
      <Button label="Two" variant="secondary" />
      <Button label="Three" variant="secondary" />
    </ButtonGroup>
  ),
};

export const OutlineGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="One" variant="outline-primary" />
      <Button label="Two" variant="outline-primary" />
      <Button label="Three" variant="outline-primary" />
    </ButtonGroup>
  ),
};

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Cancel" variant="secondary" />
      <Button label="Save Draft" variant="outline-primary" />
      <Button label="Publish" variant="primary" />
    </ButtonGroup>
  ),
};

// Size Variants
export const SmallSize: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Small" size="sm" />
      <Button label="Buttons" size="sm" />
      <Button label="Group" size="sm" />
    </ButtonGroup>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Medium" size="md" />
      <Button label="Buttons" size="md" />
      <Button label="Group" size="md" />
    </ButtonGroup>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Large" size="lg" />
      <Button label="Buttons" size="lg" />
      <Button label="Group" size="lg" />
    </ButtonGroup>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Previous" iconName="ArrowLeft" iconPosition="start" />
      <Button label="Next" iconName="ArrowRight" iconPosition="end" />
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ButtonGroup>
      <Button iconName="CaretLeft" iconOnly ariaLabel="Previous" />
      <Button iconName="CaretRight" iconOnly ariaLabel="Next" />
    </ButtonGroup>
  ),
};

// States
export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Enabled" />
      <Button label="Disabled" disabled />
      <Button label="Enabled" />
    </ButtonGroup>
  ),
};

export const WithLoading: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Normal" />
      <Button label="Loading" loading />
      <Button label="Normal" />
    </ButtonGroup>
  ),
};

export const WithActive: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Inactive" />
      <Button label="Active" active />
      <Button label="Inactive" />
    </ButtonGroup>
  ),
};

export const WithSelected: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Option 1" selected />
      <Button label="Option 2" />
      <Button label="Option 3" />
    </ButtonGroup>
  ),
};

// Action Examples
export const ActionButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Delete" variant="danger" />
      <Button label="Edit" variant="warning" />
      <Button label="View" variant="info" />
    </ButtonGroup>
  ),
};

export const NavigationButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="First" variant="outline-secondary" />
      <Button label="Previous" variant="outline-secondary" />
      <Button label="Next" variant="outline-secondary" />
      <Button label="Last" variant="outline-secondary" />
    </ButtonGroup>
  ),
};

export const FilterButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="All" selected />
      <Button label="Active" />
      <Button label="Completed" />
    </ButtonGroup>
  ),
};

// Multiple Groups
export const MultipleGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ButtonGroup>
        <Button label="Group 1 - Button 1" />
        <Button label="Group 1 - Button 2" />
        <Button label="Group 1 - Button 3" />
      </ButtonGroup>
      <ButtonGroup>
        <Button label="Group 2 - Button 1" variant="secondary" />
        <Button label="Group 2 - Button 2" variant="secondary" />
      </ButtonGroup>
    </div>
  ),
};

// Accessibility
export const WithAriaLabel: Story = {
  render: () => (
    <ButtonGroup aria-label="Navigation controls">
      <Button label="Previous" />
      <Button label="Next" />
    </ButtonGroup>
  ),
};

// Custom Styling
export const CustomClassName: Story = {
  render: () => (
    <ButtonGroup className="custom-button-group">
      <Button label="Custom" />
      <Button label="Styled" />
      <Button label="Group" />
    </ButtonGroup>
  ),
};

// Edge Cases
export const SingleButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Single Button" />
    </ButtonGroup>
  ),
};

export const ManyButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="1" />
      <Button label="2" />
      <Button label="3" />
      <Button label="4" />
      <Button label="5" />
      <Button label="6" />
    </ButtonGroup>
  ),
};

// Rounded Buttons
export const RoundedButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Rounded" rounded />
      <Button label="Buttons" rounded />
      <Button label="Group" rounded />
    </ButtonGroup>
  ),
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <ButtonGroup>
        <Button label="Full" fullWidth />
        <Button label="Width" fullWidth />
        <Button label="Group" fullWidth />
      </ButtonGroup>
    </div>
  ),
};

