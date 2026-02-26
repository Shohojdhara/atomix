/**
 * Customization.stories.tsx
 *
 * Stories showcasing customization options and integration with other components.
 *
 * @package Atomix
 * @component AtomixGlass
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import Button from '../../Button/Button';
import Badge from '../../Badge/Badge';
import { BackgroundWrapper, backgroundImages } from './shared-components';
import { Icon } from '../../Icon/Icon'; // Assuming Icon is used or might be useful, added from Examples

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Features/Customization',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Examples of how to customize AtomixGlass with styles and integrate it with other Atomix components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

export const WithCustomStyling: Story = {
  args: {
    children: (
      <div className="u-text-center">
        <h2 className="u-text-4 u-font-semibold u-mb-4 u-text-white">Custom Styled Glass</h2>
        <p className="u-text-base u-mb-6 u-text-white">
          This glass uses custom styling properties.
        </p>
        <Button
          variant="primary"
          className="u-rounded-lg u-py-3 u-px-6"
          style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
        >
          Premium Effect
        </Button>
      </div>
    ),
    displacementScale: 70,
    blurAmount: 0.4,
    saturation: 160,
    aberrationIntensity: 1.8,
    borderRadius: 30,
    padding: '40px',
    style: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transition: 'transform 0.3s ease-in-out',
    },
  },
  render: args => (
    <BackgroundWrapper backgroundImage={backgroundImages[2]}>
      <div className="u-flex u-justify-center u-items-center u-w-full u-h-full">
        <AtomixGlass {...args} />
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to customize the AtomixGlass component with additional CSS styles and enhanced interactivity.',
      },
    },
  },
};

export const WithOtherComponents: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how AtomixGlass integrates with other components in the design system.',
      },
    },
  },
  render: () => {
    return (
      <BackgroundWrapper backgroundImage={backgroundImages[0]}>
        <div className="u-flex u-items-center u-justify-center u-w-full u-h-full">
          <AtomixGlass
            displacementScale={85}
            blurAmount={0.6}
            saturation={170}
            aberrationIntensity={2.2}
            elasticity={0.18}
            borderRadius={28}
            padding="36px"
            className="u-w-11/12 u-max-w-2xl"
          >
            <div className="u-mb-6">
              <h2 className="u-m-0 u-text-white u-text-28 u-mb-2">Integrated UI</h2>
              <p className="u-m-0 u-text-white u-opacity-90">
                Glass effect with multiple components
              </p>
            </div>

            <div className="u-flex u-flex-col u-gap-4 u-items-center">
              <Button variant="primary" glass className="u-w-full">
                Primary Action
              </Button>
              <Button variant="secondary" glass className="u-w-full">
                Secondary Action
              </Button>

              <div className="u-flex u-gap-3 u-mt-4">
                <Badge variant="success" label="Success" glass />
                <Badge variant="warning" label="Warning" glass />
              </div>
            </div>
          </AtomixGlass>
        </div>
      </BackgroundWrapper>
    );
  },
};
