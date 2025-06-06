'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function ProgressPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Progress</h1>
        <p>
          Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.
          They communicate how long a process might take and provide visual feedback to keep users informed.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default progress bar with primary color"
          code={`<div className="c-progress">
  <div className="c-progress__bar" style={{ width: '50%' }}></div>
</div>`}
        >
          <div className="c-progress">
            <div className="c-progress__bar" style={{ width: '50%' }}></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Progress Sizes"
          description="Different sizes to fit your layout needs"
          code={`<div className="c-progress c-progress--sm">
  <div className="c-progress__bar" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar" style={{ width: '50%' }}></div>
</div>

<div className="c-progress c-progress--lg">
  <div className="c-progress__bar" style={{ width: '50%' }}></div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-progress c-progress--sm">
              <div className="c-progress__bar" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress c-progress--lg">
              <div className="c-progress__bar" style={{ width: '50%' }}></div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Progress Colors"
          description="Different colors for various contexts"
          code={`<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--primary" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--secondary" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--success" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--warning" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--error" style={{ width: '50%' }}></div>
</div>

<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--info" style={{ width: '50%' }}></div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--primary" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--secondary" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--success" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--warning" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--error" style={{ width: '50%' }}></div>
            </div>
            
            <div className="c-progress">
              <div className="c-progress__bar c-progress__bar--info" style={{ width: '50%' }}></div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Label"
          description="Progress bar with percentage label"
          code={`<div>
  <div className="u-d-flex u-justify-content-between u-mb-2">
    <span>Loading...</span>
    <span>50%</span>
  </div>
  <div className="c-progress">
    <div className="c-progress__bar" style={{ width: '50%' }}></div>
  </div>
</div>`}
        >
          <div>
            <div className="u-d-flex u-justify-content-between u-mb-2">
              <span>Loading...</span>
              <span>50%</span>
            </div>
            <div className="c-progress">
              <div className="c-progress__bar" style={{ width: '50%' }}></div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Striped Progress"
          description="Progress bar with striped pattern"
          code={`<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--striped" style={{ width: '50%' }}></div>
</div>`}
        >
          <div className="c-progress">
            <div className="c-progress__bar c-progress__bar--striped" style={{ width: '50%' }}></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Animated Progress"
          description="Progress bar with animated stripes"
          code={`<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--striped c-progress__bar--animated" style={{ width: '50%' }}></div>
</div>`}
        >
          <div className="c-progress">
            <div className="c-progress__bar c-progress__bar--striped c-progress__bar--animated" style={{ width: '50%' }}></div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Multiple Bars"
          description="Progress bar with multiple segments"
          code={`<div className="c-progress">
  <div className="c-progress__bar c-progress__bar--success" style={{ width: '30%' }}></div>
  <div className="c-progress__bar c-progress__bar--warning" style={{ width: '20%' }}></div>
  <div className="c-progress__bar c-progress__bar--error" style={{ width: '10%' }}></div>
</div>`}
        >
          <div className="c-progress">
            <div className="c-progress__bar c-progress__bar--success" style={{ width: '30%' }}></div>
            <div className="c-progress__bar c-progress__bar--warning" style={{ width: '20%' }}></div>
            <div className="c-progress__bar c-progress__bar--error" style={{ width: '10%' }}></div>
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
                <td className="c-data-table__cell">Current progress value</td>
                <td className="c-data-table__cell"><code>0</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>max</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Maximum progress value</td>
                <td className="c-data-table__cell"><code>100</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">The size of the progress bar</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>color</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'</code></td>
                <td className="c-data-table__cell">The color of the progress bar</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>striped</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show striped pattern</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>animated</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to animate the stripes</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>label</code></td>
                <td className="c-data-table__cell"><code>string | React.ReactNode</code></td>
                <td className="c-data-table__cell">Label to display with the progress bar</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showValue</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show the value as percentage</td>
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
          The Progress component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses <code>role="progressbar"</code> to indicate a progress bar</li>
          <li className="c-list__item">Includes <code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code> attributes</li>
          <li className="c-list__item">Provides <code>aria-label</code> or <code>aria-labelledby</code> for screen readers</li>
          <li className="c-list__item">Maintains sufficient color contrast for visibility</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use progress bars for processes that take more than a second or two to complete</li>
          <li className="c-list__item">Provide clear labels to indicate what the progress bar represents</li>
          <li className="c-list__item">Consider showing the percentage or step count for better user understanding</li>
          <li className="c-list__item">Use appropriate colors to indicate the status or type of process</li>
          <li className="c-list__item">For indeterminate processes, consider using a spinner instead</li>
        </ul>
      </div>
    </DocsLayout>
  )
}