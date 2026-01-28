import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Star,
  Users,
  AlertTriangle,
  FileText,
  ChevronRight,
  Calendar,
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
import { organizations } from '@/data/mock-data';

export function OrganizerManagementTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingOrgs = organizations.filter((org) => org.status === 'pending');
  const activeOrgs = organizations.filter((org) => org.status === 'verified');

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      searchQuery === '' ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Applications
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingOrgs.length}</div>
            <p className="text-xs text-muted-foreground">Avg review time: 2.3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Organizers
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeOrgs.length}</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Organizer Score
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">Based on performance metrics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Under Review
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Policy violations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queue" className="gap-2">
            <Clock className="h-4 w-4" />
            Application Queue
            <Badge variant="secondary" className="ml-1">
              {pendingOrgs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="directory" className="gap-2">
            <Building2 className="h-4 w-4" />
            Directory
          </TabsTrigger>
          <TabsTrigger value="moderation" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Moderation
          </TabsTrigger>
        </TabsList>

        {/* Application Queue Tab */}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingOrgs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending applications
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrgs.map((org) => (
                    <div
                      key={org.id}
                      className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{org.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {org.tier}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {org.contactEmail}
                          </p>

                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Applied: {org.createdAt}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{org.members?.length || 0} team members</span>
                            </div>
                          </div>

                          {/* Verification Documents */}
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-muted-foreground">Documents:</span>
                            {org.verificationDocs?.map((doc) => (
                              <Badge
                                key={doc.id}
                                variant="outline"
                                className={`text-xs ${
                                  doc.status === 'verified'
                                    ? 'bg-green-500/10 text-green-500'
                                    : doc.status === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-500'
                                    : 'bg-red-500/10 text-red-500'
                                }`}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                {doc.type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
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

        {/* Directory Tab */}
        <TabsContent value="directory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Organizer Directory</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search organizers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[250px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Organization</th>
                      <th className="text-left py-3 px-4 font-medium">Tier</th>
                      <th className="text-center py-3 px-4 font-medium">Tournaments</th>
                      <th className="text-center py-3 px-4 font-medium">Rating</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrganizations.map((org) => (
                      <tr key={org.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{org.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {org.contactEmail}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              org.tier === 'pro'
                                ? 'bg-purple-500/10 text-purple-500'
                                : org.tier === 'verified'
                                ? 'bg-blue-500/10 text-blue-500'
                                : ''
                            }
                          >
                            {org.tier}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-4">
                          {org.totalTournaments}
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span>{org.rating?.toFixed(1) || '-'}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <StatusBadge status={org.status} size="sm" />
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('View details for', org.id)}
                          >
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
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

        {/* Moderation Tab */}
        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Organizers Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizations
                  .filter((org) => org.status === 'suspended')
                  .slice(0, 3)
                  .map((org) => (
                    <div
                      key={org.id}
                      className="rounded-lg border border-red-500/20 bg-red-500/5 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{org.name}</h4>
                            <StatusBadge status="suspended" size="sm" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Suspended on: Jan 15, 2025
                          </p>
                          <div className="mt-2 p-2 rounded bg-background/50">
                            <p className="text-sm font-medium text-red-500">
                              Reason: Multiple player complaints about prize distribution
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Review Case
                          </Button>
                          <Button size="sm">Reinstate</Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {organizations.filter((org) => org.status === 'suspended').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No organizers currently under review
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
