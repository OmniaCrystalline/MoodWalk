import { useEffect, useRef } from "react";
import L from "leaflet";
import type { RouteResponse } from "@shared/schema";
import {
  Trees,
  Coffee,
  Mountain,
  Volume2,
  Waves,
  Leaf,
  Building,
  Armchair
} from "lucide-react";
import { renderToString } from "react-dom/server";

interface RouteMapProps {
  route: RouteResponse;
}

const waypointIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  park: Trees,
  cafe: Coffee,
  scenic: Mountain,
  quiet: Volume2,
  water: Waves,
  nature: Leaf,
  urban: Building,
  rest: Armchair,
};

function createMarkerIcon(type: string, index: number) {
  const Icon = waypointIcons[type] || Trees;
  const iconHtml = renderToString(
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg">
      <Icon className="w-5 h-5" />
    </div>
  );

  return L.divIcon({
    html: `<div class="marker-pulse">${iconHtml}</div>`,
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function createStartIcon() {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg border-4 border-white dark:border-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </div>`,
    className: "custom-marker",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

export function RouteMap({ route }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create new map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Create bounds for all points
    const allPoints: L.LatLngExpression[] = [
      [route.startLocation.latitude, route.startLocation.longitude],
      ...route.waypoints.map((wp) => [wp.latitude, wp.longitude] as L.LatLngExpression),
    ];

    // Add start marker
    L.marker(
      [route.startLocation.latitude, route.startLocation.longitude],
      { icon: createStartIcon() }
    )
      .bindPopup(`<strong>Start</strong><br/>${route.startLocation.address}`)
      .addTo(map);

    // Add waypoint markers
    route.waypoints.forEach((waypoint, index) => {
      L.marker(
        [waypoint.latitude, waypoint.longitude],
        { icon: createMarkerIcon(waypoint.type, index) }
      )
        .bindPopup(
          `<strong>${waypoint.name}</strong><br/>
          <span style="color: #666;">${waypoint.description}</span><br/>
          <em style="color: #059669;">${waypoint.emotionalBenefit}</em>`
        )
        .addTo(map);
    });

    // Get route through streets using OSRM
    const getRoute = async () => {
      try {
        // Build coordinates string for OSRM API
        const coordinates = [
          [route.startLocation.longitude, route.startLocation.latitude],
          ...route.waypoints.map((wp) => [wp.longitude, wp.latitude]),
        ];

        const coordinatesString = coordinates
          .map((coord) => `${coord[0]},${coord[1]}`)
          .join(";");

        // Use OSRM public server for routing
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/walking/${coordinatesString}?overview=full&geometries=geojson`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.code === "Ok" && data.routes && data.routes.length > 0) {
            // Draw route along streets
            const routeCoordinates = data.routes[0].geometry.coordinates.map(
              (coord: [number, number]) => [coord[1], coord[0]] as L.LatLngExpression
            );

            const polyline = L.polyline(routeCoordinates, {
              color: "#059669",
              weight: 4,
              opacity: 0.8,
              dashArray: "10, 10",
            }).addTo(map);

            // Fit bounds with padding
            map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50] });
            return;
          }
        }
      } catch (error) {
        console.warn("Failed to get route from OSRM, using direct line:", error);
      }

      // Fallback: Draw direct line if routing fails
      const polyline = L.polyline(allPoints, {
        color: "#059669",
        weight: 4,
        opacity: 0.8,
        dashArray: "10, 10",
      }).addTo(map);

      // Fit bounds with padding
      map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50] });
    };

    getRoute();

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [route]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-border"
      data-testid="route-map"
      style={{ maxWidth: '100vw', width: '100%' }}
    />
  );
}
