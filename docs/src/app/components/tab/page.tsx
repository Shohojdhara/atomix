'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TabPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Tab</h1>
        <p>
          Tabs organize content into separate views where only one view can be visible at a time. 
          They allow users to navigate between related sections of content within the same page.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default tabs with simple content"
          code={`<div className="c-tabs">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-1" aria-controls="panel-1">Tab 1</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-2" aria-controls="panel-2">Tab 2</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-3" aria-controls="panel-3">Tab 3</button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
      <p>Content for Tab 1</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
      <p>Content for Tab 2</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
      <p>Content for Tab 3</p>
    </div>
  </div>
</div>`}
        >
          <div className="c-tabs">
            <div className="c-tabs__list" role="tablist">
              <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-1" aria-controls="panel-1">Tab 1</button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-2" aria-controls="panel-2">Tab 2</button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-3" aria-controls="panel-3">Tab 3</button>
            </div>
            <div className="c-tabs__panels">
              <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
                <p>Content for Tab 1</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
                <p>Content for Tab 2</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
                <p>Content for Tab 3</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Tabs with Icons"
          description="Tabs that include icons alongside text"
          code={`<div className="c-tabs">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-icon-1" aria-controls="panel-icon-1">
      <i className="fas fa-home u-mr-2"></i> Home
    </button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-icon-2" aria-controls="panel-icon-2">
      <i className="fas fa-user u-mr-2"></i> Profile
    </button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-icon-3" aria-controls="panel-icon-3">
      <i className="fas fa-cog u-mr-2"></i> Settings
    </button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-icon-1" aria-labelledby="tab-icon-1">
      <p>Home content</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-icon-2" aria-labelledby="tab-icon-2" hidden>
      <p>Profile content</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-icon-3" aria-labelledby="tab-icon-3" hidden>
      <p>Settings content</p>
    </div>
  </div>
</div>`}
        >
          <div className="c-tabs">
            <div className="c-tabs__list" role="tablist">
              <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-icon-1" aria-controls="panel-icon-1">
                <i className="fas fa-home u-mr-2"></i> Home
              </button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-icon-2" aria-controls="panel-icon-2">
                <i className="fas fa-user u-mr-2"></i> Profile
              </button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-icon-3" aria-controls="panel-icon-3">
                <i className="fas fa-cog u-mr-2"></i> Settings
              </button>
            </div>
            <div className="c-tabs__panels">
              <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-icon-1" aria-labelledby="tab-icon-1">
                <p>Home content</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-icon-2" aria-labelledby="tab-icon-2" hidden>
                <p>Profile content</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-icon-3" aria-labelledby="tab-icon-3" hidden>
                <p>Settings content</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Vertical Tabs"
          description="Tabs arranged vertically instead of horizontally"
          code={`<div className="c-tabs c-tabs--vertical">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-v-1" aria-controls="panel-v-1">Tab 1</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-v-2" aria-controls="panel-v-2">Tab 2</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-v-3" aria-controls="panel-v-3">Tab 3</button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-v-1" aria-labelledby="tab-v-1">
      <p>Content for Tab 1</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-v-2" aria-labelledby="tab-v-2" hidden>
      <p>Content for Tab 2</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-v-3" aria-labelledby="tab-v-3" hidden>
      <p>Content for Tab 3</p>
    </div>
  </div>
</div>`}
        >
          <div className="c-tabs c-tabs--vertical">
            <div className="c-tabs__list" role="tablist">
              <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-v-1" aria-controls="panel-v-1">Tab 1</button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-v-2" aria-controls="panel-v-2">Tab 2</button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-v-3" aria-controls="panel-v-3">Tab 3</button>
            </div>
            <div className="c-tabs__panels">
              <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-v-1" aria-labelledby="tab-v-1">
                <p>Content for Tab 1</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-v-2" aria-labelledby="tab-v-2" hidden>
                <p>Content for Tab 2</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-v-3" aria-labelledby="tab-v-3" hidden>
                <p>Content for Tab 3</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Tabs with Custom Styling"
          description="Tabs with different visual styles"
          code={`<div className="c-tabs c-tabs--bordered">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-s-1" aria-controls="panel-s-1">Tab 1</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-s-2" aria-controls="panel-s-2">Tab 2</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-s-3" aria-controls="panel-s-3">Tab 3</button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-s-1" aria-labelledby="tab-s-1">
      <p>Content for Tab 1</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-s-2" aria-labelledby="tab-s-2" hidden>
      <p>Content for Tab 2</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-s-3" aria-labelledby="tab-s-3" hidden>
      <p>Content for Tab 3</p>
    </div>
  </div>
</div>

<div className="c-tabs c-tabs--pills u-mt-6">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-p-1" aria-controls="panel-p-1">Tab 1</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-p-2" aria-controls="panel-p-2">Tab 2</button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-p-3" aria-controls="panel-p-3">Tab 3</button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-p-1" aria-labelledby="tab-p-1">
      <p>Content for Tab 1</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-p-2" aria-labelledby="tab-p-2" hidden>
      <p>Content for Tab 2</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-p-3" aria-labelledby="tab-p-3" hidden>
      <p>Content for Tab 3</p>
    </div>
  </div>
</div>`}
        >
          <div>
            <div className="c-tabs c-tabs--bordered">
              <div className="c-tabs__list" role="tablist">
                <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-s-1" aria-controls="panel-s-1">Tab 1</button>
                <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-s-2" aria-controls="panel-s-2">Tab 2</button>
                <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-s-3" aria-controls="panel-s-3">Tab 3</button>
              </div>
              <div className="c-tabs__panels">
                <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-s-1" aria-labelledby="tab-s-1">
                  <p>Content for Tab 1</p>
                </div>
                <div className="c-tabs__panel" role="tabpanel" id="panel-s-2" aria-labelledby="tab-s-2" hidden>
                  <p>Content for Tab 2</p>
                </div>
                <div className="c-tabs__panel" role="tabpanel" id="panel-s-3" aria-labelledby="tab-s-3" hidden>
                  <p>Content for Tab 3</p>
                </div>
              </div>
            </div>

            <div className="c-tabs c-tabs--pills u-mt-6">
              <div className="c-tabs__list" role="tablist">
                <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-p-1" aria-controls="panel-p-1">Tab 1</button>
                <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-p-2" aria-controls="panel-p-2">Tab 2</button>
                <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-p-3" aria-controls="panel-p-3">Tab 3</button>
              </div>
              <div className="c-tabs__panels">
                <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-p-1" aria-labelledby="tab-p-1">
                  <p>Content for Tab 1</p>
                </div>
                <div className="c-tabs__panel" role="tabpanel" id="panel-p-2" aria-labelledby="tab-p-2" hidden>
                  <p>Content for Tab 2</p>
                </div>
                <div className="c-tabs__panel" role="tabpanel" id="panel-p-3" aria-labelledby="tab-p-3" hidden>
                  <p>Content for Tab 3</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Tabs with Badges"
          description="Tabs that include notification badges"
          code={`<div className="c-tabs">
  <div className="c-tabs__list" role="tablist">
    <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-b-1" aria-controls="panel-b-1">
      Inbox
      <span className="c-badge c-badge--primary c-badge--sm u-ml-2">5</span>
    </button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-b-2" aria-controls="panel-b-2">
      Sent
    </button>
    <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-b-3" aria-controls="panel-b-3">
      Drafts
      <span className="c-badge c-badge--secondary c-badge--sm u-ml-2">2</span>
    </button>
  </div>
  <div className="c-tabs__panels">
    <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-b-1" aria-labelledby="tab-b-1">
      <p>Inbox content</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-b-2" aria-labelledby="tab-b-2" hidden>
      <p>Sent content</p>
    </div>
    <div className="c-tabs__panel" role="tabpanel" id="panel-b-3" aria-labelledby="tab-b-3" hidden>
      <p>Drafts content</p>
    </div>
  </div>
</div>`}
        >
          <div className="c-tabs">
            <div className="c-tabs__list" role="tablist">
              <button className="c-tabs__tab c-tabs__tab--active" role="tab" aria-selected="true" id="tab-b-1" aria-controls="panel-b-1">
                Inbox
                <span className="c-badge c-badge--primary c-badge--sm u-ml-2">5</span>
              </button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-b-2" aria-controls="panel-b-2">
                Sent
              </button>
              <button className="c-tabs__tab" role="tab" aria-selected="false" id="tab-b-3" aria-controls="panel-b-3">
                Drafts
                <span className="c-badge c-badge--secondary c-badge--sm u-ml-2">2</span>
              </button>
            </div>
            <div className="c-tabs__panels">
              <div className="c-tabs__panel c-tabs__panel--active" role="tabpanel" id="panel-b-1" aria-labelledby="tab-b-1">
                <p>Inbox content</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-b-2" aria-labelledby="tab-b-2" hidden>
                <p>Sent content</p>
              </div>
              <div className="c-tabs__panel" role="tabpanel" id="panel-b-3" aria-labelledby="tab-b-3" hidden>
                <p>Drafts content</p>
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
                <td className="c-data-table__cell"><code>activeTab</code></td>
                <td className="c-data-table__cell"><code>number</code></td>
                <td className="c-data-table__cell">Index of the active tab (0-based)</td>
                <td className="c-data-table__cell"><code>0</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>tabs</code></td>
                <td className="c-data-table__cell"><code>array</code></td>
                <td className="c-data-table__cell">Array of tab objects with label and content</td>
                <td className="c-data-table__cell"><code>[]</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(index: number) => void</code></td>
                <td className="c-data-table__cell">Callback when tab is changed</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>variant</code></td>
                <td className="c-data-table__cell"><code>'default' | 'bordered' | 'pills'</code></td>
                <td className="c-data-table__cell">Visual style variant of the tabs</td>
                <td className="c-data-table__cell"><code>'default'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>orientation</code></td>
                <td className="c-data-table__cell"><code>'horizontal' | 'vertical'</code></td>
                <td className="c-data-table__cell">Orientation of the tabs</td>
                <td className="c-data-table__cell"><code>'horizontal'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>tabClassName</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes for tab buttons</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>panelClassName</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes for tab panels</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The Tab component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses proper ARIA roles: <code>tablist</code>, <code>tab</code>, and <code>tabpanel</code></li>
          <li className="c-list__item">Implements <code>aria-selected</code> to indicate the active tab</li>
          <li className="c-list__item">Uses <code>aria-controls</code> and <code>aria-labelledby</code> to associate tabs with their panels</li>
          <li className="c-list__item">Supports keyboard navigation (arrow keys, Home, End) between tabs</li>
          <li className="c-list__item">Hides inactive tab panels with the <code>hidden</code> attribute</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use tabs to organize related content that doesn't need to be viewed simultaneously</li>
          <li className="c-list__item">Keep tab labels short and descriptive</li>
          <li className="c-list__item">Limit the number of tabs to avoid overwhelming users (typically 2-7 tabs)</li>
          <li className="c-list__item">Consider using icons alongside text for better visual recognition</li>
          <li className="c-list__item">Use vertical tabs when you have many tabs or when horizontal space is limited</li>
          <li className="c-list__item">Ensure tab content is similar in structure to maintain consistency</li>
          <li className="c-list__item">Don't use tabs for content that users need to compare side by side</li>
        </ul>
      </div>
    </DocsLayout>
  )
}