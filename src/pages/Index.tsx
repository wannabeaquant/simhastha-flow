import React from 'react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { WelcomeBanner } from '@/components/Dashboard/WelcomeBanner';
import { StatsGrid } from '@/components/Dashboard/StatsGrid';
import { MapOverview } from '@/components/Dashboard/MapOverview';
import { EmergencyAlerts } from '@/components/Dashboard/EmergencyAlerts';
import { SimulationConsole } from '@/components/Dashboard/SimulationConsole';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Overview - Takes full width on smaller screens, 2 columns on large */}
          <div className="lg:col-span-3">
            <MapOverview />
          </div>

          {/* Emergency Alerts - Left column */}
          <div className="lg:col-span-2">
            <EmergencyAlerts />
          </div>

          {/* Simulation Console - Right column */}
          <div className="lg:col-span-1">
            <SimulationConsole />
          </div>
        </div>

        {/* Additional metrics or components can be added here */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder for additional widgets */}
          <div className="dashboard-card p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Volunteer Network</h3>
            <p className="text-2xl font-bold text-primary">287</p>
            <p className="text-sm text-muted-foreground">Active volunteers</p>
          </div>
          
          <div className="dashboard-card p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Weather Status</h3>
            <p className="text-2xl font-bold text-warning">42°C</p>
            <p className="text-sm text-muted-foreground">Current temperature</p>
          </div>
          
          <div className="dashboard-card p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">System Health</h3>
            <p className="text-2xl font-bold text-success">98.7%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          
          <div className="dashboard-card p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Data Sync</h3>
            <p className="text-2xl font-bold text-secondary">Live</p>
            <p className="text-sm text-muted-foreground">Real-time updates</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
