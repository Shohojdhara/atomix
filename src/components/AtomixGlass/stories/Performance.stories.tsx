/**
 * Performance.stories.tsx
 *
 * Stories focusing on performance optimization and stress testing.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages } from './shared-components';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Features/Performance',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Performance-focused examples including mobile optimization and stress testing with multiple instances.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

export const OptimizedForMobile: Story = {
  args: {
    children: (
      <div className="u-text-center">
        <h3 className="u-m-0 u-text-white u-text-20 u-mb-3">Mobile Optimized</h3>
        <p className="u-m-0 u-text-white u-opacity-90 u-text-14">
          Lower intensity settings for better mobile performance
        </p>
      </div>
    ),
    displacementScale: 30, // Lower for performance
    blurAmount: 0.2,
    saturation: 120,
    aberrationIntensity: 1.0,
    elasticity: 0.1,
    cornerRadius: 16,
    padding: '28px',
  },
  render: args => (
    <div className="u-bg-gradient-to-br u-from-indigo-500 u-via-purple-500 u-to-blue-500 u-min-h-screen u-w-full u-flex u-items-center u-justify-center">
      <div className="u-w-full u-h-full">
        <div className="u-flex u-justify-center u-items-center u-h-full">
          <AtomixGlass {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Optimized configuration for mobile devices with reduced performance impact.',
      },
    },
  },
};

export const WithManyInstances: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows multiple instances of AtomixGlass in a single view - useful for performance testing.',
      },
    },
  },
  render: () => {
    return (
      <BackgroundWrapper backgroundImage={backgroundImages[3]}>
        <div className="u-flex u-flex-wrap u-gap-6 u-w-full u-py-60 u-max-w-7xl u-mx-auto u-p-4 u-justify-center">
          {[1, 2, 3, 4].map(index => (
            <AtomixGlass
              key={index}
              displacementScale={40}
              blurAmount={0.25}
              saturation={130}
              aberrationIntensity={1.2}
              elasticity={0.1}
              cornerRadius={16}
              padding="28px"
              className="u-text-center"
            >
              <h4 className="u-m-0 u-text-white u-text-18 u-mb-2">Glass #{index}</h4>
              <p className="u-m-0 u-text-white u-opacity-80 u-text-14">
                Instance #{index} of AtomixGlass
              </p>
            </AtomixGlass>
          ))}
        </div>
      </BackgroundWrapper>
    );
  },
};
