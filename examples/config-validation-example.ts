/**
 * Advanced Configuration Validation Example
 * 
 * Demonstrates how to use the new validation system with advanced features
 */

import { defineConfig, validateConfiguration, printConfigReport } from '@shohojdhara/atomix/config';

// Define an advanced configuration with Phase 2, 3, and 4 features
const advancedConfig = defineConfig({
  prefix: 'myapp',
  
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
  
  // Other configurations
  ai: {
    provider: 'openai',
    model: 'gpt-4',
    apiKey: process.env.ATOMIX_AI_API_KEY,
    temperature: 0.7,
    maxTokens: 4000
  },
  
  generator: {
    outputPath: './src/components',
    framework: 'react',
    features: {
      storybook: true,
      hook: true,
      styles: true,
      tests: false
    },
    hookOutputDir: 'src/lib/composables'
  },
});

// Validate the configuration
const validationResult = validateConfiguration(advancedConfig);

console.log('=== Configuration Validation Results ===');
console.log(`Valid: ${validationResult.isValid ? '✅ YES' : '❌ NO'}`);
console.log(`Performance Impact: ${validationResult.performanceImpact.toUpperCase()}`);

if (validationResult.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  validationResult.warnings.forEach(warning => {
    console.log(`  • ${warning}`);
  });
}

if (validationResult.suggestions.length > 0) {
  console.log('\n💡 SUGGESTIONS:');
  validationResult.suggestions.forEach(suggestion => {
    console.log(`  • ${suggestion}`);
  });
}

// Print a detailed report
printConfigReport(advancedConfig, 'Advanced Configuration with All Phases');

// You can also check specific aspects of the configuration
console.log('\n=== Performance Analysis ===');
if (validationResult.performanceImpact === 'high') {
  console.log('⚠️  This configuration has high performance impact');
  console.log('Consider enabling auto-scaling to adjust effects based on device performance');
} else if (validationResult.performanceImpact === 'medium') {
  console.log('⚠️  This configuration has medium performance impact');
  console.log('Monitor performance on lower-end devices');
} else {
  console.log('✅ This configuration has low performance impact');
}

console.log('\n=== Browser Compatibility ===');
if (validationResult.compatibility.browsers) {
  console.log('✅ Full browser compatibility');
} else {
  console.log('⚠️  May have issues on older browsers due to advanced effects');
}

// You can also create a lighter configuration for comparison
const lightweightConfig = defineConfig({
  prefix: 'myapp',
  theme: {
    extend: {
      colors: {
        primary: { main: '#6366f1' },
      },
    },
  },
  // Minimal advanced features
  optimization: {
    responsive: {
      breakpoints: {
        mobile: '0px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
});

console.log('\n=== Lightweight Configuration Report ===');
printConfigReport(lightweightConfig, 'Lightweight Configuration');

console.log('\n🎉 Validation example completed!');