import { Users, Trophy, FileCheck, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { AreaChartComponent, BarChartComponent } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { organizerApplications, tournaments, applicationTrendData } from '@/data/mock-data';
import { Link } from 'react-router-dom';

export function KIEOverview() {
  const pendingApplications = organizerApplications.filter(a => a.status === 'pending');
  const activeTournaments = tournaments.filter(t => t.status === 'live' || t.status === 'approved');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">KIE Dashboard</h2>
        <p className="text-muted-foreground">
          Manage organizer applications and tournament approvals
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Pending Applications"
          value={pendingApplications.length}
          change={3}
          changeType="neutral"
          icon={FileCheck}
        />
        <MetricCard
          title="Active Organisers"
          value="156"
          change={12}
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Live Tournaments"
          value={tournaments.filter(t => t.status === 'live').length}
          change={2}
          changeType="positive"
          icon={Trophy}
        />
        <MetricCard
          title="Total Participants"
          value="45.2K"
          change={18}
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartComponent
          title="Application Trends"
          data={applicationTrendData}
          dataKey="organizers"
          secondaryDataKey="tournaments"
        />
        <BarChartComponent
          title="Tournaments by Status"
          data={[
            { name: 'Pending', value: tournaments.filter(t => t.status === 'pending').length },
            { name: 'Approved', value: tournaments.filter(t => t.status === 'approved').length },
            { name: 'Live', value: tournaments.filter(t => t.status === 'live').length },
            { name: 'Completed', value: tournaments.filter(t => t.status === 'completed').length },
          ]}
          dataKey="value"
        />
      </div>

      {/* Pending Applications and Active Tournaments */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Pending Applications</CardTitle>
            <Link to="/kie/applications">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.organization}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{app.appliedDate}</span>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              ))}
              {pendingApplications.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending applications
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Tournaments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Active Tournaments</CardTitle>
            <Link to="/kie/tournaments">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeTournaments.slice(0, 4).map((tournament) => (
                <div
                  key={tournament.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{tournament.name}</p>
                      <Badge variant={tournament.status === 'live' ? 'success' : 'secondary'}>
                        {tournament.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{tournament.organizer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{tournament.participants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Application approved', subject: 'ESports India', time: '2 hours ago' },
              { action: 'Tournament started', subject: 'Winter Championship 2026', time: '4 hours ago' },
              { action: 'New application received', subject: 'Gaming Hub Chennai', time: '6 hours ago' },
              { action: 'Application rejected', subject: 'Unknown Gaming', time: '1 day ago' },
              { action: 'Tournament completed', subject: 'Pro Series Season 2', time: '2 days ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
