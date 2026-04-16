import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  CreditCard,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'payments'>('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-package-blue text-foreground font-medium" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-border p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg">General Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Park Name</label>
                    <input 
                      type="text" 
                      defaultValue="WildWave Park"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Operating Hours - Open</label>
                      <input 
                        type="time" 
                        defaultValue="09:00"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Operating Hours - Close</label>
                      <input 
                        type="time" 
                        defaultValue="18:00"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all">
                      <option value="INR">₹ Indian Rupee (INR)</option>
                      <option value="USD">$ US Dollar (USD)</option>
                      <option value="EUR">€ Euro (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time Zone</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all">
                      <option value="IST">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">America/New_York (EST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg">Notification Templates</h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      id: 'low-balance', 
                      label: 'Low Balance Alert', 
                      message: 'Your wallet balance is low. Please top-up to continue enjoying rides!',
                      enabled: true 
                    },
                    { 
                      id: 'upgrade', 
                      label: 'Package Upgrade Offer', 
                      message: 'Upgrade to Gold Package and enjoy all rides + 5 games!',
                      enabled: true 
                    },
                    { 
                      id: 'deny', 
                      label: 'Ride Denial Message', 
                      message: 'This ride is included in Gold Package. Tap here to upgrade!',
                      enabled: true 
                    },
                    { 
                      id: 'thankyou', 
                      label: 'Thank You Message', 
                      message: 'Thank you for visiting WildWave Park! We hope you had a great time!',
                      enabled: false 
                    },
                  ].map((template) => (
                    <div key={template.id} className="p-4 bg-muted rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{template.label}</span>
                        <button 
                          className={cn(
                            "w-12 h-6 rounded-full transition-colors relative",
                            template.enabled ? "bg-green-500" : "bg-gray-300"
                          )}
                        >
                          <span className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                            template.enabled ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                      <textarea 
                        defaultValue={template.message}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:border-primary focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin logins</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-green-500 relative">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto logout after 30 minutes</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-green-500 relative">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-gray-300 relative">
                      <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Change Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted focus:bg-white focus:border-primary focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payments */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg">Payment Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">UPI Payments</p>
                        <p className="text-sm text-muted-foreground">Accept UPI payments</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-green-500 relative">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Card Payments</p>
                        <p className="text-sm text-muted-foreground">Accept credit/debit cards</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-green-500 relative">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Cash Payments</p>
                        <p className="text-sm text-muted-foreground">Accept cash at counters</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-green-500 relative">
                      <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Auto Top-up Threshold</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="50" 
                        max="500" 
                        defaultValue="100"
                        className="flex-1"
                      />
                      <span className="font-medium">₹100</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Suggest top-up when balance falls below this amount
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 pt-6 border-t border-border flex justify-end">
              <button 
                onClick={handleSave}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all",
                  saved 
                    ? "bg-green-500 text-white" 
                    : "bg-package-blue hover:bg-package-light-blue"
                )}
              >
                <Save className="w-4 h-4" />
                <span>{saved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl border border-border p-6 text-center max-w-sm">
          <img 
            src="/mascot-dolphin.png" 
            alt="" 
            className="w-24 h-24 mx-auto animate-float"
          />
          <p className="font-medium mt-2">Settings Guardian</p>
          <p className="text-sm text-muted-foreground">
            Keep your system configured for optimal performance!
          </p>
        </div>
      </div>
    </div>
  );
}
