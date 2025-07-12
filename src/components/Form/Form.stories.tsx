import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from './Form';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Textarea } from './Textarea';

// Overriding the args to make children optional since we're providing it in render
type FormWithOptionalChildren = Omit<React.ComponentProps<typeof Form>, 'children'> & {
  children?: React.ReactNode;
};

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the form is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    method: {
      control: { type: 'select' },
      options: ['get', 'post'],
      description: 'Form submission method',
    },
    noValidate: {
      control: 'boolean',
      description: 'Whether to disable browser validation',
    },
    autoComplete: {
      control: 'text',
      description: 'Form autocomplete setting',
    },
  },
} satisfies Meta<FormWithOptionalChildren>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form
export const Basic: Story = {
  args: { children: undefined },
  render: args => (
    <Form {...args}>
      <FormGroup label="Name" htmlFor="name">
        <Input id="name" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup label="Email" htmlFor="email">
        <Input type="email" id="email" placeholder="Enter your email" />
      </FormGroup>
      <button type="submit" className="c-btn c-btn--primary">
        Submit
      </button>
    </Form>
  ),
};

// Complete form with all input types
export const CompleteForm: Story = {
  args: { children: undefined },
  render: () => (
    <div style={{ width: '500px' }}>
      <Form>
        <h2 className="u-mb-4">Registration Form</h2>

        <FormGroup label="Full Name" htmlFor="fullName" required>
          <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
        </FormGroup>

        <FormGroup label="Email Address" htmlFor="email" required>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password" required>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            required
          />
        </FormGroup>

        <FormGroup label="Country" htmlFor="country">
          <Select
            id="country"
            name="country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'mx', label: 'Mexico' },
              { value: 'uk', label: 'United Kingdom' },
            ]}
            placeholder="Select your country"
          />
        </FormGroup>

        <FormGroup label="About yourself" htmlFor="bio">
          <Textarea id="bio" name="bio" placeholder="Tell us about yourself" rows={4} />
        </FormGroup>

        <FormGroup>
          <Checkbox id="terms" name="terms" label="I agree to the Terms and Conditions" required />
        </FormGroup>

        <FormGroup label="Preferred contact method">
          <div className="u-d-flex u-flex-column u-gap-2">
            <Radio id="contact-email" name="contactMethod" value="email" label="Email" checked />
            <Radio id="contact-phone" name="contactMethod" value="phone" label="Phone" />
            <Radio id="contact-mail" name="contactMethod" value="mail" label="Mail" />
          </div>
        </FormGroup>

        <div className="u-d-flex u-gap-3 u-mt-4">
          <button type="submit" className="c-btn c-btn--primary">
            Register
          </button>
          <button type="reset" className="c-btn c-btn--outline-secondary">
            Reset
          </button>
        </div>
      </Form>
    </div>
  ),
};

// Interactive form
export const Interactive: Story = {
  args: { children: undefined },
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      message: '',
      agree: false,
    });

    const [errors, setErrors] = useState({
      username: false,
      email: false,
      message: false,
      agree: false,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));

      // Clear error on change
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({
          ...prev,
          [name]: false,
        }));
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate
      const newErrors = {
        username: !formData.username,
        email: !formData.email || !/^\S+@\S+\.\S+$/.test(formData.email),
        message: !formData.message,
        agree: !formData.agree,
      };

      setErrors(newErrors);

      // Check if any errors
      if (Object.values(newErrors).some(error => error)) {
        return;
      }

      // Form is valid
      setSubmitted(true);
    };

    if (submitted) {
      return (
        <div className="u-p-4 u-border u-border-success u-rounded u-bg-success-subtle">
          <h3>Thank you for your submission!</h3>
          <p>We received your message and will get back to you shortly.</p>
          <button
            className="c-btn c-btn--outline-primary u-mt-3"
            onClick={() => {
              setFormData({
                username: '',
                email: '',
                message: '',
                agree: false,
              });
              setErrors({
                username: false,
                email: false,
                message: false,
                agree: false,
              });
              setSubmitted(false);
            }}
          >
            Send another message
          </button>
        </div>
      );
    }

    return (
      <div style={{ width: '500px' }}>
        <Form onSubmit={handleSubmit}>
          <h2 className="u-mb-4">Contact Us</h2>

          <FormGroup
            label="Username"
            htmlFor="username"
            required
            invalid={errors.username}
            helperText={errors.username ? 'Username is required' : ''}
          >
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              invalid={errors.username}
            />
          </FormGroup>

          <FormGroup
            label="Email"
            htmlFor="email"
            required
            invalid={errors.email}
            helperText={errors.email ? 'Please enter a valid email address' : ''}
          >
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              invalid={errors.email}
            />
          </FormGroup>

          <FormGroup
            label="Message"
            htmlFor="message"
            required
            invalid={errors.message}
            helperText={errors.message ? 'Message is required' : ''}
          >
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={4}
              invalid={errors.message}
            />
          </FormGroup>

          <FormGroup
            invalid={errors.agree}
            helperText={errors.agree ? 'You must agree to the terms' : ''}
          >
            <Checkbox
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              label="I agree to the terms and conditions"
              invalid={errors.agree}
            />
          </FormGroup>

          <div className="u-d-flex u-gap-3 u-mt-4">
            <button type="submit" className="c-btn c-btn--primary">
              Submit
            </button>
            <button
              type="button"
              className="c-btn c-btn--outline-secondary"
              onClick={() => {
                setFormData({
                  username: '',
                  email: '',
                  message: '',
                  agree: false,
                });
                setErrors({
                  username: false,
                  email: false,
                  message: false,
                  agree: false,
                });
              }}
            >
              Clear
            </button>
          </div>
        </Form>
      </div>
    );
  },
};

// Disabled form
export const Disabled: Story = {
  args: {
    disabled: true,
    children: undefined,
  },
  render: args => (
    <Form {...args}>
      <FormGroup label="Name" htmlFor="name-disabled">
        <Input id="name-disabled" placeholder="Enter your name" disabled />
      </FormGroup>
      <FormGroup label="Email" htmlFor="email-disabled">
        <Input type="email" id="email-disabled" placeholder="Enter your email" disabled />
      </FormGroup>
      <FormGroup label="Country" htmlFor="country-disabled">
        <Select
          id="country-disabled"
          name="country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
          ]}
          placeholder="Select your country"
          disabled
        />
      </FormGroup>
      <FormGroup>
        <Checkbox
          id="terms-disabled"
          name="terms"
          label="I agree to the Terms and Conditions"
          disabled
        />
      </FormGroup>
      <button type="submit" className="c-btn c-btn--primary" disabled>
        Submit
      </button>
    </Form>
  ),
};

// Form with validation states
export const ValidationStates: Story = {
  args: { children: undefined },
  render: () => (
    <div style={{ width: '500px' }}>
      <Form>
        <h2 className="u-mb-4">Form Validation</h2>

        <FormGroup
          label="Valid Input"
          htmlFor="valid-input"
          valid={true}
          helperText="This input is valid"
        >
          <Input id="valid-input" value="John Doe" valid={true} />
        </FormGroup>

        <FormGroup
          label="Invalid Input"
          htmlFor="invalid-input"
          invalid={true}
          helperText="This input is invalid"
        >
          <Input id="invalid-input" value="test" invalid={true} />
        </FormGroup>

        <FormGroup
          label="Valid Select"
          htmlFor="valid-select"
          valid={true}
          helperText="This select is valid"
        >
          <Select
            id="valid-select"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
            ]}
            value="us"
            valid={true}
          />
        </FormGroup>

        <FormGroup
          label="Invalid Select"
          htmlFor="invalid-select"
          invalid={true}
          helperText="This select is invalid"
        >
          <Select
            id="invalid-select"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
            ]}
            invalid={true}
          />
        </FormGroup>

        <FormGroup valid={true} helperText="This checkbox is valid">
          <Checkbox id="valid-checkbox" label="Valid Checkbox" checked={true} onChange={() => {}} valid={true} />
        </FormGroup>

        <FormGroup invalid={true} helperText="This checkbox is invalid">
          <Checkbox id="invalid-checkbox" label="Invalid Checkbox" invalid={true} />
        </FormGroup>
      </Form>
    </div>
  ),
};

// Different form input sizes
export const InputSizes: Story = {
  args: { children: undefined },
  render: () => (
    <div style={{ width: '500px' }}>
      <Form>
        <h2 className="u-mb-4">Input Sizes</h2>

        <FormGroup label="Small Input" htmlFor="small-input" size="sm">
          <Input id="small-input" placeholder="Small input" size="sm" />
        </FormGroup>

        <FormGroup label="Medium Input (Default)" htmlFor="medium-input">
          <Input id="medium-input" placeholder="Medium input" />
        </FormGroup>

        <FormGroup label="Large Input" htmlFor="large-input" size="lg">
          <Input id="large-input" placeholder="Large input" size="lg" />
        </FormGroup>

        <FormGroup label="Small Select" htmlFor="small-select" size="sm">
          <Select
            id="small-select"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
            ]}
            placeholder="Small select"
            size="sm"
          />
        </FormGroup>

        <FormGroup label="Large Select" htmlFor="large-select" size="lg">
          <Select
            id="large-select"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
            ]}
            placeholder="Large select"
            size="lg"
          />
        </FormGroup>
      </Form>
    </div>
  ),
};
