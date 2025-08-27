import React from 'react';

// Importing components from the library
import {
  Block,
  Button,
  Card,
  Hero,
  Icon,
  ProductReview,
  SectionIntro,
  Testimonial,
  TestimonialProps,
} from '../../components';

// Importing layout components
import { Container, Grid, GridCol } from '../../layouts';

const CoffeeShop: React.FC = () => {
  // Testimonial data
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "The best coffee I've ever had! The atmosphere is cozy and the baristas are truly skilled. I come here every morning before work.",
      author: {
        name: 'Sarah Johnson',
        role: 'Regular Customer',
        avatarSrc:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      },
    },
    {
      quote:
        'Their seasonal blends are exceptional. The pumpkin spice latte is the perfect treat for fall. Highly recommend their pastries too!',
      author: {
        name: 'Michael Chen',
        role: 'Coffee Enthusiast',
        avatarSrc:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      },
    },
  ];

  // Coffee products data
  const coffeeProducts = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong and rich shot of coffee',
      price: '$3.50',
      image:
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk foam',
      price: '$4.50',
      image:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80',
    },
    {
      id: 3,
      name: 'Latte',
      description: 'Espresso with steamed milk',
      price: '$5.00',
      image:
        'https://images.unsplash.com/photo-1461023058302-3690708b4880?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80',
    },
    {
      id: 4,
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: '$5.50',
      image:
        'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80',
    },
  ];

  // Menu items data
  const menuItems = [
    {
      id: 1,
      name: 'Croissant',
      description: 'Buttery and flaky French pastry',
      price: '$2.50',
    },
    {
      id: 2,
      name: 'Blueberry Muffin',
      description: 'Freshly baked with real blueberries',
      price: '$3.00',
    },
    {
      id: 3,
      name: 'Avocado Toast',
      description: 'Sourdough bread with smashed avocado',
      price: '$7.50',
    },
    {
      id: 4,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake',
      price: '$5.50',
    },
  ];

  return (
    <div className="coffee-shop">
      {/* Hero Section */}
      <Hero
        title="Welcome to Brew & Bean"
        text="Experience the finest coffee blends in a cozy atmosphere"
        backgroundImageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80"
        showOverlay={true}
        fullViewportHeight={false}
        actions={
          <React.Fragment>
            <Button size="large" label="View Menu" />
            <Button size="large" variant="secondary" label="Order Online" />
          </React.Fragment>
        }
      />

      {/* About Section */}
      <section className="u-my-12">
        <Container>
          <SectionIntro
            title="Our Story"
            text="Founded in 2010, Brew & Bean has been serving the community with premium coffee and homemade pastries. Our beans are ethically sourced from sustainable farms around the world."
            alignment="center"
          />

          <Grid>
            <GridCol md={4}>
              <Card className="u-text-center u-h-100">
                <Icon name="Coffee" size={48} className="u-text-primary u-mb-3" />
                <h3 className="u-text-xl u-font-semibold">Premium Beans</h3>
                <p className="u-text-gray-700 dark:u-text-gray-300">
                  Sourced from the finest coffee farms worldwide
                </p>
              </Card>
            </GridCol>

            <GridCol md={4}>
              <Card className="u-text-center u-h-100">
                <Icon name="Heart" size={48} className="u-text-primary u-mb-3" />
                <h3 className="u-text-xl u-font-semibold">Crafted with Love</h3>
                <p className="u-text-gray-700 dark:u-text-gray-300">
                  Each cup is carefully prepared by our skilled baristas
                </p>
              </Card>
            </GridCol>

            <GridCol md={4}>
              <Card className="u-text-center u-h-100">
                <Icon name="Leaf" size={48} className="u-text-primary u-mb-3" />
                <h3 className="u-text-xl u-font-semibold">Sustainable</h3>
                <p className="u-text-gray-700 dark:u-text-gray-300">
                  Committed to eco-friendly practices and fair trade
                </p>
              </Card>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Menu Section */}
      <section className="u-my-12 u-bg-gray-50 dark:u-bg-gray-800">
        <Container>
          <SectionIntro
            title="Our Menu"
            text="Discover our selection of expertly crafted coffee and delicious pastries"
            alignment="center"
          />

          <div className="u-mb-8">
            <h3 className="u-text-2xl u-font-semibold u-text-center u-mb-6">Coffee Selection</h3>
            <Grid>
              {coffeeProducts.map(product => (
                <GridCol md={6} lg={3} key={product.id}>
                  <Card
                    image={product.image}
                    imageAlt={product.name}
                    title={product.name}
                    text={product.description}
                    actions={
                      <React.Fragment>
                        <span className="u-font-semibold">{product.price}</span>
                        <Button size="small" label="Add to Order" />
                      </React.Fragment>
                    }
                    className="u-h-100"
                  />
                </GridCol>
              ))}
            </Grid>
          </div>

          <div>
            <h3 className="u-text-2xl u-font-semibold u-text-center u-mb-6">Pastries & Food</h3>
            <Grid>
              {menuItems.map(item => (
                <GridCol md={6} lg={3} key={item.id}>
                  <Card
                    title={item.name}
                    text={item.description}
                    actions={
                      <React.Fragment>
                        <span className="u-font-semibold">{item.price}</span>
                        <Button size="small" label="Add to Order" />
                      </React.Fragment>
                    }
                    className="u-h-100"
                  />
                </GridCol>
              ))}
            </Grid>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-my-12">
        <Container>
          <SectionIntro
            title="Customer Reviews"
            text="See what our customers have to say about their experience"
            alignment="center"
          />

          <Grid>
            {testimonials.map((testimonial, index) => (
              <GridCol md={6} key={index}>
                <Testimonial {...testimonial} />
              </GridCol>
            ))}
          </Grid>

          <div className="u-text-center u-mt-8">
            <ProductReview productName="Brew & Bean Coffee Shop" initialRating={5} maxRating={5} />
          </div>
        </Container>
      </section>

      {/* Location & Hours */}
      <section className="u-my-12">
        <Container>
          <SectionIntro
            title="Visit Us"
            text="Come experience the cozy atmosphere and amazing coffee"
            alignment="center"
          />

          <Grid>
            <GridCol md={6}>
              <Card>
                <h3 className="u-text-xl u-font-semibold u-mb-4">Location</h3>
                <p className="u-mb-2">123 Coffee Street</p>
                <p className="u-mb-2">Brewville, BC 12345</p>
                <p className="u-mb-4">Canada</p>

                <Button variant="secondary" label="Get Directions" />
              </Card>
            </GridCol>

            <GridCol md={6}>
              <Card>
                <h3 className="u-text-xl u-font-semibold u-mb-4">Hours</h3>
                <ul className="u-list-unstyled">
                  <li className="u-d-flex u-justify-content-between u-py-2 u-border-b u-border-gray-200">
                    <span>Monday - Friday</span>
                    <span>6:00 AM - 8:00 PM</span>
                  </li>
                  <li className="u-d-flex u-justify-content-between u-py-2 u-border-b u-border-gray-200">
                    <span>Saturday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </li>
                  <li className="u-d-flex u-justify-content-between u-py-2">
                    <span>Sunday</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </Card>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <Block
        className="u-my-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <div className="u-text-center u-py-12">
            <h2 className="u-text-3xl u-font-bold u-text-white u-mb-4">
              Ready for Your Perfect Cup?
            </h2>
            <p className="u-text-white u-mb-6 u-mx-auto" style={{ maxWidth: '600px' }}>
              Join us for a memorable coffee experience in our cozy café
            </p>
            <div className="u-d-flex u-gap-3 u-justify-content-center">
              <Button size="large" label="Order Online" />
              <Button size="large" variant="secondary" label="Book a Table" />
            </div>
          </div>
        </Container>
      </Block>
    </div>
  );
};

export default CoffeeShop;
