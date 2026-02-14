# CLI Tests

This directory contains comprehensive tests for the Atomix CLI tools.

## Test Structure

### Files
- `basic.test.js` - Core utility functions (validatePath, validateComponentName, etc.)
- `utils.test.js` - Extended utility tests with file system operations
- `token-manager.test.js` - Token management functionality
- `component-generator.test.js` - Component generation and validation
- `integration.test.js` - End-to-end CLI command tests
- `test-setup.js` - Global test configuration and mocks

## Running Tests

### Run all CLI tests
```bash
npm run test:cli
```

### Run with watch mode
```bash
npm run test:cli:watch
```

### Run with coverage
```bash
npm run test:cli:coverage
```

### Run specific test file
```bash
npx vitest run scripts/cli/__tests__/basic.test.js
```

## Test Categories

### Unit Tests
- **Utils**: Path validation, name validation, input sanitization
- **Token Manager**: Token parsing, validation, export/import
- **Component Generator**: Component creation, validation, templates

### Integration Tests
- Full CLI command execution
- File system operations
- Error handling scenarios

## Coverage Goals

- **Overall Coverage**: 80%+
- **Functions**: 80%+
- **Branches**: 80%+
- **Lines**: 80%+
- **Statements**: 80%+

## Mock Strategy

- External dependencies (ora, chalk, inquirer) are mocked
- File system operations use temporary directories
- CLI commands are tested in isolated environments

## Adding New Tests

1. Create test file with `.test.js` extension
2. Use descriptive test names
3. Mock external dependencies
4. Clean up temporary files in afterEach
5. Follow existing patterns for consistency

## Debugging Failed Tests

Run tests with verbose output:
```bash
npx vitest run --reporter=verbose scripts/cli/__tests__/
```

For specific test debugging:
```bash
npx vitest run --no-coverage scripts/cli/__tests__/basic.test.js
```
