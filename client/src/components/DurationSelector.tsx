import { cn } from "@/lib/utils";
import type { TimeDuration } from "@shared/schema";
import { Clock } from "lucide-react";

interface DurationSelectorProps {
  value: TimeDuration | null;
  onChange: (duration: TimeDuration) => void;
}

const durationConfig: Record<TimeDuration, { label: string; description: string }> = {
  15: { label: "15 min", description: "Quick Reset" },
  30: { label: "30 min", description: "Short Break" },
  45: { label: "45 min", description: "Full Journey" },
  60: { label: "60 min", description: "Deep Refresh" },
};

const durations: TimeDuration[] = [15, 30, 45, 60];

export function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Time Available
      </label>
      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        role="radiogroup"
        aria-label="Time Available"
      >
        {durations.map((duration) => {
          const config = durationConfig[duration];
          const isSelected = value === duration;
          
          return (
            <button
              key={duration}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(duration)}
              data-testid={`button-duration-${duration}`}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl",
                "border-2 transition-all duration-200",
                "hover-elevate active-elevate-2",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Clock className={cn("h-5 w-5 mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
              <span className="font-semibold text-lg">{config.label}</span>
              <span className="text-xs text-muted-foreground mt-1">{config.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
