import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'danger', 'warning', 'info'],
      description: 'Color variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the input is valid',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text input
export const Basic: Story = {
  args: {
    placeholder: 'Enter text here',
    type: 'text',
  },
};

// Input sizes
export const Sizes: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

// Input types
export const Types: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Tel input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
};

// Input variants
export const Variants: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input variant="primary" placeholder="Primary input" />
      <Input variant="secondary" placeholder="Secondary input" />
      <Input variant="success" placeholder="Success input" />
      <Input variant="error" placeholder="Error input" />
      <Input variant="warning" placeholder="Warning input" />
      <Input variant="info" placeholder="Info input" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Valid input" valid />
      <Input placeholder="Invalid input" invalid />
    </div>
  ),
};

// Glass Effect
export const Glass: Story = {
  args: {
    placeholder: 'Glass Input',
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Input {...args} />
    </div>
  ),
};

// Glass Variants
export const GlassVariants: Story = {
  render: () => (
    <div
      style={{
        background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
        Glass Input Variants
      </h3>
      <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Input placeholder="Small Glass" size="sm" glass />
        <Input placeholder="Medium Glass" size="md" glass />
        <Input placeholder="Large Glass" size="lg" glass />
        <Input placeholder="Primary Glass" variant="primary" glass />
        <Input placeholder="Success Glass" variant="success" glass />
        <Input
          placeholder="Custom Glass"
          glass={{
            displacementScale: 80,
            blurAmount: 2,
            saturation: 200,
            aberrationIntensity: 2,
            cornerRadius: 12,
          }}
        />
      </div>
    </div>
  ),
};

// Glass Showcase
export const GlassShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Basic Glass */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Glass Input on Background
        </h3>
        <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
          <Input placeholder="Enter your name" glass />
          <Input type="email" placeholder="Enter your email" glass />
          <Input type="password" placeholder="Enter password" glass />
        </div>
      </div>

      {/* Different Glass Modes */}
      <div
        style={{
          background: 'url(https://cdn.pixabay.com/photo/2021/11/13/08/50/athens-6790780_1280.jpg)',
          padding: '2rem',
          borderRadius: '12px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Glass Modes</h3>
        <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
          <Input placeholder="Standard Mode" glass={{ mode: 'standard' }} />
          <Input placeholder="Polar Mode" glass={{ mode: 'polar' }} />
          <Input placeholder="Prominent Mode" glass={{ mode: 'prominent' }} />
          <Input placeholder="Shader Mode" glass={{ mode: 'shader' }} />
        </div>
      </div>
    </div>
  ),
};
