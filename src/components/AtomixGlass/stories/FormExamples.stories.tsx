/**
 * FormExamples.stories.tsx
 *
 * Form-based examples for AtomixGlass including login, registration, 
 * payment, and subscription forms.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';

import { Button } from '../../Button';
import { Input } from '../../Form/Input';
import { Badge } from '../../Badge';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Form Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form-based examples demonstrating AtomixGlass for authentication, payment, and data input interfaces.',
      },
    },
  },
  tags: ['!autodocs'],
  argTypes: {
    ...baseArgTypes,
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Login Form
 *
 * Modern authentication form with email/password inputs, social login options, and loading states.
 */
export const LoginForm: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper
          backgroundImage={backgroundImages[3]}
          overlay
          overlayOpacity={0.3}
        >
          <div style={{ maxWidth: '380px' }} className="u-mx-auto">
            <AtomixGlass
              displacementScale={50}
              blurAmount={1}
              saturation={130}
              aberrationIntensity={2}
              borderRadius={24}
              mode="standard"
              padding="32px"
            >
              <div className="u-text-white">
                {/* Logo/Header */}
                <div className="u-text-center u-mb-5">
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      margin: '0 auto 24px',
                      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                      position: 'relative',
                    }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        opacity: 0.4,
                        filter: 'blur(16px)',
                      }}
                    />
                    <span role="img" aria-label="Lock icon" style={{ position: 'relative', zIndex: 1 }}>
                      🔒
                    </span>
                  </div>
                  <h2
                    className="u-m-0 u-mb-2 u-text-3 u-font-bold"
                    style={{
                      fontSize: '32px',
                      marginBottom: '12px',
                      background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Welcome Back
                  </h2>
                  <p className="u-m-0 u-opacity-70 u-text-7" style={{ fontSize: '15px' }}>
                    Sign in to continue to your account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="u-mb-3">
                    <label className="u-block u-text-7 u-font-semibold u-mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      glass={{ elasticity: 0 }}
                    />
                  </div>

                  <div className="u-mb-3">
                    <label className="u-block u-text-7 u-font-semibold u-mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      glass={{ elasticity: 0 }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ accentColor: '#667eea' }}
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      style={{
                        fontSize: '12px',
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                    glass={{ elasticity: 0 }}
                    className="u-block u-w-100"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* Social Login */}
                <div style={{ marginTop: '20px' }}>
                  <div
                    style={{
                      position: 'relative',
                      textAlign: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <span
                      style={{
                        position: 'relative',
                        padding: '0 16px',
                        background: 'inherit',
                        fontSize: '12px',
                        opacity: 0.6,
                      }}
                    >
                      Or continue with
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span aria-hidden="true">🔵</span> Google
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span aria-hidden="true">⚫</span> GitHub
                    </button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px' }}>
                  Don't have an account?{' '}
                  <a
                    href="#"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Modern login form with email/password inputs, remember me functionality, social login options, and loading states.',
      },
    },
  },
};

/**
 * Newsletter Subscription Form
 *
 * Clean subscription form with email validation and success states.
 */
export const NewsletterSubscription: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubscribed(true);
    };

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[6]} overlay overlayOpacity={0.4}>
          <div style={{ maxWidth: '420px' }} className="u-mx-auto">
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.75}
              saturation={140}
              borderRadius={24}
              mode="standard"
              padding="40px"
            >
              <div className="u-text-center u-text-white">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'rgba(167, 139, 250, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    margin: '0 auto 24px',
                  }}
                  aria-hidden="true"
                >
                  📧
                </div>
                
                {!subscribed ? (
                  <>
                    <h3 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                      Subscribe to Our Newsletter
                    </h3>
                    <p
                      className="u-text-sm u-opacity-90 u-mb-5"
                      style={{ lineHeight: 1.6 }}
                    >
                      Get the latest updates, articles, and resources sent to your inbox weekly.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="u-mb-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          glass={{ elasticity: 0 }}
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        glass={{ elasticity: 0 }}
                        className="u-block u-w-100"
                        size="lg"
                      >
                        Subscribe Now
                      </Button>
                    </form>
                    
                    <p className="u-text-xs u-opacity-70 u-mt-4">
                      No spam. Unsubscribe at any time.
                    </p>
                  </>
                ) : (
                  <div className="u-py-4">
                    <Badge variant="success" size="lg" className="u-mb-3">
                      ✓ Successfully Subscribed!
                    </Badge>
                    <p className="u-text-lg u-font-medium u-mb-2">
                      Thank you for subscribing!
                    </p>
                    <p className="u-text-sm u-opacity-80">
                      Please check your inbox to confirm your subscription.
                    </p>
                    <Button
                      variant="outline-light"
                      glass={{ elasticity: 0 }}
                      onClick={() => {
                        setSubscribed(false);
                        setEmail('');
                      }}
                      className="u-mt-4"
                    >
                      Subscribe Another Email
                    </Button>
                  </div>
                )}
              </div>
            </AtomixGlass>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Newsletter subscription form with email validation, success state, and confirmation message.',
      },
    },
  },
};
