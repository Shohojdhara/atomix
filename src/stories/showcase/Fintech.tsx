import React, { useState } from 'react';
import {
  Accordion,
  AreaChart,
  AtomixLogo,
  AtomixGlass,
  Avatar,
  AvatarGroup,
  BarChart,
  Breadcrumb,
  Callout,
  ColorModeToggle,
  Countdown,
  DataTable,
  DonutChart,
  Badge,
  Button,
  Card,
  Hero,
  Icon,
  LineChart,
  Modal,
  Progress,
  Rating,
  River,
  SectionIntro,
  Spinner,
  Steps,
  Tabs,
  Testimonial,
  Navbar,
  NavItem,
  Nav,
  Block,
  Footer,
  FooterSection,
  FooterLink,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';
import { AtomixGlassProps } from '../../lib/types/components';

const Fintech: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <Icon name="CreditCard" size={24} />,
      title: 'Secure Transactions',
      description: 'Bank-level encryption and fraud detection for every transaction.',
    },
    {
      icon: <Icon name="ArrowsClockwise" size={24} />,
      title: 'Instant Transfers',
      description: 'Send and receive money instantly, 24/7, anywhere in the world.',
    },
    {
      icon: <Icon name="Shield" size={24} />,
      title: 'Fraud Protection',
      description: 'Advanced AI-powered fraud detection and real-time monitoring.',
    },
    {
      icon: <Icon name="ChartLine" size={24} />,
      title: 'Analytics Dashboard',
      description: 'Track spending, income, and financial insights in real-time.',
    },
    {
      icon: <Icon name="DeviceMobile" size={24} />,
      title: 'Mobile Payments',
      description: 'Pay with your phone anywhere with NFC and QR code support.',
    },
    {
      icon: <Icon name="Headset" size={24} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support whenever you need assistance.',
    },
  ];

  const stats = [
    {
      value: '$2.5B+',
      label: 'Transaction Volume',
      description: 'Processed monthly',
    },
    {
      value: '5M+',
      label: 'Active Users',
      description: 'Trusted worldwide',
    },
    {
      value: '180+',
      label: 'Countries Served',
      description: 'Global reach',
    },
    {
      value: '99.99%',
      label: 'Uptime',
      description: 'Reliable service',
    },
  ];

  const services = [
    {
      icon: <Icon name="Coin" size={32} />,
      title: 'Digital Wallet',
      description:
        'Store, send, and receive money securely with our digital wallet. Access your funds anytime, anywhere.',
      features: ['Multi-currency support', 'Instant transfers', 'Bill payments', 'Budget tracking'],
      cta: 'Learn More',
    },
    {
      icon: <Icon name="CreditCard" size={32} />,
      title: 'Card Management',
      description:
        'Manage all your cards in one place. Set spending limits, track expenses, and get instant notifications.',
      features: [
        'Virtual cards',
        'Spending controls',
        'Transaction alerts',
        'Card freeze/unfreeze',
      ],
      cta: 'Get Started',
    },
    {
      icon: <Icon name="Globe" size={32} />,
      title: 'International Transfers',
      description:
        'Send money across borders with low fees and competitive exchange rates. Fast, secure, and transparent.',
      features: ['Low fees', 'Real-time tracking', 'Multi-currency', 'Fast delivery'],
      cta: 'Send Money',
    },
    {
      icon: <Icon name="ShoppingCart" size={32} />,
      title: 'Payment Gateway',
      description:
        'Accept payments online with our secure payment gateway. Support for all major payment methods.',
      features: ['PCI compliant', 'Multiple currencies', 'Recurring payments', 'API integration'],
      cta: 'Start Accepting',
    },
  ];

  const testimonials = [
    {
      name: 'David Martinez',
      role: 'CFO, Global Finance Corp',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        "The instant transfer feature has revolutionized how we handle international payments. We've reduced transfer times from days to seconds.",
    },
    {
      name: 'Jennifer Lee',
      role: 'Head of Payments, FinTech Solutions',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      content:
        'The fraud protection system is incredibly sophisticated. We feel confident processing millions in transactions daily with their security measures.',
    },
    {
      name: 'Robert Thompson',
      role: 'CEO, PaymentBridge Inc',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content:
        'Integration was seamless, and the analytics dashboard gives us insights we never had before. Game-changer for our business operations.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small businesses',
      monthlyPrice: 9,
      annualPrice: 7,
      priceSuffix: 'per month',
      features: [
        'Up to $10K monthly transactions',
        'Basic fraud protection',
        'Mobile app access',
        'Email support',
        '2 digital cards',
        'Basic analytics',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      description: 'For growing businesses and teams',
      monthlyPrice: 29,
      annualPrice: 23,
      priceSuffix: 'per month',
      features: [
        'Up to $100K monthly transactions',
        'Advanced fraud protection',
        'Priority support',
        'Team management',
        'Unlimited cards',
        'Advanced analytics',
        'API access',
        'Custom integrations',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 99,
      annualPrice: 79,
      priceSuffix: 'per month',
      features: [
        'Unlimited transactions',
        'Enterprise-grade security',
        '24/7 dedicated support',
        'Advanced team controls',
        'White-label options',
        'Custom reporting',
        'Full API access',
        'SLA guarantee',
        'Onboarding assistance',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  // Chart data for analytics section
  const revenueData = [
    { label: 'Jan', value: 125000 },
    { label: 'Feb', value: 142000 },
    { label: 'Mar', value: 138000 },
    { label: 'Apr', value: 165000 },
    { label: 'May', value: 178000 },
    { label: 'Jun', value: 192000 },
  ];

  const transactionData = [
    { label: 'Q1', value: 1250000 },
    { label: 'Q2', value: 1420000 },
    { label: 'Q3', value: 1380000 },
    { label: 'Q4', value: 1650000 },
  ];

  const categoryData = [
    { label: 'Payments', value: 45 },
    { label: 'Transfers', value: 30 },
    { label: 'Investments', value: 15 },
    { label: 'Savings', value: 10 },
  ];

  // Transaction history data
  const transactionHistory = [
    {
      id: 'TXN-001',
      date: '2024-01-15',
      description: 'Payment to Tech Corp',
      amount: -1250.0,
      status: 'Completed',
      category: 'Business',
    },
    {
      id: 'TXN-002',
      date: '2024-01-14',
      description: 'Salary Deposit',
      amount: 5000.0,
      status: 'Completed',
      category: 'Income',
    },
    {
      id: 'TXN-003',
      date: '2024-01-13',
      description: 'International Transfer',
      amount: -850.5,
      status: 'Pending',
      category: 'Transfer',
    },
    {
      id: 'TXN-004',
      date: '2024-01-12',
      description: 'Investment Return',
      amount: 245.75,
      status: 'Completed',
      category: 'Investment',
    },
    {
      id: 'TXN-005',
      date: '2024-01-11',
      description: 'Subscription Payment',
      amount: -29.99,
      status: 'Completed',
      category: 'Subscription',
    },
  ];

  // FAQ data
  const faqs = [
    {
      title: 'How secure is my financial data?',
      content:
        'We use bank-level encryption (256-bit SSL) and comply with PCI DSS Level 1 standards. All transactions are monitored by advanced AI fraud detection systems. Your data is encrypted both in transit and at rest.',
    },
    {
      title: 'What fees are associated with international transfers?',
      content:
        'International transfer fees vary by destination and amount. Standard transfers have a 2.5% fee with a minimum of $5. Premium plans offer reduced fees starting at 1.5%. Exchange rates are updated in real-time and are transparently displayed before confirmation.',
    },
    {
      title: 'How quickly are transfers processed?',
      content:
        'Domestic transfers are instant. International transfers typically complete within 1-3 business days, depending on the destination country and local banking regulations. Express transfers are available for an additional fee and complete within 24 hours.',
    },
    {
      title: 'Can I integrate FinPay with my existing business systems?',
      content:
        'Yes! We offer comprehensive REST API and webhook integrations. Our API documentation is available for all Business and Enterprise plan subscribers. We also provide SDKs for popular programming languages and pre-built integrations for major platforms.',
    },
    {
      title: 'What happens if I lose my card?',
      content:
        'You can instantly freeze your card from the mobile app or web dashboard. Replacement cards are shipped within 2-3 business days. Virtual cards can be created immediately for online use while you wait for your physical card.',
    },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      title: 'Sign Up',
      description: 'Create your account in under 2 minutes with just your email and phone number.',
      icon: <Icon name="UserPlus" size={16} />,
    },
    {
      title: 'Verify Identity',
      description:
        'Complete KYC verification with our secure, automated process. Usually takes less than 5 minutes.',
      icon: <Icon name="ShieldCheck" size={16} />,
    },
    {
      title: 'Add Funds',
      description:
        'Link your bank account or add funds via debit card. Start with as little as $10.',
      icon: <Icon name="Wallet" size={16} />,
    },
    {
      title: 'Start Transacting',
      description:
        'Begin sending, receiving, and managing money with our full suite of financial tools.',
      icon: <Icon name="CheckCircle" size={16} />,
    },
  ];

  // Customer reviews with ratings
  const customerReviews = [
    {
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment:
        'The dashboard is incredibly intuitive. I can track all my business expenses in one place.',
      date: '2 weeks ago',
    },
    {
      name: 'Michael Brown',
      role: 'Freelancer',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment:
        'International transfers are lightning fast. Saved me hours compared to traditional banking.',
      date: '1 month ago',
    },
    {
      name: 'Emily Davis',
      role: 'Entrepreneur',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      comment: 'Great features, though I wish the mobile app had more customization options.',
      date: '3 weeks ago',
    },
  ];

  // Integration partners
  const partners = [
    { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com' },
    { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com' },
    { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com' },
    { name: 'WooCommerce', logo: 'https://logo.clearbit.com/woocommerce.com' },
    { name: 'Square', logo: 'https://logo.clearbit.com/squareup.com' },
  ];

  // Security goals/progress
  const securityMetrics = [
    { label: 'Encryption Strength', value: 100, color: 'primary' },
    { label: 'Fraud Detection', value: 98, color: 'success' },
    { label: 'Compliance Score', value: 95, color: 'primary' },
    { label: 'Uptime', value: 99.99, color: 'success' },
  ];

  return (
    <>
      {/* Navigation */}
      <Navbar glass brand={<AtomixLogo />} position="fixed">
        <Nav alignment="end">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#how-it-works">How It Works</NavItem>
          <NavItem href="#analytics">Analytics</NavItem>
          <NavItem href="#services">Services</NavItem>
          <NavItem href="#testimonials">Testimonials</NavItem>
          <NavItem href="#pricing">Pricing</NavItem>
          <NavItem href="#faq">FAQ</NavItem>
        </Nav>
        <Nav alignment="end" className="u-gap-2">
          <Button variant="primary" size="sm" glass>
            Open Account
          </Button>
          <ColorModeToggle />
        </Nav>
      </Navbar>

      {/* Hero Section */}
      <Hero
        className="u-py-60"
        title="Secure Banking Made Simple"
        text="Experience the future of banking with instant transfers, advanced security, and seamless payment solutions. Trusted by millions worldwide."
        actions={
          <>
            <Button variant="primary" glass>
              Open Account
            </Button>
            <Button variant="secondary-outline" glass onClick={() => setIsDemoModalOpen(true)}>
              Watch Demo
            </Button>
          </>
        }
        alignment="center"
        contentWidth="wide"
        backgroundImageSrc="https://images.unsplash.com/photo-1516475368726-dc5d1c2ad7e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3873"
        glass={{ padding: '5rem 2rem', borderRadius: 32, elasticity: 0, blurAmount: 4 } as any}
        parallax={true}
      />

      {/* Breadcrumb Navigation */}
      <section className="u-py-8">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'FinTech Solution', href: '#', active: true },
            ]}
          />
        </Container>
      </section>

      {/* Promotional Banner with Countdown */}
      <section className="u-pt-8 u-pb-16">
        <Container>
          <Callout
            variant="info"
            glass={
              { blurAmount: 4, displacementScale: 100, elasticity: 0, borderRadius: 32 } as any
            }
            className="u-mb-4"
          >
            <div className="u-flex u-flex-column u-items-center u-gap-3">
              <div className="u-flex u-flex-column u-items-center u-gap-2">
                <Icon name="Sparkle" size={24} className="u-text-primary" />
                <h3 className="u-text-2 u-font-bold u-mb-2">Limited Time Offer</h3>
              </div>
              <p className="u-mb-0 u-text-center">
                Get 3 months free when you sign up for an annual plan. Offer ends in:
              </p>
              <Countdown
                target={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                show={['days', 'hours', 'minutes', 'seconds']}
                onComplete={() => console.log('Countdown complete')}
                className="u-mb-0"
              />
              <Button variant="primary" size="sm" glass>
                Claim Offer Now
              </Button>
            </div>
          </Callout>
        </Container>
      </section>

      {/* Features Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="features"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1592660566589-1e36dbb8b759?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1823)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Powerful features for modern banking"
            text="Everything you need for secure, fast, and reliable financial transactions."
            alignment="center"
          />
          <Grid>
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} sm={6} md={4} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                  className="u-h-100"
                >
                  <div className="u-p-4 u-h-100 u-flex u-flex-column">
                    <div className="u-mb-3 u-text-primary">{feature.icon}</div>
                    <h3 className="u-text-5 u-font-bold u-mb-2">{feature.title}</h3>
                    <p className="u-text-muted u-mb-0 u-flex-grow-1">{feature.description}</p>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Stats/Metrics Section */}
      <section className="u-pt-8 u-pb-16">
        <Container>
          <SectionIntro
            title="Trusted by millions worldwide"
            text="Join the growing community of users who trust us with their financial needs."
            alignment="center"
          />
          <Grid>
            {stats.map((stat, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                >
                  <div className="u-p-4 u-text-center">
                    <div className="u-text-1 u-font-bold u-text-primary u-mb-2">{stat.value}</div>
                    <div className="u-text-5 u-font-semibold u-mb-1">{stat.label}</div>
                    <div className="u-text-muted u-text-sm">{stat.description}</div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="services"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1752606402425-fa8ed3166a91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Comprehensive payment solutions"
            text="From digital wallets to payment gateways, we have everything you need."
            alignment="center"
          />
          <Grid>
            {services.map((service, index) => (
              <GridCol key={index} xs={12} md={6} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                  className="u-h-100"
                >
                  <div className="u-p-4 u-h-100 u-flex u-flex-column">
                    <div className="u-mb-3 u-text-primary">{service.icon}</div>
                    <h3 className="u-text-4 u-font-bold u-mb-2">{service.title}</h3>
                    <p className="u-text-muted u-mb-3">{service.description}</p>
                    <ul className="c-list u-mb-3 u-flex-grow-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="c-list__item">
                          <Icon name="Check" className="u-text-success u-me-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="u-flex u-justify-center">
                      <Button
                        variant="outline-primary"
                        glass={{ blurAmount: 2, displacementScale: 18, elasticity: 0 }}
                      >
                        {service.cta}
                      </Button>
                    </div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Block
        spacing="lg"
        background="light"
        id="testimonials"
        style={
          {
            backgroundImage: `url(https://images.unsplash.com/photo-1741356474349-3ca53f0601ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          } as any
        }
      >
        <Container>
          <SectionIntro
            title="What our customers say"
            text="Hear from industry leaders who trust us with their financial operations."
            alignment="center"
          />
          <Grid>
            {testimonials.map((testimonial, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                >
                  <div className="u-p-4">
                    <Testimonial
                      quote={testimonial.content}
                      author={{
                        name: testimonial.name,
                        role: testimonial.role,
                        avatarSrc: testimonial.avatar,
                      }}
                    />
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </Block>

      {/* Pricing Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="pricing"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1648614593495-e0955bf287e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Simple, transparent pricing"
            text="Choose the plan that fits your needs. All plans include a 30-day free trial."
            alignment="center"
          />

          <div className="u-text-center u-mb-6 u-flex u-flex-column u-items-center">
            <Badge label="Save 20% with annual billing" variant="primary" className="u-mb-4" />
            <div className="u-flex u-gap-2">
              <Button
                variant={isAnnual ? 'error' : 'outline-primary'}
                onClick={() => setIsAnnual(true)}
                glass
              >
                Annual
              </Button>
              <Button
                variant={!isAnnual ? 'success' : 'outline-warning'}
                onClick={() => setIsAnnual(false)}
                glass
              >
                Monthly
              </Button>
            </div>
          </div>

          <Grid className="u-items-stretch u-justify-start">
            {pricingPlans.map((plan, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <Card
                  className={`${plan.popular ? 'u-border-success u-border-2' : ''} u-h-100 u-flex u-flex-column u-justify-between`}
                  glass={{
                    blurAmount: 2,
                    displacementScale: 40,
                    className: 'u-h-100',
                    mode: 'polar',
                  }}
                  actions={
                    <Button
                      variant={plan.popular ? 'success' : 'outline-success'}
                      glass={{
                        blurAmount: 2,
                        displacementScale: 20,
                        elasticity: 0,
                        className: 'u-w-100 u-mx-auto',
                      }}
                      className="u-w-100 u-mx-auto"
                    >
                      {plan.cta}
                    </Button>
                  }
                  header={
                    <div className="u-flex u-flex-column u-items-start">
                      {plan.popular && <Badge label="Most Popular" variant="primary" glass />}
                      <h3 className="u-text-4 u-font-bold u-my-2">{plan.name}</h3>
                      <p className="u-text-muted u-mb-3">{plan.description}</p>
                      <div className="u-mb-3">
                        <span className="u-text-1 u-font-bold">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="u-text-muted">/{plan.priceSuffix}</span>
                      </div>
                    </div>
                  }
                >
                  <ul className="c-list u-ps-0 u-mb-0">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="c-list__item">
                        <Icon name="Check" className="u-text-success-emphasis u-me-2" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="u-pt-8 u-pb-16" id="how-it-works">
        <Container>
          <SectionIntro
            title="Get started in minutes"
            text="Setting up your account is quick, easy, and secure. Follow these simple steps to begin your financial journey."
            alignment="center"
          />
          <Steps
            items={howItWorksSteps.map((step, index) => ({
              number: step.icon,
              text: `${step.title}: ${step.description}`,
            }))}
            activeIndex={2}
            className="u-mt-6"
            glass={
              {
                elasticity: 0,
                blurAmount: 4,
                displacementScale: 100,
                borderRadius: 32,
                padding: '4rem',
              } as any
            }
          />
        </Container>
      </section>

      {/* Analytics Dashboard Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="analytics"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1700116035176-99d81e11c60b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Powerful analytics and insights"
            text="Make data-driven decisions with comprehensive financial analytics and real-time reporting."
            alignment="center"
          />
          <Tabs
            className="u-bg-transparent"
            items={[
              {
                label: 'Overview',
                content: (
                  <LineChart
                    className="u-bg-transparent"
                    title="Revenue Trend"
                    datasets={[
                      {
                        label: 'Revenue',
                        data: revenueData,
                        color: '#7AFFD7',
                      },
                    ]}
                    config={{
                      showLegend: true,
                      showTooltips: true,
                      animate: true,
                    }}
                  />
                ),
              },
              {
                label: 'Revenue',
                content: (
                  <AreaChart
                    className="u-bg-transparent"
                    title="Revenue Growth"
                    datasets={[
                      {
                        label: 'Revenue',
                        data: revenueData,
                        color: '#1AFFD2',
                      },
                    ]}
                    config={{
                      showLegend: true,
                      showTooltips: true,
                      animate: true,
                    }}
                  />
                ),
              },
              {
                label: 'Transactions',
                content: (
                  <BarChart
                    className="u-bg-transparent"
                    title="Transaction Volume"
                    datasets={[
                      {
                        label: 'Transactions',
                        data: transactionData,
                        color: '#00E6C3',
                      },
                    ]}
                    config={{
                      showLegend: true,
                      showTooltips: true,
                      animate: true,
                    }}
                  />
                ),
              },
            ]}
            activeIndex={activeTab === 'overview' ? 0 : activeTab === 'revenue' ? 1 : 2}
            onTabChange={index => {
              const tabs = ['overview', 'revenue', 'transactions'];
              setActiveTab(tabs[index] || 'overview');
            }}
            glass={
              {
                elasticity: 0,
                blurAmount: 2,
                displacementScale: 100,
                borderRadius: 32,
                padding: '4rem',
              } as any
            }
          />
          <Grid>
            <GridCol xs={12} lg={4} className="u-mb-4">
              <div className="u-p-4">
                <DonutChart
                  className="u-bg-transparent"
                  title="Transaction Categories"
                  datasets={[
                    {
                      label: 'Categories',
                      data: categoryData,
                    },
                  ]}
                  config={{
                    showLegend: true,
                    showTooltips: true,
                    animate: true,
                  }}
                />
              </div>
            </GridCol>
            <GridCol xs={12} lg={4} className="u-mb-4">
              <div className="u-p-4">
                <DonutChart
                  className="u-bg-transparent"
                  title="Transaction Categories"
                  datasets={[
                    {
                      label: 'Categories',
                      data: categoryData,
                    },
                  ]}
                  config={{
                    showLegend: true,
                    showTooltips: true,
                    animate: true,
                  }}
                />
              </div>
            </GridCol>
            <GridCol xs={12} lg={4} className="u-mb-4">
              <div className="u-p-4">
                <DonutChart
                  className="u-bg-transparent"
                  title="Transaction Categories"
                  datasets={[
                    {
                      label: 'Categories',
                      data: categoryData,
                    },
                  ]}
                  config={{
                    showLegend: true,
                    showTooltips: true,
                    animate: true,
                  }}
                />
              </div>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Transaction History Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="transactions"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1719702702684-8d26ab9726fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2728)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Recent transactions"
            text="View and manage all your financial transactions in one convenient place."
            alignment="center"
          />
          <AtomixGlass
            blurAmount={2}
            displacementScale={100}
            borderRadius={32}
            elasticity={0}
            mode="shader"
          >
            <div className="u-p-4">
              <DataTable
                data={transactionHistory}
                columns={[
                  { key: 'id', title: 'Transaction ID' },
                  { key: 'date', title: 'Date' },
                  { key: 'description', title: 'Description' },
                  {
                    key: 'amount',
                    title: 'Amount',
                    render: (value: number) => (
                      <span className={value >= 0 ? 'u-text-success' : 'u-text-error'}>
                        {value >= 0 ? '+' : ''}${Math.abs(value).toFixed(2)}
                      </span>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (value: string) => (
                      <Badge
                        label={value}
                        variant={value === 'Completed' ? 'success' : 'warning'}
                        size="sm"
                      />
                    ),
                  },
                  { key: 'category', title: 'Category' },
                ]}
                paginated={true}
                pageSize={5}
                sortable={true}
              />
            </div>
          </AtomixGlass>
        </Container>
      </section>

      {/* Security Metrics Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="security"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1593407088324-762bb4a610e8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2700)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Enterprise-grade security"
            text="Your financial data is protected by the highest industry standards and cutting-edge security measures."
            alignment="center"
          />
          <Grid>
            {securityMetrics.map((metric, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <AtomixGlass
                  blurAmount={2}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                  padding="1rem"
                >
                  <div className="u-p-4">
                    <div className="u-flex u-justify-between u-mb-2">
                      <span className="u-text-sm u-text-muted">{metric.label}</span>
                      <span className="u-text-sm u-font-bold">{metric.value}%</span>
                    </div>
                    <Progress
                      value={metric.value}
                      variant={metric.color as 'primary' | 'success' | 'warning' | 'error'}
                      className="u-mb-0"
                    />
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Customer Reviews Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="reviews"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1755282464684-6568f7f76b5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Customer reviews"
            text="See what our users are saying about their experience with FinPay."
            alignment="center"
          />
          <Grid>
            {customerReviews.map((review, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <AtomixGlass
                  blurAmount={2}
                  displacementScale={100}
                  borderRadius={32}
                  elasticity={0}
                  padding="1rem"
                  className="u-h-100"
                >
                  <div className="u-p-4 u-h-100 u-flex u-flex-column">
                    <div className="u-flex u-items-center u-mb-3">
                      <Avatar src={review.avatar} alt={review.name} size="md" className="u-me-3" />
                      <div className="u-flex-grow-1">
                        <div className="u-font-bold">{review.name}</div>
                        <div className="u-text-sm u-text-muted">{review.role}</div>
                      </div>
                    </div>
                    <Rating value={review.rating} maxValue={5} readOnly className="u-mb-3" />
                    <p className="u-text-muted u-flex-grow-1 u-mb-3">{review.comment}</p>
                    <div className="u-text-sm u-text-muted">{review.date}</div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Integration Partners Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="integrations"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1655929571421-c57b9572ae6e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <AtomixGlass
            blurAmount={2}
            displacementScale={18}
            saturation={160}
            borderRadius={16}
            elasticity={0}
            mode="standard"
          >
            <SectionIntro
              title="Seamless integrations"
              text="Connect with the tools and platforms you already use. We integrate with leading payment processors and business platforms."
              alignment="center"
            />
          </AtomixGlass>

          <Grid className="u-mt-6">
            {partners.map((partner, index) => (
              <GridCol key={index} xs={6} sm={4} md={2.4} className="u-mb-4">
                <AtomixGlass
                  blurAmount={2}
                  displacementScale={18}
                  saturation={160}
                  borderRadius={16}
                  elasticity={0}
                  mode="standard"
                  className="u-h-100"
                >
                  <div className="u-p-4 u-flex u-items-center u-justify-center u-h-100">
                    <div className="u-text-center">
                      <div className="u-text-sm u-font-semibold">{partner.name}</div>
                    </div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="u-pt-8 u-pb-16" id="faq">
        <Container>
          <SectionIntro
            title="Frequently asked questions"
            text="Find answers to common questions about our services, security, and features."
            alignment="center"
          />
          <div className="u-mt-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AtomixGlass
              blurAmount={2}
              displacementScale={20}
              saturation={160}
              borderRadius={16}
              elasticity={0}
              mode="standard"
            >
              <div className="u-p-4">
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    title={faq.title}
                    defaultOpen={index === 0}
                    className={index < faqs.length - 1 ? 'u-mb-3' : ''}
                  >
                    <p>{faq.content}</p>
                  </Accordion>
                ))}
              </div>
            </AtomixGlass>
          </div>
        </Container>
      </section>

      {/* River Component Section */}
      <section
        className="u-pt-8 u-pb-16"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1614471108981-7afbd3dd4a4f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1286)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Why choose FinPay?"
            text="Discover the advantages that make us the preferred choice for millions of users."
            alignment="center"
          />
          <Grid>
            <GridCol xs={12} md={6}>
              <AtomixGlass
                blurAmount={2}
                displacementScale={100}
                borderRadius={32}
                elasticity={0}
                padding="1rem"
              >
                <div className="u-p-4">
                  <h2 className="u-text-2 u-font-bold u-mb-3">Trusted by industry leaders</h2>
                  <p className="u-text-5 u-mb-4 u-text-primary-emphasis">
                    Join thousands of businesses that rely on FinPay for their financial operations.
                    Our platform is trusted by Fortune 500 companies and startups alike.
                  </p>
                </div>
              </AtomixGlass>
            </GridCol>
            <GridCol xs={12} md={6}>
              <AtomixGlass
                blurAmount={2}
                displacementScale={100}
                borderRadius={32}
                elasticity={0}
                padding="1rem"
              >
                <div className="u-p-4">
                  <h2 className="u-text-2 u-font-bold u-mb-3">Trusted by industry leaders</h2>
                  <p className="u-text-5 u-mb-4 u-text-primary-emphasis">
                    Join thousands of businesses that rely on FinPay for their financial operations.
                    Our platform is trusted by Fortune 500 companies and startups alike.
                  </p>
                </div>
              </AtomixGlass>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="u-py-20">
        <Container type="md">
          <Row className="u-text-center">
            <GridCol xs={12}>
              <AtomixGlass
                blurAmount={2}
                displacementScale={100}
                saturation={170}
                borderRadius={32}
                elasticity={0}
              >
                <div className="u-p-6">
                  <h2 className="u-text-2 u-font-bold u-mb-3">Ready to get started?</h2>
                  <p className="u-text-5 u-mb-4 u-text-primary-emphasis">
                    Join millions of users worldwide and experience the future of banking today.
                  </p>
                  <div className="u-flex u-gap-2 u-justify-center">
                    <Button variant="success" glass>
                      Open Free Account
                    </Button>
                    <Button variant="error" glass onClick={() => setIsDemoModalOpen(true)}>
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              </AtomixGlass>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Demo Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Watch Product Demo"
        size="lg"
      >
        <div className="u-p-4 u-text-center">
          <Spinner size="lg" className="u-mb-4" />
          <p className="u-text-muted">
            Loading demo video... This would typically show an embedded video player or interactive
            demo.
          </p>
          <Button variant="primary" onClick={() => setIsDemoModalOpen(false)} className="u-mt-4">
            Close
          </Button>
        </div>
      </Modal>

      {/* we will replace this with the footer component */}
      {/* Footer */}

      <Footer
        className="u-bg-transparent"
        layout="columns"
        brand="FinPay"
        glass={{ blurAmount: 10, displacementScale: 10, elasticity: 0 } as any}
        brandDescription="FinPay is a leading fintech company that provides secure and reliable financial services to millions of users worldwide."
        socialLinks={[
          { platform: 'twitter', url: 'https://twitter.com/finpay' },
          { platform: 'instagram', url: 'https://instagram.com/finpay' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/finpay' },
          { platform: 'youtube', url: 'https://youtube.com/finpay' },
          { platform: 'facebook', url: 'https://facebook.com/finpay' },
          { platform: 'instagram', url: 'https://instagram.com/finpay' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/finpay' },
          { platform: 'youtube', url: 'https://youtube.com/finpay' },
          { platform: 'facebook', url: 'https://facebook.com/finpay' },
          { platform: 'instagram', url: 'https://instagram.com/finpay' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/finpay' },
        ]}
        showBackToTop={true}
        backToTopText="Back to Top"
        copyright="© 2024 FinPay. All rights reserved."
        newsletterTitle="Stay Updated"
        newsletterDescription="Subscribe to our newsletter for the latest updates."
        onNewsletterSubmit={email => console.log('Newsletter signup:', email)}
        newsletterPlaceholder="Enter your email"
        newsletterButtonText="Subscribe"
        showNewsletter={true}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1657127791613-5c65412614d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <FooterSection title="Resources" icon={<Icon name="Book" size={24} />}>
          <FooterLink href="#documentation">Documentation</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#support">Support</FooterLink>
          <FooterLink href="#api">API</FooterLink>
        </FooterSection>
        <FooterSection title="Company" icon={<Icon name="Building" size={24} />}>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
      </Footer>
    </>
  );
};

export default Fintech;
