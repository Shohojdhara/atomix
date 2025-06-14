import { MESSAGES } from '../../../lib/constants/components';

/**
 * Messages component options
 */
export interface MessagesOptions {
  /**
   * Custom width for the messages container
   */
  width?: string;

  /**
   * Maximum height for the messages body
   */
  bodyHeight?: string;

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

  /**
   * Callback when a new message is sent
   */
  onSendMessage?: (text: string) => void;

  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
}

/**
 * Message item data structure
 */
export interface MessageItem {
  id: string;
  text?: string;
  image?: string;
  file?: {
    name: string;
    size: string;
  };
  time: string;
  isSelf?: boolean;
}

/**
 * Default options for the Messages component
 */
const DEFAULT_OPTIONS: MessagesOptions = {
  width: '100%',
  bodyHeight: 'calc(100vh - 600px)',
  placeholder: 'Type a message',
  disabled: false,
};

/**
 * Messages component class
 */
export class Messages {
  private _element: HTMLElement;
  private $form: HTMLFormElement | null;
  private $input: HTMLInputElement | null;
  private $submitButton: HTMLButtonElement | null;
  private $body: HTMLElement | null;
  private options: MessagesOptions;
  private eventHandlers: { [key: string]: EventListener } = {};

  /**
   * Get the element
   */
  get $element(): HTMLElement {
    return this._element;
  }

  /**
   * Create a new Messages instance
   * @param element - Element selector or HTMLElement
   * @param options - Component options
   */
  constructor(element: string | HTMLElement, options: MessagesOptions = {}) {
    this._element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this._element) {
      throw new Error('Messages element not found');
    }

    this.options = { ...DEFAULT_OPTIONS, ...options };

    // Cache DOM elements
    this.$form = this._element.querySelector(MESSAGES.SELECTORS.FORM);
    this.$input = this._element.querySelector(MESSAGES.SELECTORS.INPUT);
    this.$submitButton = this._element.querySelector('.c-messages__submit');
    this.$body = this._element.querySelector(MESSAGES.SELECTORS.BODY);

    this._initialize();
  }

  /**
   * Initialize the component
   */
  private _initialize(): void {
    // Apply options
    if (this.options.width) {
      this._element.style.setProperty('--atomix-messages-width', this.options.width);
    }

    if (this.options.bodyHeight && this.$body) {
      this.$body.style.setProperty('--atomix-messages-body-height', this.options.bodyHeight);
    }

    if (this.options.placeholder && this.$input) {
      this.$input.placeholder = this.options.placeholder;
    }

    if (this.options.disabled) {
      this._element.classList.add('is-disabled');
      if (this.$input) this.$input.disabled = true;
      if (this.$submitButton) this.$submitButton.disabled = true;
    }

    // Set up event handlers
    this._setupEventListeners();

    // Scroll to bottom of messages
    this._scrollToBottom();
  }

  /**
   * Set up event listeners
   */
  private _setupEventListeners(): void {
    if (this.$form) {
      this.eventHandlers.submit = this._handleSubmit.bind(this);
      this.$form.addEventListener('submit', this.eventHandlers.submit);
    }

    if (this.$input) {
      this.eventHandlers.keydown = ((event: Event) => {
        if (event instanceof KeyboardEvent) {
          this._handleKeyDown(event);
        }
      }) as EventListener;

      this.$input.addEventListener('keydown', this.eventHandlers.keydown);
    }
  }

  /**
   * Handle form submission
   */
  private _handleSubmit(event: Event): void {
    event.preventDefault();

    if (!this.$input || this.options.disabled) return;

    const text = this.$input.value.trim();
    if (!text) return;

    if (this.options.onSendMessage) {
      this.options.onSendMessage(text);
    }

    // Dispatch custom event
    const customEvent = new CustomEvent('messages:send', {
      bubbles: true,
      detail: { text },
    });
    this._element.dispatchEvent(customEvent);

    // Clear input
    this.$input.value = '';

    // Scroll to bottom
    this._scrollToBottom();
  }

  /**
   * Handle key down events
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    // Submit on Enter (without Shift)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.$form) {
        const submitEvent = new Event('submit', { cancelable: true });
        this.$form.dispatchEvent(submitEvent);
      }
    }
  }

  /**
   * Add a new message to the chat
   */
  public addMessage(message: MessageItem): void {
    if (!this.$body) return;

    const messageEl = this._createMessageElement(message);
    this.$body.appendChild(messageEl);

    // Scroll to bottom
    this._scrollToBottom();

    // Dispatch custom event
    const customEvent = new CustomEvent('messages:new', {
      bubbles: true,
      detail: { message },
    });
    this._element.dispatchEvent(customEvent);
  }

  /**
   * Create a message element
   */
  private _createMessageElement(message: MessageItem): HTMLElement {
    const contentEl = document.createElement('div');
    contentEl.className = `${MESSAGES.CLASSES.CONTENT} ${message.isSelf ? MESSAGES.CLASSES.CONTENT_SELF : ''}`;
    contentEl.setAttribute(
      'aria-label',
      `${message.isSelf ? 'You' : 'Other person'} sent a message at ${message.time}`
    );

    // Create avatar
    const avatarEl = document.createElement('div');
    avatarEl.className = `${MESSAGES.CLASSES.AVATAR} c-avatar c-avatar--xl c-avatar--circle`;

    // Create items container
    const itemsEl = document.createElement('div');
    itemsEl.className = MESSAGES.CLASSES.ITEMS;

    // Add text message if present
    if (message.text) {
      const textEl = document.createElement('div');
      textEl.className = MESSAGES.CLASSES.TEXT;
      textEl.textContent = message.text;

      const timeEl = document.createElement('span');
      timeEl.className = MESSAGES.CLASSES.TIME;
      timeEl.textContent = message.time;
      timeEl.setAttribute('aria-label', `Sent at ${message.time}`);

      textEl.appendChild(timeEl);
      itemsEl.appendChild(textEl);
    }

    // Add image if present
    if (message.image) {
      const imageEl = document.createElement('img');
      imageEl.className = MESSAGES.CLASSES.IMAGE;
      imageEl.src = message.image;
      imageEl.alt = 'Message attachment';
      imageEl.setAttribute('loading', 'lazy');

      itemsEl.appendChild(imageEl);
    }

    // Add file if present
    if (message.file) {
      const fileEl = document.createElement('div');
      fileEl.className = MESSAGES.CLASSES.FILE;
      fileEl.setAttribute(
        'aria-label',
        `File attachment: ${message.file.name}, size: ${message.file.size}`
      );

      const iconEl = document.createElement('span');
      iconEl.className = MESSAGES.CLASSES.FILE_ICON;
      iconEl.innerHTML =
        '<span class="c-icon c-icon--md " aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg></span>';

      const detailsEl = document.createElement('div');
      detailsEl.className = MESSAGES.CLASSES.FILE_DETAILS;

      const nameEl = document.createElement('div');
      nameEl.className = MESSAGES.CLASSES.FILE_NAME;
      nameEl.textContent = message.file.name;

      const sizeEl = document.createElement('div');
      sizeEl.className = MESSAGES.CLASSES.FILE_SIZE;
      sizeEl.textContent = message.file.size;

      detailsEl.appendChild(nameEl);
      detailsEl.appendChild(sizeEl);

      fileEl.appendChild(iconEl);
      fileEl.appendChild(detailsEl);

      itemsEl.appendChild(fileEl);
    }

    contentEl.appendChild(avatarEl);
    contentEl.appendChild(itemsEl);

    return contentEl;
  }

  /**
   * Scroll to the bottom of the messages body
   */
  private _scrollToBottom(): void {
    if (this.$body) {
      this.$body.scrollTop = this.$body.scrollHeight;
    }
  }

  /**
   * Enable the messages component
   */
  public enable(): void {
    this.options.disabled = false;
    this._element.classList.remove('is-disabled');
    if (this.$input) this.$input.disabled = false;
    if (this.$submitButton) this.$submitButton.disabled = false;

    const optionButtons = this._element.querySelectorAll('.c-messages__option-icon');
    optionButtons.forEach(button => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = false;
      }
    });
  }

  /**
   * Disable the messages component
   */
  public disable(): void {
    this.options.disabled = true;
    this._element.classList.add('is-disabled');
    if (this.$input) this.$input.disabled = true;
    if (this.$submitButton) this.$submitButton.disabled = true;

    const optionButtons = this._element.querySelectorAll('.c-messages__option-icon');
    optionButtons.forEach(button => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
      }
    });
  }

  /**
   * Clear all messages
   */
  public clearMessages(): void {
    if (this.$body) {
      const messages = this.$body.querySelectorAll(MESSAGES.SELECTORS.CONTENT);
      messages.forEach(message => message.remove());
    }
  }

  /**
   * Destroy the component and clean up event listeners
   */
  public destroy(): void {
    // Remove event listeners
    if (this.$form && this.eventHandlers.submit) {
      this.$form.removeEventListener('submit', this.eventHandlers.submit);
    }

    if (this.$input && this.eventHandlers.keydown) {
      this.$input.removeEventListener('keydown', this.eventHandlers.keydown);
    }

    // Clear event handlers
    this.eventHandlers = {};
  }

  /**
   * Initialize all messages components on the page
   */
  public static initializeAll(options: MessagesOptions = {}): Messages[] {
    const elements = document.querySelectorAll(MESSAGES.SELECTORS.MESSAGES);
    return Array.from(elements).map(element => new Messages(element as HTMLElement, options));
  }
}

export default Messages;
