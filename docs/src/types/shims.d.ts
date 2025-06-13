// This file provides custom type definitions to override problematic imports

declare module '@shohojdhara/atomix/dist/js/atomix.react.esm.js' {
  import React, { ReactNode } from 'react';

  // Define base component props
  interface BaseComponentProps {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
  }

  // Define Accordion props
  export interface AccordionProps extends BaseComponentProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    iconPosition?: 'left' | 'right';
    icon?: ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  // Define Accordion component
  export const Accordion: React.FC<AccordionProps>;

  // Define other components as needed...
}