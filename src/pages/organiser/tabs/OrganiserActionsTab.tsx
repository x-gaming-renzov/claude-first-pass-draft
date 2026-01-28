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
  User,
  Tag,
  Send,
  MessageSquare,
  AlertTriangle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge, type StatusType } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';

// Import mock data
import myTournamentsData from '@/mock/organizer/my-tournaments.json';
import registrationsData from '@/mock/organizer/registrations.json';
import playerTicketsData from '@/mock/organizer/player-tickets.json';
import kieTicketsData from '@/mock/organizer/kie-tickets.json';

// Types matching actual JSON structure
interface Tournament {
  id: string;
  name: string;
  game: string;
  status: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  registeredTeams: number;
  maxTeams: number;
  format: string;
  entryFee: number;
  currentRound: string | null;
}

interface Registration {
  id: string;
  teamName: string;
  captain: string;
  captainEmail: string;
  members: number;
  confirmed: number;
  submitted: string;
  status: string;
  tournamentId: string;
  tournamentName: string;
  paymentStatus: string;
  rejectionReason?: string;
}

interface TicketMessage {
  from: string;
  sender: string;
  text: string;
  time: string;
}

interface PlayerTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  tournamentId: string;
  tournamentName: string;
  from: string;
  playerName: string;
  playerEmail: string;
  created: string;
  lastUpdated: string;
  messages: TicketMessage[];
}

interface KIETicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  tournamentId: string;
  tournamentName: string;
  created: string;
  lastUpdated: string;
  description: string;
  attachments: string[];
  response: string | null;
}

// Use imported data directly
const myTournaments: Tournament[] = myTournamentsData;
const registrations: Registration[] = registrationsData;
const playerTickets: PlayerTicket[] = playerTicketsData;
const kieTickets: KIETicket[] = kieTicketsData;

export function OrganiserActionsTab() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="tournaments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tournaments" className="gap-2">
            <Trophy className="h-4 w-4" />
            Tournaments
          </TabsTrigger>
          <TabsTrigger value="registrations" className="gap-2">
            <Users className="h-4 w-4" />
            Registrations
            <Badge variant="secondary" className="ml-1">
              {registrations.filter((r) => r.status === 'pending').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Support
            <Badge variant="secondary" className="ml-1">
              {playerTickets.filter((t) => t.status === 'open' || t.status === 'in-progress').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="kie-support" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            KIE Support
            <Badge variant="secondary" className="ml-1">
              {kieTickets.filter((t) => t.status === 'pending' || t.status === 'in-review').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tournaments">
          <TournamentsSubTab />
        </TabsContent>
        <TabsContent value="registrations">
          <RegistrationsSubTab />
        </TabsContent>
        <TabsContent value="support">
          <SupportSubTab />
        </TabsContent>
        <TabsContent value="kie-support">
          <KIESupportSubTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Tournaments Sub-Tab
function TournamentsSubTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const filteredTournaments = myTournaments.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTournamentData = selectedTournament
    ? myTournaments.find((t) => t.id === selectedTournament)
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
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                          <StatusBadge status={tournament.status as StatusType} size="sm" />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {tournament.game}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tournament.registeredTeams}/{tournament.maxTeams}
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
                            (tournament.registeredTeams / tournament.maxTeams) * 100
                          )}
                          % filled
                        </span>
                      </div>
                      <Progress
                        value={
                          (tournament.registeredTeams / tournament.maxTeams) * 100
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
                      <StatusBadge status={selectedTournamentData.status as StatusType} size="sm" className="mt-1" />
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
                        <span className="text-muted-foreground">Teams</span>
                        <span>
                          {selectedTournamentData.registeredTeams}/
                          {selectedTournamentData.maxTeams}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prize Pool</span>
                        <span className="font-medium text-green-500">
                          ₹{selectedTournamentData.prizePool.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Entry Fee</span>
                        <span>₹{selectedTournamentData.entryFee}</span>
                      </div>
                      {selectedTournamentData.currentRound && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Current Round</span>
                          <span>{selectedTournamentData.currentRound}</span>
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
                            <p className="font-medium text-sm">{reg.teamName}</p>
                            <p className="text-xs text-muted-foreground">{reg.submitted}</p>
                          </div>
                          <StatusBadge status={reg.status as StatusType} size="sm" />
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

// Registrations Sub-Tab
function RegistrationsSubTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tournamentFilter, setTournamentFilter] = useState('all');

  const pendingRegistrations = registrations.filter((r) => r.status === 'pending');
  const approvedRegistrations = registrations.filter((r) => r.status === 'approved');

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      searchQuery === '' ||
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.captain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesTournament = tournamentFilter === 'all' || r.tournamentId === tournamentFilter;
    return matchesSearch && matchesStatus && matchesTournament;
  });

  // Get unique tournaments for filter
  const uniqueTournaments = [...new Set(registrations.map((r) => r.tournamentId))].map((id) => {
    const reg = registrations.find((r) => r.tournamentId === id);
    return { id, name: reg?.tournamentName || id };
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingRegistrations.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedRegistrations.length}</div>
            <p className="text-xs text-muted-foreground">Teams confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Teams
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{registrations.length}</div>
            <p className="text-xs text-muted-foreground">Across all tournaments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid Registrations
            </CardTitle>
            <Trophy className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {registrations.filter((r) => r.paymentStatus === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">Payment confirmed</p>
          </CardContent>
        </Card>
      </div>

      {/* Registration Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Registration Queue</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Select value={tournamentFilter} onValueChange={setTournamentFilter}>
              <SelectTrigger className="w-[180px]">
                <Trophy className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tournament" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tournaments</SelectItem>
                {uniqueTournaments.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Team</th>
                  <th className="text-left py-3 px-4 font-medium">Tournament</th>
                  <th className="text-center py-3 px-4 font-medium">Members</th>
                  <th className="text-center py-3 px-4 font-medium">Payment</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-t hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{reg.teamName}</p>
                        <p className="text-xs text-muted-foreground">
                          Captain: {reg.captain}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{reg.tournamentName}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      {reg.confirmed}/{reg.members}
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          reg.paymentStatus === 'completed'
                            ? 'bg-green-500/10 text-green-500'
                            : reg.paymentStatus === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-gray-500/10 text-gray-500'
                        }
                      >
                        {reg.paymentStatus}
                      </Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <StatusBadge status={reg.status as StatusType} size="sm" />
                    </td>
                    <td className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        {reg.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 h-7 px-2"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm" className="h-7 px-2">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
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

// Support Sub-Tab (Player Support)
function SupportSubTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const openTickets = playerTickets.filter(
    (t) => t.status === 'open' || t.status === 'in-progress'
  );
  const resolvedTickets = playerTickets.filter(
    (t) => t.status === 'resolved' || t.status === 'closed'
  );

  const filteredTickets = playerTickets.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.playerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicketData = selectedTicket
    ? playerTickets.find((t) => t.id === selectedTicket)
    : null;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tickets
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openTickets.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.5h</div>
            <p className="text-xs text-green-500">-30min vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedTickets.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Satisfaction
            </CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Player satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Player Inquiries</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredTickets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tickets found
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                        selectedTicket === ticket.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{ticket.subject}</h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {ticket.playerName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {ticket.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {ticket.created.split('T')[0]}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              ticket.priority === 'critical'
                                ? 'bg-red-500/10 text-red-500'
                                : ticket.priority === 'high'
                                ? 'bg-orange-500/10 text-orange-500'
                                : ticket.priority === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : ''
                            }
                          >
                            {ticket.priority}
                          </Badge>
                          <StatusBadge status={ticket.status as StatusType} size="sm" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Detail */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTicketData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{selectedTicketData.subject}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusBadge status={selectedTicketData.status as StatusType} size="sm" />
                      <Badge variant="outline">{selectedTicketData.category}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Player</span>
                      <span className="font-medium">{selectedTicketData.playerName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tournament</span>
                      <span>{selectedTicketData.tournamentName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Priority</span>
                      <Badge
                        variant="outline"
                        className={
                          selectedTicketData.priority === 'critical'
                            ? 'bg-red-500/10 text-red-500'
                            : selectedTicketData.priority === 'high'
                            ? 'bg-orange-500/10 text-orange-500'
                            : ''
                        }
                      >
                        {selectedTicketData.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>{selectedTicketData.created.split('T')[0]}</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-sm mb-3">Conversation</h5>
                    <div className="space-y-3 max-h-[200px] overflow-y-auto">
                      {selectedTicketData.messages?.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg text-sm ${
                            msg.from === 'player'
                              ? 'bg-muted'
                              : 'bg-primary/10 border border-primary/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">
                              {msg.from === 'player' ? msg.sender : 'You'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {msg.time.split('T')[0]}
                            </span>
                          </div>
                          <p>{msg.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply */}
                  <div className="border-t pt-4">
                    <Textarea
                      placeholder="Type your response..."
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                      <Button variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a ticket to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// KIE Support Sub-Tab
function KIESupportSubTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const pendingTickets = kieTickets.filter(
    (t) => t.status === 'pending' || t.status === 'in-review'
  );

  const filteredTickets = kieTickets.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tournamentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingTickets.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting KIE response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {kieTickets.filter((t) => t.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {kieTickets.filter((t) => t.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.3d</div>
            <p className="text-xs text-muted-foreground">Average turnaround</p>
          </CardContent>
        </Card>
      </div>

      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">KIE Requests</h2>
          <p className="text-sm text-muted-foreground">
            Escalations and requests to the KIE Team
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Request History</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="escalation">Escalation</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No requests found
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <Badge
                          variant="outline"
                          className={
                            ticket.priority === 'critical'
                              ? 'bg-red-500/10 text-red-500'
                              : ticket.priority === 'high'
                              ? 'bg-orange-500/10 text-orange-500'
                              : ticket.priority === 'medium'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : ''
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <StatusBadge status={ticket.status as StatusType} size="sm" />
                      </div>

                      <p className="text-sm text-muted-foreground mt-1">
                        {ticket.description.length > 100
                          ? `${ticket.description.substring(0, 100)}...`
                          : ticket.description}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {ticket.tournamentName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {ticket.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ticket.created.split('T')[0]}
                        </span>
                        {ticket.attachments.length > 0 && (
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {ticket.attachments.length} files
                          </span>
                        )}
                      </div>

                      {ticket.response && (
                        <div className="mt-3 p-2 rounded bg-muted/50">
                          <p className="text-sm">
                            <span className="font-medium">KIE Response: </span>
                            {ticket.response}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
