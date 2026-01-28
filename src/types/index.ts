export type UserRole = 'super-admin' | 'business' | 'development' | 'support' | 'kie' | 'organiser';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  team?: string;
  status?: 'active' | 'invited' | 'suspended';
  lastActive?: string;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  traffic: number;
  conversions?: number;
  engagement?: number;
}

export interface ExperimentMetric {
  name: string;
  control: number;
  variant: number;
  lift: number;
  confidence: number;
  targetConfidence: number;
}

export interface SecondaryMetric {
  name: string;
  change: number;
}

export interface RolloutHistoryEntry {
  date: string;
  percentage: number;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  hypothesis?: string;
  status: string;
  category?: string;
  type?: string;
  rolloutPercentage?: number;
  targetRollout?: number;
  startDate?: string;
  endDate?: string;
  dayNumber?: number;
  totalDays?: number;
  owner?: string;
  createdBy?: string;
  createdAt?: string;
  impressions?: number;
  completionRate?: number;
  variants?: ExperimentVariant[];
  primaryMetric?: ExperimentMetric;
  secondaryMetrics?: SecondaryMetric[];
  rolloutHistory?: RolloutHistoryEntry[];
  targetSegments?: string[];
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
  organizerName?: string;
  organizerId?: string;
  status: 'pending' | 'approved' | 'live' | 'completed' | 'rejected' | 'pending-approval';
  tier?: 'pro' | 'amateur';
  game?: string;
  gameMode?: 'solo' | 'duo' | 'squad';
  format?: 'free' | 'paid';
  entryType?: 'open' | 'invite-only' | 'mixed';
  startDate: string;
  endDate: string;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  participants: number;
  maxParticipants?: number;
  currentParticipants?: number;
  impressions: number;
  engagement: number;
  prizePool?: number;
  isFeatured?: boolean;
  createdAt?: string;
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
  organizationType?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  tournamentsHosted?: number;
}

// Stakeholder Health
export interface StakeholderKeyMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
}

export interface StakeholderHealth {
  id: string;
  name: string;
  healthScore: number;
  previousScore: number;
  status: 'healthy' | 'needs-review' | 'critical';
  keyMetrics: StakeholderKeyMetric[];
}

// Alerts
export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'notice' | 'info';
  category: 'technical' | 'experimentation' | 'operational' | 'security';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  metadata?: Record<string, unknown>;
}

// Feature Flags
export interface FeatureFlag {
  id: string;
  name: string;
  status: 'on' | 'off' | 'partial';
  scope: string;
  rolloutPercentage?: number;
  lastModified: string;
  modifiedBy: string;
  description?: string;
  enabled?: boolean;
  targetAudience?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Experiment Collision
export interface ExperimentCollision {
  id: string;
  type: 'overlap' | 'sequential';
  severity: 'high' | 'medium' | 'low' | 'warning';
  experiments: string[];
  description: string;
  affectedUsers?: number;
  recommendation?: string;
}

// Access Request
export interface AccessRequestRequester {
  name: string;
  email: string;
  role: UserRole;
}

export interface AccessRequestTargetUser {
  name: string;
  email: string;
}

export interface AccessRequest {
  id: string;
  type: 'new-access' | 'data-export' | 'role-change' | 'permission-escalation';
  requester: AccessRequestRequester;
  targetUser?: AccessRequestTargetUser;
  requestedRole?: UserRole;
  requestedPermission?: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  scope?: string;
}

// Activity Log
export interface ActivityLogEntry {
  id: string;
  action: string;
  user: string;
  userRole: UserRole;
  timestamp: string;
  category: 'data' | 'access' | 'experiment' | 'user' | 'security' | 'feature';
  severity: 'normal' | 'warning' | 'critical';
}

// Permission Matrix
export interface PermissionMatrix {
  feature: string;
  permissions: Record<UserRole, boolean>;
}

// Cross Stakeholder Metric
export interface StakeholderMetricValue {
  value: string;
  trend: number;
  status: 'on-target' | 'above' | 'below';
  target?: string;
}

export interface CrossStakeholderMetric {
  metric: string;
  projectTeam: StakeholderMetricValue;
  kieTeam: StakeholderMetricValue;
  organisers: StakeholderMetricValue;
}

// Correlation Insight
export interface CorrelationInsight {
  id: string;
  type: 'positive' | 'negative' | 'inverse';
  strength: number;
  metricA: string;
  metricB: string;
  sourceA: string;
  sourceB: string;
  insight: string;
}

// Data Source
export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'stream';
  status: 'healthy' | 'slow' | 'offline' | 'connected' | 'disconnected' | 'error';
  latency: number;
  lastSync: string;
  recordsPerHour: number;
}

// Alert Rule
export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  recipients: string[];
  enabled: boolean;
  category: 'technical' | 'experimentation' | 'operational' | 'security';
}

// Pending Approval
export interface PendingApproval {
  category: string;
  count: number;
  oldestDays: number;
}

// Organization
export interface OrganizationMember {
  userId: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export interface OrganizationDocument {
  id: string;
  type: string;
  status: string;
  uploadedAt?: string;
  fileName?: string;
  reviewedBy?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'suspended';
  tier: string;
  verificationScore: number;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  createdAt: string;
  verifiedAt?: string;
  members: OrganizationMember[];
  documents?: OrganizationDocument[];
  tournamentsHosted?: number;
  totalTournaments?: number;
  totalParticipants?: number;
  rating?: number;
  verificationDocs?: OrganizationDocument[];
}

// Match Team
export interface MatchTeam {
  id: string;
  name: string;
  players: string[];
  checkedIn?: boolean;
  placement?: number;
  score?: number;
  isWinner?: boolean;
}

// Match Placement
export interface MatchPlacement {
  teamId: string;
  teamName: string;
  position: number;
  score: number;
}

// Match Result
export interface MatchResult {
  winnerId?: string;
  scores?: Record<string, number>;
  placements?: MatchPlacement[];
  verifiedBy?: string;
  verifiedAt?: string;
  submittedBy?: string;
  submittedAt?: string;
  ocrUsed?: boolean;
  ocrConfidence?: number;
  disputedBy?: string;
  disputeReason?: string;
}

// Match
export interface Match {
  id: string;
  tournamentId: string;
  tournamentName?: string;
  matchNumber?: number;
  round: number;
  game?: string;
  map?: string;
  team1?: string | MatchTeam;
  team2?: string | MatchTeam;
  teams?: MatchTeam[];
  score1?: number;
  score2?: number;
  status: string;
  scheduledAt?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  startedAt?: string;
  completedAt?: string;
  streamUrl?: string;
  viewers?: number;
  result?: MatchResult;
  lobbyCredentials?: Record<string, string>;
}

// Registration
export interface Registration {
  id: string;
  tournamentId: string;
  tournamentName?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  gameId?: string;
  playerId?: string;
  playerName?: string;
  teamId?: string;
  teamName?: string;
  status: string;
  registeredAt: string;
  approvedAt?: string;
  paidAmount?: number;
  paymentStatus?: string;
}

// Ticket Message
export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: string;
  content: string;
  createdAt: string;
}

// Ticket
export interface Ticket {
  id: string | number;
  ticketId?: string | number;
  title?: string;
  subject?: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdBy: string;
  createdByName?: string;
  createdByEmail?: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  channel?: string | number;
  tags?: string[];
  responseTime?: string;
  organizerId?: string;
  organizerName?: string;
  tournamentId?: string;
  tournamentName?: string;
  slaDeadline?: string;
  slaBreach?: boolean;
  messages?: TicketMessage[];
  escalationLevel?: number;
}

// Experience (alias for certain experiment types)
export type Experience = Experiment;

// Personalisation
export interface PersonalisationRule {
  id?: string;
  field?: string;
  condition?: string;
  operator?: string;
  value?: string | number;
  action?: string;
  priority?: number;
}

export interface Personalisation {
  id: string;
  name: string;
  description?: string;
  type?: string;
  targetSegment?: string;
  content?: Record<string, unknown>;
  enabled?: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  impressions?: number;
  conversions?: number;
  rules?: PersonalisationRule[];
  createdBy?: string;
  createdAt?: string;
}

// Segment
export interface SegmentCriterion {
  field: string;
  operator: string;
  value: string | number;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  type?: string;
  criteria: SegmentCriterion[] | Record<string, unknown>;
  userCount: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  lastUpdated?: string;
}

// Audit Log
export interface AuditLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  category?: string;
  targetType: string;
  targetId: string;
  targetName: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  timestamp: string;
  ipAddress?: string;
  performedBy?: string;
  performedByName?: string;
  performedByRole?: string;
}

// Moderation Action
export interface ModerationAction {
  id: string;
  type: 'suspension' | 'warning' | 'content-removal' | 'warn' | 'mute' | 'ban' | 'unban';
  targetType: 'organizer' | 'user' | 'content';
  targetId: string;
  targetName: string;
  reason: string;
  evidence?: string[];
  performedBy: string;
  performedByName: string;
  createdAt: string;
  expiresAt?: string;
  appealed?: boolean;
  appealStatus?: 'pending' | 'approved' | 'rejected';
  appealReason?: string;
}

// Action Script
export interface ActionScriptAction {
  id: string;
  type: string;
  params: Record<string, unknown>;
  order: number;
}

export interface ActionScript {
  id: string;
  name: string;
  description: string;
  trigger: 'scheduled' | 'event-based';
  schedule?: string;
  event?: string;
  actions: ActionScriptAction[];
  enabled: boolean;
  lastRun?: string;
  lastRunStatus?: 'success' | 'failure';
  createdBy: string;
  createdAt: string;
}

// Cohort Data
export interface CohortData {
  cohortDate: string;
  cohortLabel: string;
  totalUsers: number;
  retention: number[];
}

// Featured Content
export interface FeaturedContent {
  id: string;
  type: 'tournament' | 'organizer' | 'banner' | 'announcement';
  targetId: string;
  targetName: string;
  position: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired';
  impressions: number;
  clicks: number;
  ctr: number;
}

// User Report
export interface UserReport {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedBy: string;
  reportedByName: string;
  reason: string;
  category: 'harassment' | 'cheating' | 'spam' | 'other';
  evidence?: string[];
  status: 'pending' | 'investigating' | 'reviewed' | 'resolved' | 'dismissed';
  matchId?: string;
  tournamentId?: string;
  createdAt: string;
  moderatorNotes?: string;
}

// SLA Metrics
export interface SLAMetricItem {
  id: string;
  name: string;
  compliance: number;
  target: string;
  current: string;
}

export interface SLAMetrics {
  averageResponseTime: number;
  averageResolutionTime: number;
  slaComplianceRate: number;
  ticketsResolved: number;
  ticketsPending: number;
  ticketsBreached: number;
}
