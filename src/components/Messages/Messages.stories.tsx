import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Messages } from './Messages';
import { MessageItem } from '../../lib/types/components';

const meta: Meta<typeof Messages> = {
  title: 'Components/Messages',
  component: Messages,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Messages component for displaying chat conversations with support for text messages, images, and file attachments.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object' },
    width: { control: 'text' },
    bodyHeight: { control: 'text' },
    onSendMessage: { action: 'message sent' },
    otherName: { control: 'text' },
    otherAvatar: { control: 'text' },
    selfAvatar: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Messages>;

export const Default: Story = {
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar:
      'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: [
      {
        id: '1',
        text: "Hi, I hope you're having a good day.",
        time: '12:12 AM',
        isSelf: false,
      },
      {
        id: '2',
        text: "I'm writing to remind you of your appointment tomorrow at 10 am. Please confirm if you can make it or reschedule if needed.",
        time: '12:13 AM',
        isSelf: false,
      },
      {
        id: '3',
        image: 'https://picsum.photos/g/400/260',
        time: '12:14 AM',
        isSelf: false,
      },
      {
        id: '4',
        file: {
          name: 'File ABCDE.pdf',
          size: '1.2 MB',
        },
        time: '12:15 AM',
        isSelf: false,
      },
      {
        id: '5',
        text: "Sure, I'll be there",
        time: '12:18 AM',
        isSelf: true,
      },
      {
        id: '6',
        file: {
          name: 'Meeting Notes.pdf',
          size: '2.4 MB',
        },
        time: '12:19 AM',
        isSelf: true,
      },
      {
        id: '7',
        image: 'https://picsum.photos/400/260',
        time: '12:20 AM',
        isSelf: true,
      },
    ],
  },
};

export const EmptyChat: Story = {
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar:
      'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: [],
  },
};

export const DisabledChat: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Interactive example with state management
export const Interactive: StoryObj<typeof Messages> = {
  render: args => {
    const [messages, setMessages] = useState<MessageItem[]>(args.messages || []);

    const handleSendMessage = (text: string) => {
      const newMessage: MessageItem = {
        id: `msg-${Date.now()}`,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      };

      setMessages([...messages, newMessage]);
    };

    return <Messages {...args} messages={messages} onSendMessage={handleSendMessage} />;
  },
  args: {
    width: '800px',
    bodyHeight: '400px',
    otherName: 'Meghan',
    otherAvatar:
      'https://images.unsplash.com/photo-1648074074225-16189e7ad8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    selfAvatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    messages: [
      {
        id: '1',
        text: 'Hi there! How can I help you today?',
        time: '12:00 PM',
        isSelf: false,
      },
    ],
    placeholder: 'Type your message here...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive example where you can send messages and see them appear in the chat.',
      },
    },
  },
};
