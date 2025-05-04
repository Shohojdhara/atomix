import React from 'react';
import { ComponentShowcase } from './components/ComponentShowcase';

const App: React.FC = () => {
  return (
    <div className="u-bg-light u-min-h-100vh u-d-flex u-flex-column">
      <header className="u-bg-dark u-py-5">
        <div className="o-container">
          <h1 className="u-text-light u-mb-2 u-fs-1 u-fw-bold">Atomix Design System</h1>
          <p className="u-text-light-75 u-fs-4">A modern React component library for beautiful interfaces</p>
        </div>
      </header>
      
      <main className="u-flex-grow-1 u-py-5">
        <div className="o-container">
          <h2 className="u-mb-4 u-fs-2 u-fw-bold">Components</h2>
          
          <section className="u-mb-5 u-pb-5 u-border-bottom">
            <h3 className="u-mb-4 u-fs-3 u-fw-semibold u-text-dark">Accordion</h3>
            <ComponentShowcase
              component="Accordion"
              description="Expandable content sections for organizing information in a collapsible format."
            />
          </section>
          
          <section className="u-mb-5">
            <h3 className="u-mb-4 u-fs-3 u-fw-semibold u-text-dark">Button</h3>
            <ComponentShowcase
              component="Button"
              description="Interactive elements that users can click to perform actions."
            />
          </section>
        </div>
      </main>
      
      <footer className="u-bg-dark u-py-3 u-mt-auto">
        <div className="o-container">
          <p className="u-text-light u-mb-0">&copy; {new Date().getFullYear()} Atomix Design System</p>
        </div>
      </footer>
    </div>
  );
};

export default App; 