import React from 'react';
import {
  Accordion,
  AreaChart,
  AtomixLogo,
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  Button,
  Callout,
  Card,
  ColorModeToggle,
  DataTable,
  DonutChart,
  Hero,
  Icon,
  Messages,
  Modal,
  Progress,
  Rating,
  RealTimeChart,
  SectionIntro,
  Steps,
  Tab,
  Toggle,
  Upload,
  VideoPlayer,
} from '../components';
import { Container, GridCol, Row } from '../layouts';

const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const features = [
    {
      icon: <Icon name="Layout" size={24} />,
      title: '40+ Components',
      description:
        'Comprehensive UI component library with React and vanilla JavaScript implementations',
    },
    {
      icon: <Icon name="PaintBrush" size={24} />,
      title: 'Design Tokens',
      description: 'Consistent colors, spacing, and typography for a unified design language',
    },
    {
      icon: <Icon name="PersonSimpleCircle" size={24} />,
      title: 'Accessible',
      description: 'WCAG 2.1 AA compliant components for inclusive user experiences',
    },
    {
      icon: <Icon name="Lightning" size={24} />,
      title: 'Performant',
      description: 'Tree-shakeable bundles with optimized performance',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Frontend Lead',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content:
        'Atomix has transformed how we build interfaces. The consistency and quality of components has significantly reduced our development time.',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'UI Engineer',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content:
        'The dual implementation for both React and vanilla JavaScript gives us flexibility across all our projects. Excellent documentation too!',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Design System Lead',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        "Implementing Atomix as our organization's design system was seamless. The theming capabilities and dark mode support are exceptional.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Open Source',
      price: 'Free',
      period: '',
      features: ['40+ Components', 'React & Vanilla JS', 'Community Support', 'MIT License'],
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      features: [
        'All Open Source features',
        'Priority Support',
        'Advanced Components',
        'Design Kit (Figma)',
        'Custom Theme Builder',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: [
        'All Pro features',
        'Dedicated Support',
        'Custom Components',
        'On-premise Deployment',
        'Training & Consulting',
        'SLA Guarantee',
      ],
      popular: false,
    },
  ];

  const stats = [
    { label: 'Components', value: '40+', progress: 100 },
    { label: 'GitHub Stars', value: '2K+', progress: 75 },
    { label: 'Contributors', value: '50+', progress: 90 },
    { label: 'Adoption', value: '120+', progress: 85 },
  ];

  return (
    <div className="homepage">
      {/* Header */}
      <header className="u-position-sticky u-top-0 u-z-5 u-bg-body u-border-bottom u-border-light-subtle">
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
      </header>

      {/* Hero Section */}
      <Hero
        title="Build Beautiful Interfaces with Atomix"
        subtitle="A modern, accessible design system and component library for building stunning user interfaces. Dual implementation for React and vanilla JavaScript."
        backgroundImageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop"
        showOverlay
        fullViewportHeight
        alignment="center"
        actions={
          <>
            <Button size="lg" className="u-me-4">
              Get Started
              <Icon name="ArrowRight" className="u-ml-2" size={20} />
            </Button>
            <Button variant="outline-primary" size="lg" onClick={() => setIsVideoModalOpen(true)}>
              <Icon name="Play" className="u-me-2" size={20} />
              Watch Demo
            </Button>
          </>
        }
      />

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onOpenChange={setIsVideoModalOpen}
        title="Atomix Design System Overview"
        size="xl"
        closeButton
      >
        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
          controls
          ambientMode
          width="100%"
          height="450px"
          autoplay
        />
      </Modal>

      {/* Stats Section */}
      <section className="u-py-16 u-bg-brand-subtle">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <GridCol key={index} xs={6} md={3}>
                <div className="u-text-center">
                  <div className="u-text-3xl u-fw-bold u-text-primary u-mb-2">{stat.value}</div>
                  <div className="u-mb-3">{stat.label}</div>
                  <Progress value={stat.progress} size="sm" />
                </div>
              </GridCol>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="u-py-20">
        <Container>
          <SectionIntro
            title="Why Choose Atomix"
            text="Everything you need to build consistent, accessible, and performant user interfaces"
            alignment="center"
          />

          <Row className="u-mt-16">
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} md={6} lg={3}>
                <Card
                  className="u-h-100 u-text-center"
                  icon={<>{feature.icon}</>}
                  title={<h3 className="u-text-lg u-fw-semibold">{feature.title}</h3>}
                  text={<p>{feature.description}</p>}
                />
              </GridCol>
            ))}
          </Row>

          {/* Feature Callout */}
          <div className="u-mt-16">
            <Callout variant="info" title="New Release!" icon={<Icon name="Sparkle" size={20} />}>
              Version 0.2.00 is now available with 5 new components and improved TypeScript support!
            </Callout>
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Get Started in Minutes"
            text="Follow these simple steps to integrate Atomix into your project"
            alignment="center"
          />

          <div className="u-mt-16 u-max-w-4xl u-mx-auto">
            <Steps
              activeIndex={0}
              items={[
                {
                  number: 1,
                  text: 'Install Package',
                  content: (
                    <p className="u-mt-2 u-text-sm">Add Atomix to your project via npm or yarn</p>
                  ),
                },
                {
                  number: 2,
                  text: 'Import Components',
                  content: (
                    <p className="u-mt-2 u-text-sm">Import the components and styles you need</p>
                  ),
                },
                {
                  number: 3,
                  text: 'Start Building',
                  content: (
                    <p className="u-mt-2 u-text-sm">Use components to build beautiful interfaces</p>
                  ),
                },
                {
                  number: 4,
                  text: 'Customize',
                  content: (
                    <p className="u-mt-2 u-text-sm">
                      Customize themes and styles to match your brand
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* Component Showcase */}
      <section id="components" className="u-py-20">
        <Container>
          <SectionIntro
            title="Component Library"
            text="Explore our comprehensive collection of production-ready components"
            alignment="center"
          />

          {/* Featured Components */}
          <Row className="u-mt-16">
            {[
              {
                name: 'Buttons',
                image:
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop',
                description: 'Multiple variants and sizes for all use cases',
              },
              {
                name: 'Cards',
                image:
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
                description: 'Flexible containers for content and data',
              },
              {
                name: 'Charts',
                image:
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
                description: 'Data visualization components',
              },
              {
                name: 'Forms',
                image:
                  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&h=200&fit=crop',
                description: 'Accessible form elements with validation',
              },
            ].map((component, index) => (
              <GridCol key={index} xs={12} sm={6} md={3}>
                <Card className="u-h-100 u-text-center">
                  <div className="u-mb-4">
                    <img
                      src={component.image}
                      alt={component.name}
                      className="u-w-100 u-h-auto u-rounded"
                    />
                  </div>
                  <h4 className="u-fw-semibold u-mb-2">{component.name}</h4>
                  <p className="u-text-sm">{component.description}</p>
                </Card>
              </GridCol>
            ))}
          </Row>

          {/* Component Stats */}
          <Row className="u-mt-16">
            <GridCol xs={12} md={4}>
              <div className="u-text-center">
                <div className="u-text-4xl u-fw-bold u-text-primary u-mb-2">40+</div>
                <p>UI Components</p>
              </div>
            </GridCol>
            <GridCol xs={12} md={4}>
              <div className="u-text-center">
                <div className="u-text-4xl u-fw-bold u-text-primary u-mb-2">2</div>
                <p>Implementations (React & JS)</p>
              </div>
            </GridCol>
            <GridCol xs={12} md={4}>
              <div className="u-text-center">
                <div className="u-text-4xl u-fw-bold u-text-primary u-mb-2">100%</div>
                <p>Accessible (WCAG 2.1 AA)</p>
              </div>
            </GridCol>
          </Row>

          {/* All Components */}
          <div className="u-text-center u-mt-16">
            <h3 className="u-mb-4">Explore All Components</h3>
            <AvatarGroup max={12} className="u-justify-content-center">
              <Avatar initials="Bt" />
              <Avatar initials="Cr" />
              <Avatar initials="Md" />
              <Avatar initials="Fr" />
              <Avatar initials="Tp" />
              <Avatar initials="Tl" />
              <Avatar initials="Cl" />
              <Avatar initials="Ic" />
              <Avatar initials="Av" />
              <Avatar initials="Dt" />
              <Avatar initials="Rt" />
              <Avatar initials="Pg" />
              <Avatar initials="St" />
              <Avatar initials="Tb" />
              <Avatar initials="Ms" />
            </AvatarGroup>
            <p className="u-mt-4">
              All components are fully documented with examples and API references
            </p>
            <Button variant="outline-primary" className="u-mt-4">
              <Icon name="BookOpen" className="u-me-2" size={16} />
              View Component Library
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Trusted by Developers"
            text="Join thousands of developers and companies building with Atomix"
            alignment="center"
          />

          {/* Company Logos */}
          <div className="u-text-center u-mt-12">
            <p className="u-mb-6 u-fw-medium">Used by innovative teams</p>
            <Row className="u-align-items-center">
              {[
                { name: 'TechCorp', logo: '🏢' },
                { name: 'StartupXYZ', logo: '🚀' },
                { name: 'InnovateCo', logo: '💡' },
                { name: 'DevStudio', logo: '⚡' },
                { name: 'CloudTech', logo: '☁️' },
                { name: 'DataFlow', logo: '📊' },
              ].map((company, index) => (
                <GridCol key={index} xs={6} md={2}>
                  <div className="u-text-center u-p-3">
                    <div className="u-text-4xl u-mb-2">{company.logo}</div>
                    <p className="u-text-sm u-fw-medium">{company.name}</p>
                  </div>
                </GridCol>
              ))}
            </Row>
          </div>

          {/* Enhanced Testimonials */}
          <Row className="u-mt-16">
            {testimonials.map((testimonial, index) => (
              <GridCol key={index} xs={12} md={4}>
                <Card className="u-h-100">
                  <div className="u-d-flex u-align-items-center u-mb-3">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      size="md"
                      className="u-me-3"
                    />
                    <div>
                      <h5 className="u-mb-1 u-fw-semibold">{testimonial.name}</h5>
                      <p className="u-text-sm u-mb-0">{testimonial.role}</p>
                    </div>
                  </div>
                  <Rating value={testimonial.rating} readOnly size="sm" className="u-mb-3" />
                  <blockquote className="u-mb-0">
                    <p className="u-fst-italic">"{testimonial.content}"</p>
                  </blockquote>
                </Card>
              </GridCol>
            ))}
          </Row>

          {/* Stats and Rating */}
          <Row className="u-mt-16">
            <GridCol xs={12} md={3}>
              <div className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-primary u-mb-2">2K+</div>
                <p>GitHub Stars</p>
              </div>
            </GridCol>
            <GridCol xs={12} md={3}>
              <div className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-primary u-mb-2">500+</div>
                <p>Downloads/Month</p>
              </div>
            </GridCol>
            <GridCol xs={12} md={3}>
              <div className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-primary u-mb-2">99%</div>
                <p>Satisfaction Rate</p>
              </div>
            </GridCol>
            <GridCol xs={12} md={3}>
              <div className="u-text-center">
                <Rating value={4.9} readOnly size="lg" className="u-mb-2" />
                <p>4.9/5 Average Rating</p>
              </div>
            </GridCol>
          </Row>

          {/* Call to Action */}
          <div className="u-text-center u-mt-16">
            <Callout variant="success" title="Join Our Community!">
              <p className="u-mb-4">
                Connect with other developers using Atomix and share your experiences
              </p>
              <div className="u-d-flex u-gap-3 u-justify-content-center">
                <Button variant="primary" size="sm">
                  <Icon name="Users" className="u-me-2" size={16} />
                  Join Community
                </Button>
                <Button variant="outline-primary" size="sm">
                  <Icon name="ChatCircle" className="u-me-2" size={16} />
                  Share Feedback
                </Button>
              </div>
            </Callout>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Simple, Transparent Pricing"
            text="Choose the plan that fits your needs. All plans include core features."
            alignment="center"
          />

          {/* Pricing Toggle */}
          <div className="u-text-center u-mb-8">
            <div className="u-d-inline-flex u-align-items-center u-gap-3 u-bg-white u-p-2 u-rounded-pill u-shadow-sm">
              <span className="u-px-3 u-py-1">Monthly</span>
              <Toggle />
              <span className="u-px-3 u-py-1">
                Annual <Badge variant="success" size="sm" label="Save 20%" className="u-ml-2" />
              </span>
            </div>
          </div>

          <Row className="u-mt-16">
            {pricingPlans.map((plan, index) => (
              <GridCol key={index} xs={12} md={4}>
                <Card
                  className={`u-h-100 u-position-relative u-border-light-subtle u-transition-all u-hover-shadow-lg ${
                    plan.popular ? 'u-border-primary u-shadow-md u-scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge
                      variant="primary"
                      className="u-position-absolute u-top-n3 u-start-50 u-translate-middle-x u-shadow-sm"
                      label="🔥 Most Popular"
                    />
                  )}
                  <div className="u-text-center">
                    <h3 className="u-text-xl u-fw-semibold u-mb-2">{plan.name}</h3>
                    <div className="u-text-4xl u-fw-bold u-mb-2">
                      {plan.price}
                      <span className="u-text-lg u-fw-normal u-text-muted">{plan.period}</span>
                    </div>
                    <p className="u-text-sm u-text-muted u-mb-0">
                      {plan.name === 'Open Source' && 'Perfect for individuals and hobby projects'}
                      {plan.name === 'Pro' && 'Best for professional developers and teams'}
                      {plan.name === 'Enterprise' && 'For large organizations with advanced needs'}
                    </p>
                  </div>
                  <div className=" u-pt-0">
                    <ul className="u-list-unstyled u-mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="u-d-flex u-align-items-center u-gap-3 u-mb-3"
                        >
                          <Icon
                            name="CheckCircle"
                            size={16}
                            className="u-text-success u-flex-shrink-0"
                          />
                          <span className="u-text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? 'primary' : 'outline-primary'}
                      className="u-w-100 u-mb-3"
                      size="md"
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                    <p className="u-text-xs u-text-center u-text-muted u-mb-0">
                      {plan.name !== 'Enterprise' &&
                        plan.name !== 'Open Source' &&
                        '14-day free trial • No credit card required'}
                      {plan.name === 'Enterprise' && 'Custom pricing • Dedicated support'}
                      {plan.name === 'Open Source' && 'Free forever • Community support'}
                    </p>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Row>

          {/* Pricing Features Comparison */}
          <div className="u-mt-16">
            <div className="u-text-center u-mb-8">
              <h3 className="u-text-2xl u-fw-semibold u-mb-3">Compare All Plans</h3>
              <p className="u-text-muted">See what's included in each plan</p>
            </div>

            <DataTable
              data={[
                { feature: 'Components', opensource: '40+', pro: '40+', enterprise: '40+' },
                { feature: 'React & JS', opensource: '✓', pro: '✓', enterprise: '✓' },
                { feature: 'Design Tokens', opensource: '✓', pro: '✓', enterprise: '✓' },
                { feature: 'Dark Mode', opensource: '✓', pro: '✓', enterprise: '✓' },
                { feature: 'Community Support', opensource: '✓', pro: '✓', enterprise: '✓' },
                { feature: 'Priority Support', opensource: '✗', pro: '✓', enterprise: '✓' },
                { feature: 'Design Kit (Figma)', opensource: '✗', pro: '✓', enterprise: '✓' },
                { feature: 'Custom Theme Builder', opensource: '✗', pro: '✓', enterprise: '✓' },
                { feature: 'Custom Components', opensource: '✗', pro: '✗', enterprise: '✓' },
                { feature: 'On-premise Deployment', opensource: '✗', pro: '✗', enterprise: '✓' },
                { feature: 'Training & Consulting', opensource: '✗', pro: '✗', enterprise: '✓' },
              ]}
              columns={[
                { key: 'feature', title: 'Features' },
                {
                  key: 'opensource',
                  title: 'Open Source',
                  render: value => (
                    <div className="u-text-center">
                      {value === '✓' ? (
                        <Icon name="CheckCircle" size={16} className="u-text-success" />
                      ) : value === '✗' ? (
                        <Icon name="X" size={16} className="u-text-muted" />
                      ) : (
                        value
                      )}
                    </div>
                  ),
                },
                {
                  key: 'pro',
                  title: 'Pro',
                  render: value => (
                    <div className="u-text-center">
                      {value === '✓' ? (
                        <Icon name="CheckCircle" size={16} className="u-text-success" />
                      ) : value === '✗' ? (
                        <Icon name="X" size={16} className="u-text-muted" />
                      ) : (
                        value
                      )}
                    </div>
                  ),
                },
                {
                  key: 'enterprise',
                  title: 'Enterprise',
                  render: value => (
                    <div className="u-text-center">
                      {value === '✓' ? (
                        <Icon name="CheckCircle" size={16} className="u-text-success" />
                      ) : value === '✗' ? (
                        <Icon name="X" size={16} className="u-text-muted" />
                      ) : (
                        value
                      )}
                    </div>
                  ),
                },
              ]}
              striped
              bordered
            />
          </div>

          {/* Pricing FAQ */}
          <Row className="u-mt-16">
            <GridCol xs={12} md={8} className="u-mx-auto">
              <div className="u-text-center u-mb-8">
                <h3 className="u-text-2xl u-fw-semibold u-mb-3">Pricing FAQ</h3>
                <p className="u-text-muted">Common questions about our pricing</p>
              </div>

              <div className="u-d-flex u-flex-column u-gap-3">
                <Accordion title="Is the open source version really free?">
                  <p>
                    Yes! The open source version is completely free with no limitations on usage. It
                    includes all 40+ components, both React and vanilla JavaScript implementations,
                    and all core features.
                  </p>
                </Accordion>

                <Accordion title="What payment methods do you accept?">
                  <p>
                    We accept all major credit cards (Visa, MasterCard, American Express), PayPal,
                    and bank transfers for Enterprise customers.
                  </p>
                </Accordion>

                <Accordion title="Do you offer discounts for non-profits or educational institutions?">
                  <p>
                    Yes, we offer special pricing for non-profit organizations and educational
                    institutions. Please contact our sales team for more information.
                  </p>
                </Accordion>

                <Accordion title="Can I upgrade or downgrade my plan?">
                  <p>
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect
                    immediately, and we'll prorate any billing differences.
                  </p>
                </Accordion>
              </div>
            </GridCol>
          </Row>

          {/* Money Back Guarantee */}
          <div className="u-mt-16 u-text-center">
            <Callout variant="success" title="30-Day Money-Back Guarantee">
              <p className="u-mb-4">
                Not satisfied with Atomix Pro? Get a full refund within 30 days, no questions asked.
              </p>
              <div className="u-d-flex u-justify-content-center u-gap-4 u-text-sm">
                <div className="u-d-flex u-align-items-center u-gap-2">
                  <Icon name="Shield" size={16} />
                  <span>Secure payments</span>
                </div>
                <div className="u-d-flex u-align-items-center u-gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Cancel anytime</span>
                </div>
                <div className="u-d-flex u-align-items-center u-gap-2">
                  <Icon name="Users" size={16} />
                  <span>24/7 support</span>
                </div>
              </div>
            </Callout>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="u-py-20">
        <Container>
          <SectionIntro
            title="Frequently Asked Questions"
            text="Find answers to common questions about Atomix"
            alignment="center"
          />

          <Row className="u-mt-16">
            <GridCol xs={12} md={8}>
              <div className="u-d-flex u-flex-column u-gap-3">
                <Accordion title="What is Atomix exactly?">
                  <p>
                    Atomix is a modern design system and component library for building beautiful
                    user interfaces. It provides over 40 production-ready components with dual
                    implementations for both React and vanilla JavaScript. It includes design tokens
                    for consistent colors, spacing, and typography, and follows WCAG 2.1 AA
                    accessibility guidelines.
                  </p>
                </Accordion>

                <Accordion title="Is Atomix free to use?">
                  <p>
                    Yes, Atomix is free and open source under the MIT license. The core library
                    includes all 40+ components, both React and vanilla JavaScript implementations,
                    design tokens, and all essential features. We also offer paid Pro and Enterprise
                    plans with additional features and support.
                  </p>
                </Accordion>

                <Accordion title="How do I get started with Atomix?">
                  <p>
                    Getting started is easy. Install Atomix via npm or yarn, import the components
                    and styles you need, and start building. Check out our comprehensive
                    documentation and examples to learn more.
                  </p>
                </Accordion>

                <Accordion title="Does Atomix support dark mode?">
                  <p>
                    Yes, Atomix includes built-in dark mode support that can be toggled with our
                    ColorModeToggle component. The dark theme is carefully designed to maintain
                    accessibility standards and visual appeal.
                  </p>
                </Accordion>

                <Accordion title="Is Atomix accessible?">
                  <p>
                    Absolutely. All Atomix components follow WCAG 2.1 AA accessibility guidelines.
                    We ensure proper semantic HTML, keyboard navigation, ARIA attributes, and
                    sufficient color contrast ratios.
                  </p>
                </Accordion>

                <Accordion title="Can I customize the components?">
                  <p>
                    Yes, Atomix is highly customizable. You can customize themes using CSS custom
                    properties, override styles with your own CSS, or create custom themes using our
                    theming system. Each component also accepts custom className props for
                    additional styling.
                  </p>
                </Accordion>

                <Accordion title="What browsers does Atomix support?">
                  <p>
                    Atomix supports all modern browsers including Chrome, Firefox, Safari, Edge, and
                    their mobile counterparts. For older browsers, you may need to include
                    additional polyfills.
                  </p>
                </Accordion>

                <Accordion title="How do I contribute to Atomix?">
                  <p>
                    We welcome contributions! Check out our GitHub repository for contribution
                    guidelines. You can contribute by reporting bugs, suggesting features,
                    submitting pull requests, or improving documentation.
                  </p>
                </Accordion>
              </div>
            </GridCol>

            <GridCol xs={12} md={4}>
              <div className="u-position-sticky" style={{ top: '2rem' }}>
                <Card className="u-mb-4">
                  <h4 className="u-mb-3">
                    <Icon name="Question" className="u-me-2" size={20} />
                    Need More Help?
                  </h4>
                  <p className="u-mb-4 u-text-sm">
                    Can't find what you're looking for? Our community and team are here to help.
                  </p>
                  <div className="u-d-grid u-gap-2">
                    <Button variant="primary" size="sm">
                      <Icon name="ChatCircle" className="u-me-2" size={16} />
                      Community Chat
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      <Icon name="Envelope" className="u-me-2" size={16} />
                      Email Support
                    </Button>
                  </div>
                </Card>

                <Card>
                  <h4 className="u-mb-3">
                    <Icon name="BookOpen" className="u-me-2" size={20} />
                    Resources
                  </h4>
                  <ul className="u-list-unstyled u-text-sm">
                    <li className="u-mb-2">
                      <a href="#" className="u-d-flex u-align-items-center">
                        <Icon name="FileText" className="u-me-2" size={14} />
                        Documentation
                      </a>
                    </li>
                    <li className="u-mb-2">
                      <a href="#" className="u-d-flex u-align-items-center">
                        <Icon name="PlayCircle" className="u-me-2" size={14} />
                        Video Tutorials
                      </a>
                    </li>
                    <li className="u-mb-2">
                      <a href="#" className="u-d-flex u-align-items-center">
                        <Icon name="Code" className="u-me-2" size={14} />
                        Code Examples
                      </a>
                    </li>
                    <li className="u-mb-2">
                      <a href="#" className="u-d-flex u-align-items-center">
                        <Icon name="Users" className="u-me-2" size={14} />
                        Community Forum
                      </a>
                    </li>
                  </ul>
                </Card>
              </div>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Analytics Dashboard */}
      <section className="u-py-20">
        <Container>
          <SectionIntro
            title="Design System Analytics"
            text="Monitor your design system adoption and component usage"
            alignment="center"
          />

          <Row className="u-mt-16">
            {/* Component Usage Chart */}
            <GridCol xs={12} lg={8}>
              <Card className="u-h-100">
                <h4 className="u-mb-4">Component Usage</h4>
                <RealTimeChart
                  datasets={[
                    {
                      label: 'Button',
                      data: [
                        { label: 'Mon', value: 1250 },
                        { label: 'Tue', value: 1380 },
                        { label: 'Wed', value: 1420 },
                        { label: 'Thu', value: 1650 },
                        { label: 'Fri', value: 1580 },
                        { label: 'Sat', value: 1720 },
                      ],
                      color: '#10b981',
                    },
                  ]}
                  config={{ showLegend: false }}
                  streamConfig={{
                    interval: 5000,
                    maxDataPoints: 20,
                    autoScroll: true,
                  }}
                  dataSource={async () => [
                    {
                      label: new Date().toLocaleTimeString(),
                      value: Math.floor(Math.random() * 500) + 1500,
                    },
                  ]}
                />
              </Card>
            </GridCol>

            {/* Adoption Sources */}
            <GridCol xs={12} lg={4}>
              <Card className="u-h-100">
                <h4 className="u-mb-4">Adoption Sources</h4>
                <DonutChart
                  datasets={[
                    {
                      label: 'Adoption Sources',
                      data: [
                        { label: 'NPM', value: 45, color: '#3b82f6' },
                        { label: 'GitHub', value: 30, color: '#10b981' },
                        { label: 'CDN', value: 15, color: '#f59e0b' },
                        { label: 'Other', value: 10, color: '#ef4444' },
                      ],
                    },
                  ]}
                  config={{ showLegend: true }}
                  pieOptions={{ showPercentages: true, showValues: false }}
                  donutOptions={{
                    innerRadiusRatio: 0.6,
                    showTotal: true,
                    centerLabel: 'Total',
                    centerValue: '100%',
                  }}
                />
              </Card>
            </GridCol>
          </Row>

          <Row className="u-mt-6">
            {/* Design System Maturity */}
            <GridCol xs={12} md={6}>
              <Card className="u-h-100">
                <h4 className="u-mb-4">Design System Maturity</h4>
                <AreaChart
                  datasets={[
                    {
                      label: 'Maturity Score',
                      data: [
                        { label: 'Jan', value: 45 },
                        { label: 'Feb', value: 52 },
                        { label: 'Mar', value: 48 },
                        { label: 'Apr', value: 61 },
                        { label: 'May', value: 58 },
                        { label: 'Jun', value: 67 },
                      ],
                      color: '#8b5cf6',
                    },
                  ]}
                  config={{ showLegend: false }}
                  areaOptions={{
                    showArea: true,
                    fillOpacity: 0.3,
                    useGradient: true,
                  }}
                />
              </Card>
            </GridCol>

            {/* Component Coverage */}
            <GridCol xs={12} md={6}>
              <Card className="u-h-100">
                <h4 className="u-mb-4">Component Coverage</h4>
                <BarChart
                  datasets={[
                    {
                      label: 'Coverage %',
                      data: [
                        { label: 'Buttons', value: 95 },
                        { label: 'Forms', value: 87 },
                        { label: 'Navigation', value: 78 },
                        { label: 'Data', value: 92 },
                      ],
                      color: '#06b6d4',
                    },
                  ]}
                  config={{ showLegend: false }}
                  barOptions={{
                    showValues: true,
                    cornerRadius: 4,
                  }}
                />
              </Card>
            </GridCol>
          </Row>

          {/* Analytics Summary Cards */}
          <Row className="u-mt-6">
            <GridCol xs={6} md={3}>
              <Card className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-primary u-mb-2">40+</div>
                <div className="u-text-sm u-mb-2">Components</div>
                <Badge variant="success" size="sm" label="+5%" />
              </Card>
            </GridCol>
            <GridCol xs={6} md={3}>
              <Card className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-success u-mb-2">2.5K+</div>
                <div className="u-text-sm u-mb-2">GitHub Stars</div>
                <Badge variant="success" size="sm" label="+12%" />
              </Card>
            </GridCol>
            <GridCol xs={6} md={3}>
              <Card className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-warning u-mb-2">99%</div>
                <div className="u-text-sm u-mb-2">Accessibility</div>
                <Badge variant="success" size="sm" label="AA" />
              </Card>
            </GridCol>
            <GridCol xs={6} md={3}>
              <Card className="u-text-center">
                <div className="u-text-3xl u-fw-bold u-text-info u-mb-2">120+</div>
                <div className="u-text-sm u-mb-2">Adopters</div>
                <Badge variant="success" size="sm" label="+8%" />
              </Card>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Resources Section */}
      <section className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Resources & Documentation"
            text="Everything you need to get started and succeed with Atomix"
            alignment="center"
          />

          {/* Resource Cards Grid */}
          <Row className="u-mt-16">
            <GridCol xs={12} md={4}>
              <Card className="u-h-100 u-text-center u-hover-shadow-lg u-transition-all">
                <div className="u-d-inline-flex u-align-items-center u-justify-content-center u-w-16 u-h-16 u-bg-primary u-text-white u-rounded u-mb-4">
                  <Icon name="BookOpen" size={24} />
                </div>
                <h4 className="u-mb-3">Documentation</h4>
                <p className="u-mb-4 u-text-sm">
                  Comprehensive guides, API references, and tutorials to help you build amazing
                  applications with Atomix.
                </p>
                <div className="u-mb-4">
                  <Badge variant="info" size="sm" label="500+ Pages" className="u-me-2" />
                  <Badge variant="success" size="sm" label="Updated Daily" />
                </div>
                <Button variant="primary" size="sm" className="u-w-100">
                  <Icon name="ArrowSquareOut" className="u-me-2" size={14} />
                  Browse Docs
                </Button>
              </Card>
            </GridCol>

            <GridCol xs={12} md={4}>
              <Card className="u-h-100 u-text-center u-hover-shadow-lg u-transition-all">
                <div className="u-d-inline-flex u-align-items-center u-justify-content-center u-w-16 u-h-16 u-bg-success u-text-white u-rounded u-mb-4">
                  <Icon name="Code" size={24} />
                </div>
                <h4 className="u-mb-3">Code Examples</h4>
                <p className="u-mb-4 u-text-sm">
                  Ready-to-use code snippets, templates, and complete project examples for quick
                  implementation.
                </p>
                <div className="u-mb-4">
                  <Badge variant="warning" size="sm" label="50+ Examples" className="u-me-2" />
                  <Badge variant="info" size="sm" label="Copy & Paste" />
                </div>
                <Button variant="success" size="sm" className="u-w-100">
                  <Icon name="Download" className="u-me-2" size={14} />
                  Get Examples
                </Button>
              </Card>
            </GridCol>

            <GridCol xs={12} md={4}>
              <Card className="u-h-100 u-text-center u-hover-shadow-lg u-transition-all">
                <div className="u-d-inline-flex u-align-items-center u-justify-content-center u-w-16 u-h-16 u-bg-warning u-text-white u-rounded u-mb-4">
                  <Icon name="PlayCircle" size={24} />
                </div>
                <h4 className="u-mb-3">Video Tutorials</h4>
                <p className="u-mb-4 u-text-sm">
                  Step-by-step video guides covering everything from basic setup to advanced
                  implementations.
                </p>
                <div className="u-mb-4">
                  <Badge variant="primary" size="sm" label="25+ Videos" className="u-me-2" />
                  <Badge variant="success" size="sm" label="HD Quality" />
                </div>
                <Button variant="warning" size="sm" className="u-w-100">
                  <Icon name="Play" className="u-me-2" size={14} />
                  Watch Now
                </Button>
              </Card>
            </GridCol>
          </Row>

          {/* Interactive Documentation Tabs */}
          <Row className="u-mt-16">
            <GridCol xs={12} lg={8}>
              <Card>
                <h4 className="u-mb-4">
                  <Icon name="Terminal" className="u-me-2" size={20} />
                  Interactive Documentation
                </h4>
                <Tab
                  items={[
                    {
                      label: '🚀 Quick Start',
                      content: (
                        <div className="u-p-4">
                          <h5 className="u-mb-3">Get Started in 3 Steps</h5>
                          <div className="u-mb-4">
                            <Steps
                              activeIndex={0}
                              items={[
                                {
                                  number: 1,
                                  text: 'Install Package',
                                  content: (
                                    <div className="u-mt-2">
                                      <code className="u-bg-light u-p-2 u-rounded u-d-block u-text-sm">
                                        npm install @shohojdhara/atomix
                                      </code>
                                    </div>
                                  ),
                                },
                                {
                                  number: 2,
                                  text: 'Import Components',
                                  content: (
                                    <div className="u-mt-2">
                                      <code className="u-bg-light u-p-2 u-rounded u-d-block u-text-sm">
                                        import {`{ Button, Card }`} from '@shohojdhara/atomix'
                                      </code>
                                    </div>
                                  ),
                                },
                                {
                                  number: 3,
                                  text: 'Start Building',
                                  content: (
                                    <div className="u-mt-2">
                                      <code className="u-bg-light u-p-2 u-rounded u-d-block u-text-sm">
                                        {`<Button variant="primary">Hello World</Button>`}
                                      </code>
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                          <div className="u-d-flex u-gap-3">
                            <Button variant="primary" size="sm">
                              <Icon name="BookOpen" className="u-me-2" size={14} />
                              Full Guide
                            </Button>
                            <Button variant="outline-primary" size="sm">
                              <Icon name="Download" className="u-me-2" size={14} />
                              Download Starter
                            </Button>
                          </div>
                        </div>
                      ),
                    },
                    {
                      label: '📚 API Reference',
                      content: (
                        <div className="u-p-4">
                          <h5 className="u-mb-3">Complete API Documentation</h5>
                          <p className="u-mb-4">
                            Explore our comprehensive API with interactive examples and live code
                            playground.
                          </p>
                          <div className="u-mb-4">
                            <div className="u-d-flex u-align-items-center u-gap-2 u-mb-2">
                              <Icon name="CheckCircle" size={16} className="u-text-success" />
                              <span className="u-text-sm">40+ Components documented</span>
                            </div>
                            <div className="u-d-flex u-align-items-center u-gap-2 u-mb-2">
                              <Icon name="CheckCircle" size={16} className="u-text-success" />
                              <span className="u-text-sm">TypeScript definitions included</span>
                            </div>
                            <div className="u-d-flex u-align-items-center u-gap-2">
                              <Icon name="CheckCircle" size={16} className="u-text-success" />
                              <span className="u-text-sm">Interactive code examples</span>
                            </div>
                          </div>
                          <Button variant="primary" size="sm">
                            <Icon name="ArrowSquareOut" className="u-me-2" size={14} />
                            Browse API Docs
                          </Button>
                        </div>
                      ),
                    },
                    {
                      label: '💡 Examples',
                      content: (
                        <div className="u-p-4">
                          <h5 className="u-mb-3">Real-World Examples</h5>
                          <p className="u-mb-4">
                            Browse our collection of production-ready examples and templates.
                          </p>
                          <div className="u-mb-4">
                            <Upload
                              acceptedFileTypes={['.zip', '.tar.gz']}
                              multiple={false}
                              onFileSelect={() => {}}
                              title="Drop your project files here to get started"
                            />
                          </div>
                          <div className="u-d-flex u-gap-2 u-flex-wrap u-mb-4">
                            <Badge variant="primary" size="sm" label="Dashboard" />
                            <Badge variant="success" size="sm" label="E-commerce" />
                            <Badge variant="warning" size="sm" label="Landing Page" />
                            <Badge variant="info" size="sm" label="Admin Panel" />
                          </div>
                          <Button variant="primary" size="sm">
                            <Icon name="Code" className="u-me-2" size={14} />
                            View All Examples
                          </Button>
                        </div>
                      ),
                    },
                  ]}
                />
              </Card>
            </GridCol>

            <GridCol xs={12} lg={4}>
              {/* Enhanced Support Chat */}
              <Card className="u-h-100">
                <div className="u-d-flex u-align-items-center u-gap-2 u-mb-4">
                  <div className="u-w-3 u-h-3 u-bg-success u-rounded-circle"></div>
                  <h4 className="u-mb-0">Community Support</h4>
                  <Badge variant="success" size="sm" label="Online" className="u-ml-auto" />
                </div>
                <Messages
                  messages={[
                    {
                      id: '1',
                      text: 'Hi! How can I help you with Atomix today? 👋',
                      time: '2:30 PM',
                      isSelf: false,
                    },
                    {
                      id: '2',
                      text: 'I need help customizing the theme.',
                      time: '2:31 PM',
                      isSelf: true,
                    },
                    {
                      id: '3',
                      text: "I'd be happy to help! Have you checked our theming documentation?",
                      time: '2:32 PM',
                      isSelf: false,
                    },
                    {
                      id: '4',
                      text: 'Not yet, can you point me to the right place?',
                      time: '2:33 PM',
                      isSelf: true,
                    },
                  ]}
                  otherAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  selfAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                  otherName="Alex (Community)"
                  bodyHeight="250px"
                />
                <div className="u-mt-3 u-text-center">
                  <p className="u-text-xs u-text-muted u-mb-2">Average response time: 2 hours</p>
                  <Button variant="outline-primary" size="sm" className="u-w-100">
                    <Icon name="ChatCircle" className="u-me-2" size={14} />
                    Join Conversation
                  </Button>
                </div>
              </Card>
            </GridCol>
          </Row>

          {/* Resource Links */}
          <Row className="u-mt-16">
            <GridCol xs={12}>
              <Card>
                <h4 className="u-text-center u-mb-6">Additional Resources</h4>
                <Row>
                  <GridCol xs={6} md={3}>
                    <div className="u-text-center">
                      <Icon name="Users" size={32} className="u-text-primary u-mb-3" />
                      <h6 className="u-mb-2">Community</h6>
                      <p className="u-text-sm u-text-muted u-mb-3">Join 10K+ developers</p>
                      <Button variant="outline-primary" size="sm">
                        Join Discord
                      </Button>
                    </div>
                  </GridCol>
                  <GridCol xs={6} md={3}>
                    <div className="u-text-center">
                      <Icon name="FileText" size={32} className="u-text-success u-mb-3" />
                      <h6 className="u-mb-2">Changelog</h6>
                      <p className="u-text-sm u-text-muted u-mb-3">Latest updates</p>
                      <Button variant="outline-primary" size="sm">
                        View Changes
                      </Button>
                    </div>
                  </GridCol>
                  <GridCol xs={6} md={3}>
                    <div className="u-text-center">
                      <Icon name="GithubLogo" size={32} className="u-text-dark u-mb-3" />
                      <h6 className="u-mb-2">GitHub</h6>
                      <p className="u-text-sm u-text-muted u-mb-3">Open source</p>
                      <Button variant="outline-primary" size="sm">
                        Star on GitHub
                      </Button>
                    </div>
                  </GridCol>
                  <GridCol xs={6} md={3}>
                    <div className="u-text-center">
                      <Icon name="Headphones" size={32} className="u-text-warning u-mb-3" />
                      <h6 className="u-mb-2">Support</h6>
                      <p className="u-text-sm u-text-muted u-mb-3">Get help 24/7</p>
                      <Button variant="outline-primary" size="sm">
                        Contact Us
                      </Button>
                    </div>
                  </GridCol>
                </Row>
              </Card>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="u-py-20 u-bg-primary u-text-white">
        <Container>
          <div className="u-text-center u-max-w-3xl u-mx-auto">
            <h2 className="u-text-3xl u-text-md-4xl u-fw-bold u-mb-4">
              Ready to Transform Your UI Development?
            </h2>
            <p className="u-text-xl u-mb-8 u-opacity-90">
              Join thousands of developers who are already building stunning interfaces with Atomix.
            </p>
            <div className="u-d-flex  u-flex-sm-row u-gap-4 u-justify-content-center u-mb-6">
              <Button variant="secondary" size="md">
                Get Started Free
                <Icon name="ArrowRight" className="u-ml-2" size={16} />
              </Button>
              <Button variant="outline-primary" size="md" className="u-border-white u-text-white">
                View Documentation
              </Button>
            </div>
            <div className="u-d-flex u-flex-column u-flex-md-row u-align-items-center u-justify-content-center u-gap-4 u-text-sm u-opacity-80">
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Icon name="CheckCircle" size={14} />
                <span>Free and open source</span>
              </div>
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Icon name="CreditCard" size={14} />
                <span>Paid plans for advanced features</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-py-16 u-bg-dark u-text-white">
        <Container>
          <Row className="u-mb-12">
            <GridCol xs={12} md={4} className="u-mb-8 u-mb-md-0">
              <div className="u-d-flex u-align-items-center u-gap-2 u-mb-4">
                <AtomixLogo />
                <span className="u-text-xl u-fw-bold">Atomix</span>
              </div>
              <p className="u-mb-4 u-text-muted">
                A modern design system and component library for building beautiful user interfaces.
              </p>
              <div className="u-d-flex u-gap-4">
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="GithubLogo" size={20} />
                </a>
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="TwitterLogo" size={20} />
                </a>
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="DiscordLogo" size={20} />
                </a>
              </div>
            </GridCol>

            <GridCol xs={6} sm={4} md={2} className="u-mb-8 u-mb-md-0">
              <h4 className="u-fw-semibold u-mb-4 u-text-uppercase u-text-sm">Product</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Components
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Design Tokens
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Documentation
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    API Reference
                  </a>
                </li>
              </ul>
            </GridCol>

            <GridCol xs={6} sm={4} md={2} className="u-mb-8 u-mb-md-0">
              <h4 className="u-fw-semibold u-mb-4 u-text-uppercase u-text-sm">Company</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    About
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Blog
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Careers
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </GridCol>

            <GridCol xs={6} sm={4} md={2} className="u-mb-8 u-mb-md-0">
              <h4 className="u-fw-semibold u-mb-4 u-text-uppercase u-text-sm">Resources</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Help Center
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Community
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Status
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </GridCol>

            <GridCol xs={6} sm={4} md={2}>
              <h4 className="u-fw-semibold u-mb-4 u-text-uppercase u-text-sm">Legal</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Privacy
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Terms
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Licenses
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </GridCol>
          </Row>

          <div className="u-border-top u-border-light-subtle u-pt-8 u-text-center u-text-md-start">
            <Row className="u-align-items-center">
              <GridCol xs={12} md={6} className="u-mb-4 u-mb-md-0">
                <p className="u-mb-0 u-text-muted">
                  &copy; 2024 Atomix Design System. All rights reserved. Open source under MIT
                  license.
                </p>
              </GridCol>
              <GridCol xs={12} md={6}>
                <div className="u-d-flex u-justify-content-center u-justify-content-md-end u-gap-6">
                  <a href="#" className="u-text-muted u-hover-text-white u-transition">
                    Privacy Policy
                  </a>
                  <a href="#" className="u-text-muted u-hover-text-white u-transition">
                    Terms of Service
                  </a>
                  <a href="#" className="u-text-muted u-hover-text-white u-transition">
                    Cookie Policy
                  </a>
                </div>
              </GridCol>
            </Row>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
