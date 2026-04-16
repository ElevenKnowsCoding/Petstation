import { useState } from 'react';
import { 
  Package, 
  Check, 
  X, 
  Edit2, 
  Plus,
  Save,
  Droplets,
  FerrisWheel,
  Gamepad2,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { packages, addonPricing } from '@/data/mockData';
// Package type is used implicitly

const packageIcons = {
  blue: Droplets,
  green: FerrisWheel,
  gold: Gamepad2,
  red: Crown,
};

const packageGradients = {
  blue: 'from-[#c7e6f9] to-[#e6f4fd]',
  green: 'from-[#cbf39d] to-[#e8f5d6]',
  gold: 'from-[#f9f0c7] to-[#fdf6d6]',
  red: 'from-[#f8c7c7] to-[#fbe6e6]',
};

export function PackagesPricing() {
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [showAddOns, setShowAddOns] = useState(false);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Packages & Pricing</h2>
          <p className="text-muted-foreground">Configure packages and add-on pricing</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddOns(!showAddOns)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors"
          >
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Add-ons</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-blue hover:bg-package-light-blue transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Package</span>
          </button>
        </div>
      </div>

      {/* Add-on Pricing Modal */}
      {showAddOns && (
        <div className="bg-white rounded-2xl border border-border p-5 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Add-on Pricing</h3>
            <button 
              onClick={() => setShowAddOns(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Single Ride', price: addonPricing.singleRide, icon: FerrisWheel },
              { label: 'Single Game', price: addonPricing.singleGame, icon: Gamepad2 },
              { label: 'Priority Pass', price: addonPricing.priorityPass, icon: Crown },
            ].map((addon) => (
              <div key={addon.label} className="bg-muted rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <addon.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{addon.label}</p>
                  <p className="text-xl font-bold">₹{addon.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {packages.map((pkg, index) => {
          const Icon = packageIcons[pkg.type];
          const isEditing = editingPackage === pkg.id;

          return (
            <div 
              key={pkg.id}
              className={cn(
                "relative rounded-2xl overflow-hidden border-2 transition-all duration-300",
                isEditing ? "border-primary shadow-lg" : "border-transparent hover:shadow-md"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className={cn("bg-gradient-to-br p-5", packageGradients[pkg.type])}>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <button 
                    onClick={() => setEditingPackage(isEditing ? null : pkg.id)}
                    className="p-2 rounded-lg bg-white/50 hover:bg-white transition-colors"
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  </button>
                </div>
                <h3 className="text-xl font-bold mt-4 capitalize">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold">₹{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">/person</span>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-5">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      pkg.inclusions.waterPark ? "bg-green-500" : "bg-gray-300"
                    )}>
                      {pkg.inclusions.waterPark ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      !pkg.inclusions.waterPark && "text-muted-foreground line-through"
                    )}>
                      Water Park Access
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      pkg.inclusions.rides !== 0 ? "bg-green-500" : "bg-gray-300"
                    )}>
                      {pkg.inclusions.rides !== 0 ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      pkg.inclusions.rides === 0 && "text-muted-foreground line-through"
                    )}>
                      {pkg.inclusions.rides === 'all' 
                        ? 'All Rides' 
                        : pkg.inclusions.rides === 0 
                          ? 'Rides' 
                          : `${pkg.inclusions.rides} Rides`
                      }
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      pkg.inclusions.games !== 0 ? "bg-green-500" : "bg-gray-300"
                    )}>
                      {pkg.inclusions.games !== 0 ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      pkg.inclusions.games === 0 && "text-muted-foreground line-through"
                    )}>
                      {pkg.inclusions.games === 'all' 
                        ? 'All Games' 
                        : typeof pkg.inclusions.games === 'number' && pkg.inclusions.games === 0 
                          ? 'Games' 
                          : `${pkg.inclusions.games} Games`
                      }
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center",
                      pkg.inclusions.priorityQueue ? "bg-green-500" : "bg-gray-300"
                    )}>
                      {pkg.inclusions.priorityQueue ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      !pkg.inclusions.priorityQueue && "text-muted-foreground line-through"
                    )}>
                      Priority Queue
                    </span>
                  </li>
                </ul>

                <p className="text-xs text-muted-foreground mt-4">
                  {pkg.description}
                </p>

                {/* Toggle */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-sm font-medium">
                    {pkg.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button 
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      pkg.isActive ? "bg-green-500" : "bg-gray-300"
                    )}
                  >
                    <span className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      pkg.isActive ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Distribution */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-bold text-lg mb-4">Package Distribution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Basic (Blue)', count: 423, percentage: 35, color: 'bg-[#c7e6f9]' },
            { label: 'Standard (Green)', count: 312, percentage: 26, color: 'bg-[#cbf39d]' },
            { label: 'Gold', count: 356, percentage: 29, color: 'bg-[#f9f0c7]' },
            { label: 'Premium (Red)', count: 156, percentage: 10, color: 'bg-[#f8c7c7]' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={cn("h-24 rounded-xl mb-2 relative overflow-hidden", item.color)}>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-foreground/10 transition-all duration-1000"
                  style={{ height: `${item.percentage}%` }}
                />
              </div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">
                {item.count} guests ({item.percentage}%)
              </p>
            </div>
          ))}
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
          <p className="font-medium mt-2">Pricing Strategy Tip</p>
          <p className="text-sm text-muted-foreground">
            Consider offering family discounts during weekdays to increase Gold package adoption!
          </p>
        </div>
      </div>
    </div>
  );
}
