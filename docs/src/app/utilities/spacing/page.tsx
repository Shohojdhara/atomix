'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function SpacingUtilitiesPage() {
  return (
    <DocsLayout>
      <div className="prose">
        <h1>Spacing Utilities</h1>
        <p>
          Atomix provides a comprehensive set of spacing utilities for controlling margin, padding, 
          and gap properties. These utilities follow a consistent naming convention and support 
          responsive breakpoints for adaptive layouts.
        </p>

        <section>
          <h2>Spacing Scale</h2>
          <p>Our spacing system uses a consistent scale based on rem units:</p>
          
          <table className="props-c-data-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Value</th>
                <th>Pixels (16px base)</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>xs</code></td>
                <td><code>0.25rem</code></td>
                <td>4px</td>
                <td>Tight spacing, small gaps</td>
              </tr>
              <tr>
                <td><code>sm</code></td>
                <td><code>0.5rem</code></td>
                <td>8px</td>
                <td>Small spacing between related elements</td>
              </tr>
              <tr>
                <td><code>md</code></td>
                <td><code>1rem</code></td>
                <td>16px</td>
                <td>Standard spacing for most use cases</td>
              </tr>
              <tr>
                <td><code>lg</code></td>
                <td><code>1.5rem</code></td>
                <td>24px</td>
                <td>Larger spacing between sections</td>
              </tr>
              <tr>
                <td><code>xl</code></td>
                <td><code>2rem</code></td>
                <td>32px</td>
                <td>Major section spacing</td>
              </tr>
              <tr>
                <td><code>2xl</code></td>
                <td><code>3rem</code></td>
                <td>48px</td>
                <td>Large section breaks</td>
              </tr>
              <tr>
                <td><code>3xl</code></td>
                <td><code>4rem</code></td>
                <td>64px</td>
                <td>Major layout spacing</td>
              </tr>
            </tbody>
          </table>
        </section>

        <ComponentDemo
          title="Margin Utilities"
          description="Control margin on all sides or specific directions"
          code={`<!-- All sides -->
<div className="u-m-md">Margin on all sides</div>

<!-- Specific sides -->
<div className="u-mt-lg">Margin top large</div>
<div className="u-mr-sm">Margin right small</div>
<div className="u-mb-xl">Margin bottom extra large</div>
<div className="u-ml-xs">Margin left extra small</div>

<!-- Horizontal and vertical -->
<div className="u-mx-md">Horizontal margin</div>
<div className="u-my-lg">Vertical margin</div>`}
        >
          <div className="u-space-y-sm">
            <div className="u-bg-secondary u-p-sm u-text-center">
              <div className="u-bg-primary u-m-md u-p-sm">u-m-md</div>
            </div>
            <div className="u-bg-secondary u-p-sm u-text-center">
              <div className="u-bg-primary u-mt-lg u-p-sm">u-mt-lg</div>
            </div>
            <div className="u-bg-secondary u-p-sm u-text-center">
              <div className="u-bg-primary u-mx-md u-p-sm">u-mx-md</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Padding Utilities"
          description="Control padding on all sides or specific directions"
          code={`<!-- All sides -->
<div className="u-p-md">Padding on all sides</div>

<!-- Specific sides -->
<div className="u-pt-lg">Padding top large</div>
<div className="u-pr-sm">Padding right small</div>
<div className="u-pb-xl">Padding bottom extra large</div>
<div className="u-pl-xs">Padding left extra small</div>

<!-- Horizontal and vertical -->
<div className="u-px-md">Horizontal padding</div>
<div className="u-py-lg">Vertical padding</div>`}
        >
          <div className="u-space-y-sm">
            <div className="u-bg-secondary u-p-md u-text-center">u-p-md</div>
            <div className="u-bg-secondary u-pt-lg u-pb-sm u-px-sm u-text-center">u-pt-lg</div>
            <div className="u-bg-secondary u-px-md u-py-sm u-text-center">u-px-md</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Gap Utilities"
          description="Control gap between flex and grid items"
          code={`<!-- Flex gap -->
<div className="u-d-flex u-gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Grid gap -->
<div className="u-grid u-o-grid-cols-3 u-gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Row and column gap -->
<div className="u-grid u-o-grid-cols-2 u-row-gap-lg u-column-gap-sm">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>`}
        >
          <div className="u-space-y-lg">
            <div className="u-d-flex u-gap-md">
              <div className="u-bg-secondary u-p-sm u-rounded">Item 1</div>
              <div className="u-bg-secondary u-p-sm u-rounded">Item 2</div>
              <div className="u-bg-secondary u-p-sm u-rounded">Item 3</div>
            </div>
            
            <div className="u-grid u-o-grid-cols-3 u-gap-lg">
              <div className="u-bg-secondary u-p-sm u-rounded u-text-center">Item 1</div>
              <div className="u-bg-secondary u-p-sm u-rounded u-text-center">Item 2</div>
              <div className="u-bg-secondary u-p-sm u-rounded u-text-center">Item 3</div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Negative Margins"
          description="Use negative margins to overlap or pull elements"
          code={`<!-- Negative margin -->
<div className="u-m-lg u-bg-secondary u-p-md">
  <div className="u-mt-n-md u-bg-primary u-p-sm">
    Negative top margin
  </div>
</div>`}
        >
          <div className="u-m-lg u-bg-secondary u-p-md u-rounded">
            <div className="u-mt-n-md u-bg-primary u-p-sm u-rounded">
              Negative top margin
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Auto Margins"
          description="Use auto margins for centering and alignment"
          code={`<!-- Center horizontally -->
<div className="u-mx-auto u-w-48">Centered content</div>

<!-- Push to right -->
<div className="u-ml-auto u-w-48">Right aligned</div>

<!-- Push to left -->
<div className="u-mr-auto u-w-48">Left aligned</div>`}
        >
          <div className="u-space-y-sm">
            <div className="u-bg-secondary u-p-sm">
              <div className="u-mx-auto u-w-48 u-bg-primary u-p-sm u-text-center u-rounded">
                Centered
              </div>
            </div>
            <div className="u-bg-secondary u-p-sm">
              <div className="u-ml-auto u-w-48 u-bg-primary u-p-sm u-text-center u-rounded">
                Right aligned
              </div>
            </div>
          </div>
        </ComponentDemo>

        <section>
          <h2>Class Reference</h2>
          
          <h3>Margin Classes</h3>
          <table className="props-c-data-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>u-m-{`{size}`}</code></td>
                <td>Margin on all sides</td>
                <td><code>u-m-md</code></td>
              </tr>
              <tr>
                <td><code>u-mt-{`{size}`}</code></td>
                <td>Margin top</td>
                <td><code>u-mt-lg</code></td>
              </tr>
              <tr>
                <td><code>u-mr-{`{size}`}</code></td>
                <td>Margin right</td>
                <td><code>u-mr-sm</code></td>
              </tr>
              <tr>
                <td><code>u-mb-{`{size}`}</code></td>
                <td>Margin bottom</td>
                <td><code>u-mb-xl</code></td>
              </tr>
              <tr>
                <td><code>u-ml-{`{size}`}</code></td>
                <td>Margin left</td>
                <td><code>u-ml-xs</code></td>
              </tr>
              <tr>
                <td><code>u-mx-{`{size}`}</code></td>
                <td>Horizontal margin (left + right)</td>
                <td><code>u-mx-auto</code></td>
              </tr>
              <tr>
                <td><code>u-my-{`{size}`}</code></td>
                <td>Vertical margin (top + bottom)</td>
                <td><code>u-my-lg</code></td>
              </tr>
            </tbody>
          </table>

          <h3>Padding Classes</h3>
          <table className="props-c-data-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>u-p-{`{size}`}</code></td>
                <td>Padding on all sides</td>
                <td><code>u-p-md</code></td>
              </tr>
              <tr>
                <td><code>u-pt-{`{size}`}</code></td>
                <td>Padding top</td>
                <td><code>u-pt-lg</code></td>
              </tr>
              <tr>
                <td><code>u-pr-{`{size}`}</code></td>
                <td>Padding right</td>
                <td><code>u-pr-sm</code></td>
              </tr>
              <tr>
                <td><code>u-pb-{`{size}`}</code></td>
                <td>Padding bottom</td>
                <td><code>u-pb-xl</code></td>
              </tr>
              <tr>
                <td><code>u-pl-{`{size}`}</code></td>
                <td>Padding left</td>
                <td><code>u-pl-xs</code></td>
              </tr>
              <tr>
                <td><code>u-px-{`{size}`}</code></td>
                <td>Horizontal padding (left + right)</td>
                <td><code>u-px-md</code></td>
              </tr>
              <tr>
                <td><code>u-py-{`{size}`}</code></td>
                <td>Vertical padding (top + bottom)</td>
                <td><code>u-py-lg</code></td>
              </tr>
            </tbody>
          </table>

          <h3>Gap Classes</h3>
          <table className="props-c-data-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>u-gap-{`{size}`}</code></td>
                <td>Gap between flex/grid items</td>
                <td><code>u-gap-md</code></td>
              </tr>
              <tr>
                <td><code>u-row-gap-{`{size}`}</code></td>
                <td>Row gap between grid items</td>
                <td><code>u-row-gap-lg</code></td>
              </tr>
              <tr>
                <td><code>u-column-gap-{`{size}`}</code></td>
                <td>Column gap between grid items</td>
                <td><code>u-column-gap-sm</code></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Responsive Spacing</h2>
          <p>
            All spacing utilities support responsive breakpoints. Add breakpoint prefixes 
            to apply spacing at specific screen sizes:
          </p>
          
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`<!-- Responsive margin -->
<div className="u-m-sm md:u-m-md lg:u-m-lg">
  Responsive margins
</div>

<!-- Responsive padding -->
<div className="u-p-xs sm:u-p-sm md:u-p-md lg:u-p-lg">
  Responsive padding
</div>

<!-- Responsive gap -->
<div className="u-d-flex u-gap-sm md:u-gap-md lg:u-gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}</code>
          </pre>
        </section>

        <section>
          <h2>Best Practices</h2>
          
          <h3>Consistency</h3>
          <ul>
            <li>Use the spacing scale consistently throughout your application</li>
            <li>Prefer standard sizes (xs, sm, md, lg, xl) over custom values</li>
            <li>Maintain visual rhythm with consistent spacing patterns</li>
          </ul>

          <h3>Semantic Spacing</h3>
          <ul>
            <li>Use smaller spacing (xs, sm) for related elements</li>
            <li>Use medium spacing (md, lg) for component sections</li>
            <li>Use larger spacing (xl, 2xl, 3xl) for major layout divisions</li>
          </ul>

          <h3>Performance</h3>
          <ul>
            <li>Utility classes are optimized and tree-shaken in production</li>
            <li>Prefer utilities over custom CSS for spacing</li>
            <li>Use responsive utilities to reduce CSS complexity</li>
          </ul>
        </section>

        <section>
          <h2>Integration with Components</h2>
          <p>
            Spacing utilities work seamlessly with Atomix components:
          </p>
          
          <pre className="u-bg-secondary u-p-md u-rounded">
<code>{`import { Button, Card } from '@atomix/react'

function MyComponent() {
  return (
    <div className="u-space-y-lg">
      <Card className="u-p-lg">
        <h2 className="u-mb-md">Card Title</h2>
        <p className="u-mb-lg">Card content with spacing utilities</p>
        <div className="u-d-flex u-gap-sm">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </Card>
    </div>
  )
}`}</code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  )
}