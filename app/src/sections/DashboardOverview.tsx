import { 
  Users, 
  IndianRupee, 
  FerrisWheel, 
  CreditCard, 
  Wallet, 
  AlertCircle 
} from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { dashboardStats, hourlyRevenue, rideAnalytics } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function DashboardOverview() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-package-blue via-package-light-blue to-white p-6">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, Admin! 
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening at WildWave Park today.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-package-gold" />
              <span>Peak hours: 12 PM - 3 PM</span>
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
          <img 
            src="/mascot-dolphin.png" 
            alt="" 
            className="w-full h-full object-contain animate-float"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Guests Inside"
          value={dashboardStats.guestsInside}
          icon={Users}
          color="blue"
          change={12}
          mascot="/mascot-dolphin.png"
          delay={0}
        />
        <StatsCard
          title="Today's Revenue"
          value={dashboardStats.todaysRevenue}
          prefix="₹"
          icon={IndianRupee}
          color="green"
          change={8}
          mascot="/mascot-tiger.png"
          delay={100}
        />
        <StatsCard
          title="Ride Usage Today"
          value={dashboardStats.rideUsageToday}
          icon={FerrisWheel}
          color="gold"
          change={15}
          mascot="/mascot-lion.png"
          delay={200}
        />
        <StatsCard
          title="Active RFID Cards"
          value={dashboardStats.activeRfidCards}
          icon={CreditCard}
          color="blue"
          change={5}
          delay={300}
        />
        <StatsCard
          title="Wallet Balance Total"
          value={dashboardStats.walletBalanceTotal}
          prefix="₹"
          icon={Wallet}
          color="green"
          change={-3}
          delay={400}
        />
        <StatsCard
          title="Pending Top-ups"
          value={dashboardStats.pendingTopups}
          icon={AlertCircle}
          color="red"
          delay={500}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-border p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Hourly Revenue</h3>
            <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-muted">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-3">
            {hourlyRevenue.map((item, index) => {
              const maxRevenue = Math.max(...hourlyRevenue.map(h => h.revenue));
              const height = (item.revenue / maxRevenue) * 100;
              
              return (
                <div key={item.hour} className="flex-1 flex flex-col items-end gap-2" style={{ height: '100%' }}>
                  <div className="relative w-full group" style={{ height: `${height}%` }}>
                    <div 
                      className={cn(
                        "w-full h-full rounded-t-lg transition-all duration-500",
                        index === 3 ? "bg-package-blue" : "bg-package-light-blue hover:bg-package-blue"
                      )}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs 
                        px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{item.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Rides */}
        <div className="bg-white rounded-2xl border border-border p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Popular Rides</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {rideAnalytics.map((ride, index) => (
              <div 
                key={ride.rideId} 
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                  index === 0 && "bg-package-gold text-[#7a5a1a]",
                  index === 1 && "bg-gray-200 text-gray-600",
                  index === 2 && "bg-orange-100 text-orange-600",
                  index > 2 && "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{ride.rideName}</p>
                  <p className="text-xs text-muted-foreground">
                    {ride.usageCount} rides • ₹{ride.revenue.toLocaleString()} revenue
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{ride.usageCount}</p>
                  {ride.denialCount > 0 && (
                    <p className="text-xs text-red-500">{ride.denialCount} denials</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Guest', icon: '👤', color: 'bg-package-blue' },
            { label: 'Top-up Wallet', icon: '💰', color: 'bg-package-green' },
            { label: 'Upgrade Package', icon: '⭐', color: 'bg-package-gold' },
            { label: 'View Reports', icon: '📊', color: 'bg-package-red' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border 
                hover:border-primary hover:bg-package-light-blue transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
