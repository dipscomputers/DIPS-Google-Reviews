import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Smartphone } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isDesktopFrame: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, isDesktopFrame }) => {
  const [time, setTime] = useState<string>('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sm:py-6 sm:px-4">
      {/* Container logic: On mobile (small screens), always 100% width. On desktop, either iPhone frame or full mobile container */}
      <div
        className={`w-full transition-all duration-300 ${
          isDesktopFrame
            ? 'max-w-[430px] sm:my-auto sm:border-[10px] sm:border-slate-800 sm:rounded-[48px] sm:shadow-[0_0_60px_-15px_rgba(0,0,0,0.9)] sm:ring-1 sm:ring-slate-700/50 overflow-hidden relative bg-slate-900'
            : 'max-w-[460px] sm:my-auto sm:border sm:border-slate-800 sm:rounded-3xl sm:shadow-2xl overflow-hidden relative bg-slate-900'
        }`}
      >
        {/* Mobile Status Bar (Visible in Frame mode or for authentic mobile vibe) */}
        {isDesktopFrame && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 text-slate-300 text-[11px] font-semibold bg-slate-900 select-none shrink-0">
            {/* Left Clock */}
            <span className="tabular-nums font-bold tracking-tight">{time}</span>

            {/* Dynamic Island / Speaker notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2 gap-1.5 border border-slate-800/80">
              <div className="w-2 h-2 rounded-full bg-blue-500/80" />
            </div>

            {/* Right Icons: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] tabular-nums">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* Inner App Content */}
        <div className="flex flex-col min-h-screen sm:min-h-[780px] max-h-none sm:max-h-[880px] overflow-y-auto">
          {children}
        </div>

        {/* Home Indicator Bar (for frame mode) */}
        {isDesktopFrame && (
          <div className="hidden sm:flex justify-center pb-2 pt-1 bg-slate-900 shrink-0">
            <div className="w-32 h-1 bg-slate-700 rounded-full" />
          </div>
        )}
      </div>

      {/* Desktop helper caption */}
      <div className="hidden md:flex items-center gap-2 mt-3 text-xs text-slate-500">
        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
        <span>मोबाईल व्ह्यू मोड (Mobile Screen Simulation) · DIPS Reviews Automation</span>
      </div>
    </div>
  );
};
