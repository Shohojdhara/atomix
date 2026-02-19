import { BaseComponentProps } from './common';
import { AtomixGlassProps } from './atomixGlass';


/**
 * Message item interface
 */
export interface MessageItem {
  /**
   * Unique identifier for the message
   */
  id: string;

  /**
   * Message text content
   */
  text?: string;

  /**
   * Image URL for image messages
   */
  image?: string;

  /**
   * File information for file messages
   */
  file?: {
    /**
     * File name
     */
    name: string;

    /**
     * File size (formatted string)
     */
    size: string;
  };

  /**
   * Message timestamp
   */
  time: string;

  /**
   * Whether the message is from the current user
   */
  isSelf?: boolean;
}


/**
 * Messages component properties
 */
export interface MessagesProps extends BaseComponentProps {
  /**
   * Array of message items to display
   */
  messages: MessageItem[];

  /**
   * Avatar image URL for the other person
   */
  otherAvatar?: string;

  /**
   * Avatar image URL for the current user
   */
  selfAvatar?: string;

  /**
   * Name of the other person
   */
  otherName?: string;

  /**
   * Custom width for the messages container
   */
  width?: string;

  /**
   * Callback when a new message is sent
   */
  onSendMessage?: (text: string) => void;

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

  /**
   * Maximum height for the messages body
   */
  bodyHeight?: string;

  /**
   * Unique identifier for the messages component
   */
  id?: string;

  /**
   * Glass morphism effect for the messages component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
}
