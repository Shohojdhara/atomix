"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagnifyingGlass, GithubLogo, List } from "phosphor-react";
import { ColorModeToggle } from "./ColorModeToggle";
import { SidebarMenu } from "./SidebarMenu";
import { Search } from "./Search";
import { Button, Navbar} from '@/atomix/components';
import '@shohojdhara/atomix/css';

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
    <div className="u-d-flex u-flex-column">
      {/* Header */}
      <Navbar collapsible className="u-backdrop-blur">
        <Navbar.Brand>
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
            <span className="u-fw-bold u-text-dark">Shohojdhara Atomix</span>
          </Link>
        </Navbar.Brand>

        {/* Search Bar */}
        <Navbar.Search>
          <Search>
            <Search.Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search documentation"
              aria-expanded={searchResults.length > 0}
              aria-controls="search-results"
              leftIcon={<MagnifyingGlass size={20} weight="bold" />}
            />
            {searchResults.length > 0 && (
              <Search.Results id="search-results">
                {searchResults.map((result, index) => (
                  <Search.ResultItem
                    key={index}
                    as={Link}
                    href={result.href}
                    onClick={() => setSearchQuery("")}
                  >
                    <span className="c-search-results__section">{result.section}</span>
                    <span className="c-search-results__title">{result.title}</span>
                  </Search.ResultItem>
                ))}
              </Search.Results>
            )}
          </Search>
        </Navbar.Search>

        <Navbar.Actions>
          <ColorModeToggle className="c-btn--outline-secondary" />

          <Button
            as="a"
            href="https://github.com/atomixdesign/atomix"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-secondary"
            iconOnly
            aria-label="View on GitHub"
          >
            <GithubLogo size={20} weight="bold" />
          </Button>

          <Button
            variant="outline-secondary"
            iconOnly
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-menu"
          >
            <List size={20} weight="bold" />
          </Button>
        </Navbar.Actions>
      </Navbar>

      <div className="o-container">
        <div className="o-grid">
          <div className="o-grid__col o-grid__col--2">
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

            <SidebarMenu 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
              navigationItems={navigationItems} 
            />
            
            </div>
            <main className="o-grid__col o-grid__col--10">
              {children}
            </main>
         </div>

     
      </div>

      {/* Footer */}
      <footer className="u-bg-light-100 u-p-6 u-border-top">
        <div className="o-container">
          <div className="u-d-flex u-flex-column u-flex-md-row u-justify-content-between u-align-items-center">
            <div className="u-mb-4 u-mb-md-0">
              <p className="u-mb-2">
                <span className="u-fw-bold">Shohojdhara Atomix</span> - A modern design system for React applications
              </p>
              <p className="u-text-muted u-fs-sm">
                &copy; {new Date().getFullYear()} Shohojdhara Atomix. All rights reserved.
              </p>
            </div>
            <div className="u-d-flex u-gap-4">
              <Button
                as="a"
                href="https://github.com/liimonx/atomix" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="link"
                leftIcon={<GithubLogo size={20} />}
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}