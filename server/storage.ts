import type { RouteResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveRoute(route: RouteResponse): Promise<RouteResponse>;
  getRoute(id: string): Promise<RouteResponse | undefined>;
  getRecentRoutes(): Promise<RouteResponse[]>;
}

export class MemStorage implements IStorage {
  private routes: Map<string, RouteResponse>;

  constructor() {
    this.routes = new Map();
  }

  async saveRoute(route: RouteResponse): Promise<RouteResponse> {
    const savedRoute = { ...route, id: route.id || randomUUID() };
    this.routes.set(savedRoute.id, savedRoute);
    return savedRoute;
  }

  async getRoute(id: string): Promise<RouteResponse | undefined> {
    return this.routes.get(id);
  }

  async getRecentRoutes(): Promise<RouteResponse[]> {
    return Array.from(this.routes.values()).slice(-10);
  }
}

export const storage = new MemStorage();
