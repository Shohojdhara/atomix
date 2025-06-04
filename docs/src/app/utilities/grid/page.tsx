'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function GridPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Grid System</h1>
        <p>
          The grid system provides a flexible way to create responsive layouts using rows and columns.
          It helps organize content and maintain consistent spacing across different screen sizes.
        </p>

        <ComponentDemo
          title="Basic Grid"
          description="Simple grid with equal-width columns"
          code={`<div className="o-grid">
  <div className="o-grid__col">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 1</div>
  </div>
  <div className="o-grid__col">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 2</div>
  </div>
  <div className="o-grid__col">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 3</div>
  </div>
</div>`}
        >
          <div className="o-grid">
            <div className="o-grid__col">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 1</div>
            </div>
            <div className="o-grid__col">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 2</div>
            </div>
            <div className="o-grid__col">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">Column 3</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Grid with Column Widths"
          description="Grid with specified column widths"
          code={`<div className="o-grid">
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">4 columns</div>
  </div>
  <div className="o-grid__col o-grid__col--8">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">8 columns</div>
  </div>
</div>

<div className="o-grid u-mt-md">
  <div className="o-grid__col o-grid__col--3">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">3 columns</div>
  </div>
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">6 columns</div>
  </div>
  <div className="o-grid__col o-grid__col--3">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">3 columns</div>
  </div>
</div>`}
        >
          <div>
            <div className="o-grid">
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">4 columns</div>
              </div>
              <div className="o-grid__col o-grid__col--8">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">8 columns</div>
              </div>
            </div>

            <div className="o-grid u-mt-md">
              <div className="o-grid__col o-grid__col--3">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">3 columns</div>
              </div>
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">6 columns</div>
              </div>
              <div className="o-grid__col o-grid__col--3">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">3 columns</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Responsive Grid"
          description="Grid with different column widths on different screen sizes"
          code={`<div className="o-grid">
  <div className="o-grid__col o-grid__col--12 o-grid__col--md-6 o-grid__col--lg-4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 6 on medium, 4 on large</div>
  </div>
  <div className="o-grid__col o-grid__col--12 o-grid__col--md-6 o-grid__col--lg-4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 6 on medium, 4 on large</div>
  </div>
  <div className="o-grid__col o-grid__col--12 o-grid__col--md-12 o-grid__col--lg-4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 12 on medium, 4 on large</div>
  </div>
</div>`}
        >
          <div className="o-grid">
            <div className="o-grid__col o-grid__col--12 o-grid__col--md-6 o-grid__col--lg-4">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 6 on medium, 4 on large</div>
            </div>
            <div className="o-grid__col o-grid__col--12 o-grid__col--md-6 o-grid__col--lg-4">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 6 on medium, 4 on large</div>
            </div>
            <div className="o-grid__col o-grid__col--12 o-grid__col--md-12 o-grid__col--lg-4">
              <div className="u-p-md u-bg-primary u-text-white u-rounded">12 cols on small, 12 on medium, 4 on large</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Grid with Gutters"
          description="Grid with different gutter sizes"
          code={`<div className="o-grid o-grid--gutter-sm">
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Small gutter</div>
  </div>
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Small gutter</div>
  </div>
</div>

<div className="o-grid o-grid--gutter-md u-mt-md">
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Medium gutter</div>
  </div>
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Medium gutter</div>
  </div>
</div>

<div className="o-grid o-grid--gutter-lg u-mt-md">
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Large gutter</div>
  </div>
  <div className="o-grid__col o-grid__col--6">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Large gutter</div>
  </div>
</div>`}
        >
          <div>
            <div className="o-grid o-grid--gutter-sm">
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Small gutter</div>
              </div>
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Small gutter</div>
              </div>
            </div>

            <div className="o-grid o-grid--gutter-md u-mt-md">
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Medium gutter</div>
              </div>
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Medium gutter</div>
              </div>
            </div>

            <div className="o-grid o-grid--gutter-lg u-mt-md">
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Large gutter</div>
              </div>
              <div className="o-grid__col o-grid__col--6">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Large gutter</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Grid with Alignment"
          description="Grid with different alignment options"
          code={`<div className="o-grid o-grid--align-start" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Start aligned</div>
  </div>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Start aligned</div>
  </div>
</div>

<div className="o-grid o-grid--align-center u-mt-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Center aligned</div>
  </div>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">Center aligned</div>
  </div>
</div>

<div className="o-grid o-grid--align-end u-mt-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">End aligned</div>
  </div>
  <div className="o-grid__col o-grid__col--4">
    <div className="u-p-md u-bg-primary u-text-white u-rounded">End aligned</div>
  </div>
</div>`}
        >
          <div>
            <div className="o-grid o-grid--align-start" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Start aligned</div>
              </div>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Start aligned</div>
              </div>
            </div>

            <div className="o-grid o-grid--align-center u-mt-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Center aligned</div>
              </div>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">Center aligned</div>
              </div>
            </div>

            <div className="o-grid o-grid--align-end u-mt-md" style={{ height: '150px', backgroundColor: '#f0f0f0' }}>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">End aligned</div>
              </div>
              <div className="o-grid__col o-grid__col--4">
                <div className="u-p-md u-bg-primary u-text-white u-rounded">End aligned</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Grid Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid</code></td>
              <td className="c-data-table__cell">Container for the grid system</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col</code></td>
              <td className="c-data-table__cell">Grid column (equal width by default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col--{'{1-12}'}</code></td>
              <td className="c-data-table__cell">Column width (1-12 columns)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col--sm-{'{1-12}'}</code></td>
              <td className="c-data-table__cell">Column width on small screens and up</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col--md-{'{1-12}'}</code></td>
              <td className="c-data-table__cell">Column width on medium screens and up</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col--lg-{'{1-12}'}</code></td>
              <td className="c-data-table__cell">Column width on large screens and up</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid__col--xl-{'{1-12}'}</code></td>
              <td className="c-data-table__cell">Column width on extra large screens and up</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--gutter-none</code></td>
              <td className="c-data-table__cell">Remove gutters between columns</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--gutter-sm</code></td>
              <td className="c-data-table__cell">Small gutters between columns</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--gutter-md</code></td>
              <td className="c-data-table__cell">Medium gutters between columns (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--gutter-lg</code></td>
              <td className="c-data-table__cell">Large gutters between columns</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--align-start</code></td>
              <td className="c-data-table__cell">Align columns to the top</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--align-center</code></td>
              <td className="c-data-table__cell">Align columns to the center</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--align-end</code></td>
              <td className="c-data-table__cell">Align columns to the bottom</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--justify-start</code></td>
              <td className="c-data-table__cell">Justify columns to the start</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--justify-center</code></td>
              <td className="c-data-table__cell">Justify columns to the center</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--justify-end</code></td>
              <td className="c-data-table__cell">Justify columns to the end</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--justify-between</code></td>
              <td className="c-data-table__cell">Justify columns with space between</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>o-grid--justify-around</code></td>
              <td className="c-data-table__cell">Justify columns with space around</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}