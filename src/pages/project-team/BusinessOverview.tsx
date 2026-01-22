import { Users, TrendingUp, Clock, UserMinus } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { AreaChartComponent, LineChartComponent, FunnelChartComponent } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { userGrowthData, retentionData, engagementData, funnelData } from '@/data/mock-data';

export function BusinessOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Business Overview</h2>
        <p className="text-muted-foreground">
          Track key business metrics and user analytics
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
          title="DAU"
          value="45.2K"
          change={8.3}
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg. Session"
          value="12.5"
          suffix="min"
          change={5.2}
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Churn Rate"
          value="4.2%"
          change={-0.8}
          changeType="positive"
          icon={UserMinus}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChartComponent
          title="User Growth"
          data={userGrowthData}
          dataKey="value"
          secondaryDataKey="active"
        />
        <LineChartComponent
          title="Retention Curve"
          data={retentionData}
          dataKey="value"
          color="hsl(var(--chart-2))"
        />
      </div>

      {/* Funnel and Engagement */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FunnelChartComponent
          title="User Funnel"
          data={funnelData}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData.map((day) => (
                <div key={day.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{day.name}</span>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">{(day.sessions as number).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">sessions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{day.duration} min</p>
                      <p className="text-xs text-muted-foreground">avg duration</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top User Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Segment</th>
                  <th className="text-right py-3 px-4 font-medium">Users</th>
                  <th className="text-right py-3 px-4 font-medium">Retention</th>
                  <th className="text-right py-3 px-4 font-medium">Avg. Revenue</th>
                  <th className="text-right py-3 px-4 font-medium">LTV</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { segment: 'Power Users', users: '12.5K', retention: '78%', revenue: '$42', ltv: '$180' },
                  { segment: 'Tournament Players', users: '28.3K', retention: '65%', revenue: '$28', ltv: '$120' },
                  { segment: 'Casual Gamers', users: '45.2K', retention: '45%', revenue: '$8', ltv: '$35' },
                  { segment: 'New Users (30d)', users: '18.4K', retention: '52%', revenue: '$5', ltv: '$22' },
                ].map((row) => (
                  <tr key={row.segment} className="border-b">
                    <td className="py-3 px-4">{row.segment}</td>
                    <td className="text-right py-3 px-4">{row.users}</td>
                    <td className="text-right py-3 px-4">{row.retention}</td>
                    <td className="text-right py-3 px-4">{row.revenue}</td>
                    <td className="text-right py-3 px-4">{row.ltv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
