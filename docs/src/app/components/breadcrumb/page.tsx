'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function BreadcrumbPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Breadcrumb</h1>
        <p>
          Breadcrumbs provide a navigational aid that helps users understand their location
          within a website or application's hierarchy and navigate back to previous pages.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Standard breadcrumb with multiple levels"
          code={`<nav aria-label="Breadcrumb" className="c-breadcrumb">
  <ol className="c-breadcrumb__list">
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Home</a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Products</a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Categories</a>
    </li>
    <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
      Electronics
    </li>
  </ol>
</nav>`}
        >
          <nav aria-label="Breadcrumb" className="c-breadcrumb">
            <ol className="c-breadcrumb__list">
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Home</a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Products</a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Categories</a>
              </li>
              <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
                Electronics
              </li>
            </ol>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="With Custom Separator"
          description="Breadcrumb with a custom separator icon"
          code={`<nav aria-label="Breadcrumb" className="c-breadcrumb c-breadcrumb--separator-arrow">
  <ol className="c-breadcrumb__list">
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Home</a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Library</a>
    </li>
    <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
      Books
    </li>
  </ol>
</nav>`}
        >
          <nav aria-label="Breadcrumb" className="c-breadcrumb c-breadcrumb--separator-arrow">
            <ol className="c-breadcrumb__list">
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Home</a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Library</a>
              </li>
              <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
                Books
              </li>
            </ol>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="With Icons"
          description="Breadcrumb with icons for visual cues"
          code={`<nav aria-label="Breadcrumb" className="c-breadcrumb">
  <ol className="c-breadcrumb__list">
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">
        <span className="c-breadcrumb__icon">🏠</span>
        Home
      </a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">
        <span className="c-breadcrumb__icon">📁</span>
        Documents
      </a>
    </li>
    <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
      <span className="c-breadcrumb__icon">📄</span>
      Report.pdf
    </li>
  </ol>
</nav>`}
        >
          <nav aria-label="Breadcrumb" className="c-breadcrumb">
            <ol className="c-breadcrumb__list">
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">
                  <span className="c-breadcrumb__icon">🏠</span>
                  Home
                </a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">
                  <span className="c-breadcrumb__icon">📁</span>
                  Documents
                </a>
              </li>
              <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
                <span className="c-breadcrumb__icon">📄</span>
                Report.pdf
              </li>
            </ol>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Responsive Breadcrumb"
          description="Collapsible breadcrumb for better mobile experience"
          code={`<nav aria-label="Breadcrumb" className="c-breadcrumb c-breadcrumb--responsive">
  <ol className="c-breadcrumb__list">
    <li className="c-breadcrumb__item c-breadcrumb__item--collapsed">
      <a href="#" className="c-breadcrumb__link">...</a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Products</a>
    </li>
    <li className="c-breadcrumb__item">
      <a href="#" className="c-breadcrumb__link">Categories</a>
    </li>
    <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
      Smartphones
    </li>
  </ol>
</nav>`}
        >
          <nav aria-label="Breadcrumb" className="c-breadcrumb c-breadcrumb--responsive">
            <ol className="c-breadcrumb__list">
              <li className="c-breadcrumb__item c-breadcrumb__item--collapsed">
                <a href="#" className="c-breadcrumb__link">...</a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Products</a>
              </li>
              <li className="c-breadcrumb__item">
                <a href="#" className="c-breadcrumb__link">Categories</a>
              </li>
              <li className="c-breadcrumb__item c-breadcrumb__item--active" aria-current="page">
                Smartphones
              </li>
            </ol>
          </nav>
        </ComponentDemo>

        <h2>CSS Classes Reference</h2>
        <div className="u-overflow-x-auto">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Class</th>
                <th className="c-data-table__header-cell">Description</th>
                <th className="c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb</code></td>
                <td className="c-data-table__cell">Base container class</td>
                <td className="c-data-table__cell"><code>c-breadcrumb</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__list</code></td>
                <td className="c-data-table__cell">List container for breadcrumb items</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__list</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__item</code></td>
                <td className="c-data-table__cell">Individual breadcrumb item</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__item</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__item--active</code></td>
                <td className="c-data-table__cell">Current/active breadcrumb item</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__item c-breadcrumb__item--active</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__link</code></td>
                <td className="c-data-table__cell">Link in breadcrumb item</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__link</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__icon</code></td>
                <td className="c-data-table__cell">Icon container in breadcrumb</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__icon</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb--separator-arrow</code></td>
                <td className="c-data-table__cell">Uses arrow separators</td>
                <td className="c-data-table__cell"><code>c-breadcrumb c-breadcrumb--separator-arrow</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb--responsive</code></td>
                <td className="c-data-table__cell">Responsive collapsible variant</td>
                <td className="c-data-table__cell"><code>c-breadcrumb c-breadcrumb--responsive</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-breadcrumb__item--collapsed</code></td>
                <td className="c-data-table__cell">Collapsed item in responsive mode</td>
                <td className="c-data-table__cell"><code>c-breadcrumb__item c-breadcrumb__item--collapsed</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Accessibility</h2>
        <ul>
          <li>Use the <code>nav</code> element with <code>aria-label="Breadcrumb"</code> to identify the breadcrumb navigation</li>
          <li>Use an ordered list (<code>ol</code>) to represent the hierarchical structure</li>
          <li>Mark the current page with <code>aria-current="page"</code></li>
          <li>Ensure sufficient color contrast between breadcrumb links and their background</li>
          <li>Include visible separators between items for visual clarity</li>
          <li>Consider keyboard navigation for users who can't use a mouse</li>
        </ul>

        <h2>Design Guidelines</h2>
        <h3>When to Use</h3>
        <ul>
          <li>Use breadcrumbs for websites with hierarchical navigation structures</li>
          <li>Implement breadcrumbs on pages that are deeper than two levels in the site hierarchy</li>
          <li>Use when you want to help users understand their current location within your site</li>
          <li>Add breadcrumbs when users need to navigate back to parent pages frequently</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Place breadcrumbs at the top of the page, below the main navigation</li>
          <li>Arrange items from least to most specific (left to right)</li>
          <li>Keep breadcrumb labels concise and clear</li>
          <li>Use separators that are clearly visible but not too prominent</li>
          <li>Consider collapsing breadcrumbs on mobile devices to save space</li>
          <li>Ensure breadcrumbs accurately reflect the site's hierarchy</li>
          <li>Don't use breadcrumbs as the only navigation method</li>
        </ul>
      </div>
    </DocsLayout>
  )
}