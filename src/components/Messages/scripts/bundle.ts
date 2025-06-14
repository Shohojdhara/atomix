import { Messages, MessagesOptions, MessageItem } from './index';
import * as MessagesInteractions from './componentInteractions';

// Create a type for the Messages namespace
interface MessagesNamespace {
  Messages: typeof Messages;
  initializeMessages: typeof MessagesInteractions.initializeMessages;
  initializeAllMessages: typeof MessagesInteractions.initializeAllMessages;
  addMessage: typeof MessagesInteractions.addMessage;
  clearMessages: typeof MessagesInteractions.clearMessages;
  enableMessages: typeof MessagesInteractions.enableMessages;
  disableMessages: typeof MessagesInteractions.disableMessages;
  onMessageSend: typeof MessagesInteractions.onMessageSend;
  onNewMessage: typeof MessagesInteractions.onNewMessage;
}

// Skip TypeScript declaration for window.Atomix to avoid linter issues
// and just use runtime checks and casting

// Initialize global namespace
if (typeof window !== 'undefined') {
  if (!window.Atomix) {
    (window as any).Atomix = {};
  }

  // Add Messages namespace
  const messagesNamespace: MessagesNamespace = {
    Messages,
    initializeMessages: MessagesInteractions.initializeMessages,
    initializeAllMessages: MessagesInteractions.initializeAllMessages,
    addMessage: MessagesInteractions.addMessage,
    clearMessages: MessagesInteractions.clearMessages,
    enableMessages: MessagesInteractions.enableMessages,
    disableMessages: MessagesInteractions.disableMessages,
    onMessageSend: MessagesInteractions.onMessageSend,
    onNewMessage: MessagesInteractions.onNewMessage,
  };

  (window as any).Atomix.Messages = messagesNamespace;

  // Auto-initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    MessagesInteractions.initializeAllMessages();
  });
}

export {
  Messages,
  type MessagesOptions,
  type MessageItem,
  MessagesInteractions
}; 