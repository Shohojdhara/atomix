'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function SizingPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Sizing</h1>
        <p>
          Sizing utilities provide a quick way to set width and height dimensions for elements. These utilities make it easy to control the size of elements in a consistent manner.
        </p>

        <ComponentDemo
          title="Width"
          description="Control the width of elements"
          code={`<div className="u-w-25 u-p-md u-mb-md u-bg-light">Width 25%</div>
<div className="u-w-50 u-p-md u-mb-md u-bg-light">Width 50%</div>
<div className="u-w-75 u-p-md u-mb-md u-bg-light">Width 75%</div>
<div className="u-w-100 u-p-md u-mb-md u-bg-light">Width 100%</div>
<div className="u-w-auto u-p-md u-bg-light">Width auto</div>`}
        >
          <div>
            <div className="u-w-25 u-p-md u-mb-md u-bg-light">Width 25%</div>
            <div className="u-w-50 u-p-md u-mb-md u-bg-light">Width 50%</div>
            <div className="u-w-75 u-p-md u-mb-md u-bg-light">Width 75%</div>
            <div className="u-w-100 u-p-md u-mb-md u-bg-light">Width 100%</div>
            <div className="u-w-auto u-p-md u-bg-light">Width auto</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Height"
          description="Control the height of elements"
          code={`<div style={{ height: '200px' }} className="u-d-flex u-bg-light">
  <div className="u-h-25 u-bg-primary u-text-white u-p-md u-mr-md">Height 25%</div>
  <div className="u-h-50 u-bg-primary u-text-white u-p-md u-mr-md">Height 50%</div>
  <div className="u-h-75 u-bg-primary u-text-white u-p-md u-mr-md">Height 75%</div>
  <div className="u-h-100 u-bg-primary u-text-white u-p-md u-mr-md">Height 100%</div>
  <div className="u-h-auto u-bg-primary u-text-white u-p-md">Height auto</div>
</div>`}
        >
          <div style={{ height: '200px' }} className="u-d-flex u-bg-light">
            <div className="u-h-25 u-bg-primary u-text-white u-p-md u-mr-md">Height 25%</div>
            <div className="u-h-50 u-bg-primary u-text-white u-p-md u-mr-md">Height 50%</div>
            <div className="u-h-75 u-bg-primary u-text-white u-p-md u-mr-md">Height 75%</div>
            <div className="u-h-100 u-bg-primary u-text-white u-p-md u-mr-md">Height 100%</div>
            <div className="u-h-auto u-bg-primary u-text-white u-p-md">Height auto</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Max Width"
          description="Control the maximum width of elements"
          code={`<div className="u-max-w-100 u-p-md u-mb-md u-bg-light">Max width 100%</div>
<div className="u-max-w-75 u-p-md u-mb-md u-bg-light">Max width 75%</div>
<div className="u-max-w-50 u-p-md u-mb-md u-bg-light">Max width 50%</div>
<div className="u-max-w-25 u-p-md u-bg-light">Max width 25%</div>`}
        >
          <div>
            <div className="u-max-w-100 u-p-md u-mb-md u-bg-light">Max width 100%</div>
            <div className="u-max-w-75 u-p-md u-mb-md u-bg-light">Max width 75%</div>
            <div className="u-max-w-50 u-p-md u-mb-md u-bg-light">Max width 50%</div>
            <div className="u-max-w-25 u-p-md u-bg-light">Max width 25%</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Max Height"
          description="Control the maximum height of elements"
          code={`<div style={{ height: '200px' }} className="u-d-flex u-bg-light">
  <div className="u-max-h-100 u-bg-primary u-text-white u-p-md u-mr-md">Max height 100%</div>
  <div className="u-max-h-75 u-bg-primary u-text-white u-p-md u-mr-md">Max height 75%</div>
  <div className="u-max-h-50 u-bg-primary u-text-white u-p-md u-mr-md">Max height 50%</div>
  <div className="u-max-h-25 u-bg-primary u-text-white u-p-md">Max height 25%</div>
</div>`}
        >
          <div style={{ height: '200px' }} className="u-d-flex u-bg-light">
            <div className="u-max-h-100 u-bg-primary u-text-white u-p-md u-mr-md">Max height 100%</div>
            <div className="u-max-h-75 u-bg-primary u-text-white u-p-md u-mr-md">Max height 75%</div>
            <div className="u-max-h-50 u-bg-primary u-text-white u-p-md u-mr-md">Max height 50%</div>
            <div className="u-max-h-25 u-bg-primary u-text-white u-p-md">Max height 25%</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Viewport Width & Height"
          description="Control the width and height relative to the viewport"
          code={`<div className="u-vw-100 u-bg-light u-p-md u-mb-md">Width 100vw</div>
<div className="u-vh-50 u-bg-light u-p-md">Height 50vh</div>`}
        >
          <div>
            <div className="u-vw-100 u-bg-light u-p-md u-mb-md">Width 100vw</div>
            <div className="u-vh-50 u-bg-light u-p-md">Height 50vh</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Min Width & Height"
          description="Control the minimum width and height of elements"
          code={`<div className="u-min-w-100 u-bg-light u-p-md u-mb-md">Min width 100%</div>
<div style={{ height: '100px' }} className="u-d-flex u-bg-light">
  <div className="u-min-h-100 u-bg-primary u-text-white u-p-md">Min height 100%</div>
</div>`}
        >
          <div>
            <div className="u-min-w-100 u-bg-light u-p-md u-mb-md">Min width 100%</div>
            <div style={{ height: '100px' }} className="u-d-flex u-bg-light">
              <div className="u-min-h-100 u-bg-primary u-text-white u-p-md">Min height 100%</div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Sizing Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-w-25</code></td>
              <td className="c-data-table__cell">Width 25%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-w-50</code></td>
              <td className="c-data-table__cell">Width 50%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-w-75</code></td>
              <td className="c-data-table__cell">Width 75%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-w-100</code></td>
              <td className="c-data-table__cell">Width 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-w-auto</code></td>
              <td className="c-data-table__cell">Width auto</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-h-25</code></td>
              <td className="c-data-table__cell">Height 25%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-h-50</code></td>
              <td className="c-data-table__cell">Height 50%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-h-75</code></td>
              <td className="c-data-table__cell">Height 75%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-h-100</code></td>
              <td className="c-data-table__cell">Height 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-h-auto</code></td>
              <td className="c-data-table__cell">Height auto</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-w-100</code></td>
              <td className="c-data-table__cell">Max width 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-w-75</code></td>
              <td className="c-data-table__cell">Max width 75%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-w-50</code></td>
              <td className="c-data-table__cell">Max width 50%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-w-25</code></td>
              <td className="c-data-table__cell">Max width 25%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-h-100</code></td>
              <td className="c-data-table__cell">Max height 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-h-75</code></td>
              <td className="c-data-table__cell">Max height 75%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-h-50</code></td>
              <td className="c-data-table__cell">Max height 50%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-max-h-25</code></td>
              <td className="c-data-table__cell">Max height 25%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-min-w-100</code></td>
              <td className="c-data-table__cell">Min width 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-min-h-100</code></td>
              <td className="c-data-table__cell">Min height 100%</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-vw-100</code></td>
              <td className="c-data-table__cell">Width 100vw (viewport width)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-vh-100</code></td>
              <td className="c-data-table__cell">Height 100vh (viewport height)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-vh-50</code></td>
              <td className="c-data-table__cell">Height 50vh (viewport height)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}