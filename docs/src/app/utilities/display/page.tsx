'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function DisplayPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Display</h1>
        <p>
          Display utilities control how elements are displayed on the page. These utilities make it easy to show, hide, or change the display property of elements.
        </p>

        <ComponentDemo
          title="Display Values"
          description="Control the display property of elements"
          code={`<div className="u-d-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Block</div>
<div className="u-d-inline u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline</div>
<div className="u-d-inline-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Block</div>
<div className="u-d-flex u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Flex</div>
<div className="u-d-inline-flex u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Flex</div>
<div className="u-d-grid u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Grid</div>
<div className="u-d-inline-grid u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Grid</div>
<div className="u-d-none u-p-md u-bg-primary u-text-white u-rounded">Display None (hidden)</div>`}
        >
          <div>
            <div className="u-d-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Block</div>
            <div className="u-d-inline u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline</div>
            <div className="u-d-inline-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Block</div>
            <div className="u-d-flex u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Flex</div>
            <div className="u-d-inline-flex u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Flex</div>
            <div className="u-d-grid u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Grid</div>
            <div className="u-d-inline-grid u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Display Inline Grid</div>
            <div className="u-d-none u-p-md u-bg-primary u-text-white u-rounded">Display None (hidden)</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Responsive Display"
          description="Control display properties at different breakpoints"
          code={`<div className="u-d-none u-d-md-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">
  Hidden on small screens, visible on medium screens and up
</div>
<div className="u-d-block u-d-md-none u-p-md u-bg-primary u-text-white u-rounded u-mb-md">
  Visible on small screens, hidden on medium screens and up
</div>
<div className="u-d-none u-d-sm-block u-d-lg-none u-p-md u-bg-primary u-text-white u-rounded">
  Hidden on extra small screens, visible on small to medium screens, hidden on large screens and up
</div>`}
        >
          <div>
            <div className="u-d-none u-d-md-block u-p-md u-bg-primary u-text-white u-rounded u-mb-md">
              Hidden on small screens, visible on medium screens and up
            </div>
            <div className="u-d-block u-d-md-none u-p-md u-bg-primary u-text-white u-rounded u-mb-md">
              Visible on small screens, hidden on medium screens and up
            </div>
            <div className="u-d-none u-d-sm-block u-d-lg-none u-p-md u-bg-primary u-text-white u-rounded">
              Hidden on extra small screens, visible on small to medium screens, hidden on large screens and up
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Visibility"
          description="Control the visibility of elements without affecting layout"
          code={`<div className="u-visible u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Visible element</div>
<div className="u-invisible u-p-md u-bg-primary u-text-white u-rounded">Invisible element (takes up space)</div>`}
        >
          <div>
            <div className="u-visible u-p-md u-bg-primary u-text-white u-rounded u-mb-md">Visible element</div>
            <div className="u-invisible u-p-md u-bg-primary u-text-white u-rounded">Invisible element (takes up space)</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Overflow"
          description="Control how content overflows its container"
          code={`<div className="u-overflow-auto u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '100px' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">
    This content is too tall for its container, so it will scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
  </div>
</div>

<div className="u-overflow-hidden u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '100px' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">
    This content is too tall for its container, but overflow is hidden. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
  </div>
</div>

<div className="u-overflow-visible u-p-md u-bg-light u-rounded" style={{ height: '100px' }}>
  <div className="u-p-md u-bg-primary u-text-white u-rounded">
    This content is too tall for its container, but overflow is visible. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
  </div>
</div>`}
        >
          <div>
            <div className="u-overflow-auto u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '100px' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">
                This content is too tall for its container, so it will scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </div>
            </div>

            <div className="u-overflow-hidden u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '100px' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">
                This content is too tall for its container, but overflow is hidden. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </div>
            </div>

            <div className="u-overflow-visible u-p-md u-bg-light u-rounded" style={{ height: '100px' }}>
              <div className="u-p-md u-bg-primary u-text-white u-rounded">
                This content is too tall for its container, but overflow is visible. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Position"
          description="Control the positioning of elements"
          code={`<div className="u-position-relative u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '150px' }}>
  Position Relative Container
  <div className="u-position-absolute u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '50px', left: '50px' }}>
    Position Absolute (50px from top, 50px from left)
  </div>
</div>

<div className="u-position-relative u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '150px' }}>
  Position Relative Container
  <div className="u-position-absolute u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '0', right: '0' }}>
    Position Absolute (top right)
  </div>
</div>

<div className="u-d-flex u-justify-center u-mb-md">
  <div className="u-position-static u-p-md u-bg-primary u-text-white u-rounded">Position Static</div>
</div>

<div className="u-position-relative u-p-md u-bg-light u-rounded" style={{ height: '150px' }}>
  Position Relative Container
  <div className="u-position-sticky u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '0' }}>
    Position Sticky (sticks to top when scrolling)
  </div>
</div>`}
        >
          <div>
            <div className="u-position-relative u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '150px' }}>
              Position Relative Container
              <div className="u-position-absolute u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '50px', left: '50px' }}>
                Position Absolute (50px from top, 50px from left)
              </div>
            </div>

            <div className="u-position-relative u-p-md u-bg-light u-rounded u-mb-md" style={{ height: '150px' }}>
              Position Relative Container
              <div className="u-position-absolute u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '0', right: '0' }}>
                Position Absolute (top right)
              </div>
            </div>

            <div className="u-d-flex u-justify-center u-mb-md">
              <div className="u-position-static u-p-md u-bg-primary u-text-white u-rounded">Position Static</div>
            </div>

            <div className="u-position-relative u-p-md u-bg-light u-rounded" style={{ height: '150px' }}>
              Position Relative Container
              <div className="u-position-sticky u-p-md u-bg-primary u-text-white u-rounded" style={{ top: '0' }}>
                Position Sticky (sticks to top when scrolling)
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Display Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-none</code></td>
              <td className="c-data-table__cell">Display: none</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-block</code></td>
              <td className="c-data-table__cell">Display: block</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-inline</code></td>
              <td className="c-data-table__cell">Display: inline</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-inline-block</code></td>
              <td className="c-data-table__cell">Display: inline-block</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-flex</code></td>
              <td className="c-data-table__cell">Display: flex</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-inline-flex</code></td>
              <td className="c-data-table__cell">Display: inline-flex</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-grid</code></td>
              <td className="c-data-table__cell">Display: grid</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-inline-grid</code></td>
              <td className="c-data-table__cell">Display: inline-grid</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-{'{breakpoint}'}-none</code></td>
              <td className="c-data-table__cell">Display: none at specified breakpoint (sm, md, lg, xl)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-{'{breakpoint}'}-block</code></td>
              <td className="c-data-table__cell">Display: block at specified breakpoint (sm, md, lg, xl)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-{'{breakpoint}'}-inline</code></td>
              <td className="c-data-table__cell">Display: inline at specified breakpoint (sm, md, lg, xl)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-{'{breakpoint}'}-inline-block</code></td>
              <td className="c-data-table__cell">Display: inline-block at specified breakpoint (sm, md, lg, xl)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-d-{'{breakpoint}'}-flex</code></td>
              <td className="c-data-table__cell">Display: flex at specified breakpoint (sm, md, lg, xl)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-visible</code></td>
              <td className="c-data-table__cell">Visibility: visible</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-invisible</code></td>
              <td className="c-data-table__cell">Visibility: hidden (element still takes up space)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-overflow-auto</code></td>
              <td className="c-data-table__cell">Overflow: auto</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-overflow-hidden</code></td>
              <td className="c-data-table__cell">Overflow: hidden</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-overflow-visible</code></td>
              <td className="c-data-table__cell">Overflow: visible</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-overflow-scroll</code></td>
              <td className="c-data-table__cell">Overflow: scroll</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-position-static</code></td>
              <td className="c-data-table__cell">Position: static</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-position-relative</code></td>
              <td className="c-data-table__cell">Position: relative</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-position-absolute</code></td>
              <td className="c-data-table__cell">Position: absolute</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-position-fixed</code></td>
              <td className="c-data-table__cell">Position: fixed</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-position-sticky</code></td>
              <td className="c-data-table__cell">Position: sticky</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}