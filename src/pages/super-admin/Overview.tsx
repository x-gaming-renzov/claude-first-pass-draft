import { Link } from 'react-router-dom';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  FlaskConical,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  Trophy,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  stakeholderHealth,
  criticalAlerts,
  platformActivity,
  experiments,
  pendingApprovals,
} from '@/data/mock-data';

export function SuperAdminOverview() {
  const runningExperiments = experiments.filter(e => e.status === 'running');
  const analyzingExperiments = experiments.filter(e => e.status === 'analyzing');
  const needsReviewExperiments = [...runningExperiments, ...analyzingExperiments].filter(
    e => e.primaryMetric && (e.primaryMetric.confidence >= 95 || e.primaryMetric.lift < -5)
  );
  const totalPending = pendingApprovals.reduce((sum, p) => sum + p.count, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, James</h2>
        <p className="text-muted-foreground">
          Platform overview and health status across all stakeholder groups.
        </p>
      </div>

      {/* Card 1.1: Stakeholder Health Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        {stakeholderHealth.map((stakeholder) => {
          const trend = stakeholder.healthScore - stakeholder.previousScore;
          const trendPositive = trend > 0;
          return (
            <Link key={stakeholder.id} to={`/super-admin/stakeholders`}>
              <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {stakeholder.name}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold">{stakeholder.healthScore}</span>
                        <span className="text-lg text-muted-foreground">/100</span>
                      </div>
                    </div>
                    {stakeholder.status === 'needs-review' && (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant={stakeholder.status === 'healthy' ? 'default' : 'secondary'}
                      className={
                        stakeholder.status === 'healthy'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : stakeholder.status === 'needs-review'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                          : 'bg-red-100 text-red-700 hover:bg-red-100'
                      }
                    >
                      {stakeholder.status === 'healthy'
                        ? 'Healthy'
                        : stakeholder.status === 'needs-review'
                        ? 'Needs Review'
                        : 'Critical'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {trendPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={trendPositive ? 'text-green-600' : 'text-red-600'}>
                      {trendPositive ? '+' : ''}{trend}%
                    </span>
                    <span className="text-muted-foreground">from last week</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Card 1.2: Critical Alerts Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Critical Alerts
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {alert.severity === 'critical' ? (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    ) : alert.severity === 'warning' ? (
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                    <Badge
                      variant="outline"
                      className={
                        alert.severity === 'critical'
                          ? 'border-red-200 text-red-700 bg-red-50'
                          : alert.severity === 'warning'
                          ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                          : 'border-blue-200 text-blue-700 bg-blue-50'
                      }
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                  </div>
                </div>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">
                  {alert.metadata?.affectedUsers && `Affected: ${formatNumber(alert.metadata.affectedUsers as number)} users | `}
                  Source: {alert.source}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                  <Button size="sm" variant="ghost">
                    Acknowledge
                  </Button>
                  <Button size="sm" variant="ghost">
                    Assign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row: Experiments Overview + Platform Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1.3: Active Experiments Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Active Experiments
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{runningExperiments.length} Running</Badge>
              <Link to="/super-admin/experiments">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-semibold text-green-600">
                  {runningExperiments.filter(e => !e.primaryMetric || e.primaryMetric.lift > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">On Track</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-semibold text-yellow-600">
                  {needsReviewExperiments.length}
                </p>
                <p className="text-xs text-muted-foreground">Needs Review</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-semibold text-red-600">
                  {runningExperiments.filter(e => e.primaryMetric && e.primaryMetric.lift < -5).length}
                </p>
                <p className="text-xs text-muted-foreground">Failing</p>
              </div>
            </div>

            {analyzingExperiments.length > 0 && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 mb-3">
                <div className="flex items-center gap-2 text-yellow-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium text-sm">
                    "{analyzingExperiments[0].name}" - Statistical significance reached
                  </span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Decision needed: Promote to 100% or rollback?
                </p>
                <Link to="/super-admin/experiments">
                  <Button size="sm" variant="outline" className="mt-2">
                    View Details
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/super-admin/experiments">
              <Button variant="outline" className="w-full">
                View All Experiments
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Card 1.4: Platform Activity Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Activity (Last 24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">DAU</span>
                </div>
                <p className="text-2xl font-semibold">{formatNumber(platformActivity.dau)}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600">+{platformActivity.dauChange}%</span>
                </div>
              </div>
              <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sessions</span>
                </div>
                <p className="text-2xl font-semibold">{formatNumber(platformActivity.sessions)}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600">+{platformActivity.sessionsChange}%</span>
                </div>
              </div>
              <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Events Tracked</span>
                </div>
                <p className="text-2xl font-semibold">{formatNumber(platformActivity.eventsTracked)}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600">+{platformActivity.eventsChange}%</span>
                </div>
              </div>
              <div className="space-y-1 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tournaments Live</span>
                </div>
                <p className="text-2xl font-semibold">{platformActivity.tournamentsLive}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-600">{platformActivity.tournamentsChange}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card 1.5: Pending Approvals Queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Your Action
            <Badge variant="secondary">{totalPending}</Badge>
          </CardTitle>
          <Button variant="ghost" size="sm">
            Review All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.category} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-semibold">{item.count}</span>
                  </div>
                  <Progress value={(item.count / totalPending) * 100} className="h-2" />
                </div>
              </div>
            ))}
            <div className="pt-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              Oldest item: {Math.max(...pendingApprovals.map(p => p.oldestDays))} days ago (Access request from KIE)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link to="/super-admin/users">
          <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">User Management</p>
                <p className="text-sm text-muted-foreground">Manage access & permissions</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/super-admin/experiments">
          <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <FlaskConical className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Experiments</p>
                <p className="text-sm text-muted-foreground">Control A/B tests & flags</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/super-admin/stakeholders">
          <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Stakeholders</p>
                <p className="text-sm text-muted-foreground">Cross-team analytics</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/super-admin/settings">
          <Card className="hover:bg-secondary/30 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Configuration</p>
                <p className="text-sm text-muted-foreground">System settings</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
