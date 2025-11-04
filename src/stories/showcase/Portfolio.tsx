import React, { useState } from 'react';

// Importing components from the library
import {
  Accordion,
  AtomixLogo,
  AtomixGlass,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Callout,
  Card,
  Checkbox,
  ColorModeToggle,
  Dropdown,
  FormGroup,
  Hero,
  Icon,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  Rating,
  SectionIntro,
  Select,
  Steps,
  Tab,
  Testimonial,
  TestimonialProps,
  Textarea,
  Toggle,
  Tooltip,
} from '../../components';

// Importing layout components
import { Container, Grid, GridCol } from '../../layouts';

const Portfolio: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const [isToggled, setIsToggled] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Testimonial data
  const testimonials: TestimonialProps[] = [
    {
      quote:
        'Atomix has completely transformed how our team builds UI components. The consistency and accessibility are outstanding!',
      author: {
        name: 'Jane Cooper',
        role: 'Senior UI Engineer',
        avatarSrc:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      },
    },
    {
      quote:
        'The comprehensive component library and design tokens have significantly reduced our development time while improving design consistency.',
      author: {
        name: 'John Doe',
        role: 'Product Designer',
        avatarSrc:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      },
    },
  ];

  // Skills data
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Accessibility', level: 80 },
  ];

  // Projects data
  const projects = [
    {
      title: 'E-commerce Dashboard',
      description:
        'A comprehensive dashboard for e-commerce analytics with real-time data visualization.',
      tags: ['React', 'D3.js', 'SCSS'],
    },
    {
      title: 'Mobile Banking App',
      description: 'A secure mobile banking application with biometric authentication.',
      tags: ['React Native', 'TypeScript', 'Redux'],
    },
    {
      title: 'Design System',
      description: 'Created a design system used across multiple products with over 50 components.',
      tags: ['Storybook', 'Figma', 'CSS'],
    },
  ];

  // Team members
  const teamMembers = [
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      alt: 'Jane Cooper',
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      alt: 'John Doe',
    },
    {
      src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80',
      alt: 'Robert Fox',
    },
  ];

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <div className={`min-vh-100 ${darkMode ? 'dark' : ''}`}>
      {/* Header/Navigation */}
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

      {/* Breadcrumb */}
      <Container>
        <Breadcrumb
          className="u-mb-0"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Portfolio', href: '#' },
          ]}
        />
      </Container>

      <main>
        {/* Hero Section */}
        <Hero
          title="Building Digital Experiences with Atomix"
          backgroundImageSrc="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop"
          actions={
            <React.Fragment>
              <Button size="large">View Projects</Button>
              <Button size="large" variant="secondary">
                Contact Me
              </Button>
            </React.Fragment>
          }
        />

        {/* Section Intro */}
        <SectionIntro title="Showcasing Atomix Components" alignment="center" className="u-mb-12" />

        {/* Stats Section */}
        <section className="u-my-12">
          <Container>
            <Grid>
              <GridCol md={3}>
                <Card className="u-text-center u-h-100">
                  <div className="u-text-3xl u-font-bold u-text-primary">40+</div>
                  <div className="u-mt-2">Components</div>
                </Card>
              </GridCol>
              <GridCol md={3}>
                <Card className="u-text-center u-h-100">
                  <div className="u-text-3xl u-font-bold u-text-primary">10+</div>
                  <div className="u-mt-2">Projects</div>
                </Card>
              </GridCol>
              <GridCol md={3}>
                <Card className="u-text-center u-h-100">
                  <div className="u-text-3xl u-font-bold u-text-primary">100%</div>
                  <div className="u-mt-2">Accessible</div>
                </Card>
              </GridCol>
              <GridCol md={3}>
                <Card className="u-text-center u-h-100">
                  <div className="u-text-3xl u-font-bold u-text-primary">5x</div>
                  <div className="u-mt-2">Faster Development</div>
                </Card>
              </GridCol>
            </Grid>
          </Container>
        </section>

        {/* About Section */}
        <section className="u-my-12 u-bg-gray-50 dark:u-bg-gray-800">
          <Container>
            <Grid>
              <GridCol lg={6}>
                <div className="u-py-8">
                  <h2 className="u-text-3xl u-font-bold u-mb-4">About This Showcase</h2>
                  <p className="u-mb-4 u-text-gray-700 dark:u-text-gray-300">
                    This portfolio demonstrates the capabilities of the Atomix design system,
                    showcasing how to build modern, accessible, and responsive user interfaces using
                    a comprehensive library of production-ready components.
                  </p>
                  <p className="u-mb-6 u-text-gray-700 dark:u-text-gray-300">
                    Atomix provides over 40 components with consistent design language, built-in
                    accessibility, dark mode support, and responsive behavior out of the box.
                  </p>

                  <div className="u-mb-6">
                    <h3 className="u-text-xl u-font-semibold u-mb-3">Skills & Expertise</h3>
                    {skills.map((skill, index) => (
                      <div key={index} className="u-mb-3">
                        <div className="u-d-flex u-justify-between u-mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))}
                  </div>

                  <Button>Download Resume</Button>
                </div>
              </GridCol>

              <GridCol lg={6}>
                <div className="u-py-8">
                  <Card>
                    <div className="u-d-flex u-flex-column u-h-100">
                      <div className="u-flex-grow-1">
                        <h3 className="u-text-xl u-font-semibold u-mb-4">Component Showcase</h3>

                        <div className="u-mb-4">
                          <div className="u-d-flex u-gap-2 u-mb-3">
                            <Badge label="Primary" variant="primary" />
                            <Badge label="Secondary" variant="secondary" />
                            <Badge label="Success" variant="success" />
                            <Badge label="Warning" variant="warning" />
                          </div>

                          <div className="u-d-flex u-gap-2 u-mb-3">
                            <Button size="small" label="Small" />
                            <Button label="Medium" />
                            <Button size="large" label="Large" />
                          </div>

                          <div className="u-d-flex u-gap-2 u-mb-3">
                            <Button variant="secondary" label="Secondary" />
                            <Button variant="ghost" label="Ghost" />
                            <Button variant="link" label="Link" />
                          </div>

                          <div className="u-mb-3">
                            <Rating value={4} />
                          </div>

                          <div className="u-mb-3">
                            <Toggle
                              initialOn={isToggled}
                              onToggleOn={() => setIsToggled(true)}
                              onToggleOff={() => setIsToggled(false)}
                            />
                            <span className="u-ml-2">Toggle Component</span>
                          </div>

                          <div className="u-mb-3">
                            <Tooltip content="This is a tooltip">
                              <Button variant="secondary" label="Hover for Tooltip" />
                            </Tooltip>
                          </div>
                        </div>
                      </div>

                      <div className="u-pt-4 u-border-t u-border-gray-200 dark:u-border-gray-700">
                        <div className="u-d-flex u-justify-between u-items-center">
                          <div className="u-d-flex u-items-center u-gap-2">
                            <Avatar
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
                              alt="User"
                            />
                            <div>
                              <div className="u-font-semibold">Jane Cooper</div>
                              <div className="u-text-sm u-text-gray-600 dark:u-text-gray-400">
                                UI Engineer
                              </div>
                            </div>
                          </div>
                          <AvatarGroup>
                            {teamMembers.map((member, index) => (
                              <Avatar key={index} src={member.src} alt={member.alt} />
                            ))}
                          </AvatarGroup>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </GridCol>
            </Grid>
          </Container>
        </section>

        {/* Projects Section */}
        <section className="u-my-12">
          <Container>
            <h2 className="u-text-3xl u-font-bold u-text-center u-mb-2">Featured Projects</h2>
            <p className="u-text-center u-text-gray-600 dark:u-text-gray-400 u-mb-8">
              A selection of projects showcasing the capabilities of the Atomix design system
            </p>

            <Grid>
              <GridCol lg={12}>
                <Grid>
                  {projects.map((project, index) => (
                    <GridCol md={6} lg={4} key={index}>
                      <Card>
                        <div className="u-mb-4 u-h-48 u-bg-gray-200 dark:u-bg-gray-700 u-rounded u-d-flex u-items-center u-justify-center">
                          <Icon name="FigmaLogo" size={48} />
                        </div>
                        <h3 className="u-text-xl u-font-semibold u-mb-2">{project.title}</h3>
                        <p className="u-text-gray-700 dark:u-text-gray-300 u-mb-4">
                          {project.description}
                        </p>
                        <div className="u-d-flex u-gap-2 u-flex-wrap u-mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} label={tag} variant="secondary" />
                          ))}
                        </div>
                        <div className="u-d-flex u-gap-2">
                          <Button size="small" label="View Details" />
                          <Button size="small" variant="secondary" label="Source Code" />
                        </div>
                      </Card>
                    </GridCol>
                  ))}
                </Grid>
              </GridCol>
            </Grid>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="u-my-12">
          <Container>
            <h2 className="u-text-3xl u-font-bold u-text-center u-mb-2">Client Testimonials</h2>
            <p className="u-text-center u-text-gray-600 dark:u-text-gray-400 u-mb-8">
              What people say about working with Atomix components
            </p>

            <Grid>
              {testimonials.map((testimonial, index) => (
                <GridCol md={6} key={index}>
                  <Testimonial {...testimonial} />
                </GridCol>
              ))}
            </Grid>
          </Container>
        </section>

        {/* Interactive Components */}
        <section className="u-my-12">
          <Container>
            <h2 className="u-text-3xl u-font-bold u-text-center u-mb-2">Interactive Components</h2>
            <p className="u-text-center u-text-gray-600 dark:u-text-gray-400 u-mb-8">
              Demonstrating various interactive components available in Atomix
            </p>

            <Grid>
              <GridCol>
                <Card>
                  <h3 className="u-text-xl u-font-semibold u-mb-4">Form Components</h3>

                  <div className="u-mb-4">
                    <FormGroup label="Name">
                      <Input placeholder="Enter your name" />
                    </FormGroup>

                    <FormGroup label="Email">
                      <Input type="email" placeholder="Enter your email" />
                    </FormGroup>

                    <FormGroup label="Category">
                      <Select
                        options={[
                          { value: '', label: 'Select a category' },
                          { value: 'ui', label: 'UI Design' },
                          { value: 'dev', label: 'Development' },
                          { value: 'consulting', label: 'Consulting' },
                        ]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Checkbox />
                      <span className="u-ml-2">Subscribe to newsletter</span>
                    </FormGroup>

                    <FormGroup>
                      <Radio name="option" value="1" />
                      <span className="u-ml-2">Option 1</span>
                      <Radio name="option" value="2" className="u-ml-3" />
                      <span className="u-ml-2">Option 2</span>
                    </FormGroup>

                    <FormGroup label="Message">
                      <Textarea placeholder="Enter your message" rows={4} />
                    </FormGroup>

                    <div className="u-d-flex u-gap-2 u-mt-4">
                      <Button label="Submit" />
                      <Button variant="secondary" label="Reset" />
                    </div>
                  </div>
                </Card>
              </GridCol>

              <GridCol lg={6}>
                <Card>
                  <h3 className="u-text-xl u-font-semibold u-mb-4">Navigation & Utilities</h3>

                  <div className="u-mb-6">
                    <h4 className="u-font-semibold u-mb-2">Tabs</h4>
                    <Tab
                      activeIndex={0}
                      items={[
                        { label: 'Tab 1', content: 'Content for Tab 1' },
                        { label: 'Tab 2', content: 'Content for Tab 2' },
                        { label: 'Tab 3', content: 'Content for Tab 3' },
                      ]}
                    />
                  </div>

                  <div className="u-mb-6">
                    <h4 className="u-font-semibold u-mb-2">Accordion</h4>
                    <Accordion title="What is Atomix?" className="u-mb-2">
                      Atomix is a modern design system and component library for building beautiful
                      user interfaces.
                    </Accordion>
                    <Accordion title="How many components does it have?" className="u-mb-2">
                      Atomix provides over 40 production-ready components.
                    </Accordion>
                    <Accordion title="Is it accessible?" className="u-mb-2">
                      Yes, all components follow WCAG 2.1 AA accessibility standards.
                    </Accordion>
                  </div>

                  <div className="u-mb-6">
                    <h4 className="u-font-semibold u-mb-2">Steps</h4>
                    <Steps
                      activeIndex={currentStep - 1}
                      items={[
                        { number: '1', text: 'Design' },
                        { number: '2', text: 'Develop' },
                        { number: '3', text: 'Test' },
                        { number: '4', text: 'Deploy' },
                      ]}
                    />
                    <div className="u-d-flex u-gap-2 u-mt-3">
                      <Button
                        size="small"
                        label="Previous"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      />
                      <Button
                        size="small"
                        label="Next"
                        onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="u-font-semibold u-mb-2">Other Components</h4>
                    <div className="u-d-flex u-gap-2 u-flex-wrap">
                      <Button label="Open Modal" onClick={() => setIsModalOpen(true)} />
                      <Button label="Photo Viewer" onClick={() => setIsPhotoViewerOpen(true)} />
                      <Button label="Messages" onClick={() => setIsMessagesOpen(true)} />
                      <Dropdown
                        menu={
                          <div>
                            <Button variant="link" label="Option 1" onClick={() => {}} />
                            <Button variant="link" label="Option 2" onClick={() => {}} />
                            <Button variant="link" label="Option 3" onClick={() => {}} />
                          </div>
                        }
                      >
                        <Button label="Dropdown" />
                      </Dropdown>
                    </div>
                  </div>
                </Card>
              </GridCol>
            </Grid>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="u-my-12">
          <Container>
            <Callout
              title="Ready to start your project?"
              actions={
                <React.Fragment>
                  <Button size="large" label="Contact Me" />
                  <Button size="large" variant="secondary" label="View Documentation" />
                </React.Fragment>
              }
            />
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="u-bg-gray-800  u-py-12" role="contentinfo">
        <Container>
          <Grid>
            <GridCol md={4}>
              <div className="u-mb-6">
                <AtomixLogo className="u-mb-4" />
                <p className="u-text-secondary-emphasis">
                  A modern design system and component library for building beautiful user
                  interfaces.
                </p>
              </div>
            </GridCol>

            <GridCol md={2}>
              <h4 className="u-font-semibold u-mb-4">Components</h4>
              <List items={['Buttons', 'Cards', 'Forms', 'Navigation']} />
            </GridCol>

            <GridCol md={2}>
              <h4 className="u-font-semibold u-mb-4">Resources</h4>
              <List items={['Documentation', 'Storybook', 'GitHub', 'Figma']} />
            </GridCol>

            <GridCol md={4}>
              <h4 className="u-font-semibold u-mb-4">Subscribe</h4>
              <p className="u-text-gray-400 u-mb-4">
                Stay updated with the latest releases and features.
              </p>
              <div className="u-d-flex">
                <Input placeholder="Your email" className="u-flex-grow-1" />
                <Button className="u-ml-2" label="Subscribe" />
              </div>
            </GridCol>
          </Grid>

          <div className="u-border-t u-border-gray-700 u-mt-8 u-pt-8 u-text-center u-text-gray-400">
            <p>© {new Date().getFullYear()} Atomix Design System. All rights reserved.</p>
          </div>
        </Container>
      </footer>

      {/* Modals and Overlays */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Sample Modal">
        <p>This is a demonstration of the Modal component from Atomix.</p>
        <div className="u-mt-4">
          <Button label="Close" onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;
