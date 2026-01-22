import { Building2, Users, Trophy, Briefcase, Code, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const stakeholders = [
  {
    id: 'project-team',
    name: 'Project Team',
    description: 'Internal Krafton teams managing business metrics and development',
    icon: Building2,
    subTeams: [
      { name: 'Business Team', users: 8, link: '/project-team/business', icon: Briefcase },
      { name: 'Development Team', users: 12, link: '/project-team/development', icon: Code },
      { name: 'Support Admin', users: 4, link: '/project-team/support', icon: Headphones },
    ],
    totalUsers: 24,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900',
  },
  {
    id: 'kie',
    name: 'KIE Team',
    description: 'Krafton India eSports team managing tournament applications',
    icon: Trophy,
    stats: [
      { label: 'Pending Applications', value: 12 },
      { label: 'Active Tournaments', value: 8 },
      { label: 'Total Organizers', value: 156 },
    ],
    totalUsers: 8,
    link: '/kie',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900',
  },
  {
    id: 'organisers',
    name: 'Organisers',
    description: 'External tournament organizers managing events and sponsors',
    icon: Users,
    stats: [
      { label: 'Active Organizers', value: 156 },
      { label: 'Pending Approval', value: 23 },
      { label: 'Total Tournaments', value: 342 },
    ],
    totalUsers: 156,
    link: '/organiser',
    color: 'bg-green-100 text-green-600 dark:bg-green-900',
  },
];

export function Stakeholders() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">All Stakeholders</h2>
        <p className="text-muted-foreground">
          Overview of all stakeholder groups and their access levels
        </p>
      </div>

      {/* Stakeholder Cards */}
      <div className="space-y-6">
        {stakeholders.map((stakeholder) => (
          <Card key={stakeholder.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${stakeholder.color}`}>
                    <stakeholder.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{stakeholder.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stakeholder.description}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{stakeholder.totalUsers} users</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {stakeholder.subTeams ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {stakeholder.subTeams.map((team) => (
                    <Link key={team.name} to={team.link}>
                      <div className="rounded-lg border p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="rounded-lg bg-secondary p-2">
                            <team.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{team.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {team.users} team members
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="grid gap-4 md:grid-cols-3 flex-1">
                    {stakeholder.stats?.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to={stakeholder.link || '#'}>
                    <Button>View Dashboard</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Access Control Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Access Control Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 font-medium">Super Admin</th>
                  <th className="text-center py-3 px-4 font-medium">Project Team</th>
                  <th className="text-center py-3 px-4 font-medium">KIE</th>
                  <th className="text-center py-3 px-4 font-medium">Organisers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'View All Dashboards', superAdmin: true, projectTeam: false, kie: false, organiser: false },
                  { feature: 'Manage Experiments', superAdmin: true, projectTeam: false, kie: false, organiser: false },
                  { feature: 'User Management', superAdmin: true, projectTeam: false, kie: false, organiser: false },
                  { feature: 'View Analytics', superAdmin: true, projectTeam: true, kie: true, organiser: true },
                  { feature: 'Approve Applications', superAdmin: true, projectTeam: false, kie: true, organiser: false },
                  { feature: 'Manage Tournaments', superAdmin: true, projectTeam: false, kie: true, organiser: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b">
                    <td className="py-3 px-4">{row.feature}</td>
                    <td className="text-center py-3 px-4">
                      {row.superAdmin ? '✓' : '—'}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.projectTeam ? '✓' : '—'}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.kie ? '✓' : '—'}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.organiser ? '✓' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
