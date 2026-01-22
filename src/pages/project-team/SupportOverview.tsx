import { Users, Trophy, Activity, TrendingUp, Bug } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { userGrowthData, tournaments, crashReports, organizerApplications } from '@/data/mock-data';
import { AreaChartComponent } from '@/components/charts';

export function SupportOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Support Admin Overview</h2>
        <p className="text-muted-foreground">
          Cross-stakeholder visibility and control panel
        </p>
      </div>

      {/* Quick Access */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value="125.4K"
          change={12.5}
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Active Tournaments"
          value="48"
          change={8}
          changeType="positive"
          icon={Trophy}
        />
        <MetricCard
          title="Open Issues"
          value={crashReports.length}
          change={-2}
          changeType="positive"
          icon={Bug}
        />
        <MetricCard
          title="Platform Health"
          value="98.2%"
          change={0.3}
          changeType="positive"
          icon={Activity}
        />
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="kie">KIE</TabsTrigger>
          <TabsTrigger value="organisers">Organisers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          {/* User Growth Chart */}
          <AreaChartComponent
            title="Platform User Growth"
            data={userGrowthData}
            dataKey="value"
            secondaryDataKey="active"
          />

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/project-team/business">
              <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Business Dashboard</p>
                      <p className="text-sm text-muted-foreground">View KPIs and metrics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/project-team/development">
              <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900">
                      <Bug className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Development Dashboard</p>
                      <p className="text-sm text-muted-foreground">Monitor health & crashes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/kie">
              <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                      <Trophy className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">KIE Dashboard</p>
                      <p className="text-sm text-muted-foreground">Manage tournaments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Business Metrics Summary</CardTitle>
              <Link to="/project-team/business">
                <Button variant="outline" size="sm">Full Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold">125.4K</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">45.2K</p>
                  <p className="text-sm text-muted-foreground">DAU</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">72%</p>
                  <p className="text-sm text-muted-foreground">D7 Retention</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">4.2%</p>
                  <p className="text-sm text-muted-foreground">Churn Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Critical Issues</CardTitle>
              <Link to="/project-team/development">
                <Button variant="outline" size="sm">Full Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crashReports.filter(c => c.severity === 'critical' || c.severity === 'high').map((crash) => (
                  <div key={crash.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{crash.title}</p>
                      <p className="text-xs text-muted-foreground">{crash.occurrences} occurrences</p>
                    </div>
                    <Badge variant={crash.severity === 'critical' ? 'destructive' : 'warning'}>
                      {crash.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kie" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Applications</CardTitle>
              <Link to="/kie">
                <Button variant="outline" size="sm">Full Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {organizerApplications.filter(a => a.status === 'pending').map((app) => (
                  <div key={app.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.organization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organisers" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Tournaments</CardTitle>
              <Link to="/organiser">
                <Button variant="outline" size="sm">Full Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tournaments.filter(t => t.status === 'live' || t.status === 'approved').map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{tournament.name}</p>
                      <p className="text-xs text-muted-foreground">{tournament.organizer}</p>
                    </div>
                    <Badge variant={tournament.status === 'live' ? 'success' : 'secondary'}>
                      {tournament.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
