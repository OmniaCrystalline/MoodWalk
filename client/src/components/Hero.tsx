import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStartJourney: () => void;
}

export function Hero({ onStartJourney }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/peaceful-spring-bench.jpg"
          alt="Peaceful spring bench"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-3xl mx-auto px-4 sm:px-6 text-center animate-fade-in-up">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6 px-2"
          data-testid="text-hero-title"
        >
          Find Your Peace,
          <br />
          <span className="text-primary">One Step at a Time</span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
          data-testid="text-hero-subtitle"
        >
          Transform your walk into a journey of emotional wellness. Our AI creates
          personalized routes that match your mood, guiding you through calming
          paths with mindfulness exercises along the way.
        </p>

        <Button
          size="lg"
          onClick={onStartJourney}
          className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg"
          data-testid="button-start-journey"
        >
          Start Your Journey
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
