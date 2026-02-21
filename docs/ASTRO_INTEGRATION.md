# Astro Integration Guide for @shohojdhara/atomix

This guide covers how to integrate the Atomix design system components into an external [Astro](https://astro.build/) project. Since Atomix provides React components, we will use Astro's React integration to render them.

## Prerequisites

Before starting, ensure you have an existing Astro project. If not, you can create one:

```bash
npm create astro@latest
```

## 1. Install Dependencies

First, you need to add the React integration to your Astro project, as Atomix components are built with React.

```bash
# Add Astro's React integration
npx astro add react
```

Next, install the Atomix package and its required peer dependencies (such as `@phosphor-icons/react`):

```bash
npm install @shohojdhara/atomix @phosphor-icons/react
# or using yarn/pnpm:
# yarn add @shohojdhara/atomix @phosphor-icons/react
# pnpm add @shohojdhara/atomix @phosphor-icons/react
```

## 2. Astro Configuration

When you run `npx astro add react`, your `astro.config.mjs` is automatically updated to include the React integration. Ensure it looks something like this:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

## 3. Global CSS Setup

Atomix requires its global CSS to be imported. You can import this centrally in your main layout file so that the styling is available on all pages.

Open your main layout, usually `src/layouts/Layout.astro`, and add the CSS import in the frontmatter:

```astro
---
// src/layouts/Layout.astro
import '@shohojdhara/atomix/css';

// Optionally, import your own custom global styles if you have overrides
// import '../styles/globals.css';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro + Atomix</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## 4. Using Atomix Components

You can now import and use Atomix components in any `.astro` page or in your `.jsx`/`.tsx` framework components.

### In `.astro` Files

Because Astro renders everything to static HTML by default, interactive components (like Modals, Dropdowns, or anything using React state/hooks) must use a **client directive** (e.g., `client:load`, `client:idle`, or `client:visible`).

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import { Button, Card, Badge } from '@shohojdhara/atomix';
---

<Layout>
  <main class="container">
    <h1>Welcome to Astro with Atomix</h1>

    <Card>
      <h2>Design System Test</h2>
      <Badge variant="success">Setup Complete</Badge>

      <!-- Interactive components need a client directive to hydrate on the browser -->
      <!-- 'client:load' hydrates the component immediately -->
      <Button client:load onClick={() => alert('Atomix works with Astro!')}>
        Click Me
      </Button>
    </Card>
  </main>
</Layout>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
```

### In `.jsx` or `.tsx` Components

If you build cohesive React sections inside your Astro app, you can use Atomix components normally without directives inside those `.tsx` files:

```tsx
// src/components/InteractiveWidget.tsx
import { useState } from 'react';
import { Button, Callout } from '@shohojdhara/atomix';

export default function InteractiveWidget() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(!show)}>Toggle Callout</Button>
      {show && (
        <Callout variant="info" className="mt-4">
          This is a React component managing its own state, powered by Atomix!
        </Callout>
      )}
    </div>
  );
}
```

Then in your `.astro` file, load your widget:

```astro
---
import InteractiveWidget from '../components/InteractiveWidget.tsx';
---

<!-- Hydrate this whole React widget on the client -->
<InteractiveWidget client:visible />
```

## 5. Theming

Astro makes custom theming easy. Simply define your CSS variable overrides in a `<style is:global>` block, or in a global css file you import after the Atomix CSS:

```astro
---
// src/layouts/Layout.astro
import '@shohojdhara/atomix/css';
---
...
<style is:global>
  :root {
    /* Override Atomix primary color */
    --atomix-primary: #8b5cf6; /* Astro Purple */
  }

  /* Force Dark Theme if desired */
  :root {
    color-scheme: dark;
  }
</style>
```

## Troubleshooting

1. **Components are not interactive (clicks don't work):**
   Ensure you added a client directive like `client:load` or `client:visible` when calling the component in Astro (`<Button client:load>...`).
2. **Styles are missing:**
   Verify that you've imported `'@shohojdhara/atomix/css'` in your root layout `Layout.astro`.
3. **Cannot find module '@phosphor-icons/react':**
   Atomix relies on Phosphor icons. Make sure it is installed as a peer dependency.

For further React-focused documentation, such as performance optimizations with tree-shaking, refer to the [Next.js Integration Guide](./NEXTJS_INTEGRATION.md).
