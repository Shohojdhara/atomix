# Atomix CLI Peer Dependencies

> Comprehensive guide to required and recommended dependencies for Atomix CLI integration

## 📋 Required Dependencies

These dependencies are **mandatory** for Atomix CLI to function properly in your project.

### Core Runtime Dependencies

| Package | Minimum Version | Purpose | Installation |
|---------|----------------|---------|--------------|
| **react** | ^18.0.0 | React core library | `npm install react@^18.0.0` |
| **react-dom** | ^18.0.0 | React DOM renderer | `npm install react-dom@^18.0.0` |

### Required Peer Dependencies

| Package | Version | Purpose | Notes |
|---------|---------|---------|-------|
| **@phosphor-icons/react** | ^2.0.0 | Icon library | Used by generated components; minimum 2.0.0 required |

## 🧪 Development Dependencies

These dependencies are required for development workflows and testing.

### Testing Dependencies

```bash
# Essential testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Accessibility testing
npm install --save-dev jest-axe

# Mocking utilities
npm install --save-dev @testing-library/user-event
```

### Storybook Dependencies (Optional)

If you plan to use Storybook with generated components:

```bash
# Core Storybook
npm install --save-dev @storybook/react @storybook/addon-essentials

# Accessibility addon
npm install --save-dev @storybook/addon-a11y

# React integration
npm install --save-dev @storybook/react-vite  # for Vite
# or
npm install --save-dev @storybook/react-webpack5  # for Webpack
```

### Build Tool Dependencies

Depending on your project setup:

```bash
# For SCSS support
npm install --save-dev sass

# For TypeScript (recommended)
npm install --save-dev typescript @types/react @types/react-dom

# For ESLint
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## 📊 Version Compatibility Matrix

### Supported Combinations

| Atomix CLI | React | Node.js | npm | TypeScript |
|------------|-------|---------|-----|------------|
| 0.3.x      | 18.x  | >=18.0  | >=8.0 | >=4.0 |
| 0.2.x      | 17.x  | >=16.0  | >=7.0 | >=3.0 |

### Node.js Version Support

| Node.js Version | Status | Notes |
|-----------------|--------|-------|
| 18.x (LTS) | ✅ Recommended | Latest LTS with full ES modules support |
| 20.x (LTS) | ✅ Supported | Current active LTS |
| 16.x | ⚠️ Deprecated | End-of-life April 2024 |
| <16.x | ❌ Unsupported | Not compatible |

## 🔧 Installation Scripts

### Complete Setup Script

Create a setup script for new projects:

```bash
#!/bin/bash
# setup-atomix.sh

echo "🚀 Setting up Atomix CLI dependencies..."

# Install core dependencies
npm install react@^18.0.0 react-dom@^18.0.0 @phosphor-icons/react@2.1.10

# Install development dependencies
npm install --save-dev \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  vitest \
  jsdom \
  jest-axe \
  sass \
  typescript \
  @types/react \
  @types/react-dom

# Install Storybook (optional)
read -p "Install Storybook? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npm install --save-dev \
    @storybook/react \
    @storybook/addon-essentials \
    @storybook/addon-a11y \
    @storybook/react-vite
fi

echo "✅ Atomix dependencies installed successfully!"
echo "Run 'atomix doctor' to verify your setup."
```

### Package.json Dependencies Section

Add these to your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@phosphor-icons/react": "2.1.10"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^5.16.0",
    "@testing-library/user-event": "^14.0.0",
    "vitest": "^0.34.0",
    "jsdom": "^22.0.0",
    "jest-axe": "^8.0.0",
    "sass": "^1.69.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

## 🚨 Common Dependency Issues

### Issue 1: "Invalid Hook Call" Error

**Problem:** Multiple versions of React in node_modules

**Solution:**
```bash
# Check React versions
npm ls react

# Resolve duplicates
npm dedupe

# Or force single version
npm install react@^18.0.0 react-dom@^18.0.0 --force
```

### Issue 2: Missing Peer Dependencies

**Problem:** Warning about unmet peer dependencies

**Solution:**
```bash
# Install missing peers
npm install react@^18.0.0 react-dom@^18.0.0

# Or use --legacy-peer-deps flag
npm install @shohojdhara/atomix --legacy-peer-deps
```

### Issue 3: TypeScript Compilation Errors

**Problem:** Type definitions not found

**Solution:**
```bash
# Install missing types
npm install --save-dev @types/react @types/react-dom

# Update tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Issue 4: SCSS Import Errors

**Problem:** Generated SCSS files can't be imported

**Solution:**
```bash
# Install Sass compiler
npm install sass

# Verify ITCSS structure exists
mkdir -p src/styles/01-settings src/styles/06-components

# Check import paths in generated components
```

## 🔍 Dependency Validation

### Automated Validation Script

Create `scripts/validate-deps.js`:

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('🔍 Validating Atomix dependencies...\n');

const checks = [
  {
    name: 'Node.js Version',
    command: 'node --version',
    validator: (output) => {
      const version = output.trim().replace('v', '');
      const [major] = version.split('.').map(Number);
      return major >= 18;
    },
    message: 'Node.js >= 18.0.0 required'
  },
  {
    name: 'React Installation',
    command: 'npm ls react',
    validator: (output) => output.includes('react@'),
    message: 'React must be installed'
  },
  {
    name: 'Peer Dependencies',
    command: 'npm ls --depth=0',
    validator: (output) => !output.includes('UNMET PEER DEPENDENCY'),
    message: 'All peer dependencies must be satisfied'
  }
];

let allPassed = true;

checks.forEach(check => {
  try {
    const output = execSync(check.command, { encoding: 'utf8' });
    const passed = check.validator(output);
    
    console.log(`${passed ? '✅' : '❌'} ${check.name}`);
    if (!passed) {
      console.log(`   ${check.message}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${check.name}`);
    console.log(`   ${check.message}`);
    allPassed = false;
  }
});

console.log('\n' + (allPassed ? '🎉 All dependencies validated!' : '⚠️  Some issues detected. Please fix above errors.'));
process.exit(allPassed ? 0 : 1);
```

Add to package.json:
```json
{
  "scripts": {
    "validate:deps": "node scripts/validate-deps.js"
  }
}
```

### Manual Verification Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# List installed dependencies
npm ls

# Check for peer dependency issues
npm ls --depth=0

# Verify React installation
npm ls react react-dom

# Check TypeScript installation
npx tsc --version
```

## 📦 Bundled vs External Dependencies

### What's Bundled
The Atomix CLI bundles these dependencies internally:
- `commander` - CLI argument parsing
- `chalk` - Terminal coloring
- `ora` - Spinner animations
- `boxen` - Box drawing
- `inquirer` - Interactive prompts

### What Remains External
These must be installed in your project:
- `react` and `react-dom` - Core runtime
- Testing libraries - For generated tests
- Build tools - For compilation
- Styling tools - For SCSS processing

## 🔄 Migration from Other Systems

### From Create React App
```bash
# CRA already includes React and ReactDOM
# Just add Atomix dependencies
npm install @shohojdhara/atomix @phosphor-icons/react@2.1.10
npm install --save-dev sass jest-axe
```

### From Next.js
```bash
# Next.js includes React
npm install @shohojdhara/atomix @phosphor-icons/react@2.1.10
npm install --save-dev sass jest-axe @storybook/react-webpack5
```

### From Vite
```bash
# Install everything
npm install react@^18.0.0 react-dom@^18.0.0 @shohojdhara/atomix @phosphor-icons/react@2.1.10
npm install --save-dev sass jest-axe @storybook/react-vite
```

## 💡 Best Practices

### 1. Lock File Management
```bash
# Use package-lock.json for consistency
npm ci  # Clean install from lock file

# Update dependencies safely
npm outdated
npm update  # Minor/patch updates only
```

### 2. Dependency Auditing
```bash
# Regular security audits
npm audit
npm audit fix

# Check for vulnerabilities
npm audit --audit-level high
```

### 3. Version Pinning Strategy
```json
{
  "dependencies": {
    "react": "18.2.0",        // Exact version for stability
    "react-dom": "18.2.0"     // Match React version exactly
  },
  "devDependencies": {
    "@types/react": "^18.0.0", // Caret for compatible updates
    "vitest": "~0.34.0"        // Tilde for patch updates only
  }
}
```

## 🆘 Getting Help

### Dependency Conflicts
If you encounter persistent dependency conflicts:

1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Use legacy peer deps (temporary fix):**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check compatibility:**
   ```bash
   npx check-peer-dependencies
   ```

### Support Resources
- **GitHub Issues**: Report dependency-related bugs
- **Documentation**: [CLI External Setup Guide](./CLI_EXTERNAL_SETUP.md)
- **Community**: Discord server for real-time help
- **Email**: support@atomix.design

---

**Last Updated:** February 7, 2026  
**Atomix CLI Version:** 0.3.14  
**Next Review:** Quarterly dependency updates
