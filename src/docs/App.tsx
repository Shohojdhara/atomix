import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero/Hero';
import { Button } from '../components/Button/Button';

// Component categories for better organization
const componentCategories = [
  {
    name: 'Core Components',
    components: [
      'Accordion', 'Avatar', 'Avatar Group', 'Badge', 'Breadcrumb', 'Button', 'Button Group',
      'Card', 'Hero'
    ]
  },
  {
    name: 'Form Components',
    components: [
      'Checkbox', 'Checkbox Group', 'Form', 'Input', 'Input Group', 'Rating', 'Select', 'Toggle', 'Upload'
    ]
  },
  {
    name: 'Navigation Components',
    components: [
      'Menu', 'Navbar', 'Nav', 'Pagination', 'Side Menu', 'Steps', 'Tabs'
    ]
  },
  {
    name: 'Feedback Components',
    components: [
      'Messages', 'Modal', 'Notifications', 'Popover', 'Progress', 'Spinner', 'Tooltip'
    ]
  },
  {
    name: 'Data Display Components',
    components: [
      'Calendar', 'Countdown', 'Data Table', 'List', 'List Group', 'River', 'Skeleton', 'Testimonials'
    ]
  },
  {
    name: 'Layout Components',
    components: [
      'Dropdown', 'Edge Panel', 'Section Intro'
    ]
  },
  {
    name: 'Utility Components',
    components: [
      'Color Mode Toggle'
    ]
  }
];

// Sun icon for light mode
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const App: React.FC = () => {
  // State for color mode
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  
  // Toggle color mode
  const toggleColorMode = () => {
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
    document.documentElement.setAttribute('data-atomix-theme', newMode);
    localStorage.setItem('atomix-color-mode', newMode);
  };
  
  // Initialize color mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('atomix-color-mode') as 'light' | 'dark' | null;
    if (savedMode) {
      setColorMode(savedMode);
      document.documentElement.setAttribute('data-atomix-theme', savedMode);
    }
  }, []);

  return (
    <div className="u-bg-primary-subtle u-min-h-100vh u-d-flex u-flex-column">
      {/* Color Mode Toggle */}
      <div className="u-position-fixed u-top-0 u-end-0 u-p-3 u-z-4">
        <button 
          className="c-color-mode-toggle" 
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
      
      {/* Main Hero Section */}
      <Hero
        title="Atomix Design System"
        subtitle="Modern UI Component Library"
        text="A lightweight, highly customizable React component library for building beautiful interfaces with a focus on scalability, extensibility, and maintainability."
        backgroundImageSrc="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        showOverlay={true}
        fullViewportHeight={false}
        alignment="center"
        contentWidth="650px"
        className="u-bg-transparent"
        actions={
          <div className="u-d-flex u-gap-3 u-justify-content-center">
            <Button label="Get Started" variant="primary" />
            <a href='https://liimonx.github.io/atomix/storybook/' target='_blank' rel='noopener noreferrer' className='c-btn c-btn--outline-secondary'>
              View on Storybook
            </a>
          </div>
        }
      />
      
      <main className="u-flex-grow-1 u-py-5">
        <div className="o-container">
          {/* Features Section */}
          <section className="u-mb-5">
            <div className="c-sectionintro c-sectionintro--center">
              <h2 className="c-sectionintro__title">Features</h2>
              <p className="c-sectionintro__text">
                Atomix provides a complete design system with powerful, flexible components 
                that follow best practices for accessibility, performance, and user experience.
              </p>
            </div>
            
            <div className="o-grid u-mt-5">
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-brand-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">🎨 Modern Design</h3>
                    <p className="c-card__text">Clean and contemporary design aesthetic for beautiful UIs</p>
                  </div>
                </div>
              </div>
              
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-success-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">🚀 Lightweight</h3>
                    <p className="c-card__text">Optimized for performance with minimal dependencies</p>
                  </div>
                </div>
              </div>
              
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-warning-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">🛠️ Customizable</h3>
                    <p className="c-card__text">Highly adaptable components with extensive props and CSS variables</p>
                  </div>
                </div>
              </div>
              
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-info-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">📱 Responsive</h3>
                    <p className="c-card__text">Fully responsive components that work on all devices</p>
                  </div>
                </div>
              </div>
              
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-error-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">🌓 Theme Support</h3>
                    <p className="c-card__text">Built-in dark/light theme support with easy customization</p>
                  </div>
                </div>
              </div>
              
              <div className="o-grid__col o-grid__col--md-4 u-mb-4">
                <div className="c-card h-100 u-bg-tertiary-subtle">
                  <div className="c-card__body">
                    <h3 className="c-card__title">🖼️ Asset Management</h3>
                    <p className="c-card__text">Centralized assets with standardized access patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Component Library Section */}
          <section className="u-mb-5 u-pt-4">
            <div className="c-sectionintro c-sectionintro--center">
              <h2 className="c-sectionintro__title">Component Library</h2>
              <p className="c-sectionintro__text">
                Atomix includes a comprehensive set of over 40 components, all built with a consistent 
                API and styling system for intuitive development and a cohesive user experience.
              </p>
            </div>
            
            <div className="u-p-4 u-border- u-border-1 u-border-brand-subtle u-rounded-2 u-mb-5 u-mt-5">
              {componentCategories.map((category, index) => (
                <div key={index} className={index > 0 ? 'u-mt-4 u-pt-4 u-border-top' : ''}>
                  <h3 className="u-fs-4 u-fw-semibold u-mb-3">{category.name}</h3>
                  <div className="u-d-flex u-flex-wrap u-gap-2">
                    {category.components.map((component, compIndex) => (
                      <div key={compIndex} className="c-badge c-badge--primary">
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className=" u-p-4 u-border- u-border-1 u-border-brand-subtle u-rounded-2">
              <h3 className="u-fs-4 u-fw-semibold u-mb-3">Consistent Design Language</h3>
              <p className="u-mb-4">
                All components follow the same BEM naming convention and share a consistent API structure. Each component:
              </p>
              <ul className="u-ps-4">
                <li className="u-mb-2">Uses CSS variables for easy theming</li>
                <li className="u-mb-2">Follows responsive design principles</li>
                <li className="u-mb-2">Maintains accessibility standards</li>
                <li className="u-mb-2">Adapts to dark/light themes</li>
                <li className="u-mb-2">Has configurable size variants and states</li>
              </ul>
            </div>
          </section>
          
          {/* Architecture Section */}
          <section className="u-mb-5 u-pt-4">
            <div className="c-sectionintro c-sectionintro--center">
              <h2 className="c-sectionintro__title">Architecture</h2>
              <p className="c-sectionintro__text">
                Atomix is built on SEM (Scalable, Extensible, Maintainable) principles and 
                follows BIO (BEM, ITCSS, OOCSS) architecture for robust CSS organization.
              </p>
            </div>
            
            <div className="o-grid u-mb-5 u-mt-5">
              <div className="o-grid__col o-grid__col--md-4">
                <div className="c-sectionintro u-py-0">
                  <h3 className="c-sectionintro__title u-fs-3">SEM Principles</h3>
                  <p className="c-sectionintro__text">
                    The design system is built on three core principles:
                  </p>
                </div>
                <ul className="u-ps-4 u-mt-4">
                  <li className="u-mb-2"><strong>Scalable</strong>: Components can be added anywhere in the page without requiring code changes</li>
                  <li className="u-mb-2"><strong>Extensible</strong>: Core functionality remains unchanged while supporting different use cases</li>
                  <li className="u-mb-2"><strong>Maintainable</strong>: Organized structure that follows logical patterns</li>
                </ul>
              </div>
              
              <div className="o-grid__col o-grid__col--md-8">
                <div className="c-sectionintro u-py-0">
                  <h3 className="c-sectionintro__title u-fs-3">BIO Architecture</h3>
                  <p className="c-sectionintro__text">
                    The design system implements BIO (BEM, ITCSS, OOCSS) for robust CSS architecture:
                  </p>
                </div>
                
                <div className="u-bg-secondary-subtle u-p-4 u-border- u-border-2 u-border-primary-subtle u-rounded-2 u-mb-4 u-mt-4">
                  <h4 className="u-fs-5 u-fw-semibold u-mb-2">BEM</h4>
                  <p className="u-mb-2">Block Element Modifier methodology for clear class naming</p>
                  <ul className="u-ps-4 u-mb-0">
                    <li>Blocks: <code>.c-accordion</code></li>
                    <li>Elements: <code>.c-accordion__trigger</code></li>
                    <li>Modifiers: <code>.c-accordion--light</code>, <code>.c-accordion--dark</code></li>
                  </ul>
                </div>
                
                <div className="u-bg-secondary-subtle u-p-4 u-border- u-border-2 u-border-primary-subtle u-rounded-2 u-mb-4">
                  <h4 className="u-fs-5 u-fw-semibold u-mb-2">ITCSS</h4>
                  <p className="u-mb-2">Inverted Triangle CSS for managing specificity</p>
                  <ul className="u-ps-4 u-mb-0">
                    <li>Handles CSS specificity through ordered layers</li>
                    <li>Enables pattern overrides without conflicts</li>
                  </ul>
                </div>
                
                <div className="u-bg-secondary-subtle u-p-4 u-border- u-border-2 u-border-primary-subtle u-rounded-2">
                  <h4 className="u-fs-5 u-fw-semibold u-mb-2">OOCSS</h4>
                  <p className="u-mb-2">Object-Oriented CSS for reusable components</p>
                  <ul className="u-ps-4 u-mb-0">
                    <li>Multiple classes for flexible styling</li>
                    <li>Example: <code>class="c-accordion c-accordion--dark c-accordion--single"</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="u-bg-dark u-py-3 u-mt-auto">
        <div className="o-container">
          <p className="u-text-light u-mb-0 u-text-center">&copy; {new Date().getFullYear()} Atomix Design System</p>
        </div>
      </footer>
    </div>
  );
};

export default App; 