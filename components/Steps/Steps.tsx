import React, { useEffect, useState, ReactNode } from 'react';
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

  // Update steps when activeIndex prop changes
  useEffect(() => {
    if (currentStep !== activeIndex) {
      setCurrentStep(activeIndex);
    }
  }, [activeIndex]);

  // Method to go to next step
  const goToNextStep = () => {
    const nextIndex = currentStep + 1;
    if (nextIndex < items.length) {
      setCurrentStep(nextIndex);
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
      if (onStepChange) {
        onStepChange(prevIndex);
      }
    }
  };

  return (
    <div
      className={`c-steps ${vertical ? STEPS.CLASSES.VERTICAL : ''} ${className}`}
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
