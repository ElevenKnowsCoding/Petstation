import { useState } from 'react';
import { 
  FerrisWheel, 
  Gamepad2, 
  Users, 
  Clock, 
  IndianRupee,
  Settings,
  Power,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { attractions } from '@/data/mockData';
import type { Attraction } from '@/types';

const categoryIcons = {
  water: Droplets,
  thrill: Zap,
  kids: Smile,
  game: Gamepad2,
};

import { Droplets, Zap, Smile } from 'lucide-react';

const statusConfig = {
  active: { color: 'bg-green-500', label: 'Active', icon: CheckCircle2 },
  maintenance: { color: 'bg-yellow-500', label: 'Maintenance', icon: AlertTriangle },
  closed: { color: 'bg-gray-400', label: 'Closed', icon: Power },
};

export function RideGameManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'ride' | 'game'>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const filteredAttractions = attractions.filter(a => 
    activeTab === 'all' || a.type === activeTab
  );

  const rides = attractions.filter(a => a.type === 'ride');
  const games = attractions.filter(a => a.type === 'game');

  const totalRideRevenue = rides.reduce((sum, r) => sum + r.revenueToday, 0);
  const totalGameRevenue = games.reduce((sum, g) => sum + g.revenueToday, 0);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ride & Game Management</h2>
          <p className="text-muted-foreground">Monitor and manage all park attractions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-blue hover:bg-package-light-blue transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Configure</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-package-blue flex items-center justify-center">
              <FerrisWheel className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rides.length}</p>
              <p className="text-xs text-muted-foreground">Total Rides</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-package-green flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{games.length}</p>
              <p className="text-xs text-muted-foreground">Total Games</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-package-gold flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">₹{(totalRideRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground">Ride Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-package-red flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">₹{(totalGameRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground">Game Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all', label: 'All Attractions', count: attractions.length },
          { id: 'ride', label: 'Rides', count: rides.length },
          { id: 'game', label: 'Games', count: games.length },
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

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAttractions.map((attraction, index) => {
          const StatusIcon = statusConfig[attraction.status].icon;
          const CategoryIcon = categoryIcons[attraction.category];

          return (
            <div 
              key={attraction.id}
              onClick={() => setSelectedAttraction(attraction)}
              className="bg-white rounded-2xl border border-border overflow-hidden card-hover cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Placeholder */}
              <div className={cn(
                "h-32 flex items-center justify-relative",
                attraction.category === 'water' && "bg-gradient-to-br from-blue-400 to-blue-600",
                attraction.category === 'thrill' && "bg-gradient-to-br from-purple-400 to-purple-600",
                attraction.category === 'kids' && "bg-gradient-to-br from-green-400 to-green-600",
                attraction.category === 'game' && "bg-gradient-to-br from-orange-400 to-orange-600",
              )}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className="w-16 h-16 text-white/30" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white",
                    statusConfig[attraction.status].color
                  )}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig[attraction.status].label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg">{attraction.name}</h3>
                <p className="text-sm text-muted-foreground capitalize mb-3">
                  {attraction.category} {attraction.type}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-muted rounded-lg p-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">Usage</span>
                    </div>
                    <p className="font-bold text-sm">{attraction.usageToday}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <IndianRupee className="w-3 h-3" />
                      <span className="text-xs">Revenue</span>
                    </div>
                    <p className="font-bold text-sm">₹{attraction.revenueToday.toLocaleString()}</p>
                  </div>
                </div>

                {attraction.status === 'active' && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Queue:</span>
                    <span className={cn(
                      "font-medium",
                      attraction.queueTime > 20 ? "text-red-500" : "text-green-500"
                    )}>
                      {attraction.queueTime} min
                    </span>
                  </div>
                )}

                {attraction.status === 'maintenance' && attraction.maintenanceSchedule && (
                  <div className="flex items-center gap-2 text-sm text-yellow-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Until {new Date(attraction.maintenanceSchedule).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedAttraction && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAttraction(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cn(
              "h-40 rounded-t-2xl flex items-center justify-center",
              selectedAttraction.category === 'water' && "bg-gradient-to-br from-blue-400 to-blue-600",
              selectedAttraction.category === 'thrill' && "bg-gradient-to-br from-purple-400 to-purple-600",
              selectedAttraction.category === 'kids' && "bg-gradient-to-br from-green-400 to-green-600",
              selectedAttraction.category === 'game' && "bg-gradient-to-br from-orange-400 to-orange-600",
            )}>
              {(() => {
                const CategoryIcon = categoryIcons[selectedAttraction.category];
                return <CategoryIcon className="w-20 h-20 text-white/50" />;
              })()}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{selectedAttraction.name}</h3>
              <p className="text-muted-foreground capitalize">
                {selectedAttraction.category} {selectedAttraction.type}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="font-bold">{selectedAttraction.capacity} people</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Price Per Ride</p>
                  <p className="font-bold">₹{selectedAttraction.pricePerRide}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Allowed Packages</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAttraction.allowedPackages.map((pkg) => (
                    <span 
                      key={pkg}
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        pkg === 'blue' && "bg-[#c7e6f9] text-[#1a5a7a]",
                        pkg === 'green' && "bg-[#cbf39d] text-[#3d5a1a]",
                        pkg === 'gold' && "bg-[#f9f0c7] text-[#7a5a1a]",
                        pkg === 'red' && "bg-[#f8c7c7] text-[#7a1a1a]",
                      )}
                    >
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-2.5 rounded-xl bg-package-blue hover:bg-package-light-blue transition-colors font-medium">
                  Edit Details
                </button>
                <button 
                  onClick={() => setSelectedAttraction(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
