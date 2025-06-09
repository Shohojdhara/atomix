/**
 * Script to generate TypeScript declaration files
 * This script is used during the build process to generate .d.ts files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const TYPES_DIR = path.resolve(DIST_DIR, 'types');

// Ensure the types directory exists
if (!fs.existsSync(TYPES_DIR)) {
  fs.mkdirSync(TYPES_DIR, { recursive: true });
}

// Copy the main index.d.ts file to the dist directory
console.log('Copying TypeScript declaration files...');
try {
  // Copy the custom index.d.ts file to the dist directory
  const srcIndexDts = path.resolve(SRC_DIR, 'types', 'index.d.ts');
  const distIndexDts = path.resolve(DIST_DIR, 'index.d.ts');
  
  if (fs.existsSync(srcIndexDts)) {
    fs.copyFileSync(srcIndexDts, distIndexDts);
    console.log(`Copied ${srcIndexDts} to ${distIndexDts}`);
  } else {
    console.warn(`Warning: ${srcIndexDts} does not exist`);
    
    // Create a basic index.d.ts if it doesn't exist
    const basicDts = `// Type definitions for Atomix Design System
declare module 'atomix' {
  export * from './components';
  export * from './lib';
}`;
    
    fs.writeFileSync(distIndexDts, basicDts);
    console.log(`Created basic ${distIndexDts}`);
  }
  
  // Create vanilla.d.ts type definition file
  const vanillaTypes = `declare module 'atomix/vanilla' {
  const Atomix: {
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
      init: (element: HTMLElement) => void;
      initializeAll: () => void;
    };
    initializeAll: () => void;
  };
  
  export default Atomix;
}

// Declare global Atomix namespace for vanilla JS usage
declare global {
  interface Window {
    Atomix: {
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
        init: (element: HTMLElement) => void;
        initializeAll: () => void;
      };
      initializeAll: () => void;
    };
  }
}`;

  const vanillaTypesFile = path.resolve(TYPES_DIR, 'vanilla.d.ts');
  fs.writeFileSync(vanillaTypesFile, vanillaTypes);
  console.log(`Created vanilla TypeScript declaration file at ${vanillaTypesFile}`);

  // Create react.d.ts type definition file
  const reactTypes = `declare module 'atomix/react' {
  export * from 'atomix';
  
  const AtomixReact: any;
  export default AtomixReact;
}`;

  const reactTypesFile = path.resolve(TYPES_DIR, 'react.d.ts');
  fs.writeFileSync(reactTypesFile, reactTypes);
  console.log(`Created React TypeScript declaration file at ${reactTypesFile}`);

  // Copy vanilla.d.ts to dist directory
  const destVanillaTypesFile = path.resolve(DIST_DIR, 'vanilla.d.ts');
  fs.copyFileSync(vanillaTypesFile, destVanillaTypesFile);
  console.log(`Copied ${vanillaTypesFile} to ${destVanillaTypesFile}`);

  // Copy react.d.ts to dist directory
  const destReactTypesFile = path.resolve(DIST_DIR, 'react.d.ts');
  fs.copyFileSync(reactTypesFile, destReactTypesFile);
  console.log(`Copied ${reactTypesFile} to ${destReactTypesFile}`);
  
  console.log('TypeScript declaration files processed successfully!');
} catch (error) {
  console.error('Error processing TypeScript declaration files:', error);
  process.exit(1);
}