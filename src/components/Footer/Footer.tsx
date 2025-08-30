import React, { forwardRef } from 'react';
import { FooterProps } from '../../lib/types/components';
import { useFooter } from '../../lib/composables/useFooter';
import { Button } from '../Button';
import { Input, Form } from '../Form';
import { FooterSocialLink } from './FooterSocialLink';

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

    return (
      <footer ref={ref} className={footerClass} {...props}>
        <div className={containerClass}>
          {/* Main Footer Content */}
          <div className={sectionsClass}>
            {/* Brand Section */}
            {(brand || brandLogo || brandDescription) && (
              <div className={brandClass}>
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
                  <div className="c-footer__social">
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
              </div>
            )}

            {/* Footer Sections */}
            {children && (
              <div className="c-footer__sections">
                {children}
              </div>
            )}

            {/* Newsletter Section */}
            {showNewsletter && (
              <div className="c-footer__newsletter">
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
              </div>
            )}
          </div>

          {/* Footer Bottom */}
          {(copyright || showBackToTop) && showDivider && (
            <hr className="c-footer__divider" />
          )}

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