# Accordion Component

The Accordion component creates collapsible content sections that help organize information in a space-efficient way. Users can expand and collapse sections to reveal or hide content, making it perfect for FAQs, settings panels, and content organization.

## Overview

Accordions are essential for managing content density and improving user experience by allowing users to focus on relevant information. The Atomix Accordion component provides smooth animations, keyboard navigation, and flexible content support.

## Props API

### AccordionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Accordion header title |
| `children` | `ReactNode` | **required** | Content to show when expanded |
| `defaultOpen` | `boolean` | `false` | Initially open state |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Position of expand/collapse icon |
| `icon` | `ReactNode` | `undefined` | Custom expand/collapse icon |
| `disabled` | `boolean` | `false` | Disable accordion interaction |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the accordion |

## Usage Examples

### Basic Accordion

```jsx
import React from 'react';
import { Accordion } from '@shohojdhara/atomix';

function BasicAccordion() {
  return (
    <div className="u-gap-4">
      <Accordion title="What is Atomix?">
        <p>
          Atomix is a modern design system that provides a comprehensive set of 
          React and vanilla JavaScript components for building user interfaces.
        </p>
      </Accordion>

      <Accordion title="How do I get started?" defaultOpen>
        <div className="u-gap-3">
          <p>Getting started with Atomix is easy:</p>
          <ol className="u-list-decimal u-list-inside u-gap-1">
            <li>Install the package: <code>npm install @shohojdhara/atomix</code></li>
            <li>Import the CSS: <code>import '@shohojdhara/atomix/css'</code></li>
            <li>Start using components in your React app</li>
          </ol>
        </div>
      </Accordion>

      <Accordion title="Is it accessible?">
        <p>
          Yes! All Atomix components are built with accessibility in mind, 
          including proper ARIA attributes, keyboard navigation, and screen reader support.
        </p>
      </Accordion>
    </div>
  );
}
```

### FAQ Section

```jsx
function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: "What browsers are supported?",
      answer: "Atomix supports all modern browsers including Chrome 60+, Firefox 60+, Safari 12+, and Edge 79+."
    },
    {
      id: 2,
      question: "Can I customize the theme?",
      answer: "Absolutely! Atomix provides a flexible theme system using CSS custom properties that allows you to customize colors, spacing, and other design tokens."
    },
    {
      id: 3,
      question: "Is TypeScript supported?",
      answer: "Yes, Atomix is built with TypeScript and includes comprehensive type definitions for all components and their props."
    },
    {
      id: 4,
      question: "How do I report bugs?",
      answer: "You can report bugs by creating an issue on our GitHub repository. Please include as much detail as possible to help us reproduce and fix the issue."
    }
  ];

  return (
    <div className="u-mw-100 u-mx-auto">
      <h2 className="u-text-2 u-font-bold u-mb-6">Frequently Asked Questions</h2>
      <div className="u-gap-2">
        {faqs.map((faq) => (
          <Accordion key={faq.id} title={faq.question}>
            <p>{faq.answer}</p>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
```

### Settings Panel

```jsx
import { FormGroup, Input, Select, Checkbox, Button } from '@shohojdhara/atomix';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
    language: 'en'
  });

  return (
    <div className="u-mw-100 u-mx-auto u-gap-4">
      <h2 className="u-text-xl u-font-semibold u-mb-4">Settings</h2>
      
      <Accordion title="Account Settings" defaultOpen>
        <div className="u-gap-4">
          <FormGroup label="Display Name">
            <Input placeholder="Enter your display name" />
          </FormGroup>
          
          <FormGroup label="Email">
            <Input type="email" placeholder="your@email.com" />
          </FormGroup>
          
          <Button label="Save Changes" variant="primary" size="sm" />
        </div>
      </Accordion>

      <Accordion title="Preferences">
        <div className="u-gap-4">
          <FormGroup label="Theme">
            <Select 
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'auto', label: 'Auto' }
              ]}
              value={settings.theme}
              onChange={(e) => setSettings(prev => ({
                ...prev, 
                theme: e.target.value
              }))}
            />
          </FormGroup>
          
          <FormGroup label="Language">
            <Select 
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' }
              ]}
              value={settings.language}
              onChange={(e) => setSettings(prev => ({
                ...prev, 
                language: e.target.value
              }))}
            />
          </FormGroup>
        </div>
      </Accordion>

      <Accordion title="Notifications">
        <div className="u-gap-3">
          <Checkbox 
            label="Email notifications"
            checked={settings.notifications}
            onChange={(e) => setSettings(prev => ({
              ...prev, 
              notifications: e.target.checked
            }))}
          />
          <Checkbox label="Push notifications" />
          <Checkbox label="SMS notifications" />
        </div>
      </Accordion>
    </div>
  );
}
```

### Custom Icon Accordion

```jsx
function CustomIconAccordion() {
  return (
    <div className="u-gap-4">
      <Accordion 
        title="User Profile" 
        icon={<Icon name="User" />}
        iconPosition="left"
      >
        <div className="u-flex u-items-center u-gap-4">
          <Avatar src="/user-avatar.jpg" size="lg" circle />
          <div>
            <h3 className="u-font-semibold">John Doe</h3>
            <p className="u-text-secondary">Software Engineer</p>
            <p className="u-text-sm u-text-secondary">Last seen 2 hours ago</p>
          </div>
        </div>
      </Accordion>

      <Accordion 
        title="Security Settings" 
        icon={<Icon name="Shield" />}
        iconPosition="left"
      >
        <div className="u-gap-3">
          <div className="u-flex u-justify-between u-items-center">
            <span>Two-factor authentication</span>
            <Badge label="Enabled" variant="success" />
          </div>
          <div className="u-flex u-justify-between u-items-center">
            <span>Login alerts</span>
            <Toggle checked />
          </div>
          <Button label="Change Password" variant="outline-primary" size="sm" />
        </div>
      </Accordion>

      <Accordion 
        title="Billing Information" 
        icon={<Icon name="CreditCard" />}
        iconPosition="left"
      >
        <div className="u-gap-3">
          <div className="u-p-3 u-bg-light u-rounded">
            <div className="u-flex u-justify-between">
              <span>Current Plan</span>
              <span className="u-font-semibold">Pro Plan</span>
            </div>
            <div className="u-flex u-justify-between">
              <span>Next billing</span>
              <span>March 15, 2024</span>
            </div>
          </div>
          <Button label="Manage Billing" variant="primary" size="sm" />
        </div>
      </Accordion>
    </div>
  );
}
```

### Controlled Accordion Group

```jsx
function ControlledAccordionGroup() {
  const [openAccordion, setOpenAccordion] = useState('general');

  const sections = [
    {
      id: 'general',
      title: 'General Information',
      content: (
        <div className="u-gap-3">
          <FormGroup label="Company Name">
            <Input placeholder="Enter company name" />
          </FormGroup>
          <FormGroup label="Industry">
            <Select 
              options={[
                { value: 'tech', label: 'Technology' },
                { value: 'finance', label: 'Finance' },
                { value: 'healthcare', label: 'Healthcare' }
              ]}
              placeholder="Select industry"
            />
          </FormGroup>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Details',
      content: (
        <div className="u-gap-3">
          <FormGroup label="Email">
            <Input type="email" placeholder="company@example.com" />
          </FormGroup>
          <FormGroup label="Phone">
            <Input type="tel" placeholder="+1 (555) 123-4567" />
          </FormGroup>
        </div>
      )
    },
    {
      id: 'preferences',
      title: 'Preferences',
      content: (
        <div className="u-gap-3">
          <Checkbox label="Receive marketing emails" />
          <Checkbox label="Enable notifications" />
          <Checkbox label="Share usage analytics" />
        </div>
      )
    }
  ];

  return (
    <div className="u-mw-100 u-mx-auto">
      <h2 className="u-text-xl u-font-semibold u-mb-4">Company Setup</h2>
      <div className="u-gap-2">
        {sections.map((section) => (
          <Accordion
            key={section.id}
            title={section.title}
            defaultOpen={openAccordion === section.id}
            onClick={() => setOpenAccordion(
              openAccordion === section.id ? null : section.id
            )}
          >
            {section.content}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
```

### Nested Accordions

```jsx
function NestedAccordions() {
  return (
    <div className="u-gap-4">
      <Accordion title="Frontend Development">
        <div className="u-gap-2">
          <Accordion title="React">
            <p>A JavaScript library for building user interfaces.</p>
            <ul className="u-list-disc u-list-inside u-mt-2 u-gap-1">
              <li>Component-based architecture</li>
              <li>Virtual DOM</li>
              <li>Hooks for state management</li>
            </ul>
          </Accordion>
          
          <Accordion title="Vue.js">
            <p>The Progressive JavaScript Framework.</p>
            <ul className="u-list-disc u-list-inside u-mt-2 u-gap-1">
              <li>Template-based syntax</li>
              <li>Reactive data binding</li>
              <li>Component composition</li>
            </ul>
          </Accordion>
        </div>
      </Accordion>

      <Accordion title="Backend Development">
        <div className="u-gap-2">
          <Accordion title="Node.js">
            <p>JavaScript runtime built on Chrome's V8 JavaScript engine.</p>
          </Accordion>
          
          <Accordion title="Python">
            <p>High-level programming language with simple syntax.</p>
          </Accordion>
        </div>
      </Accordion>
    </div>
  );
}
```

## Vanilla JavaScript Usage

```
// Basic accordion
const accordion = new Atomix.Accordion('.my-accordion', {
  title: 'Accordion Title',
  defaultOpen: false,
  iconPosition: 'right',
  onToggle: (isOpen) => {
    console.log('Accordion toggled:', isOpen);
  }
});

// Open/close programmatically
accordion.open();
accordion.close();
accordion.toggle();

// Initialize from data attributes
Atomix.Accordion.initFromDataAttributes();
```

### HTML with Data Attributes

```
<!-- Basic accordion -->
<div 
  class="c-accordion" 
  data-atomix="accordion"
  data-title="Accordion Title"
  data-default-open="false">
  
  <button class="c-accordion__header">
    <span class="c-accordion__title">Accordion Title</span>
    <span class="c-accordion__icon">
      <i class="ph ph-caret-down"></i>
    </span>
  </button>
  
  <div class="c-accordion__panel">
    <div class="c-accordion__content">
      <p>Accordion content goes here.</p>
    </div>
  </div>
</div>

<!-- Accordion with custom icon -->
<div 
  class="c-accordion" 
  data-atomix="accordion"
  data-icon-position="left">
  
  <button class="c-accordion__header">
    <span class="c-accordion__icon">
      <i class="ph ph-user"></i>
    </span>
    <span class="c-accordion__title">User Settings</span>
  </button>
  
  <div class="c-accordion__panel">
    <div class="c-accordion__content">
      <!-- Content -->
    </div>
  </div>
</div>
```

## Styling

### CSS Classes

```
/* Base accordion */
.c-accordion {
  /* Accordion container */
}

/* Header */
.c-accordion__header {
  /* Clickable header */
}

.c-accordion__title {
  /* Title text */
}

.c-accordion__icon {
  /* Expand/collapse icon */
}

/* Panel */
.c-accordion__panel {
  /* Content panel */
}

.c-accordion__content {
  /* Inner content wrapper */
}

/* State modifiers */
.c-accordion--open { /* Open state */ }
.c-accordion--disabled { /* Disabled state */ }

/* Icon position modifiers */
.c-accordion--icon-left { /* Icon on left */ }
.c-accordion--icon-right { /* Icon on right */ }
```

### Custom Styling

```
/* Custom accordion variant */
.c-accordion--bordered {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.c-accordion--bordered .c-accordion__header {
  border-bottom: 1px solid var(--color-border);
}

/* Smooth animations */
.c-accordion__panel {
  overflow: hidden;
  transition: height 0.3s ease;
}

.c-accordion__icon {
  transition: transform 0.3s ease;
}

.c-accordion--open .c-accordion__icon {
  transform: rotate(180deg);
}

/* Custom colors */
.c-accordion--primary .c-accordion__header {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
}

.c-accordion--primary.c-accordion--open .c-accordion__header {
  background-color: var(--color-primary);
  color: white;
}
```

## Accessibility

### ARIA Attributes

- `role="button"` - Identifies header as button
- `aria-expanded` - Indicates open/closed state
- `aria-controls` - Links header to content panel
- `aria-labelledby` - Links content to header
- `tabindex="0"` - Makes header keyboard focusable

### Keyboard Navigation

- **Enter/Space** - Toggle accordion open/closed
- **Tab** - Move focus to next accordion
- **Shift+Tab** - Move focus to previous accordion

### Screen Reader Support

- Accordion state is announced when toggled
- Content is properly associated with headers
- Keyboard navigation is fully supported
- Focus management is handled automatically

## Glass Effect

Accordion supports the glass morphism effect for modern, translucent UI designs.

### Basic Glass Effect

```jsx
function GlassAccordion() {
  return (
    <Accordion
      title="Glass Accordion"
      glass={true}
    >
      <p>This accordion has a glass morphism effect applied.</p>
    </Accordion>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassAccordion() {
  return (
    <Accordion
      title="Custom Glass Accordion"
      glass={{
        blurAmount: 18,
        saturation: 190,
        cornerRadius: 12,
        displacementScale: 55,
      }}
    >
      <p>Accordion with custom glass settings.</p>
    </Accordion>
  );
}
```

### Glass Accordion Group

```jsx
function GlassAccordionGroup() {
  return (
    <div className="u-gap-3">
      <Accordion title="First Section" glass={true}>
        <p>First section content with glass effect.</p>
      </Accordion>
      <Accordion title="Second Section" glass={true}>
        <p>Second section content with glass effect.</p>
      </Accordion>
      <Accordion title="Third Section" glass={true}>
        <p>Third section content with glass effect.</p>
      </Accordion>
    </div>
  );
}
```

## Best Practices

### Do's ✅

- Use clear, descriptive titles
- Keep content organized and scannable
- Provide visual feedback for interactions
- Use consistent accordion styling
- Consider default open states for important content

```jsx
// Good: Clear structure and meaningful content
<Accordion title="Account Security Settings">
  <div className="u-gap-4">
    <div className="u-flex u-justify-between u-items-center">
      <span>Two-factor authentication</span>
      <Badge label="Enabled" variant="success" />
    </div>
    <Button label="Change Password" variant="outline-primary" />
  </div>
</Accordion>
```

### Don'ts ❌

- Don't put too much content in a single accordion
- Don't use accordions for primary navigation
- Don't forget to handle keyboard interactions
- Don't make accordion headers too small

``jsx
// Bad: Too much content, unclear purpose
<Accordion title="Everything">
  <div>
    {/* Hundreds of lines of content */}
  </div>
</Accordion>
```

## Common Patterns

### Product Features

``jsx
function ProductFeatures() {
  const features = [
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your application performance with real-time analytics and reporting.",
      benefits: ["Real-time monitoring", "Custom dashboards", "Export capabilities"]
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with built-in collaboration tools and shared workspaces.",
      benefits: ["Shared workspaces", "Real-time editing", "Comment system"]
    }
  ];

  return (
    <div className="u-gap-4">
      {features.map((feature, index) => (
        <Accordion key={index} title={feature.title}>
          <div className="u-gap-3">
            <p>{feature.description}</p>
            <ul className="u-list-disc u-list-inside u-gap-1">
              {feature.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        </Accordion>
      ))}
    </div>
  );
}
```

### Help Documentation

``jsx
function HelpDocumentation() {
  return (
    <div className="u-mw-100 u-mx-auto">
      <h1 className="u-text-1 u-font-bold u-mb-8">Help Center</h1>

      <div className="u-gap-6">
        <section>
          <h2 className="u-text-xl u-font-semibold u-mb-4">Getting Started</h2>
          <div className="u-gap-2">
            <Accordion title="How to create an account">
              <div className="u-prose">
                <p>Creating an account is simple:</p>
                <ol>
                  <li>Click the "Sign Up" button</li>
                  <li>Fill in your details</li>
                  <li>Verify your email</li>
                  <li>Start using the platform</li>
                </ol>
              </div>
            </Accordion>
            
            <Accordion title="Setting up your profile">
              <p>Complete your profile to get the most out of our platform...</p>
            </Accordion>
          </div>
        </section>

        <section>
          <h2 className="u-text-xl u-font-semibold u-mb-4">Troubleshooting</h2>
          <div className="u-gap-2">
            <Accordion title="I can't log in">
              <p>If you're having trouble logging in, try these steps...</p>
            </Accordion>
            
            <Accordion title="My data isn't syncing">
              <p>Data sync issues can be resolved by...</p>
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
```

## Related Components

- **Card** - Alternative content containers
- **Tab** - Alternative content organization
- **Modal** - For more complex interactions
- **Dropdown** - For menu-style content
- **Collapsible** - Simpler collapse functionality

## Performance Considerations

- Use lazy loading for heavy accordion content
- Implement virtualization for many accordions
- Consider using React.memo for accordion items
- Optimize animations for smooth performance

``jsx
// Lazy loading accordion content
const LazyAccordionContent = React.lazy(() => import('./AccordionContent'));

function LazyAccordion({ title }) {
  return (
    <Accordion title={title}>
      <Suspense fallback={<Spinner size="sm" />}>
        <LazyAccordionContent />
      </Suspense>
    </Accordion>
  );
}
```

## Browser Support

The Accordion component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Animations and transitions work across all supported browsers.
