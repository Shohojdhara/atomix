import React, { useState, useCallback, useEffect } from 'react';

// Enhanced preview container with responsive features
interface PreviewContainerProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  glassEffect?: boolean;
  resizable?: boolean;
  onResize?: (size: { width: number; height: number }) => void;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  title,
  description,
  className = '',
  children,
  glassEffect = false,
  resizable = false,
  onResize
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const classes = [
    'story-preview-container',
    glassEffect && 'glass-morphism',
    resizable && 'resizable',
    className
  ].filter(Boolean).join(' ');

  const handleResize = useCallback(() => {
    if (containerRef.current && onResize) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      onResize({ width: rect.width, height: rect.height });
    }
    return undefined;
  }, [onResize]);

  useEffect(() => {
    if (resizable) {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, [resizable, handleResize]);

  return (
    <div className={classes} ref={containerRef}>
      {title && <h3 className="story-preview-title">{title}</h3>}
      {description && <p className="story-preview-description">{description}</p>}
      <div className="story-preview-content">
        {children}
      </div>
      {resizable && (
        <>
          <div className="story-preview-resize-handle" />
          <div className="story-performance-indicator">
            {size.width} × {size.height}
          </div>
        </>
      )}
    </div>
  );
};

// Enhanced variants grid with responsive behavior
interface VariantsGridProps {
  children: React.ReactNode;
  columns?: 'auto' | number | 'responsive';
  gap?: string;
  className?: string;
  minWidth?: string;
}

export const VariantsGrid: React.FC<VariantsGridProps> = ({
  children,
  columns = 'auto',
  gap = '1rem',
  className = '',
  minWidth = '120px'
}) => {
  const getGridStyle = () => {
    if (columns === 'responsive') {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
        gap,
        alignItems: 'center'
      };
    }
    
    if (typeof columns === 'number') {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
        gap,
        alignItems: 'center'
      };
    }
    
    return {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap,
      justifyContent: 'center' as const,
      alignItems: 'center'
    };
  };

  const gridClass = columns === 'auto' ? 'story-flex-grid' : 'story-variants-grid';

  return (
    <div className={`${gridClass} ${className}`} style={getGridStyle()}>
      {children}
    </div>
  );
};

// Interactive demo with state management and reset functionality
interface InteractiveDemoProps {
  children: React.ReactNode;
  onReset?: () => void;
  state?: string;
  stateDescription?: string;
  resetLabel?: string;
  showPerformance?: boolean;
  className?: string;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  children,
  onReset,
  state,
  stateDescription,
  resetLabel = 'Reset Demo',
  showPerformance = false,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(false);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    const start = performance.now();
    setIsActive(true);
    const end = performance.now();
    setRenderTime(end - start);
  }, []);

  const handleReset = () => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 50);
    onReset?.();
  };

  return (
    <div className={`story-interactive-demo ${className}`}>
      <div className="story-demo-controls">
        <div className="story-state-indicator">
          {state && <span className={isActive ? 'active' : ''}>{state}</span>}
          {stateDescription && (
            <span style={{ fontSize: '0.875rem', color: '#888', marginLeft: '0.5rem' }}>
              {stateDescription}
            </span>
          )}
          {showPerformance && (
            <span style={{ fontSize: '0.75rem', color: '#666', marginLeft: '0.5rem' }}>
              ({renderTime.toFixed(2)}ms)
            </span>
          )}
        </div>
        {onReset && (
          <button
            className="story-reset-button story-micro-interaction"
            onClick={handleReset}
            disabled={!isActive}
          >
            {resetLabel}
          </button>
        )}
      </div>
      <div className={`story-demo-content ${isActive ? 'story-fade-in' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Component comparison showcase
interface ComparisonContainerProps {
  beforeTitle: string;
  afterTitle: string;
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
}

export const ComparisonContainer: React.FC<ComparisonContainerProps> = ({
  beforeTitle,
  afterTitle,
  before,
  after,
  className = ''
}) => (
  <div className={`story-comparison-container ${className}`}>
    <div className="story-comparison-item">
      <h4>{beforeTitle}</h4>
      {before}
    </div>
    <div className="story-comparison-item">
      <h4>{afterTitle}</h4>
      {after}
    </div>
  </div>
);

// Theme showcase container
interface ThemeShowcaseProps {
  themes: Array<{
    name: string;
    description?: string;
    component: React.ReactNode;
    className?: string;
  }>;
  className?: string;
}

export const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({
  themes,
  className = ''
}) => (
  <div className={`story-theme-showcase ${className}`}>
    {themes.map((theme, index) => (
      <div key={index} className={`story-theme-card ${theme.className || ''}`}>
        <div style={{ marginBottom: '1rem' }}>{theme.component}</div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>{theme.name}</h4>
        {theme.description && (
          <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>
            {theme.description}
          </p>
        )}
      </div>
    ))}
  </div>
);

// Accessibility testing overlay
interface AccessibilityOverlayProps {
  children: React.ReactNode;
  showFocus?: boolean;
  showLabels?: boolean;
  className?: string;
}

export const AccessibilityOverlay: React.FC<AccessibilityOverlayProps> = ({
  children,
  showFocus = false,
  showLabels = false,
  className = ''
}) => (
  <div className={`story-a11y-container ${className}`}>
    {showFocus && <div className="story-a11y-overlay focus-visible" />}
    {children}
    {showLabels && (
      <div className="story-a11y-labels">
        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite">
          Accessibility testing mode enabled
        </div>
      </div>
    )}
  </div>
);

// Performance monitoring wrapper
interface PerformanceMonitorProps {
  children: React.ReactNode;
  label?: string;
  onMetric?: (metric: { renderTime: number; component: string }) => void;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  children,
  label = 'Component',
  onMetric,
  className = ''
}) => {
  const [metrics, setMetrics] = useState({ renderTime: 0, reRenders: 0 });

  useEffect(() => {
    const start = performance.now();
    const end = performance.now();
    const renderTime = end - start;
    
    const newMetrics = {
      renderTime,
      reRenders: metrics.reRenders + 1
    };
    
    setMetrics(newMetrics);
    onMetric?.({ renderTime, component: label });
  }, [label]);

  return (
    <div className={`story-performance-monitor ${className}`}>
      {process.env.NODE_ENV === 'development' && (
        <div className="story-performance-indicator">
          {label}: {metrics.renderTime.toFixed(2)}ms ({metrics.reRenders})
        </div>
      )}
      {children}
    </div>
  );
};

// Responsive demo with breakpoint controls
interface ResponsiveDemoProps {
  children: React.ReactNode;
  breakpoints?: Array<{
    name: string;
    width: number;
    height?: number;
  }>;
  className?: string;
}

export const ResponsiveDemo: React.FC<ResponsiveDemoProps> = ({
  children,
  breakpoints = [
    { name: 'Mobile', width: 360, height: 640 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1366, height: 768 }
  ],
  className = ''
}) => {
  const defaultBreakpoint = { name: 'Mobile', width: 360, height: 640 };
  const activeBreakpoint = breakpoints.length > 0 ? breakpoints[0] : defaultBreakpoint;
  
  // State to track the currently active breakpoint
  const [currentBreakpoint, setCurrentBreakpoint] = useState(activeBreakpoint);

  return (
    <div className={`story-responsive-demo ${className}`}>
      <div className="story-responsive-controls">
        {breakpoints.map((bp) => (
          <button
            key={bp.name}
            className={`story-responsive-btn ${currentBreakpoint?.name === bp.name ? 'active' : ''}`}
            onClick={() => setCurrentBreakpoint(bp)}
          >
            {bp.name}
          </button>
        ))}
      </div>
      <div
        className="story-responsive-viewport"
        style={{
          width: `${currentBreakpoint?.width || 360}px`,
          height: currentBreakpoint?.height ? `${currentBreakpoint.height}px` : 'auto',
          maxWidth: '100%',
          margin: '0 auto',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Export all components
export const EnhancedStoryComponents = {
  PreviewContainer,
  VariantsGrid,
  InteractiveDemo,
  ComparisonContainer,
  ThemeShowcase,
  AccessibilityOverlay,
  PerformanceMonitor,
  ResponsiveDemo
};

export default EnhancedStoryComponents;