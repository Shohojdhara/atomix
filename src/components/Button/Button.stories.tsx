import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState, useCallback } from 'react';
import { Button } from './Button';
import { SIZES, THEME_COLORS } from '../../lib/constants/components';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Type helper for story props without children requirement
 */
type ButtonStoryProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  children?: React.ReactNode;
};

// ============================================================================
// SHARED UTILITIES & CONSTANTS
// ============================================================================

/**
 * Reusable decorators for common story patterns
 */
const withBackground = (bgUrl: string) => (Story: any) => (
  <div
    className="u-bg-cover u-bg-center u-p-10 u-rounded-xl"
    style={{
      backgroundImage: `url(${bgUrl})`,
    }}
  >
    <Story />
  </div>
);

/**
 * Sample data for stories
 */
const sampleData = {
  basic: 'Example text',
  longText: 'Lorem ipsum dolor sit amet...'.repeat(20),
};

// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# Button Component
        
## Overview
The Button component is a versatile interactive element used to trigger actions throughout the application. It supports multiple variants, sizes, states, and can include icons. Buttons are essential for user interactions and provide clear visual feedback for clickable actions.

## Features
- Multiple color variants (primary, secondary, success, etc.)
- Different sizes (sm, md, lg)
- Support for icons and icon-only buttons
- Loading states with optional loading text
- Disabled, active, and selected states
- Full-width and block-level options
- Glass morphism effect support
- Rounded (pill-shaped) style option

## Accessibility
- Keyboard support: Space and Enter keys activate the button
- Screen reader: Proper labeling and role attributes
- ARIA support: Correct roles and states for interactive elements
- Focus management: Visual focus indicator for keyboard navigation

## Usage Examples
### Basic Usage
\`\`\`tsx
<Button label="Click Me" variant="primary" />
\`\`\`

### With Icon
\`\`\`tsx
<Button label="Add Item" variant="primary" icon={<PlusIcon />} />
\`\`\`

### Loading State
\`\`\`tsx
<Button label="Saving..." variant="primary" loading />
\`\`\`

## API Reference
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Visual style variant |
| size | string | 'md' | Size of the button (sm, md, lg) |
| disabled | boolean | false | Disables button interaction |
| icon | ReactNode | - | Icon element to display in the button |
| iconOnly | boolean | false | Renders only the icon without text |
| rounded | boolean | false | Makes the button fully rounded (pill-shaped) |
| glass | boolean or GlassConfig | false | Enables glass morphism effect |
| loading | boolean | false | Shows loading spinner and disables interaction |
| loadingText | string | - | Custom text to display during loading |
| fullWidth | boolean | false | Makes button take full container width |
| block | boolean | false | Makes button a block-level element |
| active | boolean | false | Applies active state styling |
| selected | boolean | false | Applies selected state styling |
| iconPosition | 'start' or 'end' | 'start' | Position of the icon relative to text |

## Design Tokens
- \`--atomix-btn-padding\`: Padding around button content
- \`--atomix-btn-font-size\`: Font size of button text
- \`--atomix-btn-border-radius\`: Border radius of button
- \`--atomix-btn-transition\`: Transition effect for button states
- \`--atomix-btn-bg\`: Background color of button
- \`--atomix-btn-color\`: Text color of button
- \`--atomix-btn-shadow\`: Shadow of button

## Notes
Buttons are essential for user interactions and should be used consistently throughout the application to maintain a cohesive experience. Consider the context and purpose when choosing the appropriate variant and size.
        `,
      },
    },
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
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'object',
      description: 'Optional icon element to display in the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button should only display an icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the button should have a fully rounded (pill) shape',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    glass: {
      control: 'object',
      description: 'Apply glass morphism effect to the button',
      table: {
        type: { summary: 'boolean | GlassConfig' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Custom text to display during loading',
      table: {
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    block: {
      control: 'boolean',
      description: 'Whether the button should be block-level',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: 'boolean',
      description: 'Whether the button is in active state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the button is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Position of the icon',
      table: {
        type: { summary: '"start" | "end"' },
        defaultValue: { summary: 'start' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: '(event: React.MouseEvent) => void' },
      },
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

// ============================================================================
// BASIC USAGE STORIES
// ============================================================================

/**
 * Basic button usage with minimal props
 */
export const BasicUsage: Story = {
  args: {
    label: 'Basic Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Button with all available props configured
 */
export const WithAllProps: Story = {
  args: {
    label: 'Complete Button',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
    iconPosition: 'start',
    rounded: true,
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Button with all props configured.',
      },
    },
  },
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

/**
 * Shows all available button color variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      {THEME_COLORS.map(color => (
        <Button key={color} label={color} variant={color as any} />
      ))}
    </div>
  ),
};

/**
 * Shows all available outline button variants
 */
export const AllOutlineVariants: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Button label="Outline Primary" variant="outline-primary" />
      <Button label="Outline Secondary" variant="outline-secondary" />
      <Button label="Outline Success" variant="outline-success" />
      <Button label="Outline Info" variant="outline-info" />
      <Button label="Outline Warning" variant="outline-warning" />
      <Button label="Outline Danger" variant="outline-danger" />
      <Button label="Outline Light" variant="outline-light" />
      <Button label="Outline Dark" variant="outline-dark" />
    </div>
  ),
};

/**
 * Shows all available button sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="u-flex u-items-center u-gap-2">
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </div>
  ),
};

/**
 * Shows default state of the button (normal, interactive state)
 */
export const DefaultState: Story = {
  args: {
    label: 'Default Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Shows button in loading state with spinner
 */
export const LoadingState: Story = {
  args: {
    label: 'Loading...',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
};

/**
 * Shows button in disabled state (non-interactive)
 */
export const DisabledState: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

/**
 * Shows button in active state
 */
export const ActiveState: Story = {
  args: {
    label: 'Active Button',
    variant: 'primary',
    size: 'md',
    active: true,
  },
};

/**
 * Shows button in selected state
 */
export const SelectedState: Story = {
  args: {
    label: 'Selected Button',
    variant: 'primary',
    size: 'md',
    selected: true,
  },
};

// ============================================================================
// WITH FEATURES STORIES
// ============================================================================

/**
 * Shows button with icon support
 */
export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
  },
};

/**
 * Shows icon positioned at start and end of button
 */
export const WithIconPosition: Story = {
  render: () => (
    <div className="u-flex u-gap-2">
      <Button label="Icon Start" variant="primary" icon={<Icon />} iconPosition="start" />
      <Button label="Icon End" variant="secondary" icon={<Icon />} iconPosition="end" />
    </div>
  ),
};

/**
 * Shows button with icon only (no text)
 */
export const WithIconOnly: Story = {
  args: {
    label: 'Icon Only Button',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
    iconOnly: true,
  },
};

/**
 * Shows complex nested content in button
 */
export const WithChildren: Story = {
  render: () => (
    <Button variant="primary">
      Button with <strong>Complex Content</strong>
    </Button>
  ),
};

/**
 * Shows button with helper text or description
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-2">
      <Button label="Button with Helper" variant="primary" />
      <p className="u-m-0 u-text-sm">This is a helper text for the button</p>
    </div>
  ),
};

// ============================================================================
// ADVANCED CONFIGURATION STORIES
// ============================================================================

/**
 * Shows button with custom inline styles
 */
export const CustomStyling: Story = {
  args: {
    label: 'Custom Styled Button',
    variant: 'primary',
    size: 'md',
  },
  render: args => (
    <Button
      {...args}
      style={{
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        border: 'none',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    />
  ),
};

/**
 * Shows button with custom CSS class
 */
export const WithClassName: Story = {
  args: {
    label: 'Styled with Class',
    variant: 'primary',
    size: 'md',
    className: 'custom-button-style',
  },
};

/**
 * Shows button with additional HTML attributes
 */
export const WithAttributes: Story = {
  args: {
    label: 'Button with Attributes',
    variant: 'primary',
    size: 'md',
    id: 'my-button',
    'aria-label': 'My custom button',
    'data-testid': 'test-button',
  },
};

// ============================================================================
// EDGE CASES STORIES
// ============================================================================

/**
 * Shows how button handles very long text
 */
export const LongText: Story = {
  args: {
    label: 'Very long text that might overflow or wrap to multiple lines in the button component',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Shows button behavior when icon is missing
 */
export const NoIconFallback: Story = {
  args: {
    label: 'Button without Icon',
    variant: 'primary',
    size: 'md',
    // Intentionally not providing icon prop to show fallback
  },
};

/**
 * Shows button with async callback handling
 */
export const WithAsyncAction: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
      setIsLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    }, []);

    return (
      <Button label="Async Action" variant="primary" loading={isLoading} onClick={handleClick} />
    );
  },
};

// ============================================================================
// INTEGRATION EXAMPLES STORIES
// ============================================================================

/**
 * Button used in a form context
 */
export const InForm: Story = {
  render: () => (
    <form className="u-flex u-flex-column u-gap-2">
      <input type="text" placeholder="Enter name" className="u-p-2 u-mb-2 u-border u-rounded" />
      <Button label="Submit Form" variant="primary" />
    </form>
  ),
};

/**
 * Button used in a card component
 */
export const InCard: Story = {
  render: () => (
    <div className="u-p-4 u-bg-white u-rounded-lg u-shadow u-w-64">
      <h3 className="u-mt-0 u-mb-2">Sample Card</h3>
      <p className="u-mb-2">Card content goes here...</p>
      <div className="u-mt-2">
        <Button label="Learn More" variant="primary" size="sm" />
      </div>
    </div>
  ),
};

/**
 * Button used in a modal context
 */
export const InModal: Story = {
  render: () => (
    <div className="u-relative">
      <div className="u-p-6 u-bg-white u-rounded-lg u-shadow-lg u-w-96">
        <h3 className="u-mt-0 u-mb-2">Confirmation</h3>
        <p className="u-mb-4">Are you sure you want to proceed?</p>
        <div className="u-flex u-justify-end u-gap-2 u-mt-4">
          <Button label="Cancel" variant="secondary" />
          <Button label="Confirm" variant="primary" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Button composed with other components
 */
export const WithOtherComponents: Story = {
  render: () => (
    <div className="u-flex u-items-center u-gap-2">
      <Button label="Previous" variant="secondary" />
      <span className="u-text-sm">Page 1 of 10</span>
      <Button label="Next" variant="primary" />
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

/**
 * Shows proper ARIA labels for accessibility
 */
export const WithAriaLabels: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-2">
      <Button label="Save" variant="primary" aria-label="Save document" />
      <Button label="Delete" variant="error" aria-label="Delete item permanently" />
    </div>
  ),
};

/**
 * Shows button with keyboard navigation support
 */
export const WithKeyboardNavigation: Story = {
  render: () => (
    <div className="u-flex u-gap-2">
      <Button label="Button 1" variant="primary" tabIndex={0} />
      <Button label="Button 2" variant="secondary" tabIndex={0} />
      <Button label="Button 3" variant="success" tabIndex={0} />
    </div>
  ),
};

/**
 * Shows button with screen reader announcements
 */
export const WithScreenReader: Story = {
  render: () => (
    <div className="u-flex u-gap-2">
      <Button label="Announcement" variant="primary" aria-describedby="announcement-description" />
      <div id="announcement-description" className="u-sr-only">
        This button triggers an announcement
      </div>
    </div>
  ),
};

/**
 * Shows button in high contrast theme
 */
export const HighContrastMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#000', padding: '1rem' }}>
      <Button label="High Contrast Button" variant="light" />
    </div>
  ),
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

/**
 * Shows mobile-optimized button configuration
 */
export const OptimizedForMobile: Story = {
  args: {
    label: 'Touch-Friendly',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Shows multiple button instances together
 */
export const WithManyInstances: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      {Array.from({ length: 15 }).map((_, i) => (
        <Button key={i} label={`Button ${i + 1}`} variant="primary" size="sm" />
      ))}
    </div>
  ),
};

// ============================================================================
// GLASS EFFECT STORIES
// ============================================================================

/**
 * Shows button with glass effect enabled
 */
export const WithGlassEffect: Story = {
  render: () => (
    <div
      className="u-bg-cover u-bg-center u-p-10 u-rounded-xl"
      style={{
        backgroundImage:
          'url(https://cdn.pixabay.com/photo/2022/10/02/17/23/mushroom-7494046_1280.jpg)',
      }}
    >
      <div className="u-flex u-flex-wrap u-gap-2">
        {THEME_COLORS.map(color => (
          <Button key={color} label={color} variant={color as any} glass={true} />
        ))}
      </div>
    </div>
  ),
};

/**
 * Shows button with custom glass settings
 */
export const WithCustomGlassSettings: Story = {
  args: {
    label: 'Custom Glass',
    variant: 'primary',
    size: 'md',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 1,
      cornerRadius: 16,
      mode: 'polar',
    },
  },
  decorators: [
    withBackground('https://cdn.pixabay.com/photo/2021/06/14/22/46/milky-way-6337038_1280.jpg'),
  ],
};
