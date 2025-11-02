import React, { useState } from 'react';
import {
  AtomixLogo,
  AtomixGlass,
  ColorModeToggle,
  Badge,
  Button,
  Card,
  Hero,
  Icon,
  SectionIntro,
  Tab,
  Testimonial,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';

const Saas: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    {
      icon: <Icon name="Rocket" size={24} />,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance with minimal latency.',
    },
    {
      icon: <Icon name="Lock" size={24} />,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and compliance with industry standards.',
    },
    {
      icon: <Icon name="ArrowsClockwise" size={24} />,
      title: 'Real-time Sync',
      description: 'Keep your data synchronized across all devices instantly.',
    },
    {
      icon: <Icon name="ChartLine" size={24} />,
      title: 'Advanced Analytics',
      description: 'Gain insights with powerful analytics and reporting tools.',
    },
    {
      icon: <Icon name="Users" size={24} />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team in real-time.',
    },
    {
      icon: <Icon name="Gear" size={24} />,
      title: 'Customizable',
      description: 'Tailor the platform to fit your specific workflow needs.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      monthlyPrice: 19,
      annualPrice: 15,
      priceSuffix: 'per user/month',
      features: [
        'Up to 5 users',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Core features',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing businesses',
      monthlyPrice: 49,
      annualPrice: 39,
      priceSuffix: 'per user/month',
      features: [
        'Up to 20 users',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Core features',
        'API access',
        'Custom integrations',
      ],
      cta: 'Try Free for 14 Days',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 99,
      annualPrice: 79,
      priceSuffix: 'per user/month',
      features: [
        'Unlimited users',
        '1TB storage',
        'Advanced analytics',
        '24/7 dedicated support',
        'All features',
        'API access',
        'Custom integrations',
        'Single sign-on (SSO)',
        'Personalized onboarding',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'CTO, TechCorp',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content:
        "This platform has transformed our workflow. We've seen a 40% increase in productivity since implementation.",
    },
    {
      name: 'Sarah Williams',
      role: 'Product Manager, InnovateX',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      content:
        "The analytics features alone are worth the investment. We've gained insights that helped double our conversion rate.",
    },
    {
      name: 'Michael Chen',
      role: 'CEO, GrowthStart',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        'Implementation was seamless and the support team is exceptional. We were up and running in less than a day.',
    },
  ];

  const faqs = [
    {
      question: 'How secure is my data?',
      answer:
        'We use industry-standard encryption protocols and regularly undergo security audits to ensure your data is always protected.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription at any time with no cancellation fees. You will continue to have access until the end of your billing period.',
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer:
        'Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.',
    },
    {
      question: 'How often do you release updates?',
      answer:
        'We release minor updates weekly and major feature updates quarterly. All updates are free for subscribers.',
    },
  ];

  // Prepare tabs for FAQ section
  const faqTabs = faqs.map((faq, index) => ({
    label: faq.question,
    content: faq.answer,
    isActive: index === 0,
  }));

  return (
    <>
      {/* Navigation */}
      <AtomixGlass
        blurAmount={0.1}
        displacementScale={200}
        aberrationIntensity={0}
        cornerRadius={10}
        elasticity={0.01}
        mode="standard"
        style={{ position: 'fixed', top: 10, left: 60, right: 60, zIndex: 5 }}
      >
        <Container>
          <div className="u-d-flex u-align-items-center u-justify-content-between u-py-4">
            <div className="u-d-flex u-align-items-center u-gap-2">
              <AtomixLogo />
              <span className="u-text-xl u-fw-bold">Atomix</span>
            </div>
            <nav className="u-d-none u-d-md-flex u-align-items-center u-gap-6">
              <a href="#features">Features</a>
              <a href="#components">Components</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <div className="u-d-flex u-align-items-center u-gap-3">
              <ColorModeToggle />
              <Button variant="outline" size="sm">
                Documentation
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </Container>
      </AtomixGlass>

      {/* Hero Section */}
      <Hero
        title="Transform Your Business with Our SaaS Platform"
        text="Powerful tools to help your team collaborate, analyze, and grow. Join thousands of companies already using our platform."
        actions={
          <>
            <Button variant="primary" size="lg" className="u-me-2">
              Start Free Trial
            </Button>
            <Button variant="outline-primary" size="lg">
              Watch Demo
            </Button>
          </>
        }
        className="u-mb-0"
      />

      {/* Logo Cloud */}
      <section className="u-py-5 u-bg-light-subtle">
        <Container>
          <Row className="u-justify-content-center">
            <GridCol xs={12} className="u-text-center u-mb-4">
              <h3 className="u-text-muted u-fw-normal u-mb-0">Trusted by industry leaders</h3>
            </GridCol>
            <GridCol xs={2} className="u-text-center">
              <div className="u-bg-secondary u-rounded u-p-3">Logo</div>
            </GridCol>
            <GridCol xs={2} className="u-text-center">
              <div className="u-bg-secondary u-rounded u-p-3">Logo</div>
            </GridCol>
            <GridCol xs={2} className="u-text-center">
              <div className="u-bg-secondary u-rounded u-p-3">Logo</div>
            </GridCol>
            <GridCol xs={2} className="u-text-center">
              <div className="u-bg-secondary u-rounded u-p-3">Logo</div>
            </GridCol>
            <GridCol xs={2} className="u-text-center">
              <div className="u-bg-secondary u-rounded u-p-3">Logo</div>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            title="Everything you need in one platform"
            text="Our comprehensive suite of tools helps you streamline operations, gain insights, and drive growth."
            className="u-text-center u-mb-6"
          />
          <Grid>
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} sm={6} md={4} className="u-mb-5">
                <div className="c-feature">
                  <div className="c-feature__icon u-mb-3">{feature.icon}</div>
                  <h3 className="c-feature__title u-mb-2">{feature.title}</h3>
                  <p className="c-feature__description u-text-muted">{feature.description}</p>
                </div>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Stats */}
      <section className="u-py-8 u-bg-primary u-text-white">
        <Container>
          <Grid>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold">10K+</div>
              <div className="u-text-primary-emphasis">Active Users</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold">99.9%</div>
              <div className="u-text-primary-emphasis">Uptime</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold">4.9/5</div>
              <div className="u-text-primary-emphasis">Customer Rating</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold">24/7</div>
              <div className="u-text-primary-emphasis">Support</div>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-py-8 u-bg-light-subtle">
        <Container>
          <SectionIntro
            title="Loved by thousands of teams worldwide"
            text="See what our customers have to say about their experience."
            className="u-text-center u-mb-6"
          />
          <Grid>
            {testimonials.map((testimonial, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <Testimonial
                  quote={testimonial.content}
                  author={{
                    name: testimonial.name,
                    role: testimonial.role,
                    avatarSrc: testimonial.avatar,
                  }}
                />
              </GridCol>
            ))}
          </Grid>

          <div className="u-text-center u-mt-6">
            <div className="c-avatar-group">
              <div className="c-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="User"
                  className="c-avatar__img"
                />
              </div>
              <div className="c-avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="User"
                  className="c-avatar__img"
                />
              </div>
              <div className="c-avatar">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="User"
                  className="c-avatar__img"
                />
              </div>
              <div className="c-avatar">
                <span className="c-avatar__text">+10K</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="u-py-8" id="pricing">
        <Container>
          <SectionIntro
            title="Simple, transparent pricing"
            text="Choose the plan that works best for your team with a 14-day free trial."
            className="u-text-center u-mb-6"
          />

          <div className="u-text-center u-mb-6">
            <Badge label="Save 20% with annual billing" variant="primary" className="u-mb-4" />
            <div>
              <Button
                variant={isAnnual ? 'primary' : 'outline-primary'}
                onClick={() => setIsAnnual(true)}
                className="u-mx-1"
              >
                Annual
              </Button>
              <Button
                variant={!isAnnual ? 'primary' : 'outline-primary'}
                onClick={() => setIsAnnual(false)}
                className="u-mx-1"
              >
                Monthly
              </Button>
            </div>
          </div>

          <Grid>
            {pricingPlans.map((plan, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <Card className={`u-h-100 ${plan.popular ? 'u-border-primary u-border-2' : ''}`}>
                  {plan.popular && (
                    <div className="u-position-absolute u-top-0 u-start-50 u-translate-middle-x">
                      <Badge label="Most Popular" variant="primary" />
                    </div>
                  )}
                  <div className="c-card__header u-text-center u-p-4">
                    <h3 className="u-mb-2">{plan.name}</h3>
                    <p className="u-text-muted u-mb-3">{plan.description}</p>
                    <div className="u-mb-3">
                      <span className="u-fs-1 u-fw-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="u-text-muted">/{plan.priceSuffix}</span>
                    </div>
                  </div>
                  <div className="c-card__body u-p-4">
                    <ul className="u-list-unstyled u-mb-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="u-mb-2">
                          <Icon name="Check" className="u-text-success u-me-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? 'primary' : 'outline-primary'}
                      className="u-w-100"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* FAQ */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            title="Frequently asked questions"
            text="Everything you need to know about the platform."
            className="u-text-center u-mb-6"
          />
          <Row className="u-justify-content-center">
            <GridCol xs={12} md={8}>
              <Tab items={faqTabs} />
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="u-py-8 u-bg-primary u-text-white">
        <Container>
          <Row className="u-text-center">
            <GridCol xs={12}>
              <h2 className="u-mb-3">Ready to get started?</h2>
              <p className="u-mb-4 u-text-primary-emphasis">
                Join thousands of satisfied customers and transform your workflow today.
              </p>
              <div>
                <Button variant="light" size="lg" className="u-me-2">
                  Start Free Trial
                </Button>
                <Button variant="outline-light" size="lg">
                  Schedule a Demo
                </Button>
              </div>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-bg-dark u-text-white u-py-6">
        <Container>
          <Row>
            <GridCol xs={12} md={4} className="u-mb-4">
              <div className="u-mb-3">
                <AtomixLogo />
              </div>
              <p className="u-text-muted">
                Powerful tools to help your team collaborate, analyze, and grow.
              </p>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Product</h5>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Features
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Pricing
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Integrations
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Roadmap
                  </a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Resources</h5>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Documentation
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Blog
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Tutorials
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Support
                  </a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={12} md={4} className="u-mb-4">
              <h5 className="u-mb-3">Subscribe to our newsletter</h5>
              <p className="u-text-muted u-mb-3">Get the latest news and updates.</p>
              <div className="u-d-flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="u-form-control u-flex-grow-1 u-me-2"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </GridCol>
          </Row>
          <Row className="u-pt-4 u-mt-4 u-border-top u-border-dark-subtle">
            <GridCol xs={12} className="u-text-center u-text-muted">
              <p className="u-mb-0">© 2023 SaaS Platform. All rights reserved.</p>
            </GridCol>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Saas;
