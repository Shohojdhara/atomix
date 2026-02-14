# Atomix CLI for External Projects

> Complete guide for integrating Atomix CLI into your existing projects

## 🎯 Overview

The Atomix CLI can be used in any React project to generate components that follow the Atomix Design System principles. This guide covers installation, setup, and best practices for external usage.

## 📋 Prerequisites

Before installing the Atomix CLI, ensure your environment meets these requirements:

### System Requirements
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 or **yarn**: >= 1.22.0
- **Operating System**: Windows, macOS, or Linux

### Project Requirements
Your project should have:
- React >= 18.0.0
- TypeScript (recommended but optional)
- SCSS/Sass support (for styling)

## 🚀 Installation

### Option 1: Global Installation (Recommended for Teams)

Install globally to use across multiple projects:

```bash
# Using npm
npm install -g @shohojdhara/atomix

# Using yarn
yarn global add @shohojdhara/atomix

# Verify installation
atomix --version
```

**Benefits:**
- Single installation for all projects
- Consistent version across team
- Faster subsequent usage

### Option 2: Project-Level Installation

Install as a development dependency in your specific project:

```bash
# Using npm
npm install @shohojdhara/atomix --save-dev

# Using yarn
yarn add @shohojdhara/atomix --dev

# Verify installation
npx atomix --version
```

**Benefits:**
- Project-specific version control
- No global dependency conflicts
- Better CI/CD integration

## 🏗️ Project Structure Setup

### Required Directory Structure

Your project should follow this structure for optimal CLI integration:

```
my-project/
├── public/
├── src/
│   ├── components/          # Generated components will go here
│   │   └── index.ts         # Barrel export file
│   ├── lib/
│   │   ├── composables/     # Generated hooks
│   │   ├── constants/       # Component constants
│   │   └── types/           # Type definitions
│   ├── styles/
│   │   ├── 01-settings/     # Component settings
│   │   ├── 06-components/   # Component styles
│   │   └── index.scss       # Main SCSS entry
│   └── App.tsx
├── stories/                 # Storybook stories (optional)
├── tests/                   # Test files (optional)
├── package.json
├── tsconfig.json
├── atomix.config.ts         # Atomix configuration (optional)
└── README.md
```

### Creating Required Directories

If directories don't exist, create them:

```bash
mkdir -p src/components
mkdir -p src/lib/composables
mkdir -p src/lib/constants
mkdir -p src/lib/types
mkdir -p src/styles/01-settings
mkdir -p src/styles/06-components
mkdir -p stories
mkdir -p tests
```

## ⚙️ Configuration

### Basic Configuration

Create `atomix.config.ts` in your project root:

```typescript
import type { AtomixConfig } from '@shohojdhara/atomix';

const config: AtomixConfig = {
  // Component generation settings
  components: {
    outputPath: './src/components',
    includeTests: true,
    includeStories: true,
    includeStyles: true,
    includeHooks: true
  },
  
  // Style settings
  styles: {
    outputDir: './src/styles',
    architecture: 'itcss', // or 'css-modules'
    includeSourceMaps: true
  },
  
  // Testing settings
  testing: {
    framework: 'vitest',
    includeAccessibility: true
  }
};

export default config;
```

### Package.json Scripts

Add helpful scripts to your `package.json`:

```json
{
  "scripts": {
    "atomix:component": "atomix generate component",
    "atomix:validate": "atomix validate",
    "atomix:doctor": "atomix doctor",
    "test:components": "vitest src/components",
    "storybook": "storybook dev -p 6006"
  }
}
```

## 🎨 First Component Generation

### Interactive Mode (Recommended)

```bash
atomix generate component
```

This will guide you through:
1. Component name
2. Complexity level (simple/medium/complex)
3. Feature selection
4. Output location

### Command Line Mode

```bash
# Generate a simple button component
atomix generate component Button --complexity simple

# Generate with specific features
atomix generate component Modal --complexity complex --features typescript,storybook,tests,accessibility

# Specify custom output path
atomix generate component Card --output ./src/ui/components
```

### Generated Files Structure

For a component named `Button`, the CLI generates:

```
src/components/Button/
├── Button.tsx              # Main component
├── Button.stories.tsx      # Storybook stories
├── Button.test.tsx         # Unit tests
├── index.ts                # Barrel export
└── README.md               # Component documentation

src/lib/composables/
└── useButton.ts            # Custom hook (if enabled)

src/styles/01-settings/
└── _settings.button.scss   # Component variables

src/styles/06-components/
└── _components.button.scss # Component styles
```

## 🔧 Integration with Existing Projects

### React Project Integration

#### 1. Install Peer Dependencies

```bash
# Core dependencies
npm install react@^18.0.0 react-dom@^18.0.0

# Optional but recommended
npm install @phosphor-icons/react@2.1.10
npm install @testing-library/react vitest --save-dev
```

#### 2. Configure TypeScript (if using)

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*",
    "stories/**/*"
  ]
}
```

#### 3. Set Up SCSS Compilation

If using Create React App:

```bash
npm install sass
```

For custom setups, configure your build tool to process SCSS files.

### Next.js Integration

#### 1. Install Dependencies

```bash
npm install @shohojdhara/atomix
npm install sass
```

#### 2. Configure next.config.js

```javascript
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};
```

#### 3. Import Styles

In your `_app.tsx` or `layout.tsx`:

```typescript
import '@shohojdhara/atomix/styles';
import '../src/styles/index.scss'; // Your custom styles
```

### Vite Integration

#### 1. Install Dependencies

```bash
npm install @shohojdhara/atomix
npm install sass
```

#### 2. Configure vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/01-settings/index";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

## 🧪 Testing Setup

### Vitest Configuration

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}']
  }
});
```

### Test Setup File

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

## 📚 Storybook Integration

### Installation

```bash
npx storybook init
npm install @storybook/addon-a11y
```

### Configuration

Update `.storybook/main.ts`:

```typescript
export default {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ]
};
```

## 🔍 Validation and Troubleshooting

### System Check

Run the doctor command to verify your setup:

```bash
atomix doctor
```

This checks:
- Node.js version compatibility
- Required dependencies
- Project structure
- Configuration files

### Common Issues

#### Issue: "Command not found"
**Solution:** 
- For global installation: Ensure npm global bin is in PATH
- For project installation: Use `npx atomix` instead

#### Issue: "Missing peer dependencies"
**Solution:** Install required peer dependencies:
```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

#### Issue: "SCSS compilation failed"
**Solution:** 
- Install sass: `npm install sass`
- Check import paths in generated SCSS files
- Verify ITCSS directory structure exists

#### Issue: Theme subcommands fail (`atomix theme validate`, `list`, `inspect`, etc.)
Theme subcommands run the TypeScript theme devtools CLI and require **ts-node** in the project.

**Solution:**
```bash
npm install --save-dev ts-node
```
Run `atomix doctor` to confirm "Theme Devtools" is available. If you cannot install ts-node, use the other CLI commands (generate, build-theme, tokens, validate, migrate, init); theme-specific commands will not run.

### Debugging Generated Components

Enable verbose logging:

```bash
DEBUG=atomix:* atomix generate component Button
```

## 🚀 Best Practices

### 1. Component Organization

```
src/components/
├── atoms/          # Buttons, inputs, badges
├── molecules/      # Form groups, cards
├── organisms/      # Headers, footers, layouts
└── templates/      # Page templates
```

### 2. Naming Conventions

- Use PascalCase for component names: `UserProfile`
- Use kebab-case for file names: `user-profile`
- Prefix hooks with `use`: `useUserProfile`

### 3. Style Management

- Always generate SCSS files with components
- Use CSS custom properties for theming
- Follow ITCSS architecture
- Keep component-specific variables in settings files

### 4. Testing Strategy

- Generate tests with every component
- Include accessibility testing
- Test key user interactions
- Validate prop combinations

## 🆘 Getting Help

### Documentation
- [Main Documentation](./README.md)
- [API Reference](./CLI_API_REFERENCE.md)
- [Migration Guide](./CLI_MIGRATION_GUIDE.md)

### Community Support
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our developer community
- **Stack Overflow**: Tag questions with `atomix-design-system`

### Professional Support
- Email: support@atomix.design
- Enterprise support plans available

---

**Last Updated:** February 7, 2026  
**Atomix CLI Version:** 0.3.14  
**Compatible React Versions:** 18.x
