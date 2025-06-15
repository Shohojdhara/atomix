// Example: Basic CSS Import
import React from 'react';
import '@shohojdhara/atomix/css';
import { Button, Card, Input } from '@shohojdhara/atomix';

export default function BasicCSSExample() {
  return (
    <div className="o-container">
      <div className="o-grid">
        <div className="o-grid__col o-grid__col--md-6">
          <Card>
            <div className="c-card__header">
              <h3 className="c-card__title">Basic CSS Import</h3>
            </div>
            <div className="c-card__body">
              <p className="c-card__text">
                This example uses the traditional CSS import approach with Atomix classes.
              </p>
              <div className="u-mt-3">
                <Input 
                  placeholder="Enter your name"
                  className="u-mb-2"
                />
                <Button variant="primary" className="c-btn--sm">
                  Submit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}