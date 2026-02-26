import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import type { AtomixGlassProps } from '../../lib/types/components';
import { Modal } from './Modal';

// Helper type for glass props in stories (without children requirement)
type GlassProps = boolean | Omit<AtomixGlassProps, 'children'>;

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Modal

## Overview

Modal displays content in a focused overlay dialog. It provides a way to present important information or actions that require user attention. Modals support various sizes, can include headers and footers, and support glass morphism effects.

## Features

- Multiple size options (sm, md, lg, xl)
- Backdrop click to close
- Keyboard (Escape) to close
- Close button visibility control
- Glass morphism effect
- Header and footer sections
- Accessible design
- Responsive behavior
- **Compound Component Pattern** (new)

## Accessibility

- Keyboard support: Close with Escape key, tab navigation within modal
- Screen reader: Modal content and purpose announced properly
- ARIA support: Proper roles and properties for modal dialogs
- Focus management: Traps focus within the modal during open state

## Usage Examples

### Basic Usage

\`\`\`tsx
<Modal 
  isOpen={isOpen} 
  onOpenChange={setIsOpen} 
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
\`\`\`

### Compound Component Usage

\`\`\`tsx
<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  <Modal.Header closeButton title="Custom Header" />
  <Modal.Body>
    <p>Flexible body content</p>
  </Modal.Body>
  <Modal.Footer>
    <button>Action</button>
  </Modal.Footer>
</Modal>
\`\`\`

### With Glass Effect

\`\`\`tsx
<Modal 
  isOpen={isOpen} 
  onOpenChange={setIsOpen} 
  title="Modal Title"
  glass={true}
>
  <p>Modal content goes here</p>
</Modal>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| size | 'sm' \\| 'md' \\| 'lg' \\| 'xl' | 'md' | Size of the modal |
| backdrop | boolean | true | Whether clicking the backdrop closes the modal |
| keyboard | boolean | true | Whether pressing Escape key closes the modal |
| closeButton | boolean | true | Whether to show the close button |
| glass | boolean \\| GlassProps | false | Enable glass morphism effect |
| title | string | - | Title of the modal |
| subtitle | string | - | Subtitle of the modal |
| isOpen | boolean | false | Whether the modal is open |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
| children | ReactNode | - | Content of the modal |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the modal',
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: 'md' },
      },
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    keyboard: {
      control: 'boolean',
      description: 'Whether pressing Escape key closes the modal',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean | GlassProps' },
        defaultValue: { summary: false },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the modal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle of the modal',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onOpenChange: {
      action: 'open state changed',
      description: 'Callback when open state changes',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Title"
          subtitle="This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal."
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae
            faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas.
          </p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic modal example with a button to trigger opening.',
      },
    },
  },
};

export const WithFooter: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Modal with Footer
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Modal with Footer"
          subtitle="This modal includes footer actions for user interaction."
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae
            faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas.
          </p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with a title, subtitle, and footer actions.',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Glass Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Glass Modal"
          subtitle="This modal has a glass morphism effect applied."
          glass={true}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae
            faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas.
          </p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with glass morphism effect applied.',
      },
    },
  },
};

export const CompoundUsage: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Compound Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <Modal.Header
            title="Compound Component Pattern"
            subtitle="Fully customizable header"
            closeButton
          />
          <Modal.Body>
            <p>
              This modal uses the Compound Component pattern (Modal.Header, Modal.Body, Modal.Footer).
              This allows for greater flexibility in content arrangement.
            </p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              Custom content structure inside Body
            </div>
          </Modal.Body>
          <Modal.Footer>
             <button className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)}>Custom Footer Button</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the Compound Component usage pattern.',
      },
    },
  },
};

/**
 * Small size modal variant.
 */
export const Small: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Small Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Small Modal"
          subtitle="This is some description text."
          size="sm"
          footer={
            <>
              <div
                className="c-btn c-btn--outline-secondary"
                onClick={() => setIsOpen(false)}
                style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              >
                Cancel
              </div>
              <div
                className="c-btn c-btn--primary"
                onClick={() => setIsOpen(false)}
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
              >
                OK
              </div>
            </>
          }
        >
          <img
            src="https://unsplash.it/g/400/200"
            alt="Example image"
            style={{ maxWidth: '100%' }}
          />
        </Modal>
      </>
    );
  },
};

/**
 * Different size variants of the modal component.
 */
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="u-flex u-flex-column u-gap-4">
        <div className="u-flex u-gap-4">
          <div
            className={`c-btn ${size === 'sm' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('sm');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Small Modal
          </div>

          <div
            className={`c-btn ${size === 'md' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('md');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Medium Modal
          </div>

          <div
            className={`c-btn ${size === 'lg' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('lg');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Large Modal
          </div>

          <div
            className={`c-btn ${size === 'xl' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('xl');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Extra Large Modal
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title={`${size.toUpperCase()} Modal`}
          subtitle="This modal demonstrates different size variants."
          size={size}
          footer={
            <>
              <div
                className="c-btn c-btn--outline-secondary"
                onClick={() => setIsOpen(false)}
                style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              >
                Button
              </div>
              <div
                className="c-btn c-btn--primary"
                onClick={() => setIsOpen(false)}
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
              >
                Button
              </div>
            </>
          }
        >
          <p>This is a {size.toUpperCase()} sized modal.</p>
          <p>Modal sizes can be adjusted based on the content needs.</p>
        </Modal>
      </div>
    );
  },
};

/**
 * Glass morphism modal example.
 */
export const GlassModal: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Glass Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Glass Modal"
          subtitle="This modal features a beautiful glass morphism effect."
          glass={true}
        >
          <p>
            This modal demonstrates the glass morphism effect with a translucent, frosted
            appearance. The glass effect creates a modern, elegant look that works well over
            colorful backgrounds.
          </p>
          <img src="https://picsum.photos/800/410" alt="desert" style={{ maxWidth: '100%' }} />
          <p>
            The glass effect includes displacement, blur, and chromatic aberration for a premium
            feel.
          </p>
        </Modal>
      </>
    );
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'url(https://picsum.photos/1920/1080)',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass modal with custom settings.
 */
export const GlassModalCustom: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div
          className="c-btn c-btn--primary"
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
        >
          Open Custom Glass Modal
        </div>

        <Modal
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Custom Glass Modal"
          subtitle="This modal has customized glass effect settings."
          glass={
            {
              displacementScale: 120,
              blurAmount: 3,
              saturation: 200,
              aberrationIntensity: 2,
              borderRadius: 20,
              mode: 'polar',
            } as GlassProps
          }
          footer={
            <>
              <div className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </div>
              <div className="c-btn c-btn--primary" onClick={() => setIsOpen(false)}>
                Confirm
              </div>
            </>
          }
        >
          <p>
            This modal uses custom glass settings with enhanced displacement, blur, and chromatic
            aberration. The polar mode creates a different visual effect compared to the standard
            shader mode.
          </p>
          <img src="https://picsum.photos/800/410" alt="desert" style={{ maxWidth: '100%' }} />
        </Modal>
      </>
    );
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'url(https://picsum.photos/1920/1080)',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass modal with different sizes.
 */
export const GlassModalSizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="u-flex u-flex-column u-gap-4">
        <div className="u-flex u-gap-4">
          <div
            className={`c-btn ${size === 'sm' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('sm');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Small Glass Modal
          </div>

          <div
            className={`c-btn ${size === 'md' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('md');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Medium Glass Modal
          </div>

          <div
            className={`c-btn ${size === 'lg' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('lg');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Large Glass Modal
          </div>

          <div
            className={`c-btn ${size === 'xl' ? 'c-btn--primary' : 'c-btn--secondary'}`}
            onClick={() => {
              setSize('xl');
              setIsOpen(true);
            }}
            style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
          >
            Extra Large Glass Modal
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title={`${size.toUpperCase()} Glass Modal`}
          subtitle="This modal demonstrates glass effect with different sizes."
          size={size}
          glass={true}
          footer={
            <>
              <div className="c-btn c-btn--outline-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </div>
              <div className="c-btn c-btn--primary" onClick={() => setIsOpen(false)}>
                Confirm
              </div>
            </>
          }
        >
          <p>This is a {size.toUpperCase()} sized glass modal.</p>
          <p>
            The glass effect adapts to different modal sizes while maintaining its visual appeal.
          </p>
          <p>
            The glass effect enhances the modal's appearance, making it visually appealing and
            easier to read.
          </p>
        </Modal>
      </div>
    );
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'url(https://picsum.photos/1920/1080)',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
