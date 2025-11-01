import React, { forwardRef } from 'react';
import { FooterProps } from '../../lib/types/components';
import { useFooter } from '../../lib/composables/useFooter';
import { Button } from '../Button';
import { Input, Form } from '../Form';
import { FooterSocialLink } from './FooterSocialLink';
import { Grid, GridCol } from '../../layouts/Grid';
import { FooterSection } from './FooterSection';

/**
 * Footer component provides a comprehensive footer section with multiple layout options,
 * social links, newsletter signup, and responsive design.
 *
 * @example
 * ```tsx
 * <Footer
 *   brand="My Company"
 *   copyright="© 2024 My Company. All rights reserved."
 *   layout="columns"
 *   showNewsletter
 *   socialLinks={[
 *     { platform: 'twitter', url: 'https://twitter.com/company' },
 *     { platform: 'facebook', url: 'https://facebook.com/company' }
 *   ]}
 * >
 *   <FooterSection title="Products">
 *     <FooterLink href="/product1">Product 1</FooterLink>
 *     <FooterLink href="/product2">Product 2</FooterLink>
 *   </FooterSection>
 * </Footer>
 * ```
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      brandLogo,
      brandDescription,
      copyright,
      layout = 'columns',
      variant = 'primary',
      size = 'md',
      showNewsletter = false,
      newsletterTitle = 'Stay Updated',
      newsletterDescription = 'Subscribe to our newsletter for the latest updates.',
      newsletterPlaceholder = 'Enter your email',
      newsletterButtonText = 'Subscribe',
      onNewsletterSubmit,
      socialLinks = [],
      showBackToTop = false,
      backToTopText = 'Back to Top',
      onBackToTop,
      showDivider = true,
      sticky = false,
      children,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const {
      footerClass,
      containerClass,
      brandClass,
      sectionsClass,
      bottomClass,
      handleNewsletterSubmit,
      handleBackToTop,
      socialLinks: footerSocialLinks,
    } = useFooter({
      layout,
      variant,
      size,
      sticky,
      showNewsletter,
      showBackToTop,
      socialLinks,
      onNewsletterSubmit,
      onBackToTop,
      className,
    });

    // Calculate grid column sizes based on layout
    const getGridColumnSizes = () => {
      switch (layout) {
        case 'columns':
          // For columns layout, we have 3 columns (brand, content, newsletter)
          return { brand: 4, content: !showNewsletter ? 8 : 4, newsletter: !showNewsletter ? 0 : 4 };
        case 'centered':
          // For centered layout, brand takes full width, content and newsletter are centered
          return { brand: 12, content: 12, newsletter: !showNewsletter ? 0 : 12 };
        case 'minimal':
          // For minimal layout, everything takes full width
          return { brand: 12, content: 12, newsletter: !showNewsletter ? 0 : 12 };
        case 'stacked':
          // For stacked layout, everything takes full width but stacked vertically
          return { brand: 12, content: 12, newsletter: !showNewsletter ? 0 : 12 };
        case 'flexible':
          // For flexible layout, adjust based on content
          return { brand: 'auto', content: 'auto', newsletter: 'auto' };
        case 'sidebar':
          // For sidebar layout, brand on left, content and newsletter on right
          return { brand: 3, content: !showNewsletter ? 9 : 9, newsletter: !showNewsletter ? 0 : 9 };
        case 'wide':
          // For wide layout, content takes more space
          return { brand: 3, content: !showNewsletter ? 6 : 6, newsletter: !showNewsletter ? 0 : 3 };
        default:
          return { brand: 4, content: !showNewsletter ? 8 : 4, newsletter: !showNewsletter ? 0 : 4 };
      }
    };

    const columnSizes = getGridColumnSizes();
    
    // Calculate responsive column sizes
    const getResponsiveColumnProps = (columnType: 'brand' | 'content' | 'newsletter') => {
      const baseMd = layout === 'columns' || layout === 'sidebar' || layout === 'wide' ? columnSizes[columnType] : 12;
      
      // For flexible layout, we want auto-sizing
      if (layout === 'flexible' && columnSizes[columnType] === 'auto') {
        return { xs: 12, sm: true, md: true };
      }
      
      // For other layouts, we use specific sizes
      return { xs: 12, md: baseMd };
    };

    return (
      <footer ref={ref} className={footerClass} {...props}>
        <div className={containerClass}>
          {/* Main Footer Content */}
          <Grid className={sectionsClass} alignItems="start" justifyContent={layout === 'centered' ? 'center' : undefined}>
            {/* Brand Section */}
            {(brand || brandLogo || brandDescription) && (
              <GridCol 
                {...getResponsiveColumnProps('brand') as any}
                className={brandClass}
              >
                {brandLogo && (
                  <div className="c-footer__brand-logo">
                    {typeof brandLogo === 'string' ? (
                      <img src={brandLogo} alt={'Brand Logo'} />
                    ) : (
                      brandLogo
                    )}
                  </div>
                )}
                {brand && (
                  <div className="c-footer__brand-name">
                    {typeof brand === 'string' ? <h3>{brand}</h3> : brand}
                  </div>
                )}
                {brandDescription && (
                  <div className="c-footer__brand-description">
                    {brandDescription}
                  </div>
                )}
                {socialLinks.length > 0 && (
                  <div className="c-footer__social" data-testid="footer-social-links">
                    {socialLinks.map((link, index) => (
                      <FooterSocialLink
                        key={`${link.platform}-${index}`}
                        platform={link.platform}
                        url={link.url}
                        icon={link.icon}
                        label={link.label}
                        size={size}
                      />
                    ))}
                  </div>
                )}
              </GridCol>
            )}

            {/* Footer Sections */}
            {children && (
              <GridCol 
                {...getResponsiveColumnProps('content') as any}
                className="c-footer__content"
              >
                <Grid className='c-footer__sections' alignItems={layout === 'centered' || layout === 'stacked' ? 'center' : undefined}>
                  {React.Children.map(children, (child) => {
                    // Check if the child is a valid React element
                    if (React.isValidElement(child)) {
                      console.log('Footer - passing showNewsletter:', showNewsletter, typeof showNewsletter);
                      // Clone the element and pass the showNewsletter prop
                      return React.cloneElement(child, { showNewsletter } as any);
                    }
                    return child;
                  })}
                </Grid>
              </GridCol>
            )}

            {/* Newsletter Section */}
            {showNewsletter && (
              <GridCol 
                {...getResponsiveColumnProps('newsletter') as any}
                className="c-footer__newsletter"
              >
                <h4 className="c-footer__newsletter-title">{newsletterTitle}</h4>
                {newsletterDescription && (
                  <p className="c-footer__newsletter-description">{newsletterDescription}</p>
                )}
                <Form className="c-footer__newsletter-form" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email') as string;
                  if (email) handleNewsletterSubmit(email);
                }}>
                  <div className="c-footer__newsletter-input-group">
                    <Input
                      type="email"
                      name="email"
                      className="c-footer__newsletter-input"
                      placeholder={newsletterPlaceholder}
                      required
                    />
                    <Button type="submit" className="c-footer__newsletter-button">
                      {newsletterButtonText}
                    </Button>
                  </div>
                </Form>
              </GridCol>
            )}
          </Grid>

          {(copyright || showBackToTop) && (
            <div className={bottomClass}>
              {copyright && (
                <div className="c-footer__copyright">
                  {copyright}
                </div>
              )}
              {showBackToTop && (
                <Button
                  variant="ghost"
                  className="c-footer__back-to-top"
                  onClick={handleBackToTop}
                  disabled={disabled}
                  aria-label={backToTopText}
                >
                  <span className="c-footer__back-to-top-icon">↑</span>
                  <span className="c-footer__back-to-top-text">{backToTopText}</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;