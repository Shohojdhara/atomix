import React, { useState, useEffect, useRef, forwardRef, createContext, useContext } from 'react';
import { SideMenuProps } from '../../../lib/types/components';
import { useSideMenu } from '../../../lib/composables/useSideMenu';
import { Icon } from '../../Icon';
import { AtomixGlass } from '../../AtomixGlass/AtomixGlass';
import useForkRef from '../../../lib/utils/useForkRef';
import SideMenuList from './SideMenuList';
import SideMenuItem from './SideMenuItem';

// Context for passing LinkComponent to SideMenuItem children
const SideMenuContext = createContext<{
  LinkComponent?: React.ComponentType<{
    href?: string;
    to?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    target?: string;
    rel?: string;
    'aria-disabled'?: boolean;
    'aria-current'?: string;
    tabIndex?: number;
    ref?: React.Ref<HTMLAnchorElement>;
  }>;
}>({});

// Hook to use SideMenu context
export const useSideMenuContext = () => useContext(SideMenuContext);

/**
 * SideMenu component provides a collapsible navigation menu with title and menu items.
 * Automatically collapses on mobile devices and can be toggled via a header button.
 *
 * @example
 * ```tsx
 * <SideMenu title="Navigation">
 *   <SideMenuList>
 *     <SideMenuItem href="/" active>Home</SideMenuItem>
 *     <SideMenuItem href="/about">About</SideMenuItem>
 *     <SideMenuItem href="/contact">Contact</SideMenuItem>
 *   </SideMenuList>
 * </SideMenu>
 * ```
 */
export const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
  (
    {
      title,
      children,
      menuItems = [],
      isOpen,
      onToggle,
      collapsible = true,
      collapsibleDesktop = false,
      defaultCollapsedDesktop = false,
      className = '',
      style,
      disabled = false,
      toggleIcon,
      id,
      glass,
      LinkComponent,
    },
    ref
  ) => {
    const {
      isOpenState,
      wrapperRef,
      innerRef,
      sideMenuRef,
      generateSideMenuClass,
      generateWrapperClass,
      handleToggle,
    } = useSideMenu({
      isOpen,
      onToggle,
      collapsible,
      collapsibleDesktop,
      defaultCollapsedDesktop,
      disabled,
    });

    // Mobile breakpoint matches md breakpoint (768px)
    const MOBILE_BREAKPOINT = 768;

    // Track mobile state
    const [isMobileState, setIsMobileState] = useState(() => {
      if (typeof window === 'undefined') return false;
      return window.innerWidth < MOBILE_BREAKPOINT;
    });

    // Track open state for nested menu items
    const [nestedItemStates, setNestedItemStates] = useState<Record<number, boolean>>(() => {
      const initialState: Record<number, boolean> = {};
      menuItems?.forEach((_, index) => {
        initialState[index] = true; // Default to open
      });
      return initialState;
    });

    // Refs for nested menu item wrappers
    const nestedWrapperRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const nestedInnerRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const menuItemsLengthRef = useRef<number>(menuItems?.length ?? 0);

    useEffect(() => {
      const handleResize = () => {
        setIsMobileState(window.innerWidth < MOBILE_BREAKPOINT);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update nested item states when menuItems change
    useEffect(() => {
      const currentLength = menuItems?.length ?? 0;
      // Only update if the length actually changed to prevent infinite loops
      if (menuItemsLengthRef.current === currentLength) return;
      
      menuItemsLengthRef.current = currentLength;
      
      setNestedItemStates(prevStates => {
        const newStates: Record<number, boolean> = {};
        menuItems?.forEach((_, index) => {
          newStates[index] = prevStates[index] ?? true;
        });
        return newStates;
      });

      // Clean up refs for removed items
      Object.keys(nestedWrapperRefs.current).forEach(key => {
        const index = Number(key);
        if (index >= currentLength) {
          delete nestedWrapperRefs.current[index];
          delete nestedInnerRefs.current[index];
        }
      });
    }, [menuItems?.length]);

    // Helper function to update nested wrapper height
    const updateNestedHeight = (index: number, isOpen: boolean) => {
      const wrapper = nestedWrapperRefs.current[index];
      const inner = nestedInnerRefs.current[index];
      if (wrapper && inner) {
        wrapper.style.height = isOpen ? `${inner.scrollHeight}px` : '0px';
      }
    };

    // Set initial heights for nested wrappers on mount and when menuItems change
    useEffect(() => {
      if (!menuItems?.length) return;

      const timeoutId = setTimeout(() => {
        menuItems.forEach((_, index) => {
          const isOpen = nestedItemStates[index] ?? true;
          updateNestedHeight(index, isOpen);
        });
      }, 0);

      return () => clearTimeout(timeoutId);
      // Only run when menuItems change, nestedItemStates is read but not in deps to avoid loops
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuItems?.length]);

    // Update nested wrapper heights when state changes
    useEffect(() => {
      if (!menuItems?.length) return;

      const frameIds: number[] = [];

      Object.keys(nestedItemStates).forEach(key => {
        const index = Number(key);
        const isOpen = nestedItemStates[index] ?? true;

        const frameId = requestAnimationFrame(() => {
          updateNestedHeight(index, isOpen);
        });
        frameIds.push(frameId);
      });

      return () => {
        frameIds.forEach(id => cancelAnimationFrame(id));
      };
    }, [nestedItemStates, menuItems?.length]);

    // Combine refs using utility
    const combinedRef = useForkRef(sideMenuRef, ref);

    const sideMenuClass = generateSideMenuClass({
      className,
      isOpen: isOpenState,
    });
    const wrapperClass = generateWrapperClass();

    // Default toggle icon using Atomix Icon component
    const defaultToggleIcon = <Icon name="CaretRight" size="xs" />;

    // Determine if we should show toggler (mobile or desktop with collapsibleDesktop)
    const shouldShowToggler =
      (isMobileState && collapsible) || (!isMobileState && collapsibleDesktop);
    // Only show separate title if toggler is NOT shown (toggler already contains the title)
    const shouldShowTitle = title && !shouldShowToggler;

    const sideMenuContent = (
      <>
        {/* Toggler (works for both mobile and desktop) */}
        {title && shouldShowToggler && (
          <div
            className="c-side-menu__toggler"
            onClick={handleToggle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={isOpenState}
            aria-controls={id ? `${id}-content` : undefined}
            aria-disabled={disabled}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            <span className="c-side-menu__title">{title}</span>
            <span className="c-side-menu__toggler-icon">{toggleIcon || defaultToggleIcon}</span>
          </div>
        )}

        {/* Title (non-collapsible) */}
        {shouldShowTitle && <h3 className="c-side-menu__title">{title}</h3>}

        <div
          ref={wrapperRef}
          className={wrapperClass}
          id={id ? `${id}-content` : undefined}
          aria-hidden={shouldShowToggler ? !isOpenState : false}
        >
          <SideMenuContext.Provider value={{ LinkComponent }}>
            <div ref={innerRef} className="c-side-menu__inner">
              {children}
            {menuItems?.map((item, index) => {
              const isNestedItemOpen = nestedItemStates[index] ?? true;
              const hasItems = item.items && item.items.length > 0;
              const canToggle = hasItems && !disabled;

              const handleNestedToggle = () => {
                if (!canToggle) return;
                setNestedItemStates(prev => ({
                  ...prev,
                  [index]: !prev[index],
                }));
              };

              return (
                <div key={index} className="c-side-menu__item">
                  {item.title && (
                    <div
                      className={[
                        'c-side-menu__toggler',
                        canToggle && 'c-side-menu__toggler--nested',
                        isNestedItemOpen && 'is-open',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={canToggle ? handleNestedToggle : undefined}
                      role={canToggle ? 'button' : undefined}
                      tabIndex={canToggle && !disabled ? 0 : undefined}
                      aria-expanded={canToggle ? isNestedItemOpen : undefined}
                      aria-disabled={disabled}
                      onKeyDown={
                        canToggle
                          ? e => {
                              if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                                e.preventDefault();
                                handleNestedToggle();
                              }
                            }
                          : undefined
                      }
                    >
                      <span className="c-side-menu__title">{item.title}</span>
                      {canToggle && (
                        <span className="c-side-menu__toggler-icon">
                          {item.toggleIcon || <Icon name="CaretRight" size="xs" />}
                        </span>
                      )}
                    </div>
                  )}
                  {hasItems && (
                    <div
                      ref={node => {
                        nestedWrapperRefs.current[index] = node;
                      }}
                      className="c-side-menu__nested-wrapper"
                    >
                      <div
                        ref={node => {
                          nestedInnerRefs.current[index] = node;
                        }}
                        className="c-side-menu__nested-inner"
                      >
                        <SideMenuList>
                          {item.items?.map((subItem, subIndex) => (
                            <SideMenuItem
                              key={subIndex}
                              href={subItem.href}
                              onClick={subItem.onClick}
                              active={subItem.active}
                              disabled={subItem.disabled}
                              icon={subItem.icon}
                              LinkComponent={LinkComponent}
                            >
                              {subItem.title}
                            </SideMenuItem>
                          ))}
                        </SideMenuList>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </SideMenuContext.Provider>
        </div>
      </>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 70,
        blurAmount: 2,
        cornerRadius: 12,
        mode: 'shader' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return (
        <AtomixGlass {...glassProps}>
          <div
            ref={combinedRef}
            className={`${sideMenuClass} c-side-menu--glass`}
            id={id}
            style={style}
          >
            {sideMenuContent}
          </div>
        </AtomixGlass>
      );
    }

    return (
      <div ref={combinedRef} className={sideMenuClass} id={id} style={style}>
        {sideMenuContent}
      </div>
    );
  }
);

export type { SideMenuProps };

SideMenu.displayName = 'SideMenu';

export default SideMenu;
