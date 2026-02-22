import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Visibility and Opacity',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Utility classes for adjusting the opacity and visibility of elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Applying opacity using `.u-opacity-{value}`
 */
export const Opacity: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-6">
      {[10, 25, 50, 75, 100].map(value => (
        <div key={`opacity-${value}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div className="u-bg-gray-200 u-p-2 u-rounded-md">
            <div
              className={`u-opacity-${value} u-bg-primary u-text-white u-w-32 u-h-32 u-rounded-md u-flex u-items-center u-justify-center`}
            >
              {value}%
            </div>
          </div>
          <code className="u-fs-sm">.u-opacity-{value}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Controlling visibility
 */
export const Visibility: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h4 className="u-mb-2">Visible and Hidden</h4>
        <div className="u-flex u-gap-4 u-bg-gray-100 u-p-4 u-rounded">
          <div className="u-visible u-bg-primary u-text-white u-p-4 u-rounded">
            <code>.u-visible</code> (Default behavior)
          </div>
          <div className="u-invisible u-bg-primary u-text-white u-p-4 u-rounded">(Invisible)</div>
          <span className="u-fs-sm u-text-gray-500 u-self-center">
            &larr; Hidden element still takes up space in layout
          </span>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Visually Hidden (For screen readers only)</h4>
        <div className="u-bg-gray-100 u-p-4 u-rounded">
          <p>The content below is visually hidden but available to assistive technologies:</p>
          <div className="u-visually-hidden">This text is only available to screen readers.</div>
          <code className="u-mt-2 u-block">.u-visually-hidden</code>
        </div>
      </div>
    </div>
  ),
};
