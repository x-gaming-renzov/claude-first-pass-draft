import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border bg-card text-foreground',
        success: 'border-green-500/50 bg-green-500/10 text-green-500',
        error: 'border-destructive/50 bg-destructive/10 text-destructive',
        warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500',
        info: 'border-blue-500/50 bg-blue-500/10 text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const ToastIcon = ({ variant }: { variant?: string }) => {
  switch (variant) {
    case 'success':
      return <CheckCircle className="h-5 w-5" />;
    case 'error':
      return <AlertCircle className="h-5 w-5" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5" />;
    case 'info':
      return <Info className="h-5 w-5" />;
    default:
      return null;
  }
};

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, action, variant, onClose }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }))}>
        <div className="flex items-start gap-3">
          <ToastIcon variant={variant || undefined} />
          <div className="grid gap-1">
            <div className="text-sm font-semibold">{title}</div>
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
          </div>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-secondary"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Toast.displayName = 'Toast';

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </div>
  );
};
