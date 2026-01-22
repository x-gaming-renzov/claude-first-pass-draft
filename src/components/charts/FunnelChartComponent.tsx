import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FunnelStep } from '@/types';

interface FunnelChartComponentProps {
  title: string;
  data: FunnelStep[];
}

export function FunnelChartComponent({ title, data }: FunnelChartComponentProps) {
  const maxUsers = Math.max(...data.map((d) => d.users));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((step, index) => {
            const widthPercentage = (step.users / maxUsers) * 100;
            return (
              <div key={step.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{step.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {step.users.toLocaleString()} users
                    </span>
                    {index > 0 && (
                      <span className="text-destructive text-xs">
                        -{step.dropOff}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-8 w-full overflow-hidden rounded-md bg-secondary">
                  <div
                    className="h-full rounded-md bg-primary transition-all duration-500"
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
