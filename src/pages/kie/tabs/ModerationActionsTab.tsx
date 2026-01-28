import { useState } from 'react';
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Flag,
  Eye,
  CheckCircle,
  Clock,
  User,
  Ban,
  RefreshCw,
  ChevronRight,
  FileText,
  History,
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
import { moderationActions, userReports } from '@/data/mock-data';

export function ModerationActionsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const pendingReports = userReports.filter((r) => r.status === 'pending');
  const reviewingReports = userReports.filter((r) => r.status === 'investigating');

  const filteredReports = userReports.filter((r) => {
    const matchesSearch =
      searchQuery === '' ||
      r.reportedUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || r.category === typeFilter;
    return matchesSearch && matchesType;
  });

  const selectedReportData = selectedReport
    ? userReports.find((r) => r.id === selectedReport)
    : null;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Reports
            </CardTitle>
            <Flag className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingReports.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Under Review
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reviewingReports.length}</div>
            <p className="text-xs text-muted-foreground">Being investigated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Actions This Week
            </CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{moderationActions.length}</div>
            <p className="text-xs text-muted-foreground">Bans, warnings, etc.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Appeals
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports" className="gap-2">
            <Flag className="h-4 w-4" />
            Reports Queue
            <Badge variant="secondary" className="ml-1">
              {pendingReports.length + reviewingReports.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content Moderation
          </TabsTrigger>
          <TabsTrigger value="appeals" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Appeals
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            Action History
          </TabsTrigger>
        </TabsList>

        {/* Reports Queue Tab */}
        <TabsContent value="reports">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Report List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">User Reports</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="cheating">Cheating</SelectItem>
                        <SelectItem value="harassment">Harassment</SelectItem>
                        <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                        <SelectItem value="spam">Spam</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredReports.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No reports found
                      </div>
                    ) : (
                      filteredReports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => setSelectedReport(report.id)}
                          className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                            selectedReport === report.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">
                                  {report.reportedUserName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {report.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {report.reason}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  by {report.reportedByName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {report.createdAt}
                                </span>
                              </div>
                            </div>
                            <StatusBadge status={report.status} size="sm" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Detail */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Report Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedReportData ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{selectedReportData.reportedUserName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <StatusBadge status={selectedReportData.status} size="sm" />
                          <Badge variant="outline">
                            {selectedReportData.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Category</span>
                          <Badge variant="outline">{selectedReportData.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Reported By</span>
                          <span>{selectedReportData.reportedByName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span>{selectedReportData.createdAt}</span>
                        </div>
                        {selectedReportData.tournamentId && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tournament</span>
                            <Button variant="link" className="p-0 h-auto text-sm">
                              View Tournament
                            </Button>
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Reason</h5>
                        <p className="text-sm p-3 rounded-lg bg-muted/50">
                          {selectedReportData.reason}
                        </p>
                      </div>

                      {selectedReportData.evidence && selectedReportData.evidence.length > 0 && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Evidence</h5>
                          <div className="space-y-2">
                            {selectedReportData.evidence.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 rounded border"
                              >
                                <span className="text-sm">{item}</span>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <h5 className="font-medium text-sm mb-2">Take Action</h5>
                        <Textarea
                          placeholder="Add notes about your decision..."
                          className="min-h-[60px] mb-3"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="text-green-500">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Dismiss
                          </Button>
                          <Button variant="outline" className="text-yellow-500">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Warn User
                          </Button>
                          <Button variant="outline" className="text-orange-500">
                            <Clock className="h-4 w-4 mr-1" />
                            Temp Ban
                          </Button>
                          <Button variant="destructive">
                            <Ban className="h-4 w-4 mr-1" />
                            Perm Ban
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select a report to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Content Moderation Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Tournament Description</h4>
                        <Badge variant="outline">Text</Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-500">Flagged</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tournament: "Ultimate BGMI Championship"
                      </p>
                      <div className="mt-2 p-3 rounded bg-muted/50">
                        <p className="text-sm">
                          Contains potentially inappropriate language in description...
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Flagged by: Auto-moderation • 2 hours ago
                      </p>
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
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Organization Logo</h4>
                        <Badge variant="outline">Image</Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-500">Flagged</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Organization: "Pro Gaming India"
                      </p>
                      <div className="mt-2 p-3 rounded bg-muted/50">
                        <p className="text-sm">
                          Logo flagged for potential trademark infringement...
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Flagged by: User report • 5 hours ago
                      </p>
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
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appeals Tab */}
        <TabsContent value="appeals">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Appeals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">player_xyz123</h4>
                        <Badge className="bg-orange-500 text-white">Temp Ban Appeal</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Original action: 7-day ban for suspected cheating
                      </p>
                      <div className="mt-2 p-3 rounded bg-background/50">
                        <p className="text-sm">
                          "I wasn't cheating, my internet was lagging which caused the unusual
                          movement patterns. I have been playing fairly for 2 years..."
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted: Jan 20, 2025 • Ban expires: Jan 25, 2025
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        View Full Case
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept Appeal
                      </Button>
                      <Button variant="destructive" size="sm">
                        Deny Appeal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">gamer_pro99</h4>
                        <Badge className="bg-red-500 text-white">Perm Ban Appeal</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Original action: Permanent ban for repeated harassment
                      </p>
                      <div className="mt-2 p-3 rounded bg-background/50">
                        <p className="text-sm">
                          "I apologize for my behavior. I was going through a difficult time and
                          took it out on other players..."
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted: Jan 18, 2025 • Previous offenses: 3
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        View Full Case
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept Appeal
                      </Button>
                      <Button variant="destructive" size="sm">
                        Deny Appeal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Moderation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                      <th className="text-left py-3 px-4 font-medium">Reason</th>
                      <th className="text-left py-3 px-4 font-medium">Moderator</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-right py-3 px-4 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moderationActions.map((action) => (
                      <tr key={action.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{action.targetName}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              action.type === 'ban'
                                ? 'bg-red-500/10 text-red-500'
                                : action.type === 'suspension'
                                ? 'bg-orange-500/10 text-orange-500'
                                : action.type === 'warning'
                                ? 'bg-yellow-500/10 text-yellow-500'
                                : 'bg-blue-500/10 text-blue-500'
                            }
                          >
                            {action.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">
                          {action.reason}
                        </td>
                        <td className="py-3 px-4">{action.performedByName}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {action.createdAt}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}
