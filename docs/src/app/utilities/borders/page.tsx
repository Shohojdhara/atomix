'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function BordersPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Borders</h1>
        <p>
          Border utilities provide a quick way to add, remove, or modify borders on elements. These utilities make it easy to control border width, style, color, and radius.
        </p>

        <ComponentDemo
          title="Border Width"
          description="Control the width of borders"
          code={`<div className="u-border u-p-md u-mb-md">Default border</div>
<div className="u-border-0 u-p-md u-mb-md">No border</div>
<div className="u-border-thin u-p-md u-mb-md">Thin border</div>
<div className="u-border-thick u-p-md u-mb-md">Thick border</div>
<div className="u-border-top u-p-md u-mb-md">Top border only</div>
<div className="u-border-end u-p-md u-mb-md">Right border only</div>
<div className="u-border-bottom u-p-md u-mb-md">Bottom border only</div>
<div className="u-border-start u-p-md">Left border only</div>`}
        >
          <div>
            <div className="u-border u-p-md u-mb-md">Default border</div>
            <div className="u-border-0 u-p-md u-mb-md">No border</div>
            <div className="u-border-thin u-p-md u-mb-md">Thin border</div>
            <div className="u-border-thick u-p-md u-mb-md">Thick border</div>
            <div className="u-border-top u-p-md u-mb-md">Top border only</div>
            <div className="u-border-end u-p-md u-mb-md">Right border only</div>
            <div className="u-border-bottom u-p-md u-mb-md">Bottom border only</div>
            <div className="u-border-start u-p-md">Left border only</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Border Color"
          description="Control the color of borders"
          code={`<div className="u-border u-border-primary u-p-md u-mb-md">Primary border</div>
<div className="u-border u-border-secondary u-p-md u-mb-md">Secondary border</div>
<div className="u-border u-border-success u-p-md u-mb-md">Success border</div>
<div className="u-border u-border-danger u-p-md u-mb-md">Danger border</div>
<div className="u-border u-border-warning u-p-md u-mb-md">Warning border</div>
<div className="u-border u-border-info u-p-md u-mb-md">Info border</div>
<div className="u-border u-border-light u-p-md u-mb-md">Light border</div>
<div className="u-border u-border-dark u-p-md">Dark border</div>`}
        >
          <div>
            <div className="u-border u-border-primary u-p-md u-mb-md">Primary border</div>
            <div className="u-border u-border-secondary u-p-md u-mb-md">Secondary border</div>
            <div className="u-border u-border-success u-p-md u-mb-md">Success border</div>
            <div className="u-border u-border-danger u-p-md u-mb-md">Danger border</div>
            <div className="u-border u-border-warning u-p-md u-mb-md">Warning border</div>
            <div className="u-border u-border-info u-p-md u-mb-md">Info border</div>
            <div className="u-border u-border-light u-p-md u-mb-md">Light border</div>
            <div className="u-border u-border-dark u-p-md">Dark border</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Border Style"
          description="Control the style of borders"
          code={`<div className="u-border u-border-solid u-p-md u-mb-md">Solid border</div>
<div className="u-border u-border-dashed u-p-md u-mb-md">Dashed border</div>
<div className="u-border u-border-dotted u-p-md u-mb-md">Dotted border</div>
<div className="u-border u-border-double u-p-md">Double border</div>`}
        >
          <div>
            <div className="u-border u-border-solid u-p-md u-mb-md">Solid border</div>
            <div className="u-border u-border-dashed u-p-md u-mb-md">Dashed border</div>
            <div className="u-border u-border-dotted u-p-md u-mb-md">Dotted border</div>
            <div className="u-border u-border-double u-p-md">Double border</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Border Radius"
          description="Control the border radius of elements"
          code={`<div className="u-border u-rounded u-p-md u-mb-md">Default rounded corners</div>
<div className="u-border u-rounded-0 u-p-md u-mb-md">No rounded corners</div>
<div className="u-border u-rounded-sm u-p-md u-mb-md">Small rounded corners</div>
<div className="u-border u-rounded-lg u-p-md u-mb-md">Large rounded corners</div>
<div className="u-border u-rounded-pill u-p-md u-mb-md">Pill shape</div>
<div className="u-border u-rounded-circle u-p-md u-d-inline-block" style={{ width: '100px', height: '100px', textAlign: 'center' }}>Circle</div>`}
        >
          <div>
            <div className="u-border u-rounded u-p-md u-mb-md">Default rounded corners</div>
            <div className="u-border u-rounded-0 u-p-md u-mb-md">No rounded corners</div>
            <div className="u-border u-rounded-sm u-p-md u-mb-md">Small rounded corners</div>
            <div className="u-border u-rounded-lg u-p-md u-mb-md">Large rounded corners</div>
            <div className="u-border u-rounded-pill u-p-md u-mb-md">Pill shape</div>
            <div className="u-border u-rounded-circle u-p-md u-d-inline-block" style={{ width: '100px', height: '100px', textAlign: 'center' }}>Circle</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Specific Corner Radius"
          description="Control the border radius of specific corners"
          code={`<div className="u-border u-rounded-top u-p-md u-mb-md">Rounded top corners</div>
<div className="u-border u-rounded-end u-p-md u-mb-md">Rounded right corners</div>
<div className="u-border u-rounded-bottom u-p-md u-mb-md">Rounded bottom corners</div>
<div className="u-border u-rounded-start u-p-md u-mb-md">Rounded left corners</div>
<div className="u-border u-rounded-top-start u-p-md u-mb-md">Rounded top-left corner</div>
<div className="u-border u-rounded-top-end u-p-md u-mb-md">Rounded top-right corner</div>
<div className="u-border u-rounded-bottom-start u-p-md u-mb-md">Rounded bottom-left corner</div>
<div className="u-border u-rounded-bottom-end u-p-md">Rounded bottom-right corner</div>`}
        >
          <div>
            <div className="u-border u-rounded-top u-p-md u-mb-md">Rounded top corners</div>
            <div className="u-border u-rounded-end u-p-md u-mb-md">Rounded right corners</div>
            <div className="u-border u-rounded-bottom u-p-md u-mb-md">Rounded bottom corners</div>
            <div className="u-border u-rounded-start u-p-md u-mb-md">Rounded left corners</div>
            <div className="u-border u-rounded-top-start u-p-md u-mb-md">Rounded top-left corner</div>
            <div className="u-border u-rounded-top-end u-p-md u-mb-md">Rounded top-right corner</div>
            <div className="u-border u-rounded-bottom-start u-p-md u-mb-md">Rounded bottom-left corner</div>
            <div className="u-border u-rounded-bottom-end u-p-md">Rounded bottom-right corner</div>
          </div>
        </ComponentDemo>

        <h2>Border Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border</code></td>
              <td className="c-data-table__cell">Add border on all sides</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-0</code></td>
              <td className="c-data-table__cell">Remove all borders</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-thin</code></td>
              <td className="c-data-table__cell">Add thin border on all sides</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-thick</code></td>
              <td className="c-data-table__cell">Add thick border on all sides</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-top</code></td>
              <td className="c-data-table__cell">Add border to top side only</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-end</code></td>
              <td className="c-data-table__cell">Add border to right side only</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-bottom</code></td>
              <td className="c-data-table__cell">Add border to bottom side only</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-start</code></td>
              <td className="c-data-table__cell">Add border to left side only</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-top-0</code></td>
              <td className="c-data-table__cell">Remove border from top side</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-end-0</code></td>
              <td className="c-data-table__cell">Remove border from right side</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-bottom-0</code></td>
              <td className="c-data-table__cell">Remove border from bottom side</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-start-0</code></td>
              <td className="c-data-table__cell">Remove border from left side</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-primary</code></td>
              <td className="c-data-table__cell">Primary color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-secondary</code></td>
              <td className="c-data-table__cell">Secondary color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-success</code></td>
              <td className="c-data-table__cell">Success color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-danger</code></td>
              <td className="c-data-table__cell">Danger color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-warning</code></td>
              <td className="c-data-table__cell">Warning color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-info</code></td>
              <td className="c-data-table__cell">Info color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-light</code></td>
              <td className="c-data-table__cell">Light color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-dark</code></td>
              <td className="c-data-table__cell">Dark color border</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-solid</code></td>
              <td className="c-data-table__cell">Solid border style</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-dashed</code></td>
              <td className="c-data-table__cell">Dashed border style</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-dotted</code></td>
              <td className="c-data-table__cell">Dotted border style</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-border-double</code></td>
              <td className="c-data-table__cell">Double border style</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded</code></td>
              <td className="c-data-table__cell">Default border radius</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-0</code></td>
              <td className="c-data-table__cell">No border radius</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-sm</code></td>
              <td className="c-data-table__cell">Small border radius</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-lg</code></td>
              <td className="c-data-table__cell">Large border radius</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-pill</code></td>
              <td className="c-data-table__cell">Pill-shaped border radius</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-circle</code></td>
              <td className="c-data-table__cell">Circle border radius (use with equal width and height)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-top</code></td>
              <td className="c-data-table__cell">Border radius on top corners</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-end</code></td>
              <td className="c-data-table__cell">Border radius on right corners</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-bottom</code></td>
              <td className="c-data-table__cell">Border radius on bottom corners</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-start</code></td>
              <td className="c-data-table__cell">Border radius on left corners</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-top-start</code></td>
              <td className="c-data-table__cell">Border radius on top-left corner</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-top-end</code></td>
              <td className="c-data-table__cell">Border radius on top-right corner</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-bottom-start</code></td>
              <td className="c-data-table__cell">Border radius on bottom-left corner</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-rounded-bottom-end</code></td>
              <td className="c-data-table__cell">Border radius on bottom-right corner</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}