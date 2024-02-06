import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { logError } = this.props;

    if (logError) {
      console.error(error, errorInfo);
    }
  }

  render() {
    const { hasError } = this.state;
    const { fallbackComponent: FallbackComponent, children } = this.props;

    if (hasError) {
      return FallbackComponent ? (
        <FallbackComponent />
      ) : (
        <div>
          Quelque chose s'est mal passé. Veuillez réessayer ultérieurement.
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  logError: PropTypes.bool,
  fallbackComponent: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

ErrorBoundary.defaultProps = {
  logError: true,
  fallbackComponent: null,
};

export default ErrorBoundary;
