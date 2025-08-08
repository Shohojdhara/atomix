# Messages

The Messages component provides a complete chat interface for displaying conversations between users. It includes message bubbles, avatars, timestamps, file attachments, and an input form for sending new messages.

## Overview

The Messages component is designed for chat applications, customer support systems, and any interface that requires real-time messaging capabilities. It handles different message types including text, images, and file attachments, with built-in accessibility features and responsive design.

## Props API

### MessagesProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `MessageItem[]` | **required** | Array of message items to display |
| `otherAvatar` | `string` | `undefined` | Avatar image URL for the other person |
| `selfAvatar` | `string` | `undefined` | Avatar image URL for the current user |
| `otherName` | `string` | `undefined` | Name of the other person |
| `width` | `string` | `'100%'` | Custom width for the messages container |
| `onSendMessage` | `(text: string) => void` | `undefined` | Callback when a new message is sent |
| `placeholder` | `string` | `'Type a message'` | Placeholder text for the input field |
| `bodyHeight` | `string` | `undefined` | Maximum height for the messages body |
| `disabled` | `boolean` | `false` | Disable message input and interactions |
| `id` | `string` | `undefined` | Unique identifier for the messages component |
| `className` | `string` | `''` | Additional CSS classes |

### MessageItem Interface

```typescript
interface MessageItem {
  id: string | number;
  text?: string;
  time: string;
  isSelf: boolean;
  image?: string;
  file?: {
    name: string;
    size: string;
  };
}
```

## Usage Examples

### Basic React Usage

```jsx
import React, { useState } from 'react';
import { Messages } from '@shohojdhara/atomix';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      time: "10:30 AM",
      isSelf: false
    },
    {
      id: 2,
      text: "I have a question about your services.",
      time: "10:32 AM",
      isSelf: true
    },
    {
      id: 3,
      text: "Of course! I'd be happy to help.",
      time: "10:33 AM",
      isSelf: false
    }
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSelf: true
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <Messages
      messages={messages}
      otherAvatar="https://example.com/support-avatar.jpg"
      selfAvatar="https://example.com/user-avatar.jpg"
      otherName="Support Agent"
      onSendMessage={handleSendMessage}
      placeholder="Type your message..."
    />
  );
}
```

### Advanced React Usage

```jsx
import React, { useState, useEffect } from 'react';
import { Messages } from '@shohojdhara/atomix';

function AdvancedChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSelf: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! I'll get back to you shortly.",
        time: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isSelf: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="chat-container">
      <Messages
        messages={messages}
        otherAvatar="/avatars/bot-avatar.png"
        selfAvatar="/avatars/user-avatar.png"
        otherName="AI Assistant"
        onSendMessage={handleSendMessage}
        bodyHeight="400px"
        width="100%"
        placeholder="Ask me anything..."
      />
      
      {isTyping && (
        <div className="typing-indicator">
          AI Assistant is typing...
        </div>
      )}
    </div>
  );
}
```

### Messages with File Attachments

```jsx
function MessagesWithFiles() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Here's the document you requested:",
      time: "2:30 PM",
      isSelf: false
    },
    {
      id: 2,
      file: {
        name: "project-proposal.pdf",
        size: "2.4 MB"
      },
      time: "2:30 PM",
      isSelf: false
    },
    {
      id: 3,
      text: "Thanks! I'll review it now.",
      time: "2:32 PM",
      isSelf: true
    },
    {
      id: 4,
      image: "https://example.com/screenshot.png",
      time: "2:35 PM",
      isSelf: true
    }
  ]);

  return (
    <Messages
      messages={messages}
      otherAvatar="/avatars/colleague.jpg"
      selfAvatar="/avatars/me.jpg"
      otherName="Sarah Wilson"
      bodyHeight="500px"
    />
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Initialize messages component
const messagesContainer = document.getElementById('chat-messages');
const messages = [
  {
    id: 1,
    text: "Welcome to our support chat!",
    time: "9:00 AM",
    isSelf: false
  }
];

const messagesComponent = new Atomix.Messages(messagesContainer, {
  messages: messages,
  otherAvatar: '/avatars/support.jpg',
  selfAvatar: '/avatars/user.jpg',
  otherName: 'Support Team',
  onSendMessage: (text) => {
    console.log('New message:', text);
    // Handle message sending
  }
});

// Add new message
messagesComponent.addMessage({
  id: Date.now(),
  text: "Hello, I need help with my account",
  time: "9:01 AM",
  isSelf: true
});
```

### HTML with Data Attributes

```html
<!-- Messages container -->
<div 
  id="messages-chat"
  class="c-messages" 
  data-atomix="messages"
  data-other-name="Customer Support"
  data-placeholder="Type your message here..."
  style="--atomix-messages-width: 100%; --atomix-messages-body-height: 400px;">
  
  <!-- Messages body -->
  <div class="c-messages__body">
    <!-- Message content will be dynamically generated -->
    <div class="c-messages__content">
      <div class="c-avatar c-avatar--xl c-avatar--circle c-messages__avatar">
        <img src="/avatars/support.jpg" alt="Support avatar" class="c-avatar__image" />
      </div>
      <div class="c-messages__items">
        <div class="c-messages__name">Customer Support</div>
        <div class="c-messages__text">
          How can I help you today?
          <span class="c-messages__time">9:00 AM</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Input form -->
  <form class="c-messages__form">
    <div class="c-messages__input-group">
      <input 
        type="text" 
        class="c-messages__input" 
        placeholder="Type your message here..."
      />
      <div class="c-messages__options">
        <button type="button" class="c-messages__option">
          <i class="ph ph-paperclip-horizontal"></i>
        </button>
        <button type="button" class="c-messages__option">
          <i class="ph ph-image"></i>
        </button>
        <button type="button" class="c-messages__option">
          <i class="ph ph-link"></i>
        </button>
      </div>
    </div>
    <button type="submit" class="c-messages__submit">
      <i class="ph ph-paper-plane-tilt"></i>
    </button>
  </form>
</div>
```

## Styling

### CSS Classes

The Messages component uses the following CSS class structure:

```css
/* Base messages container */
.c-messages {
  /* Messages container styles */
}

/* Messages body (scrollable area) */
.c-messages__body {
  /* Scrollable messages area */
}

/* Individual message content */
.c-messages__content {
  /* Message bubble container */
}

.c-messages__content--self {
  /* Self message alignment */
}

/* Message elements */
.c-messages__avatar { /* Message avatar */ }
.c-messages__items { /* Message content wrapper */ }
.c-messages__name { /* Sender name */ }
.c-messages__text { /* Message text content */ }
.c-messages__time { /* Message timestamp */ }
.c-messages__image { /* Image attachment */ }
.c-messages__file { /* File attachment */ }
.c-messages__file-icon { /* File icon */ }
.c-messages__file-details { /* File details */ }
.c-messages__file-name { /* File name */ }
.c-messages__file-size { /* File size */ }

/* Input form */
.c-messages__form { /* Message input form */ }
.c-messages__input-group { /* Input wrapper */ }
.c-messages__input { /* Text input */ }
.c-messages__options { /* Input options */ }
.c-messages__option { /* Option button */ }
.c-messages__option-icon { /* Option icon */ }
.c-messages__submit { /* Send button */ }

/* State modifiers */
.is-disabled { /* Disabled state */ }
```

### Custom Styling

```css
/* Custom message bubble colors */
.c-messages__content .c-messages__text {
  background-color: var(--atomix-gray-100);
  border-radius: 1rem;
  padding: 0.75rem;
}

.c-messages__content--self .c-messages__text {
  background-color: var(--atomix-primary);
  color: white;
}

/* Custom scrollbar */
.c-messages__body::-webkit-scrollbar {
  width: 6px;
}

.c-messages__body::-webkit-scrollbar-thumb {
  background-color: var(--atomix-gray-300);
  border-radius: 3px;
}

/* Animation for new messages */
.c-messages__content {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Accessibility

The Messages component includes comprehensive accessibility features:

### ARIA Attributes

- `role="log"` - Identifies the messages area as a live log
- `aria-live="polite"` - Announces new messages to screen readers
- `aria-label` - Provides accessible labels for interactive elements
- `aria-hidden="true"` - Hides decorative icons from screen readers

### Keyboard Navigation

- **Tab** - Navigate between input field and buttons
- **Enter** - Send message (when input is focused)
- **Shift + Enter** - Add line break in message
- **Escape** - Clear input field

### Screen Reader Support

- Messages are announced as they appear
- Sender names and timestamps are included
- File attachments include file details
- Input field has proper labeling

## Best Practices

### Do's ✅

- Include timestamps for all messages
- Provide alt text for avatars and images
- Use proper message ordering (newest at bottom)
- Implement auto-scroll to latest message
- Handle long messages gracefully

```jsx
// Good: Complete message structure
const message = {
  id: 'msg_123',
  text: "Here's the information you requested.",
  time: "2:30 PM",
  isSelf: false,
  sender: {
    name: "Support Agent",
    avatar: "/avatars/support.jpg"
  }
};
```

### Don'ts ❌

- Don't forget to handle empty message states
- Don't make the chat area too small on mobile
- Don't send messages without proper validation
- Don't ignore accessibility features

```jsx
// Bad: Missing essential information
const badMessage = {
  text: "Hello"
  // Missing: id, time, isSelf
};
```

## Common Patterns

### Real-time Chat

```jsx
function RealTimeChat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    
    setSocket(ws);
    
    return () => ws.close();
  }, []);

  const handleSendMessage = (text) => {
    const message = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
      isSelf: true
    };
    
    // Send to server
    socket.send(JSON.stringify(message));
    
    // Add to local state
    setMessages(prev => [...prev, message]);
  };

  return (
    <Messages
      messages={messages}
      onSendMessage={handleSendMessage}
      otherName="Chat Room"
    />
  );
}
```

### Customer Support Chat

```jsx
function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [isAgentOnline, setIsAgentOnline] = useState(true);

  const handleSendMessage = async (text) => {
    // Add customer message
    const customerMessage = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
      isSelf: true
    };
    
    setMessages(prev => [...prev, customerMessage]);

    // Send to support system
    try {
      const response = await fetch('/api/support/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      const agentResponse = await response.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: agentResponse.text,
        time: new Date().toLocaleTimeString(),
        isSelf: false
      }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="support-chat">
      <div className="support-header">
        <span className={`status ${isAgentOnline ? 'online' : 'offline'}`}>
          {isAgentOnline ? '● Online' : '● Offline'}
        </span>
      </div>
      
      <Messages
        messages={messages}
        otherAvatar="/avatars/support-agent.jpg"
        otherName="Support Agent"
        onSendMessage={handleSendMessage}
        placeholder={isAgentOnline ? "Type your message..." : "Leave a message"}
        disabled={!isAgentOnline}
      />
    </div>
  );
}
```

### Group Chat

```jsx
function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Alice', avatar: '/avatars/alice.jpg' },
    { id: 2, name: 'Bob', avatar: '/avatars/bob.jpg' },
    { id: 3, name: 'Charlie', avatar: '/avatars/charlie.jpg' }
  ]);

  const getParticipantInfo = (senderId) => {
    return participants.find(p => p.id === senderId);
  };

  const handleSendMessage = (text) => {
    const message = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
      isSelf: true,
      senderId: 'current_user'
    };
    
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="group-chat">
      <div className="participants-list">
        {participants.map(participant => (
          <div key={participant.id} className="participant">
            <Avatar src={participant.avatar} size="sm" circle />
            <span>{participant.name}</span>
          </div>
        ))}
      </div>
      
      <Messages
        messages={messages.map(msg => ({
          ...msg,
          otherName: msg.isSelf ? undefined : getParticipantInfo(msg.senderId)?.name,
          otherAvatar: msg.isSelf ? undefined : getParticipantInfo(msg.senderId)?.avatar
        }))}
        onSendMessage={handleSendMessage}
        placeholder="Message the group..."
      />
    </div>
  );
}
```

## Related Components

- **Avatar** - Used for displaying message sender avatars
- **Icon** - Used for attachment buttons and send button
- **Input** - Similar input handling patterns
- **Card** - Can be used as container for the messages component

## Browser Support

The Messages component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x
<Messages 
  chatMessages={messages}
  userAvatar={userAvatar}
  contactAvatar={contactAvatar}
  contactName={contactName}
/>

// v2.x
<Messages 
  messages={messages}
  selfAvatar={userAvatar}
  otherAvatar={contactAvatar}
  otherName={contactName}
/>
```

The main changes:
- `chatMessages` prop renamed to `messages`
- `userAvatar` prop renamed to `selfAvatar`
- `contactAvatar` prop renamed to `otherAvatar`
- `contactName` prop renamed to `otherName`
- Added support for file attachments and images
- Improved accessibility features