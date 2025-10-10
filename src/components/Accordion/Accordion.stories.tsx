import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { ACCORDION } from '../../lib/constants/components';
import type { AtomixGlassProps } from '../../lib/types/components';
import { ShaderVariantsShowcase } from '../AtomixGlass/AtomixGlass.stories';

// Extract class names without the leading dots
const ACCORDION_CLASS = ACCORDION.SELECTORS.ACCORDION.replace('.', '');
const HEADER_CLASS = ACCORDION.SELECTORS.HEADER.replace('.', '');
const PANEL_CLASS = ACCORDION.SELECTORS.PANEL.replace('.', '');
const BODY_CLASS = ACCORDION.SELECTORS.BODY.replace('.', '');
const IS_OPEN_CLASS = ACCORDION.CLASSES.IS_OPEN;
const IS_DISABLED_CLASS = ACCORDION.CLASSES.IS_DISABLED;

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Accordion component follows Atomix guidelines for accessibility, styling, and state. It supports both controlled and uncontrolled modes, custom icons, and full keyboard navigation.',
      },
    },
  },
  argTypes: {
    iconPosition: {
      control: { type: 'radio' },
      options: ['right', 'left'],
      description: 'Position of the icon',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the accordion is initially open',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    title: {
      control: 'text',
      description: 'Title of the accordion',
    },
    children: {
      control: 'text',
      description: 'Content inside the accordion',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Accordion (Closed)
export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <p>This is the content of the accordion that appears when expanded.</p>,
  },
};

// Open Accordion
export const Open: Story = {
  args: {
    title: 'Open Accordion',
    children: <p>This accordion is open, showing its content.</p>,
    defaultOpen: true,
  },
};

// Disabled Accordion
export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    children: <p>This accordion is disabled.</p>,
    disabled: true,
  },
};

// Icon on Left
export const IconLeft: Story = {
  args: {
    title: 'Icon on Left',
    children: <p>This accordion has the icon on the left side.</p>,
    iconPosition: 'left',
  },
};

// Custom Icon
export const CustomIcon: Story = {
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
};

// Accordion Group
export const AccordionGroup: Story = {
  args: {
    title: 'Accordion Group',
    children: <p>Group example - see render function</p>,
  },
  render: () => (
    <div>
      <h2>Accordion Group</h2>
      <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '500px' }}>
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
};

// All Variants
export const AllVariants: Story = {
  args: {
    title: 'All Variants',
    children: <p>See render function for all variants</p>,
  },
  render: () => (
    <div>
      <h2>All Accordion Variants</h2>
      <div className="u-d-flex u-flex-column u-gap-5">
        <div>
          <h3>Default</h3>
          <Accordion title="Default Accordion">
            <p>This is the default accordion.</p>
          </Accordion>
        </div>

        <div>
          <h3>Initially Open</h3>
          <Accordion title="Initially Open Accordion" defaultOpen={true}>
            <p>This accordion starts in the open state.</p>
          </Accordion>
        </div>

        <div>
          <h3>Disabled</h3>
          <Accordion title="Disabled Accordion" disabled={true}>
            <p>This accordion is disabled and cannot be interacted with.</p>
          </Accordion>
        </div>

        <div>
          <h3>Icon on Left</h3>
          <Accordion title="Icon on Left" iconPosition="left">
            <p>This accordion has its icon positioned on the left.</p>
          </Accordion>
        </div>

        <div>
          <h3>Custom Icon</h3>
          <Accordion
            title="Custom Icon"
            icon={
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
            }
          >
            <p>This accordion uses a custom plus icon.</p>
          </Accordion>
        </div>

        <div>
          <h3>With Rich Content</h3>
          <Accordion title="Rich Content">
            <div>
              <h4>Section Title</h4>
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
          </Accordion>
        </div>
      </div>
    </div>
  ),
};

// Controlled Accordion
export const Controlled: Story = {
  args: {
    title: 'Controlled Accordion',
    children: <p>This accordion is controlled by external state.</p>,
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button className="c-btn c-btn--primary u-mb-3" onClick={() => setOpen(prev => !prev)}>
          Toggle Accordion (Controlled)
        </button>
        <Accordion title="Controlled Accordion" isOpen={open} onOpenChange={setOpen}>
          <p>This accordion is controlled by external state.</p>
        </Accordion>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates a controlled Accordion using the `isOpen` and `onOpenChange` props.',
      },
    },
  },
};

// Glass Variant
export const Glass: Story = {
  args: {
    title: 'Glass Accordion',
    children: <p>This accordion has a glass morphism effect applied.</p>,
    glass: true,
  },
  render: (args) => (
    <div
       style={{
        background: 'url(https://images.unsplash.com/photo-1759915995309-404c743bfbf9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        height: '97vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '500px' }}>
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

// Glass with Custom Settings
export const GlassCustom: Story = {
  args: {
    title: 'Custom Glass Accordion',
    children: <p>This accordion has custom glass morphism settings.</p>,
    glass: {
      displacementScale: 180,
      blurAmount: 3,
      saturation: 60,
      cornerRadius: 4,
      mode: 'polar',
    } as AtomixGlassProps as any,
  },
  render: (args) => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1754147965582-edcb63324a81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '120%',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '97vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'gradient 15s ease infinite',
      }}
    >
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
      <div style={{ width: '100%', maxWidth: '500px' }}>
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

// Glass Accordion Group
export const GlassGroup: Story = {
  args: {
    title: 'Glass Accordion Group',
    children: <p>Group example with glass effect - see render function</p>,
     glass: {
      displacementScale: 180,
      blurAmount: 1,
      saturation: 60,
      cornerRadius: 4,
      mode: 'shader',
      ShaderVariant: 'premiumGlass'
    } as any,
  },
  render: () => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1623237353316-417116e040a5?q=80&w=3307&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '150%',
        animation: 'gradient 15s ease infinite',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '97vh',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        Glass Accordion Group
      </h2>
      <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Accordion title="First Glass Accordion" defaultOpen={true} glass>
          <p>Content of the first glass accordion with beautiful glass morphism effect.</p>
        </Accordion>

        <Accordion title="Second Glass Accordion" glass>
          <p>Content of the second glass accordion showcasing the glass effect.</p>
        </Accordion>

        <Accordion title="Third Glass Accordion" glass>
          <p>Content of the third glass accordion with more content.</p>
          <p>Additional paragraph to demonstrate scrolling and glass effects.</p>
          <ul>
            <li>Glass effect item 1</li>
            <li>Glass effect item 2</li>
            <li>Glass effect item 3</li>
          </ul>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates multiple Accordions with glass morphism effects against an animated gradient background.',
      },
    },
  },
};
