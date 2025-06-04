'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function AccordionPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Accordion</h1>
        <p>
          Accordions are interactive components that allow users to expand and collapse content sections,
          helping to organize and present information in a compact and accessible way.
        </p>

        <ComponentDemo
          title="Basic Accordion"
          description="Simple accordion with multiple items"
          code={`<div className="c-accordion">
  <div className="c-accordion__item">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Accordion Item 1</span>
      <span className="c-accordion__icon">+</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This is the content for the first accordion item. It can contain any HTML content.</p>
      </div>
    </div>
  </div>
  
  <div className="c-accordion__item is-active">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Accordion Item 2</span>
      <span className="c-accordion__icon">-</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This is the content for the second accordion item. It's expanded by default.</p>
      </div>
    </div>
  </div>
  
  <div className="c-accordion__item">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Accordion Item 3</span>
      <span className="c-accordion__icon">+</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This is the content for the third accordion item.</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-accordion">
            <div className="c-accordion__item">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Accordion Item 1</span>
                <span className="c-accordion__icon">+</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This is the content for the first accordion item. It can contain any HTML content.</p>
                </div>
              </div>
            </div>
            
            <div className="c-accordion__item is-active">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Accordion Item 2</span>
                <span className="c-accordion__icon">-</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This is the content for the second accordion item. It's expanded by default.</p>
                </div>
              </div>
            </div>
            
            <div className="c-accordion__item">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Accordion Item 3</span>
                <span className="c-accordion__icon">+</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This is the content for the third accordion item.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Flush Accordion"
          description="Accordion without borders or background"
          code={`<div className="c-accordion c-accordion--flush">
  <div className="c-accordion__item">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Flush Item 1</span>
      <span className="c-accordion__icon">+</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This is a flush accordion item without borders.</p>
      </div>
    </div>
  </div>
  
  <div className="c-accordion__item">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Flush Item 2</span>
      <span className="c-accordion__icon">+</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This is another flush accordion item.</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-accordion c-accordion--flush">
            <div className="c-accordion__item">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Flush Item 1</span>
                <span className="c-accordion__icon">+</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This is a flush accordion item without borders.</p>
                </div>
              </div>
            </div>
            
            <div className="c-accordion__item">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Flush Item 2</span>
                <span className="c-accordion__icon">+</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This is another flush accordion item.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Accordion with Custom Icons"
          description="Accordion with custom icons for expanded and collapsed states"
          code={`<div className="c-accordion">
  <div className="c-accordion__item">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Custom Icon Item 1</span>
      <span className="c-accordion__icon">⬇️</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This accordion uses custom icons for the toggle state.</p>
      </div>
    </div>
  </div>
  
  <div className="c-accordion__item is-active">
    <button className="c-accordion__header">
      <span className="c-accordion__title">Custom Icon Item 2</span>
      <span className="c-accordion__icon">⬆️</span>
    </button>
    <div className="c-accordion__content">
      <div className="c-accordion__body">
        <p>This item is expanded and shows a different icon.</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-accordion">
            <div className="c-accordion__item">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Custom Icon Item 1</span>
                <span className="c-accordion__icon">⬇️</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This accordion uses custom icons for the toggle state.</p>
                </div>
              </div>
            </div>
            
            <div className="c-accordion__item is-active">
              <button className="c-accordion__header">
                <span className="c-accordion__title">Custom Icon Item 2</span>
                <span className="c-accordion__icon">⬆️</span>
              </button>
              <div className="c-accordion__content">
                <div className="c-accordion__body">
                  <p>This item is expanded and shows a different icon.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Props</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion</code></td>
              <td className="c-data-table__cell">Main container for the accordion component</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion--flush</code></td>
              <td className="c-data-table__cell">Removes borders and background from the accordion</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__item</code></td>
              <td className="c-data-table__cell">Container for each accordion item</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__header</code></td>
              <td className="c-data-table__cell">The clickable header/trigger for each accordion item</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__title</code></td>
              <td className="c-data-table__cell">The title text for each accordion item</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__icon</code></td>
              <td className="c-data-table__cell">Icon element for the expand/collapse indicator</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__content</code></td>
              <td className="c-data-table__cell">Container for the collapsible content</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-accordion__body</code></td>
              <td className="c-data-table__cell">Inner container for the accordion content</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-active</code></td>
              <td className="c-data-table__cell">State class to indicate an expanded accordion item</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}