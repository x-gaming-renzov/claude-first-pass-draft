import { useState } from 'react';
import {
  BarChart3,
  Building2,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  stakeholderHealth,
  crossStakeholderMetrics,
  correlationInsights,
} from '@/data/mock-data';

export function AnalyticsTab() {
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

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Stakeholder Overview
          </TabsTrigger>
          <TabsTrigger value="comparison" className="gap-2">
            <Building2 className="h-4 w-4" />
            KPI Comparison
          </TabsTrigger>
          <TabsTrigger value="correlations" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Correlation Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Health Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {stakeholderHealth.map((stakeholder) => {
                const trend = stakeholder.healthScore - stakeholder.previousScore;
                const trendPositive = trend > 0;
                return (
                  <Card key={stakeholder.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{stakeholder.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold">{stakeholder.healthScore}</span>
                        <span className="text-xl text-muted-foreground">/100</span>
                        <div className="flex items-center gap-1 ml-auto">
                          {trendPositive ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={trendPositive ? 'text-green-500' : 'text-red-500'}>
                            {trendPositive ? '+' : ''}{trend}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {stakeholder.keyMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{metric.value}</span>
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  metric.status === 'good'
                                    ? 'bg-green-500'
                                    : metric.status === 'warning'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full mt-4 gap-2">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Stakeholder Drill-down Navigator */}
            <Card>
              <CardHeader>
                <CardTitle>Stakeholder Drill-Down</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Project Team */}
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-3">Project Team</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Business Team
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Development Team
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Support Admin
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    </div>
                  </div>

                  {/* KIE Team */}
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-3">KIE Team</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Operations Overview
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Organizer Management
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Tournament Oversight
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    </div>
                  </div>

                  {/* Organisers */}
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-3">Organisers</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Top Organisers
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Tournament Analytics
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-9">
                        Performance Metrics
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* KPI Comparison Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Stakeholder KPI Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-center py-3 px-4 font-medium">
                        <div className="flex flex-col items-center">
                          <span>Project Team</span>
                          <span className="text-xs text-muted-foreground font-normal">Internal</span>
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 font-medium">
                        <div className="flex flex-col items-center">
                          <span>KIE Team</span>
                          <span className="text-xs text-muted-foreground font-normal">Operations</span>
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 font-medium">
                        <div className="flex flex-col items-center">
                          <span>Organisers</span>
                          <span className="text-xs text-muted-foreground font-normal">External</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {crossStakeholderMetrics.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-4 px-4 font-medium">{row.metric}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-medium">{row.projectTeam.value}</span>
                            <div className="flex items-center gap-1 text-xs">
                              {row.projectTeam.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.projectTeam.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.projectTeam.trend !== 0 && (
                                <span className={row.projectTeam.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {row.projectTeam.trend > 0 ? '+' : ''}{row.projectTeam.trend}%
                                </span>
                              )}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                row.projectTeam.status === 'on-target'
                                  ? 'bg-green-500/10 text-green-500'
                                  : row.projectTeam.status === 'above'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {row.projectTeam.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-medium">{row.kieTeam.value}</span>
                            <div className="flex items-center gap-1 text-xs">
                              {row.kieTeam.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.kieTeam.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.kieTeam.trend !== 0 && (
                                <span className={row.kieTeam.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {row.kieTeam.trend > 0 ? '+' : ''}{row.kieTeam.trend}%
                                </span>
                              )}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                row.kieTeam.status === 'on-target'
                                  ? 'bg-green-500/10 text-green-500'
                                  : row.kieTeam.status === 'above'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {row.kieTeam.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-medium">{row.organisers.value}</span>
                            <div className="flex items-center gap-1 text-xs">
                              {row.organisers.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.organisers.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.organisers.trend !== 0 && (
                                <span className={row.organisers.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {row.organisers.trend > 0 ? '+' : ''}{row.organisers.trend}%
                                </span>
                              )}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                row.organisers.status === 'on-target'
                                  ? 'bg-green-500/10 text-green-500'
                                  : row.organisers.status === 'above'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {row.organisers.status}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Correlations Tab */}
        <TabsContent value="correlations">
          <Card>
            <CardHeader>
              <CardTitle>Detected Correlations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationInsights.map((insight) => (
                  <div key={insight.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            insight.type === 'positive'
                              ? 'bg-green-500/10'
                              : insight.type === 'inverse'
                              ? 'bg-red-500/10'
                              : 'bg-yellow-500/10'
                          }`}
                        >
                          {insight.type === 'positive' ? (
                            <TrendingUp className={`h-5 w-5 ${
                              insight.type === 'positive' ? 'text-green-500' : ''
                            }`} />
                          ) : (
                            <TrendingDown className={`h-5 w-5 ${
                              insight.type === 'inverse' ? 'text-red-500' : 'text-yellow-500'
                            }`} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{insight.metricA}</span>
                            <span className="text-muted-foreground">↔</span>
                            <span className="font-medium">{insight.metricB}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {insight.sourceA} → {insight.sourceB}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            insight.type === 'positive'
                              ? 'bg-green-500/10 text-green-500'
                              : insight.type === 'inverse'
                              ? 'bg-red-500/10 text-red-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }
                        >
                          {insight.type}
                        </Badge>
                        <p className="text-sm font-medium mt-1">
                          Strength: {(insight.strength * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.insight}</p>
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
