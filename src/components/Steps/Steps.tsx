import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { STEPS } from '../../lib/constants/components';

export interface StepItem {
  /**
   * The number for the step
   */
  number: number | string | ReactNode;

  /**
   * The text label for the step
   */
  text: string;

  /**
   * Optional custom content for the step
   */
  content?: React.ReactNode;
}

export interface StepsProps {
  /**
   * Array of step items
   */
  items: StepItem[];

  /**
   * Current active step index (0-based)
   */
  activeIndex?: number;

  /**
   * Whether to display steps vertically
   */
  vertical?: boolean;

  /**
   * Called when active step changes
   */
  onStepChange?: (index: number) => void;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Steps component for displaying a sequence of steps
 */
export const Steps: React.FC<StepsProps> = ({
  items,
  activeIndex = 0,
  vertical = false,
  onStepChange,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(activeIndex);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInstance = useRef<any>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !stepsRef.current) return undefined;

    // Dynamically import the steps script to avoid server-side rendering issues
    import('./scripts').then(({ default: StepsClass }) => {
      if (stepsRef.current) {
        stepsInstance.current = new StepsClass(stepsRef.current, {
          activeIndex: currentStep,
          vertical,
        });
      }
    });

    // Cleanup on unmount
    return () => {
      if (stepsInstance.current) {
        stepsInstance.current.destroy();
      }
    };
  }, []);

  // Update steps when activeIndex prop changes
  useEffect(() => {
    if (currentStep !== activeIndex) {
      setCurrentStep(activeIndex);

      if (stepsInstance.current) {
        stepsInstance.current.setActive(activeIndex);
      }
    }
  }, [activeIndex]);

  // Method to go to next step
  const goToNextStep = () => {
    const nextIndex = currentStep + 1;
    if (nextIndex < items.length) {
      setCurrentStep(nextIndex);

      if (stepsInstance.current) {
        stepsInstance.current.next();
      }

      if (onStepChange) {
        onStepChange(nextIndex);
      }
    }
  };

  // Method to go to previous step
  const goToPreviousStep = () => {
    const prevIndex = currentStep - 1;
    if (prevIndex >= 0) {
      setCurrentStep(prevIndex);

      if (stepsInstance.current) {
        stepsInstance.current.previous();
      }

      if (onStepChange) {
        onStepChange(prevIndex);
      }
    }
  };

  return (
    <div
      className={`c-steps ${vertical ? STEPS.CLASSES.VERTICAL : ''} ${className}`}
      ref={stepsRef}
      role="navigation"
      aria-label="Steps"
    >
      {items.map((item, index) => (
        <div
          key={`step-${index}`}
          className={`c-steps__item ${index <= currentStep ? STEPS.CLASSES.ACTIVE : ''} ${index < currentStep ? STEPS.CLASSES.COMPLETED : ''}`}
          aria-current={index === currentStep ? 'step' : undefined}
        >
          <div className="c-steps__line"></div>
          <div className="c-steps__content">
            <div className="c-steps__number">{item.number}</div>
            <div className="c-steps__text">{item.text}</div>
            {item.content && <div className="c-steps__custom-content">{item.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

Steps.displayName = 'Steps';

export default Steps;
