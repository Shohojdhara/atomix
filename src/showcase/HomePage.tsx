import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Hero } from '../components/Hero';
import { Navbar, Nav, NavItem } from '../components/Navigation';
import { River } from '../components/River';
import { SectionIntro } from '../components/SectionIntro';
import { Testimonial } from '../components/Testimonial';

const HomePage: React.FC = () => {
  return (
    <div className="u-bg-body u-text-dark">
      {/* Purpose: Navigation & Brand Trust */}
      <Navbar brand="AI Studio" collapsible>
        <Nav>
          <NavItem href="#solutions">Solutions</NavItem>
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#pricing">Pricing</NavItem>
          <NavItem href="#developers">Developers</NavItem>
          <NavItem href="#enterprise">Enterprise</NavItem>
        </Nav>
      </Navbar>

      {/* Purpose: Immediate Value Proposition & Lead Capture */}
      <Hero
        title="Ship AI Products 10x Faster"
        text="Stop wrestling with infrastructure. Start building AI applications that actually work. From prototype to production in days, not months."
        className="u-text-center u-py-5 u-bg-gradient-primary-subtle"
        alignment="center"
        actions={
          <>
            <Button variant="primary" size="lg">Start Free Trial</Button>
            <Button variant="outline-primary" size="lg">Watch 2-min Demo</Button>
            <p className="u-text-muted u-mt-3 u-font-size-sm">No credit card required • 14-day free trial</p>
          </>
        }
      />

      {/* Purpose: Social Proof & Credibility */}
      <div className="u-py-4 u-bg-light-subtle">
        <div className="u-container u-text-center">
          <p className="u-text-secondary u-mb-3">Trusted by 50,000+ developers at companies like</p>
          <div className="u-d-flex u-gap-4 u-justify-content-center u-flex-wrap">
            <span className="u-text-muted u-font-weight-bold">TechCorp</span>
            <span className="u-text-muted u-font-weight-bold">DataFlow</span>
            <span className="u-text-muted u-font-weight-bold">InnovateLabs</span>
            <span className="u-text-muted u-font-weight-bold">GlobalAI</span>
          </div>
        </div>
      </div>

      {/* Purpose: Problem-Solution Fit */}
      <SectionIntro
        title="Built for Developers Who Need Results"
        text="Everything you need to build, deploy, and scale AI applications without the usual headaches."
        className="u-py-5 u-text-center"
        alignment="center"
      />

      {/* Purpose: Feature Benefits by Use Case */}
      <div className="u-container u-px-4 u-pb-5">
        <div className="u-row u-gap-4">
          {/* Purpose: Speed to Market */}
          <div className="u-col-md-6 u-col-lg-4">
            <Card className="u-p-4 u-shadow-sm u-rounded-lg u-h-100 u-border-0 u-bg-light-subtle">
              <div className="u-bg-primary u-text-white u-rounded u-w-12 u-h-12 u-d-flex u-align-items-center u-justify-content-center u-mb-3">
                <span className="u-font-size-lg">🚀</span>
              </div>
              <h4 className="u-text-dark u-mb-2">Deploy in Minutes</h4>
              <p className="u-text-secondary u-mb-3">Push to production with one click. Our automated pipelines handle scaling, monitoring, and updates.</p>
              <ul className="u-list-unstyled u-text-sm">
                <li className="u-mb-1">✓ Zero-downtime deployments</li>
                <li className="u-mb-1">✓ Auto-scaling based on demand</li>
                <li>✓ Built-in A/B testing</li>
              </ul>
            </Card>
          </div>

          {/* Purpose: Developer Experience */}
          <div className="u-col-md-6 u-col-lg-4">
            <Card className="u-p-4 u-shadow-sm u-rounded-lg u-h-100 u-border-0 u-bg-light-subtle">
              <div className="u-bg-success u-text-white u-rounded u-w-12 u-h-12 u-d-flex u-align-items-center u-justify-content-center u-mb-3">
                <span className="u-font-size-lg">⚡</span>
              </div>
              <h4 className="u-text-dark u-mb-2">Code, Don't Configure</h4>
              <p className="u-text-secondary u-mb-3">Focus on your AI logic. We handle the infrastructure, dependencies, and deployment complexity.</p>
              <ul className="u-list-unstyled u-text-sm">
                <li className="u-mb-1">✓ Python/JS SDKs</li>
                <li className="u-mb-1">✓ Pre-configured environments</li>
                <li>✓ Git-based workflows</li>
              </ul>
            </Card>
          </div>

          {/* Purpose: Cost Optimization */}
          <div className="u-col-md-6 u-col-lg-4">
            <Card className="u-p-4 u-shadow-sm u-rounded-lg u-h-100 u-border-0 u-bg-light-subtle">
              <div className="u-bg-info u-text-white u-rounded u-w-12 u-h-12 u-d-flex u-align-items-center u-justify-content-center u-mb-3">
                <span className="u-font-size-lg">💰</span>
              </div>
              <h4 className="u-text-dark u-mb-2">Pay Only for Usage</h4>
              <p className="u-text-secondary u-mb-3">Scale from prototype to production without breaking the bank. Transparent pricing that grows with you.</p>
              <ul className="u-list-unstyled u-text-sm">
                <li className="u-mb-1">✓ $0.001 per prediction</li>
                <li className="u-mb-1">✓ Free tier for development</li>
                <li>✓ Volume discounts</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Purpose: Product-Led Growth - Show, Don't Tell */}
      <River
        title="See Your AI Model in Action"
        text="Upload your data, choose your algorithm, and watch AI Studio generate predictions in real-time. No setup required."
        imageSrc="https://via.placeholder.com/800x500?text=Live+Demo+Interface"
        imageAlt="AI Studio Live Demo"
        reverse={false}
        className="u-py-5 u-bg-primary-subtle"
        actions={
          <>
            <Button variant="primary" size="lg" className="u-mr-3">Try Live Demo</Button>
            <Button variant="outline-primary">View Documentation</Button>
            <p className="u-text-muted u-mt-3 u-font-size-sm">Demo runs in your browser • No signup required</p>
          </>
        }
      />

      {/* Purpose: Technical Differentiation */}
      <div className="u-py-5 u-bg-dark u-text-white">
        <div className="u-container u-text-center u-px-4">
          <SectionIntro
            title="Built for Production from Day One"
            text="Enterprise-grade infrastructure that scales with your success"
            className="u-text-white"
            alignment="center"
          />
          <div className="u-row u-gap-4 u-mt-5">
            <div className="u-col-md-3 u-col-sm-6">
              <div className="u-text-center">
                <div className="u-text-primary u-font-size-3xl u-font-weight-bold">99.99%</div>
                <div className="u-text-light">Uptime SLA</div>
              </div>
            </div>
            <div className="u-col-md-3 u-col-sm-6">
              <div className="u-text-center">
                <div className="u-text-primary u-font-size-3xl u-font-weight-bold">50ms</div>
                <div className="u-text-light">Avg Response Time</div>
              </div>
            </div>
            <div className="u-col-md-3 u-col-sm-6">
              <div className="u-text-center">
                <div className="u-text-primary u-font-size-3xl u-font-weight-bold">10TB+</div>
                <div className="u-text-light">Daily Predictions</div>
              </div>
            </div>
            <div className="u-col-md-3 u-col-sm-6">
              <div className="u-text-center">
                <div className="u-text-primary u-font-size-3xl u-font-weight-bold">24/7</div>
                <div className="u-text-light">Global Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose: Developer Community Proof */}
      <SectionIntro
            title="Loved by Developers Worldwide"
            text="Real results from real developers building production AI applications"
            className="u-py-5 u-text-center"
            alignment="center"
          />

      <div className="u-container u-px-4 u-pb-5">
        <div className="u-row u-gap-4">
          {/* Purpose: Technical Credibility */}
          <div className="u-col-lg-4 u-col-md-6">
            <Testimonial
              quote="Migrated our entire ML pipeline to AI Studio and cut our infrastructure costs by 70%. The auto-scaling is magic - handles Black Friday traffic spikes without us touching anything."
              author={{ name: 'Alex Kim', role: 'Senior Engineer, E-commerce Platform', avatarSrc: 'https://via.placeholder.com/150?text=AK' }}
              className="u-w-100 u-shadow-sm"
            />
          </div>

          {/* Purpose: Startup Success */}
          <div className="u-col-lg-4 u-col-md-6">
            <Testimonial
              quote="As a solo founder, I shipped my AI feature in 2 weeks instead of 6 months. The pre-built templates saved me from building everything from scratch."
              author={{ name: 'Priya Sharma', role: 'Founder, AI Startup', avatarSrc: 'https://via.placeholder.com/150?text=PS' }}
              className="u-w-100 u-shadow-sm"
            />
          </div>

          {/* Purpose: Enterprise Scale */}
          <div className="u-col-lg-4 u-col-md-6">
            <Testimonial
              quote="Handles our 50M+ daily predictions flawlessly. The monitoring dashboard caught issues before they impacted users. Best decision we made for our AI infrastructure."
              author={{ name: 'David Chen', role: 'ML Platform Lead, Fortune 500', avatarSrc: 'https://via.placeholder.com/150?text=DC' }}
              className="u-w-100 u-shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Purpose: Enterprise Sales Funnel */}
      <River
        title="Enterprise AI Without Enterprise Complexity"
        text="Get dedicated support, custom integrations, and compliance certifications. Our team handles migration so you can focus on building AI that matters."
        imageSrc="https://via.placeholder.com/800x500?text=Enterprise+Dashboard"
        imageAlt="Enterprise Dashboard"
        reverse={true}
        className="u-py-5 u-bg-light-subtle"
        actions={
          <>
            <ul className="u-list-unstyled u-text-secondary u-mb-4">
              <li className="u-mb-2">✅ SOC 2 Type II certified</li>
              <li className="u-mb-2">✅ HIPAA & GDPR compliant</li>
              <li className="u-mb-2">✅ Dedicated customer success manager</li>
              <li className="u-mb-2">✅ 99.99% uptime SLA</li>
            </ul>
            <Button variant="primary" size="lg">Contact Sales</Button>
          </>
        }
      />

      {/* Purpose: Final Conversion */}
      <div className="u-py-5 u-bg-primary">
        <div className="u-container u-text-center u-text-white u-px-4">
          <h2 className="u-mb-3">Start Building Today</h2>
          <p className="u-mb-4 u-max-w-lg u-mx-auto">
            Join 50,000+ developers who've already accelerated their AI development. Get started in minutes, scale forever.
          </p>
          <div className="u-d-flex u-gap-3 u-justify-content-center u-flex-wrap u-mb-3">
            <Button variant="light" size="lg">Start Free Trial</Button>
            <Button variant="outline-light" size="lg">Talk to Sales</Button>
          </div>
          <p className="u-font-size-sm u-opacity-75">Free forever tier available • No credit card required</p>
        </div>
      </div>

      {/* Purpose: Trust & Navigation */}
      <footer className="u-py-5 u-bg-dark u-text-white">
        <div className="u-container u-px-4">
          <div className="u-row u-mb-4">
            <div className="u-col-lg-4 u-mb-4">
              <h4 className="u-text-primary u-mb-3">AI Studio</h4>
              <p className="u-text-muted mb-3">
                The fastest way to build, deploy, and scale AI applications. Built for developers, designed for production.
              </p>
              <div className="u-d-flex u-gap-3">
                <Button variant="outline-light" size="sm">Twitter</Button>
                <Button variant="outline-light" size="sm">GitHub</Button>
                <Button variant="outline-light" size="sm">Discord</Button>
              </div>
            </div>
            <div className="u-col-6 u-col-md-2 u-mb-3">
              <h6 className="u-mb-2">Product</h6>
              <ul className="u-list-unstyled u-text-muted u-font-size-sm">
                <li className="u-mb-1"><a href="#" className="u-text-muted">Features</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Pricing</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Enterprise</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">API Reference</a></li>
              </ul>
            </div>
            <div className="u-col-6 u-col-md-2 u-mb-3">
              <h6 className="u-mb-2">Developers</h6>
              <ul className="u-list-unstyled u-text-muted u-font-size-sm">
                <li className="u-mb-1"><a href="#" className="u-text-muted">Documentation</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Tutorials</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Examples</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Community</a></li>
              </ul>
            </div>
            <div className="u-col-6 u-col-md-2 u-mb-3">
              <h6 className="u-mb-2">Support</h6>
              <ul className="u-list-unstyled u-text-muted u-font-size-sm">
                <li className="u-mb-1"><a href="#" className="u-text-muted">Help Center</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Contact</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Status</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Security</a></li>
              </ul>
            </div>
            <div className="u-col-6 u-col-md-2 u-mb-3">
              <h6 className="u-mb-2">Company</h6>
              <ul className="u-list-unstyled u-text-muted u-font-size-sm">
                <li className="u-mb-1"><a href="#" className="u-text-muted">About</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Blog</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Careers</a></li>
                <li className="u-mb-1"><a href="#" className="u-text-muted">Privacy</a></li>
              </ul>
            </div>
          </div>
          <hr className="u-my-3" />
          <div className="u-d-flex u-justify-content-between u-align-items-center u-flex-wrap u-text-muted u-font-size-sm">
            <p className="u-mb-0">© 2024 AI Studio. Built with Atomix.</p>
            <p className="u-mb-0">
              <a href="#" className="u-text-muted">Terms</a> • 
              <a href="#" className="u-text-muted">Privacy</a> • 
              <a href="#" className="u-text-muted">Security</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;