'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function MessagesPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Messages</h1>
        <p>
          The Messages component provides a way to display various types of notifications, alerts, or feedback to users. 
          It supports different styles, sizes, and customization options to effectively communicate information.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Simple message with default styling"
          code={`<div className="c-message">
  <div className="c-message__content">
    <p className="c-message__text">This is a default message with basic styling.</p>
  </div>
</div>`}
        >
          <div className="c-message">
            <div className="c-message__content">
              <p className="c-message__text">This is a default message with basic styling.</p>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Message Variants"
          description="Different message types for various contexts"
          code={`<div className="c-message c-message--info">
  <div className="c-message__content">
    <p className="c-message__text">This is an informational message.</p>
  </div>
</div>

<div className="c-message c-message--success">
  <div className="c-message__content">
    <p className="c-message__text">Your changes have been saved successfully!</p>
  </div>
</div>

<div className="c-message c-message--warning">
  <div className="c-message__content">
    <p className="c-message__text">Please review your information before proceeding.</p>
  </div>
</div>

<div className="c-message c-message--error">
  <div className="c-message__content">
    <p className="c-message__text">An error occurred while processing your request.</p>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info">
              <div className="c-message__content">
                <p className="c-message__text">This is an informational message.</p>
              </div>
            </div>

            <div className="c-message c-message--success">
              <div className="c-message__content">
                <p className="c-message__text">Your changes have been saved successfully!</p>
              </div>
            </div>

            <div className="c-message c-message--warning">
              <div className="c-message__content">
                <p className="c-message__text">Please review your information before proceeding.</p>
              </div>
            </div>

            <div className="c-message c-message--error">
              <div className="c-message__content">
                <p className="c-message__text">An error occurred while processing your request.</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Messages with Icons"
          description="Messages with icons to enhance visual communication"
          code={`<div className="c-message c-message--info">
  <div className="c-message__icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">This is an informational message with an icon.</p>
  </div>
</div>

<div className="c-message c-message--success">
  <div className="c-message__icon">
    <i className="fas fa-check-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">Your changes have been saved successfully!</p>
  </div>
</div>

<div className="c-message c-message--warning">
  <div className="c-message__icon">
    <i className="fas fa-exclamation-triangle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">Please review your information before proceeding.</p>
  </div>
</div>

<div className="c-message c-message--error">
  <div className="c-message__icon">
    <i className="fas fa-times-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">An error occurred while processing your request.</p>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info">
              <div className="c-message__icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">This is an informational message with an icon.</p>
              </div>
            </div>

            <div className="c-message c-message--success">
              <div className="c-message__icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">Your changes have been saved successfully!</p>
              </div>
            </div>

            <div className="c-message c-message--warning">
              <div className="c-message__icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">Please review your information before proceeding.</p>
              </div>
            </div>

            <div className="c-message c-message--error">
              <div className="c-message__icon">
                <i className="fas fa-times-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">An error occurred while processing your request.</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Dismissible Messages"
          description="Messages with a close button for dismissal"
          code={`<div className="c-message c-message--info">
  <div className="c-message__icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">This is a dismissible message. Click the X to close it.</p>
  </div>
  <button className="c-message__close" aria-label="Close message">
    <i className="fas fa-times"></i>
  </button>
</div>

<div className="c-message c-message--success">
  <div className="c-message__icon">
    <i className="fas fa-check-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">Your changes have been saved successfully!</p>
  </div>
  <button className="c-message__close" aria-label="Close message">
    <i className="fas fa-times"></i>
  </button>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info">
              <div className="c-message__icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">This is a dismissible message. Click the X to close it.</p>
              </div>
              <button className="c-message__close" aria-label="Close message">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="c-message c-message--success">
              <div className="c-message__icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">Your changes have been saved successfully!</p>
              </div>
              <button className="c-message__close" aria-label="Close message">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Messages with Titles"
          description="Messages with titles for additional context"
          code={`<div className="c-message c-message--info">
  <div className="c-message__icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="c-message__content">
    <h4 className="c-message__title">Information</h4>
    <p className="c-message__text">This is an informational message with a title.</p>
  </div>
</div>

<div className="c-message c-message--warning">
  <div className="c-message__icon">
    <i className="fas fa-exclamation-triangle"></i>
  </div>
  <div className="c-message__content">
    <h4 className="c-message__title">Warning</h4>
    <p className="c-message__text">Please review your information before proceeding.</p>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info">
              <div className="c-message__icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="c-message__content">
                <h4 className="c-message__title">Information</h4>
                <p className="c-message__text">This is an informational message with a title.</p>
              </div>
            </div>

            <div className="c-message c-message--warning">
              <div className="c-message__icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="c-message__content">
                <h4 className="c-message__title">Warning</h4>
                <p className="c-message__text">Please review your information before proceeding.</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Messages with Actions"
          description="Messages with action buttons"
          code={`<div className="c-message c-message--info">
  <div className="c-message__icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="c-message__content">
    <h4 className="c-message__title">Update Available</h4>
    <p className="c-message__text">A new version of the application is available.</p>
    <div className="c-message__actions">
      <button className="c-button c-button--primary c-button--sm">Update Now</button>
      <button className="c-button c-button--text c-button--sm">Remind Me Later</button>
    </div>
  </div>
</div>

<div className="c-message c-message--warning">
  <div className="c-message__icon">
    <i className="fas fa-exclamation-triangle"></i>
  </div>
  <div className="c-message__content">
    <h4 className="c-message__title">Session Expiring</h4>
    <p className="c-message__text">Your session will expire in 5 minutes due to inactivity.</p>
    <div className="c-message__actions">
      <button className="c-button c-button--primary c-button--sm">Stay Logged In</button>
      <button className="c-button c-button--text c-button--sm">Logout</button>
    </div>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info">
              <div className="c-message__icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="c-message__content">
                <h4 className="c-message__title">Update Available</h4>
                <p className="c-message__text">A new version of the application is available.</p>
                <div className="c-message__actions">
                  <button className="c-button c-button--primary c-button--sm">Update Now</button>
                  <button className="c-button c-button--text c-button--sm">Remind Me Later</button>
                </div>
              </div>
            </div>

            <div className="c-message c-message--warning">
              <div className="c-message__icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="c-message__content">
                <h4 className="c-message__title">Session Expiring</h4>
                <p className="c-message__text">Your session will expire in 5 minutes due to inactivity.</p>
                <div className="c-message__actions">
                  <button className="c-button c-button--primary c-button--sm">Stay Logged In</button>
                  <button className="c-button c-button--text c-button--sm">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Outlined Messages"
          description="Messages with outlined styling instead of filled background"
          code={`<div className="c-message c-message--info c-message--outlined">
  <div className="c-message__icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">This is an outlined informational message.</p>
  </div>
</div>

<div className="c-message c-message--success c-message--outlined">
  <div className="c-message__icon">
    <i className="fas fa-check-circle"></i>
  </div>
  <div className="c-message__content">
    <p className="c-message__text">Your changes have been saved successfully!</p>
  </div>
</div>`}
        >
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="c-message c-message--info c-message--outlined">
              <div className="c-message__icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">This is an outlined informational message.</p>
              </div>
            </div>

            <div className="c-message c-message--success c-message--outlined">
              <div className="c-message__icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="c-message__content">
                <p className="c-message__text">Your changes have been saved successfully!</p>
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
                <td className="c-data-table__cell"><code>variant</code></td>
                <td className="c-data-table__cell"><code>'default' | 'info' | 'success' | 'warning' | 'error'</code></td>
                <td className="c-data-table__cell">The style variant of the message</td>
                <td className="c-data-table__cell"><code>'default'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>title</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Optional title for the message</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>children</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Content of the message</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>icon</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Optional icon to display</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>dismissible</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the message can be dismissed</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onDismiss</code></td>
                <td className="c-data-table__cell"><code>() => void</code></td>
                <td className="c-data-table__cell">Callback when message is dismissed</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>outlined</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to use outlined style</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>actions</code></td>
                <td className="c-data-table__cell"><code>React.ReactNode</code></td>
                <td className="c-data-table__cell">Optional action buttons</td>
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
          The Messages component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses appropriate ARIA roles for alert messages</li>
          <li className="c-list__item">Ensures proper color contrast for all message variants</li>
          <li className="c-list__item">Provides clear focus states for interactive elements</li>
          <li className="c-list__item">Includes proper labeling for dismissible messages</li>
          <li className="c-list__item">Ensures keyboard accessibility for all interactive elements</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use appropriate message variants based on the context and importance of the information</li>
          <li className="c-list__item">Keep message content concise and focused on a single piece of information</li>
          <li className="c-list__item">Include icons to enhance visual recognition of message types</li>
          <li className="c-list__item">Use titles for more complex messages that need additional context</li>
          <li className="c-list__item">Make messages dismissible when they are not critical to the user's current task</li>
          <li className="c-list__item">Include action buttons when the user needs to take immediate action</li>
          <li className="c-list__item">Consider using outlined style for less important or secondary messages</li>
          <li className="c-list__item">Avoid displaying too many messages at once, which can overwhelm the user</li>
          <li className="c-list__item">Position messages in a consistent location in the interface</li>
        </ul>
      </div>
    </DocsLayout>
  )
}