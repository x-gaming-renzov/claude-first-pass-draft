import { useState } from 'react';
import { Plus, Search, MoreVertical, Mail, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

const users = [
  { id: '1', name: 'James Kim', email: 'james@krafton.com', role: 'super-admin', team: 'Krafton', lastActive: '2 hours ago' },
  { id: '2', name: 'Aviral Chandra', email: 'aviral@xgaming.com', role: 'business', team: 'X-Gaming', lastActive: '1 hour ago' },
  { id: '3', name: 'Paras Jadiya', email: 'paras@xgaming.com', role: 'development', team: 'X-Gaming', lastActive: '30 mins ago' },
  { id: '4', name: 'Yogesh Daroliya', email: 'yogesh@xgaming.com', role: 'development', team: 'X-Gaming', lastActive: '3 hours ago' },
  { id: '5', name: 'Pranay Pandit', email: 'pranay@xgaming.com', role: 'development', team: 'X-Gaming', lastActive: '1 day ago' },
  { id: '6', name: 'Rahul Sharma', email: 'rahul@esportsindia.com', role: 'organiser', team: 'ESports India', lastActive: '5 hours ago' },
  { id: '7', name: 'Priya Patel', email: 'priya@gaminghub.in', role: 'kie', team: 'KIE', lastActive: '2 days ago' },
];

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

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">User Management</h2>
          <p className="text-muted-foreground">
            Manage user access and permissions across all stakeholders
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">{users.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">
              {users.filter(u => u.role === 'super-admin').length}
            </p>
            <p className="text-sm text-muted-foreground">Super Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">
              {users.filter(u => ['business', 'development', 'support'].includes(u.role)).length}
            </p>
            <p className="text-sm text-muted-foreground">Project Team</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">
              {users.filter(u => u.role === 'organiser').length}
            </p>
            <p className="text-sm text-muted-foreground">Organisers</p>
          </CardContent>
        </Card>
      </div>

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
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                  <div className="text-right text-sm text-muted-foreground">
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
    </div>
  );
}
