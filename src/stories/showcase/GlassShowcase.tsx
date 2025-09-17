import React, { useRef } from 'react';
import { AtomixGlass, Button, Card, Icon, SectionIntro, Hero } from '../../components';
import { Container, Row, GridCol } from '../../layouts';

const GlassShowcase: React.FC = () => {
  const features = [
    {
      icon: <Icon name="Layout" size={24} />,
      title: 'Modern Glass UI',
      description: 'Stunning frosted glass effects with chromatic aberration and displacement',
    },
    {
      icon: <Icon name="Sparkle" size={24} />,
      title: 'Interactive Elements',
      description: 'Dynamic hover effects and interactive components with tactile feedback',
    },
    {
      icon: <Icon name="Palette" size={24} />,
      title: 'Themeable',
      description: 'Adapts to light and dark modes with consistent design language',
    },
    {
      icon: <Icon name="Lightning" size={24} />,
      title: 'Performant',
      description: 'Optimized rendering with hardware-accelerated effects',
    },
  ];

  // Create a ref for the mouse container
  const mouseContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mouseContainerRef}
      className="u-bg-dark"
      style={{
        minHeight: '100vh',
        // backgroundImage: 'url(https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section with Glass Effect */}
      <Hero
        title="Introducing Atomix Glass Components"
        text="Elevate your UI design with a frosted glass effect for your next project"
        actions={<Button variant="primary">Get Started</Button>}
        backgroundImageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop"
        alignment="center"
        contentWidth='700px'
        glass={{
          displacementScale: 100,
          aberrationIntensity: 2,
          blurAmount: 3,
          saturation: 180,
          cornerRadius: 20,
          overLight: false,
          mode: 'standard',
          showBorderEffects: true,
          showHoverEffects: true,
          mouseContainer: mouseContainerRef,
        }}
      ></Hero>
    </div>
  );
};

export default GlassShowcase;
