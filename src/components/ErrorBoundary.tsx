'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from "@/lib/logger";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    name?: string; // To identify which boundary caught the error
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error(`Uncaught error in ${this.props.name || 'global'} boundary:`, {
            error,
            errorInfo,
        });
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4 rounded-lg bg-red-50/50 border border-red-100">
                    <h2 className="text-2xl font-bold text-red-800">Something went wrong</h2>
                    <p className="text-muted-foreground max-w-md">
                        We apologize for the inconvenience. An unexpected error has occurred.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Button
                            onClick={() => this.setState({ hasError: false })}
                            variant="outline"
                        >
                            Try Again
                        </Button>
                        <Button
                            onClick={this.handleReset}
                            variant="default"
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Reload Page
                        </Button>
                    </div>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre className="mt-4 p-4 bg-slate-950 text-slate-50 text-xs text-left overflow-auto max-w-full rounded-md">
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
