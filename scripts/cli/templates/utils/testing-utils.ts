/**
 * Testing Utilities Templates
 * Templates for generating test utilities and helpers
 */

/**
 * Generates a test utilities file with common helpers
 */
export const testingUtilsTemplate = (): string => `import { render, RenderOptions, screen, waitFor } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render options
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactElement }>;
  providerProps?: Record<string, any>;
}

/**
 * Custom render function with Atomix providers
 */
export function renderWithProviders(
  ui: ReactElement,
  { wrapper: Wrapper, providerProps, ...renderOptions }: CustomRenderOptions = {}
) {
  function WrapperComponent({ children }: { children: ReactElement }) {
    return Wrapper ? <Wrapper {...providerProps}>{children}</Wrapper> : children;
  }

  return render(ui, { wrapper: WrapperComponent, ...renderOptions });
}

/**
 * Mock IntersectionObserver
 */
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = class IntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as any;
};

/**
 * Mock ResizeObserver
 */
export const mockResizeObserver = () => {
  global.ResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as any;
};

/**
 * Wait for component to be ready
 */
export const waitForReady = async (timeout = 100) => {
  await waitFor(() => expect(screen.getByRole('document')).toBeInTheDocument(), { timeout });
};

/**
 * Create a mock event
 */
export const createMockEvent = (type: string, data: any = {}) => {
  return new Event(type, { bubbles: true, cancelable: true, ...data });
};

/**
 * Simulate keyboard events
 */
export const simulateKeyboard = async (element: HTMLElement, key: string) => {
  const user = userEvent.setup();
  await user.keyboard(key);
};

/**
 * Mock CSS custom properties
 */
export const mockCSSCustomProperties = () => {
  Object.defineProperty(document.documentElement.style, '--test-property', {
    value: 'test-value',
    writable: true,
  });
};

/**
 * Reset all mocks
 */
export const resetMocks = () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
};
`;

/**
 * Generates a test setup file
 */
export const testSetupTemplate = (): string => `import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Mock cancelAnimationFrame
global.cancelAnimationFrame = (id) => clearTimeout(id);
`;

/**
 * All testing utilities templates
 */
export const testingUtilsTemplates = {
  utils: testingUtilsTemplate,
  setup: testSetupTemplate,
};

/**
 * Type for testing utilities templates object
 */
export type TestingUtilsTemplates = typeof testingUtilsTemplates;
