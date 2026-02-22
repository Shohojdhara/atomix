import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { THEME_COLORS } from '../../lib/constants/components';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Borders and Shadows',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Utility classes for applying borders, border radii, and box shadows to elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Applying base borders and directional borders.
 */
export const Borders: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-8">
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-border u-w-24 u-h-24 u-bg-gray-50 u-flex u-items-center u-justify-center">
          All
        </div>
        <code>.u-border</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-border-t u-w-24 u-h-24 u-bg-gray-50 u-flex u-items-center u-justify-center">
          Top
        </div>
        <code>.u-border-t</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-border-e u-w-24 u-h-24 u-bg-gray-50 u-flex u-items-center u-justify-center">
          End
        </div>
        <code>.u-border-e</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-border-b u-w-24 u-h-24 u-bg-gray-50 u-flex u-items-center u-justify-center">
          Bottom
        </div>
        <code>.u-border-b</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-border-s u-w-24 u-h-24 u-bg-gray-50 u-flex u-items-center u-justify-center">
          Start
        </div>
        <code>.u-border-s</code>
      </div>
    </div>
  ),
};

/**
 * Applying colored borders using `.u-border-{color}`
 */
export const BorderColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-6">
      {THEME_COLORS.map(color => (
        <div key={`border-${color}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div className={`u-border u-border-${color} u-w-24 u-h-24 u-rounded-md u-bg-gray-50`} />
          <code className="u-fs-sm">.u-border-{color}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Applying subtle colored borders using `.u-border-{color}-subtle`
 */
export const SubtleBorderColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-6">
      {THEME_COLORS.map(color => (
        <div key={`border-subtle-${color}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-border u-border-${color}-subtle u-w-24 u-h-24 u-rounded-md u-bg-gray-50`}
          />
          <code className="u-fs-sm">.u-border-{color}-subtle</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Border radius applying `.u-rounded-{size}`
 */
export const BorderRadius: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-6">
      {[
        { size: '0', label: 'None' },
        { size: 'sm', label: 'Small' },
        { size: 'md', label: 'Medium' },
        { size: 'lg', label: 'Large' },
        { size: 'xl', label: 'X-Large' },
        { size: 'xxl', label: 'XX-Large' },
        { size: 'circle', label: 'Circle' },
        { size: 'pill', label: 'Pill' },
      ].map(({ size, label }) => (
        <div key={`rounded-${size}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-primary u-text-white u-min-w-24 u-h-24 u-flex u-items-center u-justify-center u-px-4 u-rounded-${size}`}
          >
            {label}
          </div>
          <code className="u-fs-sm">.u-rounded-{size}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Box Shadow applying `.u-shadow-{size}`
 */
export const Shadows: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-8 u-p-4">
      {[
        { size: 'none', label: 'None' },
        { size: 'xs', label: 'X-Small' },
        { size: 'sm', label: 'Small' },
        { size: 'null', label: 'Default' },
        { size: 'lg', label: 'Large' },
        { size: 'xl', label: 'X-Large' },
        { size: 'inset', label: 'Inset' },
      ].map(({ size, label }) => (
        <div key={`shadow-${size}`} className="u-flex u-flex-column u-items-center u-gap-4">
          <div
            className={`${size === 'null' ? 'u-shadow' : `u-shadow-${size}`} u-w-32 u-h-32 u-rounded-md u-bg-white u-flex u-items-center u-justify-center`}
          >
            {label}
          </div>
          <code className="u-fs-sm">{size === 'null' ? '.u-shadow' : `.u-shadow-${size}`}</code>
        </div>
      ))}
    </div>
  ),
};
