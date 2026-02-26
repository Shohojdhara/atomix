import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { MagnifyingGlass, Envelope, Lock, User, Phone, Calendar } from '@phosphor-icons/react';
import { SIZES, THEME_COLORS } from '../../lib/constants/components';

const meta = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Input component provides a text input field for user data entry. It supports various input types, sizes, validation states, and can include icons and clear buttons. Inputs are essential form elements for collecting user information and can be customized to match your design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Input type',
      defaultValue: 'text',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the input',
      defaultValue: 'md',
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'Color variant of the input',
      defaultValue: 'secondary',
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
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value',
    },
    showCounter: {
      control: 'boolean',
      description: 'Show character counter',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show password visibility toggle (for password inputs)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Input takes full width',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value for uncontrolled input',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic text input with placeholder.
 */
export const Basic: Story = {
  args: {
    placeholder: 'Enter text here',
    type: 'text',
  },
};

/**
 * Input using defaultValue for uncontrolled component pattern.
 */
export const Uncontrolled: Story = {
  args: {
    defaultValue: 'Initial value',
    placeholder: 'Type something...',
  },
};

/**
 * Showcase of all input sizes (small, medium, large).
 */
export const Sizes: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

/**
 * Showcase of different input types (text, email, password, number, search, tel, url).
 */
export const Types: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
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

/**
 * Showcase of input color variants (primary, success, error, warning, info).
 */
export const Variants: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input variant="primary" placeholder="Primary input" />
      <Input variant="success" placeholder="Success input" />
      <Input variant="error" placeholder="Error input" />
      <Input variant="warning" placeholder="Warning input" />
      <Input variant="info" placeholder="Info input" />
    </div>
  ),
};

/**
 * Showcase of input states (default, disabled, valid, invalid).
 */
export const States: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Valid input" valid />
      <Input placeholder="Invalid input" invalid />
    </div>
  ),
};

/**
 * Input with prefix and suffix icons for enhanced UX.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input placeholder="Search..." prefixIcon={<MagnifyingGlass size={18} />} />
      <Input placeholder="Email address" type="email" prefixIcon={<Envelope size={18} />} />
      <Input
        placeholder="Username"
        prefixIcon={<User size={18} />}
        suffixIcon={<span style={{ color: 'green' }}>✓</span>}
      />
      <Input placeholder="Phone number" type="tel" prefixIcon={<Phone size={18} />} />
    </div>
  ),
};

/**
 * Input with clear button that appears when there's a value.
 */
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Input
          placeholder="Type to see clear button"
          value={value}
          onChange={e => setValue(e.target.value)}
          clearable
        />
        <Input
          placeholder="With prefix icon"
          prefixIcon={<MagnifyingGlass size={18} />}
          value={value}
          onChange={e => setValue(e.target.value)}
          clearable
        />
      </div>
    );
  },
};

/**
 * Input with character counter showing remaining characters.
 */
export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Input
          placeholder="Type here (max 50 characters)"
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={50}
          showCounter
        />
        <Input
          placeholder="With custom max count"
          value={value}
          onChange={e => setValue(e.target.value)}
          maxCount={100}
          showCounter
        />
      </div>
    );
  },
};

/**
 * Password input with visibility toggle button.
 */
export const PasswordToggle: Story = {
  render: () => {
    const [password, setPassword] = React.useState('');
    return (
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          showPasswordToggle
        />
        <Input
          type="password"
          placeholder="Password with prefix icon"
          prefixIcon={<Lock size={18} />}
          value={password}
          onChange={e => setPassword(e.target.value)}
          showPasswordToggle
        />
      </div>
    );
  },
};

/**
 * Input with error messages and helper text for validation feedback.
 */
export const WithMessages: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const isValidEmail = email.includes('@') && email.includes('.');
    const isInvalidEmail = email.length > 0 && !isValidEmail;

    return (
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          invalid={isInvalidEmail}
          errorMessage={isInvalidEmail ? 'Please enter a valid email address' : undefined}
          helperText={!isInvalidEmail ? "We'll never share your email" : undefined}
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          helperText="Choose a unique username"
        />
        <Input placeholder="Required field" required helperText="This field is required" />
      </div>
    );
  },
};

/**
 * Full-width input that takes the full width of its container.
 */
export const FullWidth: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '100%', maxWidth: '500px' }}>
      <Input placeholder="Full width input" fullWidth />
      <Input
        placeholder="Full width with icon"
        prefixIcon={<MagnifyingGlass size={18} />}
        fullWidth
      />
    </div>
  ),
};

/**
 * Comprehensive example showcasing multiple input features together.
 */
export const Comprehensive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive example demonstrating multiple input features including icons, clearable functionality, password toggle, character counter, and helper text in a form-like layout.',
      },
    },
  },
  render: () => {
    const [search, setSearch] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [bio, setBio] = React.useState('');

    return (
      <div className="u-flex u-flex-column u-gap-4" style={{ width: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Search</label>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            prefixIcon={<MagnifyingGlass size={18} />}
            clearable
            fullWidth
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            prefixIcon={<Lock size={18} />}
            showPasswordToggle
            fullWidth
            helperText="Must be at least 8 characters"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Bio</label>
          <Input
            placeholder="Tell us about yourself"
            value={bio}
            onChange={e => setBio(e.target.value)}
            maxLength={200}
            showCounter
            fullWidth
            helperText="Maximum 200 characters"
          />
        </div>
      </div>
    );
  },
};

/**
 * Input with glass morphism effect enabled.
 */
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
      <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
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
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  ),
};

/**
 * Comprehensive showcase of glass morphism effects on inputs.
 */
export const GlassShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates glass morphism effects on inputs with different modes and configurations, showing how inputs look over colorful backgrounds.',
      },
    },
  },
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
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>
          Glass Input on Background
        </h3>
        <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
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
        <div className="u-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
          <Input placeholder="Standard Mode" glass={{ mode: 'standard' }} />
          <Input placeholder="Polar Mode" glass={{ mode: 'polar' }} />
          <Input placeholder="Prominent Mode" glass={{ mode: 'prominent' }} />
          <Input placeholder="Shader Mode" glass={{ mode: 'shader' }} />
        </div>
      </div>
    </div>
  ),
};
