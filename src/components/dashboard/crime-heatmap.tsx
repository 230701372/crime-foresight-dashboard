
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface CrimeHeatmapProps {
  title: string;
  className?: string;
}

// Indian cities with mock crime intensity
const crimeHotspots = [
  { name: "Delhi", coordinates: [77.1025, 28.7041], intensity: 0.9 },
  { name: "Mumbai", coordinates: [72.8777, 19.0760], intensity: 0.85 },
  { name: "Bangalore", coordinates: [77.5946, 12.9716], intensity: 0.7 },
  { name: "Chennai", coordinates: [80.2707, 13.0827], intensity: 0.65 },
  { name: "Kolkata", coordinates: [88.3639, 22.5726], intensity: 0.8 },
  { name: "Hyderabad", coordinates: [78.4867, 17.3850], intensity: 0.75 },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225], intensity: 0.6 },
  { name: "Pune", coordinates: [73.8567, 18.5204], intensity: 0.55 },
  { name: "Jaipur", coordinates: [75.7873, 26.9124], intensity: 0.5 },
  { name: "Lucknow", coordinates: [80.9462, 26.8467], intensity: 0.6 },
  { name: "Patna", coordinates: [85.1376, 25.5941], intensity: 0.7 },
  { name: "Bhopal", coordinates: [77.4126, 23.2599], intensity: 0.45 },
  { name: "Indore", coordinates: [75.8577, 22.7196], intensity: 0.4 },
  { name: "Kanpur", coordinates: [80.3319, 26.4499], intensity: 0.65 },
  { name: "Nagpur", coordinates: [79.0882, 21.1458], intensity: 0.5 },
];

// Default working Mapbox public token - replace with your own for production
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export function CrimeHeatmap({ title, className }: CrimeHeatmapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => {
    const storedKey = localStorage.getItem('mapbox_api_key');
    return storedKey || DEFAULT_MAPBOX_TOKEN;
  });
  const [inputApiKey, setInputApiKey] = useState(apiKey);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    
    try {
      // Clean up previous map instance if it exists
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      setError(null); // Reset error state before attempting to load map
      
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [78.9629, 20.5937], // Center of India
        zoom: 4
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add navigation control
        map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add markers for each hotspot
        crimeHotspots.forEach(spot => {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.backgroundColor = getColorForIntensity(spot.intensity);
          el.style.width = `${Math.max(10, spot.intensity * 30)}px`;
          el.style.height = `${Math.max(10, spot.intensity * 30)}px`;
          el.style.borderRadius = '50%';
          el.style.boxShadow = `0 0 ${Math.max(5, spot.intensity * 15)}px ${getColorForIntensity(spot.intensity)}`;
          
          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<strong>${spot.name}</strong><br>Crime Intensity: ${(spot.intensity * 100).toFixed(0)}%`);

          // Add marker with popup
          new mapboxgl.Marker(el)
            .setLngLat(spot.coordinates as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });

        // Add a legend
        addLegend();
        
        setError(null);
        toast.success("Map loaded successfully");
        localStorage.setItem('mapbox_api_key', token);
      });
      
      // Handle map errors
      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        setError("Failed to load map. Please check your API key.");
        setMapLoaded(false);
        
        // Reset to default token if available
        if (token !== DEFAULT_MAPBOX_TOKEN) {
          toast.error("Custom API key failed. Trying with default key...");
          setTimeout(() => initializeMap(DEFAULT_MAPBOX_TOKEN), 1000);
        }
      });
      
    } catch (err) {
      console.error("Map initialization error:", err);
      setError("Failed to initialize map. Please check your API key.");
      setMapLoaded(false);
      
      // Reset to default token if available
      if (token !== DEFAULT_MAPBOX_TOKEN) {
        toast.error("Custom API key failed. Trying with default key...");
        setTimeout(() => initializeMap(DEFAULT_MAPBOX_TOKEN), 1000);
      }
    }
  };

  const addLegend = () => {
    if (!map.current || !mapContainer.current) return;
    
    const legendContainer = document.createElement('div');
    legendContainer.className = 'map-legend';
    legendContainer.style.position = 'absolute';
    legendContainer.style.bottom = '30px';
    legendContainer.style.left = '10px';
    legendContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
    legendContainer.style.padding = '10px';
    legendContainer.style.borderRadius = '5px';
    legendContainer.style.color = 'white';
    legendContainer.style.zIndex = '1';
    
    const title = document.createElement('div');
    title.textContent = 'Crime Intensity';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '5px';
    
    legendContainer.appendChild(title);
    
    const intensities = [0.9, 0.7, 0.5, 0.3];
    intensities.forEach(intensity => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.margin = '5px 0';
      
      const color = document.createElement('div');
      color.style.width = '20px';
      color.style.height = '10px';
      color.style.backgroundColor = getColorForIntensity(intensity);
      color.style.marginRight = '5px';
      
      const label = document.createElement('span');
      label.textContent = `${(intensity * 100).toFixed(0)}%`;
      
      item.appendChild(color);
      item.appendChild(label);
      legendContainer.appendChild(item);
    });
    
    mapContainer.current.appendChild(legendContainer);
  };

  const getColorForIntensity = (intensity: number): string => {
    if (intensity > 0.8) return '#EF4444'; // red for high
    if (intensity > 0.6) return '#F59E0B'; // amber for medium
    if (intensity > 0.4) return '#FBBF24'; // yellow for low-medium
    return '#3B82F6'; // blue for low
  };

  const saveApiKey = () => {
    if (!inputApiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    setApiKey(inputApiKey);
    initializeMap(inputApiKey);
    toast.info("Trying to load map with new API key...");
  };

  useEffect(() => {
    if (apiKey) {
      initializeMap(apiKey);
    }
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Set API Key</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Mapbox API Key</DialogTitle>
                <DialogDescription>
                  Enter your Mapbox API key to display the crime heatmap. You can get a free API key from <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Mapbox</a>.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apikey" className="text-right">API Key</Label>
                  <Input
                    id="apikey"
                    value={inputApiKey}
                    onChange={(e) => setInputApiKey(e.target.value)}
                    placeholder="Enter Mapbox API key"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={saveApiKey}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About the Crime Heatmap</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4 text-sm text-muted-foreground">
                <p>This map displays crime hotspots across major Indian cities. The size and color of each marker represents the crime intensity in that area.</p>
                <p>To use this feature:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>Create a free account at <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Mapbox</a></li>
                  <li>Generate a new API key (default public token)</li>
                  <li>Click "Set API Key" and paste your token</li>
                </ol>
                <p>The map will display crime intensity data across India with interactive markers for detailed information.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md overflow-hidden">
          {!apiKey && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 z-10 text-center p-4">
              <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">API Key Required</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Please set your Mapbox API key to view the crime heatmap. You can get a free API key from Mapbox.
              </p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 z-10 text-center p-4">
              <p className="text-destructive font-medium">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => initializeMap(apiKey)}
              >
                Try Again
              </Button>
            </div>
          )}
          <div 
            ref={mapContainer} 
            style={{ height: '400px', width: '100%' }}
            className={`border rounded-lg ${(!apiKey || error) ? 'opacity-50' : ''}`} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
