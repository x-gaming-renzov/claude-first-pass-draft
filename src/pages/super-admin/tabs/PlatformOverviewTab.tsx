import { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  Trophy,
  Activity,
  Edit3,
  UserPlus,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  stakeholderHealth,
  platformActivity,
} from '@/data/mock-data';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Mock data for DAU/MAU/WAU trends
const dauData = [
  { date: 'Jan 1', value: 12500 },
  { date: 'Jan 2', value: 13200 },
  { date: 'Jan 3', value: 11800 },
  { date: 'Jan 4', value: 14500 },
  { date: 'Jan 5', value: 15200 },
  { date: 'Jan 6', value: 16800 },
  { date: 'Jan 7', value: 15500 },
  { date: 'Jan 8', value: 14200 },
  { date: 'Jan 9', value: 13800 },
  { date: 'Jan 10', value: 15100 },
  { date: 'Jan 11', value: 16500 },
  { date: 'Jan 12', value: 17200 },
  { date: 'Jan 13', value: 18500 },
  { date: 'Jan 14', value: 17800 },
];

const wauData = [
  { date: 'Week 1', value: 45000 },
  { date: 'Week 2', value: 48500 },
  { date: 'Week 3', value: 52000 },
  { date: 'Week 4', value: 56500 },
  { date: 'Week 5', value: 61000 },
  { date: 'Week 6', value: 58500 },
  { date: 'Week 7', value: 63000 },
  { date: 'Week 8', value: 67500 },
];

const mauData = [
  { date: 'Aug', value: 125000 },
  { date: 'Sep', value: 142000 },
  { date: 'Oct', value: 158000 },
  { date: 'Nov', value: 175000 },
  { date: 'Dec', value: 192000 },
  { date: 'Jan', value: 215000 },
];

// Mock data for Signups
const signupDailyData = [
  { date: 'Jan 1', value: 320 },
  { date: 'Jan 2', value: 450 },
  { date: 'Jan 3', value: 380 },
  { date: 'Jan 4', value: 520 },
  { date: 'Jan 5', value: 680 },
  { date: 'Jan 6', value: 750 },
  { date: 'Jan 7', value: 620 },
  { date: 'Jan 8', value: 480 },
  { date: 'Jan 9', value: 390 },
  { date: 'Jan 10', value: 550 },
  { date: 'Jan 11', value: 720 },
  { date: 'Jan 12', value: 830 },
  { date: 'Jan 13', value: 920 },
  { date: 'Jan 14', value: 780 },
];

const signupWeeklyData = [
  { date: 'Week 1', value: 2100 },
  { date: 'Week 2', value: 2450 },
  { date: 'Week 3', value: 2800 },
  { date: 'Week 4', value: 3200 },
  { date: 'Week 5', value: 3650 },
  { date: 'Week 6', value: 3400 },
  { date: 'Week 7', value: 4100 },
  { date: 'Week 8', value: 4500 },
];

const signupMonthlyData = [
  { date: 'Aug', value: 8500 },
  { date: 'Sep', value: 9800 },
  { date: 'Oct', value: 11200 },
  { date: 'Nov', value: 13500 },
  { date: 'Dec', value: 15800 },
  { date: 'Jan', value: 18200 },
];

type ActiveUsersMetric = 'DAU' | 'WAU' | 'MAU';
type SignupPeriod = 'daily' | 'weekly' | 'monthly';

// Key Insights for Super Admin
type InsightTag = 'growth' | 'warning' | 'success';

interface KeyInsight {
  text: string;
  tag: InsightTag;
  tagLabel: string;
}

const keyInsights: KeyInsight[] = [
  {
    text: 'Platform DAU increased 12% this week, driven by 3 new featured tournaments',
    tag: 'growth',
    tagLabel: 'Growth',
  },
  {
    text: 'Organiser health score dropped 5 points - 8 organisers have pending payouts over 7 days',
    tag: 'warning',
    tagLabel: 'Attention',
  },
  {
    text: 'Signup conversion improved to 68% after onboarding flow update',
    tag: 'success',
    tagLabel: 'Success',
  },
];

const tagColors: Record<InsightTag, { bg: string; text: string; dot: string }> = {
  growth: { bg: 'bg-blue-500/10', text: 'text-blue-500', dot: 'bg-blue-500' },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', dot: 'bg-yellow-500' },
  success: { bg: 'bg-green-500/10', text: 'text-green-500', dot: 'bg-green-500' },
};

export function PlatformOverviewTab() {
  const [activeUsersMetric, setActiveUsersMetric] = useState<ActiveUsersMetric>('DAU');
  const [signupPeriod, setSignupPeriod] = useState<SignupPeriod>('daily');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getActiveUsersData = () => {
    switch (activeUsersMetric) {
      case 'DAU':
        return dauData;
      case 'WAU':
        return wauData;
      case 'MAU':
        return mauData;
      default:
        return dauData;
    }
  };

  const getActiveUsersLatest = () => {
    const data = getActiveUsersData();
    return data[data.length - 1]?.value || 0;
  };

  const getActiveUsersChange = () => {
    const data = getActiveUsersData();
    if (data.length < 2) return 0;
    const current = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getSignupData = () => {
    switch (signupPeriod) {
      case 'daily':
        return signupDailyData;
      case 'weekly':
        return signupWeeklyData;
      case 'monthly':
        return signupMonthlyData;
      default:
        return signupDailyData;
    }
  };

  const getSignupLatest = () => {
    const data = getSignupData();
    return data[data.length - 1]?.value || 0;
  };

  const getSignupChange = () => {
    const data = getSignupData();
    if (data.length < 2) return 0;
    const current = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Date Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Custom</Button>
          <Button variant="default" size="sm">Today</Button>
          <Button variant="outline" size="sm">Yesterday</Button>
          <Button variant="outline" size="sm">7D</Button>
          <Button variant="outline" size="sm">30D</Button>
          <Button variant="outline" size="sm">3M</Button>
          <Button variant="outline" size="sm">6M</Button>
          <Button variant="outline" size="sm">12M</Button>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit3 className="h-4 w-4" />
          Edit / Add
        </Button>
      </div>

      {/* Stakeholder Health Summary - 3 Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stakeholderHealth.map((stakeholder) => {
          const trend = stakeholder.healthScore - stakeholder.previousScore;
          const trendPositive = trend > 0;
          return (
            <Card key={stakeholder.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stakeholder.name}
                  </p>
                  <Badge
                    variant={stakeholder.status === 'healthy' ? 'default' : 'secondary'}
                    className={
                      stakeholder.status === 'healthy'
                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        : stakeholder.status === 'needs-review'
                        ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                    }
                  >
                    {stakeholder.status === 'healthy'
                      ? 'Healthy'
                      : stakeholder.status === 'needs-review'
                      ? 'Need Review'
                      : 'Critical'}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold">{stakeholder.healthScore}</span>
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
                <Progress
                  value={stakeholder.healthScore}
                  className="h-2 mb-3"
                />
                <div className="flex items-center gap-1 text-sm">
                  {trendPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={trendPositive ? 'text-green-500' : 'text-red-500'}>
                    {trendPositive ? '+' : ''}
                    {trend}%
                  </span>
                  <span className="text-muted-foreground">from last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Key Insights Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyInsights.map((insight, index) => {
              const colors = tagColors[insight.tag];
              return (
                <li
                  key={index}
                  className={`flex items-center justify-between gap-4 p-3 rounded-lg border ${colors.bg}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`h-2 w-2 rounded-full ${colors.dot} mt-2 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${colors.bg} ${colors.text} border-0 text-xs`}>
                          {insight.tagLabel}
                        </Badge>
                      </div>
                      <p className="text-sm">{insight.text}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 flex-shrink-0">
                    Investigate
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Two-Column Row: Active Users Trend + Signup Trend */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Users Trend Chart (DAU/WAU/MAU) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Users
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{formatNumber(getActiveUsersLatest())}</span>
                <div className="flex items-center gap-1 text-sm">
                  {Number(getActiveUsersChange()) >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={Number(getActiveUsersChange()) >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {Number(getActiveUsersChange()) >= 0 ? '+' : ''}{getActiveUsersChange()}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {(['DAU', 'WAU', 'MAU'] as ActiveUsersMetric[]).map((metric) => (
                <Button
                  key={metric}
                  variant={activeUsersMetric === metric ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7 px-3"
                  onClick={() => setActiveUsersMetric(metric)}
                >
                  {metric}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getActiveUsersData()}>
                  <defs>
                    <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [formatNumber(value as number), activeUsersMetric]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#colorActiveUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Signup Trend Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Signups
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{formatNumber(getSignupLatest())}</span>
                <div className="flex items-center gap-1 text-sm">
                  {Number(getSignupChange()) >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={Number(getSignupChange()) >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {Number(getSignupChange()) >= 0 ? '+' : ''}{getSignupChange()}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {([
                { key: 'daily', label: 'Daily' },
                { key: 'weekly', label: 'Weekly' },
                { key: 'monthly', label: 'Monthly' },
              ] as { key: SignupPeriod; label: string }[]).map(({ key, label }) => (
                <Button
                  key={key}
                  variant={signupPeriod === key ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7 px-3"
                  onClick={() => setSignupPeriod(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getSignupData()}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [formatNumber(value as number), 'Signups']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#colorSignups)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Activity Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Platform Activity (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1 p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">DAU</span>
              </div>
              <p className="text-2xl font-bold">{formatNumber(platformActivity.dau)}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{platformActivity.dauChange}%</span>
              </div>
            </div>
            <div className="space-y-1 p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sessions</span>
              </div>
              <p className="text-2xl font-bold">{formatNumber(platformActivity.sessions)}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{platformActivity.sessionsChange}%</span>
              </div>
            </div>
            <div className="space-y-1 p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Events Tracked</span>
              </div>
              <p className="text-2xl font-bold">{formatNumber(platformActivity.eventsTracked)}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{platformActivity.eventsChange}%</span>
              </div>
            </div>
            <div className="space-y-1 p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tournaments Live</span>
              </div>
              <p className="text-2xl font-bold">{platformActivity.tournamentsLive}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500">{platformActivity.tournamentsChange}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
