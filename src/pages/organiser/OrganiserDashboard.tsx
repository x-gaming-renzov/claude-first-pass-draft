import { useParams } from 'react-router-dom';

// Tab Components
import { OrganiserAnalyticsTab } from './tabs/OrganiserAnalyticsTab';
import { OrganiserActionsTab } from './tabs/OrganiserActionsTab';
import { OrganizationSettingsTab } from './tabs/OrganizationSettingsTab';

export function OrganiserDashboard() {
  const { tab } = useParams<{ tab?: string }>();
  // Default to 'insights' which shows Analytics content
  const activeTab = tab || 'insights';

  return (
    <div className="space-y-6">
      {activeTab === 'insights' && <OrganiserAnalyticsTab />}
      {activeTab === 'actions' && <OrganiserActionsTab />}
      {activeTab === 'settings' && <OrganizationSettingsTab />}
    </div>
  );
}
