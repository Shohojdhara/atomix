"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="u-d-flex u-flex-column u-min-vh-100">
      {/* Header */}
      <header className="c-navbar c-navbar--collapsible">
        <div className="c-navbar__container">
          <div className="c-navbar__brand">
            <Link
              href="/"
              className="u-d-flex u-align-items-center u-gap-2 u-text-decoration-none"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <circle cx="16" cy="16" r="8" fill="white" />
              </svg>
              <span className="u-fw-bold u-text-dark">Atomix</span>
            </Link>
          </div>

          <div className="u-d-flex u-align-items-center u-gap-3">
            <button
              className="c-navbar__toggler"
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
            >
              <span className="c-navbar__toggler-icon"></span>
            </button>

            <button className="c-btn c-btn--outline-secondary c-btn--icon">
              <span className="c-btn__icon">🌙</span>
            </button>

            <a
              href="https://github.com/atomixdesign/atomix"
              target="_blank"
              rel="noopener noreferrer"
              className="c-btn c-btn--outline-secondary c-btn--icon"
              aria-label="View on GitHub"
            >
              <span className="c-btn__icon">📖</span>
            </a>
          </div>
        </div>
      </header>

      <div className="u-d-flex u-flex-1">
        {/* Sidebar */}
        <aside
          className={`c-side-menu ${isSidebarOpen ? "is-open" : ""}`}
        >
          <div className="c-side-menu__wrapper">
            <div className="c-side-menu__inner">
              {navigationItems.map((group) => (
                <div key={group.title} className="u-mb-6">
                  <h3 className="c-side-menu__title">{group.title}</h3>
                  <ul className="c-side-menu__list">
                    {group.items.map((item) => (
                      <li key={item.href} className="c-side-menu__item">
                        <Link
                          href={item.href}
                          className={`c-side-menu__link ${pathname === item.href ? "is-active" : ""}`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="u-flex-1 u-p-6">
          <div className="o-container">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="u-position-fixed u-top-0 u-start-0 u-w-100 u-h-100 u-bg-dark u-opacity-50"
          style={{ zIndex: 1000 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}