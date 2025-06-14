import { useState } from 'react';
import { MessageItem } from '../types/components';

interface UseMessagesProps {
  /**
   * Initial messages
   */
  initialMessages?: MessageItem[];

  /**
   * Callback when a message is sent
   */
  onSendMessage?: (text: string) => void;
}

interface UseMessagesReturn {
  /**
   * Current input value
   */
  inputValue: string;

  /**
   * Set input value
   */
  setInputValue: (value: string) => void;

  /**
   * Handle input change
   */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Handle form submission
   */
  handleSubmit: (e: React.FormEvent) => void;

  /**
   * Handle key down events
   */
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Hook for managing Messages component state and behavior
 */
export const useMessages = ({ onSendMessage }: UseMessagesProps = {}): UseMessagesReturn => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
  };
};

export default useMessages;
