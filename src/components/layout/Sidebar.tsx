import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Settings,
  TrendingUp,
  Bug,
  HeartPulse,
  BarChart3,
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
    { label: 'Insights', href: '/super-admin', icon: LayoutDashboard },
    { label: 'Users & Actions', href: '/super-admin/users', icon: UserCog },
    { label: 'Settings', href: '/super-admin/config', icon: Settings },
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
    { label: 'Insights', href: '/kie', icon: BarChart3 },
    { label: 'Actions', href: '/kie/actions', icon: LayoutDashboard },
  ],
  'organiser': [
    { label: 'Insights', href: '/organiser', icon: BarChart3 },
    { label: 'Actions', href: '/organiser/actions', icon: LayoutDashboard },
    { label: 'Settings', href: '/organiser/settings', icon: Settings },
  ],
};


export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const navItems = roleNavItems[role];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <img
            src="/Battlin-Xgaming.png"
            alt="Powered by X Gaming"
            className="h-8 w-auto"
          />
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
