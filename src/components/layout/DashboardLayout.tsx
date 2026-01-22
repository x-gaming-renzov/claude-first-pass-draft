import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  role: UserRole;
  title: string;
  onRoleChange: (role: UserRole) => void;
}

export function DashboardLayout({ role, title, onRoleChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="pl-64">
        <Header title={title} role={role} onRoleChange={onRoleChange} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
