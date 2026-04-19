import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, TransitionType, NavigationState } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import AIInsights from './components/AIInsights';
import RiskAlerts from './components/RiskAlerts';
import DemandForecast from './components/DemandForecast';

const variants = {
  push: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  },
  push_back: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } },
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  },
  none: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  }
};

export default function App() {
  const [nav, setNav] = useState<NavigationState>({
    currentScreen: 'dashboard',
    transition: 'none'
  });

  // Simulation State
  const [simulation, setSimulation] = useState({
    demandIncrease: 20,
    delayHours: 4,
    fuelPriceRise: 5
  });

  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = (screen: Screen, transition: TransitionType = 'none') => {
    setNav({ currentScreen: screen, transition });
  };

  const renderScreen = useMemo(() => {
    switch (nav.currentScreen) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} simulation={simulation} />;
      case 'insights': return <AIInsights onNavigate={handleNavigate} simulation={simulation} />;
      case 'risks': return <RiskAlerts onNavigate={handleNavigate} simulation={simulation} />;
      case 'forecast': return <DemandForecast onNavigate={handleNavigate} simulation={simulation} setSimulation={setSimulation} />;
      default: return null;
    }
  }, [nav.currentScreen, simulation]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Sidebar currentScreen={nav.currentScreen} onNavigate={handleNavigate} />
      
      <main className="lg:pl-64 min-h-screen transition-all duration-500">
        <TopBar 
          currentScreen={nav.currentScreen}
          onNavigate={handleNavigate}
          lastUpdated={lastUpdated}
          placeholder={
            nav.currentScreen === 'risks' ? "Search risks..." : 
            nav.currentScreen === 'insights' ? "Search analytics..." : 
            "Search logistics nodes..."
          } 
        />
        
        <div className="pt-20 px-8 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={nav.currentScreen}
              initial={variants[nav.transition]?.initial}
              animate={variants[nav.transition]?.animate}
              exit={variants[nav.transition]?.exit}
              transition={variants[nav.transition]?.transition}
              className="py-12 min-h-full"
            >
              {renderScreen || <div>No screen selected</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest border-t border-outline-variant/10 flex justify-around items-center px-4 z-50">
        <button onClick={() => handleNavigate('dashboard', 'push_back')} className={`p-2 ${nav.currentScreen === 'dashboard' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => handleNavigate('forecast', 'push')} className={`p-2 ${nav.currentScreen === 'forecast' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">Forecast</span>
        </button>
        <button onClick={() => handleNavigate('risks', 'push')} className={`p-2 ${nav.currentScreen === 'risks' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">Risks</span>
        </button>
        <button onClick={() => handleNavigate('insights', 'push')} className={`p-2 ${nav.currentScreen === 'insights' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">AI</span>
        </button>
      </nav>
    </div>
  );
}
