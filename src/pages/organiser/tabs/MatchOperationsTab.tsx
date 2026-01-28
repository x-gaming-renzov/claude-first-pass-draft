import { useState } from 'react';
import {
  Search,
  Plus,
  Gamepad2,
  Clock,
  Play,
  CheckCircle,
  Eye,
  Edit,
  Key,
  Trophy,
  Users,
  Calendar,
  AlertTriangle,
  RefreshCw,
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
import { matches } from '@/data/mock-data';

export function MatchOperationsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Simulated organizer's matches
  const myMatches = matches;

  const filteredMatches = myMatches.filter((m) => {
    const matchesSearch =
      searchQuery === '' ||
      m.tournamentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const scheduledMatches = myMatches.filter((m) => m.status === 'scheduled');
  const liveMatches = myMatches.filter((m) => m.status === 'live');
  const completedMatches = myMatches.filter((m) => m.status === 'completed');

  const selectedMatchData = selectedMatch
    ? matches.find((m) => m.id === selectedMatch)
    : null;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-500">{scheduledMatches.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Now</p>
                <p className="text-2xl font-bold text-green-500">{liveMatches.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold">{completedMatches.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Results</p>
                <p className="text-2xl font-bold text-yellow-500">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="live" className="gap-2">
            <Play className="h-4 w-4" />
            Live Matches
            {liveMatches.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {liveMatches.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="credentials" className="gap-2">
            <Key className="h-4 w-4" />
            Lobby Credentials
          </TabsTrigger>
          <TabsTrigger value="results" className="gap-2">
            <Trophy className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Match List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Match Schedule</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[180px]"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredMatches.map((match) => (
                      <div
                        key={match.id}
                        onClick={() => setSelectedMatch(match.id)}
                        className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                          selectedMatch === match.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{match.tournamentName}</h4>
                              <StatusBadge status={match.status} size="sm" />
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Gamepad2 className="h-3 w-3" />
                                {match.game}
                              </span>
                              <span>Round {match.round}</span>
                              <span>Match #{match.matchNumber}</span>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{match.scheduledTime}</p>
                            <p className="text-xs text-muted-foreground">
                              {match.scheduledDate}
                            </p>
                          </div>
                        </div>

                        {/* Teams */}
                        {match.teams && (
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                            {match.teams.map((team, index) => (
                              <div key={team.id} className="flex items-center gap-2 flex-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{team.name}</span>
                                {match.status === 'completed' && team.score !== undefined && (
                                  <Badge
                                    variant="outline"
                                    className={
                                      team.isWinner
                                        ? 'bg-green-500/10 text-green-500'
                                        : ''
                                    }
                                  >
                                    {team.score}
                                  </Badge>
                                )}
                                {index === 0 && match.teams.length === 2 && (
                                  <span className="text-muted-foreground mx-2">vs</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Match Details */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Match Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMatchData ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">{selectedMatchData.tournamentName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={selectedMatchData.status} size="sm" />
                          <Badge variant="outline">{selectedMatchData.game}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Round</span>
                          <span>{selectedMatchData.round}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Match #</span>
                          <span>{selectedMatchData.matchNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Scheduled</span>
                          <span>
                            {selectedMatchData.scheduledDate} {selectedMatchData.scheduledTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Map</span>
                          <span>{selectedMatchData.map || 'TBD'}</span>
                        </div>
                      </div>

                      {/* Lobby Credentials */}
                      {selectedMatchData.lobbyCredentials && (
                        <div className="p-3 rounded-lg bg-muted/50 border">
                          <h5 className="font-medium text-sm flex items-center gap-2 mb-2">
                            <Key className="h-4 w-4" />
                            Lobby Credentials
                          </h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Room ID</span>
                              <code className="bg-background px-2 py-0.5 rounded">
                                {selectedMatchData.lobbyCredentials.roomId}
                              </code>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Password</span>
                              <code className="bg-background px-2 py-0.5 rounded">
                                {selectedMatchData.lobbyCredentials.password}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {selectedMatchData.status === 'scheduled' && (
                          <>
                            <Button className="w-full">
                              <Key className="h-4 w-4 mr-2" />
                              Set Lobby Credentials
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              Reschedule
                            </Button>
                          </>
                        )}
                        {selectedMatchData.status === 'live' && (
                          <Button className="w-full">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Results
                          </Button>
                        )}
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Bracket
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select a match to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Live Matches Tab */}
        <TabsContent value="live">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Live Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              {liveMatches.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No live matches at the moment
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-lg border border-green-500/30 bg-green-500/5 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{match.tournamentName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Round {match.round} - Match #{match.matchNumber}
                          </p>
                        </div>
                        <Badge className="bg-green-500 text-white">LIVE</Badge>
                      </div>

                      {match.teams && (
                        <div className="space-y-2 mb-4">
                          {match.teams.map((team) => (
                            <div
                              key={team.id}
                              className="flex items-center justify-between p-2 rounded bg-background/50"
                            >
                              <span className="font-medium">{team.name}</span>
                              <Badge variant="outline" className="font-mono">
                                {team.score ?? 0}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Update Score
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          End Match
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credentials Tab */}
        <TabsContent value="credentials">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lobby Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledMatches.slice(0, 5).map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <h4 className="font-medium">{match.tournamentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {match.scheduledDate} at {match.scheduledTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {match.lobbyCredentials ? (
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Room ID</p>
                          <code className="text-sm">{match.lobbyCredentials.roomId}</code>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-yellow-500">
                          Not Set
                        </Badge>
                      )}
                      <Button size="sm">
                        <Key className="h-4 w-4 mr-1" />
                        {match.lobbyCredentials ? 'Update' : 'Set'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Tournament</th>
                      <th className="text-left py-3 px-4 font-medium">Match</th>
                      <th className="text-left py-3 px-4 font-medium">Winner</th>
                      <th className="text-left py-3 px-4 font-medium">Score</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedMatches.map((match) => {
                      const winner = match.teams?.find((t) => t.isWinner);
                      return (
                        <tr key={match.id} className="border-t hover:bg-muted/50">
                          <td className="py-3 px-4">{match.tournamentName}</td>
                          <td className="py-3 px-4">
                            Round {match.round} - #{match.matchNumber}
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {winner?.name || 'TBD'}
                          </td>
                          <td className="py-3 px-4">
                            {match.teams?.map((t) => t.score).join(' - ')}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {match.scheduledDate}
                          </td>
                          <td className="text-right py-3 px-4">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
