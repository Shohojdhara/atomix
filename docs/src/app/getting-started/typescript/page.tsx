'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function TypeScriptPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>TypeScript Support</h1>
        <p>
          Atomix is built with TypeScript and provides comprehensive type definitions for all components, hooks, and utilities.
          This guide explains how to leverage TypeScript with Atomix to improve your development experience.
        </p>

        <div className="u-bg-success-100 u-p-md u-rounded u-mb-lg">
          <h4 className="u-mt-0 u-d-flex u-items-center u-gap-xs">
            🎉 Full TypeScript Support
          </h4>
          <p className="u-mb-0">
            Atomix provides complete TypeScript definitions out of the box. No additional setup is required for TypeScript projects.
            All component props, hooks, and utility functions are fully typed to provide excellent IDE integration and type safety.
          </p>
        </div>

        <h2>Component Types</h2>
        <p>
          All Atomix components export their prop interfaces, making it easy to use them in your TypeScript projects.
          These type definitions help catch errors during development and provide better IDE autocompletion.
        </p>

        <ComponentDemo
          title="Using Component Props"
          description="Import and use component prop interfaces"
          code={`import { Button, ButtonProps, Card, CardProps } from '@shohojdhara/atomix';

// Create a custom button component with typed props
const CustomButton: React.FC<ButtonProps> = (props) => {
  // All ButtonProps are available with type checking
  return <Button {...props} />;
};

// Use the component with proper type checking
function App() {
  return (
    <div>
      <CustomButton 
        variant="primary" 
        size="lg"
        onClick={(e) => console.log('Button clicked', e)}
      >
        Click Me
      </CustomButton>
      
      <Card
        // CardProps are fully typed
        title="TypeScript Support"
        variant="outlined"
      >
        Card content with TypeScript support
      </Card>
    </div>
  );
}`}
        >
          <div>
            <button className="c-btn c-btn--primary c-btn--lg u-mb-4">
              Click Me
            </button>
            
            <div className="c-card c-card--outlined">
              <div className="c-card__body">
                <h3 className="c-card__title">TypeScript Support</h3>
                <p className="c-card__text">Card content with TypeScript support</p>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Extending Component Types</h2>
        <p>
          You can extend Atomix component types to create custom components with additional props while maintaining type safety.
        </p>

        <ComponentDemo
          title="Extending Component Types"
          description="Create custom components by extending Atomix types"
          code={`import { Button, ButtonProps } from '@shohojdhara/atomix';

// Extend ButtonProps with custom properties
interface CustomButtonProps extends ButtonProps {
  customColor?: string;
  isProcessing?: boolean;
}

// Create a custom button component with extended props
const EnhancedButton: React.FC<CustomButtonProps> = ({ 
  customColor,
  isProcessing,
  children,
  ...buttonProps
}) => {
  const style = customColor ? { backgroundColor: customColor } : {};
  
  return (
    <Button 
      {...buttonProps} 
      style={style}
      disabled={isProcessing || buttonProps.disabled}
    >
      {isProcessing ? 'Processing...' : children}
    </Button>
  );
};

// Use the custom component
function App() {
  return (
    <EnhancedButton 
      variant="primary"
      customColor="#8a2be2" // Custom prop
      isProcessing={false}  // Custom prop
      onClick={() => console.log('Clicked')}
    >
      Enhanced Button
    </EnhancedButton>
  );
}`}
        >
          <div>
            <button className="c-btn c-btn--primary" style={{ backgroundColor: '#8a2be2' }}>
              Enhanced Button
            </button>
          </div>
        </ComponentDemo>

        <h2>Hooks and Utilities</h2>
        <p>
          Atomix provides typed hooks and utility functions that you can use in your components.
          These hooks and utilities are fully typed, providing excellent IDE integration and type safety.
        </p>

        <ComponentDemo
          title="Using Typed Hooks"
          description="Leverage TypeScript with Atomix hooks"
          code={`import { useColorMode, useMediaQuery } from '@shohojdhara/atomix';

function ThemeAwareComponent() {
  // TypeScript provides type safety for hook return values
  const { colorMode, setColorMode } = useColorMode();
  
  // TypeScript validates arguments to utility functions
  const isLargeScreen = useMediaQuery('(min-width: 992px)');
  
  return (
    <div className="u-p-4">
      <p>Current theme: {colorMode}</p>
      <button 
        className="c-btn c-btn--primary u-mb-3"
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme
      </button>
      
      {isLargeScreen && (
        <div className="u-bg-info-100 u-p-3 u-rounded">
          This content only appears on large screens
        </div>
      )}
    </div>
  );
}`}
        >
          <div className="u-p-4">
            <p>Current theme: light</p>
            <button className="c-btn c-btn--primary u-mb-3">
              Toggle Theme
            </button>
            
            <div className="u-bg-info-100 u-p-3 u-rounded">
              This content only appears on large screens
            </div>
          </div>
        </ComponentDemo>

        <h2>Type Definitions</h2>
        <p>
          Atomix exports various TypeScript interfaces and types that you can use in your application:
        </p>

        <pre className="u-bg-secondary u-p-md u-rounded">
          <code>{`// Component Props
import { 
  ButtonProps,
  CardProps, 
  AccordionProps,
  ModalProps,
  FormProps,
  // ... and many more
} from '@shohojdhara/atomix';

// Utility Types
import {
  Size,           // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ThemeColor,     // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  ColorMode,      // 'light' | 'dark'
  Placement,      // 'top' | 'right' | 'bottom' | 'left' | ...
  // ... and more
} from '@shohojdhara/atomix';

// Hook Return Types
import { 
  UseColorModeReturn,
  UseMediaQueryReturn,
  // ... and more
} from '@shohojdhara/atomix';`}</code>
        </pre>

        <h2>Type-Safe Event Handlers</h2>
        <p>
          Atomix components provide type-safe event handlers, making it easier to work with events in your application.
        </p>

        <ComponentDemo
          title="Type-Safe Event Handlers"
          description="Work with properly typed event handlers"
          code={`import { Button, Form } from '@shohojdhara/atomix';

function EventHandlingExample() {
  // Button click handler with proper event type
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked:', event.currentTarget.textContent);
    // TypeScript knows all properties available on the event
  };

  // Form submit handler with proper event type
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('Form submitted with:', Object.fromEntries(formData));
  };

  // Input change handler with proper event type
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value);
    // TypeScript knows the target is an input element
  };

  return (
    <div className="u-p-4">
      <Button 
        variant="primary" 
        onClick={handleButtonClick}
        className="u-mb-4"
      >
        Click with Type Safety
      </Button>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="u-mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Input 
            id="name" 
            name="name" 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Submit Form
        </Button>
      </Form>
    </div>
  );
}`}
        >
          <div className="u-p-4">
            <button className="c-btn c-btn--primary u-mb-4">
              Click with Type Safety
            </button>

            <form>
              <div className="c-form-group u-mb-3">
                <label htmlFor="name" className="c-form-label">Name</label>
                <input id="name" name="name" className="c-form-input" />
              </div>
              <button type="submit" className="c-btn c-btn--success">
                Submit Form
              </button>
            </form>
          </div>
        </ComponentDemo>

        <h2>TypeScript Configuration</h2>
        <p>
          Atomix works with standard TypeScript configurations. Here's a recommended <code>tsconfig.json</code> for your project:
        </p>

        <pre className="u-bg-secondary u-p-md u-rounded">
          <code>{`{
  "compilerOptions": {
    "target": "es2018",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`}</code>
        </pre>

        <h2>Troubleshooting</h2>

        <div className="u-bg-warning u-p-md u-rounded u-mb-md">
          <h4 className="u-mt-0 u-d-flex u-items-center u-gap-xs">⚠️ Common Issues</h4>
          
          <h5>Missing Type Definitions</h5>
          <p>
            If you encounter errors about missing type definitions, ensure you're using the latest version of Atomix:
          </p>
          <pre className="u-bg-secondary u-p-2 u-rounded">
            <code>npm install @shohojdhara/atomix@latest</code>
          </pre>
          
          <h5>TypeScript Version Compatibility</h5>
          <p>
            Atomix requires TypeScript 4.5 or higher. Update your TypeScript version if needed:
          </p>
          <pre className="u-bg-secondary u-p-2 u-rounded">
            <code>npm install typescript@latest --save-dev</code>
          </pre>
          
          <h5>React Types</h5>
          <p>
            Ensure you have the correct React type definitions installed:
          </p>
          <pre className="u-bg-secondary u-p-2 u-rounded">
            <code>npm install @types/react @types/react-dom --save-dev</code>
          </pre>
        </div>

        <h2>Next Steps</h2>
        <p>
          Now that you understand how to use TypeScript with Atomix, explore these resources:
        </p>

        <div className="u-grid u-grid-cols-1 md:u-o-grid-cols-2 u-gap-md u-mt-lg">
          <div className="c-card">
            <div className="c-card__body">
              <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                🧩 Component API Reference
              </h4>
              <p className="c-card__text">
                Explore the detailed API documentation for each component, including all available props and their types.
              </p>
            </div>
            <div className="c-card__actions">
              <a
                href="/components/button"
                className="btn c-btn--outline-primary c-btn--sm"
              >
                View Components
              </a>
            </div>
          </div>

          <div className="c-card">
            <div className="c-card__body">
              <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                🔧 Utility Types
              </h4>
              <p className="c-card__text">
                Learn about utility types and interfaces that can help you build type-safe applications with Atomix.
              </p>
            </div>
            <div className="c-card__actions">
              <a
                href="/utilities/overview"
                className="btn c-btn--outline-primary c-btn--sm"
              >
                Explore Utilities
              </a>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}