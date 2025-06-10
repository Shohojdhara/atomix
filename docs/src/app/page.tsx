'use client'

import React from 'react'
import DocsLayout from '@/components/DocsLayout'

const HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1500&auto=format&fit=crop';

export default function HomePage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        {/* Hero Section */}
        <div className="c-hero c-hero--center u-bg-transparent" style={{ ['--atomix-hero-content-width' as string]: "650px" }}>
          <div className="c-hero__bg">
            <img 
              src={HERO_BG_IMAGE}
              alt="Background" 
              className="c-hero__bg-image"
            />
            <div className="c-hero__overlay"></div>
          </div>
          <div className="c-hero__container o-container">
            <div className="c-hero__content">
              <p className="c-hero__subtitle">Modern UI Component Library</p>
              <h1 className="c-hero__title">Atomix Design System</h1>
              <p className="c-hero__text">
                A lightweight, highly customizable React component library for building beautiful interfaces with a focus on scalability, extensibility, and maintainability.
              </p>
              <div className="c-hero__actions">
                <div className="u-d-flex u-gap-3 u-justify-content-center">
                  <button className="c-btn c-btn--primary" aria-disabled="false">
                    <span className="button__label">Get Started</span>
                  </button>
                  <a 
                    href="https://liimonx.github.io/atomix/storybook/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="c-btn c-btn--outline-secondary"
                  >
                    View on Storybook
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="c-hero__overlay" style={{ opacity: 0.5 }}></div>
        </div>

        {/* Features Grid */}
        <section className="u-mt-20">
          <h2>Why Atomix?</h2>
          <div className="o-grid u-mt-8">
            <div className="o-grid__col o-grid__col--md-4">
              <div className="c-card">
                <div className="c-card__header">
                  <div className="c-card__icon">🎨</div>
                </div>
                <div className="c-card__body">
                  <h3 className="c-card__title">Design Tokens</h3>
                  <p className="c-card__text">
                    Consistent design decisions through centralized tokens for colors, spacing, typography, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="o-grid__col o-grid__col--md-4">
              <div className="c-card">
                <div className="c-card__header">
                  <div className="c-card__icon">⚛️</div>
                </div>
                <div className="c-card__body">
                  <h3 className="c-card__title">React Components</h3>
                  <p className="c-card__text">
                    Production-ready components built with TypeScript, accessibility, and performance in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  )
}