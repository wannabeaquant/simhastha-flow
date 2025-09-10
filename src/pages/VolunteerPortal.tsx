import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  Clock,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
  UserCheck,
  MessageSquare,
  Navigation,
  Shield,
  Heart,
  Coffee,
  Languages,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Volunteer {
  id: string;
  name: string;
  role: string;
  location: string;
  status: 'active' | 'break' | 'offline';
  skills: string[];
  rating: number;
  assignedTasks: number;
  completedTasks: number;
  joinedAt: string;
  contact: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'assistance' | 'guidance' | 'emergency' | 'maintenance';
  priority: 'high' | 'medium' | 'low';
  location: string;
  assignedTo?: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  estimatedTime: string;
  requiredSkills: string[];
}

const VolunteerPortal = () => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'tasks' | 'deployment'>('volunteers');
  
  const volunteers: Volunteer[] = [
    {
      id: 'vol-001',
      name: 'Amit Sharma',
      role: 'Senior Guide',
      location: 'Ramghat Area',
      status: 'active',
      skills: ['Hindi', 'English', 'First Aid', 'Crowd Control'],
      rating: 4.8,
      assignedTasks: 3,
      completedTasks: 47,
      joinedAt: '6 months ago',
      contact: '+91-9876543210'
    },
    {
      id: 'vol-002',
      name: 'Priya Patel',
      role: 'Medical Assistant',
      location: 'Temple Complex',
      status: 'active',
      skills: ['Medical Aid', 'Sign Language', 'Hindi', 'Gujarati'],
      rating: 4.9,
      assignedTasks: 2,
      completedTasks: 62,
      joinedAt: '8 months ago',
      contact: '+91-9876543211'
    },
    {
      id: 'vol-003',
      name: 'Raj Kumar',
      role: 'Route Coordinator',
      location: 'VIP Corridor',
      status: 'break',
      skills: ['Navigation', 'Security', 'English', 'Hindi'],
      rating: 4.6,
      assignedTasks: 1,
      completedTasks: 34,
      joinedAt: '4 months ago',
      contact: '+91-9876543212'
    },
    {
      id: 'vol-004',
      name: 'Sita Devi',
      role: 'Accessibility Support',
      location: 'Main Entrance',
      status: 'active',
      skills: ['Wheelchair Assistance', 'Hindi', 'Patience', 'Empathy'],
      rating: 5.0,
      assignedTasks: 4,
      completedTasks: 89,
      joinedAt: '1 year ago',
      contact: '+91-9876543213'
    },
    {
      id: 'vol-005',
      name: 'Mohammed Ali',
      role: 'Translation Support',
      location: 'Information Desk',
      status: 'offline',
      skills: ['Urdu', 'Arabic', 'Hindi', 'English'],
      rating: 4.7,
      assignedTasks: 0,
      completedTasks: 23,
      joinedAt: '3 months ago',
      contact: '+91-9876543214'
    }
  ];

  const tasks: Task[] = [
    {
      id: 'task-001',
      title: 'Wheelchair Assistance Required',
      description: 'Elderly pilgrim needs help navigating from parking to temple',
      type: 'assistance',
      priority: 'high',
      location: 'Main Parking Area',
      status: 'pending',
      estimatedTime: '30 min',
      requiredSkills: ['Wheelchair Assistance', 'Patient Care']
    },
    {
      id: 'task-002',
      title: 'Route Guidance - Lost Pilgrims',
      description: 'Family group needs direction to accessible rest area',
      type: 'guidance',
      priority: 'medium',
      location: 'Temple Gate 3',
      assignedTo: 'vol-001',
      status: 'assigned',
      estimatedTime: '15 min',
      requiredSkills: ['Navigation', 'Local Knowledge']
    },
    {
      id: 'task-003',
      title: 'First Aid Support',
      description: 'Minor injury reported, bandaging assistance needed',
      type: 'emergency',
      priority: 'high',
      location: 'Pilgrim Route Km 2',
      assignedTo: 'vol-002',
      status: 'in-progress',
      estimatedTime: '20 min',
      requiredSkills: ['First Aid', 'Medical Training']
    },
    {
      id: 'task-004',
      title: 'Information Translation',
      description: 'Non-Hindi speaking pilgrims need assistance with signage',
      type: 'assistance',
      priority: 'low',
      location: 'Information Center',
      status: 'pending',
      estimatedTime: '10 min',
      requiredSkills: ['English', 'Translation']
    },
    {
      id: 'task-005',
      title: 'Crowd Management Support',
      description: 'Additional support needed for queue organization',
      type: 'assistance',
      priority: 'medium',
      location: 'Main Darshan Queue',
      assignedTo: 'vol-003',
      status: 'completed',
      estimatedTime: '45 min',
      requiredSkills: ['Crowd Control', 'Communication']
    }
  ];

  const getVolunteerStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'break': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'assistance': return UserCheck;
      case 'guidance': return Navigation;
      case 'emergency': return AlertCircle;
      case 'maintenance': return Shield;
      default: return Users;
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'assistance': return 'text-primary';
      case 'guidance': return 'text-secondary';
      case 'emergency': return 'text-destructive';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-destructive text-destructive-foreground';
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSkillIcon = (skill: string) => {
    if (skill.includes('Language') || skill.includes('Hindi') || skill.includes('English')) return Languages;
    if (skill.includes('Medical') || skill.includes('First Aid')) return Heart;
    if (skill.includes('Navigation')) return Navigation;
    if (skill.includes('Security')) return Shield;
    return Star;
  };

  const totalVolunteers = volunteers.length;
  const activeVolunteers = volunteers.filter(v => v.status === 'active').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Volunteer Portal
            </h1>
            <p className="text-muted-foreground mt-2">
              Coordinate and manage volunteer workforce for seamless pilgrim assistance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-primary">
              <Users className="h-4 w-4 mr-2" />
              Add Volunteer
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Broadcast Message
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalVolunteers}</p>
                  <p className="text-sm text-muted-foreground">Total Volunteers</p>
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
                  <p className="text-2xl font-bold text-success">{activeVolunteers}</p>
                  <p className="text-sm text-muted-foreground">Currently Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{pendingTasks}</p>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{completedTasks}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: 'volunteers', name: 'Active Volunteers', icon: Users },
            { id: 'tasks', name: 'Task Management', icon: CheckCircle },
            { id: 'deployment', name: 'Deployment Map', icon: MapPin }
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
        {activeTab === 'volunteers' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {volunteers.map((volunteer, index) => (
              <Card 
                key={volunteer.id} 
                className="dashboard-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                        <Badge className={getVolunteerStatusColor(volunteer.status)}>
                          {volunteer.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span className="text-sm font-medium">{volunteer.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{volunteer.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{volunteer.joinedAt}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Assigned Tasks</p>
                        <p className="text-xl font-bold text-primary">{volunteer.assignedTasks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-xl font-bold text-success">{volunteer.completedTasks}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Skills & Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {volunteer.skills.map((skill, idx) => {
                          const SkillIcon = getSkillIcon(skill);
                          return (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <SkillIcon className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-primary">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Assign Task
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.map((task, index) => {
              const TaskIcon = getTaskTypeIcon(task.type);
              const assignedVolunteer = volunteers.find(v => v.id === task.assignedTo);
              
              return (
                <Card 
                  key={task.id} 
                  className="dashboard-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                        <TaskIcon className={cn("h-6 w-6", getTaskTypeColor(task.type))} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {task.description}
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{task.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {task.estimatedTime}</span>
                          </div>
                          {assignedVolunteer && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <UserCheck className="h-4 w-4" />
                              <span>{assignedVolunteer.name}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {task.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {task.status === 'pending' && (
                            <Button size="sm" className="bg-gradient-primary">
                              <UserCheck className="h-4 w-4 mr-2" />
                              Assign Volunteer
                            </Button>
                          )}
                          {task.status === 'in-progress' && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Complete
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Navigation className="h-4 w-4 mr-2" />
                            View Location
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map would go here */}
            <div className="lg:col-span-2">
              <Card className="dashboard-card h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Volunteer Deployment Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-full">
                  <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Deployment Map</h3>
                        <p className="text-muted-foreground">
                          Real-time volunteer positions and assignment areas
                        </p>
                      </div>
                    </div>
                    
                    {/* Simulated volunteer markers */}
                    <div className="absolute top-20 left-32">
                      <div className="h-4 w-4 bg-success rounded-full animate-pulse shadow-lg" />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                        Amit - Ramghat
                      </div>
                    </div>
                    <div className="absolute top-40 right-40">
                      <div className="h-4 w-4 bg-success rounded-full animate-pulse shadow-lg" />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                        Priya - Temple
                      </div>
                    </div>
                    <div className="absolute bottom-32 left-20">
                      <div className="h-4 w-4 bg-warning rounded-full shadow-lg" />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                        Raj - On Break
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deployment Stats */}
            <div className="space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Deployment Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ramghat Area</span>
                      <Badge variant="outline">2 volunteers</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Temple Complex</span>
                      <Badge variant="outline">3 volunteers</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">VIP Corridors</span>
                      <Badge variant="outline">1 volunteer</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Main Entrance</span>
                      <Badge variant="outline">2 volunteers</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Deploy to High Priority Area
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Group Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Coffee className="h-4 w-4 mr-2" />
                      Schedule Break Rotation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VolunteerPortal;