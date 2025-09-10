import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Users, 
  MapPin,
  Clock,
  Heart,
  User,
  Eye,
  Ear,
  UserCheck,
  Navigation,
  Coffee,
  ShieldCheck,
  Plus,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityFeature {
  id: string;
  name: string;
  type: 'ramp' | 'rest' | 'aid' | 'toilet' | 'assistance';
  location: string;
  status: 'active' | 'maintenance' | 'requested';
  users: number;
  capacity: number;
  features: string[];
}

interface AssistanceRequest {
  id: string;
  type: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  status: 'pending' | 'assigned' | 'completed';
}

const AccessibilityHub = () => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'assistance' | 'requests'>('infrastructure');
  
  const accessibilityFeatures: AccessibilityFeature[] = [
    {
      id: 'ramp-1',
      name: 'Ramghat Access Ramp',
      type: 'ramp',
      location: 'Ramghat Main Entrance',
      status: 'active',
      users: 23,
      capacity: 50,
      features: ['Wide Access', 'Anti-slip Surface', 'Handrails']
    },
    {
      id: 'rest-1',
      name: 'Shaded Rest Area A',
      type: 'rest',
      location: 'Pilgrim Route Midpoint',
      status: 'active',
      users: 12,
      capacity: 30,
      features: ['Seating', 'Water Access', 'Medical Kit']
    },
    {
      id: 'aid-1',
      name: 'Mobile Medical Unit',
      type: 'aid',
      location: 'Mahakaleshwar Temple Gate',
      status: 'active',
      users: 5,
      capacity: 15,
      features: ['First Aid', 'Wheelchair', 'Trained Staff']
    },
    {
      id: 'toilet-1',
      name: 'Accessible Toilet Block',
      type: 'toilet',
      location: 'Main Square',
      status: 'maintenance',
      users: 0,
      capacity: 10,
      features: ['Wheelchair Access', 'Support Rails', 'Emergency Button']
    },
    {
      id: 'assist-1',
      name: 'Volunteer Assistance Post',
      type: 'assistance',
      location: 'Railway Station',
      status: 'active',
      users: 8,
      capacity: 20,
      features: ['Sign Language', 'Navigation Help', 'Emergency Contact']
    }
  ];

  const assistanceRequests: AssistanceRequest[] = [
    {
      id: 'req-1',
      type: 'Wheelchair Assistance',
      location: 'Ramghat Entrance',
      priority: 'high',
      time: '2 min ago',
      status: 'pending'
    },
    {
      id: 'req-2',
      type: 'Visual Guide Needed',
      location: 'Temple Complex',
      priority: 'medium',
      time: '8 min ago',
      status: 'assigned'
    },
    {
      id: 'req-3',
      type: 'Medical Assistance',
      location: 'Main Route',
      priority: 'high',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: 'req-4',
      type: 'Route Navigation',
      location: 'Market Area',
      priority: 'low',
      time: '25 min ago',
      status: 'assigned'
    }
  ];

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'ramp': return User;
      case 'rest': return Coffee;
      case 'aid': return Heart;
      case 'toilet': return ShieldCheck;
      case 'assistance': return UserCheck;
      default: return MapPin;
    }
  };

  const getFeatureColor = (type: string) => {
    switch (type) {
      case 'ramp': return 'text-accent';
      case 'rest': return 'text-secondary';
      case 'aid': return 'text-destructive';
      case 'toilet': return 'text-primary';
      case 'assistance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'requested': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-destructive text-destructive-foreground';
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalFeatures = accessibilityFeatures.length;
  const activeFeatures = accessibilityFeatures.filter(f => f.status === 'active').length;
  const totalUsers = accessibilityFeatures.reduce((sum, f) => sum + f.users, 0);
  const pendingRequests = assistanceRequests.filter(r => r.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Accessibility className="h-8 w-8 text-accent" />
              Accessibility Hub
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive accessibility management for divyangjan and elderly pilgrims
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Accessibility className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalFeatures}</p>
                  <p className="text-sm text-muted-foreground">Total Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{activeFeatures}</p>
                  <p className="text-sm text-muted-foreground">Active Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Current Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{pendingRequests}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: 'infrastructure', name: 'Infrastructure', icon: Settings },
            { id: 'assistance', name: 'Live Assistance', icon: UserCheck },
            { id: 'requests', name: 'Help Requests', icon: Heart }
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
        {activeTab === 'infrastructure' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {accessibilityFeatures.map((feature, index) => {
              const FeatureIcon = getFeatureIcon(feature.type);
              const usagePercentage = (feature.users / feature.capacity) * 100;
              
              return (
                <Card 
                  key={feature.id} 
                  className="dashboard-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                        <FeatureIcon className={cn("h-5 w-5", getFeatureColor(feature.type))} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{feature.location}</p>
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Usage Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Users</p>
                          <p className="text-2xl font-bold text-primary">{feature.users}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Capacity</p>
                          <p className="text-2xl font-bold text-secondary">{feature.capacity}</p>
                        </div>
                      </div>

                      {/* Usage Bar */}
                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>Utilization</span>
                          <span>{Math.round(usagePercentage)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-300",
                              usagePercentage > 80 ? "bg-destructive" : 
                              usagePercentage > 60 ? "bg-warning" : "bg-success"
                            )}
                            style={{ width: `${usagePercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Available Features</p>
                        <div className="flex flex-wrap gap-2">
                          {feature.features.map((feat, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feat}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                        {feature.status === 'maintenance' && (
                          <Button size="sm" className="bg-gradient-primary">
                            Resume Service
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'assistance' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Mobility Assistance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">12</p>
                    <p className="text-sm text-muted-foreground">Active Volunteers</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Wheelchairs Available</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Currently Assigned</span>
                      <span className="font-medium">4</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-gradient-primary">
                    Deploy Volunteer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-secondary" />
                  Visual Assistance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">6</p>
                    <p className="text-sm text-muted-foreground">Trained Guides</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Guide Dogs Available</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Audio Guides</span>
                      <span className="font-medium">15</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full" variant="outline">
                    Assign Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ear className="h-5 w-5 text-warning" />
                  Hearing Assistance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-warning">4</p>
                    <p className="text-sm text-muted-foreground">Sign Interpreters</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Visual Alerts Active</span>
                      <span className="font-medium">Yes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Written Guides</span>
                      <span className="font-medium">50</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full" variant="outline">
                    Request Interpreter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'requests' && (
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Help Requests
                <Badge variant="destructive" className="ml-auto">
                  {pendingRequests} pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {assistanceRequests.map((request, index) => (
                  <div 
                    key={request.id}
                    className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{request.type}</h4>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{request.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && (
                        <Button size="sm" className="bg-gradient-primary">
                          Assign Volunteer
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AccessibilityHub;