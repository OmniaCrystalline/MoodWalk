/** @format */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateMoodRoute } from "./openai";
import { generateRouteRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Generate a new walking route based on mood input
  app.post("/api/generate-route", async (req, res) => {
    try {
      // Validate request body
      const validatedInput = generateRouteRequestSchema.parse(req.body);

      // Generate route using OpenRouter
      const route = await generateMoodRoute(validatedInput);

      // Save route to storage
      const savedRoute = await storage.saveRoute(route);

      res.json(savedRoute);
    } catch (error) {
      console.error("Route generation error:", error);

      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Невірні дані",
          message: "Перевірте правильність заповнення форми",
          details: error.errors,
        });
        return;
      }

      // Визначаємо статус код на основі типу помилки
      let statusCode = 500;
      let errorMessage = "Не вдалося згенерувати маршрут. Спробуйте ще раз.";

      if (error instanceof Error) {
        errorMessage = error.message;

        // Визначаємо статус код на основі повідомлення
        if (errorMessage.includes("кредитів") || errorMessage.includes("402")) {
          statusCode = 402;
        } else if (
          errorMessage.includes("API ключ") ||
          errorMessage.includes("401")
        ) {
          statusCode = 401;
        } else if (
          errorMessage.includes("забагато запитів") ||
          errorMessage.includes("429")
        ) {
          statusCode = 429;
        }
      }

      res.status(statusCode).json({
        error: "Помилка генерації маршруту",
        message: errorMessage,
      });
    }
  });

  // Get a specific route by ID
  app.get("/api/routes/:id", async (req, res) => {
    try {
      const route = await storage.getRoute(req.params.id);

      if (!route) {
        res.status(404).json({ error: "Route not found" });
        return;
      }

      res.json(route);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch route" });
    }
  });

  // Get recent routes
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getRecentRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch routes" });
    }
  });

  // Rate limiting для Nominatim API (максимум 1 запит на секунду)
  let lastNominatimRequest = 0;
  const NOMINATIM_MIN_DELAY = 1000; // 1 секунда

  // Search addresses using Nominatim (proxy to avoid CORS issues)
  app.get("/api/search-address", async (req, res) => {
    try {
      const query = req.query.q as string;

      if (!query || query.length < 3) {
        res.json([]);
        return;
      }

      const limit = parseInt((req.query.limit as string) || "5", 10);

      // Rate limiting: чекаємо, якщо минуло менше секунди з останнього запиту
      const now = Date.now();
      const timeSinceLastRequest = now - lastNominatimRequest;
      if (timeSinceLastRequest < NOMINATIM_MIN_DELAY) {
        await new Promise((resolve) =>
          setTimeout(resolve, NOMINATIM_MIN_DELAY - timeSinceLastRequest)
        );
      }
      lastNominatimRequest = Date.now();

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=${limit}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "MoodWalk/1.0 (https://github.com/MoodWalk)",
            "Accept-Language": "uk,en",
          },
          // Додаємо timeout для запиту
          signal: AbortSignal.timeout(10000), // 10 секунд
        }
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(
          `Nominatim API error: ${response.status} ${response.statusText}`,
          errorText
        );
        throw new Error(
          `Nominatim API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Перевіряємо, чи Nominatim повернув помилку в JSON
      if (data.error) {
        console.error("Nominatim API returned error:", data.error);
        throw new Error(data.error);
      }

      res.json(data);
    } catch (error) {
      console.error("Address search error:", error);

      // Визначаємо статус код на основі типу помилки
      let statusCode = 500;
      let errorMessage = "Не вдалося знайти адреси. Спробуйте ще раз.";

      if (error instanceof Error) {
        errorMessage = error.message;

        // Обробка різних типів помилок
        if (error.name === "AbortError" || errorMessage.includes("timeout")) {
          statusCode = 504;
          errorMessage = "Час очікування вичерпано. Спробуйте ще раз.";
        } else if (
          errorMessage.includes("429") ||
          errorMessage.includes("Too Many Requests")
        ) {
          statusCode = 429;
          errorMessage =
            "Забагато запитів. Будь ласка, зачекайте кілька секунд.";
        } else if (
          errorMessage.includes("403") ||
          errorMessage.includes("Forbidden")
        ) {
          statusCode = 403;
          errorMessage = "Доступ заборонено. Спробуйте пізніше.";
        }
      }

      res.status(statusCode).json({
        error: "Помилка пошуку адрес",
        message: errorMessage,
      });
    }
  });

  return httpServer;
}
