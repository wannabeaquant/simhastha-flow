import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Zap, 
  Users, 
  Crown,
  Thermometer,
  TrendingUp,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  duration: string;
  impact: 'high' | 'medium' | 'low';
}

const scenarios: Scenario[] = [
  {
    id: 'crowd-overflow',
    name: 'Crowd Overflow',
    description: 'Ramghat capacity exceeds 40% above normal',
    icon: Users,
    color: 'text-destructive',
    duration: '2-3 hours',
    impact: 'high'
  },
  {
    id: 'vip-movement',
    name: 'VIP Movement',
    description: 'Unscheduled dignitary arrival disrupts normal flow',
    icon: Crown,
    color: 'text-route-vip',
    duration: '45 minutes',
    impact: 'medium'
  },
  {
    id: 'weather-emergency',
    name: 'Weather Emergency',
    description: 'Sudden temperature spike triggers heat advisory',
    icon: Thermometer,
    color: 'text-warning',
    duration: '4-6 hours',
    impact: 'high'
  },
  {
    id: 'system-failure',
    name: 'System Failure',
    description: 'Partial communication network disruption',
    icon: Zap,
    color: 'text-primary',
    duration: '1 hour',
    impact: 'medium'
  }
];

export const SimulationConsole: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSimulation = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    setIsRunning(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setProgress(0);
  };

  const resetSimulation = () => {
    setActiveScenario(null);
    setIsRunning(false);
    setProgress(0);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const currentScenario = scenarios.find(s => s.id === activeScenario);

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            Simulation Console
          </CardTitle>
          <div className="flex items-center gap-2">
            {isRunning && (
              <Badge variant="outline" className="text-primary">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse mr-2" />
                Running
              </Badge>
            )}
            <Button size="sm" variant="outline" onClick={resetSimulation}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Scenario Selection */}
        {!activeScenario && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-foreground mb-4">
              Select Emergency Scenario
            </h4>
            <div className="grid gap-3">
              {scenarios.map((scenario, index) => {
                const Icon = scenario.icon;
                
                return (
                  <div
                    key={scenario.id}
                    className="group p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => startSimulation(scenario.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className={cn("h-6 w-6", scenario.color)} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-foreground">{scenario.name}</h5>
                          <Badge 
                            variant="secondary"
                            className={cn("text-xs", getImpactColor(scenario.impact))}
                          >
                            {scenario.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {scenario.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{scenario.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Simulation */}
        {activeScenario && currentScenario && (
          <div className="space-y-6">
            {/* Scenario Header */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <currentScenario.icon className={cn("h-6 w-6", currentScenario.color)} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{currentScenario.name}</h4>
                <p className="text-sm text-muted-foreground">{currentScenario.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Simulation Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                onClick={isRunning ? stopSimulation : () => startSimulation(activeScenario)}
                className="bg-gradient-primary"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {progress > 0 ? 'Resume' : 'Start'}
                  </>
                )}
              </Button>
              
              <Button size="sm" variant="outline" onClick={resetSimulation}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Simulation Results */}
            {progress > 20 && (
              <div className="p-4 bg-muted/30 rounded-lg animate-fade-in">
                <h5 className="font-semibold text-sm text-foreground mb-3">Live Impact Analysis</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Affected Routes:</span>
                    <span className="font-medium text-destructive">8 of 24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium text-warning">4.2 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crowd Displaced:</span>
                    <span className="font-medium text-primary">12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resources Deployed:</span>
                    <span className="font-medium text-success">15 teams</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {progress > 50 && (
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg animate-fade-in">
                <h5 className="font-semibold text-sm text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  System Recommendations
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Activate emergency broadcast to redirect pilgrim flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Deploy additional volunteers to Queue Management Zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                    <span>Prepare backup accessibility corridors</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};