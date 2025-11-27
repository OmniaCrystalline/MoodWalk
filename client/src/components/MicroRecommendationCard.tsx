import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { MicroRecommendation } from "@shared/schema";
import {
  Wind,
  Eye,
  Activity,
  Pause,
  Sparkles,
  Clock
} from "lucide-react";

interface MicroRecommendationCardProps {
  recommendation: MicroRecommendation;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  breathing: Wind,
  observation: Eye,
  movement: Activity,
  rest: Pause,
  mindfulness: Sparkles,
};

const typeLabels: Record<string, string> = {
  breathing: "Breathing Exercise",
  observation: "Mindful Observation",
  movement: "Movement",
  rest: "Rest & Reflect",
  mindfulness: "Mindfulness",
};

const typeColors: Record<string, string> = {
  breathing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  observation: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  movement: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  rest: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  mindfulness: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

export function MicroRecommendationCard({ recommendation }: MicroRecommendationCardProps) {
  const Icon = typeIcons[recommendation.type] || Sparkles;
  const colorClass = typeColors[recommendation.type] || "bg-accent text-accent-foreground";

  return (
    <Card className="rounded-lg sm:rounded-xl border-2 hover-elevate">
      <CardContent className="p-3 sm:p-4 md:p-5 space-y-2.5 sm:space-y-3">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm sm:text-base break-words" data-testid={`recommendation-title-${recommendation.id}`}>
                {recommendation.title}
              </h4>
              <Badge variant="outline" className="text-xs sm:text-sm mt-1">
                {typeLabels[recommendation.type] || recommendation.type}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{recommendation.duration} min</span>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed break-words">
          {recommendation.description}
        </p>
      </CardContent>
    </Card>
  );
}
