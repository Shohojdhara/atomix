import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { THEME_COLORS } from '../../lib/constants/components';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Typography',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Utility classes for typography, including colors, sizes, alignment, and weights.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
];
const WEIGHTS = ['light', 'normal', 'medium', 'semibold', 'bold', 'heavy', 'black'];

/**
 * Text colors using `.u-text-{color}`
 */
export const TextColors: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <div className="u-flex u-flex-wrap u-gap-4">
        {THEME_COLORS.map(color => (
          <div key={color} className="u-p-4 u-border u-border-gray-200 u-rounded-md u-min-w-32">
            <div className={`u-text-${color} u-font-bold u-fs-lg u-mb-2`}>{color} text</div>
            <code className="u-text-sm">.u-text-{color}</code>
          </div>
        ))}
      </div>
      <div className="u-flex u-flex-wrap u-gap-4">
        {['black', 'white', 'body'].map(color => (
          <div
            key={color}
            className={`u-p-4 u-rounded-md u-min-w-32 ${color === 'white' ? 'u-bg-gray-800' : 'u-border u-border-gray-200'}`}
          >
            <div className={`u-text-${color} u-font-bold u-fs-lg u-mb-2`}>{color} text</div>
            <code className={`u-text-sm ${color === 'white' ? 'u-text-gray-300' : ''}`}>
              .u-text-{color}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Text emphasis colors using `.u-text-{color}-emphasis`
 */
export const TextEmphasisColors: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      {THEME_COLORS.map(color => (
        <div key={color} className={`u-bg-${color}-subtle u-p-4 u-rounded-md u-min-w-48`}>
          <div className={`u-text-${color}-emphasis u-font-bold u-fs-lg u-mb-2`}>
            {color} emphasis
          </div>
          <code className="u-text-xs">.u-text-{color}-emphasis</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Font sizes using `.u-fs-{size}`
 */
export const FontSizes: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-6">
      {SIZES.map(size => (
        <div key={size} className="u-flex u-items-center u-border-b u-border-gray-100 u-pb-4">
          <div className="u-w-32">
            <code>.u-fs-{size}</code>
          </div>
          <div className={`u-fs-${size} u-truncate`}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Line heights using `.u-leading-{size}`
 */
export const LineHeights: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', '1'].map(size => (
        <div key={size} className="u-flex u-items-start u-gap-4">
          <div className="u-w-48 u-pt-1">
            <code>.u-leading-{size}</code>
          </div>
          <div className={`u-bg-gray-100 u-p-4 u-rounded u-w-full u-max-w-md u-leading-${size}`}>
            This is a multi-line text example to demonstrate the effect of the{' '}
            <strong>leading-{size}</strong> class. It adjusts the amount of space between lines of
            text, improving readability and visual hierarchy.
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Font weights using `.u-font-{weight}`
 */
export const FontWeights: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      {WEIGHTS.map(weight => (
        <div key={weight} className="u-flex u-items-center">
          <div className="u-w-48">
            <code>.u-font-{weight}</code>
          </div>
          <div className={`u-font-${weight} u-fs-lg`}>
            {weight.charAt(0).toUpperCase() + weight.slice(1)} Weight
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Text Alignment using `.u-text-{alignment}`
 */
export const TextAlignment: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4 u-w-full u-max-w-2xl">
      <div className="u-text-start u-p-4 u-bg-gray-100 u-rounded">
        <code className="u-mb-2 u-block">.u-text-start</code>
        Left aligned text on all viewport sizes.
      </div>
      <div className="u-text-center u-p-4 u-bg-gray-100 u-rounded">
        <code className="u-mb-2 u-block">.u-text-center</code>
        Center aligned text on all viewport sizes.
      </div>
      <div className="u-text-end u-p-4 u-bg-gray-100 u-rounded">
        <code className="u-mb-2 u-block">.u-text-end</code>
        Right aligned text on all viewport sizes.
      </div>
    </div>
  ),
};

/**
 * Text Gradients using `.u-text-gradient-{color}`
 */
export const TextGradients: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-8">
      {THEME_COLORS.map(color => (
        <div key={`gradient-${color}`}>
          <div className={`u-text-gradient-${color} u-fs-3xl u-font-bold u-mb-2`}>
            Gradient {color}
          </div>
          <code className="u-text-sm">.u-text-gradient-{color}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Other text utilities
 */
export const OtherTextUtilities: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-italic</code>
        <span className="u-italic">Italic text</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-not-italic</code>
        <span className="u-italic u-not-italic">Not-italic text (overriding italic)</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-underline</code>
        <span className="u-underline">Underlined text</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-no-underline</code>
        <a href="#" className="u-no-underline">
          Link with no underline
        </a>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-line-through</code>
        <span className="u-line-through">Strikethrough text</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-text-uppercase</code>
        <span className="u-text-uppercase">Uppercase text</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-text-lowercase</code>
        <span className="u-text-lowercase">LOWERCASE TEXT</span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-text-capitalize</code>
        <span className="u-text-capitalize">capitalized text example</span>
      </div>
      <div className="u-flex u-items-center u-gap-4 u-w-64">
        <code>.u-text-nowrap</code>
        <span className="u-text-nowrap u-bg-gray-100 u-p-2 u-rounded">
          This is a very long text that will not wrap
        </span>
      </div>
      <div className="u-flex u-items-start u-gap-4 u-w-64">
        <code>.u-text-wrap</code>
        <span className="u-text-nowrap u-text-wrap u-bg-gray-100 u-p-2 u-rounded">
          This text wraps overriding nowrap
        </span>
      </div>
      <div className="u-flex u-items-start u-gap-4 u-w-64">
        <code>.u-text-break</code>
        <span className="u-text-break u-bg-gray-100 u-p-2 u-rounded">
          Thisisaverylongwordthatwillbreakacrosstheline
        </span>
      </div>
      <div className="u-flex u-items-center u-gap-4">
        <code>.u-link</code>
        <a href="#" className="u-link">
          Standard link style
        </a>
      </div>
    </div>
  ),
};
