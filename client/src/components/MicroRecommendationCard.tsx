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
    <Card className="rounded-xl border-2 hover-elevate">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm" data-testid={`recommendation-title-${recommendation.id}`}>
                {recommendation.title}
              </h4>
              <Badge variant="outline" className="text-xs mt-1">
                {typeLabels[recommendation.type] || recommendation.type}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="h-3 w-3" />
            <span>{recommendation.duration} min</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {recommendation.description}
        </p>
      </CardContent>
    </Card>
  );
}
