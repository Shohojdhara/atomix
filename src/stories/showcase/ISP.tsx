import React from 'react';
import {
  AtomixLogo,
  ColorModeToggle,
  AtomixGlass,
  Badge,
  Button,
  Card,
  Hero,
  Icon,
  Navbar,
  SectionIntro,
  Testimonial,
  VideoPlayer,
} from '../../components';
import Nav from '../../components/Navigation/Nav/Nav';
import NavItem from '../../components/Navigation/Nav/NavItem';
import { Container, GridCol, Row } from '../../layouts';

const ISP: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      speed: '50 Mbps',
      data: 'Unlimited',
      price: '15',
      features: ['Free Installation', '24/7 Support', 'No Contract'],
      popular: false,
    },
    {
      name: 'Standard',
      speed: '100 Mbps',
      data: 'Unlimited',
      price: '25',
      features: ['Free Installation', '24/7 Support', 'Wi-Fi Router', 'No Contract'],
      popular: true,
    },
    {
      name: 'Premium',
      speed: '300 Mbps',
      data: 'Unlimited',
      price: '40',
      features: ['Free Installation', '24/7 Support', 'Wi-Fi 6 Router', 'Priority Support'],
      popular: false,
    },
    {
      name: 'Business',
      speed: '500 Mbps',
      data: 'Unlimited',
      price: '75',
      features: [
        'Free Installation',
        '24/7 Priority Support',
        'Wi-Fi 6 Router',
        'Static IP',
        'SLA Guarantee',
      ],
      popular: false,
    },
  ];

  const features = [
    {
      icon: <Icon name="WifiHigh" size={24} />,
      title: 'High Speed',
      description: 'Experience blazing fast internet speeds tailored to your needs',
    },
    {
      icon: <Icon name="Headphones" size={24} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you anytime',
    },
    {
      icon: <Icon name="Tag" size={24} />,
      title: 'Affordable Pricing',
      description: 'Competitive pricing without compromising on quality',
    },
    {
      icon: <Icon name="Shield" size={24} />,
      title: 'Secure Connection',
      description: 'Advanced security protocols to keep your data safe',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Home User',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content:
        'Switched to BCN ISP 6 months ago and never looked back. The speed is consistent even during peak hours!',
    },
    {
      name: 'Michael T.',
      role: 'Small Business Owner',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        'Their business plan has been a game-changer for our operations. Reliable connectivity is crucial for us.',
    },
    {
      name: 'Jennifer P.',
      role: 'Remote Worker',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      content:
        'Working from home requires stable internet. BCN ISP delivers exactly what they promise with no interruptions.',
    },
  ];

  return (
    <div className="isp-page">
      {/* Header / Navbar */}
      {/* Navigation */}
      <AtomixGlass
        blurAmount={0.1}
        displacementScale={200}
        aberrationIntensity={0}
        cornerRadius={10}
        elasticity={0.01}
        mode="standard"
        style={{ position: 'fixed', top: 10, left: 60, right: 60, zIndex: 1 }}
      >
        <Container>
          <div className="u-flex u-items-center u-justify-between u-py-4">
            <div className="u-flex u-items-center u-gap-2">
              <AtomixLogo />
              <span className="u-text-xl u-font-bold">Atomix</span>
            </div>
            <nav className="u-none u-md-flex u-items-center u-gap-6">
              <a href="#features">Features</a>
              <a href="#components">Components</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <div className="u-flex u-items-center u-gap-3">
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
        title="Reliable Internet, Anytime, Anywhere."
        subtitle="Experience lightning-fast connectivity with Bangladesh's most trusted ISP"
        backgroundImageSrc="https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1920&h=1080&fit=crop"
        showOverlay
        fullViewportHeight={true}
        alignment="center"
        actions={
          <>
            <Button size="lg" variant="primary" className="u-me-3">
              Get Started
            </Button>
            <Button size="lg" variant="outline-primary">
              View Plans
            </Button>
          </>
        }
      />

      {/* Plans & Pricing */}
      <section className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Choose Your Perfect Plan"
            text="Affordable internet packages designed for every need"
            alignment="center"
          />

          <Row className="u-mt-16">
            {plans.map((plan, index) => (
              <GridCol key={index} xs={12} md={6} lg={3}>
                <Card
                  className={`u-h-100 u-position-relative ${
                    plan.popular ? 'u-border-primary u-shadow-md' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge
                      variant="primary"
                      className="u-position-absolute u-top-0 u-end-0"
                      label="Most Popular"
                    />
                  )}
                  <div className="u-text-center u-mb-6">
                    <h3 className="u-text-xl u-font-bold">{plan.name}</h3>
                    <div className="u-mt-4 u-mb-2">
                      <span className="u-text-3xl u-font-bold">${plan.price}</span>
                      <span className="u-text-muted">/month</span>
                    </div>
                    <div className="u-mb-1">
                      <span className="u-text-lg">{plan.speed}</span>
                    </div>
                    <div className="u-text-muted u-mb-4">{plan.data} Data</div>
                  </div>

                  <ul className="u-list-unstyled u-mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="u-flex u-items-center u-gap-2 u-mb-3">
                        <Icon name="Check" size={16} className="u-text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'primary' : 'outline-primary'}
                    className="u-w-100"
                  >
                    Select Plan
                  </Button>
                </Card>
              </GridCol>
            ))}
          </Row>
        </Container>
      </section>

      {/* Coverage Section */}
      <section className="u-py-20">
        <Container>
          <Row className="u-items-center">
            <GridCol xs={12} lg={6}>
              <div className="u-position-relative u-mb-8 u-mb-lg-0">
                <div
                  className="u-bg-secondary u-rounded u-h-100"
                  style={{
                    minHeight: '400px',
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1580518337843-f959e992563b?w=600&h=400&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="u-position-absolute u-bottom-0 u-start-0 u-end-0 u-p-4 u-bg-dark u-bg-opacity-75 u-text-white">
                  <h3 className="u-text-white">Expanding Coverage Across Bangladesh</h3>
                  <p className="u-mb-0">
                    Bringing high-speed internet to more communities every month
                  </p>
                </div>
              </div>
            </GridCol>
            <GridCol xs={12} lg={6}>
              <SectionIntro
                title="Nationwide Coverage"
                text="We're continuously expanding our network infrastructure to bring reliable internet to more areas across Bangladesh. Our fiber-optic network ensures consistent, high-speed connections wherever you are."
                alignment="left"
              />

              <div className="u-mt-6">
                <div className="u-flex u-items-center u-mb-4">
                  <Icon name="MapPin" size={24} className="u-text-primary u-me-3" />
                  <div>
                    <h4 className="u-mb-1">Urban Centers</h4>
                    <p className="u-mb-0 u-text-muted">Complete coverage in major cities</p>
                  </div>
                </div>

                <div className="u-flex u-items-center u-mb-4">
                  <Icon name="MapPin" size={24} className="u-text-primary u-me-3" />
                  <div>
                    <h4 className="u-mb-1">Suburban Areas</h4>
                    <p className="u-mb-0 u-text-muted">Expanding to surrounding regions</p>
                  </div>
                </div>

                <div className="u-flex u-items-center">
                  <Icon name="MapPin" size={24} className="u-text-primary u-me-3" />
                  <div>
                    <h4 className="u-mb-1">Rural Development</h4>
                    <p className="u-mb-0 u-text-muted">Bringing connectivity to remote areas</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="u-mt-6">
                Check Availability in Your Area
              </Button>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Video Section */}
      <section className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="Experience the Difference"
            text="See how BCN ISP is transforming internet connectivity in Bangladesh"
            alignment="center"
          />

          <div className="u-mt-12 u-rounded u-overflow-hidden u-shadow-lg">
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              poster="https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&h=450&fit=crop"
              controls
              ambientMode
              width="100%"
              height="500px"
            />
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="u-py-20">
        <Container>
          <SectionIntro
            title="Why Choose BCN ISP"
            text="We provide more than just internet - we deliver a superior online experience"
            alignment="center"
          />

          <Row className="u-mt-16">
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} md={6} lg={3}>
                <Card className="u-h-100 u-text-center u-border-0 u-shadow-sm">
                  <div className="u-inline-flex u-items-center u-justify-center u-p-3 u-bg-primary u-text-white u-rounded u-mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="u-mb-3">{feature.title}</h4>
                  <p className="u-text-muted">{feature.description}</p>
                </Card>
              </GridCol>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-py-20 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            title="What Our Customers Say"
            text="Don't just take our word for it - hear from our satisfied customers"
            alignment="center"
          />

          <Row className="u-mt-16">
            {testimonials.map((testimonial, index) => (
              <GridCol key={index} xs={12} md={4}>
                <Testimonial
                  quote={testimonial.content}
                  author={{
                    name: testimonial.name,
                    role: testimonial.role,
                    avatarSrc: testimonial.avatar,
                  }}
                  className="u-h-100"
                />
              </GridCol>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="u-py-20 u-bg-primary u-text-white">
        <Container>
          <div className="u-text-center u-max-w-3xl u-mx-auto">
            <h2 className="u-text-3xl u-text-md-4xl u-font-bold u-mb-4 u-text-white">
              Ready to Experience Lightning-Fast Internet?
            </h2>
            <p className="u-text-xl u-mb-8 u-opacity-90">
              Join thousands of satisfied customers across Bangladesh
            </p>
            <div className="u-flex u-flex-sm-row u-gap-4 u-justify-center">
              <Button size="lg" variant="secondary" className="u-text-primary">
                Sign Up Now
                <Icon name="ArrowRight" className="u-ml-2" size={16} />
              </Button>
              <Button size="lg" variant="outline-light">
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-py-16 u-bg-   u-text-white">
        <Container>
          <Row className="u-mb-12">
            <GridCol xs={12} md={4} className="u-mb-8 u-mb-md-0">
              <div className="u-flex u-items-center u-gap-2 u-mb-4">
                <AtomixLogo />
                <span className="u-text-xl u-font-bold">BCN</span>
              </div>
              <p className="u-mb-4 u-text-muted">
                Bangladesh's leading internet service provider, delivering high-speed connectivity
                to homes and businesses nationwide.
              </p>
              <div className="u-flex u-gap-4">
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="FacebookLogo" size={20} />
                </a>
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="TwitterLogo" size={20} />
                </a>
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="InstagramLogo" size={20} />
                </a>
                <a href="#" className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition">
                  <Icon name="YoutubeLogo" size={20} />
                </a>
              </div>
            </GridCol>

            <GridCol xs={6} sm={4} md={2} className="u-mb-8 u-mb-md-0">
              <h4 className="u-font-semibold u-mb-4 u-text-uppercase u-text-sm">Product</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Residential Plans
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Business Plans
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Coverage Map
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Speed Test
                  </a>
                </li>
              </ul>
            </GridCol>

            <GridCol xs={6} sm={4} md={2} className="u-mb-8 u-mb-md-0">
              <h4 className="u-font-semibold u-mb-4 u-text-uppercase u-text-sm">Company</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    About Us
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
                    News
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
              <h4 className="u-font-semibold u-mb-4 u-text-uppercase u-text-sm">Support</h4>
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
                    Report Outage
                  </a>
                </li>
              </ul>
            </GridCol>

            <GridCol xs={6} sm={4} md={2}>
              <h4 className="u-font-semibold u-mb-4 u-text-uppercase u-text-sm">Legal</h4>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li className="u-mb-3">
                  <a
                    href="#"
                    className="u-text-white u-opacity-75 u-hover-opacity-100 u-transition"
                  >
                    SLA Agreement
                  </a>
                </li>
              </ul>
            </GridCol>
          </Row>

          <div className="u-border-top u-border-light-subtle u-pt-8 u-text-center u-text-md-start">
            <Row className="u-items-center">
              <GridCol xs={12} md={6} className="u-mb-4 u-mb-md-0">
                <p className="u-mb-0 u-text-muted">&copy; 2024 BCN ISP. All rights reserved.</p>
              </GridCol>
              <GridCol xs={12} md={6}>
                <div className="u-flex u-justify-center u-justify-md-end u-gap-6">
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

export default ISP;
