import React, { useRef, useEffect, ReactNode } from 'react';
import { TESTIMONIAL } from '../../lib/constants/components';

interface TestimonialAuthor {
  /**
   * The author's name
   */
  name: string;
  
  /**
   * The author's role or title
   */
  role: string;
  
  /**
   * The URL to the author's avatar image
   */
  avatarSrc?: string;
  
  /**
   * Alternative text for the avatar image
   */
  avatarAlt?: string;
}

interface TestimonialProps {
  /**
   * The testimonial quote text or content
   */
  quote: ReactNode;
  
  /**
   * Author information
   */
  author?: TestimonialAuthor;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'lg' | '';
  
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
 * Testimonial component for displaying customer quotes and feedback
 */
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  size = '',
  skeleton = false,
  className = '',
}) => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInstance = useRef<any>(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !testimonialRef.current) return;

    // Dynamically import the testimonial script to avoid server-side rendering issues
    import('./scripts').then(({ default: TestimonialClass }) => {
      if (testimonialRef.current) {
        testimonialInstance.current = new TestimonialClass(testimonialRef.current, {
          size,
          skeleton
        });
      }
    });
    
    // Cleanup on unmount
    return () => {
      if (testimonialInstance.current) {
        testimonialInstance.current.destroy();
      }
    };
  }, [size, skeleton]);
  
  // Determine CSS classes
  const testimonialClasses = [
    'c-testimonial',
    size === 'sm' ? TESTIMONIAL.CLASSES.SMALL : '',
    size === 'lg' ? TESTIMONIAL.CLASSES.LARGE : '',
    className
  ].filter(Boolean).join(' ');
  
  // Render skeleton version
  if (skeleton) {
    return (
      <div className={testimonialClasses} ref={testimonialRef}>
        <blockquote className="c-testimonial__quote">
          <span className="c-skeleton"></span>
          <span className="c-skeleton"></span>
          <span className="c-skeleton u-w-75"></span>
          <span className="c-skeleton u-w-25"></span>
        </blockquote>
        <div className="c-testimonial__author">
          <span className="c-testimonial__author-avatar c-avatar c-avatar--xxl c-avatar--circle c-skeleton"></span>
          <div className="c-testimonial__info u-w-75">
            <p className="c-testimonial__author-name">
              <span className="c-skeleton u-w-25"></span>
            </p>
            <p className="c-testimonial__author-role">
              <span className="c-skeleton u-w-25"></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Render normal version
  return (
    <div className={testimonialClasses} ref={testimonialRef}>
      <blockquote className="c-testimonial__quote">
        {quote}
      </blockquote>
      {author && (
        <div className="c-testimonial__author">
          {author.avatarSrc && (
            <img
              src={author.avatarSrc}
              alt={author.avatarAlt || ''}
              className="c-testimonial__author-avatar c-avatar c-avatar--xxl c-avatar--circle"
            />
          )}
          <div className="c-testimonial__info">
            <p className="c-testimonial__author-name">{author.name}</p>
            <p className="c-testimonial__author-role">{author.role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export type { TestimonialProps, TestimonialAuthor };

// Set display name for debugging
Testimonial.displayName = 'Testimonial';

// Default export (primary)
export default Testimonial;

// Named export for compatibility
export { Testimonial };