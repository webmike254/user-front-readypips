import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center min-h-[60vh] p-6"
        >
          <Card className="rounded-[18px] border-border shadow-card max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 rounded-[18px] bg-danger/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Something went wrong</h3>
              <p className="text-[13px] text-text-muted mb-1">
                We encountered an unexpected issue. Please try again or contact support if the problem persists.
              </p>
              <p className="text-[11px] text-text-muted font-mono mb-6 bg-bg rounded-button px-3 py-2">
                Code: {this.state.error?.name || "Unknown"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"
                >
                  <RefreshCw className="w-4 h-4 mr-1.5" /> Reload Page
                </Button>
                <Button
                  variant="outline"
                  className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-9"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" /> Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    }
    return this.props.children;
  }
}
