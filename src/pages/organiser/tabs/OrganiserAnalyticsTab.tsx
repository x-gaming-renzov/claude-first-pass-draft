import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  Wallet,
  Target,
  Download,
  Filter,
  Star,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Chart data
const participationTrend = [
  { date: 'Week 1', participants: 420, registrations: 480 },
  { date: 'Week 2', participants: 520, registrations: 590 },
  { date: 'Week 3', participants: 480, registrations: 550 },
  { date: 'Week 4', participants: 620, registrations: 710 },
  { date: 'Week 5', participants: 580, registrations: 660 },
  { date: 'Week 6', participants: 720, registrations: 820 },
];

const tournamentPerformance = [
  { name: 'BGMI Pro Finals', participants: 128, fillRate: 100, satisfaction: 4.8 },
  { name: 'Weekly Showdown', participants: 64, fillRate: 85, satisfaction: 4.5 },
  { name: 'Sunday Cup', participants: 96, fillRate: 75, satisfaction: 4.2 },
  { name: 'Rookie League', participants: 48, fillRate: 90, satisfaction: 4.6 },
];

const revenueData = [
  { month: 'Nov', revenue: 45000 },
  { month: 'Dec', revenue: 52000 },
  { month: 'Jan', revenue: 68000 },
];

const playerRetention = [
  { name: 'New Players', value: 35 },
  { name: 'Returning', value: 45 },
  { name: 'Loyal', value: 20 },
];

const COLORS = ['#8b5cf6', '#22c55e', '#3b82f6'];

// Key Insights for Organiser
type InsightTag = 'growth' | 'warning' | 'success';

interface KeyInsight {
  text: string;
  tag: InsightTag;
  tagLabel: string;
}

const keyInsights: KeyInsight[] = [
  {
    text: 'Your fill rate improved to 87% - 12% above platform average',
    tag: 'success',
    tagLabel: 'Achievement',
  },
  {
    text: 'Returning players (45%) generate 2.3x more revenue than new players',
    tag: 'growth',
    tagLabel: 'Insight',
  },
  {
    text: 'Weekend tournaments have 23% higher participation than weekday events',
    tag: 'growth',
    tagLabel: 'Tip',
  },
];

const tagColors: Record<InsightTag, { bg: string; text: string; dot: string }> = {
  growth: { bg: 'bg-blue-500/10', text: 'text-blue-500', dot: 'bg-blue-500' },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', dot: 'bg-yellow-500' },
  success: { bg: 'bg-green-500/10', text: 'text-green-500', dot: 'bg-green-500' },
};

export function OrganiserAnalyticsTab() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="14d">Last 14 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
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

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tournaments
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +4 vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,340</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +18% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <Wallet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹1.65L</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +25% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Fill Rate
            </CardTitle>
            <Target className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              <TrendingDown className="h-3 w-3" />
              -2% vs last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance" className="gap-2">
            <Trophy className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="engagement" className="gap-2">
            <Users className="h-4 w-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-2">
            <Wallet className="h-4 w-4" />
            Revenue
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Participation Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={participationTrend}>
                      <defs>
                        <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a2e',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="registrations"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorRegs)"
                        name="Registrations"
                      />
                      <Area
                        type="monotone"
                        dataKey="participants"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorParticipants)"
                        name="Participants"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tournament Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournamentPerformance.map((tournament) => (
                    <div key={tournament.name} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{tournament.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{tournament.satisfaction}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Participants</p>
                          <p className="font-medium">{tournament.participants}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fill Rate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={tournament.fillRate} className="h-2 flex-1" />
                            <span className="font-medium text-xs">{tournament.fillRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="text-sm font-medium text-green-500">98%</span>
                  </div>
                  <Progress value={98} className="h-2 [&>div]:bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-Time Start</span>
                    <span className="text-sm font-medium text-green-500">95%</span>
                  </div>
                  <Progress value={95} className="h-2 [&>div]:bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Player Satisfaction</span>
                    <span className="text-sm font-medium text-green-500">92%</span>
                  </div>
                  <Progress value={92} className="h-2 [&>div]:bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prize Distribution</span>
                    <span className="text-sm font-medium text-green-500">100%</span>
                  </div>
                  <Progress value={100} className="h-2 [&>div]:bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Player Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={playerRetention}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {playerRetention.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a2e',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {playerRetention.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Tournament Views</p>
                      <p className="text-xs text-muted-foreground">Total impressions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">12,450</p>
                      <p className="text-xs text-muted-foreground">100%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Detail Page Visits</p>
                      <p className="text-xs text-muted-foreground">Clicked to view</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">4,890</p>
                      <p className="text-xs text-muted-foreground">39.3%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Registration Started</p>
                      <p className="text-xs text-muted-foreground">Began registration</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">3,650</p>
                      <p className="text-xs text-muted-foreground">29.3%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                    <div>
                      <p className="font-medium">Completed Registration</p>
                      <p className="text-xs text-muted-foreground">Successfully registered</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">3,340</p>
                      <p className="text-xs text-primary">26.8%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a2e',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => [`₹${(value ?? 0).toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Entry Fees</span>
                      <span className="text-xl font-bold">₹52,000</span>
                    </div>
                    <Progress value={76} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">76% of total revenue</p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Sponsorship</span>
                      <span className="text-xl font-bold">₹12,000</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">18% of total revenue</p>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Other</span>
                      <span className="text-xl font-bold">₹4,000</span>
                    </div>
                    <Progress value={6} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">6% of total revenue</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Revenue (This Month)</span>
                      <span className="text-2xl font-bold text-green-500">₹68,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
