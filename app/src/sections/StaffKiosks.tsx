import { useState } from 'react';
import { 
  Tablet, 
  Monitor, 
  Battery, 
  BatteryWarning, 
  BatteryCharging,
  Wifi,
  WifiOff,
  Settings,
  MapPin,
  RefreshCw,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { staffDevices, kiosks } from '@/data/mockData';
import type { StaffDevice, Kiosk } from '@/types';

export function StaffKiosks() {
  const [activeTab, setActiveTab] = useState<'staff' | 'kiosks'>('staff');

  const getBatteryIcon = (level: number) => {
    if (level <= 20) return <BatteryWarning className="w-4 h-4 text-red-500" />;
    if (level <= 50) return <Battery className="w-4 h-4 text-yellow-500" />;
    return <BatteryCharging className="w-4 h-4 text-green-500" />;
  };

  const getStatusIcon = (status: StaffDevice['status'] | Kiosk['status']) => {
    switch (status) {
      case 'online':
      case 'active':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-gray-400" />;
      case 'low-battery':
        return <BatteryWarning className="w-4 h-4 text-red-500" />;
      case 'maintenance':
        return <Settings className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Staff & Kiosk Management</h2>
          <p className="text-muted-foreground">Monitor devices and self-service kiosks</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>5 Online</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>2 Offline</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'staff', label: 'Staff Tablets', count: staffDevices.length },
          { id: 'kiosks', label: 'Self-Service Kiosks', count: kiosks.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === tab.id 
                ? "bg-package-blue text-foreground" 
                : "bg-white border border-border hover:bg-muted"
            )}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Staff Devices */}
      {activeTab === 'staff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staffDevices.map((device) => (
            <div 
              key={device.id}
              className={cn(
                "bg-white rounded-2xl border-2 p-5 transition-all card-hover",
                device.status === 'online' ? "border-transparent" : "border-red-200 bg-red-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    device.status === 'online' ? "bg-package-blue" : "bg-red-100"
                  )}>
                    <Tablet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{device.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getStatusIcon(device.status)}
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getBatteryIcon(device.batteryLevel)}
                  <span className={cn(
                    "text-sm font-medium",
                    device.batteryLevel <= 20 && "text-red-500"
                  )}>
                    {device.batteryLevel}%
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-package-green flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{device.assignedTo}</p>
                    <p className="text-xs text-muted-foreground">
                      Last active: {new Date(device.lastActivity).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="bg-muted rounded-lg px-3 py-1.5">
                  <span className="text-xs text-muted-foreground">Today's Transactions: </span>
                  <span className="font-medium text-sm">{device.transactionsToday}</span>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kiosks */}
      {activeTab === 'kiosks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kiosks.map((kiosk) => (
            <div 
              key={kiosk.id}
              className={cn(
                "bg-white rounded-2xl border-2 p-5 transition-all card-hover",
                kiosk.status === 'active' ? "border-transparent" : "border-yellow-200 bg-yellow-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    kiosk.status === 'active' ? "bg-package-green" : "bg-yellow-100"
                  )}>
                    <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{kiosk.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{kiosk.location}</span>
                    </div>
                  </div>
                </div>
                {getStatusIcon(kiosk.status)}
              </div>

              {kiosk.status === 'active' ? (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Cash</p>
                      <p className="font-bold text-sm">{kiosk.cashTransactions}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Cashless</p>
                      <p className="font-bold text-sm">{kiosk.cashlessTransactions}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Last maintenance: {new Date(kiosk.lastMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    This kiosk is currently under maintenance and not accepting transactions.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Restart All Devices', icon: '🔁' },
            { label: 'Send Update', icon: '📤' },
            { label: 'View Logs', icon: '📋' },
            { label: 'Schedule Maintenance', icon: '🔧' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border 
                hover:border-primary hover:bg-package-light-blue transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <span className="text-sm font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl border border-border p-6 text-center max-w-sm">
          <img 
            src="/mascot-monkey.png" 
            alt="" 
            className="w-24 h-24 mx-auto animate-float"
          />
          <p className="font-medium mt-2">Device Management Tip</p>
          <p className="text-sm text-muted-foreground">
            Regular maintenance ensures smooth operations. Schedule weekly checkups!
          </p>
        </div>
      </div>
    </div>
  );
}
