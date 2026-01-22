import { useState } from 'react';
import { FlaskConical, Plus, Play, Pause, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { experiments } from '@/data/mock-data';
import type { Experiment } from '@/types';

const statusColors: Record<Experiment['status'], 'default' | 'secondary' | 'warning' | 'success'> = {
  draft: 'secondary',
  running: 'success',
  paused: 'warning',
  completed: 'default',
};

export function Experiments() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredExperiments = activeTab === 'all'
    ? experiments
    : experiments.filter(e => e.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Experiments</h2>
          <p className="text-muted-foreground">
            Manage A/B tests and marketing campaigns
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Experiment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                <Play className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {experiments.filter(e => e.status === 'running').length}
                </p>
                <p className="text-sm text-muted-foreground">Running</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900">
                <Pause className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {experiments.filter(e => e.status === 'paused').length}
                </p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                <FlaskConical className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {experiments.filter(e => e.category === 'ui-ux').length}
                </p>
                <p className="text-sm text-muted-foreground">UI/UX Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                <FlaskConical className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {experiments.filter(e => e.category === 'marketing').length}
                </p>
                <p className="text-sm text-muted-foreground">Marketing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiments List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ui-ux">UI/UX</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredExperiments.map((experiment) => (
              <Card key={experiment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{experiment.name}</CardTitle>
                        <Badge variant={statusColors[experiment.status]}>
                          {experiment.status}
                        </Badge>
                        <Badge variant="outline">{experiment.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {experiment.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                          {experiment.status === 'running' ? 'Pause' : 'Resume'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Rollout Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rollout</span>
                        <span className="font-medium">{experiment.rolloutPercentage}%</span>
                      </div>
                      <Progress value={experiment.rolloutPercentage} className="h-2" />
                    </div>

                    {/* Variants */}
                    <div className="grid gap-3 md:grid-cols-2">
                      {experiment.variants.map((variant) => (
                        <div
                          key={variant.id}
                          className="rounded-lg border p-3 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{variant.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {variant.traffic}% traffic
                            </span>
                          </div>
                          {variant.conversions !== undefined && (
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Conversions</p>
                                <p className="font-medium">{variant.conversions}%</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Engagement</p>
                                <p className="font-medium">{variant.engagement}%</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Date Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Started: {experiment.startDate}</span>
                      {experiment.endDate && <span>Ends: {experiment.endDate}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
