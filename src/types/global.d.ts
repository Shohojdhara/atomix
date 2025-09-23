/**
 * Global type declarations for @shohojdhara/atomix
 * This file ensures proper Next.js compatibility
 */

/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.sass' {
  const content: string;
  export default content;
}

// Ensure proper React namespace for Next.js
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// CSS Custom Properties for better type safety
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

export {};
