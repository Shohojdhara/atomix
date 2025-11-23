import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
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
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
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

// Primary Buttons
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    label: 'Info Button',
    variant: 'info',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Button',
    variant: 'error',
    size: 'md',
  },
};

// Outline Buttons
export const OutlinePrimary: Story = {
  args: {
    label: 'Outline Primary',
    variant: 'outline-primary',
    size: 'md',
  },
};

export const OutlineSecondary: Story = {
  args: {
    label: 'Outline Secondary',
    variant: 'outline-secondary',
    size: 'md',
  },
};

// Link Button
export const LinkButton: Story = {
  args: {
    label: 'Link Button',
    variant: 'link',
    size: 'md',
  },
};

// Button Sizes
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
  },
};

export const IconOnly: Story = {
  args: {
    label: 'Add',
    variant: 'primary',
    size: 'md',
    icon: <Icon />,
    iconOnly: true,
  },
};

// Group of Button Variants
export const AllVariants: Story = {
  args: {
    label: 'Button',
    variant: 'success',
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
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

// Group of Outline Button Variants
export const AllOutlineVariants: Story = {
  args: {
    label: 'Button',
    variant: 'outline-primary',
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
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

// Group of Button Sizes
export const AllSizes: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
  render: () => (
    <div className="u-d-flex u-align-items-center u-gap-2">
      <Button label="Small" variant="primary" size="sm" />
      <Button label="Medium" variant="primary" size="md" />
      <Button label="Large" variant="primary" size="lg" />
    </div>
  ),
};

// Icon Buttons
export const IconButtonVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    icon: <Icon />,
    iconOnly: true,
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
      <Button label="Add" variant="primary" icon={<Icon />} />
      <Button label="Add" variant="secondary" icon={<Icon />} />
      <Button label="Add" variant="success" icon={<Icon />} />
      <Button label="Add" variant="primary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="secondary" icon={<Icon />} iconOnly />
      <Button label="Add" variant="success" icon={<Icon />} iconOnly />
    </div>
  ),
};

// Rounded Button
export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    variant: 'primary',
    size: 'md',
    rounded: true,
  },
};

// Group of Rounded Buttons
export const RoundedVariants: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    rounded: true,
  },
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-2">
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

// Content Options - Label vs Children
export const WithLabel: Story = {
  args: {
    label: 'Button with Label',
    variant: 'primary',
  },
};

export const WithChildren: Story = {
  render: () => (
    <Button variant="primary">
      Button with Children
    </Button>
  ),
};

export const WithIconAndText: Story = {
  render: () => (
    <Button variant="primary">
      <Icon />
      Add Item
    </Button>
  ),
};

// Glass Effect Buttons
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
      <div className="u-d-flex u-flex-wrap u-gap-2">
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
      <div className="u-d-flex u-flex-wrap u-gap-2">
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
      <div className="u-d-flex u-align-items-center u-gap-2">
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
      <div className="u-d-flex u-flex-wrap u-gap-2">
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
        <div className="u-d-flex u-flex-wrap u-gap-2 u-align-items-center">
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
        <div className="u-d-flex u-flex-wrap u-gap-2">
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
        <div className="u-d-flex u-flex-wrap u-gap-2">
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
        <div className="u-d-flex u-flex-wrap u-gap-2">
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
