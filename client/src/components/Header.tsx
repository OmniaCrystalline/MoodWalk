import { Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";

interface HeaderProps {
  onNewRoute?: () => void;
  showNewRouteButton?: boolean;
}

export function Header({ onNewRoute, showNewRouteButton = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-opacity rounded-lg px-2 py-1.5 -ml-2 active:scale-95"
            data-testid="link-logo"
          >
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
              <Footprints className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text" data-testid="text-logo">
              MoodWalk
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {showNewRouteButton && onNewRoute && (
              <Button
                variant="outline"
                onClick={onNewRoute}
                data-testid="button-new-route"
                className="rounded-full text-xs sm:text-sm font-medium px-3 sm:px-4 h-8 sm:h-9 border-2 hover:bg-accent transition-all active:scale-95"
                size="sm"
              >
                <span className="hidden sm:inline">New Route</span>
                <span className="sm:hidden">New</span>
              </Button>
            )}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
