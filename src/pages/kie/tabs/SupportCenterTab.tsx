import { useState } from 'react';
import {
  Search,
  Clock,
  CheckCircle,
  User,
  Calendar,
  Tag,
  ArrowUpRight,
  Inbox,
  Send,
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
import { Progress } from '@/components/ui/progress';
import { tickets, slaMetrics } from '@/data/mock-data';

export function SupportCenterTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Filter for KIE tickets (Channel 1 & 3)
  const kieTickets = tickets.filter(
    (t) => t.channel === 1 || t.channel === 3
  );

  const openTickets = kieTickets.filter(
    (t) => t.status === 'open' || t.status === 'in-progress'
  );
  const criticalTickets = kieTickets.filter((t) => t.priority === 'critical');
  const escalatedTickets = kieTickets.filter((t) => t.escalated);

  const filteredTickets = kieTickets.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.userId || t.createdBy).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedTicketData = selectedTicket
    ? tickets.find((t) => t.id === selectedTicket)
    : null;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tickets
            </CardTitle>
            <Inbox className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalTickets.length} critical
            </p>
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
            <div className="text-3xl font-bold">2.4h</div>
            <p className="text-xs text-green-500">-15% vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolution Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Within SLA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Escalations
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{escalatedTickets.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* SLA Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SLA Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {slaMetrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{metric.name}</span>
                  <span
                    className={
                      metric.compliance >= 95
                        ? 'text-green-500'
                        : metric.compliance >= 85
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }
                  >
                    {metric.compliance}%
                  </span>
                </div>
                <Progress
                  value={metric.compliance}
                  className={`h-2 ${
                    metric.compliance >= 95
                      ? '[&>div]:bg-green-500'
                      : metric.compliance >= 85
                      ? '[&>div]:bg-yellow-500'
                      : '[&>div]:bg-red-500'
                  }`}
                />
                <p className="text-xs text-muted-foreground">
                  Target: {metric.target} • Current: {metric.current}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Support Tickets</CardTitle>
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
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    <Badge variant="secondary" className="ml-1">
                      {kieTickets.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="channel-1">
                    Channel 1 (Organizers)
                    <Badge variant="secondary" className="ml-1">
                      {kieTickets.filter((t) => t.channel === 1).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="channel-3">
                    Channel 3 (Escalations)
                    <Badge variant="secondary" className="ml-1">
                      {kieTickets.filter((t) => t.channel === 3).length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-2">
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
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{ticket.subject}</h4>
                              {ticket.escalated && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  Escalated
                                </Badge>
                              )}
                            </div>
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
                                <Calendar className="h-3 w-3" />
                                {ticket.createdAt}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                ticket.priority === 'critical'
                                  ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                  : ticket.priority === 'high'
                                  ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                  : ticket.priority === 'medium'
                                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                  : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
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
                </TabsContent>

                <TabsContent value="channel-1" className="space-y-2">
                  {filteredTickets
                    .filter((t) => t.channel === 1)
                    .map((ticket) => (
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
                              <span>{ticket.userId}</span>
                              <span>{ticket.category}</span>
                              <span>{ticket.createdAt}</span>
                            </div>
                          </div>
                          <StatusBadge status={ticket.status} size="sm" />
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="channel-3" className="space-y-2">
                  {filteredTickets
                    .filter((t) => t.channel === 3)
                    .map((ticket) => (
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
                              <span>{ticket.userId}</span>
                              <span>{ticket.category}</span>
                              <span>{ticket.createdAt}</span>
                            </div>
                          </div>
                          <StatusBadge status={ticket.status} size="sm" />
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
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
                      <Badge
                        variant="outline"
                        className={
                          selectedTicketData.priority === 'critical'
                            ? 'bg-red-500/10 text-red-500'
                            : selectedTicketData.priority === 'high'
                            ? 'bg-orange-500/10 text-orange-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }
                      >
                        {selectedTicketData.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">User</span>
                      <span className="font-medium">{selectedTicketData.userId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="outline">{selectedTicketData.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Channel</span>
                      <span>{selectedTicketData.channel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>{selectedTicketData.createdAt}</span>
                    </div>
                    {selectedTicketData.assignedTo && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Assigned To</span>
                        <span>{selectedTicketData.assignedTo}</span>
                      </div>
                    )}
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
                              {msg.sender === 'user' ? 'User' : 'Support'}
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
    </div>
  );
}
