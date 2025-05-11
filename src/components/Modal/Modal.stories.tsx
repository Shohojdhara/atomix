import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    onClose: { action: 'onClose' },
    onOpen: { action: 'onOpen' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Basic modal example with a button to trigger opening.
 */
export const Basic: Story = {
  render: (args) => {
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, odio vitae faucibus luctus, elit nisi tincidunt justo, in malesuada enim nisl eget nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        </Modal>
      </>
    );
  }
};

/**
 * Modal with a title, subtitle, and footer actions.
 */
export const WithFooter: Story = {
  render: (args) => {
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
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block', marginRight: '8px' }}
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
  }
};

/**
 * Small size modal variant.
 */
export const Small: Story = {
  render: (args) => {
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
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block', marginRight: '8px' }}
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
          <img src="https://unsplash.it/g/400/200" alt="Example image" style={{ maxWidth: '100%' }} />
        </Modal>
      </>
    );
  }
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
                style={{ cursor: 'pointer', padding: '8px 16px', display: 'inline-block', marginRight: '8px' }}
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
  }
}; 