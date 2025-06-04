'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TypographyPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Typography</h1>
        <p>
          Typography utilities help you control text appearance, alignment, weight, and other text-related styles.
          These utilities make it easy to maintain consistent typography throughout your application.
        </p>

        <ComponentDemo
          title="Headings"
          description="Standard heading styles from h1 to h6"
          code={`<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`}
        >
          <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Sizes"
          description="Control text size with utility classes"
          code={`<p className="u-text-xs">Extra small text</p>
<p className="u-text-sm">Small text</p>
<p className="u-text-md">Medium text (default)</p>
<p className="u-text-lg">Large text</p>
<p className="u-text-xl">Extra large text</p>
<p className="u-text-2xl">2X large text</p>
<p className="u-text-3xl">3X large text</p>`}
        >
          <div>
            <p className="u-text-xs">Extra small text</p>
            <p className="u-text-sm">Small text</p>
            <p className="u-text-md">Medium text (default)</p>
            <p className="u-text-lg">Large text</p>
            <p className="u-text-xl">Extra large text</p>
            <p className="u-text-2xl">2X large text</p>
            <p className="u-text-3xl">3X large text</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Alignment"
          description="Control text alignment with utility classes"
          code={`<p className="u-text-left">Left aligned text</p>
<p className="u-text-center">Center aligned text</p>
<p className="u-text-right">Right aligned text</p>
<p className="u-text-justify">Justified text that spans multiple lines. This text is longer to demonstrate how justified text works when it wraps to multiple lines.</p>`}
        >
          <div>
            <p className="u-text-left">Left aligned text</p>
            <p className="u-text-center">Center aligned text</p>
            <p className="u-text-right">Right aligned text</p>
            <p className="u-text-justify">Justified text that spans multiple lines. This text is longer to demonstrate how justified text works when it wraps to multiple lines.</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Weight"
          description="Control text weight with utility classes"
          code={`<p className="u-text-light">Light text weight (300)</p>
<p className="u-text-normal">Normal text weight (400)</p>
<p className="u-text-medium">Medium text weight (500)</p>
<p className="u-text-semibold">Semibold text weight (600)</p>
<p className="u-text-bold">Bold text weight (700)</p>`}
        >
          <div>
            <p className="u-text-light">Light text weight (300)</p>
            <p className="u-text-normal">Normal text weight (400)</p>
            <p className="u-text-medium">Medium text weight (500)</p>
            <p className="u-text-semibold">Semibold text weight (600)</p>
            <p className="u-text-bold">Bold text weight (700)</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Style"
          description="Control text style with utility classes"
          code={`<p className="u-text-italic">Italic text</p>
<p className="u-text-underline">Underlined text</p>
<p className="u-text-line-through">Line-through text</p>
<p className="u-text-uppercase">Uppercase text</p>
<p className="u-text-lowercase">Lowercase Text</p>
<p className="u-text-capitalize">capitalized text</p>`}
        >
          <div>
            <p className="u-text-italic">Italic text</p>
            <p className="u-text-underline">Underlined text</p>
            <p className="u-text-line-through">Line-through text</p>
            <p className="u-text-uppercase">Uppercase text</p>
            <p className="u-text-lowercase">Lowercase Text</p>
            <p className="u-text-capitalize">capitalized text</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Colors"
          description="Control text color with utility classes"
          code={`<p className="u-text-primary">Primary text color</p>
<p className="u-text-secondary">Secondary text color</p>
<p className="u-text-success">Success text color</p>
<p className="u-text-danger">Danger text color</p>
<p className="u-text-warning">Warning text color</p>
<p className="u-text-info">Info text color</p>
<p className="u-text-light">Light text color</p>
<p className="u-text-dark">Dark text color</p>
<p className="u-text-muted">Muted text color</p>`}
        >
          <div>
            <p className="u-text-primary">Primary text color</p>
            <p className="u-text-secondary">Secondary text color</p>
            <p className="u-text-success">Success text color</p>
            <p className="u-text-danger">Danger text color</p>
            <p className="u-text-warning">Warning text color</p>
            <p className="u-text-info">Info text color</p>
            <p className="u-text-light">Light text color</p>
            <p className="u-text-dark">Dark text color</p>
            <p className="u-text-muted">Muted text color</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Line Height"
          description="Control line height with utility classes"
          code={`<p className="u-line-height-tight">This text has tight line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
<p className="u-line-height-normal">This text has normal line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
<p className="u-line-height-loose">This text has loose line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>`}
        >
          <div>
            <p className="u-line-height-tight">This text has tight line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            <p className="u-line-height-normal">This text has normal line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            <p className="u-line-height-loose">This text has loose line height. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Text Truncation"
          description="Truncate text with ellipsis when it overflows"
          code={`<div style={{ width: '200px' }}>
  <p className="u-text-truncate">This text is too long and will be truncated with an ellipsis when it overflows its container.</p>
</div>`}
        >
          <div style={{ width: '200px' }}>
            <p className="u-text-truncate">This text is too long and will be truncated with an ellipsis when it overflows its container.</p>
          </div>
        </ComponentDemo>

        <h2>Typography Utility Classes</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-xs</code></td>
              <td className="c-data-table__cell">Extra small text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-sm</code></td>
              <td className="c-data-table__cell">Small text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-md</code></td>
              <td className="c-data-table__cell">Medium text size (default)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-lg</code></td>
              <td className="c-data-table__cell">Large text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-xl</code></td>
              <td className="c-data-table__cell">Extra large text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-2xl</code></td>
              <td className="c-data-table__cell">2X large text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-3xl</code></td>
              <td className="c-data-table__cell">3X large text size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-left</code></td>
              <td className="c-data-table__cell">Left-aligned text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-center</code></td>
              <td className="c-data-table__cell">Center-aligned text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-right</code></td>
              <td className="c-data-table__cell">Right-aligned text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-justify</code></td>
              <td className="c-data-table__cell">Justified text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-light</code></td>
              <td className="c-data-table__cell">Light font weight (300)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-normal</code></td>
              <td className="c-data-table__cell">Normal font weight (400)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-medium</code></td>
              <td className="c-data-table__cell">Medium font weight (500)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-semibold</code></td>
              <td className="c-data-table__cell">Semibold font weight (600)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-bold</code></td>
              <td className="c-data-table__cell">Bold font weight (700)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-italic</code></td>
              <td className="c-data-table__cell">Italic text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-underline</code></td>
              <td className="c-data-table__cell">Underlined text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-line-through</code></td>
              <td className="c-data-table__cell">Line-through text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-uppercase</code></td>
              <td className="c-data-table__cell">Uppercase text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-lowercase</code></td>
              <td className="c-data-table__cell">Lowercase text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-capitalize</code></td>
              <td className="c-data-table__cell">Capitalized text</td>
            </tr>
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
              <td className="c-data-table__cell"><code>u-text-muted</code></td>
              <td className="c-data-table__cell">Muted text color</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-line-height-tight</code></td>
              <td className="c-data-table__cell">Tight line height</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-line-height-normal</code></td>
              <td className="c-data-table__cell">Normal line height</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-line-height-loose</code></td>
              <td className="c-data-table__cell">Loose line height</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>u-text-truncate</code></td>
              <td className="c-data-table__cell">Truncate text with ellipsis</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}