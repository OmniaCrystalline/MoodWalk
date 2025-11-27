/** @format */

import { OpenRouter } from "@openrouter/sdk";
import type {
  MoodInput,
  RouteResponse,
  Waypoint,
  MicroRecommendation,
} from "@shared/schema";
import { randomUUID } from "crypto";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

interface GeneratedRoute {
  summary: string;
  emotionalJourney: string;
  expectedBenefit: string;
  waypoints: Array<{
    name: string;
    description: string;
    type: string;
    emotionalBenefit: string;
    microAction?: string;
    estimatedTime: number;
    latOffset: number;
    lngOffset: number;
  }>;
  microRecommendations: Array<{
    title: string;
    description: string;
    type: string;
    duration: number;
  }>;
}

export async function generateMoodRoute(
  input: MoodInput
): Promise<RouteResponse> {
  const prompt = `You are a wellness expert and urban planner. Create a personalized walking route for someone who is feeling ${input.currentMood} and wants to feel ${input.desiredMood}. They have ${input.duration} minutes and want a ${input.activityLevel} activity level walk starting from ${input.location}.

Generate a walking route with:
1. A short, encouraging summary (1-2 sentences)
2. An emotional journey description (how their mood will transform during the walk)
3. Expected benefit after completing the route
4. 3-5 waypoints that are realistic for the area, each with:
   - A descriptive name
   - A brief description of what's there
   - Type: one of (park, cafe, scenic, quiet, water, nature, urban, rest)
   - Emotional benefit of visiting this spot
   - Optional micro-action to do there (breathing exercise, observation, etc)
   - Estimated walking time from previous point in minutes
   - Latitude/longitude offsets from start (small random offsets between -0.01 and 0.01)
5. 2-4 micro-recommendations for wellness activities during the walk:
   - Title
   - Description of the activity
   - Type: one of (breathing, observation, movement, rest, mindfulness)
   - Duration in minutes

Consider:
- The current mood and how to gradually transition to the desired mood
- The activity level preference (low = slow gentle stroll, medium = comfortable pace, high = brisk walk)
- Time available to create an appropriately sized route
- Types of places that help with the specific mood transition
- For stressed/anxious: prioritize quiet, nature, water features
- For sad: include scenic views, cafes for warmth, nature
- For tired: shorter segments, rest spots, gentle stimulation
- For reaching calm/happy: build up positive experiences gradually

Respond with valid JSON only, no markdown:
{
  "summary": "string",
  "emotionalJourney": "string",
  "expectedBenefit": "string",
  "waypoints": [
    {
      "name": "string",
      "description": "string",
      "type": "string",
      "emotionalBenefit": "string",
      "microAction": "string or null",
      "estimatedTime": number,
      "latOffset": number,
      "lngOffset": number
    }
  ],
  "microRecommendations": [
    {
      "title": "string",
      "description": "string",
      "type": "string",
      "duration": number
    }
  ]
}`;

  try {
    const response = await openrouter.chat.send({
      model: "openai/gpt-4o-mini", // Використовуємо більш економну модель
      messages: [
        {
          role: "system",
          content:
            "You are a wellness expert creating personalized walking routes. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500, // Зменшуємо кількість токенів
      stream: false,
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("AI не повернув відповідь. Спробуйте ще раз.");
    }

    let generated: GeneratedRoute;
    try {
      generated = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      throw new Error("Помилка обробки відповіді від AI. Спробуйте ще раз.");
    }

    // Валідація структури відповіді
    if (
      !generated.waypoints ||
      !Array.isArray(generated.waypoints) ||
      generated.waypoints.length === 0
    ) {
      throw new Error("AI не згенерував точки маршруту. Спробуйте ще раз.");
    }

    if (
      !generated.summary ||
      !generated.emotionalJourney ||
      !generated.expectedBenefit
    ) {
      throw new Error("Відповідь від AI неповна. Спробуйте ще раз.");
    }

    // Use provided coordinates or default to a central location
    const baseLat = input.latitude || 40.7128;
    const baseLng = input.longitude || -74.006;

    // Calculate total distance based on waypoints (rough estimate)
    const waypointCount = generated.waypoints.length;
    const avgDistancePerWaypoint = input.duration * 50; // ~50m per minute walking
    const totalDistance = Math.round(avgDistancePerWaypoint * waypointCount);

    const waypoints: Waypoint[] = generated.waypoints.map((wp, index) => ({
      id: randomUUID(),
      name: wp.name,
      description: wp.description,
      type: wp.type as Waypoint["type"],
      latitude: baseLat + wp.latOffset,
      longitude: baseLng + wp.lngOffset,
      emotionalBenefit: wp.emotionalBenefit,
      microAction: wp.microAction || undefined,
      estimatedTime: wp.estimatedTime,
    }));

    const microRecommendations: MicroRecommendation[] =
      generated.microRecommendations.map((rec, index) => ({
        id: randomUUID(),
        title: rec.title,
        description: rec.description,
        type: rec.type as MicroRecommendation["type"],
        duration: rec.duration,
        atWaypointId: waypoints[index % waypoints.length]?.id,
      }));

    const route: RouteResponse = {
      id: randomUUID(),
      summary: generated.summary,
      totalDuration: input.duration,
      totalDistance,
      emotionalJourney: generated.emotionalJourney,
      expectedBenefit: generated.expectedBenefit,
      waypoints,
      microRecommendations,
      startLocation: {
        latitude: baseLat,
        longitude: baseLng,
        address: input.location,
      },
    };

    return route;
  } catch (error) {
    console.error("OpenRouter route generation error:", error);

    // Більш детальні повідомлення про помилки
    if (error && typeof error === "object" && "statusCode" in error) {
      const apiError = error as {
        statusCode?: number;
        body?: string;
        message?: string;
      };

      if (apiError.statusCode === 402) {
        throw new Error(
          "Недостатньо кредитів для генерації маршруту. Будь ласка, перевірте баланс вашого облікового запису."
        );
      }

      if (apiError.statusCode === 401) {
        throw new Error(
          "Невірний API ключ. Будь ласка, перевірте налаштування."
        );
      }

      if (apiError.statusCode === 429) {
        throw new Error(
          "Забагато запитів. Будь ласка, спробуйте через кілька хвилин."
        );
      }
    }

    if (error instanceof SyntaxError) {
      throw new Error("Помилка обробки відповіді від AI. Спробуйте ще раз.");
    }

    const errorMessage =
      error instanceof Error ? error.message : "Невідома помилка";
    throw new Error(
      `Не вдалося згенерувати маршрут: ${errorMessage}. Будь ласка, спробуйте ще раз.`
    );
  }
}
