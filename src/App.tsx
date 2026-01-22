import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import type { UserRole } from '@/types';

// Super Admin Pages
import { SuperAdminOverview } from '@/pages/super-admin/Overview';
import { Experiments } from '@/pages/super-admin/Experiments';
import { Stakeholders } from '@/pages/super-admin/Stakeholders';
import { UserManagement } from '@/pages/super-admin/UserManagement';

// Project Team Pages
import { BusinessOverview } from '@/pages/project-team/BusinessOverview';
import { DevelopmentOverview } from '@/pages/project-team/DevelopmentOverview';
import { SupportOverview } from '@/pages/project-team/SupportOverview';

// KIE Pages
import { KIEOverview } from '@/pages/kie/KIEOverview';
import { Applications } from '@/pages/kie/Applications';

// Organiser Pages
import { OrganiserOverview } from '@/pages/organiser/OrganiserOverview';
import { TournamentAnalytics } from '@/pages/organiser/TournamentAnalytics';

const roleTitles: Record<UserRole, string> = {
  'super-admin': 'Super Admin Dashboard',
  'business': 'Business Dashboard',
  'development': 'Development Dashboard',
  'support': 'Support Dashboard',
  'kie': 'KIE Dashboard',
  'organiser': 'Organiser Dashboard',
};

const roleDefaultPaths: Record<UserRole, string> = {
  'super-admin': '/super-admin',
  'business': '/project-team/business',
  'development': '/project-team/development',
  'support': '/project-team/support',
  'kie': '/kie',
  'organiser': '/organiser',
};

function AppContent() {
  const [role, setRole] = useState<UserRole>('super-admin');
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    navigate(roleDefaultPaths[newRole]);
  };

  // Determine title based on current path
  const getTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/super-admin')) return roleTitles['super-admin'];
    if (path.startsWith('/project-team/business')) return roleTitles['business'];
    if (path.startsWith('/project-team/development')) return roleTitles['development'];
    if (path.startsWith('/project-team/support')) return roleTitles['support'];
    if (path.startsWith('/kie')) return roleTitles['kie'];
    if (path.startsWith('/organiser')) return roleTitles['organiser'];
    return 'Dashboard';
  };

  // Sync role with path on mount
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/super-admin')) setRole('super-admin');
    else if (path.startsWith('/project-team/business')) setRole('business');
    else if (path.startsWith('/project-team/development')) setRole('development');
    else if (path.startsWith('/project-team/support')) setRole('support');
    else if (path.startsWith('/kie')) setRole('kie');
    else if (path.startsWith('/organiser')) setRole('organiser');
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/super-admin" replace />} />

      {/* Super Admin Routes */}
      <Route element={<DashboardLayout role={role} title={getTitle()} onRoleChange={handleRoleChange} />}>
        <Route path="/super-admin" element={<SuperAdminOverview />} />
        <Route path="/super-admin/experiments" element={<Experiments />} />
        <Route path="/super-admin/stakeholders" element={<Stakeholders />} />
        <Route path="/super-admin/users" element={<UserManagement />} />
        <Route path="/super-admin/settings" element={<div className="p-4">Settings Page - Coming Soon</div>} />

        {/* Project Team Routes */}
        <Route path="/project-team/business" element={<BusinessOverview />} />
        <Route path="/project-team/business/acquisition" element={<BusinessOverview />} />
        <Route path="/project-team/business/retention" element={<BusinessOverview />} />
        <Route path="/project-team/business/engagement" element={<BusinessOverview />} />
        <Route path="/project-team/development" element={<DevelopmentOverview />} />
        <Route path="/project-team/development/health" element={<DevelopmentOverview />} />
        <Route path="/project-team/development/crashes" element={<DevelopmentOverview />} />
        <Route path="/project-team/support" element={<SupportOverview />} />
        <Route path="/project-team/support/all" element={<SupportOverview />} />

        {/* KIE Routes */}
        <Route path="/kie" element={<KIEOverview />} />
        <Route path="/kie/applications" element={<Applications />} />
        <Route path="/kie/tournaments" element={<KIEOverview />} />
        <Route path="/kie/trends" element={<KIEOverview />} />

        {/* Organiser Routes */}
        <Route path="/organiser" element={<OrganiserOverview />} />
        <Route path="/organiser/tournaments" element={<OrganiserOverview />} />
        <Route path="/organiser/analytics" element={<TournamentAnalytics />} />
        <Route path="/organiser/impressions" element={<TournamentAnalytics />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
