// This file is used to declare global types for the project

// Declare module for @atomix-ux/react
declare module '@atomix-ux/react' {
  import { ButtonProps } from '../lib/types/components';
  import { FC } from 'react';

  // Re-export components from the library
  export const Button: FC<ButtonProps>;
  
  // Add other component exports as needed
  
  // AtomixLogo component
  interface AtomixLogoProps {
    height?: number | string;
    width?: number | string;
    className?: string;
    style?: React.CSSProperties;
  }
  
  export const AtomixLogo: FC<AtomixLogoProps>;
}

// Add any other global type declarations here
