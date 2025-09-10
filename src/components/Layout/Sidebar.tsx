import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Route, 
  Accessibility, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    color: 'text-primary'
  },
  {
    title: 'Map View',
    href: '/map',
    icon: Map,
    color: 'text-secondary'
  },
  {
    title: 'Routing Insights',
    href: '/routing',
    icon: Route,
    color: 'text-route-pilgrim'
  },
  {
    title: 'Accessibility',
    href: '/accessibility',
    icon: Accessibility,
    color: 'text-accent'
  },
  {
    title: 'Emergency',
    href: '/emergency',
    icon: AlertTriangle,
    color: 'text-destructive'
  },
  {
    title: 'Volunteers',
    href: '/volunteers',
    icon: Users,
    color: 'text-warning'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    color: 'text-muted-foreground'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    color: 'text-muted-foreground'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <aside className={cn(
      "sidebar-nav flex flex-col border-r border-border/50 transition-all duration-300 animate-slide-in",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">SimhasthaFlow</span>
              <span className="text-xs text-sidebar-foreground/70">Control Center</span>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 hover:bg-sidebar-active/10"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "nav-link group",
                      isActive && "nav-link-active"
                    )
                  }
                  end
                >
                  <Icon className={cn("h-5 w-5 transition-colors", item.color)} />
                  {!collapsed && (
                    <span className="transition-opacity duration-200">
                      {item.title}
                    </span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md shadow-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className={cn(
          "flex items-center gap-2",
          collapsed && "justify-center"
        )}>
          <div className="h-2 w-2 status-indicator bg-success"></div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-foreground">System Online</span>
              <span className="text-xs text-sidebar-foreground/70">All systems operational</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};