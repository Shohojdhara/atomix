'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TooltipPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Tooltip</h1>
        <p>
          Tooltips provide additional information or context when users hover over, focus on, 
          or tap an element. They help clarify the purpose of UI elements without cluttering 
          the interface.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Simple tooltip with text content"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-btn c-btn--primary" aria-describedby="tooltip-example">
    Hover Me
  </button>
  <div className="c-tooltip" id="tooltip-example" role="tooltip">
    This is a tooltip
    <div className="c-tooltip__arrow"></div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-btn c-btn--primary" aria-describedby="tooltip-example">
              Hover Me
            </button>
            <div className="c-tooltip" id="tooltip-example" role="tooltip">
              This is a tooltip
              <div className="c-tooltip__arrow"></div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Tooltip Positions"
          description="Tooltips can be positioned in different directions"
          code={`<div className="u-d-flex u-gap-4 u-flex-wrap">
  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--secondary" aria-describedby="tooltip-top">
      Top
    </button>
    <div className="c-tooltip c-tooltip--top" id="tooltip-top" role="tooltip">
      Tooltip on top
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--secondary" aria-describedby="tooltip-right">
      Right
    </button>
    <div className="c-tooltip c-tooltip--right" id="tooltip-right" role="tooltip">
      Tooltip on right
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--secondary" aria-describedby="tooltip-bottom">
      Bottom
    </button>
    <div className="c-tooltip c-tooltip--bottom" id="tooltip-bottom" role="tooltip">
      Tooltip on bottom
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--secondary" aria-describedby="tooltip-left">
      Left
    </button>
    <div className="c-tooltip c-tooltip--left" id="tooltip-left" role="tooltip">
      Tooltip on left
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-flex-wrap">
            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--secondary" aria-describedby="tooltip-top">
                Top
              </button>
              <div className="c-tooltip c-tooltip--top" id="tooltip-top" role="tooltip">
                Tooltip on top
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--secondary" aria-describedby="tooltip-right">
                Right
              </button>
              <div className="c-tooltip c-tooltip--right" id="tooltip-right" role="tooltip">
                Tooltip on right
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--secondary" aria-describedby="tooltip-bottom">
                Bottom
              </button>
              <div className="c-tooltip c-tooltip--bottom" id="tooltip-bottom" role="tooltip">
                Tooltip on bottom
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--secondary" aria-describedby="tooltip-left">
                Left
              </button>
              <div className="c-tooltip c-tooltip--left" id="tooltip-left" role="tooltip">
                Tooltip on left
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Tooltip Variants"
          description="Different background colors for tooltips"
          code={`<div className="u-d-flex u-gap-4 u-flex-wrap">
  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--outline-primary" aria-describedby="tooltip-primary">
      Primary
    </button>
    <div className="c-tooltip c-tooltip--primary" id="tooltip-primary" role="tooltip">
      Primary tooltip
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--outline-secondary" aria-describedby="tooltip-secondary">
      Secondary
    </button>
    <div className="c-tooltip c-tooltip--secondary" id="tooltip-secondary" role="tooltip">
      Secondary tooltip
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--outline-success" aria-describedby="tooltip-success">
      Success
    </button>
    <div className="c-tooltip c-tooltip--success" id="tooltip-success" role="tooltip">
      Success tooltip
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-btn c-btn--outline-error" aria-describedby="tooltip-error">
      Error
    </button>
    <div className="c-tooltip c-tooltip--error" id="tooltip-error" role="tooltip">
      Error tooltip
      <div className="c-tooltip__arrow"></div>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-4 u-flex-wrap">
            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--outline-primary" aria-describedby="tooltip-primary">
                Primary
              </button>
              <div className="c-tooltip c-tooltip--primary" id="tooltip-primary" role="tooltip">
                Primary tooltip
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--outline-secondary" aria-describedby="tooltip-secondary">
                Secondary
              </button>
              <div className="c-tooltip c-tooltip--secondary" id="tooltip-secondary" role="tooltip">
                Secondary tooltip
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--outline-success" aria-describedby="tooltip-success">
                Success
              </button>
              <div className="c-tooltip c-tooltip--success" id="tooltip-success" role="tooltip">
                Success tooltip
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-btn c-btn--outline-error" aria-describedby="tooltip-error">
                Error
              </button>
              <div className="c-tooltip c-tooltip--error" id="tooltip-error" role="tooltip">
                Error tooltip
                <div className="c-tooltip__arrow"></div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Rich Content"
          description="Tooltips can contain more than just text"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-btn c-btn--primary" aria-describedby="tooltip-rich">
    Rich Content
  </button>
  <div className="c-tooltip c-tooltip--large" id="tooltip-rich" role="tooltip">
    <h4 className="u-mb-2">Tooltip Title</h4>
    <p className="u-mb-2">This tooltip contains rich content including:</p>
    <ul className="u-ps-4">
      <li>Formatted text</li>
      <li>Lists</li>
      <li>Other elements</li>
    </ul>
    <div className="c-tooltip__arrow"></div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-btn c-btn--primary" aria-describedby="tooltip-rich">
              Rich Content
            </button>
            <div className="c-tooltip c-tooltip--large" id="tooltip-rich" role="tooltip">
              <h4 className="u-mb-2">Tooltip Title</h4>
              <p className="u-mb-2">This tooltip contains rich content including:</p>
              <ul className="u-ps-4">
                <li>Formatted text</li>
                <li>Lists</li>
                <li>Other elements</li>
              </ul>
              <div className="c-tooltip__arrow"></div>
            </div>
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
                <td className="c-data-table__cell"><code>.c-tooltip</code></td>
                <td className="c-data-table__cell">Base tooltip class</td>
                <td className="c-data-table__cell"><code>c-tooltip</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip__arrow</code></td>
                <td className="c-data-table__cell">Tooltip arrow/pointer</td>
                <td className="c-data-table__cell"><code>c-tooltip__arrow</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--top</code></td>
                <td className="c-data-table__cell">Position tooltip above the element</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--top</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--right</code></td>
                <td className="c-data-table__cell">Position tooltip to the right of the element</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--right</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--bottom</code></td>
                <td className="c-data-table__cell">Position tooltip below the element</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--bottom</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--left</code></td>
                <td className="c-data-table__cell">Position tooltip to the left of the element</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--left</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--primary</code></td>
                <td className="c-data-table__cell">Primary color variant</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--primary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--secondary</code></td>
                <td className="c-data-table__cell">Secondary color variant</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--secondary</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--success</code></td>
                <td className="c-data-table__cell">Success color variant</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--success</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--error</code></td>
                <td className="c-data-table__cell">Error color variant</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--error</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.c-tooltip--large</code></td>
                <td className="c-data-table__cell">Larger tooltip size for rich content</td>
                <td className="c-data-table__cell"><code>c-tooltip c-tooltip--large</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>JavaScript Usage</h2>
        <p>
          To make tooltips fully interactive, Atomix provides JavaScript functionality that handles 
          showing and hiding tooltips, positioning, and keyboard accessibility.
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`// Initialize all tooltips on a page
document.addEventListener('DOMContentLoaded', () => {
  Atomix.initTooltips();
});

// Or initialize specific tooltips
const tooltipTrigger = document.getElementById('my-tooltip-trigger');
Atomix.Tooltip.init(tooltipTrigger, {
  placement: 'top',
  trigger: 'hover focus',
  offset: 8,
  animation: true
});

// API Methods
const tooltipInstance = Atomix.Tooltip.getInstance(tooltipTrigger);
tooltipInstance.show(); // Show the tooltip
tooltipInstance.hide(); // Hide the tooltip
tooltipInstance.toggle(); // Toggle the tooltip
tooltipInstance.update(); // Update tooltip position
tooltipInstance.dispose(); // Remove tooltip functionality`}</code>
        </pre>

        <h2>Accessibility</h2>
        <ul>
          <li>Use <code>aria-describedby</code> to connect the tooltip trigger with the tooltip content</li>
          <li>Add <code>role="tooltip"</code> to the tooltip element</li>
          <li>Ensure tooltips are accessible via keyboard focus, not just hover</li>
          <li>Make tooltips dismissible via Escape key</li>
          <li>Provide sufficient contrast between the tooltip text and background</li>
          <li>Don't rely solely on tooltips for critical information</li>
          <li>Consider users with motion sensitivity when using animated tooltips</li>
        </ul>

        <h2>Design Guidelines</h2>
        <h3>When to Use</h3>
        <ul>
          <li>Use tooltips to provide additional context for UI elements</li>
          <li>Implement tooltips for icon-only buttons to clarify their purpose</li>
          <li>Use tooltips to explain form fields or controls that might be confusing</li>
          <li>Add tooltips to truncated text to show the full content</li>
          <li>Use tooltips to provide keyboard shortcuts or hints</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Keep tooltip content concise and focused</li>
          <li>Position tooltips close to their trigger elements</li>
          <li>Ensure tooltips don't obscure important content</li>
          <li>Use consistent tooltip styling throughout your application</li>
          <li>Avoid using tooltips for essential information</li>
          <li>Consider touch devices where hover isn't available</li>
          <li>Don't nest interactive elements inside tooltips</li>
          <li>Set appropriate delays to prevent accidental triggering</li>
        </ul>
      </div>
    </DocsLayout>
  )
}