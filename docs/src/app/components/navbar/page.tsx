'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function NavbarPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Navbar</h1>
        <p>
          The Navbar component provides a responsive navigation header that includes support for branding, navigation links, 
          and other interactive elements. It's a fundamental UI component for creating consistent navigation across your application.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Simple navbar with brand and navigation links"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">Atomix</a>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Pricing</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">Atomix</a>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Pricing</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">About</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar with Toggle Button"
          description="Responsive navbar with toggle button for mobile view"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">Atomix</a>
    <button className="c-navbar__toggle" aria-label="Toggle navigation">
      <span className="c-navbar__toggle-icon"></span>
    </button>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Pricing</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">Atomix</a>
              <button className="c-navbar__toggle" aria-label="Toggle navigation">
                <span className="c-navbar__toggle-icon"></span>
              </button>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Pricing</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">About</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar with Brand Logo"
          description="Navbar with a logo image in the brand area"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">
      <img src="/logo-placeholder.svg" alt="Brand Logo" width="30" height="30" className="u-mr-2" />
      Atomix
    </a>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Pricing</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">
                <i className="fas fa-atom u-mr-2"></i>
                Atomix
              </a>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Pricing</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">About</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar with Search Form"
          description="Navbar with an integrated search form"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">Atomix</a>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Pricing</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">About</a>
        </li>
      </ul>
      <form className="c-navbar__form">
        <div className="c-form-group u-mb-0">
          <div className="c-input-group">
            <input type="search" className="c-form-input" placeholder="Search..." aria-label="Search" />
            <button className="c-button c-button--primary" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">Atomix</a>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Pricing</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">About</a>
                  </li>
                </ul>
                <form className="c-navbar__form">
                  <div className="c-form-group u-mb-0">
                    <div className="c-input-group">
                      <input type="search" className="c-form-input" placeholder="Search..." aria-label="Search" />
                      <button className="c-button c-button--primary" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar with Dropdown"
          description="Navbar with dropdown menu for additional navigation options"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">Atomix</a>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item c-dropdown">
          <a href="#" className="c-navbar__link c-dropdown__toggle" id="navbarDropdown" aria-haspopup="true" aria-expanded="false">
            Products <i className="fas fa-chevron-down u-ml-1"></i>
          </a>
          <div className="c-dropdown__menu" aria-labelledby="navbarDropdown">
            <a href="#" className="c-dropdown__item">Product 1</a>
            <a href="#" className="c-dropdown__item">Product 2</a>
            <div className="c-dropdown__divider"></div>
            <a href="#" className="c-dropdown__item">New Releases</a>
          </div>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">Atomix</a>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item c-dropdown">
                    <a href="#" className="c-navbar__link c-dropdown__toggle" id="navbarDropdown" aria-haspopup="true" aria-expanded="false">
                      Products <i className="fas fa-chevron-down u-ml-1"></i>
                    </a>
                    <div className="c-dropdown__menu" aria-labelledby="navbarDropdown">
                      <a href="#" className="c-dropdown__item">Product 1</a>
                      <a href="#" className="c-dropdown__item">Product 2</a>
                      <div className="c-dropdown__divider"></div>
                      <a href="#" className="c-dropdown__item">New Releases</a>
                    </div>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">About</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar with Right-Aligned Items"
          description="Navbar with items aligned to the right side"
          code={`<nav className="c-navbar">
  <div className="c-navbar__container">
    <a href="#" className="c-navbar__brand">Atomix</a>
    <div className="c-navbar__collapse">
      <ul className="c-navbar__nav">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Features</a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">Pricing</a>
        </li>
      </ul>
      <ul className="c-navbar__nav c-navbar__nav--right">
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">
            <i className="fas fa-bell"></i>
          </a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">
            <i className="fas fa-cog"></i>
          </a>
        </li>
        <li className="c-navbar__item">
          <a href="#" className="c-navbar__link">
            <i className="fas fa-user"></i> Account
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
        >
          <nav className="c-navbar">
            <div className="c-navbar__container">
              <a href="#" className="c-navbar__brand">Atomix</a>
              <div className="c-navbar__collapse">
                <ul className="c-navbar__nav">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Features</a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">Pricing</a>
                  </li>
                </ul>
                <ul className="c-navbar__nav c-navbar__nav--right">
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">
                      <i className="fas fa-bell"></i>
                    </a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">
                      <i className="fas fa-cog"></i>
                    </a>
                  </li>
                  <li className="c-navbar__item">
                    <a href="#" className="c-navbar__link">
                      <i className="fas fa-user"></i> Account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Navbar Variants"
          description="Different color variants for the navbar"
          code={`<div className="u-d-flex u-flex-column u-gap-4">
  <nav className="c-navbar c-navbar--primary">
    <div className="c-navbar__container">
      <a href="#" className="c-navbar__brand">Primary Navbar</a>
      <div className="c-navbar__collapse">
        <ul className="c-navbar__nav">
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">Features</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <nav className="c-navbar c-navbar--secondary">
    <div className="c-navbar__container">
      <a href="#" className="c-navbar__brand">Secondary Navbar</a>
      <div className="c-navbar__collapse">
        <ul className="c-navbar__nav">
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">Features</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <nav className="c-navbar c-navbar--dark">
    <div className="c-navbar__container">
      <a href="#" className="c-navbar__brand">Dark Navbar</a>
      <div className="c-navbar__collapse">
        <ul className="c-navbar__nav">
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">Features</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <nav className="c-navbar c-navbar--light">
    <div className="c-navbar__container">
      <a href="#" className="c-navbar__brand">Light Navbar</a>
      <div className="c-navbar__collapse">
        <ul className="c-navbar__nav">
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">Features</a>
          </li>
          <li className="c-navbar__item">
            <a href="#" className="c-navbar__link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <nav className="c-navbar c-navbar--primary">
              <div className="c-navbar__container">
                <a href="#" className="c-navbar__brand">Primary Navbar</a>
                <div className="c-navbar__collapse">
                  <ul className="c-navbar__nav">
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">Features</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <nav className="c-navbar c-navbar--secondary">
              <div className="c-navbar__container">
                <a href="#" className="c-navbar__brand">Secondary Navbar</a>
                <div className="c-navbar__collapse">
                  <ul className="c-navbar__nav">
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">Features</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <nav className="c-navbar c-navbar--dark">
              <div className="c-navbar__container">
                <a href="#" className="c-navbar__brand">Dark Navbar</a>
                <div className="c-navbar__collapse">
                  <ul className="c-navbar__nav">
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">Features</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <nav className="c-navbar c-navbar--light">
              <div className="c-navbar__container">
                <a href="#" className="c-navbar__brand">Light Navbar</a>
                <div className="c-navbar__collapse">
                  <ul className="c-navbar__nav">
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link c-navbar__link--active">Home</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">Features</a>
                    </li>
                    <li className="c-navbar__item">
                      <a href="#" className="c-navbar__link">About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
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
                <td className="c-data-table__cell"><code>brand</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Brand content (text or logo)</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>brandHref</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">URL for the brand link</td>
                <td className="c-data-table__cell"><code>'#'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Content of the navbar</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>variant</code></td>
                <td className="c-data-table__cell"><code>'default' | 'primary' | 'secondary' | 'dark' | 'light'</code></td>
                <td className="c-data-table__cell">Color variant of the navbar</td>
                <td className="c-data-table__cell"><code>'default'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>expanded</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the mobile menu is expanded</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onToggle</code></td>
                <td className="c-data-table__cell"><code>() => void</code></td>
                <td className="c-data-table__cell">Callback when toggle button is clicked</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>fixed</code></td>
                <td className="c-data-table__cell"><code>'top' | 'bottom' | undefined</code></td>
                <td className="c-data-table__cell">Fix the navbar to top or bottom of viewport</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>container</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to wrap content in a container</td>
                <td className="c-data-table__cell"><code>true</code></td>
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

        <h3 className="u-mt-6">NavbarNav Props</h3>
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
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Content of the navbar navigation</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>alignment</code></td>
                <td className="c-data-table__cell"><code>'left' | 'center' | 'right'</code></td>
                <td className="c-data-table__cell">Horizontal alignment of the navigation items</td>
                <td className="c-data-table__cell"><code>'left'</code></td>
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

        <h3 className="u-mt-6">NavbarItem Props</h3>
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
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Content of the navbar item</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>active</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the item is active</td>
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
          The Navbar component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses semantic <code>&lt;nav&gt;</code> element for proper structure</li>
          <li className="c-list__item">Includes appropriate ARIA attributes for toggle button and expandable content</li>
          <li className="c-list__item">Provides keyboard navigation support for all interactive elements</li>
          <li className="c-list__item">Ensures proper focus management for dropdown menus</li>
          <li className="c-list__item">Uses <code>aria-current="page"</code> for the active navigation item</li>
          <li className="c-list__item">Maintains sufficient color contrast for all variants</li>
          <li className="c-list__item">Supports screen readers with appropriate labeling</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Keep the navbar simple and focused on the most important navigation items</li>
          <li className="c-list__item">Use dropdown menus for grouping related navigation items to reduce clutter</li>
          <li className="c-list__item">Ensure the navbar is responsive and works well on all device sizes</li>
          <li className="c-list__item">Use a toggle button for mobile views to conserve space</li>
          <li className="c-list__item">Include a clear visual indication of the current page or section</li>
          <li className="c-list__item">Consider using a fixed navbar for long pages to keep navigation accessible</li>
          <li className="c-list__item">Choose a color variant that provides sufficient contrast with the content</li>
          <li className="c-list__item">Include a recognizable brand element (logo or name) for consistent identity</li>
          <li className="c-list__item">Limit the number of items in the navbar to avoid overwhelming users</li>
          <li className="c-list__item">Test the navbar with keyboard navigation to ensure accessibility</li>
        </ul>
      </div>
    </DocsLayout>
  )
}