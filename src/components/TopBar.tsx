import { Search, Bell, Menu } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';

interface TopBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  lastUpdated: string;
  placeholder?: string;
}

export default function TopBar({ currentScreen, onNavigate, lastUpdated, placeholder = "Search..." }: TopBarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'insights', label: 'AI Insights' },
  ] as const;

  const handleLinkClick = (id: Screen) => {
    let transition: TransitionType = 'none';
    if (currentScreen === 'insights' && id === 'dashboard') transition = 'push_back';
    if (currentScreen === 'risks' && id === 'dashboard') transition = 'push_back';
    if (currentScreen === 'risks' && id === 'insights') transition = 'push';
    
    // Default cases for other dashboard to risks/insights
    if (currentScreen === 'dashboard' && (id === 'risks' || id === 'insights')) transition = 'push';

    onNavigate(id, transition);
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/10 px-8 flex justify-between items-center">
      <div className="flex items-center gap-8 flex-1">
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id as Screen)}
                className={cn(
                  "text-sm font-medium px-3 py-1 transition-all rounded-lg",
                  isActive 
                    ? "text-primary font-bold border-b-2 border-primary rounded-none" 
                    : "text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 max-w-md relative group ml-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant transition-colors group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full bg-surface-container-low border-none rounded-xl py-2 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end mr-2">
           <span className="text-[9px] font-black text-outline uppercase tracking-[0.2em]">Telemetry Sync</span>
           <span className="text-[10px] font-bold text-on-surface-variant">{lastUpdated}</span>
        </div>
        <button className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors">
          <Bell className="w-5 h-5 text-on-surface-variant" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-on-surface leading-none">Admin User</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">Operations Lead</p>
          </div>
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-surface-container-highest object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
