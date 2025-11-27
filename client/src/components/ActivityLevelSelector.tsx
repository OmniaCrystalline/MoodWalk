import { cn } from "@/lib/utils";
import type { ActivityLevel } from "@shared/schema";
import { Leaf, Footprints, Flame } from "lucide-react";

interface ActivityLevelSelectorProps {
  value: ActivityLevel | null;
  onChange: (level: ActivityLevel) => void;
}

const activityConfig: Record<ActivityLevel, { icon: React.ComponentType<{ className?: string }>; label: string; description: string }> = {
  low: {
    icon: Leaf,
    label: "Low",
    description: "Gentle stroll"
  },
  medium: {
    icon: Footprints,
    label: "Medium",
    description: "Comfortable walk"
  },
  high: {
    icon: Flame,
    label: "High",
    description: "Brisk pace"
  },
};

const levels: ActivityLevel[] = ["low", "medium", "high"];

export function ActivityLevelSelector({ value, onChange }: ActivityLevelSelectorProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Activity Level
      </label>
      <div
        className="flex flex-col sm:flex-row gap-2 sm:gap-2"
        role="radiogroup"
        aria-label="Activity Level"
      >
        {levels.map((level) => {
          const config = activityConfig[level];
          const Icon = config.icon;
          const isSelected = value === level;

          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(level)}
              data-testid={`button-activity-${level}`}
              className={cn(
                "flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2",
                "px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-full",
                "border-2 transition-all duration-200 touch-manipulation",
                "hover-elevate active:scale-95",
                "min-h-[60px] sm:min-h-0",
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Icon className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" />
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5">
                <span className="font-medium text-xs sm:text-sm">{config.label}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground sm:hidden">
                  {config.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {/* Description for larger screens */}
      <div className="hidden sm:flex items-center justify-center gap-4 text-xs text-muted-foreground">
        {levels.map((level) => {
          const config = activityConfig[level];
          const isSelected = value === level;
          return (
            <span
              key={level}
              className={cn(
                "transition-opacity",
                isSelected ? "opacity-100 font-medium" : "opacity-60"
              )}
            >
              {config.description}
            </span>
          );
        })}
      </div>
    </div>
  );
}
