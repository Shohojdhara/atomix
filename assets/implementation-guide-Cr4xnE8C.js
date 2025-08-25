import{j as n}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as t}from"./index-DVlM3JHq.js";import"./index-BVDOR7y2.js";function i(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"atomix-implementation-guide",children:"Atomix Implementation Guide"}),`
`,n.jsx(e.p,{children:"Welcome to the Atomix Implementation Guide! This beginner-friendly document will help you integrate and use the Atomix design system in your projects."}),`
`,n.jsx(e.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#introduction",children:"Introduction"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#installation",children:"Installation"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#basic-setup",children:"Basic Setup"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#css-architecture",children:"CSS Architecture"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#using-components",children:"Using Components"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#layout-system",children:"Layout System"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#utility-classes",children:"Utility Classes"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#theming-and-customization",children:"Theming and Customization"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#best-practices",children:"Best Practices"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#troubleshooting",children:"Troubleshooting"})}),`
`]}),`
`,n.jsx(e.h2,{id:"introduction",children:"Introduction"}),`
`,n.jsx(e.p,{children:"Atomix is a modern, component-based design system built with scalability and flexibility in mind. It follows the BEM methodology for CSS naming and uses an ITCSS architecture for organizing styles."}),`
`,n.jsx(e.h3,{id:"key-features",children:"Key Features"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Component-based architecture"}),": Modular and reusable UI components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Responsive by default"}),": Mobile-first approach"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessibility focused"}),": WCAG-compliant components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Customizable"}),": Extensive theming capabilities via CSS variables"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Framework agnostic"}),": Can be used with React or vanilla HTML/CSS/JS"]}),`
`]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.h3,{id:"npmyarn-installation",children:"NPM/Yarn Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# Using npm
npm install @shohojdhara/atomix

# Using yarn
yarn add @shohojdhara/atomix
`})}),`
`,n.jsx(e.h3,{id:"manual-installation",children:"Manual Installation"}),`
`,n.jsx(e.p,{children:"Alternatively, you can download and include the CSS and JavaScript files directly:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<link rel="stylesheet" href="path/to/@shohojdhara/atomix/css/atomix.min.css" />
<script src="path/to/@shohojdhara/atomix/js/atomix.js"><\/script>
`})}),`
`,n.jsx(e.h2,{id:"basic-setup",children:"Basic Setup"}),`
`,n.jsx(e.h3,{id:"react-projects",children:"React Projects"}),`
`,n.jsx(e.p,{children:"For React projects, import the main styles in your entry file:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// In your index.js or App.js
import '@shohojdhara/atomix/css';

// Then import components as needed
import { Button, Card, Avatar } from '@shohojdhara/atomix';
`})}),`
`,n.jsx(e.h3,{id:"htmlcssjs-projects",children:"HTML/CSS/JS Projects"}),`
`,n.jsx(e.p,{children:"For projects without a module bundler, include the CSS and JS files in your HTML:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Atomix Project</title>

    <!-- Atomix CSS -->
    <link rel="stylesheet" href="path/to/@shohojdhara/atomix/css/atomix.min.css" />
  </head>
  <body>
    <!-- Your content here -->

    <!-- Atomix JS (optional, only if using JS components) -->
    <script src="path/to/@shohojdhara/atomix/js/atomix.js"><\/script>

    <!-- Your scripts -->
    <script src="path/to/your-script.js"><\/script>
  </body>
</html>
`})}),`
`,n.jsx(e.h2,{id:"css-architecture",children:"CSS Architecture"}),`
`,n.jsx(e.p,{children:"Atomix follows the ITCSS (Inverted Triangle CSS) methodology combined with BEM (Block Element Modifier) naming conventions."}),`
`,n.jsx(e.h3,{id:"class-naming-conventions",children:"Class Naming Conventions"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Components"}),": ",n.jsx(e.code,{children:".c-component-name"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Elements"}),": ",n.jsx(e.code,{children:".c-component-name__element"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Modifiers"}),": ",n.jsx(e.code,{children:".c-component-name--modifier"})," or ",n.jsx(e.code,{children:".c-component-name__element--modifier"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Utilities"}),": ",n.jsx(e.code,{children:".u-utility-name"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Objects"}),": ",n.jsx(e.code,{children:".o-object-name"})," (layout primitives)"]}),`
`]}),`
`,n.jsx(e.h3,{id:"example",children:"Example"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Button component with primary modifier -->
<button class="c-button c-button--primary">
  Button Text

  <!-- An element within the button -->
  <span class="c-button__icon">
    <!-- Icon content -->
  </span>
</button>
`})}),`
`,n.jsx(e.h2,{id:"using-components",children:"Using Components"}),`
`,n.jsx(e.h3,{id:"react-components",children:"React Components"}),`
`,n.jsx(e.p,{children:"Import and use Atomix components in your React applications:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import React from 'react';
import { Button, Card, Avatar, AvatarGroup } from 'atomix/react';

function MyComponent() {
  return (
    <div>
      {/* Basic Button */}
      <Button variant="primary">Click Me</Button>

      {/* Avatar component */}
      <Avatar src="https://example.com/avatar.jpg" size="md" circle={true} alt="User Avatar" />

      {/* Card component */}
      <Card>
        <Card.Header>Card Title</Card.Header>
        <Card.Body>
          <p>This is a card content.</p>
          <Button variant="secondary">Read More</Button>
        </Card.Body>
        <Card.Footer>Footer information</Card.Footer>
      </Card>

      {/* Avatar Group example */}
      <AvatarGroup max={3}>
        <Avatar src="user1.jpg" size="md" circle={true} />
        <Avatar src="user2.jpg" size="md" circle={true} />
        <Avatar src="user3.jpg" size="md" circle={true} />
        <Avatar src="user4.jpg" size="md" circle={true} />
        <Avatar src="user5.jpg" size="md" circle={true} />
      </AvatarGroup>
    </div>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"htmlcss-components",children:"HTML/CSS Components"}),`
`,n.jsx(e.p,{children:"Use Atomix components directly in your HTML with the appropriate classes:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Button component -->
<button class="c-button c-button--primary">Click Me</button>

<!-- Avatar component -->
<div class="c-avatar c-avatar--md c-avatar--circle">
  <img src="user.jpg" alt="User Avatar" class="c-avatar__image" />
</div>

<!-- Card component -->
<div class="c-card">
  <div class="c-card__header">Card Title</div>
  <div class="c-card__body">
    <p>This is a card content.</p>
    <button class="c-button c-button--secondary">Read More</button>
  </div>
  <div class="c-card__footer">Footer information</div>
</div>

<!-- Avatar Group component -->
<div class="c-avatar-group">
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user1.jpg" alt="User 1" class="c-avatar__image" />
  </div>
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user2.jpg" alt="User 2" class="c-avatar__image" />
  </div>
  <div class="c-avatar c-avatar--md c-avatar--circle">
    <img src="user3.jpg" alt="User 3" class="c-avatar__image" />
  </div>
  <!-- More indicator (shown when max is reached) -->
  <div class="c-avatar c-avatar--md c-avatar--circle c-avatar-group__more">+2</div>
</div>
`})}),`
`,n.jsx(e.h3,{id:"form-components",children:"Form Components"}),`
`,n.jsx(e.p,{children:"Atomix provides various form components for creating accessible forms:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Form Group -->
<div class="c-form-group">
  <label class="c-form-group__label" for="username">Username</label>
  <input type="text" id="username" class="c-input" placeholder="Enter username" />
  <div class="c-form-group__helper">Enter your username or email</div>
</div>

<!-- Radio buttons -->
<div class="c-radio">
  <input type="radio" id="radio1" name="radio-group" class="c-radio__input" />
  <label for="radio1" class="c-radio__label">Option 1</label>
</div>

<!-- Checkbox -->
<div class="c-checkbox">
  <input type="checkbox" id="checkbox1" class="c-checkbox__input" />
  <label for="checkbox1" class="c-checkbox__label">Option 1</label>
</div>

<!-- Textarea -->
<textarea class="c-input c-input--textarea" rows="4" placeholder="Enter your message"></textarea>
`})}),`
`,n.jsx(e.h2,{id:"layout-system",children:"Layout System"}),`
`,n.jsx(e.h3,{id:"grid-system",children:"Grid System"}),`
`,n.jsx(e.p,{children:"Atomix includes a flexible 12-column grid system:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<div class="o-container">
  <div class="o-row">
    <div class="o-col-12 o-col-md-6 o-col-lg-4">
      <!-- Content for first column -->
    </div>
    <div class="o-col-12 o-col-md-6 o-col-lg-4">
      <!-- Content for second column -->
    </div>
    <div class="o-col-12 o-col-md-12 o-col-lg-4">
      <!-- Content for third column -->
    </div>
  </div>
</div>
`})}),`
`,n.jsx(e.p,{children:"Key features:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Responsive breakpoints: ",n.jsx(e.code,{children:"sm"}),", ",n.jsx(e.code,{children:"md"}),", ",n.jsx(e.code,{children:"lg"}),", ",n.jsx(e.code,{children:"xl"})]}),`
`,n.jsx(e.li,{children:"12-column layout"}),`
`,n.jsx(e.li,{children:"Auto-layout options"}),`
`,n.jsx(e.li,{children:"Nesting support"}),`
`,n.jsx(e.li,{children:"Alignment controls"}),`
`]}),`
`,n.jsx(e.h3,{id:"spacing-system",children:"Spacing System"}),`
`,n.jsx(e.p,{children:"Atomix uses a consistent spacing scale:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Margin examples -->
<div class="u-mt-4">Margin top 4 (1rem)</div>
<div class="u-mb-8">Margin bottom 8 (2rem)</div>
<div class="u-mx-6">Margin left and right 6 (1.5rem)</div>

<!-- Padding examples -->
<div class="u-pt-4">Padding top 4 (1rem)</div>
<div class="u-pb-8">Padding bottom 8 (2rem)</div>
<div class="u-px-6">Padding left and right 6 (1.5rem)</div>

<!-- Gap examples for flex/grid layouts -->
<div class="u-d-flex u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
`})}),`
`,n.jsx(e.p,{children:"The spacing scale follows this pattern:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"0"}),": 0"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"1"}),": 0.25rem (4px)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"2"}),": 0.5rem (8px)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"3"}),": 0.75rem (12px)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"4"}),": 1rem (16px)"]}),`
`,n.jsx(e.li,{children:"And so on..."}),`
`]}),`
`,n.jsx(e.h2,{id:"utility-classes",children:"Utility Classes"}),`
`,n.jsx(e.p,{children:"Atomix includes a comprehensive set of utility classes for quick styling without writing custom CSS."}),`
`,n.jsx(e.h3,{id:"display-utilities",children:"Display Utilities"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<div class="u-d-block">Display block</div>
<div class="u-d-flex">Display flex</div>
<div class="u-d-grid">Display grid</div>
<div class="u-d-none u-d-md-block">Hidden on mobile, visible on medium screens and up</div>
`})}),`
`,n.jsx(e.h3,{id:"flex-utilities",children:"Flex Utilities"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Flex container with items aligned and justified -->
<div class="u-d-flex u-justify-content-between u-align-items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>

<!-- Flex column layout with gap -->
<div class="u-d-flex u-flex-column u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex grow/shrink -->
<div class="u-d-flex">
  <div class="u-flex-grow-1">Grows to fill space</div>
  <div class="u-flex-shrink-0">Won't shrink</div>
</div>
`})}),`
`,n.jsx(e.h3,{id:"text-utilities",children:"Text Utilities"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<p class="u-text-center">Centered text</p>
<p class="u-fw-bold">Bold text</p>
<p class="u-fs-4">Font size 4</p>
<p class="u-text-primary">Primary text color</p>
`})}),`
`,n.jsx(e.h3,{id:"spacing-utilities",children:"Spacing Utilities"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<div class="u-p-4">Padding 4 on all sides</div>
<div class="u-m-4">Margin 4 on all sides</div>
`})}),`
`,n.jsx(e.h3,{id:"responsive-utilities",children:"Responsive Utilities"}),`
`,n.jsx(e.p,{children:"Many utilities include responsive variants:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Visible only on medium screens and up -->
<div class="u-d-none u-d-md-block">Shown on medium screens and up</div>

<!-- Different text alignment based on screen size -->
<p class="u-text-center u-text-md-start u-text-lg-end">
  Centered on mobile, left-aligned on medium, right-aligned on large screens
</p>

<!-- Responsive column widths -->
<div class="o-col-12 o-col-md-6 o-col-lg-4">
  Full width on mobile, half width on medium, one-third on large screens
</div>
`})}),`
`,n.jsx(e.h2,{id:"theming-and-customization",children:"Theming and Customization"}),`
`,n.jsx(e.h3,{id:"using-css-variables",children:"Using CSS Variables"}),`
`,n.jsx(e.p,{children:"Atomix uses CSS variables (custom properties) for easy theming:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* In your custom CSS file */
:root {
  /* Primary colors */
  --atomix-primary-color: #3366ff;
  --atomix-primary-hover: #2a52cc;

  /* Border radius */
  --atomix-border-radius: 4px;

  /* Font family */
  --atomix-font-family: 'Montserrat', sans-serif;
}
`})}),`
`,n.jsx(e.h3,{id:"component-specific-customization",children:"Component-Specific Customization"}),`
`,n.jsx(e.p,{children:"You can also customize specific components:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* Custom button styles */
:root {
  --atomix-btn-border-radius: 8px;
  --atomix-btn-padding-x: 1.5rem;
  --atomix-btn-padding-y: 0.75rem;
}

/* Custom card styles */
:root {
  --atomix-card-border-radius: 12px;
  --atomix-card-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
`})}),`
`,n.jsx(e.h3,{id:"dark-mode-support",children:"Dark Mode Support"}),`
`,n.jsx(e.p,{children:"Atomix provides built-in dark mode support:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Toggle between light and dark mode -->
<div class="c-color-mode-toggle">
  <button data-theme-mode="light">Light</button>
  <button data-theme-mode="dark">Dark</button>
</div>
`})}),`
`,n.jsx(e.p,{children:"You can also customize dark mode colors:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`[data-theme='dark'] {
  --atomix-primary-color: #5c8aff;
  --atomix-body-bg: #121212;
  --atomix-body-color: #f8f9fa;
}
`})}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsx(e.h3,{id:"component-patterns",children:"Component Patterns"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Consistent Component Usage"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// Good - using variants consistently
<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>

// Avoid inconsistent naming
<Button type="primary" btnSize="md">Inconsistent Button</Button>
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Composition over Configuration"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// Compose simple components to create complex UIs
<Card>
  <Card.Header>
    <Avatar src="user.jpg" size="sm" />
    <h4>User Profile</h4>
  </Card.Header>
  <Card.Body>{/* Card content */}</Card.Body>
</Card>
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Use Utility Classes for Minor Adjustments"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Button className="u-mt-4 u-mb-2">With spacing adjustments</Button>
<Card className="u-shadow-lg u-border-0">Enhanced card</Card>
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"accessibility",children:"Accessibility"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Always provide alt text for images"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<img src="image.jpg" alt="Descriptive text for the image" />
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Avatar src="user.jpg" alt="User Profile" />
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Use semantic markup when possible"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Button as="a" href="https://example.com">
  Link Button
</Button>
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Ensure sufficient color contrast"})," and don't rely solely on color to convey information."]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Support keyboard navigation"})," by preserving tab order and providing focus styles."]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,n.jsx(e.h3,{id:"common-issues",children:"Common Issues"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Components don't display correctly"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Check if you've imported the CSS file correctly"}),`
`,n.jsx(e.li,{children:"Verify you're using the right class names or component props"}),`
`,n.jsx(e.li,{children:"Check for console errors"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Responsive behavior issues"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Ensure you've added the viewport meta tag"}),`
`,n.jsx(e.li,{children:"Verify you're using the correct responsive utility classes"}),`
`,n.jsx(e.li,{children:"Test on different screen sizes"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Styling conflicts"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Check for CSS specificity issues with existing styles"}),`
`,n.jsx(e.li,{children:"Use Atomix's utility classes instead of custom CSS when possible"}),`
`,n.jsx(e.li,{children:"Consider using CSS modules or scoped styles in complex projects"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"getting-support",children:"Getting Support"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Check the ",n.jsx(e.a,{href:"https://liimonx.github.io/atomix/",rel:"nofollow",children:"Atomix documentation site"})]}),`
`,n.jsx(e.li,{children:"Review component examples in Storybook"}),`
`,n.jsx(e.li,{children:"Open an issue on GitHub for bugs or feature requests"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.p,{children:"This implementation guide provides a foundation for using Atomix in your projects. For more detailed information on specific components, refer to Storybook documentation or the component source code."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{})})]})}function l(s={}){const{wrapper:e}={...t(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{l as default};
