/**
 * ModalExamples.stories.tsx
 *
 * Modal, dialog, and overlay examples for AtomixGlass.
 * Perfect for notifications, confirmations, and interactive dialogs.
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
import { Badge } from '../../Badge';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Modal Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal and dialog examples demonstrating AtomixGlass for overlays, notifications, and interactive dialogs.',
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
 * Confirmation Dialog
 *
 * Modal dialog for confirming important actions like deletions.
 */
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
      return (
        <StoryErrorBoundary>
          <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.5}>
            <div className="u-text-center u-text-white">
              <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
                Open Confirmation Dialog
              </Button>
            </div>
          </BackgroundWrapper>
        </StoryErrorBoundary>
      );
    }

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.5}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '20px',
            }}
          >
            <AtomixGlass
              displacementScale={70}
              blurAmount={1}
              saturation={140}
              borderRadius={24}
              mode="standard"
              style={{ maxWidth: '440px', width: '100%' }}
              padding="40px"
            >
              <div className="u-text-center u-text-white">
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    margin: '0 auto 24px',
                  }}
                  aria-hidden="true"
                >
                  ⚠️
                </div>
                
                <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-2">
                  Delete Account?
                </h2>
                <p className="u-text-sm u-opacity-90 u-mb-5" style={{ lineHeight: 1.6 }}>
                  Are you sure you want to delete your account? This action cannot be undone 
                  and all your data will be permanently removed.
                </p>
                
                <div className="u-flex u-gap-3 u-justify-center" style={{ gap: '12px' }}>
                  <Button
                    variant="outline-light"
                    glass={{ elasticity: 0 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    glass={{ elasticity: 0 }}
                    onClick={() => {
                      setIsOpen(false);
                      alert('Account deleted');
                    }}
                  >
                    Delete Account
                  </Button>
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
          'Confirmation dialog modal for critical actions with cancel and confirm buttons.',
      },
    },
  },
};

/**
 * Success Notification
 *
 * Toast-style notification for success messages.
 */
export const SuccessNotification: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <StoryErrorBoundary>
          <BackgroundWrapper backgroundImage={backgroundImages[2]}>
            <div className="u-text-center">
              <Button variant="primary" size="lg" onClick={() => setIsVisible(true)}>
                Show Success Notification
              </Button>
            </div>
          </BackgroundWrapper>
        </StoryErrorBoundary>
      );
    }

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[2]}>
          <div
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 1000,
            }}
          >
            <AtomixGlass
              displacementScale={50}
              blurAmount={0.5}
              saturation={130}
              borderRadius={16}
              mode="standard"
              style={{ minWidth: '320px' }}
              padding="20px"
            >
              <div className="u-flex u-items-center u-gap-3 u-text-white">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✓
                </div>
                
                <div className="u-flex-1">
                  <p className="u-m-0 u-font-semibold u-text-sm">Payment Successful!</p>
                  <p className="u-m-0 u-text-xs u-opacity-80">
                    Your transaction has been completed.
                  </p>
                </div>
                
                <button
                  onClick={() => setIsVisible(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    padding: '4px',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                  aria-label="Close notification"
                >
                  ×
                </button>
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
          'Success notification toast with auto-dismiss capability and close button.',
      },
    },
  },
};

/**
 * Settings Modal
 *
 * Modal dialog for displaying settings and preferences.
 */
export const SettingsModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    if (!isOpen) {
      return (
        <StoryErrorBoundary>
          <BackgroundWrapper backgroundImage={backgroundImages[4]}>
            <div className="u-text-center u-text-white">
              <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
                Open Settings
              </Button>
            </div>
          </BackgroundWrapper>
        </StoryErrorBoundary>
      );
    }

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[4]} overlay overlayOpacity={0.5}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '20px',
            }}
          >
            <AtomixGlass
              displacementScale={65}
              blurAmount={0.75}
              saturation={135}
              borderRadius={24}
              mode="standard"
              style={{ maxWidth: '500px', width: '100%' }}
            >
              <div className="u-text-white" style={{ padding: '32px' }}>
                <div className="u-flex u-items-center u-justify-between u-mb-4">
                  <h2 className="u-m-0 u-text-2xl u-font-bold">Settings</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      padding: '8px',
                      fontSize: '24px',
                      lineHeight: 1,
                    }}
                    aria-label="Close settings"
                  >
                    ×
                  </button>
                </div>
                
                <div className="u-divide-y" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  {/* Notifications Setting */}
                  <div className="u-py-3 u-flex u-items-center u-justify-between">
                    <div>
                      <p className="u-m-0 u-font-medium u-text-base">Push Notifications</p>
                      <p className="u-m-0 u-text-xs u-opacity-70 u-mt-1">
                        Receive updates and alerts
                      </p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        style={{ accentColor: '#667eea', width: '20px', height: '20px' }}
                      />
                    </label>
                  </div>
                  
                  {/* Dark Mode Setting */}
                  <div className="u-py-3 u-flex u-items-center u-justify-between">
                    <div>
                      <p className="u-m-0 u-font-medium u-text-base">Dark Mode</p>
                      <p className="u-m-0 u-text-xs u-opacity-70 u-mt-1">
                        Use dark theme across the app
                      </p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        style={{ accentColor: '#667eea', width: '20px', height: '20px' }}
                      />
                    </label>
                  </div>
                  
                  {/* Auto Save Setting */}
                  <div className="u-py-3 u-flex u-items-center u-justify-between">
                    <div>
                      <p className="u-m-0 u-font-medium u-text-base">Auto-Save</p>
                      <p className="u-m-0 u-text-xs u-opacity-70 u-mt-1">
                        Automatically save your work
                      </p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={autoSave}
                        onChange={(e) => setAutoSave(e.target.checked)}
                        style={{ accentColor: '#667eea', width: '20px', height: '20px' }}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="u-flex u-gap-3 u-justify-end u-mt-5" style={{ gap: '12px' }}>
                  <Button
                    variant="outline-light"
                    glass={{ elasticity: 0 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    glass={{ elasticity: 0 }}
                    onClick={() => setIsOpen(false)}
                  >
                    Save Changes
                  </Button>
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
          'Settings modal with toggle switches for user preferences and configuration options.',
      },
    },
  },
};
