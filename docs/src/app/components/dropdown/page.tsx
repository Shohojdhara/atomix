'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function DropdownPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Dropdown</h1>
        <p>
          Dropdowns are interactive components that display a list of options when triggered.
          They are commonly used for navigation, selection menus, and action menus.
        </p>

        <ComponentDemo
          title="Basic Dropdown"
          description="Simple dropdown menu with a button trigger"
          code={`<div className="c-dropdown">
  <button className="c-btn c-dropdown__toggle">
    Dropdown
    <span className="u-ml-xs">▼</span>
  </button>
  <div className="c-dropdown__menu">
    <a href="#" className="c-dropdown__item">Action</a>
    <a href="#" className="c-dropdown__item">Another action</a>
    <a href="#" className="c-dropdown__item">Something else</a>
    <div className="c-dropdown__divider"></div>
    <a href="#" className="c-dropdown__item">Separated link</a>
  </div>
</div>`}
        >
          <div className="c-dropdown">
            <button className="c-btn c-dropdown__toggle">
              Dropdown
              <span className="u-ml-xs">▼</span>
            </button>
            <div className="c-dropdown__menu">
              <a href="#" className="c-dropdown__item">Action</a>
              <a href="#" className="c-dropdown__item">Another action</a>
              <a href="#" className="c-dropdown__item">Something else</a>
              <div className="c-dropdown__divider"></div>
              <a href="#" className="c-dropdown__item">Separated link</a>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dropdown with Different Button Styles"
          description="Dropdowns with various button styles"
          code={`<div className="u-d-flex u-gap-md">
  <div className="c-dropdown">
    <button className="c-btn c-btn--primary c-dropdown__toggle">
      Primary
      <span className="u-ml-xs">▼</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
      <a href="#" className="c-dropdown__item">Something else</a>
    </div>
  </div>
  
  <div className="c-dropdown">
    <button className="c-btn c-btn--secondary c-dropdown__toggle">
      Secondary
      <span className="u-ml-xs">▼</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
      <a href="#" className="c-dropdown__item">Something else</a>
    </div>
  </div>
  
  <div className="c-dropdown">
    <button className="c-btn c-btn--success c-dropdown__toggle">
      Success
      <span className="u-ml-xs">▼</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
      <a href="#" className="c-dropdown__item">Something else</a>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <div className="c-dropdown">
              <button className="c-btn c-btn--primary c-dropdown__toggle">
                Primary
                <span className="u-ml-xs">▼</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
                <a href="#" className="c-dropdown__item">Something else</a>
              </div>
            </div>
            
            <div className="c-dropdown">
              <button className="c-btn c-btn--secondary c-dropdown__toggle">
                Secondary
                <span className="u-ml-xs">▼</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
                <a href="#" className="c-dropdown__item">Something else</a>
              </div>
            </div>
            
            <div className="c-dropdown">
              <button className="c-btn c-btn--success c-dropdown__toggle">
                Success
                <span className="u-ml-xs">▼</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
                <a href="#" className="c-dropdown__item">Something else</a>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dropdown with Header"
          description="Dropdown menu with a header"
          code={`<div className="c-dropdown">
  <button className="c-btn c-dropdown__toggle">
    Dropdown with Header
    <span className="u-ml-xs">▼</span>
  </button>
  <div className="c-dropdown__menu">
    <h6 className="c-dropdown__header">Dropdown Header</h6>
    <a href="#" className="c-dropdown__item">Action</a>
    <a href="#" className="c-dropdown__item">Another action</a>
    <div className="c-dropdown__divider"></div>
    <h6 className="c-dropdown__header">Another Header</h6>
    <a href="#" className="c-dropdown__item">Something else</a>
    <a href="#" className="c-dropdown__item">Separated link</a>
  </div>
</div>`}
        >
          <div className="c-dropdown">
            <button className="c-btn c-dropdown__toggle">
              Dropdown with Header
              <span className="u-ml-xs">▼</span>
            </button>
            <div className="c-dropdown__menu">
              <h6 className="c-dropdown__header">Dropdown Header</h6>
              <a href="#" className="c-dropdown__item">Action</a>
              <a href="#" className="c-dropdown__item">Another action</a>
              <div className="c-dropdown__divider"></div>
              <h6 className="c-dropdown__header">Another Header</h6>
              <a href="#" className="c-dropdown__item">Something else</a>
              <a href="#" className="c-dropdown__item">Separated link</a>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dropdown with Active and Disabled Items"
          description="Dropdown menu with active and disabled items"
          code={`<div className="c-dropdown">
  <button className="c-btn c-dropdown__toggle">
    Dropdown with States
    <span className="u-ml-xs">▼</span>
  </button>
  <div className="c-dropdown__menu">
    <a href="#" className="c-dropdown__item">Regular link</a>
    <a href="#" className="c-dropdown__item is-active">Active link</a>
    <a href="#" className="c-dropdown__item is-disabled">Disabled link</a>
    <div className="c-dropdown__divider"></div>
    <a href="#" className="c-dropdown__item">Separated link</a>
  </div>
</div>`}
        >
          <div className="c-dropdown">
            <button className="c-btn c-dropdown__toggle">
              Dropdown with States
              <span className="u-ml-xs">▼</span>
            </button>
            <div className="c-dropdown__menu">
              <a href="#" className="c-dropdown__item">Regular link</a>
              <a href="#" className="c-dropdown__item is-active">Active link</a>
              <a href="#" className="c-dropdown__item is-disabled">Disabled link</a>
              <div className="c-dropdown__divider"></div>
              <a href="#" className="c-dropdown__item">Separated link</a>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dropdown Directions"
          description="Dropdowns with different opening directions"
          code={`<div className="u-d-flex u-gap-md">
  <div className="c-dropdown">
    <button className="c-btn c-dropdown__toggle">
      Dropdown
      <span className="u-ml-xs">▼</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
    </div>
  </div>
  
  <div className="c-dropdown c-dropdown--up">
    <button className="c-btn c-dropdown__toggle">
      Dropup
      <span className="u-ml-xs">▲</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
    </div>
  </div>
  
  <div className="c-dropdown c-dropdown--right">
    <button className="c-btn c-dropdown__toggle">
      Dropright
      <span className="u-ml-xs">▶</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
    </div>
  </div>
  
  <div className="c-dropdown c-dropdown--left">
    <button className="c-btn c-dropdown__toggle">
      Dropleft
      <span className="u-ml-xs">◀</span>
    </button>
    <div className="c-dropdown__menu">
      <a href="#" className="c-dropdown__item">Action</a>
      <a href="#" className="c-dropdown__item">Another action</a>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <div className="c-dropdown">
              <button className="c-btn c-dropdown__toggle">
                Dropdown
                <span className="u-ml-xs">▼</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
              </div>
            </div>
            
            <div className="c-dropdown c-dropdown--up">
              <button className="c-btn c-dropdown__toggle">
                Dropup
                <span className="u-ml-xs">▲</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
              </div>
            </div>
            
            <div className="c-dropdown c-dropdown--right">
              <button className="c-btn c-dropdown__toggle">
                Dropright
                <span className="u-ml-xs">▶</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
              </div>
            </div>
            
            <div className="c-dropdown c-dropdown--left">
              <button className="c-btn c-dropdown__toggle">
                Dropleft
                <span className="u-ml-xs">◀</span>
              </button>
              <div className="c-dropdown__menu">
                <a href="#" className="c-dropdown__item">Action</a>
                <a href="#" className="c-dropdown__item">Another action</a>
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
              <td className="c-data-table__cell"><code>c-dropdown</code></td>
              <td className="c-data-table__cell">Main container for the dropdown component</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown__toggle</code></td>
              <td className="c-data-table__cell">The button or link that triggers the dropdown</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown__menu</code></td>
              <td className="c-data-table__cell">Container for dropdown menu items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown__item</code></td>
              <td className="c-data-table__cell">Individual dropdown menu item</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown__header</code></td>
              <td className="c-data-table__cell">Header text within dropdown menu</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown__divider</code></td>
              <td className="c-data-table__cell">Horizontal divider between dropdown items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown--up</code></td>
              <td className="c-data-table__cell">Makes dropdown menu appear above the toggle</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown--right</code></td>
              <td className="c-data-table__cell">Makes dropdown menu appear to the right of the toggle</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-dropdown--left</code></td>
              <td className="c-data-table__cell">Makes dropdown menu appear to the left of the toggle</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-active</code></td>
              <td className="c-data-table__cell">State class for active dropdown items</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-disabled</code></td>
              <td className="c-data-table__cell">State class for disabled dropdown items</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}