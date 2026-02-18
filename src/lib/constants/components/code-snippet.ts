/**
 * CodeSnippet-specific constants
 */
export const CODE_SNIPPET = {
  BASE_CLASS: 'c-code-snippet',
  CONTAINER_CLASS: 'c-code-snippet__container',
  HEADER_CLASS: 'c-code-snippet__header',
  LANGUAGE_CLASS: 'c-code-snippet__language',
  ACTIONS_CLASS: 'c-code-snippet__actions',
  ACTION_CLASS: 'c-code-snippet__action',
  CONTENT_CLASS: 'c-code-snippet__content',
  CODE_CLASS: 'c-code-snippet__content__code',
  LINE_NUMBER_CLASS: 'c-code-snippet__content__line-number',
  COPY_FEEDBACK_CLASS: 'c-code-snippet__copy-feedback',

  // Modifier classes
  MODIFIERS: {
    FULLSCREEN: 'c-code-snippet__container--fullscreen',
    WRAP: 'c-code-snippet__content--wrap',
    LIGHT: 'c-code-snippet__container--light',
    DARK: 'c-code-snippet__container--dark',
  },

  // Action states
  ACTION_STATES: {
    ACTIVE: 'c-code-snippet__action--active',
    DISABLED: 'c-code-snippet__action--disabled',
  },

  // Copy feedback states
  COPY_FEEDBACK_STATES: {
    VISIBLE: 'c-code-snippet__copy-feedback--visible',
  },

  // Theme variants
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
  } as const,

  // Default props
  DEFAULTS: {
    SHOW_LINE_NUMBERS: true,
    WRAP_LINES: false,
    ENABLE_FULLSCREEN: true,
    ENABLE_COPY: true,
    SHOW_TOOLBAR: true,
    THEME: 'light' as const,
  },

  // Accessibility
  ARIA_LABELS: {
    COPY: 'Copy code to clipboard',
    WRAP_LINES: 'Toggle line wrapping',
    FULLSCREEN: 'Toggle fullscreen mode',
    LANGUAGE: 'Code language',
  },
};
