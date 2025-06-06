'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function PaginationPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Pagination</h1>
        <p>
          The Pagination component provides a way to navigate through multiple pages of content. 
          It helps users understand their current position within a large dataset and allows them to 
          navigate between pages efficiently.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Simple pagination with default styling"
          code={`<nav aria-label="Pagination">
  <ul className="c-pagination">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">3</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">4</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">5</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>`}
        >
          <nav aria-label="Pagination">
            <ul className="c-pagination">
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                  <i className="fas fa-chevron-left"></i>
                </a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">1</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">3</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">4</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">5</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                  <i className="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Pagination Sizes"
          description="Different sizes for pagination components"
          code={`<nav aria-label="Small pagination">
  <ul className="c-pagination c-pagination--sm">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">3</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>

<nav aria-label="Default pagination">
  <ul className="c-pagination">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">3</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>

<nav aria-label="Large pagination">
  <ul className="c-pagination c-pagination--lg">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">3</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <nav aria-label="Small pagination">
              <ul className="c-pagination c-pagination--sm">
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">1</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">3</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Default pagination">
              <ul className="c-pagination">
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">1</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">3</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Large pagination">
              <ul className="c-pagination c-pagination--lg">
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">1</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">3</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Pagination with Ellipsis"
          description="Pagination with ellipsis for large number of pages"
          code={`<nav aria-label="Pagination with ellipsis">
  <ul className="c-pagination">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <span className="c-pagination__ellipsis">...</span>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">10</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">11</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">12</a>
    </li>
    <li className="c-pagination__item">
      <span className="c-pagination__ellipsis">...</span>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">50</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</nav>`}
        >
          <nav aria-label="Pagination with ellipsis">
            <ul className="c-pagination">
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                  <i className="fas fa-chevron-left"></i>
                </a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">1</a>
              </li>
              <li className="c-pagination__item">
                <span className="c-pagination__ellipsis">...</span>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">10</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">11</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">12</a>
              </li>
              <li className="c-pagination__item">
                <span className="c-pagination__ellipsis">...</span>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">50</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                  <i className="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Pagination with First/Last Buttons"
          description="Pagination with first and last page buttons"
          code={`<nav aria-label="Pagination with first/last buttons">
  <ul className="c-pagination">
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--first" aria-label="First page">
        <i className="fas fa-angle-double-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
        <i className="fas fa-chevron-left"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">1</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link">3</a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
        <i className="fas fa-chevron-right"></i>
      </a>
    </li>
    <li className="c-pagination__item">
      <a href="#" className="c-pagination__link c-pagination__link--last" aria-label="Last page">
        <i className="fas fa-angle-double-right"></i>
      </a>
    </li>
  </ul>
</nav>`}
        >
          <nav aria-label="Pagination with first/last buttons">
            <ul className="c-pagination">
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--first" aria-label="First page">
                  <i className="fas fa-angle-double-left"></i>
                </a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                  <i className="fas fa-chevron-left"></i>
                </a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">1</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link">3</a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                  <i className="fas fa-chevron-right"></i>
                </a>
              </li>
              <li className="c-pagination__item">
                <a href="#" className="c-pagination__link c-pagination__link--last" aria-label="Last page">
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </ComponentDemo>

        <ComponentDemo
          title="Pagination with Page Information"
          description="Pagination with additional page information"
          code={`<div className="u-d-flex u-flex-column u-gap-2">
  <nav aria-label="Pagination with page information">
    <ul className="c-pagination">
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
          <i className="fas fa-chevron-left"></i>
        </a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">1</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">3</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
          <i className="fas fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
  <div className="c-pagination__info">Showing page 2 of 3 (Items 11-20 of 30)</div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-2">
            <nav aria-label="Pagination with page information">
              <ul className="c-pagination">
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--prev" aria-label="Previous page">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">1</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">2</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">3</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="c-pagination__info">Showing page 2 of 3 (Items 11-20 of 30)</div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Pagination with Items Per Page Selector"
          description="Pagination with a dropdown to select items per page"
          code={`<div className="u-d-flex u-flex-column u-gap-3">
  <div className="u-d-flex u-justify-content-between u-align-items-center">
    <div className="c-pagination__info">Showing page 1 of 5 (Items 1-10 of 50)</div>
    <div className="c-pagination__per-page">
      <label htmlFor="items-per-page">Items per page:</label>
      <select id="items-per-page" className="c-form-select c-form-select--sm u-ml-2">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
  <nav aria-label="Pagination with items per page selector">
    <ul className="c-pagination">
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--prev c-pagination__link--disabled" aria-label="Previous page" aria-disabled="true">
          <i className="fas fa-chevron-left"></i>
        </a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">1</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">2</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">3</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">4</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link">5</a>
      </li>
      <li className="c-pagination__item">
        <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
          <i className="fas fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div className="c-pagination__info">Showing page 1 of 5 (Items 1-10 of 50)</div>
              <div className="c-pagination__per-page">
                <label htmlFor="items-per-page">Items per page:</label>
                <select id="items-per-page" className="c-form-select c-form-select--sm u-ml-2">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <nav aria-label="Pagination with items per page selector">
              <ul className="c-pagination">
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--prev c-pagination__link--disabled" aria-label="Previous page" aria-disabled="true">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--active" aria-current="page">1</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">2</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">3</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">4</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link">5</a>
                </li>
                <li className="c-pagination__item">
                  <a href="#" className="c-pagination__link c-pagination__link--next" aria-label="Next page">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
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
                <td className="c-data-table__cell"><code>currentPage</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">The current active page</td>
                <td className="c-data-table__cell"><code>1</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>totalPages</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Total number of pages</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onPageChange</code></td>
                <td className="c-data-table__cell"><code>(page: number) => void</code></td>
                <td className="c-data-table__cell">Callback when page is changed</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">Size of the pagination component</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showFirstLast</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show first and last page buttons</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>maxVisiblePages</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Maximum number of page links to display</td>
                <td className="c-data-table__cell"><code>5</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showInfo</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show pagination information</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>totalItems</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Total number of items (for info display)</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>itemsPerPage</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Number of items per page</td>
                <td className="c-data-table__cell"><code>10</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onItemsPerPageChange</code></td>
                <td className="c-data-table__cell"><code>(itemsPerPage: number) => void</code></td>
                <td className="c-data-table__cell">Callback when items per page is changed</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>itemsPerPageOptions</code></td>
                <td className="c-data-table__cell"><code>number[]</code></td>
                <td className="c-data-table__cell">Options for items per page selector</td>
                <td className="c-data-table__cell"><code>[10, 20, 50, 100]</code></td>
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
          The Pagination component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses semantic <code>&lt;nav&gt;</code> and <code>&lt;ul&gt;</code> elements for proper structure</li>
          <li className="c-list__item">Includes <code>aria-label</code> on the navigation element to describe its purpose</li>
          <li className="c-list__item">Uses <code>aria-current="page"</code> to indicate the current page</li>
          <li className="c-list__item">Provides <code>aria-label</code> for previous, next, first, and last page buttons</li>
          <li className="c-list__item">Uses <code>aria-disabled="true"</code> for disabled navigation buttons</li>
          <li className="c-list__item">Ensures proper focus management and keyboard navigation</li>
          <li className="c-list__item">Maintains sufficient color contrast for all states</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use pagination when you have a large dataset that needs to be broken into manageable chunks</li>
          <li className="c-list__item">Keep the number of visible page links reasonable (typically 5-7) to avoid overwhelming users</li>
          <li className="c-list__item">Use ellipsis (...) to indicate skipped pages when dealing with a large number of pages</li>
          <li className="c-list__item">Include previous and next buttons to facilitate sequential navigation</li>
          <li className="c-list__item">Consider adding first and last page buttons for datasets with many pages</li>
          <li className="c-list__item">Provide pagination information (e.g., "Showing items 1-10 of 50") to help users understand their position in the dataset</li>
          <li className="c-list__item">Consider offering an items-per-page selector to allow users to control the amount of data displayed</li>
          <li className="c-list__item">Ensure the pagination component is responsive and works well on mobile devices</li>
          <li className="c-list__item">Disable previous/next buttons when at the first/last page to prevent confusion</li>
          <li className="c-list__item">Maintain consistent styling and behavior across your application</li>
        </ul>
      </div>
    </DocsLayout>
  )
}