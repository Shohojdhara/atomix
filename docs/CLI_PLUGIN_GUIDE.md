# Atomix CLI Plugin Developer Guide

Welcome to the Atomix CLI Plugin Developer Guide! This document provides everything you need to know to extend the CLI functionality.

## **Overview**

Atomix CLI features a robust plugin system that allows you to hook into various lifecycle events of the CLI. Plugins can modify data before generation, process built assets, and add custom validation rules.

---

## **Getting Started**

A plugin is simply an asynchronous function that receives an `api` object and an optional `options` object.

### **Plugin Structure**

```javascript
/**
 * My Awesome Plugin
 * @param {Object} api - The CLI Plugin API
 * @param {Object} options - Plugin-specific options from atomix.config.ts
 */
export default async function myPlugin(api, options = {}) {
  const { logger, hooks } = api;

  logger.info('Initializing My Awesome Plugin...');

  // Register hooks here
  hooks.register('preGenerate', async (data) => {
    logger.debug(`Processing ${data.name}...`);
    return data;
  });
}
```

---

## **Plugin API**

The `api` object provided to your plugin contains:

- **`logger`**: A standard logger for consistent output.
- **`config`**: The full project configuration from `atomix.config.ts`.
- **`hooks`**: The hook registration system.

---

## **Available Hooks**

### **`preGenerate`**
Runs before any generation task (e.g., `atomix generate`).
- **Input**: Configuration for the generation (name, type, etc.).
- **Output**: Modified configuration.

### **`onValidate`**
Runs during validation audits (`atomix validate` or `atomix generate --validate`).
- **Input**: A report object `{ valid: boolean, issues: string[] }`.
- **Output**: Modified report object.

### **`postBuild`**
Runs after a build or generation task completes.
- **Input**: An array of file paths for the built/generated assets.
- **Output**: Modified array of assets (or just perform side effects like uploading).

---

## **Registration**

To use your plugin, add it to the `plugins` array in `atomix.config.ts`:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  plugins: [
    {
      name: 'my-plugin-package', // npm package name or local path
      options: {
        feature: true
      }
    },
    './local-plugin.js' // simple registration
  ]
});
```

---

## **Example: Style Dictionary Plugin**

Check out the [Style Dictionary Plugin example](atomix/scripts/cli/plugins/style-dictionary.js) for a real-world implementation.
