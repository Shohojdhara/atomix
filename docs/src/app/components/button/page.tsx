'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function ButtonPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Button</h1>
        <p>
          Buttons allow users to take actions and make choices with a single tap or click.
          The Button component provides multiple variants, sizes, and states to fit different use cases.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default button with primary variant"
          code={`<button className="c-btn c-btn--primary">
  Primary Button
</button>`}
        >
          <button className="c-btn c-btn--primary">Primary Button</button>
        </ComponentDemo>

        <ComponentDemo
          title="Button Variants"
          description="Different visual styles for various contexts"
          code={`<button className="c-btn c-btn--primary">Primary</button>
<button className="c-btn c-btn--secondary">Secondary</button>
<button className="c-btn c-btn--success">Success</button>
<button className="c-btn c-btn--info">Info</button>
<button className="c-btn c-btn--warning">Warning</button>
<button className="c-btn c-btn--error">Error</button>`}
        >
          <div className="u-d-flex u-gap-4 u-d-u-flex-wrap">
            <button className="c-btn c-btn--primary">Primary</button>
            <button className="c-btn c-btn--secondary">Secondary</button>
            <button className="c-btn c-btn--success">Success</button>
            <button className="c-btn c-btn--info">Info</button>
            <button className="c-btn c-btn--warning">Warning</button>
            <button className="c-btn c-btn--error">Error</button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Outline Variants"
          description="Outline button styles for secondary actions"
          code={`<button className="c-btn c-btn--outline-primary">Primary</button>
<button className="c-btn c-btn--outline-secondary">Secondary</button>
<button className="c-btn c-btn--outline-success">Success</button>
<button className="c-btn c-btn--outline-info">Info</button>
<button className="c-btn c-btn--outline-warning">Warning</button>
<button className="c-btn c-btn--outline-error">Error</button>`}
        >
          <div className="u-d-flex u-gap-4 u-d-u-flex-wrap">
            <button className="c-btn c-btn--outline-primary">Primary</button>
            <button className="c-btn c-btn--outline-secondary">Secondary</button>
            <button className="c-btn c-btn--outline-success">Success</button>
            <button className="c-btn c-btn--outline-info">Info</button>
            <button className="c-btn c-btn--outline-warning">Warning</button>
            <button className="c-btn c-btn--outline-error">Error</button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Button Sizes"
          description="Different sizes to fit your layout needs"
          code={`<button className="c-btn c-btn--sm">Small</button>
<button className="c-btn">Default</button>
<button className="c-btn c-btn--lg">Large</button>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center u-d-u-flex-wrap">
            <button className="c-btn c-btn--sm">Small</button>
            <button className="c-btn">Default</button>
            <button className="c-btn c-btn--lg">Large</button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Buttons with Icons"
          description="Add icons to provide visual context"
          code={`<button className="c-btn c-btn--primary">
  <span className="c-btn__icon">➕</span>
  Add Item
</button>
<button className="c-btn c-btn--secondary">
  <span className="c-btn__icon">⬇️</span>
  Download
</button>
<button className="c-btn c-btn--outline-error">
  <span className="c-btn__icon">🗑️</span>
  Delete
</button>`}
        >
          <div className="u-d-flex u-gap-4 u-d-u-flex-wrap">
            <button className="c-btn c-btn--primary">
              <span className="c-btn__icon">➕</span>
              Add Item
            </button>
            <button className="c-btn c-btn--secondary">
              <span className="c-btn__icon">⬇️</span>
              Download
            </button>
            <button className="c-btn c-btn--outline-error">
              <span className="c-btn__icon">🗑️</span>
              Delete
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Icon-Only Buttons"
          description="Compact buttons with only icons"
          code={`<button className="c-btn c-btn--primary c-btn--icon">❤️</button>
<button className="c-btn c-btn--secondary c-btn--icon">⭐</button>
<button className="c-btn c-btn--outline-primary c-btn--icon">⚙️</button>`}
        >
          <div className="u-d-flex u-gap-4">
            <button className="c-btn c-btn--primary c-btn--icon">❤️</button>
            <button className="c-btn c-btn--secondary c-btn--icon">⭐</button>
            <button className="c-btn c-btn--outline-primary c-btn--icon">⚙️</button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Rounded Buttons"
          description="Fully rounded button style"
          code={`<button className="c-btn c-btn--primary c-btn--u-rounded">
  Rounded
</button>
<button className="c-btn c-btn--secondary c-btn--u-rounded">
  <span className="c-btn__icon">❤️</span>
  With Icon
</button>
<button className="c-btn c-btn--outline-primary c-btn--u-rounded c-btn--icon">➕</button>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center u-d-u-flex-wrap">
            <button className="c-btn c-btn--primary c-btn--u-rounded">
              Rounded
            </button>
            <button className="c-btn c-btn--secondary c-btn--u-rounded">
              <span className="c-btn__icon">❤️</span>
              With Icon
            </button>
            <button className="c-btn c-btn--outline-primary c-btn--u-rounded c-btn--icon">➕</button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Button States"
          description="Different states for user feedback"
          code={`<button className="c-btn c-btn--primary">Normal</button>
<button className="c-btn c-btn--primary" disabled>
  Disabled
</button>`}
        >
          <div className="u-d-flex u-gap-4 u-d-u-flex-wrap">
            <button className="c-btn c-btn--primary">Normal</button>
            <button className="c-btn c-btn--primary" disabled>
              Disabled
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Link Button"
          description="Button styled as a link"
          code={`<button className="c-btn c-btn--link">
  Link Button
</button>`}
        >
          <div className="u-d-flex u-gap-4 u-d-u-flex-wrap">
            <button className="c-btn c-btn--link">
              Link Button
            </button>
          </div>
        </ComponentDemo>

        <h2>CSS Classes Reference</h2>
        <div className="u-overflow-x-auto">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-c-data-table__header-cell">Class</th>
                <th className="c-data-c-data-table__header-cell">Description</th>
                <th className="c-data-c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn</code></td>
                <td className="c-data-table__cell">Base button class</td>
                <td className="c-data-table__cell"><code>c-btn</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--primary</code></td>
                <td className="c-data-table__cell">Primary button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--primary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--secondary</code></td>
                <td className="c-data-table__cell">Secondary button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--secondary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--success</code></td>
                <td className="c-data-table__cell">Success button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--success</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--info</code></td>
                <td className="c-data-table__cell">Info button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--info</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--warning</code></td>
                <td className="c-data-table__cell">Warning button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--warning</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--error</code></td>
                <td className="c-data-table__cell">Error button variant</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--error</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--outline-*</code></td>
                <td className="c-data-table__cell">Outline button variants</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--outline-primary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--sm</code></td>
                <td className="c-data-table__cell">Small size</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--sm</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--lg</code></td>
                <td className="c-data-table__cell">Large size</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--lg</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--rounded</code></td>
                <td className="c-data-table__cell">Fully rounded button</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--rounded</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--icon</code></td>
                <td className="c-data-table__cell">Icon-only button</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--icon</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-btn--link</code></td>
                <td className="c-data-table__cell">Link-style button</td>
                <td className="c-data-table__cell"><code>c-btn c-btn--link</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Accessibility</h2>
        <ul>
          <li>Supports keyboard navigation with <code>Tab</code> and <code>Enter</code>/<code>Space</code></li>
          <li>Proper ARIA attributes for screen readers</li>
          <li>Disabled state properly communicated to assistive technologies</li>
          <li>Focus management and visible focus indicators</li>
          <li>Semantic button element by default</li>
        </ul>

        <h2>Design Guidelines</h2>
        <h3>When to Use</h3>
        <ul>
          <li>Use <strong>Primary</strong> buttons for the main action on a page</li>
          <li>Use <strong>Secondary</strong> buttons for secondary actions</li>
          <li>Use <strong>Outline</strong> buttons for less prominent actions</li>
          <li>Use <strong>Success</strong> buttons for positive actions like saving or confirming</li>
          <li>Use <strong>Error</strong> buttons for destructive actions like deleting</li>
          <li>Use <strong>Link</strong> buttons for navigation that looks like a link</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use clear, action-oriented labels</li>
          <li>Limit to one primary button per section</li>
          <li>Provide adequate spacing between buttons</li>
          <li>Use icons to provide additional context when helpful</li>
          <li>Ensure buttons have sufficient contrast for accessibility</li>
        </ul>
      </div>
    </DocsLayout>
  )
}