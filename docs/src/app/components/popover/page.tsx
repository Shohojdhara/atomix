'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function PopoverPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Popover</h1>
        <p>
          The Popover component displays additional content that appears when a user clicks or hovers over a trigger element.
          It's useful for providing contextual information, additional options, or interactive content without navigating away from the current view.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Simple popover with default styling"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-button c-button--primary" id="popover-demo-1" aria-haspopup="true" aria-expanded="false">
    Click me
  </button>
  <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-demo-1">
    <div className="c-popover__arrow"></div>
    <div className="c-popover__content">
      <p>This is a simple popover with default styling.</p>
    </div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-button c-button--primary" id="popover-demo-1" aria-haspopup="true" aria-expanded="false">
              Click me
            </button>
            <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-demo-1">
              <div className="c-popover__arrow"></div>
              <div className="c-popover__content">
                <p>This is a simple popover with default styling.</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Popover Placements"
          description="Popovers can be positioned in different directions"
          code={`<div className="u-d-flex u-justify-content-around u-align-items-center u-gap-4">
  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-top" aria-haspopup="true" aria-expanded="false">
      Top
    </button>
    <div className="c-popover c-popover--top" role="tooltip" aria-describedby="popover-top">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <p>Popover on top</p>
      </div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-right" aria-haspopup="true" aria-expanded="false">
      Right
    </button>
    <div className="c-popover c-popover--right" role="tooltip" aria-describedby="popover-right">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <p>Popover on right</p>
      </div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-bottom" aria-haspopup="true" aria-expanded="false">
      Bottom
    </button>
    <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-bottom">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <p>Popover on bottom</p>
      </div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-left" aria-haspopup="true" aria-expanded="false">
      Left
    </button>
    <div className="c-popover c-popover--left" role="tooltip" aria-describedby="popover-left">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <p>Popover on left</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-justify-content-around u-align-items-center u-gap-4">
            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-top" aria-haspopup="true" aria-expanded="false">
                Top
              </button>
              <div className="c-popover c-popover--top" role="tooltip" aria-describedby="popover-top">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <p>Popover on top</p>
                </div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-right" aria-haspopup="true" aria-expanded="false">
                Right
              </button>
              <div className="c-popover c-popover--right" role="tooltip" aria-describedby="popover-right">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <p>Popover on right</p>
                </div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-bottom" aria-haspopup="true" aria-expanded="false">
                Bottom
              </button>
              <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-bottom">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <p>Popover on bottom</p>
                </div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-left" aria-haspopup="true" aria-expanded="false">
                Left
              </button>
              <div className="c-popover c-popover--left" role="tooltip" aria-describedby="popover-left">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <p>Popover on left</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Popover with Title"
          description="Popover with a header title"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-button c-button--primary" id="popover-with-title" aria-haspopup="true" aria-expanded="false">
    Popover with Title
  </button>
  <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-with-title">
    <div className="c-popover__arrow"></div>
    <div className="c-popover__content">
      <div className="c-popover__header">
        <h3 className="c-popover__title">Popover Title</h3>
      </div>
      <div className="c-popover__body">
        <p>This popover has a title in the header section and content in the body section.</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-button c-button--primary" id="popover-with-title" aria-haspopup="true" aria-expanded="false">
              Popover with Title
            </button>
            <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-with-title">
              <div className="c-popover__arrow"></div>
              <div className="c-popover__content">
                <div className="c-popover__header">
                  <h3 className="c-popover__title">Popover Title</h3>
                </div>
                <div className="c-popover__body">
                  <p>This popover has a title in the header section and content in the body section.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dismissible Popover"
          description="Popover with a close button"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-button c-button--primary" id="popover-dismissible" aria-haspopup="true" aria-expanded="false">
    Dismissible Popover
  </button>
  <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-dismissible">
    <div className="c-popover__arrow"></div>
    <div className="c-popover__content">
      <div className="c-popover__header">
        <h3 className="c-popover__title">Dismissible Popover</h3>
        <button className="c-popover__close" aria-label="Close popover">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="c-popover__body">
        <p>This popover can be dismissed by clicking the close button.</p>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-button c-button--primary" id="popover-dismissible" aria-haspopup="true" aria-expanded="false">
              Dismissible Popover
            </button>
            <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-dismissible">
              <div className="c-popover__arrow"></div>
              <div className="c-popover__content">
                <div className="c-popover__header">
                  <h3 className="c-popover__title">Dismissible Popover</h3>
                  <button className="c-popover__close" aria-label="Close popover">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="c-popover__body">
                  <p>This popover can be dismissed by clicking the close button.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Popover with Interactive Content"
          description="Popover containing interactive elements"
          code={`<div className="u-position-relative u-d-inline-block">
  <button className="c-button c-button--primary" id="popover-interactive" aria-haspopup="true" aria-expanded="false">
    Interactive Popover
  </button>
  <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-interactive">
    <div className="c-popover__arrow"></div>
    <div className="c-popover__content">
      <div className="c-popover__header">
        <h3 className="c-popover__title">Quick Settings</h3>
        <button className="c-popover__close" aria-label="Close popover">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="c-popover__body">
        <div className="u-mb-3">
          <label className="c-form-label" htmlFor="popover-name">Name</label>
          <input type="text" className="c-form-input" id="popover-name" placeholder="Enter your name" />
        </div>
        <div className="u-mb-3">
          <label className="c-form-label" htmlFor="popover-email">Email</label>
          <input type="email" className="c-form-input" id="popover-email" placeholder="Enter your email" />
        </div>
        <div className="u-d-flex u-justify-content-end">
          <button className="c-button c-button--primary c-button--sm">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="u-position-relative u-d-inline-block">
            <button className="c-button c-button--primary" id="popover-interactive" aria-haspopup="true" aria-expanded="false">
              Interactive Popover
            </button>
            <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-interactive">
              <div className="c-popover__arrow"></div>
              <div className="c-popover__content">
                <div className="c-popover__header">
                  <h3 className="c-popover__title">Quick Settings</h3>
                  <button className="c-popover__close" aria-label="Close popover">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="c-popover__body">
                  <div className="u-mb-3">
                    <label className="c-form-label" htmlFor="popover-name">Name</label>
                    <input type="text" className="c-form-input" id="popover-name" placeholder="Enter your name" />
                  </div>
                  <div className="u-mb-3">
                    <label className="c-form-label" htmlFor="popover-email">Email</label>
                    <input type="email" className="c-form-input" id="popover-email" placeholder="Enter your email" />
                  </div>
                  <div className="u-d-flex u-justify-content-end">
                    <button className="c-button c-button--primary c-button--sm">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Popover Sizes"
          description="Popovers in different sizes"
          code={`<div className="u-d-flex u-justify-content-around u-align-items-center u-gap-4">
  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-sm" aria-haspopup="true" aria-expanded="false">
      Small Popover
    </button>
    <div className="c-popover c-popover--bottom c-popover--sm" role="tooltip" aria-describedby="popover-sm">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <div className="c-popover__body">
          <p>This is a small popover.</p>
        </div>
      </div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-md" aria-haspopup="true" aria-expanded="false">
      Medium Popover
    </button>
    <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-md">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <div className="c-popover__body">
          <p>This is a medium popover (default size).</p>
        </div>
      </div>
    </div>
  </div>

  <div className="u-position-relative u-d-inline-block">
    <button className="c-button c-button--primary" id="popover-lg" aria-haspopup="true" aria-expanded="false">
      Large Popover
    </button>
    <div className="c-popover c-popover--bottom c-popover--lg" role="tooltip" aria-describedby="popover-lg">
      <div className="c-popover__arrow"></div>
      <div className="c-popover__content">
        <div className="c-popover__body">
          <p>This is a large popover with more space for content.</p>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-justify-content-around u-align-items-center u-gap-4">
            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-sm" aria-haspopup="true" aria-expanded="false">
                Small Popover
              </button>
              <div className="c-popover c-popover--bottom c-popover--sm" role="tooltip" aria-describedby="popover-sm">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <div className="c-popover__body">
                    <p>This is a small popover.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-md" aria-haspopup="true" aria-expanded="false">
                Medium Popover
              </button>
              <div className="c-popover c-popover--bottom" role="tooltip" aria-describedby="popover-md">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <div className="c-popover__body">
                    <p>This is a medium popover (default size).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="u-position-relative u-d-inline-block">
              <button className="c-button c-button--primary" id="popover-lg" aria-haspopup="true" aria-expanded="false">
                Large Popover
              </button>
              <div className="c-popover c-popover--bottom c-popover--lg" role="tooltip" aria-describedby="popover-lg">
                <div className="c-popover__arrow"></div>
                <div className="c-popover__content">
                  <div className="c-popover__body">
                    <p>This is a large popover with more space for content.</p>
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
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Content of the popover</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>trigger</code></td>
                <td className="c-data-table__cell"><code>React.ReactElement</code></td>
                <td className="c-data-table__cell">Element that triggers the popover</td>
                <td className="c-data-table__cell"><code>required</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>placement</code></td>
                <td className="c-data-table__cell"><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                <td className="c-data-table__cell">Position of the popover relative to the trigger</td>
                <td className="c-data-table__cell"><code>'bottom'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>title</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Optional title for the popover header</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>isOpen</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Controls whether the popover is displayed</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onToggle</code></td>
                <td className="c-data-table__cell"><code>(isOpen: boolean) => void</code></td>
                <td className="c-data-table__cell">Callback when popover visibility changes</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>dismissible</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show a close button</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onDismiss</code></td>
                <td className="c-data-table__cell"><code>() => void</code></td>
                <td className="c-data-table__cell">Callback when close button is clicked</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>size</code></td>
                <td className="c-data-table__cell"><code>'sm' | 'md' | 'lg'</code></td>
                <td className="c-data-table__cell">Size of the popover</td>
                <td className="c-data-table__cell"><code>'md'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>triggerType</code></td>
                <td className="c-data-table__cell"><code>'click' | 'hover'</code></td>
                <td className="c-data-table__cell">How the popover is triggered</td>
                <td className="c-data-table__cell"><code>'click'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>closeOnClickOutside</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to close when clicking outside</td>
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

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Popover component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses <code>aria-haspopup="true"</code> on the trigger element to indicate it controls a popover</li>
          <li className="c-list__item">Uses <code>aria-expanded</code> to communicate the open/closed state of the popover</li>
          <li className="c-list__item">Uses <code>role="tooltip"</code> on the popover element</li>
          <li className="c-list__item">Connects the trigger and popover with <code>aria-describedby</code></li>
          <li className="c-list__item">Provides <code>aria-label</code> for the close button</li>
          <li className="c-list__item">Supports keyboard navigation and focus management</li>
          <li className="c-list__item">Allows closing the popover with the Escape key</li>
          <li className="c-list__item">Ensures focus is trapped within the popover when open</li>
          <li className="c-list__item">Returns focus to the trigger element when closed</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use popovers for contextual information or actions related to a specific element</li>
          <li className="c-list__item">Keep popover content concise and focused</li>
          <li className="c-list__item">Choose the appropriate placement based on the available space and context</li>
          <li className="c-list__item">Include a title when the popover contains complex information or multiple actions</li>
          <li className="c-list__item">Make popovers dismissible when they contain non-essential information</li>
          <li className="c-list__item">Use hover triggers for simple informational popovers and click triggers for interactive content</li>
          <li className="c-list__item">Ensure the trigger element clearly indicates that it will open a popover</li>
          <li className="c-list__item">Consider using icons or visual cues to hint at the presence of a popover</li>
          <li className="c-list__item">Test popovers on different screen sizes to ensure they remain usable on mobile devices</li>
          <li className="c-list__item">Avoid nesting popovers within popovers, which can create confusing interactions</li>
        </ul>
      </div>
    </DocsLayout>
  )
}