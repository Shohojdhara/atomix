// Type definitions for @shohojdhara/atomix
// This file provides custom type definitions for the Atomix components
// to bypass issues with the generated declaration files

import React, { ReactNode } from 'react';

// Define base component props
interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

// Define icon position type
type IconPosition = 'left' | 'right';

// Define Accordion props
export interface AccordionProps extends BaseComponentProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  iconPosition?: IconPosition;
  icon?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Define Accordion component
export const Accordion: React.FC<AccordionProps>;

// Define other components as needed...

// Define the module
declare module '@shohojdhara/atomix' {
  export { Accordion };
  // Export other components as needed...
}