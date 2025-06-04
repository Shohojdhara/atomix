'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function ShadowsPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Shadows & Elevation</h1>
        <p>
          Shadows help create depth and hierarchy in your interface. The Atomix shadow system
          provides a consistent set of elevations that can be applied to components.
        </p>

        <h2>Shadow Scale</h2>
        <p>
          Atomix provides a range of shadow values from subtle to pronounced, allowing you to
          create appropriate depth for different UI elements.
        </p>

        <div className="u-d-flex u-flex-column u-gap-8 u-mb-8">
          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-none)' }}
            >
              None
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">None</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-none</code>
              </div>
              <p className="u-fs-sm u-mt-2">No shadow, flat appearance</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-xs)' }}
            >
              Extra Small
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">Extra Small</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-xs</code>
              </div>
              <p className="u-fs-sm u-mt-2">Subtle shadow for slight elevation, good for inputs and cards at rest</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              Small
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">Small</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-sm</code>
              </div>
              <p className="u-fs-sm u-mt-2">Light shadow for low elevation elements like cards, buttons</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              Medium
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">Medium</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-md</code>
              </div>
              <p className="u-fs-sm u-mt-2">Medium shadow for interactive elements like dropdowns, popovers</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              Large
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">Large</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-lg</code>
              </div>
              <p className="u-fs-sm u-mt-2">Pronounced shadow for elements that float above the interface like modals</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              Extra Large
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">Extra Large</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-xl</code>
              </div>
              <p className="u-fs-sm u-mt-2">Deep shadow for high elevation elements like dialog boxes</p>
            </div>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-6">
            <div
              className="u-bg-surface u-rounded u-p-8 u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center"
              style={{ boxShadow: 'var(--shadow-2xl)' }}
            >
              2XL
            </div>
            <div className="u-flex-1">
              <div className="u-fw-bold">2XL</div>
              <div className="u-text-secondary u-fs-sm">
                <code>--shadow-2xl</code>
              </div>
              <p className="u-fs-sm u-mt-2">Very deep shadow for maximum elevation, like important notifications</p>
            </div>
          </div>
        </div>

        <h2>Shadow Tokens</h2>
        <p>
          The following CSS variables are available for shadows:
        </p>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Token</th>
                <th className="c-data-table__header-cell">Value</th>
                <th className="c-data-table__header-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-none</code></td>
                <td className="c-data-table__cell"><code>none</code></td>
                <td className="c-data-table__cell">No shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-xs</code></td>
                <td className="c-data-table__cell"><code>0 1px 2px 0 rgba(0, 0, 0, 0.05)</code></td>
                <td className="c-data-table__cell">Extra small shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-sm</code></td>
                <td className="c-data-table__cell"><code>0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)</code></td>
                <td className="c-data-table__cell">Small shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-md</code></td>
                <td className="c-data-table__cell"><code>0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)</code></td>
                <td className="c-data-table__cell">Medium shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-lg</code></td>
                <td className="c-data-table__cell"><code>0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)</code></td>
                <td className="c-data-table__cell">Large shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-xl</code></td>
                <td className="c-data-table__cell"><code>0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)</code></td>
                <td className="c-data-table__cell">Extra large shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-2xl</code></td>
                <td className="c-data-table__cell"><code>0 25px 50px -12px rgba(0, 0, 0, 0.25)</code></td>
                <td className="c-data-table__cell">2XL shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--shadow-inner</code></td>
                <td className="c-data-table__cell"><code>inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)</code></td>
                <td className="c-data-table__cell">Inner shadow</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Shadow Utility Classes</h2>
        <p>
          Atomix provides utility classes for applying shadows directly to elements.
        </p>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Class</th>
                <th className="c-data-table__header-cell">CSS Property</th>
                <th className="c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-none</code></td>
                <td className="c-data-table__cell"><code>box-shadow: none</code></td>
                <td className="c-data-table__cell">No shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-xs</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-xs)</code></td>
                <td className="c-data-table__cell">Extra small shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-sm</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-sm)</code></td>
                <td className="c-data-table__cell">Small shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-md</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-md)</code></td>
                <td className="c-data-table__cell">Medium shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-lg</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-lg)</code></td>
                <td className="c-data-table__cell">Large shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-xl</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-xl)</code></td>
                <td className="c-data-table__cell">Extra large shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-2xl</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-2xl)</code></td>
                <td className="c-data-table__cell">2XL shadow</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-shadow-inner</code></td>
                <td className="c-data-table__cell"><code>box-shadow: var(--shadow-inner)</code></td>
                <td className="c-data-table__cell">Inner shadow</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Usage Examples</h2>
        
        <ComponentDemo
          title="Card with Shadow"
          description="Using shadows to elevate a card component"
          code={`<div className="c-card u-shadow-md u-p-4">
  <h3 className="c-card__title">Card with Medium Shadow</h3>
  <p className="c-card__text">
    This card has a medium shadow applied to give it some elevation.
  </p>
</div>`}
        >
          <div className="c-card u-shadow-md u-p-4">
            <h3 className="c-card__title">Card with Medium Shadow</h3>
            <p className="c-card__text">
              This card has a medium shadow applied to give it some elevation.
            </p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Button with Shadow"
          description="Using shadows to emphasize buttons"
          code={`<div className="u-d-flex u-gap-4">
  <button className="c-btn c-btn--primary u-shadow-sm">
    Primary Button
  </button>
  <button className="c-btn c-btn--primary u-shadow-md">
    Elevated Button
  </button>
  <button className="c-btn c-btn--primary u-shadow-lg">
    More Elevated
  </button>
</div>`}
        >
          <div className="u-d-flex u-gap-4">
            <button className="c-btn c-btn--primary u-shadow-sm">
              Primary Button
            </button>
            <button className="c-btn c-btn--primary u-shadow-md">
              Elevated Button
            </button>
            <button className="c-btn c-btn--primary u-shadow-lg">
              More Elevated
            </button>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Elevation Examples"
          description="Different shadow sizes for establishing visual hierarchy"
          code={`<div className="u-d-flex u-flex-wrap u-gap-6 u-p-6 u-bg-neutral-50">
  <div className="u-bg-white u-rounded u-p-4 u-shadow-sm u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
    Level 1
  </div>
  <div className="u-bg-white u-rounded u-p-4 u-shadow-md u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
    Level 2
  </div>
  <div className="u-bg-white u-rounded u-p-4 u-shadow-lg u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
    Level 3
  </div>
  <div className="u-bg-white u-rounded u-p-4 u-shadow-xl u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
    Level 4
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-wrap u-gap-6 u-p-6 u-bg-neutral-50">
            <div className="u-bg-white u-rounded u-p-4 u-shadow-sm u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
              Level 1
            </div>
            <div className="u-bg-white u-rounded u-p-4 u-shadow-md u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
              Level 2
            </div>
            <div className="u-bg-white u-rounded u-p-4 u-shadow-lg u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
              Level 3
            </div>
            <div className="u-bg-white u-rounded u-p-4 u-shadow-xl u-w-150px u-h-100px u-d-flex u-justify-content-center u-align-items-center">
              Level 4
            </div>
          </div>
        </ComponentDemo>

        <h2>Dark Mode Considerations</h2>
        <p>
          In dark mode, shadows often need to be adjusted to maintain visual hierarchy
          without creating harsh contrasts. Atomix automatically adjusts shadow values
          in dark mode to use more subtle shadow values with lower opacity.
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`/* Dark mode shadow adjustments */
html[data-theme="dark"] {
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.4);
}`}</code>
        </pre>

        <h2>Design Guidelines</h2>
        <h3>When to Use Shadows</h3>
        <ul>
          <li>Use shadows to create visual hierarchy and indicate elevation</li>
          <li>Apply larger shadows to elements that are higher in the visual hierarchy</li>
          <li>Use smaller shadows for subtle differentiation</li>
          <li>Apply shadows consistently across similar components</li>
        </ul>

        <h3>Shadow Best Practices</h3>
        <ul>
          <li>Don't overuse shadows – too many elevated elements can be visually noisy</li>
          <li>Use shadows purposefully to guide users' attention</li>
          <li>Consider the context – shadows appear different on various background colors</li>
          <li>Ensure sufficient contrast between elements with and without shadows</li>
          <li>Combine shadows with slight color changes for more realistic elevation</li>
        </ul>

        <h2>Customizing Shadows</h2>
        <p>
          You can customize the shadow system by overriding the CSS variables:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`:root {
  --shadow-color: 0deg 0% 0%;
  --shadow-elevation-low: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.1),
                          0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.1),
                          1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.1);
  --shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.11),
                             0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.11),
                             2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.11),
                             5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.11);
  --shadow-elevation-high: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.1),
                           1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.1),
                           2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.1),
                           4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.1),
                           7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.1),
                           11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.1),
                           16.9px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.1),
                           25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.1);
}`}</code>
        </pre>

        <p>
          For more information on customizing the shadow system, see the{' '}
          <a href="/getting-started/theming" className="u-text-primary">
            Theming documentation
          </a>.
        </p>
      </div>
    </DocsLayout>
  )
}