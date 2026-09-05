import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  MessageSquare, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Database
} from 'lucide-react';
import { Logo } from '../ui/Logo';

export type AdminTab = 'dashboard' | 'vehicles' | 'leads' | 'inquiries' | 'requests' | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onExitToWebsite: () => void;
  vehicleCount: number;
  openLeadsCount: number;
  newInquiriesCount: number;
  requestsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onExitToWebsite,
  vehicleCount,
  openLeadsCount,
  newInquiriesCount,
  requestsCount,
}) => {
  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Overview Metrics',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'vehicles',
      label: 'Vehicle Inventory',
      icon: <Car className="w-4 h-4" />,
      badge: vehicleCount,
    },
    {
      id: 'leads',
      label: 'CRM & Leads',
      icon: <Users className="w-4 h-4" />,
      badge: openLeadsCount,
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: newInquiriesCount,
    },
    {
      id: 'requests',
      label: 'Vehicle Requests',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      badge: requestsCount,
    },
    {
      id: 'settings',
      label: 'Content & Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-stone-950 text-stone-300 min-h-screen flex flex-col justify-between border-r border-stone-800 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-stone-800/80">
          <Logo size="sm" />
          <span className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase block mt-1.5 px-1">
            Operations Console
          </span>
        </div>

        {/* Database Mode Status Indicator */}
        <div className="mx-4 my-3 px-3 py-2 bg-stone-900/90 rounded-xl border border-stone-800 text-[11px] flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div className="truncate">
            <span className="text-stone-300 font-semibold block truncate">MongoDB Atlas Ready</span>
            <span className="text-stone-500 text-[10px] block">Syncs offline & Atlas cloud</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive
                        ? 'bg-stone-950 text-amber-300'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-stone-800/80 space-y-2">
        <button
          onClick={onExitToWebsite}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Website</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-rose-400 hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out Staff Session</span>
        </button>
      </div>
    </aside>
  );
};

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  actionButton,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200/80 gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};
