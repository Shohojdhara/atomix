'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function RatingPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Rating</h1>
        <p>
          Rating components allow users to view or provide feedback using a visual scale. 
          They are commonly used for product reviews, feedback forms, and content ratings.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default rating display with 5 stars"
          code={`<div className="c-rating">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>`}
        >
          <div className="c-rating">
            <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
              <span className="c-rating__star">★</span>
              <span className="c-rating__star">★</span>
              <span className="c-rating__star">★</span>
              <span className="c-rating__star">★</span>
              <span className="c-rating__star">★</span>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Rating Sizes"
          description="Different sizes to fit your layout needs"
          code={`<div className="c-rating c-rating--sm">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>

<div className="c-rating">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>

<div className="c-rating c-rating--lg">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-rating c-rating--sm">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            
            <div className="c-rating">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            
            <div className="c-rating c-rating--lg">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Rating Colors"
          description="Different colors for various contexts"
          code={`<div className="c-rating c-rating--primary">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>

<div className="c-rating c-rating--secondary">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>

<div className="c-rating c-rating--success">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>

<div className="c-rating c-rating--warning">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
    <span className="c-rating__star">★</span>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-rating c-rating--primary">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            
            <div className="c-rating c-rating--secondary">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            
            <div className="c-rating c-rating--success">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            
            <div className="c-rating c-rating--warning">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Interactive Rating"
          description="Rating component that allows user input"
          code={`<div className="c-rating c-rating--interactive">
  <div className="c-rating__stars">
    <input type="radio" id="rating-5" name="rating" value="5" className="c-rating__input" />
    <label htmlFor="rating-5" className="c-rating__label">★</label>
    
    <input type="radio" id="rating-4" name="rating" value="4" className="c-rating__input" />
    <label htmlFor="rating-4" className="c-rating__label">★</label>
    
    <input type="radio" id="rating-3" name="rating" value="3" className="c-rating__input" />
    <label htmlFor="rating-3" className="c-rating__label">★</label>
    
    <input type="radio" id="rating-2" name="rating" value="2" className="c-rating__input" />
    <label htmlFor="rating-2" className="c-rating__label">★</label>
    
    <input type="radio" id="rating-1" name="rating" value="1" className="c-rating__input" />
    <label htmlFor="rating-1" className="c-rating__label">★</label>
  </div>
</div>`}
        >
          <div className="c-rating c-rating--interactive">
            <div className="c-rating__stars">
              <input type="radio" id="rating-5" name="rating" value="5" className="c-rating__input" />
              <label htmlFor="rating-5" className="c-rating__label">★</label>
              
              <input type="radio" id="rating-4" name="rating" value="4" className="c-rating__input" />
              <label htmlFor="rating-4" className="c-rating__label">★</label>
              
              <input type="radio" id="rating-3" name="rating" value="3" className="c-rating__input" />
              <label htmlFor="rating-3" className="c-rating__label">★</label>
              
              <input type="radio" id="rating-2" name="rating" value="2" className="c-rating__input" />
              <label htmlFor="rating-2" className="c-rating__label">★</label>
              
              <input type="radio" id="rating-1" name="rating" value="1" className="c-rating__input" />
              <label htmlFor="rating-1" className="c-rating__label">★</label>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Value Display"
          description="Rating with numerical value display"
          code={`<div className="u-d-flex u-align-items-center u-gap-3">
  <div className="c-rating">
    <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
      <span className="c-rating__star">★</span>
      <span className="c-rating__star">★</span>
      <span className="c-rating__star">★</span>
      <span className="c-rating__star">★</span>
      <span className="c-rating__star">★</span>
    </div>
  </div>
  <span className="c-rating__value">3.5/5</span>
</div>`}
        >
          <div className="u-d-flex u-align-items-center u-gap-3">
            <div className="c-rating">
              <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
                <span className="c-rating__star">★</span>
              </div>
            </div>
            <span className="c-rating__value">3.5/5</span>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Custom Icons"
          description="Rating with custom icons instead of stars"
          code={`<div className="c-rating">
  <div className="c-rating__stars" style={{ '--rating': 3.5 }}>
    <span className="c-rating__star">♥</span>
    <span className="c-rating__star">♥</span>
    <span className="c-rating__star">♥</span>
    <span className="c-rating__star">♥</span>
    <span className="c-rating__star">♥</span>
  </div>
</div>`}
        >
          <div className="c-rating">
            <div className="c-rating__stars" style={{ '--rating': 3.5 } as React.CSSProperties}>
              <span className="c-rating__star">♥</span>
              <span className="c-rating__star">♥</span>
              <span className="c-rating__star">♥</span>
              <span className="c-rating__star">♥</span>
              <span className="c-rating__star">♥</span>
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
                <td className="c-data-table__cell"><code>value</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Current rating value</td>
                <td className="c-data-table__cell"><code>0</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>max</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Maximum rating value</td>
                <td className="c-data-table__cell"><code>5</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>precision</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">The precision for the rating value</td>
                <td className="c-data-table__cell"><code>0.5</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">The size of the rating</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>color</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'secondary' | 'success' | 'warning'</code></td>
                <td className="c-data-table__cell">The color of the rating</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>icon</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Custom icon to use instead of stars</td>
                <td className="c-data-table__cell"><code>'★'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>interactive</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the rating is interactive</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(value: number) => void</code></td>
                <td className="c-data-table__cell">Callback when the rating changes</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>readOnly</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the rating is read-only</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showValue</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show the numerical value</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Rating component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses proper ARIA attributes for interactive ratings</li>
          <li className="c-list__item">Supports keyboard navigation for interactive ratings</li>
          <li className="c-list__item">Provides appropriate labels for screen readers</li>
          <li className="c-list__item">Maintains sufficient color contrast for visibility</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use ratings to collect user feedback or display product/content ratings</li>
          <li className="c-list__item">Consider showing the numerical value alongside the visual rating</li>
          <li className="c-list__item">Use appropriate colors and sizes based on the context</li>
          <li className="c-list__item">For interactive ratings, provide clear instructions on how to rate</li>
          <li className="c-list__item">Consider using half-star precision for more accurate ratings</li>
        </ul>
      </div>
    </DocsLayout>
  )
}