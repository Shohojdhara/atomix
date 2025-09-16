import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AtomixGlass from '../../components/AtomixGlass/AtomixGlass';

const meta: Meta = {
  title: 'Showcase/AtomixGlass',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Showcase of AtomixGlass component in real-world application contexts.'
      }
    },
  },
};

export default meta;
type Story = StoryObj;

// Dashboard showcase with multiple glass components
export const Dashboard: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeCard, setActiveCard] = useState<number | null>(null);
    
    const handleCardHover = (index: number) => {
      setActiveCard(index);
    };
    
    const handleCardLeave = () => {
      setActiveCard(null);
    };
    
    const stats = [
      { title: 'Total Users', value: '24,521', change: '+12%', icon: '👥' },
      { title: 'Revenue', value: '$45,290', change: '+8%', icon: '💰' },
      { title: 'Active Projects', value: '32', change: '+3', icon: '📊' },
      { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: '📈' },
    ];
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)',
        padding: '40px 20px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <AtomixGlass
              displacementScale={15}
              blurAmount={8}
              saturation={150}
              aberrationIntensity={1}
              cornerRadius={15}
              showBorderEffects={true}
              showHoverEffects={false}
            >
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
                  Analytics Dashboard
                </h1>
              </div>
            </AtomixGlass>
          </header>
          
          <div className="o-grid">
            {stats.map((stat, index) => (
              <div key={index} className="o-grid__col o-grid__col--12 o-grid__col--6@sm o-grid__col--3@lg">
                <AtomixGlass
                  displacementScale={20}
                  blurAmount={10}
                  saturation={160}
                  aberrationIntensity={1.5}
                  cornerRadius={15}
                  showBorderEffects={true}
                  showHoverEffects={true}
                  onClick={() => activeCard === index ? handleCardLeave() : handleCardHover(index)}
                  style={{ height: '100%', minHeight: '150px' }}
                >
                  <div style={{ padding: '20px', height: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <h3 style={{ margin: '0', color: 'white', fontSize: '1.2rem' }}>{stat.title}</h3>
                      <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
                      {stat.value}
                    </div>
                    <div style={{ 
                      color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                      fontWeight: '500'
                    }}>
                      {stat.change} from last month
                    </div>
                  </div>
                </AtomixGlass>
              </div>
            ))}
          </div>
          
          <div className="o-grid" style={{ marginTop: '30px' }}>
            <div className="o-grid__col o-grid__col--12 o-grid__col--8@md">
              <AtomixGlass
                displacementScale={20}
                blurAmount={10}
                saturation={160}
                aberrationIntensity={1.5}
                cornerRadius={15}
                showBorderEffects={true}
                showHoverEffects={true}
                style={{ height: '100%', minHeight: '400px' }}
              >
                <div style={{ padding: '25px', height: '100%' }}>
                  <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Revenue Overview</h2>
                  <div style={{ 
                    height: 'calc(100% - 60px)', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ 
                      height: '200px', 
                      display: 'flex', 
                      alignItems: 'flex-end',
                      gap: '15px',
                      padding: '0 10px'
                    }}>
                      {[65, 85, 40, 75, 90, 50, 70].map((height, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            height: `${height}%`, 
                            flex: 1, 
                            background: 'linear-gradient(180deg, #4f46e5 0%, #7e22ce 100%)', 
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.3s ease'
                          }} 
                        />
                      ))}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      color: 'white',
                      marginTop: '15px'
                    }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center' }}>{day}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </AtomixGlass>
            </div>
            
            <div className="o-grid__col o-grid__col--12 o-grid__col--4@md">
              <AtomixGlass
                displacementScale={20}
                blurAmount={10}
                saturation={160}
                aberrationIntensity={1.5}
                cornerRadius={15}
                showBorderEffects={true}
                showHoverEffects={true}
                style={{ height: '100%', minHeight: '400px' }}
              >
                <div style={{ padding: '25px', height: '100%' }}>
                  <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Top Products</h2>
                  <div style={{ height: 'calc(100% - 60px)' }}>
                    {[
                      { name: 'Premium Plan', sales: '$12,430', percent: 35 },
                      { name: 'Basic Plan', sales: '$8,760', percent: 25 },
                      { name: 'Enterprise Plan', sales: '$6,120', percent: 18 },
                      { name: 'Custom Solutions', sales: '$4,320', percent: 12 },
                      { name: 'Add-ons', sales: '$3,540', percent: 10 },
                    ].map((product, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          marginBottom: '15px',
                          padding: '10px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          marginBottom: '5px',
                          color: 'white'
                        }}>
                          <div>{product.name}</div>
                          <div>{product.sales}</div>
                        </div>
                        <div style={{ 
                          height: '6px', 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${product.percent}%`, 
                            background: 'linear-gradient(90deg, #4f46e5 0%, #7e22ce 100%)',
                            borderRadius: '3px'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AtomixGlass>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Landing page showcase
export const LandingPage: Story = {
  render: () => {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '40px 20px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <AtomixGlass
              displacementScale={15}
              blurAmount={8}
              saturation={150}
              aberrationIntensity={1}
              cornerRadius={30}
              showBorderEffects={true}
              showHoverEffects={true}
            >
              <div style={{ padding: '15px 25px' }}>
                <h2 style={{ margin: '0', color: 'white', fontSize: '1.5rem' }}>Atomix Glass</h2>
              </div>
            </AtomixGlass>
            
            <AtomixGlass
              displacementScale={15}
              blurAmount={8}
              saturation={150}
              aberrationIntensity={1}
              cornerRadius={30}
              showBorderEffects={true}
              showHoverEffects={true}
            >
              <div style={{ 
                padding: '15px 25px',
                display: 'flex',
                gap: '20px'
              }}>
                {['Features', 'Pricing', 'Documentation', 'Contact'].map((item, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      fontWeight: i === 0 ? 'bold' : 'normal'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </AtomixGlass>
          </header>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <AtomixGlass
              displacementScale={25}
              blurAmount={12}
              saturation={180}
              aberrationIntensity={2}
              cornerRadius={30}
              showBorderEffects={true}
              showHoverEffects={true}
              style={{ maxWidth: '800px' }}
            >
              <div style={{ padding: '60px 40px' }}>
                <h1 style={{ 
                  margin: '0 0 20px 0', 
                  fontSize: '3.5rem', 
                  fontWeight: 'bold', 
                  color: 'white',
                  lineHeight: '1.2'
                }}>
                  Modern Glass UI for Your Next Project
                </h1>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '40px',
                  lineHeight: '1.6'
                }}>
                  Create stunning interfaces with the AtomixGlass component. Perfect for modern, sleek designs that stand out with beautiful glass morphism effects.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                  <button className="c-button c-button--primary c-button--lg">
                    Get Started
                  </button>
                  <button className="c-button c-button--outline-light c-button--lg">
                    View Examples
                  </button>
                </div>
              </div>
            </AtomixGlass>
          </div>
          
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              textAlign: 'center', 
              color: 'white', 
              fontSize: '2rem',
              marginBottom: '40px'
            }}>
              Key Features
            </h2>
            
            <div className="o-grid">
              {[
                {
                  title: 'Customizable Effects',
                  description: 'Adjust displacement, blur, saturation, and aberration to create unique glass effects.',
                  icon: '✨'
                },
                {
                  title: 'Interactive Hover',
                  description: 'Beautiful hover and active states that respond to user interaction.',
                  icon: '👆'
                },
                {
                  title: 'Multiple Modes',
                  description: 'Choose from standard, polar, prominent, or shader modes for different visual styles.',
                  icon: '🎨'
                },
                {
                  title: 'Responsive Design',
                  description: 'Fully responsive and works seamlessly across all device sizes.',
                  icon: '📱'
                },
                {
                  title: 'Accessibility',
                  description: 'Built with accessibility in mind, following WCAG 2.1 AA guidelines.',
                  icon: '♿'
                },
                {
                  title: 'Theme Support',
                  description: 'Adapts to different themes and color schemes automatically.',
                  icon: '🌓'
                },
              ].map((feature, i) => (
                <div key={i} className="o-grid__col o-grid__col--12 o-grid__col--6@sm o-grid__col--4@md">
                  <AtomixGlass
                    displacementScale={20}
                    blurAmount={10}
                    saturation={160}
                    aberrationIntensity={1.5}
                    cornerRadius={15}
                    showBorderEffects={true}
                    showHoverEffects={true}
                    style={{ height: '100%', minHeight: '200px' }}
                  >
                    <div style={{ padding: '30px', height: '100%' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
                      <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>{feature.title}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                        {feature.description}
                      </p>
                    </div>
                  </AtomixGlass>
                </div>
              ))}
            </div>
          </div>
          
          <footer>
            <AtomixGlass
              displacementScale={15}
              blurAmount={8}
              saturation={150}
              aberrationIntensity={1}
              cornerRadius={15}
              showBorderEffects={true}
              showHoverEffects={false}
            >
              <div style={{ 
                padding: '30px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={{ color: 'white' }}>
                  © 2023 Atomix Glass. All rights reserved.
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '20px'
                }}>
                  {['Twitter', 'GitHub', 'Discord', 'Documentation'].map((item, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        textDecoration: 'none'
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </AtomixGlass>
          </footer>
        </div>
      </div>
    );
  },
};