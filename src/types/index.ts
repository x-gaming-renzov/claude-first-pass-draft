export type UserRole = 'super-admin' | 'business' | 'development' | 'support' | 'kie' | 'organiser';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  category: 'marketing' | 'ui-ux';
  rolloutPercentage: number;
  startDate: string;
  endDate?: string;
  variants: ExperimentVariant[];
}

export interface ExperimentVariant {
  id: string;
  name: string;
  traffic: number;
  conversions?: number;
  engagement?: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  status: 'pending' | 'approved' | 'live' | 'completed' | 'rejected';
  startDate: string;
  endDate: string;
  participants: number;
  impressions: number;
  engagement: number;
}

export interface CrashReport {
  id: string;
  title: string;
  location: string;
  occurrences: number;
  affectedUsers: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastSeen: string;
}

export interface ChartDataPoint {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface FunnelStep {
  name: string;
  users: number;
  dropOff: number;
}

export interface OrganizerApplication {
  id: string;
  name: string;
  email: string;
  organization: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  tournamentsHosted?: number;
}
