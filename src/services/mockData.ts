import { format, subMonths, startOfMonth } from 'date-fns';

export const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

export const getDynamicMonths = (count: number = 6) => {
  const months = [];
  for (let i = count - 1; i >= 0; i--) {
    months.push(format(subMonths(new Date(), i), 'MMM yy'));
  }
  return months;
};

export const generateChartData = (months: string[]) => {
  return months.map(month => ({
    name: month,
    value: Math.floor(Math.random() * 500) + 200,
    secondary: Math.floor(Math.random() * 300) + 100,
  }));
};

export const MOCK_ALERTS = [
  {
    id: 1,
    title: 'Traffic delay on NH48',
    desc: 'Mumbai → Hyderabad route (est. +4h)',
    tag: 'URGENT',
    type: 'error',
    time: '12 min ago'
  },
  {
    id: 2,
    title: 'Low stock alert: Chennai Central',
    desc: 'Warehouse (15% below safety threshold)',
    tag: 'INVENTORY',
    type: 'secondary',
    time: '45 min ago'
  },
  {
    id: 3,
    title: 'Monsoon Warning: West Coast',
    desc: 'Heavy rain impacting Mumbai-Goa corridor',
    tag: 'WEATHER',
    type: 'primary',
    time: '2h ago'
  },
  {
    id: 4,
    title: 'Fuel Price Update: Delhi NCR',
    desc: 'Diesel prices rose by ₹1.2/L impacting overheads',
    tag: 'FINANCE',
    type: 'tertiary',
    time: '3h ago'
  }
];

export const MOCK_INSIGHTS = [
  {
    id: 'i1',
    category: 'Inventory',
    title: 'Chennai Demand Spike',
    desc: 'Demand rising in Chennai. High probability of stockout within 72 hours.',
    suggestion: 'Increase production run for SKU-402 by 15% and prioritize overnight shipping to South Hub.',
    impact: 'Avoids ₹12L in lost sales'
  },
  {
    id: 'i2',
    category: 'Risk',
    title: 'Mumbai Delay Mitigation',
    desc: 'Predicted monsoon delay in Mumbai hub operations.',
    suggestion: 'Switch to Rail transport for Delhi-Mumbai route for the next 48 hours.',
    impact: 'Reduces transit risk by 40%'
  },
  {
    id: 'i3',
    category: 'Cost',
    title: 'NCR Consolidation',
    desc: 'Fuel prices stabilized in NCR. Current overhead is 14% higher than regional average.',
    suggestion: 'Consolidate smaller shipments into larger carriers for ₹4.5L monthly saving.',
    impact: '12% direct cost saving'
  }
];

export const getIndiaScenario = () => {
  const scenarios = [
    { city: 'Bangalore', type: 'Traffic', severity: 'Medium', desc: 'Outer Ring Road congestion affecting micro-hubs.' },
    { city: 'Mumbai', type: 'Weather', severity: 'High', desc: 'Heavy monsoon rains expected to flood low-lying rail tracks.' },
    { city: 'Delhi', type: 'Policy', severity: 'Medium', desc: 'New emission norms restricting truck movement between 8 AM - 8 PM.' },
    { city: 'Hyderabad', type: 'Demand', severity: 'Safe', desc: 'Optimal flow across all distribution corridors.' }
  ];
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};
