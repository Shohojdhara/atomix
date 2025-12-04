import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the modal',
      defaultValue: 'md',
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
      defaultValue: true,
    },
    keyboard: {
      control: 'boolean',
      description: 'Whether pressing Escape key closes the modal',
      defaultValue: true,
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
      defaultValue: true,
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Basic modal example with a button to trigger opening.
 */
export const Basic: Story = {
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
};

/**
 * Modal with a title, subtitle, and footer actions.
 */
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
          subtitle="This is some description text. This text is only a placeholder and should be replaced with the actual content of the modal."
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
                onClick={() => {
                  alert('Action confirmed!');
                  setIsOpen(false);
                }}
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block' }}
              >
                Confirm
              </div>
            </>
          }
        >
          <p>This modal has a title, subtitle, and footer with action buttons.</p>
          <p>The footer is ideal for placing action buttons or other controls.</p>
        </Modal>
      </>
    );
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
      <div className="u-d-flex u-flex-column u-gap-4">
        <div className="u-d-flex u-gap-4">
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
              cornerRadius: 20,
              mode: 'polar',
            } as any
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
      <div className="u-d-flex u-flex-column u-gap-4">
        <div className="u-d-flex u-gap-4">
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
            The glass effect enhances the modal's appearance, making it visually appealing and  easier to read.
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
