import * as React from 'react';

declare module '@atomix-ux/react' {
  // Atomix Logo Component
  interface AtomixLogoProps extends React.SVGProps<SVGSVGElement> {
    height?: number | string;
    width?: number | string;
    color?: string;
  }

  // Common prop types
  type CommonProps = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  };

  // Button Component
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    as?: React.ElementType;
    to?: string;
  }

  // Card Component
  interface CardProps extends CommonProps {
    variant?: 'elevated' | 'outline' | 'ghost';
  }

  // Alert Component
  interface AlertProps extends CommonProps {
    variant?: 'info' | 'success' | 'warning' | 'error';
    icon?: React.ReactNode;
    onClose?: () => void;
  }

  // Accordion Components
  interface AccordionProps extends CommonProps {
    allowMultiple?: boolean;
    defaultIndex?: number | number[];
    onChange?: (index: number | number[]) => void;
  }

  interface AccordionItemProps extends CommonProps {
    isDisabled?: boolean;
  }

  // Input Components
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
    size?: 'sm' | 'md' | 'lg';
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
  }

  // Modal Components
  interface ModalProps extends CommonProps {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    isCentered?: boolean;
  }

  interface ModalOverlayProps extends CommonProps {
    isOpen?: boolean;
  }

  interface ModalContentProps extends CommonProps {}
  interface ModalHeaderProps extends CommonProps {}
  interface ModalBodyProps extends CommonProps {}
  interface ModalFooterProps extends CommonProps {}

  // Select Component
  interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
  }

  // Table Components
  interface TableProps extends CommonProps {
    variant?: 'simple' | 'striped' | 'unstyled';
    size?: 'sm' | 'md' | 'lg';
  }

  // Tabs Components
  interface TabsProps extends CommonProps {
    variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
    size?: 'sm' | 'md' | 'lg';
    isFitted?: boolean;
    defaultIndex?: number;
    onChange?: (index: number) => void;
  }

  interface TabListProps extends CommonProps {}
  interface TabPanelsProps extends CommonProps {}
  interface TabPanelProps extends CommonProps {
    isSelected?: boolean;
  }
  interface TabProps extends CommonProps {
    isSelected?: boolean;
    isDisabled?: boolean;
  }

  // Export all components
  export const Button: React.FC<ButtonProps>;
  export const Card: React.FC<CardProps> & {
    Header: React.FC<CommonProps>;
    Body: React.FC<CommonProps>;
    Footer: React.FC<CommonProps>;
  };
  export const Alert: React.FC<AlertProps>;
  
  export const Accordion: React.FC<AccordionProps> & {
    Item: React.FC<AccordionItemProps>;
    Header: React.FC<CommonProps>;
    Panel: React.FC<CommonProps>;
  };
  
  export const Input: React.FC<InputProps>;
  
  export const Modal: React.FC<ModalProps> & {
    Overlay: React.FC<ModalOverlayProps>;
    Content: React.FC<ModalContentProps>;
    Header: React.FC<ModalHeaderProps>;
    Body: React.FC<ModalBodyProps>;
    Footer: React.FC<ModalFooterProps>;
  };
  
  export const Select: React.FC<SelectProps>;
  
  export const Table: React.FC<TableProps> & {
    Thead: React.FC<CommonProps>;
    Tbody: React.FC<CommonProps>;
    Tfoot: React.FC<CommonProps>;
    Tr: React.FC<CommonProps>;
    Th: React.FC<CommonProps>;
    Td: React.FC<CommonProps>;
  };
  
  export const Tabs: React.FC<TabsProps> & {
    List: React.FC<TabListProps>;
    Tab: React.FC<TabProps>;
    Panels: React.FC<TabPanelsProps>;
    Panel: React.FC<TabPanelProps>;
  };

  // Export AtomixLogo component
  export const AtomixLogo: React.FC<AtomixLogoProps>;
}
