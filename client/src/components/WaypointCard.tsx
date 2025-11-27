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
    <div className="w-full max-w-full" data-testid={`waypoint-card-${waypoint.id}`}>
      <div className="flex gap-3 sm:gap-4 w-full max-w-full">
        {/* Number circle - тепер у flex контейнері */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold">
            {index + 1}
          </div>
          {/* Connecting line */}
          {!isLast && (
            <div className="w-0.5 bg-primary/30 flex-1 min-h-[20px] mt-2" />
          )}
        </div>

        {/* Card content */}
        <div className="flex-1 min-w-0 w-full max-w-full">
          <Card className={cn("rounded-lg sm:rounded-xl border-2 w-full max-w-full", !isLast && "mb-2 sm:mb-3 md:mb-4")}>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-2.5 md:space-y-3 w-full max-w-full">
              <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4 flex-wrap w-full">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-accent-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm sm:text-base md:text-lg break-words" data-testid={`waypoint-name-${waypoint.id}`}>
                      {waypoint.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs sm:text-sm mt-1 break-words inline-block">
                      {typeLabels[waypoint.type] || waypoint.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground flex-shrink-0 whitespace-nowrap">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  <span>{waypoint.estimatedTime} min</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed break-words w-full">
                {waypoint.description}
              </p>

              <div className="flex items-start gap-2 sm:gap-2.5 pt-2 sm:pt-2.5 border-t border-border w-full">
                <Heart className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm md:text-base text-primary font-medium break-words flex-1 min-w-0">
                  {waypoint.emotionalBenefit}
                </p>
              </div>

              {waypoint.microAction && (
                <div className="mt-1.5 sm:mt-2 md:mt-3 w-full max-w-full">
                  <Badge
                    variant="outline"
                    className="rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium bg-accent/50 break-words whitespace-normal max-w-full inline-block"
                    style={{ maxWidth: '100%' }}
                  >
                    {waypoint.microAction}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
