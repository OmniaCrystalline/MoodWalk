import { cn } from "@/lib/utils";
import type { MoodType } from "@shared/schema";
import { Frown, Meh, Smile, Heart, CloudRain, Brain, Zap, Sparkles } from "lucide-react";

interface MoodSelectorProps {
  value: MoodType | null;
  onChange: (mood: MoodType) => void;
  label: string;
  id: string;
}

const moodConfig: Record<MoodType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  stressed: { icon: Zap, label: "Stressed", color: "text-orange-500 dark:text-orange-400" },
  anxious: { icon: Brain, label: "Anxious", color: "text-amber-500 dark:text-amber-400" },
  sad: { icon: CloudRain, label: "Sad", color: "text-blue-500 dark:text-blue-400" },
  tired: { icon: Meh, label: "Tired", color: "text-slate-500 dark:text-slate-400" },
  neutral: { icon: Smile, label: "Neutral", color: "text-gray-500 dark:text-gray-400" },
  calm: { icon: Heart, label: "Calm", color: "text-teal-500 dark:text-teal-400" },
  happy: { icon: Sparkles, label: "Happy", color: "text-yellow-500 dark:text-yellow-400" },
};

const moods: MoodType[] = ["stressed", "anxious", "sad", "tired", "neutral", "calm", "happy"];

export function MoodSelector({ value, onChange, label, id }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <div 
        className="flex flex-wrap gap-3 justify-center md:justify-start"
        role="radiogroup"
        aria-label={label}
      >
        {moods.map((mood) => {
          const config = moodConfig[mood];
          const Icon = config.icon;
          const isSelected = value === mood;
          
          return (
            <button
              key={mood}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(mood)}
              data-testid={`button-${id}-${mood}`}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full",
                "border-2 transition-all duration-200",
                "hover-elevate active-elevate-2",
                isSelected
                  ? "border-primary bg-primary/10 ring-4 ring-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Icon className={cn("h-6 w-6 md:h-7 md:w-7", config.color)} />
              <span className="text-xs mt-1 font-medium">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
