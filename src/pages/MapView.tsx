import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  Users, 
  Route, 
  AlertTriangle, 
  Crown,
  Thermometer,
  Eye,
  EyeOff,
  Zap,
  MapPin,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  active: boolean;
  count?: number;
}

const MapView = () => {
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
    { id: 'crowd', name: 'Crowd Density', icon: Users, color: 'text-destructive', active: true, count: 2847 },
    { id: 'routes', name: 'Pilgrim Routes', icon: Route, color: 'text-route-pilgrim', active: true },
    { id: 'vip', name: 'VIP Corridors', icon: Crown, color: 'text-route-vip', active: false },
    { id: 'emergency', name: 'Emergency Zones', icon: AlertTriangle, color: 'text-warning', active: true, count: 3 },
    { id: 'weather', name: 'Weather Data', icon: Thermometer, color: 'text-secondary', active: false },
    { id: 'accessibility', name: 'Accessible Paths', icon: Zap, color: 'text-accent', active: true }
  ]);

  const [selectedLocation, setSelectedLocation] = useState<string | null>('ramghat');

  const locations = [
    { id: 'ramghat', name: 'Ramghat', crowd: 'High', temp: '42°C', status: 'Critical' },
    { id: 'mahakal', name: 'Mahakaleshwar Temple', crowd: 'Medium', temp: '41°C', status: 'Normal' },
    { id: 'station', name: 'Freeganj Railway Station', crowd: 'Low', temp: '39°C', status: 'Normal' },
    { id: 'airport', name: 'Indore Airport Route', crowd: 'Very Low', temp: '38°C', status: 'Normal' }
  ];

  const toggleLayer = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, active: !layer.active } : layer
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-destructive text-destructive-foreground';
      case 'Warning': return 'bg-warning text-warning-foreground';
      case 'Normal': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Map className="h-8 w-8 text-primary" />
              Interactive Map View
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time visualization of crowd movement, routes, and emergency zones across Ujjain
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse mr-2" />
              Live Updates
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="dashboard-card h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Ujjain City Map - Simhastha 2028
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-full">
                <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full gap-1 p-4">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="bg-muted/30 rounded-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Location Markers */}
                  <div className="absolute inset-0 p-8">
                    {/* Ramghat - High density */}
                    <div 
                      className="absolute top-20 left-32 cursor-pointer animate-bounce"
                      onClick={() => setSelectedLocation('ramghat')}
                    >
                      <div className="relative">
                        <div className="h-6 w-6 bg-destructive rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="h-4 w-4 text-destructive-foreground" />
                        </div>
                        <div className="absolute -inset-2 bg-destructive/20 rounded-full animate-ping" />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                          Ramghat - High Density
                        </div>
                      </div>
                    </div>

                    {/* Mahakaleshwar Temple */}
                    <div 
                      className="absolute top-40 right-40 cursor-pointer"
                      onClick={() => setSelectedLocation('mahakal')}
                    >
                      <div className="relative">
                        <div className="h-6 w-6 bg-warning rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="h-4 w-4 text-warning-foreground" />
                        </div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                          Mahakaleshwar Temple
                        </div>
                      </div>
                    </div>

                    {/* Railway Station */}
                    <div 
                      className="absolute bottom-32 left-20 cursor-pointer"
                      onClick={() => setSelectedLocation('station')}
                    >
                      <div className="relative">
                        <div className="h-6 w-6 bg-success rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="h-4 w-4 text-success-foreground" />
                        </div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                          Freeganj Station
                        </div>
                      </div>
                    </div>

                    {/* Route Lines */}
                    {mapLayers.find(l => l.id === 'routes' && l.active) && (
                      <>
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <path 
                            d="M 140 100 Q 200 150 300 180" 
                            stroke="hsl(var(--route-pilgrim))" 
                            strokeWidth="3" 
                            fill="none"
                            strokeDasharray="10,5"
                            className="animate-pulse"
                          />
                          <path 
                            d="M 100 400 Q 150 300 280 200" 
                            stroke="hsl(var(--route-pilgrim))" 
                            strokeWidth="3" 
                            fill="none"
                            strokeDasharray="10,5"
                            className="animate-pulse"
                          />
                        </svg>
                      </>
                    )}

                    {/* Crowd Density Overlay */}
                    {mapLayers.find(l => l.id === 'crowd' && l.active) && (
                      <div className="absolute top-16 left-28 w-20 h-20 bg-destructive/30 rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <h4 className="font-semibold text-sm mb-2">Legend</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-destructive rounded-full" />
                        <span>High Density</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-warning rounded-full" />
                        <span>Medium Density</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-success rounded-full" />
                        <span>Low Density</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Layer Controls */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Map Layers</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {mapLayers.map((layer) => {
                    const Icon = layer.icon;
                    return (
                      <div key={layer.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant={layer.active ? "default" : "outline"}
                            onClick={() => toggleLayer(layer.id)}
                            className="h-8 w-8 p-0"
                          >
                            {layer.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <Icon className={cn("h-4 w-4", layer.color)} />
                          <span className="text-sm font-medium">{layer.name}</span>
                        </div>
                        {layer.count && (
                          <Badge variant="secondary" className="text-xs">
                            {layer.count}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Location Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedLocation && (
                  <div className="space-y-4">
                    {locations.filter(loc => loc.id === selectedLocation).map(location => (
                      <div key={location.id} className="space-y-3">
                        <h4 className="font-semibold text-foreground">{location.name}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Crowd Level:</span>
                            <Badge className={getStatusColor(location.status)}>
                              {location.crowd}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Temperature:</span>
                            <span className="font-medium text-warning">{location.temp}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge className={getStatusColor(location.status)}>
                              {location.status}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" className="w-full bg-gradient-primary">
                          View Detailed Analytics
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {!selectedLocation && (
                  <p className="text-muted-foreground text-sm">
                    Click on a location marker to view details
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Emergency
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Route className="h-4 w-4 mr-2" />
                    Create New Route
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Deploy Volunteers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;