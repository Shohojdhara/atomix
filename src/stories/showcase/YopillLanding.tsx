import React from 'react';
import { Hero } from '../../components/Hero/Hero';
import { SectionIntro } from '../../components/SectionIntro/SectionIntro';
import { Button } from '../../components/Button/Button';
import { Grid, GridCol } from '../../layouts/Grid';
import { Card } from '../../components/Card/Card';
import { Block } from '../../components/Block';
import { Testimonial, TestimonialAuthor } from '../../components/Testimonial/Testimonial';
import { Navbar } from '../../components/Navigation/Navbar/Navbar';
import { Nav } from '../../components/Navigation/Nav/Nav';
import { NavItem } from '../../components/Navigation/Nav/NavItem';
import { River } from '../../components/River/River';
import { Accordion } from '../../components/Accordion/Accordion';
import { Steps } from '../../components/Steps/Steps';
import { Callout } from '../../components/Callout/Callout';
import { BarChart } from '../../components/Chart';
import { ProductReview } from '../../components/ProductReview/ProductReview';
import { Countdown } from '../../components/Countdown/Countdown';

const YopillLanding: React.FC = () => {
  // Product variants data
  const products = [
    {
      id: 'red',
      name: 'Yopill Cherry',
      flavor: 'Cherry',
      description: 'Experience the powerful combination of Methamphetamine and Caffeine with a delicious cherry flavor.',
      color: '#FF0000',
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'orange',
      name: 'Yopill Vanilla',
      flavor: 'Vanilla',
      description: 'Experience the powerful combination of Methamphetamine and Caffeine with a smooth vanilla flavor.',
      color: '#FFA500',
      image: 'https://images.unsplash.com/photo-1542911945-39ed8c8bc9cd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'green',
      name: 'Yopill Mango',
      flavor: 'Mango',
      description: 'Experience the powerful combination of Methamphetamine and Caffeine with a tropical mango flavor.',
      color: '#008000',
      image: 'https://images.unsplash.com/photo-1598040795256-03d22d952f4d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  // FAQ data
  const faqs = [
    {
      title: "Is Yopill safe to use?",
      content: "Yopill is formulated with pharmaceutical-grade ingredients and undergoes rigorous quality control. However, as with any supplement containing stimulants, we recommend consulting with your healthcare provider before use, especially if you have any pre-existing medical conditions."
    },
    {
      title: "How quickly will I feel the effects?",
      content: "Most users begin to feel the effects within 30-45 minutes of taking Yopill. The full effects typically peak within 2-3 hours and can last for 6-8 hours."
    },
    {
      title: "Can I take Yopill with other medications?",
      content: "If you are currently taking any medications, especially MAO inhibitors, antidepressants, or blood pressure medications, please consult with your healthcare provider before using Yopill."
    },
    {
      title: "Are there any side effects?",
      content: "Some users may experience mild side effects such as increased heart rate, restlessness, or difficulty sleeping, especially when first starting to use Yopill. These effects typically subside as your body adjusts."
    },
    {
      title: "How should I store Yopill?",
      content: "Store Yopill in a cool, dry place away from direct sunlight. Keep the bottle tightly closed and out of reach of children."
    }
  ];

  // Benefits steps
  const benefitsSteps = [
    {
      number: 1,
      text: "Take Yopill",
      content: "Consume one capsule with water in the morning or when you need an energy boost."
    },
    {
      number: 2,
      text: "Feel the Energy",
      content: "Experience increased alertness and focus within 30-45 minutes."
    },
    {
      number: 3,
      text: "Stay Productive",
      content: "Maintain enhanced concentration and productivity throughout your day."
    },
    {
      number: 4,
      text: "Rest & Repeat",
      content: "Get a restful night's sleep and take another capsule the next day as needed."
    }
  ];

  // Statistics data
  const statisticsData = [
    {
      label: 'Improvement %',
      data: [
        { label: 'Focus', value: 87 },
        { label: 'Energy', value: 92 },
        { label: 'Productivity', value: 85 },
        { label: 'Alertness', value: 90 },
        { label: 'Mood', value: 78 }
      ],
      color: '#7c3aed',
    }
  ];

  // Set a future date for the countdown (7 days from now)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  return (
    <>
      {/* Navbar */}
      <Navbar 
        brand="Yopill" 
        className="u-margin-bottom-medium"
      >
        <Nav alignment="end">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#products">Products</NavItem>
          <NavItem href="#how-it-works">How It Works</NavItem>
          <NavItem href="#benefits">Benefits</NavItem>
          <NavItem href="#statistics">Statistics</NavItem>
          <NavItem href="#reviews">Reviews</NavItem>
          <NavItem href="#faq">FAQ</NavItem>
          <NavItem href="#testimonials">Testimonials</NavItem>
          <NavItem>
            <Button variant="primary" size="sm">Order Now</Button>
          </NavItem>
        </Nav>
      </Navbar>
      
      {/* Hero Section */}
      <Hero
        title="Yopill - The Ultimate Energy & Focus Enhancer"
        subtitle="Experience the powerful combination of Methamphetamine and Caffeine"
        text="Boost your energy, focus, and productivity with our revolutionary orange pill. Yopill combines the best of both worlds to give you sustained energy without the crash."
        actions={
          <>
            <Button size="lg" variant="primary">Order Now</Button>
            <Button size="lg" variant="secondary" style={{ marginLeft: '1rem' }}>Learn More</Button>
          </>
        }
        imageAlt="Yopill Orange Capsules"
        alignment="left"
        backgroundImageSrc='https://images.unsplash.com/photo-1639991987087-f28545e9b1f2?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />

      {/* Benefits Section */}
      <Block id="features" spacing='lg'>
        <SectionIntro
          title="Why Choose Yopill?"
          text="Yopill is scientifically formulated to provide you with the perfect energy blend for all-day productivity."
          alignment="center"
        />
        
        <Grid>
          <GridCol md={4}>
            <Card 
              title="Sustained Energy"
              text="Experience long-lasting energy without the jitters or crash associated with other energy supplements."
              icon={<span className="u-fs-lg" style={{ color: '#FFA500' }}>⚡</span>}
            />
          </GridCol>
          <GridCol md={4}>
            <Card 
              title="Enhanced Focus"
              text="Improve your concentration and mental clarity with our unique formula that boosts cognitive function."
              icon={<span className="u-fs-lg" style={{ color: '#FFA500' }}>🎯</span>}
            />
          </GridCol>
          <GridCol md={4}>
            <Card 
              title="Rapid Absorption"
              text="Our advanced formula ensures quick absorption into your system for fast-acting results."
              icon={<span className="u-fs-lg" style={{ color: '#FFA500' }}>⏱️</span>}
            />
          </GridCol>
        </Grid>
      </Block>

      {/* Product Showcase Section */}
      <Block id="products" spacing='lg' background='secondary'>
        <SectionIntro
          title="Yopill Variants"
          text="Choose from our delicious flavored variants to suit your taste preferences."
          alignment="center"
        />
        
        <Grid>
          {products.map((product) => (
            <GridCol md={4} key={product.id}>
              <Card
                image={product.image}
                imageAlt={`${product.name} capsules`}
                title={product.name}
                text={product.description}
                actions={
                  <Button 
                    variant="primary" 
                    style={{ backgroundColor: product.color, borderColor: product.color }}
                  >
                    Order {product.flavor}
                  </Button>
                }
              />
            </GridCol>
          ))}
        </Grid>
      </Block>

      {/* How Yopill Works - River Component */}
      <Block id="how-it-works" spacing='lg'>
        <River
          title="How Yopill Works"
          text={[
            "Yopill's powerful formula combines Methamphetamine and Caffeine to deliver unparalleled energy and focus. Our proprietary blend is designed for rapid absorption and sustained release.",
            "The Methamphetamine component stimulates your central nervous system, increasing alertness and focus while the Caffeine enhances these effects and provides an additional metabolic boost.",
            "Experience the Yopill difference and transform your productivity today."
          ]}
          imageSrc="https://images.unsplash.com/photo-1628771763012-bf8dff10e55e?auto=format&fit=crop&w=600&q=80"
          imageAlt="Yopill Formula"
          actions={
            <Button variant="primary">Learn More</Button>
          }
        />
      </Block>

      {/* Benefits Steps */}
      <Block id="benefits" spacing='lg' background='secondary'>
        <SectionIntro
          title="Benefits of Yopill"
          text="Experience the Yopill difference in just four simple steps."
          alignment="center"
        />
        <Steps items={benefitsSteps} activeIndex={3} />
      </Block>

      {/* Statistics Section */}
      <Block id="statistics" spacing='lg'>
        <SectionIntro
          title="Proven Results"
          text="Scientifically tested and proven to enhance cognitive performance."
          alignment="center"
        />
        <div className='u-mx-auto u-w-75'>
          <BarChart 
            datasets={statisticsData}
            size="md"
          />
        </div>
      </Block>

      {/* Product Reviews */}
      <Block id="reviews" spacing='lg' background='secondary'>
        <SectionIntro
          title="Rate Your Experience"
          text="Share your experience with Yopill and help others make informed decisions."
          alignment="center"
        />
        <div className='u-mx-auto u-w-75'>
          <ProductReview 
            productName="Yopill"
            productImage="https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=200&q=80"
            initialRating={0}
            maxRating={5}
            allowHalf={true}
            ratingColor="warning"
          />
        </div>
      </Block>

      {/* Important Safety Notice */}
      <Block spacing='lg'>
        <Callout 
          title="Important Safety Information"
          variant="warning"
        >
          Yopill contains methamphetamine, a controlled substance. It is intended for responsible adult use only. Do not exceed the recommended dosage. Keep out of reach of children. Consult a healthcare professional before use if you have heart disease, high blood pressure, thyroid disease, diabetes, difficulty urinating due to prostate enlargement, or if you are taking medications for depression or asthma.
        </Callout>
      </Block>

      {/* Limited Time Offer with Countdown */}
      <Block spacing='lg' style={{ backgroundColor: '#eab308', color: 'white', textAlign: 'center' }}>
        <SectionIntro
          title="Limited Time Offer!"
          text="Order now and get 20% off your first purchase. Offer ends in:"
          alignment="center"
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Countdown 
            target={futureDate}
            show={['days', 'hours', 'minutes', 'seconds']}
            separator=":"
            focused={true}
          />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Button size="lg" variant="dark">Claim Discount</Button>
        </div>
      </Block>

      {/* FAQ Section */}
      <Block id="faq" spacing='lg'>
        <SectionIntro
          title="Frequently Asked Questions"
          text="Find answers to common questions about Yopill."
          alignment="center"
        />
        
        <Grid>
          <GridCol md={6}>
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
              <Accordion 
                key={index}
                title={faq.title}
                iconPosition="right"
              >
                {faq.content}
              </Accordion>
            ))}
          </GridCol>
          <GridCol md={6}>
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
              <Accordion 
                key={index + Math.ceil(faqs.length / 2)}
                title={faq.title}
                iconPosition="right"
              >
                {faq.content}
              </Accordion>
            ))}
          </GridCol>
        </Grid>
      </Block>

      {/* Testimonials */}
      <Block id="testimonials" spacing='lg' background='secondary'>
        <SectionIntro
          title="What Our Customers Say"
          text="Join thousands of satisfied users who have transformed their productivity with Yopill."
          alignment="center"
        />
        
        <Grid>
          <GridCol md={4}>
            <Testimonial
              quote="Yopill has completely changed how I approach my workday. The focus and energy I get are unmatched by any other supplement I've tried."
              author={{
                name: "Alex Johnson",
                role: "Software Engineer"
              } as TestimonialAuthor}
            />
          </GridCol>
          <GridCol md={4}>
            <Testimonial
              quote="As a medical student, I need to stay alert for long hours. Yopill gives me the mental clarity and stamina I need without any crash."
              author={{
                name: "Sarah Williams",
                role: "Medical Student"
              } as TestimonialAuthor}
            />
          </GridCol>
          <GridCol md={4}>
            <Testimonial
              quote="The combination of methamphetamine and caffeine in Yopill is genius. I've tried many energy supplements, but this one stands out."
              author={{
                name: "Michael Chen",
                role: "Entrepreneur"
              } as TestimonialAuthor}
            />
          </GridCol>
        </Grid>
      </Block>

      {/* Final CTA */}
      <Block spacing='lg' style={{ backgroundColor: '#fff5eb' }}>
        <SectionIntro
          title="Ready to Transform Your Energy Levels?"
          text="Join thousands of satisfied customers and experience the Yopill difference today."
          alignment="center"
          actions={
            <Button size="lg" variant="primary">Order Now - Limited Time Offer</Button>
          }
        />
      </Block>
    </>
  );
};

export default YopillLanding;
