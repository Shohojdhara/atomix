/**
 * Configuration Validator
 * 
 * Provides detailed validation and feedback for Atomix configurations,
 * especially for advanced features (Phases 2, 3, and 4).
 */

import type { AtomixConfig } from './index';
import { validateConfig } from './loader';

/**
 * Validation result with detailed information
 */
export interface ValidationResult {
  /** Whether the configuration is valid */
  isValid: boolean;
  /** Warnings about potential issues */
  warnings: string[];
  /** Suggestions for improvement */
  suggestions: string[];
  /** Performance impact assessment */
  performanceImpact: 'low' | 'medium' | 'high';
  /** Compatibility report */
  compatibility: {
    /** Browser support status */
    browsers: boolean;
    /** SSR support status */
    ssr: boolean;
    /** Framework compatibility */
    frameworks: ('react' | 'vue' | 'angular' | 'svelte' | 'vanillajs')[];
  };
}

/**
 * Validate an Atomix configuration with detailed feedback
 * 
 * @param config - The configuration to validate
 * @param options - Validation options
 * @returns Detailed validation result
 * 
 * @example
 * ```typescript
 * import { validateConfiguration } from '@shohojdhara/atomix/config';
 * 
 * const config = { /* your config *\/ };
 * const result = validateConfiguration(config);
 * 
 * if (!result.isValid) {
 *   console.warn('Warnings:', result.warnings);
 *   console.info('Suggestions:', result.suggestions);
 * }
 * ```
 */
export function validateConfiguration(
  config: AtomixConfig,
  options?: {
    /** Include performance impact analysis (default: true) */
    performanceAnalysis?: boolean;
    /** Include compatibility report (default: true) */
    compatibilityReport?: boolean;
  }
): ValidationResult {
  const { performanceAnalysis = true, compatibilityReport = true } = options || {};
  
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let performanceImpact: 'low' | 'medium' | 'high' = 'low';
  
  // Use the existing validation
  const baseWarnings = validateConfig(config);
  warnings.push(...baseWarnings);
  
  // Analyze advanced features for performance impact
  if (performanceAnalysis) {
    performanceImpact = analyzePerformanceImpact(config);
  }
  
  // Generate suggestions based on configuration
  generateSuggestions(config, suggestions);
  
  // Determine overall validity
  const isValid = warnings.length === 0;
  
  // Generate compatibility report
  const compatibility = compatibilityReport 
    ? generateCompatibilityReport(config) 
    : {
        browsers: true,
        ssr: true,
        frameworks: ['react', 'vue', 'angular', 'svelte', 'vanillajs']
      };
  
  return {
    isValid,
    warnings,
    suggestions,
    performanceImpact,
    compatibility
  };
}

/**
 * Analyze the performance impact of a configuration
 */
function analyzePerformanceImpact(config: AtomixConfig): 'low' | 'medium' | 'high' {
  let impactScore = 0;
  
  // Analyze interactive effects
  if (config.interactiveEffects) {
    const ie = config.interactiveEffects;
    
    if (ie.vortex?.enabled) {
      impactScore += 2;
    }
    if (ie.chromaticAberration?.enabled) {
      impactScore += 1;
    }
    if (ie.mouseInteraction?.trailEffect) {
      impactScore += 1;
    }
    if (ie.mouseInteraction?.pressureSensitivity) {
      impactScore += 1;
    }
  }
  
  // Analyze visual polish effects
  if (config.visualPolish) {
    const vp = config.visualPolish;
    
    if (vp.borders?.iridescentGlow) {
      impactScore += 1;
    }
    if (vp.borders?.shimmerEffect) {
      impactScore += 1;
    }
    if (vp.contentAwareBlur?.enabled) {
      impactScore += 2;
    }
    if (vp.holographicEffects?.enabled) {
      impactScore += 2;
    }
    if (vp.holographicEffects?.scanlineAnimation) {
      impactScore += 1;
    }
    if (vp.holographicEffects?.dataStream) {
      impactScore += 1;
    }
    if (vp.holographicEffects?.pulseRings) {
      impactScore += 1;
    }
  }
  
  // Analyze optimization settings
  if (config.optimization?.autoScaling?.enabled) {
    impactScore -= 1; // This improves performance
  }
  
  if (impactScore >= 6) return 'high';
  if (impactScore >= 3) return 'medium';
  return 'low';
}

/**
 * Generate suggestions based on the configuration
 */
function generateSuggestions(config: AtomixConfig, suggestions: string[]): void {
  // Suggest enabling performance optimizations if heavy effects are used
  if (config.interactiveEffects || config.visualPolish?.holographicEffects?.enabled) {
    if (!config.optimization?.autoScaling?.enabled) {
      suggestions.push(
        'Consider enabling auto-scaling in optimization settings to adjust effects ' +
        'based on device performance: optimization.autoScaling.enabled = true'
      );
    }
    
    if (!config.optimization?.performance?.fpsTarget) {
      suggestions.push(
        'Set a target FPS in optimization.performance.fpsTarget to ensure smooth performance ' +
        'when using interactive effects'
      );
    }
  }
  
  // Suggest responsive breakpoints if optimization is partially configured
  if (config.optimization && !config.optimization.responsive) {
    suggestions.push(
      'Consider adding responsive breakpoints in optimization.responsive.breakpoints ' +
      'to adapt advanced effects based on device type'
    );
  }
  
  // Suggest disabling heavy effects on lower-end devices
  if (config.visualPolish?.holographicEffects?.enabled) {
    suggestions.push(
      'For better performance on lower-end devices, consider conditionally disabling ' +
      'holographic effects based on device capabilities'
    );
  }
  
  // Suggest using content-aware blur with performance considerations
  if (config.visualPolish?.contentAwareBlur?.enabled) {
    suggestions.push(
      'Content-aware blur can be expensive; consider setting a maximum blur radius ' +
      'or using simpler blur techniques for mobile devices'
    );
  }
  
  // Suggest using chromatic aberration适度
  if (config.interactiveEffects?.chromaticAberration?.enabled) {
    if (config.interactiveEffects.chromaticAberration.redShift && 
        Math.abs(config.interactiveEffects.chromaticAberration.redShift) > 0.05) {
      suggestions.push(
        'High chromatic aberration red shift values (>0.05) may cause discomfort for some users; ' +
        'consider reducing to improve accessibility'
      );
    }
    
    if (config.interactiveEffects.chromaticAberration.blueShift && 
        Math.abs(config.interactiveEffects.chromaticAberration.blueShift) > 0.05) {
      suggestions.push(
        'High chromatic aberration blue shift values (>0.05) may cause discomfort for some users; ' +
        'consider reducing to improve accessibility'
      );
    }
  }
}

/**
 * Generate a compatibility report for the configuration
 */
function generateCompatibilityReport(config: AtomixConfig): ValidationResult['compatibility'] {
  // Advanced effects may not work well on older browsers
  const hasHeavyEffects = 
    config.visualPolish?.holographicEffects?.enabled ||
    config.visualPolish?.contentAwareBlur?.enabled ||
    config.interactiveEffects?.vortex?.enabled ||
    config.interactiveEffects?.chromaticAberration?.enabled;
  
  return {
    browsers: !hasHeavyEffects, // May have issues on older browsers
    ssr: true, // Works fine with SSR
    frameworks: ['react', 'vue', 'angular', 'svelte', 'vanillajs'] // Compatible with all
  };
}

/**
 * Print a detailed configuration report to the console
 * 
 * @param config - The configuration to analyze
 * @param title - Optional title for the report
 * 
 * @example
 * ```typescript
 * import { printConfigReport } from '@shohojdhara/atomix/config';
 * 
 * const config = { /* your config *\/ };
 * printConfigReport(config, 'My Application Config');
 * ```
 */
export function printConfigReport(config: AtomixConfig, title?: string): void {
  const result = validateConfiguration(config);
  
  const reportTitle = title ? `Atomix Configuration Report: ${title}` : 'Atomix Configuration Report';
  console.log(`\n${reportTitle}`);
  console.log('='.repeat(reportTitle.length));
  
  console.log(`\n✅ Valid: ${result.isValid ? 'Yes' : 'No'}`);
  console.log(`⚡ Performance Impact: ${result.performanceImpact.toUpperCase()}`);
  
  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    result.warnings.forEach(warning => {
      console.log(`  • ${warning}`);
    });
  }
  
  if (result.suggestions.length > 0) {
    console.log('\n💡 SUGGESTIONS:');
    result.suggestions.forEach(suggestion => {
      console.log(`  • ${suggestion}`);
    });
  }
  
  console.log('\n🌐 COMPATIBILITY:');
  console.log(`  Browser Support: ${result.compatibility.browsers ? '✅ Good' : '⚠️  May have issues'}`);
  console.log(`  SSR Support: ${result.compatibility.ssr ? '✅ Full' : '❌ Limited'}`);
  
  console.log('\n📋 FEATURES DETECTED:');
  const featuresDetected = [];
  
  if (config.interactiveEffects) featuresDetected.push('Interactive Effects');
  if (config.optimization) featuresDetected.push('Optimization');
  if (config.visualPolish) featuresDetected.push('Visual Polish');
  if (config.ai) featuresDetected.push('AI Integration');
  if (config.tokenEngine) featuresDetected.push('Token Engine');
  if (config.generator) featuresDetected.push('Component Generator');
  
  if (featuresDetected.length > 0) {
    featuresDetected.forEach(feature => console.log(`  • ${feature}`));
  } else {
    console.log('  • None - Standard configuration');
  }
  
  console.log('');
}