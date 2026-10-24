import React from 'react';
import { QrCode, ListFilter, BarChart3, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenQr: () => void;
  onOpenDirectory: () => void;
  onOpenStats: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDesktopFrame: boolean;
  onToggleDesktopFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQr,
  onOpenDirectory,
  onOpenStats,
  soundEnabled,
  onToggleSound,
  isDesktopFrame,
  onToggleDesktopFrame,
}) => {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 shrink-0">
      <div className="flex items-center justify-between gap-2">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20 shrink-0 tracking-tighter">
            D
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-sm sm:text-base text-white tracking-tight truncate">
                DIPS Computers
              </h1>
              <span className="text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25 px-1.5 py-0.5 rounded-md">
                CSC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              शिरपूर जैन · गुगल रिव्ह्यू ऑटोमेशन
            </p>
          </div>
        </div>

        {/* Quick Icon Tools */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl transition-colors ${
              soundEnabled
                ? 'text-blue-400 bg-slate-800 hover:bg-slate-700'
                : 'text-slate-500 bg-slate-900 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'आवाज चालू' : 'आवाज बंद'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Directory Search Button */}
          <button
            onClick={onOpenDirectory}
            className="p-2 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            title="सर्व ३०० रिव्ह्यूज शोधा"
            aria-label="Review Directory"
          >
            <ListFilter className="w-4 h-4" />
          </button>

          {/* QR Button */}
          <button
            onClick={onOpenQr}
            className="p-2 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            title="काउंटर QR कोड"
            aria-label="Counter QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Stats Button */}
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
            title="रिव्ह्यू प्रगती व आकडेवारी"
            aria-label="Progress Stats"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Desktop Frame Toggle (hidden on small viewports) */}
          <button
            onClick={onToggleDesktopFrame}
            className="hidden md:flex p-2 rounded-xl text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
            title={isDesktopFrame ? 'मोबाईल फ्रेम बंद करा' : 'मोबाईल फ्रेम चालू करा'}
            aria-label="Toggle Mobile Frame"
          >
            {isDesktopFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
