/**
 * Responsive Utility for Atomix Theme System
 * 
 * Provides responsive breakpoint detection and device-aware parameter scaling
 * based on configuration from the advanced optimization features.
 */

import React from 'react';

/**
 * Breakpoint definitions
 */
export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

/**
 * Device scaling factors
 */
export interface DeviceScaling {
  mobile: number;
  tablet: number;
  desktop: number;
}

/**
 * Responsive configuration
 */
export interface ResponsiveConfig {
  breakpoints: Breakpoints;
  deviceScaling: DeviceScaling;
}

/**
 * Current device type
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide';

/**
 * Responsive utility class
 */
export class ResponsiveUtil {
  private config: ResponsiveConfig;
  private currentDevice: DeviceType = 'desktop'; // Default
  private resizeHandler: (() => void) | null = null;
  private observer: ResizeObserver | null = null;
  
  constructor(config: ResponsiveConfig) {
    this.config = config;
    this.currentDevice = this.getCurrentDeviceType();
    
    // Set up resize listener
    this.setupResizeListener();
  }
  
  /**
   * Get the current device type based on viewport width
   */
  public getCurrentDeviceType(): DeviceType {
    if (typeof window === 'undefined') return 'desktop'; // SSR fallback
    
    const width = window.innerWidth;
    
    // Parse breakpoint values to numbers
    const mobileWidth = this.parsePxValue(this.config.breakpoints.mobile);
    const tabletWidth = this.parsePxValue(this.config.breakpoints.tablet);
    const desktopWidth = this.parsePxValue(this.config.breakpoints.desktop);
    const wideWidth = this.parsePxValue(this.config.breakpoints.wide);
    
    if (width < tabletWidth) {
      return 'mobile';
    } else if (width < desktopWidth) {
      return 'tablet';
    } else if (width < wideWidth) {
      return 'desktop';
    } else {
      return 'wide';
    }
  }
  
  /**
   * Get the scaling factor for the current device
   */
  public getCurrentScalingFactor(): number {
    // 'wide' devices use the same scaling as 'desktop'
    const scalingKey = this.currentDevice === 'wide' ? 'desktop' : this.currentDevice;
    return this.config.deviceScaling[scalingKey] || 1.0;
  }
  
  /**
   * Scale a value based on the current device's scaling factor
   */
  public scaleValue(value: number): number {
    return value * this.getCurrentScalingFactor();
  }
  
  /**
   * Check if the current device matches a specific type
   */
  public isDevice(device: DeviceType): boolean {
    return this.currentDevice === device;
  }
  
  /**
   * Check if the current device is mobile or smaller
   */
  public isMobileOrSmaller(): boolean {
    return this.currentDevice === 'mobile';
  }
  
  /**
   * Check if the current device is tablet or smaller
   */
  public isTabletOrSmaller(): boolean {
    return this.currentDevice === 'mobile' || this.currentDevice === 'tablet';
  }
  
  /**
   * Check if the current device is desktop or larger
   */
  public isDesktopOrLarger(): boolean {
    return this.currentDevice === 'desktop' || this.currentDevice === 'wide';
  }
  
  /**
   * Update the responsive configuration
   */
  public updateConfig(config: ResponsiveConfig): void {
    this.config = config;
    this.currentDevice = this.getCurrentDeviceType();
  }
  
  /**
   * Destroy the responsive utility and clean up listeners
   */
  public destroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  
  /**
   * Parse a CSS value to pixels
   */
  private parsePxValue(value: string): number {
    if (value.endsWith('px')) {
      return parseFloat(value.slice(0, -2));
    }
    
    // For other units, we'll use a rough conversion assuming 16px base
    if (value.endsWith('rem')) {
      return parseFloat(value.slice(0, -3)) * 16;
    }
    
    if (value.endsWith('em')) {
      return parseFloat(value.slice(0, -2)) * 16;
    }
    
    // Default to parsing as a raw number
    return parseFloat(value) || 0;
  }
  
  /**
   * Set up the resize listener
   */
  private setupResizeListener(): void {
    if (typeof window === 'undefined') return;
    
    // Throttled resize handler
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        const newDeviceType = this.getCurrentDeviceType();
        
        if (newDeviceType !== this.currentDevice) {
          this.currentDevice = newDeviceType;
          // Optionally trigger a callback here if needed
        }
      }, 150); // Throttle to 150ms
    };
    
    this.resizeHandler = handleResize;
    window.addEventListener('resize', handleResize);
    
    // Also observe the document body for size changes
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(handleResize);
      this.observer.observe(document.body);
    }
  }
}

/**
 * Create a responsive utility instance
 * 
 * @param config Responsive configuration
 * @returns ResponsiveUtil instance
 */
export function createResponsiveUtil(config: ResponsiveConfig): ResponsiveUtil {
  return new ResponsiveUtil(config);
}

/**
 * Hook for React components to use responsive features
 * 
 * @param config Responsive configuration
 * @returns Current device type and utility functions
 */
export function useResponsive(config: ResponsiveConfig) {
  const [util] = React.useState(() => createResponsiveUtil(config));
  const [deviceType, setDeviceType] = React.useState<DeviceType>(() => 
    typeof window !== 'undefined' ? util.getCurrentDeviceType() : 'desktop'
  );
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newDeviceType = util.getCurrentDeviceType();
      if (newDeviceType !== deviceType) {
        setDeviceType(newDeviceType);
      }
    };
    
    // Update device type on mount
    setDeviceType(util.getCurrentDeviceType());
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      util.destroy();
    };
  }, [util, deviceType]);
  
  if (typeof window === 'undefined') {
    return {
      deviceType: 'desktop' as DeviceType,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isWide: false,
      scaleValue: (value: number) => value,
      getCurrentDeviceType: (): DeviceType => 'desktop',
      getCurrentScalingFactor: (): number => 1,
      isMobileOrSmaller: (): boolean => false,
      isTabletOrSmaller: (): boolean => true,
      isDesktopOrLarger: (): boolean => true,
    };
  }
  
  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isWide: deviceType === 'wide',
    scaleValue: (value: number) => util.scaleValue(value),
    getCurrentDeviceType: () => util.getCurrentDeviceType(),
    getCurrentScalingFactor: () => util.getCurrentScalingFactor(),
    isMobileOrSmaller: () => util.isMobileOrSmaller(),
    isTabletOrSmaller: () => util.isTabletOrSmaller(),
    isDesktopOrLarger: () => util.isDesktopOrLarger(),
  };
}