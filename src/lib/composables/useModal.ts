import { useState, useCallback, useEffect } from 'react';

export interface UseModalProps {
  /**
   * Whether the modal is open
   */
  isOpen?: boolean;
  
  /**
   * Callback when modal state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Callback when modal opens
   */
  onOpen?: () => void;
  
  /**
   * Callback when modal closes
   */
  onClose?: () => void;
}

export interface UseModalReturn {
  /**
   * Current open state
   */
  isOpen: boolean;
  
  /**
   * Function to open the modal
   */
  open: () => void;
  
  /**
   * Function to close the modal
   */
  close: () => void;
  
  /**
   * Function to toggle the modal
   */
  toggle: () => void;
}

/**
 * Hook for managing modal state
 */
export function useModal({
  isOpen: isOpenProp,
  onOpenChange,
  onOpen,
  onClose
}: UseModalProps = {}): UseModalReturn {
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
  
  const updateOpen = useCallback((nextIsOpen: boolean) => {
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
  }, [isControlled, onOpenChange, onOpen, onClose]);
  
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
    toggle
  };
} 