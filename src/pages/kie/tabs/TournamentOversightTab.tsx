import { useState } from 'react';
import {
  Search,
  Filter,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Star,
  Users,
  Calendar,
  Pause,
  Flag,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { tournaments, featuredContent } from '@/data/mock-data';

export function TournamentOversightTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingTournaments = tournaments.filter(
    (t) => t.status === 'pending-approval'
  );
  const liveTournaments = tournaments.filter((t) => t.status === 'live');
  const upcomingTournaments = tournaments.filter((t) => t.status === 'upcoming');

  const filteredTournaments = tournaments.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.organizerName || t.organizer).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingTournaments.length}</div>
            <p className="text-xs text-muted-foreground">Avg approval time: 4h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Live Now
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveTournaments.length}</div>
            <p className="text-xs text-muted-foreground">
              {liveTournaments.reduce((acc, t) => acc + (t.currentParticipants || t.participants), 0)} players active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming (24h)
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingTournaments.length}</div>
            <p className="text-xs text-muted-foreground">Starting soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Escalations
            </CardTitle>
            <Flag className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="approvals" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approvals
            <Badge variant="secondary" className="ml-1">
              {pendingTournaments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="live" className="gap-2">
            <Activity className="h-4 w-4" />
            Live Monitoring
            <Badge variant="secondary" className="ml-1">
              {liveTournaments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="featured" className="gap-2">
            <Star className="h-4 w-4" />
            Featured Content
          </TabsTrigger>
          <TabsTrigger value="escalations" className="gap-2">
            <Flag className="h-4 w-4" />
            Escalations
          </TabsTrigger>
        </TabsList>

        {/* Approvals Tab */}
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tournament Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingTournaments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No tournaments pending approval
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{tournament.name}</h4>
                            <Badge variant="outline">{tournament.game}</Badge>
                            <Badge
                              variant="outline"
                              className={
                                tournament.format === 'paid'
                                  ? 'bg-green-500/10 text-green-500'
                                  : ''
                              }
                            >
                              {tournament.format}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            by {tournament.organizerName}
                          </p>

                          <div className="flex items-center gap-6 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{tournament.startDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{tournament.maxParticipants} slots</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {tournament.prizePool
                                  ? `₹${tournament.prizePool.toLocaleString()}`
                                  : 'No prize'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Monitoring Tab */}
        <TabsContent value="live">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Live Tournaments
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tournaments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[250px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {liveTournaments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No live tournaments at the moment
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {liveTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="rounded-lg border p-4 bg-green-500/5 border-green-500/20"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{tournament.name}</h4>
                            <Badge className="bg-green-500 text-white">LIVE</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            by {tournament.organizerName}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Monitor
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Participants</p>
                          <p className="font-medium">
                            {tournament.currentParticipants}/{tournament.maxParticipants}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Current Round</p>
                          <p className="font-medium">Quarter Finals</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">2h 34m</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-500 border-red-500/20 hover:bg-red-500/10"
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          Flag Issue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Content Tab */}
        <TabsContent value="featured">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Featured Content Management</CardTitle>
              <Button size="sm">
                <Star className="h-4 w-4 mr-2" />
                Add Featured
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredContent.map((content) => (
                  <div
                    key={content.id}
                    className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{content.title}</h4>
                          <Badge variant="outline">{content.type}</Badge>
                          <StatusBadge status={content.status} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {content.description}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span>Position: #{content.position}</span>
                          <span>
                            {content.startDate} - {content.endDate}
                          </span>
                          <span>
                            {content.impressions?.toLocaleString() || 0} impressions
                          </span>
                          <span>
                            {content.clicks?.toLocaleString() || 0} clicks
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escalations Tab */}
        <TabsContent value="escalations">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tournament Escalations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <h4 className="font-medium">Prize Distribution Delay</h4>
                        <Badge className="bg-red-500 text-white">HIGH</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tournament: BGMI Pro League Finals
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Organizer: Elite Gaming Co.
                      </p>
                      <div className="mt-2 p-2 rounded bg-background/50">
                        <p className="text-sm">
                          Multiple players have reported not receiving prize money 48 hours after
                          tournament completion. Total pending: ₹50,000
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Escalated 2 hours ago • 5 related tickets
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-medium">Match Result Dispute</h4>
                        <Badge className="bg-yellow-500 text-white">MEDIUM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tournament: Weekly Showdown #45
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Organizer: GamerHub India
                      </p>
                      <div className="mt-2 p-2 rounded bg-background/50">
                        <p className="text-sm">
                          Team claims match result was incorrectly recorded. Requesting video
                          evidence review.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Escalated 5 hours ago • 2 related tickets
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* All Tournaments Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Tournaments</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending-approval">Pending</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Tournament</th>
                  <th className="text-left py-3 px-4 font-medium">Organizer</th>
                  <th className="text-left py-3 px-4 font-medium">Game</th>
                  <th className="text-center py-3 px-4 font-medium">Participants</th>
                  <th className="text-right py-3 px-4 font-medium">Prize Pool</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTournaments.slice(0, 10).map((tournament) => (
                  <tr key={tournament.id} className="border-t hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{tournament.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tournament.startDate}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{tournament.organizerName}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{tournament.game}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      {tournament.currentParticipants}/{tournament.maxParticipants}
                    </td>
                    <td className="text-right py-3 px-4">
                      {tournament.prizePool
                        ? `₹${tournament.prizePool.toLocaleString()}`
                        : '-'}
                    </td>
                    <td className="text-center py-3 px-4">
                      <StatusBadge status={tournament.status} size="sm" />
                    </td>
                    <td className="text-right py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
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
