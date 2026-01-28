import { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Play,
  Pause,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Settings,
  Search,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  experiments,
  featureFlags,
  experimentCollisions,
} from '@/data/mock-data';
import type { Experiment, ExperimentStatus } from '@/types';

const statusColors: Record<ExperimentStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-blue-100 text-blue-700',
  running: 'bg-green-100 text-green-700',
  analyzing: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-purple-100 text-purple-700',
};

const statusLabels: Record<ExperimentStatus, string> = {
  draft: 'Draft',
  pending: 'Pending Approval',
  running: 'Running',
  analyzing: 'Analyzing',
  completed: 'Completed',
};

export function Experiments() {
  const [activeTab, setActiveTab] = useState('lifecycle');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const experimentsByStatus = {
    draft: experiments.filter(e => e.status === 'draft'),
    pending: experiments.filter(e => e.status === 'pending'),
    running: experiments.filter(e => e.status === 'running'),
    analyzing: experiments.filter(e => e.status === 'analyzing'),
    completed: experiments.filter(e => e.status === 'completed'),
  };

  const filteredFlags = featureFlags.filter(flag =>
    flag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ExperimentCard = ({ experiment }: { experiment: Experiment }) => {
    const hasNegativeLift = experiment.primaryMetric && experiment.primaryMetric.lift < 0;
    const isSignificant = experiment.primaryMetric && experiment.primaryMetric.confidence >= 95;

    return (
      <div
        className="rounded-lg border p-3 bg-card hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedExperiment(experiment)}
      >
        <div className="flex items-start justify-between mb-2">
          <p className="font-medium text-sm line-clamp-1">{experiment.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              {experiment.status === 'running' ? (
                <DropdownMenuItem>Pause</DropdownMenuItem>
              ) : experiment.status === 'pending' ? (
                <>
                  <DropdownMenuItem>Approve</DropdownMenuItem>
                  <DropdownMenuItem>Reject</DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge variant="outline" className="text-xs mb-2">
          {experiment.category}
        </Badge>
        {experiment.status === 'running' && experiment.rolloutPercentage > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{experiment.rolloutPercentage}% rollout</span>
              {experiment.dayNumber && <span>Day {experiment.dayNumber}</span>}
            </div>
            <Progress value={experiment.rolloutPercentage} className="h-1" />
          </div>
        )}
        {experiment.primaryMetric && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {hasNegativeLift ? (
              <TrendingDown className="h-3 w-3 text-red-500" />
            ) : (
              <TrendingUp className="h-3 w-3 text-green-500" />
            )}
            <span className={hasNegativeLift ? 'text-red-600' : 'text-green-600'}>
              {hasNegativeLift ? '' : '+'}{experiment.primaryMetric.lift}%
            </span>
            {isSignificant && (
              <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Experimentation Control Center</h2>
          <p className="text-muted-foreground">
            Manage A/B tests, feature flags, and controlled rollouts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Experiment
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <FlaskConical className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{experimentsByStatus.draft.length}</p>
                <p className="text-xs text-muted-foreground">Draft</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Pause className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{experimentsByStatus.pending.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Play className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{experimentsByStatus.running.length}</p>
                <p className="text-xs text-muted-foreground">Running</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{experimentsByStatus.analyzing.length}</p>
                <p className="text-xs text-muted-foreground">Analyzing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{experimentsByStatus.completed.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="lifecycle">Experiment Lifecycle</TabsTrigger>
          <TabsTrigger value="flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="collisions">
            Collisions
            {experimentCollisions.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {experimentCollisions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Experiment Lifecycle Board */}
        <TabsContent value="lifecycle" className="mt-4">
          <div className="grid grid-cols-5 gap-4">
            {(['draft', 'pending', 'running', 'analyzing', 'completed'] as ExperimentStatus[]).map((status) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">
                    {statusLabels[status]}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {experimentsByStatus[status].length}
                  </Badge>
                </div>
                <div className="space-y-2 min-h-[200px] p-2 rounded-lg bg-secondary/30">
                  {experimentsByStatus[status].map((exp) => (
                    <ExperimentCard key={exp.id} experiment={exp} />
                  ))}
                  {experimentsByStatus[status].length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No experiments
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Experiment Detail Modal */}
          {selectedExperiment && selectedExperiment.primaryMetric && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedExperiment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedExperiment.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedExperiment(null)}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 text-sm">
                  <Badge className={statusColors[selectedExperiment.status]}>
                    {statusLabels[selectedExperiment.status]}
                  </Badge>
                  <span>Rollout: {selectedExperiment.rolloutPercentage}%</span>
                  {selectedExperiment.dayNumber && (
                    <span>Day {selectedExperiment.dayNumber} of {selectedExperiment.totalDays}</span>
                  )}
                  <span>Owner: {selectedExperiment.owner}</span>
                </div>

                {selectedExperiment.hypothesis && (
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm font-medium mb-1">Hypothesis</p>
                    <p className="text-sm text-muted-foreground">"{selectedExperiment.hypothesis}"</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Primary Metric */}
                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium mb-3">Primary Metric: {selectedExperiment.primaryMetric.name}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Control:</span>
                        <span>{selectedExperiment.primaryMetric.control}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Variant:</span>
                        <span>{selectedExperiment.primaryMetric.variant}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>Lift:</span>
                        <span className={selectedExperiment.primaryMetric.lift >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {selectedExperiment.primaryMetric.lift >= 0 ? '+' : ''}{selectedExperiment.primaryMetric.lift}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Statistical Confidence</span>
                        <span>{selectedExperiment.primaryMetric.confidence}%</span>
                      </div>
                      <Progress value={selectedExperiment.primaryMetric.confidence} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Target: {selectedExperiment.primaryMetric.targetConfidence}%
                      </p>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  {selectedExperiment.secondaryMetrics && (
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium mb-3">Secondary Metrics</p>
                      <div className="space-y-3">
                        {selectedExperiment.secondaryMetrics.map((metric) => (
                          <div key={metric.name} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{metric.name}:</span>
                            <span className={metric.change < 0 ? 'text-green-600' : 'text-red-600'}>
                              {metric.change}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rollout History */}
                {selectedExperiment.rolloutHistory && (
                  <div>
                    <p className="text-sm font-medium mb-3">Rollout History</p>
                    <div className="flex items-center gap-2 text-sm">
                      {selectedExperiment.rolloutHistory.map((point, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="text-center">
                            <div className="h-3 w-3 rounded-full bg-primary mx-auto" />
                            <p className="text-xs text-muted-foreground mt-1">{point.date}</p>
                            <p className="text-xs font-medium">{point.percentage}%</p>
                          </div>
                          {i < selectedExperiment.rolloutHistory!.length - 1 && (
                            <div className="w-8 h-0.5 bg-primary" />
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-8 h-0.5 bg-muted" />
                        <div className="text-center">
                          <div className="h-3 w-3 rounded-full border-2 border-muted mx-auto" />
                          <p className="text-xs text-muted-foreground mt-1">Next</p>
                          <p className="text-xs">25%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  {selectedExperiment.status === 'running' && (
                    <>
                      <Button variant="outline">Pause Experiment</Button>
                      <Button variant="outline">Increase Rollout</Button>
                      <Button variant="destructive">Rollback</Button>
                    </>
                  )}
                  {selectedExperiment.status === 'analyzing' && (
                    <>
                      <Button>Promote to 100%</Button>
                      <Button variant="destructive">Rollback</Button>
                    </>
                  )}
                  <Button variant="ghost">View Full Analytics</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Feature Flags Tab */}
        <TabsContent value="flags" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Feature Flags</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search flags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Flag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Flag Name</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Scope</th>
                      <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlags.map((flag) => (
                      <tr key={flag.id} className="border-b">
                        <td className="py-3 px-4 font-mono text-sm">{flag.name}</td>
                        <td className="text-center py-3 px-4">
                          {flag.status === 'on' ? (
                            <Badge className="bg-green-100 text-green-700">ON</Badge>
                          ) : flag.status === 'partial' ? (
                            <Badge className="bg-yellow-100 text-yellow-700">
                              {flag.rolloutPercentage}%
                            </Badge>
                          ) : (
                            <Badge variant="secondary">OFF</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{flag.scope}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {flag.lastModified} by {flag.modifiedBy}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="icon">
                            {flag.status === 'on' ? (
                              <ToggleRight className="h-5 w-5 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
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

        {/* Collisions Tab */}
        <TabsContent value="collisions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Experiment Collisions
                <Badge variant="secondary">{experimentCollisions.length} Warnings</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experimentCollisions.map((collision) => (
                  <div
                    key={collision.id}
                    className="rounded-lg border border-yellow-200 bg-yellow-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-yellow-800">
                          {collision.type === 'overlap' ? 'POTENTIAL COLLISION' : 'SEQUENTIAL RISK'}
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">{collision.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-yellow-600">
                          {collision.experiments.map((exp, i) => (
                            <span key={exp}>
                              "{exp}"
                              {i < collision.experiments.length - 1 && (
                                <ArrowRight className="h-3 w-3 inline mx-1" />
                              )}
                            </span>
                          ))}
                        </div>
                        {collision.affectedUsers && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Overlap: ~{collision.affectedUsers.toLocaleString()} users
                          </p>
                        )}
                        <p className="text-xs text-yellow-700 mt-2">
                          <span className="font-medium">Recommendation:</span> {collision.recommendation}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">View Both</Button>
                          <Button size="sm" variant="outline">Exclude Overlap</Button>
                          <Button size="sm" variant="ghost">Accept Risk</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {experimentCollisions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
                    <p>No experiment collisions detected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
