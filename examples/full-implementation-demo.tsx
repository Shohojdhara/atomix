/**
 * Full Implementation Demo
 * 
 * This example demonstrates all the implemented features from the Atomix configuration system:
 * - Phase 1: Foundation
 * - Phase 2: Interactive Effects
 * - Phase 3: Optimization
 * - Phase 4: Visual Polish
 */

import React, { useState, useEffect } from 'react';
import { 
  defineConfig, 
  validateConfiguration, 
  printConfigReport,
  createPerformanceMonitor,
  createResponsiveUtil,
  AtomixGlass,
  ThemeProvider,
  useTheme
} from '@shohojdhara/atomix';

// Define a comprehensive configuration using all implemented features
const fullConfig = defineConfig({
  prefix: 'demo',
  
  theme: {
    extend: {
      colors: {
        primary: { 
          main: '#7AFFD7',
          light: '#B3FFE8',
          dark: '#4DFFC4',
        },
        secondary: { main: '#6366f1' },
      },
      typography: {
        fontFamilies: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
  },
  
  // Phase 2: Interactive Effects Configuration
  interactiveEffects: {
    // Vortex & flow field effects configuration
    vortex: {
      enabled: true,
      strength: 0.8,
      radius: 120,
      decay: 0.75,
      curlNoise: true,
      velocityTracking: true,
    },
    
    // Advanced chromatic aberration modes
    chromaticAberration: {
      enabled: true,
      mode: 'hybrid',
      redShift: 0.03,
      greenShift: 0,
      blueShift: -0.03,
      edgeOnly: true,
      edgeThreshold: 0.6,
    },
    
    // Mouse interaction settings
    mouseInteraction: {
      sensitivity: 1.2,
      trailEffect: true,
      pressureSensitivity: true,
    },
    
    // Animation speed controls
    animationSpeed: {
      base: 1.0,
      timeMultiplier: 1.5,
    },
  },
  
  // Phase 3: Optimization Configuration
  optimization: {
    // Responsive breakpoint system
    responsive: {
      breakpoints: {
        mobile: '0px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1440px',
      },
      // Device-aware parameter scaling
      deviceScaling: {
        mobile: 0.4,
        tablet: 0.7,
        desktop: 1.0,
      },
    },
    
    // Performance monitoring
    performance: {
      enabled: true,
      fpsTarget: 60,
      autoScaling: true,
      monitorDashboard: true,
    },
    
    // Auto-scaling logic based on device capabilities
    autoScaling: {
      enabled: true,
      qualityThresholds: {
        lowEnd: 0.4,
        midRange: 0.7,
        highEnd: 1.0,
      },
    },
  },
  
  // Phase 4: Visual Polish Configuration
  visualPolish: {
    // Advanced border effects
    borders: {
      iridescentGlow: true,
      shimmerEffect: true,
      beveledEdges: true,
      pulsingGlow: false,
    },
    
    // Content-aware blur
    contentAwareBlur: {
      enabled: true,
      depthDetection: true,
      edgePreservation: true,
      variableRadius: true,
    },
    
    // Holographic effect modes
    holographicEffects: {
      enabled: false,  // Disabled by default for performance
      rainbowDiffraction: true,
      scanlineAnimation: true,
      gridOverlay: true,
      dataStream: false,
      pulseRings: true,
    },
  },
});

// Validate the configuration
const validationResult = validateConfiguration(fullConfig);

if (!validationResult.isValid) {
  console.warn('Configuration warnings:', validationResult.warnings);
  console.info('Suggestions:', validationResult.suggestions);
}

// Print a detailed report
printConfigReport(fullConfig, 'Full Implementation Demo Config');

// Create performance monitor
const performanceMonitor = createPerformanceMonitor({
  fpsTarget: 60,
  onUpdate: (metrics) => console.log('FPS:', metrics.fps),
  onDegraded: (metrics) => console.warn('Performance degraded!', metrics),
});

// Create responsive utility
const responsiveUtil = createResponsiveUtil({
  breakpoints: fullConfig.optimization?.responsive?.breakpoints || {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  deviceScaling: fullConfig.optimization?.responsive?.deviceScaling || {
    mobile: 0.5,
    tablet: 0.75,
    desktop: 1.0,
  }
});

const FullImplementationDemo: React.FC = () => {
  const [deviceType, setDeviceType] = useState(responsiveUtil.getCurrentDeviceType());
  const [fps, setFps] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { theme, themeType } = useTheme();
  
  useEffect(() => {
    // Start performance monitoring
    performanceMonitor.start();
    setIsMonitoring(true);
    
    // Update FPS state
    performanceMonitor.config.onUpdate = (metrics) => {
      setFps(metrics.fps);
    };
    
    // Update device type on resize
    const handleResize = () => {
      setDeviceType(responsiveUtil.getCurrentDeviceType());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      performanceMonitor.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleMonitoring = () => {
    if (isMonitoring) {
      performanceMonitor.stop();
      setIsMonitoring(false);
    } else {
      performanceMonitor.start();
      setIsMonitoring(true);
    }
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Full Implementation Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Current Device:</strong> {deviceType}</p>
        <p><strong>Current FPS:</strong> {fps}</p>
        <p><strong>Current Theme:</strong> {themeType}</p>
        <button onClick={toggleMonitoring}>
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <h2>Standard AtomixGlass</h2>
          <AtomixGlass
            style={{ padding: '20px', margin: '10px' }}
            displacementScale={20}
            blurAmount={15}
            saturation={150}
            aberrationIntensity={1.2}
            interactiveEffects={{
              vortex: {
                enabled: true,
                strength: 0.8,
                radius: 120,
                decay: 0.75,
                curlNoise: true,
                velocityTracking: true,
              },
              chromaticAberration: {
                enabled: true,
                mode: 'hybrid',
                redShift: 0.03,
                blueShift: -0.03,
                edgeOnly: true,
                edgeThreshold: 0.6,
              },
            }}
            visualPolish={{
              borders: {
                iridescentGlow: true,
                shimmerEffect: true,
              },
              contentAwareBlur: {
                enabled: true,
                depthDetection: true,
                edgePreservation: true,
              },
              holographicEffects: {
                enabled: false,
                rainbowDiffraction: true,
                scanlineAnimation: true,
                gridOverlay: true,
                pulseRings: true,
              },
            }}
            optimization={{
              responsive: {
                breakpoints: {
                  mobile: '0px',
                  tablet: '768px',
                  desktop: '1024px',
                  wide: '1440px',
                },
                deviceScaling: {
                  mobile: 0.4,
                  tablet: 0.7,
                  desktop: 1.0,
                },
              },
              performance: {
                fpsTarget: 60,
                autoScaling: true,
              },
            }}
          >
            <h3>Demo Card</h3>
            <p>This card demonstrates all implemented features:</p>
            <ul>
              <li>Interactive vortex effects</li>
              <li>Chromatic aberration</li>
              <li>Advanced borders</li>
              <li>Content-aware blur</li>
              <li>Responsive scaling</li>
              <li>Performance monitoring</li>
            </ul>
          </AtomixGlass>
        </div>
        
        <div>
          <h2>Performance Metrics</h2>
          <div style={{ 
            padding: '15px', 
            backgroundColor: 'rgba(0,0,0,0.1)', 
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            <p>FPS: {fps} {fps < 30 ? '🔴 Low' : fps < 50 ? '🟡 Medium' : '🟢 Good'}</p>
            <p>Device: {deviceType}</p>
            <p>Monitoring: {isMonitoring ? 'ON' : 'OFF'}</p>
            <p>Config Valid: {validationResult.isValid ? 'YES' : 'NO'}</p>
          </div>
          
          <h3>Configuration Details</h3>
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto', 
            padding: '10px', 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <pre>{JSON.stringify(fullConfig, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the demo in ThemeProvider to enable theme context
const FullImplementationDemoWrapper: React.FC = () => {
  return (
    <ThemeProvider>
      <FullImplementationDemo />
    </ThemeProvider>
  );
};

export default FullImplementationDemoWrapper;

// Export the configuration for potential reuse
export { fullConfig, performanceMonitor, responsiveUtil };