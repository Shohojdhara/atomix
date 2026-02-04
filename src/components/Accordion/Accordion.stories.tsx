import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Accordion } from './Accordion'; 
import { ACCORDION } from '../../lib/constants/components';
import type { AtomixGlassProps } from '../../lib/types/components';

// Helper type for glass props in stories (without children requirement)
type GlassProps = boolean | Omit<AtomixGlassProps, 'children'>;

// Extract class names without the leading dots
const ACCORDION_CLASS = ACCORDION.SELECTORS.ACCORDION.replace('.', '');
const HEADER_CLASS = ACCORDION.SELECTORS.HEADER.replace('.', '');
const PANEL_CLASS = ACCORDION.SELECTORS.PANEL.replace('.', '');
const BODY_CLASS = ACCORDION.SELECTORS.BODY.replace('.', '');
const IS_OPEN_CLASS = ACCORDION.CLASSES.IS_OPEN;
const IS_DISABLED_CLASS = ACCORDION.CLASSES.IS_DISABLED;

// ============================================================================
// SHARED UTILITIES & CONSTANTS
// ============================================================================

const mockHandlers = {
  onOpenChange: fn(() => {}),
  onOpen: fn(() => {}),
  onClose: fn(() => {}),
};

// Sample content for stories
const sampleContent = (
  <div>
    <p>
      This accordion contains rich HTML content including headings, paragraphs, and lists.
    </p>
    <ul>
      <li>
        List item with <a href="#">link</a>
      </li>
      <li>
        List item with <strong>bold text</strong>
      </li>
      <li>
        List item with <em>italic text</em>
      </li>
    </ul>
    <div className="u-p-3 u-mt-3 u-bg-light u-border-radius-1">
      <code>This is a code block inside the accordion</code>
    </div>
  </div>
);

// Component documentation
const accordionDocumentation = `
# Accordion

## Overview

The Accordion component provides an expandable/collapsible container for content. It follows Atomix guidelines for accessibility, styling, and state management. The component supports both controlled and uncontrolled modes, custom icons, and full keyboard navigation.

## Features

- Accessible with proper ARIA attributes
- Supports controlled and uncontrolled states
- Customizable icons and positioning
- Glass morphism effect support
- Keyboard navigation support
- Disabled state handling

## Accessibility

- Keyboard support: Space/Enter to toggle accordion
- Screen reader: Proper ARIA labels and roles
- ARIA support: aria-expanded, aria-controls, aria-disabled
- Focus management: Maintains focus within component

## Usage Examples

### Basic Usage

\`\`\`tsx
<Accordion title="Section Title">
  <p>Content goes here</p>
</Accordion>
\`\`\`

### With Custom Icon

\`\`\`tsx
<Accordion 
  title="Custom Icon" 
  icon={<CustomIcon />}
>
  <p>Content with custom icon</p>
</Accordion>
\`\`\`

### Controlled State

\`\`\`tsx
<Accordion 
  title="Controlled Accordion" 
  isOpen={isOpen}
  onOpenChange={setIsOpen}
>
  <p>Controlled content</p>
</Accordion>
\`\`\`

## API Reference

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | string | - | Title of the accordion |
| children | ReactNode | - | Content to be shown when accordion is expanded |
| defaultOpen | boolean | false | Whether the accordion is initially open |
| iconPosition | 'right' \| 'left' | 'right' | Position of the icon |
| icon | ReactNode | - | Custom icon for the accordion |
| isOpen | boolean | - | Whether the accordion is open (controlled) |
| disabled | boolean | false | Whether the accordion is disabled |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
| glass | AtomixGlassProps \| boolean | - | Glass morphism effect configuration |

## Design Tokens

Used design tokens:

- \`--atomix-accordion-padding\`: Padding of the accordion
- \`--atomix-accordion-border\`: Border of the accordion
- \`--atomix-accordion-background\`: Background of the accordion

## Notes

The Accordion component supports both controlled and uncontrolled usage patterns. Use [defaultOpen] for uncontrolled behavior and [isOpen]/[onOpenChange] for controlled behavior.
`;

// ============================================================================
// META CONFIGURATION
// ============================================================================

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: accordionDocumentation,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconPosition: {
      control: { type: 'radio' },
      options: ['right', 'left'],
      description: 'Position of the icon',
      table: {
        type: { summary: 'IconPosition' },
        defaultValue: { summary: 'right' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the accordion is initially open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the accordion',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Content inside the accordion',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    glass: {
      control: 'object',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'AtomixGlassProps | boolean' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state of the accordion',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when the open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback when accordion opens',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when accordion closes',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// BASIC USAGE STORIES
// ============================================================================

export const BasicUsage: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>This is the content of the accordion that appears when expanded.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the Accordion component with minimal props.',
      },
    },
  },
};

export const WithAllProps: Story = {
  args: {
    title: 'Fully Configured Accordion',
    children: sampleContent,
    defaultOpen: true,
    iconPosition: 'left',
    disabled: false,
    onOpenChange: mockHandlers.onOpenChange,
    onOpen: mockHandlers.onOpen,
    onClose: mockHandlers.onClose,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with all major props configured.',
      },
    },
  },
};

// ============================================================================
// VARIANTS & STATES STORIES
// ============================================================================

export const DefaultState: Story = {
  args: {
    title: 'Default Accordion',
    children: <p>This is the default state of the accordion.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion in its default, closed state.',
      },
    },
  },
};

export const OpenState: Story = {
  args: {
    title: 'Open Accordion',
    children: <p>This accordion is open, showing its content.</p>,
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion in the open state by default.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    title: 'Disabled Accordion',
    children: <p>This accordion is disabled and cannot be interacted with.</p>,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion in the disabled state, non-interactive.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Content',
    children: (
      <div>
        <p>Loading content...</p>
        <div className="c-spinner c-spinner--sm">Loading...</div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion showing loading state with spinner.',
      },
    },
  },
};

// ============================================================================
// ICON CONFIGURATIONS
// ============================================================================

export const WithIconLeft: Story = {
  args: {
    title: 'Icon on Left',
    children: <p>This accordion has the icon positioned on the left side.</p>,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with icon positioned on the left side.',
      },
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Custom Icon',
    children: <p>This accordion uses a custom plus icon.</p>,
    icon: (
      <i className="c-accordion__icon">
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </i>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with a custom icon instead of the default chevron.',
      },
    },
  },
};

// ============================================================================
// ADVANCED CONFIGURATIONS
// ============================================================================

export const ControlledState: Story = {
  args: {
    title: 'Controlled Accordion',
    children: <p>This accordion is controlled by external state.</p>,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button 
          className="c-btn c-btn--primary u-mb-3" 
          onClick={() => setOpen(prev => !prev)}
        >
          Toggle Accordion (Controlled)
        </button>
        <Accordion 
          {...args} 
          isOpen={open} 
          onOpenChange={setOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates a controlled Accordion using the `isOpen` and `onOpenChange` props.',
      },
    },
  },
};

export const WithRichContent: Story = {
  args: {
    title: 'Rich Content',
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion containing rich HTML content with headings, paragraphs, and lists.',
      },
    },
  },
};

// ============================================================================
// INTEGRATION EXAMPLES
// ============================================================================

export const AccordionGroup: Story = {
  args: {
    title: 'Accordion Group',
    children: <p>Group example - see render function</p>,
  },
  render: () => (
    <div>
      <h2>Accordion Group</h2>
      <div className="u-flex u-flex-col u-gap-3 u-w-md">
        <Accordion title="First Accordion" defaultOpen={true}>
          <p>Content of the first accordion.</p>
        </Accordion>

        <Accordion title="Second Accordion">
          <p>Content of the second accordion.</p>
        </Accordion>

        <Accordion title="Third Accordion">
          <p>Content of the third accordion with more content.</p>
          <p>Additional paragraph to demonstrate scrolling.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple accordions grouped together in a vertical layout.',
      },
    },
  },
};

// ============================================================================
// GLASS EFFECT STORIES
// ============================================================================

export const GlassEffect: Story = {
  args: {
    title: 'Glass Accordion',
    children: <p>This accordion has a glass morphism effect applied.</p>,
    glass: true,
  },
  render: (args) => (
    <div className="u-bg-cover u-bg-center u-p-8 u-rounded-xl u-min-h-97vh u-flex u-items-center u-justify-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1759915995309-404c743bfbf9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
      <div className="u-w-full u-max-w-md">
        <Accordion {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates an Accordion with glass morphism effect enabled against a gradient background.',
      },
    },
  },
};

export const GlassCustom: Story = {
  args: {
    title: 'Custom Glass Accordion',
    children: <p>This accordion has custom glass morphism settings.</p>,
    glass: {
      displacementScale: 180,
      blurAmount: 3,
      saturation: 60,
      mode: 'polar',
    } as GlassProps,
  },
  render: (args) => (
    <div className="u-bg-cover u-bg-center u-p-8 u-rounded-xl u-min-h-97vh u-flex u-items-center u-justify-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1754147965582-edcb63324a81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: '120%', animation: 'gradient 15s ease infinite'}}>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            20% { background-position: 70% 50%; }
            40% { background-position: 0% 50%; }
            50% { background-position: 50% 0%; }
            75% { background-position: 50% 50%; }
            100% { background-position: 50% 0%; }
          }
        `}
      </style>
      <div className="u-w-full u-max-w-md">
        <Accordion {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates an Accordion with custom glass morphism settings against a scenic background image.',
      },
    },
  },
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const WithAriaLabels: Story = {
  args: {
    title: 'Accessible Accordion',
    children: <p>This accordion includes proper ARIA labels for screen readers.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with proper ARIA attributes for screen reader accessibility.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  args: {
    title: 'Keyboard Accessible',
    children: (
      <p>
        This accordion is fully operable via keyboard navigation. Press Tab to focus and Enter/Space to toggle.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation support for the accordion component.',
      },
    },
  },
};