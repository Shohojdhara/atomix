import React from 'react';

const GapUtilitiesDemo: React.FC = () => {
  return (
    <div className="demo-container">
      <h1>Gap Utilities Examples</h1>
      
      <div className="demo-box">
        <h2>Basic Grid with Gap</h2>
        <div className="u-grid u-gap-4">
          <div className="grid-item">Item 1</div>
          <div className="grid-item">Item 2</div>
          <div className="grid-item">Item 3</div>
          <div className="grid-item">Item 4</div>
        </div>
      </div>
      
      <div className="demo-box">
        <h2>Flex Container with Gap</h2>
        <div className="u-flex u-gap-6">
          <div className="flex-item">Button 1</div>
          <div className="flex-item">Button 2</div>
          <div className="flex-item">Button 3</div>
        </div>
      </div>
      
      <div className="demo-box">
        <h2>Responsive Gaps</h2>
        <div className="u-grid u-gap-2 u-md-gap-4 u-lg-gap-8">
          <div className="grid-item">Item 1</div>
          <div className="grid-item">Item 2</div>
          <div className="grid-item">Item 3</div>
          <div className="grid-item">Item 4</div>
        </div>
      </div>
      
      <div className="demo-box">
        <h2>Separate Row and Column Gaps</h2>
        <div className="u-grid u-row-gap-4 u-column-gap-8">
          <div className="grid-item">Item 1</div>
          <div className="grid-item">Item 2</div>
          <div className="grid-item">Item 3</div>
          <div className="grid-item">Item 4</div>
        </div>
      </div>
      
      <div className="demo-box">
        <h2>Different Gap Sizes</h2>
        <div className="u-flex u-flex-column u-gap-1">
          <div className="u-grid u-gap-1">
            <div className="grid-item">Gap 1</div>
            <div className="grid-item">Gap 1</div>
            <div className="grid-item">Gap 1</div>
          </div>
          <div className="u-grid u-gap-3">
            <div className="grid-item">Gap 3</div>
            <div className="grid-item">Gap 3</div>
            <div className="grid-item">Gap 3</div>
          </div>
          <div className="u-grid u-gap-6">
            <div className="grid-item">Gap 6</div>
            <div className="grid-item">Gap 6</div>
            <div className="grid-item">Gap 6</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .demo-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }
        
        .demo-box {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        
        .grid-item {
          background: #e0e7ff;
          border: 1px solid #c7d2fe;
          padding: 1rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.25rem;
        }
        
        .flex-item {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 1rem 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default GapUtilitiesDemo;