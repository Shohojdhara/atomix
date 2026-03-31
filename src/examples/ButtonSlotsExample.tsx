import React, { useState } from 'react';
import { Button } from '../components/Button/Button';

// Custom components to use in slots
const CustomButtonWrapper = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`custom-button-wrapper ${className}`}
    style={{
      background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      padding: '12px 24px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    }}
    {...props}
  >
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        opacity: 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}
    />
  </button>
));

const CustomSpinner = ({ size, variant }: { size: string; variant: string }) => (
  <div
    style={{
      display: 'inline-block',
      width: size === 'sm' ? '16px' : '24px',
      height: size === 'sm' ? '16px' : '24px',
      border: `2px solid ${variant === 'error' ? '#ff4757' : '#fff'}`,
      borderTop: `2px solid transparent`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  >
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const ButtonSlotsExample = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Button Slot System Examples</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Default Button</h3>
        <Button label="Default Button" onClick={() => alert('Clicked!')} />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Root Slot (using component prop)</h3>
        <Button 
          label="Custom Styled Button" 
          onClick={() => alert('Custom button clicked!')}
          slots={{
            root: { 
              component: CustomButtonWrapper 
            }
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Label Slot (using render prop)</h3>
        <Button 
          label="Styled Label Button" 
          onClick={() => alert('Styled label clicked!')}
          slots={{
            label: {
              render: (props) => (
                <span 
                  style={{ 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#ffcc00'
                  }}
                >
                  {props.children}
                </span>
              )
            }
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Spinner Slot (using component prop)</h3>
        <Button 
          label="Loading Button" 
          loading={isLoading}
          onClick={handleClick}
          slots={{
            spinner: { 
              component: CustomSpinner 
            }
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>All Slots Customized</h3>
        <Button 
          label="Fully Customized Button" 
          icon="home"
          loading={isLoading}
          onClick={handleClick}
          slots={{
            root: {
              component: CustomButtonWrapper
            },
            label: {
              render: (props) => (
                <span 
                  style={{ 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#ffcc00'
                  }}
                >
                  {props.children}
                </span>
              )
            },
            spinner: { 
              component: CustomSpinner 
            },
            icon: {
              render: (props) => (
                <span 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '8px'
                  }}
                >
                  🏠
                </span>
              )
            }
          }}
        />
      </div>
    </div>
  );
};

export default ButtonSlotsExample;