import { useState } from 'react';
import {
  FlaskConical,
  Flag,
  AlertTriangle,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Users,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import {
  experiments,
  featureFlags,
  experimentCollisions,
  experiences,
  personalisations,
  segments,
} from '@/data/mock-data';

export function ExperimentationTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

  const experimentsByStatus = {
    draft: experiments.filter((e) => e.status === 'draft'),
    pending: experiments.filter((e) => e.status === 'pending'),
    running: experiments.filter((e) => e.status === 'running'),
    analyzing: experiments.filter((e) => e.status === 'analyzing'),
    completed: experiments.filter((e) => e.status === 'completed'),
  };

  const filteredFlags = featureFlags.filter(
    (flag) =>
      flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.scope.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = experiments.find((e) => e.id === selectedExperiment);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(experimentsByStatus).map(([status, items]) => (
          <Card key={status}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground capitalize">{status}</p>
                  <p className="text-2xl font-bold">{items.length}</p>
                </div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    status === 'draft'
                      ? 'bg-gray-500'
                      : status === 'pending'
                      ? 'bg-yellow-500'
                      : status === 'running'
                      ? 'bg-green-500'
                      : status === 'analyzing'
                      ? 'bg-blue-500'
                      : 'bg-purple-500'
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="lifecycle" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lifecycle" className="gap-2">
            <FlaskConical className="h-4 w-4" />
            Experiment Lifecycle
          </TabsTrigger>
          <TabsTrigger value="flags" className="gap-2">
            <Flag className="h-4 w-4" />
            Feature Flags
          </TabsTrigger>
          <TabsTrigger value="experiences" className="gap-2">
            <Layers className="h-4 w-4" />
            Experiences
          </TabsTrigger>
          <TabsTrigger value="segments" className="gap-2">
            <Users className="h-4 w-4" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="collisions" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Collisions
            {experimentCollisions.length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {experimentCollisions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Experiment Lifecycle Tab */}
        <TabsContent value="lifecycle">
          <div className="flex gap-6">
            {/* Kanban Board */}
            <div className="flex-1 grid grid-cols-5 gap-4">
              {Object.entries(experimentsByStatus).map(([status, items]) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium capitalize">{status}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {items.map((exp) => (
                      <Card
                        key={exp.id}
                        className={`cursor-pointer transition-colors hover:bg-secondary/50 ${
                          selectedExperiment === exp.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedExperiment(exp.id)}
                      >
                        <CardContent className="p-3 space-y-2">
                          <p className="text-sm font-medium line-clamp-2">{exp.name}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{exp.category}</span>
                            {exp.rolloutPercentage > 0 && (
                              <span>{exp.rolloutPercentage}%</span>
                            )}
                          </div>
                          {exp.primaryMetric && (
                            <div className="pt-1">
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  className={
                                    exp.primaryMetric.lift > 0
                                      ? 'text-green-500'
                                      : exp.primaryMetric.lift < 0
                                      ? 'text-red-500'
                                      : ''
                                  }
                                >
                                  {exp.primaryMetric.lift > 0 ? '+' : ''}
                                  {exp.primaryMetric.lift}%
                                </span>
                                <span className="text-muted-foreground">
                                  {exp.primaryMetric.confidence}% conf
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {status === 'draft' && (
                      <Button variant="outline" className="w-full gap-2" size="sm">
                        <Plus className="h-4 w-4" />
                        New Experiment
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            {selected && (
              <Card className="w-96 shrink-0">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selected.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selected.description}
                      </p>
                    </div>
                    <StatusBadge
                      status={
                        selected.status === 'running'
                          ? 'live'
                          : selected.status === 'completed'
                          ? 'completed'
                          : 'pending'
                      }
                      size="sm"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selected.hypothesis && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">HYPOTHESIS</p>
                      <p className="text-sm">{selected.hypothesis}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">ROLLOUT</p>
                    <div className="flex items-center gap-3">
                      <Progress value={selected.rolloutPercentage} className="flex-1" />
                      <span className="text-sm font-medium">{selected.rolloutPercentage}%</span>
                    </div>
                  </div>

                  {selected.primaryMetric && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        PRIMARY METRIC
                      </p>
                      <div className="rounded-lg border p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{selected.primaryMetric.name}</span>
                          <span
                            className={`text-sm font-semibold ${
                              selected.primaryMetric.lift > 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {selected.primaryMetric.lift > 0 ? '+' : ''}
                            {selected.primaryMetric.lift}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Control: </span>
                            <span>{selected.primaryMetric.control}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Variant: </span>
                            <span>{selected.primaryMetric.variant}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Confidence</span>
                          <span
                            className={
                              selected.primaryMetric.confidence >=
                              selected.primaryMetric.targetConfidence
                                ? 'text-green-500'
                                : 'text-yellow-500'
                            }
                          >
                            {selected.primaryMetric.confidence}% / {selected.primaryMetric.targetConfidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selected.secondaryMetrics && selected.secondaryMetrics.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        SECONDARY METRICS
                      </p>
                      <div className="space-y-2">
                        {selected.secondaryMetrics.map((metric, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{metric.name}</span>
                            <span
                              className={
                                metric.change > 0
                                  ? 'text-green-500'
                                  : metric.change < 0
                                  ? 'text-red-500'
                                  : ''
                              }
                            >
                              {metric.change > 0 ? '+' : ''}
                              {metric.change}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    {selected.status === 'running' && (
                      <Button size="sm" variant="outline">
                        Pause
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Feature Flags Tab */}
        <TabsContent value="flags">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Feature Flags</CardTitle>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Flag
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search flags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Flag Name</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Scope</th>
                      <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlags.map((flag) => (
                      <tr key={flag.id} className="border-t">
                        <td className="py-3 px-4">
                          <code className="text-sm bg-muted px-2 py-0.5 rounded">{flag.name}</code>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              flag.status === 'on'
                                ? 'bg-green-500/10 text-green-500 border-green-500/30'
                                : flag.status === 'partial'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                                : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                            }
                          >
                            {flag.status.toUpperCase()}
                            {flag.rolloutPercentage && ` (${flag.rolloutPercentage}%)`}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{flag.scope}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {flag.lastModified} by {flag.modifiedBy}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {flag.status === 'on' ? (
                              <ToggleRight className="h-5 w-5 text-green-500" />
                            ) : (
                              <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experiences Tab */}
        <TabsContent value="experiences">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Experiences List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Experiences</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Experience
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{exp.name}</h4>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                        <StatusBadge
                          status={exp.status === 'active' ? 'active' : exp.status === 'paused' ? 'warning' : 'draft'}
                          size="sm"
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type: </span>
                          <span className="capitalize">{exp.type.replace('-', ' ')}</span>
                        </div>
                        {exp.impressions && (
                          <div>
                            <span className="text-muted-foreground">Impressions: </span>
                            <span>{exp.impressions.toLocaleString()}</span>
                          </div>
                        )}
                        {exp.completionRate && (
                          <div>
                            <span className="text-muted-foreground">Completion: </span>
                            <span>{exp.completionRate}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personalisations List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personalisations</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Rule
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalisations.map((pers) => (
                    <div key={pers.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{pers.name}</h4>
                          <p className="text-sm text-muted-foreground">{pers.description}</p>
                        </div>
                        <StatusBadge
                          status={pers.status === 'active' ? 'active' : 'inactive'}
                          size="sm"
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type: </span>
                          <span className="capitalize">{pers.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rules: </span>
                          <span>{pers.rules.length}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Priority: </span>
                          <span>{pers.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Segments Tab */}
        <TabsContent value="segments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Segments</CardTitle>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Segment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {segments.map((segment) => (
                  <Card key={segment.id} className="cursor-pointer hover:bg-secondary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{segment.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {segment.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{segment.userCount.toLocaleString()} users</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Updated {segment.lastUpdated}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collisions Tab */}
        <TabsContent value="collisions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Experiment Collisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {experimentCollisions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No experiment collisions detected
                </div>
              ) : (
                <div className="space-y-4">
                  {experimentCollisions.map((collision) => (
                    <div
                      key={collision.id}
                      className={`rounded-lg border p-4 ${
                        collision.severity === 'critical'
                          ? 'border-red-500/30 bg-red-500/5'
                          : 'border-yellow-500/30 bg-yellow-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={
                                collision.severity === 'critical'
                                  ? 'border-red-500 text-red-500'
                                  : 'border-yellow-500 text-yellow-500'
                              }
                            >
                              {collision.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{collision.type}</Badge>
                          </div>
                          <p className="font-medium">
                            {collision.experiments.join(' & ')}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {collision.description}
                          </p>
                          {collision.affectedUsers && (
                            <p className="text-sm text-muted-foreground">
                              Affected users: {collision.affectedUsers.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 p-2 rounded bg-secondary/50">
                        <p className="text-sm">
                          <span className="font-medium">Recommendation: </span>
                          {collision.recommendation}
                        </p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          Resolve
                        </Button>
                        <Button size="sm" variant="ghost">
                          Acknowledge
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
