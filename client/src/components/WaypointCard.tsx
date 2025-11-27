import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Waypoint } from "@shared/schema";
import {
  Trees,
  Coffee,
  Mountain,
  Volume2,
  Waves,
  Leaf,
  Building,
  Armchair,
  Clock,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WaypointCardProps {
  waypoint: Waypoint;
  index: number;
  isLast: boolean;
}

const waypointIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  park: Trees,
  cafe: Coffee,
  scenic: Mountain,
  quiet: Volume2,
  water: Waves,
  nature: Leaf,
  urban: Building,
  rest: Armchair,
};

const typeLabels: Record<string, string> = {
  park: "Park",
  cafe: "Café",
  scenic: "Scenic Spot",
  quiet: "Quiet Area",
  water: "Waterfront",
  nature: "Nature",
  urban: "Urban",
  rest: "Rest Area",
};

export function WaypointCard({ waypoint, index, isLast }: WaypointCardProps) {
  const Icon = waypointIcons[waypoint.type] || Trees;

  return (
    <div className="relative pl-8" data-testid={`waypoint-card-${waypoint.id}`}>
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-[15px] top-12 bottom-0 w-0.5 bg-primary/30" />
      )}

      {/* Number circle */}
      <div className="absolute left-0 top-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
        {index + 1}
      </div>

      <Card className={cn("ml-4 sm:ml-6 rounded-lg sm:rounded-xl border-2", !isLast && "mb-3 sm:mb-4")}>
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm sm:text-base truncate" data-testid={`waypoint-name-${waypoint.id}`}>
                  {waypoint.name}
                </h4>
                <Badge variant="secondary" className="text-xs mt-0.5">
                  {typeLabels[waypoint.type] || waypoint.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{waypoint.estimatedTime} min</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {waypoint.description}
          </p>

          <div className="flex items-start gap-2 pt-2 border-t border-border">
            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-primary font-medium">
              {waypoint.emotionalBenefit}
            </p>
          </div>

          {waypoint.microAction && (
            <div className="mt-2 sm:mt-3">
              <Badge
                variant="outline"
                className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-accent/50"
              >
                {waypoint.microAction}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
