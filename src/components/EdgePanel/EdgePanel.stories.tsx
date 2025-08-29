import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { EdgePanel } from './EdgePanel';

const meta = {
  title: 'Components/EdgePanel',
  component: EdgePanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'EdgePanel is a versatile sliding panel that can appear from any edge of the screen. Commonly used for mobile navigation, filters, chat windows, or contextual actions.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the edge panel',
    },
    mode: {
      control: { type: 'select' },
      options: ['slide', 'push', 'none'],
      description: 'Animation mode of the panel',
    },
    backdrop: {
      control: 'boolean',
      description: 'Show backdrop behind the panel',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close the panel when clicking on backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close the panel when pressing Escape key',
    },
    title: {
      control: 'text',
      description: 'Panel title',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open (controlled component)',
    },
  },
  decorators: [
    Story => (
      <div style={{ height: '400px', width: '100%', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EdgePanel>;

export default meta;
type Story = StoryObj<typeof EdgePanel>;

// Placeholder for demonstration content
const DemoPanelContent = ({
  position,
  mode,
  backdrop,
  closeOnBackdropClick,
  closeOnEscape,
}: any) => (
  <>
    <p className="u-mb-3">
      This is an Edge Panel that slides in from the <strong>{position}</strong> edge.
    </p>

    <div
      className="u-mb-3 u-p-3"
      style={{ background: 'var(--at-secondary-bg-subtle)', borderRadius: '8px' }}
    >
      <h5 className="u-mb-2">Configuration</h5>
      <ul className="u-list-none u-pl-0 u-mb-0">
        <li className="u-mb-1">
          <strong>Position:</strong> {position}
        </li>
        <li className="u-mb-1">
          <strong>Mode:</strong> {mode}
        </li>
        <li className="u-mb-1">
          <strong>Backdrop:</strong> {backdrop ? 'Visible' : 'Hidden'}
        </li>
        <li className="u-mb-1">
          <strong>Close on backdrop:</strong> {closeOnBackdropClick ? 'Yes' : 'No'}
        </li>
        <li>
          <strong>Close on ESC key:</strong> {closeOnEscape ? 'Yes' : 'No'}
        </li>
      </ul>
    </div>

    <p className="u-mb-3">Common uses include:</p>
    <ul>
      <li>
        <strong>Start:</strong> Navigation menu, filters
      </li>
      <li>
        <strong>End:</strong> Notifications, chat windows
      </li>
      <li>
        <strong>Top:</strong> Alerts, confirmation messages
      </li>
      <li>
        <strong>Bottom:</strong> Action sheets, mobile keyboards
      </li>
    </ul>
  </>
);

// Controller component to demonstrate the EdgePanel
const EdgePanelController = ({
  position,
  mode,
  backdrop,
  closeOnBackdropClick,
  closeOnEscape,
  title,
}: any) => {
  const [open, setOpen] = useState(false);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('is-edgepanel-open');
    };
  }, []);

  return (
    <div>
      <Button label={`Open ${position} panel`} variant="primary" onClick={() => setOpen(true)} />

      <EdgePanel
        position={position}
        mode={mode}
        backdrop={backdrop}
        closeOnBackdropClick={closeOnBackdropClick}
        closeOnEscape={closeOnEscape}
        isOpen={open}
        onOpenChange={isOpen => setOpen(isOpen)}
        title={title || `Edge Panel (${position})`}
      >
        <DemoPanelContent
          position={position}
          mode={mode}
          backdrop={backdrop}
          closeOnBackdropClick={closeOnBackdropClick}
          closeOnEscape={closeOnEscape}
        />
      </EdgePanel>
    </div>
  );
};

// Position Variants
export const Start: Story = {
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const End: Story = {
  render: () => (
    <EdgePanelController
      position="end"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const Top: Story = {
  render: () => (
    <EdgePanelController
      position="top"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const Bottom: Story = {
  render: () => (
    <EdgePanelController
      position="bottom"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Mode Variants
export const PushMode: Story = {
  parameters: {
    docs: { description: { story: 'Push mode moves page content when the panel opens.' } },
  },
  render: () => (
    <EdgePanelController
      position="start"
      mode="push"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

export const NoneMode: Story = {
  parameters: { docs: { description: { story: 'None mode disables animation completely.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="none"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Backdrop Variants
export const NoBackdrop: Story = {
  parameters: { docs: { description: { story: 'Panel without backdrop overlay.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={false}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    />
  ),
};

// Feature Examples
export const MobileNavigation: Story = {
  parameters: { docs: { description: { story: 'Example of a mobile navigation menu.' } } },
  render: () => (
    <EdgePanelController
      position="start"
      mode="slide"
      backdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      title="Navigation"
    />
  ),
};
