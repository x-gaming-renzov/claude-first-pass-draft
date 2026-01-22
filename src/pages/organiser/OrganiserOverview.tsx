import { Trophy, Users, Eye, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { AreaChartComponent, BarChartComponent } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tournaments, impressionData } from '@/data/mock-data';
import { Link } from 'react-router-dom';

export function OrganiserOverview() {
  const myTournaments = tournaments.slice(0, 3);
  const totalImpressions = impressionData.reduce((sum, d) => sum + (d.impressions as number), 0);
  const totalClicks = impressionData.reduce((sum, d) => sum + (d.clicks as number), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Organiser Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your tournaments and track engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Tournaments"
          value={myTournaments.filter(t => t.status === 'live').length}
          change={1}
          changeType="positive"
          icon={Trophy}
        />
        <MetricCard
          title="Total Participants"
          value="3.8K"
          change={24}
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Total Impressions"
          value={`${(totalImpressions / 1000).toFixed(1)}K`}
          change={18}
          changeType="positive"
          icon={Eye}
        />
        <MetricCard
          title="Engagement Rate"
          value={`${((totalClicks / totalImpressions) * 100).toFixed(1)}%`}
          change={2.5}
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartComponent
          title="Impressions Over Time"
          data={impressionData}
          dataKey="impressions"
          secondaryDataKey="clicks"
        />
        <BarChartComponent
          title="Tournament Engagement"
          data={myTournaments.map(t => ({
            name: t.name.slice(0, 15) + '...',
            value: t.engagement,
          }))}
          dataKey="value"
          color="hsl(var(--chart-2))"
        />
      </div>

      {/* My Tournaments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">My Tournaments</CardTitle>
          <Link to="/organiser/tournaments">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{tournament.name}</p>
                    <Badge
                      variant={
                        tournament.status === 'live' ? 'success' :
                        tournament.status === 'completed' ? 'secondary' :
                        tournament.status === 'approved' ? 'default' : 'outline'
                      }
                    >
                      {tournament.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tournament.startDate} - {tournament.endDate}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-sm font-medium">{tournament.participants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tournament.impressions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">impressions</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tournament.engagement}%</p>
                    <p className="text-xs text-muted-foreground">engagement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Create Tournament</p>
                <p className="text-sm text-muted-foreground">Start a new tournament</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Link to="/organiser/analytics">
          <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">Detailed performance data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/organiser/impressions">
          <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Sponsor Reports</p>
                  <p className="text-sm text-muted-foreground">Engagement for sponsors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
