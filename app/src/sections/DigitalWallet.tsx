import { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCcw, 
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { transactions, dashboardStats } from '@/data/mockData';
import type { Transaction } from '@/types';

export function DigitalWallet() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesType = filterType === 'all' || txn.type === filterType;
    const matchesSearch = txn.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    totalLoaded: 125000,
    totalSpent: 85420,
    avgTransaction: 145,
    pendingRefunds: 3200,
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'top-up':
        return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case 'deduction':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'refund':
        return <RefreshCcw className="w-4 h-4 text-blue-500" />;
      case 'transfer':
        return <Wallet className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'top-up':
        return 'text-green-600';
      case 'deduction':
        return 'text-red-600';
      case 'refund':
        return 'text-blue-600';
      case 'transfer':
        return 'text-purple-600';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Digital Wallet System</h2>
          <p className="text-muted-foreground">Manage guest wallets and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-package-green hover:bg-package-light-green transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Money</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Loaded Today', 
            value: `₹${stats.totalLoaded.toLocaleString()}`, 
            change: '+18%',
            icon: Wallet,
            bg: 'bg-package-light-green'
          },
          { 
            label: 'Total Spent Today', 
            value: `₹${stats.totalSpent.toLocaleString()}`, 
            change: '+12%',
            icon: ArrowUpRight,
            bg: 'bg-package-light-blue'
          },
          { 
            label: 'Avg Transaction', 
            value: `₹${stats.avgTransaction}`, 
            change: '+5%',
            icon: RefreshCcw,
            bg: 'bg-package-light-gold'
          },
          { 
            label: 'Pending Refunds', 
            value: `₹${stats.pendingRefunds.toLocaleString()}`, 
            change: '3 requests',
            icon: RefreshCcw,
            bg: 'bg-package-light-red'
          },
        ].map((stat) => (
          <div key={stat.label} className={cn("rounded-2xl p-4 card-hover", stat.bg)}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-foreground/60" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className="text-xs text-green-600 font-medium">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-r from-package-green to-package-light-green rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-medium text-foreground/80 mb-1">Total Wallet Balance</p>
          <p className="text-4xl font-bold">₹{dashboardStats.walletBalanceTotal.toLocaleString()}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>1,156 active cards</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>₹212 avg balance</span>
            </div>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
          <img 
            src="/mascot-monkey.png" 
            alt="" 
            className="w-full h-full object-contain animate-float"
          />
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by guest name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted 
                  focus:bg-white focus:border-primary focus:outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="top-up">Top-up</option>
                <option value="deduction">Deduction</option>
                <option value="refund">Refund</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Time</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Guest</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Balance After</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((txn) => (
                <tr 
                  key={txn.id} 
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm">
                    {new Date(txn.timestamp).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-package-blue flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {txn.guestName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-sm">{txn.guestName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(txn.type)}
                      <span className="text-sm capitalize">{txn.type}</span>
                    </div>
                  </td>
                  <td className={cn("px-4 py-3 font-medium", getTransactionColor(txn.type))}>
                    {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ₹{txn.balanceAfter}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {txn.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} transactions
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
    </div>
  );
}
