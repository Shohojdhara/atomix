// Example: CSS Modules Integration
import React from 'react';
import '@shohojdhara/atomix/css';
import { Button, Card, Input } from '@shohojdhara/atomix';
import styles from './css-modules-example.module.css';

const CSSModulesExample: React.FC = () => {
  return (
    <div className={`o-container ${styles.container}`}>
      <div className="o-grid">
        <div className="o-grid__col o-grid__col--md-8 o-grid__col--lg-6">
          
          <div className={styles.header}>
            <h1 className={styles.title}>CSS Modules Example</h1>
            <p className={styles.subtitle}>
              Combining Atomix classes with CSS Modules for scoped styling
            </p>
          </div>
          
          <Card className={styles.customCard}>
            <div className="c-card__header">
              <h3 className="c-card__title">Enhanced Card</h3>
            </div>
            <div className="c-card__body">
              <p className="c-card__text">
                This card combines Atomix base styles with custom CSS Modules.
              </p>
              
              <div className={styles.formGroup}>
                <Input 
                  placeholder="Your email address"
                  className={styles.customInput}
                />
                <Input 
                  placeholder="Your message"
                  className={styles.customTextarea}
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <Button 
                  variant="primary" 
                  className={styles.primaryButton}
                >
                  Send Message
                </Button>
                <Button 
                  variant="secondary"
                  className={styles.secondaryButton}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
          
          <div className={styles.featureGrid}>
            <div className={`c-card ${styles.featureCard}`}>
              <div className="c-card__body">
                <div className={styles.featureIcon}>🎨</div>
                <h4 className={styles.featureTitle}>Custom Styling</h4>
                <p className={styles.featureText}>
                  Scoped CSS with modules prevents style conflicts
                </p>
              </div>
            </div>
            
            <div className={`c-card ${styles.featureCard}`}>
              <div className="c-card__body">
                <div className={styles.featureIcon}>⚡</div>
                <h4 className={styles.featureTitle}>Performance</h4>
                <p className={styles.featureText}>
                  Optimized CSS loading and tree-shaking
                </p>
              </div>
            </div>
            
            <div className={`c-card ${styles.featureCard}`}>
              <div className="c-card__body">
                <div className={styles.featureIcon}>🔧</div>
                <h4 className={styles.featureTitle}>Maintainable</h4>
                <p className={styles.featureText}>
                  Easy to maintain and update styles
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CSSModulesExample;