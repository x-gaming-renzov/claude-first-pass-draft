import { Calendar, Users, Eye, TrendingUp, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChartComponent, BarChartComponent } from '@/components/charts';
import { tournaments, impressionData } from '@/data/mock-data';

export function TournamentAnalytics() {
  const selectedTournament = tournaments[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Tournament Analytics</h2>
          <p className="text-muted-foreground">
            Detailed performance metrics for your tournaments
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Tournament Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">{selectedTournament.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedTournament.startDate} - {selectedTournament.endDate}</span>
                </div>
              </div>
              <Badge variant={selectedTournament.status === 'live' ? 'success' : 'secondary'}>
                {selectedTournament.status}
              </Badge>
            </div>
            <Button variant="outline" size="sm">Change Tournament</Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{selectedTournament.participants.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{selectedTournament.impressions.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Impressions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{selectedTournament.engagement}%</p>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">4.2K</p>
                <p className="text-sm text-muted-foreground">Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <LineChartComponent
              title="Daily Impressions"
              data={impressionData}
              dataKey="impressions"
              color="hsl(var(--chart-1))"
            />
            <LineChartComponent
              title="Daily Clicks"
              data={impressionData}
              dataKey="clicks"
              color="hsl(var(--chart-2))"
            />
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6 mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <BarChartComponent
              title="Engagement by Day"
              data={[
                { name: 'Mon', value: 12.5 },
                { name: 'Tue', value: 14.2 },
                { name: 'Wed', value: 11.8 },
                { name: 'Thu', value: 15.6 },
                { name: 'Fri', value: 18.2 },
                { name: 'Sat', value: 22.4 },
                { name: 'Sun', value: 19.8 },
              ]}
              dataKey="value"
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Banner Views', value: 45000, percentage: 100 },
                    { label: 'Banner Clicks', value: 4200, percentage: 9.3 },
                    { label: 'Match Views', value: 28500, percentage: 63.3 },
                    { label: 'Result Shares', value: 1850, percentage: 4.1 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm">{item.label}</span>
                      <div className="text-right">
                        <span className="font-medium">{item.value.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6 mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <BarChartComponent
              title="Age Distribution"
              data={[
                { name: '13-17', value: 15 },
                { name: '18-24', value: 42 },
                { name: '25-34', value: 28 },
                { name: '35-44', value: 10 },
                { name: '45+', value: 5 },
              ]}
              dataKey="value"
              color="hsl(var(--chart-3))"
            />
            <BarChartComponent
              title="Region Distribution"
              data={[
                { name: 'North', value: 28 },
                { name: 'South', value: 32 },
                { name: 'East', value: 18 },
                { name: 'West', value: 22 },
              ]}
              dataKey="value"
              color="hsl(var(--chart-4))"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Sponsor-Ready Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sponsor-Ready Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Key Highlights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {selectedTournament.impressions.toLocaleString()} total banner impressions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {selectedTournament.engagement}% average engagement rate
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {selectedTournament.participants.toLocaleString()} unique participants
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Peak viewership of 4,200+ concurrent users
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Export Options</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Sponsor Deck
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
