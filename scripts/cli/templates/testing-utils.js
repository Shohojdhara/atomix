/**
 * Testing Utilities and Mocks
 * Common testing helpers for generated components
 */

import { fireEvent } from '@testing-library/react';

/**
 * Create mock event object for testing
 * @param {string} type - Event type
 * @param {Object} payload - Additional event properties
 * @returns {Object} Mock event object
 */
export const createMockEvent = (type, payload = {}) => ({
  type,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  target: {},
  ...payload
});

/**
 * Mock IntersectionObserver for testing intersection-based components
 * @returns {Object} Mock IntersectionObserver instance
 */
export const mockIntersectionObserver = () => {
  const mockInstance = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  };
  
  global.IntersectionObserver = vi.fn(() => mockInstance);
  return mockInstance;
};

/**
 * Mock ResizeObserver for testing resize-based components
 * @returns {Object} Mock ResizeObserver instance
 */
export const mockResizeObserver = () => {
  const mockInstance = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  };
  
  global.ResizeObserver = vi.fn(() => mockInstance);
  return mockInstance;
};

/**
 * Mock window.matchMedia for testing responsive components
 * @param {boolean} matches - Whether media query should match
 * @returns {Function} Mock matchMedia function
 */
export const mockMatchMedia = (matches = true) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

/**
 * Mock scrollIntoView for testing scroll behavior
 */
export const mockScrollIntoView = () => {
  Element.prototype.scrollIntoView = vi.fn();
};

/**
 * Create mock ref object
 * @param {any} current - Current ref value
 * @returns {Object} Mock ref object
 */
export const createMockRef = (current = null) => ({
  current
});

/**
 * Mock console methods for testing
 * @param {string[]} methods - Console methods to mock
 * @returns {Object} Mock implementations
 */
export const mockConsole = (methods = ['log', 'warn', 'error']) => {
  const mocks = {};
  
  methods.forEach(method => {
    mocks[method] = vi.spyOn(console, method).mockImplementation(() => {});
  });
  
  return mocks;
};

/**
 * Wait for component to be stable
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Resolves after delay
 */
export const waitForStable = (ms = 100) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

/**
 * Create mock media query list
 * @param {boolean} matches - Whether query matches
 * @param {string} media - Media query string
 * @returns {Object} Mock MediaQueryList
 */
export const createMockMediaQueryList = (matches = false, media = '(max-width: 768px)') => ({
  matches,
  media,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

/**
 * Mock CSS custom properties
 * @param {Object} properties - CSS custom properties to mock
 */
export const mockCSSCustomProperties = (properties = {}) => {
  const originalGetPropertyValue = window.getComputedStyle;
  
  window.getComputedStyle = vi.fn().mockImplementation((element) => ({
    ...originalGetPropertyValue(element),
    getPropertyValue: (property) => {
      return properties[property] || '';
    }
  }));
};

/**
 * Mock fetch API
 * @param {Object} response - Mock response object
 * @returns {Function} Mock fetch function
 */
export const mockFetch = (response = {}) => {
  const mockResponse = {
    ok: true,
    status: 200,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
    ...response
  };
  
  global.fetch = vi.fn().mockResolvedValue(mockResponse);
  return global.fetch;
};

/**
 * Create mock context provider
 * @param {React.Context} Context - React context
 * @param {any} value - Context value
 * @returns {Function} Provider component
 */
export const createMockContextProvider = (Context, value) => {
  return ({ children }) => (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

/**
 * Test component rendering with different props
 * @param {React.Component} Component - Component to test
 * @param {Object} props - Props to test
 * @param {Function} testFn - Test function to run
 */
export const testComponentWithProps = (Component, props, testFn) => {
  Object.entries(props).forEach(([propName, propValue]) => {
    it(`renders correctly with ${propName}=${JSON.stringify(propValue)}`, () => {
      testFn(Component, { [propName]: propValue });
    });
  });
};

/**
 * Test accessibility with axe-core
 * @param {HTMLElement} container - Container element to test
 * @param {Object} options - Axe configuration options
 * @returns {Promise} Axe results
 */
export const testAccessibility = async (container, options = {}) => {
  const axe = (await import('jest-axe')).axe;
  return axe(container, options);
};

/**
 * Test keyboard navigation
 * @param {HTMLElement} element - Element to test
 * @param {string[]} keys - Keys to simulate
 */
export const testKeyboardNavigation = (element, keys = ['Tab', 'Enter', 'Escape']) => {
  keys.forEach(key => {
    fireEvent.keyDown(element, { key });
    fireEvent.keyUp(element, { key });
  });
};

/**
 * Test focus management
 * @param {HTMLElement} element - Element to test
 * @param {boolean} shouldBeFocusable - Whether element should be focusable
 */
export const testFocusManagement = (element, shouldBeFocusable = true) => {
  if (shouldBeFocusable) {
    element.focus();
    expect(element).toHaveFocus();
  } else {
    expect(() => element.focus()).not.toThrow();
  }
};

/**
 * Test responsive behavior
 * @param {Function} setup - Setup function
 * @param {Object[]} breakpoints - Breakpoint configurations
 */
export const testResponsiveBehavior = (setup, breakpoints = [
  { width: 320, name: 'mobile' },
  { width: 768, name: 'tablet' },
  { width: 1024, name: 'desktop' }
]) => {
  breakpoints.forEach(({ width, name }) => {
    describe(`${name} (${width}px)`, () => {
      beforeEach(() => {
        // Mock viewport size
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width
        });
        
        // Trigger resize event
        window.dispatchEvent(new Event('resize'));
      });
      
      setup(width, name);
    });
  });
};

// Export all utilities
export default {
  createMockEvent,
  mockIntersectionObserver,
  mockResizeObserver,
  mockMatchMedia,
  mockScrollIntoView,
  createMockRef,
  mockConsole,
  waitForStable,
  createMockMediaQueryList,
  mockCSSCustomProperties,
  mockFetch,
  createMockContextProvider,
  testComponentWithProps,
  testAccessibility,
  testKeyboardNavigation,
  testFocusManagement,
  testResponsiveBehavior
};
