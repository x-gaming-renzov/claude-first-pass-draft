import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Trophy,
  Users,
  Calendar,
  Edit,
  Eye,
  Copy,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
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
import { Progress } from '@/components/ui/progress';
import { tournaments, registrations } from '@/data/mock-data';

export function TournamentManagementTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  // Simulated organizer's tournaments
  const myTournaments = tournaments.slice(0, 10);

  const filteredTournaments = myTournaments.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTournamentData = selectedTournament
    ? tournaments.find((t) => t.id === selectedTournament)
    : null;

  const tournamentRegistrations = selectedTournament
    ? registrations.filter((r) => r.tournamentId === selectedTournament)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My Tournaments</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage your tournaments
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{myTournaments.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live</p>
                <p className="text-2xl font-bold text-green-500">
                  {myTournaments.filter((t) => t.status === 'live').length}
                </p>
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
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-blue-500">
                  {myTournaments.filter((t) => t.status === 'upcoming').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {myTournaments.filter((t) => t.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tournament List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Tournaments</CardTitle>
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
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending-approval">Pending</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    onClick={() => setSelectedTournament(tournament.id)}
                    className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedTournament === tournament.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{tournament.name}</h4>
                          <StatusBadge status={tournament.status} size="sm" />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {tournament.game}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tournament.currentParticipants}/{tournament.maxParticipants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {tournament.startDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Fill Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Registration</span>
                        <span>
                          {Math.round(
                            ((tournament.currentParticipants || tournament.participants) / tournament.maxParticipants) * 100
                          )}
                          % filled
                        </span>
                      </div>
                      <Progress
                        value={
                          ((tournament.currentParticipants || tournament.participants) / tournament.maxParticipants) * 100
                        }
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Details */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Tournament Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTournamentData ? (
                <Tabs defaultValue="details" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="registrations">Registrations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h4 className="font-medium">{selectedTournamentData.name}</h4>
                      <StatusBadge status={selectedTournamentData.status} size="sm" className="mt-1" />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Game</span>
                        <Badge variant="outline">{selectedTournamentData.game}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Format</span>
                        <span>{selectedTournamentData.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>{selectedTournamentData.startDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Participants</span>
                        <span>
                          {selectedTournamentData.currentParticipants}/
                          {selectedTournamentData.maxParticipants}
                        </span>
                      </div>
                      {selectedTournamentData.prizePool && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Prize Pool</span>
                          <span className="font-medium text-green-500">
                            ₹{selectedTournamentData.prizePool.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {selectedTournamentData.entryFee && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Entry Fee</span>
                          <span>₹{selectedTournamentData.entryFee}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Tournament
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Page
                      </Button>
                      {selectedTournamentData.status === 'upcoming' && (
                        <Button variant="destructive" className="w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Tournament
                        </Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="registrations" className="space-y-3">
                    {tournamentRegistrations.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No registrations yet
                      </div>
                    ) : (
                      tournamentRegistrations.slice(0, 5).map((reg) => (
                        <div
                          key={reg.id}
                          className="flex items-center justify-between p-2 rounded border"
                        >
                          <div>
                            <p className="font-medium text-sm">{reg.teamName || reg.userName}</p>
                            <p className="text-xs text-muted-foreground">{reg.registeredAt}</p>
                          </div>
                          <StatusBadge status={reg.status} size="sm" />
                        </div>
                      ))
                    )}
                    {tournamentRegistrations.length > 5 && (
                      <Button variant="outline" className="w-full">
                        View All ({tournamentRegistrations.length})
                      </Button>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a tournament to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
