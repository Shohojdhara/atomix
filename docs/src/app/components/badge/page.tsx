'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function BadgePage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Badge</h1>
        <p>
          Badges are small visual indicators used to highlight information such as counts, status, or labels.
          They can be used standalone or attached to other elements like buttons or text.
        </p>

        <ComponentDemo
          title="Basic Badges"
          description="Simple badge examples with different colors"
          code={`<div className="u-d-flex u-gap-md">
  <span className="c-badge">Default</span>
  <span className="c-badge c-badge--primary">Primary</span>
  <span className="c-badge c-badge--secondary">Secondary</span>
  <span className="c-badge c-badge--success">Success</span>
  <span className="c-badge c-badge--danger">Danger</span>
  <span className="c-badge c-badge--warning">Warning</span>
  <span className="c-badge c-badge--info">Info</span>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <span className="c-badge">Default</span>
            <span className="c-badge c-badge--primary">Primary</span>
            <span className="c-badge c-badge--secondary">Secondary</span>
            <span className="c-badge c-badge--success">Success</span>
            <span className="c-badge c-badge--danger">Danger</span>
            <span className="c-badge c-badge--warning">Warning</span>
            <span className="c-badge c-badge--info">Info</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Pill Badges"
          description="Rounded pill-shaped badges"
          code={`<div className="u-d-flex u-gap-md">
  <span className="c-badge c-badge--pill">Default</span>
  <span className="c-badge c-badge--pill c-badge--primary">Primary</span>
  <span className="c-badge c-badge--pill c-badge--secondary">Secondary</span>
  <span className="c-badge c-badge--pill c-badge--success">Success</span>
  <span className="c-badge c-badge--pill c-badge--danger">Danger</span>
  <span className="c-badge c-badge--pill c-badge--warning">Warning</span>
  <span className="c-badge c-badge--pill c-badge--info">Info</span>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <span className="c-badge c-badge--pill">Default</span>
            <span className="c-badge c-badge--pill c-badge--primary">Primary</span>
            <span className="c-badge c-badge--pill c-badge--secondary">Secondary</span>
            <span className="c-badge c-badge--pill c-badge--success">Success</span>
            <span className="c-badge c-badge--pill c-badge--danger">Danger</span>
            <span className="c-badge c-badge--pill c-badge--warning">Warning</span>
            <span className="c-badge c-badge--pill c-badge--info">Info</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Outline Badges"
          description="Badges with outline style"
          code={`<div className="u-d-flex u-gap-md">
  <span className="c-badge c-badge--outline">Default</span>
  <span className="c-badge c-badge--outline c-badge--primary">Primary</span>
  <span className="c-badge c-badge--outline c-badge--secondary">Secondary</span>
  <span className="c-badge c-badge--outline c-badge--success">Success</span>
  <span className="c-badge c-badge--outline c-badge--danger">Danger</span>
  <span className="c-badge c-badge--outline c-badge--warning">Warning</span>
  <span className="c-badge c-badge--outline c-badge--info">Info</span>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <span className="c-badge c-badge--outline">Default</span>
            <span className="c-badge c-badge--outline c-badge--primary">Primary</span>
            <span className="c-badge c-badge--outline c-badge--secondary">Secondary</span>
            <span className="c-badge c-badge--outline c-badge--success">Success</span>
            <span className="c-badge c-badge--outline c-badge--danger">Danger</span>
            <span className="c-badge c-badge--outline c-badge--warning">Warning</span>
            <span className="c-badge c-badge--outline c-badge--info">Info</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Badge Sizes"
          description="Badges in different sizes"
          code={`<div className="u-d-flex u-gap-md u-items-center">
  <span className="c-badge c-badge--sm c-badge--primary">Small</span>
  <span className="c-badge c-badge--primary">Default</span>
  <span className="c-badge c-badge--lg c-badge--primary">Large</span>
</div>`}
        >
          <div className="u-d-flex u-gap-md u-items-center">
            <span className="c-badge c-badge--sm c-badge--primary">Small</span>
            <span className="c-badge c-badge--primary">Default</span>
            <span className="c-badge c-badge--lg c-badge--primary">Large</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Badges with Icons"
          description="Badges with icons for enhanced visual information"
          code={`<div className="u-d-flex u-gap-md">
  <span className="c-badge c-badge--success">
    <span className="u-mr-xs">✓</span> Completed
  </span>
  <span className="c-badge c-badge--warning">
    <span className="u-mr-xs">⚠️</span> Warning
  </span>
  <span className="c-badge c-badge--danger">
    <span className="u-mr-xs">✕</span> Error
  </span>
  <span className="c-badge c-badge--info">
    <span className="u-mr-xs">ℹ</span> Info
  </span>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <span className="c-badge c-badge--success">
              <span className="u-mr-xs">✓</span> Completed
            </span>
            <span className="c-badge c-badge--warning">
              <span className="u-mr-xs">⚠️</span> Warning
            </span>
            <span className="c-badge c-badge--danger">
              <span className="u-mr-xs">✕</span> Error
            </span>
            <span className="c-badge c-badge--info">
              <span className="u-mr-xs">ℹ</span> Info
            </span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Badges with Buttons"
          description="Badges used with buttons to show counts or status"
          code={`<div className="u-d-flex u-gap-md">
  <button className="c-btn c-btn--primary">
    Notifications <span className="c-badge c-badge--light u-ml-xs">4</span>
  </button>
  <button className="c-btn c-btn--secondary">
    Messages <span className="c-badge c-badge--light u-ml-xs">7</span>
  </button>
  <button className="c-btn c-btn--success">
    Updates <span className="c-badge c-badge--light u-ml-xs">2</span>
  </button>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <button className="c-btn c-btn--primary">
              Notifications <span className="c-badge c-badge--light u-ml-xs">4</span>
            </button>
            <button className="c-btn c-btn--secondary">
              Messages <span className="c-badge c-badge--light u-ml-xs">7</span>
            </button>
            <button className="c-btn c-btn--success">
              Updates <span className="c-badge c-badge--light u-ml-xs">2</span>
            </button>
          </div>
        </ComponentDemo>

        <h2>Props</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge</code></td>
              <td className="c-data-table__cell">Base badge class</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--primary</code></td>
              <td className="c-data-table__cell">Primary color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--secondary</code></td>
              <td className="c-data-table__cell">Secondary color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--success</code></td>
              <td className="c-data-table__cell">Success color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--danger</code></td>
              <td className="c-data-table__cell">Danger color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--warning</code></td>
              <td className="c-data-table__cell">Warning color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--info</code></td>
              <td className="c-data-table__cell">Info color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--light</code></td>
              <td className="c-data-table__cell">Light color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--dark</code></td>
              <td className="c-data-table__cell">Dark color badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--pill</code></td>
              <td className="c-data-table__cell">Pill-shaped badge with rounded corners</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--outline</code></td>
              <td className="c-data-table__cell">Outline style badge</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--sm</code></td>
              <td className="c-data-table__cell">Small badge size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-badge--lg</code></td>
              <td className="c-data-table__cell">Large badge size</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}