import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Trophy,
  Briefcase,
  Code,
  Headphones,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  crossStakeholderMetrics,
  correlationInsights,
  stakeholderHealth,
} from '@/data/mock-data';

const stakeholders = [
  {
    id: 'project-team',
    name: 'Project Team',
    description: 'Internal Krafton teams managing business metrics and development',
    icon: Building2,
    subTeams: [
      { name: 'Business Team', users: 8, link: '/project-team/business', icon: Briefcase },
      { name: 'Development Team', users: 12, link: '/project-team/development', icon: Code },
      { name: 'Support Admin', users: 4, link: '/project-team/support', icon: Headphones },
    ],
    totalUsers: 24,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'kie',
    name: 'KIE Team',
    description: 'Krafton India eSports team managing tournament applications',
    icon: Trophy,
    stats: [
      { label: 'Pending Applications', value: 12 },
      { label: 'Active Tournaments', value: 8 },
      { label: 'Total Organizers', value: 156 },
    ],
    totalUsers: 8,
    link: '/kie',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'organisers',
    name: 'Organisers',
    description: 'External tournament organizers managing events and sponsors',
    icon: Users,
    stats: [
      { label: 'Active Organizers', value: 156 },
      { label: 'Pending Approval', value: 23 },
      { label: 'Total Tournaments', value: 342 },
    ],
    totalUsers: 156,
    link: '/organiser',
    color: 'bg-green-100 text-green-600',
  },
];

export function Stakeholders() {
  const getStatusIcon = (status: string) => {
    if (status === 'on-target') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'above') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  const getCorrelationColor = (type: string) => {
    if (type === 'positive') return 'text-green-600 bg-green-50';
    if (type === 'inverse') return 'text-red-600 bg-red-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Cross-Stakeholder Analytics</h2>
        <p className="text-muted-foreground">
          Compare metrics across stakeholder groups and identify correlations
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Stakeholder Overview</TabsTrigger>
          <TabsTrigger value="comparison">KPI Comparison</TabsTrigger>
          <TabsTrigger value="correlations">Correlation Insights</TabsTrigger>
        </TabsList>

        {/* Stakeholder Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* Health Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {stakeholderHealth.map((health) => {
              const trend = health.healthScore - health.previousScore;
              return (
                <Card key={health.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{health.name}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-bold">{health.healthScore}</span>
                          <span className="text-muted-foreground">/100</span>
                        </div>
                      </div>
                      {health.status !== 'healthy' && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm mb-4">
                      {trend > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend > 0 ? '+' : ''}{trend}%
                      </span>
                      <span className="text-muted-foreground">from last week</span>
                    </div>
                    <div className="space-y-2">
                      {health.keyMetrics.map((metric) => (
                        <div key={metric.label} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{metric.label}</span>
                          <div className="flex items-center gap-2">
                            <span>{metric.value}</span>
                            {metric.status === 'good' && (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            )}
                            {metric.status === 'warning' && (
                              <AlertTriangle className="h-3 w-3 text-yellow-500" />
                            )}
                            {metric.status === 'critical' && (
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stakeholder Details */}
          <div className="space-y-4">
            {stakeholders.map((stakeholder) => (
              <Card key={stakeholder.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-3 ${stakeholder.color}`}>
                        <stakeholder.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{stakeholder.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {stakeholder.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{stakeholder.totalUsers} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {stakeholder.subTeams ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      {stakeholder.subTeams.map((team) => (
                        <Link key={team.name} to={team.link}>
                          <div className="rounded-lg border p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="rounded-lg bg-secondary p-2">
                                <team.icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <span className="font-medium">{team.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {team.users} team members
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="grid gap-4 md:grid-cols-3 flex-1">
                        {stakeholder.stats?.map((stat) => (
                          <div key={stat.label} className="text-center">
                            <p className="text-2xl font-semibold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <Link to={stakeholder.link || '#'}>
                        <Button>
                          View Dashboard
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Drill-Down Navigator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stakeholder Dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Project Team</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>&rarr; Business Metrics</p>
                    <p>&rarr; Dev Health</p>
                    <p>&rarr; Support Overview</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/project-team/business">
                      <Button size="sm">Enter as Admin</Button>
                    </Link>
                    <Button size="sm" variant="outline">View as User</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">KIE Team</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>&rarr; Application Queue</p>
                    <p>&rarr; Organiser Pipeline</p>
                    <p>&rarr; Tournament Stats</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/kie">
                      <Button size="sm">Enter as Admin</Button>
                    </Link>
                    <Button size="sm" variant="outline">View as User</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Organisers</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>&rarr; Tournament Stats</p>
                    <p>&rarr; Engagement Data</p>
                    <p>&rarr; Sponsor Reports</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/organiser">
                      <Button size="sm">Enter as Admin</Button>
                    </Link>
                    <Button size="sm" variant="outline">View as User</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KPI Comparison Tab */}
        <TabsContent value="comparison" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Cross-Stakeholder Metrics</CardTitle>
              <Badge variant="outline">Last 30 Days</Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm">
                      <th className="text-left py-4 px-4 font-medium"></th>
                      <th className="text-center py-4 px-4 font-medium">PROJECT TEAM</th>
                      <th className="text-center py-4 px-4 font-medium">KIE TEAM</th>
                      <th className="text-center py-4 px-4 font-medium">ORGANISERS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crossStakeholderMetrics.map((row) => (
                      <tr key={row.metric} className="border-b">
                        <td className="py-4 px-4 font-medium">{row.metric}</td>
                        <td className="text-center py-4 px-4">
                          <div className="space-y-1">
                            <p className="font-semibold">{row.projectTeam.value}</p>
                            <div className="flex items-center justify-center gap-1 text-sm">
                              {row.projectTeam.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.projectTeam.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.projectTeam.trend !== 0 && (
                                <span className={row.projectTeam.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {row.projectTeam.trend > 0 ? '+' : ''}{row.projectTeam.trend}%
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              {getStatusIcon(row.projectTeam.status)}
                              {row.projectTeam.target && (
                                <span className="text-xs text-muted-foreground">{row.projectTeam.target}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="space-y-1">
                            <p className="font-semibold">{row.kieTeam.value}</p>
                            <div className="flex items-center justify-center gap-1 text-sm">
                              {row.kieTeam.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.kieTeam.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.kieTeam.trend !== 0 && (
                                <span className={row.kieTeam.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {row.kieTeam.trend > 0 ? '+' : ''}{row.kieTeam.trend}%
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              {getStatusIcon(row.kieTeam.status)}
                              {row.kieTeam.target && (
                                <span className="text-xs text-muted-foreground">{row.kieTeam.target}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="space-y-1">
                            <p className="font-semibold">{row.organisers.value}</p>
                            <div className="flex items-center justify-center gap-1 text-sm">
                              {row.organisers.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : row.organisers.trend < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              {row.organisers.trend !== 0 && (
                                <span className={row.organisers.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {row.organisers.trend > 0 ? '+' : ''}{row.organisers.trend}%
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              {getStatusIcon(row.organisers.status)}
                              {row.organisers.target && (
                                <span className="text-xs text-muted-foreground">{row.organisers.target}</span>
                              )}
                            </div>
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
        <TabsContent value="correlations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detected Correlations (Last 90 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationInsights.map((insight) => (
                  <div key={insight.id} className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg p-2 ${getCorrelationColor(insight.type)}`}>
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {insight.type === 'positive' ? 'STRONG POSITIVE' :
                             insight.type === 'inverse' ? 'INVERSE' : 'MODERATE'}
                            {' '}(r = {insight.strength.toFixed(2)})
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="font-medium">{insight.metricA}</span>
                          <span className="text-muted-foreground">({insight.sourceA})</span>
                          <ArrowRight className="h-4 w-4" />
                          <span className="font-medium">{insight.metricB}</span>
                          <span className="text-muted-foreground">({insight.sourceB})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Insight:</span> {insight.insight}
                        </p>
                        <Button size="sm" variant="outline" className="mt-3">
                          View Analysis
                        </Button>
                      </div>
                    </div>
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
