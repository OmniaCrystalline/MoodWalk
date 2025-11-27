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
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 animate-fade-in-up w-full" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
        {/* Route Summary Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <Badge variant="outline" className="mb-2 sm:mb-3 md:mb-4 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-xs sm:text-sm" data-testid="badge-route-ready">
            Your Personalized Route
          </Badge>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-3 sm:mb-4 md:mb-5 px-2 break-words" data-testid="text-route-summary">
            {route.summary}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2" data-testid="text-route-duration">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span>{route.totalDuration} min</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2" data-testid="text-route-distance">
              <Route className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span>{formatDistance(route.totalDistance)}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2" data-testid="text-route-stops">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span>{route.waypoints.length} stops</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-2 w-full min-w-0" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          {/* Left Column - Route Details */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1 w-full min-w-0">
            {/* Emotional Journey Card */}
            <Card className="rounded-lg sm:rounded-xl md:rounded-2xl border-2 w-full min-w-0" style={{ maxWidth: '100%' }}>
              <CardHeader className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 space-y-0 pb-2 p-2.5 sm:p-3 md:p-4 lg:p-6 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl break-words">Emotional Journey</CardTitle>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground break-words">What to expect</p>
                </div>
              </CardHeader>
              <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-6 pt-0 min-w-0">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed break-words" data-testid="text-emotional-journey">
                  {route.emotionalJourney}
                </p>
              </CardContent>
            </Card>

            {/* Expected Benefit Card */}
            <Card className="rounded-lg sm:rounded-xl md:rounded-2xl border-2 bg-primary/5 w-full min-w-0" style={{ maxWidth: '100%' }}>
              <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-6 min-w-0">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1.5 sm:mb-2 md:mb-3 break-words">Expected Benefit</h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed break-words" data-testid="text-expected-benefit">
                      {route.expectedBenefit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waypoints */}
            <div className="w-full max-w-full">
              <h3 className="text-base sm:text-lg md:text-xl font-medium mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 break-words">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                Your Route Waypoints
              </h3>
              <div className="space-y-0 w-full max-w-full">
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
              <AccordionItem value="recommendations" className="border-2 rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-3 md:px-4">
                <AccordionTrigger className="text-sm sm:text-base md:text-lg font-medium hover:no-underline py-2 sm:py-3 md:py-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                    <span className="text-xs sm:text-sm md:text-base">Wellness Activities ({route.microRecommendations.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 sm:gap-3 pb-2 sm:pb-3 md:pb-4">
                    {route.microRecommendations.map((rec) => (
                      <MicroRecommendationCard key={rec.id} recommendation={rec} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-20 lg:self-start order-1 lg:order-2 w-full min-w-0 overflow-hidden" style={{ maxWidth: '100vw' }}>
            <div className="w-full min-w-0" style={{ maxWidth: '100vw' }}>
              <RouteMap route={route} />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1 sm:mt-2 md:mt-3 px-2">
              Tap markers to see details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
