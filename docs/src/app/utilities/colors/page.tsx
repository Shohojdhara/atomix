'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function ColorsPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Colors</h1>
        <p>
          Color utilities provide a quick way to apply background, text, and border colors to elements. These utilities make it easy to maintain a consistent color scheme throughout your application.
        </p>

        <ComponentDemo
          title="Text Colors"
          description="Control the text color of elements"
          code={`<p className="u-text-primary">Primary text</p>
<p className="u-text-secondary">Secondary text</p>
<p className="u-text-success">Success text</p>
<p className="u-text-danger">Danger text</p>
<p className="u-text-warning">Warning text</p>
<p className="u-text-info">Info text</p>
<p className="u-text-light">Light text</p>
<p className="u-text-dark">Dark text</p>
<p className="u-text-muted">Muted text</p>`}
        >
          <div>
            <p className="u-text-primary">Primary text</p>
            <p className="u-text-secondary">Secondary text</p>
            <p className="u-text-success">Success text</p>
            <p className="u-text-danger">Danger text</p>
            <p className="u-text-warning">Warning text</p>
            <p className="u-text-info">Info text</p>
            <p className="u-text-light">Light text</p>
            <p className="u-text-dark">Dark text</p>
            <p className="u-text-muted">Muted text</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Background Colors"
          description="Control the background color of elements"
          code={`<div className="u-bg-primary u-p-md u-mb-md u-text-white">Primary background</div>
<div className="u-bg-secondary u-p-md u-mb-md u-text-white">Secondary background</div>
<div className="u-bg-success u-p-md u-mb-md u-text-white">Success background</div>
<div className="u-bg-danger u-p-md u-mb-md u-text-white">Danger background</div>
<div className="u-bg-warning u-p-md u-mb-md">Warning background</div>
<div className="u-bg-info u-p-md u-mb-md">Info background</div>
<div className="u-bg-light u-p-md u-mb-md">Light background</div>
<div className="u-bg-dark u-p-md u-mb-md u-text-white">Dark background</div>
<div className="u-bg-white u-p-md u-mb-md">White background</div>
<div className="u-bg-transparent u-p-md u-border">Transparent background</div>`}
        >
          <div>
            <div className="u-bg-primary u-p-md u-mb-md u-text-white">Primary background</div>
            <div className="u-bg-secondary u-p-md u-mb-md u-text-white">Secondary background</div>
            <div className="u-bg-success u-p-md u-mb-md u-text-white">Success background</div>
            <div className="u-bg-danger u-p-md u-mb-md u-text-white">Danger background</div>
            <div className="u-bg-warning u-p-md u-mb-md">Warning background</div>
            <div className="u-bg-info u-p-md u-mb-md">Info background</div>
            <div className="u-bg-light u-p-md u-mb-md">Light background</div>
            <div className="u-bg-dark u-p-md u-mb-md u-text-white">Dark background</div>
            <div className="u-bg-white u-p-md u-mb-md">White background</div>
            <div className="u-bg-transparent u-p-md u-border">Transparent background</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Background Opacity"
          description="Control the opacity of background colors"
          code={`<div className="u-bg-primary u-bg-opacity-100 u-p-md u-mb-md u-text-white">100% opacity</div>
<div className="u-bg-primary u-bg-opacity-75 u-p-md u-mb-md u-text-white">75% opacity</div>
<div className="u-bg-primary u-bg-opacity-50 u-p-md u-mb-md u-text-white">50% opacity</div>
<div className="u-bg-primary u-bg-opacity-25 u-p-md u-mb-md">25% opacity</div>
<div className="u-bg-primary u-bg-opacity-10 u-p-md">10% opacity</div>`}
        >
          <div>
            <div className="u-bg-primary u-bg-opacity-100 u-p-md u-mb-md u-text-white">100% opacity</div>
            <div className="u-bg-primary u-bg-opacity-75 u-p-md u-mb-md u-text-white">75% opacity</div>
            <div className="u-bg-primary u-bg-opacity-50 u-p-md u-mb-md u-text-white">50% opacity</div>
            <div className="u-bg-primary u-bg-opacity-25 u-p-md u-mb-md">25% opacity</div>
            <div className="u-bg-primary u-bg-opacity-10 u-p-md">10% opacity</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Gradient Backgrounds"
          description="Apply gradient backgrounds to elements"
          code={`<div className="u-bg-gradient-primary u-p-md u-mb-md u-text-white">Primary gradient</div>
<div className="u-bg-gradient-secondary u-p-md u-mb-md u-text-white">Secondary gradient</div>
<div className="u-bg-gradient-success u-p-md u-mb-md u-text-white">Success gradient</div>
<div className="u-bg-gradient-danger u-p-md u-mb-md u-text-white">Danger gradient</div>
<div className="u-bg-gradient-warning u-p-md u-mb-md">Warning gradient</div>
<div className="u-bg-gradient-info u-p-md u-mb-md">Info gradient</div>
<div className="u-bg-gradient-dark u-p-md u-text-white">Dark gradient</div>`}
        >
          <div>
            <div className="u-bg-gradient-primary u-p-md u-mb-md u-text-white">Primary gradient</div>
            <div className="u-bg-gradient-secondary u-p-md u-mb-md u-text-white">Secondary gradient</div>
            <div className="u-bg-gradient-success u-p-md u-mb-md u-text-white">Success gradient</div>
            <div className="u-bg-gradient-danger u-p-md u-mb-md u-text-white">Danger gradient</div>
            <div className="u-bg-gradient-warning u-p-md u-mb-md">Warning gradient</div>
            <div className="u-bg-gradient-info u-p-md u-mb-md">Info gradient</div>
            <div className="u-bg-gradient-dark u-p-md u-text-white">Dark gradient</div>
          </div>
        </ComponentDemo>

        <h2>Color Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-primary</code></td>
              <td className="c-data-table__cell">Primary text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-secondary</code></td>
              <td className="c-data-table__cell">Secondary text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-success</code></td>
              <td className="c-data-table__cell">Success text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-danger</code></td>
              <td className="c-data-table__cell">Danger text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-warning</code></td>
              <td className="c-data-table__cell">Warning text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-info</code></td>
              <td className="c-data-table__cell">Info text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-light</code></td>
              <td className="c-data-table__cell">Light text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-dark</code></td>
              <td className="c-data-table__cell">Dark text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-muted</code></td>
              <td className="c-data-table__cell">Muted text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-white</code></td>
              <td className="c-data-table__cell">White text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-primary</code></td>
              <td className="c-data-table__cell">Primary background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-secondary</code></td>
              <td className="c-data-table__cell">Secondary background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-success</code></td>
              <td className="c-data-table__cell">Success background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-danger</code></td>
              <td className="c-data-table__cell">Danger background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-warning</code></td>
              <td className="c-data-table__cell">Warning background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-info</code></td>
              <td className="c-data-table__cell">Info background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-light</code></td>
              <td className="c-data-table__cell">Light background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-dark</code></td>
              <td className="c-data-table__cell">Dark background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-white</code></td>
              <td className="c-data-table__cell">White background color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-transparent</code></td>
              <td className="c-data-table__cell">Transparent background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-opacity-100</code></td>
              <td className="c-data-table__cell">100% background opacity</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-opacity-75</code></td>
              <td className="c-data-table__cell">75% background opacity</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-opacity-50</code></td>
              <td className="c-data-table__cell">50% background opacity</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-opacity-25</code></td>
              <td className="c-data-table__cell">25% background opacity</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-opacity-10</code></td>
              <td className="c-data-table__cell">10% background opacity</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-primary</code></td>
              <td className="c-data-table__cell">Primary gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-secondary</code></td>
              <td className="c-data-table__cell">Secondary gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-success</code></td>
              <td className="c-data-table__cell">Success gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-danger</code></td>
              <td className="c-data-table__cell">Danger gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-warning</code></td>
              <td className="c-data-table__cell">Warning gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-info</code></td>
              <td className="c-data-table__cell">Info gradient background</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-bg-gradient-dark</code></td>
              <td className="c-data-table__cell">Dark gradient background</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}