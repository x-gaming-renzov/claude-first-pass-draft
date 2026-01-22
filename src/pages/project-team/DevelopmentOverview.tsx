import { Activity, Bug, AlertTriangle, Zap } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { LineChartComponent, BarChartComponent } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { crashReports, healthMetrics } from '@/data/mock-data';

const severityColors: Record<string, 'destructive' | 'warning' | 'secondary' | 'default'> = {
  critical: 'destructive',
  high: 'warning',
  medium: 'secondary',
  low: 'default',
};

export function DevelopmentOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Development Overview</h2>
        <p className="text-muted-foreground">
          Monitor app health, crashes, and performance metrics
        </p>
      </div>

      {/* Health Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Crash-Free Rate"
          value={`${healthMetrics.crashFreeRate}%`}
          change={0.3}
          changeType="positive"
          icon={Activity}
        />
        <MetricCard
          title="Avg Response Time"
          value={healthMetrics.avgResponseTime}
          suffix="ms"
          change={-12}
          changeType="positive"
          icon={Zap}
        />
        <MetricCard
          title="Error Rate"
          value={`${healthMetrics.errorRate}%`}
          change={-0.2}
          changeType="positive"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Active Users"
          value={healthMetrics.activeUsers.toLocaleString()}
          change={8.5}
          changeType="positive"
          icon={Activity}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LineChartComponent
          title="Response Time Trend"
          data={[
            { name: 'Mon', value: 245 },
            { name: 'Tue', value: 238 },
            { name: 'Wed', value: 252 },
            { name: 'Thu', value: 241 },
            { name: 'Fri', value: 235 },
            { name: 'Sat', value: 228 },
            { name: 'Sun', value: 232 },
          ]}
          dataKey="value"
          color="hsl(var(--chart-2))"
        />
        <BarChartComponent
          title="Error Distribution"
          data={[
            { name: 'Network', value: 320 },
            { name: 'Memory', value: 180 },
            { name: 'Null Ptr', value: 145 },
            { name: 'Timeout', value: 98 },
            { name: 'Other', value: 65 },
          ]}
          dataKey="value"
          color="hsl(var(--chart-1))"
        />
      </div>

      {/* Health Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Session Crash Rate</span>
                <span className="text-sm font-medium">{healthMetrics.sessionCrashRate}%</span>
              </div>
              <Progress value={healthMetrics.sessionCrashRate * 10} className="h-2" />
              <p className="text-xs text-green-600">Below threshold (1%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ANR Rate</span>
                <span className="text-sm font-medium">{healthMetrics.anrRate}%</span>
              </div>
              <Progress value={healthMetrics.anrRate * 10} className="h-2" />
              <p className="text-xs text-green-600">Below threshold (0.5%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crash-Free Users</span>
                <span className="text-sm font-medium">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2" />
              <p className="text-xs text-green-600">Above target (97%)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crash Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Crash Reports</CardTitle>
          <Badge variant="outline">{crashReports.length} issues</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crashReports.map((crash) => (
              <div
                key={crash.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{crash.title}</span>
                    <Badge variant={severityColors[crash.severity]}>
                      {crash.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    {crash.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{crash.occurrences} occurrences</p>
                  <p className="text-xs text-muted-foreground">
                    {crash.affectedUsers} users affected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last seen: {crash.lastSeen}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Frustration Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Frustration Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Rage Taps', value: 234, location: 'Match Results', change: -15 },
              { label: 'Dead Clicks', value: 567, location: 'Tournament List', change: -8 },
              { label: 'Back Loops', value: 189, location: 'Profile Settings', change: +12 },
              { label: 'Quick Exits', value: 445, location: 'Onboarding', change: -22 },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
                <p className={`text-xs ${item.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change > 0 ? '+' : ''}{item.change}% vs last week
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
