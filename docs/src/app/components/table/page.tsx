'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TablePage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Table</h1>
        <p>
          Tables are used to organize and display data in a structured format with rows and columns.
          They help users compare and analyze information efficiently.
        </p>

        <ComponentDemo
          title="Basic Table"
          description="Simple table with header and body"
          code={`<table className="c-data-table">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">First Name</th>
      <th className="c-data-table__header-cell">Last Name</th>
      <th className="c-data-table__header-cell">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Mark</td>
      <td className="c-data-table__cell">Otto</td>
      <td className="c-data-table__cell">@mdo</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Jacob</td>
      <td className="c-data-table__cell">Thornton</td>
      <td className="c-data-table__cell">@fat</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Larry</td>
      <td className="c-data-table__cell">Bird</td>
      <td className="c-data-table__cell">@twitter</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">First Name</th>
                <th className="c-data-table__header-cell">Last Name</th>
                <th className="c-data-table__header-cell">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Mark</td>
                <td className="c-data-table__cell">Otto</td>
                <td className="c-data-table__cell">@mdo</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Jacob</td>
                <td className="c-data-table__cell">Thornton</td>
                <td className="c-data-table__cell">@fat</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Larry</td>
                <td className="c-data-table__cell">Bird</td>
                <td className="c-data-table__cell">@twitter</td>
              </tr>
            </tbody>
          </table>
        </ComponentDemo>

        <ComponentDemo
          title="Striped Table"
          description="Table with alternating row colors"
          code={`<table className="c-data-table c-data-table--striped">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">First Name</th>
      <th className="c-data-table__header-cell">Last Name</th>
      <th className="c-data-table__header-cell">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Mark</td>
      <td className="c-data-table__cell">Otto</td>
      <td className="c-data-table__cell">@mdo</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Jacob</td>
      <td className="c-data-table__cell">Thornton</td>
      <td className="c-data-table__cell">@fat</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Larry</td>
      <td className="c-data-table__cell">Bird</td>
      <td className="c-data-table__cell">@twitter</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table c-data-table--striped">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">First Name</th>
                <th className="c-data-table__header-cell">Last Name</th>
                <th className="c-data-table__header-cell">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Mark</td>
                <td className="c-data-table__cell">Otto</td>
                <td className="c-data-table__cell">@mdo</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Jacob</td>
                <td className="c-data-table__cell">Thornton</td>
                <td className="c-data-table__cell">@fat</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Larry</td>
                <td className="c-data-table__cell">Bird</td>
                <td className="c-data-table__cell">@twitter</td>
              </tr>
            </tbody>
          </table>
        </ComponentDemo>

        <ComponentDemo
          title="Bordered Table"
          description="Table with borders around all cells"
          code={`<table className="c-data-table c-data-table--bordered">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">First Name</th>
      <th className="c-data-table__header-cell">Last Name</th>
      <th className="c-data-table__header-cell">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Mark</td>
      <td className="c-data-table__cell">Otto</td>
      <td className="c-data-table__cell">@mdo</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Jacob</td>
      <td className="c-data-table__cell">Thornton</td>
      <td className="c-data-table__cell">@fat</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Larry</td>
      <td className="c-data-table__cell">Bird</td>
      <td className="c-data-table__cell">@twitter</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table c-data-table--bordered">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">First Name</th>
                <th className="c-data-table__header-cell">Last Name</th>
                <th className="c-data-table__header-cell">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Mark</td>
                <td className="c-data-table__cell">Otto</td>
                <td className="c-data-table__cell">@mdo</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Jacob</td>
                <td className="c-data-table__cell">Thornton</td>
                <td className="c-data-table__cell">@fat</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Larry</td>
                <td className="c-data-table__cell">Bird</td>
                <td className="c-data-table__cell">@twitter</td>
              </tr>
            </tbody>
          </table>
        </ComponentDemo>

        <ComponentDemo
          title="Hoverable Table"
          description="Table with hover effect on rows"
          code={`<table className="c-data-table c-data-table--hover">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">First Name</th>
      <th className="c-data-table__header-cell">Last Name</th>
      <th className="c-data-table__header-cell">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Mark</td>
      <td className="c-data-table__cell">Otto</td>
      <td className="c-data-table__cell">@mdo</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Jacob</td>
      <td className="c-data-table__cell">Thornton</td>
      <td className="c-data-table__cell">@fat</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Larry</td>
      <td className="c-data-table__cell">Bird</td>
      <td className="c-data-table__cell">@twitter</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table c-data-table--hover">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">First Name</th>
                <th className="c-data-table__header-cell">Last Name</th>
                <th className="c-data-table__header-cell">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Mark</td>
                <td className="c-data-table__cell">Otto</td>
                <td className="c-data-table__cell">@mdo</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Jacob</td>
                <td className="c-data-table__cell">Thornton</td>
                <td className="c-data-table__cell">@fat</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Larry</td>
                <td className="c-data-table__cell">Bird</td>
                <td className="c-data-table__cell">@twitter</td>
              </tr>
            </tbody>
          </table>
        </ComponentDemo>

        <ComponentDemo
          title="Compact Table"
          description="Table with reduced cell padding"
          code={`<table className="c-data-table c-data-table--compact">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">First Name</th>
      <th className="c-data-table__header-cell">Last Name</th>
      <th className="c-data-table__header-cell">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Mark</td>
      <td className="c-data-table__cell">Otto</td>
      <td className="c-data-table__cell">@mdo</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Jacob</td>
      <td className="c-data-table__cell">Thornton</td>
      <td className="c-data-table__cell">@fat</td>
    </tr>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Larry</td>
      <td className="c-data-table__cell">Bird</td>
      <td className="c-data-table__cell">@twitter</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table c-data-table--compact">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">First Name</th>
                <th className="c-data-table__header-cell">Last Name</th>
                <th className="c-data-table__header-cell">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Mark</td>
                <td className="c-data-table__cell">Otto</td>
                <td className="c-data-table__cell">@mdo</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Jacob</td>
                <td className="c-data-table__cell">Thornton</td>
                <td className="c-data-table__cell">@fat</td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Larry</td>
                <td className="c-data-table__cell">Bird</td>
                <td className="c-data-table__cell">@twitter</td>
              </tr>
            </tbody>
          </table>
        </ComponentDemo>

        <ComponentDemo
          title="Table with Contextual Classes"
          description="Table with colored rows for different states"
          code={`<table className="c-data-table">
  <thead className="c-data-table__header">
    <tr className="c-data-table__row">
      <th className="c-data-table__header-cell">#</th>
      <th className="c-data-table__header-cell">State</th>
      <th className="c-data-table__header-cell">Description</th>
      <th className="c-data-table__header-cell">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className="c-data-table__row">
      <td className="c-data-table__cell">1</td>
      <td className="c-data-table__cell">Default</td>
      <td className="c-data-table__cell">Regular row without any state class</td>
      <td className="c-data-table__cell">Normal</td>
    </tr>
    <tr className="c-data-table__row is-active">
      <td className="c-data-table__cell">2</td>
      <td className="c-data-table__cell">Active</td>
      <td className="c-data-table__cell">Row with active state</td>
      <td className="c-data-table__cell">Selected</td>
    </tr>
    <tr className="c-data-table__row is-success">
      <td className="c-data-table__cell">3</td>
      <td className="c-data-table__cell">Success</td>
      <td className="c-data-table__cell">Row with success state</td>
      <td className="c-data-table__cell">Completed</td>
    </tr>
    <tr className="c-data-table__row is-warning">
      <td className="c-data-table__cell">4</td>
      <td className="c-data-table__cell">Warning</td>
      <td className="c-data-table__cell">Row with warning state</td>
      <td className="c-data-table__cell">Pending</td>
    </tr>
    <tr className="c-data-table__row is-danger">
      <td className="c-data-table__cell">5</td>
      <td className="c-data-table__cell">Danger</td>
      <td className="c-data-table__cell">Row with danger state</td>
      <td className="c-data-table__cell">Failed</td>
    </tr>
  </tbody>
</table>`}
        >
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">#</th>
                <th className="c-data-table__header-cell">State</th>
                <th className="c-data-table__header-cell">Description</th>
                <th className="c-data-table__header-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell">1</td>
                <td className="c-data-table__cell">Default</td>
                <td className="c-data-table__cell">Regular row without any state class</td>
                <td className="c-data-table__cell">Normal</td>
              </tr>
              <tr className="c-data-table__row is-active">
                <td className="c-data-table__cell">2</td>
                <td className="c-data-table__cell">Active</td>
                <td className="c-data-table__cell">Row with active state</td>
                <td className="c-data-table__cell">Selected</td>
              </tr>
              <tr className="c-data-table__row is-success">
                <td className="c-data-table__cell">3</td>
                <td className="c-data-table__cell">Success</td>
                <td className="c-data-table__cell">Row with success state</td>
                <td className="c-data-table__cell">Completed</td>
              </tr>
              <tr className="c-data-table__row is-warning">
                <td className="c-data-table__cell">4</td>
                <td className="c-data-table__cell">Warning</td>
                <td className="c-data-table__cell">Row with warning state</td>
                <td className="c-data-table__cell">Pending</td>
              </tr>
              <tr className="c-data-table__row is-danger">
                <td className="c-data-table__cell">5</td>
                <td className="c-data-table__cell">Danger</td>
                <td className="c-data-table__cell">Row with danger state</td>
                <td className="c-data-table__cell">Failed</td>
              </tr>
            </tbody>
          </table>
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
              <td className="c-data-table__cell"><code>c-data-table</code></td>
              <td className="c-data-table__cell">Base table class</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table--striped</code></td>
              <td className="c-data-table__cell">Adds alternating row colors</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table--bordered</code></td>
              <td className="c-data-table__cell">Adds borders to all cells</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table--hover</code></td>
              <td className="c-data-table__cell">Adds hover effect to rows</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table--compact</code></td>
              <td className="c-data-table__cell">Reduces cell padding for a more compact table</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table--responsive</code></td>
              <td className="c-data-table__cell">Makes the table horizontally scrollable on small screens</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table__header</code></td>
              <td className="c-data-table__cell">Container for table header (thead)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table__row</code></td>
              <td className="c-data-table__cell">Table row (tr)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table__header-cell</code></td>
              <td className="c-data-table__cell">Header cell (th)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-data-table__cell</code></td>
              <td className="c-data-table__cell">Table cell (td)</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-active</code></td>
              <td className="c-data-table__cell">State class for active/selected rows</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-success</code></td>
              <td className="c-data-table__cell">State class for success rows</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-warning</code></td>
              <td className="c-data-table__cell">State class for warning rows</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-danger</code></td>
              <td className="c-data-table__cell">State class for danger/error rows</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}