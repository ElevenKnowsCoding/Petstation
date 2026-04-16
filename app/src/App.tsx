import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardOverview } from '@/sections/DashboardOverview';
import { GuestManagement } from '@/sections/GuestManagement';
import { RFIDAccessControl } from '@/sections/RFIDAccessControl';
import { DigitalWallet } from '@/sections/DigitalWallet';
import { PackagesPricing } from '@/sections/PackagesPricing';
import { RideGameManagement } from '@/sections/RideGameManagement';
import { StaffKiosks } from '@/sections/StaffKiosks';
import { AnalyticsReports } from '@/sections/AnalyticsReports';
import { AnimalsManagement } from '@/sections/AnimalsManagement';
import { Settings } from '@/sections/Settings';
import { cn } from '@/lib/utils';
import './App.css';

const sectionTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of park operations' },
  guests: { title: 'Guest Management', subtitle: 'Manage guests and RFID cards' },
  access: { title: 'RFID Access Control', subtitle: 'Real-time access monitoring' },
  wallet: { title: 'Digital Wallet', subtitle: 'Wallet and transaction management' },
  packages: { title: 'Packages & Pricing', subtitle: 'Configure packages and pricing' },
  rides: { title: 'Ride & Game Management', subtitle: 'Manage attractions' },
  staff: { title: 'Staff & Kiosks', subtitle: 'Device and kiosk management' },
  analytics: { title: 'Analytics & Reports', subtitle: 'Insights and metrics' },
  animals: { title: 'Channel Build Toucan', subtitle: 'Manage toucans and QR codes' },
  settings: { title: 'Settings', subtitle: 'System configuration' },
};

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Set initial collapsed state based on screen size
  useEffect(() => {
    setSidebarCollapsed(window.innerWidth < 1024);
  }, []);

  // Close mobile menu when section changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'guests':
        return <GuestManagement />;
      case 'access':
        return <RFIDAccessControl />;
      case 'wallet':
        return <DigitalWallet />;
      case 'packages':
        return <PackagesPricing />;
      case 'rides':
        return <RideGameManagement />;
      case 'staff':
        return <StaffKiosks />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'animals':
        return <AnimalsManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  const { title, subtitle } = sectionTitles[activeSection] || sectionTitles.dashboard;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={(section) => { setActiveSection(section); setMobileMenuOpen(false); }}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
      />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        <Header 
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          showMobileMenu={mobileMenuOpen}
        />
        
        <div className="p-4 lg:p-6">
          {renderSection()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border lg:hidden z-30">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'dashboard', icon: '🏠', label: 'Home' },
            { id: 'guests', icon: '👥', label: 'Guests' },
            { id: 'wallet', icon: '💳', label: 'Wallet' },
            { id: 'analytics', icon: '📊', label: 'Stats' },
            { id: 'settings', icon: '⚙️', label: 'More' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                activeSection === item.id 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Floating Mascot (Desktop only) */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="relative group">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-border 
            flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <img 
              src="/mascot-dolphin.png" 
              alt="Help" 
              className="w-12 h-12 object-contain animate-float"
            />
          </div>
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl border border-border 
            shadow-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <p className="text-sm font-medium">Need help?</p>
            <p className="text-xs text-muted-foreground">Click for assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
