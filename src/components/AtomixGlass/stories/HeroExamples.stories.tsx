/**
 * HeroExamples.stories.tsx
 *
 * Hero section and landing page examples for AtomixGlass.
 * Demonstrates usage in prominent, attention-grabbing layouts.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';
import type { AtomixGlassStoryProps } from './types';

import { Button } from '../../Button';
import { Badge } from '../../Badge';
import { Container } from '../../../layouts/Grid';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/Hero Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section examples showing how to use AtomixGlass for landing pages and prominent UI elements.',
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
 * Basic Hero Section
 *
 * A clean hero section with gradient background and call-to-action buttons.
 */
export const BasicHero: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[2]}>
        <div style={{ maxWidth: '900px' }} className="u-mx-auto">
          <AtomixGlass
            displacementScale={100}
            blurAmount={1}
            borderRadius={30}
            mode="shader"
            shaderVariant="premiumGlass"
            padding="48px 40px"
          >
            <div className="u-text-center u-text-white">
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
                aria-hidden="true"
              >
                ✨
              </div>
              <h1
                className="u-mt-0 u-text-1 u-font-bold"
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
                className="u-text-4 u-mb-4"
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
              <div className="u-flex u-gap-3 u-justify-center u-flex-wrap" style={{ gap: '16px' }}>
                <Button glass size="lg">
                  Get Started
                </Button>
                <Button glass variant="light" size="lg">
                  Learn More
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
        story:
          'A basic hero section demonstrating AtomixGlass for landing page headers with call-to-action buttons.',
      },
    },
  },
};

/**
 * Feature Announcement Hero
 *
 * Hero section highlighting a new feature or product announcement.
 */
export const FeatureAnnouncement: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[4]} overlay overlayOpacity={0.3}>
        <div style={{ maxWidth: '1000px' }} className="u-mx-auto">
          <AtomixGlass
            displacementScale={80}
            blurAmount={0.5}
            saturation={140}
            borderRadius={24}
            mode="standard"
            padding="40px"
          >
            <div className="u-flex u-flex-column u-items-center u-text-center">
              <Badge variant="primary" size="lg" className="u-mb-4" label="New Release" />
              <h2
                className="u-mt-0 u-text-1 u-font-bold u-text-white"
                style={{ fontSize: '42px', marginBottom: '16px' }}
              >
                Introducing Dark Mode
              </h2>
              <p
                className="u-text-4 u-mb-5"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '700px',
                  margin: '0 auto 32px',
                }}
              >
                Experience your favorite interface in a whole new light. Dark mode reduces eye strain
                and provides a modern aesthetic for nighttime usage.
              </p>
              <div className="u-flex u-gap-3" style={{ gap: '16px' }}>
                <Button glass size="lg" variant="primary">
                  Try Dark Mode
                </Button>
                <Button glass size="lg" variant="outline-light">
                  Read Documentation
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
        story:
          'Feature announcement hero with badge and dual call-to-action buttons for product updates.',
      },
    },
  },
};

/**
 * Pricing Hero Section
 *
 * Hero section designed for pricing or product showcase pages.
 */
export const PricingHero: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.4}>
        <Container>
          <div className="u-py-5">
            <AtomixGlass
              displacementScale={90}
              blurAmount={0.75}
              saturation={150}
              borderRadius={28}
              mode="prominent"
              padding="48px"
            >
              <div className="u-text-center u-text-white">
                <h1
                  className="u-mt-0 u-text-1 u-font-bold"
                  style={{
                    fontSize: '56px',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Simple, Transparent Pricing
                </h1>
                <p
                  className="u-text-4 u-mb-5"
                  style={{
                    fontSize: '20px',
                    lineHeight: 1.8,
                    color: 'rgba(255, 255, 255, 0.95)',
                    maxWidth: '650px',
                    margin: '0 auto 40px',
                  }}
                >
                  Choose the perfect plan for your needs. No hidden fees, no surprises.
                </p>
                <div
                  className="u-flex u-gap-4 u-justify-center u-flex-wrap"
                  style={{ gap: '20px' }}
                >
                  <Button glass size="xl" variant="primary">
                    Start Free Trial
                  </Button>
                  <Button glass size="xl" variant="outline-light">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </Container>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pricing page hero with gradient text effect and prominent call-to-action buttons.',
      },
    },
  },
};
