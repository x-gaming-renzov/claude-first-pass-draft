import { useParams } from 'react-router-dom';

// Tab Components
import { PlatformOverviewTab } from './tabs/PlatformOverviewTab';
import { UserAccessTab } from './tabs/UserAccessTab';
import { ExperimentationTab } from './tabs/ExperimentationTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { ConfigurationTab } from './tabs/ConfigurationTab';

export function SuperAdminDashboard() {
  const { tab } = useParams<{ tab?: string }>();
  const activeTab = tab || 'overview';

  return (
    <div className="space-y-6">
      {activeTab === 'overview' && <PlatformOverviewTab />}
      {activeTab === 'users' && <UserAccessTab />}
      {activeTab === 'experiments' && <ExperimentationTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'config' && <ConfigurationTab />}
    </div>
  );
}
