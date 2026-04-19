import { useState } from 'react';
import { Sparkles, Bolt, Lightbulb, Loader2, ArrowRight } from 'lucide-react';
import { Screen, TransitionType } from '../types';
import { cn } from '../lib/utils';
import { generateSupplyChainInsights } from '../services/geminiService';

interface AIInsightsProps {
  onNavigate: (screen: Screen, transition: TransitionType) => void;
  simulation: any;
}

export default function AIInsights({ onNavigate, simulation }: AIInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const realInsights = await generateSupplyChainInsights(simulation);
      setInsights(realInsights);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <button 
            onClick={generateInsights}
            disabled={loading}
            className="relative px-12 py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-headline font-extrabold text-xl flex items-center gap-4 shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:scale-100"
          >
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Bolt className="w-8 h-8 fill-current" />}
            <span>{loading ? 'Analyzing Network...' : 'Generate AI Insights'}</span>
          </button>
          {!loading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-primary/20 scale-125 animate-ping opacity-20 pointer-events-none" />}
        </div>
        <p className="mt-8 text-on-surface-variant font-medium max-w-lg leading-relaxed">
          Scanning global logistics networks, weather patterns, and market fluctuations to predict your next move.
        </p>
        {error && (
          <div className="mt-6 bg-error/10 text-error px-6 py-3 rounded-2xl border border-error/20 flex items-center gap-2">
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}
      </section>

      {insights.length > 0 && (
        <>
          {/* Feed Header */}
          <header className="flex items-end justify-between">
            <div>
              <span className="text-secondary font-headline font-bold text-sm tracking-widest uppercase">Intelligence Feed</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mt-2">Smart Recommendations</h2>
            </div>
          </header>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.map((insight) => (
              <div 
                key={insight.id}
                className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border-l-4 border-secondary relative overflow-hidden group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary">
                    <Sparkles className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{insight.category}</span>
                    <h3 className="font-headline font-bold text-xl">{insight.title}</h3>
                  </div>
                </div>
                <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">{insight.desc}</p>
                
                <div className="glass-insight p-6 rounded-2xl border border-secondary/20 space-y-3 bg-secondary/5 mb-6">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-secondary fill-current" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-secondary">AI Strategy</span>
                  </div>
                  <p className="text-on-surface font-semibold text-base italic leading-relaxed">"{insight.suggestion}"</p>
                </div>

                <div className="flex justify-between items-center bg-surface-container-low px-4 py-3 rounded-xl">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">IMPACT SCORE: <span className="text-primary font-black ml-1">{insight.impact}</span></span>
                  <button className="text-primary font-bold text-sm flex items-center gap-2 group/btn">
                    Execute
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {insights.length === 0 && !loading && (
        <div className="text-center py-20 opacity-40">
           <Sparkles className="w-20 h-20 mx-auto mb-4" />
           <p className="font-headline font-bold text-xl">Click generate to start AI analysis</p>
        </div>
      )}

      {/* Footer Stats */}
      <footer className="pt-12 border-t border-outline-variant/10 grid grid-cols-2 md:grid-cols-4 gap-12">
        <Stat label="Confidence Score" value="94.2%" />
        <Stat label="Active Predictions" value="1,208" />
        <Stat label="Network Latency" value="24ms" />
        <Stat label="AI Status" value="Fully Optimized" active />
      </footer>
    </div>
  );
}

function Stat({ label, value, active }: any) {
  return (
    <div className="space-y-1">
      <p className="text-outline text-[10px] font-black uppercase tracking-widest">{label}</p>
      <div className="flex items-center gap-2">
        {active && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
        <p className={cn("text-3xl font-headline font-extrabold", active ? 'text-on-surface' : 'text-on-surface-variant')}>{value}</p>
      </div>
    </div>
  );
}
