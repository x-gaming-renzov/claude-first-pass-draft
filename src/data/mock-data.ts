import type {
  Experiment,
  Tournament,
  CrashReport,
  ChartDataPoint,
  FunnelStep,
  OrganizerApplication
} from '@/types';

export const userGrowthData: ChartDataPoint[] = [
  { name: 'Jan', value: 4000, active: 2400 },
  { name: 'Feb', value: 5200, active: 3100 },
  { name: 'Mar', value: 6800, active: 4200 },
  { name: 'Apr', value: 7500, active: 4800 },
  { name: 'May', value: 8900, active: 5600 },
  { name: 'Jun', value: 10200, active: 6800 },
  { name: 'Jul', value: 11500, active: 7900 },
];

export const retentionData: ChartDataPoint[] = [
  { name: 'Day 1', value: 100 },
  { name: 'Day 7', value: 72 },
  { name: 'Day 14', value: 58 },
  { name: 'Day 30', value: 45 },
  { name: 'Day 60', value: 38 },
  { name: 'Day 90', value: 32 },
];

export const engagementData: ChartDataPoint[] = [
  { name: 'Mon', sessions: 4200, duration: 12.5 },
  { name: 'Tue', sessions: 3800, duration: 11.2 },
  { name: 'Wed', sessions: 5100, duration: 14.8 },
  { name: 'Thu', sessions: 4600, duration: 13.1 },
  { name: 'Fri', sessions: 5800, duration: 15.2 },
  { name: 'Sat', sessions: 7200, duration: 18.5 },
  { name: 'Sun', sessions: 6800, duration: 17.1 },
];

export const funnelData: FunnelStep[] = [
  { name: 'App Install', users: 50000, dropOff: 0 },
  { name: 'Registration', users: 35000, dropOff: 30 },
  { name: 'Profile Complete', users: 22000, dropOff: 37 },
  { name: 'First Match', users: 15000, dropOff: 32 },
  { name: 'Tournament Entry', users: 8500, dropOff: 43 },
];

export const experiments: Experiment[] = [
  {
    id: '1',
    name: 'New Onboarding Flow',
    description: 'Testing simplified 3-step onboarding vs current 5-step flow',
    status: 'running',
    category: 'ui-ux',
    rolloutPercentage: 25,
    startDate: '2026-01-15',
    variants: [
      { id: 'control', name: 'Control (5-step)', traffic: 50, conversions: 32, engagement: 45 },
      { id: 'variant-a', name: 'Variant A (3-step)', traffic: 50, conversions: 41, engagement: 52 },
    ],
  },
  {
    id: '2',
    name: 'Homepage Banner Campaign',
    description: 'New Year tournament promotion banner',
    status: 'running',
    category: 'marketing',
    rolloutPercentage: 100,
    startDate: '2026-01-10',
    variants: [
      { id: 'main', name: 'Main Banner', traffic: 100, conversions: 2800, engagement: 15200 },
    ],
  },
  {
    id: '3',
    name: 'Match Result UI',
    description: 'Testing new match result screen with detailed stats',
    status: 'paused',
    category: 'ui-ux',
    rolloutPercentage: 10,
    startDate: '2026-01-05',
    variants: [
      { id: 'control', name: 'Current UI', traffic: 50, conversions: 28, engagement: 38 },
      { id: 'variant-a', name: 'Detailed Stats', traffic: 50, conversions: 35, engagement: 48 },
    ],
  },
];

export const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Winter Championship 2026',
    organizer: 'ESports India',
    status: 'live',
    startDate: '2026-01-20',
    endDate: '2026-01-25',
    participants: 1250,
    impressions: 45000,
    engagement: 12.5,
  },
  {
    id: '2',
    name: 'Regional Qualifiers - South',
    organizer: 'Gaming Hub Chennai',
    status: 'pending',
    startDate: '2026-02-01',
    endDate: '2026-02-03',
    participants: 0,
    impressions: 8500,
    engagement: 8.2,
  },
  {
    id: '3',
    name: 'College League Finals',
    organizer: 'Campus Gaming Network',
    status: 'approved',
    startDate: '2026-01-28',
    endDate: '2026-01-30',
    participants: 480,
    impressions: 22000,
    engagement: 15.8,
  },
  {
    id: '4',
    name: 'Pro Series Season 2',
    organizer: 'Elite Gaming',
    status: 'completed',
    startDate: '2026-01-01',
    endDate: '2026-01-15',
    participants: 2100,
    impressions: 180000,
    engagement: 22.4,
  },
];

export const crashReports: CrashReport[] = [
  {
    id: '1',
    title: 'NullPointerException in MatchService',
    location: 'com.app.match.MatchService:142',
    occurrences: 1250,
    affectedUsers: 890,
    severity: 'critical',
    firstSeen: '2026-01-18',
    lastSeen: '2026-01-22',
  },
  {
    id: '2',
    title: 'OutOfMemoryError during image load',
    location: 'com.app.ui.ImageLoader:87',
    occurrences: 560,
    affectedUsers: 420,
    severity: 'high',
    firstSeen: '2026-01-15',
    lastSeen: '2026-01-21',
  },
  {
    id: '3',
    title: 'NetworkTimeoutException in API call',
    location: 'com.app.network.ApiClient:256',
    occurrences: 320,
    affectedUsers: 280,
    severity: 'medium',
    firstSeen: '2026-01-10',
    lastSeen: '2026-01-20',
  },
  {
    id: '4',
    title: 'IndexOutOfBoundsException in leaderboard',
    location: 'com.app.leaderboard.LeaderboardAdapter:45',
    occurrences: 85,
    affectedUsers: 72,
    severity: 'low',
    firstSeen: '2026-01-12',
    lastSeen: '2026-01-19',
  },
];

export const organizerApplications: OrganizerApplication[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@esportsindia.com',
    organization: 'ESports India',
    status: 'approved',
    appliedDate: '2026-01-05',
    tournamentsHosted: 15,
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@gaminghub.in',
    organization: 'Gaming Hub Chennai',
    status: 'pending',
    appliedDate: '2026-01-18',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit@campusgaming.net',
    organization: 'Campus Gaming Network',
    status: 'approved',
    appliedDate: '2025-12-20',
    tournamentsHosted: 8,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha@elitegaming.gg',
    organization: 'Elite Gaming',
    status: 'pending',
    appliedDate: '2026-01-20',
  },
];

export const applicationTrendData: ChartDataPoint[] = [
  { name: 'Week 1', organizers: 12, tournaments: 8 },
  { name: 'Week 2', organizers: 18, tournaments: 15 },
  { name: 'Week 3', organizers: 25, tournaments: 22 },
  { name: 'Week 4', organizers: 32, tournaments: 28 },
];

export const impressionData: ChartDataPoint[] = [
  { name: 'Jan 16', impressions: 12500, clicks: 1250 },
  { name: 'Jan 17', impressions: 15800, clicks: 1580 },
  { name: 'Jan 18', impressions: 18200, clicks: 1820 },
  { name: 'Jan 19', impressions: 22000, clicks: 2640 },
  { name: 'Jan 20', impressions: 28500, clicks: 3420 },
  { name: 'Jan 21', impressions: 25200, clicks: 2772 },
  { name: 'Jan 22', impressions: 31000, clicks: 3720 },
];

export const healthMetrics = {
  crashFreeRate: 98.2,
  avgResponseTime: 245,
  errorRate: 0.8,
  activeUsers: 45200,
  sessionCrashRate: 0.3,
  anrRate: 0.1,
};
