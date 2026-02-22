import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Sizing',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sizing utilities for width and height. Includes relative sizing (percentages like `50`), absolute literal sizes matching spacing tokens (e.g., `16`, `32`, `64`), viewport sizing, and max/min limits.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const PERCENTAGES = ['5', '10', '25', '50', '75', '100'];
const ABSOLUTE_SIZES = ['16', '32', '64'];

/**
 * Width relative to parent using `.u-w-{percentage}` or strict sizes using `.u-w-{size}`
 */
export const Widths: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4 u-w-full u-bg-gray-100 u-p-4 u-rounded">
      <h4 className="u-fs-md u-mb-2">Percentage Widths</h4>
      {PERCENTAGES.map(size => (
        <div key={`w-${size}`} className="u-flex u-items-center u-gap-4">
          <div className="u-w-24">
            <code>.u-w-{size}</code>
          </div>
          <div className={`u-bg-primary u-text-white u-p-2 u-rounded u-w-${size} u-text-center`}>
            {size}%
          </div>
        </div>
      ))}

      <h4 className="u-fs-md u-mb-2 u-mt-4">Absolute Widths</h4>
      {ABSOLUTE_SIZES.map(size => (
        <div key={`w-abs-${size}`} className="u-flex u-items-center u-gap-4">
          <div className="u-w-24">
            <code>.u-w-{size}</code>
          </div>
          <div className={`u-bg-secondary u-text-white u-p-2 u-rounded u-w-${size} u-text-center`}>
            {size}
          </div>
        </div>
      ))}

      <div className="u-flex u-items-center u-gap-4 u-mt-4">
        <div className="u-w-24">
          <code>.u-w-auto</code>
        </div>
        <div className="u-bg-primary u-text-white u-p-2 u-rounded u-w-auto u-text-center">
          Auto Width based on content
        </div>
      </div>
    </div>
  ),
};

/**
 * Min and Max Widths
 */
export const MinMaxWidths: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <div>
        <h4 className="u-mb-2">Max Width 100%</h4>
        <div className="u-w-64 u-bg-gray-100 u-p-4 u-rounded">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80"
            alt="Placeholder"
            className="u-max-w-100 u-rounded"
          />
          <code className="u-mt-2 u-block u-text-center">.u-max-w-100</code>
        </div>
      </div>
    </div>
  ),
};

/**
 * Height relative to parent using `.u-h-{percentage}`
 * Parent container must have a defined height.
 */
export const Heights: Story = {
  render: () => (
    <div className="u-flex u-gap-4 u-h-64 u-bg-gray-100 u-p-4 u-rounded u-items-end">
      {PERCENTAGES.map(size => (
        <div key={`h-${size}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-primary u-text-white u-rounded u-w-16 u-h-${size} u-flex u-items-center u-justify-center u-fs-sm`}
          >
            {size}%
          </div>
          <code className="u-fs-sm">.u-h-{size}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Viewport dimensions
 */
export const ViewportSizing: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <div className="u-p-4 u-border u-border-gray-200 u-rounded">
        <code>.u-vw-100</code> - Width is 100% of viewport width
      </div>
      <div className="u-p-4 u-border u-border-gray-200 u-rounded">
        <code>.u-vh-100</code> - Height is 100% of viewport height
      </div>
      <div className="u-p-4 u-border u-border-gray-200 u-rounded">
        <code>.u-min-vh-100</code> - Minimum height is 100% of viewport height
      </div>
    </div>
  ),
};
