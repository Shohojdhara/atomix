import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Container, ContainerProps } from '../../layouts/Grid/Container';
import { BLOCK } from '../../lib/constants/components';
import { useBlock } from '../../lib/composables/useBlock';

export interface BlockProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to be rendered within the block
   */
  children: ReactNode;
  /**
   * The HTML element to render as
   * @default 'section'
   */
  as?: 'section' | 'div' | 'article' | 'aside' | 'main';
  /**
   * Spacing size for vertical padding
   * @default 'md'
   */
  spacing?: (typeof BLOCK.SPACING.SIZES)[number];
  /**
   * Container configuration
   */
  container?: {
    /**
     * Container type for content width
     * @default undefined
     */
    type?: ContainerProps['type'];
    /**
     * Additional container classes
     */
    className?: string;
  };
  /**
   * Whether to enable full-width content
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Custom styles object
   */
  style?: React.CSSProperties;
  /**
   * Background color variant
   */
  background?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'invert'
    | 'brand'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'light';
}

/**
 * Block component for creating structured section layouts.
 * Provides consistent spacing, backgrounds, and container behavior for content sections.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Block>
 *   <h2>Section Title</h2>
 *   <p>Section content goes here...</p>
 * </Block>
 *
 * // With custom spacing and background
 * <Block spacing="lg" background="subtle">
 *   <h2>Featured Section</h2>
 *   <p>This section has extra padding and a subtle background.</p>
 * </Block>
 *
 * // Full-width with custom container
 * <Block fullWidth background="primary">
 *   <Container type="lg">
 *     <h2>Hero Section</h2>
 *     <p>Full-width section with centered content.</p>
 *   </Container>
 * </Block>
 *
 * // As article element
 * <Block as="article" spacing="xl" background="accent">
 *   <h1>Blog Post</h1>
 *   <p>Article content...</p>
 * </Block>
 * ```
 */
export const Block = forwardRef<HTMLDivElement, BlockProps>(
  (
    {
      children,
      as: Component = 'section',
      spacing = 'md',
      container = {},
      fullWidth = false,
      className = '',
      style,
      background = '',
      ...props
    },
    ref
  ) => {
    const { generateBlockClass } = useBlock();

    const blockClasses = generateBlockClass({
      spacing,
      background,
      fullWidth,
      className,
    });

    return (
      <Component ref={ref} className={blockClasses} style={style} {...props}>
        {fullWidth ? (
          children
        ) : (
          <Container type={container.type} className={container.className}>
            {children}
          </Container>
        )}
      </Component>
    );
  }
);

Block.displayName = 'Block';

export default Block;
