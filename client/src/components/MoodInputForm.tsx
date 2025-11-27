import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodSelector } from "./MoodSelector";
import { ActivityLevelSelector } from "./ActivityLevelSelector";
import { DurationSelector } from "./DurationSelector";
import { LocationInput } from "./LocationInput";
import { Loader2, Sparkles } from "lucide-react";
import type { MoodType, ActivityLevel, TimeDuration, MoodInput } from "@shared/schema";

interface MoodInputFormProps {
  onSubmit: (data: MoodInput) => void;
  isLoading: boolean;
}

export function MoodInputForm({ onSubmit, isLoading }: MoodInputFormProps) {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [desiredMood, setDesiredMood] = useState<MoodType | null>(null);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(null);
  const [duration, setDuration] = useState<TimeDuration | null>(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const handleLocationChange = (loc: string, lat?: number, lng?: number) => {
    setLocation(loc);
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMood && desiredMood && activityLevel && duration && location) {
      onSubmit({
        currentMood,
        desiredMood,
        activityLevel,
        duration,
        location,
        latitude,
        longitude,
      });
    }
  };

  const isValid = currentMood && desiredMood && activityLevel && duration && location;

  return (
    <section id="mood-form" className="py-12 sm:py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4 px-2" data-testid="text-form-title">
            Tell Us How You're Feeling
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-2">
            Share your current emotional state and what you'd like to feel.
            We'll create a personalized walking route just for you.
          </p>
        </div>

        <Card className="rounded-xl sm:rounded-2xl border-2">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Current Mood */}
              <MoodSelector
                value={currentMood}
                onChange={setCurrentMood}
                label="How are you feeling right now?"
                id="current-mood"
              />

              {/* Desired Mood */}
              <MoodSelector
                value={desiredMood}
                onChange={setDesiredMood}
                label="How would you like to feel?"
                id="desired-mood"
              />

              {/* Activity Level */}
              <ActivityLevelSelector
                value={activityLevel}
                onChange={setActivityLevel}
              />

              {/* Duration */}
              <DurationSelector
                value={duration}
                onChange={setDuration}
              />

              {/* Location */}
              <LocationInput
                value={location}
                onChange={handleLocationChange}
              />

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isValid || isLoading}
                  className="w-full rounded-full py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg"
                  data-testid="button-generate-route"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span className="text-sm sm:text-base">Creating Your Route...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">Generate My Walking Route</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
