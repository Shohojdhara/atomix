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

| Prop     | Type           | Default   | Description             |
| -------- | -------------- | --------- | ----------------------- |
| className | string         | ''        | Additional CSS classes |
| 'aria-label' | string         | undefined | ARIA label for accessibility |
| role | string         | 'group'        | ARIA role for the button group |

## Notes

The ButtonGroup component ensures buttons are visually connected with shared borders and appropriate border-radius adjustments for the first and last buttons.
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        category: 'Styling',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Accessibility',
      },
    },
    role: {
      control: 'text',
      description: 'ARIA role for the button group',
      table: {
        category: 'Accessibility',
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
  args: {},
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Left" />
      <Button label="Middle" />
      <Button label="Right" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic ButtonGroup with three buttons.',
      },
    },
  },
};

export const WithAllProps: Story = {
  args: {
    'aria-label': 'Navigation controls',
    className: 'custom-button-group',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button label="Previous" />
      <Button label="Next" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with all available props configured.',
      },
    },
  },
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

export const WithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Primary Group</h4>
        <ButtonGroup>
          <Button label="One" variant="primary" />
          <Button label="Two" variant="primary" />
          <Button label="Three" variant="primary" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Secondary Group</h4>
        <ButtonGroup>
          <Button label="One" variant="secondary" />
          <Button label="Two" variant="secondary" />
          <Button label="Three" variant="secondary" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Outline Group</h4>
        <ButtonGroup>
          <Button label="One" variant="outline-primary" />
          <Button label="Two" variant="outline-primary" />
          <Button label="Three" variant="outline-primary" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Mixed Variants</h4>
        <ButtonGroup>
          <Button label="Cancel" variant="secondary" />
          <Button label="Save Draft" variant="outline-primary" />
          <Button label="Publish" variant="primary" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different variant combinations for ButtonGroup.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Normal" />
      <Button label="Loading" loading />
      <Button label="Normal" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with a loading button.',
      },
    },
  },
};

export const ErrorState: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Normal" />
      <Button label="Error" variant="error" />
      <Button label="Normal" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with an error state button.',
      },
    },
  },
};

export const DisabledState: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Enabled" />
      <Button label="Disabled" disabled />
      <Button label="Enabled" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with a disabled button.',
      },
    },
  },
};

export const ActiveState: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Inactive" />
      <Button label="Active" active />
      <Button label="Inactive" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with an active button.',
      },
    },
  },
};

export const SelectedState: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Option 1" selected />
      <Button label="Option 2" />
      <Button label="Option 3" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with a selected button.',
      },
    },
  },
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Small Size</h4>
        <ButtonGroup>
          <Button label="Small" size="sm" />
          <Button label="Buttons" size="sm" />
          <Button label="Group" size="sm" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Medium Size</h4>
        <ButtonGroup>
          <Button label="Medium" size="md" />
          <Button label="Buttons" size="md" />
          <Button label="Group" size="md" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Large Size</h4>
        <ButtonGroup>
          <Button label="Large" size="lg" />
          <Button label="Buttons" size="lg" />
          <Button label="Group" size="lg" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with different button sizes.',
      },
    },
  },
};

// ============================================================================
// WITH FEATURES
// ============================================================================

export const WithIcon: Story = {
  render: () => (
    <ButtonGroup>
      <Button label="Previous" iconName="ArrowLeft" iconPosition="start" />
      <Button label="Next" iconName="ArrowRight" iconPosition="end" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with icons in buttons.',
      },
    },
  },
};

export const WithIconPosition: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Icons at Start</h4>
        <ButtonGroup>
          <Button label="Home" iconName="House" iconPosition="start" />
          <Button label="Settings" iconName="Gear" iconPosition="start" />
          <Button label="Profile" iconName="User" iconPosition="start" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Icons at End</h4>
        <ButtonGroup>
          <Button label="Home" iconName="House" iconPosition="end" />
          <Button label="Settings" iconName="Gear" iconPosition="end" />
          <Button label="Profile" iconName="User" iconPosition="end" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup showing different icon positions.',
      },
    },
  },
};

export const WithIconOnly: Story = {
  render: () => (
    <ButtonGroup>
      <Button iconName="CaretLeft" iconOnly aria-label="Previous" />
      <Button iconName="CaretRight" iconOnly aria-label="Next" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with icon-only buttons.',
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p>Navigation Controls:</p>
        <ButtonGroup>
          <Button label="Previous" variant="outline-secondary" />
          <Button label="Next" variant="outline-secondary" />
        </ButtonGroup>
      </div>
      
      <div>
        <p>Actions:</p>
        <ButtonGroup>
          <Button label="Delete" variant="danger" />
          <Button label="Edit" variant="warning" />
          <Button label="View" variant="info" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with helper text labels.',
      },
    },
  },
};

// ============================================================================
// ADVANCED CONFIGURATION
// ============================================================================

export const CustomStyling: Story = {
  render: () => (
    <ButtonGroup style={{ background: '#f0f0f0', padding: '0.5rem', borderRadius: '8px' }}>
      <Button label="Custom" style={{ background: '#e0e0e0', color: '#333' }} />
      <Button label="Styled" style={{ background: '#d0d0d0', color: '#333' }} />
      <Button label="Group" style={{ background: '#c0c0c0', color: '#333' }} />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with custom styling applied.',
      },
    },
  },
};

export const WithClassName: Story = {
  render: () => (
    <ButtonGroup className="custom-button-group">
      <Button label="Custom" className="custom-btn" />
      <Button label="Styled" className="custom-btn" />
      <Button label="Group" className="custom-btn" />
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with custom CSS classes.',
      },
    },
  },
};

// ============================================================================
// INTEGRATION EXAMPLES
// ============================================================================

export const InForm: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const buttons = ['Draft', 'Published', 'Archived'];
    
    return (
      <form>
        <label htmlFor="status-group">Post Status:</label>
        <ButtonGroup id="status-group" role="radiogroup" aria-label="Post status selection">
          {buttons.map((label, index) => (
            <Button 
              key={index}
              label={label}
              selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-checked={index === activeIndex}
              role="radio"
            />
          ))}
        </ButtonGroup>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup used as a radio button group in a form.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1rem', 
      maxWidth: '400px',
      background: 'white'
    }}>
      <h3>Confirmation</h3>
      <p>Are you sure you want to delete this item?</p>
      <ButtonGroup>
        <Button label="Cancel" variant="secondary" />
        <Button label="Delete" variant="danger" />
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup inside a card component.',
      },
    },
  },
};

export const WithOtherComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div>
        <h4>Filter Options</h4>
        <ButtonGroup>
          <Button label="All" selected />
          <Button label="Active" />
          <Button label="Completed" />
        </ButtonGroup>
      </div>
      
      <div>
        <h4>Pagination</h4>
        <ButtonGroup>
          <Button label="Previous" variant="outline-secondary" />
          <Button label="1" />
          <Button label="2" />
          <Button label="3" />
          <Button label="Next" variant="outline-secondary" />
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup combined with other components.',
      },
    },
  },
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

export const WithKeyboardNavigation: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(1);
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setActiveIndex(index);
      }
    };
    
    return (
      <ButtonGroup role="toolbar" aria-label="Toolbar with 3 buttons">
        {['Button 1', 'Button 2', 'Button 3'].map((label, idx) => (
          <Button
            key={idx}
            label={label}
            active={idx === activeIndex}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            tabIndex={0}
            aria-pressed={idx === activeIndex}
          />
        ))}
      </ButtonGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup with keyboard navigation support.',
      },
    },
  },
};