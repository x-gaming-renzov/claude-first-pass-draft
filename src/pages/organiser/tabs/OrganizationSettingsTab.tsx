import { useState } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  Upload,
  Mail,
  Phone,
  Globe,
  Plus,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  Clock,
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
import { Switch } from '@/components/ui/switch';
import { StatusBadge } from '@/components/StatusBadge';

// Mock team members
const teamMembers: Array<{ id: string; name: string; email: string; role: string; status: 'active' | 'pending' }> = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', status: 'active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'support', status: 'pending' },
];

export function OrganizationSettingsTab() {
  const [orgSettings, setOrgSettings] = useState({
    name: 'Pro Gaming India',
    email: 'contact@progamingindia.com',
    phone: '+91 98765 43210',
    website: 'https://progamingindia.com',
    description: 'Professional esports tournament organizer based in India. Hosting BGMI, Free Fire, and Valorant tournaments since 2020.',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <Building2 className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="payouts" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payouts
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{orgSettings.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-purple-500/10 text-purple-500">Pro</Badge>
                      <Badge className="bg-green-500/10 text-green-500">Verified</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input
                    value={orgSettings.name}
                    onChange={(e) => setOrgSettings({ ...orgSettings, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={orgSettings.description}
                    onChange={(e) => setOrgSettings({ ...orgSettings, description: e.target.value })}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Contact Email</label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={orgSettings.email}
                        onChange={(e) => setOrgSettings({ ...orgSettings, email: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={orgSettings.phone}
                        onChange={(e) => setOrgSettings({ ...orgSettings, phone: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Website</label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={orgSettings.website}
                      onChange={(e) => setOrgSettings({ ...orgSettings, website: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Identity Verified</p>
                          <p className="text-xs text-muted-foreground">PAN Card</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500">Verified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Business Registration</p>
                          <p className="text-xs text-muted-foreground">GST Certificate</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500">Verified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Address Proof</p>
                          <p className="text-xs text-muted-foreground">Under review</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/10 text-yellow-500">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={orgSettings.notifications.email}
                      onCheckedChange={(v) =>
                        setOrgSettings({
                          ...orgSettings,
                          notifications: { ...orgSettings.notifications, email: v },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Browser push alerts</p>
                    </div>
                    <Switch
                      checked={orgSettings.notifications.push}
                      onCheckedChange={(v) =>
                        setOrgSettings({
                          ...orgSettings,
                          notifications: { ...orgSettings.notifications, push: v },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive SMS alerts</p>
                    </div>
                    <Switch
                      checked={orgSettings.notifications.sms}
                      onCheckedChange={(v) =>
                        setOrgSettings({
                          ...orgSettings,
                          notifications: { ...orgSettings.notifications, sms: v },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Team Members</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Member</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Select defaultValue={member.role}>
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="text-center py-3 px-4">
                          <StatusBadge status={member.status} size="sm" />
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Payouts Tab */}
        <TabsContent value="payouts">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Primary Bank Account</p>
                        <p className="text-sm text-muted-foreground">HDFC Bank ****4521</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Account Holder</p>
                      <p className="font-medium">Pro Gaming India Pvt Ltd</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">IFSC Code</p>
                      <p className="font-medium">HDFC0001234</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Details
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-dashed">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Backup Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Weekly Showdown #45</p>
                      <p className="text-xs text-muted-foreground">Jan 22, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">₹25,000</p>
                      <Badge className="bg-green-500/10 text-green-500 text-xs">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">BGMI Pro Finals</p>
                      <p className="text-xs text-muted-foreground">Jan 20, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">₹50,000</p>
                      <Badge className="bg-green-500/10 text-green-500 text-xs">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                    <div>
                      <p className="font-medium">Sunday Cup</p>
                      <p className="text-xs text-muted-foreground">Jan 25, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹15,000</p>
                      <Badge className="bg-yellow-500/10 text-yellow-500 text-xs">
                        Processing
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pending Payout</span>
                    <span className="text-xl font-bold">₹15,000</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected by Jan 28, 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
