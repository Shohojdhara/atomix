import React, { useState } from 'react';
import {
  AtomixLogo,
  Badge,
  AtomixGlass,
  ColorModeToggle,
  Button,
  Card,
  Countdown,
  Hero,
  Icon,
  SectionIntro,
  Testimonial,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';

const Ecommerce: React.FC = () => {
  const [cartCount, setCartCount] = useState(3);

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.5,
      reviewCount: 128,
      badge: 'Best Seller',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.8,
      reviewCount: 97,
      badge: 'New',
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      rating: 4.3,
      reviewCount: 64,
      badge: 'Sale',
    },
    {
      id: 4,
      name: 'Gaming Keyboard',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      rating: 4.7,
      reviewCount: 215,
      badge: 'Limited',
    },
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop',
      itemCount: 124,
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop',
      itemCount: 89,
    },
    {
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=300&fit=crop',
      itemCount: 67,
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=300&fit=crop',
      itemCount: 42,
    },
  ];

  const features = [
    {
      icon: <Icon name="Truck" size={24} />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <Icon name="CurrencyDollar" size={24} />,
      title: 'Money Back Guarantee',
      description: '30 days return policy',
    },
    {
      icon: <Icon name="ShieldCheck" size={24} />,
      title: 'Secure Payments',
      description: 'SSL encryption',
    },
    {
      icon: <Icon name="Headset" size={24} />,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
  ];

  const testimonials = [
    {
      name: 'Emily Johnson',
      role: 'Verified Customer',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      content:
        'The quality of products exceeded my expectations. Fast shipping and excellent customer service!',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Verified Customer',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: "Best online shopping experience I've had. Will definitely be ordering again.",
      rating: 4,
    },
    {
      name: 'Sarah Williams',
      role: 'Verified Customer',
      avatar:
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=100&h=100&fit=crop&crop=face',
      content:
        'Great selection of products and competitive prices. The website is easy to navigate.',
      rating: 5,
    },
  ];

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
          
      {/* Top Announcement Bar */}
      <div className="u-bg-warning u-text-center u-py-2 u-fs-sm u-mt-20">
        <Container className="u-d-flex u-justify-content-between u-gap-4">
          <div className="u-d-flex u-align-items-center u-gap-2">
            <Icon name="Lightning" />
            Flash Sale! 30% off on selected items.
          </div>

          <Countdown target={new Date(Date.now() + 24 * 60 * 60 * 1000)} />
        </Container>
      </div>

      {/* Navigation */}
      <header className="u-bg-body u-shadow-sm">
        <Container>
          <Row className="u-align-items-center u-py-3">
            <GridCol xs={4} md={2}>
              <AtomixLogo />
            </GridCol>
            <GridCol xs={4} md={6}>
              <div className="u-d-none u-d-md-flex u-align-items-center u-gap-4">
                <a href="#">Home</a>
                <a href="#">Categories</a>
                <a href="#">New Arrivals</a>
                <a href="#">Deals</a>
                <a href="#">Brands</a>
              </div>
            </GridCol>
            <GridCol xs={4} md={4} className="u-d-flex u-justify-content-end">
              <Button variant="link" className="u-position-relative u-me-3">
                <Icon name="Heart" size={20} />
              </Button>
              <Button variant="link" className="u-position-relative u-me-3">
                <Icon name="User" size={20} />
              </Button>
              <Button variant="link" className="u-position-relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge
                    label={cartCount.toString()}
                    variant="primary"
                    className="u-position-absolute u-top-0 u-start-100 u-translate-middle"
                  />
                )}
              </Button>
              <Button variant="primary" className="u-d-md-none">
                <Icon name="List" size={20} />
              </Button>
            </GridCol>
          </Row>
        </Container>
      </header>

      {/* Hero Section */}
      <Hero
        title="Summer Collection 2023"
        text="Discover the latest trends in fashion and tech. Up to 50% off on selected items."
        parallax={true}
        actions={
          <>
            <Button variant="primary" size="lg" className="u-me-2">
              Shop Now
            </Button>
            <Button variant="outline-primary" size="lg">
              View Collection
            </Button>
          </>
        }
        backgroundImageSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop"
      />

      {/* Categories */}
      <section className="u-py-8">
        <Container>
          <SectionIntro title="Shop by Category" text="Browse our wide selection of products" />
          <Grid>
            {categories.map((category, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <Card className="u-h-100 u-text-center u-border-0 u-shadow">
                  <div className="u-position-relative">
                    <img src={category.image} className="u-w-100 u-rounded" alt={category.name} />
                    <div className="u-position-absolute u-bottom-0 u-start-0 u-w-100 u-p-3 u-bg-gradient-dark">
                      <h3 className="u-text-secondry-emphasis u-mb-1">{category.name}</h3>
                      <p className="u-text-secondry-emphasis u-mb-0 u-fs-sm">
                        {category.itemCount} items
                      </p>
                    </div>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="u-py-8 u-bg-secondary-subtle">
        <Container>
          <SectionIntro
            title="Featured Products"
            text="Handpicked selection of our best selling items"
            className="u-mb-6"
          />
          <Grid>
            {products.map(product => (
              <GridCol key={product.id} xs={12} sm={6} md={3} className="u-mb-4">
                <Card className="u-h-100">
                  {product.badge && (
                    <Badge
                      label={product.badge}
                      variant="primary"
                      className="u-position-absolute u-top-3 u-end-3"
                    />
                  )}
                  <div className="c-card__image">
                    <img src={product.image} alt={product.name} className="u-w-100" />
                  </div>
                  <div className="c-card__body u-p-4">
                    <h3 className="u-fs-5 u-mb-2">{product.name}</h3>
                    <div className="u-d-flex u-align-items-center u-mb-2">
                      <div className="u-text-warning u-me-1">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="u-text-muted u-fs-sm">({product.reviewCount})</span>
                    </div>
                    <div className="u-mb-3">
                      <span className="u-fs-4 u-fw-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="u-text-muted u-text-decoration-line-through u-ms-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button variant="primary" className="u-w-100">
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
          <div className="u-text-center u-mt-6">
            <Button variant="outline-primary">View All Products</Button>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="u-py-8">
        <Container>
          <Grid>
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <div className="c-feature u-text-center">
                  <div className="c-feature__icon u-mb-3 u-d-inline-flex u-align-items-center u-justify-content-center u-bg-primary-subtle u-text-primary u-rounded-circle u-p-3">
                    {feature.icon}
                  </div>
                  <h3 className="c-feature__title u-mb-2">{feature.title}</h3>
                  <p className="c-feature__description u-text-muted">{feature.description}</p>
                </div>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Deal of the Day */}
      <section className="u-py-8 u-bg-brand-subtle u-text-secondry-emphasis">
        <Container>
          <Row className="u-align-items-center">
            <GridCol xs={12} md={6} className="u-mb-5 u-mb-md-0">
              <h2 className="u-mb-3">Deal of the Day</h2>
              <h3 className="u-mb-3">Premium Wireless Headphones</h3>
              <div className="u-mb-4">
                <span className="u-fs-1 u-fw-bold u-me-2">$149.99</span>
                <span className="u-fs-5 u-text-decoration-line-through u-text-primary-emphasis">
                  $199.99
                </span>
                <Badge label="25% OFF" variant="light" className="u-ms-3" />
              </div>
              <p className="u-mb-4 u-text-primary-emphasis">
                Experience crystal clear sound with our premium wireless headphones. Featuring noise
                cancellation and 30-hour battery life.
              </p>
              <Countdown target={new Date(Date.now() + 12 * 60 * 60 * 1000)} className="u-mb-4" />
              <Button variant="light">Add to Cart</Button>
            </GridCol>
            <GridCol xs={12} md={6}>
              <div className="u-bg-body u-rounded u-p-4 u-text-center">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
                  alt="Premium Wireless Headphones"
                  className="u-rounded"
                />
              </div>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            title="What Our Customers Say"
            text="Don't just take our word for it"
            className="u-mb-6"
            alignment="center"
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

      {/* Newsletter */}
      <section className="u-py-8 u-bg-dark-subtle u-text-light-emphasis">
        <Container>
          <Row className="u-justify-content-center">
            <GridCol xs={12} md={8} className="u-text-center">
              <h2 className="u-mb-3">Stay in the Loop</h2>
              <p className="u-mb-4 u-text-muted">
                Subscribe to our newsletter and be the first to know about new arrivals, special
                offers and exclusive deals.
              </p>
              <div className="u-d-flex u-gap-2 u-justify-content-center u-align-items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="c-input c-input--lg"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-bg-secondary-subtle u-py-6">
        <Container>
          <Row>
            <GridCol xs={12} md={4} className="u-mb-4">
              <div className="u-mb-3">
                <AtomixLogo />
              </div>
              <p className="u-text-muted">
                Your one-stop destination for all your shopping needs. Quality products at
                competitive prices.
              </p>
              <div className="u-d-flex u-gap-2">
                <Button variant="outline-dark" size="sm" className="u-rounded-circle">
                  <Icon name="FacebookLogo" />
                </Button>
                <Button variant="outline-dark" size="sm" className="u-rounded-circle">
                  <Icon name="TwitterLogo" />
                </Button>
                <Button variant="outline-dark" size="sm" className="u-rounded-circle">
                  <Icon name="InstagramLogo" />
                </Button>
                <Button variant="outline-dark" size="sm" className="u-rounded-circle">
                  <Icon name="PinterestLogo" />
                </Button>
              </div>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Shop</h5>

              <ul className="c-list">
                <li className="u-mb-2">
                  <a href="#">All Products</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">New Arrivals</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">Best Sellers</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">Sale</a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Information</h5>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-2">
                  <a href="#">About Us</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">Contact</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">Shipping Policy</a>
                </li>
                <li className="u-mb-2">
                  <a href="#">Return Policy</a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={12} md={4} className="u-mb-4">
              <h5 className="u-mb-3">Contact Info</h5>
              <ul className="u-list-unstyled u-text-muted">
                <li className="u-mb-2">
                  <Icon name="MapPin" className="u-me-2" />
                  123 Shopping Street, Retail City
                </li>
                <li className="u-mb-2">
                  <Icon name="Phone" className="u-me-2" />
                  (123) 456-7890
                </li>
                <li className="u-mb-2">
                  <Icon name="Envelope" className="u-me-2" />
                  info@ecommerce.com
                </li>
              </ul>
            </GridCol>
          </Row>
          <Row className="u-pt-4 u-mt-4 u-border-top u-border-dark-subtle">
            <GridCol xs={12} className="u-text-center u-text-muted">
              <p className="u-mb-0">© 2023 E-commerce Store. All rights reserved.</p>
            </GridCol>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Ecommerce;
