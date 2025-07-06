import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback = null, children } = this.props;

    if (hasError) {
      return fallback || (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
          <p className="text-gray-600 mb-6 max-w-md">An unexpected error occurred. Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return children;
  }
} 