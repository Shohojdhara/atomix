import React, { useEffect, useRef, useState, useCallback, memo, forwardRef, ReactNode } from 'react';
import { ModalProps } from '../../lib/types/components';
import { MODAL } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Hook for managing modal state
 */
function useModal({
  isOpen: isOpenProp,
  onOpenChange,
  onOpen,
  onClose,
}: {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
} = {}) {
  // For uncontrolled usage
  const [isOpenState, setIsOpenState] = useState(false);

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? !!isOpenProp : isOpenState;

  // Update internal state when prop changes (for controlled mode)
  useEffect(() => {
    if (isControlled) {
      setIsOpenState(!!isOpenProp);
    }
  }, [isOpenProp, isControlled]);

  const updateOpen = useCallback(
    (nextIsOpen: boolean) => {
      // For uncontrolled mode, update internal state
      if (!isControlled) {
        setIsOpenState(nextIsOpen);
      }

      // Call the change handler in either mode
      if (onOpenChange) {
        onOpenChange(nextIsOpen);
      }

      // Call the specific handler
      if (nextIsOpen && onOpen) {
        onOpen();
      } else if (!nextIsOpen && onClose) {
        onClose();
      }
    },
    [isControlled, onOpenChange, onOpen, onClose]
  );

  const open = useCallback(() => {
    updateOpen(true);
  }, [updateOpen]);

  const close = useCallback(() => {
    updateOpen(false);
  }, [updateOpen]);

  const toggle = useCallback(() => {
    updateOpen(!isOpen);
  }, [isOpen, updateOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

// Modal Subcomponents

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  subtitle?: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, subtitle, closeButton, onClose, children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`c-modal__header ${className}`.trim()} {...props}>
        <div className="c-modal__header-content">
          {title && <h3 className="c-modal__title">{title}</h3>}
          {subtitle && <p className="c-modal__sub">{subtitle}</p>}
          {children}
        </div>
        {closeButton && (
          <button
            type="button"
            className="c-modal__close c-btn js-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0672 15.1828C16.1253 15.2409 16.1713 15.3098 16.2028 15.3857C16.2342 15.4615 16.2504 15.5429 16.2504 15.625C16.2504 15.7071 16.2342 15.7884 16.2028 15.8643C16.1713 15.9402 16.1253 16.0091 16.0672 16.0672C16.0091 16.1252 15.9402 16.1713 15.8643 16.2027C15.7885 16.2342 15.7071 16.2503 15.625 16.2503C15.5429 16.2503 15.4616 16.2342 15.3857 16.2027C15.3098 16.1713 15.2409 16.1252 15.1828 16.0672L10 10.8836L4.8172 16.0672C4.69992 16.1844 4.54086 16.2503 4.37501 16.2503C4.20916 16.2503 4.0501 16.1844 3.93282 16.0672C3.81555 15.9499 3.74966 15.7908 3.74966 15.625C3.74966 15.4591 3.81555 15.3001 3.93282 15.1828L9.11642 9.99998L3.93282 4.81717C3.81555 4.69989 3.74966 4.54083 3.74966 4.37498C3.74966 4.20913 3.81555 4.05007 3.93282 3.93279C4.0501 3.81552 4.20916 3.74963 4.37501 3.74963C4.54086 3.74963 4.69992 3.81552 4.8172 3.93279L10 9.11639L15.1828 3.93279C15.3001 3.81552 15.4592 3.74963 15.625 3.74963C15.7909 3.74963 15.9499 3.81552 16.0672 3.93279C16.1845 4.05007 16.2504 4.20913 16.2504 4.37498C16.2504 4.54083 16.1845 4.69989 16.0672 4.81717L10.8836 9.99998L16.0672 15.1828Z"
                fill="#141414"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

export const ModalBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`c-modal__body ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
ModalBody.displayName = 'ModalBody';

export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`c-modal__footer ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = 'ModalFooter';

/**
 * Modal component for displaying overlay content
 */
type ModalComponent = React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

const ModalImpl = memo(
  ({
    children,
    isOpen = false,
    onOpenChange,
    onClose,
    onOpen,
    title,
    subtitle,
    size = 'md',
    backdrop = true,
    keyboard = true,
    className = '',
    style,
    closeButton = true,
    footer,
    glass,
    ...props
  }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const {
      isOpen: isOpenState,
      open,
      close,
    } = useModal({
      isOpen,
      onOpenChange,
      onClose,
      onOpen,
    });

    // Handle keyboard events for Escape key
    useEffect(() => {
      if (!keyboard) return undefined;

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpenState) {
          close();
        }
      };

      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }, [isOpenState, close, keyboard]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (backdrop && event.target === event.currentTarget) {
        close();
      }
    };

    // Assemble classes
    const modalClasses = [
      'c-modal',
      isOpenState ? MODAL.CLASSES.IS_OPEN : '',
      size ? `c-modal--${size}` : '',
      glass ? 'c-modal--glass' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Check for compound components usage
    const hasCompoundComponents = React.Children.toArray(children).some((child) =>
      React.isValidElement(child) &&
      ['ModalHeader', 'ModalBody', 'ModalFooter'].includes((child.type as any).displayName)
    );

    const modalContent = (
      <div className="c-modal__content">
        {hasCompoundComponents ? (
          React.Children.map(children, child => {
            if (
              React.isValidElement(child) &&
              (child.type as any).displayName === 'ModalHeader'
            ) {
              return React.cloneElement(child, {
                onClose: (child.props as any).onClose || close,
              } as any);
            }
            return child;
          })
        ) : (
          <>
            {(title || closeButton) && (
              <ModalHeader
                title={title}
                subtitle={subtitle}
                closeButton={closeButton}
                onClose={close}
              />
            )}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </div>
    );

    return (
      <div
        ref={modalRef}
        className={modalClasses}
        style={{ display: isOpenState ? 'block' : 'none', ...style }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpenState}
        {...props}
      >
        <div ref={backdropRef} className="c-modal__backdrop" onClick={handleBackdropClick} />
        <div ref={dialogRef} className="c-modal__dialog">
          {glass
            ? // Default glass settings for modals
              (() => {
                const defaultGlassProps = {
                  displacementScale: document.querySelector('.c-modal---glass .c-modal__content')
                    ?.clientHeight,
                  blurAmount: 2.2,
                  elasticity: 0,
                  mode: 'shader' as const,
                  shaderMode: 'premiumGlass',
                };

                const glassProps =
                  glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

                return <AtomixGlass {...glassProps}>{modalContent}</AtomixGlass>;
              })()
            : modalContent}
        </div>
      </div>
    );
  }
);

ModalImpl.displayName = 'Modal';

// Attach subcomponents
const ModalWithSubcomponents = ModalImpl as unknown as ModalComponent;
ModalWithSubcomponents.Header = ModalHeader;
ModalWithSubcomponents.Body = ModalBody;
ModalWithSubcomponents.Footer = ModalFooter;

export const Modal = ModalWithSubcomponents;

export type { ModalProps };

export default Modal;
