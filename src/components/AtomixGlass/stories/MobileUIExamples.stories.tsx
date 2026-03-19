/**
 * MobileUIExamples.stories.tsx
 *
 * Mobile-specific UI examples for AtomixGlass including phone frames,
 * mobile navigation, and responsive layouts.
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

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Mobile UI Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile-specific UI examples demonstrating AtomixGlass for smartphone interfaces, mobile navigation, and responsive designs.',
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
 * Mobile App Interface
 *
 * Complete mobile app interface with phone frame, header, content, and tab bar.
 */
export const MobileAppInterface: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[5]} overlay overlayOpacity={0.3}>
          {/* Phone Frame */}
          <div
            style={{
              width: '375px',
              height: '812px',
              borderRadius: '40px',
              padding: '12px',
              background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
            }}
            role="img"
            aria-label="Mobile phone frame"
          >
            {/* Phone Notch */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '30px',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                background: '#000',
                zIndex: 100,
              }}
              aria-hidden="true"
            />

            {/* Screen */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                borderRadius={32}
                mode="standard"
                style={{ height: '100%' }}
              >
                <div className="u-text-white" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Status Bar */}
                  <div
                    style={{
                      padding: '44px 20px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <span>9:41</span>
                    <div className="u-flex u-items-center u-gap-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Header */}
                  <div
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <h1 className="u-m-0 u-text-2xl u-font-bold">Home</h1>
                    <p className="u-m-0 u-text-sm u-opacity-70">Welcome back!</p>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    {activeTab === 'home' && (
                      <>
                        {/* Profile Card */}
                        <AtomixGlass
                          displacementScale={50}
                          blurAmount={0.5}
                          borderRadius={20}
                          mode="standard"
                          padding="20px"
                          className="u-mb-3"
                        >
                          <div className="u-flex u-items-center u-gap-3">
                            <div
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                              }}
                              aria-hidden="true"
                            >
                              👤
                            </div>
                            <div className="u-flex-1">
                              <p className="u-m-0 u-font-semibold">John Doe</p>
                              <p className="u-m-0 u-text-xs u-opacity-70">Premium Member</p>
                            </div>
                            <Badge variant="primary">Pro</Badge>
                          </div>
                        </AtomixGlass>

                        {/* Stats Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '12px',
                            marginBottom: '16px',
                          }}
                        >
                          {[
                            { label: 'Balance', value: '$2,450', icon: '💰' },
                            { label: 'Points', value: '1,200', icon: '⭐' },
                          ].map((stat, index) => (
                            <AtomixGlass
                              key={index}
                              displacementScale={40}
                              blurAmount={0.4}
                              borderRadius={16}
                              mode="standard"
                              padding="16px"
                            >
                              <div className="u-text-center">
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                                <p className="u-m-0 u-text-lg u-font-bold">{stat.value}</p>
                                <p className="u-m-0 u-text-xs u-opacity-70">{stat.label}</p>
                              </div>
                            </AtomixGlass>
                          ))}
                        </div>

                        {/* Recent Activity */}
                        <AtomixGlass
                          displacementScale={45}
                          blurAmount={0.5}
                          borderRadius={20}
                          mode="standard"
                          padding="20px"
                        >
                          <h3 className="u-mt-0 u-text-base u-font-bold u-mb-3">Recent Activity</h3>
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="u-flex u-items-center u-gap-3 u-py-2"
                              style={{ borderBottom: item < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
                            >
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '10px',
                                  background: 'rgba(255,255,255,0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '18px',
                                }}
                                aria-hidden="true"
                              >
                                {item === 1 ? '📄' : item === 2 ? '🔔' : '💬'}
                              </div>
                              <div className="u-flex-1">
                                <p className="u-m-0 u-text-sm">
                                  {item === 1 ? 'Document created' : item === 2 ? 'New notification' : 'Message received'}
                                </p>
                                <p className="u-m-0 u-text-xs u-opacity-60">
                                  {item === 1 ? '5 min ago' : item === 2 ? '1 hour ago' : '3 hours ago'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </AtomixGlass>
                      </>
                    )}

                    {activeTab === 'search' && (
                      <div>
                        <AtomixGlass
                          displacementScale={50}
                          blurAmount={0.5}
                          borderRadius={16}
                          mode="standard"
                          padding="12px"
                          className="u-mb-3"
                        >
                          <div className="u-flex u-items-center u-gap-2">
                            <span style={{ fontSize: '20px' }}>🔍</span>
                            <input
                              type="text"
                              placeholder="Search..."
                              style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'white',
                                width: '100%',
                                fontSize: '14px',
                              }}
                            />
                          </div>
                        </AtomixGlass>

                        <div className="u-text-center u-opacity-70 u-mt-5">
                          <p>Start typing to search</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'profile' && (
                      <div className="u-text-center">
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px',
                            margin: '0 auto 16px',
                          }}
                          aria-label="Profile picture"
                        >
                          👤
                        </div>
                        <h2 className="u-m-0 u-text-xl u-font-bold">John Doe</h2>
                        <p className="u-m-0 u-text-sm u-opacity-70 u-mb-4">john@example.com</p>
                        <Button glass variant="primary" size="sm">Edit Profile</Button>
                      </div>
                    )}
                  </div>

                  {/* Tab Bar */}
                  <div
                    style={{
                      padding: '16px',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    {[
                      { id: 'home', icon: '🏠', label: 'Home' },
                      { id: 'search', icon: '🔍', label: 'Search' },
                      { id: 'profile', icon: '👤', label: 'Profile' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: activeTab === tab.id ? '#667eea' : 'rgba(255,255,255,0.5)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px',
                          fontSize: '20px',
                        }}
                        aria-label={tab.label}
                        aria-pressed={activeTab === tab.id}
                      >
                        <span>{tab.icon}</span>
                        <span style={{ fontSize: '10px' }}>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </AtomixGlass>
            </div>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete mobile app interface with realistic phone frame, status bar, header, scrollable content, and bottom tab navigation.',
      },
    },
  },
};

/**
 * Mobile Notification Card
 *
 * Push notification style card optimized for mobile displays.
 */
export const MobileNotification: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[4]} overlay overlayOpacity={0.4}>
        <div style={{ maxWidth: '340px' }}>
          <AtomixGlass
            displacementScale={50}
            blurAmount={0.75}
            saturation={130}
            borderRadius={20}
            mode="standard"
            padding="20px"
          >
            <div className="u-flex u-items-start u-gap-3 u-text-white">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                💬
              </div>
              <div className="u-flex-1">
                <div className="u-flex u-items-center u-justify-between u-mb-1">
                  <h3 className="u-m-0 u-text-sm u-font-semibold">New Message</h3>
                  <span className="u-text-xs u-opacity-60">2m ago</span>
                </div>
                <p className="u-m-0 u-text-sm u-opacity-90 u-mb-2">
                  Sarah sent you a message: "Hey! Are you free for a quick call?"
                </p>
                <div className="u-flex u-gap-2">
                  <Button glass size="sm" variant="primary">Reply</Button>
                  <Button glass size="sm" variant="outline-light">Dismiss</Button>
                </div>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Mobile push notification card with icon, title, message preview, timestamp, and action buttons.',
      },
    },
  },
};
