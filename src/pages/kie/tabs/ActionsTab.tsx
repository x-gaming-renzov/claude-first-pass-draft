import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrganizerManagementTab } from './OrganizerManagementTab';
import { TournamentOversightTab } from './TournamentOversightTab';
import { SupportCenterTab } from './SupportCenterTab';

export function ActionsTab() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="organizers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="organizers">Organizers</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="organizers">
          <OrganizerManagementTab />
        </TabsContent>

        <TabsContent value="tournaments">
          <TournamentOversightTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportCenterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
