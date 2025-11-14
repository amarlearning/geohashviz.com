import React, { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for Distance Analysis feature
 * Catches errors and displays fallback UI instead of crashing
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Distance Analysis Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-fallback">
          <svg 
            className="error-boundary-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 2L2 18H18L10 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M10 7V11" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
          </svg>
          <div className="error-boundary-message">
            Distance analysis temporarily unavailable
          </div>
          <div className="error-boundary-details">
            {this.state.error?.message || 'An unexpected error occurred'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
