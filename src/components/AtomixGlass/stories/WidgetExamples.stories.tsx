/**
 * WidgetExamples.stories.tsx
 *
 * Interactive widget examples for AtomixGlass including music players,
 * chat interfaces, notifications, and utility widgets.
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
import { Input } from '../../Form/Input';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Widget Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive widget examples demonstrating AtomixGlass for media players, chat interfaces, and utility components.',
      },
    },
  },
  tags: ['!autodocs'],
  argTypes: {
    ...(baseArgTypes as any),
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Music Player Widget
 *
 * Premium music player interface with playback controls, progress tracking, and volume control.
 */
export const MusicPlayer: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(125);
    const [volume, setVolume] = useState(70);

    const totalDuration = 248;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[3]} overlay overlayOpacity={0.3}>
          <div style={{ maxWidth: '380px' }} className="u-mx-auto">
            <AtomixGlass
              displacementScale={55}
              blurAmount={3}
              borderRadius={28}
              mode="standard"
              padding="24px"
            >
              <div className="u-text-white">
                {/* Album Art */}
                <div
                  style={{
                    aspectRatio: '1:1',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                  }}
                  aria-label="Album art"
                >
                  🎵
                </div>

                {/* Track Info */}
                <div className="u-text-center u-mb-4">
                  <h2 className="u-m-0 u-mb-2 u-text-2xl u-font-bold">Summer Vibes</h2>
                  <p className="u-m-0 u-opacity-80 u-text-sm">The Atomix Band</p>
                </div>

                {/* Progress Bar */}
                <div className="u-mb-4">
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      setCurrentTime(Math.floor(totalDuration * percentage));
                    }}
                    role="slider"
                    aria-valuenow={currentTime}
                    aria-valuemin={0}
                    aria-valuemax={totalDuration}
                    tabIndex={0}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${(currentTime / totalDuration) * 100}%`,
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      fontSize: '13px',
                      opacity: 0.7,
                    }}
                  >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalDuration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                    }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                </div>

                {/* Volume Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px', opacity: 0.7 }} aria-hidden="true">
                    🔊
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    style={{
                      flex: 1,
                      accentColor: '#667eea',
                      cursor: 'pointer',
                    }}
                    aria-label="Volume"
                  />
                  <span style={{ fontSize: '14px', opacity: 0.7, minWidth: '35px' }}>
                    {volume}%
                  </span>
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
          'Music player widget with play/pause controls, progress bar, and volume slider in a premium glass interface.',
      },
    },
  },
};

/**
 * Chat Interface Widget
 *
 * Real-time chat interface with message history and input field.
 */
export const ChatInterface: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
      { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM' },
      { id: 2, text: "I'm doing great! Working on something cool.", sender: 'me', time: '10:32 AM' },
      { id: 3, text: 'Oh really? What is it?', sender: 'them', time: '10:33 AM' },
    ]);

    const handleSend = () => {
      if (!message.trim()) return;
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setMessage('');
    };

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[5]} overlay overlayOpacity={0.4}>
          <div style={{ maxWidth: '400px', height: '500px' }}>
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.75}
              saturation={140}
              borderRadius={24}
              mode="standard"
            >
              <div className="u-text-white" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div
                  style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}
                    aria-hidden="true"
                  >
                    💬
                  </div>
                  <div>
                    <h3 className="u-m-0 u-font-semibold">Chat</h3>
                    <p className="u-m-0 u-text-xs u-opacity-70">3 messages</p>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '12px 16px',
                          borderRadius: '16px',
                          background: msg.sender === 'me'
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'rgba(255,255,255,0.1)',
                          boxShadow: msg.sender === 'me' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                        }}
                      >
                        <p className="u-m-0 u-text-sm" style={{ lineHeight: 1.5 }}>{msg.text}</p>
                        <p className="u-m-0 u-text-xs u-opacity-60 u-mt-1" style={{ textAlign: 'right' }}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div
                  style={{
                    padding: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <div className="u-flex-1" onKeyDown={(e) => e.key === 'Enter' && handleSend()}>
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      glass={{ elasticity: 0 }}
                      className="u-w-100"
                    />
                  </div>
                  <Button
                    variant="primary"
                    glass={{ elasticity: 0 }}
                    onClick={handleSend}
                    disabled={!message.trim()}
                  >
                    Send
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
          'Real-time chat interface with message history, timestamps, and live input for modern messaging applications.',
      },
    },
  },
};

/**
 * Notification Center Widget
 *
 * Centralized notification panel with multiple notification types.
 */
export const NotificationCenter: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, type: 'success', title: 'Payment Received', message: '$250.00 from John Doe', time: '2m ago' },
      { id: 2, type: 'warning', title: 'Storage Almost Full', message: '85% of your storage is used', time: '1h ago' },
      { id: 3, type: 'info', title: 'New Feature Available', message: 'Check out the latest updates', time: '3h ago' },
    ]);

    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'success': return '✅';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
        default: return '📢';
      }
    };

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.4}>
          <div style={{ maxWidth: '420px' }}>
            <AtomixGlass
              displacementScale={65}
              blurAmount={0.75}
              saturation={140}
              borderRadius={24}
              mode="standard"
            >
              <div className="u-text-white" style={{ padding: '24px' }}>
                <div className="u-flex u-items-center u-justify-between u-mb-4">
                  <h2 className="u-m-0 u-text-xl u-font-bold">Notifications</h2>
                  <Badge variant="primary" label={notifications.length.toString()} />
                </div>

                <div className="u-divide-y" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="u-py-3 u-flex u-gap-3"
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          fontSize: '24px',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="u-flex-1">
                        <p className="u-m-0 u-font-semibold u-text-sm">{notification.title}</p>
                        <p className="u-m-0 u-text-xs u-opacity-80 u-mt-1">{notification.message}</p>
                      </div>
                      <span className="u-text-xs u-opacity-60">{notification.time}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline-light"
                  glass={{ elasticity: 0 }}
                  size="sm"
                  className="u-block u-w-full u-mt-4"
                >
                  Mark All as Read
                </Button>
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
          'Notification center panel displaying success, warning, and info notifications with timestamps.',
      },
    },
  },
};
