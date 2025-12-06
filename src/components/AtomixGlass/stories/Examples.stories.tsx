/**
 * Examples.stories.tsx
 *
 * Real-world usage examples for the AtomixGlass component.
 * These stories demonstrate practical applications and design patterns.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgrounds, backgroundImages } from './shared-components';

import { Button } from '../../Button';
import { Badge } from '../../Badge';
import { Callout } from '../../Callout';
import { Input } from '../../Form/Input';
import { Container, Grid, GridCol } from '../../../layouts/Grid';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Real-world examples showing how to use AtomixGlass in different design contexts and applications.',
      },
    },
  },
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Hero section example
 *
 * Demonstrates how to use AtomixGlass in a hero section for landing pages.
 */
export const HeroExample: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage={
        'https://images.unsplash.com/photo-1656164596804-21df1d21b870?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132'
      }
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <AtomixGlass
            displacementScale={100}
            blurAmount={1}
            cornerRadius={30}
            mode="shader"
            shaderVariant="premiumGlass"
            style={{ maxWidth: '900px' }}
            onClick={() => {}}
          >
            <div className="u-p-6 u-text-white" style={{ padding: '48px 40px', textAlign: 'center' }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  margin: '0 auto 32px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  boxShadow: '0 16px 40px rgba(102, 126, 234, 0.5)',
                }}
              >
                ✨
              </div>
              <h1
                className="u-mt-0 u-fs-1 u-fw-bold"
                style={{
                  fontSize: '48px',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-1px',
                }}
              >
                Modern Glass UI
              </h1>
              <p
                className="u-fs-4 u-mb-4"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '600px',
                  margin: '0 auto 32px',
                }}
              >
                Create stunning interfaces with the AtomixGlass component. Perfect for modern, sleek
                designs that stand out.
              </p>
              <div
                className="u-d-flex u-gap-3 u-justify-content-center u-flex-wrap"
                style={{ gap: '16px' }}
              >
                <Button glass size="lg">
                  Get Started
                </Button>
                <Button glass variant={'light'} size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </AtomixGlass>
        </div>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A hero section example demonstrating how to use AtomixGlass for landing page headers with call-to-action buttons.',
      },
    },
  },
};

/**
 * Video Background Example
 *
 * Demonstrates the glass effect over a moving video background.
 */
export const VideoBackground: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [glassSettings, setGlassSettings] = useState({
      displacementScale: 80,
      blurAmount: 0,
      saturation: 150,
      aberrationIntensity: 0,
      cornerRadius: 24,
      mode: 'standard' as const,
    });

    const updateSettings = (property: string, value: any) => {
      setGlassSettings(prev => ({
        ...prev,
        [property]: value,
      }));
    };

    return (
      <div style={{ position: 'relative', height: '80vh', width: '90vw', overflow: 'hidden' }}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={backgrounds.videoBackground} type="video/mp4" />
        </video>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '40px',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Main Glass Card */}
          <AtomixGlass
            displacementScale={glassSettings.displacementScale}
            blurAmount={glassSettings.blurAmount}
            saturation={glassSettings.saturation}
            aberrationIntensity={glassSettings.aberrationIntensity}
            cornerRadius={glassSettings.cornerRadius}
            mode={glassSettings.mode}
            style={{ width: '400px', maxWidth: '100%' }}
          >
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <h2 style={{ marginTop: 0, fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>
                Glass Over Video
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.9 }}>
                Experience the stunning glass morphism effect overlaid on dynamic video content. The
                glass element creates a sophisticated focal point while maintaining visual harmony
                with the moving background.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline">Learn More</button>
              </div>
            </div>
          </AtomixGlass>

          {/* Side Control Panel */}
          <AtomixGlass
            displacementScale={40}
            blurAmount={0.06}
            saturation={120}
            aberrationIntensity={1.5}
            cornerRadius={16}
            mode="standard"
            style={{ width: '300px', maxWidth: '100%' }}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '20px' }}>
                Live Controls
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Displacement: {glassSettings.displacementScale}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={glassSettings.displacementScale}
                  onChange={e => updateSettings('displacementScale', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Blur: {glassSettings.blurAmount}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={glassSettings.blurAmount}
                  onChange={e => updateSettings('blurAmount', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Saturation: {glassSettings.saturation}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={glassSettings.saturation}
                  onChange={e => updateSettings('saturation', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Aberration: {glassSettings.aberrationIntensity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={glassSettings.aberrationIntensity}
                  onChange={e => updateSettings('aberrationIntensity', parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
                  Corner Radius: {glassSettings.cornerRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glassSettings.cornerRadius}
                  onChange={e => updateSettings('cornerRadius', parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>

              <button
                className="c-btn c-btn--secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setGlassSettings({
                    displacementScale: 80,
                    blurAmount: 0.08,
                    saturation: 150,
                    aberrationIntensity: 2.5,
                    cornerRadius: 24,
                    mode: 'standard',
                  });
                }}
              >
                Reset Defaults
              </button>
            </div>
          </AtomixGlass>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases the AtomixGlass component over a dynamic video background, demonstrating how the glass effect creates stunning visual hierarchy and focus over moving content. Use the live controls to experiment with different settings and see how they affect the glass appearance in real-time.',
      },
    },
  },
};

/**
 * Dashboard Cards Example
 *
 * Shows how to use AtomixGlass for modern dashboard UI elements with metrics and data visualization.
 */
export const DashboardCards: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const stats = [
      {
        title: 'Total Revenue',
        value: '$124,563',
        change: '+12.5%',
        trend: 'up',
        icon: '💰',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        title: 'Active Users',
        value: '8,459',
        change: '+23.1%',
        trend: 'up',
        icon: '👥',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        title: 'Conversion Rate',
        value: '3.24%',
        change: '-2.4%',
        trend: 'down',
        icon: '📊',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      {
        title: 'Avg. Session',
        value: '4m 32s',
        change: '+8.3%',
        trend: 'up',
        icon: '⏱️',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      },
    ];
    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1614188973043-4ed7d383de37?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470'
        }
        height="90vh"
        style={{ padding: '40px' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
          <AtomixGlass
            displacementScale={30}
            blurAmount={5}
            saturation={140}
            cornerRadius={20}
            mode="standard"
            padding="24px 32px"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                }}
              >
                📊
              </div>
              <div>
                <h1
                  className="u-m-0 u-fs-2 u-fw-bold"
                  style={{
                    fontSize: '28px',
                    marginBottom: '6px',
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Analytics Dashboard
                </h1>
                <p
                  className="u-m-0 u-opacity-80 u-fs-6"
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  Real-time performance metrics and insights
                </p>
              </div>
            </div>
          </AtomixGlass>

          <Grid className="u-mt-10">
            {stats.map((stat, index) => (
              <GridCol md={6} className="u-mb-4">
                <div
                  key={index}
                  style={{
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setSelectedCard(index)}
                  onMouseLeave={() => setSelectedCard(null)}
                >
                  <AtomixGlass
                    displacementScale={selectedCard === index ? 50 : 35}
                    blurAmount={selectedCard === index ? 1.5 : 1}
                    saturation={selectedCard === index ? 132 : 130}
                    aberrationIntensity={selectedCard === index ? 2 : 1}
                    cornerRadius={16}
                    mode="standard"
                  >
                    <div className="u-p-4">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '16px',
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                          }}
                        >
                          {stat.icon}
                        </div>
                        <div
                          style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background:
                              stat.trend === 'up'
                                ? 'rgba(16, 185, 129, 0.2)'
                                : 'rgba(239, 68, 68, 0.2)',
                            color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {stat.change}
                        </div>
                      </div>

                      <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>
                        {stat.title}
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700 }}>{stat.value}</div>
                    </div>
                  </AtomixGlass>
                </div>
              </GridCol>
            ))}
          </Grid>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern dashboard example showcasing how to use AtomixGlass for data visualization cards. Features interactive hover states, gradient icons, and real-time metrics with trend indicators.',
      },
    },
  },
};

/**
 * E-Commerce Product Card
 *
 * Demonstrates using AtomixGlass for product cards in an e-commerce context.
 */
export const ProductCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quantity, setQuantity] = useState(1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedSize, setSelectedSize] = useState('M');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [addedToCart, setAddedToCart] = useState(false);

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
      <BackgroundWrapper
        overlay={true}
        backgroundImage={
          'https://images.unsplash.com/photo-1711779321812-59cdf38ab31f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132'
        }
      >
        <AtomixGlass displacementScale={50} blurAmount={1.5} mode="standard" elasticity={0}>
          <div className="u-p-3" style={{ width: '300px' }}>
            {/* Product Image */}
            <div
              className="u-w-100 u-rounded-3"
              style={{
                height: '200px',
                background:
                  'linear-gradient(135deg,rgba(102, 126, 234, 0.42) 0%, rgba(118, 75, 162, 0.6) 100%)',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0.85,
              }}
            >
              👕
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(239, 68, 68, 0.85)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                -30% OFF
              </div>
            </div>

            {/* Product Info */}
            <h2 className="u-m-0 u-mb-1 u-fs-6 u-fw-bold">Premium Cotton T-Shirt</h2>
            <p className="u-m-0 u-mb-2 u-opacity-70 u-fs-7">
              Ultra-soft fabric with a modern fit. Perfect for everyday wear.
            </p>

            {/* Price */}
            <div className="u-d-flex u-align-items-center u-gap-2 u-mb-2">
              <span className="u-fs-4 u-fw-bold u-text-success">$49.99</span>
              <span className="u-fs-4 u-text-decoration-line-through u-opacity-50">$71.99</span>
            </div>

            {/* Size Selection */}
            <div className="u-mb-2">
              <label className="u-d-block u-fs-7 u-fw-semibold u-mb-2">Select Size</label>
              <div className="u-d-flex u-gap-2">
                {sizes.map(size => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    variant={selectedSize === size ? 'success' : 'outline-success'}
                    glass
                    size="sm"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="u-mb-2">
              <label className="u-d-block u-fs-7 u-fw-semibold u-mb-1 u-text-white">Quantity</label>
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Button onClick={() => setQuantity(Math.max(1, quantity - 1))} glass>
                  −
                </Button>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    minWidth: '30px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <Button onClick={() => setQuantity(Math.min(10, quantity + 1))} glass>
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              variant="primary"
              glass={{ cornerRadius: 8 }}
              size="sm"
              style={{ width: '100%' }}
              icon={addedToCart ? <Icon name="Check" /> : <Icon name="ShoppingCart" />}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </Button>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An e-commerce product card example showcasing how to use AtomixGlass for shopping interfaces. Features size selection, quantity controls, dynamic pricing, and interactive cart functionality.',
      },
    },
  },
};

/**
 * Notification Center
 *
 * Demonstrates a notification panel with AtomixGlass for modern app interfaces.
 */
export const NotificationCenter: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'success',
        icon: <Icon name="Check" />,
        title: 'Deployment Successful',
        message: 'Your application has been deployed to production.',
        time: '2 min ago',
        read: false,
      },
      {
        id: 2,
        type: 'warning',
        icon: <Icon name="Warning" />,
        title: 'High CPU Usage',
        message: 'Server load has exceeded 85% for the past 10 minutes.',
        time: '15 min ago',
        read: false,
      },
      {
        id: 3,
        type: 'info',
        icon: <Icon name="Chats" />,
        title: 'New Message',
        message: 'You have 3 new messages from the team.',
        time: '1 hour ago',
        read: true,
      },
      {
        id: 4,
        type: 'update',
        icon: <Icon name="ArrowClockwise" />,
        title: 'System Update Available',
        message: 'Version 2.4.0 is ready to install.',
        time: '3 hours ago',
        read: true,
      },
    ]);

    const markAsRead = (id: number) => {
      setNotifications(prev =>
        prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
      );
    };

    const clearAll = () => {
      setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1712230983973-6bf75ad1476e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132'
        }
      >
        <AtomixGlass displacementScale={70} blurAmount={1} elasticity={0} mode="prominent">
          <div
            className="u-rounded-4 u-overflow-hidden u-text-success-emphasis"
            style={{ background: 'color-mix(in srgb, var(--atomix-success) 10%, transparent)' }}
          >
            {/* Header */}
            <div
              className="u-p-4 u-d-flex u-justify-content-between u-align-items-center"
              style={{
                borderBottom:
                  '1px solid color-mix(in srgb, var(--atomix-success) 10%, transparent)',
              }}
            >
              <div className="u-d-flex u-align-items-center u-gap-2">
                <h2 className="u-m-0 u-fs-4 u-fw-bold">Notifications</h2>
                {unreadCount > 0 && (
                  <span
                    style={{
                      background: 'var(--atomix-error)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--atomix-error-color-text-emphasis)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="u-overflow-y-auto" style={{ maxHeight: '500px' }}>
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: '60px 24px',
                    textAlign: 'center',
                    opacity: 0.6,
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    <Icon name="Bell" />
                  </div>
                  <div style={{ fontSize: '16px' }}>No notifications</div>
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    style={{
                      padding: '16px 24px',
                      borderBottom:
                        '1px solid color-mix(in srgb, var(--atomix-success) 10%, transparent)',
                      cursor: 'pointer',
                      background: notification.read
                        ? 'transparent'
                        : 'color-mix(in srgb, var(--atomix-success) 10%, transparent)',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background =
                        'color-mix(in srgb, var(--atomix-success) 10%, transparent)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = notification.read
                        ? 'transparent'
                        : 'color-mix(in srgb, var(--atomix-success) 10%, transparent)';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ fontSize: '24px', flexShrink: 0 }}>{notification.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '4px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '15px',
                              fontWeight: notification.read ? 500 : 700,
                            }}
                          >
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'var(--atomix-success)',
                                flexShrink: 0,
                                marginTop: '4px',
                              }}
                            />
                          )}
                        </div>
                        <p
                          style={{
                            margin: '0 0 6px 0',
                            fontSize: '13px',
                            opacity: 0.7,
                            lineHeight: 1.4,
                          }}
                        >
                          {notification.message}
                        </p>
                        <span style={{ fontSize: '12px', opacity: 0.5 }}>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A notification center example showing how to build modern notification panels with AtomixGlass. Features read/unread states, different notification types, and interactive clearing functionality.',
      },
    },
  },
};

/**
 * Login Form
 *
 * Demonstrates a modern authentication form using AtomixGlass.
 */
export const LoginForm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rememberMe, setRememberMe] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1585937318604-b1f6c789a877?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548'
        }
        overlayOpacity={0.3}
        style={{ overflow: 'auto' }}
      >
        <div className="u-py-6 u-text-white">
          <AtomixGlass
            displacementScale={50}
            blurAmount={1}
            saturation={130}
            aberrationIntensity={2}
            cornerRadius={24}
            mode="standard"
          >
            <div className="u-p-4" style={{ width: '350px' }}>
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
                  <Icon name="Lock" style={{ position: 'relative', zIndex: 1 }} />
                </div>
                <h2
                  className="u-m-0 u-mb-2 u-fs-3 u-fw-bold"
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
                <p
                  className="u-m-0 u-opacity-70 u-fs-7"
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="u-mb-3">
                  <label className="u-d-block u-fs-7 u-fw-semibold u-mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    glass={{
                      elasticity: 0,
                    }}
                  />
                </div>

                <div className="u-mb-3">
                  <label className="u-d-block u-fs-7 u-fw-semibold u-mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    glass={{
                      elasticity: 0,
                    }}
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
                      onChange={e => setRememberMe(e.target.checked)}
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
                  glass={{
                    elasticity: 0,
                  }}
                  className="u-d-block u-w-100"
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
                    <span>🔵</span> Google
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
                    <span>⚫</span> GitHub
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern login form example showcasing authentication UI with AtomixGlass. Features email/password inputs, remember me functionality, forgot password link, social login options, and loading states.',
      },
    },
  },
};

/**
 * Music Player
 *
 * Demonstrates a media player interface using AtomixGlass for a premium look.
 */
export const MusicPlayer: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isPlaying, setIsPlaying] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentTime, setCurrentTime] = useState(125);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [volume, setVolume] = useState(70);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isShuffle, setIsShuffle] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

    const totalDuration = 248;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1586057281167-6a28377c4023?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987'
        }
      >
        <AtomixGlass
          displacementScale={55}
          blurAmount={3}
          cornerRadius={28}
          elasticity={0.01}
          mode="standard"
        >
          <div className="u-p-3" style={{ width: '350px' }}>
            {/* Album Art */}
            <AtomixGlass displacementScale={0} blurAmount={0} cornerRadius={20} mode="standard">
              <div
                style={{
                  aspectRatio: '1:2',
                  borderRadius: '20px',
                  background:
                    'linear-gradient(135deg, rgba(var(--atomix-primary-rgb),0.5) 0%, rgba(var(--atomix-secondary-rgb),0.5) 100%)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '120px',
                  boxShadow: '0 20px 40px rgba(var(--atomix-primary-rgb),0.3)',
                }}
              >
                <Icon name="MusicNotes" />
              </div>
            </AtomixGlass>
            {/* Track Info */}
            <div className="u-text-center u-mb-3">
              <h2
                className="u-m-0 u-mb-2 u-fs-3 u-fw-bold"
                style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Summer Vibes
              </h2>
              <p className="u-m-0 u-opacity-70 u-fs-6" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)' }}>
                The Atomix Band
              </p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '8px' }}>
              <div
                style={{
                  height: '6px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = x / rect.width;
                  setCurrentTime(Math.floor(totalDuration * percentage));
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(currentTime / totalDuration) * 100}%`,
                    background:
                      'linear-gradient(90deg, rgba(var(--atomix-primary-rgb),0.5) 0%, rgba(var(--atomix-secondary-rgb),0.5) 100%)',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '13px',
                  opacity: 0.6,
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '16px',
              }}
            >
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isShuffle
                    ? 'rgba(var(--atomix-primary-rgb),0.3)'
                    : 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="Shuffle" />
              </button>

              <button
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="Rewind" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: 'none',
                  background:
                    'linear-gradient(135deg, rgba(var(--atomix-primary-rgb),0.5) 0%, rgba(var(--atomix-secondary-rgb),0.5) 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(var(--atomix-primary-rgb),0.4)',
                }}
              >
                {isPlaying ? <Icon name="Pause" /> : <Icon name="Play" />}
              </button>

              <button
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="FastForward" />
              </button>

              <button
                onClick={() => {
                  const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
                  const currentIndex = modes.indexOf(repeatMode);
                  setRepeatMode(modes[(currentIndex + 1) % modes.length]);
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background:
                    repeatMode !== 'off' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {repeatMode === 'one' ? <Icon name="RepeatOnce" /> : <Icon name="Repeat" />}
              </button>
            </div>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px', opacity: 0.7 }}>
                {volume === 0 ? (
                  <Icon name="SpeakerLow" />
                ) : volume < 50 ? (
                  <Icon name="SpeakerX" />
                ) : (
                  <Icon name="SpeakerHigh" />
                )}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={e => setVolume(parseInt(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: '#667eea',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '14px', opacity: 0.6, minWidth: '35px' }}>{volume}%</span>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A premium music player interface showcasing how to use AtomixGlass for media applications. Features play/pause controls, progress tracking, shuffle, repeat modes, and volume control with an elegant design.',
      },
    },
  },
};

/**
 * Pricing Table Example
 *
 * This story demonstrates a modern pricing table using AtomixGlass components,
 * perfect for SaaS applications, subscription services, or product tiers.
 */
export const PricingTable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
      {
        name: 'Starter',
        description: 'Perfect for individuals getting started',
        price: { monthly: 9, yearly: 90 },
        features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access', 'Monthly Reports'],
        popular: false,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        name: 'Professional',
        description: 'For growing teams and businesses',
        price: { monthly: 29, yearly: 290 },
        features: [
          'Unlimited Projects',
          '100GB Storage',
          'Priority Support',
          'Advanced API Access',
          'Real-time Analytics',
          'Custom Integrations',
          'Team Collaboration',
        ],
        popular: true,
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        name: 'Enterprise',
        description: 'For large organizations with custom needs',
        price: { monthly: 99, yearly: 990 },
        features: [
          'Unlimited Everything',
          '1TB Storage',
          'Dedicated Support',
          'Enterprise API',
          'Advanced Security',
          'Custom Solutions',
          'SLA Guarantee',
          'White-label Options',
        ],
        popular: false,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    ];

    const savings = Math.round(
      ((plans[1].price.monthly * 12 - plans[1].price.yearly) / (plans[1].price.monthly * 12)) * 100
    );

    return (
      <div
        style={{
          height: '95vh',
          width: '97vw',
          borderRadius: '12px',
          overflow: 'auto',
          backgroundImage: `url('https://images.unsplash.com/photo-1658852528450-35115f3c01f3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container className="u-py-6 u-text-white">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                marginBottom: '24px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              💎 Pricing Plans
            </div>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 800,
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
              }}
            >
              Choose Your Plan
            </h1>
            <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '20px', lineHeight: 1.6 }}>
              Start free, then scale as you grow
            </p>

            {/* Billing Toggle */}
            <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
              <AtomixGlass blurAmount={1} saturation={120} cornerRadius={50} mode="standard">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    background:
                      billingCycle === 'monthly' ? 'rgba(102, 126, 234, 0.5)' : 'transparent',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: billingCycle === 'monthly' ? 600 : 400,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    background:
                      billingCycle === 'yearly' ? 'rgba(102, 126, 234, 0.5)' : 'transparent',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: billingCycle === 'yearly' ? 600 : 400,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                >
                  Yearly
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#10b981',
                      color: 'white',
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontWeight: 700,
                    }}
                  >
                    Save {savings}%
                  </span>
                </button>
              </AtomixGlass>
            </div>
          </div>

          <Grid className="u-pb-6">
            {plans.map((plan, index) => (
              <GridCol xs={12} md={4} lg={4}>
                <AtomixGlass
                  key={index}
                  displacementScale={plan.popular ? 100 : 40}
                  blurAmount={1}
                  saturation={plan.popular ? 180 : 130}
                  aberrationIntensity={plan.popular ? 2 : 1.5}
                  cornerRadius={24}
                  elasticity={0.01}
                  mode="standard"
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div style={{ padding: '20px', minHeight: '500px' }}>
                    {/* Plan Header */}
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '16px',
                        background: plan.color,
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {index === 0 ? '🚀' : index === 1 ? '⭐' : '👑'}
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '12px' }}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '36px', fontWeight: 800 }}>
                          ${plan.price[billingCycle]}
                        </span>
                        <span style={{ fontSize: '14px', opacity: 0.6 }}>
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p style={{ fontSize: '12px', opacity: 0.7, margin: '2px 0 0 0' }}>
                          ${(plan.price.yearly / 12).toFixed(2)} per month
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '12px',
                        border: 'none',
                        background: plan.popular
                          ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                          : 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginBottom: '10px',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      Get Started
                    </button>

                    {/* Features List */}
                    <div
                      style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}
                    >
                      <p
                        style={{
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          marginBottom: '10px',
                          opacity: 0.7,
                        }}
                      >
                        What's Included
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              marginBottom: '8px',
                              fontSize: '12px',
                            }}
                          >
                            <span
                              style={{
                                color: '#10b981',
                                fontSize: '14px',
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive pricing table example demonstrating how to showcase product tiers and subscription plans. Features billing cycle toggle, feature comparisons, and highlighted popular plans.',
      },
    },
  },
};

/**
 * Chat Interface Example
 *
 * This story demonstrates a modern chat interface with message bubbles,
 * typing indicators, and a message input area.
 */
export const ChatInterface: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [messages, setMessages] = useState([
      { id: 1, text: 'Hey! How are you?', sender: 'other', time: '10:30 AM', avatar: '👤' },
      {
        id: 2,
        text: "I'm doing great! Just finished the new design.",
        sender: 'me',
        time: '10:32 AM',
        avatar: '😊',
      },
      {
        id: 3,
        text: 'That sounds awesome! Can you share it?',
        sender: 'other',
        time: '10:33 AM',
        avatar: '👤',
      },
      {
        id: 4,
        text: "Sure! I'll send it over in a few minutes.",
        sender: 'me',
        time: '10:35 AM',
        avatar: '😊',
      },
    ]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputText, setInputText] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTyping, setIsTyping] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [onlineStatus, setOnlineStatus] = useState(true);

    const handleSend = () => {
      if (inputText.trim()) {
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            avatar: '😊',
          },
        ]);
        setInputText('');

        // Simulate other person typing
        setTimeout(() => setIsTyping(true), 1000);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              text: 'Got it! Thanks for letting me know.',
              sender: 'other',
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              avatar: '👤',
            },
          ]);
        }, 3000);
      }
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1671509774803-1640e8853b50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1364'
        }
      >
        <AtomixGlass
          displacementScale={100}
          blurAmount={1}
          cornerRadius={24}
          elasticity={0.1}
          mode="prominent"
        >
          <span
            style={{
              background: 'var(--atomix-body-bg)',
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              opacity: 0.5,
              borderRadius: 24,
            }}
          ></span>
          <div className="u-text-brand-emphasis">
            {/* Chat Header */}
            <div
              style={{
                padding: '24px 28px',
                borderBottom:
                  '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-4px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      opacity: 0.4,
                      filter: 'blur(12px)',
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>👤</span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: onlineStatus ? '#10b981' : '#6b7280',
                    border: '3px solid rgba(0,0,0,0.3)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '4px',
                  }}
                >
                  Alex Johnson
                </h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, color: 'rgba(255, 255, 255, 0.85)' }}>
                  {onlineStatus ? 'Active now' : 'Offline'}
                </p>
              </div>
              <button
                onClick={() => setOnlineStatus(!onlineStatus)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '20px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ⋮
              </button>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                    gap: '12px',
                    animation: 'slideIn 0.3s ease',
                  }}
                >
                  {message.sender === 'other' && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--atomix-brand-bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                    >
                      {message.avatar}
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius:
                          message.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background:
                          message.sender === 'me'
                            ? 'var(--atomix-brand-bg-subtle)'
                            : 'color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                        {message.text}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        opacity: 0.6,
                        marginTop: '4px',
                        padding: '0 4px',
                      }}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--atomix-brand-bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    👤
                  </div>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '16px 16px 16px 4px',
                      background:
                        'color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'currentColor',
                            opacity: 0.6,
                            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div
              style={{
                padding: '10px 24px',
                borderTop:
                  '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: '12px',
              }}
            >
              <Button size="md" glass={{}} icon={<Icon name="Paperclip" />} iconOnly />

              <Input
                glass
                variant="light"
                size="md"
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type a message..."
              />
              <Button
                onClick={handleSend}
                size="md"
                iconOnly
                glass={{
                  cornerRadius: 100,
                }}
                rounded
                icon={<Icon name="PaperPlaneTilt" />}
              />
            </div>
          </div>
        </AtomixGlass>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 60%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            30% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}</style>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A modern chat interface showcasing message bubbles, typing indicators, online status, and real-time messaging. Perfect for messaging apps, customer support chat, or team collaboration tools.',
      },
    },
  },
};

/**
 * Profile Card Example
 *
 * This story demonstrates a user profile card with stats, actions, and social links,
 * perfect for social platforms, professional networks, or team directories.
 */
export const ProfileCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFollowing, setIsFollowing] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showShareMenu, setShowShareMenu] = useState(false);

    const stats = [
      { label: 'Followers', value: '15' },
      { label: 'Following', value: '842' },
      { label: 'Posts', value: '1,234' },
    ];

    const socialLinks = [
      { icon: <Icon name="X" />, name: 'Twitter', color: '#1DA1F2' },
      { icon: <Icon name="LinkedinLogo" />, name: 'LinkedIn', color: '#0077B5' },
      { icon: <Icon name="Globe" />, name: 'Website', color: '#667eea' },
      { icon: <Icon name="Envelope" />, name: 'Email', color: '#EA4335' },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1603504979665-c4ed0261b4d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'
        }
        overlayOpacity={0.3}
        overlayColor="var(--atomix-body-bg)"
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={5}
          cornerRadius={24}
          mode="standard"
          style={{ width: '420px' }}
          elasticity={0.05}
          onClick={() => {}}
        >
          {/* Cover Image */}
          <div
            style={{
              height: '130px',
              background: 'var(--atomix-primary-gradient)',
              borderRadius: '24px 24px 0 0',
              position: 'relative',
              opacity: 0.5,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)',
              }}
            />
          </div>

          <div style={{ padding: '0 20px 20px' }}>
            {/* Profile Picture */}
            <div
              style={{
                marginTop: '-40px',
                marginBottom: '10px',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img src="https://avatars.githubusercontent.com/u/26011051?v=4" alt="Profile" />
              </div>
            </div>

            {/* Name & Title */}
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '28px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Limon Khan
              </h2>
              <p style={{ margin: '0 0 10px 0', fontSize: '15px', opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}>
                Senior Frontend Developer
              </p>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, color: 'rgba(255, 255, 255, 0.85)' }}>
                <Icon name="Globe" /> BANGLADESH, Dhaka • <Icon name="Clock" /> GMT+5
              </p>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '20px',
              }}
            >
              Passionate about creating beautiful, intuitive user experiences. Coffee enthusiast ☕
              and design systems advocate. Always learning, always growing.
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '20px',
                padding: '20px 0',
                borderTop:
                  '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.21)',
                background: 'color-mix(in srgb, var(--atomix-success-bg-subtle) 10%, transparent)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.7 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                glass={{
                  elasticity: 0,
                  style: {
                    width: '100%',
                  },
                }}
                variant="info"
                style={{
                  width: '100%',
                  padding: '14px 40px',
                }}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </Button>
              <Button
                onClick={() => setShowShareMenu(!showShareMenu)}
                glass={{
                  elasticity: 0,
                }}
                variant="outline-info"
                style={{
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Icon name="Share" />
              </Button>
            </div>

            {/* Social Links */}
            <div
              style={{
                background: 'color-mix(in srgb, var(--atomix-brand-bg-subtle) 50%, transparent)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '10px 20px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '10px',
                  opacity: 0.7,
                }}
              >
                Connect
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  width: '100%',
                  position: 'relative',
                }}
              >
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    glass={{
                      elasticity: 0,
                    }}
                    variant="primary"
                    style={{
                      width: '100%',
                    }}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Share Menu */}
            {showShareMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '60%',
                  right: '0%',
                }}
              >
                <AtomixGlass
                  blurAmount={0.8}
                  cornerRadius={16}
                  elasticity={0}
                  mode="standard"
                  style={{
                    position: 'absolute',
                    width: '160xp',
                  }}
                >
                  {['Copy Link', 'Share via Email', 'Download vCard'].map((option, idx) => (
                    <div key={idx} style={{ marginTop: '6px' }}>
                      <Button
                        key={idx}
                        variant="outline-success"
                        onClick={() => setShowShareMenu(false)}
                        glass={{
                          elasticity: 0,
                        }}
                        style={{
                          width: '100%',
                        }}
                      >
                        {option}
                      </Button>
                    </div>
                  ))}
                </AtomixGlass>
              </div>
            )}
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive user profile card showcasing stats, social links, follow actions, and share functionality. Perfect for social platforms, team directories, or professional networks.',
      },
    },
  },
};

/**
 * Settings Panel Example
 *
 * This story demonstrates a modern settings interface with toggles, dropdowns,
 * and form controls, perfect for app settings or user preferences.
 */
export const SettingsPanel: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notifications, setNotifications] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [darkMode, setDarkMode] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [autoSave, setAutoSave] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [language, setLanguage] = useState('en');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [emailFrequency, setEmailFrequency] = useState('daily');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    const handleSave = () => {
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 2000);
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1589083564233-216e84045fc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670'
        }
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={1}
          cornerRadius={24}
          mode="standard"
          style={{ width: '550px' }}
        >
          <div style={{ padding: '32px' }}>
            {/* Header */}
            <div className="u-mb-5">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  ⚙️
                </div>
                <h2
                  className="u-m-0 u-fs-2 u-fw-bold"
                  style={{
                    fontSize: '28px',
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Settings
                </h2>
              </div>
              <p className="u-m-0 u-fs-6 u-opacity-70" style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)' }}>
                Manage your account preferences and settings
              </p>
            </div>

            {/* General Section */}
            <div className="u-mb-5">
              <h3
                style={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                General
              </h3>

              {/* Language Select */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    Language
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    Choose your preferred language
                  </div>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="en" style={{ background: '#1a1a1a', color: 'white' }}>
                    English
                  </option>
                  <option value="es" style={{ background: '#1a1a1a', color: 'white' }}>
                    Español
                  </option>
                  <option value="fr" style={{ background: '#1a1a1a', color: 'white' }}>
                    Français
                  </option>
                  <option value="de" style={{ background: '#1a1a1a', color: 'white' }}>
                    Deutsch
                  </option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    🌙 Dark Mode
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>
                    Enable dark theme across the app
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: darkMode ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: darkMode ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

              {/* Auto Save Toggle */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    💾 Auto-Save
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>Automatically save your work</div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: autoSave ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: autoSave ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="u-mb-5">
              <h3
                style={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                Notifications
              </h3>

              {/* Enable Notifications */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    🔔 Push Notifications
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>Receive push notifications</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: notifications ? '#667eea' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '4px',
                      left: notifications ? '28px' : '4px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

              {/* Email Frequency */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                    <Icon name="Envelope" /> Email Frequency
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.7 }}>How often to receive emails</div>
                </div>
                <select
                  value={emailFrequency}
                  onChange={e => setEmailFrequency(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="realtime" style={{ background: '#1a1a1a', color: 'white' }}>
                    Real-time
                  </option>
                  <option value="daily" style={{ background: '#1a1a1a', color: 'white' }}>
                    Daily
                  </option>
                  <option value="weekly" style={{ background: '#1a1a1a', color: 'white' }}>
                    Weekly
                  </option>
                  <option value="never" style={{ background: '#1a1a1a', color: 'white' }}>
                    Never
                  </option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="u-d-flex u-gap-2">
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {showSaveConfirm ? '✓ Saved!' : 'Save Changes'}
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive settings panel showcasing toggles, dropdowns, and form controls. Perfect for app settings, user preferences, or configuration interfaces.',
      },
    },
  },
};

/**
 * Event Card Example
 *
 * This story demonstrates an event card with date, time, location,
 * and RSVP functionality, perfect for event platforms or calendars.
 */
export const EventCard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not' | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [interestedCount, setInterestedCount] = useState(247);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showShareOptions, setShowShareOptions] = useState(false);

    const handleRSVP = (status: 'going' | 'maybe' | 'not') => {
      if (rsvpStatus === status) {
        setRsvpStatus(null);
        if (status === 'going') setInterestedCount(prev => prev - 1);
      } else {
        if (status === 'going' && rsvpStatus !== 'going') {
          setInterestedCount(prev => prev + 1);
        } else if (rsvpStatus === 'going') {
          setInterestedCount(prev => prev - 1);
        }
        setRsvpStatus(status);
      }
    };

    const attendees = [
      { name: 'Sarah M.', avatar: <Icon name="User" /> },
      { name: 'John D.', avatar: <Icon name="User" /> },
      { name: 'Emily R.', avatar: <Icon name="User" /> },
      { name: 'Mike T.', avatar: <Icon name="User" /> },
      { name: 'Lisa K.', avatar: <Icon name="User" /> },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1748365335261-8c87bc861af1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2832'
        }
        height="90vh"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <AtomixGlass
          displacementScale={45}
          blurAmount={4}
          cornerRadius={24}
          mode="standard"
          style={{ width: '480px' }}
        >
          {/* Event Image */}
          <div
            style={{
              height: '220px',
              background:
                'url(https://images.unsplash.com/photo-1646784208071-7f35325e10cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '24px 24px 0 0',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: '80px' }}>
              <Icon name="Confetti" />
            </div>
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
              }}
            >
              <span style={{ fontSize: '18px' }}>
                <Icon name="Sparkle" />
              </span>
              Trending
            </div>
          </div>

          <div style={{ padding: '28px' }}>
            {/* Date Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(102, 126, 234, 0.2)',
                padding: '8px 16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '18px' }}>
                <Icon name="CalendarBlank" />
              </span>
              Saturday, Dec 16, 2024 • 7:00 PM
            </div>

            {/* Event Title */}
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: '32px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Design Systems Meetup
            </h2>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '15px',
                opacity: 0.9,
              }}
            >
              <span style={{ fontSize: '18px' }}>
                <Icon name="MapPinLine" />
              </span>
              <span>Innovation Hub, 123 Tech Street, SF</span>
            </div>

            {/* Host */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                fontSize: '15px',
                opacity: 0.9,
              }}
            >
              <span style={{ fontSize: '18px' }}>
                <Icon name="UserCircle" />
              </span>
              <span>Hosted by Design Community SF</span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '24px',
              }}
            >
              Join us for an evening of talks, workshops, and networking with fellow designers and
              developers. Learn about the latest trends in design systems and component libraries.
            </p>

            {/* Attendees */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>
                  {interestedCount} people interested
                </span>
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Share
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '-8px' }}>
                {attendees.map((attendee, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: '2px solid rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      marginLeft: idx > 0 ? '-8px' : '0',
                      position: 'relative',
                      zIndex: attendees.length - idx,
                    }}
                    title={attendee.name}
                  >
                    {attendee.avatar}
                  </div>
                ))}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    border: '2px solid rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginLeft: '-8px',
                  }}
                >
                  +{interestedCount - attendees.length}
                </div>
              </div>
            </div>

            {/* RSVP Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={() => handleRSVP('going')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'going' ? '2px solid #667eea' : 'none',
                  background:
                    rsvpStatus === 'going'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>
                  <Icon name="Check" />
                </span>
                Going
              </button>
              <button
                onClick={() => handleRSVP('maybe')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'maybe' ? '2px solid #f59e0b' : 'none',
                  background:
                    rsvpStatus === 'maybe' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>
                  <Icon name="Smiley" />
                </span>
                Maybe
              </button>
              <button
                onClick={() => handleRSVP('not')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: rsvpStatus === 'not' ? '2px solid #ef4444' : 'none',
                  background:
                    rsvpStatus === 'not' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '18px' }}>
                  <Icon name="X" />
                </span>
                Can't Go
              </button>
            </div>

            {/* Additional Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Icon name="Calendar" /> Add to Calendar
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Icon name="MapPin" /> Get Directions
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive event card showcasing date, location, RSVP functionality, and attendee information. Perfect for event platforms, calendars, or community applications.',
      },
    },
  },
};

/**
 * Social Media Post Example
 *
 * This story demonstrates a social media post card with likes, comments,
 * and sharing functionality, perfect for social platforms or feeds.
 */
export const SocialMediaPost: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [liked, setLiked] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [saved, setSaved] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [likes, setLikes] = useState(1247);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showComments, setShowComments] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [commentText, setCommentText] = useState('');

    const handleLike = () => {
      setLiked(!liked);
      setLikes(prev => (liked ? prev - 1 : prev + 1));
    };

    const comments = [
      {
        user: 'Alex Chen',
        avatar: <Icon name="UserCircle" />,
        text: 'This looks amazing! Great work on the design.',
        time: '2h ago',
      },
      {
        user: 'Sarah Williams',
        avatar: <Icon name="UserCircle" />,
        text: 'Love the color palette and the attention to detail! 🎨',
        time: '4h ago',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1732912567466-26580df08084?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132'
        }
        overlay={true}
      >
        <AtomixGlass
          displacementScale={200}
          blurAmount={5}
          cornerRadius={24}
          mode="standard"
          style={{ width: '450px' }}
          elasticity={0}
        >
          {/* Post Header */}
          <div
            style={{
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '24px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'url(https://avatars.githubusercontent.com/u/26011051?v=4)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
              }}
            ></div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  margin: '0 0 4px 0',
                  fontSize: '18px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Limon Khan
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, color: 'rgba(255, 255, 255, 0.85)' }}>
                Frontend Developer • 6 hours ago
              </p>
            </div>
            <Button
              glass={{
                cornerRadius: 8,
              }}
              size="sm"
              icon={<Icon name="DotsThree" />}
            />
          </div>

          {/* Post Content */}
          <div style={{ padding: '20px 24px' }}>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              Just wrapped up this new landing page design for a fintech startup! 🚀 Really proud of
              how the glassmorphism effects turned out. What do you all think?
            </p>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                borderRadius: '10px',
              }}
            >
              {['#design', '#ui', '#glassmorphism', '#webdesign'].map((tag, idx) => (
                <Badge key={idx} label={tag} glass variant="primary" />
              ))}
            </div>
          </div>

          {/* Post Image */}
          <div
            style={{
              height: '280px',
              background:
                'url(https://images.unsplash.com/photo-1732912567466-26580df08084?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
              borderTop:
                '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
              borderBottom:
                '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
            }}
          ></div>

          {/* Engagement Stats */}
          <div
            style={{
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              opacity: 0.8,
              borderBottom:
                '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
            }}
          >
            <span>{likes.toLocaleString()} likes</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>{comments.length + 12} comments</span>
              <span>34 shares</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              padding: '12px 24px',
              display: 'flex',
              gap: '8px',
              borderBottom: showComments
                ? '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)'
                : 'none',
            }}
          >
            <Button onClick={handleLike} variant="error" glass>
              <span style={{ fontSize: '18px' }}>
                {liked ? <Icon name="Heart" /> : <Icon name="HeartStraight" />}
              </span>
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button onClick={() => setShowComments(!showComments)} variant="info" glass>
              <span style={{ fontSize: '18px' }}>
                <Icon name="Chats" />
              </span>
              {showComments ? 'Comments' : 'Comment'}
            </Button>
            <Button onClick={() => setSaved(!saved)} variant="success" glass>
              <span style={{ fontSize: '18px' }}>
                {saved ? <Icon name="Bookmark" /> : <Icon name="FilePlus" />}
              </span>
              {saved ? 'Saved' : 'Save'}
            </Button>
            <Button variant="success" glass>
              <Icon name="UploadSimple" />
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div style={{ padding: '20px 24px' }}>
              {/* Existing Comments */}
              <div style={{ marginBottom: '20px' }}>
                {comments.map((comment, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {comment.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          background:
                            'color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                          padding: '12px 16px',
                          borderRadius: '12px 12px 12px 4px',
                        }}
                      >
                        <h4
                          style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 700,
                          }}
                        >
                          {comment.user}
                        </h4>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                          {comment.text}
                        </p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '16px',
                          marginTop: '6px',
                          paddingLeft: '16px',
                        }}
                      >
                        <Button variant="error" glass>
                          Like
                        </Button>
                        <Button variant="outline-info" glass>
                          Reply
                        </Button>
                        <span style={{ fontSize: '13px', opacity: 0.6 }}>{comment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="UserCircle" />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '20px',
                      border:
                        '1px solid color-mix(in srgb, var(--atomix-brand-bg-subtle) 10%, transparent)',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {commentText && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <Button onClick={() => setCommentText('')} variant="success">
                        <Icon name="PaperPlaneTilt" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive social media post card showcasing likes, comments, shares, and interactive engagement features. Perfect for social platforms, feeds, or community applications.',
      },
    },
  },
};

/**
 * Weather Widget - A beautiful weather display with current conditions and forecast
 */
export const WeatherWidget: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedDay, setSelectedDay] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    const currentWeather = {
      temp: unit === 'C' ? 24 : 75,
      condition: 'Partly Cloudy',
      location: 'San Francisco, CA',
      humidity: 65,
      windSpeed: 12,
      precipitation: 20,
      feelsLike: unit === 'C' ? 22 : 72,
    };

    const forecast = [
      {
        day: 'Mon',
        high: unit === 'C' ? 26 : 79,
        low: unit === 'C' ? 18 : 64,
        icon: <Icon name="Sun" />,
        condition: 'Partly Cloudy',
      },
      {
        day: 'Tue',
        high: unit === 'C' ? 28 : 82,
        low: unit === 'C' ? 20 : 68,
        icon: <Icon name="Sun" />,
        condition: 'Sunny',
      },
      {
        day: 'Wed',
        high: unit === 'C' ? 25 : 77,
        low: unit === 'C' ? 19 : 66,
        icon: <Icon name="CloudRain" />,
        condition: 'Rainy',
      },
      {
        day: 'Thu',
        high: unit === 'C' ? 23 : 73,
        low: unit === 'C' ? 17 : 63,
        icon: <Icon name="CloudRain" />,
        condition: 'Thunderstorm',
      },
      {
        day: 'Fri',
        high: unit === 'C' ? 27 : 81,
        low: unit === 'C' ? 21 : 70,
        icon: <Icon name="Sun" />,
        condition: 'Sunny',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1671521739306-65c98fe91cf8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071'
        }
      >
        <AtomixGlass
          displacementScale={60}
          blurAmount={1.1}
          saturation={190}
          cornerRadius={32}
          mode="standard"
          elasticity={0}
        >
          <div style={{ padding: '20px', minWidth: '380px', maxWidth: '500px' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '6px',
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Weather
                </h2>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, color: 'rgba(255, 255, 255, 0.85)' }}>
                  📍 {currentWeather.location}
                </p>
              </div>
              <Button
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                glass
                style={{
                  minWidth: '60px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                °{unit}
              </Button>
            </div>

            {/* Current Weather */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '64px',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                }}
              >
                <Icon name="Cloud" />
              </div>
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {currentWeather.temp}°{unit}
              </div>
              <div style={{ fontSize: '20px', opacity: 0.9, marginBottom: '8px', fontWeight: 600 }}>
                {currentWeather.condition}
              </div>
              <div style={{ fontSize: '15px', opacity: 0.7, color: 'rgba(255, 255, 255, 0.85)' }}>
                Feels like {currentWeather.feelsLike}°
              </div>
            </div>

            {/* Weather Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '24px',
                padding: '10px',
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                  <Icon name="Drop" />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.humidity}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Humidity</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                  <Icon name="Wind" />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.windSpeed} km/h
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Wind</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                  <Icon name="CloudRain" />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {currentWeather.precipitation}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Rain</div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '20px',
                  opacity: 0.9,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                5-Day Forecast
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {forecast.map((day, index) => (
                  <div
                    key={day.day}
                    onClick={() => setSelectedDay(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      background:
                        selectedDay === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${selectedDay === index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, width: '50px' }}>
                      {day.day}
                    </div>
                    <div style={{ fontSize: '20px' }}>{day.icon}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7, flex: 1, textAlign: 'center' }}>
                      {day.condition}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                      <span style={{ fontWeight: 600 }}>{day.high}°</span>
                      <span style={{ opacity: 0.5 }}>{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive weather widget displaying current conditions, detailed metrics, and a 5-day forecast. Perfect for dashboard applications, weather apps, or home screen widgets.',
      },
    },
  },
};

/**
 * Search Results - Search interface with filtered results
 */
export const SearchResults: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchQuery, setSearchQuery] = useState('design system');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = ['all', 'articles', 'videos', 'documentation', 'tutorials'];

    const results = [
      {
        type: 'article',
        title: 'Building a Modern Design System',
        description:
          'Learn how to create scalable and maintainable design systems for your projects...',
        url: 'example.com/article-1',
        date: '2 days ago',
        author: 'Sarah Chen',
        icon: <Icon name="Notebook" />,
      },
      {
        type: 'video',
        title: 'Design System Tutorial',
        description:
          'Complete video guide to design systems, covering components, tokens, and documentation...',
        url: 'example.com/video-1',
        date: '1 week ago',
        author: 'John Design',
        icon: <Icon name="Video" />,
        duration: '24:35',
      },
      {
        type: 'documentation',
        title: 'Design System Best Practices',
        description:
          'Official documentation covering design system principles, patterns, and implementation...',
        url: 'example.com/docs-1',
        date: '3 days ago',
        author: 'Atomix Team',
        icon: <Icon name="Book" />,
      },
      {
        type: 'tutorial',
        title: 'Getting Started with Design Systems',
        description:
          'Step-by-step tutorial for beginners to understand and implement design systems...',
        url: 'example.com/tutorial-1',
        date: '5 days ago',
        author: 'Maria Garcia',
        icon: <Icon name="GraduationCap" />,
      },
      {
        type: 'article',
        title: 'Design Tokens in Practice',
        description:
          'Deep dive into design tokens: what they are, why they matter, and how to use them...',
        url: 'example.com/article-2',
        date: '1 week ago',
        author: 'Alex Kim',
        icon: <Icon name="Notebook" />,
      },
    ];

    const filteredResults =
      selectedFilter === 'all'
        ? results
        : results.filter(r => r.type === selectedFilter.slice(0, -1));

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1751624534511-63da274d9e15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2376'
        }
      >
        <AtomixGlass
          displacementScale={30}
          blurAmount={2}
          cornerRadius={30}
          mode="standard"
          onClick={() => {}}
          elasticity={0}
        >
          <div
            className=""
            style={{
              padding: '24px',
              minWidth: '800px',
              maxWidth: '900px',
              borderRadius: '30px',
              position: 'relative',
            }}
          >
            {/* Search Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                }}
              >
                🔍
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Search
              </h2>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <Input
                type="text"
                variant="info"
                glass={
                  {
                    displacementScale: 0,
                    elasticity: 0,
                  } as any
                }
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for anything..."
              />
              <div
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                }}
              >
                <Icon name="MagnifyingGlass" />
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {filters.map(filter => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'warning' : 'light'}
                  glass={{
                    displacementScale: 0,
                    blurAmount: 0,
                  }}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <div style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.7 }}>
              Found {filteredResults.length} results for "{searchQuery}"
            </div>

            {/* Results List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {filteredResults.map((result, index) => (
                <Callout
                  key={index}
                  variant="success"
                  title={result.title}
                  icon={result.icon}
                  glass={
                    {
                      displacementScale: 0,
                      blurAmount: 0,
                    } as any
                  }
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {result.duration && (
                          <span
                            style={{
                              padding: '2px 4px',
                              borderRadius: '6px',
                              background: 'rgba(255,255,255,0.15)',
                              fontSize: '11px',
                              fontWeight: 600,
                            }}
                          >
                            {result.duration}
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          margin: '0 0 12px 0',
                          fontSize: '14px',
                          opacity: 0.8,
                        }}
                      >
                        {result.description}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '13px',
                          opacity: 0.6,
                        }}
                      >
                        <span>{result.url}</span>
                        <span>•</span>
                        <span>{result.author}</span>
                        <span>•</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                  </div>
                </Callout>
              ))}
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive search results interface with filtering, categorization, and detailed result cards. Perfect for documentation sites, knowledge bases, or content platforms.',
      },
    },
  },
};

/**
 * Payment Form - Secure payment form with card input
 */
export const PaymentForm: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cardNumber, setCardNumber] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cardName, setCardName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expiryDate, setExpiryDate] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cvv, setCvv] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [saveCard, setSaveCard] = useState(false);

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts: string[] = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        return parts.join(' ');
      } else {
        return value;
      }
    };

    const formatExpiry = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        return v.slice(0, 2) + '/' + v.slice(2, 4);
      }
      return v;
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1691938643618-d0c1a14afa8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'
        }
        width="90vw"
        height="97vh"
      >
        <AtomixGlass
          displacementScale={120}
          blurAmount={2}
          saturation={180}
          cornerRadius={28}
          mode="standard"
          shaderVariant="premiumGlass"
          elasticity={0}
        >
          <div
            className="u-p-3 u-position-relative u-rounded-5"
            style={{ minWidth: '300px', maxWidth: '400px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                }}
              >
                💳
              </div>
              <div>
                <h2
                  className="u-m-0 u-fs-4 u-fw-bold"
                  style={{
                    fontSize: '24px',
                    marginBottom: '4px',
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Payment Details
                </h2>
                <p className="u-m-0 u-fs-7 u-opacity-70" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  Complete your purchase securely
                </p>
              </div>
            </div>

            {/* Card Preview */}
            <AtomixGlass
              mode="standard"
              displacementScale={0}
              blurAmount={0}
              saturation={200}
              elasticity={0}
            >
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  marginBottom: '16px',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  background: 'var(--atomix-dark-gradient)',
                  overflow: 'hidden',
                  opacity: 0.9,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.7)',
                  }}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>CREDIT CARD</div>
                  <div style={{ fontSize: '32px' }}>💳</div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      marginBottom: '10px',
                      letterSpacing: '2px',
                    }}
                  >
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}
                  >
                    <div>
                      <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>
                        CARD HOLDER
                      </div>
                      <div
                        style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}
                      >
                        {cardName || 'YOUR NAME'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>
                        EXPIRES
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>
                        {expiryDate || 'MM/YY'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AtomixGlass>
            {/* Form */}
            <div className="u-d-flex u-flex-column u-gap-3">
              <div>
                <label className="u-d-block u-fs-7 u-fw-semibold u-mb-2">Card Number</label>
                <Input
                  variant="primary"
                  glass={
                    {
                      elasticity: 0,
                    } as any
                  }
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div>
                <label className="u-d-block u-fs-7 u-fw-semibold u-mb-2">Cardholder Name</label>
                <Input
                  variant="primary"
                  glass={
                    {
                      elasticity: 0,
                    } as any
                  }
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="u-d-grid u-gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    Expiry Date
                  </label>
                  <Input
                    variant="primary"
                    glass={
                      {
                        elasticity: 0,
                      } as any
                    }
                    type="text"
                    value={expiryDate}
                    onChange={e => setExpiryDate(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    CVV
                  </label>
                  <Input
                    variant="primary"
                    glass={
                      {
                        elasticity: 0,
                      } as any
                    }
                    type="text"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Save Card Option */}
              <div
                onClick={() => setSaveCard(!saveCard)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'rgba(var(--atomix-primary-rgb),0.5)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    background: saveCard
                      ? 'linear-gradient(135deg, var(--atomix-primary) 0%, var(--atomix-primary-hover) 100%)'
                      : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  {saveCard && '✓'}
                </div>
                <span style={{ fontSize: '14px' }}>Save card for future purchases</span>
              </div>

              {/* Amount Summary */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  background: 'rgba(var(--atomix-primary-rgb),0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>$129.00</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>Tax</span>
                  <span style={{ fontWeight: 600 }}>$12.90</span>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.2)',
                    margin: '12px 0',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontWeight: 700 }}>$141.90</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                label="Pay 41.90"
                variant="primary"
                className="u-w-100"
                glass={{ elasticity: 0 }}
              />

              <div style={{ textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
                🔒 Secured by 256-bit SSL encryption
              </div>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A secure payment form with card preview, input formatting, and payment summary. Perfect for e-commerce checkouts, subscription payments, or donation forms.',
      },
    },
  },
};

/**
 * Newsletter Subscription - Email subscription form with benefits
 */
export const NewsletterSubscription: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [subscribed, setSubscribed] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = () => {
      if (email) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setSubscribed(true);
        }, 1500);
      }
    };

    const benefits = [
      {
        icon: <Icon name="Envelope" />,
        title: 'Weekly Updates',
        description: 'Get the latest news and updates every week',
      },
      {
        icon: <Icon name="Gift" />,
        title: 'Exclusive Content',
        description: 'Access premium articles and resources',
      },
      {
        icon: <Icon name="Lightbulb" />,
        title: 'Expert Tips',
        description: 'Learn from industry professionals',
      },
      {
        icon: <Icon name="Confetti" />,
        title: 'Early Access',
        description: 'Be the first to try new features',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1760715751401-02487fcd24b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1760'
        }
        overlay={false}
      >
        <AtomixGlass
          displacementScale={100}
          blurAmount={3}
          cornerRadius={32}
          mode="standard"
          elasticity={0}
        >
          <div
            style={{
              padding: '30px',
              minWidth: '450px',
              maxWidth: '500px',
              width: '100%',
              height: '100%',
            }}
          >
            {!subscribed ? (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                    <Icon name="Chats" />
                  </div>
                <h2
                  style={{
                    margin: '0 0 16px 0',
                    fontSize: '36px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Join Our Newsletter
                </h2>
                <p style={{ margin: 0, fontSize: '17px', opacity: 0.9, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.9)' }}>
                  Subscribe to get exclusive content, tips, and updates delivered to your inbox
                </p>
                </div>

                {/* Email Input */}
                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{ position: 'relative' }}
                    className="u-d-flex u-gap-2 u-align-items-center"
                  >
                    <div className="u-w-100">
                      <Input
                        variant="brand"
                        glass={
                          {
                            elasticity: 0,
                          } as any
                        }
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <Button
                      onClick={handleSubscribe}
                      disabled={!email || isLoading}
                      variant="primary"
                      glass={
                        {
                          elasticity: 0,
                        } as any
                      }
                      className="u-w-100"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                  <p style={{ margin: '10px 0 0 0', fontSize: '13px', opacity: 0.6 }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}
                >
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '10px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{benefit.icon}</div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>
                        {benefit.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, lineHeight: 1.5 }}>
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                      50K+
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Subscribers</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                      4.9★
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Rating</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                      Weekly
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}>Delivery</div>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>
                  <Icon name="Confetti" />
                </div>
                <h2
                  style={{
                    margin: '0 0 16px 0',
                    fontSize: '36px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Welcome Aboard!
                </h2>
                <p
                  style={{
                    margin: '0 0 32px 0',
                    fontSize: '17px',
                    opacity: 0.9,
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  Thank you for subscribing! Check your inbox for a confirmation email.
                </p>
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '16px',
                    background: 'rgba(100,200,100,0.15)',
                    border: '1px solid rgba(100,200,100,0.3)',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    ✓ Subscription Confirmed
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>{email}</div>
                </div>
                <Button
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  glass
                  variant="primary"
                >
                  Subscribe Another Email
                </Button>
              </div>
            )}
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive newsletter subscription form with benefits display, subscriber stats, and success state. Perfect for landing pages, blogs, or marketing campaigns.',
      },
    },
  },
};

/**
 * Progress Tracker - Multi-step progress indicator
 */
export const ProgressTracker: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentStep, setCurrentStep] = useState(2);

    const steps = [
      {
        id: 1,
        title: 'Account Setup',
        description: 'Create your profile and set preferences',
        icon: <Icon name="User" />,
        status: 'completed',
      },
      {
        id: 2,
        title: 'Payment Method',
        description: 'Add your payment information',
        icon: <Icon name="CreditCard" />,
        status: 'current',
      },
      {
        id: 3,
        title: 'Verification',
        description: 'Verify your email and phone',
        icon: <Icon name="Envelope" />,
        status: 'upcoming',
      },
      {
        id: 4,
        title: 'Complete',
        description: 'Review and finish setup',
        icon: <Icon name="Confetti" />,
        status: 'upcoming',
      },
    ];

    const getStepStatus = (stepId: number) => {
      if (stepId < currentStep) return 'completed';
      if (stepId === currentStep) return 'current';
      return 'upcoming';
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1656873186004-f53c335fa348?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532'
        }
      >
        <AtomixGlass
          displacementScale={28}
          blurAmount={18}
          saturation={1.15}
          cornerRadius={30}
          mode="standard"
        >
          <div className="u-p-5" style={{ minWidth: '550px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                }}
              >
                🚀
              </div>
              <h2
                className="u-m-0 u-fs-2 u-fw-bold"
                style={{
                  fontSize: '28px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Getting Started
              </h2>
            </div>
            <p
              className="u-m-0 u-fs-6 u-opacity-70"
              style={{ marginBottom: '48px', fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)' }}
            >
              Complete the following steps to set up your account
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: '48px' }}>
              <div
                style={{
                  position: 'relative',
                  height: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '13px',
                  opacity: 0.6,
                }}
              >
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>{Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Complete</span>
              </div>
            </div>

            {/* Steps List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {steps.map(step => {
                const status = getStepStatus(step.id);
                const isCompleted = status === 'completed';
                const isCurrent = status === 'current';
                const isUpcoming = status === 'upcoming';

                return (
                  <div
                    key={step.id}
                    onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '24px',
                      borderRadius: '20px',
                      background: isCurrent
                        ? 'rgba(102,126,234,0.15)'
                        : isCompleted
                          ? 'rgba(100,200,100,0.1)'
                          : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${
                        isCurrent
                          ? 'rgba(102,126,234,0.5)'
                          : isCompleted
                            ? 'rgba(100,200,100,0.3)'
                            : 'rgba(255,255,255,0.1)'
                      }`,
                      cursor: step.id <= currentStep ? 'pointer' : 'default',
                      opacity: isUpcoming ? 0.6 : 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Step Number/Icon */}
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        background: isCurrent
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : isCompleted
                            ? 'linear-gradient(135deg, #50c878 0%, #3cb371 100%)'
                            : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? <Icon name="Check" /> : step.icon}
                    </div>

                    {/* Step Content */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '6px',
                        }}
                      >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              background: 'rgba(100,200,100,0.2)',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#50c878',
                            }}
                          >
                            COMPLETED
                          </span>
                        )}
                        {isCurrent && (
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              background: 'rgba(102,126,234,0.2)',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#667eea',
                            }}
                          >
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {step.id <= currentStep && (
                      <div style={{ fontSize: '20px', opacity: 0.5 }}>
                        <Icon name="ArrowRight" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="u-d-flex u-justify-content-between u-gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                style={{
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep === 1 ? 0.5 : 1,
                }}
              >
                <Icon name="ArrowLeft" /> Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                style={{
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  background:
                    currentStep === steps.length
                      ? 'rgba(255,255,255,0.2)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: currentStep === steps.length ? 'not-allowed' : 'pointer',
                  opacity: currentStep === steps.length ? 0.5 : 1,
                }}
              >
                {currentStep === steps.length
                  ? 'Completed <Icon name="Check" />'
                  : 'Next <Icon name="ArrowRight" />'}
              </button>
            </div>
          </div>
        </AtomixGlass>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive progress tracker for multi-step processes with status indicators, step navigation, and progress visualization. Perfect for onboarding flows, checkout processes, or application wizards.',
      },
    },
  },
};
/**
 * Mobile UI Example - Showcases the component on smaller screens
 *
 * This story demonstrates how AtomixGlass components can be used to create
 * mobile-friendly interfaces with responsive design and touch interactions.
 */
export const MobileUIExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notificationCount, setNotificationCount] = useState(3);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    const clearNotifications = () => {
      setNotificationCount(0);
    };

    // Mobile device frame styles
    const phoneFrameStyle = {
      width: '375px',
      height: '667px',
      borderRadius: '36px',
      padding: '12px',
      boxShadow: '0 -25px 50px 12px rgba(255, 255, 255, 0.3)',
      position: 'relative' as const,
      backdropFilter: 'blur(12px)',
    };

    const phoneScreenStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '24px',
      position: 'relative' as const,
      backgroundImage:
        'url(https://images.unsplash.com/photo-1699100329878-7f28bb780787?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)',
      backgroundSize: 'cover' as const,
      backgroundPosition: 'center' as const,
      color: 'white',
    };

    const phoneNotchStyle = {
      position: 'absolute' as const,
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '180px',
      height: '30px',
      borderBottomLeftRadius: '14px',
      borderBottomRightRadius: '14px',
      background: '#000',
      zIndex: 10,
    };

    // App content styles
    const appContentStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
    };

    const headerStyle = {
      padding: '50px 20px 15px',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '24px',
      background: 'linear-gradient(to bottom, rgba(255,255,255, 0.2), rgba(0,0,0,0.1))',
    };

    const mainContentStyle = {
      flex: 1,
      padding: '0 15px',
    };

    // Tab content based on active tab
    const renderTabContent = () => {
      switch (activeTab) {
        case 'home':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={24}
                mode="prominent"
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                    borderRadius: '24px',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: 'white' }}>
                    Welcome Back
                  </h3>
                  <p
                    style={{
                      margin: '0 0 15px 0',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: 'white',
                    }}
                  >
                    Your daily summary and activity feed
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '15px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Icon name="User" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: 'white' }}>User Profile</div>
                      <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                        View your account
                      </div>
                    </div>
                  </div>
                </div>
              </AtomixGlass>

              <div style={{ height: '15px' }} />

              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                saturation={185}
                elasticity={0.2}
                cornerRadius={30}
                mode="standard"
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.1), rgba(0,0,0,0.1))',
                    borderRadius: '30px',
                  }}
                >
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: 'white' }}>
                    Recent Activity
                  </h3>
                  {[1, 2, 3].map(item => (
                    <div
                      key={item}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.15), rgba(0,0,0,0.15))',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          color: 'white',
                          background:
                            'linear-gradient(to left, rgba(255,255,255,0.15), rgba(0,0,0,0.15))',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {item === 1 ? (
                          <Icon name="File" />
                        ) : item === 2 ? (
                          <Icon name="Bell" />
                        ) : (
                          <Icon name="Chats" />
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: 'white' }}>
                          {item === 1
                            ? 'New document created'
                            : item === 2
                              ? 'Reminder: Meeting at 3 PM'
                              : 'New message from Sarah'}
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                          {item === 1 ? '5 minutes ago' : item === 2 ? '1 hour ago' : '3 hours ago'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AtomixGlass>
            </div>
          );
        case 'search':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={220}
                blurAmount={0}
                cornerRadius={15}
                mode="shader"
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '15px',
                    borderRadius: '15px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      background: 'linear-gradient(to top, rgba(255,255,255,0.3), rgba(0,0,0,0.3))',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span>
                      <Icon name="MagnifyingGlass" />
                    </span>
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
                </div>
              </AtomixGlass>

              <div style={{ height: '15px' }} />

              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={15}
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '15px',
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>
                    Search Categories
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['Photos', 'Documents', 'Messages', 'Settings'].map(category => (
                      <div
                        key={category}
                        style={{
                          padding: '15px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          textAlign: 'center',
                          fontSize: '14px',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </AtomixGlass>
            </div>
          );
        case 'notifications':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={60}
                blurAmount={0}
                cornerRadius={15}
                mode="standard"
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>Notifications</h3>
                    <button
                      onClick={clearNotifications}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        fontSize: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      Clear All
                    </button>
                  </div>

                  {notificationCount > 0 ? (
                    Array.from({ length: notificationCount }).map((_, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          backdropFilter: 'blur(10px)',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '16px',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            {index === 0 ? (
                              <Icon name="PhoneCall" />
                            ) : index === 1 ? (
                              <Icon name="Bell" />
                            ) : (
                              <Icon name="Envelope" />
                            )}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>
                              {index === 0
                                ? 'New Login Detected'
                                : index === 1
                                  ? 'Calendar Reminder'
                                  : 'New Message'}
                            </div>
                            <div style={{ fontSize: '12px', opacity: 0.7, color: 'white' }}>
                              {index === 0
                                ? 'A new device logged into your account'
                                : index === 1
                                  ? 'Meeting with design team in 30 minutes'
                                  : 'Sarah sent you a new message'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '30px 0',
                        opacity: 0.7,
                        fontSize: '14px',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      No new notifications
                    </div>
                  )}
                </div>
              </AtomixGlass>
            </div>
          );
        case 'profile':
          return (
            <div style={{ padding: '10px 0' }}>
              <AtomixGlass
                displacementScale={120}
                blurAmount={0}
                saturation={180}
                elasticity={0.16}
                cornerRadius={15}
                mode="standard"
                onClick={() => null}
              >
                <div
                  style={{
                    padding: '25px 20px',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(0,0,0,0.2))',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      marginBottom: '15px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Icon name="User" />
                  </div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'white' }}>
                    User Name
                  </h3>
                  <p
                    style={{ margin: '0 0 20px 0', fontSize: '14px', opacity: 0.7, color: 'white' }}
                  >
                    user@example.com
                  </p>
                  <Button label="Edit Profile" variant="erorr" size="md" />
                  <Button glass label="Settings" variant="dark" size="md" />
                </div>
              </AtomixGlass>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670'
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <AtomixGlass
                mode="standard"
                displacementScale={60}
                blurAmount={1}
                saturation={130}
                cornerRadius={24}
                elasticity={0.1}
                style={{ marginBottom: '24px', display: 'inline-block' }}
              >
                <div
                  style={{
                    padding: '12px 24px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <span>📱</span>
                  <span>Mobile Optimized</span>
                </div>
              </AtomixGlass>
              <h2
                style={{
                  margin: '0 0 20px 0',
                  fontSize: '40px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-1px',
                }}
              >
                Mobile UI Example
              </h2>

              <p
                style={{
                  fontSize: '18px',
                  maxWidth: '680px',
                  margin: '0 auto',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.7,
                }}
              >
                AtomixGlass components optimized for mobile interfaces with touch-friendly controls
                and responsive design
              </p>
            </div>
          </div>
          {/* Phone frame */}
          <div style={phoneFrameStyle}>
            <div style={phoneScreenStyle}>
              <div style={phoneNotchStyle} />

              {/* App content */}
              <div style={appContentStyle}>
                {/* Header */}
                <AtomixGlass
                  displacementScale={20}
                  blurAmount={1}
                  saturation={180}
                  elasticity={0}
                  cornerRadius={26}
                  mode="shader"
                  shaderVariant="premiumGlass"
                  onClick={() => null}
                >
                  <div style={headerStyle}>
                    <h2 style={{ margin: 0, fontSize: '18px' }}>
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon name="User" />
                    </div>
                  </div>
                </AtomixGlass>

                {/* Main content area */}
                <div style={mainContentStyle}>{renderTabContent()}</div>

                {/* Bottom navigation */}
                <AtomixGlass
                  displacementScale={25}
                  elasticity={0}
                  cornerRadius={18}
                  mode="shader"
                  shaderVariant="premiumGlass"
                  onClick={() => null}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      padding: '5px 10px',
                      background:
                        'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.1))',
                      borderRadius: '18px',
                    }}
                  >
                    {[
                      { id: 'home', icon: <Icon name="House" /> },
                      { id: 'search', icon: <Icon name="MagnifyingGlass" /> },
                      { id: 'notifications', icon: <Icon name="Bell" />, badge: notificationCount },
                      { id: 'profile', icon: <Icon name="User" /> },
                    ].map(tab => (
                      <div
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          opacity: activeTab === tab.id ? 1 : 0.6,
                          position: 'relative',
                          padding: '10px 20px',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '10px',
                          background:
                            'linear-gradient(to left, rgba(255,255,255,0.5), rgba(0,0,0,0.5))',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{tab.icon}</div>
                        {tab.badge && tab.badge > 0 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-5px',
                              background:
                                'linear-gradient(to top, rgba(255,0,0,0.6), rgba(255,0,0,7))',
                              color: 'white',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            {tab.badge}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AtomixGlass>
              </div>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates how AtomixGlass components can be optimized for mobile interfaces. The design showcases a complete mobile app UI with navigation tabs, responsive layouts, and touch-friendly controls. The glass effect provides a modern and elegant look while maintaining excellent readability and usability on smaller screens.',
      },
    },
  },
};

/**
 * Apple-inspired UI example showcasing the liquid glass effect
 *
 * This story demonstrates how to create Apple-like interfaces using the AtomixGlass component,
 * mimicking the frosted glass effect seen in macOS and iOS with realistic design elements
 * and interactions that closely resemble Apple's design language.
 */
export const AppleInspiredUI: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentTime, setCurrentTime] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hoverDockItem, setHoverDockItem] = useState<number | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notificationCount, setNotificationCount] = useState(3);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Update time every minute
      const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      };

      updateTime();
      const interval = setInterval(updateTime, 60000);

      return () => clearInterval(interval);
    }, []);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    // Apple-style app icons with gradient backgrounds
    const appIcons = [
      {
        name: 'Photos',
        color: 'linear-gradient(135deg, #FF9500, #FF2D55)',
        symbol: <Icon name="Image" />,
      },
      {
        name: 'Music',
        color: 'linear-gradient(135deg, #FF2D55, #AF52DE)',
        symbol: <Icon name="MusicNotes" />,
      },
      {
        name: 'Mail',
        color: 'linear-gradient(135deg, #5AC8FA, #007AFF)',
        symbol: <Icon name="Envelope" />,
      },
      {
        name: 'Maps',
        color: 'linear-gradient(135deg, #34C759, #5AC8FA)',
        symbol: <Icon name="MapPin" />,
      },
      {
        name: 'Weather',
        color: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
        symbol: <Icon name="Sun" />,
      },
      {
        name: 'Notes',
        color: 'linear-gradient(135deg, #FFCC00, #FF9500)',
        symbol: <Icon name="Notebook" />,
      },
    ];

    // Dock apps with more realistic icons
    const dockApps = [
      {
        name: 'Finder',
        symbol: <Icon name="MagnifyingGlass" />,
        color: 'linear-gradient(135deg, #1E88E5, #64B5F6)',
      },
      {
        name: 'Safari',
        symbol: <Icon name="MapPin" />,
        color: 'linear-gradient(135deg, #039BE5, #81D4FA)',
      },
      {
        name: 'Messages',
        symbol: <Icon name="Chats" />,
        color: 'linear-gradient(135deg, #43A047, #81C784)',
      },
      {
        name: 'Calendar',
        symbol: <Icon name="Calendar" />,
        color: 'linear-gradient(135deg, #E53935, #EF5350)',
      },
      {
        name: 'Photos',
        symbol: <Icon name="Image" />,
        color: 'linear-gradient(135deg, #8E24AA, #BA68C8)',
      },
    ];

    return (
      <BackgroundWrapper
        backgroundImage={
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2128'
        }
        height="90vh"
        style={{ maxWidth: '90vw', padding: '10px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '90vh',
            width: '100%',
          }}
        >
          {/* Top menu bar - macOS style */}
          <AtomixGlass
            displacementScale={70}
            blurAmount={0}
            saturation={150}
            cornerRadius={8}
            mode="shader"
            shaderVariant="premiumGlass"
            elasticity={0}
          >
            <div
              style={{
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '77vw',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#fff' }}>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ fontSize: '22px' }}>
                    <Icon name="AppleLogo" />
                  </span>
                  <span>Atomix</span>
                </span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['Finder', 'File', 'Edit', 'View', 'Window', 'Help'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab.toLowerCase())}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor:
                          activeTab === tab.toLowerCase()
                            ? 'rgba(255,255,255,0.15)'
                            : 'transparent',
                        transition: 'all 0.2s ease',
                        fontSize: '13px',
                        fontWeight: activeTab === tab.toLowerCase() ? 600 : 400,
                        color: 'inherit',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#fff' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', fontSize: '12px', gap: '4px' }}
                >
                  <span>
                    <Icon name="BatteryFull" />
                  </span>
                  <span>75%</span>
                </div>
                <div style={{ fontSize: '14px' }}>
                  <Icon name="WifiX" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>
                  {currentTime || '10:30 AM'}
                </span>
                <div
                  style={{
                    position: 'relative',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #64B5F6, #1976D2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  }}
                >
                  <Icon name="Airplane" />
                  {notificationCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: '#FF3B30',
                        color: 'white',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.8)',
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AtomixGlass>

          {/* Center widget - iOS style */}
          <AtomixGlass
            displacementScale={50}
            blurAmount={2}
            shaderVariant="premiumGlass"
            cornerRadius={24}
            mode="shader"
            elasticity={0}
          >
            <div style={{ padding: '30px' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                  marginBottom: '24px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                🍎 Apple-Inspired Design
              </div>
              <h2
                style={{
                  marginTop: 0,
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                Welcome to Atomix OS
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '28px',
                }}
              >
                {appIcons.map(app => (
                  <div
                    key={app.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: app.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer',
                      }}
                    >
                      {app.symbol}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, opacity: 0.9 }}>
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              <AtomixGlass
                displacementScale={12}
                blurAmount={5}
                saturation={130}
                aberrationIntensity={1}
                cornerRadius={16}
                elasticity={0}
                mode="shader"
              >
                <div style={{ padding: '18px', fontSize: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        fontSize: '16px',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>
                        <Icon name="BellRinging" />
                      </span>
                      <span
                        style={{
                          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Notifications
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: 'rgba(255,45,85,0.25)',
                        border: '1px solid rgba(255,45,85,0.4)',
                        color: '#FF2D55',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(255,45,85,0.3)',
                      }}
                    >
                      {notificationCount} New
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '10px 0',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          marginBottom: '6px',
                          fontSize: '15px',
                          color: 'rgba(255, 255, 255, 0.95)',
                        }}
                      >
                        New Atomix Glass Component
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.85, color: 'rgba(255, 255, 255, 0.85)' }}>
                        Experience the next generation of UI effects
                      </div>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      <Icon name="Star" />
                    </div>
                  </div>
                </div>
              </AtomixGlass>
            </div>
          </AtomixGlass>

          {/* Bottom dock - macOS style */}
          <AtomixGlass
            displacementScale={15}
            blurAmount={2}
            saturation={140}
            aberrationIntensity={1.2}
            cornerRadius={24}
            mode="polar"
            style={{ maxWidth: '600px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                padding: '6px',
              }}
            >
              {dockApps.map((app, index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: app.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform:
                      hoverDockItem === index
                        ? 'translateY(-10px) scale(1.1)'
                        : 'translateY(0) scale(1)',
                    boxShadow:
                      hoverDockItem === index
                        ? '0 10px 20px rgba(0,0,0,0.2)'
                        : '0 4px 10px rgba(0,0,0,0.1)',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoverDockItem(index)}
                  onMouseLeave={() => setHoverDockItem(null)}
                >
                  {app.symbol}
                  {hoverDockItem === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.name}
                    </div>
                  )}
                </div>
              ))}

              <div
                style={{
                  width: '1px',
                  height: '30px',
                  background: 'rgba(255,255,255,0.3)',
                  margin: '0 4px',
                }}
              />

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform:
                    hoverDockItem === 999
                      ? 'translateY(-10px) scale(1.1)'
                      : 'translateY(0) scale(1)',
                  boxShadow:
                    hoverDockItem === 999
                      ? '0 10px 20px rgba(0,0,0,0.2)'
                      : '0 4px 10px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={() => setHoverDockItem(999)}
                onMouseLeave={() => setHoverDockItem(null)}
              >
                🗑️
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An enhanced Apple-inspired UI example showcasing how to create macOS and iOS-like interfaces using the AtomixGlass component. This example includes a realistic menu bar with status icons, app grid with gradient icons, notification center, and an interactive dock with hover effects - all with the signature Apple frosted glass aesthetic.',
      },
    },
  },
};
