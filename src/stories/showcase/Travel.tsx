import React, { useState } from 'react';
import {
  ColorModeToggle,
  AtomixGlass,
  AtomixLogo,
  Badge,
  Button,
  Callout,
  Card,
  DatePicker,
  FormGroup,
  Hero,
  Icon,
  Input,
  List,
  Modal,
  Rating,
  SectionIntro,
  Steps,
  Testimonial,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';

const Travel: React.FC = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    destination: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
  });

  const destinations = [
    {
      name: 'Bali, Indonesia',
      image:
        'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '$899',
      rating: 4.8,
      description: 'Tropical paradise with beautiful beaches and rich culture',
    },
    {
      name: 'Santorini, Greece',
      image:
        'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '$1299',
      rating: 4.9,
      description: 'Stunning sunsets and iconic white buildings with blue domes',
    },
    {
      name: 'Kyoto, Japan',
      image:
        'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '$1599',
      rating: 4.7,
      description: 'Historic temples, traditional gardens, and cherry blossoms',
    },
    {
      name: 'Paris, France',
      image:
        'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '$1199',
      rating: 4.6,
      description: 'City of love with iconic landmarks and fine cuisine',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Adventure Traveler',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content:
        'The trip planning was seamless and the destinations exceeded our expectations. Highly recommend for anyone looking for an unforgettable experience!',
    },
    {
      name: 'Sarah Williams',
      role: 'Family Vacationer',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      content:
        'Perfect for our family vacation. The kids loved every moment and we made memories that will last a lifetime.',
    },
    {
      name: 'Michael Chen',
      role: 'Solo Traveler',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        'As a solo traveler, I felt safe and welcomed everywhere I went. The local experiences were authentic and meaningful.',
    },
  ];

  const packages = [
    {
      title: 'Beach Getaway',
      features: ['5 Star Accommodations', 'All Inclusive', 'Airport Transfers', 'Water Sports'],
      price: '$1299',
    },
    {
      title: 'Cultural Tour',
      features: ['Historic Sites', 'Local Guides', 'Cultural Experiences', 'Meals Included'],
      price: '$1599',
    },
    {
      title: 'Adventure Trek',
      features: ['Hiking & Trekking', 'Camping', 'Local Guides', 'Meals Included'],
      price: '$1899',
    },
  ];

  const steps = [
    {
      number: 1,
      text: 'Choose Destination',
      content: 'Browse our collection of amazing destinations',
    },
    {
      number: 2,
      text: 'Select Package',
      content: 'Pick the perfect travel package for your needs',
    },
    {
      number: 3,
      text: 'Book & Pay',
      content: 'Secure your trip with our easy booking process',
    },
    {
      number: 4,
      text: 'Enjoy Your Trip',
      content: 'Experience the adventure of a lifetime',
    },
  ];

  const handleSearchChange = (field: string, value: any) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the search data here
    setIsSearchModalOpen(false);
    alert(`Searching for trips to ${searchForm.destination}`);
  };

  return (
    <>
      {/* Navigation */}
      <AtomixGlass
        blurAmount={0.1}
        displacementScale={200}
        aberrationIntensity={2}
        borderRadius={10}
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
        title="Discover Your Next Adventure"
        text="Explore the world with our curated travel experiences and unforgettable journeys."
        actions={
          <>
            <Button
              variant="primary"
              size="lg"
              className="u-me-2"
              onClick={() => setIsSearchModalOpen(true)}
            >
              Find Your Trip
            </Button>
            <Button variant="outline-primary" size="lg">
              View Destinations
            </Button>
          </>
        }
        fullViewportHeight={true}
        backgroundImageSrc="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&h=800&fit=crop"
        className="u-mb-0"
      />

      {/* Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        title="Find Your Perfect Trip"
      >
        <form onSubmit={handleSearchSubmit}>
          <FormGroup className="u-mb-3">
            <label htmlFor="destination" className="u-form-label">
              Destination
            </label>
            <Input
              type="text"
              id="destination"
              value={searchForm.destination}
              onChange={e => handleSearchChange('destination', e.target.value)}
              placeholder="Where do you want to go?"
              required
            />
          </FormGroup>

          <Row>
            <GridCol xs={12} md={6} className="u-mb-3">
              <FormGroup>
                <label htmlFor="checkIn" className="u-form-label">
                  Check In
                </label>
                <DatePicker
                  id="checkIn"
                  value={searchForm.checkIn}
                  onChange={date => handleSearchChange('checkIn', date)}
                />
              </FormGroup>
            </GridCol>
            <GridCol xs={12} md={6} className="u-mb-3">
              <FormGroup>
                <label htmlFor="checkOut" className="u-form-label">
                  Check Out
                </label>
                <DatePicker
                  id="checkOut"
                  value={searchForm.checkOut}
                  onChange={date => handleSearchChange('checkOut', date)}
                />
              </FormGroup>
            </GridCol>
          </Row>

          <FormGroup className="u-mb-4">
            <label htmlFor="guests" className="u-form-label">
              Number of Guests
            </label>
            <Input
              type="number"
              id="guests"
              min="1"
              max="10"
              value={searchForm.guests}
              onChange={e => handleSearchChange('guests', parseInt(e.target.value) || 1)}
            />
          </FormGroup>

          <Button variant="primary" type="submit" className="u-w-100">
            Search Trips
          </Button>
        </form>
      </Modal>

      {/* Stats */}
      <section className="u-py-5 u-bg-secondary-subtle">
        <Container>
          <Grid>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-text-2 u-font-bold u-text-primary">500+</div>
              <div className="u-text-brand-emphasis">Destinations</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-text-2 u-font-bold u-text-primary">10K+</div>
              <div className="u-text-brand-emphasis">Happy Travelers</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-text-2 u-font-bold u-text-primary">4.8/5</div>
              <div className="u-text-brand-emphasis">Average Rating</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-text-2 u-font-bold u-text-primary">24/7</div>
              <div className="u-text-brand-emphasis">Support</div>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Popular Destinations */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            alignment="center"
            title="Popular Destinations"
            text="Discover our most sought-after travel experiences"
            className="u-text-center u-mb-6"
          />
          <Grid>
            {destinations.map((destination, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <Card
                  image={destination.image}
                  title={destination.name}
                  text={destination.description}
                  className="u-h-100"
                >
                  <div className="u-flex u-justify-between u-items-start u-mb-2">
                    <div>
                      <div className="u-flex u-items-center u-mb-2">
                        <Rating value={destination.rating} readOnly />
                        <span className="u-text-brand-emphasis u-ms-2">{destination.rating}</span>
                      </div>
                    </div>
                    <Badge label={destination.price} variant="primary" />
                  </div>
                  <Button
                    variant="primary"
                    className="u-w-100"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Now
                  </Button>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works */}
      <section className="u-py-8 u-bg-secondary-subtle">
        <Container>
          <SectionIntro
            alignment="center"
            title="How It Works"
            text="Planning your dream vacation has never been easier"
            className="u-text-center u-mb-6"
          />
          <Steps activeIndex={0} items={steps} vertical={false} className="u-mb-6" />
        </Container>
      </section>

      {/* Travel Packages */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            alignment="center"
            title="Travel Packages"
            text="Choose from our carefully crafted travel experiences"
            className="u-text-center u-mb-6"
          />
          <Grid>
            {packages.map((pkg, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <Card className="u-h-100">
                  <div className="c-card__body u-p-4 u-text-center">
                    <h3 className="u-mb-4">{pkg.title}</h3>
                    <div className="u-text-1 u-font-bold u-mb-4">{pkg.price}</div>
                    <List className="u-mb-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="u-mb-2">
                          <Icon name="Check" className="u-text-success u-me-2" />
                          {feature}
                        </li>
                      ))}
                    </List>
                    <Button variant="outline-primary">Select Package</Button>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-py-8 u-bg-brand-subtle">
        <Container>
          <SectionIntro
            alignment="center"
            title="Traveler Stories"
            text="Hear from adventurers who made memories with us"
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
        </Container>
      </section>

      {/* Call to Action */}
      <section className="u-py-8">
        <Container>
          <Callout variant="success">
            <Row className="u-items-center">
              <GridCol xs={12} md={8} className="u-mb-4 u-mb-md-0">
                <h3 className="u-mb-2">Ready for Your Next Adventure?</h3>
                <p className="u-mb-0">
                  Sign up now and get exclusive deals delivered to your inbox.
                </p>
              </GridCol>
              <GridCol xs={12} md={4} className="u-text-md-end">
                <Button variant="success" size="lg">
                  Subscribe Now
                </Button>
              </GridCol>
            </Row>
          </Callout>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-bg-dark-subtle u-tex-light-subtle u-py-6">
        <Container>
          <Row>
            <GridCol xs={12} md={4} className="u-mb-4">
              <div className="u-mb-3">
                <AtomixLogo />
              </div>
              <p className="u-text-brand-emphasis u-mb-3">
                Your trusted partner for unforgettable travel experiences around the globe.
              </p>
              <div className="u-flex u-gap-2">
                <Button variant="outline-light" size="sm" className="u-rounded-circle">
                  <Icon name="FacebookLogo" />
                </Button>
                <Button variant="outline-light" size="sm" className="u-rounded-circle">
                  <Icon name="TwitterLogo" />
                </Button>
                <Button variant="outline-light" size="sm" className="u-rounded-circle">
                  <Icon name="InstagramLogo" />
                </Button>
                <Button variant="outline-light" size="sm" className="u-rounded-circle">
                  <Icon name="YoutubeLogo" />
                </Button>
              </div>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Destinations</h5>
              <ul className="u-list-unstyled u-text-brand-emphasis">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Asia
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Europe
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    North America
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    South America
                  </a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Resources</h5>
              <ul className="u-list-unstyled u-text-brand-emphasis">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Travel Guides
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Blog
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    FAQ
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
              <h5 className="u-mb-3">Contact Info</h5>
              <ul className="u-list-unstyled u-text-brand-emphasis">
                <li className="u-mb-2">
                  <Icon name="MapPin" className="u-me-2" />
                  123 Travel Street, Adventure City, AC 12345
                </li>
                <li className="u-mb-2">
                  <Icon name="Phone" className="u-me-2" />
                  (555) 123-4567
                </li>
                <li className="u-mb-2">
                  <Icon name="Envelope" className="u-me-2" />
                  info@traveladventures.com
                </li>
                <li className="u-mb-2">
                  <Icon name="Clock" className="u-me-2" />
                  Mon-Fri: 9:00 AM - 6:00 PM
                </li>
              </ul>
            </GridCol>
          </Row>
          <Row className="u-pt-4 u-mt-4 u-border-top u-border-dark-subtle">
            <GridCol xs={12} className="u-text-center u-text-brand-emphasis">
              <p className="u-mb-0">© 2023 Travel Adventures. All rights reserved.</p>
            </GridCol>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Travel;
