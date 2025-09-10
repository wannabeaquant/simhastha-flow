import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone, 
  Users, 
  Ambulance,
  Eye,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  time: string;
  responders?: number;
  status: 'active' | 'responding' | 'resolved';
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Medical Emergency',
    description: 'Pilgrim collapse reported near Ramghat entrance',
    location: 'Ramghat Gate 3',
    time: '2 mins ago',
    responders: 2,
    status: 'responding'
  },
  {
    id: '2', 
    type: 'high',
    title: 'Crowd Overflow',
    description: 'Density exceeding 85% capacity threshold',
    location: 'Mahakal Temple Queue',
    time: '5 mins ago',
    responders: 4,
    status: 'active'
  },
  {
    id: '3',
    type: 'medium',
    title: 'Route Blockage',
    description: 'Temporary barrier placement needed',
    location: 'VIP Corridor B',
    time: '8 mins ago',
    status: 'resolved'
  },
  {
    id: '4',
    type: 'low',
    title: 'Accessibility Request',
    description: 'Wheelchair assistance needed',
    location: 'Freeganj Station',
    time: '12 mins ago',
    responders: 1,
    status: 'responding'
  }
];

const getAlertStyles = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return {
        bg: 'bg-alert-critical',
        text: 'text-white',
        border: 'border-alert-critical'
      };
    case 'high':
      return {
        bg: 'bg-alert-high',
        text: 'text-white',
        border: 'border-alert-high'
      };
    case 'medium':
      return {
        bg: 'bg-alert-medium',
        text: 'text-white',
        border: 'border-alert-medium'
      };
    case 'low':
      return {
        bg: 'bg-alert-low',
        text: 'text-white',
        border: 'border-alert-low'
      };
  }
};

const getStatusStyles = (status: Alert['status']) => {
  switch (status) {
    case 'active':
      return 'bg-destructive text-destructive-foreground';
    case 'responding':
      return 'bg-warning text-warning-foreground';
    case 'resolved':
      return 'bg-success text-success-foreground';
  }
};

export const EmergencyAlerts: React.FC = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Emergency Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-destructive">
              {alerts.filter(a => a.status === 'active').length} Active
            </Badge>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.type);
            const statusStyles = getStatusStyles(alert.status);
            
            return (
              <div 
                key={alert.id}
                className="group p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 animate-fade-in bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Priority Indicator */}
                  <div className={cn(
                    "w-1 h-16 rounded-full",
                    styles.bg
                  )} />

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{alert.title}</h4>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", statusStyles)}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                      {alert.responders && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{alert.responders} responding</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                    {alert.status === 'active' && (
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Ambulance className="h-3 w-3" />
                      </Button>
                    )}
                    {alert.status !== 'resolved' && (
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h4 className="font-semibold text-sm text-foreground mb-3">Quick Response</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <Ambulance className="h-4 w-4 text-destructive" />
              Deploy Medical Team
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <Users className="h-4 w-4 text-warning" />
              Send Volunteers
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Broadcast Alert
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <Phone className="h-4 w-4 text-success" />
              Contact Authorities
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};