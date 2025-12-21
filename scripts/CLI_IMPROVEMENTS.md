# Atomix CLI Improvements

## Overview

This document outlines comprehensive improvements to the Atomix CLI system, integrating the new theme devtools CLI with the existing main CLI and adding enhanced features.

## Current State

### Two Separate CLIs

1. **`scripts/atomix-cli.js`** - Main CLI (JavaScript)
   - Component generation
   - Theme building (SCSS compilation)
   - Migration tools (Tailwind, Bootstrap, SCSS variables)
   - Token management
   - Validation
   - Interactive init wizard

2. **`src/lib/theme/devtools/CLI.ts`** - Theme CLI (TypeScript)
   - Theme validation
   - Theme listing
   - Theme inspection
   - Theme comparison
   - Theme export

### Issues

1. **Duplication**: Both CLIs have overlapping functionality (validation, theme listing)
2. **Inconsistency**: Different command structures and output formats
3. **No Integration**: The main CLI doesn't use the theme devtools
4. **Limited Features**: Missing advanced theme operations
5. **No TypeScript Support**: Main CLI is pure JavaScript
6. **Outdated Patterns**: Some commands use old patterns

## Proposed Improvements

### 1. Unified CLI Architecture

**Goal**: Create a single, cohesive CLI that leverages both the main CLI and theme devtools.

**Structure**:
```
atomix
├── generate (g)           # Component/token generation
├── build                  # Theme building
├── dev                    # Development mode
├── theme                  # Theme management (NEW - integrated)
│   ├── validate           # Validate theme config
│   ├── list (ls)          # List themes
│   ├── inspect            # Inspect theme
│   ├── compare            # Compare themes
│   ├── export             # Export theme
│   ├── create             # Create new theme
│   ├── preview            # Preview theme in browser
│   └── test               # Test theme
├── tokens                 # Token management
├── migrate                # Migration tools
├── validate               # General validation
├── init                   # Interactive setup
├── doctor                 # Diagnostics
└── help                   # Help system
```

### 2. Enhanced Theme Commands

#### 2.1 Theme Create Command
```bash
atomix theme create <name> [options]
  --type <css|js>          # Theme type
  --template <name>        # Use template
  --interactive            # Interactive mode
  --output <path>          # Output directory
```

**Features**:
- Interactive wizard for theme creation
- Template selection (dark, light, high-contrast, etc.)
- Automatic file generation
- Integration with theme config

#### 2.2 Theme Preview Command
```bash
atomix theme preview <name> [options]
  --port <number>          # Server port
  --open                   # Open in browser
  --components <list>      # Components to preview
```

**Features**:
- Start dev server with theme applied
- Live reload on changes
- Component showcase
- Side-by-side comparison

#### 2.3 Theme Test Command
```bash
atomix theme test <name> [options]
  --a11y                   # Accessibility tests
  --contrast               # Contrast ratio tests
  --browser <name>         # Browser testing
```

**Features**:
- Automated accessibility testing
- Color contrast validation
- Cross-browser compatibility checks
- Visual regression testing

### 3. Improved Component Generation

#### 3.1 Enhanced Templates
- Add CSS Modules support (already exists but improve)
- Add design system integration
- Add accessibility features by default
- Add responsive design patterns

#### 3.2 Component Variants
```bash
atomix generate component <name> [options]
  --variant <type>         # Component variant (form, data, navigation, etc.)
  --with-tests             # Include test files
  --with-story             # Include Storybook story
  --with-docs              # Include documentation
  --interactive            # Interactive mode
```

### 4. Advanced Token Management

#### 4.1 Token Sync
```bash
atomix tokens sync [options]
  --from <source>          # Sync from (figma, sketch, etc.)
  --to <target>            # Sync to (scss, css, js)
  --watch                  # Watch for changes
```

#### 4.2 Token Diff
```bash
atomix tokens diff <file1> <file2>
  --format <format>        # Output format
  --show-values            # Show value differences
```

### 5. Development Experience

#### 5.1 Watch Mode Improvements
- Better error handling
- Faster rebuilds
- Clear console output
- Build notifications

#### 5.2 Debug Mode
```bash
atomix <command> --debug
  # Shows:
  # - Detailed execution steps
  # - File operations
  # - Performance metrics
  # - Error stack traces
```

### 6. Integration Features

#### 6.1 Framework Integration
```bash
atomix integrate <framework> [options]
  # Supported: react, vue, angular, svelte, next, nuxt
  --typescript             # Use TypeScript
  --setup-theme            # Setup theme system
  --add-examples           # Add example components
```

#### 6.2 CI/CD Support
```bash
atomix ci [options]
  --validate               # Validate all
  --build                  # Build themes
  --test                   # Run tests
  --report <path>          # Generate report
```

### 7. Documentation Generation

```bash
atomix docs [options]
  --components             # Generate component docs
  --tokens                 # Generate token docs
  --themes                 # Generate theme docs
  --output <path>          # Output directory
  --format <md|html|json>  # Output format
```

### 8. Quality Improvements

#### 8.1 Better Error Messages
- Clear error descriptions
- Actionable suggestions
- Related documentation links
- Common fix examples

#### 8.2 Progress Indicators
- Spinner for long operations
- Progress bars for batch operations
- Time estimates
- Success/failure summaries

#### 8.3 Validation Enhancements
- Comprehensive checks
- Auto-fix capabilities
- Severity levels (error, warning, info)
- Custom rule support

### 9. Configuration Management

#### 9.1 Config Commands
```bash
atomix config <action> [options]
  get <key>                # Get config value
  set <key> <value>        # Set config value
  list                     # List all config
  reset                    # Reset to defaults
  validate                 # Validate config
```

#### 9.2 Profile Support
```bash
atomix config profile <action> [name]
  create <name>            # Create profile
  switch <name>            # Switch profile
  list                     # List profiles
  delete <name>            # Delete profile
```

### 10. Plugin System

```bash
atomix plugin <action> [name]
  install <name>           # Install plugin
  uninstall <name>         # Uninstall plugin
  list                     # List plugins
  search <query>           # Search plugins
```

## Implementation Plan

### Phase 1: Core Integration (Priority: HIGH)
1. ✅ Create unified command structure
2. ✅ Integrate theme devtools CLI
3. ✅ Standardize output formatting
4. ✅ Improve error handling

### Phase 2: Enhanced Features (Priority: MEDIUM)
1. Add theme create command
2. Add theme preview command
3. Add theme test command
4. Improve component generation
5. Add token sync

### Phase 3: Developer Experience (Priority: MEDIUM)
1. Improve watch mode
2. Add debug mode
3. Better progress indicators
4. Enhanced documentation

### Phase 4: Advanced Features (Priority: LOW)
1. Framework integration
2. CI/CD support
3. Documentation generation
4. Plugin system

## Technical Considerations

### TypeScript Migration
- Gradually migrate main CLI to TypeScript
- Maintain backward compatibility
- Use shared types from theme system

### Testing
- Add unit tests for CLI commands
- Add integration tests
- Add snapshot tests for output

### Performance
- Optimize file operations
- Cache compilation results
- Parallel processing where possible

### Accessibility
- Screen reader friendly output
- Color-blind friendly colors
- Clear text formatting

## Breaking Changes

### None Expected
All improvements should be backward compatible. New features will be additive.

## Success Metrics

1. **Reduced command duplication** - Single source of truth
2. **Improved developer experience** - Faster workflows
3. **Better error handling** - Clear, actionable messages
4. **Comprehensive testing** - High test coverage
5. **Documentation** - Complete CLI reference

## Next Steps

1. Review and approve this plan
2. Implement Phase 1 (Core Integration)
3. Test with real-world scenarios
4. Gather feedback
5. Iterate and improve

