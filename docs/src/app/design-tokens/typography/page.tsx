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
          Typography is a fundamental element of the Atomix Design System. The typographic scale 
          provides consistent font sizes, weights, and line heights across your application.
        </p>

        <h2>Font Families</h2>
        <p>
          Atomix uses a system font stack by default to ensure optimal performance and 
          native-like appearance across different operating systems.
        </p>

        <ComponentDemo
          title="Base Font Family"
          description="Default font used for body text and general UI elements"
          code={`<p style={{ fontFamily: 'var(--font-family-base)' }}>
  This text uses the base font family.
</p>`}
        >
          <p style={{ fontFamily: 'var(--font-family-base)' }}>
            This text uses the base font family.
          </p>
        </ComponentDemo>

        <ComponentDemo
          title="Heading Font Family"
          description="Font used for headings and titles"
          code={`<h3 style={{ fontFamily: 'var(--font-family-heading)' }}>
  This heading uses the heading font family.
</h3>`}
        >
          <h3 style={{ fontFamily: 'var(--font-family-heading)' }}>
            This heading uses the heading font family.
          </h3>
        </ComponentDemo>

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
                <td className="c-data-table__cell"><code>--font-family-base</code></td>
                <td className="c-data-table__cell"><code>-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif</code></td>
                <td className="c-data-table__cell">Primary font for most text</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-family-heading</code></td>
                <td className="c-data-table__cell"><code>-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif</code></td>
                <td className="c-data-table__cell">Font for headings and titles</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-family-mono</code></td>
                <td className="c-data-table__cell"><code>SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace</code></td>
                <td className="c-data-table__cell">Monospace font for code</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Font Sizes</h2>
        <p>
          Atomix provides a consistent scale of font sizes for use throughout your interface.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">9xl</div>
            <div className="u-fs-9xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">8xl</div>
            <div className="u-fs-8xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">7xl</div>
            <div className="u-fs-7xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">6xl</div>
            <div className="u-fs-6xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">5xl</div>
            <div className="u-fs-5xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">4xl</div>
            <div className="u-fs-4xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">3xl</div>
            <div className="u-fs-3xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">2xl</div>
            <div className="u-fs-2xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">xl</div>
            <div className="u-fs-xl">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">lg</div>
            <div className="u-fs-lg">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">md (base)</div>
            <div className="u-fs-md">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">sm</div>
            <div className="u-fs-sm">The quick brown fox</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">xs</div>
            <div className="u-fs-xs">The quick brown fox</div>
          </div>
        </div>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Token</th>
                <th className="c-data-table__header-cell">Value</th>
                <th className="c-data-table__header-cell">Utility Class</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-xs</code></td>
                <td className="c-data-table__cell"><code>0.75rem</code> (12px)</td>
                <td className="c-data-table__cell"><code>.u-fs-xs</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-sm</code></td>
                <td className="c-data-table__cell"><code>0.875rem</code> (14px)</td>
                <td className="c-data-table__cell"><code>.u-fs-sm</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-md</code></td>
                <td className="c-data-table__cell"><code>1rem</code> (16px)</td>
                <td className="c-data-table__cell"><code>.u-fs-md</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-lg</code></td>
                <td className="c-data-table__cell"><code>1.125rem</code> (18px)</td>
                <td className="c-data-table__cell"><code>.u-fs-lg</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-xl</code></td>
                <td className="c-data-table__cell"><code>1.25rem</code> (20px)</td>
                <td className="c-data-table__cell"><code>.u-fs-xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-2xl</code></td>
                <td className="c-data-table__cell"><code>1.5rem</code> (24px)</td>
                <td className="c-data-table__cell"><code>.u-fs-2xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-3xl</code></td>
                <td className="c-data-table__cell"><code>1.875rem</code> (30px)</td>
                <td className="c-data-table__cell"><code>.u-fs-3xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-4xl</code></td>
                <td className="c-data-table__cell"><code>2.25rem</code> (36px)</td>
                <td className="c-data-table__cell"><code>.u-fs-4xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-5xl</code></td>
                <td className="c-data-table__cell"><code>3rem</code> (48px)</td>
                <td className="c-data-table__cell"><code>.u-fs-5xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-6xl</code></td>
                <td className="c-data-table__cell"><code>3.75rem</code> (60px)</td>
                <td className="c-data-table__cell"><code>.u-fs-6xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-7xl</code></td>
                <td className="c-data-table__cell"><code>4.5rem</code> (72px)</td>
                <td className="c-data-table__cell"><code>.u-fs-7xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-8xl</code></td>
                <td className="c-data-table__cell"><code>6rem</code> (96px)</td>
                <td className="c-data-table__cell"><code>.u-fs-8xl</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-size-9xl</code></td>
                <td className="c-data-table__cell"><code>8rem</code> (128px)</td>
                <td className="c-data-table__cell"><code>.u-fs-9xl</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Font Weights</h2>
        <p>
          Font weights control the thickness of text. Atomix provides a range of weights for different emphasis needs.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">Light</div>
            <div className="u-fs-xl u-fw-light">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">Normal</div>
            <div className="u-fs-xl u-fw-normal">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">Medium</div>
            <div className="u-fs-xl u-fw-medium">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">Bold</div>
            <div className="u-fs-xl u-fw-bold">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-100px u-fw-bold">Black</div>
            <div className="u-fs-xl u-fw-black">The quick brown fox jumps over the lazy dog</div>
          </div>
        </div>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Token</th>
                <th className="c-data-table__header-cell">Value</th>
                <th className="c-data-table__header-cell">Utility Class</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-weight-light</code></td>
                <td className="c-data-table__cell"><code>300</code></td>
                <td className="c-data-table__cell"><code>.u-fw-light</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-weight-normal</code></td>
                <td className="c-data-table__cell"><code>400</code></td>
                <td className="c-data-table__cell"><code>.u-fw-normal</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-weight-medium</code></td>
                <td className="c-data-table__cell"><code>500</code></td>
                <td className="c-data-table__cell"><code>.u-fw-medium</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-weight-bold</code></td>
                <td className="c-data-table__cell"><code>700</code></td>
                <td className="c-data-table__cell"><code>.u-fw-bold</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--font-weight-black</code></td>
                <td className="c-data-table__cell"><code>900</code></td>
                <td className="c-data-table__cell"><code>.u-fw-black</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Line Heights</h2>
        <p>
          Line heights control the vertical spacing between lines of text. Atomix provides a range of line heights for different text densities.
        </p>

        <div className="u-d-flex u-flex-column u-gap-8 u-mb-8">
          <div>
            <div className="u-fw-bold u-mb-2">Tight (1.25)</div>
            <p className="u-fs-lg u-lh-tight u-p-4 u-border">
              The quick brown fox jumps over the lazy dog. This paragraph has a tight line height, 
              which is useful for headings and short blocks of text where you want to minimize 
              vertical space. Notice how the lines are closer together compared to the default line height.
            </p>
          </div>
          <div>
            <div className="u-fw-bold u-mb-2">Normal (1.5)</div>
            <p className="u-fs-lg u-lh-normal u-p-4 u-border">
              The quick brown fox jumps over the lazy dog. This paragraph has the default line 
              height, which provides comfortable reading for body text. It offers a balanced spacing 
              that works well for most content, ensuring good readability while maintaining a compact appearance.
            </p>
          </div>
          <div>
            <div className="u-fw-bold u-mb-2">Relaxed (1.75)</div>
            <p className="u-fs-lg u-lh-relaxed u-p-4 u-border">
              The quick brown fox jumps over the lazy dog. This paragraph has a relaxed line height, 
              which provides more spacing between lines. This can improve readability for longer 
              blocks of text, especially when the reading environment might not be ideal or when 
              you want to create a more spacious, airy feeling.
            </p>
          </div>
          <div>
            <div className="u-fw-bold u-mb-2">Loose (2.0)</div>
            <p className="u-fs-lg u-lh-loose u-p-4 u-border">
              The quick brown fox jumps over the lazy dog. This paragraph has a loose line height, 
              with very generous spacing between lines. This style is useful when maximum readability 
              is needed, such as for educational content, or when you want to create a very open, 
              spacious design aesthetic.
            </p>
          </div>
        </div>

        <div className="u-overflow-x-auto u-my-8">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Token</th>
                <th className="c-data-table__header-cell">Value</th>
                <th className="c-data-table__header-cell">Utility Class</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--line-height-none</code></td>
                <td className="c-data-table__cell"><code>1</code></td>
                <td className="c-data-table__cell"><code>.u-lh-none</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--line-height-tight</code></td>
                <td className="c-data-table__cell"><code>1.25</code></td>
                <td className="c-data-table__cell"><code>.u-lh-tight</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--line-height-normal</code></td>
                <td className="c-data-table__cell"><code>1.5</code></td>
                <td className="c-data-table__cell"><code>.u-lh-normal</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--line-height-relaxed</code></td>
                <td className="c-data-table__cell"><code>1.75</code></td>
                <td className="c-data-table__cell"><code>.u-lh-relaxed</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>--line-height-loose</code></td>
                <td className="c-data-table__cell"><code>2</code></td>
                <td className="c-data-table__cell"><code>.u-lh-loose</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Text Decoration</h2>
        <p>
          Atomix provides utility classes for common text decorations.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Underline</div>
            <div className="u-text-decoration-underline">This text is underlined</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Overline</div>
            <div className="u-text-decoration-overline">This text has an overline</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Line-through</div>
            <div className="u-text-decoration-line-through">This text has a line through it</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">None</div>
            <div className="u-text-decoration-none">This text has no decoration</div>
          </div>
        </div>

        <h2>Letter Spacing</h2>
        <p>
          Letter spacing (tracking) controls the horizontal space between characters.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Tighter (-0.05em)</div>
            <div className="u-ls-tighter u-fs-xl">LETTER SPACING</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Tight (-0.025em)</div>
            <div className="u-ls-tight u-fs-xl">LETTER SPACING</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Normal (0)</div>
            <div className="u-ls-normal u-fs-xl">LETTER SPACING</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Wide (0.025em)</div>
            <div className="u-ls-wide u-fs-xl">LETTER SPACING</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Wider (0.05em)</div>
            <div className="u-ls-wider u-fs-xl">LETTER SPACING</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Widest (0.1em)</div>
            <div className="u-ls-widest u-fs-xl">LETTER SPACING</div>
          </div>
        </div>

        <h2>Text Transform</h2>
        <p>
          Text transform controls capitalization and case of text.
        </p>

        <div className="u-d-flex u-flex-column u-gap-4 u-mb-8">
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Uppercase</div>
            <div className="u-text-uppercase">This text is uppercase</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Lowercase</div>
            <div className="u-text-lowercase">THIS TEXT IS LOWERCASE</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Capitalize</div>
            <div className="u-text-capitalize">this text is capitalized</div>
          </div>
          <div className="u-d-flex u-align-items-center">
            <div className="u-w-150px u-fw-bold">Normal</div>
            <div className="u-text-normal">This text has normal casing</div>
          </div>
        </div>

        <h2>Customizing Typography</h2>
        <p>
          You can customize the typography system by overriding the CSS variables:
        </p>

        <pre className="u-bg-secondary-subtle u-p-4 u-rounded u-fs-sm">
          <code>{`:root {
  /* Font families */
  --font-family-base: 'Roboto', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;
  --font-family-mono: 'Fira Code', monospace;

  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;

  /* Base font size - adjust this to scale the entire type system */
  --font-size-base: 1rem;

  /* Font sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  /* ... and so on */

  /* Line heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;
}`}</code>
        </pre>

        <p>
          For more information on customizing the typography system, see the{' '}
          <a href="/getting-started/theming" className="u-text-primary">
            Theming documentation
          </a>.
        </p>
      </div>
    </DocsLayout>
  )
}