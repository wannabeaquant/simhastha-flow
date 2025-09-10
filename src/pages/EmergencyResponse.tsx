import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Phone, 
  Ambulance,
  Shield,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Radio,
  Navigation,
  CheckCircle,
  XCircle,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyIncident {
  id: string;
  type: 'medical' | 'security' | 'fire' | 'crowd' | 'infrastructure';
  title: string;
  description: string;
  location: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'responding' | 'resolved';
  reportedAt: string;
  responders: number;
  estimatedTime: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  department: string;
}

interface EmergencyResource {
  id: string;
  type: string;
  location: string;
  status: 'available' | 'deployed' | 'maintenance';
  capacity: number;
  currentUse: number;
}

const EmergencyResponse = () => {
  const [activeTab, setActiveTab] = useState<'incidents' | 'resources' | 'contacts'>('incidents');
  
  const incidents: EmergencyIncident[] = [
    {
      id: 'inc-001',
      type: 'medical',
      title: 'Cardiac Emergency',
      description: 'Elderly pilgrim experiencing chest pain at Ramghat',
      location: 'Ramghat Main Area',
      severity: 'critical',
      status: 'responding',
      reportedAt: '2 min ago',
      responders: 3,
      estimatedTime: '4 min'
    },
    {
      id: 'inc-002',
      type: 'crowd',
      title: 'Crowd Surge',
      description: 'Excessive crowding at temple gate causing safety concern',
      location: 'Mahakaleshwar Temple Gate 2',
      severity: 'high',
      status: 'active',
      reportedAt: '8 min ago',
      responders: 2,
      estimatedTime: '6 min'
    },
    {
      id: 'inc-003',
      type: 'infrastructure',
      title: 'Barrier Collapse',
      description: 'Safety barrier damaged, potential hazard to pilgrims',
      location: 'VIP Route Section A',
      severity: 'medium',
      status: 'responding',
      reportedAt: '15 min ago',
      responders: 4,
      estimatedTime: '12 min'
    },
    {
      id: 'inc-004',
      type: 'medical',
      title: 'Heat Exhaustion',
      description: 'Multiple cases of dehydration reported',
      location: 'Main Pilgrim Route',
      severity: 'high',
      status: 'resolved',
      reportedAt: '25 min ago',
      responders: 6,
      estimatedTime: 'Completed'
    }
  ];

  const contacts: EmergencyContact[] = [
    {
      id: 'cont-001',
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Medical Officer',
      phone: '+91-9876543210',
      status: 'available',
      department: 'Medical'
    },
    {
      id: 'cont-002',
      name: 'Inspector Priya Sharma',
      role: 'Security Chief',
      phone: '+91-9876543211',
      status: 'busy',
      department: 'Security'
    },
    {
      id: 'cont-003',
      name: 'Fire Chief Mohan Singh',
      role: 'Fire Safety Head',
      phone: '+91-9876543212',
      status: 'available',
      department: 'Fire Safety'
    },
    {
      id: 'cont-004',
      name: 'Coordinator Anita Verma',
      role: 'Crowd Management Lead',
      phone: '+91-9876543213',
      status: 'available',
      department: 'Crowd Control'
    }
  ];

  const resources: EmergencyResource[] = [
    {
      id: 'res-001',
      type: 'Ambulance',
      location: 'Ramghat Station',
      status: 'deployed',
      capacity: 2,
      currentUse: 1
    },
    {
      id: 'res-002',
      type: 'Medical Team',
      location: 'Temple Complex',
      status: 'available',
      capacity: 5,
      currentUse: 0
    },
    {
      id: 'res-003',
      type: 'Security Unit',
      location: 'VIP Corridor',
      status: 'deployed',
      capacity: 8,
      currentUse: 6
    },
    {
      id: 'res-004',
      type: 'Fire Truck',
      location: 'Main Base',
      status: 'available',
      capacity: 1,
      currentUse: 0
    }
  ];

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'medical': return Heart;
      case 'security': return Shield;
      case 'fire': return Zap;
      case 'crowd': return Users;
      case 'infrastructure': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'medical': return 'text-destructive';
      case 'security': return 'text-warning';
      case 'fire': return 'text-orange-500';
      case 'crowd': return 'text-primary';
      case 'infrastructure': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-destructive text-destructive-foreground animate-pulse';
      case 'responding': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      case 'deployed': return 'bg-warning text-warning-foreground';
      case 'maintenance': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return XCircle;
      case 'responding': return Timer;
      case 'resolved': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(i => i.status === 'active').length;
  const respondingIncidents = incidents.filter(i => i.status === 'responding').length;
  const availableResources = resources.filter(r => r.status === 'available').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              Emergency Response Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time emergency monitoring and rapid response coordination
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-destructive hover:bg-destructive/90">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Call
            </Button>
            <Button variant="outline">
              <Radio className="h-4 w-4 mr-2" />
              Broadcast Alert
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="dashboard-card border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{activeIncidents}</p>
                  <p className="text-sm text-muted-foreground">Active Emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Timer className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{respondingIncidents}</p>
                  <p className="text-sm text-muted-foreground">Responding</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Ambulance className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{availableResources}</p>
                  <p className="text-sm text-muted-foreground">Available Resources</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">4.2 min</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: 'incidents', name: 'Active Incidents', icon: AlertTriangle },
            { id: 'resources', name: 'Resources', icon: Ambulance },
            { id: 'contacts', name: 'Emergency Contacts', icon: Phone }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {incidents.map((incident, index) => {
              const IncidentIcon = getIncidentIcon(incident.type);
              const StatusIcon = getStatusIcon(incident.status);
              
              return (
                <Card 
                  key={incident.id} 
                  className={cn(
                    "dashboard-card animate-fade-in",
                    incident.severity === 'critical' && "border-destructive/50",
                    incident.status === 'active' && "bg-destructive/5"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                        <IncidentIcon className={cn("h-6 w-6", getIncidentColor(incident.type))} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{incident.title}</h4>
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                          <Badge className={getStatusColor(incident.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {incident.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {incident.description}
                        </p>
                        
                        <div className="grid md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{incident.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{incident.reportedAt}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{incident.responders} responders</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Timer className="h-4 w-4" />
                            <span>ETA: {incident.estimatedTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {incident.status === 'active' && (
                            <Button size="sm" className="bg-gradient-primary">
                              <Ambulance className="h-4 w-4 mr-2" />
                              Dispatch Resources
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Navigation className="h-4 w-4 mr-2" />
                            View Location
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                          {incident.status === 'responding' && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const utilizationPercentage = (resource.currentUse / resource.capacity) * 100;
              
              return (
                <Card 
                  key={resource.id} 
                  className="dashboard-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                        <Ambulance className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.type}</CardTitle>
                        <p className="text-sm text-muted-foreground">{resource.location}</p>
                      </div>
                      <Badge className={getStatusColor(resource.status)}>
                        {resource.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Use</p>
                          <p className="text-2xl font-bold text-primary">{resource.currentUse}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Capacity</p>
                          <p className="text-2xl font-bold text-secondary">{resource.capacity}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>Utilization</span>
                          <span>{Math.round(utilizationPercentage)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-300",
                              utilizationPercentage > 80 ? "bg-destructive" : 
                              utilizationPercentage > 60 ? "bg-warning" : "bg-success"
                            )}
                            style={{ width: `${utilizationPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {resource.status === 'available' && (
                          <Button size="sm" className="bg-gradient-primary">
                            Deploy Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="ghost">
                          Contact Team
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {contacts.map((contact, index) => (
              <Card 
                key={contact.id} 
                className="dashboard-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{contact.name}</h4>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{contact.role}</p>
                      <p className="text-sm text-muted-foreground">{contact.department}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-gradient-primary">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Radio className="h-4 w-4 mr-2" />
                        Radio
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmergencyResponse;