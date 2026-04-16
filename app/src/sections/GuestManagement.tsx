import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  Ban,
  Wallet,
  Plus,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { guests } from '@/data/mockData';
import type { PackageType, Guest } from '@/types';

const packageColors: Record<PackageType, string> = {
  blue: 'bg-[#c7e6f9] text-[#1a5a7a]',
  green: 'bg-[#cbf39d] text-[#3d5a1a]',
  gold: 'bg-[#f9f0c7] text-[#7a5a1a]',
  red: 'bg-[#f8c7c7] text-[#7a1a1a]',
};

const statusColors = {
  active: 'bg-green-500',
  paused: 'bg-yellow-500',
  expired: 'bg-gray-400',
};

export function GuestManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<PackageType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.rfidUid.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPackage = selectedPackage === 'all' || guest.package === selectedPackage;
    const matchesStatus = selectedStatus === 'all' || guest.status === selectedStatus;
    return matchesSearch && matchesPackage && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-muted-foreground">Manage guests, RFID cards, and packages</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-blue hover:bg-package-light-blue transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Guest</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or RFID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted 
                focus:bg-white focus:border-primary focus:outline-none transition-all text-sm"
            />
          </div>

          {/* Package Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value as PackageType | 'all')}
              className="px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none"
            >
              <option value="all">All Packages</option>
              <option value="blue">Basic (Blue)</option>
              <option value="green">Standard (Green)</option>
              <option value="gold">Gold</option>
              <option value="red">Premium (Red)</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">RFID UID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Guest</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Package</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Wallet</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Activity Today</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredGuests.map((guest, index) => (
                <tr 
                  key={guest.id} 
                  className="hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-4 py-3">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{guest.rfidUid}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-package-blue flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {guest.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{guest.name}</p>
                        <p className="text-xs text-muted-foreground">{guest.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                      packageColors[guest.package]
                    )}>
                      {guest.package}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Wallet className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium text-sm">₹{guest.walletBalance}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <span className="font-medium">{guest.ridesUsedToday}</span>
                      <span className="text-muted-foreground"> rides • </span>
                      <span className="font-medium">{guest.gamesPlayedToday}</span>
                      <span className="text-muted-foreground"> games</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", statusColors[guest.status])} />
                      <span className="text-sm capitalize">{guest.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedGuest(guest)}
                        className="p-1.5 rounded-lg hover:bg-package-blue transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-package-green transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-package-red transition-colors" title="Block">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredGuests.length} of {guests.length} guests
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Guest Detail Modal */}
      {selectedGuest && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGuest(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-package-blue flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {selectedGuest.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedGuest.name}</h3>
                  <p className="text-muted-foreground">{selectedGuest.phone}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
                      packageColors[selectedGuest.package]
                    )}>
                      {selectedGuest.package} Package
                    </span>
                    <code className="text-xs bg-muted px-2 py-0.5 rounded">{selectedGuest.rfidUid}</code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-package-light-blue rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
                  <p className="text-2xl font-bold">₹{selectedGuest.walletBalance}</p>
                </div>
                <div className="bg-package-light-green rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Today's Activity</p>
                  <p className="text-lg font-bold">
                    {selectedGuest.ridesUsedToday} rides • {selectedGuest.gamesPlayedToday} games
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2.5 rounded-xl bg-package-blue hover:bg-package-light-blue transition-colors font-medium">
                  Top-up Wallet
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-package-gold hover:bg-package-light-gold transition-colors font-medium">
                  Upgrade Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
