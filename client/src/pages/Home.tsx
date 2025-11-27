import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Footprints } from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MoodInputForm } from "@/components/MoodInputForm";
import { RouteResults } from "@/components/RouteResults";
import { RouteLoadingSkeleton } from "@/components/RouteLoadingSkeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MoodInput, RouteResponse } from "@shared/schema";

export default function Home() {
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateRouteMutation = useMutation({
    mutationFn: async (data: MoodInput) => {
      const response = await apiRequest("POST", "/api/generate-route", data);
      return await response.json() as RouteResponse;
    },
    onSuccess: (data) => {
      setRoute(data);
      toast({
        title: "Route created!",
        description: "Your personalized walking route is ready.",
      });
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to generate route",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleStartJourney = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewRoute = () => {
    setRoute(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (data: MoodInput) => {
    generateRouteMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onNewRoute={handleNewRoute}
        showNewRouteButton={route !== null}
      />

      <main className="flex-1">
        {!route && !generateRouteMutation.isPending && (
          <>
            <Hero onStartJourney={handleStartJourney} />
            <div ref={formRef}>
              <MoodInputForm
                onSubmit={handleSubmit}
                isLoading={generateRouteMutation.isPending}
              />
            </div>
          </>
        )}

        {generateRouteMutation.isPending && (
          <RouteLoadingSkeleton />
        )}

        {route && !generateRouteMutation.isPending && (
          <div ref={resultsRef}>
            <RouteResults route={route} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/40 bg-background/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-8 md:py-10">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Footprints className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight">MoodWalk</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Find your peace, one step at a time
              </p>

              <p className="text-xs text-muted-foreground/80 max-w-md mx-auto">
                Personalized walking routes for emotional wellness
              </p>

              <div className="mt-2 sm:mt-4 pt-4 sm:pt-6 border-t border-border/40 w-full max-w-md">
                <p className="text-xs text-muted-foreground/60">
                  © {new Date().getFullYear()} MoodWalk. Made with care for your wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
