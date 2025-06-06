'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function SpinnerPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Spinner</h1>
        <p>
          Spinners indicate a loading state or ongoing process. They provide visual feedback to users when content is being loaded or an action is being processed.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default spinner with primary color"
          code={`<div className="c-spinner"></div>`}
        >
          <div className="c-spinner"></div>
        </ComponentDemo>

        <ComponentDemo
          title="Spinner Sizes"
          description="Different sizes to fit your layout needs"
          code={`<div className="c-spinner c-spinner--sm"></div>
<div className="c-spinner"></div>
<div className="c-spinner c-spinner--lg"></div>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center">
            <div className="c-spinner c-spinner--sm"></div>
            <div className="c-spinner"></div>
            <div className="c-spinner c-spinner--lg"></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Spinner Colors"
          description="Different colors for various contexts"
          code={`<div className="c-spinner c-spinner--primary"></div>
<div className="c-spinner c-spinner--secondary"></div>
<div className="c-spinner c-spinner--success"></div>
<div className="c-spinner c-spinner--warning"></div>
<div className="c-spinner c-spinner--error"></div>
<div className="c-spinner c-spinner--info"></div>`}
        >
          <div className="u-d-flex u-gap-4 u-flex-wrap">
            <div className="c-spinner c-spinner--primary"></div>
            <div className="c-spinner c-spinner--secondary"></div>
            <div className="c-spinner c-spinner--success"></div>
            <div className="c-spinner c-spinner--warning"></div>
            <div className="c-spinner c-spinner--error"></div>
            <div className="c-spinner c-spinner--info"></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Text"
          description="Spinner with accompanying text"
          code={`<div className="u-d-flex u-align-items-center u-gap-3">
  <div className="c-spinner"></div>
  <span>Loading...</span>
</div>`}
        >
          <div className="u-d-flex u-align-items-center u-gap-3">
            <div className="c-spinner"></div>
            <span>Loading...</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Centered Spinner"
          description="Spinner centered in a container"
          code={`<div className="u-d-flex u-justify-content-center u-align-items-center" style={{ height: '100px', border: '1px dashed #ccc' }}>
  <div className="c-spinner"></div>
</div>`}
        >
          <div className="u-d-flex u-justify-content-center u-align-items-center" style={{ height: '100px', border: '1px dashed #ccc' }}>
            <div className="c-spinner"></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Spinner with Overlay"
          description="Spinner with a background overlay for blocking interactions"
          code={`<div className="u-position-relative" style={{ height: '150px', border: '1px solid #ccc', padding: '1rem' }}>
  <div className="u-p-4">Content that is being loaded...</div>
  
  <div className="u-position-absolute u-top-0 u-start-0 u-w-100 u-h-100 u-d-flex u-justify-content-center u-align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
    <div className="c-spinner"></div>
  </div>
</div>`}
        >
          <div className="u-position-relative" style={{ height: '150px', border: '1px solid #ccc', padding: '1rem' }}>
            <div className="u-p-4">Content that is being loaded...</div>
            
            <div className="u-position-absolute u-top-0 u-start-0 u-w-100 u-h-100 u-d-flex u-justify-content-center u-align-items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="c-spinner"></div>
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
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">The size of the spinner</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>color</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'</code></td>
                <td className="c-data-table__cell">The color of the spinner</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>label</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Accessible label for screen readers</td>
                <td className="c-data-table__cell"><code>'Loading'</code></td>
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
          The Spinner component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses <code>role="status"</code> to indicate a live region</li>
          <li className="c-list__item">Includes an accessible label for screen readers</li>
          <li className="c-list__item">Maintains sufficient color contrast for visibility</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use spinners to indicate loading states for content or actions</li>
          <li className="c-list__item">Choose an appropriate size based on the context and available space</li>
          <li className="c-list__item">Consider adding text alongside the spinner to provide more context</li>
          <li className="c-list__item">For longer loading operations, consider showing progress indicators instead of indefinite spinners</li>
          <li className="c-list__item">Avoid using multiple spinners in close proximity as it can be visually distracting</li>
        </ul>
      </div>
    </DocsLayout>
  )
}