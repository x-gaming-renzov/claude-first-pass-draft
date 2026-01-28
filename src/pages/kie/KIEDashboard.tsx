import { useParams } from 'react-router-dom';

// Tab Components
import { KIEAnalyticsTab } from './tabs/KIEAnalyticsTab';
import { ActionsTab } from './tabs/ActionsTab';

export function KIEDashboard() {
  const { tab } = useParams<{ tab?: string }>();
  // Default to 'insights' (which shows Analytics content)
  const activeTab = tab || 'insights';

  return (
    <div className="space-y-6">
      {activeTab === 'insights' && <KIEAnalyticsTab />}
      {activeTab === 'actions' && <ActionsTab />}
    </div>
  );
}
