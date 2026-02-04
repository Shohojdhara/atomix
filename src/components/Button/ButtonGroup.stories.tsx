/**
 * ButtonGroup.stories.tsx
 *
 * Comprehensive Storybook stories for ButtonGroup
 *
 * @package Atomix
 * @component ButtonGroup
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';
import { SIZES } from '../../lib/constants/components';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Type helper for story props without children requirement
 */
type ButtonGroupStoryProps = Omit<React.ComponentProps<typeof ButtonGroup>, 'children'> & {
  children?: React.ReactNode;
};

// ============================================================================
// SHARED UTILITIES & CONSTANTS
// ============================================================================

/**
 * Sample data for stories
 */
const sampleButtonTitles = {
  basic: ['Left', 'Middle', 'Right'],
  actions: ['Cancel', 'Save Draft', 'Publish'],
  navigation: ['First', 'Previous', 'Next', 'Last'],
  filters: ['All', 'Active', 'Completed'],
};


// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ButtonGroup

The ButtonGroup component groups multiple buttons together, creating a visually connected set of buttons with proper border radius handling. Buttons in a group share borders and have rounded corners only on the outer edges.

## Features

- Connects multiple buttons with shared borders
- Proper border-radius handling for first and last buttons
- Supports all Button component variants and sizes
- Maintains accessibility features
- Responsive design

## Accessibility

- Keyboard support: Tab to focus, Enter/Space to activate buttons
- Screen reader: Announces button labels and group context
- ARIA support: Role and labeling options
- Focus management: Visual focus indicators

## Usage Examples

### Basic Usage

\`\`\`tsx
<ButtonGroup>
  <Button label="Left" />
  <Button label="Middle" />
  <Button label="Right" />
</ButtonGroup>
\`\`\`

### With Variants

\`\`\`tsx
<ButtonGroup>
  <Button label="Cancel" variant="secondary" />
  <Button label="Save" variant="primary" />
</ButtonGroup>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| vertical | boolean | false | Whether to stack buttons vertically |
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Button elements to group |

## Design Tokens

Used design tokens:

- \`--atomix-btn-group-gap\`: Gap between buttons in group
- \`--atomix-btn-group-border-radius\`: Border radius for button groups

## Notes

When using ButtonGroup, ensure that all child buttons are of the same size for consistent appearance.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the button group',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// BASIC USAGE STORIES
// ============================================================================

export const BasicUsage: Story = {
  args: {
    children: (
      <>
        <Button label="Left" variant="primary" />
        <Button label="Middle" variant="primary" />
        <Button label="Right" variant="primary" />
      </>
    ),
  },
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

export const HorizontalGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Left" variant="primary" />
      <Button label="Middle" variant="secondary" />
      <Button label="Right" variant="success" />
    </ButtonGroup>
  ),
};

export const VerticalGroup: Story = {
  render: () => (
    <ButtonGroup vertical={true}>
      <Button label="Top" variant="primary" />
      <Button label="Middle" variant="secondary" />
      <Button label="Bottom" variant="success" />
    </ButtonGroup>
  ),
};

export const GroupWithSizes: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </ButtonGroup>
  ),
};

export const GroupWithIcons: Story = {
  render: () => {
    const Icon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    );
    
    return (
      <ButtonGroup>
        <Button label="First" icon={<Icon />} variant="primary" />
        <Button label="Second" icon={<Icon />} variant="secondary" />
        <Button label="Third" icon={<Icon />} variant="success" />
      </ButtonGroup>
    );
  },
};

// ============================================================================
// INTEGRATION EXAMPLES
// ============================================================================

export const InFormIntegration: Story = {
  render: () => (
    <form className="u-flex u-flex-col u-gap-4">
      <input 
        type="text" 
        placeholder="Username" 
        className="u-p-2 u-mb-2 u-border u-border-gray-300 u-rounded u-w-full" 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="u-p-2 u-mb-2 u-border u-border-gray-300 u-rounded u-w-full" 
      />
      <ButtonGroup className="u-justify-end">
        <Button label="Cancel" variant="secondary" />
        <Button label="Submit" variant="primary" />
      </ButtonGroup>
    </form>
  ),
};

export const InCardIntegration: Story = {
  render: () => (
    <div className="u-p-6 u-bg-white u-rounded-lg u-shadow-lg u-w-80">
      <h3 className="u-mt-0 u-mb-3">Confirm Action</h3>
      <p className="u-mb-4">Are you sure you want to perform this action?</p>
      <ButtonGroup>
        <Button label="No" variant="secondary" size="sm" />
        <Button label="Yes" variant="danger" size="sm" />
      </ButtonGroup>
    </div>
  ),
};

export const WithOtherComponents: Story = {
  render: () => (
    <div className="u-flex u-flex-col u-gap-4 u-w-full">
      <div className="u-flex u-items-center u-gap-2 u-mb-4">
        <h4 className="u-m-0">Filters:</h4>
        <ButtonGroup>
          <Button label="All" variant="outline-primary" />
          <Button label="Active" variant="outline-primary" />
          <Button label="Inactive" variant="outline-primary" />
        </ButtonGroup>
      </div>
      
      <div className="u-flex u-justify-between u-items-center">
        <div className="u-text-sm u-text-gray-600">Showing 1-10 of 42 results</div>
        <ButtonGroup>
          <Button label="Prev" variant="outline-secondary" />
          <Button label="Next" variant="outline-secondary" />
        </ButtonGroup>
      </div>
    </div>
  ),
};

// ============================================================================
// RESPONSIVE EXAMPLES
// ============================================================================

export const ResponsiveButtonGroup: Story = {
  render: () => (
    <div className="u-w-full">
      <ButtonGroup className="u-flex-col md:u-flex-row u-gap-0">
        <Button 
          label="Home" 
          variant="outline-primary" 
          className="u-w-full md:u-w-auto u-rounded-none md:u-rounded-l md:u-rounded-r-none"
        />
        <Button 
          label="About" 
          variant="outline-primary" 
          className="u-w-full md:u-w-auto u-rounded-none"
        />
        <Button 
          label="Services" 
          variant="outline-primary" 
          className="u-w-full md:u-w-auto u-rounded-none"
        />
        <Button 
          label="Contact" 
          variant="outline-primary" 
          className="u-w-full md:u-w-auto u-rounded-none md:u-rounded-r md:u-rounded-l-none"
        />
      </ButtonGroup>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const LongText: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <ButtonGroup>
        <Button label="Very Long Text Button" />
        <Button label="Another Long Button Label" />
        <Button label="Third Extra Long Label" />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with long text buttons.',
      },
    },
  },
};

export const SingleButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Single Button" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with a single button.',
      },
    },
  },
};

export const WithManyButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="1" size="sm" />
      <Button label="2" size="sm" />
      <Button label="3" size="sm" />
      <Button label="4" size="sm" />
      <Button label="5" size="sm" />
      <Button label="6" size="sm" />
      <Button label="7" size="sm" />
      <Button label="8" size="sm" />
      <Button label="9" size="sm" />
      <Button label="10" size="sm" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with many buttons (using smaller size).',
      },
    },
  },
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const WithAriaLabels: Story = {
  render: () => (
    <ButtonGroup aria-label="Pagination controls">
      <Button label="Previous" aria-label="Go to previous page" />
      <Button label="1" aria-label="Go to page 1" />
      <Button label="2" aria-label="Go to page 2" />
      <Button label="3" aria-label="Go to page 3" />
      <Button label="Next" aria-label="Go to next page" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with proper ARIA labels for accessibility.',
      },
    },
  },
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="u-flex u-flex-col u-gap-3">
      <div className="u-flex u-flex-col u-gap-0 u-items-start">
        <Button label="Button 1" variant="primary" className="u-w-full u-rounded-b-none" />
        <Button label="Button 2" variant="secondary" className="u-w-full u-rounded-none" />
        <Button label="Button 3" variant="outline-primary" className="u-w-full u-rounded-t-none" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout using flex-direction column.',
      },
    },
  },
};

export const WithKeyboardNavigation: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const buttons = [
      { label: "Button 1", variant: "primary" },
      { label: "Button 2", variant: "secondary" },
      { label: "Button 3", variant: "outline-primary" },
      { label: "Button 4", variant: "success" },
    ];

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      let newIndex = index;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = (index + 1) % buttons.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = (index - 1 + buttons.length) % buttons.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = buttons.length - 1;
          break;
        default:
          return;
      }
      
      e.preventDefault();
      setActiveIndex(newIndex);
    };

    return (
      <div className="u-flex u-flex-col u-gap-3">
        <div className="u-flex u-gap-0">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              label={btn.label}
              variant={btn.variant}
              active={activeIndex === idx}
              onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(idx, e)}
              className={idx === 0 ? 'u-rounded-r-none' : idx === buttons.length - 1 ? 'u-rounded-l-none' : 'u-rounded-none'}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with keyboard navigation support using arrow keys.',
      },
    },
  },
};