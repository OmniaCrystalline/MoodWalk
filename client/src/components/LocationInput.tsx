import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LocationInputProps {
  value: string;
  onChange: (location: string, lat?: number, lng?: number) => void;
}

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Пошук адрес через серверний проксі (щоб уникнути CORS проблем)
  const searchAddresses = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `/api/search-address?q=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) throw new Error('Search failed');

      const data: AddressSuggestion[] = await response.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Address search error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounce для пошуку
  const handleInputChange = (newValue: string) => {
    onChange(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchAddresses(newValue);
    }, 500); // Затримка 500мс
  };

  // Обробка вибору підказки
  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  // Обробка клавіатури для навігації по підказках
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Закрити підказки при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          onChange(address, latitude, longitude);
          toast({
            title: "Location found",
            description: "Your current location has been detected.",
          });
        } catch {
          onChange(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, latitude, longitude);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        let message = "Unable to get your location.";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Location access was denied. Please enable location services.";
        }
        toast({
          title: "Location error",
          description: message,
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Starting Location
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter your address or use current location"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="pl-10 sm:pl-12 pr-12 sm:pr-14 py-4 sm:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base border-2 focus:border-primary"
          data-testid="input-location"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleGetLocation}
          disabled={isLocating}
          className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10"
          data-testid="button-get-location"
          aria-label="Get current location"
        >
          {isLocating ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          )}
        </Button>

        {/* Випадаючий список підказок */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-border rounded-lg sm:rounded-xl shadow-lg z-50 max-h-48 sm:max-h-60 overflow-y-auto"
          >
            {isLoadingSuggestions ? (
              <div className="p-3 sm:p-4 text-center text-muted-foreground">
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mx-auto" />
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="py-1 sm:py-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-accent transition-colors touch-manipulation ${index === selectedIndex ? 'bg-accent' : ''
                      }`}
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-foreground line-clamp-2">
                        {suggestion.display_name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground px-1">
        Start typing to see address suggestions, or tap the navigation icon to use your current location
      </p>
    </div>
  );
}
