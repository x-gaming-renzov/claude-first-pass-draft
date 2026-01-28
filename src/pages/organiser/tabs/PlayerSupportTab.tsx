import { useState } from 'react';
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  Tag,
  Send,
  Bell,
  Megaphone,
  Plus,
  ChevronRight,
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
import { StatusBadge } from '@/components/StatusBadge';
import { tickets } from '@/data/mock-data';

export function PlayerSupportTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Filter for organizer tickets (Channel 2)
  const myTickets = tickets.filter((t) => t.channel === 2);

  const openTickets = myTickets.filter(
    (t) => t.status === 'open' || t.status === 'in-progress'
  );
  const resolvedTickets = myTickets.filter(
    (t) => t.status === 'resolved' || t.status === 'closed'
  );

  const filteredTickets = myTickets.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.userId || t.createdBy).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicketData = selectedTicket
    ? tickets.find((t) => t.id === selectedTicket)
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
              Resolved Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedTickets.length}</div>
            <p className="text-xs text-muted-foreground">Great job!</p>
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Player Tickets
            <Badge variant="secondary" className="ml-1">
              {openTickets.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
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
                                  {ticket.userId}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  {ticket.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {ticket.createdAt}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  ticket.priority === 'high'
                                    ? 'bg-orange-500/10 text-orange-500'
                                    : ticket.priority === 'medium'
                                    ? 'bg-yellow-500/10 text-yellow-500'
                                    : ''
                                }
                              >
                                {ticket.priority}
                              </Badge>
                              <StatusBadge status={ticket.status} size="sm" />
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
                          <StatusBadge status={selectedTicketData.status} size="sm" />
                          <Badge variant="outline">{selectedTicketData.category}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Player</span>
                          <span className="font-medium">{selectedTicketData.userId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Priority</span>
                          <Badge
                            variant="outline"
                            className={
                              selectedTicketData.priority === 'high'
                                ? 'bg-orange-500/10 text-orange-500'
                                : ''
                            }
                          >
                            {selectedTicketData.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Created</span>
                          <span>{selectedTicketData.createdAt}</span>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="border-t pt-4">
                        <h5 className="font-medium text-sm mb-3">Conversation</h5>
                        <div className="space-y-3 max-h-[200px] overflow-y-auto">
                          {selectedTicketData.messages?.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-2 rounded-lg text-sm ${
                                msg.sender === 'user'
                                  ? 'bg-muted'
                                  : 'bg-primary/10 border border-primary/20'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-xs">
                                  {msg.sender === 'user' ? 'Player' : 'You'}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp}
                                </span>
                              </div>
                              <p>{msg.message}</p>
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
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Tournament Announcements</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Announcement
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Schedule Change - BGMI Pro Finals</h4>
                            <Badge className="bg-blue-500/10 text-blue-500">Published</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Match 3 has been rescheduled to 8:00 PM due to server maintenance.
                            All registered players have been notified.
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Posted 2 hours ago</span>
                            <span>Sent to 128 players</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Prize Distribution Update</h4>
                            <Badge className="bg-blue-500/10 text-blue-500">Published</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Prize money for Weekly Showdown #45 has been distributed.
                            Please check your registered payment method.
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Posted yesterday</span>
                            <span>Sent to 64 players</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">New Tournament Announcement</h4>
                            <Badge variant="outline">Draft</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get ready for our biggest tournament yet! BGMI Championship 2025
                            with ₹1,00,000 prize pool. Registrations open next week.
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Draft saved 3 days ago</span>
                            <span>Not published</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Announcement */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Announcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Announcement title" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Write your announcement..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Send To</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Players</SelectItem>
                        <SelectItem value="registered">Registered Players</SelectItem>
                        <SelectItem value="tournament">Specific Tournament</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Save Draft
                    </Button>
                    <Button className="flex-1">
                      <Bell className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
