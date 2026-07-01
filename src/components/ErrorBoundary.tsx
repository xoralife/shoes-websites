"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8">
          <AlertTriangle size={40} className="text-[#E94560] mb-4" />
          <h3 className="text-lg font-bold text-[#16213E] mb-2">Something went wrong</h3>
          <p className="text-[#6C757D] text-sm">Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
