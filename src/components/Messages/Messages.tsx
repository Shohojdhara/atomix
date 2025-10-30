import React from 'react';
import { Icon } from '../Icon/Icon';
import { Avatar } from '../Avatar/Avatar';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { MESSAGES } from '../../lib/constants/components';
import { MessagesProps } from '../../lib/types/components';
import { useMessages } from '../../lib/composables/useMessages';

/**
 * Messages component for displaying a chat interface with messages, images, and file attachments
 */
export const Messages: React.FC<MessagesProps> = ({
  messages = [],
  otherAvatar,
  selfAvatar,
  otherName,
  width = '100%',
  onSendMessage,
  placeholder = 'Type a message',
  className = '',
  style,
  bodyHeight,
  disabled = false,
  id,
  glass,
}) => {
  const { inputValue, handleInputChange, handleSubmit, handleKeyDown } = useMessages({
    onSendMessage,
  });

  // Generate unique ID for accessibility
  const messagesId = id || `messages-${Math.random().toString(36).substr(2, 9)}`;
  const inputId = `${messagesId}-input`;

  // Default glass settings for messages
  const defaultGlassProps = {
    displacementScale: 150,
    cornerRadius: 12,
    elasticity: 0,
    aberrationIntensity: 2,
  };

  const messagesClasses = `${MESSAGES.CLASSES.BASE} ${glass ? 'c-messages--glass' : ''} ${disabled ? 'is-disabled' : ''} ${className}`;

  const messagesContent = (
    <>
      <div
        className={MESSAGES.CLASSES.BODY}
        style={
          bodyHeight
            ? ({ '--atomix-messages-body-height': bodyHeight } as React.CSSProperties)
            : undefined
        }
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={`${MESSAGES.CLASSES.CONTENT} ${message.isSelf ? MESSAGES.CLASSES.CONTENT_SELF : ''}`}
            aria-label={`${message.isSelf ? 'You' : otherName || 'Other person'} sent a message at ${message.time}`}
          >
            <Avatar
              src={message.isSelf ? selfAvatar : otherAvatar}
              size="xl"
              circle
              className={MESSAGES.CLASSES.AVATAR}
              alt={message.isSelf ? 'Your avatar' : `${otherName || 'Other person'}'s avatar`}
            />
            <div className={MESSAGES.CLASSES.ITEMS}>
              {!message.isSelf && otherName && (
                <div className={MESSAGES.CLASSES.NAME}>{otherName}</div>
              )}

              {message.text && (
                <div className={MESSAGES.CLASSES.TEXT}>
                  {message.text}
                  <span className={MESSAGES.CLASSES.TIME} aria-label={`Sent at ${message.time}`}>
                    {message.time}
                  </span>
                </div>
              )}

              {message.image && (
                <img
                  className={MESSAGES.CLASSES.IMAGE}
                  src={message.image}
                  alt="Message attachment"
                  loading="lazy"
                />
              )}

              {message.file && (
                <div
                  className={MESSAGES.CLASSES.FILE}
                  aria-label={`File attachment: ${message.file.name}, size: ${message.file.size}`}
                >
                  <span className={MESSAGES.CLASSES.FILE_ICON}>
                    <Icon name="File" aria-hidden="true" />
                  </span>
                  <div className={MESSAGES.CLASSES.FILE_DETAILS}>
                    <div className={MESSAGES.CLASSES.FILE_NAME}>{message.file.name}</div>
                    <div className={MESSAGES.CLASSES.FILE_SIZE}>{message.file.size}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        className={MESSAGES.CLASSES.FORM}
        onSubmit={handleSubmit}
        aria-label="Message input form"
      >
        <div className={MESSAGES.CLASSES.INPUT_GROUP}>
          <label htmlFor={inputId} className="u-visually-hidden">
            Type a message
          </label>
          <input
            id={inputId}
            type="text"
            className={MESSAGES.CLASSES.INPUT}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Message input"
          />
          <div className={MESSAGES.CLASSES.OPTIONS} aria-label="Message options">
            <button
              type="button"
              className={MESSAGES.CLASSES.OPTION}
              aria-label="Attach file"
              disabled={disabled}
            >
              <Icon
                name="PaperclipHorizontal"
                aria-hidden="true"
                className={MESSAGES.CLASSES.OPTION_ICON}
              />
            </button>
            <button
              type="button"
              className={MESSAGES.CLASSES.OPTION}
              aria-label="Attach image"
              disabled={disabled}
            >
              <Icon name="Image" aria-hidden="true" className={MESSAGES.CLASSES.OPTION_ICON} />
            </button>
            <button
              type="button"
              className={MESSAGES.CLASSES.OPTION}
              aria-label="Insert link"
              disabled={disabled}
            >
              <Icon name="Link" aria-hidden="true" className={MESSAGES.CLASSES.OPTION_ICON} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={MESSAGES.CLASSES.SUBMIT}
          aria-label="Send message"
          disabled={disabled}
        >
          <Icon name="PaperPlaneTilt" aria-hidden="true" size={24} />
        </button>
      </form>
    </>
  );

  if (glass) {
    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return (
      <div
        className={messagesClasses}
        style={{ '--atomix-messages-width': width, ...style } as React.CSSProperties}
        id={messagesId}
        aria-label="Chat messages"
        role="log"
        aria-live="polite"
      >
        <AtomixGlass {...glassProps}>
          <div
            className="c-messages__glass-content"
            style={{ borderRadius: glassProps.cornerRadius }}
          >
            {messagesContent}
          </div>
        </AtomixGlass>
      </div>
    );
  }

  return (
    <div
      className={messagesClasses}
      style={{ '--atomix-messages-width': width, ...style } as React.CSSProperties}
      id={messagesId}
      aria-label="Chat messages"
      role="log"
      aria-live="polite"
    >
      {messagesContent}
    </div>
  );
};

export type { MessagesProps };

Messages.displayName = 'Messages';

export default Messages;
