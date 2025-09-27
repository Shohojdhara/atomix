import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
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
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'AtomixGlassProps | boolean' },
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
    <div
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 107, 107, 0.15) 0%, 
          rgba(255, 142, 83, 0.15) 25%, 
          rgba(255, 193, 7, 0.15) 50%, 
          rgba(76, 175, 80, 0.15) 75%, 
          rgba(33, 150, 243, 0.15) 100%),
          url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay, normal',
        padding: '2rem',
        minHeight: '90vh',
        position: 'relative',
      }}
    >
      {/* Additional background layer for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1,
        }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
            height: '400px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '20px',
            overflow: 'hidden',
            background: `linear-gradient(45deg, 
              rgba(255, 107, 107, 0.1) 0%, 
              rgba(255, 142, 83, 0.1) 25%, 
              rgba(255, 193, 7, 0.1) 50%, 
              rgba(76, 175, 80, 0.1) 75%, 
              rgba(33, 150, 243, 0.1) 100%),
              url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center',
            backgroundBlendMode: 'overlay, normal',
            backdropFilter: 'blur(1px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              <div>
                <div style={{ marginBottom: '8px' }}>🎨 Click a button above to show toast notifications here 🎨</div>
                <small style={{ opacity: 0.8 }}>
                  Beautiful colorful backgrounds enhance the visual experience
                </small>
              </div>
            </div>
          )}
        </div>
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
    <div
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 107, 107, 0.2) 0%, 
          rgba(255, 142, 83, 0.2) 25%, 
          rgba(255, 193, 7, 0.2) 50%, 
          rgba(76, 175, 80, 0.2) 75%, 
          rgba(33, 150, 243, 0.2) 100%),
          url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay, normal',
        padding: '4rem',
        minHeight: '400px',
        position: 'relative',
      }}
    >
      {/* Additional background layer for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
        {visible ? (
          <Callout
            title={`Auto-dismissing in ${countdown} seconds`}
            variant="warning"
            icon={<WarningIcon />}
            glass
            onClose={() => setVisible(false)}
          >
            This callout will automatically dismiss after the countdown. You can also dismiss it
            manually. The glass effect looks beautiful against this colorful background!
          </Callout>
        ) : (
          <Button label="Show Auto-dismiss Callout" variant="primary" onClick={resetCallout} />
        )}
      </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
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

// Glass morphism variants
export const Glass: Story = {
  args: {
    title: 'Glass Morphism',
    children: 'This callout uses glass morphism effect for a modern, translucent appearance.',
    variant: 'primary',
    icon: <InfoIcon />,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Glass morphism callouts provide a modern, translucent appearance with backdrop blur effects.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassSuccess: Story = {
  args: {
    title: 'Success with Glass Effect',
    children: 'Your changes have been saved successfully with a beautiful glass effect.',
    variant: 'success',
    icon: <SuccessIcon />,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Success callouts with glass morphism effect for enhanced visual appeal.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassWarning: Story = {
  args: {
    title: 'Warning Glass',
    children: 'Please review your information before proceeding. Glass effect adds elegance.',
    variant: 'warning',
    icon: <WarningIcon />,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning callouts with glass effect maintain urgency while adding visual sophistication.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassError: Story = {
  args: {
    title: 'Error with Glass',
    children: 'There was a problem processing your request. Glass effect softens the appearance.',
    variant: 'error',
    icon: <ErrorIcon />,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error callouts with glass morphism provide a softer, more approachable error presentation.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassDark: Story = {
  args: {
    title: 'Dark Glass Mode',
    children: 'This dark variant with glass effect creates stunning visual depth.',
    variant: 'dark',
    icon: <InfoIcon />,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark callouts with glass effect create dramatic visual depth and contrast.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassWithActions: Story = {
  args: {
    title: 'Glass Update Available',
    children: 'A new version is available. The glass effect enhances the modern feel.',
    variant: 'info',
    icon: <InfoIcon />,
    glass: true,
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
          'Glass callouts with action buttons maintain full functionality while adding visual appeal.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassDismissible: Story = {
  args: {
    title: 'Glass Notification',
    children:
      'This dismissible glass callout can be closed while maintaining its elegant appearance.',
    variant: 'primary',
    icon: <InfoIcon />,
    glass: true,
    onClose: () => console.log('Glass callout closed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dismissible glass callouts combine functionality with modern glass morphism aesthetics.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassToast: Story = {
  args: {
    title: 'Glass Toast Notification',
    children:
      'This glass toast notification combines the elegance of glass morphism with toast functionality.',
    variant: 'success',
    icon: <SuccessIcon />,
    toast: true,
    glass: true,
    onClose: () => console.log('Glass toast closed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Glass toast notifications provide an elegant, floating appearance with enhanced visual depth.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassOneLine: Story = {
  args: {
    title: 'Glass one-line notification',
    variant: 'info',
    icon: <InfoIcon />,
    oneLine: true,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact one-line glass callouts maintain elegance in minimal space.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem',
          minHeight: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const GlassVariantsTemplate = () => {
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

  const backgrounds = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Mountain landscape
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80', // Forest
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Ocean
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80', // Sunset
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // City lights
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80', // Desert
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Aurora
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80', // Space
  ];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 107, 107, 0.1) 0%, 
          rgba(255, 142, 83, 0.1) 25%, 
          rgba(255, 193, 7, 0.1) 50%, 
          rgba(76, 175, 80, 0.1) 75%, 
          rgba(33, 150, 243, 0.1) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Multiple background layers for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.2,
          zIndex: -2,
        }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1 }}>
        {variants.map((variant, index) => (
          <div
            key={variant}
            style={{
              backgroundImage: `url("${backgrounds[index % backgrounds.length]}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2rem',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              backgroundAttachment: 'fixed',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.1)',
                zIndex: -1,
              }}
            />
            <Callout
              title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Glass Variant`}
              variant={variant as any}
              icon={getIcon(variant)}
              glass
            >
              This is an example of the {variant} callout variant with glass morphism effect against a beautiful {index % 2 === 0 ? 'mountain' : 'forest'} background.
            </Callout>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AllGlassVariants: Story = {
  render: () => <GlassVariantsTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Overview of all available callout variants with glass morphism effect.',
      },
    },
  },
};

const GlassToastDemoTemplate = () => {
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
        return 'Glass Success';
      case 'warning':
        return 'Glass Warning';
      case 'error':
        return 'Glass Error';
      default:
        return 'Glass Info';
    }
  };

  const getMessage = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'Glass operation completed successfully!';
      case 'warning':
        return 'Glass warning: Please review before continuing.';
      case 'error':
        return 'Glass error occurred. Please try again.';
      default:
        return 'This is a glass informational message.';
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 107, 107, 0.2) 0%, 
          rgba(255, 142, 83, 0.2) 25%, 
          rgba(255, 193, 7, 0.2) 50%, 
          rgba(76, 175, 80, 0.2) 75%, 
          rgba(33, 150, 243, 0.2) 100%),
          url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay, normal',
        padding: '2rem',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Additional background layers for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
          backgroundAttachment: 'fixed',
        }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            label="Add Glass Info Toast"
            variant="primary"
            size="sm"
            onClick={() => addToast('info')}
          />
          <Button
            label="Add Glass Success Toast"
            variant="success"
            size="sm"
            onClick={() => addToast('success')}
          />
          <Button
            label="Add Glass Warning Toast"
            variant="warning"
            size="sm"
            onClick={() => addToast('warning')}
          />
          <Button
            label="Add Glass Error Toast"
            variant="error"
            size="sm"
            onClick={() => addToast('error')}
          />
        </div>

        <div
          style={{
            position: 'relative',
            height: '400px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '20px',
            overflow: 'hidden',
            background: `linear-gradient(45deg, 
              rgba(255, 107, 107, 0.1) 0%, 
              rgba(255, 142, 83, 0.1) 25%, 
              rgba(255, 193, 7, 0.1) 50%, 
              rgba(76, 175, 80, 0.1) 75%, 
              rgba(33, 150, 243, 0.1) 100%),
              url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")`,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center',
            backgroundBlendMode: 'overlay, normal',
            backdropFilter: 'blur(2px)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
                glass
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
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                fontSize: '18px',
                fontWeight: '500',
              }}
            >
              <div>
                <div style={{ marginBottom: '8px' }}>✨ Click a button above to show glass toast notifications here ✨</div>
                <small style={{ opacity: 0.8 }}>
                  Beautiful colorful backgrounds help visualize the glass morphism effect
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const GlassToastDemo: Story = {
  render: () => <GlassToastDemoTemplate />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing glass toast notifications with enhanced visual appeal against a gradient background.',
      },
    },
  },
};
