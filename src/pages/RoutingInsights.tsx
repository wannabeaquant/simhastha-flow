import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Route, 
  Users, 
  Crown,
  Ambulance,
  Accessibility,
  Clock,
  MapPin,
  TrendingUp,
  Navigation,
  Thermometer,
  Coffee,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteData {
  id: string;
  name: string;
  type: 'pilgrim' | 'vip' | 'emergency' | 'accessible';
  distance: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  features: string[];
  currentLoad: number;
  maxCapacity: number;
  status: 'optimal' | 'congested' | 'blocked';
}

const RoutingInsights = () => {
  const [selectedRouteType, setSelectedRouteType] = useState<string>('all');
  
  const routes: RouteData[] = [
    {
      id: 'pilgrim-1',
      name: 'Main Pilgrim Route A',
      type: 'pilgrim',
      distance: '2.4 km',
      duration: '35 min',
      difficulty: 'easy',
      features: ['Shaded Path', 'Water Points', 'Rest Areas'],
      currentLoad: 1247,
      maxCapacity: 2000,
      status: 'optimal'
    },
    {
      id: 'pilgrim-2',
      name: 'Ramghat Express Route',
      type: 'pilgrim',
      distance: '1.8 km',
      duration: '28 min',
      difficulty: 'moderate',
      features: ['Direct Path', 'Medical Aid'],
      currentLoad: 1850,
      maxCapacity: 2000,
      status: 'congested'
    },
    {
      id: 'vip-1',
      name: 'VIP Corridor Alpha',
      type: 'vip',
      distance: '3.2 km',
      duration: '15 min',
      difficulty: 'easy',
      features: ['Security Checkpoints', 'Dedicated Lanes', 'No Public Access'],
      currentLoad: 0,
      maxCapacity: 50,
      status: 'optimal'
    },
    {
      id: 'emergency-1',
      name: 'Emergency Response Route',
      type: 'emergency',
      distance: '1.5 km',
      duration: '8 min',
      difficulty: 'easy',
      features: ['Clear Lanes', 'Priority Access', 'Hospital Connect'],
      currentLoad: 2,
      maxCapacity: 20,
      status: 'optimal'
    },
    {
      id: 'accessible-1',
      name: 'Accessible Pathway',
      type: 'accessible',
      distance: '2.8 km',
      duration: '45 min',
      difficulty: 'easy',
      features: ['Ramp Access', 'Wide Paths', 'Rest Stops', 'Assistance Available'],
      currentLoad: 87,
      maxCapacity: 200,
      status: 'optimal'
    }
  ];

  const routeTypes = [
    { id: 'all', name: 'All Routes', icon: Route, color: 'text-primary' },
    { id: 'pilgrim', name: 'Pilgrim Routes', icon: Users, color: 'text-route-pilgrim' },
    { id: 'vip', name: 'VIP Corridors', icon: Crown, color: 'text-route-vip' },
    { id: 'emergency', name: 'Emergency Routes', icon: Ambulance, color: 'text-destructive' },
    { id: 'accessible', name: 'Accessible Paths', icon: Accessibility, color: 'text-accent' }
  ];

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'pilgrim': return Users;
      case 'vip': return Crown;
      case 'emergency': return Ambulance;
      case 'accessible': return Accessibility;
      default: return Route;
    }
  };

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'pilgrim': return 'text-route-pilgrim';
      case 'vip': return 'text-route-vip';
      case 'emergency': return 'text-destructive';
      case 'accessible': return 'text-accent';
      default: return 'text-primary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-success text-success-foreground';
      case 'congested': return 'bg-warning text-warning-foreground';
      case 'blocked': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'moderate': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('Shaded') || feature.includes('Water')) return Thermometer;
    if (feature.includes('Rest') || feature.includes('Coffee')) return Coffee;
    if (feature.includes('Security') || feature.includes('Medical')) return Shield;
    return MapPin;
  };

  const filteredRoutes = selectedRouteType === 'all' 
    ? routes 
    : routes.filter(route => route.type === selectedRouteType);

  const totalRoutes = routes.length;
  const optimalRoutes = routes.filter(r => r.status === 'optimal').length;
  const congestedRoutes = routes.filter(r => r.status === 'congested').length;
  const totalCapacity = routes.reduce((sum, r) => sum + r.maxCapacity, 0);
  const currentLoad = routes.reduce((sum, r) => sum + r.currentLoad, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Route className="h-8 w-8 text-primary" />
              Routing Insights
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive route analysis and optimization for all pilgrim pathways
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Live Analytics
            </Badge>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Route className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalRoutes}</p>
                  <p className="text-sm text-muted-foreground">Total Routes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{optimalRoutes}</p>
                  <p className="text-sm text-muted-foreground">Optimal Routes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{congestedRoutes}</p>
                  <p className="text-sm text-muted-foreground">Congested Routes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{Math.round((currentLoad/totalCapacity)*100)}%</p>
                  <p className="text-sm text-muted-foreground">System Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Route Type Filter */}
          <div className="lg:col-span-1">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Route Types</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {routeTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = selectedRouteType === type.id;
                    
                    return (
                      <Button
                        key={type.id}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedRouteType(type.id)}
                      >
                        <Icon className={cn("h-4 w-4 mr-2", isActive ? "text-primary-foreground" : type.color)} />
                        {type.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Routes List */}
          <div className="lg:col-span-3">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Route Details
                  <Badge variant="secondary" className="ml-auto">
                    {filteredRoutes.length} routes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredRoutes.map((route, index) => {
                    const RouteIcon = getRouteIcon(route.type);
                    const loadPercentage = (route.currentLoad / route.maxCapacity) * 100;
                    
                    return (
                      <div 
                        key={route.id} 
                        className="p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                            <RouteIcon className={cn("h-6 w-6", getRouteColor(route.type))} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-foreground">{route.name}</h4>
                              <Badge className={getStatusColor(route.status)}>
                                {route.status}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(route.difficulty)}>
                                {route.difficulty}
                              </Badge>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{route.distance}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{route.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{route.currentLoad}/{route.maxCapacity}</span>
                              </div>
                            </div>
                            
                            {/* Capacity Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Current Load</span>
                                <span>{Math.round(loadPercentage)}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full transition-all duration-300",
                                    loadPercentage > 80 ? "bg-destructive" : 
                                    loadPercentage > 60 ? "bg-warning" : "bg-success"
                                  )}
                                  style={{ width: `${loadPercentage}%` }}
                                />
                              </div>
                            </div>
                            
                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {route.features.map((feature, idx) => {
                                const FeatureIcon = getFeatureIcon(feature);
                                return (
                                  <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md text-xs">
                                    <FeatureIcon className="h-3 w-3" />
                                    <span>{feature}</span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm" variant="ghost">
                                Optimize Route
                              </Button>
                              {route.status === 'congested' && (
                                <Button size="sm" className="bg-gradient-primary">
                                  Suggest Alternative
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoutingInsights;