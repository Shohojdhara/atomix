'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function CardPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Card</h1>
        <p>
          Cards are flexible containers for displaying content and actions about a single subject.
          They provide a consistent layout structure with optional headers, images, content, and actions.
        </p>

        <ComponentDemo
          title="Basic Card"
          description="Simple card with title and text content"
          code={`<div className="c-card">
  <div className="c-card__body">
    <h3 className="c-card__title">Card Title</h3>
    <p className="c-card__text">This is a basic card with some descriptive text content.</p>
  </div>
</div>`}
        >
          <div className="c-card">
            <div className="c-card__body">
              <h3 className="c-card__title">Card Title</h3>
              <p className="c-card__text">This is a basic card with some descriptive text content.</p>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Card with Image"
          description="Card featuring an image header"
          code={`<div className="c-card">
  <div className="c-card__header">
    <img src="https://picsum.photos/400/200" alt="Sample image" className="c-card__image" />
  </div>
  <div className="c-card__body">
    <h3 className="c-card__title">Beautiful Landscape</h3>
    <p className="c-card__text">A stunning view of nature captured in this beautiful photograph.</p>
  </div>
</div>`}
        >
          <div className="c-card">
            <div className="c-card__header">
              <img src="https://picsum.photos/400/200" alt="Sample image" className="c-card__image" />
            </div>
            <div className="c-card__body">
              <h3 className="c-card__title">Beautiful Landscape</h3>
              <p className="c-card__text">A stunning view of nature captured in this beautiful photograph.</p>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Card with Icon"
          description="Card with an icon in the header area"
          code={`<div className="c-card">
  <div className="c-card__header">
    <div className="c-card__icon">❤️</div>
  </div>
  <div className="c-card__body">
    <h3 className="c-card__title">Favorite Item</h3>
    <p className="c-card__text">This card features an icon to provide visual context.</p>
  </div>
</div>`}
        >
          <div className="c-card">
            <div className="c-card__header">
              <div className="c-card__icon">❤️</div>
            </div>
            <div className="c-card__body">
              <h3 className="c-card__title">Favorite Item</h3>
              <p className="c-card__text">This card features an icon to provide visual context.</p>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Card with Actions"
          description="Card including action buttons"
          code={`<div className="c-card">
  <div className="c-card__body">
    <h3 className="c-card__title">Product Card</h3>
    <p className="c-card__text">This product has some great features you might be interested in.</p>
  </div>
  <div className="c-card__actions">
    <button className="c-btn c-btn--primary c-btn--sm">Buy Now</button>
    <button className="c-btn c-btn--outline-primary c-btn--sm">Learn More</button>
  </div>
</div>`}
        >
          <div className="c-card">
            <div className="c-card__body">
              <h3 className="c-card__title">Product Card</h3>
              <p className="c-card__text">This product has some great features you might be interested in.</p>
            </div>
            <div className="c-card__actions">
              <button className="c-btn c-btn--primary c-btn--sm">Buy Now</button>
              <button className="c-btn c-btn--outline-primary c-btn--sm">Learn More</button>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Card with Header and Footer"
          description="Full card with custom header and footer content"
          code={`<div className="c-card">
  <div className="c-card__header">
    <div className="u-d-flex u-justify-content-between u-align-items-center">
      <span className="c-badge c-badge--success">New</span>
      <span>⭐</span>
    </div>
  </div>
  <div className="c-card__body">
    <h3 className="c-card__title">Featured Article</h3>
    <p className="c-card__text">This is a featured article with custom header and footer sections.</p>
  </div>
  <div className="c-card__footer">
    <div className="u-d-flex u-justify-content-between u-align-items-center u-fs-sm u-text-secondary">
      <span>Published: Jan 15, 2024</span>
      <span>5 min read</span>
    </div>
  </div>
</div>`}
        >
          <div className="c-card">
            <div className="c-card__header">
              <div className="u-d-flex u-justify-content-between u-align-items-center">
                <span className="c-badge c-badge--success">New</span>
                <span>⭐</span>
              </div>
            </div>
            <div className="c-card__body">
              <h3 className="c-card__title">Featured Article</h3>
              <p className="c-card__text">This is a featured article with custom header and footer sections.</p>
            </div>
            <div className="c-card__footer">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-fs-sm u-text-secondary">
                <span>Published: Jan 15, 2024</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Horizontal Card"
          description="Card with row layout for horizontal display"
          code={`<div className="c-card c-card--row">
  <div className="c-card__header">
    <img src="https://picsum.photos/200/150" alt="Horizontal card image" className="c-card__image" />
  </div>
  <div className="c-card__body">
    <h3 className="c-card__title">Horizontal Layout</h3>
    <p className="c-card__text">This card uses a horizontal layout with the image on the side.</p>
  </div>
  <div className="c-card__actions">
    <button className="c-btn c-btn--outline-primary c-btn--sm">View Details</button>
  </div>
</div>`}
        >
          <div className="c-card c-card--row">
            <div className="c-card__header">
              <img src="https://picsum.photos/200/150" alt="Horizontal card image" className="c-card__image" />
            </div>
            <div className="c-card__body">
              <h3 className="c-card__title">Horizontal Layout</h3>
              <p className="c-card__text">This card uses a horizontal layout with the image on the side.</p>
            </div>
            <div className="c-card__actions">
              <button className="c-btn c-btn--outline-primary c-btn--sm">View Details</button>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Active/Selected Card"
          description="Card in active state"
          code={`<div className="c-card is-active">
  <div className="c-card__header">
    <div className="c-card__icon">✅</div>
  </div>
  <div className="c-card__body">
    <h3 className="c-card__title">Selected Card</h3>
    <p className="c-card__text">This card is in an active/selected state.</p>
  </div>
</div>`}
        >
          <div className="c-card is-active">
            <div className="c-card__header">
              <div className="c-card__icon">✅</div>
            </div>
            <div className="c-card__body">
              <h3 className="c-card__title">Selected Card</h3>
              <p className="c-card__text">This card is in an active/selected state.</p>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Flat Card"
          description="Card with flat styling"
          code={`<div className="c-card c-card--flat">
  <img src="https://picsum.photos/400/200" alt="Flat card image" className="c-card__image" />
  <div className="c-card__body">
    <h3 className="c-card__title">Flat Design</h3>
    <p className="c-card__text">This card uses flat styling with no internal padding on the image.</p>
  </div>
  <div className="c-card__footer">
    <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
  </div>
</div>`}
        >
          <div className="c-card c-card--flat">
            <img src="https://picsum.photos/400/200" alt="Flat card image" className="c-card__image" />
            <div className="c-card__body">
              <h3 className="c-card__title">Flat Design</h3>
              <p className="c-card__text">This card uses flat styling with no internal padding on the image.</p>
            </div>
            <div className="c-card__footer">
              <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
            </div>
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
                <td className="c-data-table__cell"><code>.c-card</code></td>
                <td className="c-data-table__cell">Base card class</td>
                <td className="c-data-table__cell"><code>c-card</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card--row</code></td>
                <td className="c-data-table__cell">Horizontal card layout</td>
                <td className="c-data-table__cell"><code>c-card c-card--row</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card--flat</code></td>
                <td className="c-data-table__cell">Flat card style (no image padding)</td>
                <td className="c-data-table__cell"><code>c-card c-card--flat</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.is-active</code></td>
                <td className="c-data-table__cell">Active/selected state</td>
                <td className="c-data-table__cell"><code>c-card is-active</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__header</code></td>
                <td className="c-data-table__cell">Card header section</td>
                <td className="c-data-table__cell"><code>c-card__header</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__body</code></td>
                <td className="c-data-table__cell">Card body content</td>
                <td className="c-data-table__cell"><code>c-card__body</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__footer</code></td>
                <td className="c-data-table__cell">Card footer section</td>
                <td className="c-data-table__cell"><code>c-card__footer</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__title</code></td>
                <td className="c-data-table__cell">Card title element</td>
                <td className="c-data-table__cell"><code>c-card__title</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__text</code></td>
                <td className="c-data-table__cell">Card text content</td>
                <td className="c-data-table__cell"><code>c-card__text</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__image</code></td>
                <td className="c-data-table__cell">Card image element</td>
                <td className="c-data-table__cell"><code>c-card__image</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__icon</code></td>
                <td className="c-data-table__cell">Card icon container</td>
                <td className="c-data-table__cell"><code>c-card__icon</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-card__actions</code></td>
                <td className="c-data-table__cell">Card actions container</td>
                <td className="c-data-table__cell"><code>c-card__actions</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Accessibility</h2>
        <ul>
          <li>Proper semantic structure with heading elements</li>
          <li>Image alt text support for screen readers</li>
          <li>Keyboard navigation when clickable</li>
          <li>Focus management for interactive elements</li>
          <li>ARIA attributes for enhanced accessibility</li>
        </ul>

        <h2>Design Guidelines</h2>
        <h3>When to Use</h3>
        <ul>
          <li>Displaying related information in a contained format</li>
          <li>Creating product listings or content grids</li>
          <li>Organizing dashboard widgets</li>
          <li>Presenting articles or blog posts</li>
          <li>Building feature comparison layouts</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Keep card content concise and scannable</li>
          <li>Use consistent card heights in grid layouts</li>
          <li>Provide clear visual hierarchy with titles and content</li>
          <li>Include relevant actions when appropriate</li>
          <li>Consider image aspect ratios for visual consistency</li>
          <li>Use spacing effectively between cards in layouts</li>
        </ul>
      </div>
    </DocsLayout>
  )
}