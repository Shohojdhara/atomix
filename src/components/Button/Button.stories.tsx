import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Button component is a versatile interactive element used to trigger actions throughout the application. It supports multiple variants, sizes, states, and can include icons. Buttons are essential for user interactions and provide clear visual feedback for clickable actions.',
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
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the button',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    icon: {
      control: 'text',
      description: 'Optional icon element to display in the button',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button should only display an icon',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the button should have a fully rounded (pill) shape',
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Apply glass morphism effect to the button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    loadingText: {
      control: 'text',
      description: 'Custom text to display during loading',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
    block: {
      control: 'boolean',
      description: 'Whether the button should be block-level',
    },
    active: {
      control: 'boolean',
      description: 'Whether the button is in active state',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the button is selected',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Position of the icon',
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

/**
 * Primary button variant - the main call-to-action style.
 */
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Secondary button variant - used for secondary actions.
 */
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * Success button variant - indicates successful or positive actions.
 */
export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
    size: 'md',
  },
};

/**
 * Info button variant - used for informational actions.
 */
export const Info: Story = {
  args: {
    label: 'Info Button',
    variant: 'info',
    size: 'md',
  },
};

/**
 * Warning button variant - indicates caution or warning actions.
 */
export const Warning: Story = {
  args: {
    label: 'Warning Button',
    variant: 'warning',
    size: 'md',
  },
};

/**
 * Error button variant - indicates destructive or error actions.
 */
export const Error: Story = {
  args: {
    label: 'Error Button',
    variant: 'error',
    size: 'md',
  },
};

/**
 * Outline primary button variant - outlined style with primary color.
 */
export const OutlinePrimary: Story = {
  args: {
    label: 'Outline Primary',
    variant: 'outline-primary',
    size: 'md',
  },
};

/**
 * Outline secondary button variant - outlined style with secondary color.
 */
export const OutlineSecondary: Story = {
  args: {
    label: 'Outline Secondary',
    variant: 'outline-secondary',
    size: 'md',
  },
};

/**
 * Link button variant - styled as a text link.
 */
export const LinkButton: Story = {
  args: {
    label: 'Link Button',
    variant: 'link',
    size: 'md',
  },
};

/**
 * Small size button variant.
 */
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Medium size button variant (default).
 */
export const Medium: Story = {
  args: {
    label: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Large size button variant.
 */
export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Disabled button state - non-interactive button.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

/**
 * Button with icon - displays an icon alongside the label.
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
 * Icon-only button - displays only an icon without text.
 */
export const IconOnly: Story = {
  args: {
    label: 'Add',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
    iconOnly: true,
  },
};

/**
 * Showcase of all button color variants in a single view.
 */
export const AllVariants: Story = {
  args: {
    label: 'Button',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays all available button color variants side by side for easy comparison.',
      },
    },
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Success" variant="success" />
      <Button label="Info" variant="info" />
      <Button label="Warning" variant="warning" />
      <Button label="Error" variant="error" />
      <Button label="Light" variant="light" />
      <Button label="Dark" variant="dark" />
    </div>
  ),
};

/**
 * Showcase of all outline button variants in a single view.
 */
export const AllOutlineVariants: Story = {
  args: {
    label: 'Button',
    variant: 'outline-primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays all available outline button variants with transparent backgrounds and colored borders.',
      },
    },
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Button label="Outline Primary" variant="outline-primary" />
      <Button label="Outline Secondary" variant="outline-secondary" />
      <Button label="Outline Success" variant="outline-success" />
      <Button label="Outline Info" variant="outline-info" />
      <Button label="Outline Warning" variant="outline-warning" />
      <Button label="Outline Error" variant="outline-error" />
      <Button label="Outline Light" variant="outline-light" />
      <Button label="Outline Dark" variant="outline-dark" />
    </div>
  ),
};

/**
 * Showcase of all button sizes (small, medium, large) in a single view.
 */
export const AllSizes: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compares all available button sizes to help choose the appropriate size for your use case.',
      },
    },
  },
  render: () => (
    <div className="u-flex u-items-center u-gap-2">
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </div>
  ),
};

/**
 * Showcase of button icon variants and icon-only buttons.
 */
export const IconButtonVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    icon: <Icon />,
    iconOnly: true,
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Button label="Add" variant="primary" icon={<Icon />} />
      <Button label="Add" variant="secondary" icon={<Icon />} />
      <Button label="Add" variant="success" icon={<Icon />} />
      <Button label="Add" variant="primary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="secondary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="success" icon={<Icon />} iconOnly />
    </div>
  ),
};

/**
 * Rounded button - fully rounded (pill-shaped) button style.
 */
export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    variant: 'primary',
    size: 'md',
    rounded: true,
  },
};

/**
 * Showcase of all button variants with rounded (pill) shape.
 */
export const RoundedVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    rounded: true,
  },
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-2">
      <Button label="Primary" variant="primary" rounded />
      <Button label="Secondary" variant="secondary" rounded />
      <Button label="Success" variant="success" rounded />
      <Button label="Info" variant="info" rounded />
      <Button label="Warning" variant="warning" rounded />
      <Button label="Error" variant="error" rounded />
      <Button label="Light" variant="light" rounded />
      <Button label="Dark" variant="dark" rounded />
    </div>
  ),
};

/**
 * Button using the label prop for text content.
 */
export const WithLabel: Story = {
  args: {
    label: 'Button with Label',
    variant: 'primary',
  },
};

/**
 * Button using children prop for text content.
 */
export const WithChildren: Story = {
  render: () => (
    <Button variant="primary">
      Button with Children
    </Button>
  ),
};

/**
 * Button with icon and text content as children.
 */
export const WithIconAndText: Story = {
  render: () => (
    <Button variant="primary">
      <Icon />
      Add Item
    </Button>
  ),
};

/**
 * Button with glass morphism effect enabled.
 */
export const GlassEffect: Story = {
  args: {
    label: 'Glass Button',
    variant: 'primary',
    glass: true,
  },
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://cdn.pixabay.com/photo/2022/10/02/17/23/mushroom-7494046_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '10rem 25rem',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassEffectCustomized: Story = {
  args: {
    label: 'Customized Glass',
    variant: 'secondary',
    glass: {
      displacementScale: 60,
      blurAmount: 2,
      saturation: 180,
      aberrationIntensity: 2,
      cornerRadius: 12,
      overLight: false,
      mode: 'polar' as const,
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://cdn.pixabay.com/photo/2022/10/02/17/23/mushroom-7494046_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '25rem',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const GlassVariants: Story = {
  args: {
    label: 'Glass Button',
    variant: 'primary',
    glass: true,
  },
  render: () => (
    <div
      style={{
        background:
          'url(https://cdn.pixabay.com/photo/2021/06/14/22/46/milky-way-6337038_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '25rem',
        borderRadius: '12px',
      }}
    >
      <div className="u-flex u-flex-wrap u-gap-2">
        <Button label="Primary" variant="primary" glass />
        <Button label="Secondary" variant="secondary" glass />
        <Button label="Success" variant="success" glass />
        <Button label="Info" variant="info" glass />
        <Button label="Warning" variant="warning" glass />
        <Button label="Error" variant="error" glass />
        <Button label="Light" variant="light" glass />
        <Button label="Dark" variant="dark" glass />
      </div>
    </div>
  ),
};

export const GlassOutlineVariants: Story = {
  args: {
    label: 'Glass Button',
    variant: 'outline-primary',
    glass: true,
  },
  render: () => (
    <div
      style={{
        background:
          'url(https://cdn.pixabay.com/photo/2018/08/15/13/10/new-year-background-3608029_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20rem 10rem',
        borderRadius: '12px',
      }}
    >
      <div className="u-flex u-flex-wrap u-gap-2">
        <Button label="Outline Primary" variant="outline-primary" glass />
        <Button label="Outline Secondary" variant="outline-secondary" glass />
        <Button label="Outline Success" variant="outline-success" glass />
        <Button label="Outline Info" variant="outline-info" glass />
        <Button label="Outline Warning" variant="outline-warning" glass />
        <Button label="Outline Error" variant="outline-error" glass />
        <Button label="Outline Light" variant="outline-light" glass />
        <Button label="Outline Dark" variant="outline-dark" glass />
      </div>
    </div>
  ),
};

export const GlassSizes: Story = {
  args: {
    label: 'Glass Button',
    variant: 'primary',
    glass: true,
  },
  render: () => (
    <div
      style={{
        background: 'url(https://cdn.pixabay.com/photo/2020/12/15/01/43/street-5832394_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10rem 20rem',
        borderRadius: '12px',
      }}
    >
      <div className="u-flex u-items-center u-gap-2">
        <Button label="Small Glass" variant="primary" size="sm" glass={{ cornerRadius: 8 }} />
        <Button label="Medium Glass" variant="primary" size="md" glass />
        <Button label="Large Glass" variant="primary" size="lg" glass />
      </div>
    </div>
  ),
};

export const GlassWithIcons: Story = {
  args: {
    label: 'Glass Button',
    variant: 'primary',
    glass: true,
    icon: <Icon />,
  },
  render: () => (
    <div
      style={{
        background: 'url(https://cdn.pixabay.com/photo/2020/12/15/01/43/street-5832394_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '25rem',
        borderRadius: '12px',
      }}
    >
      <div className="u-flex u-flex-wrap u-gap-2">
        <Button label="With Icon" variant="primary" icon={<Icon />} glass={{ cornerRadius: 12 }} />
        <Button
          label="Icon Only"
          variant="error"
          icon={<Icon />}
          iconOnly
          glass={{ cornerRadius: 12 }}
        />
        <Button
          label="Rounded Glass"
          variant="success"
          icon={<Icon />}
          rounded
          glass={{ cornerRadius: 24 }}
        />
        <Button
          label="Rounded Icon"
          variant="info"
          icon={<Icon />}
          iconOnly
          rounded
          glass={{ cornerRadius: 50 }}
        />
      </div>
    </div>
  ),
};

export const GlassRounded: Story = {
  args: {
    label: 'Rounded Glass',
    variant: 'primary',
    glass: {
      cornerRadius: 22,
    },
    rounded: true,
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2020/12/15/01/43/street-5832394_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '25rem',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Comprehensive Glass Showcase
export const GlassShowcase: Story = {
  args: {
    label: 'Glass Button',
    variant: 'primary',
    glass: true,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Primary Glass Variants */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Primary Glass Variants
        </h3>
        <div className="u-flex u-flex-wrap u-gap-2 u-items-center">
          <Button label="Small Glass" variant="primary" size="sm" glass={{ cornerRadius: 8 }} />
          <Button label="Medium Glass" variant="primary" size="md" glass />
          <Button label="Large Glass" variant="primary" size="lg" glass />
          <Button label="With Icon" variant="primary" icon={<Icon />} glass />
          <Button label="Icon Only" variant="primary" icon={<Icon />} iconOnly glass />
          <Button label="Rounded" variant="primary" rounded glass={{ cornerRadius: 24 }} />
        </div>
      </div>

      {/* Outline Glass Variants */}
      <div
        style={{
          background:
            'url(https://cdn.pixabay.com/photo/2025/09/18/23/32/pattern-9842070_1280.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Outline Glass Variants
        </h3>
        <div className="u-flex u-flex-wrap u-gap-2">
          <Button label="Outline Primary" variant="outline-primary" glass />
          <Button label="Outline Success" variant="outline-success" glass />
          <Button label="Outline Warning" variant="outline-warning" glass />
          <Button label="Outline Error" variant="outline-error" glass />
        </div>
      </div>

      {/* Custom Glass Configuration */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513857_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Custom Glass Effects
        </h3>
        <div className="u-flex u-flex-wrap u-gap-2">
          <Button
            label="Polar Mode"
            variant="secondary"
            glass={{
              displacementScale: 60,
              blurAmount: 2,
              saturation: 180,
              aberrationIntensity: 2,
              cornerRadius: 12,
              mode: 'polar' as const,
            }}
          />
          <Button
            label="Prominent Mode"
            variant="info"
            glass={{
              displacementScale: 80,
              blurAmount: 1,
              saturation: 200,
              aberrationIntensity: 3,
              cornerRadius: 12,
              mode: 'prominent' as const,
            }}
          />
          <Button
            label="Shader Mode"
            variant="success"
            glass={{
              displacementScale: 50,
              blurAmount: 0,
              saturation: 140,
              aberrationIntensity: 1,
              cornerRadius: 12,
              mode: 'shader' as const,
            }}
          />
        </div>
      </div>

      {/* Light Background */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2019/09/29/17/21/greece-4513852_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ color: '#333', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Light Background
        </h3>
        <div className="u-flex u-flex-wrap u-gap-2">
          <Button label="Light Variant" variant="light" glass />
          <Button label="Outline Light" variant="outline-light" glass />
          <Button label="Dark on Light" variant="dark" glass />
          <Button
            label="Over Light"
            variant="primary"
            glass={{
              overLight: true,
              displacementScale: 45,
              saturation: 120,
            }}
          />
        </div>
      </div>
    </div>
  ),
};

// Glass Mode Variants - Standard
export const GlassModeStandard: Story = {
  args: {
    label: 'Standard Glass Mode',
    variant: 'primary',
    glass: {
      mode: 'standard',
      displacementScale: 60,
      blurAmount: 2,
      saturation: 160,
      aberrationIntensity: 2,
      cornerRadius: 12,
    },
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '95vw',
        minHeight: '95vh',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Standard Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Classic glass morphism with blur and displacement
        </p>
      </div>
      <Button {...args} />
    </div>
  ),
};

// Glass Mode Variants - Polar
export const GlassModePolar: Story = {
  args: {
    label: 'Polar Glass Mode',
    variant: 'secondary',
    glass: {
      mode: 'polar',
      displacementScale: 80,
      blurAmount: 1.5,
      saturation: 180,
      aberrationIntensity: 3,
      cornerRadius: 12,
    },
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '95vw',
        minHeight: '95vh',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Polar Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Radial distortion effect from center</p>
      </div>
      <Button {...args} />
    </div>
  ),
};

// Glass Mode Variants - Prominent
export const GlassModeProminent: Story = {
  args: {
    label: 'Prominent Glass Mode',
    variant: 'success',
    glass: {
      mode: 'prominent',
      displacementScale: 100,
      blurAmount: 2.5,
      saturation: 200,
      aberrationIntensity: 4,
      cornerRadius: 12,
    },
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '95vw',
        minHeight: '95vh',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prominent Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Enhanced distortion with maximum depth</p>
      </div>
      <Button {...args} />
    </div>
  ),
};

// Glass Mode Variants - Shader
export const GlassModeShader: Story = {
  args: {
    label: 'Shader Glass Mode',
    variant: 'info',
    glass: {
      mode: 'shader',
      shaderVariant: 'liquidGlass',
      displacementScale: 70,
      blurAmount: 1.8,
      saturation: 170,
      cornerRadius: 12,
    },
  },
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '95vw',
        minHeight: '95vh',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Shader Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>GPU-accelerated liquid glass effect</p>
      </div>
      <Button {...args} />
    </div>
  ),
};

// All Glass Modes Comparison
export const AllGlassModes: Story = {
  render: () => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '90vh',
        minWidth: '90vw',
      }}
    >
      <div style={{ width: '90vw', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Mode Variants Comparison
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Standard Mode */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Standard</h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              Classic blur and displacement
            </p>
            <Button
              label="Standard Glass"
              variant="primary"
              glass={{
                mode: 'standard',
                displacementScale: 60,
                blurAmount: 2,
                saturation: 160,
                aberrationIntensity: 2,
              }}
            />
          </div>

          {/* Polar Mode */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Polar</h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              Radial distortion effect
            </p>
            <Button
              label="Polar Glass"
              variant="secondary"
              glass={{
                mode: 'polar',
                displacementScale: 80,
                blurAmount: 1.5,
                saturation: 180,
                aberrationIntensity: 3,
              }}
            />
          </div>

          {/* Prominent Mode */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Prominent</h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              Maximum depth and distortion
            </p>
            <Button
              label="Prominent Glass"
              variant="success"
              glass={{
                mode: 'prominent',
                displacementScale: 100,
                blurAmount: 2.5,
                saturation: 200,
                aberrationIntensity: 4,
              }}
            />
          </div>

          {/* Shader Mode */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Shader</h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
              }}
            >
              GPU-accelerated liquid glass
            </p>
            <Button
              label="Shader Glass"
              variant="info"
              glass={{
                mode: 'shader',
                shaderVariant: 'liquidGlass',
                displacementScale: 70,
                blurAmount: 1.8,
                saturation: 170,
              }}
            />
          </div>
        </div>

        {/* All Variants with Different Colors */}
        <div style={{ marginTop: '3rem' }}>
          <h3
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: '2rem',
              fontSize: '1.5rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            All Color Variants with Glass
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Button label="Primary" variant="primary" glass />
            <Button label="Secondary" variant="secondary" glass />
            <Button label="Success" variant="success" glass />
            <Button label="Info" variant="info" glass />
            <Button label="Warning" variant="warning" glass />
            <Button label="Error" variant="error" glass />
            <Button label="Light" variant="light" glass />
            <Button label="Dark" variant="dark" glass />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Glass Button States Showcase
export const GlassStatesShowcase: Story = {
  render: () => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '90vh',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Button States & Interactions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Sizes */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Sizes</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="Small" variant="primary" size="sm" glass={{ cornerRadius: 8 }} />
              <Button label="Medium" variant="primary" size="md" glass={{ cornerRadius: 12 }} />
              <Button label="Large" variant="primary" size="lg" glass={{ cornerRadius: 16 }} />
            </div>
          </div>

          {/* With Icons */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>With Icons</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="With Icon" variant="primary" icon={<Icon />} glass />
              <Button label="Icon Only" variant="secondary" icon={<Icon />} iconOnly glass />
              <Button
                label="Rounded"
                variant="success"
                icon={<Icon />}
                rounded
                glass={{ cornerRadius: 24 }}
              />
            </div>
          </div>

          {/* Outline Variants */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Outline Variants</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="Outline Primary" variant="outline-primary" glass />
              <Button label="Outline Secondary" variant="outline-secondary" glass />
              <Button label="Outline Success" variant="outline-success" glass />
              <Button label="Outline Error" variant="outline-error" glass />
            </div>
          </div>

          {/* Disabled State */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Disabled State</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="Disabled Glass" variant="primary" disabled glass />
              <Button label="Disabled Outline" variant="outline-primary" disabled glass />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Button in loading state - shows loading spinner.
 */
export const Loading: Story = {
  args: {
    label: 'Save',
    variant: 'primary',
    loading: true,
  },
};

/**
 * Button in loading state with custom loading text.
 */
export const LoadingWithText: Story = {
  args: {
    label: 'Save',
    variant: 'primary',
    loading: true,
    loadingText: 'Saving...',
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button label="Loading Primary" variant="primary" loading />
      <Button label="Loading Secondary" variant="secondary" loading />
      <Button label="Saving..." variant="success" loading loadingText="Saving..." />
      <Button label="Deleting..." variant="error" loading loadingText="Deleting..." />
    </div>
  ),
};

/**
 * Full-width button - takes the full width of its container.
 */
export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    variant: 'primary',
    fullWidth: true,
  },
};

export const FullWidthButtons: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button label="Full Width Primary" variant="primary" fullWidth />
      <Button label="Full Width Secondary" variant="secondary" fullWidth />
      <Button label="Full Width Loading" variant="success" fullWidth loading />
    </div>
  ),
};

/**
 * Block-level button - displays as a block element.
 */
export const Block: Story = {
  args: {
    label: 'Block Button',
    variant: 'primary',
    block: true,
  },
};

/**
 * Button with icon positioned at the start (left side).
 */
export const IconStart: Story = {
  args: {
    label: 'Icon Start',
    variant: 'primary',
    icon: <Icon />,
    iconPosition: 'start',
  },
};

/**
 * Button with icon positioned at the end (right side).
 */
export const IconEnd: Story = {
  args: {
    label: 'Icon End',
    variant: 'primary',
    icon: <Icon />,
    iconPosition: 'end',
  },
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button label="Icon Start" variant="primary" icon={<Icon />} iconPosition="start" />
      <Button label="Icon End" variant="secondary" icon={<Icon />} iconPosition="end" />
      <Button label="Loading Start" variant="success" loading iconPosition="start" />
    </div>
  ),
};

/**
 * Button in active state - visually indicates active/pressed state.
 */
export const Active: Story = {
  args: {
    label: 'Active Button',
    variant: 'primary',
    active: true,
  },
};

/**
 * Button in selected state - visually indicates selected state.
 */
export const Selected: Story = {
  args: {
    label: 'Selected Button',
    variant: 'primary',
    selected: true,
  },
};

/**
 * Comprehensive example showcasing multiple button features and states.
 */
export const Comprehensive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example demonstrating various button features including loading states, layout variants, icon positioning, and different states all in one view.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Loading States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button label="Save" variant="primary" loading />
          <Button label="Delete" variant="error" loading loadingText="Deleting..." />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Layout Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button label="Full Width Button" variant="primary" fullWidth />
          <Button label="Block Button" variant="secondary" block />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Icon Positioning</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button label="Icon Start" variant="primary" icon={<Icon />} iconPosition="start" />
          <Button label="Icon End" variant="secondary" icon={<Icon />} iconPosition="end" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button label="Active" variant="primary" active />
          <Button label="Selected" variant="success" selected />
          <Button label="Loading" variant="info" loading />
          <Button label="Disabled" variant="warning" disabled />
        </div>
      </div>
    </div>
  ),
};
