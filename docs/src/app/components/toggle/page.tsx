'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TogglePage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Toggle</h1>
        <p>
          Toggle switches are used for binary choices, allowing users to turn an option on or off. 
          They provide immediate feedback and are commonly used for settings or preferences.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default toggle switch"
          code={`<label className="c-toggle">
  <input type="checkbox" className="c-toggle__input" />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Toggle switch</span>
</label>`}
        >
          <label className="c-toggle">
            <input type="checkbox" className="c-toggle__input" />
            <span className="c-toggle__track">
              <span className="c-toggle__thumb"></span>
            </span>
            <span className="c-toggle__label">Toggle switch</span>
          </label>
        </ComponentDemo>

        <ComponentDemo
          title="Toggle Sizes"
          description="Different sizes to fit your layout needs"
          code={`<label className="c-toggle c-toggle--sm">
  <input type="checkbox" className="c-toggle__input" />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Small</span>
</label>

<label className="c-toggle">
  <input type="checkbox" className="c-toggle__input" />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Default</span>
</label>

<label className="c-toggle c-toggle--lg">
  <input type="checkbox" className="c-toggle__input" />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Large</span>
</label>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <label className="c-toggle c-toggle--sm">
              <input type="checkbox" className="c-toggle__input" />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Small</span>
            </label>
            
            <label className="c-toggle">
              <input type="checkbox" className="c-toggle__input" />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Default</span>
            </label>
            
            <label className="c-toggle c-toggle--lg">
              <input type="checkbox" className="c-toggle__input" />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Large</span>
            </label>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Toggle Colors"
          description="Different colors for various contexts"
          code={`<label className="c-toggle c-toggle--primary">
  <input type="checkbox" className="c-toggle__input" checked />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Primary</span>
</label>

<label className="c-toggle c-toggle--success">
  <input type="checkbox" className="c-toggle__input" checked />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Success</span>
</label>

<label className="c-toggle c-toggle--warning">
  <input type="checkbox" className="c-toggle__input" checked />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Warning</span>
</label>

<label className="c-toggle c-toggle--error">
  <input type="checkbox" className="c-toggle__input" checked />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Error</span>
</label>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <label className="c-toggle c-toggle--primary">
              <input type="checkbox" className="c-toggle__input" defaultChecked />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Primary</span>
            </label>
            
            <label className="c-toggle c-toggle--success">
              <input type="checkbox" className="c-toggle__input" defaultChecked />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Success</span>
            </label>
            
            <label className="c-toggle c-toggle--warning">
              <input type="checkbox" className="c-toggle__input" defaultChecked />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Warning</span>
            </label>
            
            <label className="c-toggle c-toggle--error">
              <input type="checkbox" className="c-toggle__input" defaultChecked />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Error</span>
            </label>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Disabled State"
          description="Toggle switches in disabled state"
          code={`<label className="c-toggle">
  <input type="checkbox" className="c-toggle__input" disabled />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Disabled (Off)</span>
</label>

<label className="c-toggle">
  <input type="checkbox" className="c-toggle__input" checked disabled />
  <span className="c-toggle__track">
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Disabled (On)</span>
</label>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <label className="c-toggle">
              <input type="checkbox" className="c-toggle__input" disabled />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Disabled (Off)</span>
            </label>
            
            <label className="c-toggle">
              <input type="checkbox" className="c-toggle__input" defaultChecked disabled />
              <span className="c-toggle__track">
                <span className="c-toggle__thumb"></span>
              </span>
              <span className="c-toggle__label">Disabled (On)</span>
            </label>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Icons"
          description="Toggle switches with icons for better visual cues"
          code={`<label className="c-toggle">
  <input type="checkbox" className="c-toggle__input" />
  <span className="c-toggle__track">
    <span className="c-toggle__icon c-toggle__icon--off">✕</span>
    <span className="c-toggle__icon c-toggle__icon--on">✓</span>
    <span className="c-toggle__thumb"></span>
  </span>
  <span className="c-toggle__label">Toggle with icons</span>
</label>`}
        >
          <label className="c-toggle">
            <input type="checkbox" className="c-toggle__input" />
            <span className="c-toggle__track">
              <span className="c-toggle__icon c-toggle__icon--off">✕</span>
              <span className="c-toggle__icon c-toggle__icon--on">✓</span>
              <span className="c-toggle__thumb"></span>
            </span>
            <span className="c-toggle__label">Toggle with icons</span>
          </label>
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
                <td className="c-data-table__cell"><code>checked</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the toggle is checked</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>defaultChecked</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Default checked state (uncontrolled)</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(checked: boolean) => void</code></td>
                <td className="c-data-table__cell">Callback when the toggle state changes</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>disabled</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the toggle is disabled</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">The size of the toggle</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>color</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'success' | 'warning' | 'error'</code></td>
                <td className="c-data-table__cell">The color of the toggle</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>label</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Label for the toggle</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>name</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Name attribute for the input</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>id</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">ID attribute for the input</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
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
          The Toggle component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses native checkbox input for keyboard navigation and screen reader support</li>
          <li className="c-list__item">Includes proper labeling for screen readers</li>
          <li className="c-list__item">Maintains sufficient color contrast for visibility</li>
          <li className="c-list__item">Supports keyboard interaction (Space key to toggle)</li>
          <li className="c-list__item">Provides visual feedback for focus state</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use toggle switches for binary choices with immediate effect</li>
          <li className="c-list__item">Provide clear and concise labels that describe the effect of the toggle</li>
          <li className="c-list__item">Use appropriate colors to indicate the state (on/off)</li>
          <li className="c-list__item">Consider using icons to enhance visual understanding</li>
          <li className="c-list__item">Group related toggles together for better organization</li>
        </ul>
      </div>
    </DocsLayout>
  )
}