// Animal Types
export interface Animal {
  id: string;
  name: string;
  species: string;
  channelId: string;
  zone: string;
  status: 'healthy' | 'under-care' | 'quarantine';
  age: number;
  qrCode: string;
  description?: string;
}

// Package Types
export type PackageType = 'blue' | 'green' | 'gold' | 'red';

export interface Package {
  id: string;
  name: string;
  type: PackageType;
  price: number;
  inclusions: {
    waterPark: boolean;
    rides: number | 'all';
    games: number | 'all';
    priorityQueue: boolean;
  };
  description: string;
  isActive: boolean;
}

// Guest Types
export interface Guest {
  id: string;
  rfidUid: string;
  name: string;
  avatar?: string;
  package: PackageType;
  walletBalance: number;
  ridesUsedToday: number;
  gamesPlayedToday: number;
  status: 'active' | 'paused' | 'expired';
  entryTime: string;
  phone?: string;
  email?: string;
  visitHistory?: VisitRecord[];
}

export interface VisitRecord {
  date: string;
  package: PackageType;
  totalSpent: number;
  ridesUsed: number;
  gamesPlayed: number;
}

// RFID Access Types
export interface AccessLog {
  id: string;
  timestamp: string;
  rfidUid: string;
  guestName: string;
  location: string;
  action: 'tap' | 'deduction' | 'upgrade';
  result: 'allowed' | 'denied' | 'auto-charge';
  amount?: number;
  message?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  timestamp: string;
  guestId: string;
  guestName: string;
  type: 'top-up' | 'deduction' | 'refund' | 'transfer';
  amount: number;
  balanceAfter: number;
  description: string;
  paymentMethod?: 'cash' | 'upi' | 'card';
}

// Ride & Game Types
export interface Attraction {
  id: string;
  name: string;
  category: 'water' | 'thrill' | 'kids' | 'game';
  type: 'ride' | 'game';
  status: 'active' | 'maintenance' | 'closed';
  allowedPackages: PackageType[];
  pricePerRide: number;
  queueTime: number;
  capacity: number;
  revenueToday: number;
  usageToday: number;
  image?: string;
  maintenanceSchedule?: string;
}

// Staff & Device Types
export interface StaffDevice {
  id: string;
  name: string;
  assignedTo: string;
  staffAvatar?: string;
  status: 'online' | 'offline' | 'low-battery';
  lastActivity: string;
  batteryLevel: number;
  transactionsToday: number;
}

export interface Kiosk {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'offline' | 'maintenance';
  transactionsToday: number;
  cashTransactions: number;
  cashlessTransactions: number;
  lastMaintenance: string;
}

// Dashboard Stats
export interface DashboardStats {
  guestsInside: number;
  todaysRevenue: number;
  rideUsageToday: number;
  activeRfidCards: number;
  walletBalanceTotal: number;
  pendingTopups: number;
}

// Analytics Types
export interface HourlyRevenue {
  hour: string;
  revenue: number;
}

export interface RideAnalytics {
  rideId: string;
  rideName: string;
  usageCount: number;
  revenue: number;
  denialCount: number;
}

export interface PackageDistribution {
  package: PackageType;
  count: number;
  percentage: number;
}

// Notification Types
export interface Notification {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}
