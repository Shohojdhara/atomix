import React from 'react';
import { Accordion } from '../../components/Accordion/Accordion';
import { Button } from '../../components/Button/Button';

interface ComponentShowcaseProps {
  component: 'Accordion' | 'Button';
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
      
      default:
        return <p>Component not found</p>;
    }
  };

  return (
    <div className="c-card">
      <div className="c-card__body">
        <p className="c-card__text u-mb-4">{description}</p>
        
        <div className="u-bg-white u-p-4 u-border u-border-radius">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}; 