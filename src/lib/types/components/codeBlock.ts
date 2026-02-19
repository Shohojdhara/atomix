import { BaseComponentProps } from './common';


/**
 * CodeBlock component properties
 */
export interface CodeBlockProps extends BaseComponentProps {
  /**
   * The code to be displayed
   */
  code: string;

  /**
   * The language of the code
   */
  language: string;

  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * Theme variant for the code block
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * Maximum height of the code block in pixels or CSS units
   */
  maxHeight?: string | number;

  /**
   * Minimum height of the code block in pixels or CSS units
   */
  minHeight?: string | number;

  /**
   * Callback when code is copied to clipboard
   */
  onCopy?: () => void;

  /**
   * Callback when fullscreen mode changes
   */
  onFullscreenChange?: (isFullscreen: boolean) => void;

  /**
   * Whether to enable line wrapping
   */
  wrapLines?: boolean;

  /**
   * Whether to enable fullscreen mode
   */
  enableFullscreen?: boolean;

  /**
   * Whether to enable copy functionality
   */
  enableCopy?: boolean;

  /**
   * Whether to show the toolbar with actions
   */
  showToolbar?: boolean;
}
