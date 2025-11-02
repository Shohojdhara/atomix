import { FooterLayout, ThemeColor, Size, SocialLink } from '../types/components';
import { FOOTER } from '../constants/components';

export interface UseFooterOptions {
  layout?: FooterLayout;
  variant?: ThemeColor;
  size?: Size;
  sticky?: boolean;
  showNewsletter?: boolean;
  showBackToTop?: boolean;
  socialLinks?: SocialLink[];
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
  onBackToTop?: () => void;
  className?: string;
}

export function useFooter(options: UseFooterOptions = {}) {
  const {
    layout = FOOTER.DEFAULTS.LAYOUT,
    variant = FOOTER.DEFAULTS.VARIANT,
    size = FOOTER.DEFAULTS.SIZE,
    sticky = FOOTER.DEFAULTS.STICKY,
    showNewsletter = FOOTER.DEFAULTS.SHOW_NEWSLETTER,
    showBackToTop = FOOTER.DEFAULTS.SHOW_BACK_TO_TOP,
    socialLinks = [],
    onNewsletterSubmit,
    onBackToTop,
    className = '',
  } = options;

  // Generate footer classes
  const footerClass = (() => {
    const classes = [
      FOOTER.CLASSES.BASE,
      FOOTER.CLASSES[layout.toUpperCase() as keyof typeof FOOTER.CLASSES] || FOOTER.CLASSES.COLUMNS,
      `c-footer--${variant}`,
      FOOTER.CLASSES[size.toUpperCase() as keyof typeof FOOTER.CLASSES] || FOOTER.CLASSES.MD,
      sticky && FOOTER.CLASSES.STICKY,
      showNewsletter && 'c-footer--with-newsletter',
      className,
    ];
    return classes.filter(Boolean).join(' ');
  })();

  const containerClass = FOOTER.CLASSES.CONTAINER;
  const brandClass = FOOTER.CLASSES.BRAND;
  const sectionsClass = (() => {
    const classes = [
      FOOTER.CLASSES.SECTIONS,
      layout === 'columns' && 'c-footer__sections--columns',
      layout === 'centered' && 'c-footer__sections--centered',
      layout === 'stacked' && 'c-footer__sections--stacked',
    ];
    return classes.filter(Boolean).join(' ');
  })();
  const bottomClass = FOOTER.CLASSES.BOTTOM;

  // Handle newsletter submission
  const handleNewsletterSubmit = (email: string) => {
    if (onNewsletterSubmit) {
      onNewsletterSubmit(email);
    }
  };

  // Handle back to top
  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    footerClass,
    containerClass,
    brandClass,
    sectionsClass,
    bottomClass,
    handleNewsletterSubmit,
    handleBackToTop,
    socialLinks,
    showNewsletter,
  };
}
