import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Motion',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Transition, transform, and state-variant utilities (opt-in motion bundle).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Transitions: Story = {
  render: () => (
    <div className="u-flex u-gap-4">
      <div className="u-transition-all u-duration-300 u-bg-primary u-text-white u-p-6 u-rounded">
        transition-all + duration-300
      </div>
      <div className="u-transition-colors u-duration-500 u-bg-secondary-subtle u-p-6 u-rounded">
        transition-colors
      </div>
    </div>
  ),
};

export const TransformScale: Story = {
  render: () => (
    <div className="u-flex u-gap-6">
      <div className="u-scale-90 u-bg-secondary-subtle u-p-6 u-rounded">scale 90</div>
      <div className="u-scale-100 u-bg-secondary-subtle u-p-6 u-rounded">scale 100</div>
      <div className="u-scale-110 u-bg-secondary-subtle u-p-6 u-rounded">scale 110</div>
    </div>
  ),
};

export const HoverScale: Story = {
  render: () => (
    <button
      type="button"
      className="u-bg-primary u-text-white u-px-6 u-py-3 u-rounded u-shadow-md u-transition-transform u-duration-200 u-hover-scale-105"
    >
      Hover to scale up
    </button>
  ),
};

export const Rotate: Story = {
  render: () => (
    <div className="u-flex u-gap-6 u-items-center">
      <div className="u-rotate-0 u-bg-info-subtle u-p-4 u-rounded">0°</div>
      <div className="u-rotate-45 u-bg-info-subtle u-p-4 u-rounded">45°</div>
      <div className="u-rotate-90 u-bg-info-subtle u-p-4 u-rounded">90°</div>
    </div>
  ),
};
