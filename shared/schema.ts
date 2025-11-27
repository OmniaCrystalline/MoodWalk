import { z } from "zod";

// Mood types for the mood selector
export const moodTypes = [
  "stressed",
  "anxious",
  "sad",
  "tired",
  "neutral",
  "calm",
  "happy",
] as const;

export type MoodType = (typeof moodTypes)[number];

// Activity levels
export const activityLevels = ["low", "medium", "high"] as const;
export type ActivityLevel = (typeof activityLevels)[number];

// Time durations in minutes
export const timeDurations = [15, 30, 45, 60] as const;
export type TimeDuration = (typeof timeDurations)[number];

// Mood input form schema
export const moodInputSchema = z.object({
  currentMood: z.enum(moodTypes),
  desiredMood: z.enum(moodTypes),
  activityLevel: z.enum(activityLevels),
  duration: z.number().refine((val) => timeDurations.includes(val as TimeDuration)),
  location: z.string().min(1, "Location is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type MoodInput = z.infer<typeof moodInputSchema>;

// Waypoint in the route
export const waypointSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["park", "cafe", "scenic", "quiet", "water", "nature", "urban", "rest"]),
  latitude: z.number(),
  longitude: z.number(),
  emotionalBenefit: z.string(),
  microAction: z.string().optional(),
  estimatedTime: z.number(), // minutes to reach from previous point
});

export type Waypoint = z.infer<typeof waypointSchema>;

// Micro-recommendation during the walk
export const microRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(["breathing", "observation", "movement", "rest", "mindfulness"]),
  duration: z.number(), // in minutes
  atWaypointId: z.string().optional(),
});

export type MicroRecommendation = z.infer<typeof microRecommendationSchema>;

// Complete route response
export const routeResponseSchema = z.object({
  id: z.string(),
  summary: z.string(),
  totalDuration: z.number(), // in minutes
  totalDistance: z.number(), // in meters
  emotionalJourney: z.string(),
  expectedBenefit: z.string(),
  waypoints: z.array(waypointSchema),
  microRecommendations: z.array(microRecommendationSchema),
  startLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
});

export type RouteResponse = z.infer<typeof routeResponseSchema>;

// API request/response types
export const generateRouteRequestSchema = moodInputSchema;
export type GenerateRouteRequest = z.infer<typeof generateRouteRequestSchema>;
