
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

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
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if we have a stored API key in localStorage
  useEffect(() => {
    const storedKey = localStorage.getItem("mapbox_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    try {
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
        setError(null);

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

        // Add city markers
        hotspots.forEach(spot => {
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            `${spot.name}: Crime Intensity ${Math.round(spot.intensity * 100)}%`
          );
          
          new mapboxgl.Marker({ color: "#FF5733" })
            .setLngLat(spot.location)
            .setPopup(popup)
            .addTo(map.current!);
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      });

      // Save valid API key to localStorage
      localStorage.setItem("mapbox_api_key", apiKey);
      
      return () => {
        map.current?.remove();
      };
    } catch (err) {
      setError("Invalid API key or Map loading error");
      console.error("Map error:", err);
    }
  }, [apiKey]);

  const handleApiKeySubmit = () => {
    setIsMapLoaded(false);
    // The useEffect will handle the map initialization with the new key
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          {title}
          {apiKey && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs" 
              onClick={() => setShowHelp(true)}
            >
              Need Help?
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!apiKey ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-amber-50 border-amber-200 text-amber-700">
              <h3 className="font-medium mb-2">Free Mapbox API Key Required</h3>
              <p className="text-sm">
                This heatmap uses Mapbox which requires a free public token. Follow these steps:
              </p>
              <ol className="list-decimal text-sm ml-5 mt-2 space-y-1">
                <li>Sign up for a free account at <a href="https://mapbox.com/signup" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a></li>
                <li>Go to your account dashboard</li>
                <li>Copy your default public token</li>
                <li>Paste it below</li>
              </ol>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit}>Load Map</Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        ) : (
          <div className="aspect-[16/9] overflow-hidden rounded-md border border-border bg-muted/20 relative">
            <div ref={mapContainer} className="absolute inset-0" />
            {isMapLoaded ? (
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
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Loading map...</p>
                  {error && (
                    <p className="text-sm text-red-500 max-w-xs mx-auto">
                      {error}. Please check your Mapbox token and try again.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Mapbox API Keys</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="space-y-4 text-sm">
                <p>
                  Mapbox requires an API key to function. Your key is stored locally in your browser and 
                  is only used to display the map on this page.
                </p>
                <p>
                  To reset your API key, clear your browser's local storage and refresh the page.
                </p>
                <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                  <ExternalLink className="h-4 w-4" />
                  <a 
                    href="https://docs.mapbox.com/help/getting-started/access-tokens/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Learn more about Mapbox access tokens
                  </a>
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
