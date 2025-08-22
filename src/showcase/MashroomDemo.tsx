import React from 'react';

const MashroomDemo: React.FC = () => {
  return (
    <div className="mashroom-demo">
      <header className="mashroom-demo__header">
        <h1>Mashroom Theme</h1>
        <p>Psychedelic mushroom-inspired theme with trippy visuals</p>
      </header>
      
      <section className="mashroom-demo__colors">
        <h2>Color Palette</h2>
        <div className="color-swatches">
          <div className="color-swatch" style={{ backgroundColor: '#8800ff' }}>
            <span>Primary</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: '#ff00aa' }}>
            <span>Pink</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: '#00ffec' }}>
            <span>Teal</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: '#ffff00' }}>
            <span>Yellow</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: '#0000ff' }}>
            <span>Blue</span>
          </div>
        </div>
      </section>
      
      <section className="mashroom-demo__components">
        <h2>Components</h2>
        <div className="component-examples">
          <button className="c-btn">Psychedelic Button</button>
          <div className="c-card">
            <div className="c-card__body">
              <h3 className="c-card__title">Magic Mushroom Card</h3>
              <p>This card demonstrates the psychedelic theme with trippy visuals.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mashroom-demo__features">
        <h2>Theme Features</h2>
        <ul>
          <li>Vibrant psychedelic color palette</li>
          <li>Trippy glowing effects</li>
          <li>Floating animations</li>
          <li>Psychedelic gradients</li>
          <li>Organic border-radius styles</li>
          <li>Unique box-shadow effects</li>
        </ul>
      </section>
    </div>
  );
};

export default MashroomDemo;