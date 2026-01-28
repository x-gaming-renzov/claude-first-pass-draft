import { cn } from '@/lib/utils';

export type StatusType =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'live'
  | 'completed'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'warning'
  | 'error'
  | 'draft'
  | 'open'
  | 'closed'
  | 'resolved'
  | 'escalated'
  | 'healthy'
  | 'slow'
  | 'offline'
  | 'verified'
  | 'cancelled'
  | 'in-progress'
  | 'in-review'
  | 'scheduled'
  | 'upcoming'
  | 'pending-approval'
  | 'disputed'
  | 'investigating'
  | 'dismissed'
  | 'waiting-response'
  | 'lobby-created'
  | 'expired'
  | 'waitlisted'
  | 'checked-in'
  | 'registration';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; dotColor: string; bgColor: string; textColor: string }
> = {
  pending: {
    label: 'Pending',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
  approved: {
    label: 'Approved',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  rejected: {
    label: 'Rejected',
    dotColor: 'bg-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
  },
  live: {
    label: 'Live',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  completed: {
    label: 'Completed',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  active: {
    label: 'Active',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  inactive: {
    label: 'Inactive',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  suspended: {
    label: 'Suspended',
    dotColor: 'bg-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
  },
  warning: {
    label: 'Warning',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
  error: {
    label: 'Error',
    dotColor: 'bg-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
  },
  draft: {
    label: 'Draft',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  open: {
    label: 'Open',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  closed: {
    label: 'Closed',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  resolved: {
    label: 'Resolved',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  escalated: {
    label: 'Escalated',
    dotColor: 'bg-orange-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
  },
  healthy: {
    label: 'Healthy',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  slow: {
    label: 'Slow',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
  offline: {
    label: 'Offline',
    dotColor: 'bg-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
  },
  verified: {
    label: 'Verified',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  'in-progress': {
    label: 'In Progress',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  scheduled: {
    label: 'Scheduled',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  upcoming: {
    label: 'Upcoming',
    dotColor: 'bg-purple-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
  },
  'pending-approval': {
    label: 'Pending Approval',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
  disputed: {
    label: 'Disputed',
    dotColor: 'bg-orange-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
  },
  investigating: {
    label: 'Investigating',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  dismissed: {
    label: 'Dismissed',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  'waiting-response': {
    label: 'Waiting Response',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
  },
  'lobby-created': {
    label: 'Lobby Created',
    dotColor: 'bg-purple-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
  },
  expired: {
    label: 'Expired',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-500',
  },
  waitlisted: {
    label: 'Waitlisted',
    dotColor: 'bg-orange-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
  },
  'checked-in': {
    label: 'Checked In',
    dotColor: 'bg-green-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  'in-review': {
    label: 'In Review',
    dotColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  registration: {
    label: 'Registration',
    dotColor: 'bg-purple-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
  },
};

export function StatusBadge({
  status,
  size = 'md',
  showDot = true,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bgColor,
        config.textColor,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'rounded-full',
            config.dotColor,
            size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'
          )}
        />
      )}
      {config.label}
    </span>
  );
}
