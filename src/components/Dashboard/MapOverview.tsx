import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, 
  Users, 
  Crown, 
  Ambulance, 
  Accessibility, 
  Thermometer,
  Cloud,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteOverlay {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  active: boolean;
  count?: string;
}

export const MapOverview: React.FC = () => {
  const [activeOverlays, setActiveOverlays] = useState<string[]>(['pilgrim', 'crowd']);

  const routeOverlays: RouteOverlay[] = [
    {
      id: 'pilgrim',
      name: 'Pilgrim Routes',
      icon: Users,
      color: 'text-route-pilgrim',
      active: true,
      count: '8 active'
    },
    {
      id: 'vip',
      name: 'VIP Corridors',
      icon: Crown,
      color: 'text-route-vip',
      active: false,
      count: '2 secured'
    },
    {
      id: 'emergency',
      name: 'Emergency Lanes',
      icon: Ambulance,
      color: 'text-route-emergency',
      active: false,
      count: '12 clear'
    },
    {
      id: 'accessible',
      name: 'Accessible Paths',
      icon: Accessibility,
      color: 'text-route-accessible',
      active: false,
      count: '6 equipped'
    }
  ];

  const dataOverlays = [
    {
      id: 'crowd',
      name: 'Crowd Density',
      icon: Users,
      color: 'text-primary'
    },
    {
      id: 'weather',
      name: 'Weather Data',
      icon: Thermometer,
      color: 'text-warning'
    },
    {
      id: 'incidents',
      name: 'Live Incidents',
      icon: Zap,
      color: 'text-destructive'
    }
  ];

  const toggleOverlay = (overlayId: string) => {
    setActiveOverlays(prev => 
      prev.includes(overlayId) 
        ? prev.filter(id => id !== overlayId)
        : [...prev, overlayId]
    );
  };

  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Interactive Ujjain Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-success">
              Live Data
            </Badge>
            <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="relative h-96 bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg border-2 border-dashed border-border overflow-hidden">
              {/* Placeholder Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Layers className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map View</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time visualization of Ujjain pilgrimage routes
                  </p>
                </div>
              </div>

              {/* Simulated Map Elements */}
              <div className="absolute top-4 left-4 space-y-2">
                {activeOverlays.includes('crowd') && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/80 text-primary-foreground rounded-full text-xs font-medium">
                    <div className="h-2 w-2 bg-current rounded-full animate-pulse"></div>
                    High Density Zone
                  </div>
                )}
                {activeOverlays.includes('weather') && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-warning/80 text-warning-foreground rounded-full text-xs font-medium">
                    <Thermometer className="h-3 w-3" />
                    42°C - Heat Advisory
                  </div>
                )}
              </div>

              {/* Route Indicators */}
              <div className="absolute bottom-4 right-4 space-y-2">
                {routeOverlays
                  .filter(route => activeOverlays.includes(route.id))
                  .map((route) => {
                    const Icon = route.icon;
                    return (
                      <div 
                        key={route.id}
                        className="flex items-center gap-2 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs border"
                      >
                        <Icon className={cn("h-3 w-3", route.color)} />
                        <span>{route.count}</span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Route Overlays */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Route Overlays</h4>
              <div className="space-y-2">
                {routeOverlays.map((overlay) => {
                  const Icon = overlay.icon;
                  const isActive = activeOverlays.includes(overlay.id);
                  
                  return (
                    <Button
                      key={overlay.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOverlay(overlay.id)}
                      className={cn(
                        "w-full justify-start gap-2 h-auto py-2 px-3",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", overlay.color)} />
                      <div className="flex-1 text-left">
                        <div className="text-xs font-medium">{overlay.name}</div>
                        <div className="text-xs text-muted-foreground">{overlay.count}</div>
                      </div>
                      <div className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        isActive ? "bg-primary" : "bg-muted"
                      )} />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Data Overlays */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Data Layers</h4>
              <div className="space-y-2">
                {dataOverlays.map((overlay) => {
                  const Icon = overlay.icon;
                  const isActive = activeOverlays.includes(overlay.id);
                  
                  return (
                    <Button
                      key={overlay.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOverlay(overlay.id)}
                      className={cn(
                        "w-full justify-start gap-2 h-auto py-2 px-3",
                        isActive && "bg-secondary/10 text-secondary"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", overlay.color)} />
                      <span className="text-xs font-medium">{overlay.name}</span>
                      <div className={cn(
                        "h-2 w-2 rounded-full transition-colors ml-auto",
                        isActive ? "bg-secondary" : "bg-muted"
                      )} />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-semibold text-xs text-muted-foreground mb-2">LIVE METRICS</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Avg. Speed</span>
                  <span className="font-medium">2.1 km/h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Wait Time</span>
                  <span className="font-medium">12 mins</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Temperature</span>
                  <span className="font-medium text-warning">42°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};