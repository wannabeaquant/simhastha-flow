import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Wifi,
  Monitor,
  Smartphone,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemSetting {
  id: string;
  name: string;
  description: string;
  value: boolean;
  category: 'system' | 'notifications' | 'security' | 'display';
}

interface SystemStatus {
  component: string;
  status: 'operational' | 'warning' | 'error';
  lastChecked: string;
  description: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'system' | 'about'>('general');
  
  const [settings, setSettings] = useState<SystemSetting[]>([
    {
      id: 'auto-routing',
      name: 'Automatic Route Optimization',
      description: 'Automatically optimize routes based on crowd density',
      value: true,
      category: 'system'
    },
    {
      id: 'emergency-alerts',
      name: 'Emergency Alert Broadcasting',
      description: 'Send automatic alerts to volunteers during emergencies',
      value: true,
      category: 'notifications'
    },
    {
      id: 'real-time-sync',
      name: 'Real-time Data Synchronization',
      description: 'Keep all systems synchronized with latest data',
      value: true,
      category: 'system'
    },
    {
      id: 'mobile-notifications',
      name: 'Mobile Push Notifications',
      description: 'Send push notifications to volunteer mobile apps',
      value: false,
      category: 'notifications'
    },
    {
      id: 'crowd-predictions',
      name: 'AI Crowd Prediction',
      description: 'Use AI to predict crowd movements and congestion',
      value: true,
      category: 'system'
    },
    {
      id: 'accessibility-mode',
      name: 'Enhanced Accessibility Features',
      description: 'Enable additional accessibility support features',
      value: true,
      category: 'display'
    },
    {
      id: 'volunteer-tracking',
      name: 'Volunteer Location Tracking',
      description: 'Track volunteer positions for better coordination',
      value: true,
      category: 'security'
    },
    {
      id: 'data-backup',
      name: 'Automatic Data Backup',
      description: 'Automatically backup critical system data',
      value: true,
      category: 'system'
    }
  ]);

  const systemStatus: SystemStatus[] = [
    {
      component: 'Main Database',
      status: 'operational',
      lastChecked: '2 min ago',
      description: 'All database connections healthy'
    },
    {
      component: 'Real-time Sync Service',
      status: 'operational',
      lastChecked: '1 min ago',
      description: 'Data synchronization running smoothly'
    },
    {
      component: 'Emergency Alert System',
      status: 'operational',
      lastChecked: '3 min ago',
      description: 'Alert broadcasting system ready'
    },
    {
      component: 'Mobile App Connectivity',
      status: 'warning',
      lastChecked: '5 min ago',
      description: 'Some volunteers experiencing connection issues'
    },
    {
      component: 'AI Prediction Engine',
      status: 'operational',
      lastChecked: '2 min ago',
      description: 'Crowd prediction models running normally'
    },
    {
      component: 'Backup Systems',
      status: 'operational',
      lastChecked: '10 min ago',
      description: 'Last backup completed successfully'
    }
  ];

  const toggleSetting = (settingId: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, value: !setting.value }
        : setting
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return Database;
      case 'notifications': return Bell;
      case 'security': return Shield;
      case 'display': return Monitor;
      default: return SettingsIcon;
    }
  };

  const settingsByCategory = {
    system: settings.filter(s => s.category === 'system'),
    notifications: settings.filter(s => s.category === 'notifications'),
    security: settings.filter(s => s.category === 'security'),
    display: settings.filter(s => s.category === 'display')
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-primary" />
              System Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Configure system preferences, security settings, and operational parameters
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button className="bg-gradient-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: 'general', name: 'General Settings', icon: SettingsIcon },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'system', name: 'System Status', icon: Database },
            { id: 'about', name: 'About', icon: User }
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
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* System Settings */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {settingsByCategory.system.map((setting, index) => {
                    const CategoryIcon = getCategoryIcon(setting.category);
                    return (
                      <div 
                        key={setting.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{setting.name}</h4>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.value}
                          onCheckedChange={() => toggleSetting(setting.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-secondary" />
                  Display & Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {settingsByCategory.display.map((setting, index) => {
                    const CategoryIcon = getCategoryIcon(setting.category);
                    return (
                      <div 
                        key={setting.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{setting.name}</h4>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.value}
                          onCheckedChange={() => toggleSetting(setting.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-warning" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {settingsByCategory.security.map((setting, index) => {
                    const CategoryIcon = getCategoryIcon(setting.category);
                    return (
                      <div 
                        key={setting.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-warning" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{setting.name}</h4>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.value}
                          onCheckedChange={() => toggleSetting(setting.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {settingsByCategory.notifications.map((setting, index) => {
                    const CategoryIcon = getCategoryIcon(setting.category);
                    return (
                      <div 
                        key={setting.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{setting.name}</h4>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.value}
                          onCheckedChange={() => toggleSetting(setting.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Notification Channels */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Smartphone className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">Mobile Apps</h4>
                        <p className="text-sm text-muted-foreground">Push notifications to volunteer apps</p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Wifi className="h-6 w-6 text-secondary" />
                      <div>
                        <h4 className="font-semibold">Web Dashboard</h4>
                        <p className="text-sm text-muted-foreground">Real-time web notifications</p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  System Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {systemStatus.map((status, index) => {
                    const StatusIcon = getStatusIcon(status.status);
                    
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 border border-border/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                          <Database className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{status.component}</h4>
                            <Badge className={getStatusColor(status.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{status.description}</p>
                          <p className="text-xs text-muted-foreground">Last checked: {status.lastChecked}</p>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">CPU Usage</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Memory Usage</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Disk Space</span>
                      <span className="font-medium">45% used</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Network I/O</span>
                      <span className="font-medium">Normal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">System Info</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Version</span>
                      <span className="font-medium">SimhasthaFlow v2.1.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="font-medium">7 days, 14 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Update</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Environment</span>
                      <span className="font-medium">Production</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  SimhasthaFlow - Smart Mobility Control System
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About the System</h3>
                    <p className="text-muted-foreground mb-4">
                      SimhasthaFlow is an adaptive, inclusive, and predictive mobility control system designed specifically 
                      for managing the massive crowd flows during Simhastha 2028 in Ujjain. The system integrates real-time 
                      crowd monitoring, AI-powered route optimization, and comprehensive accessibility features to ensure 
                      safe and efficient pilgrim movement.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Key Features
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Real-time crowd density monitoring</li>
                        <li>• AI-powered route optimization</li>
                        <li>• Multi-priority routing system</li>
                        <li>• Comprehensive accessibility support</li>
                        <li>• Emergency response coordination</li>
                        <li>• Volunteer management portal</li>
                        <li>• Predictive crowd modeling</li>
                        <li>• Offline-first architecture</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Technical Specifications
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• React + TypeScript frontend</li>
                        <li>• Real-time WebSocket connections</li>
                        <li>• Responsive design for all devices</li>
                        <li>• PWA capabilities for offline use</li>
                        <li>• RESTful API architecture</li>
                        <li>• Cloud-native deployment</li>
                        <li>• Microservices architecture</li>
                        <li>• High availability design</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold mb-3">Government Scheme Alignments</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">Smart Cities Mission</h5>
                        <p className="text-xs text-muted-foreground">Urban mobility optimization</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">PM Gati Shakti</h5>
                        <p className="text-xs text-muted-foreground">Infrastructure coordination</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">Sugamya Bharat</h5>
                        <p className="text-xs text-muted-foreground">Accessibility compliance</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">Digital India</h5>
                        <p className="text-xs text-muted-foreground">Digital transformation</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">Swachh Bharat</h5>
                        <p className="text-xs text-muted-foreground">Cleanliness monitoring</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h5 className="font-medium text-sm">Ayushman Bharat</h5>
                        <p className="text-xs text-muted-foreground">Healthcare integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-lg">Contact & Support</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For technical issues and system support
                    </p>
                    <p className="text-sm">Email: support@simhasthaflow.gov.in</p>
                    <p className="text-sm">Phone: +91-7000-XXXXX</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Administrative Contact</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For administrative queries and coordination
                    </p>
                    <p className="text-sm">Email: admin@simhasthaflow.gov.in</p>
                    <p className="text-sm">Phone: +91-7000-YYYYY</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;