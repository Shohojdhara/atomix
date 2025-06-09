// Type definitions for Atomix Design System

declare module 'atomix' {
  // Re-export all component types
  export * from './atomix-ux';
  
  // Global Atomix namespace for vanilla JS usage
  global {
    interface Window {
      Atomix: {
        // Component initializers and utilities
        Button: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Accordion: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Tooltip: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Toggle: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Tab: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Steps: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Testimonial: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        River: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Upload: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        EdgePanel: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Modal: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
          open: (id: string) => void;
          close: (id: string) => void;
        };
        Hero: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Avatar: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Breadcrumb: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Card: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Countdown: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Todo: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        Pagination: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        DataTable: {
          init: (element: HTMLElement) => void;
          initializeAll: () => void;
        };
        DatePicker: {
          create: (element: HTMLElement, options?: any) => any;
          init: () => void;
          get: (element: HTMLElement) => any;
          disposeAll: () => void;
          enhanceKeyboardNavigation: (datepicker: any) => void;
        };
      };
    }
  }
}