import { useState } from 'react';
import {
  Users,
  Shield,
  FileCheck,
  Search,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Edit3,
  Plus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/StatusBadge';
import {
  users,
  userCounts,
  accessRequests,
} from '@/data/mock-data';

// Permission item type
interface PermissionItem {
  name: string;
  superAdmin: boolean;
  kie: boolean;
  organiser: boolean;
}

// Permission group type
interface PermissionGroup {
  id: string;
  name: string;
  items: PermissionItem[];
}

// Permission category type
interface PermissionCategory {
  id: string;
  name: string;
  groups: PermissionGroup[];
}

// Define all permission categories with their groups and items
const initialPermissionCategories: PermissionCategory[] = [
  {
    id: 'data',
    name: 'Data',
    groups: [
      {
        id: 'tournament-registration',
        name: 'Tournament Registration Events',
        items: [
          { name: 'Team registrations', superAdmin: true, kie: true, organiser: true },
          { name: 'Player sign-ups', superAdmin: true, kie: true, organiser: true },
          { name: 'Registration status changes', superAdmin: true, kie: true, organiser: true },
          { name: 'Waitlist movements', superAdmin: true, kie: true, organiser: true },
          { name: 'Slot purchases', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'match-events',
        name: 'Match Events',
        items: [
          { name: 'Match starts/completions', superAdmin: true, kie: true, organiser: true },
          { name: 'Score submissions', superAdmin: true, kie: true, organiser: true },
          { name: 'Player eliminations', superAdmin: true, kie: true, organiser: true },
          { name: 'Team placements', superAdmin: true, kie: true, organiser: true },
          { name: 'Round progressions', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'tournament-lifecycle',
        name: 'Tournament Lifecycle Events',
        items: [
          { name: 'Tournament creation', superAdmin: true, kie: true, organiser: true },
          { name: 'Status changes', superAdmin: true, kie: true, organiser: true },
          { name: 'Schedule updates', superAdmin: true, kie: true, organiser: true },
          { name: 'Format modifications', superAdmin: true, kie: true, organiser: true },
          { name: 'Prize distributions', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'tournament-discovery',
        name: 'Tournament Discovery Events',
        items: [
          { name: 'Search queries', superAdmin: true, kie: true, organiser: true },
          { name: 'Filter applications', superAdmin: true, kie: true, organiser: true },
          { name: 'Category browsing', superAdmin: true, kie: true, organiser: true },
          { name: 'Bookmark actions', superAdmin: true, kie: true, organiser: true },
          { name: 'View/share events', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'organization-events',
        name: 'Organization Events',
        items: [
          { name: 'Profile updates', superAdmin: true, kie: true, organiser: true },
          { name: 'Verification requests', superAdmin: true, kie: true, organiser: true },
          { name: 'Staff changes', superAdmin: true, kie: true, organiser: true },
          { name: 'Feature adoptions', superAdmin: true, kie: true, organiser: true },
          { name: 'Rating changes', superAdmin: true, kie: true, organiser: true },
        ],
      },
    ],
  },
  {
    id: 'action',
    name: 'Action',
    groups: [
      {
        id: 'approval-actions',
        name: 'Approval Actions',
        items: [
          { name: 'Approve/reject organizations', superAdmin: true, kie: true, organiser: false },
          { name: 'Verify organizer documents', superAdmin: true, kie: true, organiser: false },
          { name: 'Approve tournaments', superAdmin: true, kie: true, organiser: false },
          { name: 'Handle verification appeals', superAdmin: true, kie: true, organiser: false },
        ],
      },
      {
        id: 'content-management',
        name: 'Content Management Actions',
        items: [
          { name: 'Feature/unfeature content', superAdmin: true, kie: true, organiser: false },
          { name: 'Edit tournament visibility', superAdmin: true, kie: true, organiser: false },
          { name: 'Manage promotional slots', superAdmin: true, kie: true, organiser: false },
          { name: 'Update categories', superAdmin: true, kie: true, organiser: false },
        ],
      },
      {
        id: 'competition-actions',
        name: 'Competition Actions',
        items: [
          { name: 'Start/pause/cancel tournaments', superAdmin: true, kie: true, organiser: true },
          { name: 'Disqualify teams', superAdmin: true, kie: true, organiser: true },
          { name: 'Award prizes', superAdmin: true, kie: true, organiser: true },
          { name: 'Handle disputes', superAdmin: true, kie: true, organiser: true },
          { name: 'Modify brackets', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'support-actions',
        name: 'Support Actions',
        items: [
          { name: 'Respond to tickets', superAdmin: true, kie: true, organiser: true },
          { name: 'Issue refunds', superAdmin: true, kie: true, organiser: false },
          { name: 'Ban users', superAdmin: true, kie: true, organiser: false },
          { name: 'Transfer teams', superAdmin: true, kie: true, organiser: true },
          { name: 'Reset registrations', superAdmin: true, kie: true, organiser: true },
        ],
      },
      {
        id: 'moderation-actions',
        name: 'Moderation Actions',
        items: [
          { name: 'Review reports', superAdmin: true, kie: true, organiser: false },
          { name: 'Issue warnings', superAdmin: true, kie: true, organiser: false },
          { name: 'Suspend accounts', superAdmin: true, kie: true, organiser: false },
          { name: 'Remove content', superAdmin: true, kie: true, organiser: false },
          { name: 'Review appeals', superAdmin: true, kie: true, organiser: false },
        ],
      },
      {
        id: 'system-actions',
        name: 'System Actions',
        items: [
          { name: 'Configure platform settings', superAdmin: true, kie: false, organiser: false },
          { name: 'Manage feature flags', superAdmin: true, kie: false, organiser: false },
          { name: 'Run experiments', superAdmin: true, kie: false, organiser: false },
          { name: 'Access audit logs', superAdmin: true, kie: false, organiser: false },
        ],
      },
    ],
  },
];

export function UserAccessTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [permissionCategories, setPermissionCategories] = useState(initialPermissionCategories);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    data: true,
    action: true,
  });
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const togglePermission = (
    categoryId: string,
    groupId: string,
    itemIndex: number,
    role: 'superAdmin' | 'kie' | 'organiser'
  ) => {
    if (!isEditMode) return;
    setPermissionCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              groups: category.groups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      items: group.items.map((item, idx) =>
                        idx === itemIndex ? { ...item, [role]: !item[role] } : item
                      ),
                    }
                  : group
              ),
            }
          : category
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <StatusBadge status="active" size="sm" />;
      case 'invited':
        return <StatusBadge status="pending" size="sm" />;
      case 'suspended':
        return <StatusBadge status="suspended" size="sm" />;
      default:
        return <StatusBadge status="pending" size="sm" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-purple-500/10 text-purple-500';
      case 'business':
        return 'bg-blue-500/10 text-blue-500';
      case 'development':
        return 'bg-green-500/10 text-green-500';
      case 'support':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'kie':
        return 'bg-orange-500/10 text-orange-500';
      case 'organiser':
        return 'bg-pink-500/10 text-pink-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{userCounts.total}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{userCounts.byStatus.active}</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
                <p className="text-2xl font-bold">{userCounts.byStatus.invited}</p>
              </div>
              <div className="rounded-full bg-yellow-500/10 p-3">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{userCounts.byStatus.suspended}</p>
              </div>
              <div className="rounded-full bg-red-500/10 p-3">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="h-4 w-4" />
            Permission Matrix
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <FileCheck className="h-4 w-4" />
            Access Requests
            <Badge variant="secondary" className="ml-1">
              {accessRequests.filter((r) => r.status === 'pending').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Directory</CardTitle>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="invited">Invited</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Table */}
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Team</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Last Active</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{user.team}</td>
                        <td className="py-3 px-4">{getStatusBadge(user.status || 'active')}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.lastActive}</td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>Impersonate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Suspend User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permission Matrix Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardContent className="pt-6">
              {/* Header with buttons */}
              <div className="flex justify-end gap-2 mb-6">
                <Button
                  variant={isEditMode ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditMode ? 'Save Changes' : 'Edit Mode'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Role
                </Button>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left py-4 px-6 font-medium text-muted-foreground w-[50%]">Group</th>
                      <th className="text-center py-4 px-4 font-medium text-muted-foreground">Super Admin</th>
                      <th className="text-center py-4 px-4 font-medium text-muted-foreground">KIE</th>
                      <th className="text-center py-4 px-4 font-medium text-muted-foreground">Organiser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionCategories.map((category) => (
                      <>
                        {/* Category Header Row */}
                        <tr
                          key={category.id}
                          className="border-b bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
                          onClick={() => toggleSection(category.id)}
                        >
                          <td colSpan={4} className="py-3 px-4">
                            <div className="flex items-center gap-2 font-semibold">
                              {expandedSections[category.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              {category.name}
                            </div>
                          </td>
                        </tr>

                        {/* Groups and Items */}
                        {expandedSections[category.id] &&
                          category.groups.map((group) => (
                            <>
                              {/* Group Header Row */}
                              <tr
                                key={group.id}
                                className="border-b cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() => toggleGroup(group.id)}
                              >
                                <td colSpan={4} className="py-3 px-4 pl-8">
                                  <div className="flex items-center gap-2 font-medium text-muted-foreground">
                                    {expandedGroups[group.id] ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    {group.name}
                                  </div>
                                </td>
                              </tr>

                              {/* Item Rows */}
                              {expandedGroups[group.id] &&
                                group.items.map((item, itemIndex) => (
                                  <tr key={`${group.id}-${itemIndex}`} className="border-b last:border-0">
                                    <td className="py-3 px-4 pl-14 text-sm">{item.name}</td>
                                    {(['superAdmin', 'kie', 'organiser'] as const).map((role) => (
                                      <td key={role} className="text-center py-3 px-4">
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            togglePermission(category.id, group.id, itemIndex, role);
                                          }}
                                          className={`transition-all duration-200 ${isEditMode ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                                          disabled={!isEditMode}
                                        >
                                          {item[role] ? (
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
                            </>
                          ))}
                      </>
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
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-lg border p-4 flex items-start justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{request.type.replace('-', ' ').toUpperCase()}</Badge>
                        <span className="text-sm text-muted-foreground">{request.timestamp}</span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {request.requester.name} ({request.requester.email})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {request.type === 'new-access' && request.targetUser
                            ? `Requesting access for ${request.targetUser.name}`
                            : request.type === 'role-change'
                            ? `Requesting role change to ${request.requestedRole}`
                            : request.type === 'data-export'
                            ? `Requesting: ${request.requestedPermission}`
                            : `Requesting: ${request.requestedPermission}`}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reason: {request.reason}
                        </p>
                        {request.scope && (
                          <p className="text-sm text-muted-foreground">Scope: {request.scope}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive">
                        <XCircle className="h-4 w-4" />
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
