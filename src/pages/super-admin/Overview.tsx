import { Users, Trophy, Activity, FlaskConical, Building2 } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { AreaChartComponent, BarChartComponent } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { userGrowthData, experiments } from '@/data/mock-data';
import { Link } from 'react-router-dom';

export function SuperAdminOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, James</h2>
        <p className="text-muted-foreground">
          Here's an overview of all stakeholder activities and platform health.
        </p>
      </div>

      {/* Key Metrics */}
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
          title="Running Experiments"
          value="6"
          change={2}
          changeType="neutral"
          icon={FlaskConical}
        />
        <MetricCard
          title="Platform Health"
          value="98.2%"
          change={0.3}
          changeType="positive"
          icon={Activity}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartComponent
          title="User Growth"
          data={userGrowthData}
          dataKey="value"
          secondaryDataKey="active"
        />
        <BarChartComponent
          title="Weekly Sessions"
          data={[
            { name: 'Mon', value: 4200 },
            { name: 'Tue', value: 3800 },
            { name: 'Wed', value: 5100 },
            { name: 'Thu', value: 4600 },
            { name: 'Fri', value: 5800 },
            { name: 'Sat', value: 7200 },
            { name: 'Sun', value: 6800 },
          ]}
          dataKey="value"
        />
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Experiments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Active Experiments</CardTitle>
            <Link to="/super-admin/experiments">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {experiments.filter(e => e.status === 'running').slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-sm">{exp.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exp.rolloutPercentage}% rollout
                    </p>
                  </div>
                  <Badge variant={exp.category === 'marketing' ? 'default' : 'secondary'}>
                    {exp.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stakeholder Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Stakeholder Overview</CardTitle>
            <Link to="/super-admin/stakeholders">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Project Team', users: 24, icon: Building2 },
                { name: 'KIE Team', users: 8, icon: Trophy },
                { name: 'Organisers', users: 156, icon: Users },
              ].map((stakeholder) => (
                <div
                  key={stakeholder.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-secondary p-2">
                      <stakeholder.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">{stakeholder.name}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stakeholder.users} users
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New experiment created', time: '2 hours ago', type: 'experiment' },
                { action: 'Tournament approved', time: '4 hours ago', type: 'tournament' },
                { action: 'User role updated', time: '5 hours ago', type: 'user' },
                { action: 'Feature flag enabled', time: '1 day ago', type: 'feature' },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{activity.action}</span>
                  <span className="text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
