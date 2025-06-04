'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function FlexboxPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Flexbox</h1>
        <p>
          Flexbox utilities provide a powerful way to build flexible layouts. These utilities make it easy to align, justify, and distribute space among items in a container.
        </p>

        <ComponentDemo
          title="Flex Container"
          description="Create a flex container with different directions"
          code={`<div className="u-d-flex u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
</div>

<div className="u-d-flex u-flex-column u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
</div>

<div className="u-d-flex u-flex-row-reverse u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
</div>

<div className="u-d-flex u-flex-column-reverse">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
            </div>

            <div className="u-d-flex u-flex-column u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
            </div>

            <div className="u-d-flex u-flex-row-reverse u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
            </div>

            <div className="u-d-flex u-flex-column-reverse">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Flex item 3</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Justify Content"
          description="Control the alignment of flex items on the main axis"
          code={`<div className="u-d-flex u-justify-start u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
</div>

<div className="u-d-flex u-justify-center u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
</div>

<div className="u-d-flex u-justify-end u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
</div>

<div className="u-d-flex u-justify-between u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
</div>

<div className="u-d-flex u-justify-around">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-justify-start u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
            </div>

            <div className="u-d-flex u-justify-center u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
            </div>

            <div className="u-d-flex u-justify-end u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
            </div>

            <div className="u-d-flex u-justify-between u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
            </div>

            <div className="u-d-flex u-justify-around">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Item 3</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Align Items"
          description="Control the alignment of flex items on the cross axis"
          code={`<div className="u-d-flex u-items-start u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
</div>

<div className="u-d-flex u-items-center u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
</div>

<div className="u-d-flex u-items-end u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
</div>

<div className="u-d-flex u-items-stretch" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-items-start u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Start</div>
            </div>

            <div className="u-d-flex u-items-center u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Center</div>
            </div>

            <div className="u-d-flex u-items-end u-mb-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">End</div>
            </div>

            <div className="u-d-flex u-items-stretch" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Stretch</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Flex Wrap"
          description="Control how flex items wrap"
          code={`<div className="u-d-flex u-flex-nowrap u-mb-md" style={{ width: '100%' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
</div>

<div className="u-d-flex u-flex-wrap u-mb-md" style={{ width: '100%' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
</div>

<div className="u-d-flex u-flex-wrap-reverse" style={{ width: '100%' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-flex-nowrap u-mb-md" style={{ width: '100%' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
            </div>

            <div className="u-d-flex u-flex-wrap u-mb-md" style={{ width: '100%' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
            </div>

            <div className="u-d-flex u-flex-wrap-reverse" style={{ width: '100%' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 1 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 2 (40%)</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded" style={{ width: '40%' }}>Item 3 (40%)</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Flex Item Properties"
          description="Control individual flex items"
          code={`<div className="u-d-flex u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-1">Grow 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-2">Grow 2</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-1">Grow 1</div>
</div>

<div className="u-d-flex u-mb-md">
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-1" style={{ width: '200px' }}>Shrink 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-0" style={{ width: '200px' }}>Shrink 0</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-1" style={{ width: '200px' }}>Shrink 1</div>
</div>

<div className="u-d-flex">
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Auto</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-1">Flex 1</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">Auto</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-1">Grow 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-2">Grow 2</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-grow-1">Grow 1</div>
            </div>

            <div className="u-d-flex u-mb-md">
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-1" style={{ width: '200px' }}>Shrink 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-0" style={{ width: '200px' }}>Shrink 0</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-shrink-1" style={{ width: '200px' }}>Shrink 1</div>
            </div>

            <div className="u-d-flex">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Auto</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded u-flex-1">Flex 1</div>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Auto</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Align Self"
          description="Control the alignment of individual flex items"
          code={`<div className="u-d-flex" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-start">Self Start</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-center">Self Center</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-end">Self End</div>
  <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-stretch">Self Stretch</div>
</div>`}
        >
          <div className="u-d-flex" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
            <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-start">Self Start</div>
            <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-center">Self Center</div>
            <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-end">Self End</div>
            <div className="u-p-md u-bg-primary u-text-white u-rounded u-self-stretch">Self Stretch</div>
          </div>
        </ComponentDemo>

        <h2>Flexbox Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-flex</code></td>
              <td className="c-data-table__cell">Display flex</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-inline-flex</code></td>
              <td className="c-data-table__cell">Display inline-flex</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-row</code></td>
              <td className="c-data-table__cell">Flex direction row (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-column</code></td>
              <td className="c-data-table__cell">Flex direction column</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-row-reverse</code></td>
              <td className="c-data-table__cell">Flex direction row-reverse</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-column-reverse</code></td>
              <td className="c-data-table__cell">Flex direction column-reverse</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-wrap</code></td>
              <td className="c-data-table__cell">Flex wrap</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-nowrap</code></td>
              <td className="c-data-table__cell">Flex no-wrap (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-wrap-reverse</code></td>
              <td className="c-data-table__cell">Flex wrap-reverse</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-justify-start</code></td>
              <td className="c-data-table__cell">Justify content flex-start (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-justify-end</code></td>
              <td className="c-data-table__cell">Justify content flex-end</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-justify-center</code></td>
              <td className="c-data-table__cell">Justify content center</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-justify-between</code></td>
              <td className="c-data-table__cell">Justify content space-between</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-justify-around</code></td>
              <td className="c-data-table__cell">Justify content space-around</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-items-start</code></td>
              <td className="c-data-table__cell">Align items flex-start</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-items-end</code></td>
              <td className="c-data-table__cell">Align items flex-end</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-items-center</code></td>
              <td className="c-data-table__cell">Align items center</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-items-baseline</code></td>
              <td className="c-data-table__cell">Align items baseline</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-items-stretch</code></td>
              <td className="c-data-table__cell">Align items stretch (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-auto</code></td>
              <td className="c-data-table__cell">Align self auto (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-start</code></td>
              <td className="c-data-table__cell">Align self flex-start</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-end</code></td>
              <td className="c-data-table__cell">Align self flex-end</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-center</code></td>
              <td className="c-data-table__cell">Align self center</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-baseline</code></td>
              <td className="c-data-table__cell">Align self baseline</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-self-stretch</code></td>
              <td className="c-data-table__cell">Align self stretch</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-1</code></td>
              <td className="c-data-table__cell">Flex: 1 (grow, shrink, and basis)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-auto</code></td>
              <td className="c-data-table__cell">Flex: auto</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-initial</code></td>
              <td className="c-data-table__cell">Flex: initial (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-none</code></td>
              <td className="c-data-table__cell">Flex: none</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-grow-0</code></td>
              <td className="c-data-table__cell">Flex grow: 0</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-grow-1</code></td>
              <td className="c-data-table__cell">Flex grow: 1</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-grow-2</code></td>
              <td className="c-data-table__cell">Flex grow: 2</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-shrink-0</code></td>
              <td className="c-data-table__cell">Flex shrink: 0</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-flex-shrink-1</code></td>
              <td className="c-data-table__cell">Flex shrink: 1 (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-gap-xs</code></td>
              <td className="c-data-table__cell">Extra small gap between flex items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-gap-sm</code></td>
              <td className="c-data-table__cell">Small gap between flex items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-gap-md</code></td>
              <td className="c-data-table__cell">Medium gap between flex items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-gap-lg</code></td>
              <td className="c-data-table__cell">Large gap between flex items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-gap-xl</code></td>
              <td className="c-data-table__cell">Extra large gap between flex items</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}