// Test setup file for Vitest
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Mock CSS imports - needed for components that use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null as ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock CSS module imports
vi.mock('*.module.css', () => ({
  default: {},
}));

// Mock regular CSS imports
vi.mock('*.css', () => ({
  default: {},
}));

// Mock SCSS imports
vi.mock('*.scss', () => ({
  default: {},
}));

// Ensure no mocks leak between tests
afterEach(() => {
  vi.restoreAllMocks();
});
