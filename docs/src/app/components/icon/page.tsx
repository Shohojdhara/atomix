'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function IconPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Icon</h1>
        <p>
          Icons help users understand actions, provide visual cues, and enhance the overall user
          experience of your application. Atomix provides a flexible icon system that works with
          different icon libraries and formats.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Standard icons with different sizes"
          code={`<div className="u-d-flex u-gap-4 u-align-items-center">
  <span className="c-icon c-icon--xs">⭐</span>
  <span className="c-icon c-icon--sm">⭐</span>
  <span className="c-icon">⭐</span>
  <span className="c-icon c-icon--lg">⭐</span>
  <span className="c-icon c-icon--xl">⭐</span>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center">
            <span className="c-icon c-icon--xs">⭐</span>
            <span className="c-icon c-icon--sm">⭐</span>
            <span className="c-icon">⭐</span>
            <span className="c-icon c-icon--lg">⭐</span>
            <span className="c-icon c-icon--xl">⭐</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Icon Colors"
          description="Icons with different color variations"
          code={`<div className="u-d-flex u-gap-4 u-align-items-center">
  <span className="c-icon c-icon--primary">★</span>
  <span className="c-icon c-icon--secondary">★</span>
  <span className="c-icon c-icon--success">★</span>
  <span className="c-icon c-icon--info">★</span>
  <span className="c-icon c-icon--warning">★</span>
  <span className="c-icon c-icon--error">★</span>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center">
            <span className="c-icon c-icon--primary">★</span>
            <span className="c-icon c-icon--secondary">★</span>
            <span className="c-icon c-icon--success">★</span>
            <span className="c-icon c-icon--info">★</span>
            <span className="c-icon c-icon--warning">★</span>
            <span className="c-icon c-icon--error">★</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Button with Icon"
          description="Combining icons with buttons"
          code={`<div className="u-d-flex u-gap-4">
  <button className="c-btn c-btn--primary">
    <span className="c-icon c-icon--sm u-me-2">+</span>
    Add Item
  </button>
  <button className="c-btn c-btn--secondary">
    <span className="c-icon c-icon--sm u-me-2">↓</span>
    Download
  </button>
  <button className="c-btn c-btn--outline-error">
    <span className="c-icon c-icon--sm u-me-2">×</span>
    Delete
  </button>
</div>`}
        >
          <div className="u-d-flex u-gap-4">
            <button className="c-btn c-btn--primary">
              <span className="c-icon c-icon--sm u-me-2">+</span>
              Add Item
            </button>
            <button className="c-btn c-btn--secondary">
              <span className="c-icon c-icon--sm u-me-2">↓</span>
              Download
            </button>
            <button className="c-btn c-btn--outline-error">
              <span className="c-icon c-icon--sm u-me-2">×</span>
              Delete
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Icon Only Buttons"
          description="Buttons with only icons"
          code={`<div className="u-d-flex u-gap-4">
  <button className="c-btn c-btn--icon c-btn--primary">
    <span className="c-icon">✚</span>
  </button>
  <button className="c-btn c-btn--icon c-btn--secondary">
    <span className="c-icon">⬇️</span>
  </button>
  <button className="c-btn c-btn--icon c-btn--outline-error">
    <span className="c-icon">🗑️</span>
  </button>
</div>`}
        >
          <div className="u-d-flex u-gap-4">
            <button className="c-btn c-btn--icon c-btn--primary">
              <span className="c-icon">✚</span>
            </button>
            <button className="c-btn c-btn--icon c-btn--secondary">
              <span className="c-icon">⬇️</span>
            </button>
            <button className="c-btn c-btn--icon c-btn--outline-error">
              <span className="c-icon">🗑️</span>
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="SVG Icons"
          description="Using SVG icons for better scalability"
          code={`<div className="u-d-flex u-gap-4 u-align-items-center">
  <span className="c-icon c-icon--primary">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  </span>
  <span className="c-icon c-icon--lg c-icon--secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 16 16 12 12 8"></polyline>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  </span>
  <span className="c-icon c-icon--xl c-icon--success">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  </span>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center">
            <span className="c-icon c-icon--primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </span>
            <span className="c-icon c-icon--lg c-icon--secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </span>
            <span className="c-icon c-icon--xl c-icon--success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Spin Animation"
          description="Animated spinning icons for loading states"
          code={`<div className="u-d-flex u-gap-4 u-align-items-center">
  <span className="c-icon c-icon--spin">↻</span>
  <span className="c-icon c-icon--lg c-icon--primary c-icon--spin">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  </span>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-align-items-center">
            <span className="c-icon c-icon--spin">↻</span>
            <span className="c-icon c-icon--lg c-icon--primary c-icon--spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </span>
          </div>
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
                <td className="c-data-table__cell"><code>.c-icon</code></td>
                <td className="c-data-table__cell">Base icon class</td>
                <td className="c-data-table__cell"><code>c-icon</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--xs</code></td>
                <td className="c-data-table__cell">Extra small size</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--xs</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--sm</code></td>
                <td className="c-data-table__cell">Small size</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--sm</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--lg</code></td>
                <td className="c-data-table__cell">Large size</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--lg</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--xl</code></td>
                <td className="c-data-table__cell">Extra large size</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--primary</code></td>
                <td className="c-data-table__cell">Primary color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--primary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--secondary</code></td>
                <td className="c-data-table__cell">Secondary color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--secondary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--success</code></td>
                <td className="c-data-table__cell">Success color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--success</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--info</code></td>
                <td className="c-data-table__cell">Info color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--info</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--warning</code></td>
                <td className="c-data-table__cell">Warning color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--warning</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--error</code></td>
                <td className="c-data-table__cell">Error color variant</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--error</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--spin</code></td>
                <td className="c-data-table__cell">Spinning animation</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--spin</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-icon--pulse</code></td>
                <td className="c-data-table__cell">Pulsing animation</td>
                <td className="c-data-table__cell"><code>c-icon c-icon--pulse</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Using Icon Libraries</h2>
        <p>
          Atomix works seamlessly with popular icon libraries. Here are examples of integrating
          different icon libraries:
        </p>

        <h3>Font Awesome</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`<!-- Include Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

<!-- Use Font Awesome icons with Atomix classes -->
<span class="c-icon c-icon--primary">
  <i class="fas fa-star"></i>
</span>`}</code>
        </pre>

        <h3>Material Icons</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`<!-- Include Material Icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Use Material Icons with Atomix classes -->
<span class="c-icon c-icon--secondary">
  <span class="material-icons">favorite</span>
</span>`}</code>
        </pre>

        <h3>SVG Icons</h3>
        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`<!-- SVG icon directly in HTML -->
<span class="c-icon c-icon--success">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
</span>`}</code>
        </pre>

        <h2>Accessibility</h2>
        <ul>
          <li>Always provide alternative text for icons that convey meaning</li>
          <li>Use <code>aria-hidden="true"</code> for decorative icons</li>
          <li>For icons that function as interactive elements, ensure they have proper focus states</li>
          <li>Maintain sufficient color contrast for icons against their background</li>
          <li>Consider users who may have motion sensitivity when using animated icons</li>
        </ul>

        <h2>Design Guidelines</h2>
        <h3>When to Use</h3>
        <ul>
          <li>Use icons to complement text labels for easier recognition</li>
          <li>Implement icons for common actions like save, delete, search, etc.</li>
          <li>Use icons to save space in compact layouts</li>
          <li>Include icons in navigation menus to enhance visual scanning</li>
          <li>Use animated icons to indicate loading or processing states</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Maintain consistency in icon style throughout your application</li>
          <li>Use a single icon library when possible</li>
          <li>Keep icons simple and recognizable</li>
          <li>Ensure icons are properly sized for their context</li>
          <li>Use color to enhance meaning, but don't rely on color alone</li>
          <li>Pair icons with text labels for important actions</li>
          <li>Consider cultural differences when selecting icons</li>
        </ul>
      </div>
    </DocsLayout>
  )
}