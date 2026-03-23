/**
 * CardExamples.stories.tsx
 *
 * Card-based layouts and content containers using AtomixGlass.
 * Perfect for dashboards, profiles, and content grids.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';

import { Button } from '../../Button';
import { Badge } from '../../Badge';
import { Avatar } from '../../Avatar';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Card Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card-based examples demonstrating AtomixGlass for content containers, profiles, and dashboard elements.',
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
 * Profile Card
 *
 * User profile card with avatar and social links.
 */
export const ProfileCard: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[1]} overlay overlayOpacity={0.3}>
        <div style={{ maxWidth: '400px' }}>
          <AtomixGlass
            displacementScale={70}
            blurAmount={0.5}
            saturation={140}
            borderRadius={24}
            mode="standard"
            padding="32px"
          >
            <div className="u-text-center u-text-white">
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                alt="User avatar"
                size="xl"
                className="u-mb-4"
              />
              <h3 className="u-mt-0 u-text-xl u-font-bold u-mb-2">Sarah Johnson</h3>
              <p className="u-text-sm u-opacity-90 u-mb-4">Senior Product Designer</p>
              <Badge variant="secondary" label="Available for hire" className="u-mb-4" />
              <div className="u-flex u-gap-2 u-justify-center u-flex-wrap" style={{ gap: '12px' }}>
                <Button glass size="sm" variant="primary">
                  Follow
                </Button>
                <Button glass size="sm" variant="outline-light">
                  Message
                </Button>
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
        story: 'User profile card with avatar, badges, and action buttons.',
      },
    },
  },
};

/**
 * Stats Card
 *
 * Dashboard statistics card with icon and metrics.
 */
export const StatsCard: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[3]}>
        <div style={{ maxWidth: '320px' }}>
          <AtomixGlass
            displacementScale={60}
            blurAmount={0.4}
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
                >
                  📊
                </div>
                <Badge variant="success" label="+12.5%" />
              </div>
              <p className="u-text-sm u-opacity-80 u-mb-1">Total Revenue</p>
              <h3 className="u-mt-0 u-text-3xl u-font-bold u-mb-2">$48,295</h3>
              <p className="u-text-xs u-opacity-70">Compared to $42,890 last month</p>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard statistics card displaying metrics with trend indicators.',
      },
    },
  },
};

/**
 * Content Card
 *
 * Blog post or article preview card.
 */
export const ContentCard: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[6]}>
        <div style={{ maxWidth: '420px' }}>
          <AtomixGlass
            displacementScale={65}
            blurAmount={0.5}
            saturation={135}
            borderRadius={20}
            mode="standard"
            padding="0"
          >
            <div className="u-text-white">
              <div
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px 20px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                }}
                aria-hidden="true"
              >
                🎨
              </div>
              <div className="u-p-6" style={{ padding: '24px' }}>
                <div className="u-flex u-items-center u-gap-2 u-mb-3">
                  <Badge variant="primary" label="Design" />
                  <span className="u-text-xs u-opacity-70">5 min read</span>
                </div>
                <h3 className="u-mt-0 u-text-xl u-font-bold u-mb-2">
                  The Future of Glass Morphism in UI Design
                </h3>
                <p className="u-text-sm u-opacity-80 u-line-height-relaxed u-mb-4">
                  Exploring how glass morphism continues to shape modern interface design trends
                  and user expectations.
                </p>
                <Button glass size="sm" variant="outline-light" className="u-w-full">
                  Read Article
                </Button>
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
        story: 'Content card for blog posts or articles with category badge and call-to-action.',
      },
    },
  },
};
