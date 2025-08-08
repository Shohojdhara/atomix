# Guide: Building Atomix Documentation Site

## Overview

You are tasked with creating a comprehensive, modern, and aesthetic documentation website for the Atomix Design System using **EXCLUSIVELY** Atomix components. This guide provides exhaustive instructions to prevent ALL possible mistakes and build a professional documentation site that showcases the design system's capabilities.

## ⚠️ CRITICAL PREREQUISITES - READ FIRST

### Absolute Requirements
1. **NEVER** create custom components when Atomix equivalents exist
2. **ALWAYS** use Atomix components for ALL UI elements
3. **MANDATORY** TypeScript throughout the entire project
4. **REQUIRED** to follow the exact file structure specified below
5. **ESSENTIAL** to implement all accessibility features
6. **OBLIGATORY** to use CSS custom properties for theming

### Project Overview
- **Purpose**: Showcase Atomix Design System using its own components
- **Technology**: React 18.2+, TypeScript 5.0+, Vite 4.4+
- **Design**: Modern, accessible, responsive, professional
- **Components**: 100% Atomix components only

## Project Structure Requirements

### Mandatory Directory Structure
```
atomix-docs-site/
├── public/
│   ├── favicon.ico                    # Atomix logo as favicon
│   ├── atomix-logo.svg               # Vector logo file
│   ├── robots.txt                     # SEO requirements
│   ├── sitemap.xml                    # SEO requirements
│   └── assets/
│       ├── images/
│       │   ├── hero-background.jpg    # Hero section background
│       │   ├── component-previews/    # Component preview images
│       │   └── examples/              # Example screenshots
│       ├── icons/                     # Additional icon assets
│       └── videos/                    # Demo videos if needed
├── src/
│   ├── components/                    # ALL use Atomix components
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # Main application layout
│   │   │   ├── DocumentationHeader.tsx # Site header with navigation
│   │   │   ├── DocumentationSidebar.tsx # Navigation sidebar
│   │   │   ├── DocumentationFooter.tsx # Site footer
│   │   │   ├── MobileNavigation.tsx   # Mobile-specific navigation
│   │   │   └── PageLayout.tsx         # Individual page wrapper
│   │   ├── documentation/
│   │   │   ├── ComponentShowcase.tsx  # Component demonstration
│   │   │   ├── InteractiveDemo.tsx    # Live component demos
│   │   │   ├── CodeBlockWithCopy.tsx  # Code examples with copy
│   │   │   ├── PropsDocumentation.tsx # Props tables
│   │   │   ├── ApiReference.tsx       # API documentation
│   │   │   ├── UsageExamples.tsx      # Real-world examples
│   │   │   ├── AccessibilityGuide.tsx # A11y documentation
│   │   │   ├── DesignTokensDisplay.tsx # Design tokens showcase
│   │   │   └── ComponentPreview.tsx   # Preview containers
│   │   ├── navigation/
│   │   │   ├── MainNavigation.tsx     # Primary navigation
│   │   │   ├── BreadcrumbNavigation.tsx # Breadcrumb trail
│   │   │   ├── TableOfContents.tsx    # Page TOC
│   │   │   ├── SearchInterface.tsx    # Global search
│   │   │   └── NavigationLinks.tsx    # Navigation utilities
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Landing page hero
│   │   │   ├── FeaturesSection.tsx    # Features overview
│   │   │   ├── QuickStartGuide.tsx    # Getting started
│   │   │   ├── ComponentGrid.tsx      # Component overview
│   │   │   ├── TestimonialsSection.tsx # User testimonials
│   │   │   ├── StatisticsSection.tsx  # Usage statistics
│   │   │   └── CallToActionSection.tsx # CTA sections
│   │   ├── ui/
│   │   │   ├── GlobalSearch.tsx       # Search functionality
│   │   │   ├── ThemeSelector.tsx      # Theme switching
│   │   │   ├── LanguageSelector.tsx   # Multi-language support
│   │   │   ├── BackToTopButton.tsx    # Scroll to top
│   │   │   ├── LoadingStates.tsx      # Loading indicators
│   │   │   ├── ErrorBoundary.tsx      # Error handling
│   │   │   └── NotificationSystem.tsx # User notifications
│   │   └── examples/
│   │       ├── GalleryExamples.tsx    # Photo gallery examples
│   │       ├── FormExamples.tsx       # Form demonstrations
│   │       ├── NavigationExamples.tsx # Navigation patterns
│   │       ├── CardExamples.tsx       # Card layout examples
│   │       └── DashboardExamples.tsx  # Dashboard layouts
│   ├── pages/
│   │   ├── HomePage.tsx               # Landing page
│   │   ├── GettingStartedPage.tsx     # Installation guide
│   │   ├── ComponentsIndexPage.tsx    # Components overview
│   │   ├── ComponentDetailPage.tsx    # Individual component pages
│   │   ├── DesignTokensPage.tsx       # Design tokens documentation
│   │   ├── GuidelinesPage.tsx         # Design guidelines
│   │   ├── AccessibilityPage.tsx      # Accessibility standards
│   │   ├── ExamplesPage.tsx           # Real-world examples
│   │   ├── ThemingPage.tsx            # Theming documentation
│   │   ├── MigrationGuidePage.tsx     # Migration guides
│   │   ├── ChangelogPage.tsx          # Release notes
│   │   ├── ContributingPage.tsx       # Contribution guidelines
│   │   ├── ResourcesPage.tsx          # Additional resources
│   │   └── NotFoundPage.tsx           # 404 error page
│   ├── data/
│   │   ├── navigation.ts              # Navigation structure
│   │   ├── components.ts              # Component metadata
│   │   ├── designTokens.ts            # Design token data
│   │   ├── examples.ts                # Example configurations
│   │   ├── changelog.ts               # Version history
│   │   ├── contributors.ts            # Team information
│   │   ├── testimonials.ts            # User feedback
│   │   └── searchIndex.ts             # Search data
│   ├── styles/
│   │   ├── globals.css                # Global styles (imports Atomix first)
│   │   ├── layout.css                 # Layout-specific styles
│   │   ├── components.css             # Component customizations
│   │   ├── utilities.css              # Utility classes
│   │   ├── responsive.css             # Media queries
│   │   ├── print.css                  # Print styles
│   │   ├── animations.css             # Custom animations
│   │   └── themes/
│   │       ├── light.css              # Light theme overrides
│   │       ├── dark.css               # Dark theme overrides
│   │       └── high-contrast.css      # High contrast theme
│   ├── utils/
│   │   ├── markdown.ts                # Markdown processing
│   │   ├── codeHighlighting.ts        # Syntax highlighting
│   │   ├── search.ts                  # Search functionality
│   │   ├── analytics.ts               # Usage analytics
│   │   ├── seo.ts                     # SEO utilities
│   │   ├── accessibility.ts           # A11y helpers
│   │   ├── performance.ts             # Performance utilities
│   │   └── validation.ts              # Data validation
│   ├── hooks/
│   │   ├── useTheme.ts                # Theme management
│   │   ├── useSearch.ts               # Search functionality
│   │   ├── useNavigation.ts           # Navigation state
│   │   ├── useResponsive.ts           # Responsive utilities
│   │   ├── useLocalStorage.ts         # Local storage
│   │   ├── useScrollPosition.ts       # Scroll tracking
│   │   ├── useKeyboardShortcuts.ts    # Keyboard navigation
│   │   └── useAnalytics.ts            # Analytics tracking
│   ├── types/
│   │   ├── component.ts               # Component type definitions
│   │   ├── navigation.ts              # Navigation types
│   │   ├── search.ts                  # Search types
│   │   ├── theme.ts                   # Theme types
│   │   └── global.ts                  # Global type definitions
│   ├── constants/
│   │   ├── routes.ts                  # Route definitions
│   │   ├── breakpoints.ts             # Responsive breakpoints
│   │   ├── themes.ts                  # Theme constants
│   │   └── analytics.ts               # Analytics configuration
│   ├── App.tsx                        # Main application component
│   ├── main.tsx                       # Application entry point
│   └── vite-env.d.ts                  # Vite type definitions
├── docs/                              # Copy all existing Atomix docs here
│   └── [all existing atomix markdown files from /docs/]
├── tests/
│   ├── __mocks__/                     # Test mocks
│   ├── components/                    # Component tests
│   ├── pages/                         # Page tests
│   ├── utils/                         # Utility tests
│   └── setup.ts                       # Test setup
├── .vscode/
│   ├── settings.json                  # VSCode settings
│   └── extensions.json                # Recommended extensions
├── package.json                       # Dependencies and scripts
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.node.json                 # Node TypeScript config
├── .eslintrc.cjs                      # ESLint configuration
├── .prettierrc                        # Prettier configuration
├── .gitignore                         # Git ignore rules
├── README.md                          # Project documentation
└── DEPLOYMENT.md                      # Deployment instructions
```

## Technology Stack

### Required Dependencies (EXACT VERSIONS)
```json
{
  "name": "atomix-docs-site",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    "@shohojdhara/atomix": "latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "react-markdown": "^8.0.7",
    "react-syntax-highlighter": "^15.5.0",
    "remark-gfm": "^3.0.1",
    "remark-frontmatter": "^4.0.1",
    "rehype-highlight": "^6.0.0",
    "rehype-slug": "^5.1.0",
    "rehype-autolink-headings": "^6.1.1",
    "gray-matter": "^4.0.3",
    "fuse.js": "^6.6.2",
    "framer-motion": "^10.16.4",
    "react-helmet-async": "^1.3.0",
    "react-hot-toast": "^2.4.1",
    "react-intersection-observer": "^9.5.2",
    "reading-time": "^1.5.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/react-syntax-highlighter": "^15.5.7",
    "@vitejs/plugin-react": "^4.1.0",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "prettier": "^3.0.3",
    "typescript": "^5.2.2",
    "vite": "^4.5.0",
    "vitest": "^0.34.6",
    "@vitest/ui": "^0.34.6",
    "jsdom": "^22.1.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^6.1.4"
  }
}
```

### Required Configuration Files

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@data': path.resolve(__dirname, './src/data'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          atomix: ['@shohojdhara/atomix'],
          markdown: ['react-markdown', 'remark-gfm'],
          highlighting: ['react-syntax-highlighter'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@data/*": ["./src/data/*"],
      "@types/*": ["./src/types/*"],
      "@styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Critical Implementation Guidelines

### 1. Component Import Strategy

**❌ ABSOLUTELY FORBIDDEN:**
```typescript
// NEVER use deep imports
import Button from '@shohojdhara/atomix/Button/Button';
import { ButtonProps } from '@shohojdhara/atomix/Button/Button';

// NEVER use default imports for multiple components
import Button from '@shohojdhara/atomix';
import Card from '@shohojdhara/atomix';

// NEVER import styles separately
import '@shohojdhara/atomix/Button/Button.css';
```

**✅ MANDATORY CORRECT APPROACH:**
```typescript
// ALWAYS use named imports from main package
import {
  Button,
  Card,
  Badge,
  Navigation,
  Modal,
  Tooltip,
  Icon,
  Input,
  DataTable,
  Accordion,
  Avatar,
  Breadcrumb,
  Callout,
  Checkbox,
  ColorModeToggle,
  Countdown,
  DatePicker,
  Dropdown,
  EdgePanel,
  Form,
  Hero,
  List,
  Messages,
  Pagination,
  PhotoViewer,
  Popover,
  Progress,
  Radio,
  Rating,
  River,
  SectionIntro,
  Select,
  Spinner,
  Steps,
  Tab,
  Testimonial,
  Textarea,
  Todo,
  Toggle,
  Upload,
  AtomixLogo
} from '@shohojdhara/atomix';

// ALWAYS import types alongside components
import type {
  ButtonProps,
  CardProps,
  NavigationProps
} from '@shohojdhara/atomix';
```

### 2. Layout Structure Requirements

**AppLayout Component (src/components/layout/AppLayout.tsx):**
```typescript
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Navigation,
  Container,
  Button,
  Spinner
} from '@shohojdhara/atomix';
import { DocumentationHeader } from './DocumentationHeader';
import { DocumentationSidebar } from './DocumentationSidebar';
import { DocumentationFooter } from './DocumentationFooter';
import { MobileNavigation } from './MobileNavigation';
import { BackToTopButton } from '../ui/BackToTopButton';
import { useResponsive } from '@hooks/useResponsive';
import { useTheme } from '@hooks/useTheme';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { isMobile } = useResponsive();
  const { theme } = useTheme();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Loading state for route transitions
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`atomix-docs-app ${theme}`} data-theme={theme}>
      {/* Header - ALWAYS visible */}
      <DocumentationHeader
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content area */}
      <div className="atomix-docs-main">
        {/* Sidebar - Desktop persistent, mobile overlay */}
        <DocumentationSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile Navigation Overlay */}
        {isMobile && sidebarOpen && (
          <MobileNavigation
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <main className="atomix-docs-content" role="main">
          <Container size="xl">
            {loading ? (
              <div className="loading-container">
                <Spinner size="lg" />
              </div>
            ) : (
              <Outlet />
            )}
          </Container>
        </main>
      </div>

      {/* Footer */}
      <DocumentationFooter />

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};
```

### 3. Header Component Requirements

**DocumentationHeader Component (src/components/layout/DocumentationHeader.tsx):**
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Button,
  AtomixLogo,
  ColorModeToggle,
  Badge,
  Input,
  Dropdown,
  Icon,
  Avatar,
  Tooltip
} from '@shohojdhara/atomix';
import { GlobalSearch } from '../ui/GlobalSearch';
import { useTheme } from '@hooks/useTheme';
import { useSearch } from '@hooks/useSearch';
import type { NavigationProps } from '@shohojdhara/atomix';

interface DocumentationHeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export const DocumentationHeader: React.FC<DocumentationHeaderProps> = ({
  onMenuToggle,
  sidebarOpen
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery, searchResults } = useSearch();

  const navigationItems = [
    { label: 'Home', href: '/', icon: 'Home' },
    { label: 'Components', href: '/components', icon: 'Layers' },
    { label: 'Design Tokens', href: '/design-tokens', icon: 'Palette' },
    { label: 'Examples', href: '/examples', icon: 'Code' },
  ];

  const externalLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/shohojdhara/atomix',
      icon: 'Github'
    },
    {
      label: 'NPM',
      href: 'https://www.npmjs.com/package/@shohojdhara/atomix',
      icon: 'Package'
    },
    {
      label: 'Storybook',
      href: 'https://atomix-storybook.netlify.app',
      icon: 'BookOpen'
    }
  ];

  return (
    <header className="atomix-docs-header" role="banner">
      <Navigation
        className="docs-nav"
        aria-label="Main navigation"
      >
        {/* Brand Section */}
        <div className="nav-brand">
          {/* Mobile menu toggle */}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onMenuToggle}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            className="mobile-menu-toggle"
          >
            <Icon name={sidebarOpen ? 'X' : 'Menu'} size="sm" />
          </Button>

          {/* Logo and Brand */}
          <Link
            to="/"
            className="brand-link"
            aria-label="Atomix Design System - Home"
          >
            <AtomixLogo width={32} height={32} aria-hidden="true" />
            <span className="brand-name">Atomix</span>
            <Badge variant="primary" size="sm">
              v1.0.0
            </Badge>
          </Link>
        </div>

        {/* Main Navigation - Desktop only */}
        <nav className="nav-main desktop-only" role="navigation">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  to={item.href}
                  className="nav-link"
                  aria-label={item.label}
                >
                  <Icon name={item.icon as any} size="sm" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Section */}
        <div className="nav-search">
          <GlobalSearch
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            focused={searchFocused}
          />
        </div>

        {/* Actions Section */}
        <div className="nav-actions">
          {/* External Links Dropdown */}
          <Dropdown
            trigger={
              <Button
                variant="outline-secondary"
                size="sm"
                aria-label="External links"
              >
                <Icon name="ExternalLink" size="sm" />
                <span className="desktop-only">Links</span>
              </Button>
            }
            placement="bottom-end"
          >
            <div className="external-links-menu">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                  aria-label={`${link.label} (opens in new tab)`}
                >
                  <Icon name={link.icon as any} size="sm" />
                  {link.label}
                </a>
              ))}
            </div>
          </Dropdown>

          {/* Theme Toggle */}
          <Tooltip content={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            <ColorModeToggle
              size="sm"
              aria-label="Toggle theme"
            />
          </Tooltip>

          {/* Version Badge */}
          <Badge
            variant="success"
            size="sm"
            className="version-badge desktop-only"
          >
            Stable
          </Badge>
        </div>
      </Navigation>
    </header>
  );
};
```

### 4. Sidebar Navigation Requirements

**DocumentationSidebar Component (src/components/layout/DocumentationSidebar.tsx):**
```typescript
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Navigation,
  Badge,
  Icon,
  Input,
  Accordion,
  Button,
  Progress
} from '@shohojdhara/atomix';
import { navigationData } from '@data/navigation';
import { useSearch } from '@hooks/useSearch';
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts';
import type { NavigationSection, NavigationItem } from '@types/navigation';

interface DocumentationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNavigation, setFilteredNavigation] = useState(navigationData);
  const [expandedSections, setExpandedSections] = useState<string[]>(['components']);

  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults } = useSearch();

  // Filter navigation based on search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNavigation(navigationData);
      return;
    }

    const filtered = navigationData.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(section => section.items.length > 0);

    setFilteredNavigation(filtered);
  }, [searchTerm]);

  // Auto-expand section containing current page
  useEffect(() => {
    const currentSection = navigationData.find(section =>
      section.items.some(item => item.href === location.pathname)
    );

    if (currentSection && !expandedSections.includes(currentSection.id)) {
      setExpandedSections(prev => [...prev, currentSection.id]);
    }
  }, [location.pathname]);

  // Keyboard shortcuts for navigation
  useKeyboardShortcuts({
    'ctrl+k': () => {
      // Focus search
      const searchInput = document.querySelector('.sidebar-search input') as HTMLInputElement;
      searchInput?.focus();
    },
    'escape': () => {
      if (isOpen) onClose();
    }
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose(); // Close mobile sidebar after navigation
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = location.pathname === item.href;

    return (
      <li key={item.href} className="nav-item">
        <Link
          to={item.href}
          onClick={() => handleNavigation(item.href)}
          className={`nav-link ${isActive ? 'active' : ''}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.icon && (
            <Icon
              name={item.icon as any}
              size="sm"
              className="nav-icon"
              aria-hidden="true"
            />
          )}
          <span className="nav-text">{item.title}</span>

          {item.badge && (
            <Badge
              variant={item.badge.variant}
              size="xs"
              className="nav-badge"
            >
              {item.badge.text}
            </Badge>
          )}

          {item.isNew && (
            <Badge variant="success" size="xs">New</Badge>
          )}

          {item.isUpdated && (
            <Badge variant="warning" size="xs">Updated</Badge>
          )}
        </Link>
      </li>
    );
  };

  return (
    <aside
      className={`atomix-docs-sidebar ${isOpen ? 'open' : ''}`}
      role="navigation"
      aria-label="Documentation navigation"
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-search">
          <Input
            placeholder="Search navigation... (Ctrl+K)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon="Search"
            size="sm"
            aria-label="Search navigation"
          />
        </div>
      </div>

      {/* Navigation Content */}
      <div className="sidebar-content">
        <Navigation
          orientation="vertical"
          className="sidebar-nav"
          role="navigation"
        >
          {filteredNavigation.map((section) => (
            <div key={section.id} className="nav-section">
              <Accordion
                items={[
                  {
                    title: (
                      <div className="section-header">
                        <Icon
                          name={section.icon as any}
                          size="sm"
                          aria-hidden="true"
                        />
                        <span className="section-title">{section.title}</span>
                        <Badge variant="secondary" size="xs">
                          {section.items.length}
                        </Badge>
                      </div>
                    ),
                    content: (
                      <ul className="nav-list" role="list">
                        {section.items.map(renderNavigationItem)}
                      </ul>
                    ),
                    isOpen: expandedSections.includes(section.id)
                  }
                ]}
                onToggle={() => toggleSection(section.id)}
                className="nav-accordion"
              />
            </div>
          ))}
        </Navigation>

        {/* Navigation Statistics */}
        <div className="sidebar-footer">
          <div className="nav-stats">
            <div className="stat">
              <Icon name="Layers" size="xs" />
              <span>{navigationData.find(s => s.id === 'components')?.items.length || 0} Components</span>
            </div>
            <div className="stat">
              <Icon name="BookOpen" size="xs" />
              <span>{navigationData.reduce((acc, section) => acc + section.items.length, 0)} Pages</span>
            </div>
          </div>

          <Progress
            value={75}
            max={100}
            size="sm"
            className="documentation-progress"
            aria-label="Documentation completeness: 75%"
          />
          <span className="progress-text">75% Complete</span>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop mobile-only"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </aside>
  );
};
```

### 5. Navigation Data Structure

**Navigation Data (src/data/navigation.ts):**
```typescript
import type { IconName } from '@shohojdhara/atomix';

export interface NavigationBadge {
  text: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: IconName;
  description?: string;
  badge?: NavigationBadge;
  isNew?: boolean;
  isUpdated?: boolean;
  isDeprecated?: boolean;
  category?: string;
  keywords?: string[];
  order?: number;
}

export interface NavigationSection {
  id: string;
  title: string;
  icon: IconName;
  description?: string;
  items: NavigationItem[];
  order?: number;
}

export const navigationData: NavigationSection[] = [
  {
    id: 'getting-started',
    title: "Getting Started",
    icon: 'BookOpen',
    description: 'Everything you need to get up and running with Atomix',
    order: 1,
    items: [
      {
        id: 'introduction',
        title: "Introduction",
        href: "/",
        icon: "Home",
        description: "Learn about Atomix Design System",
        keywords: ['intro', 'overview', 'welcome']
      },
      {
        id: 'installation',
        title: "Installation",
        href: "/installation",
        icon: "Download",
        description: "How to install and setup Atomix",
        keywords: ['npm', 'install', 'setup', 'package']
      },
      {
        id: 'quick-start',
        title: "Quick Start",
        href: "/quick-start",
        icon: "Zap",
        description: "Get started in minutes with examples",
        keywords: ['tutorial', 'example', 'guide']
      },
      {
        id: 'theming',
        title: "Theming",
        href: "/theming",
        icon: "Palette",
        description: "Customize colors, fonts, and design tokens",
        keywords: ['theme', 'colors', 'design tokens', 'customization']
      },
      {
        id: 'accessibility',
        title: "Accessibility",
        href: "/accessibility",
        icon: "Shield",
        description: "Learn about accessibility features and best practices",
        keywords: ['a11y', 'accessible', 'wcag', 'screen reader']
      },
      {
        id: 'migration',
        title: "Migration Guide",
        href: "/migration",
        icon: "ArrowRight",
        description: "Migrate from other UI libraries",
        keywords: ['migrate', 'upgrade', 'transition']
      }
    ]
  },
  {
    id: 'components',
    title: "Components",
    icon: 'Layers',
    description: 'UI components for building modern applications',
    order: 2,
    items: [
      {
        id: 'accordion',
        title: "Accordion",
        href: "/components/accordion",
        icon: "ChevronDown",
        description: "Collapsible content panels",
        keywords: ['collapse', 'expand', 'panels', 'faq']
      },
      {
        id: 'atomix-logo',
        title: "AtomixLogo",
        href: "/components/atomix-logo",
        icon: "Atom",
        description: "Official Atomix brand logo component",
        keywords: ['logo', 'brand', 'identity', 'svg'],
        isNew: true
      },
      {
        id: 'avatar',
        title: "Avatar",
        href: "/components/avatar",
        icon: "User",
        description: "User profile pictures and placeholders",
        keywords: ['user', 'profile', 'image', 'picture']
      },
      {
        id: 'badge',
        title: "Badge",
        href: "/components/badge",
        icon: "Tag",
        description: "Small status indicators and labels",
        keywords: ['label', 'status', 'indicator', 'tag']
      },
      {
        id: 'breadcrumb',
        title: "Breadcrumb",
        href: "/components/breadcrumb",
        icon: "Navigation",
        description: "Navigation breadcrumb trails",
        keywords: ['navigation', 'path', 'hierarchy', 'trail']
      },
      {
        id: 'button',
        title: "Button",
        href: "/components/button",
        icon: "MousePointer",
        description: "Clickable action elements",
        keywords: ['click', 'action', 'cta', 'primary', 'secondary']
      },
      {
        id: 'callout',
        title: "Callout",
        href: "/components/callout",
        icon: "MessageSquare",
        description: "Important messages and alerts",
        keywords: ['alert', 'message', 'notice', 'warning', 'info']
      },
      {
        id: 'card',
        title: "Card",
        href: "/components/card",
        icon: "Square",
        description: "Flexible content containers",
        keywords: ['container', 'content', 'panel', 'box']
      },
      {
        id: 'checkbox',
        title: "Checkbox",
        href: "/components/checkbox",
        icon: "CheckSquare",
        description: "Multi-selection input controls",
        keywords: ['form', 'input', 'selection', 'toggle']
      },
      {
        id: 'color-mode-toggle',
        title: "ColorModeToggle",
        href: "/components/color-mode-toggle",
        icon: "Sun",
        description: "Dark/light theme switcher",
        keywords: ['theme', 'dark', 'light', 'mode', 'toggle']
      },
      {
        id: 'countdown',
        title: "Countdown",
        href: "/components/countdown",
        icon: "Clock",
        description: "Time countdown displays",
        keywords: ['timer', 'time', 'countdown', 'deadline']
      },
      {
        id: 'datatable',
        title: "DataTable",
        href: "/components/datatable",
        icon: "Grid",
        description: "Advanced data tables with sorting and pagination",
        keywords: ['table', 'data', 'grid', 'sort', 'pagination']
      },
      {
        id: 'datepicker',
        title: "DatePicker",
        href: "/components/datepicker",
        icon: "Calendar",
        description: "Date selection input with calendar",
        keywords: ['date', 'calendar', 'picker', 'form', 'input']
      },
      {
        id: 'dropdown',
        title: "Dropdown",
        href: "/components/dropdown",
        icon: "ChevronDown",
        description: "Contextual menus and option lists",
        keywords: ['menu', 'select', 'options', 'popover']
      },
      {
        id: 'edge-panel',
        title: "EdgePanel",
        href: "/components/edge-panel",
        icon: "Sidebar",
        description: "Slide-out panels from screen edges",
        keywords: ['panel', 'drawer', 'sidebar', 'slide']
      },
      {
        id: 'form',
        title: "Form",
        href: "/components/form",
        icon: "FileText",
        description: "Form containers and validation",
        keywords: ['form', 'validation', 'input', 'submit']
      },
      {
        id: 'hero',
        title: "Hero",
        href: "/components/hero",
        icon: "Image",
        description: "Large promotional sections",
        keywords: ['banner', 'header', 'landing', 'promotion']
      },
      {
        id: 'icon',
        title: "Icon",
        href: "/components/icon",
        icon: "Star",
        description: "SVG icon components",
        keywords: ['icon', 'svg', 'symbol', 'graphic']
      },
      {
        id: 'input',
        title: "Input",
        href: "/components/input",
        icon: "Edit",
        description: "Text input fields",
        keywords: ['input', 'field', 'text', 'form']
      },
      {
        id: 'list',
        title: "List",
        href: "/components/list",
        icon: "List",
        description: "Structured content lists",
        keywords: ['list', 'items', 'menu', 'content']
      },
      {
        id: 'messages',
        title: "Messages",
        href: "/components/messages",
        icon: "MessageCircle",
        description: "System messages and notifications",
        keywords: ['message', 'notification', 'toast', 'alert']
      },
      {
        id: 'modal',
        title: "Modal",
        href: "/components/modal",
        icon: "Square",
        description: "Overlay dialogs and popups",
        keywords: ['dialog', 'popup', 'overlay', 'modal']
      },
      {
        id: 'navigation',
        title: "Navigation",
        href: "/components/navigation",
        icon: "Menu",
        description: "Site navigation menus",
        keywords: ['nav', 'menu', 'navigation', 'header']
      },
      {
        id: 'pagination',
        title: "Pagination",
        href: "/components/pagination",
        icon: "MoreHorizontal",
        description: "Page navigation controls",
        keywords: ['pages', 'navigation', 'next', 'previous']
      },
      {
        id: 'photo-viewer',
        title: "PhotoViewer",
        href: "/components/photo-viewer",
        icon: "Image",
        description: "Advanced image viewing with zoom and navigation",
        keywords: ['image', 'gallery', 'lightbox', 'viewer', 'zoom'],
        badge: { text: "New", variant: "success" },
        isNew: true
      },
      {
        id: 'popover',
        title: "Popover",
        href: "/components/popover",
        icon: "MessageSquare",
        description: "Contextual information overlays",
        keywords: ['tooltip', 'overlay', 'context', 'info']
      },
      {
        id: 'product-review',
        title: "ProductReview",
        href: "/components/product-review",
        icon: "Star",
        description: "Product review and rating displays",
        keywords: ['review', 'rating', 'stars', 'feedback']
      },
      {
        id: 'progress',
        title: "Progress",
        href: "/components/progress",
        icon: "BarChart",
        description: "Progress bars and indicators",
        keywords: ['progress', 'bar', 'loading', 'completion']
      },
      {
        id: 'radio',
        title: "Radio",
        href: "/components/radio",
        icon: "Circle",
        description: "Single-selection input controls",
        keywords: ['radio', 'form', 'input', 'selection']
      },
      {
        id: 'rating',
        title: "Rating",
        href: "/components/rating",
        icon: "Star",
        description: "Star rating inputs and displays",
        keywords: ['rating', 'stars', 'score', 'feedback']
      },
      {
        id: 'river',
        title: "River",
        href: "/components/river",
        icon: "Layout",
        description: "Flexible content sections with images",
        keywords: ['section', 'content', 'layout', 'image']
      },
      {
        id: 'section-intro',
        title: "SectionIntro",
        href: "/components/section-intro",
        icon: "Type",
        description: "Section headers and introductions",
        keywords: ['header', 'intro', 'section', 'title']
      },
      {
        id: 'select',
        title: "Select",
        href: "/components/select",
        icon: "ChevronDown",
        description: "Dropdown selection inputs",
        keywords: ['select', 'dropdown', 'form', 'options']
      },
      {
        id: 'spinner',
        title: "Spinner",
        href: "/components/spinner",
        icon: "Loader",
        description: "Loading indicators",
        keywords: ['loading', 'spinner', 'indicator', 'progress']
      },
      {
        id: 'steps',
        title: "Steps",
        href: "/components/steps",
        icon: "GitBranch",
        description: "Multi-step process indicators",
        keywords: ['steps', 'wizard', 'process', 'progress']
      },
      {
        id: 'tab',
        title: "Tab",
        href: "/components/tab",
        icon: "Folder",
        description: "Tabbed content navigation",
        keywords: ['tabs', 'navigation', 'content', 'panels']
      },
      {
        id: 'testimonial',
        title: "Testimonial",
        href: "/components/testimonial",
        icon: "Quote",
        description: "Customer testimonials and quotes",
        keywords: ['testimonial', 'quote', 'review', 'customer']
      },
      {
        id: 'textarea',
        title: "Textarea",
        href: "/components/textarea",
        icon: "FileText",
        description: "Multi-line text input fields",
        keywords: ['textarea', 'input', 'text', 'multiline']
      },
      {
        id: 'todo',
        title: "Todo",
        href: "/components/todo",
        icon: "CheckSquare",
        description: "Task management lists",
        keywords: ['todo', 'task', 'list', 'check']
      },
      {
        id: 'toggle',
        title: "Toggle",
        href: "/components/toggle",
        icon: "ToggleLeft",
        description: "Binary state toggle switches",
        keywords: ['toggle', 'switch', 'boolean', 'on/off']
      },
      {
        id: 'tooltip',
        title: "Tooltip",
        href: "/components/tooltip",
        icon: "Info",
        description: "Contextual help and information",
        keywords: ['tooltip', 'hint', 'help', 'info']
      },
      {
        id: 'upload',
        title: "Upload",
        href: "/components/upload",
        icon: "Upload",
        description: "File upload interfaces",
        keywords: ['upload', 'file', 'drag', 'drop']
      }
    ]
  },
  {
    id: 'design-tokens',
    title: "Design Tokens",
    icon: 'Palette',
    description: 'Design system tokens and theming',
    order: 3,
    items: [
      {
        id: 'colors',
        title: "Colors",
        href: "/design-tokens/colors",
        icon: "Palette",
        description: "Color palette and usage guidelines",
        keywords: ['colors', 'palette', 'theme', 'brand']
      },
      {
        id: 'typography',
        title: "Typography",
        href: "/design-tokens/typography",
        icon: "Type",
        description: "Font scales and text styling",
        keywords: ['fonts', 'text', 'typography', 'scale']
      },
      {
        id: 'spacing',
        title: "Spacing",
        href: "/design-tokens/spacing",
        icon: "Move",
        description: "Spacing scale and layout guidelines",
        keywords: ['spacing', 'margin', 'padding', 'layout']
      },
      {
        id: 'shadows',
        title: "Shadows",
        href: "/design-tokens/shadows",
        icon: "Circle",
        description: "Shadow styles for depth and elevation",
        keywords: ['shadows', 'elevation', 'depth', 'layers']
      },
      {
        id: 'borders',
        title: "Borders",
        href: "/design-tokens/borders",
        icon: "Square",
        description: "Border styles and radius tokens",
        keywords: ['borders', 'radius', 'outline', 'stroke']
      },
      {
        id: 'breakpoints',
        title: "Breakpoints",
        href: "/design-tokens/breakpoints",
        icon: "Monitor",
        description: "Responsive breakpoints and media queries",
        keywords: ['responsive', 'breakpoints', 'mobile', 'desktop']
      }
    ]
  },
  {
    id: 'patterns',
    title: "Patterns",
    icon: 'Grid',
    description: 'Common UI patterns and layouts',
    order: 4,
    items: [
      {
        id: 'layouts',
        title: "Layouts",
        href: "/patterns/layouts",
        icon: "Layout",
        description: "Common page layouts and structures",
        keywords: ['layout', 'grid', 'structure', 'page']
      },
      {
        id: 'navigation-patterns',
        title: "Navigation",
        href: "/patterns/navigation",
        icon: "Menu",
        description: "Navigation patterns and best practices",
        keywords: ['navigation', 'menu', 'patterns', 'ux']
      },
      {
        id: 'forms',
        title: "Forms",
        href: "/patterns/forms",
        icon: "FileText",
        description: "Form layouts and validation patterns",
        keywords: ['forms', 'validation', 'input', 'patterns']
      },
      {
        id: 'data-display',
        title: "Data Display",
        href: "/patterns/data-display",
        icon: "BarChart",
        description: "Patterns for displaying data and content",
        keywords: ['data', 'tables', 'charts', 'display']
      }
    ]
  },
  {
    id: 'resources',
    title: "Resources",
    icon: 'BookOpen',
    description: 'Additional resources and tools',
    order: 5,
    items: [
      {
        id: 'examples',
        title: "Examples",
        href: "/examples",
        icon: "Code",
        description: "Real-world usage examples and demos",
        keywords: ['examples', 'demos', 'showcase', 'templates']
      },
      {
        id: 'changelog',
        title: "Changelog",
        href: "/changelog",
        icon: "GitCommit",
        description: "Release notes and version history",
        keywords: ['changelog', 'releases', 'updates', 'history']
      },
      {
        id: 'contributing',
        title: "Contributing",
        href: "/contributing",
        icon: "Users",
        description: "How to contribute to Atomix",
        keywords: ['contribute', 'development', 'community', 'help']
      },
      {
        id: 'roadmap',
        title: "Roadmap",
        href: "/roadmap",
        icon: "Map",
        description: "Upcoming features and improvements",
        keywords: ['roadmap', 'future', 'plans', 'features']
      }
    ]
  }
];

// Helper functions for navigation
export const findNavigationItem = (id: string): NavigationItem | undefined => {
  for (const section of navigationData) {
    const item = section.items.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
};

export const findNavigationSection = (id: string): NavigationSection | undefined => {
  return navigationData.find(section => section.id === id);
};

export const getNavigationByCategory = (category: string): NavigationItem[] => {
  return navigationData
    .flatMap(section => section.items)
    .filter(item => item.category === category);
};

export const searchNavigation = (query: string): NavigationItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return navigationData
    .flatMap(section => section.items)
    .filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery) ||
      item.keywords?.some(keyword => keyword.includes(lowercaseQuery))
    );
};
```

### 6. Component Demo Requirements

**ComponentShowcase Component (src/components/documentation/ComponentShowcase.tsx):**
```typescript
import React, { useState, Suspense } from 'react';
import {
  Card,
  Tab,
  Button,
  Badge,
  Spinner,
  Callout,
  Icon,
  Tooltip
} from '@shohojdhara/atomix';
import { CodeBlockWithCopy } from './CodeBlockWithCopy';
import { InteractiveDemo } from './InteractiveDemo';
import { ComponentPreview } from './ComponentPreview';
import { PropsDocumentation } from './PropsDocumentation';
import { AccessibilityGuide } from './AccessibilityGuide';
import type { ComponentDocumentation } from '@types/component';

interface ComponentShowcaseProps {
  component: ComponentDocumentation;
  onFeedback?: (rating: number, comment: string) => void;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  component,
  onFeedback
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExample, setSelectedExample] = useState(0);
  const [showFullCode, setShowFullCode] = useState(false);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'Eye',
      description: 'Component overview and basic usage'
    },
    {
      id: 'examples',
      label: 'Examples',
      icon: 'Code',
      description: 'Interactive examples and demos'
    },
    {
      id: 'api',
      label: 'API',
      icon: 'FileText',
      description: 'Props, types, and API reference'
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: 'Shield',
      description: 'A11y features and guidelines'
    },
    {
      id: 'design',
      label: 'Design',
      icon: 'Palette',
      description: 'Design tokens and theming'
    }
  ];

  const currentExample = component.examples?.[selectedExample];

  return (
    <div className="component-showcase" role="main">
      {/* Component Header */}
      <header className="showcase-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="component-title">
              {component.icon && (
                <Icon
                  name={component.icon}
                  size="lg"
                  className="component-icon"
                  aria-hidden="true"
                />
              )}
              {component.name}
            </h1>

            <div className="component-badges">
              <Badge variant="primary" size="sm">
                Component
              </Badge>

              {component.status === 'stable' && (
                <Badge variant="success" size="sm">
                  Stable
                </Badge>
              )}

              {component.status === 'beta' && (
                <Badge variant="warning" size="sm">
                  Beta
                </Badge>
              )}

              {component.status === 'deprecated' && (
                <Badge variant="error" size="sm">
                  Deprecated
                </Badge>
              )}

              {component.isNew && (
                <Badge variant="info" size="sm">
                  New
                </Badge>
              )}
            </div>
          </div>

          <div className="header-actions">
            <Tooltip content="Copy import statement">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `import { ${component.name} } from '@shohojdhara/atomix';`
                  );
                }}
                aria-label="Copy import statement"
              >
                <Icon name="Copy" size="sm" />
                Import
              </Button>
            </Tooltip>

            <Tooltip content="View source on GitHub">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => window.open(component.sourceUrl, '_blank')}
                aria-label="View source code"
              >
                <Icon name="Github" size="sm" />
                Source
              </Button>
            </Tooltip>

            <Tooltip content="Open in Storybook">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => window.open(component.storybookUrl, '_blank')}
                aria-label="Open in Storybook"
              >
                <Icon name="BookOpen" size="sm" />
                Storybook
              </Button>
            </Tooltip>
          </div>
        </div>

        <p className="component-description">
          {component.description}
        </p>

        {/* Status Messages */}
        {component.status === 'deprecated' && (
          <Callout variant="warning" className="status-callout">
            <Icon name="AlertTriangle" size="sm" />
            <div>
              <strong>Deprecated Component</strong>
              <p>{component.deprecationMessage || 'This component will be removed in a future version.'}</p>
              {component.migrationGuide && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.open(component.migrationGuide, '_blank')}
                >
                  View Migration Guide
                </Button>
              )}
            </div>
          </Callout>
        )}

        {component.status === 'beta' && (
          <Callout variant="info" className="status-callout">
            <Icon name="Info" size="sm" />
            <div>
              <strong>Beta Component</strong>
              <p>This component is in beta. The API may change in future releases.</p>
            </div>
          </Callout>
        )}
      </header>

      {/* Navigation Tabs */}
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="showcase-tabs"
        aria-label="Component documentation sections"
      >
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-content">
            {/* Quick Start */}
            <section className="quick-start-section">
              <h2>Quick Start</h2>
              <p>Get started with {component.name} in just a few lines of code.</p>

              <CodeBlockWithCopy
                code={component.quickStart || `import { ${component.name} } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <${component.name}>
      {/* Your content here */}
    </${component.name}>
  );
}`}
                language="typescript"
                title="Basic Usage"
                showLineNumbers={true}
              />
            </section>

            {/* Key Features */}
            {component.features && component.features.length > 0 && (
              <section className="features-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                  {component.features.map((feature, index) => (
                    <Card key={index} className="feature-card">
                      <div className="feature-content">
                        <Icon
                          name={feature.icon}
                          size="md"
                          className="feature-icon"
                        />
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* When to Use */}
            {component.usage && (
              <section className="usage-section">
                <h2>When to Use</h2>
                <div className="usage-guidelines">
                  {component.usage.do && (
                    <div className="usage-do">
                      <h3>
                        <Icon name="CheckCircle" size="sm" />
                        Do
                      </h3>
                      <ul className="usage-list">
                        {component.usage.do.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {component.usage.dont && (
                    <div className="usage-dont">
                      <h3>
                        <Icon name="XCircle" size="sm" />
                        Don't
                      </h3>
                      <ul className="usage-list">
                        {component.usage.dont.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="tab-content examples-content">
            <Suspense fallback={<Spinner size="lg" />}>
              <InteractiveDemo
                component={component}
                selectedExample={selectedExample}
                onExampleChange={setSelectedExample}
              />
            </Suspense>
          </div>
        )}

        {/* API Tab */}
        {activeTab === 'api' && (
          <div className="tab-content api-content">
            <Suspense fallback={<Spinner size="lg" />}>
              <PropsDocumentation
                component={component}
                showFullCode={showFullCode}
                onToggleFullCode={setShowFullCode}
              />
            </Suspense>
          </div>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <div className="tab-content accessibility-content">
            <Suspense fallback={<Spinner size="lg" />}>
              <AccessibilityGuide component={component} />
            </Suspense>
          </div>
        )}

        {/* Design Tab */}
        {activeTab === 'design' && (
          <div className="tab-content design-content">
            <Suspense fallback={<Spinner size="lg" />}>
              <DesignTokensDisplay component={component} />
            </Suspense>
          </div>
        )}
      </Tab>
    </div>
  );
};
```

## Critical Styling Requirements

### 7. Global Styles (MANDATORY)

**Global Styles (src/styles/globals.css):**
```css
/* ⚠️ CRITICAL: Import Atomix styles FIRST - NEVER change this order */
@import '@shohojdhara/atomix/dist/index.css';

:root {
  /* Documentation-specific design tokens */
  --atomix-docs-header-height: 72px;
  --atomix-docs-sidebar-width: 320px;
  --atomix-docs-content-max-width: 1400px;
  --atomix-docs-spacing-unit: 1rem;
  --atomix-docs-border-radius: 8px;

  /* Extend Atomix color tokens - DO NOT override core tokens */
  --atomix-docs-bg-primary: var(--atomix-color-background-primary);
  --atomix-docs-bg-secondary: var(--atomix-color-background-secondary);
  --atomix-docs-bg-tertiary: var(--atomix-color-background-tertiary);
  --atomix-docs-border-color: var(--atomix-color-border-primary);
  --atomix-docs-border-color-hover: var(--atomix-color-border-secondary);
  --atomix-docs-text-primary: var(--atomix-color-text-primary);
  --atomix-docs-text-secondary: var(--atomix-color-text-secondary);
  --atomix-docs-text-tertiary: var(--atomix-color-text-tertiary);

  /* Code highlighting using Atomix tokens */
  --atomix-docs-code-bg: var(--atomix-color-surface-elevated);
  --atomix-docs-code-border: var(--atomix-color-border-primary);
  --atomix-docs-code-text: var(--atomix-color-text-primary);

  /* Component-specific tokens */
  --atomix-docs-sidebar-shadow: var(--atomix-shadow-lg);
  --atomix-docs-header-shadow: var(--atomix-shadow-sm);
  --atomix-docs-card-shadow: var(--atomix-shadow-md);

  /* Animation tokens */
  --atomix-docs-transition-fast: var(--atomix-duration-150);
  --atomix-docs-transition-normal: var(--atomix-duration-300);
  --atomix-docs-transition-slow: var(--atomix-duration-500);

  /* Z-index scale */
  --atomix-docs-z-dropdown: 1000;
  --atomix-docs-z-sticky: 1020;
  --atomix-docs-z-header: 1030;
  --atomix-docs-z-sidebar: 1040;
  --atomix-docs-z-modal: 1050;
  --atomix-docs-z-tooltip: 1060;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --atomix-docs-code-bg: #1a1a1a;
  --atomix-docs-code-border: #333333;
}

/* High contrast theme support */
[data-theme="high-contrast"] {
  --atomix-docs-border-color: var(--atomix-color-border-strong);
}

/* Global layout structure */
.atomix-docs-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--atomix-docs-bg-primary);
  color: var(--atomix-docs-text-primary);
  font-family: var(--atomix-font-family-base);
}

/* Header styling */
.atomix-docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--atomix-docs-header-height);
  z-index: var(--atomix-docs-z-header);
  background: var(--atomix-docs-bg-primary);
  border-bottom: 1px solid var(--atomix-docs-border-color);
  box-shadow: var(--atomix-docs-header-shadow);
  backdrop-filter: blur(8px);
}

.atomix-docs-header .docs-nav {
  height: 100%;
  padding: 0 var(--atomix-spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--atomix-spacing-lg);
}

.atomix-docs-header .nav-brand {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-md);
  min-width: 0;
  flex-shrink: 0;
}

.atomix-docs-header .brand-link {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-sm);
  text-decoration: none;
  color: var(--atomix-docs-text-primary);
  font-weight: var(--atomix-font-weight-semibold);
  transition: opacity var(--atomix-docs-transition-fast) ease;
}

.atomix-docs-header .brand-link:hover {
  opacity: 0.8;
}

.atomix-docs-header .mobile-menu-toggle {
  display: none;
}

/* Main content area */
.atomix-docs-main {
  display: flex;
  margin-top: var(--atomix-docs-header-height);
  min-height: calc(100vh - var(--atomix-docs-header-height));
}

/* Sidebar styling */
.atomix-docs-sidebar {
  width: var(--atomix-docs-sidebar-width);
  position: fixed;
  left: 0;
  top: var(--atomix-docs-header-height);
  bottom: 0;
  overflow-y: auto;
  background: var(--atomix-docs-bg-secondary);
  border-right: 1px solid var(--atomix-docs-border-color);
  z-index: var(--atomix-docs-z-sidebar);
  transition: transform var(--atomix-docs-transition-normal) ease;
}

.atomix-docs-sidebar .sidebar-content {
  padding: var(--atomix-spacing-lg);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.atomix-docs-sidebar .sidebar-search {
  margin-bottom: var(--atomix-spacing-lg);
}

/* Content area styling */
.atomix-docs-content {
  flex: 1;
  margin-left: var(--atomix-docs-sidebar-width);
  padding: var(--atomix-spacing-xl);
  max-width: var(--atomix-docs-content-max-width);
}

/* Component demo styling */
.component-showcase {
  margin-bottom: var(--atomix-spacing-xl);
}

.showcase-header {
  margin-bottom: var(--atomix-spacing-xl);
  padding-bottom: var(--atomix-spacing-lg);
  border-bottom: 1px solid var(--atomix-docs-border-color);
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--atomix-spacing-lg);
  margin-bottom: var(--atomix-spacing-md);
}

.title-section {
  flex: 1;
  min-width: 0;
}

.component-title {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-md);
  font-size: var(--atomix-font-size-2xl);
  font-weight: var(--atomix-font-weight-bold);
  line-height: var(--atomix-line-height-tight);
  margin: 0 0 var(--atomix-spacing-sm) 0;
  color: var(--atomix-docs-text-primary);
}

.component-badges {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-xs);
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-sm);
  flex-shrink: 0;
}

/* Code example styling */
.code-example {
  position: relative;
  margin: var(--atomix-spacing-lg) 0;
  border-radius: var(--atomix-docs-border-radius);
  overflow: hidden;
  border: 1px solid var(--atomix-docs-code-border);
  background: var(--atomix-docs-code-bg);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--atomix-spacing-sm) var(--atomix-spacing-md);
  background: var(--atomix-docs-bg-tertiary);
  border-bottom: 1px solid var(--atomix-docs-border-color);
}

.code-title {
  font-size: var(--atomix-font-size-sm);
  font-weight: var(--atomix-font-weight-medium);
  color: var(--atomix-docs-text-secondary);
}

/* Navigation styling */
.nav-section {
  margin-bottom: var(--atomix-spacing-md);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: var(--atomix-spacing-xs);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--atomix-spacing-sm);
  padding: var(--atomix-spacing-sm) var(--atomix-spacing-md);
  border-radius: var(--atomix-radius-md);
  text-decoration: none;
  color: var(--atomix-docs-text-secondary);
  font-size: var(--atomix-font-size-sm);
  line-height: var(--atomix-line-height-base);
  transition: all var(--atomix-docs-transition-fast) ease;
}

.nav-link:hover {
  background: var(--atomix-color-surface-hover);
  color: var(--atomix-docs-text-primary);
}

.nav-link.active {
  background: var(--atomix-color-primary-subtle);
  color: var(--atomix-color-primary);
  font-weight: var(--atomix-font-weight-medium);
}

.nav-link .nav-icon {
  flex-shrink: 0;
}

.nav-link .nav-text {
  flex: 1;
  min-width: 0;
}

.nav-link .nav-badge {
  flex-shrink: 0;
}

/* Responsive design */
@media (max-width: 1200px) {
  .atomix-docs-content {
    max-width: none;
  }
}

@media (max-width: 1024px) {
  .atomix-docs-sidebar {
    transform: translateX(-100%);
  }

  .atomix-docs-sidebar.open {
    transform: translateX(0);
    box-shadow: var(--atomix-docs-sidebar-shadow);
  }

  .atomix-docs-content {
    margin-left: 0;
  }

  .atomix-docs-header .mobile-menu-toggle {
    display: inline-flex;
  }

  .atomix-docs-header .nav-main.desktop-only {
    display: none;
  }
}

@media (max-width: 768px) {
  .atomix-docs-content {
    padding: var(--atomix-spacing-lg);
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .atomix-docs-header .nav-search {
    display: none;
  }
}

@media (max-width: 480px) {
  .atomix-docs-content {
    padding: var(--atomix-spacing-md);
  }

  .component-badges {
    margin-top: var(--atomix-spacing-sm);
  }
}

/* Print styles */
@media print {
  .atomix-docs-header,
  .atomix-docs-sidebar,
  .header-actions,
  .sidebar-backdrop {
    display: none !important;
  }

  .atomix-docs-main {
    margin-top: 0;
  }

  .atomix-docs-content {
    margin-left: 0;
    max-width: none;
    padding: 0;
  }
}

/* Utility classes */
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}

/* Loading states */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

/* Focus management */
.atomix-docs-app:focus-within .nav-link:focus {
  outline: 2px solid var(--atomix-color-primary);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🚨 CRITICAL ERROR PREVENTION

### 8. Absolute Forbidden Practices

**❌ NEVER DO THESE:**

1. **Component Import Violations:**
```typescript
// ❌ FORBIDDEN - Deep imports
import Button from '@shohojdhara/atomix/Button/Button';
import { ButtonProps } from '@shohojdhara/atomix/Button';

// ❌ FORBIDDEN - Mixing import styles
import { Button } from '@shohojdhara/atomix';
import Card from '@shohojdhara/atomix/Card';

// ❌ FORBIDDEN - Incorrect style imports
import '@shohojdhara/atomix/Button/Button.css';

// ✅ MANDATORY CORRECT APPROACH
import {
  Button,
  Card,
  Navigation,
  Modal,
  type ButtonProps,
  type CardProps
} from '@shohojdhara/atomix';
```

2. **CSS Import Order Violations:**
```css
/* ❌ NEVER - Custom styles before Atomix */
.custom-class { color: red; }
@import '@shohojdhara/atomix/dist/index.css';

/* ❌ NEVER - Multiple Atomix imports */
@import '@shohojdhara/atomix/dist/index.css';
@import '@shohojdhara/atomix/dist/components.css';

/* ✅ MANDATORY - Atomix first, always */
@import '@shohojdhara/atomix/dist/index.css';
.custom-class { color: red; }
```

3. **Component Usage Violations:**
```typescript
// ❌ FORBIDDEN - Missing required props
<Button>Click me</Button>

// ❌ FORBIDDEN - Wrong prop types
<Button variant="blue" size={24}>Click me</Button>

// ❌ FORBIDDEN - Inline styles over tokens
<div style={{ backgroundColor: '#1234FF' }}>

// ✅ MANDATORY CORRECT USAGE
<Button variant="primary" size="md">Click me</Button>
<div style={{ backgroundColor: 'var(--atomix-color-primary)' }}>
```

4. **Theme Token Violations:**
```typescript
// ❌ FORBIDDEN - Hardcoded values
const theme = {
  primary: '#007bff',
  spacing: '16px',
  borderRadius: '4px'
};

// ❌ FORBIDDEN - Overriding core tokens
:root {
  --atomix-color-primary: #my-color !important;
}

// ✅ MANDATORY - Use extension patterns
:root {
  --my-app-primary-custom: var(--atomix-color-primary);
  --my-app-spacing-custom: calc(var(--atomix-spacing-md) * 1.5);
}
```

### 9. TypeScript Requirements (MANDATORY)

**Required Type Definitions (src/types/component.ts):**
```typescript
import type { ReactNode } from 'react';
import type { IconName } from '@shohojdhara/atomix';

export interface ComponentDocumentation {
  id: string;
  name: string;
  description: string;
  icon?: IconName;
  status: 'stable' | 'beta' | 'deprecated' | 'experimental';
  version: string;
  category: string;
  isNew?: boolean;
  isUpdated?: boolean;
  deprecationMessage?: string;
  migrationGuide?: string;
  sourceUrl: string;
  storybookUrl: string;
  quickStart?: string;
  features?: ComponentFeature[];
  usage?: ComponentUsage;
  examples: ComponentExample[];
  props: PropDefinition[];
  methods?: MethodDefinition[];
  events?: EventDefinition[];
  slots?: SlotDefinition[];
  cssVariables?: CSSVariableDefinition[];
  accessibility: AccessibilityInfo;
  designTokens?: DesignTokenInfo[];
}

export interface ComponentFeature {
  title: string;
  description: string;
  icon: IconName;
}

export interface ComponentUsage {
  do?: string[];
  dont?: string[];
  when?: string[];
  alternatives?: string[];
}

export interface ComponentExample {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'advanced' | 'integration' | 'responsive';
  code: string;
  preview: ReactNode;
  props?: Record<string, any>;
  notes?: string[];
}

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required: boolean;
  description: string;
  deprecated?: boolean;
  deprecationMessage?: string;
  since?: string;
  examples?: string[];
}

export interface AccessibilityInfo {
  overview: string;
  keyboardSupport: KeyboardSupport[];
  ariaAttributes: AriaAttribute[];
  screenReaderSupport: string;
  colorContrastCompliant: boolean;
  focusManagement: string;
}

export interface KeyboardSupport {
  key: string;
  description: string;
  context?: string;
}

export interface AriaAttribute {
  attribute: string;
  value: string;
  description: string;
  required: boolean;
}
```

### 10. Mandatory Project Setup Steps

**Required Commands (EXACT ORDER):**
```bash
# 1. Create project
npm create vite@latest atomix-docs-site -- --template react-ts
cd atomix-docs-site

# 2. Install EXACT dependencies (DO NOT change versions)
npm install @shohojdhara/atomix@latest
npm install react@^18.2.0 react-dom@^18.2.0
npm install react-router-dom@^6.8.1
npm install react-markdown@^8.0.7 react-syntax-highlighter@^15.5.0
npm install remark-gfm@^3.0.1 remark-frontmatter@^4.0.1
npm install gray-matter@^4.0.3 fuse.js@^6.6.2
npm install framer-motion@^10.16.4 react-helmet-async@^1.3.0

# 3. Install dev dependencies
npm install -D @types/react@^18.2.37 @types/react-dom@^18.2.15
npm install -D @types/react-syntax-highlighter@^15.5.7
npm install -D eslint@^8.53.0 prettier@^3.0.3
npm install -D @typescript-eslint/eslint-plugin@^6.10.0
npm install -D @typescript-eslint/parser@^6.10.0
npm install -D eslint-plugin-react-hooks@^4.6.0
npm install -D eslint-plugin-jsx-a11y@^6.8.0

# 4. Copy docs directory
cp -r /path/to/atomix/docs ./docs

# 5. Run development server
npm run dev
```

### 11. Final Verification Checklist

**✅ MANDATORY PRE-DEPLOYMENT CHECKS:**

1. **Component Integration (CRITICAL):**
   - [ ] Every UI element uses Atomix components only
   - [ ] No custom buttons, cards, modals, or navigation
   - [ ] All imports use `@shohojdhara/atomix` main export
   - [ ] No deep imports anywhere in codebase
   - [ ] CSS imports Atomix styles first

2. **TypeScript Compliance (CRITICAL):**
   - [ ] All files are `.tsx` or `.ts`
   - [ ] No `any` types without explicit reason
   - [ ] All Atomix component props properly typed
   - [ ] Custom interfaces extend Atomix base types

3. **Accessibility (WCAG 2.1 AA):**
   - [ ] All interactive elements have proper ARIA labels
   - [ ] Keyboard navigation works throughout
   - [ ] Screen reader testing completed
   - [ ] Color contrast ratios verified
   - [ ] Focus management implemented

4. **Performance (MANDATORY):**
   - [ ] Code splitting implemented for routes
   - [ ] Lazy loading for component demos
   - [ ] Bundle size under 500KB (gzipped)
   - [ ] Lighthouse score 90+ for all metrics

5. **Browser Support:**
   - [ ] Chrome 90+ (tested)
   - [ ] Firefox 88+ (tested)
   - [ ] Safari 14+ (tested)
   - [ ] Edge 90+ (tested)
   - [ ] No console errors in any browser

6. **Mobile Responsiveness:**
   - [ ] All breakpoints tested
   - [ ] Touch interactions work properly
   - [ ] Mobile navigation functional
   - [ ] Text readable on smallest screens

This comprehensive guide ensures ZERO mistakes in building the Atomix documentation site.
