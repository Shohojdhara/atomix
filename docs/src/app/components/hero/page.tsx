'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function HeroPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Hero</h1>
        <p>
          Hero components are large, prominent sections typically used at the top of a page to showcase
          key content, capture attention, and communicate the primary message or purpose of the page.
          They often include compelling visuals, concise text, and call-to-action elements.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default hero with left-aligned content and image"
          code={`<div className="c-hero">
  <div className="c-hero__content">
    <h1 className="c-hero__title">Welcome to Our Platform</h1>
    <p className="c-hero__text">Build modern, responsive interfaces with a clean, consistent design language. Our component library helps you create beautiful user experiences with minimal effort.</p>
    <div className="c-hero__actions">
      <button className="c-btn c-btn--primary">Get Started</button>
      <button className="c-btn c-btn--outline-secondary">Learn More</button>
    </div>
  </div>
</div>`}
        >
          <div className="c-hero">
            <div className="c-hero__content">
              <h1 className="c-hero__title">Welcome to Our Platform</h1>
              <p className="c-hero__text">Build modern, responsive interfaces with a clean, consistent design language. Our component library helps you create beautiful user experiences with minimal effort.</p>
              <div className="c-hero__actions">
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline-secondary">Learn More</button>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Image"
          description="Hero with image and left-aligned content"
          code={`<div className="c-hero">
  <div className="o-container">
    <div className="o-grid">
      <div className="o-grid__col o-grid__col--md-5">
        <div className="c-hero__content">
          <h1 className="c-hero__title">Modern UI Components</h1>
          <p className="c-hero__text">Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.</p>
          <div className="c-hero__actions">
            <button className="c-btn c-btn--primary">Get Started</button>
            <button className="c-btn c-btn--outline-secondary">Learn More</button>
          </div>
        </div>
      </div>
      <div className="o-grid__col o-grid__col--md-7">
        <img src="https://picsum.photos/id/0/712/500" alt="Hero image" className="c-hero__image" />
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-hero">
            <div className="o-container">
              <div className="o-grid">
                <div className="o-grid__col o-grid__col--md-5">
                  <div className="c-hero__content">
                    <h1 className="c-hero__title">Modern UI Components</h1>
                    <p className="c-hero__text">Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.</p>
                    <div className="c-hero__actions">
                      <button className="c-btn c-btn--primary">Get Started</button>
                      <button className="c-btn c-btn--outline-secondary">Learn More</button>
                    </div>
                  </div>
                </div>
                <div className="o-grid__col o-grid__col--md-7">
                  <img src="https://picsum.photos/id/0/712/500" alt="Hero image" className="c-hero__image" />
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Center Aligned"
          description="Hero with center-aligned content"
          code={`<div className="c-hero c-hero--center">
  <div className="c-hero__content">
    <p className="c-hero__subtitle">Atomix Design System</p>
    <h1 className="c-hero__title">Build Faster with Atomix</h1>
    <p className="c-hero__text">Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.</p>
    <div className="c-hero__actions">
      <button className="c-btn c-btn--primary">Get Started</button>
      <button className="c-btn c-btn--outline-secondary">Learn More</button>
    </div>
  </div>
  <div className="c-hero__image-wrapper">
    <img src="https://picsum.photos/id/1/1024/300" alt="Hero image" className="c-hero__image" />
  </div>
</div>`}
        >
          <div className="c-hero c-hero--center">
            <div className="c-hero__content">
              <p className="c-hero__subtitle">Atomix Design System</p>
              <h1 className="c-hero__title">Build Faster with Atomix</h1>
              <p className="c-hero__text">Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.</p>
              <div className="c-hero__actions">
                <button className="c-btn c-btn--primary">Get Started</button>
                <button className="c-btn c-btn--outline-secondary">Learn More</button>
              </div>
            </div>
            <div className="c-hero__image-wrapper">
              <img src="https://picsum.photos/id/1/1024/300" alt="Hero image" className="c-hero__image" />
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Background Image"
          description="Hero with background image and overlay"
          code={`<div className="c-hero c-hero--center">
  <div className="c-hero__bg">
    <img src="https://picsum.photos/id/24/1920/1080" alt="Background" className="c-hero__bg-image" />
    <div className="c-hero__overlay"></div>
  </div>
  <div className="o-container">
    <div className="c-hero__content">
      <h1 className="c-hero__title">Powerful Design System</h1>
      <p className="c-hero__text">Atomix provides a complete design system with powerful, flexible components that follow best practices for accessibility, performance, and user experience.</p>
      <div className="c-hero__actions">
        <button className="c-btn c-btn--primary">Explore Components</button>
        <button className="c-btn c-btn--outline-secondary">View Documentation</button>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-hero c-hero--center">
            <div className="c-hero__bg">
              <img src="https://picsum.photos/id/24/1920/1080" alt="Background" className="c-hero__bg-image" />
              <div className="c-hero__overlay"></div>
            </div>
            <div className="o-container">
              <div className="c-hero__content">
                <h1 className="c-hero__title">Powerful Design System</h1>
                <p className="c-hero__text">Atomix provides a complete design system with powerful, flexible components that follow best practices for accessibility, performance, and user experience.</p>
                <div className="c-hero__actions">
                  <button className="c-btn c-btn--primary">Explore Components</button>
                  <button className="c-btn c-btn--outline-secondary">View Documentation</button>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Right Aligned"
          description="Hero with right-aligned content and image on left"
          code={`<div className="c-hero c-hero--right">
  <div className="o-container">
    <div className="o-grid">
      <div className="o-grid__col o-grid__col--md-7">
        <img src="https://picsum.photos/id/3/712/500" alt="Hero image" className="c-hero__image" />
      </div>
      <div className="o-grid__col o-grid__col--md-5">
        <div className="c-hero__content">
          <h1 className="c-hero__title">Crafted for Developer Experience</h1>
          <p className="c-hero__text">Build modern, responsive interfaces with a clean, consistent design language. Our component library helps you create beautiful user experiences with minimal effort.</p>
          <div className="c-hero__actions">
            <button className="c-btn c-btn--primary">Get Started</button>
            <button className="c-btn c-btn--outline-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-hero c-hero--right">
            <div className="o-container">
              <div className="o-grid">
                <div className="o-grid__col o-grid__col--md-7">
                  <img src="https://picsum.photos/id/3/712/500" alt="Hero image" className="c-hero__image" />
                </div>
                <div className="o-grid__col o-grid__col--md-5">
                  <div className="c-hero__content">
                    <h1 className="c-hero__title">Crafted for Developer Experience</h1>
                    <p className="c-hero__text">Build modern, responsive interfaces with a clean, consistent design language. Our component library helps you create beautiful user experiences with minimal effort.</p>
                    <div className="c-hero__actions">
                      <button className="c-btn c-btn--primary">Get Started</button>
                      <button className="c-btn c-btn--outline-secondary">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2 className="u-mt-8">Props</h2>
        <div className="u-overflow-x-auto">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Name</th>
                <th className="c-data-table__header-cell">Type</th>
                <th className="c-data-table__header-cell">Description</th>
                <th className="c-data-table__header-cell">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>title</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Main heading text for the hero section</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>subtitle</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Secondary text displayed above the title</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>text</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Descriptive text displayed below the title</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>imageSrc</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">URL for the foreground image</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>imageAlt</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Alt text for the foreground image</td>
                <td className="c-data-table__cell"><code>'Hero image'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>alignment</code></td>
                <td className="c-data-table__cell"><code>'left' | 'center' | 'right'</code></td>
                <td className="c-data-table__cell">Alignment of the hero content</td>
                <td className="c-data-table__cell"><code>'left'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>backgroundImageSrc</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">URL for the background image</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showOverlay</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show a semi-transparent overlay over the background image</td>
                <td className="c-data-table__cell"><code>true</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>fullViewportHeight</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the hero should take up the full viewport height</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>actions</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Call-to-action buttons or links</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>imageColSize</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Grid column size for the image (1-12)</td>
                <td className="c-data-table__cell"><code>7</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>contentColSize</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Grid column size for the content (1-12)</td>
                <td className="c-data-table__cell"><code>5</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>contentWidth</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Custom width for the hero content (e.g., '800px', '50%')</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>parallax</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Enable parallax effect on background image</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>parallaxIntensity</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Intensity of the parallax effect (0-1)</td>
                <td className="c-data-table__cell"><code>0.5</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>videoBackground</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">URL for the background video</td>
                <td className="c-data-table__cell">-</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>videoOptions</code></td>
                <td className="c-data-table__cell"><code>object</code></td>
                <td className="c-data-table__cell">Options for the background video (autoplay, loop, muted, posterUrl)</td>
                <td className="c-data-table__cell"><code>{`{ autoplay: true, loop: true, muted: true }`}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DocsLayout>
  )
}