import { TrendingUp, Sparkles, Map as MapIcon, ChevronRight, Zap, Target, Box, Activity, Wind, Sliders } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDynamicMonths, generateChartData } from '../services/mockData';
import IndiaMap from './IndiaMap';

interface DemandForecastProps {
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  simulation: {
    demandIncrease: number;
    delayHours: number;
    fuelPriceRise: number;
  };
  setSimulation: (sim: any) => void;
}

export default function DemandForecast({ onNavigate, simulation, setSimulation }: DemandForecastProps) {
  const months = getDynamicMonths(6);
  const chartData = generateChartData(months);

  // Apply simulation effect to chart
  const simulatedData = chartData.map(d => ({
    ...d,
    value: Math.floor(d.value * (1 + (simulation.demandIncrease / 100)))
  }));

  return (
    <div className="space-y-12 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <span className="text-primary font-headline font-bold text-sm tracking-widest uppercase">Intelligence Layer</span>
          <h1 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface">Demand Forecast</h1>
          <p className="text-on-surface-variant text-xl leading-relaxed font-medium max-w-2xl">
            Leveraging neural networks to predict supply chain volatility across multi-regional distribution hubs.
          </p>
        </div>
      </header>

      {/* Simulation Controls */}
      <div className="bg-surface-container-low p-8 rounded-[2.5rem] shadow-inner border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-8">
          <Sliders className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-black text-on-surface uppercase tracking-[0.2em]">Forecasting Sandbox</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Demand Increase (%)</label>
              <span className="text-primary font-black">{simulation.demandIncrease}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={simulation.demandIncrease} 
              onChange={(e) => setSimulation({...simulation, demandIncrease: parseInt(e.target.value)})}
              className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Potential Delay (Hours)</label>
              <span className="text-secondary font-black">{simulation.delayHours}h</span>
            </div>
            <input 
              type="range" min="0" max="48" 
              value={simulation.delayHours} 
              onChange={(e) => setSimulation({...simulation, delayHours: parseInt(e.target.value)})}
              className="w-full accent-secondary h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Fuel Surcharge Increase (%)</label>
              <span className="text-tertiary font-black">{simulation.fuelPriceRise}%</span>
            </div>
            <input 
              type="range" min="0" max="50" 
              value={simulation.fuelPriceRise} 
              onChange={(e) => setSimulation({...simulation, fuelPriceRise: parseInt(e.target.value)})}
              className="w-full accent-tertiary h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-10 rounded-[3rem] shadow-sm space-y-10 border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">30-Day Predictive Demand Forecast</h2>
              <p className="text-outline text-sm font-medium tracking-tight">Units in 1,000s — Adjusted for {simulation.demandIncrease}% growth</p>
            </div>
          </div>
          
          <div className="h-[400px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulatedData}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3525cd" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3525cd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#131b2e' }} 
                  dy={15}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 800, color: '#131b2e' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3525cd" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Column */}
        <div className="lg:col-span-4 space-y-10">
           <div className="space-y-8">
              <h2 className="text-2xl font-headline font-bold text-on-surface">Regional Growth Forecasts</h2>
              <div className="space-y-6">
                <GrowthCard city="Hyderabad" trend="+25%" sub="Tech Hub Delta" progress={85} />
                <GrowthCard city="Bangalore" trend="+18%" sub="E-commerce Surge" progress={65} />
                <GrowthCard city="Delhi" trend="+12%" sub="Retail Peak" progress={45} />
              </div>
           </div>

           {/* Map Widget */}
           <IndiaMap simulation={simulation} />
        </div>

        {/* Allocation Alert (Bottom Wide) */}
        <div className="lg:col-span-12 glass-insight p-10 rounded-[3rem] border border-white/60 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary shrink-0 shadow-inner">
             <Zap className="w-10 h-10 fill-current" />
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Smart Allocation Alert</h3>
              <p className="text-on-surface-variant font-medium text-lg max-w-2xl leading-relaxed">
                Demand expected to increase by <span className="text-secondary font-bold">25% in Hyderabad</span> next week due to upcoming festive season.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">Suggestion</span>
               <p className="text-on-surface-variant text-sm font-bold italic">Reallocate stock from <span className="text-on-surface">Pune hub</span> to mitigate potential stockouts.</p>
            </div>
          </div>
          <button className="whitespace-nowrap bg-on-surface text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-on-surface/20">
            Execute Move
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <MetricBox icon={Box} label="Inventory Velocity" value="1.4x" sub="Faster than prev. month" />
         <MetricBox icon={Activity} label="Lead Time Accuracy" value="98.2%" sub="AI confidence score" />
         <MetricBox icon={Wind} label="CO2 Impact Delta" value="-14%" sub="Via optimized routing" green />
      </div>
    </div>
  );
}

function GrowthCard({ city, trend, sub, progress }: any) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10 space-y-4 transition-all hover:translate-x-1">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-bold text-on-surface tracking-tight">{city}</h4>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{sub}</p>
        </div>
        <span className="text-2xl font-headline font-black text-primary">{trend}</span>
      </div>
      <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden shadow-inner">
         <div className="bg-primary h-full transition-all duration-[2s] delay-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function MetricBox({ icon: Icon, label, value, sub, green }: any) {
  return (
    <div className="bg-surface-container-low p-8 rounded-[2.5rem] space-y-4 group hover:bg-surface-container-high transition-colors">
      <div className="flex items-center gap-3 text-primary">
         <Icon className="w-6 h-6" />
         <span className="tech-header opacity-100">{label}</span>
      </div>
      <div>
        <div className={cn("text-4xl font-headline font-extrabold tracking-tighter", green ? 'text-green-600' : 'text-on-surface')}>{value}</div>
        <p className="text-[10px] font-mono font-bold text-on-surface-variant mt-1 uppercase tracking-tight">{sub}</p>
      </div>
    </div>
  );
}
