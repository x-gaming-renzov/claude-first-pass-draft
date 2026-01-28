import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  Target,
  Activity,
  Download,
  Filter,
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
const tournamentTrend = [
  { date: 'Jan 1', created: 45, completed: 42 },
  { date: 'Jan 8', created: 52, completed: 48 },
  { date: 'Jan 15', created: 61, completed: 55 },
  { date: 'Jan 22', created: 58, completed: 53 },
  { date: 'Jan 29', created: 72, completed: 68 },
  { date: 'Feb 5', created: 85, completed: 79 },
  { date: 'Feb 12', created: 78, completed: 74 },
];

const registrationData = [
  { game: 'BGMI', registrations: 12450, participants: 11200 },
  { game: 'Free Fire', registrations: 8920, participants: 8100 },
  { game: 'COD Mobile', registrations: 5630, participants: 5200 },
  { game: 'Valorant', registrations: 3840, participants: 3600 },
  { game: 'PUBG PC', registrations: 2150, participants: 1980 },
];

const matchData = [
  { day: 'Mon', matches: 234, completed: 228 },
  { day: 'Tue', matches: 287, completed: 279 },
  { day: 'Wed', matches: 312, completed: 305 },
  { day: 'Thu', matches: 298, completed: 290 },
  { day: 'Fri', matches: 356, completed: 341 },
  { day: 'Sat', matches: 489, completed: 472 },
  { day: 'Sun', matches: 523, completed: 508 },
];

const discoveryMetrics = [
  { name: 'Search', value: 35 },
  { name: 'Browse', value: 28 },
  { name: 'Featured', value: 22 },
  { name: 'Referral', value: 15 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4'];

// Key Insights for KIE
type InsightTag = 'growth' | 'warning' | 'success';

interface KeyInsight {
  text: string;
  tag: InsightTag;
  tagLabel: string;
}

const keyInsights: KeyInsight[] = [
  {
    text: 'BGMI registrations up 18% this week - consider featuring more BGMI tournaments',
    tag: 'growth',
    tagLabel: 'Opportunity',
  },
  {
    text: 'Registration drop-off at payment step (36.4% → 26.5%) needs attention',
    tag: 'warning',
    tagLabel: 'Attention',
  },
  {
    text: 'Match no-show rate improved from 5.2% to 3.8% after reminder notifications',
    tag: 'success',
    tagLabel: 'Improvement',
  },
];

const tagColors: Record<InsightTag, { bg: string; text: string; dot: string }> = {
  growth: { bg: 'bg-blue-500/10', text: 'text-blue-500', dot: 'bg-blue-500' },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', dot: 'bg-yellow-500' },
  success: { bg: 'bg-green-500/10', text: 'text-green-500', dot: 'bg-green-500' },
};

export function KIEAnalyticsTab() {
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
            <div className="text-3xl font-bold">1,284</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +18% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32,990</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +24% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Matches Played
            </CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,499</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +12% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.2%</div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              <TrendingDown className="h-3 w-3" />
              -1.2% vs last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="tournaments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tournaments" className="gap-2">
            <Trophy className="h-4 w-4" />
            Tournament Analytics
          </TabsTrigger>
          <TabsTrigger value="registrations" className="gap-2">
            <Users className="h-4 w-4" />
            Registration Analytics
          </TabsTrigger>
          <TabsTrigger value="matches" className="gap-2">
            <Activity className="h-4 w-4" />
            Match Analytics
          </TabsTrigger>
          <TabsTrigger value="discovery" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Discovery Analytics
          </TabsTrigger>
        </TabsList>

        {/* Tournament Analytics */}
        <TabsContent value="tournaments">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tournament Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={tournamentTrend}>
                      <defs>
                        <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
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
                        dataKey="created"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorCreated)"
                        name="Created"
                      />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                        name="Completed"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tournament Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">On-Time Start Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Fill Rate (Avg)</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Prize Distribution Rate</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Player Satisfaction</span>
                      <span className="text-sm font-medium">4.2/5</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Registration Analytics */}
        <TabsContent value="registrations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registrations by Game</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={registrationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#666" fontSize={12} />
                      <YAxis dataKey="game" type="category" stroke="#666" fontSize={12} width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a2e',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="registrations" fill="#8b5cf6" name="Registrations" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="participants" fill="#22c55e" name="Participants" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registration Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Tournament Views</p>
                      <p className="text-xs text-muted-foreground">Total impressions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">145,230</p>
                      <p className="text-xs text-muted-foreground">100%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Detail Page Visits</p>
                      <p className="text-xs text-muted-foreground">Clicked to view</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">52,890</p>
                      <p className="text-xs text-muted-foreground">36.4%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Registration Started</p>
                      <p className="text-xs text-muted-foreground">Began registration</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">38,450</p>
                      <p className="text-xs text-muted-foreground">26.5%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                    <div>
                      <p className="font-medium">Registration Completed</p>
                      <p className="text-xs text-muted-foreground">Successfully registered</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">32,990</p>
                      <p className="text-xs text-primary">22.7%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Match Analytics */}
        <TabsContent value="matches">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Matches Per Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="day" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a2e',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="matches" fill="#8b5cf6" name="Scheduled" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-3xl font-bold">2,499</p>
                      <p className="text-sm text-muted-foreground">Total Matches</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-3xl font-bold">2,423</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Match Completion</span>
                      <span className="text-sm font-medium text-green-500">97%</span>
                    </div>
                    <Progress value={97} className="h-2 [&>div]:bg-green-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Match Duration</span>
                      <span className="font-medium">24 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Disputed Results</span>
                      <span className="font-medium">1.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">No-Shows</span>
                      <span className="font-medium">3.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Peak Hours</span>
                      <span className="font-medium">8-11 PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Discovery Analytics */}
        <TabsContent value="discovery">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Discovery Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={discoveryMetrics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {discoveryMetrics.map((_, index) => (
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
                  {discoveryMetrics.map((entry, index) => (
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
                <CardTitle className="text-lg">Featured Content Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Homepage Banner</span>
                      <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">45,230</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">3,890</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium text-green-500">8.6%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Trending Section</span>
                      <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">32,450</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">2,120</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium text-yellow-500">6.5%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Push Notifications</span>
                      <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">125,000</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opened</p>
                        <p className="font-medium">18,750</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Open Rate</p>
                        <p className="font-medium text-green-500">15%</p>
                      </div>
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
