# Testing Guide for Atomix

This document provides guidelines for writing and running tests in the Atomix project.

## Testing Setup

Atomix uses [Vitest](https://vitest.dev/) as its testing framework, along with the following libraries:

- `@testing-library/react` - For testing React components
- `@testing-library/jest-dom` - For DOM testing assertions
- `@testing-library/user-event` - For simulating user events

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run all tests once
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Test File Naming

Test files should be named with the `.test.ts` or `.test.tsx` extension and placed next to the file they are testing.

Example:
```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
```

### Test Structure

Tests should be structured using the `describe` and `it` functions from Vitest:

```typescript
import { describe, it, expect } from 'vitest';

describe('Component or function name', () => {
  it('should do something specific', () => {
    // Test code
    expect(result).toBe(expectedValue);
  });
});
```

### Testing React Components

When testing React components, use the React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Mocking

Vitest provides a `vi` object for creating mocks:

```typescript
import { vi } from 'vitest';

// Mock a function
const mockFn = vi.fn();

// Mock a module
vi.mock('./path/to/module', () => ({
  default: vi.fn(),
  namedExport: vi.fn(),
}));
```

## Coverage

The project is configured to generate coverage reports using the V8 coverage provider. Coverage reports are generated in the following formats:

- Text (console output)
- JSON (for tooling)
- HTML (for viewing in a browser)

To view the HTML coverage report, open the `coverage/index.html` file in your browser after running `npm run test:coverage`.

## Continuous Integration

Tests are automatically run as part of the CI pipeline. The `npm run ci` command runs the build, format check, exports check, type check, and tests.