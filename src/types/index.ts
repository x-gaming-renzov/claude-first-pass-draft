// ===================================
// USER & ROLE TYPES
// ===================================

export type UserRole = 'super-admin' | 'business' | 'development' | 'support' | 'kie' | 'organiser';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: string;
  avatar?: string;
  lastActive: string;
  status: 'active' | 'invited' | 'suspended' | 'pending';
}

// ===================================
// ALERT TYPES
// ===================================

export type AlertSeverity = 'critical' | 'warning' | 'notice' | 'info';
export type AlertCategory = 'technical' | 'experimentation' | 'operational' | 'security';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  description: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
  metadata?: Record<string, string | number>;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  recipients: string[];
  enabled: boolean;
  category: AlertCategory;
}

// ===================================
// STAKEHOLDER TYPES
// ===================================

export interface StakeholderHealth {
  id: string;
  name: 'Project Team' | 'KIE Team' | 'Organisers';
  healthScore: number;
  previousScore: number;
  status: 'healthy' | 'needs-review' | 'critical';
  keyMetrics: {
    label: string;
    value: string | number;
    status: 'good' | 'warning' | 'critical';
  }[];
}

export interface CrossStakeholderMetric {
  metric: string;
  projectTeam: {
    value: string | number;
    trend: number;
    status: 'on-target' | 'above' | 'below';
    target?: string;
  };
  kieTeam: {
    value: string | number;
    trend: number;
    status: 'on-target' | 'above' | 'below';
    target?: string;
  };
  organisers: {
    value: string | number;
    trend: number;
    status: 'on-target' | 'above' | 'below';
    target?: string;
  };
}

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

// ===================================
// EXPERIMENTATION TYPES
// ===================================

export type ExperimentStatus = 'draft' | 'pending' | 'running' | 'analyzing' | 'completed';
export type ExperimentCategory = 'marketing' | 'ui-ux' | 'performance';
export type FeatureFlagStatus = 'on' | 'off' | 'partial';

export interface Experiment {
  id: string;
  name: string;
  description: string;
  hypothesis?: string;
  status: ExperimentStatus;
  category: ExperimentCategory;
  rolloutPercentage: number;
  targetRollout?: number;
  startDate: string;
  endDate?: string;
  dayNumber?: number;
  totalDays?: number;
  owner: string;
  variants: ExperimentVariant[];
  primaryMetric?: {
    name: string;
    control: number;
    variant: number;
    lift: number;
    confidence: number;
    targetConfidence: number;
  };
  secondaryMetrics?: {
    name: string;
    change: number;
  }[];
  rolloutHistory?: {
    date: string;
    percentage: number;
  }[];
}

export interface ExperimentVariant {
  id: string;
  name: string;
  traffic: number;
  conversions?: number;
  engagement?: number;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description?: string;
  status: FeatureFlagStatus;
  scope: string;
  rolloutPercentage?: number;
  lastModified: string;
  modifiedBy: string;
}

export interface ExperimentCollision {
  id: string;
  type: 'overlap' | 'sequential';
  severity: 'warning' | 'critical';
  experiments: string[];
  description: string;
  affectedUsers?: number;
  recommendation: string;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  type: 'onboarding' | 'feature-tour' | 'notification' | 'ui-variant';
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetSegments: string[];
  startDate?: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  impressions?: number;
  completionRate?: number;
}

export interface Personalisation {
  id: string;
  name: string;
  description?: string;
  type: 'content' | 'layout' | 'recommendation' | 'notification';
  rules: PersonalisationRule[];
  status: 'active' | 'inactive';
  priority: number;
  createdBy: string;
  createdAt: string;
}

export interface PersonalisationRule {
  id: string;
  condition: string;
  action: string;
  priority: number;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  type: 'static' | 'dynamic';
  criteria: SegmentCriteria[];
  userCount: number;
  lastUpdated: string;
  createdBy: string;
}

export interface SegmentCriteria {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'starts_with' | 'ends_with';
  value: string | number | string[];
}

// ===================================
// ORGANIZATION TYPES
// ===================================

export type OrganizationType = 'esports' | 'gaming-cafe' | 'educational' | 'corporate' | 'individual' | 'other';
export type OrganizationStatus = 'pending' | 'verified' | 'suspended' | 'rejected';
export type VerificationDocumentStatus = 'pending' | 'verified' | 'rejected';

export type OrganizationTier = 'basic' | 'verified' | 'pro';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  status: OrganizationStatus;
  tier?: OrganizationTier;
  verificationScore: number;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  createdAt: string;
  verifiedAt?: string;
  members: OrganizationMember[];
  documents: VerificationDocument[];
  tournamentsHosted: number;
  totalParticipants: number;
  rating: number;
  // Aliases for dashboard compatibility
  totalTournaments?: number;
  verificationDocs?: VerificationDocument[];
}

export interface OrganizationMember {
  userId: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  avatar?: string;
}

export interface VerificationDocument {
  id: string;
  type: 'business-registration' | 'id-proof' | 'address-proof' | 'tax-document' | 'other';
  status: VerificationDocumentStatus;
  fileName: string;
  uploadedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface OrganizerApplication {
  id: string;
  name: string;
  email: string;
  organization: string;
  organizationType: OrganizationType;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  appliedDate: string;
  tournamentsHosted?: number;
  reason?: string;
  documents?: VerificationDocument[];
  assignedTo?: string;
  reviewNotes?: string;
}

// ===================================
// TOURNAMENT TYPES
// ===================================

export type TournamentStatus = 'draft' | 'pending' | 'approved' | 'live' | 'completed' | 'cancelled' | 'rejected' | 'pending-approval' | 'upcoming';
export type TournamentTier = 'open' | 'amateur' | 'semi-pro' | 'pro';
export type GameMode = 'solo' | 'duo' | 'squad';
export type EntryType = 'open' | 'invite-only' | 'mixed';

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  organizerId: string;
  status: TournamentStatus;
  tier: TournamentTier;
  gameMode: GameMode;
  entryType: EntryType;
  startDate: string;
  endDate: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  participants: number;
  maxParticipants: number;
  impressions: number;
  engagement: number;
  prizePool?: number;
  entryFee?: number;
  rules?: string;
  description?: string;
  bannerUrl?: string;
  isFeatured: boolean;
  createdAt: string;
  // Dashboard display fields
  game?: string;
  format?: string;
  currentParticipants?: number;
  organizerName?: string;
}

export interface FeaturedContent {
  id: string;
  type: 'tournament' | 'organizer' | 'article' | 'banner';
  targetId: string;
  targetName: string;
  position: number;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'active' | 'expired';
  impressions: number;
  clicks: number;
  ctr: number;
  // Dashboard display fields
  title?: string;
  description?: string;
}

// ===================================
// MATCH TYPES
// ===================================

export type MatchStatus = 'scheduled' | 'lobby-created' | 'in-progress' | 'completed' | 'disputed' | 'cancelled' | 'live';

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  round: number;
  matchNumber: number;
  status: MatchStatus;
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  teams: MatchTeam[];
  lobbyCredentials?: LobbyCredentials;
  result?: MatchResult;
  // Dashboard display fields
  game?: string;
  map?: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface MatchTeam {
  id: string;
  name: string;
  players: string[];
  checkedIn: boolean;
  placement?: number;
  score?: number;
  isWinner?: boolean;
}

export interface LobbyCredentials {
  roomId: string;
  password: string;
  createdAt: string;
  sharedAt?: string;
  expiresAt?: string;
}

export interface MatchResult {
  winnerId?: string;
  placements: { teamId: string; teamName: string; position: number; score: number }[];
  submittedBy: string;
  submittedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  disputedBy?: string;
  disputeReason?: string;
  ocrUsed: boolean;
}

// ===================================
// REGISTRATION TYPES
// ===================================

export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted' | 'cancelled' | 'checked-in';
export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Registration {
  id: string;
  tournamentId: string;
  tournamentName: string;
  teamId?: string;
  teamName?: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: RegistrationStatus;
  registeredAt: string;
  approvedAt?: string;
  paidAmount?: number;
  paymentStatus?: PaymentStatus;
  gameId?: string;
}

// ===================================
// SUPPORT TICKET TYPES
// ===================================

export type TicketChannel = 1 | 2 | 3; // 1: App Users, 2: Tournament Players, 3: Organizers
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical';
export type TicketStatus = 'open' | 'in-progress' | 'waiting-response' | 'resolved' | 'closed' | 'escalated';
export type TicketCategory =
  | 'technical-issue'
  | 'payment'
  | 'account'
  | 'tournament-query'
  | 'registration'
  | 'match-issue'
  | 'results-dispute'
  | 'verification'
  | 'report-abuse'
  | 'feature-request'
  | 'payout'
  | 'other';

export interface Ticket {
  id: string;
  channel: TicketChannel;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  createdBy: string;
  createdByName: string;
  createdByEmail: string;
  assignedTo?: string;
  assignedToName?: string;
  tournamentId?: string;
  tournamentName?: string;
  organizerId?: string;
  organizerName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  slaDeadline: string;
  slaBreach: boolean;
  messages: TicketMessage[];
  escalationLevel: 0 | 1 | 2 | 3;
  tags?: string[];
  // Dashboard display fields
  userId?: string;
  escalated?: boolean;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'support' | 'system' | 'organizer';
  content: string;
  attachments?: string[];
  createdAt: string;
  isInternal?: boolean;
  // Dashboard display aliases
  sender?: string;
  timestamp?: string;
  message?: string;
}

// ===================================
// ACCESS & PERMISSION TYPES
// ===================================

export type AccessRequestType = 'new-access' | 'role-change' | 'permission-escalation' | 'data-export';

export interface AccessRequest {
  id: string;
  type: AccessRequestType;
  requester: {
    name: string;
    email: string;
    role: UserRole;
  };
  targetUser?: {
    name: string;
    email: string;
  };
  requestedRole?: UserRole;
  requestedPermission?: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'denied';
  scope?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface PermissionMatrix {
  feature: string;
  permissions: Record<UserRole, boolean>;
}

// ===================================
// AUDIT & ACTIVITY TYPES
// ===================================

export type AuditCategory = 'user' | 'tournament' | 'organization' | 'system' | 'moderation' | 'payment' | 'experiment' | 'feature' | 'access' | 'security' | 'data';

export interface ActivityLogEntry {
  id: string;
  action: string;
  user: string;
  userRole: UserRole;
  timestamp: string;
  category: AuditCategory;
  severity?: 'normal' | 'warning' | 'critical';
  details?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  category: AuditCategory;
  performedBy: string;
  performedByName: string;
  performedByRole: UserRole;
  targetType: string;
  targetId: string;
  targetName?: string;
  previousValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ===================================
// MODERATION TYPES
// ===================================

export type ModerationType = 'warning' | 'content-removal' | 'suspension' | 'ban' | 'appeal-review';
export type ModerationTargetType = 'user' | 'organizer' | 'tournament' | 'content' | 'team';

export interface ModerationAction {
  id: string;
  type: ModerationType;
  targetType: ModerationTargetType;
  targetId: string;
  targetName: string;
  reason: string;
  evidence?: string[];
  performedBy: string;
  performedByName: string;
  createdAt: string;
  expiresAt?: string;
  appealed: boolean;
  appealStatus?: 'pending' | 'approved' | 'rejected';
  appealReason?: string;
  appealReviewedBy?: string;
  appealReviewedAt?: string;
}

export interface UserReport {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedBy: string;
  reportedByName: string;
  reason: string;
  category: 'cheating' | 'harassment' | 'inappropriate-content' | 'spam' | 'impersonation' | 'other';
  evidence?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  tournamentId?: string;
  matchId?: string;
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
  moderatorNotes?: string;
}

// ===================================
// SYSTEM & CONFIGURATION TYPES
// ===================================

export type DataSourceStatus = 'healthy' | 'slow' | 'offline';

export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'warehouse' | 'cache';
  status: DataSourceStatus;
  latency: number;
  lastSync: string;
  recordsPerHour: number;
  errorRate?: number;
}

export interface ActionScript {
  id: string;
  name: string;
  description: string;
  trigger: 'manual' | 'scheduled' | 'event-based';
  schedule?: string;
  event?: string;
  actions: ScriptAction[];
  enabled: boolean;
  lastRun?: string;
  lastRunStatus?: 'success' | 'failed' | 'partial';
  createdBy: string;
  createdAt: string;
}

export interface ScriptAction {
  id: string;
  type: string;
  params: Record<string, unknown>;
  order: number;
}

export interface PlatformSettings {
  sessionTimeout: number;
  twoFactorRequired: 'all' | 'admins-only' | 'none';
  passwordExpiry: number;
  dataRetentionDays: number;
  piiMasking: boolean;
  exportWatermarking: boolean;
  defaultDateRange: number;
  defaultTimezone: string;
  numberFormat: 'indian' | 'international';
}

export interface ExtendedPlatformSettings extends PlatformSettings {
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  registrationEnabled: boolean;
  tournamentCreationEnabled: boolean;
  paymentGatewayEnabled: boolean;
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  digestFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
}

// ===================================
// ANALYTICS & METRICS TYPES
// ===================================

export interface CohortData {
  cohortDate: string;
  cohortLabel: string;
  totalUsers: number;
  retention: number[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  target?: number;
  targetLabel?: string;
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

export interface PendingApproval {
  category: string;
  count: number;
  oldestDays: number;
}

// ===================================
// CRASH REPORT TYPES
// ===================================

export interface CrashReport {
  id: string;
  title: string;
  location: string;
  occurrences: number;
  affectedUsers: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastSeen: string;
  status?: 'new' | 'investigating' | 'resolved';
}

// ===================================
// SLA & PERFORMANCE TYPES
// ===================================

export interface SLAMetrics {
  averageResponseTime: number;
  averageResolutionTime: number;
  slaComplianceRate: number;
  ticketsResolved: number;
  ticketsPending: number;
  ticketsBreached: number;
}

// Individual SLA metric items (for array-based display)
export interface SLAMetricItem {
  id: string;
  name: string;
  compliance: number;
  current: string;
  target: string;
}

// ===================================
// DASHBOARD SPECIFIC TYPES
// ===================================

export interface DashboardTab {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  href: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}
