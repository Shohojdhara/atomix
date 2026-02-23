import React, { useState, ReactNode, memo, createContext, useContext, forwardRef } from 'react';
import { TAB } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps } from '../../lib/types/components';

export interface TabsItemProps {
  /**
   * Label for the tab
   */
  label: string;

  /**
   * Content of the tab panel
   */
  content: ReactNode;

  /**
   * Whether the tab is initially active
   */
  isActive?: boolean;

  /**
   * Additional CSS class for the tab
   */
  className?: string;
}

export interface TabsProps {
  /**
   * Array of tab items (Legacy mode)
   */
  items?: TabsItemProps[];

  /**
   * Initial active tab index
   */
  activeIndex?: number;

  /**
   * Callback when tab changes
   */
  onTabChange?: (index: number) => void;

  /**
   * Additional CSS class for the tab component
   */
  className?: string;

  /**
   * Custom style for the tab component
   */
  style?: React.CSSProperties;

  /**
   * Glass morphism effect for the tab component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Children (Compound mode)
   */
  children?: ReactNode;
}

// Context for compound usage
const TabsContext = createContext<{
  currentTab: number;
  handleTabClick: (index: number) => void;
}>({
  currentTab: 0,
  handleTabClick: () => {},
});

// Compound components
export const TabsList = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <ul ref={ref} className={`c-tabs__nav ${className}`.trim()} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
             // Inject index into TabsTrigger
             return React.cloneElement(child, { index } as any);
          }
          return child;
        })}
      </ul>
    );
  }
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index?: number; // Injected by TabsList or passed explicitly
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, className = '', index, onClick, ...props }, ref) => {
    const { currentTab, handleTabClick } = useContext(TabsContext);

    // Safety check if used outside context or without index
    if (index === undefined) {
      console.warn('TabsTrigger requires an index prop or must be a direct child of TabsList');
    }

    const isActive = index !== undefined && currentTab === index;

    return (
      <li className="c-tabs__nav-item">
        <button
          ref={ref}
          className={`c-tabs__nav-btn ${isActive ? TAB.CLASSES.ACTIVE : ''} ${className}`.trim()}
          onClick={(e) => {
            if (index !== undefined) handleTabClick(index);
            onClick?.(e);
          }}
          data-tabindex={index}
          role="tab"
          aria-selected={isActive}
          aria-controls={`tab-panel-${index}`}
          type="button"
          {...props}
        >
          {children}
        </button>
      </li>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsPanels = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`c-tabs__panels ${className}`.trim()} {...props}>
        {React.Children.map(children, (child, index) => {
           if (React.isValidElement(child)) {
             return React.cloneElement(child, { index } as any);
           }
           return child;
        })}
      </div>
    );
  }
);
TabsPanels.displayName = 'TabsPanels';

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ children, className = '', index, style, ...props }, ref) => {
    const { currentTab } = useContext(TabsContext);
    const isActive = index !== undefined && currentTab === index;

    return (
      <div
        ref={ref}
        className={`c-tabs__panel ${isActive ? TAB.CLASSES.ACTIVE : ''} ${className}`.trim()}
        data-tabindex={index}
        id={`tab-panel-${index}`}
        role="tabpanel"
        aria-labelledby={`tab-nav-${index}`}
        style={{
          height: isActive ? 'auto' : '0px',
          opacity: isActive ? 1 : 0,
          overflow: 'hidden',
          transition: 'height 0.3s ease, opacity 0.3s ease',
          ...style,
        }}
        {...props}
      >
        <div className="c-tabs__panel-body">{children}</div>
      </div>
    );
  }
);
TabsPanel.displayName = 'TabsPanel';


/**
 * Tabs component for switching between different content panels
 */
type TabsComponent = React.FC<TabsProps> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Panels: typeof TabsPanels;
  Panel: typeof TabsPanel;
};

export const Tabs: TabsComponent = memo(
  ({
    items,
    activeIndex = TAB.DEFAULTS.ACTIVE_INDEX,
    onTabChange,
    className = '',
    style,
    glass,
    children,
  }: TabsProps) => {
    const [currentTab, setCurrentTab] = useState(activeIndex);

    // Handle tab change
    const handleTabClick = (index: number) => {
      setCurrentTab(index);
      if (onTabChange) {
        onTabChange(index);
      }
    };

    // Determine content based on mode (legacy items vs compound children)
    let content: ReactNode;

    // Use items prop if provided
    if (items && items.length > 0) {
      // Legacy mode
      content = (
        <>
          <ul className="c-tabs__nav">
            {items.map((item, index) => (
              <li className="c-tabs__nav-item" key={`tab-nav-${index}`}>
                <button
                  className={`c-tabs__nav-btn ${index === currentTab ? TAB.CLASSES.ACTIVE : ''}`}
                  onClick={() => handleTabClick(index)}
                  data-tabindex={index}
                  role="tab"
                  aria-selected={index === currentTab}
                  aria-controls={`tab-panel-${index}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="c-tabs__panels">
            {items.map((item, index) => (
              <div
                className={`c-tabs__panel ${index === currentTab ? TAB.CLASSES.ACTIVE : ''}`}
                key={`tab-panel-${index}`}
                data-tabindex={index}
                id={`tab-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`tab-nav-${index}`}
                style={{
                  height: index === currentTab ? 'auto' : '0px',
                  opacity: index === currentTab ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'height 0.3s ease, opacity 0.3s ease',
                }}
              >
                <div className="c-tabs__panel-body">{item.content}</div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      // Compound mode
      content = (
        <TabsContext.Provider value={{ currentTab, handleTabClick }}>
          {children}
        </TabsContext.Provider>
      );
    }

    const wrapper = (
      <div className={`c-tabs js-atomix-tab ${className}`} style={style}>
        {content}
      </div>
    );

    if (glass) {
      // Default glass settings for tabs
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1,
        saturation: 160,
        aberrationIntensity: 0.5,
        cornerRadius: 8,
        mode: 'shader' as const,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{wrapper}</AtomixGlass>;
    }

    return wrapper;
  }
) as unknown as TabsComponent;

Tabs.displayName = 'Tabs';
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Panels = TabsPanels;
Tabs.Panel = TabsPanel;

export default Tabs;
