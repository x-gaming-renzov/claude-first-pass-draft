import {
  Trophy,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Bell,
  Gamepad2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { organiserTournaments, organiserStats, matches } from '@/data/mock-data';

export function MyOverviewTab() {
  // Filter tournaments by status
  const liveTournaments = organiserTournaments.filter((t) => t.status === 'live');
  const upcomingTournaments = organiserTournaments.filter((t) => t.status === 'upcoming');
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled').slice(0, 5);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tournaments
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveTournaments.length}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{upcomingTournaments.length} upcoming</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(organiserStats.participantsThisMonth)}</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +{organiserStats.participantsGrowth}% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prize Pool Distributed
            </CardTitle>
            <Wallet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{formatNumber(organiserStats.totalPrizePoolDistributed)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Organizer Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{organiserStats.organizerRating}</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              +{organiserStats.ratingChange} from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Matches</CardTitle>
            <Badge variant="outline">{upcomingMatches.length} scheduled</Badge>
          </CardHeader>
          <CardContent>
            {upcomingMatches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming matches
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{match.tournamentName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Gamepad2 className="h-3 w-3" />
                        <span>{match.game || 'BGMI'}</span>
                        <span>•</span>
                        <span>Round {match.round}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{match.scheduledTime || '10:00'}</p>
                      <p className="text-xs text-muted-foreground">{match.scheduledDate || match.scheduledAt?.split('T')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4">
              View All Matches
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Live Tournaments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live Tournaments
            </CardTitle>
            <Badge variant="secondary">{liveTournaments.length} active</Badge>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {liveTournaments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No live tournaments right now
              </div>
            ) : (
              <div className="space-y-3">
                {liveTournaments.slice(0, 6).map((tournament) => (
                  <div
                    key={tournament.id}
                    className="p-3 rounded-lg border border-green-500/30 bg-green-500/5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{tournament.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {tournament.game}
                        </Badge>
                      </div>
                      <Badge className="bg-green-500 text-white">LIVE</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm mt-3">
                      <div>
                        <p className="text-muted-foreground text-xs">Participants</p>
                        <p className="font-medium">
                          {tournament.participants.toLocaleString()}/{tournament.maxParticipants.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Prize Pool</p>
                        <p className="font-medium">₹{formatNumber(tournament.prizePool)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Fill Rate</p>
                        <p className="font-medium">{Math.round((tournament.participants / tournament.maxParticipants) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
                {liveTournaments.length > 6 && (
                  <div className="text-center text-sm text-muted-foreground py-2">
                    +{liveTournaments.length - 6} more live tournaments
                  </div>
                )}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4">
              View All Live Tournaments
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications & Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Match Starting Soon</p>
                  <p className="text-xs text-muted-foreground">
                    BGMI Pro Finals - Match 3 starts in 15 minutes
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">New Registration</p>
                  <p className="text-xs text-muted-foreground">
                    Team "Phoenix" registered for Weekly Showdown #46
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">12 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Tournament Approved</p>
                  <p className="text-xs text-muted-foreground">
                    Your tournament "Sunday Championship" has been approved
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Support Ticket</p>
                  <p className="text-xs text-muted-foreground">
                    New player inquiry about registration issue
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Tournament Completion Rate</span>
                  <span className="text-sm font-medium text-green-500">98%</span>
                </div>
                <Progress value={98} className="h-2 [&>div]:bg-green-500" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">On-Time Start Rate</span>
                  <span className="text-sm font-medium text-green-500">95%</span>
                </div>
                <Progress value={95} className="h-2 [&>div]:bg-green-500" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Player Satisfaction</span>
                  <span className="text-sm font-medium text-green-500">92%</span>
                </div>
                <Progress value={92} className="h-2 [&>div]:bg-green-500" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Fill Rate</span>
                  <span className="text-sm font-medium text-yellow-500">78%</span>
                </div>
                <Progress value={78} className="h-2 [&>div]:bg-yellow-500" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Prize Distribution</span>
                  <span className="text-sm font-medium text-green-500">100%</span>
                </div>
                <Progress value={100} className="h-2 [&>div]:bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Trophy className="h-5 w-5" />
              <span>Create Tournament</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span>Schedule Match</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Users className="h-5 w-5" />
              <span>View Registrations</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Bell className="h-5 w-5" />
              <span>Send Announcement</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
