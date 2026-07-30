import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('KDE Plasma Portfolio ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          color: '#ffffff',
          backgroundColor: '#1b1e20',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '1rem' }}>⚠️ KDE Desktop Environment Exception</h2>
          <p style={{ color: '#bdc3c7', maxWidth: '600px', marginBottom: '1.5rem' }}>
            {this.state.error?.toString() || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#3daee9',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Restart KDE Desktop
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
