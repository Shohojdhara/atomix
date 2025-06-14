import React, { useRef, useEffect, ReactNode } from 'react';
import { SECTION_INTRO } from '../../lib/constants/components';

export interface SectionIntroProps {
  /**
   * The section title
   */
  title: ReactNode;
  
  /**
   * Optional subtitle or overline text
   */
  /**
   * Optional label text (equivalent to subtitle in the UI)
   */
  label?: ReactNode;
  
  /**
   * Optional description text
   */
  /**
   * Optional text content
   */
  text?: ReactNode;
  
  /**
   * Optional call to action elements
   */
  actions?: ReactNode;
  
  /**
   * Alignment of the content
   */
  alignment?: 'left' | 'center' | 'right';
  
  /**
   * Optional background image URL
   */
  backgroundImageSrc?: string;
  
  /**
   * Whether to show an overlay on the background
   */
  showOverlay?: boolean;
  
  /**
   * Optional foreground image URL
   */
  imageSrc?: string;
  
  /**
   * Alternative text for the image
   */
  imageAlt?: string;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to show a skeleton loading state
   */
  skeleton?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * SectionIntro component for introducing content sections with titles, descriptions, and optional imagery
 */
export const SectionIntro: React.FC<SectionIntroProps> = ({
  title,
  label,
  text,
  actions,
  alignment = 'left',
  backgroundImageSrc,
  showOverlay = false,
  imageSrc,
  imageAlt = 'Section image',
  size = 'md',
  skeleton = false,
  className = '',
}) => {
  const sectionIntroRef = useRef<HTMLDivElement>(null);
  const sectionIntroInstance = useRef<any>(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !sectionIntroRef.current) return undefined;

    // Dynamically import the section intro script to avoid server-side rendering issues
    import('./scripts').then(({ default: SectionIntroClass }) => {
      if (sectionIntroRef.current) {
        sectionIntroInstance.current = new SectionIntroClass(sectionIntroRef.current, {
          alignment,
          backgroundImageSrc,
          showOverlay,
          size,
          skeleton
        });
      }
    });
    
    // Cleanup on unmount
    return () => {
      if (sectionIntroInstance.current) {
        sectionIntroInstance.current.destroy();
      }
    };
  }, [alignment, backgroundImageSrc, showOverlay, size, skeleton]);
  
  // Determine CSS classes
  const sectionIntroClasses = [
    'c-sectionintro',
    alignment === 'center' ? SECTION_INTRO.CLASSES.CENTER : '',
    size === 'sm' ? SECTION_INTRO.CLASSES.SMALL : '',
    size === 'lg' ? SECTION_INTRO.CLASSES.LARGE : '',
    backgroundImageSrc ? 'c-sectionintro--has-bg' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Render skeleton version
  if (skeleton) {
    return (
      <div className={sectionIntroClasses} ref={sectionIntroRef}>
        <div className="c-sectionintro__container o-container">
          {label && (
            <div className="c-sectionintro__label">
              <span className="c-skeleton u-w-25"></span>
            </div>
          )}
          <div className="c-sectionintro__title">
            <span className="c-skeleton"></span>
          </div>
          {text && (
            <div className="c-sectionintro__text">
              <span className="c-skeleton"></span>
              <span className="c-skeleton"></span>
              <span className="c-skeleton u-w-75"></span>
            </div>
          )}
          {actions && (
            <div className="c-sectionintro__actions">
              <span className="c-skeleton u-w-25"></span>
            </div>
          )}
          {imageSrc && (
            <div className="c-sectionintro__image-wrapper">
              <div className="c-sectionintro__image c-skeleton"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Render background if provided
  const renderBackground = () => {
    if (!backgroundImageSrc) return null;
    
    return (
      <div className="c-sectionintro__bg">
        <img
          src={backgroundImageSrc}
          alt="Background"
          className="c-sectionintro__bg-image"
        />
        {showOverlay && <div className="c-sectionintro__overlay"></div>}
      </div>
    );
  };
  
  // Render normal version
  return (
    <div className={sectionIntroClasses} ref={sectionIntroRef}>
      {renderBackground()}
      <div className="c-sectionintro__container o-container">
        {label && <div className="c-sectionintro__label">{label}</div>}
        <h2 className="c-sectionintro__title">{title}</h2>
        {text && <div className="c-sectionintro__text">{text}</div>}
        {actions && <div className="c-sectionintro__actions">{actions}</div>}
        {imageSrc && (
          <div className="c-sectionintro__image-wrapper">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="c-sectionintro__image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

SectionIntro.displayName = 'SectionIntro';

export default SectionIntro;
