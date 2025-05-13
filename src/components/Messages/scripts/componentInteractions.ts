import { Messages, MessagesOptions, MessageItem } from './index';

/**
 * Initialize a Messages component on a specific element
 * @param selector - CSS selector or DOM element
 * @param options - Component options
 * @returns Messages instance
 */
export const initializeMessages = (
  selector: string | HTMLElement,
  options: MessagesOptions = {}
): Messages => {
  return new Messages(selector, options);
};

/**
 * Initialize all Messages components on the page
 * @param options - Default options for all instances
 * @returns Array of Messages instances
 */
export const initializeAllMessages = (options: MessagesOptions = {}): Messages[] => {
  return Messages.initializeAll(options);
};

/**
 * Add a message to a Messages component
 * @param messagesInstance - Messages instance or selector
 * @param message - Message data
 */
export const addMessage = (
  messagesInstance: Messages | string,
  message: MessageItem
): void => {
  const instance = typeof messagesInstance === 'string'
    ? new Messages(messagesInstance)
    : messagesInstance;
    
  instance.addMessage(message);
};

/**
 * Clear all messages from a Messages component
 * @param messagesInstance - Messages instance or selector
 */
export const clearMessages = (messagesInstance: Messages | string): void => {
  const instance = typeof messagesInstance === 'string'
    ? new Messages(messagesInstance)
    : messagesInstance;
    
  instance.clearMessages();
};

/**
 * Enable a Messages component
 * @param messagesInstance - Messages instance or selector
 */
export const enableMessages = (messagesInstance: Messages | string): void => {
  const instance = typeof messagesInstance === 'string'
    ? new Messages(messagesInstance)
    : messagesInstance;
    
  instance.enable();
};

/**
 * Disable a Messages component
 * @param messagesInstance - Messages instance or selector
 */
export const disableMessages = (messagesInstance: Messages | string): void => {
  const instance = typeof messagesInstance === 'string'
    ? new Messages(messagesInstance)
    : messagesInstance;
    
  instance.disable();
};

/**
 * Listen for message send events
 * @param messagesInstance - Messages instance or selector
 * @param callback - Callback function to execute when a message is sent
 * @returns Cleanup function
 */
export const onMessageSend = (
  messagesInstance: Messages | string,
  callback: (text: string) => void
): () => void => {
  const element = typeof messagesInstance === 'string'
    ? document.querySelector(messagesInstance) as HTMLElement
    : messagesInstance.$element;
    
  if (!element) {
    throw new Error('Messages element not found');
  }
  
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail.text);
  };
  
  element.addEventListener('messages:send', handler);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('messages:send', handler);
  };
};

/**
 * Listen for new message events
 * @param messagesInstance - Messages instance or selector
 * @param callback - Callback function to execute when a new message is added
 * @returns Cleanup function
 */
export const onNewMessage = (
  messagesInstance: Messages | string,
  callback: (message: MessageItem) => void
): () => void => {
  const element = typeof messagesInstance === 'string'
    ? document.querySelector(messagesInstance) as HTMLElement
    : messagesInstance.$element;
    
  if (!element) {
    throw new Error('Messages element not found');
  }
  
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail.message);
  };
  
  element.addEventListener('messages:new', handler);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('messages:new', handler);
  };
}; 