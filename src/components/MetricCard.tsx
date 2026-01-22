import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  suffix?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  suffix,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-semibold">{value}</p>
              {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
            </div>
            {change !== undefined && (
              <div
                className={cn(
                  'flex items-center gap-1 text-sm',
                  changeType === 'positive' && 'text-green-600',
                  changeType === 'negative' && 'text-red-600',
                  changeType === 'neutral' && 'text-muted-foreground'
                )}
              >
                {changeType === 'positive' && <TrendingUp className="h-4 w-4" />}
                {changeType === 'negative' && <TrendingDown className="h-4 w-4" />}
                {changeType === 'neutral' && <Minus className="h-4 w-4" />}
                <span>{change > 0 ? '+' : ''}{change}%</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="rounded-lg bg-secondary p-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
