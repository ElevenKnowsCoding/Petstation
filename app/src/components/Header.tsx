import { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications } from '@/data/mockData';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

export function Header({ title, subtitle, onMenuToggle, showMobileMenu }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Title & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {showMobileMenu ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={cn(
            "relative hidden sm:block transition-all duration-300",
            searchFocused ? "w-72" : "w-56"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guests, rides..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-muted 
                focus:bg-white focus:border-primary focus:outline-none transition-all text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "relative p-2.5 rounded-full transition-colors",
                showNotifications ? "bg-package-blue" : "hover:bg-muted"
              )}
            >
              <Bell className={cn(
                "w-5 h-5",
                unreadCount > 0 && "animate-wiggle"
              )} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-package-red 
                  text-xs font-bold text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-border 
                shadow-lg animate-scale-in z-50">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <button className="text-xs text-primary hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={cn(
                        "p-3 border-b border-border last:border-0 hover:bg-muted transition-colors cursor-pointer",
                        !notif.isRead && "bg-package-light-blue"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                          notif.type === 'success' && "bg-green-500",
                          notif.type === 'warning' && "bg-yellow-500",
                          notif.type === 'error' && "bg-red-500",
                          notif.type === 'info' && "bg-blue-500",
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{notif.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notif.timestamp).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-package-green flex items-center justify-center">
                <span className="text-sm font-bold">AD</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-border 
                shadow-lg animate-scale-in z-50">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-sm">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@petstation.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                    Account
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors text-red-500">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
