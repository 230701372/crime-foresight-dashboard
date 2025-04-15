
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CrimeHeatmapProps {
  title: string;
  className?: string;
}

// Sample hotspot data for major Indian cities
const hotspots = [
  { location: [72.8777, 19.0760], intensity: 0.9, name: "Mumbai" },
  { location: [77.2090, 28.6139], intensity: 0.8, name: "Delhi" },
  { location: [77.5946, 12.9716], intensity: 0.7, name: "Bangalore" },
  { location: [80.2707, 13.0827], intensity: 0.7, name: "Chennai" },
  { location: [88.3639, 22.5726], intensity: 0.8, name: "Kolkata" },
  { location: [78.4867, 17.3850], intensity: 0.6, name: "Hyderabad" },
  { location: [73.8567, 18.5204], intensity: 0.5, name: "Pune" },
  { location: [75.8577, 22.7196], intensity: 0.4, name: "Indore" },
  { location: [85.8245, 20.2961], intensity: 0.5, name: "Bhubaneswar" },
  { location: [81.8463, 25.4358], intensity: 0.6, name: "Prayagraj" },
];

export function CrimeHeatmap({ title, className }: CrimeHeatmapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4
    });

    map.current.on('load', () => {
      if (!map.current) return;
      setIsMapLoaded(true);

      // Add heatmap layer
      map.current.addSource('crime-hotspots', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: hotspots.map(spot => ({
            type: 'Feature',
            properties: {
              intensity: spot.intensity,
              name: spot.name
            },
            geometry: {
              type: 'Point',
              coordinates: spot.location
            }
          }))
        }
      });

      map.current.addLayer({
        id: 'crime-heat',
        type: 'heatmap',
        source: 'crime-hotspots',
        paint: {
          'heatmap-weight': ['get', 'intensity'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': 30,
          'heatmap-opacity': 0.8
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!apiKey ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter your Mapbox public token to view the crime heatmap. 
              You can get one at https://mapbox.com/
            </p>
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        ) : (
          <div className="aspect-[16/9] overflow-hidden rounded-md border border-border bg-muted/20 relative">
            <div ref={mapContainer} className="absolute inset-0" />
            {isMapLoaded && (
              <div className="absolute bottom-4 right-4 p-2 bg-card/90 border border-border rounded-md shadow-sm">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-[rgb(103,169,207)]"></div>
                    <span>Low</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-[rgb(253,219,199)]"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-[rgb(178,24,43)]"></div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
