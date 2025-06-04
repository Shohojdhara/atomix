'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function AvatarPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Avatar</h1>
        <p>
          Avatars are graphical representations of users, typically displaying profile pictures, initials, or icons.
          They help identify users across the interface and can be used in various contexts like user profiles, comments, and navigation.
        </p>

        <ComponentDemo
          title="Basic Avatar"
          description="Simple avatar with image"
          code={`<div className="c-avatar">
  <img src="https://i.pravatar.cc/150?img=1" alt="User avatar" className="c-avatar__image" />
</div>`}
        >
          <div className="c-avatar">
            <img src="https://i.pravatar.cc/150?img=1" alt="User avatar" className="c-avatar__image" />
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Avatar Sizes"
          description="Avatars in different sizes"
          code={`<div className="u-d-flex u-gap-md u-items-center">
  <div className="c-avatar c-avatar--xs">
    <img src="https://i.pravatar.cc/150?img=2" alt="Extra small avatar" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--sm">
    <img src="https://i.pravatar.cc/150?img=3" alt="Small avatar" className="c-avatar__image" />
  </div>
  <div className="c-avatar">
    <img src="https://i.pravatar.cc/150?img=4" alt="Default avatar" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--lg">
    <img src="https://i.pravatar.cc/150?img=5" alt="Large avatar" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--xl">
    <img src="https://i.pravatar.cc/150?img=6" alt="Extra large avatar" className="c-avatar__image" />
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-md u-items-center">
            <div className="c-avatar c-avatar--xs">
              <img src="https://i.pravatar.cc/150?img=2" alt="Extra small avatar" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--sm">
              <img src="https://i.pravatar.cc/150?img=3" alt="Small avatar" className="c-avatar__image" />
            </div>
            <div className="c-avatar">
              <img src="https://i.pravatar.cc/150?img=4" alt="Default avatar" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--lg">
              <img src="https://i.pravatar.cc/150?img=5" alt="Large avatar" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--xl">
              <img src="https://i.pravatar.cc/150?img=6" alt="Extra large avatar" className="c-avatar__image" />
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Avatar with Initials"
          description="Avatar displaying user initials when no image is available"
          code={`<div className="u-d-flex u-gap-md">
  <div className="c-avatar">
    <span className="c-avatar__initials">JD</span>
  </div>
  <div className="c-avatar c-avatar--primary">
    <span className="c-avatar__initials">AB</span>
  </div>
  <div className="c-avatar c-avatar--secondary">
    <span className="c-avatar__initials">CD</span>
  </div>
  <div className="c-avatar c-avatar--success">
    <span className="c-avatar__initials">EF</span>
  </div>
  <div className="c-avatar c-avatar--danger">
    <span className="c-avatar__initials">GH</span>
  </div>
  <div className="c-avatar c-avatar--warning">
    <span className="c-avatar__initials">IJ</span>
  </div>
  <div className="c-avatar c-avatar--info">
    <span className="c-avatar__initials">KL</span>
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <div className="c-avatar">
              <span className="c-avatar__initials">JD</span>
            </div>
            <div className="c-avatar c-avatar--primary">
              <span className="c-avatar__initials">AB</span>
            </div>
            <div className="c-avatar c-avatar--secondary">
              <span className="c-avatar__initials">CD</span>
            </div>
            <div className="c-avatar c-avatar--success">
              <span className="c-avatar__initials">EF</span>
            </div>
            <div className="c-avatar c-avatar--danger">
              <span className="c-avatar__initials">GH</span>
            </div>
            <div className="c-avatar c-avatar--warning">
              <span className="c-avatar__initials">IJ</span>
            </div>
            <div className="c-avatar c-avatar--info">
              <span className="c-avatar__initials">KL</span>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Avatar with Status"
          description="Avatar with online status indicator"
          code={`<div className="u-d-flex u-gap-md">
  <div className="c-avatar c-avatar--status-online">
    <img src="https://i.pravatar.cc/150?img=7" alt="Online user" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--status-away">
    <img src="https://i.pravatar.cc/150?img=8" alt="Away user" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--status-busy">
    <img src="https://i.pravatar.cc/150?img=9" alt="Busy user" className="c-avatar__image" />
  </div>
  <div className="c-avatar c-avatar--status-offline">
    <img src="https://i.pravatar.cc/150?img=10" alt="Offline user" className="c-avatar__image" />
  </div>
</div>`}
        >
          <div className="u-d-flex u-gap-md">
            <div className="c-avatar c-avatar--status-online">
              <img src="https://i.pravatar.cc/150?img=7" alt="Online user" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--status-away">
              <img src="https://i.pravatar.cc/150?img=8" alt="Away user" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--status-busy">
              <img src="https://i.pravatar.cc/150?img=9" alt="Busy user" className="c-avatar__image" />
            </div>
            <div className="c-avatar c-avatar--status-offline">
              <img src="https://i.pravatar.cc/150?img=10" alt="Offline user" className="c-avatar__image" />
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Avatar Group"
          description="Group of overlapping avatars"
          code={`<div className="c-avatar-group">
  <div className="c-avatar">
    <img src="https://i.pravatar.cc/150?img=11" alt="Group member 1" className="c-avatar__image" />
  </div>
  <div className="c-avatar">
    <img src="https://i.pravatar.cc/150?img=12" alt="Group member 2" className="c-avatar__image" />
  </div>
  <div className="c-avatar">
    <img src="https://i.pravatar.cc/150?img=13" alt="Group member 3" className="c-avatar__image" />
  </div>
  <div className="c-avatar">
    <span className="c-avatar__initials">+5</span>
  </div>
</div>`}
        >
          <div className="c-avatar-group">
            <div className="c-avatar">
              <img src="https://i.pravatar.cc/150?img=11" alt="Group member 1" className="c-avatar__image" />
            </div>
            <div className="c-avatar">
              <img src="https://i.pravatar.cc/150?img=12" alt="Group member 2" className="c-avatar__image" />
            </div>
            <div className="c-avatar">
              <img src="https://i.pravatar.cc/150?img=13" alt="Group member 3" className="c-avatar__image" />
            </div>
            <div className="c-avatar">
              <span className="c-avatar__initials">+5</span>
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
              <td className="c-data-table__cell"><code>c-avatar</code></td>
              <td className="c-data-table__cell">Main container for the avatar component</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--xs</code></td>
              <td className="c-data-table__cell">Extra small avatar size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--sm</code></td>
              <td className="c-data-table__cell">Small avatar size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--lg</code></td>
              <td className="c-data-table__cell">Large avatar size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--xl</code></td>
              <td className="c-data-table__cell">Extra large avatar size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--primary</code></td>
              <td className="c-data-table__cell">Primary color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--secondary</code></td>
              <td className="c-data-table__cell">Secondary color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--success</code></td>
              <td className="c-data-table__cell">Success color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--danger</code></td>
              <td className="c-data-table__cell">Danger color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--warning</code></td>
              <td className="c-data-table__cell">Warning color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--info</code></td>
              <td className="c-data-table__cell">Info color background for initials avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--status-online</code></td>
              <td className="c-data-table__cell">Shows online status indicator</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--status-away</code></td>
              <td className="c-data-table__cell">Shows away status indicator</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--status-busy</code></td>
              <td className="c-data-table__cell">Shows busy status indicator</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar--status-offline</code></td>
              <td className="c-data-table__cell">Shows offline status indicator</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar__image</code></td>
              <td className="c-data-table__cell">Image element within the avatar</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar__initials</code></td>
              <td className="c-data-table__cell">Text element for displaying initials</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-avatar-group</code></td>
              <td className="c-data-table__cell">Container for grouping multiple avatars</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}