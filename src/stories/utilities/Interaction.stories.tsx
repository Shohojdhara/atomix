import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Interaction',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Cursor, pointer-events, and user-select utilities (opt-in interaction bundle).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Cursor: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-4">
      <button type="button" className="u-cursor-pointer u-border u-px-4 u-py-2 u-rounded">
        pointer
      </button>
      <span className="u-cursor-help u-border u-px-4 u-py-2 u-rounded" title="Help text">
        help
      </span>
      <button
        type="button"
        disabled
        className="u-cursor-not-allowed u-border u-px-4 u-py-2 u-rounded u-opacity-50"
      >
        not-allowed
      </button>
    </div>
  ),
};

export const PointerEvents: Story = {
  render: () => (
    <div className="u-relative u-inline-block">
      <button type="button" className="u-bg-primary u-text-white u-px-4 u-py-2 u-rounded">
        Clickable
      </button>
      <div className="u-absolute u-inset-0 u-pointer-events-none u-bg-error u-opacity-25 u-rounded" />
      <p className="u-text-sm u-text-secondary u-mt-2">Overlay ignores pointer events</p>
    </div>
  ),
};

export const UserSelect: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-4">
      <p className="u-select-none u-border u-p-4 u-rounded">Cannot select this text (.u-select-none)</p>
      <p className="u-select-text u-border u-p-4 u-rounded">Text is selectable (.u-select-text)</p>
    </div>
  ),
};
