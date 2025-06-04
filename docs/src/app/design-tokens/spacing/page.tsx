'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function SpacingPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Spacing</h1>
        <p>
          The spacing system in Atomix provides consistent measurements for margins, padding, 
          and layout spacing throughout your application. It's based on a 0.25rem (4px) base unit,
          creating a predictable and harmonious visual rhythm.
        </p>

        <h2>Spacing Scale</h2>
        <p>
          Atomix uses a consistent spacing scale with increments based on a 0.25rem (4px) base unit.
          This creates visual harmony and consistency throughout your interface.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((size) => (
            <div key={size} className="u-d-flex u-align-items-center">
              <div className="u-w-100px u-fw-bold">
                {size} ({size * 0.25}rem)
              </div>
              <div className="u-d-flex u-align-items-center u-gap-4">
                <div 
                  className="u-bg-primary" 
                  style={{ 
                    width: `${Math.max(size * 0.25, 0.25)}rem`, 
                    height: '2rem' 
                  }}
                ></div>
                <div className="u-fs-sm u-text-secondary">
                  {size * 4}px
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Token</th>
                <th className="c-data-table__header-cell">rem</th>
                <th className="c-data-table__header-cell">px</th>
                <th className="c-data-table__header-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-0</code></td>
                <td className="c-data-table__cell"><code>0</code></td>
                <td className="c-data-table__cell"><code>0</code></td>
                <td className="c-data-table__cell">No spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-1</code></td>
                <td className="c-data-table__cell"><code>0.25rem</code></td>
                <td className="c-data-table__cell"><code>4px</code></td>
                <td className="c-data-table__cell">Very small spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-2</code></td>
                <td className="c-data-table__cell"><code>0.5rem</code></td>
                <td className="c-data-table__cell"><code>8px</code></td>
                <td className="c-data-table__cell">Small spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-3</code></td>
                <td className="c-data-table__cell"><code>0.75rem</code></td>
                <td className="c-data-table__cell"><code>12px</code></td>
                <td className="c-data-table__cell">Small-medium spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-4</code></td>
                <td className="c-data-table__cell"><code>1rem</code></td>
                <td className="c-data-table__cell"><code>16px</code></td>
                <td className="c-data-table__cell">Base spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-5</code></td>
                <td className="c-data-table__cell"><code>1.25rem</code></td>
                <td className="c-data-table__cell"><code>20px</code></td>
                <td className="c-data-table__cell">Medium spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-6</code></td>
                <td className="c-data-table__cell"><code>1.5rem</code></td>
                <td className="c-data-table__cell"><code>24px</code></td>
                <td className="c-data-table__cell">Medium-large spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-8</code></td>
                <td className="c-data-table__cell"><code>2rem</code></td>
                <td className="c-data-table__cell"><code>32px</code></td>
                <td className="c-data-table__cell">Large spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-10</code></td>
                <td className="c-data-table__cell"><code>2.5rem</code></td>
                <td className="c-data-table__cell"><code>40px</code></td>
                <td className="c-data-table__cell">Large section spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-12</code></td>
                <td className="c-data-table__cell"><code>3rem</code></td>
                <td className="c-data-table__cell"><code>48px</code></td>
                <td className="c-data-table__cell">Component separation</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-16</code></td>
                <td className="c-data-table__cell"><code>4rem</code></td>
                <td className="c-data-table__cell"><code>64px</code></td>
                <td className="c-data-table__cell">Section spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-20</code></td>
                <td className="c-data-table__cell"><code>5rem</code></td>
                <td className="c-data-table__cell"><code>80px</code></td>
                <td className="c-data-table__cell">Large section spacing</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--spacing-24</code></td>
                <td className="c-data-table__cell"><code>6rem</code></td>
                <td className="c-data-table__cell"><code>96px</code></td>
                <td className="c-data-table__cell">Extra large section spacing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Margin and Padding Utilities</h2>
        <p>
          Atomix provides utility classes for applying margin and padding based on the spacing scale.
        </p>

        <ComponentDemo
          title="Margin Example"
          description="Using margin utilities to create space between elements"
          code={`<div className="u-d-flex u-flex-column">
  <div className="u-bg-primary u-p-4 u-text-white">First box</div>
  <div className="u-bg-secondary u-p-4 u-text-white u-mt-4">
    Second box (with margin-top: 1rem)
  </div>
  <div className="u-bg-success u-p-4 u-text-white u-mt-8">
    Third box (with margin-top: 2rem)
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column">
            <div className="u-bg-primary u-p-4 u-text-white">First box</div>
            <div className="u-bg-secondary u-p-4 u-text-white u-mt-4">
              Second box (with margin-top: 1rem)
            </div>
            <div className="u-bg-success u-p-4 u-text-white u-mt-8">
              Third box (with margin-top: 2rem)
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Padding Example"
          description="Using padding utilities to create space within elements"
          code={`<div className="u-d-flex u-gap-4">
  <div className="u-bg-primary u-p-2 u-text-white u-rounded">
    Small padding (0.5rem)
  </div>
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">
    Medium padding (1rem)
  </div>
  <div className="u-bg-success u-p-6 u-text-white u-rounded">
    Large padding (1.5rem)
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-4">
            <div className="u-bg-primary u-p-2 u-text-white u-rounded">
              Small padding (0.5rem)
            </div>
            <div className="u-bg-secondary u-p-4 u-text-white u-rounded">
              Medium padding (1rem)
            </div>
            <div className="u-bg-success u-p-6 u-text-white u-rounded">
              Large padding (1.5rem)
            </div>
          </div>
        </ComponentDemo>

        <h2>Gap Utilities</h2>
        <p>
          The gap utilities control spacing between items in flex and grid layouts.
        </p>

        <ComponentDemo
          title="Gap Example"
          description="Using gap utilities to create space between flex items"
          code={`<div className="u-d-flex u-flex-wrap u-gap-2">
  <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 1</div>
  <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 2</div>
  <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 3</div>
  <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 4</div>
  <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 5</div>
</div>

<div className="u-d-flex u-flex-wrap u-gap-4 u-mt-4">
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 1</div>
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 2</div>
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 3</div>
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 4</div>
  <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 5</div>
</div>

<div className="u-d-flex u-flex-wrap u-gap-8 u-mt-4">
  <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 1</div>
  <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 2</div>
  <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 3</div>
  <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 4</div>
  <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 5</div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-flex-wrap u-gap-2">
              <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 1</div>
              <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 2</div>
              <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 3</div>
              <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 4</div>
              <div className="u-bg-primary u-p-4 u-text-white u-rounded">Item 5</div>
            </div>

            <div className="u-d-flex u-flex-wrap u-gap-4 u-mt-4">
              <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 1</div>
              <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 2</div>
              <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 3</div>
              <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 4</div>
              <div className="u-bg-secondary u-p-4 u-text-white u-rounded">Item 5</div>
            </div>

            <div className="u-d-flex u-flex-wrap u-gap-8 u-mt-4">
              <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 1</div>
              <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 2</div>
              <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 3</div>
              <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 4</div>
              <div className="u-bg-success u-p-4 u-text-white u-rounded">Item 5</div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Margin Utility Classes</h2>
        <p>
          Atomix provides a comprehensive set of margin utility classes based on the spacing scale.
        </p>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Class Pattern</th>
                <th className="c-data-table__header-cell">Property</th>
                <th className="c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-m-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin (all sides)</td>
                <td className="c-data-table__cell"><code>.u-m-4</code> = <code>margin: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-mt-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-top</td>
                <td className="c-data-table__cell"><code>.u-mt-4</code> = <code>margin-top: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-mr-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-right</td>
                <td className="c-data-table__cell"><code>.u-mr-4</code> = <code>margin-right: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-mb-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-bottom</td>
                <td className="c-data-table__cell"><code>.u-mb-4</code> = <code>margin-bottom: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-ml-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-left</td>
                <td className="c-data-table__cell"><code>.u-ml-4</code> = <code>margin-left: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-mx-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-left and margin-right</td>
                <td className="c-data-table__cell"><code>.u-mx-4</code> = <code>margin-left: 1rem; margin-right: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-my-{'{size}'}</code></td>
                <td className="c-data-table__cell">margin-top and margin-bottom</td>
                <td className="c-data-table__cell"><code>.u-my-4</code> = <code>margin-top: 1rem; margin-bottom: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-m-auto</code></td>
                <td className="c-data-table__cell">margin: auto</td>
                <td className="c-data-table__cell">Centers element horizontally and vertically if possible</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-mx-auto</code></td>
                <td className="c-data-table__cell">margin-left: auto; margin-right: auto</td>
                <td className="c-data-table__cell">Centers element horizontally</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-my-auto</code></td>
                <td className="c-data-table__cell">margin-top: auto; margin-bottom: auto</td>
                <td className="c-data-table__cell">Centers element vertically</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Padding Utility Classes</h2>
        <p>
          Atomix provides a comprehensive set of padding utility classes based on the spacing scale.
        </p>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Class Pattern</th>
                <th className="c-data-table__header-cell">Property</th>
                <th className="c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-p-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding (all sides)</td>
                <td className="c-data-table__cell"><code>.u-p-4</code> = <code>padding: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-pt-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-top</td>
                <td className="c-data-table__cell"><code>.u-pt-4</code> = <code>padding-top: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-pr-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-right</td>
                <td className="c-data-table__cell"><code>.u-pr-4</code> = <code>padding-right: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-pb-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-bottom</td>
                <td className="c-data-table__cell"><code>.u-pb-4</code> = <code>padding-bottom: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-pl-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-left</td>
                <td className="c-data-table__cell"><code>.u-pl-4</code> = <code>padding-left: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-px-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-left and padding-right</td>
                <td className="c-data-table__cell"><code>.u-px-4</code> = <code>padding-left: 1rem; padding-right: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-py-{'{size}'}</code></td>
                <td className="c-data-table__cell">padding-top and padding-bottom</td>
                <td className="c-data-table__cell"><code>.u-py-4</code> = <code>padding-top: 1rem; padding-bottom: 1rem</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Gap Utility Classes</h2>
        <p>
          Gap utilities are used to control spacing between items in flex and grid layouts.
        </p>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Class Pattern</th>
                <th className="c-data-table__header-cell">Property</th>
                <th className="c-data-table__header-cell">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-gap-{'{size}'}</code></td>
                <td className="c-data-table__cell">gap (row and column)</td>
                <td className="c-data-table__cell"><code>.u-gap-4</code> = <code>gap: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-row-gap-{'{size}'}</code></td>
                <td className="c-data-table__cell">row-gap</td>
                <td className="c-data-table__cell"><code>.u-row-gap-4</code> = <code>row-gap: 1rem</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>.u-column-gap-{'{size}'}</code></td>
                <td className="c-data-table__cell">column-gap</td>
                <td className="c-data-table__cell"><code>.u-column-gap-4</code> = <code>column-gap: 1rem</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Responsive Spacing</h2>
        <p>
          All spacing utilities work with Atomix's responsive breakpoint prefixes.
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`<!-- Margin that changes at different breakpoints -->
<div class="u-m-2 u-md-m-4 u-lg-m-8">
  <!-- This element has:
    - 0.5rem margin on all sides by default
    - 1rem margin on all sides at md breakpoint and up
    - 2rem margin on all sides at lg breakpoint and up
  -->
</div>

<!-- Padding that changes at different breakpoints -->
<div class="u-p-2 u-md-p-4 u-lg-p-6">
  <!-- This element has:
    - 0.5rem padding on all sides by default
    - 1rem padding on all sides at md breakpoint and up
    - 1.5rem padding on all sides at lg breakpoint and up
  -->
</div>

<!-- Gap that changes at different breakpoints -->
<div class="u-d-flex u-gap-2 u-md-gap-4 u-lg-gap-6">
  <!-- This flex container has:
    - 0.5rem gap by default
    - 1rem gap at md breakpoint and up
    - 1.5rem gap at lg breakpoint and up
  -->
</div>`}</code>
        </pre>

        <h2>Customizing Spacing</h2>
        <p>
          You can customize the spacing system by overriding the CSS variables:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`:root {
  /* Base spacing unit - changing this will affect the entire spacing scale */
  --spacing-base: 0.25rem;
  
  /* These are automatically calculated based on spacing-base */
  --spacing-0: 0;
  --spacing-1: calc(var(--spacing-base) * 1); /* 0.25rem */
  --spacing-2: calc(var(--spacing-base) * 2); /* 0.5rem */
  --spacing-3: calc(var(--spacing-base) * 3); /* 0.75rem */
  --spacing-4: calc(var(--spacing-base) * 4); /* 1rem */
  /* ... and so on */
}`}</code>
        </pre>

        <p>
          For more information on customizing the spacing system, see the{' '}
          <a href="/getting-started/theming" className="u-text-primary">
            Theming documentation
          </a>.
        </p>
      </div>
    </DocsLayout>
  )
}