/**
 * DashboardExamples.stories.tsx
 *
 * Dashboard UI components and widgets using AtomixGlass.
 * Perfect for analytics, stats cards, and data visualization interfaces.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';

import { Badge } from '../../Badge';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Dashboard Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard UI examples demonstrating AtomixGlass for analytics, statistics, and data visualization interfaces.',
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
 * Analytics Dashboard
 *
 * Complete dashboard layout with multiple stats cards and metrics.
 */
export const AnalyticsDashboard: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[5]} overlay overlayOpacity={0.4}>
        <div style={{ padding: '40px 24px', minHeight: '100vh' }}>
          <div className="u-mb-5 u-text-white">
            <h1 className="u-m-0 u-text-3xl u-font-bold">Analytics Overview</h1>
            <p className="u-mt-1 u-opacity-80">Track your performance metrics</p>
          </div>
          
          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            {/* Revenue Card */}
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.5}
              saturation={130}
              borderRadius={20}
              mode="standard"
              padding="28px"
            >
              <div className="u-text-white">
                <div className="u-flex u-items-center u-justify-between u-mb-3">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}
                    aria-hidden="true"
                  >
                    💰
                  </div>
                  <Badge variant="success">+12.5%</Badge>
                </div>
                <p className="u-text-sm u-opacity-80 u-mb-1">Total Revenue</p>
                <h3 className="u-mt-0 u-text-3xl u-font-bold u-mb-2">$48,295</h3>
                <p className="u-text-xs u-opacity-70">Compared to $42,890 last month</p>
              </div>
            </AtomixGlass>
            
            {/* Users Card */}
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.5}
              saturation={130}
              borderRadius={20}
              mode="standard"
              padding="28px"
            >
              <div className="u-text-white">
                <div className="u-flex u-items-center u-justify-between u-mb-3">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(168, 85, 247, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}
                    aria-hidden="true"
                  >
                    👥
                  </div>
                  <Badge variant="success">+8.2%</Badge>
                </div>
                <p className="u-text-sm u-opacity-80 u-mb-1">Active Users</p>
                <h3 className="u-mt-0 u-text-3xl u-font-bold u-mb-2">12,847</h3>
                <p className="u-text-xs u-opacity-70">1,234 users online now</p>
              </div>
            </AtomixGlass>
            
            {/* Orders Card */}
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.5}
              saturation={130}
              borderRadius={20}
              mode="standard"
              padding="28px"
            >
              <div className="u-text-white">
                <div className="u-flex u-items-center u-justify-between u-mb-3">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(236, 72, 153, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}
                    aria-hidden="true"
                  >
                    📦
                  </div>
                  <Badge variant="danger">-3.1%</Badge>
                </div>
                <p className="u-text-sm u-opacity-80 u-mb-1">Total Orders</p>
                <h3 className="u-mt-0 u-text-3xl u-font-bold u-mb-2">1,429</h3>
                <p className="u-text-xs u-opacity-70">Compared to 1,475 last month</p>
              </div>
            </AtomixGlass>
            
            {/* Conversion Card */}
            <AtomixGlass
              displacementScale={60}
              blurAmount={0.5}
              saturation={130}
              borderRadius={20}
              mode="standard"
              padding="28px"
            >
              <div className="u-text-white">
                <div className="u-flex u-items-center u-justify-between u-mb-3">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(251, 191, 36, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}
                    aria-hidden="true"
                  >
                    📈
                  </div>
                  <Badge variant="success">+4.3%</Badge>
                </div>
                <p className="u-text-sm u-opacity-80 u-mb-1">Conversion Rate</p>
                <h3 className="u-mt-0 u-text-3xl u-font-bold u-mb-2">3.24%</h3>
                <p className="u-text-xs u-opacity-70">Industry average: 2.86%</p>
              </div>
            </AtomixGlass>
          </div>
          
          {/* Recent Activity Section */}
          <AtomixGlass
            displacementScale={65}
            blurAmount={0.6}
            saturation={135}
            borderRadius={20}
            mode="standard"
          >
            <div className="u-text-white" style={{ padding: '28px' }}>
              <h2 className="u-mt-0 u-text-xl u-font-bold u-mb-4">Recent Activity</h2>
              
              <div className="u-divide-y" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {[
                  { action: 'New order received', time: '2 minutes ago', icon: '🛒', color: 'rgba(99, 102, 241, 0.2)' },
                  { action: 'Payment processed', time: '15 minutes ago', icon: '💳', color: 'rgba(34, 197, 94, 0.2)' },
                  { action: 'User registered', time: '1 hour ago', icon: '👤', color: 'rgba(168, 85, 247, 0.2)' },
                  { action: 'Product updated', time: '3 hours ago', icon: '✏️', color: 'rgba(251, 191, 36, 0.2)' },
                ].map((item, index) => (
                  <div key={index} className="u-py-3 u-flex u-items-center u-gap-3">
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    <div className="u-flex-1">
                      <p className="u-m-0 u-font-medium">{item.action}</p>
                      <p className="u-m-0 u-text-xs u-opacity-70">{item.time}</p>
                    </div>
                  </div>
                ))}
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
          'Complete analytics dashboard with stats cards, trend indicators, and recent activity feed.',
      },
    },
  },
};

/**
 * Weather Widget
 *
 * Compact weather information card with forecast.
 */
export const WeatherWidget: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[4]} overlay overlayOpacity={0.3}>
        <div style={{ maxWidth: '340px' }}>
          <AtomixGlass
            displacementScale={70}
            blurAmount={0.75}
            saturation={140}
            borderRadius={24}
            mode="standard"
            padding="32px"
          >
            <div className="u-text-center u-text-white">
              <div
                style={{
                  fontSize: '64px',
                  margin: '0 auto 16px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                }}
                aria-hidden="true"
              >
                ⛅
              </div>
              
              <h2 className="u-m-0 u-text-5xl u-font-bold" style={{ fontSize: '56px' }}>
                72°F
              </h2>
              <p className="u-m-0 u-text-lg u-opacity-90 u-mb-4">Partly Cloudy</p>
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  padding: '20px 0',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <p className="u-m-0 u-text-xs u-opacity-70">Wind</p>
                  <p className="u-m-0 u-font-semibold">12 mph</p>
                </div>
                <div>
                  <p className="u-m-0 u-text-xs u-opacity-70">Humidity</p>
                  <p className="u-m-0 u-font-semibold">45%</p>
                </div>
                <div>
                  <p className="u-m-0 u-text-xs u-opacity-70">UV Index</p>
                  <p className="u-m-0 u-font-semibold">Moderate</p>
                </div>
              </div>
              
              {/* 3-Day Forecast */}
              <div className="u-flex u-justify-between u-gap-2">
                {[
                  { day: 'Thu', temp: '74°', icon: '☀️' },
                  { day: 'Fri', temp: '71°', icon: '🌧️' },
                  { day: 'Sat', temp: '69°', icon: '⛈️' },
                ].map((forecast, index) => (
                  <div key={index} className="u-text-center">
                    <p className="u-m-0 u-text-sm u-opacity-80">{forecast.day}</p>
                    <div style={{ fontSize: '24px', margin: '8px 0' }}>{forecast.icon}</div>
                    <p className="u-m-0 u-font-semibold">{forecast.temp}</p>
                  </div>
                ))}
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
          'Weather widget displaying current conditions, detailed metrics, and 3-day forecast.',
      },
    },
  },
};
