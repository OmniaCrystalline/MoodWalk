import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RouteMap } from "./RouteMap";
import { WaypointCard } from "./WaypointCard";
import { MicroRecommendationCard } from "./MicroRecommendationCard";
import type { RouteResponse } from "@shared/schema";
import {
  Clock,
  Route,
  Heart,
  Sparkles,
  MapPin
} from "lucide-react";

interface RouteResultsProps {
  route: RouteResponse;
}

export function RouteResults({ route }: RouteResultsProps) {
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 animate-fade-in-up">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Route Summary Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1 text-xs sm:text-sm" data-testid="badge-route-ready">
            Your Personalized Route
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4 px-2" data-testid="text-route-summary">
            {route.summary}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2" data-testid="text-route-duration">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{route.totalDuration} min</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2" data-testid="text-route-distance">
              <Route className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{formatDistance(route.totalDistance)}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2" data-testid="text-route-stops">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{route.waypoints.length} stops</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left Column - Route Details */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Emotional Journey Card */}
            <Card className="rounded-xl sm:rounded-2xl border-2">
              <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 space-y-0 pb-2 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg">Emotional Journey</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">What to expect</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-sm sm:text-base leading-relaxed" data-testid="text-emotional-journey">
                  {route.emotionalJourney}
                </p>
              </CardContent>
            </Card>

            {/* Expected Benefit Card */}
            <Card className="rounded-xl sm:rounded-2xl border-2 bg-primary/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Expected Benefit</h3>
                    <p className="text-sm sm:text-base leading-relaxed" data-testid="text-expected-benefit">
                      {route.expectedBenefit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waypoints */}
            <div>
              <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 flex items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Your Route Waypoints
              </h3>
              <div className="space-y-0">
                {route.waypoints.map((waypoint, index) => (
                  <WaypointCard
                    key={waypoint.id}
                    waypoint={waypoint}
                    index={index}
                    isLast={index === route.waypoints.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Micro-Recommendations */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="recommendations" className="border-2 rounded-xl sm:rounded-2xl px-3 sm:px-4">
                <AccordionTrigger className="text-base sm:text-lg font-medium hover:no-underline py-3 sm:py-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-sm sm:text-base">Wellness Activities ({route.microRecommendations.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 sm:gap-3 pb-3 sm:pb-4">
                    {route.microRecommendations.map((rec) => (
                      <MicroRecommendationCard key={rec.id} recommendation={rec} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-24 lg:self-start order-1 lg:order-2">
            <RouteMap route={route} />
            <p className="text-xs text-muted-foreground text-center mt-2 sm:mt-3 px-2">
              Tap markers to see details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
