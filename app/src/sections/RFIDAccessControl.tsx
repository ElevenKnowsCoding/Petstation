import { useState, useEffect } from 'react';
import { 
  Wifi, 
  CheckCircle2, 
  XCircle, 
  CreditCard,
  RefreshCw,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { accessLogs } from '@/data/mockData';
import type { AccessLog } from '@/types';

export function RFIDAccessControl() {
  const [logs, setLogs] = useState<AccessLog[]>(accessLogs);
  const [isLive, setIsLive] = useState(true);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // In real app, this would fetch new logs
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getResultIcon = (result: AccessLog['result']) => {
    switch (result) {
      case 'allowed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'auto-charge':
        return <CreditCard className="w-5 h-5 text-blue-500" />;
    }
  };

  const getResultClass = (result: AccessLog['result']) => {
    switch (result) {
      case 'allowed':
        return 'bg-green-50 border-green-200';
      case 'denied':
        return 'bg-red-50 border-red-200';
      case 'auto-charge':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const rules = [
    {
      id: 'rule-1',
      name: 'Package Inclusion Check',
      condition: 'IF ride ∈ package → allow',
      active: true,
      color: 'green',
    },
    {
      id: 'rule-2',
      name: 'Wallet Auto-Deduct',
      condition: 'ELSE IF wallet ≥ price → deduct + allow',
      active: true,
      color: 'blue',
    },
    {
      id: 'rule-3',
      name: 'Soft Deny Message',
      condition: 'ELSE → deny + friendly message',
      active: true,
      color: 'red',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">RFID Access Control</h2>
          <p className="text-muted-foreground">Real-time access monitoring and rule engine</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
              isLive ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-white animate-pulse" : "bg-current")} />
            <span className="text-sm font-medium">{isLive ? 'Live' : 'Paused'}</span>
          </button>
          <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Scans', value: '3,892', change: '+12%', icon: Wifi },
          { label: 'Allowed', value: '3,456', change: '+8%', icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Auto-Charged', value: '312', change: '+15%', icon: CreditCard, color: 'text-blue-500' },
          { label: 'Denied', value: '124', change: '-5%', icon: XCircle, color: 'text-red-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-border p-4 card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className={cn(
              "text-xs",
              stat.change.startsWith('+') ? "text-green-500" : "text-red-500"
            )}>
              {stat.change} vs yesterday
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Access Log */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wifi className="w-5 h-5" />
                {isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
              <h3 className="font-bold">Live Access Log</h3>
            </div>
            <button 
              onClick={() => setLogs(accessLogs)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {logs.map((log, index) => (
              <div 
                key={log.id}
                className={cn(
                  "flex items-center gap-4 p-4 border-b border-border last:border-0 transition-all",
                  getResultClass(log.result),
                  index === 0 && isLive && "animate-slide-in"
                )}
              >
                {getResultIcon(log.result)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-white/50 px-1.5 py-0.5 rounded">{log.rfidUid}</code>
                    <span className="text-sm font-medium truncate">{log.guestName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {log.location} • {log.action}
                  </p>
                  {log.message && (
                    <p className="text-xs text-red-600 mt-1">{log.message}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(log.timestamp).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                  {log.amount && (
                    <p className="text-xs text-blue-600 font-medium">₹{log.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Engine */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold">Access Rules Engine</h3>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <div 
                  key={rule.id}
                  onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 cursor-pointer transition-all",
                    selectedRule === rule.id 
                      ? "border-primary bg-package-light-blue" 
                      : "border-transparent bg-muted hover:bg-muted/80"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{rule.name}</span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      rule.active ? "bg-green-500" : "bg-gray-400"
                    )} />
                  </div>
                  <code className="text-xs block bg-white/50 p-2 rounded">
                    {rule.condition}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-br from-package-blue to-package-light-blue rounded-2xl p-4">
            <h3 className="font-bold mb-2">System Performance</h3>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">45<span className="text-lg">ms</span></p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
              <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-green-500 rounded-full" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Target: &lt;100ms • Status: Excellent
            </p>
          </div>

          {/* Mascot */}
          <div className="bg-white rounded-2xl border border-border p-4 text-center">
            <img 
              src="/mascot-tiger.png" 
              alt="" 
              className="w-24 h-24 mx-auto animate-float"
            />
            <p className="text-sm font-medium mt-2">Access Control Guardian</p>
            <p className="text-xs text-muted-foreground">Keeping your park secure!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
