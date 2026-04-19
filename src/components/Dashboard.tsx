import { Package, Truck, AlertTriangle, TrendingUp, ChevronRight, Activity, Zap, Sparkles, Clock } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDynamicMonths, generateChartData, MOCK_ALERTS } from '../services/mockData';

interface DashboardProps {
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  simulation: {
    demandIncrease: number;
    delayHours: number;
    fuelPriceRise: number;
  };
}

export default function Dashboard({ onNavigate, simulation }: DashboardProps) {
  const months = getDynamicMonths(7);
  const chartData = generateChartData(months);

  const stockLevel = 120 + Math.floor(simulation.demandIncrease / 2);
  const deliveryStatus = Math.max(70, 94 - simulation.delayHours);
  const activeRisks = simulation.delayHours > 5 ? 5 : 2;

  return (
    <div className="space-y-8 pb-12">
      <header>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Supply Chain Health</h1>
            <p className="text-on-surface-variant font-medium mt-1">Command center for real-time supply chain intelligence.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Live System Connected</span>
            </div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-tight flex items-center gap-1">
              <Clock className="w-3 h-3" /> Updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Package} 
          label="STOCK LEVEL" 
          value={stockLevel.toString()} 
          unit="units" 
          trend={`+${simulation.demandIncrease}% predicted demand`}
          type="primary"
          tag="GLOBAL"
        />
        <StatCard 
          icon={Truck} 
          label="DELIVERY STATUS" 
          value={`${deliveryStatus}%`} 
          unit="On Time" 
          progress={deliveryStatus}
          type="secondary"
          tag="FLEET"
        />
        <StatCard 
          icon={AlertTriangle} 
          label="ACTIVE RISKS" 
          value={activeRisks.toString()} 
          unit="Urgent" 
          trend={simulation.delayHours > 2 ? "High delay risk detected" : "Stabilizing"} 
          type={activeRisks > 3 ? "error" : "primary"}
          tag="CRITICAL"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-3xl shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-headline font-bold text-on-surface">Regional Demand Trend</h2>
              <p className="text-on-surface-variant text-sm mt-1">Volume distribution across major India metros</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3525cd" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3525cd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#777587' }} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 800, color: '#131b2e' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3525cd" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold text-on-surface">Live Intelligence Logs</h2>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          <div className="space-y-4">
            {MOCK_ALERTS.map(alert => (
              <AlertItem 
                key={alert.id}
                variant={alert.type}
                title={alert.title}
                desc={alert.desc}
                tag={alert.tag}
                time={alert.time}
                icon={alert.type === 'error' ? Activity : Package}
              />
            ))}
          </div>
          
          <button 
            onClick={() => onNavigate('risks', 'push')}
            className="w-full py-4 bg-surface-container-low text-on-surface-variant font-bold rounded-2xl border border-outline-variant/10 hover:bg-surface-container-high transition-colors"
          >
            View All Critical Maps
          </button>
        </div>
      </div>

      {/* AI Suggestion Banner */}
      <div 
        className="relative overflow-hidden group bg-surface-container-lowest p-8 rounded-[2rem] shadow-xl shadow-primary/5 cursor-pointer"
        onClick={() => onNavigate('insights', 'push')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-[0.03]" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://picsum.photos/seed/ware/1600/900')] bg-cover bg-center mix-blend-overlay opacity-20 transition-transform group-hover:scale-110 duration-[2s]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wider text-primary">AI Optimization Suggestion</span>
            </div>
            <h2 className="text-2xl font-headline font-extrabold text-on-surface">Optimize the Maharashtra-Karnataka Corridor</h2>
            <p className="text-on-surface-variant max-w-xl text-lg font-medium">ChainPulse AI predicts a 22% reduction in fuel costs and 6h transit time improvement by rerouting through the Pune-Hubli bypass for the next 48 hours.</p>
          </div>
          
          <button className="whitespace-nowrap bg-surface-container-lowest text-on-surface font-bold px-8 py-4 rounded-2xl shadow-lg shadow-black/5 hover:-translate-y-1 transition-all border border-outline-variant/10">
            Apply Smart Route
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, trend, type, tag, progress }: any) {
  const colors = {
    primary: 'border-l-primary text-primary bg-primary/10',
    secondary: 'border-l-secondary text-secondary bg-secondary/10',
    error: 'border-l-error text-error bg-error/10',
  }[type as keyof typeof colors];

  return (
    <div className={cn(
      "bg-surface-container-lowest p-6 rounded-3xl shadow-sm border-l-4 transition-all hover:translate-x-1",
      colors.split(' ')[0]
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg", colors)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="tech-header">{tag}</span>
      </div>
      <div>
        <p className="tech-header mb-1">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter">{value}</h2>
          <span className="text-sm font-bold text-on-surface-variant font-mono">{unit}</span>
        </div>
        {progress !== undefined ? (
          <div className="mt-4 space-y-2">
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-secondary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className={cn("mt-4 flex items-center gap-1 text-xs font-bold", type === 'error' ? 'text-error' : 'text-green-600')}>
            {type !== 'error' && <TrendingUp className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

function AlertItem({ variant, title, desc, tag, time, icon: Icon }: any) {
  const borderCol = {
    primary: 'border-l-primary',
    secondary: 'border-l-secondary',
    error: 'border-l-error',
  }[variant as keyof typeof borderCol];

  return (
    <div className={cn("flex gap-4 items-start p-4 bg-surface-container-lowest rounded-2xl shadow-sm border-l-4 transition-all hover:translate-x-1", borderCol)}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", 
        variant === 'primary' ? 'bg-primary/10 text-primary' : 
        variant === 'secondary' ? 'bg-secondary/10 text-secondary' : 
        'bg-error/10 text-error'
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="font-bold text-on-surface text-sm">{title}</h4>
        <p className="text-on-surface-variant text-xs font-medium leading-relaxed">{desc}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="tech-header opacity-100">{tag}</span>
          <span className="text-[9px] font-mono font-bold text-on-surface-variant uppercase tracking-tighter">{time}</span>
        </div>
      </div>
    </div>
  );
}
