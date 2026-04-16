import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'gold' | 'red';
  change?: number;
  changeLabel?: string;
  mascot?: string;
  delay?: number;
}

const colorClasses = {
  blue: 'from-[#c7e6f9] to-[#e6f4fd]',
  green: 'from-[#cbf39d] to-[#e8f5d6]',
  gold: 'from-[#f9f0c7] to-[#fdf6d6]',
  red: 'from-[#f8c7c7] to-[#fbe6e6]',
};

const iconColorClasses = {
  blue: 'text-[#1a5a7a]',
  green: 'text-[#3d5a1a]',
  gold: 'text-[#7a5a1a]',
  red: 'text-[#7a1a1a]',
};

export function StatsCard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '',
  icon: Icon, 
  color, 
  change, 
  changeLabel = 'vs yesterday',
  mascot,
  delay = 0 
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatValue = (val: number) => {
    if (val >= 100000) {
      return (val / 100000).toFixed(1) + 'L';
    } else if (val >= 1000) {
      return (val / 1000).toFixed(val >= 10000 ? 1 : 0) + 'K';
    }
    return val.toLocaleString();
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br transition-all duration-400 stats-card-hover",
        colorClasses[color],
        !isVisible && "opacity-0 translate-y-4",
        isVisible && "opacity-100 translate-y-0 animate-slide-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Icon */}
      <div className="absolute top-3 right-3 opacity-20">
        <Icon className={cn("w-12 h-12", iconColorClasses[color])} />
      </div>

      {/* Mascot */}
      {mascot && (
        <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-30 animate-float">
          <img src={mascot} alt="" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-medium text-foreground/80 mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl lg:text-3xl font-bold text-foreground">
            {prefix}{formatValue(displayValue)}{suffix}
          </span>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded-full",
              change >= 0 ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
            )}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-foreground/60">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
