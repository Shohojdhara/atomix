// Global declarations for Atomix design system

// Import component types
import { Callout } from '../components/Callout/Callout';

// Define global namespace for Atomix
declare global {
  interface Window {
    // Define Atomix as a global object with consistent type
    Atomix: {
      [key: string]: any;
      Callout?: typeof Callout;
    };
  }
}

export {}; 