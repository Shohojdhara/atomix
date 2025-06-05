'use client';

import React from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { Callout } from '@/components/Callout';
import { Button } from '@/components/Button';
import { CodeBlock } from '@/components/CodeBlock';

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13M12 17H12.01M3.98069 8.00001C3.32275 9.15122 3 10.5502 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C10.5502 3 9.15122 3.32275 8.00001 3.98069" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13M12 17H12.01M11.2926 3.05737C11.5093 3.01652 11.7321 3 11.9565 3C16.3908 3 20 6.60914 20 11.0435C20 11.2679 19.9835 11.4907 19.9426 11.7074C19.4862 15.0952 16.5609 17.7241 13 17.9711C12.6712 17.9903 12.3375 18 12 18C7.58172 18 4 14.4183 4 10C4 6.43913 6.62884 3.51375 10.0166 3.05736C10.2333 3.01652 10.4561 3 10.6805 3C10.9049 3 11.1277 3.01652 11.3444 3.05736L11.2926 3.05737Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CalloutPage() {
  return (
    <DocsLayout title="Callout" description="Callout components are used to display important messages, notifications, or alerts to users.">
      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">Basic Usage</h2>
        <p className="u-mb-4">
          Callouts are used to display important messages, notifications, or alerts to users. They can include a title, content, icon, and actions.
        </p>
        <div className="u-mb-4">
          <Callout 
            title="Information" 
            icon={<InfoIcon />}
            variant="primary"
          >
            This is a basic callout with an information message.
          </Callout>
        </div>
        <CodeBlock language="jsx" code={`<Callout 
  title="Information" 
  icon={<InfoIcon />}
  variant="primary"
>
  This is a basic callout with an information message.
</Callout>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">Variants</h2>
        <p className="u-mb-4">
          Callouts come in different variants to represent different types of messages.
        </p>
        <div className="u-mb-4 u-d-flex u-flex-column u-gap-4">
          <Callout title="Primary" icon={<InfoIcon />} variant="primary">
            This is a primary callout for general information.
          </Callout>
          
          <Callout title="Success" icon={<SuccessIcon />} variant="success">
            This is a success callout for positive feedback.
          </Callout>
          
          <Callout title="Warning" icon={<WarningIcon />} variant="warning">
            This is a warning callout for cautionary messages.
          </Callout>
          
          <Callout title="Error" icon={<ErrorIcon />} variant="error">
            This is an error callout for critical issues.
          </Callout>
          
          <Callout title="Info" icon={<InfoIcon />} variant="info">
            This is an info callout for informational messages.
          </Callout>
          
          <Callout title="Light" icon={<InfoIcon />} variant="light">
            This is a light callout for subtle messages.
          </Callout>
          
          <Callout title="Dark" icon={<InfoIcon />} variant="dark">
            This is a dark callout for high-contrast messages.
          </Callout>
        </div>
        <CodeBlock language="jsx" code={`<Callout title="Primary" icon={<InfoIcon />} variant="primary">
  This is a primary callout for general information.
</Callout>

<Callout title="Success" icon={<SuccessIcon />} variant="success">
  This is a success callout for positive feedback.
</Callout>

<Callout title="Warning" icon={<WarningIcon />} variant="warning">
  This is a warning callout for cautionary messages.
</Callout>

<Callout title="Error" icon={<ErrorIcon />} variant="error">
  This is an error callout for critical issues.
</Callout>

<Callout title="Info" icon={<InfoIcon />} variant="info">
  This is an info callout for informational messages.
</Callout>

<Callout title="Light" icon={<InfoIcon />} variant="light">
  This is a light callout for subtle messages.
</Callout>

<Callout title="Dark" icon={<InfoIcon />} variant="dark">
  This is a dark callout for high-contrast messages.
</Callout>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">With Actions</h2>
        <p className="u-mb-4">
          Callouts can include action buttons to allow users to respond to the message.
        </p>
        <div className="u-mb-4">
          <Callout 
            title="Update Available" 
            icon={<InfoIcon />}
            variant="info"
            actions={
              <>
                <Button label="Update Now" variant="primary" size="sm" />
                <Button label="Later" variant="outline-primary" size="sm" />
              </>
            }
          >
            A new version is available. Would you like to update now?
          </Callout>
        </div>
        <CodeBlock language="jsx" code={`<Callout 
  title="Update Available" 
  icon={<InfoIcon />}
  variant="info"
  actions={
    <>
      <Button label="Update Now" variant="primary" size="sm" />
      <Button label="Later" variant="outline-primary" size="sm" />
    </>
  }
>
  A new version is available. Would you like to update now?
</Callout>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">Dismissible</h2>
        <p className="u-mb-4">
          Callouts can be dismissible by adding an onClose handler.
        </p>
        <div className="u-mb-4">
          <Callout 
            title="Notification" 
            icon={<InfoIcon />}
            variant="primary"
            onClose={() => alert('Callout closed')}
          >
            This is a dismissible callout that can be closed.
          </Callout>
        </div>
        <CodeBlock language="jsx" code={`<Callout 
  title="Notification" 
  icon={<InfoIcon />}
  variant="primary"
  onClose={() => alert('Callout closed')}
>
  This is a dismissible callout that can be closed.
</Callout>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">One Line</h2>
        <p className="u-mb-4">
          For simple messages, callouts can be displayed in a single line.
        </p>
        <div className="u-mb-4">
          <Callout 
            title="Quick notification" 
            icon={<InfoIcon />}
            variant="info"
            oneLine
          />
        </div>
        <CodeBlock language="jsx" code={`<Callout 
  title="Quick notification" 
  icon={<InfoIcon />}
  variant="info"
  oneLine
/>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">Toast</h2>
        <p className="u-mb-4">
          Callouts can be styled as toast notifications, typically used for temporary messages.
        </p>
        <div className="u-mb-4">
          <Callout 
            title="Toast Notification" 
            icon={<SuccessIcon />}
            variant="success"
            toast
            onClose={() => console.log('Toast closed')}
          >
            This callout is styled as a toast notification.
          </Callout>
        </div>
        <CodeBlock language="jsx" code={`<Callout 
  title="Toast Notification" 
  icon={<SuccessIcon />}
  variant="success"
  toast
  onClose={() => console.log('Toast closed')}
>
  This callout is styled as a toast notification.
</Callout>`} />
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">API Reference</h2>
        <h3 className="u-h3 u-mb-3">Props</h3>
        <table className="u-w-100 u-mb-6">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>The title of the callout</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>The content of the callout</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Icon to display in the callout</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>primary | secondary | success | info | warning | error | light | dark</code></td>
              <td><code>primary</code></td>
              <td>The color variant of the callout</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() => void</code></td>
              <td>-</td>
              <td>Callback when the close button is clicked</td>
            </tr>
            <tr>
              <td><code>actions</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Action buttons to display in the callout</td>
            </tr>
            <tr>
              <td><code>oneLine</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Display the callout in one line</td>
            </tr>
            <tr>
              <td><code>toast</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Display the callout as a toast notification</td>
            </tr>
          </tbody>
        </table>

        <h3 className="u-h3 u-mb-3">CSS Classes</h3>
        <table className="u-w-100">
          <thead>
            <tr>
              <th>Class</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>c-callout</code></td>
              <td>Base class for the callout component</td>
            </tr>
            <tr>
              <td><code>c-callout__content</code></td>
              <td>Container for the callout content</td>
            </tr>
            <tr>
              <td><code>c-callout__icon</code></td>
              <td>Container for the callout icon</td>
            </tr>
            <tr>
              <td><code>c-callout__message</code></td>
              <td>Container for the callout message (title and text)</td>
            </tr>
            <tr>
              <td><code>c-callout__title</code></td>
              <td>Style for the callout title</td>
            </tr>
            <tr>
              <td><code>c-callout__text</code></td>
              <td>Style for the callout text content</td>
            </tr>
            <tr>
              <td><code>c-callout__actions</code></td>
              <td>Container for callout action buttons</td>
            </tr>
            <tr>
              <td><code>c-callout__close-btn</code></td>
              <td>Style for the close button</td>
            </tr>
            <tr>
              <td><code>c-callout--{variant}</code></td>
              <td>Variant-specific styles (primary, success, etc.)</td>
            </tr>
            <tr>
              <td><code>c-callout--oneline</code></td>
              <td>Modifier for one-line callout display</td>
            </tr>
            <tr>
              <td><code>c-callout--toast</code></td>
              <td>Modifier for toast-style callout display</td>
            </tr>
            <tr>
              <td><code>is-hide</code></td>
              <td>State class for hiding the callout</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="u-mb-8">
        <h2 className="u-h2 u-mb-4">Vanilla JavaScript Usage</h2>
        <p className="u-mb-4">
          The callout component can also be used with vanilla JavaScript.
        </p>
        <CodeBlock language="html" code={`<div class="c-callout c-callout--primary">
  <div class="c-callout__icon">
    <!-- Icon SVG here -->
  </div>
  <div class="c-callout__content">
    <div class="c-callout__message">
      <div class="c-callout__title">Information</div>
      <div class="c-callout__text">This is a callout message.</div>
    </div>
  </div>
  <button class="c-callout__close-btn" aria-label="Close">
    <!-- Close icon SVG here -->
  </button>
</div>`} />

        <p className="u-mt-4 u-mb-4">Initialize with JavaScript:</p>
        <CodeBlock language="javascript" code={`// Initialize a single callout
const calloutElement = document.querySelector('.c-callout');
const callout = new Atomix.Callout(calloutElement, {
  onClose: () => console.log('Callout closed')
});

// Initialize all callouts on the page
const callouts = Atomix.Callout.initializeAll();

// Create a toast notification
Atomix.CalloutInteractions.createToast({
  title: 'Success',
  content: 'Your changes have been saved.',
  variant: 'success',
  autoHide: true,
  autoHideDelay: 5000
});`} />
      </section>
    </DocsLayout>
  );
}