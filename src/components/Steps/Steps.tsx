import React, { useEffect, useState, ReactNode, forwardRef, Children, cloneElement, isValidElement } from 'react';
import { STEPS } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps } from '../../lib/types/components';

// Legacy Item Interface
export interface StepItemData {
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

export type { StepItemData as StepItem };

// Compound Component Props
export interface StepsItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The number or icon for the step
   */
  number?: number | string | ReactNode;

  /**
   * The text label/title for the step
   */
  title?: ReactNode;

  /**
   * Whether the step is active
   */
  active?: boolean;

  /**
   * Whether the step is completed
   */
  completed?: boolean;

  /**
   * Index of the step (injected by parent)
   */
  index?: number;
}

export const StepsItem = forwardRef<HTMLDivElement, StepsItemProps>(
  ({ children, className = '', number, title, active, completed, index, ...props }, ref) => {
    const itemClasses = [
      'c-steps__item',
      active ? STEPS.CLASSES.ACTIVE : '',
      completed ? STEPS.CLASSES.COMPLETED : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={itemClasses}
        aria-current={active ? 'step' : undefined}
        data-index={index}
        {...props}
      >
        <div className="c-steps__line"></div>
        <div className="c-steps__content">
          {(number !== undefined && number !== null) && <div className="c-steps__number">{number}</div>}
          {title && <div className="c-steps__text">{title}</div>}
          {children && <div className="c-steps__custom-content">{children}</div>}
        </div>
      </div>
    );
  }
);

StepsItem.displayName = 'StepsItem';

export interface StepsProps {
  /**
   * Array of step items (Legacy)
   */
  items?: StepItemData[];

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

  /**
   * Inline style for the component
   */
  style?: React.CSSProperties;

  /**
   * Glass morphism effect for the steps component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Children (Compound)
   */
  children?: ReactNode;
}

type StepsComponent = React.FC<StepsProps> & {
  Item: typeof StepsItem;
  Step: typeof StepsItem; // Alias for convenience
};

/**
 * Steps component for displaying a sequence of steps
 */
const StepsComp: React.FC<StepsProps> = ({
  items,
  activeIndex = 0,
  vertical = false,
  onStepChange,
  className = '',
  style,
  glass,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(activeIndex);

  // Update steps when activeIndex prop changes
  useEffect(() => {
    if (currentStep !== activeIndex) {
      setCurrentStep(activeIndex);
    }
  }, [activeIndex]);

  // Method to go to next step (Internal helper)
  const goToNextStep = () => {
    const nextIndex = currentStep + 1;
    const maxIndex = items ? items.length : Children.count(children);
    if (nextIndex < maxIndex) {
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

  let content: ReactNode;

  if (items && items.length > 0) {
    // Legacy rendering
    content = items.map((item, index) => (
      <StepsItem
        key={`step-${index}`}
        index={index}
        number={item.number}
        title={item.text}
        active={index <= currentStep}
        completed={index < currentStep}
      >
        {item.content}
      </StepsItem>
    ));
  } else {
    // Compound rendering
    content = Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        const childProps = child.props as any;
        // Inject active/completed based on index if not explicitly provided
        const isActive = childProps.active ?? index <= currentStep;
        const isCompleted = childProps.completed ?? index < currentStep;

        // If number is not provided, default to index + 1
        const number = childProps.number ?? (index + 1);

        return cloneElement(child, {
          index,
          active: isActive,
          completed: isCompleted,
          number,
        } as any);
      }
      return child;
    });
  }

  const stepsContent = (
    <div
      className={`c-steps ${vertical ? STEPS.CLASSES.VERTICAL : ''} ${className}`}
      style={style}
      role="navigation"
      aria-label="Steps"
    >
      {content}
    </div>
  );

  if (glass) {
    // Default glass settings for steps
    const defaultGlassProps = {
      displacementScale: 60,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.5,
      borderRadius: 8,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{stepsContent}</AtomixGlass>;
  }

  return stepsContent;
};

export const Steps = StepsComp as StepsComponent;

Steps.displayName = 'Steps';
Steps.Item = StepsItem;
Steps.Step = StepsItem;

export default Steps;
