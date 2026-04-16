import { 
  LayoutDashboard, 
  Users, 
  Wifi, 
  Wallet, 
  Package, 
  FerrisWheel, 
  Tablet, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  PawPrint
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'guests', label: 'Guest Management', icon: Users },
  { id: 'access', label: 'RFID Access Control', icon: Wifi },
  { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
  { id: 'packages', label: 'Packages & Pricing', icon: Package },
  { id: 'rides', label: 'Ride & Game Mgmt', icon: FerrisWheel },
  { id: 'staff', label: 'Staff & Kiosks', icon: Tablet },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'animals', label: 'Animals', icon: PawPrint },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ 
  activeSection, 
  onSectionChange, 
  isCollapsed, 
  onToggleCollapse,
  mobileOpen = false,
}: SidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-border z-50 transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-20" : "w-72",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-package-blue flex items-center justify-center flex-shrink-0 animate-float">
            <img 
              src="/mascot-dolphin.png" 
              alt="WildWave" 
              className="w-8 h-8 object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg text-foreground whitespace-nowrap">
                Petstation
              </h1>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                Admin Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-package-blue text-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon 
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                      !isActive && "group-hover:translate-x-1"
                    )} 
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap overflow-hidden text-sm">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-white text-xs rounded 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-package-green flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-foreground">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@petstation.com</p>
            </div>
          )}
          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className={cn(
            "mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm",
            isCollapsed && "justify-center"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full 
          flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
