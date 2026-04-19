import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CITIES = [
  { name: 'Delhi', x: 200, y: 150, severity: 'Medium' },
  { name: 'Mumbai', x: 120, y: 400, severity: 'High' },
  { name: 'Bangalore', x: 220, y: 550, severity: 'Safe' },
  { name: 'Hyderabad', x: 250, y: 450, severity: 'Medium' },
  { name: 'Chennai', x: 280, y: 560, severity: 'Safe' },
  { name: 'Kolkata', x: 450, y: 300, severity: 'Safe' },
];

export default function IndiaMap({ simulation }: { simulation: any }) {
  // Severity adjustments based on simulation
  const getSeverityColor = (base: string) => {
    if (simulation.delayHours > 20) return 'stroke-error animate-pulse';
    if (base === 'High') return 'stroke-error';
    if (base === 'Medium') return 'stroke-secondary';
    return 'stroke-green-500';
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center bg-surface-container-low rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-inner">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)]" />
      </div>

      <svg 
        viewBox="0 0 600 800" 
        className="w-full h-full max-h-[500px] drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))' }}
      >
        {/* Simplified India Outline (Symbolic) */}
        <path
          d="M200,50 L350,150 L450,200 L500,350 L450,500 L350,650 L250,750 L150,650 L50,500 L100,350 L120,200 Z"
          className="fill-surface-container-highest/20 stroke-outline-variant stroke-2"
          strokeLinejoin="round"
        />

        {/* Pulse Connections (Symbolic Routes) */}
        <motion.path
          d="M200,150 Q250,270 120,400" // Delhi -> Mumbai
          className="fill-none stroke-primary/30 stroke-dashed stroke-2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M120,400 Q200,420 250,450" // Mumbai -> Hyd
          className="fill-none stroke-secondary/30 stroke-dashed stroke-2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* City Pulsers */}
        {CITIES.map((city, i) => (
          <g key={city.name} className="group cursor-pointer">
            <motion.circle
              cx={city.x}
              cy={city.y}
              r="12"
              className={cn("fill-none stroke-2", getSeverityColor(city.severity))}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <circle
              cx={city.x}
              cy={city.y}
              r="4"
              className={cn("fill-current", city.severity === 'High' ? 'text-error' : city.severity === 'Medium' ? 'text-secondary' : 'text-green-500')}
            />
            
            {/* Tooltip on Hover (Symbolic) */}
            <foreignObject x={city.x + 10} y={city.y - 20} width="100" height="40" className="hidden group-hover:block pointer-events-none">
              <div className="bg-surface-container-highest px-3 py-1 rounded-lg shadow-xl border border-outline-variant/30">
                <p className="text-[10px] font-black text-white uppercase">{city.name}</p>
                <p className="text-[8px] font-bold text-outline uppercase">{city.severity} Risk</p>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>

      <div className="absolute top-8 left-8 space-y-2">
        <h3 className="text-sm font-black text-on-surface uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 bg-primary animate-ping rounded-full" />
          Neural Heatmap
        </h3>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Global Route Pulse Status</p>
      </div>
      
      <div className="absolute bottom-8 right-8 flex gap-4">
        <LegendItem color="bg-error" label="High Risk" />
        <LegendItem color="bg-secondary" label="Warning" />
        <LegendItem color="bg-green-500" label="Optimal" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[9px] font-black text-outline uppercase tracking-wider">{label}</span>
    </div>
  );
}
