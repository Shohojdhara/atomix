import { useMemo } from 'react';
import { FooterLayout, ThemeColor, Size, SocialLink } from '../types/components';
import { FOOTER } from '../constants/components';

export interface UseFooterOptions {
  layout?: FooterLayout;
  variant?: ThemeColor;
  size?: Size;
  sticky?: boolean;
  showNewsletter?: boolean;
  showBackToTop?: boolean;
  showDivider?: boolean;
  socialLinks?: SocialLink[];
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
  onBackToTop?: () => void;
  glass?: boolean;
  className?: string;
}

/** Raw column size map per layout */
type ColumnSizeMap = {
  brand: number | 'auto';
  content: number | 'auto';
  newsletter: number | 'auto';
};

/**
 * Resolves grid column size map for a given layout.
 */
function resolveColumnSizes(layout: FooterLayout, showNewsletter: boolean): ColumnSizeMap {
  switch (layout) {
    case 'columns':
      return {
        brand: 4,
        content: showNewsletter ? 4 : 8,
        newsletter: showNewsletter ? 4 : 0,
      };
    case 'centered':
    case 'minimal':
    case 'stacked':
      return {
        brand: 12,
        content: 12,
        newsletter: showNewsletter ? 12 : 0,
      };
    case 'flexible':
      return { brand: 'auto', content: 'auto', newsletter: 'auto' };
    case 'sidebar':
      return {
        brand: 3,
        content: 9,
        newsletter: showNewsletter ? 9 : 0,
      };
    case 'wide':
      return {
        brand: 3,
        content: 6,
        newsletter: showNewsletter ? 3 : 0,
      };
    default:
      return {
        brand: 4,
        content: showNewsletter ? 4 : 8,
        newsletter: showNewsletter ? 4 : 0,
      };
  }
}

/**
 * Computes responsive GridCol props for a given column type.
 */
function resolveResponsiveColProps(
  columnType: 'brand' | 'content' | 'newsletter',
  layout: FooterLayout,
  columnSizes: ColumnSizeMap
): Record<string, number | boolean> {
  if (layout === 'flexible' && columnSizes[columnType] === 'auto') {
    return { xs: 12, sm: true, md: true };
  }

  const isMultiColumn = layout === 'columns' || layout === 'sidebar' || layout === 'wide';
  const baseMd = isMultiColumn ? columnSizes[columnType] : 12;

  return { xs: 12, md: baseMd as number };
}

export function useFooter(options: UseFooterOptions = {}) {
  const {
    layout = FOOTER.DEFAULTS.LAYOUT as FooterLayout,
    variant = FOOTER.DEFAULTS.VARIANT,
    size = FOOTER.DEFAULTS.SIZE as Size,
    sticky = FOOTER.DEFAULTS.STICKY,
    showNewsletter = FOOTER.DEFAULTS.SHOW_NEWSLETTER,
    showBackToTop = FOOTER.DEFAULTS.SHOW_BACK_TO_TOP,
    showDivider = FOOTER.DEFAULTS.SHOW_DIVIDER,
    socialLinks = [],
    onNewsletterSubmit,
    onBackToTop,
    glass = false,
    className = '',
  } = options;

  // ---------- CSS class strings ----------

  const footerClass = useMemo(() => {
    const layoutKey = layout.toUpperCase() as keyof typeof FOOTER.CLASSES;
    const sizeKey = size.toUpperCase() as keyof typeof FOOTER.CLASSES;

    return [
      FOOTER.CLASSES.BASE,
      FOOTER.CLASSES[layoutKey] || FOOTER.CLASSES.COLUMNS,
      `c-footer--${variant}`,
      FOOTER.CLASSES[sizeKey] || FOOTER.CLASSES.MD,
      sticky && FOOTER.CLASSES.STICKY,
      showNewsletter && 'c-footer--with-newsletter',
      glass && 'c-footer--glass',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [layout, variant, size, sticky, showNewsletter, glass, className]);

  const containerClass = FOOTER.CLASSES.CONTAINER;
  const brandClass = FOOTER.CLASSES.BRAND;

  const sectionsClass = useMemo(() => {
    return [
      FOOTER.CLASSES.SECTIONS,
      layout === 'columns' && 'c-footer__sections--columns',
      layout === 'centered' && 'c-footer__sections--centered',
      layout === 'stacked' && 'c-footer__sections--stacked',
    ]
      .filter(Boolean)
      .join(' ');
  }, [layout]);

  const bottomClass = FOOTER.CLASSES.BOTTOM;

  // ---------- Grid helpers ----------

  const columnSizes = useMemo(
    () => resolveColumnSizes(layout, showNewsletter),
    [layout, showNewsletter]
  );

  const getResponsiveColumnProps = (columnType: 'brand' | 'content' | 'newsletter') =>
    resolveResponsiveColProps(columnType, layout, columnSizes);

  // ---------- Handlers ----------

  const handleNewsletterSubmit = (email: string) => {
    onNewsletterSubmit?.(email);
  };

  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    // Classes
    footerClass,
    containerClass,
    brandClass,
    sectionsClass,
    bottomClass,
    // Grid helpers
    columnSizes,
    getResponsiveColumnProps,
    // Handlers
    handleNewsletterSubmit,
    handleBackToTop,
    // Pass-through state
    socialLinks,
    showNewsletter,
    showBackToTop,
    showDivider,
  };
}
