import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import type { UserRole } from '@/types';

// New Consolidated Dashboard Pages
import { SuperAdminDashboard } from '@/pages/super-admin/SuperAdminDashboard';
import { KIEDashboard } from '@/pages/kie/KIEDashboard';
import { OrganiserDashboard } from '@/pages/organiser/OrganiserDashboard';

// Project Team Pages (keeping for backwards compatibility)
import { BusinessOverview } from '@/pages/project-team/BusinessOverview';
import { DevelopmentOverview } from '@/pages/project-team/DevelopmentOverview';
import { SupportOverview } from '@/pages/project-team/SupportOverview';

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

      {/* All routes under DashboardLayout */}
      <Route element={<DashboardLayout role={role} onRoleChange={handleRoleChange} />}>
        {/* Super Admin Routes - New consolidated 5-tab dashboard */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/:tab" element={<SuperAdminDashboard />} />

        {/* Project Team Routes (keeping for backwards compatibility) */}
        <Route path="/project-team/business" element={<BusinessOverview />} />
        <Route path="/project-team/business/acquisition" element={<BusinessOverview />} />
        <Route path="/project-team/business/retention" element={<BusinessOverview />} />
        <Route path="/project-team/business/engagement" element={<BusinessOverview />} />
        <Route path="/project-team/development" element={<DevelopmentOverview />} />
        <Route path="/project-team/development/health" element={<DevelopmentOverview />} />
        <Route path="/project-team/development/crashes" element={<DevelopmentOverview />} />
        <Route path="/project-team/support" element={<SupportOverview />} />
        <Route path="/project-team/support/all" element={<SupportOverview />} />

        {/* KIE Routes - New consolidated 6-tab dashboard */}
        <Route path="/kie" element={<KIEDashboard />} />
        <Route path="/kie/:tab" element={<KIEDashboard />} />

        {/* Organiser Routes - New consolidated 6-tab dashboard */}
        <Route path="/organiser" element={<OrganiserDashboard />} />
        <Route path="/organiser/:tab" element={<OrganiserDashboard />} />
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
