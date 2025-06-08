"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagnifyingGlass, GithubLogo, List } from "phosphor-react";
import { ColorModeToggle } from "./ColorModeToggle";
import { SidebarMenu } from "./SidebarMenu";

// Add search functionality
const useSearch = (items: any[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const flattenedItems = items.flatMap(section =>
      section.items.map(item => ({
        ...item,
        section: section.title
      }))
    );

    const results = flattenedItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.section.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery, items]);

  return { searchQuery, setSearchQuery, searchResults };
};

interface DocsLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Quick Start", href: "/getting-started/quick-start" },
      { title: "Theming", href: "/getting-started/theming" },
    ],
  },
  {
    title: "Design Tokens",
    items: [
      { title: "Colors", href: "/design-tokens/colors" },
      { title: "Typography", href: "/design-tokens/typography" },
      { title: "Spacing", href: "/design-tokens/spacing" },
      { title: "Shadows", href: "/design-tokens/shadows" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/components/accordion" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Badge", href: "/components/badge" },
      { title: "Breadcrumb", href: "/components/breadcrumb" },
      { title: "Button", href: "/components/button" },
      { title: "Card", href: "/components/card" },
      { title: "Countdown", href: "/components/countdown" },
      { title: "DataTable", href: "/components/data-table" },
      { title: "DatePicker", href: "/components/date-picker" },
      { title: "Dropdown", href: "/components/dropdown" },
      { title: "Form", href: "/components/form" },
      { title: "Hero", href: "/components/hero" },
      { title: "Icon", href: "/components/icon" },
      { title: "Messages", href: "/components/messages" },
      { title: "Modal", href: "/components/modal" },
      { title: "Navbar", href: "/components/navbar" },
      { title: "Pagination", href: "/components/pagination" },
      { title: "Popover", href: "/components/popover" },
      { title: "Progress", href: "/components/progress" },
      { title: "Rating", href: "/components/rating" },
      { title: "Spinner", href: "/components/spinner" },
      { title: "Steps", href: "/components/steps" },
      { title: "Tab", href: "/components/tab" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Tooltip", href: "/components/tooltip" },
      { title: "Upload", href: "/components/upload" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Overview", href: "/utilities/overview" },
      { title: "Spacing", href: "/utilities/spacing" },
      { title: "Display", href: "/utilities/display" },
      { title: "Flexbox", href: "/utilities/flexbox" },
      { title: "Text", href: "/utilities/text" },
      { title: "Background", href: "/utilities/background" },
      { title: "Border", href: "/utilities/border" },
      { title: "Position", href: "/utilities/position" },
    ],
  },
];

export function DocsLayout({ children }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, searchResults } = useSearch(navigationItems);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="u-d-flex u-flex-column u-min-vh-100">
      {/* Header */}
      <header className="c-navbar c-navbar--collapsible u-backdrop-blur">
        <div className="c-navbar__container">
          <div className="c-navbar__brand">
            <Link
              href="/"
              className="u-d-flex u-align-items-center u-gap-2 u-text-decoration-none"
              aria-label="Atomix Home"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Atomix Logo"
              >
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <circle cx="16" cy="16" r="8" fill="white" />
              </svg>
              <span className="u-fw-bold u-text-dark">Atomix</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="c-navbar__search">
            <div className="c-search">
              <MagnifyingGlass className="c-search__icon" size={20} weight="bold" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="c-search__input"
                aria-label="Search documentation"
                aria-expanded={searchResults.length > 0}
                aria-controls="search-results"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="c-search-results" id="search-results" role="listbox">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    className="c-search-results__item"
                    onClick={() => setSearchQuery("")}
                    role="option"
                  >
                    <span className="c-search-results__section">{result.section}</span>
                    <span className="c-search-results__title">{result.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="u-d-flex u-align-items-center u-gap-3">
            <ColorModeToggle className="c-btn--outline-secondary" />

            <a
              href="https://github.com/atomixdesign/atomix"
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn c-btn--outline-secondary c-btn--icon"
              aria-label="View on GitHub"
            >
              <GithubLogo size={20} weight="bold" />
            </a>

            <button
              className="c-navbar__toggler c-btn c-btn--outline-secondary c-btn--icon"
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-menu"
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <div className="u-d-flex u-flex-1">
        {/* Desktop Sidebar - visible on larger screens */}
        <div className="c-desktop-sidebar">
          <div className="c-docs-sidebar__content">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="c-docs-sidebar__section">
                <h3 className="c-docs-sidebar__section-title">{section.title}</h3>
                <div className="c-menu">
                  <ul className="c-menu__list" role="menu">
                    {section.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className={`c-menu__item ${pathname === item.href ? 'is-active' : ''}`}
                        role="menuitem"
                      >
                        <Link
                          href={item.href}
                          className="c-menu__link"
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {sectionIndex < navigationItems.length - 1 && (
                  <div className="c-menu__divider" role="separator"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar - using EdgePanel */}
        <SidebarMenu 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          navigationItems={navigationItems} 
        />

        {/* Main Content */}
        <main className="u-flex-1 u-p-6">
          <div className="o-container">{children}</div>
        </main>
      </div>
    </div>
  );
}