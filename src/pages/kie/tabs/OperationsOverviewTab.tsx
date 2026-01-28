import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Trophy,
  FileCheck,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  organizations,
  tournaments,
  tickets,
  slaMetrics,
} from '@/data/mock-data';

export function OperationsOverviewTab() {
  // Calculate pending counts
  const pendingApplications = organizations.filter(
    (org) => org.status === 'pending'
  ).length;
  const pendingTournaments = tournaments.filter(
    (t) => t.status === 'pending-approval'
  ).length;
  const openTickets = tickets.filter(
    (t) => t.status === 'open' || t.status === 'in-progress'
  ).length;
  const escalatedTickets = tickets.filter(
    (t) => t.priority === 'critical' || t.priority === 'high'
  ).length;

  // Calculate SLA compliance
  const slaCompliant = slaMetrics.filter((m) => m.compliance >= 95).length;
  const slaAtRisk = slaMetrics.filter(
    (m) => m.compliance >= 85 && m.compliance < 95
  ).length;
  const slaBreach = slaMetrics.filter((m) => m.compliance < 85).length;

  return (
    <div className="space-y-6">
      {/* Pending Queues */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Applications
            </CardTitle>
            <FileCheck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Oldest: 3 days ago
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm">
              Review Queue <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tournament Approvals
            </CardTitle>
            <Trophy className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingTournaments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 scheduled for today
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm">
              Review Queue <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tickets
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {escalatedTickets} escalated
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm">
              View Tickets <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reports Pending
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 high priority
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm">
              Review Reports <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health & SLA Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Health */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API Services</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Match Services</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Payment Gateway</span>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-500">Degraded</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Database Cluster</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>CDN Services</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SLA Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              SLA Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold text-green-500">{slaCompliant}</div>
                <div className="text-xs text-muted-foreground">On Target</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                <div className="text-2xl font-bold text-yellow-500">{slaAtRisk}</div>
                <div className="text-xs text-muted-foreground">At Risk</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-500/10">
                <div className="text-2xl font-bold text-red-500">{slaBreach}</div>
                <div className="text-xs text-muted-foreground">Breached</div>
              </div>
            </div>

            <div className="space-y-3">
              {slaMetrics.slice(0, 4).map((metric) => (
                <div key={metric.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{metric.name}</span>
                    <span
                      className={
                        metric.compliance >= 95
                          ? 'text-green-500'
                          : metric.compliance >= 85
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }
                    >
                      {metric.compliance}%
                    </span>
                  </div>
                  <Progress
                    value={metric.compliance}
                    className={`h-2 ${
                      metric.compliance >= 95
                        ? '[&>div]:bg-green-500'
                        : metric.compliance >= 85
                        ? '[&>div]:bg-yellow-500'
                        : '[&>div]:bg-red-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Activity & Recent Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Organizers</p>
                    <p className="text-xs text-muted-foreground">Approved today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-green-500 flex items-center justify-end">
                    <TrendingUp className="h-3 w-3 mr-1" /> +3 vs avg
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Tournaments Approved</p>
                    <p className="text-xs text-muted-foreground">Approved today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-green-500 flex items-center justify-end">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5 vs avg
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Tickets Resolved</p>
                    <p className="text-xs text-muted-foreground">Closed today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-red-500 flex items-center justify-end">
                    <TrendingDown className="h-3 w-3 mr-1" /> -8 vs avg
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Reports Actioned</p>
                    <p className="text-xs text-muted-foreground">Processed today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">on target</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tournaments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Live Tournaments</CardTitle>
            <Badge variant="outline" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {tournaments.filter((t) => t.status === 'live').length} Active
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tournaments
                .filter((t) => t.status === 'live')
                .slice(0, 4)
                .map((tournament) => (
                  <div
                    key={tournament.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{tournament.name}</p>
                      <p className="text-xs text-muted-foreground">
                        by {tournament.organizerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {tournament.currentParticipants}/{tournament.maxParticipants}
                      </p>
                      <p className="text-xs text-muted-foreground">participants</p>
                    </div>
                  </div>
                ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Live Tournaments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileCheck className="h-5 w-5" />
              <span>Review Applications</span>
              <Badge variant="secondary">{pendingApplications} pending</Badge>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Trophy className="h-5 w-5" />
              <span>Approve Tournaments</span>
              <Badge variant="secondary">{pendingTournaments} pending</Badge>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Handle Tickets</span>
              <Badge variant="secondary">{openTickets} open</Badge>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Review Reports</span>
              <Badge variant="secondary">12 pending</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
