import { useState } from 'react';
import {
  Settings,
  Bell,
  Database,
  Shield,
  Clock,
  Globe,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Plus,
  ToggleLeft,
  ToggleRight,
  Play,
  Pause,
  Edit,
  Trash2,
  FileText,
  Terminal,
  Search,
  Filter,
  Download,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { dataSources, alertRules, actionScripts, auditLogs } from '@/data/mock-data';

export function ConfigurationTab() {
  const [settings, setSettings] = useState({
    sessionTimeout: '30',
    twoFactorRequired: 'admins-only',
    passwordExpiry: '90',
    dataRetentionDays: '365',
    piiMasking: true,
    exportWatermarking: true,
    defaultDateRange: '30',
    defaultTimezone: 'IST',
    numberFormat: 'indian',
  });

  const [auditLogFilter, setAuditLogFilter] = useState('all');
  const [auditLogSearch, setAuditLogSearch] = useState('');

  const formatLatency = (ms: number) => {
    if (ms === 0) return '-';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatRecords = (count: number) => {
    if (count === 0) return '-';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesFilter = auditLogFilter === 'all' || log.category === auditLogFilter;
    const matchesSearch =
      auditLogSearch === '' ||
      log.action.toLowerCase().includes(auditLogSearch.toLowerCase()) ||
      log.performedByName.toLowerCase().includes(auditLogSearch.toLowerCase()) ||
      (log.targetName || '').toLowerCase().includes(auditLogSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="alerts" className="gap-2">
            <Bell className="h-4 w-4" />
            Alert Rules
          </TabsTrigger>
          <TabsTrigger value="datasources" className="gap-2">
            <Database className="h-4 w-4" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="scripts" className="gap-2">
            <Terminal className="h-4 w-4" />
            Action Scripts
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Platform Settings
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <FileText className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        {/* Alert Rules Tab */}
        <TabsContent value="alerts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Configuration
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Rule Name</th>
                      <th className="text-left py-3 px-4 font-medium">Condition</th>
                      <th className="text-left py-3 px-4 font-medium">Severity</th>
                      <th className="text-left py-3 px-4 font-medium">Recipients</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertRules.map((rule) => (
                      <tr key={rule.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{rule.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{rule.condition}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              rule.severity === 'critical'
                                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                : rule.severity === 'high'
                                ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                : rule.severity === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                            }
                          >
                            {rule.severity}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1 flex-wrap">
                            {rule.recipients.slice(0, 2).map((r) => (
                              <Badge key={r} variant="outline" className="text-xs">
                                {r}
                              </Badge>
                            ))}
                            {rule.recipients.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{rule.recipients.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          {rule.enabled ? (
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                              ON
                            </Badge>
                          ) : (
                            <Badge variant="secondary">OFF</Badge>
                          )}
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {rule.enabled ? (
                                <ToggleRight className="h-4 w-4 text-green-500" />
                              ) : (
                                <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {alertRules.length} rules
                </p>
                <Button variant="outline" size="sm">
                  View All Rules
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Sources Tab */}
        <TabsContent value="datasources">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Sources
                <Badge variant="outline" className="ml-2">
                  Last sync: 2m ago
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
                <Button variant="outline" size="sm">
                  View Logs
                </Button>
                <Button size="sm">Configure Sources</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Source</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Latency</th>
                      <th className="text-right py-3 px-4 font-medium">Last Sync</th>
                      <th className="text-right py-3 px-4 font-medium">Records/hr</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSources.map((source) => (
                      <tr key={source.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{source.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{source.type}</td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {source.status === 'healthy' ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">Healthy</span>
                              </>
                            ) : source.status === 'slow' ? (
                              <>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-yellow-500">Slow</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-red-500">Offline</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-muted-foreground">
                          {formatLatency(source.latency)}
                        </td>
                        <td className="text-right py-3 px-4 text-muted-foreground">
                          {source.lastSync}
                        </td>
                        <td className="text-right py-3 px-4 text-muted-foreground">
                          {formatRecords(source.recordsPerHour)}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="h-4 w-4" />
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

        {/* Action Scripts Tab */}
        <TabsContent value="scripts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Action Scripts
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Script
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {actionScripts.map((script) => (
                  <div
                    key={script.id}
                    className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{script.name}</h4>
                        <p className="text-sm text-muted-foreground">{script.description}</p>
                      </div>
                      <StatusBadge status={script.enabled ? 'active' : 'inactive'} size="sm" />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Trigger:</span>
                        <Badge variant="outline">{script.trigger}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Actions:</span>
                        <span>{script.actions.length} steps</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Last Run:</span>
                        <span>{script.lastRun || 'Never'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span>{script.lastRunStatus || 'Never run'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {script.enabled ? (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings Tab */}
        <TabsContent value="settings">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Session & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Session & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Select
                    value={settings.sessionTimeout}
                    onValueChange={(v) => setSettings({ ...settings, sessionTimeout: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Required</p>
                    <p className="text-xs text-muted-foreground">Who must use 2FA</p>
                  </div>
                  <Select
                    value={settings.twoFactorRequired}
                    onValueChange={(v) => setSettings({ ...settings, twoFactorRequired: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="admins-only">Admins Only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Password Expiry</p>
                    <p className="text-xs text-muted-foreground">
                      Days until password reset required
                    </p>
                  </div>
                  <Select
                    value={settings.passwordExpiry}
                    onValueChange={(v) => setSettings({ ...settings, passwordExpiry: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Data Retention Period</p>
                    <p className="text-xs text-muted-foreground">How long to keep historical data</p>
                  </div>
                  <Select
                    value={settings.dataRetentionDays}
                    onValueChange={(v) => setSettings({ ...settings, dataRetentionDays: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">365 days</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">PII Masking</p>
                    <p className="text-xs text-muted-foreground">Hide sensitive user information</p>
                  </div>
                  <Switch
                    checked={settings.piiMasking}
                    onCheckedChange={(v) => setSettings({ ...settings, piiMasking: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Export Watermarking</p>
                    <p className="text-xs text-muted-foreground">Add user info to exported data</p>
                  </div>
                  <Switch
                    checked={settings.exportWatermarking}
                    onCheckedChange={(v) => setSettings({ ...settings, exportWatermarking: v })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Defaults */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Defaults
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Default Date Range</p>
                    <p className="text-xs text-muted-foreground">Initial time period for charts</p>
                  </div>
                  <Select
                    value={settings.defaultDateRange}
                    onValueChange={(v) => setSettings({ ...settings, defaultDateRange: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 Days</SelectItem>
                      <SelectItem value="14">Last 14 Days</SelectItem>
                      <SelectItem value="30">Last 30 Days</SelectItem>
                      <SelectItem value="90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Default Timezone</p>
                    <p className="text-xs text-muted-foreground">Timezone for all timestamps</p>
                  </div>
                  <Select
                    value={settings.defaultTimezone}
                    onValueChange={(v) => setSettings({ ...settings, defaultTimezone: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="PST">PST (UTC-8)</SelectItem>
                      <SelectItem value="EST">EST (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Number Format</p>
                    <p className="text-xs text-muted-foreground">How numbers are displayed</p>
                  </div>
                  <Select
                    value={settings.numberFormat}
                    onValueChange={(v) => setSettings({ ...settings, numberFormat: v })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian (12,34,567)</SelectItem>
                      <SelectItem value="international">International (1,234,567)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Regional */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-2">Current Configuration</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Region:</span> India
                    </p>
                    <p>
                      <span className="font-medium">Language:</span> English (US)
                    </p>
                    <p>
                      <span className="font-medium">Currency:</span> INR (₹)
                    </p>
                    <p>
                      <span className="font-medium">Date Format:</span> DD/MM/YYYY
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Configure Regional Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Save Changes</Button>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Audit Logs
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={auditLogSearch}
                    onChange={(e) => setAuditLogSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={auditLogFilter} onValueChange={setAuditLogFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="user">User Management</SelectItem>
                    <SelectItem value="config">Configuration</SelectItem>
                    <SelectItem value="data">Data Access</SelectItem>
                    <SelectItem value="moderation">Moderation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Details</th>
                      <th className="text-left py-3 px-4 font-medium">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuditLogs.slice(0, 15).map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 font-medium">{log.performedByName}</td>
                        <td className="py-3 px-4">{log.action}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground max-w-[300px] truncate">
                          {log.targetName || '-'}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                          {log.ipAddress || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {Math.min(15, filteredAuditLogs.length)} of {filteredAuditLogs.length} logs
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
