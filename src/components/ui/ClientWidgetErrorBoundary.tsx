"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ClientWidgetErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ClientWidgetErrorBoundaryState = {
  hasError: boolean;
};

export class ClientWidgetErrorBoundary extends Component<
  ClientWidgetErrorBoundaryProps,
  ClientWidgetErrorBoundaryState
> {
  state: ClientWidgetErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Homepage client widget failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}
