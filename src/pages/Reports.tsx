import React, { useState } from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  TrendingUp, 
  Users,
  MapPin,
  Calendar,
  Download,
  Share,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportData {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'incident' | 'performance';
  generatedAt: string;
  status: 'completed' | 'generating' | 'scheduled';
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
  category: string;
}

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'analytics'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');
  
  const reports: ReportData[] = [
    {
      id: 'rpt-001',
      title: 'Daily Operations Summary',
      type: 'daily',
      generatedAt: '2 hours ago',
      status: 'completed',
      size: '2.4 MB',
      format: 'PDF',
      category: 'Operations'
    },
    {
      id: 'rpt-002',
      title: 'Weekly Crowd Analytics',
      type: 'weekly',
      generatedAt: '1 day ago',
      status: 'completed',
      size: '8.7 MB',
      format: 'Excel',
      category: 'Analytics'
    },
    {
      id: 'rpt-003',
      title: 'Emergency Incident Report',
      type: 'incident',
      generatedAt: '3 hours ago',
      status: 'completed',
      size: '1.2 MB',
      format: 'PDF',
      category: 'Safety'
    },
    {
      id: 'rpt-004',
      title: 'Volunteer Performance Analysis',
      type: 'performance',
      generatedAt: 'Generating...',
      status: 'generating',
      size: '---',
      format: 'Excel',
      category: 'HR'
    },
    {
      id: 'rpt-005',
      title: 'Accessibility Services Usage',
      type: 'weekly',
      generatedAt: 'Scheduled for 6 PM',
      status: 'scheduled',
      size: '---',
      format: 'CSV',
      category: 'Accessibility'
    }
  ];

  const metricsData: MetricCard[] = [
    {
      title: 'Total Pilgrims Served',
      value: '42,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Average Response Time',
      value: '4.2 min',
      change: '-8.3%',
      trend: 'down',
      icon: Clock,
      color: 'text-success'
    },
    {
      title: 'Emergency Incidents',
      value: '23',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-destructive'
    },
    {
      title: 'System Uptime',
      value: '99.7%',
      change: '+0.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Route Efficiency',
      value: '87.3%',
      change: '+5.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-secondary'
    },
    {
      title: 'Volunteer Utilization',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      icon: Users,
      color: 'text-warning'
    }
  ];

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'generating': return 'bg-warning text-warning-foreground animate-pulse';
      case 'scheduled': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return Calendar;
      case 'weekly': return BarChart3;
      case 'incident': return AlertTriangle;
      case 'performance': return TrendingUp;
      default: return FileText;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive reporting and data insights for government oversight and decision-making
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-primary">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-2 bg-muted/30 rounded-lg p-1 w-fit">
          {[
            { id: 'today', name: 'Today' },
            { id: 'week', name: 'This Week' },
            { id: 'month', name: 'This Month' }
          ].map((timeframe) => (
            <Button
              key={timeframe.id}
              variant={selectedTimeframe === timeframe.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe.id as any)}
            >
              {timeframe.name}
            </Button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {[
            { id: 'overview', name: 'Overview Dashboard', icon: BarChart3 },
            { id: 'reports', name: 'Generated Reports', icon: FileText },
            { id: 'analytics', name: 'Live Analytics', icon: LineChart }
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metricsData.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card 
                    key={index} 
                    className="dashboard-card animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center">
                          <Icon className={cn("h-5 w-5", metric.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-bold text-foreground truncate">{metric.value}</p>
                          <p className="text-xs text-muted-foreground truncate">{metric.title}</p>
                          <div className={cn("flex items-center gap-1 text-xs", getTrendColor(metric.trend))}>
                            <span>{getTrendIcon(metric.trend)}</span>
                            <span>{metric.change}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Hourly Pilgrim Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Chart View</p>
                      <p className="text-sm text-muted-foreground">Real-time data visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-secondary" />
                    Route Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Route Distribution Chart</p>
                      <p className="text-sm text-muted-foreground">Pilgrim path analytics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Performance Summary ({selectedTimeframe})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-primary">98.5%</p>
                    <p className="text-sm text-muted-foreground">Service Availability</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-success">287</p>
                    <p className="text-sm text-muted-foreground">Active Volunteers</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-warning">12</p>
                    <p className="text-sm text-muted-foreground">Incidents Resolved</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-secondary">4.8/5</p>
                    <p className="text-sm text-muted-foreground">Pilgrim Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reports.map((report, index) => {
              const ReportIcon = getReportTypeIcon(report.type);
              
              return (
                <Card 
                  key={report.id} 
                  className="dashboard-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center">
                        <ReportIcon className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{report.title}</h4>
                          <Badge className={getReportStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <Badge variant="outline">
                            {report.format}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Category: {report.category}</span>
                          <span>Generated: {report.generatedAt}</span>
                          {report.size !== '---' && <span>Size: {report.size}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {report.status === 'completed' && (
                          <>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </>
                        )}
                        {report.status === 'generating' && (
                          <Button size="sm" variant="outline" disabled>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </Button>
                        )}
                        {report.status === 'scheduled' && (
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Report Generation Options */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Daily Summary</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Crowd Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    <span className="text-sm">Incident Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">Performance Analysis</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Real-time System Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Live Analytics Dashboard</h3>
                      <p className="text-muted-foreground">
                        Real-time system performance and pilgrim flow metrics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-60 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Heat Map Visualization</p>
                      <p className="text-sm text-muted-foreground">Pilgrim density across regions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Live Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Online Users</span>
                      <span className="font-bold text-primary">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Routes</span>
                      <span className="font-bold text-success">24/26</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Emergency Alerts</span>
                      <span className="font-bold text-destructive">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">System Load</span>
                      <span className="font-bold text-warning">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Highlights</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-success rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">Peak hours handled successfully</p>
                        <p className="text-xs text-muted-foreground">6:00 AM - 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-warning rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">3 route optimizations applied</p>
                        <p className="text-xs text-muted-foreground">Improved flow by 15%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">287 volunteers deployed</p>
                        <p className="text-xs text-muted-foreground">94% utilization rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Current View
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Share className="h-4 w-4 mr-2" />
                      Share Dashboard
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Report
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

export default Reports;