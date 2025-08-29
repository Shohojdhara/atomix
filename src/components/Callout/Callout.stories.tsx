import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Callout components are used to display important messages, notifications, or alerts to users. They can be used to provide feedback, warnings, errors, or general information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      description: 'The color variant of the callout',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the callout',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the callout',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Optional icon to display in the callout',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    oneLine: {
      control: 'boolean',
      description: 'Display the callout in one line',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    toast: {
      control: 'boolean',
      description: 'Display the callout as a toast notification',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    actions: {
      control: false,
      description: 'Optional action buttons to display in the callout',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

// Icon components for different callout types
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 9V13M12 17H12.01M3.98069 8.00001C3.32275 9.15122 3 10.5502 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C10.5502 3 9.15122 3.32275 8.00001 3.98069"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 9V13M12 17H12.01M11.2926 3.05737C11.5093 3.01652 11.7321 3 11.9565 3C16.3908 3 20 6.60914 20 11.0435C20 11.2679 19.9835 11.4907 19.9426 11.7074C19.4862 15.0952 16.5609 17.7241 13 17.9711C12.6712 17.9903 12.3375 18 12 18C7.58172 18 4 14.4183 4 10C4 6.43913 6.62884 3.51375 10.0166 3.05736C10.2333 3.01652 10.4561 3 10.6805 3C10.9049 3 11.1277 3.01652 11.3444 3.05736L11.2926 3.05737Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Basic variants
export const Default: Story = {
  args: {
    title: 'Information',
    children: 'This is a default callout with some information.',
    variant: 'primary',
    icon: <InfoIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default callout with a title, content, and an icon.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    children: 'Your changes have been saved successfully.',
    variant: 'success',
    icon: <SuccessIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use success callouts to confirm that an action was completed successfully.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    children: 'Please review your information before proceeding.',
    variant: 'warning',
    icon: <WarningIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning callouts alert users to potential issues or important information they should be aware of.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    children: 'There was a problem processing your request.',
    variant: 'error',
    icon: <ErrorIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error callouts indicate that something went wrong and requires attention.',
      },
    },
  },
};

// Layout variants
export const WithActions: Story = {
  args: {
    title: 'Update Available',
    children: 'A new version is available. Would you like to update now?',
    variant: 'info',
    icon: <InfoIcon />,
    actions: (
      <>
        <Button label="Update Now" variant="primary" size="sm" />
        <Button label="Later" variant="outline-primary" size="sm" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Callouts can include action buttons to allow users to respond directly to the message.',
      },
    },
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Notification',
    children: 'This is a dismissible callout that can be closed.',
    variant: 'primary',
    icon: <InfoIcon />,
    onClose: () => console.log('Callout closed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dismissible callouts include a close button that allows users to remove the callout from view.',
      },
    },
  },
};

export const OneLine: Story = {
  args: {
    title: 'Quick notification',
    variant: 'info',
    icon: <InfoIcon />,
    oneLine: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'One-line callouts are more compact and display the title and icon in a single line.',
      },
    },
  },
};

export const Toast: Story = {
  args: {
    title: 'Toast Notification',
    children: 'This callout is styled as a toast notification.',
    variant: 'success',
    icon: <SuccessIcon />,
    toast: true,
    onClose: () => console.log('Toast closed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toast notifications are temporary messages that appear and disappear automatically.',
      },
    },
  },
};

// Theme variants
export const Dark: Story = {
  args: {
    title: 'Dark Mode',
    children: 'This is a dark variant of the callout component.',
    variant: 'dark',
    icon: <InfoIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dark callouts are useful for dark-themed interfaces or for creating visual contrast.',
      },
    },
  },
};

export const Light: Story = {
  args: {
    title: 'Light Mode',
    children: 'This is a light variant of the callout component.',
    variant: 'light',
    icon: <InfoIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Light callouts are useful for light-themed interfaces or for creating visual contrast.',
      },
    },
  },
};

// Interactive examples
const ToastDemoTemplate = () => {
  const [toasts, setToasts] = useState<{ id: string; variant: string }[]>([]);

  const addToast = (variant: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts([...toasts, { id, variant }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts(current => current.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <ErrorIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getTitle = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Information';
    }
  };

  const getMessage = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'Operation completed successfully!';
      case 'warning':
        return 'Please review before continuing.';
      case 'error':
        return 'An error occurred. Please try again.';
      default:
        return 'This is an informational message.';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          label="Add Info Toast"
          variant="primary"
          size="sm"
          onClick={() => addToast('info')}
        />
        <Button
          label="Add Success Toast"
          variant="success"
          size="sm"
          onClick={() => addToast('success')}
        />
        <Button
          label="Add Warning Toast"
          variant="warning"
          size="sm"
          onClick={() => addToast('warning')}
        />
        <Button
          label="Add Error Toast"
          variant="error"
          size="sm"
          onClick={() => addToast('error')}
        />
      </div>

      <div
        style={{
          position: 'relative',
          height: '300px',
          border: '1px dashed #ccc',
          borderRadius: '8px',
          padding: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '350px',
          }}
        >
          {toasts.map(toast => (
            <Callout
              key={toast.id}
              title={getTitle(toast.variant)}
              variant={toast.variant as any}
              icon={getIcon(toast.variant)}
              toast={true}
              onClose={() => removeToast(toast.id)}
            >
              {getMessage(toast.variant)}
            </Callout>
          ))}
        </div>
        {toasts.length === 0 && (
          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            Click a button above to show toast notifications here
          </div>
        )}
      </div>
    </div>
  );
};

export const ToastDemo: Story = {
  render: () => <ToastDemoTemplate />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing how toast notifications can be triggered and displayed in different variants.',
      },
    },
  },
};

const AutoDismissTemplate = () => {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  const resetCallout = () => {
    setVisible(true);
    setCountdown(5);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {visible ? (
        <Callout
          title={`Auto-dismissing in ${countdown} seconds`}
          variant="warning"
          icon={<WarningIcon />}
          onClose={() => setVisible(false)}
        >
          This callout will automatically dismiss after the countdown. You can also dismiss it
          manually.
        </Callout>
      ) : (
        <Button label="Show Auto-dismiss Callout" variant="primary" onClick={resetCallout} />
      )}
    </div>
  );
};

export const AutoDismiss: Story = {
  render: () => <AutoDismissTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Example of a callout that automatically dismisses after a countdown.',
      },
    },
  },
};

const AllVariantsTemplate = () => {
  const variants = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'];

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <ErrorIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {variants.map(variant => (
        <Callout
          key={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
          variant={variant as any}
          icon={getIcon(variant)}
        >
          This is an example of the {variant} callout variant.
        </Callout>
      ))}
    </div>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Overview of all available callout color variants.',
      },
    },
  },
};

const CalloutWithCustomContentTemplate = () => (
  <Callout title="Custom Content Example" variant="primary" icon={<InfoIcon />}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p>Callouts can contain rich content including:</p>
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        <li>Lists of items</li>
        <li>Formatted text</li>
        <li>Custom components</li>
      </ul>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '8px', borderRadius: '4px' }}>
        <code>This is a code example</code>
      </div>
    </div>
  </Callout>
);

export const CustomContent: Story = {
  render: () => <CalloutWithCustomContentTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Callouts can contain rich, custom content beyond simple text.',
      },
    },
  },
};
