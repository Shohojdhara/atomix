# Atomix CLI Refactor & Development Guideline

This document defines the architectural and implementation standards for the Atomix CLI to ensure long-term maintainability, developer speed, and a premium experience.

## 1. Modular Command Architecture

The CLI follows a **command-based modularity** pattern. All logic must be decoupled from the main entry point.

### Directory Structure
```
scripts/
├── atomix-cli.js          # Entry point (Orchestrator)
└── cli/
    ├── commands/          # Individual command logic [NEW]
    │   ├── build-theme.js
    │   ├── generate.js
    │   └── init.js
    ├── internal/          # Shared internal logic [NEW]
    │   ├── compiler.js
    │   ├── filesystem.js
    │   └── ui-bridge.js
    ├── templates/         # Code generation templates
    └── utils/             # Core utilities (logging, validation)
```

### The Orchestrator Rule
`atomix-cli.js` should ONLY:
1. Initialize `commander`.
2. Register global options/flags.
3. Delegate all action logic to command-specific modules.

---

## 2. Command Implementation Pattern

Each command should be implemented as a standalone module that exports a setup function or a class.

### Recommended Pattern (Action Module)
```javascript
// scripts/cli/commands/build-theme.js
import { logger } from '../utils/logger.js';
import { themeCompiler } from '../internal/compiler.js';

export async function buildThemeAction(themePath, options) {
  const spinner = logger.spinner('Initializing theme build...').start();
  
  try {
    // 1. Validation Logic
    // 2. Business Logic (Delegated)
    await themeCompiler.compile(themePath, options);
    spinner.succeed('Theme built successfully');
  } catch (error) {
    spinner.fail('Build failed');
    handleCLIError(error);
  }
}
```

---

## 3. Error Handling & Professional UX

Premium CLIs provide helpful, actionable feedback. Use the `AtomixCLIError` class for all expected failures.

### Error Object Requirements
- **Message**: Clear, human-readable description.
- **Code**: Unique error code for documentation reference.
- **Suggestions**: An array of 2-3 specific steps the user can take to fix the issue.

### Logging Levels
- `DEBUG`: Internal state changes, path resolutions (hidden by default).
- `INFO`: Normal progress updates.
- `WARN`: Non-fatal issues (e.g., deprecated flags).
- `ERROR`: Fatal failures that stop execution.

---

## 4. Template & Scaffolding Standards

- **Isolation**: Templates must NOT contain any logic. They should be pure string-generator functions.
- **Standardization**: All generated components MUST include:
    - `forwardRef` for React components.
    - `displayName` for devtools.
    - JSDoc comments for all props.
    - Standard ITCSS-compliant SCSS files.

---

## 5. Testing & Validation

### "No Command Without Tests"
Every command or significant utility MUST have a corresponding test file in `scripts/cli/__tests__/`.

### Validation Pipeline
The `atomix validate` command is the gatekeeper. It must be updated whenever:
1. A new component feature is added to the generator.
2. A new architectural rule is introduced.
3. A common bug pattern is identified.

---

## 6. Implementation Checklist for New Features
- [ ] Command registered in `atomix-cli.js`.
- [ ] Logic implemented in `scripts/cli/commands/`.
- [ ] Shared logic extracted to `scripts/cli/internal/` or `utils/`.
- [ ] Error handling uses `AtomixCLIError` with suggestions.
- [ ] Unit tests cover success and failure paths.
- [ ] Mock system calls (`fs`, `process`) in tests.
