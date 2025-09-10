import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Accessibility,
  ArrowRight,
  Activity
} from 'lucide-react';
import dashboardHero from '@/assets/dashboard-hero.jpg';

export const WelcomeBanner: React.FC = () => {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 mb-8">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={dashboardHero} 
          alt="SimhasthaFlow Control Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>
      
      <div className="relative p-8">
        <div className="flex items-start justify-between">
          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Activity className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Badge variant="outline" className="bg-card/50 backdrop-blur-sm">
                Ujjain 2028
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Welcome to SimhasthaFlow
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Advanced mobility orchestration platform for managing the world's largest religious gathering. 
              Real-time crowd monitoring, predictive analytics, and accessibility management at scale.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <span className="font-semibold text-foreground">24</span>
                  <span className="text-muted-foreground ml-1">Active Routes</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-secondary" />
                <div>
                  <span className="font-semibold text-foreground">5M+</span>
                  <span className="text-muted-foreground ml-1">Expected Pilgrims</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-accent" />
                <div>
                  <span className="font-semibold text-foreground">42</span>
                  <span className="text-muted-foreground ml-1">Days Duration</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Accessibility className="h-4 w-4 text-warning" />
                <div>
                  <span className="font-semibold text-foreground">156</span>
                  <span className="text-muted-foreground ml-1">Access Points</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-primary shadow-lg">
                View Live Map
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="bg-card/50 backdrop-blur-sm">
                System Status
              </Button>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="hidden lg:block">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-sm text-foreground mb-3">Current Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">System Health</span>
                  <span className="text-success font-medium">Optimal</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Data Sync</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                    <span className="text-success font-medium">Live</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-primary font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="text-warning font-medium">42°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};