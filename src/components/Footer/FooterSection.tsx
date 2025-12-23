import React, { forwardRef } from 'react';
import { FooterSectionProps } from '../../lib/types/components';
import { GridCol } from '../../layouts';
import { useFooter } from '../../lib/composables/useFooter';

/**
 * FooterSection component provides a section within the footer for organizing links and content.
 *
 * @example
 * ```tsx
 * <FooterSection title="Products" icon={<ProductIcon />}>
 *   <FooterLink href="/product1">Product 1</FooterLink>
 *   <FooterLink href="/product2">Product 2</FooterLink>
 * </FooterSection>
 * ```
 */
export const FooterSection = forwardRef<
  HTMLDivElement,
  FooterSectionProps & { showNewsletter?: boolean }
>(
  (
    {
      title,
      icon,
      collapsible = false,
      defaultCollapsed = false,
      showNewsletter = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const handleToggle = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed);
      }
    };

    const sectionClass = [
      'c-footer__section',
      collapsible && 'c-footer__section--collapsible',
      isCollapsed && 'c-footer__section--collapsed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <GridCol xs={12} md={showNewsletter ? 6 : 3} className="c-footer__section-col">
        <div ref={ref} className={sectionClass} {...props}>
          {title && (
            <div className="c-footer__section-header">
              {collapsible ? (
                <button
                  type="button"
                  className="c-footer__section-toggle"
                  onClick={handleToggle}
                  aria-expanded={!isCollapsed}
                  aria-controls={`footer-section-${title.toString().toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {icon && <span className="c-footer__section-icon">{icon}</span>}
                  <h4 className="c-footer__section-title">{title}</h4>
                  <span className="c-footer__section-chevron">{isCollapsed ? '▼' : '▲'}</span>
                </button>
              ) : (
                <div className="c-footer__section-header-content">
                  {icon && <span className="c-footer__section-icon">{icon}</span>}
                  <h4 className="c-footer__section-title">{title}</h4>
                </div>
              )}
            </div>
          )}
          <div
            className="c-footer__section-content"
            id={
              title
                ? `footer-section-${title.toString().toLowerCase().replace(/\s+/g, '-')}`
                : undefined
            }
            style={{
              display: collapsible && isCollapsed ? 'none' : 'flex',
            }}
          >
            {children}
          </div>
        </div>
      </GridCol>
    );
  }
);

FooterSection.displayName = 'FooterSection';

export default FooterSection;
