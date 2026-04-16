import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  PieChart,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  hourlyRevenue, 
  rideAnalytics, 
  packageDistribution,
  dashboardStats 
} from '@/data/mockData';

export function AnalyticsReports() {
  const [dateRange, setDateRange] = useState('today');
  const [activeChart, setActiveChart] = useState<'revenue' | 'rides' | 'packages'>('revenue');

  const metrics = [
    { 
      label: 'Total Revenue', 
      value: `₹${dashboardStats.todaysRevenue.toLocaleString()}`, 
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp 
    },
    { 
      label: 'Guest Count', 
      value: dashboardStats.guestsInside.toLocaleString(), 
      change: '+8.2%',
      trend: 'up',
      icon: Activity 
    },
    { 
      label: 'Avg Spend/Guest', 
      value: '₹687', 
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown 
    },
    { 
      label: 'Upgrade Rate', 
      value: '34%', 
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp 
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-muted-foreground">Insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-blue hover:bg-package-light-blue transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl border border-border p-4 card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <metric.icon className={cn(
                "w-5 h-5",
                metric.trend === 'up' ? "text-green-500" : "text-red-500"
              )} />
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <span className={cn(
              "text-xs font-medium",
              metric.trend === 'up' ? "text-green-500" : "text-red-500"
            )}>
              {metric.change} vs last period
            </span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-bold text-lg">Revenue Overview</h3>
            </div>
            <div className="flex items-center gap-2">
              {[
                { id: 'revenue', label: 'Revenue' },
                { id: 'rides', label: 'Rides' },
                { id: 'packages', label: 'Packages' },
              ].map((chart) => (
                <button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id as typeof activeChart)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    activeChart === chart.id 
                      ? "bg-package-blue" 
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {chart.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end gap-4">
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
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs 
                      px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ₹{item.revenue.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Package Distribution */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5" />
            <h3 className="font-bold text-lg">Package Distribution</h3>
          </div>

          <div className="space-y-4">
            {packageDistribution.map((pkg) => (
              <div key={pkg.package}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{pkg.package}</span>
                  <span className="text-sm text-muted-foreground">{pkg.count} ({pkg.percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      pkg.package === 'blue' && "bg-[#c7e6f9]",
                      pkg.package === 'green' && "bg-[#cbf39d]",
                      pkg.package === 'gold' && "bg-[#f9f0c7]",
                      pkg.package === 'red' && "bg-[#f8c7c7]",
                    )}
                    style={{ width: `${pkg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-xl">
            <p className="text-sm font-medium mb-1">Total Guests</p>
            <p className="text-2xl font-bold">
              {packageDistribution.reduce((sum, p) => sum + p.count, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Popular Rides Table */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <h3 className="font-bold text-lg">Ride Performance</h3>
          </div>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Ride</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Usage</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Revenue</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Denials</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rideAnalytics.map((ride) => (
                <tr key={ride.rideId} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{ride.rideName}</td>
                  <td className="px-4 py-3">{ride.usageCount}</td>
                  <td className="px-4 py-3">₹{ride.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      ride.denialCount > 30 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    )}>
                      {ride.denialCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-24">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${Math.max(0, 100 - ride.denialCount)}%` }}
                        />
                      </div>
                      <span className="text-xs">{Math.max(0, 100 - ride.denialCount)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-package-blue to-package-light-blue rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3">💡 Key Insights</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600">▲</span>
              <span className="text-sm">Peak hours are 12 PM - 3 PM with ₹18,500 revenue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">⚠</span>
              <span className="text-sm">Roller Coaster has 23 denials - consider upselling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">▲</span>
              <span className="text-sm">Gold package adoption increased by 15%</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-package-gold to-package-light-gold rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3">🎯 Recommendations</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span>1.</span>
              <span className="text-sm">Add more staff during peak hours (12-3 PM)</span>
            </li>
            <li className="flex items-start gap-2">
              <span>2.</span>
              <span className="text-sm">Promote Gold upgrades at denied rides</span>
            </li>
            <li className="flex items-start gap-2">
              <span>3.</span>
              <span className="text-sm">Consider dynamic pricing for weekends</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl border border-border p-6 text-center max-w-sm">
          <img 
            src="/mascot-lion.png" 
            alt="" 
            className="w-24 h-24 mx-auto animate-float"
          />
          <p className="font-medium mt-2">Analytics Assistant</p>
          <p className="text-sm text-muted-foreground">
            Data-driven decisions lead to happier guests and higher revenue!
          </p>
        </div>
      </div>
    </div>
  );
}
