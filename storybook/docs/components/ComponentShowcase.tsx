import React from 'react';
import { Accordion } from '../../components/Accordion/Accordion';
import { Button } from '../../components/Button/Button';
import { Hero } from '../../components/Hero/Hero';

interface ComponentShowcaseProps {
  component: 'Accordion' | 'Button' | 'Hero';
  description: string;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ 
  component, 
  description 
}) => {
  const renderComponent = () => {
    switch (component) {
      case 'Accordion':
        return (
          <div className="u-d-flex u-flex-column u-gap-4">
            <Accordion title="Default Accordion" defaultOpen={true}>
              <p>This is the content of the accordion. It can contain any JSX content.</p>
            </Accordion>
            
            <Accordion title="Closed by Default">
              <p>This accordion starts closed and opens when clicked.</p>
            </Accordion>
            
            <Accordion title="Disabled Accordion" disabled={true}>
              <p>This accordion is disabled and cannot be interacted with.</p>
            </Accordion>
          </div>
        );
      
      case 'Button':
        return (
          <div className="u-d-flex u-flex-column u-gap-4">
            <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
              <Button label="Primary Button" variant="primary" />
              <Button label="Secondary Button" variant="secondary" />
              <Button label="Success Button" variant="success" />
            </div>
            
            <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
              <Button label="Outline Button" variant="outline-primary" />
              <Button label="Disabled Button" disabled />
              <Button label="Small Button" size="sm" />
            </div>
          </div>
        );
      
      case 'Hero':
        return (
          <div className="u-d-flex u-flex-column u-gap-5">
            {/* Left-aligned Hero */}
            <Hero 
              title="Hero with Left Alignment"
              subtitle="Hero Component"
              text="This hero component demonstrates left-aligned content with an image."
              alignment="left"
              imageSrc="https://picsum.photos/id/3/512/380"
              imageAlt="Sample image"
              actions={
                <div className="u-d-flex u-gap-3">
                  <Button label="Primary Action" variant="primary" />
                  <Button label="Secondary" variant="outline-secondary" />
                </div>
              }
              contentWidth="450px"
            />

            {/* Center-aligned Hero */}
            <Hero 
              title="Hero with Center Alignment"
              subtitle="Versatile Component"
              text="This hero component demonstrates center-aligned content and image below."
              alignment="center"
              imageSrc="https://picsum.photos/id/1/800/300"
              imageAlt="Sample image for center aligned hero"
              actions={
                <div className="u-d-flex u-gap-3">
                  <Button label="Learn More" variant="primary" />
                </div>
              }
            />

            {/* Hero with background image */}
            <Hero 
              title="Hero with Background"
              subtitle="Background Image"
              text="This hero component demonstrates a background image with overlay."
              alignment="right"
              backgroundImageSrc="https://picsum.photos/id/24/1200/600"
              showOverlay={true}
              actions={
                <div className="u-d-flex u-gap-3">
                  <Button label="Get Started" variant="primary" />
                  <Button label="Documentation" variant="outline-secondary" />
                </div>
              }
              contentWidth="400px"
            />
          </div>
        );
      
      default:
        return <p>Component not found</p>;
    }
  };

  return (
    <div className="c-card">
      <div className="c-card__body">
        <p className="c-card__text u-mb-4">{description}</p>
        
        <div className="u-bg-secondary-subtle u-p-4 u-border- u-border-2 u-border-primary-subtle u-rounded-2">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}; 