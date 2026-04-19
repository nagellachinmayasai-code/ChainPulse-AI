import { ShieldAlert, AlertCircle, CheckCircle2, Map as MapIcon, Clock, ArrowRight, Zap } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';
import { MOCK_ALERTS } from '../services/mockData';

interface RiskAlertsProps {
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  simulation: any;
}

export default function RiskAlerts({ onNavigate, simulation }: RiskAlertsProps) {

  // ✅ FIXED: Proper categorization (NO duplicates)
  const highRisks = MOCK_ALERTS.filter(a => a.type === 'error');
  const mediumRisks = MOCK_ALERTS.filter(a => a.type === 'secondary' || a.type === 'primary');
  const safeRisks = MOCK_ALERTS.filter(a => a.type === 'tertiary');

  return (
    <div className="space-y-12 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">
            Risk Pulse Monitor
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed font-medium">
            Real-time intelligence mapping critical vulnerabilities across your Indian supply chain network.
          </p>
        </div>

        <div className="bg-surface-container-low px-6 py-3 rounded-2xl flex items-center gap-4 shadow-sm border border-outline-variant/10">
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
            Network Status:
          </span>

          <div className={cn(
            "flex items-center gap-3 font-extrabold",
            simulation.delayHours > 10 ? 'text-error' : 'text-green-600'
          )}>
            <span className="relative flex h-3 w-3">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                simulation.delayHours > 10 ? 'bg-error' : 'bg-green-500'
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                simulation.delayHours > 10 ? 'bg-error' : 'bg-green-500'
              )} />
            </span>
            <span>{simulation.delayHours > 10 ? 'Attention Required' : 'Optimal'}</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* HIGH RISK */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-error px-2">
            <ShieldAlert className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">High Risk</h2>
          </div>

          {highRisks.map(risk => (
            <RiskCard key={risk.id} {...risk} type="error" actionLabel="Mitigate" />
          ))}
        </section>

        {/* MEDIUM RISK */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-secondary px-2">
            <AlertCircle className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">Medium Risk</h2>
          </div>

          {mediumRisks.map(risk => (
            <RiskCard key={risk.id} {...risk} type="secondary" actionLabel="Analyze" />
          ))}
        </section>

        {/* SAFE */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-tertiary px-2">
            <CheckCircle2 className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">Safe</h2>
          </div>

          {safeRisks.map(risk => (
            <RiskCard key={risk.id} {...risk} type="tertiary" />
          ))}

          {/* AI CARD */}
          <div
            className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low p-8 border border-outline-variant/10 shadow-xl cursor-pointer"
            onClick={() => onNavigate('insights', 'push')}
          >
            <Zap className="w-6 h-6 text-secondary mb-4" />

            <h4 className="text-secondary font-black text-xs uppercase tracking-widest mb-4">
              AI Predictive Pulse
            </h4>

            <p className="text-on-surface font-bold text-lg leading-relaxed mb-6 italic">
              "Predicted resolution of NH48 delays within 4 hours. Recommend holding shipments."
            </p>

            <button className="bg-secondary text-white text-xs font-bold px-5 py-2 rounded-xl">
              Generate Full Report
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- CARD ---------- */

function RiskCard({ title, desc, tag, type, time, actionLabel }: any) {

  const typeColors = {
    error: 'border-l-error text-error bg-error/10',
    secondary: 'border-l-secondary text-secondary bg-secondary/10',
    tertiary: 'border-l-tertiary text-tertiary bg-tertiary/10',
  }[type];

  return (
    <div className={cn(
      "bg-surface-container-lowest p-6 rounded-3xl border-l-4 shadow-sm hover:-translate-y-1 transition-all",
      typeColors.split(' ')[0]
    )}>

      <div className="flex justify-between mb-4">
        <span className={cn("text-xs font-bold px-2 py-1 rounded", typeColors)}>
          {tag}
        </span>
        <span className="text-xs text-on-surface-variant">{time}</span>
      </div>

      <h3 className="font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-variant mb-4">{desc}</p>

      {actionLabel && (
        <button className="text-primary text-xs font-bold flex items-center gap-1">
          {actionLabel} <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
