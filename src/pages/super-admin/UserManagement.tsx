import { useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  Shield,
  Users,
  UserPlus,
  UserX,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Download,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  users,
  userCounts,
  accessRequests,
  activityLog,
  permissionMatrix as initialPermissionMatrix,
} from '@/data/mock-data';
import type { UserRole } from '@/types';

const roleLabels: Record<string, string> = {
  'super-admin': 'Super Admin',
  'business': 'Business',
  'development': 'Development',
  'support': 'Support',
  'kie': 'KIE',
  'organiser': 'Organiser',
};

const roleBadgeVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
  'super-admin': 'default',
  'business': 'secondary',
  'development': 'secondary',
  'support': 'secondary',
  'kie': 'outline',
  'organiser': 'outline',
};

const statusBadgeColors: Record<string, string> = {
  'active': 'bg-green-100 text-green-700',
  'invited': 'bg-blue-100 text-blue-700',
  'suspended': 'bg-red-100 text-red-700',
  'pending': 'bg-yellow-100 text-yellow-700',
};

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('users');
  const [permissions, setPermissions] = useState(initialPermissionMatrix);
  const [isEditMode, setIsEditMode] = useState(false);

  const togglePermission = (featureIndex: number, role: UserRole) => {
    if (!isEditMode) return;
    setPermissions((prev) =>
      prev.map((row, index) =>
        index === featureIndex
          ? {
              ...row,
              permissions: {
                ...row.permissions,
                [role]: !row.permissions[role],
              },
            }
          : row
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const pendingRequests = accessRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">User & Access Management</h2>
          <p className="text-muted-foreground">
            Control who can access the platform, what they can see, and manage permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Card 2.1: User Overview Dashboard */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5" />
            Platform Users
            <Badge variant="secondary">Total: {userCounts.total.toLocaleString()}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* By Stakeholder Group */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">BY STAKEHOLDER GROUP</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Project Team</span>
                  <span>{userCounts.byGroup.projectTeam}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Business</span>
                  <span>{userCounts.byGroup.business}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Development</span>
                  <span>{userCounts.byGroup.development}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Support Admin</span>
                  <span>{userCounts.byGroup.supportAdmin}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">KIE Team</span>
                  <span>{userCounts.byGroup.kieTeam}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Lead Admin</span>
                  <span>{userCounts.byGroup.kieLeadAdmin}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Team Member</span>
                  <span>{userCounts.byGroup.kieTeamMember}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Organisers</span>
                  <span>{userCounts.byGroup.organisers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Lead Admin</span>
                  <span>{userCounts.byGroup.organiserLeadAdmin}</span>
                </div>
                <div className="flex items-center justify-between py-1 pl-4 text-muted-foreground">
                  <span>Team Member</span>
                  <span>{userCounts.byGroup.organiserTeamMember}</span>
                </div>
              </div>
            </div>

            {/* By Status + Recent Activity */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">BY STATUS</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-lg font-semibold">{userCounts.byStatus.active.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <UserPlus className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-semibold">{userCounts.byStatus.invited}</p>
                      <p className="text-xs text-muted-foreground">Invited</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                    <UserX className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-lg font-semibold">{userCounts.byStatus.suspended}</p>
                      <p className="text-xs text-muted-foreground">Suspended</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-lg font-semibold">{userCounts.byStatus.pending}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">RECENT ACTIVITY</p>
                <div className="space-y-2 text-sm">
                  <p>3 new users today</p>
                  <p>2 role changes</p>
                  <p>1 suspension</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
          <TabsTrigger value="requests">
            Access Requests
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="kie">KIE</SelectItem>
                    <SelectItem value="organiser">Organiser</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          {user.role === 'super-admin' && (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                          <Badge variant="outline" className={statusBadgeColors[user.status]}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={roleBadgeVariants[user.role]}>
                          {roleLabels[user.role]}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {user.team}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground min-w-[100px]">
                        {user.lastActive}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permission Matrix Tab */}
        <TabsContent value="permissions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Permission Matrix</CardTitle>
              <Button
                variant={isEditMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? 'Save Changes' : 'Edit Mode'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 font-medium">Super Admin</th>
                      <th className="text-center py-3 px-4 font-medium">Business</th>
                      <th className="text-center py-3 px-4 font-medium">Dev</th>
                      <th className="text-center py-3 px-4 font-medium">Support</th>
                      <th className="text-center py-3 px-4 font-medium">KIE</th>
                      <th className="text-center py-3 px-4 font-medium">Organiser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((row, rowIndex) => (
                      <tr key={row.feature} className="border-b last:border-0">
                        <td className="py-4 px-6 font-medium">{row.feature}</td>
                        {(['super-admin', 'business', 'development', 'support', 'kie', 'organiser'] as UserRole[]).map((role) => (
                          <td key={role} className="text-center py-4 px-4">
                            <button
                              type="button"
                              onClick={() => togglePermission(rowIndex, role)}
                              className={`transition-all duration-200 ${isEditMode ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                              disabled={!isEditMode}
                            >
                              {row.permissions[role] ? (
                                <div className="h-6 w-6 rounded-full mx-auto flex items-center justify-center bg-primary/20 ring-2 ring-primary/40">
                                  <div className="h-3 w-3 rounded-full bg-primary" />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full mx-auto bg-muted-foreground/20 ring-2 ring-muted-foreground/10" />
                              )}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isEditMode && (
                <p className="text-sm text-muted-foreground mt-4">
                  Click on any permission to toggle it on or off
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Requests Tab */}
        <TabsContent value="requests" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Access Requests ({pendingRequests.length} Pending)</CardTitle>
              <Button variant="outline" size="sm">
                Set Auto-Approval Rules
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessRequests.map((request) => (
                  <div key={request.id} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {request.type === 'new-access' && <UserPlus className="h-4 w-4 text-blue-500" />}
                        {request.type === 'data-export' && <Download className="h-4 w-4 text-purple-500" />}
                        {request.type === 'role-change' && <Users className="h-4 w-4 text-orange-500" />}
                        {request.type === 'permission-escalation' && <Shield className="h-4 w-4 text-green-500" />}
                        <span className="font-medium">
                          {request.type === 'new-access' && request.targetUser && (
                            <>{request.targetUser.name} &rarr; {roleLabels[request.requestedRole!]}</>
                          )}
                          {request.type === 'data-export' && (
                            <>Request: {request.requestedPermission}</>
                          )}
                          {request.type === 'role-change' && (
                            <>{request.targetUser?.name} &rarr; {roleLabels[request.requestedRole!]}</>
                          )}
                          {request.type === 'permission-escalation' && (
                            <>Request: {request.requestedPermission}</>
                          )}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{request.timestamp}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Requested by: {request.requester.name} ({roleLabels[request.requester.role]})</p>
                      <p>Reason: "{request.reason}"</p>
                      {request.scope && <p>Scope: {request.scope}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Approve</Button>
                      {request.type === 'data-export' && (
                        <Button size="sm" variant="outline">Approve with Limits</Button>
                      )}
                      <Button size="sm" variant="outline">Deny</Button>
                      <Button size="sm" variant="ghost">Request Info</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Activity Log</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="experiment">Experiment</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground py-2">Today</div>
                {activityLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between py-2 border-b text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground w-12">{entry.timestamp}</span>
                      {entry.severity === 'warning' && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className={entry.severity === 'warning' ? 'text-yellow-700' : ''}>
                        {entry.action}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {entry.category}
                    </Badge>
                  </div>
                ))}
                <Button variant="ghost" className="w-full mt-2">
                  Load More
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
