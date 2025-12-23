import React, { useState, ReactNode, memo } from 'react';
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
   * Array of tab items
   */
  items: TabsItemProps[];

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
}

/**
 * Tabs component for switching between different content panels
 */
export const Tabs: React.FC<TabsProps> = memo(({
  items,
  activeIndex = TAB.DEFAULTS.ACTIVE_INDEX,
  onTabChange,
  className = '',
  style,
  glass,
}) => {
  const [currentTab, setCurrentTab] = useState(activeIndex);

  // Handle tab change
  const handleTabClick = (index: number) => {
    setCurrentTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const tabContent = (
    <div className={`c-tabs js-atomix-tab ${className}`} style={style}>
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

    return <AtomixGlass {...glassProps}>{tabContent}</AtomixGlass>;
  }

  return tabContent;
});

Tabs.displayName = 'Tabs';

export default Tabs;
