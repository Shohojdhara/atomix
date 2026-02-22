import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const dummyComponent = () => <div />;

const meta: Meta<typeof dummyComponent> = {
  title: 'Utilities/Layout',
  component: dummyComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Layout utilities including display properties, flexbox, and positioning.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Display properties setting standard CSS display values.
 */
export const Display: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h4 className="u-mb-2">Block & Inline (.u-block, .u-inline, .u-inline-block)</h4>
        <div className="u-bg-gray-100 u-p-4 u-rounded">
          <div className="u-block u-bg-primary u-text-white u-p-2 u-rounded u-mb-2">.u-block</div>
          <div className="u-inline u-bg-secondary u-text-white u-p-2 u-rounded u-mr-2">
            .u-inline
          </div>
          <div className="u-inline-block u-bg-info u-text-white u-p-2 u-rounded">
            .u-inline-block
          </div>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Hidden (.u-none)</h4>
        <div className="u-bg-gray-100 u-p-4 u-rounded u-flex u-items-center u-gap-4">
          <div className="u-bg-primary u-text-white u-p-2 u-rounded">Visible</div>
          <div className="u-none u-bg-error u-text-white u-p-2 u-rounded">Hidden</div>
          <div className="u-bg-primary u-text-white u-p-2 u-rounded">Visible</div>
          <span className="u-text-gray-500 u-fs-sm">
            (The hidden element is removed from layout)
          </span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Flexbox Container Utilities
 */
export const Flexbox: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h4 className="u-mb-2">Flex Row (.u-flex)</h4>
        <div className="u-flex u-gap-2 u-bg-gray-100 u-p-4 u-rounded">
          <div className="u-bg-primary u-text-white u-p-4 u-rounded">Item 1</div>
          <div className="u-bg-primary u-text-white u-p-4 u-rounded">Item 2</div>
          <div className="u-bg-primary u-text-white u-p-4 u-rounded">Item 3</div>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Flex Column (.u-flex-column)</h4>
        <div className="u-flex u-flex-column u-gap-2 u-bg-gray-100 u-p-4 u-rounded u-w-64">
          <div className="u-bg-primary u-text-white u-p-2 u-rounded">Item 1</div>
          <div className="u-bg-primary u-text-white u-p-2 u-rounded">Item 2</div>
          <div className="u-bg-primary u-text-white u-p-2 u-rounded">Item 3</div>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Flex Wrap (.u-flex-wrap)</h4>
        <div className="u-flex u-flex-wrap u-gap-2 u-bg-gray-100 u-p-4 u-rounded u-w-64">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="u-bg-primary u-text-white u-p-2 u-rounded">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Flexbox Justify Content
 */
export const FlexboxJustify: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {[
        { cls: 'u-justify-start', name: 'Start' },
        { cls: 'u-justify-center', name: 'Center' },
        { cls: 'u-justify-end', name: 'End' },
        { cls: 'u-justify-between', name: 'Space Between' },
        { cls: 'u-justify-around', name: 'Space Around' },
        { cls: 'u-justify-evenly', name: 'Space Evenly' },
      ].map(({ cls, name }) => (
        <div key={cls}>
          <h4 className="u-mb-2">
            <code>.{cls}</code> ({name})
          </h4>
          <div className={`u-flex ${cls} u-gap-2 u-bg-gray-100 u-p-2 u-rounded`}>
            <div className="u-bg-primary u-w-12 u-h-12 u-rounded" />
            <div className="u-bg-primary u-w-12 u-h-12 u-rounded" />
            <div className="u-bg-primary u-w-12 u-h-12 u-rounded" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Flexbox Align Items
 */
export const FlexboxAlignItems: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {[
        { cls: 'u-items-start', name: 'Start' },
        { cls: 'u-items-center', name: 'Center' },
        { cls: 'u-items-end', name: 'End' },
        { cls: 'u-items-stretch', name: 'Stretch' },
      ].map(({ cls, name }) => (
        <div key={cls}>
          <h4 className="u-mb-2">
            <code>.{cls}</code> ({name})
          </h4>
          <div className={`u-flex ${cls} u-gap-2 u-bg-gray-100 u-p-2 u-rounded u-h-32`}>
            <div className="u-bg-primary u-text-white u-p-2 u-rounded">Item</div>
            <div className="u-bg-primary u-text-white u-p-2 u-rounded u-py-4">Taller Item</div>
            <div className="u-bg-primary u-text-white u-p-2 u-rounded u-py-8">Tallest Item</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Flexbox Align Content
 */
export const FlexboxAlignContent: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {[
        { cls: 'u-content-start', name: 'Start' },
        { cls: 'u-content-center', name: 'Center' },
        { cls: 'u-content-end', name: 'End' },
        { cls: 'u-content-between', name: 'Space Between' },
        { cls: 'u-content-around', name: 'Space Around' },
        { cls: 'u-content-stretch', name: 'Stretch' },
      ].map(({ cls, name }) => (
        <div key={cls}>
          <h4 className="u-mb-2">
            <code>.{cls}</code> ({name})
          </h4>
          <div className={`u-flex u-flex-wrap ${cls} u-gap-2 u-bg-gray-100 u-p-2 u-rounded u-h-32`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="u-bg-primary u-w-32 u-h-8 u-rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Flexbox Align Self
 */
export const FlexboxAlignSelf: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {[
        { cls: 'u-self-start', name: 'Start' },
        { cls: 'u-self-center', name: 'Center' },
        { cls: 'u-self-end', name: 'End' },
        { cls: 'u-self-stretch', name: 'Stretch' },
      ].map(({ cls, name }) => (
        <div key={cls}>
          <h4 className="u-mb-2">
            <code>.{cls}</code> ({name})
          </h4>
          <div className="u-flex u-gap-2 u-bg-gray-100 u-p-2 u-rounded u-h-32">
            <div className="u-bg-gray-300 u-text-black u-p-2 u-rounded">Item</div>
            <div className={`u-bg-primary u-text-white u-p-2 u-rounded ${cls}`}>Assigned Item</div>
            <div className="u-bg-gray-300 u-text-black u-p-2 u-rounded">Item</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Flexbox Grow and Shrink
 */
export const FlexboxGrowAndShrink: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h4 className="u-mb-2">Flex Grow (.u-flex-grow-1, .u-flex-grow-0)</h4>
        <div className="u-flex u-gap-2 u-bg-gray-100 u-p-2 u-rounded">
          <div className="u-bg-gray-300 u-text-black u-p-2 u-rounded">Item 1</div>
          <div className="u-bg-primary u-text-white u-p-2 u-rounded u-flex-grow-1">Grow 1</div>
          <div className="u-bg-gray-300 u-text-black u-p-2 u-rounded">Item 3</div>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Flex Shrink (.u-flex-shrink-0, .u-flex-shrink-1)</h4>
        <div className="u-flex u-gap-2 u-bg-gray-100 u-p-2 u-rounded u-w-64">
          <div className="u-bg-gray-300 u-w-32 u-text-black u-p-2 u-rounded u-flex-shrink-0">
            Item 1
          </div>
          <div className="u-bg-primary u-w-64 u-text-white u-p-2 u-rounded u-flex-shrink-0">
            Shrink 0 (Won't shrink)
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Flexbox Order
 */
export const FlexboxOrder: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div className="u-flex u-gap-2 u-bg-gray-100 u-p-2 u-rounded">
        <div className="u-bg-gray-300 u-text-black u-p-2 u-rounded u-order-3">Item 1 (order-3)</div>
        <div className="u-bg-primary u-text-white u-p-2 u-rounded u-order-1">Item 2 (order-1)</div>
        <div className="u-bg-secondary u-text-white u-p-2 u-rounded u-order-2">
          Item 3 (order-2)
        </div>
      </div>
    </div>
  ),
};

/**
 * Positioning utilities
 */
export const Positioning: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div>
        <h4 className="u-mb-2">Static, Relative, Absolute, Fixed, Sticky</h4>
        <div className="u-flex u-gap-4 u-mb-4">
          <code className="u-p-2 u-bg-gray-100 u-rounded">.u-static</code>
          <code className="u-p-2 u-bg-gray-100 u-rounded">.u-relative</code>
          <code className="u-p-2 u-bg-gray-100 u-rounded">.u-absolute</code>
          <code className="u-p-2 u-bg-gray-100 u-rounded">.u-fixed</code>
          <code className="u-p-2 u-bg-gray-100 u-rounded">.u-sticky</code>
        </div>
        <div className="u-relative u-bg-gray-100 u-h-48 u-rounded u-border u-border-gray-300">
          <div className="u-absolute u-top-0 u-start-0 u-bg-primary u-text-white u-p-2 u-rounded-tl u-rounded-br">
            <code>.u-top-0 .u-start-0</code>
          </div>
          <div className="u-absolute u-top-0 u-end-0 u-bg-secondary u-text-white u-p-2 u-rounded-tr u-rounded-bl">
            <code>.u-top-0 .u-end-0</code>
          </div>
          <div className="u-absolute u-bottom-0 u-start-0 u-bg-info u-text-white u-p-2 u-rounded-bl u-rounded-tr">
            <code>.u-bottom-0 .u-start-0</code>
          </div>
          <div className="u-absolute u-bottom-0 u-end-0 u-bg-warning u-text-white u-p-2 u-rounded-br u-rounded-tl">
            <code>.u-bottom-0 .u-end-0</code>
          </div>
        </div>
      </div>
      <div>
        <h4 className="u-mb-2">Translate Middle (.u-translate-middle, -x, -y)</h4>
        <div className="u-relative u-bg-gray-100 u-h-48 u-rounded u-border u-border-gray-300">
          <div className="u-absolute u-top-0 u-start-50 u-translate-middle-x u-bg-secondary u-text-white u-p-2 u-rounded-b">
            x-axis
          </div>
          <div className="u-absolute u-top-50 u-start-0 u-translate-middle-y u-bg-secondary u-text-white u-p-2 u-rounded-e">
            y-axis
          </div>
          <div className="u-absolute u-top-50 u-start-50 u-translate-middle u-bg-primary u-text-white u-p-4 u-rounded">
            Center Using Translate
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Overflow utilities
 */
export const Overflow: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      {['auto', 'hidden', 'visible', 'scroll'].map(overflow => (
        <div key={`overflow-${overflow}`}>
          <h4 className="u-mb-2">
            <code>.u-overflow-{overflow}</code>
          </h4>
          <div className={`u-overflow-${overflow} u-bg-gray-100 u-p-4 u-rounded u-h-32`}>
            <div className="u-h-64 u-bg-primary-subtle u-p-2 u-rounded">
              Content taller than container
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Object Fit utilities
 */
export const ObjectFit: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-8">
      {['contain', 'cover', 'fill', 'scale-down', 'none'].map(fit => (
        <div key={`object-fit-${fit}`} className="u-flex u-flex-column u-items-center u-gap-2">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80"
            alt="Placeholder"
            className={`u-object-fit-${fit} u-w-32 u-h-32 u-rounded-md u-bg-gray-200`}
          />
          <code className="u-fs-sm">.u-object-fit-{fit}</code>
        </div>
      ))}
    </div>
  ),
};

/**
 * Z-Index utilities
 */
export const ZIndex: Story = {
  render: () => (
    <div className="u-flex u-flex-column u-gap-8">
      <div className="u-relative u-h-48 u-bg-gray-100 u-rounded u-p-4">
        {[
          { level: '0', color: 'bg-primary' },
          { level: '10', color: 'bg-secondary' },
          { level: '20', color: 'bg-info' },
          { level: '30', color: 'bg-warning' },
          { level: '40', color: 'bg-error' },
        ].map(({ level, color }, index) => (
          <div
            key={`z-${level}`}
            className={`u-absolute u-${color} u-text-white u-p-4 u-rounded u-shadow-md u-z-${level}`}
            style={{ top: `${index * 20}px`, left: `${index * 20}px` }}
          >
            <code>.u-z-{level}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
