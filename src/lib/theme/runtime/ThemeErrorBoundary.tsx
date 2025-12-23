/**
 * Theme Error Boundary
 * 
 * React error boundary for catching and handling theme-related errors.
 * Prevents the entire app from crashing when theme errors occur.
 */

import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { ThemeError, ThemeErrorCode, getLogger } from '../errors';

/**
 * Error boundary state
 */
interface ThemeErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error: Error | null;
  /** Error information */
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary props
 */
export interface ThemeErrorBoundaryProps {
  /** Child components */
  children: ReactNode;
  /** Fallback UI to render when error occurs */
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Whether to reset error on children change */
  resetOnPropsChange?: boolean;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Default fallback UI
 */
const DefaultFallback: React.FC<{ error: Error; errorInfo: ErrorInfo }> = ({ error, errorInfo }) => {
  const isThemeError = error instanceof ThemeError;
  const errorCode = isThemeError ? error.code : ThemeErrorCode.UNKNOWN_ERROR;
  const context = isThemeError ? error.context : undefined;

  return (
    <div
      style={{
        padding: '2rem',
        margin: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        color: '#333',
      }}
      role="alert"
    >
      <h2 style={{ marginTop: 0, color: '#d32f2f' }}>Theme Error</h2>
      <p>
        <strong>Error:</strong> {error.message}
      </p>
      {isThemeError && (
        <p>
          <strong>Error Code:</strong> {errorCode}
        </p>
      )}
      {context && Object.keys(context).length > 0 && (
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Error Context
          </summary>
          <pre
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {JSON.stringify(context, null, 2)}
          </pre>
        </details>
      )}
      {process.env.NODE_ENV === 'development' && errorInfo && (
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Stack Trace (Development Only)
          </summary>
          <pre
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {errorInfo.componentStack}
          </pre>
        </details>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reload Page
      </button>
    </div>
  );
};

/**
 * Theme Error Boundary Component
 * 
 * Catches errors in the theme system and displays a fallback UI
 * instead of crashing the entire application.
 */
export class ThemeErrorBoundary extends Component<
  ThemeErrorBoundaryProps,
  ThemeErrorBoundaryState
> {
  private logger = getLogger();

  constructor(props: ThemeErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ThemeErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error
    const themeError = error instanceof ThemeError
      ? error
      : new ThemeError(
          error.message,
          ThemeErrorCode.UNKNOWN_ERROR,
          { componentStack: errorInfo.componentStack }
        );

    this.logger.error(
      'Theme error boundary caught an error',
      themeError,
      {
        componentStack: errorInfo.componentStack,
        errorBoundary: 'ThemeErrorBoundary',
      }
    );

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        this.logger.error(
          'Error in onError callback',
          handlerError instanceof Error ? handlerError : new Error(String(handlerError)),
          { originalError: error.message }
        );
      }
    }
  }

  override componentDidUpdate(prevProps: ThemeErrorBoundaryProps): void {
    // Reset error if resetOnPropsChange is true and children changed
    if (
      this.props.resetOnPropsChange &&
      this.state.hasError &&
      prevProps.children !== this.props.children
    ) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }
  }

  override render(): ReactNode {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      // Use default fallback
      return <DefaultFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

/**
 * Hook to reset error boundary
 * 
 * @param reset - Function to reset the error boundary
 */
export function useThemeErrorReset(): () => void {
  return () => {
    // This would need to be implemented with a context or ref
    // For now, it's a placeholder
    window.location.reload();
  };
}

export default ThemeErrorBoundary;
