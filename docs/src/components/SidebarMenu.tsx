import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EdgePanel } from '../../../src/components/EdgePanel/EdgePanel';
import { Menu, MenuItem, MenuDivider } from '../../../src/components/Navbar/Menu';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{
    title: string;
    items: Array<{
      title: string;
      href: string;
    }>;
  }>;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  navigationItems
}) => {
  const pathname = usePathname();

  return (
    <EdgePanel
      title="Documentation"
      position="start"
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="c-docs-sidebar"
    >
      <div className="c-docs-sidebar__content">
        {navigationItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="c-docs-sidebar__section">
            <h3 className="c-docs-sidebar__section-title">{section.title}</h3>
            <Menu className="c-docs-sidebar__menu">
              {section.items.map((item, itemIndex) => (
                <MenuItem
                  key={itemIndex}
                  href={item.href}
                  active={pathname === item.href}
                  onClick={() => onClose()}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
            {sectionIndex < navigationItems.length - 1 && <MenuDivider />}
          </div>
        ))}
      </div>
    </EdgePanel>
  );
};