import { LayoutDashboard, TrendingUp, AlertTriangle, Sparkles, Plus, Box } from 'lucide-react';
import { Screen, TransitionType } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen, transition: TransitionType) => void;
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
    { id: 'risks', label: 'Risk Alerts', icon: AlertTriangle },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface-container-low border-r border-outline-variant/10 flex flex-col hidden lg:flex">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-lg text-on-surface leading-tight">ChainPulse AI</h1>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none mt-1">Command Center</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          let transition: TransitionType = 'none';
          if (currentScreen === 'dashboard') {
            if (item.id === 'risks' || item.id === 'insights') transition = 'push';
            if (item.id === 'forecast') transition = 'none';
          } else if (currentScreen === 'risks') {
            if (item.id === 'dashboard') transition = 'push_back';
            if (item.id === 'insights') transition = 'push';
          } else if (currentScreen === 'insights') {
            if (item.id === 'dashboard') transition = 'push_back';
            if (item.id === 'risks') transition = 'push';
          }

          const handleClick = () => {
            let transition: TransitionType = 'none';

            if (currentScreen === 'dashboard') {
              if (item.id === 'risks' || item.id === 'insights') transition = 'push';
            } else if (currentScreen === 'risks') {
              if (item.id === 'dashboard') transition = 'push_back';
              if (item.id === 'insights') transition = 'push';
            } else if (currentScreen === 'insights') {
              if (item.id === 'dashboard') transition = 'push_back';
              if (item.id === 'risks') transition = 'push';
            } else if (currentScreen === 'forecast') {
              if (item.id !== 'forecast') transition = 'push';
            }

            if (currentScreen === 'forecast' && item.id === 'forecast') {
              onNavigate('dashboard', 'none');
            } else {
              onNavigate(item.id as Screen, transition);
            }
          };

          return (
            <button
              key={item.id}
              onClick={handleClick}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-surface-container-highest text-primary font-bold shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="bg-surface-container-high rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="tech-header opacity-100">AI KERNEL</span>
            <span className="text-[8px] font-mono text-green-500 animate-pulse uppercase">Online</span>
          </div>
          <div className="space-y-1">
             <div className="flex justify-between text-[9px] font-mono text-outline">
                <span>LATENCY</span>
                <span className="text-on-surface">12ms</span>
             </div>
             <div className="flex justify-between text-[9px] font-mono text-outline">
                <span>ACCURACY</span>
                <span className="text-on-surface">99.4%</span>
             </div>
          </div>
        </div>
        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>New Shipment</span>
        </button>
      </div>
    </aside>
  );
}
