import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  Settings,
  TrendingUp,
  Bug,
  HeartPulse,
  Trophy,
  FileCheck,
  BarChart3,
  Megaphone,
  Palette,
  UserCog,
  Building2,
} from 'lucide-react';
import type { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  'super-admin': [
    { label: 'Overview', href: '/super-admin', icon: LayoutDashboard },
    { label: 'All Stakeholders', href: '/super-admin/stakeholders', icon: Building2 },
    { label: 'Experiments', href: '/super-admin/experiments', icon: FlaskConical },
    { label: 'User Management', href: '/super-admin/users', icon: UserCog },
    { label: 'Settings', href: '/super-admin/settings', icon: Settings },
  ],
  'business': [
    { label: 'Overview', href: '/project-team/business', icon: LayoutDashboard },
    { label: 'Acquisition', href: '/project-team/business/acquisition', icon: Users },
    { label: 'Retention', href: '/project-team/business/retention', icon: TrendingUp },
    { label: 'Engagement', href: '/project-team/business/engagement', icon: BarChart3 },
  ],
  'development': [
    { label: 'Overview', href: '/project-team/development', icon: LayoutDashboard },
    { label: 'Health Monitor', href: '/project-team/development/health', icon: HeartPulse },
    { label: 'Crash Reports', href: '/project-team/development/crashes', icon: Bug },
  ],
  'support': [
    { label: 'Overview', href: '/project-team/support', icon: LayoutDashboard },
    { label: 'All Dashboards', href: '/project-team/support/all', icon: Building2 },
  ],
  'kie': [
    { label: 'Overview', href: '/kie', icon: LayoutDashboard },
    { label: 'Applications', href: '/kie/applications', icon: FileCheck },
    { label: 'Tournaments', href: '/kie/tournaments', icon: Trophy },
    { label: 'Trends', href: '/kie/trends', icon: TrendingUp },
  ],
  'organiser': [
    { label: 'Overview', href: '/organiser', icon: LayoutDashboard },
    { label: 'Tournaments', href: '/organiser/tournaments', icon: Trophy },
    { label: 'Analytics', href: '/organiser/analytics', icon: BarChart3 },
    { label: 'Impressions', href: '/organiser/impressions', icon: Megaphone },
  ],
};

const roleLabels: Record<UserRole, string> = {
  'super-admin': 'Super Admin',
  'business': 'Business Team',
  'development': 'Development Team',
  'support': 'Support Admin',
  'kie': 'KIE Team',
  'organiser': 'Organiser',
};

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const navItems = roleNavItems[role];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Palette className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">X-Gaming</span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="border-b px-4 py-3">
          <div className="rounded-md bg-secondary px-3 py-2">
            <p className="text-xs text-muted-foreground">Current Role</p>
            <p className="font-medium text-sm">{roleLabels[role]}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground">
            Analytics Dashboard v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
