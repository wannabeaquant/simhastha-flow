import React from 'react';
import { Users, MapPin, AlertTriangle, Accessibility, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend }) => {
  return (
    <Card className="metric-card group cursor-pointer hover:scale-105 transition-transform duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={cn(
                  "h-3 w-3",
                  trend === 'up' ? "text-success rotate-0" : 
                  trend === 'down' ? "text-destructive rotate-180" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-xs font-medium",
                  trend === 'up' ? "text-success" : 
                  trend === 'down' ? "text-destructive" : "text-muted-foreground"
                )}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center",
            color,
            "bg-opacity-10 group-hover:bg-opacity-20 transition-colors duration-200"
          )}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsGrid: React.FC = () => {
  const stats = [
    {
      title: "Active Pilgrims",
      value: "847K",
      change: "+12.3%",
      icon: Users,
      color: "text-primary bg-primary",
      trend: 'up' as const
    },
    {
      title: "Critical Zones",
      value: "3",
      change: "-2 from peak",
      icon: AlertTriangle,
      color: "text-destructive bg-destructive",
      trend: 'down' as const
    },
    {
      title: "Active Routes",
      value: "24",
      change: "All operational",
      icon: MapPin,
      color: "text-secondary bg-secondary",
      trend: 'neutral' as const
    },
    {
      title: "Accessibility Aids",
      value: "156",
      change: "+8 deployed",
      icon: Accessibility,
      color: "text-accent bg-accent",
      trend: 'up' as const
    },
    {
      title: "Response Time",
      value: "2.3m",
      change: "-0.5m improved",
      icon: Clock,
      color: "text-warning bg-warning",
      trend: 'down' as const
    },
    {
      title: "System Load",
      value: "67%",
      change: "Within limits",
      icon: TrendingUp,
      color: "text-success bg-success",
      trend: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-scale-in"
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};