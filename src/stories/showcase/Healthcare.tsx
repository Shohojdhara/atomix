import React, { useState } from 'react';
import {
  Accordion,
  AtomixLogo,
  Avatar,
  AvatarGroup,
  Button,
  Callout,
  Card,
  Checkbox,
  FormGroup,
  Hero,
  Icon,
  Input,
  List,
  Rating,
  SectionIntro,
  Select,
  Steps,
  Testimonial,
  Textarea,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';

const Healthcare: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const services = [
    {
      icon: <Icon name="Stethoscope" size={24} />,
      title: 'Medical Consultation',
      description: 'Expert medical advice from qualified professionals',
    },
    {
      icon: <Icon name="Heart" size={24} />,
      title: 'Cardiology',
      description: 'Comprehensive heart health assessment and treatment',
    },
    {
      icon: <Icon name="Baby" size={24} />,
      title: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents',
    },
    {
      icon: <Icon name="Brain" size={24} />,
      title: 'Neurology',
      description: 'Diagnosis and treatment of nervous system disorders',
    },
    {
      icon: <Icon name="Bone" size={24} />,
      title: 'Orthopedics',
      description: 'Treatment for bone, joint, and muscle conditions',
    },
    {
      icon: <Icon name="Eye" size={24} />,
      title: 'Ophthalmology',
      description: 'Eye care and vision correction services',
    },
  ];

  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15 years',
      avatar:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      experience: '12 years',
      avatar:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurologist',
      experience: '18 years',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
    },
  ];

  const testimonials = [
    {
      name: 'Robert Williams',
      role: 'Patient',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        'The care I received was exceptional. The doctors took time to explain everything and made me feel comfortable throughout my treatment.',
    },
    {
      name: 'Jennifer Lee',
      role: 'Patient',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content:
        'Booking appointments and accessing my medical records online has never been easier. The digital experience is fantastic!',
    },
    {
      name: 'David Thompson',
      role: 'Patient',
      avatar:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face',
      content:
        'The specialists here are top-notch. I was able to get a second opinion and the treatment plan was exactly what I needed.',
    },
  ];

  const faqs = [
    {
      title: 'What should I bring to my first appointment?',
      children:
        'Please bring a valid ID, insurance card, list of current medications, and any relevant medical records or test results.',
    },
    {
      title: 'How do I request a prescription refill?',
      children:
        'You can request prescription refills through our patient portal or by calling our pharmacy line at (555) 123-4567.',
    },
    {
      title: 'Do you accept my insurance?',
      children:
        'We accept most major insurance plans. Please contact our billing department with your specific insurance information for confirmation.',
    },
    {
      title: 'What are your office hours?',
      children:
        'Our office is open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays.',
    },
  ];

  const steps = [
    {
      number: 1,
      text: 'Book Appointment',
      content: 'Schedule your visit online or by phone',
    },
    {
      number: 2,
      text: 'Visit Our Clinic',
      content: 'Arrive 15 minutes early for check-in',
    },
    {
      number: 3,
      text: 'Consultation',
      content: 'Meet with your healthcare provider',
    },
    {
      number: 4,
      text: 'Follow-up Care',
      content: 'Receive ongoing care and support',
    },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data here
    alert('Appointment request submitted! We will contact you shortly.');
    setAppointmentForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <>
      {/* Navigation */}
      <header className="u-bg-body u-shadow-sm">
        <Container>
          <Row className="u-align-items-center u-py-3">
            <GridCol xs={6} md={3}>
              <AtomixLogo />
            </GridCol>
            <GridCol xs={6} md={9} className="u-d-flex u-justify-content-end">
              <Button variant="primary">Patient Portal</Button>
            </GridCol>
          </Row>
        </Container>
      </header>

      {/* Hero Section */}
      <Hero
        title="Your Health, Our Priority"
        text="Comprehensive healthcare services with compassionate care and cutting-edge technology."
        fullViewportHeight={true}
        backgroundImageSrc="https://plus.unsplash.com/premium_photo-1664302088394-15181999f92e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        showOverlay={true}
        imageSrc="https://plus.unsplash.com/premium_photo-1663047537856-da771ed69769?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        actions={
          <>
            <Button variant="primary" size="lg" className="u-me-2">
              Book Appointment
            </Button>
            <Button variant="outline-primary" size="lg">
              Our Services
            </Button>
          </>
        }
        className="u-mb-0"
      />

      {/* Stats */}
      <section className="u-py-5 u-bg-secondary-subtle">
        <Container>
          <Grid>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold u-text-primary">25+</div>
              <div className="">Years Experience</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold u-text-primary">50+</div>
              <div className="">Expert Doctors</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold u-text-primary">100K+</div>
              <div className="">Happy Patients</div>
            </GridCol>
            <GridCol xs={12} sm={6} md={3} className="u-text-center u-mb-4">
              <div className="u-fs-2 u-fw-bold u-text-primary">24/7</div>
              <div className="">Emergency Support</div>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* Services */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            alignment="center"
            title="Our Medical Services"
            text="Comprehensive healthcare solutions for you and your family"
          />
          <Grid>
            {services.map((service, index) => (
              <GridCol key={index} xs={12} sm={6} md={4} className="u-mb-4">
                <Card className="u-h-100">
                  <div className="c-card__body u-p-4 u-text-center">
                    <div className="u-bg-brand-subtle u-text-primary u-d-inline-flex u-align-items-center u-justify-content-center u-rounded-circle u-p-3 u-mb-3">
                      {service.icon}
                    </div>
                    <h3 className="u-mb-2">{service.title}</h3>
                    <p className="">{service.description}</p>
                    <Button variant="link" className="u-p-0">
                      Learn More
                    </Button>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Doctors */}
      <section className="u-py-8 u-bg-secondary-subtle">
        <Container>
          <SectionIntro
            alignment="center"
            title="Meet Our Specialists"
            text="Highly qualified medical professionals dedicated to your care"
          />
          <Grid>
            {doctors.map((doctor, index) => (
              <GridCol key={index} xs={12} sm={6} md={4} className="u-mb-4">
                <Card className="u-h-100 u-text-center">
                  <div className="c-card__body u-p-4">
                    <Avatar src={doctor.avatar} size="xl" className="u-mx-auto u-mb-3" />
                    <h3 className="u-mb-1">{doctor.name}</h3>
                    <div className="u-text-primary u-mb-2">{doctor.specialty}</div>
                    <div className=" u-mb-3">{doctor.experience} experience</div>
                    <div className="u-d-flex u-justify-content-center u-align-items-center u-mb-3">
                      <Rating value={doctor.rating} readOnly />
                      <span className=" u-ms-2">{doctor.rating}</span>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      View Profile
                    </Button>
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            alignment="center"
            title="How It Works"
            text="Getting quality healthcare has never been easier"
          />
          <Steps activeIndex={0} items={steps} vertical={false} className="u-mb-6" />

          <div className="u-text-center">
            <Button variant="primary" size="lg">
              Get Started Today
            </Button>
          </div>
        </Container>
      </section>

      {/* Appointment */}
      <section className="u-py-8 u-bg-brand-subtle">
        <Container>
          <Row>
            <GridCol xs={12} md={6} className="u-mb-5 u-mb-md-0">
              <SectionIntro
                alignment="left"
                title="Book an Appointment"
                text="Schedule an appointment with us and experience the difference."
              />

              <div className="u-mb-4">
                <h3 className="u-mb-3">Why Choose Us?</h3>
                <List>
                  <li>Expert medical professionals</li>
                  <li>State-of-the-art facilities</li>
                  <li>Personalized treatment plans</li>
                  <li>Comprehensive aftercare support</li>
                </List>
              </div>
            </GridCol>

            <GridCol xs={12} md={6}>
              <Card className="u-h-100">
                <div className="c-card__body u-p-4">
                  <h3 className="u-mb-4">Request Appointment</h3>
                  <form onSubmit={handleSubmit}>
                    <FormGroup className="u-mb-3">
                      <label htmlFor="name" className="u-form-label">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={appointmentForm.name}
                        onChange={handleFormChange}
                        required
                      />
                    </FormGroup>

                    <Row>
                      <GridCol xs={12} md={6} className="u-mb-3">
                        <FormGroup>
                          <label htmlFor="email" className="u-form-label">
                            Email
                          </label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={appointmentForm.email}
                            onChange={handleFormChange}
                            required
                          />
                        </FormGroup>
                      </GridCol>
                      <GridCol xs={12} md={6} className="u-mb-3">
                        <FormGroup>
                          <label htmlFor="phone" className="u-form-label">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={appointmentForm.phone}
                            onChange={handleFormChange}
                            required
                          />
                        </FormGroup>
                      </GridCol>
                    </Row>

                    <FormGroup className="u-mb-3">
                      <label htmlFor="service" className="u-form-label">
                        Service
                      </label>
                      <Select
                        id="service"
                        name="service"
                        value={appointmentForm.service}
                        onChange={handleFormChange}
                        required
                        options={[
                          { value: '', label: 'Select a service' },
                          { value: 'consultation', label: 'Medical Consultation' },
                          { value: 'cardiology', label: 'Cardiology' },
                          { value: 'pediatrics', label: 'Pediatrics' },
                          { value: 'neurology', label: 'Neurology' },
                          { value: 'orthopedics', label: 'Orthopedics' },
                          { value: 'ophthalmology', label: 'Ophthalmology' },
                        ]}
                      />
                    </FormGroup>

                    <Row>
                      <GridCol xs={12} md={6} className="u-mb-3">
                        <FormGroup>
                          <label htmlFor="date" className="u-form-label">
                            Preferred Date
                          </label>
                          <Input
                            type="date"
                            id="date"
                            name="date"
                            value={appointmentForm.date}
                            onChange={handleFormChange}
                            required
                          />
                        </FormGroup>
                      </GridCol>
                      <GridCol xs={12} md={6} className="u-mb-3">
                        <FormGroup>
                          <label htmlFor="time" className="u-form-label">
                            Preferred Time
                          </label>
                          <Input
                            type="time"
                            id="time"
                            name="time"
                            value={appointmentForm.time}
                            onChange={handleFormChange}
                            required
                          />
                        </FormGroup>
                      </GridCol>
                    </Row>

                    <FormGroup className="u-mb-4">
                      <label htmlFor="message" className="u-form-label">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={appointmentForm.message}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Any specific concerns or questions?"
                      />
                    </FormGroup>

                    <FormGroup className="u-mb-4">
                      <Checkbox id="terms" required label="I agree to the terms and conditions" />
                    </FormGroup>

                    <Button variant="primary" type="submit" className="u-w-100">
                      Request Appointment
                    </Button>
                  </form>
                </div>
              </Card>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="u-py-8">
        <Container>
          <SectionIntro
            alignment="center"
            title="Patient Testimonials"
            text="Hear from people who have experienced our care"
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
            <AvatarGroup>
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" />
              <Avatar src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face" />
              <Avatar initials="+10K" />
            </AvatarGroup>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="u-py-8 u-bg-secondary-subtle">
        <Container>
          <SectionIntro
            alignment="center"
            title="Frequently Asked Questions"
            text="Everything you need to know about our services"
          />
          <Row className="u-justify-content-center">
            <GridCol xs={12} md={8}>
              {faqs.map((faq, index) => (
                <Accordion key={index} title={faq.title}>
                  {faq.children}
                </Accordion>
              ))}
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Emergency */}
      <section className="u-py-8">
        <Container>
          <Callout variant="error">
            <Row className="u-align-items-center">
              <GridCol xs={12} md={8} className="u-mb-4 u-mb-md-0">
                <h3 className="u-mb-2">Medical Emergency?</h3>
                <p className="u-mb-0">
                  If you are experiencing a medical emergency, please call 911 or go to your nearest
                  emergency room immediately.
                </p>
              </GridCol>
              <GridCol xs={12} md={4} className="u-text-md-end">
                <Button variant="danger" size="lg">
                  Emergency Hotline: (555) 911-0000
                </Button>
              </GridCol>
            </Row>
          </Callout>
        </Container>
      </section>

      {/* Footer */}
      <footer className="u-bg-dark-subtle u-text-light-subtle u-py-6">
        <Container>
          <Row>
            <GridCol xs={12} md={4} className="u-mb-4">
              <div className="u-mb-3">
                <AtomixLogo />
              </div>
              <p className=" u-mb-3">
                Providing quality healthcare services with compassion and expertise.
              </p>
              <div className="u-d-flex u-gap-2">
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
              <h5 className="u-mb-3">Services</h5>
              <ul className="u-list-unstyled ">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Medical Consultation
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Cardiology
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Pediatrics
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Neurology
                  </a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={6} md={2} className="u-mb-4">
              <h5 className="u-mb-3">Quick Links</h5>
              <ul className="u-list-unstyled ">
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    About Us
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Our Doctors
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Patient Portal
                  </a>
                </li>
                <li className="u-mb-2">
                  <a href="#" className="u-link-light">
                    Contact
                  </a>
                </li>
              </ul>
            </GridCol>
            <GridCol xs={12} md={4} className="u-mb-4">
              <h5 className="u-mb-3">Contact Info</h5>
              <ul className="u-list-unstyled ">
                <li className="u-mb-2">
                  <Icon name="MapPin" className="u-me-2" />
                  123 Medical Drive, Health City, HC 12345
                </li>
                <li className="u-mb-2">
                  <Icon name="Phone" className="u-me-2" />
                  (555) 123-4567
                </li>
                <li className="u-mb-2">
                  <Icon name="Envelope" className="u-me-2" />
                  info@healthcare.com
                </li>
                <li className="u-mb-2">
                  <Icon name="Clock" className="u-me-2" />
                  Mon-Fri: 8:00 AM - 6:00 PM
                </li>
              </ul>
            </GridCol>
          </Row>
          <Row className="u-pt-4 u-mt-4 u-border-top u-border-dark-subtle">
            <GridCol xs={12} className="u-text-center ">
              <p className="u-mb-0">© 2023 Healthcare Clinic. All rights reserved.</p>
            </GridCol>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Healthcare;
