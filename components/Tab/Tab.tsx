import React, { useState, ReactNode } from 'react';
import { TAB } from '../../lib/constants/components';

export interface TabItemProps {
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

export interface TabProps {
  /**
   * Array of tab items
   */
  items: TabItemProps[];

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
}

/**
 * Tab component for switching between different content panels
 */
export const Tab: React.FC<TabProps> = ({
  items,
  activeIndex = TAB.DEFAULTS.ACTIVE_INDEX,
  onTabChange,
  className = '',
}) => {
  const [currentTab, setCurrentTab] = useState(activeIndex);

  // Handle tab change
  const handleTabClick = (index: number) => {
    setCurrentTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className={`c-tabs js-atomix-tab ${className}`}>
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
    </div>
  );
};

Tab.displayName = 'Tab';

export default Tab;
