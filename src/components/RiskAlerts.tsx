import { ShieldAlert, AlertCircle, CheckCircle2, Filter, Search, Map as MapIcon, Clock, ArrowRight, Zap } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';
import { MOCK_ALERTS } from '../services/mockData';

interface RiskAlertsProps {
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  simulation: any;
}

export default function RiskAlerts({ onNavigate, simulation }: RiskAlertsProps) {
  // Categorize alerts
  const highRisks = MOCK_ALERTS.filter(a => a.type === 'error' || simulation.delayHours > 20);
  const mediumRisks = MOCK_ALERTS.filter(a => a.type === 'secondary' || a.type === 'primary');
  const safeRisks = MOCK_ALERTS.filter(a => a.type === 'tertiary');

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Risk Pulse Monitor</h1>
          <p className="text-on-surface-variant text-xl leading-relaxed font-medium">
            Real-time intelligence mapping critical vulnerabilities across your Indian supply chain network.
          </p>
        </div>
        <div className="bg-surface-container-low px-6 py-3 rounded-2xl flex items-center gap-4 shadow-sm border border-outline-variant/10">
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Network Status:</span>
          <div className={cn("flex items-center gap-3 font-extrabold", simulation.delayHours > 10 ? 'text-error' : 'text-green-600')}>
            <span className="relative flex h-3 w-3">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", simulation.delayHours > 10 ? 'bg-error' : 'bg-green-500')} />
              <span className={cn("relative inline-flex rounded-full h-3 w-3 shadow-lg", simulation.delayHours > 10 ? 'bg-error shadow-error/40' : 'bg-green-500 shadow-green-500/40')} />
            </span>
            <span>{simulation.delayHours > 10 ? 'Attention Required' : 'Optimal'}</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* High Risk Column */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-error px-2">
            <ShieldAlert className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">High Risk</h2>
          </div>
          
          {highRisks.map(risk => (
            <RiskCard 
              key={risk.id}
              title={risk.title}
              desc={risk.desc}
              tag={risk.tag}
              type="error"
              icon={Zap}
              actionLabel="Mitigate"
              time={risk.time}
            />
          ))}
          {highRisks.length === 0 && <p className="text-center py-10 text-on-surface-variant opacity-40 italic">No critical risks detected</p>}
        </section>

        {/* Medium Risk Column */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-secondary px-2">
            <AlertCircle className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">Medium Risk</h2>
          </div>
          
          {mediumRisks.map(risk => (
            <RiskCard 
              key={risk.id}
              title={risk.title}
              desc={risk.desc}
              tag={risk.tag}
              type="secondary"
              icon={Zap}
              actionLabel="Analyze"
              time={risk.time}
            />
          ))}
        </section>

        {/* Safe Column */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-tertiary px-2">
            <CheckCircle2 className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">Safe</h2>
          </div>
          
          {safeRisks.map(risk => (
            <RiskCard 
              key={risk.id}
              title={risk.title}
              desc={risk.desc}
              tag={risk.tag}
              type="tertiary"
              icon={Zap}
              time={risk.time}
            />
          ))}
          
          {/* AI Insight Widget */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low/80 backdrop-blur-xl p-8 border border-white/40 shadow-xl group cursor-pointer" onClick={() => onNavigate('insights', 'push')}>
            <div className="absolute top-0 right-0 p-6">
              <Zap className="w-6 h-6 text-secondary animate-pulse fill-current" />
            </div>
            <h4 className="text-secondary font-black text-xs uppercase tracking-widest mb-6">AI Predictive Pulse</h4>
            <p className="text-on-surface font-bold text-lg leading-relaxed mb-8 italic">
              "Predicted resolution of NH48 delays within 4 hours. Recommend holding North shipments for consolidated dispatch."
            </p>
            <button className="bg-secondary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20">
              Generate Full Report
            </button>
          </div>
        </section>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        <FooterCard label="Active Alerts" value={MOCK_ALERTS.length.toString()} highlight="primary" />
        <FooterCard label="Resolved (24h)" value="142" highlight="tertiary" />
        <FooterCard label="System Health" value={(100 - simulation.delayHours / 10).toFixed(1) + "%"} highlight="on-surface" />
        <FooterCard label="Network Pulse" value={simulation.delayHours > 10 ? 'Unstable' : 'Optimal'} highlight="secondary" />
      </div>
    </div>
  );
}

function RiskCard({ title, desc, tag, type, icon: Icon, time, progress, threshold, actionLabel, location, users }: any) {
  const typeColors = {
    error: 'border-l-error text-error bg-error/10',
    secondary: 'border-l-secondary text-secondary bg-secondary/10',
    tertiary: 'border-l-tertiary text-tertiary bg-tertiary/10',
  }[type as keyof typeof typeColors];

  return (
    <div className={cn("bg-surface-container-lowest p-8 rounded-3xl shadow-sm border-l-4 transition-all hover:-translate-y-1 hover:shadow-xl group", typeColors.split(' ')[0])}>
       <div className="flex justify-between items-start mb-8">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", typeColors)}>
          <Icon className="w-7 h-7" />
        </div>
        <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg", typeColors)}>{tag}</span>
      </div>
      
      <h3 className="text-xl font-headline font-extrabold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-8">{desc}</p>
      
      {progress !== undefined ? (
        <div className="pt-8 border-t border-outline-variant/10 space-y-3">
          <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden shadow-inner">
            <div className={cn("h-full transition-all duration-1000", type === 'secondary' ? 'bg-secondary' : 'bg-primary')} style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
            <span>{progress}% Remaining</span>
            <span>Threshold: {threshold}%</span>
          </div>
        </div>
      ) : (
        <div className="pt-8 border-t border-outline-variant/10 flex justify-between items-center">
          {users ? (
            <div className="flex -space-x-3 items-center">
              {[1, 2].map((i) => (
                <img key={i} src={`https://picsum.photos/seed/cargo${i}/100/100`} className="w-9 h-9 rounded-full border-2 border-surface-container-lowest object-cover" referrerPolicy="no-referrer" />
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+{users}</div>
            </div>
          ) : location ? (
            <span className="text-[10px] font-black text-on-surface-variant flex items-center gap-2 uppercase tracking-widest">
               <MapIcon className="w-4 h-4" /> {location}
            </span>
          ) : (
            <span className="text-[10px] font-black text-on-surface-variant flex items-center gap-2 uppercase tracking-widest">
               <Clock className="w-4 h-4" /> {time}
            </span>
          )}
          
          {actionLabel && (
            <button className="text-primary font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
              {actionLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function FooterCard({ label, value, highlight }: any) {
  const textCol = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    'on-surface': 'text-on-surface',
  }[highlight as keyof typeof textCol];

  return (
    <div className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm transition-all hover:translate-x-1">
      <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">{label}</div>
      <div className={cn("text-4xl font-headline font-extrabold", textCol)}>{value}</div>
    </div>
  );
}
