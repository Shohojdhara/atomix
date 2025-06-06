'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function CalloutPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Callout</h1>
        <p>
          Callouts are used to display important messages, notifications, or alerts to users.
          The Callout component provides multiple variants, styles, and configurations to fit different use cases.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default callout with primary variant"
          code={`<div className="c-callout c-callout--primary">
  <div className="c-callout__content">
    <div className="c-callout__title">Information</div>
    <div className="c-callout__text">This is a basic callout message.</div>
  </div>
</div>`}
        >
          <div className="c-callout c-callout--primary">
            <div className="c-callout__content">
              <div className="c-callout__title">Information</div>
              <div className="c-callout__text">This is a basic callout message.</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Callout Variants"
          description="Different visual styles for various contexts"
          code={`<div className="c-callout c-callout--primary">
  <div className="c-callout__content">
    <div className="c-callout__title">Primary</div>
    <div className="c-callout__text">Primary callout message.</div>
  </div>
</div>

<div className="c-callout c-callout--success">
  <div className="c-callout__content">
    <div className="c-callout__title">Success</div>
    <div className="c-callout__text">Success callout message.</div>
  </div>
</div>

<div className="c-callout c-callout--warning">
  <div className="c-callout__content">
    <div className="c-callout__title">Warning</div>
    <div className="c-callout__text">Warning callout message.</div>
  </div>
</div>

<div className="c-callout c-callout--error">
  <div className="c-callout__content">
    <div className="c-callout__title">Error</div>
    <div className="c-callout__text">Error callout message.</div>
  </div>
</div>

<div className="c-callout c-callout--info">
  <div className="c-callout__content">
    <div className="c-callout__title">Info</div>
    <div className="c-callout__text">Info callout message.</div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-callout c-callout--primary">
              <div className="c-callout__content">
                <div className="c-callout__title">Primary</div>
                <div className="c-callout__text">Primary callout message.</div>
              </div>
            </div>
            
            <div className="c-callout c-callout--success">
              <div className="c-callout__content">
                <div className="c-callout__title">Success</div>
                <div className="c-callout__text">Success callout message.</div>
              </div>
            </div>
            
            <div className="c-callout c-callout--warning">
              <div className="c-callout__content">
                <div className="c-callout__title">Warning</div>
                <div className="c-callout__text">Warning callout message.</div>
              </div>
            </div>
            
            <div className="c-callout c-callout--error">
              <div className="c-callout__content">
                <div className="c-callout__title">Error</div>
                <div className="c-callout__text">Error callout message.</div>
              </div>
            </div>
            
            <div className="c-callout c-callout--info">
              <div className="c-callout__content">
                <div className="c-callout__title">Info</div>
                <div className="c-callout__text">Info callout message.</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Icons"
          description="Callouts with icons for better visual cues"
          code={`<div className="c-callout c-callout--primary">
  <div className="c-callout__icon">ℹ️</div>
  <div className="c-callout__content">
    <div className="c-callout__title">Information</div>
    <div className="c-callout__text">This is a callout with an icon.</div>
  </div>
</div>

<div className="c-callout c-callout--success">
  <div className="c-callout__icon">✅</div>
  <div className="c-callout__content">
    <div className="c-callout__title">Success</div>
    <div className="c-callout__text">Your changes have been saved successfully.</div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-callout c-callout--primary">
              <div className="c-callout__icon">ℹ️</div>
              <div className="c-callout__content">
                <div className="c-callout__title">Information</div>
                <div className="c-callout__text">This is a callout with an icon.</div>
              </div>
            </div>
            
            <div className="c-callout c-callout--success">
              <div className="c-callout__icon">✅</div>
              <div className="c-callout__content">
                <div className="c-callout__title">Success</div>
                <div className="c-callout__text">Your changes have been saved successfully.</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dismissible Callout"
          description="Callouts that can be dismissed by the user"
          code={`<div className="c-callout c-callout--primary">
  <div className="c-callout__content">
    <div className="c-callout__title">Dismissible Callout</div>
    <div className="c-callout__text">Click the X button to dismiss this callout.</div>
  </div>
  <button className="c-callout__close" aria-label="Close">
    ✕
  </button>
</div>`}
        >
          <div className="c-callout c-callout--primary">
            <div className="c-callout__content">
              <div className="c-callout__title">Dismissible Callout</div>
              <div className="c-callout__text">Click the X button to dismiss this callout.</div>
            </div>
            <button className="c-callout__close" aria-label="Close">
              ✕
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="One-Line Callout"
          description="Compact callout for simple messages"
          code={`<div className="c-callout c-callout--primary c-callout--oneline">
  <div className="c-callout__icon">ℹ️</div>
  <div className="c-callout__content">
    <div className="c-callout__text">This is a one-line callout message.</div>
  </div>
</div>`}
        >
          <div className="c-callout c-callout--primary c-callout--oneline">
            <div className="c-callout__icon">ℹ️</div>
            <div className="c-callout__content">
              <div className="c-callout__text">This is a one-line callout message.</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Toast Callout"
          description="Callout styled as a toast notification"
          code={`<div className="c-callout c-callout--primary c-callout--toast">
  <div className="c-callout__content">
    <div className="c-callout__title">Toast Notification</div>
    <div className="c-callout__text">This callout is styled as a toast notification.</div>
  </div>
  <button className="c-callout__close" aria-label="Close">
    ✕
  </button>
</div>`}
        >
          <div className="c-callout c-callout--primary c-callout--toast">
            <div className="c-callout__content">
              <div className="c-callout__title">Toast Notification</div>
              <div className="c-callout__text">This callout is styled as a toast notification.</div>
            </div>
            <button className="c-callout__close" aria-label="Close">
              ✕
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Actions"
          description="Callout with action buttons"
          code={`<div className="c-callout c-callout--primary">
  <div className="c-callout__content">
    <div className="c-callout__title">Confirm Action</div>
    <div className="c-callout__text">Are you sure you want to proceed with this action?</div>
  </div>
  <div className="c-callout__actions">
    <button className="c-btn c-btn--primary c-btn--sm">Confirm</button>
    <button className="c-btn c-btn--outline-secondary c-btn--sm">Cancel</button>
  </div>
</div>`}
        >
          <div className="c-callout c-callout--primary">
            <div className="c-callout__content">
              <div className="c-callout__title">Confirm Action</div>
              <div className="c-callout__text">Are you sure you want to proceed with this action?</div>
            </div>
            <div className="c-callout__actions">
              <button className="c-btn c-btn--primary c-btn--sm">Confirm</button>
              <button className="c-btn c-btn--outline-secondary c-btn--sm">Cancel</button>
            </div>
          </div>
        </ComponentDemo>

        <h2 className="u-mt-8">Props</h2>
        <div className="u-overflow-x-auto">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Name</th>
                <th className="c-data-table__header-cell">Type</th>
                <th className="c-data-table__header-cell">Description</th>
                <th className="c-data-table__header-cell">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>variant</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'success' | 'warning' | 'error' | 'info'</code></td>
                <td className="c-data-table__cell">The visual style of the callout</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>title</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">The title of the callout</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">The content of the callout</td>
                <td className="c-data-table__cell">Required</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>icon</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Icon to display in the callout</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>oneLine</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the callout is displayed in a single line</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>toast</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the callout is displayed as a toast</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onClose</code></td>
                <td className="c-data-table__cell"><code>() => void</code></td>
                <td className="c-data-table__cell">Callback when the callout is closed</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>actions</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Action buttons to display in the callout</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Callout component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses appropriate ARIA roles based on the callout type</li>
          <li className="c-list__item">Implements proper focus management for interactive elements</li>
          <li className="c-list__item">Provides appropriate ARIA live regions for toast notifications</li>
          <li className="c-list__item">Ensures close buttons have accessible labels</li>
        </ul>
      </div>
    </DocsLayout>
  )
}