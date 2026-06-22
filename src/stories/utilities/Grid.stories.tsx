import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Grid',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS Grid utilities (opt-in bundle). Requires grid utility SCSS or full utilities import.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Columns: Story = {
  render: () => (
    <div className="u-grid u-grid-cols-3 u-gap-4">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="u-bg-primary-subtle u-p-4 u-rounded u-text-center">
          {n}
        </div>
      ))}
    </div>
  ),
};

export const ColumnSpan: Story = {
  render: () => (
    <div className="u-grid u-grid-cols-4 u-gap-4">
      <div className="u-col-span-2 u-bg-primary u-text-white u-p-4 u-rounded">Span 2</div>
      <div className="u-bg-secondary-subtle u-p-4 u-rounded">1</div>
      <div className="u-bg-secondary-subtle u-p-4 u-rounded">1</div>
      <div className="u-col-span-full u-bg-info-subtle u-p-4 u-rounded">Full width</div>
    </div>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <div className="u-grid u-grid-cols-1 u-grid-cols-md-2 u-grid-cols-lg-3 u-gap-4">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="u-border u-p-4 u-rounded">
          Card {n}
        </div>
      ))}
    </div>
  ),
};

export const PlaceItems: Story = {
  render: () => (
    <div className="u-grid u-grid-cols-3 u-gap-4 u-h-48 u-bg-gray-100 u-rounded u-place-items-center">
      <div className="u-bg-primary u-text-white u-p-4 u-rounded">Centered</div>
    </div>
  ),
};
