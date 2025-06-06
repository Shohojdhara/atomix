'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function StepsPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Steps</h1>
        <p>
          The Steps component displays a sequence of steps in a process, helping users understand 
          their progress through multi-step flows like onboarding, checkout, or form completion.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default steps component with numbered steps"
          code={`<div className="c-steps">
  <div className="c-steps__item c-steps__item--completed">
    <div className="c-steps__indicator">1</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Account Setup</div>
      <div className="c-steps__description">Create your account</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--active">
    <div className="c-steps__indicator">2</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Personal Information</div>
      <div className="c-steps__description">Fill in your details</div>
    </div>
  </div>
  <div className="c-steps__item">
    <div className="c-steps__indicator">3</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Confirmation</div>
      <div className="c-steps__description">Verify your information</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-steps">
            <div className="c-steps__item c-steps__item--completed">
              <div className="c-steps__indicator">1</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Account Setup</div>
                <div className="c-steps__description">Create your account</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--active">
              <div className="c-steps__indicator">2</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Personal Information</div>
                <div className="c-steps__description">Fill in your details</div>
              </div>
            </div>
            <div className="c-steps__item">
              <div className="c-steps__indicator">3</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Confirmation</div>
                <div className="c-steps__description">Verify your information</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Vertical Steps"
          description="Steps displayed in a vertical layout"
          code={`<div className="c-steps c-steps--vertical">
  <div className="c-steps__item c-steps__item--completed">
    <div className="c-steps__indicator">1</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Account Setup</div>
      <div className="c-steps__description">Create your account</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--active">
    <div className="c-steps__indicator">2</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Personal Information</div>
      <div className="c-steps__description">Fill in your details</div>
    </div>
  </div>
  <div className="c-steps__item">
    <div className="c-steps__indicator">3</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Confirmation</div>
      <div className="c-steps__description">Verify your information</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-steps c-steps--vertical">
            <div className="c-steps__item c-steps__item--completed">
              <div className="c-steps__indicator">1</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Account Setup</div>
                <div className="c-steps__description">Create your account</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--active">
              <div className="c-steps__indicator">2</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Personal Information</div>
                <div className="c-steps__description">Fill in your details</div>
              </div>
            </div>
            <div className="c-steps__item">
              <div className="c-steps__indicator">3</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Confirmation</div>
                <div className="c-steps__description">Verify your information</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Steps with Icons"
          description="Steps using icons instead of numbers"
          code={`<div className="c-steps">
  <div className="c-steps__item c-steps__item--completed">
    <div className="c-steps__indicator">
      <i className="fas fa-user"></i>
    </div>
    <div className="c-steps__content">
      <div className="c-steps__title">Account Setup</div>
      <div className="c-steps__description">Create your account</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--active">
    <div className="c-steps__indicator">
      <i className="fas fa-info"></i>
    </div>
    <div className="c-steps__content">
      <div className="c-steps__title">Personal Information</div>
      <div className="c-steps__description">Fill in your details</div>
    </div>
  </div>
  <div className="c-steps__item">
    <div className="c-steps__indicator">
      <i className="fas fa-check"></i>
    </div>
    <div className="c-steps__content">
      <div className="c-steps__title">Confirmation</div>
      <div className="c-steps__description">Verify your information</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-steps">
            <div className="c-steps__item c-steps__item--completed">
              <div className="c-steps__indicator">
                <i className="fas fa-user"></i>
              </div>
              <div className="c-steps__content">
                <div className="c-steps__title">Account Setup</div>
                <div className="c-steps__description">Create your account</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--active">
              <div className="c-steps__indicator">
                <i className="fas fa-info"></i>
              </div>
              <div className="c-steps__content">
                <div className="c-steps__title">Personal Information</div>
                <div className="c-steps__description">Fill in your details</div>
              </div>
            </div>
            <div className="c-steps__item">
              <div className="c-steps__indicator">
                <i className="fas fa-check"></i>
              </div>
              <div className="c-steps__content">
                <div className="c-steps__title">Confirmation</div>
                <div className="c-steps__description">Verify your information</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Steps with Custom Colors"
          description="Steps with different color themes"
          code={`<div className="c-steps">
  <div className="c-steps__item c-steps__item--completed c-steps__item--success">
    <div className="c-steps__indicator">1</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Account Setup</div>
      <div className="c-steps__description">Create your account</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--active c-steps__item--primary">
    <div className="c-steps__indicator">2</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Personal Information</div>
      <div className="c-steps__description">Fill in your details</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--secondary">
    <div className="c-steps__indicator">3</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Confirmation</div>
      <div className="c-steps__description">Verify your information</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-steps">
            <div className="c-steps__item c-steps__item--completed c-steps__item--success">
              <div className="c-steps__indicator">1</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Account Setup</div>
                <div className="c-steps__description">Create your account</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--active c-steps__item--primary">
              <div className="c-steps__indicator">2</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Personal Information</div>
                <div className="c-steps__description">Fill in your details</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--secondary">
              <div className="c-steps__indicator">3</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Confirmation</div>
                <div className="c-steps__description">Verify your information</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Clickable Steps"
          description="Steps that can be clicked to navigate between steps"
          code={`<div className="c-steps">
  <div className="c-steps__item c-steps__item--completed c-steps__item--clickable">
    <div className="c-steps__indicator">1</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Account Setup</div>
      <div className="c-steps__description">Create your account</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--active c-steps__item--clickable">
    <div className="c-steps__indicator">2</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Personal Information</div>
      <div className="c-steps__description">Fill in your details</div>
    </div>
  </div>
  <div className="c-steps__item c-steps__item--clickable">
    <div className="c-steps__indicator">3</div>
    <div className="c-steps__content">
      <div className="c-steps__title">Confirmation</div>
      <div className="c-steps__description">Verify your information</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-steps">
            <div className="c-steps__item c-steps__item--completed c-steps__item--clickable">
              <div className="c-steps__indicator">1</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Account Setup</div>
                <div className="c-steps__description">Create your account</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--active c-steps__item--clickable">
              <div className="c-steps__indicator">2</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Personal Information</div>
                <div className="c-steps__description">Fill in your details</div>
              </div>
            </div>
            <div className="c-steps__item c-steps__item--clickable">
              <div className="c-steps__indicator">3</div>
              <div className="c-steps__content">
                <div className="c-steps__title">Confirmation</div>
                <div className="c-steps__description">Verify your information</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Compact Steps"
          description="A more compact version of steps for limited space"
          code={`<div className="c-steps c-steps--compact">
  <div className="c-steps__item c-steps__item--completed">
    <div className="c-steps__indicator">1</div>
  </div>
  <div className="c-steps__item c-steps__item--active">
    <div className="c-steps__indicator">2</div>
  </div>
  <div className="c-steps__item">
    <div className="c-steps__indicator">3</div>
  </div>
</div>`}
        >
          <div className="c-steps c-steps--compact">
            <div className="c-steps__item c-steps__item--completed">
              <div className="c-steps__indicator">1</div>
            </div>
            <div className="c-steps__item c-steps__item--active">
              <div className="c-steps__indicator">2</div>
            </div>
            <div className="c-steps__item">
              <div className="c-steps__indicator">3</div>
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
                <td className="c-data-table__cell"><code>current</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Current step index (0-based)</td>
                <td className="c-data-table__cell"><code>0</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>steps</code></td>
                <td className="c-data-table__cell"><code>array</code></td>
                <td className="c-data-table__cell">Array of step objects with title and description</td>
                <td className="c-data-table__cell"><code>[]</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>direction</code></td>
                <td className="c-data-table__cell"><code>'horizontal' | 'vertical'</code></td>
                <td className="c-data-table__cell">Direction of the steps</td>
                <td className="c-data-table__cell"><code>'horizontal'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'compact' | 'default'</code></td>
                <td className="c-data-table__cell">Size of the steps</td>
                <td className="c-data-table__cell"><code>'default'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(current: number) => void</code></td>
                <td className="c-data-table__cell">Callback when step is changed</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>clickable</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether steps can be clicked to navigate</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>color</code></td>
                <td className="c-data-table__cell"><code>'primary' | 'secondary' | 'success' | 'warning' | 'danger'</code></td>
                <td className="c-data-table__cell">Color theme for the steps</td>
                <td className="c-data-table__cell"><code>'primary'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>icons</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode[]</code></td>
                <td className="c-data-table__cell">Custom icons for each step</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Steps component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses appropriate ARIA roles and attributes</li>
          <li className="c-list__item">Supports keyboard navigation for clickable steps</li>
          <li className="c-list__item">Provides visual indicators for current and completed steps</li>
          <li className="c-list__item">Maintains sufficient color contrast for visibility</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use steps to break down complex processes into manageable parts</li>
          <li className="c-list__item">Keep step titles concise and descriptive</li>
          <li className="c-list__item">Use the vertical layout for mobile or when you have many steps</li>
          <li className="c-list__item">Consider using icons that represent each step's purpose</li>
          <li className="c-list__item">Limit the number of steps to avoid overwhelming users</li>
          <li className="c-list__item">Make steps clickable when users need to revisit previous steps</li>
        </ul>
      </div>
    </DocsLayout>
  )
}