"use client";

import React from "react";
import { DocsLayout } from "@/components/DocsLayout";
import { ComponentDemo } from "@/components/ComponentDemo";

export default function InstallationPage() {
  return (
    <DocsLayout>
      <div className="prose">
        <h1>Installation</h1>
        <p>
          Get started with Atomix in your React project. Follow these steps to
          install and configure the design system components and styles.
        </p>

        <section>
          <h2>Requirements</h2>
          <div className="u-bg-info u-p-md u-rounded u-mb-lg">
            <h4 className="u-mt-0 u-d-flex u-items-center u-gap-xs">
              ℹ️ Prerequisites
            </h4>
            <ul className="u-mb-0">
              <li>React 18.0 or higher</li>
              <li>Node.js 18.0 or higher</li>
              <li>A React framework (Next.js, Vite, Create React App, etc.)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Package Installation</h2>

          <h3>Install via npm</h3>
          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`npm install @atomix/react @atomix/styles`}</code>
          </pre>

          <h3>Install via yarn</h3>
          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`yarn add @atomix/react @atomix/styles`}</code>
          </pre>

          <h3>Install via pnpm</h3>
          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`pnpm add @atomix/react @atomix/styles`}</code>
          </pre>
        </section>

        <section>
          <h2>Peer Dependencies</h2>
          <p>Atomix requires the following peer dependencies:</p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`npm install react react-dom phosphor-react classnames`}</code>
          </pre>

          <div className="u-bg-warning u-p-md u-rounded u-mt-md">
            <h4 className="u-mt-0 u-d-flex u-items-center u-gap-xs">⚠️ Note</h4>
            <p className="u-mb-0">
              Most React projects already include <code>react</code> and{" "}
              <code>react-dom</code>. You may only need to install{" "}
              <code>phosphor-react</code> and <code>classnames</code>.
            </p>
          </div>
        </section>

        <section>
          <h2>Setup Styles</h2>

          <h3>Import Global Styles</h3>
          <p>Import the Atomix styles in your main application file:</p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`// In your main CSS file or app entry point
import '@atomix/styles/index.scss'

// Or if using CSS imports
import '@atomix/styles/index.css'`}</code>
          </pre>

          <h3>Next.js Setup</h3>
          <p>
            For Next.js projects, import styles in your <code>_app.tsx</code> or{" "}
            <code>layout.tsx</code>:
          </p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`// pages/_app.tsx (Pages Router)
import '@atomix/styles/index.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// app/layout.tsx (App Router)
import '@atomix/styles/index.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`}</code>
          </pre>

          <h3>Vite Setup</h3>
          <p>
            For Vite projects, import styles in your <code>main.tsx</code>:
          </p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@atomix/styles/index.scss'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`}</code>
          </pre>

          <h3>Create React App Setup</h3>
          <p>
            For Create React App, import styles in your <code>index.tsx</code>:
          </p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@atomix/styles/index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`}</code>
          </pre>
        </section>

        <section>
          <h2>Basic Usage</h2>
          <p>Start using Atomix components in your React application:</p>

          <ComponentDemo
            title="First Component"
            description="Import and use your first Atomix component"
            code={`import { Button, Card } from '@atomix/react'

function App() {
  return (
    <div className="u-p-lg">
      <Card
        title="Welcome to Atomix"
        text="You've successfully installed the Atomix design system!"
        actions={
          <Button variant="primary">
            Get Started
          </Button>
        }
      />
    </div>
  )
}`}
          >
            <div className="u-p-lg">
              <div className="c-card">
                <div className="c-card__body">
                  <h3 className="c-card__title">Welcome to Atomix</h3>
                  <p className="c-card__text">
                    You've successfully installed the Atomix design system!
                  </p>
                </div>
                <div className="c-card__actions">
                  <button className="btn c-btn--primary">Get Started</button>
                </div>
              </div>
            </div>
          </ComponentDemo>
        </section>

        <section>
          <h2>TypeScript Support</h2>
          <p>
            Atomix is built with TypeScript and provides full type definitions
            out of the box. No additional setup is required for TypeScript
            projects.
          </p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`import { Button, ButtonProps } from '@atomix/react'

// All component props are fully typed
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}`}</code>
          </pre>
        </section>

        <section>
          <h2>Build Configuration</h2>

          <h3>Webpack Configuration</h3>
          <p>If you need to customize webpack for SCSS processing:</p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}`}</code>
          </pre>

          <h3>Vite Configuration</h3>
          <p>
            Vite supports SCSS out of the box, but you may need to install sass:
          </p>

          <pre className="u-bg-secondary u-p-md u-rounded">
            <code>{`npm install -D sass

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
      }
    }
  }
})`}</code>
          </pre>
        </section>

        <section>
          <h2>Troubleshooting</h2>

          <h3>Common Issues</h3>

          <div className="u-space-y-md">
            <div className="u-bg-error u-p-md u-rounded">
              <h4 className="u-mt-0 u-text-error">Styles not loading</h4>
              <p className="u-mb-0">
                Make sure you've imported <code>@atomix/styles/index.scss</code>{" "}
                in your main application file. Check that your build system
                supports SCSS processing.
              </p>
            </div>

            <div className="u-bg-error u-p-md u-rounded">
              <h4 className="u-mt-0 u-text-error">Component not found</h4>
              <p className="u-mb-0">
                Ensure you've installed <code>@atomix/react</code> and are
                importing components correctly:
                <code>import {`{ Button }`} from '@atomix/react'</code>
              </p>
            </div>

            <div className="u-bg-error u-p-md u-rounded">
              <h4 className="u-mt-0 u-text-error">TypeScript errors</h4>
              <p className="u-mb-0">
                Make sure your TypeScript version is 4.5 or higher. Check that
                <code>@types/react</code> and <code>@types/react-dom</code> are
                installed.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Next Steps</h2>
          <p>Now that you have Atomix installed, explore these resources:</p>

          <div className="u-grid u-grid-cols-1 md:u-o-grid-cols-2 u-gap-md u-mt-lg">
            <div className="c-card">
              <div className="c-card__body">
                <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                  🚀 Quick Start Guide
                </h4>
                <p className="c-card__text">
                  Learn the basics of using Atomix components and utilities.
                </p>
              </div>
              <div className="c-card__actions">
                <a
                  href="/getting-started/quick-start"
                  className="btn c-btn--outline-primary c-btn--sm"
                >
                  View Guide
                </a>
              </div>
            </div>

            <div className="c-card">
              <div className="c-card__body">
                <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                  🎨 Design Tokens
                </h4>
                <p className="c-card__text">
                  Explore colors, typography, spacing, and other design tokens.
                </p>
              </div>
              <div className="c-card__actions">
                <a
                  href="/design-tokens/colors"
                  className="btn c-btn--outline-primary c-btn--sm"
                >
                  Browse Tokens
                </a>
              </div>
            </div>

            <div className="c-card">
              <div className="c-card__body">
                <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                  🧩 Components
                </h4>
                <p className="c-card__text">
                  Discover all available React components with examples.
                </p>
              </div>
              <div className="c-card__actions">
                <a
                  href="/components/button"
                  className="btn c-btn--outline-primary c-btn--sm"
                >
                  View Components
                </a>
              </div>
            </div>

            <div className="c-card">
              <div className="c-card__body">
                <h4 className="c-card__title u-d-flex u-items-center u-gap-xs">
                  🔧 Utilities
                </h4>
                <p className="c-card__text">
                  Learn about utility classes for rapid UI development.
                </p>
              </div>
              <div className="c-card__actions">
                <a
                  href="/utilities/spacing"
                  className="btn c-btn--outline-primary c-btn--sm"
                >
                  Explore Utilities
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Community & Support</h2>
          <p>Get help and connect with the Atomix community:</p>

          <div className="u-flex u-d-u-flex-wrap u-gap-md u-mt-md">
            <a
              href="https://github.com/atomixdesign/atomix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn c-btn--outline-primary"
            >
              <span className="c-btn__icon">📖</span>
              GitHub
            </a>
            <a
              href="https://github.com/atomixdesign/atomix/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn c-btn--outline-primary"
            >
              <span className="c-btn__icon">💬</span>
              Discussions
            </a>
            <a
              href="https://github.com/atomixdesign/atomix/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn c-btn--outline-primary"
            >
              <span className="c-btn__icon">🐛</span>
              Report Issues
            </a>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
