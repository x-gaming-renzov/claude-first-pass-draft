import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReasonInputProps {
  label: string;
  placeholder?: string;
  predefinedReasons?: string[];
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

export function ReasonInput({
  label,
  placeholder = 'Enter your reason...',
  predefinedReasons = [],
  required = false,
  value,
  onChange,
  className,
  error,
}: ReasonInputProps) {
  const handlePredefinedClick = (reason: string) => {
    if (value) {
      onChange(`${value}\n${reason}`);
    } else {
      onChange(reason);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {predefinedReasons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {predefinedReasons.map((reason, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handlePredefinedClick(reason)}
            >
              {reason}
            </Button>
          ))}
        </div>
      )}

      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={cn(error && 'border-destructive')}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      {required && !value && (
        <p className="text-xs text-muted-foreground">
          A reason is required to proceed with this action.
        </p>
      )}
    </div>
  );
}
