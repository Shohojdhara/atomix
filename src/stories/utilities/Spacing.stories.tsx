import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Spacing',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spacing utilities for margin and padding. Format: `.u-{property}{sides}-{size}`',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SPACING_SIZES = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '16',
  '20',
  '24',
  '32',
  'auto',
];

/**
 * Padding utilities using `.u-p-{size}` and directional variants.
 * Red background shows the element bounds, white inner box shows the content area to highlight padding.
 */
export const Padding: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h3 className="u-fs-lg u-mb-4">Uniform Padding (.u-p-*)</h3>
        <div className="u-flex u-flex-wrap u-gap-4">
          {['2', '4', '8'].map(size => (
            <div key={size} className="u-flex u-flex-column u-items-center u-gap-2">
              <div className={`u-bg-primary-subtle u-p-${size} u-rounded`}>
                <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
              </div>
              <code>.u-p-{size}</code>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="u-fs-lg u-mb-4">Directional Padding</h3>
        <div className="u-flex u-flex-wrap u-gap-8">
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-pt-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-pt-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-pe-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-pe-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-pb-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-pb-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-ps-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-ps-6</code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-fs-lg u-mb-4">Axis Padding (X and Y)</h3>
        <div className="u-flex u-flex-wrap u-gap-8">
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-px-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-px-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div className="u-bg-primary-subtle u-py-6 u-rounded">
              <div className="u-bg-white u-border u-border-primary u-w-16 u-h-16 u-rounded" />
            </div>
            <code>.u-py-6</code>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Margin utilities using `.u-m-{size}` and directional variants.
 * Outline indicates the container, while the blue box is the element with margin.
 */
export const Margin: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h3 className="u-fs-lg u-mb-4">Uniform Margin (.u-m-*)</h3>
        <div className="u-flex u-flex-wrap u-gap-4">
          {['2', '4', '8'].map(size => (
            <div key={size} className="u-flex u-flex-column u-items-center u-gap-2">
              <div
                className="u-bg-gray-200 u-rounded u-overflow-hidden u-flex u-items-center u-justify-center"
                style={{ width: '100px', height: '100px' }}
              >
                <div className={`u-bg-primary u-w-full u-h-full u-rounded u-m-${size}`} />
              </div>
              <code>.u-m-{size}</code>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="u-fs-lg u-mb-4">Directional Margin</h3>
        <div className="u-flex u-flex-wrap u-gap-4">
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div
              className="u-bg-gray-200 u-rounded u-overflow-hidden u-flex u-items-center u-justify-center"
              style={{ width: '100px', height: '100px' }}
            >
              <div className="u-bg-primary u-w-full u-h-full u-rounded u-mt-6" />
            </div>
            <code>.u-mt-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div
              className="u-bg-gray-200 u-rounded u-overflow-hidden u-flex u-items-center u-justify-center"
              style={{ width: '100px', height: '100px' }}
            >
              <div className="u-bg-primary u-w-full u-h-full u-rounded u-me-6" />
            </div>
            <code>.u-me-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div
              className="u-bg-gray-200 u-rounded u-overflow-hidden u-flex u-items-center u-justify-center"
              style={{ width: '100px', height: '100px' }}
            >
              <div className="u-bg-primary u-w-full u-h-full u-rounded u-mb-6" />
            </div>
            <code>.u-mb-6</code>
          </div>
          <div className="u-flex u-flex-column u-items-center u-gap-2">
            <div
              className="u-bg-gray-200 u-rounded u-overflow-hidden u-flex u-items-center u-justify-center"
              style={{ width: '100px', height: '100px' }}
            >
              <div className="u-bg-primary u-w-full u-h-full u-rounded u-ms-6" />
            </div>
            <code>.u-ms-6</code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="u-fs-lg u-mb-4">Auto Margin</h3>
        <div className="u-bg-gray-200 u-p-4 u-rounded">
          <div className="u-bg-primary u-w-32 u-h-16 u-rounded u-m-auto u-flex u-items-center u-justify-center u-text-white">
            .u-m-auto
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Gap utilities using `.u-gap-{size}` for Flexbox and Grid layouts.
 */
export const Gap: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {['2', '4', '8'].map(size => (
        <div key={size}>
          <code className="u-mb-2 u-block">.u-gap-{size}</code>
          <div className={`u-flex u-gap-${size} u-bg-gray-200 u-p-4 u-rounded u-w-fit`}>
            <div className="u-bg-primary u-w-16 u-h-16 u-rounded" />
            <div className="u-bg-primary u-w-16 u-h-16 u-rounded" />
            <div className="u-bg-primary u-w-16 u-h-16 u-rounded" />
          </div>
        </div>
      ))}
    </div>
  ),
};
