import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { THEME_COLORS } from '../../lib/constants/components';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Backgrounds',
  component: dummyComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utility classes for setting the background color of an element. The naming convention is `.u-bg-{color}`. We also provide subtle variants using `.u-bg-{color}-subtle`.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const EXTENDED_COLORS = ['black', 'white', 'body'];

/**
 * Standard theme background colors.
 */
export const ThemeColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      {THEME_COLORS.map(color => (
        <div key={color} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-${color} u-w-24 u-h-24 u-rounded-md u-shadow-sm u-flex u-items-center u-justify-center`}
          >
            <span className={color === 'light' ? 'u-text-black' : 'u-text-white'}>Aa</span>
          </div>
          <code className="u-text-sm">.u-bg-{color}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Subtle theme background colors using the `-subtle` suffix.
 */
export const SubtleColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      {THEME_COLORS.map(color => (
        <div key={`subtle-${color}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-${color}-subtle u-w-24 u-h-24 u-rounded-md u-shadow-sm u-flex u-items-center u-justify-center`}
          >
            <span className={`u-text-${color}`}>Aa</span>
          </div>
          <code className="u-text-sm">.u-bg-{color}-subtle</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Extended background colors.
 */
export const ExtendedColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      {EXTENDED_COLORS.map(color => (
        <div key={color} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-${color} u-w-24 u-h-24 u-rounded-md u-shadow-sm u-border u-border-gray-200 u-flex u-items-center u-justify-center`}
          >
            <span className={color === 'black' ? 'u-text-white' : 'u-text-black'}>Aa</span>
          </div>
          <code className="u-text-sm">.u-bg-{color}</code>
        </div>
      ))}
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-bg-transparent u-w-24 u-h-24 u-rounded-md u-border u-border-dashed u-border-gray-400 u-flex u-items-center u-justify-center">
          <span className="u-text-gray-600">Aa</span>
        </div>
        <code className="u-text-sm">.u-bg-transparent</code>
      </div>
    </div>
  ),
};

/**
 * Gradient background classes.
 */
export const Gradients: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      {THEME_COLORS.map(color => (
        <div key={`gradient-${color}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <div
            className={`u-bg-gradient-${color} u-w-24 u-h-24 u-rounded-md u-shadow-sm u-flex u-items-center u-justify-center`}
          >
            <span className="u-text-white">Aa</span>
          </div>
          <code className="u-text-sm">.u-bg-gradient-{color}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Glass effect utility classes.
 */
export const GlassEffects: Story = {
  decorators: [
    Story => (
      <div className="u-p-12 u-bg-gradient-primary u-rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-glass u-w-32 u-h-32 u-rounded-md u-flex u-items-center u-justify-center">
          <span className="u-text-white u-font-medium">Glass</span>
        </div>
        <code className="u-text-white u-text-sm">.u-glass</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-glass-subtle u-w-32 u-h-32 u-rounded-md u-flex u-items-center u-justify-center">
          <span className="u-text-white u-font-medium">Subtle Glass</span>
        </div>
        <code className="u-text-white u-text-sm">.u-glass-subtle</code>
      </div>
      <div className="u-flex u-flex-column u-items-center u-gap-2">
        <div className="u-glass-heavy u-w-32 u-h-32 u-rounded-md u-flex u-items-center u-justify-center">
          <span className="u-text-white u-font-medium">Heavy Glass</span>
        </div>
        <code className="u-text-white u-text-sm">.u-glass-heavy</code>
      </div>
    </div>
  ),
};
