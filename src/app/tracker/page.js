'use client';

import { Activity, Moon, Utensils, Zap, Smartphone, Bluetooth, CheckCircle2 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

export default function TrackerPage() {
  const stepsData = [
    { day: 'Mon', steps: 6000 },
    { day: 'Tue', steps: 8500 },
    { day: 'Wed', steps: 4200 },
    { day: 'Thu', steps: 10000 },
    { day: 'Fri', steps: 7800 },
    { day: 'Sat', steps: 12000 },
    { day: 'Sun', steps: 5000 },
  ];

  const sleepData = [
    { day: 'Mon', hours: 7.2 },
    { day: 'Tue', hours: 6.5 },
    { day: 'Wed', hours: 8.0 },
    { day: 'Thu', hours: 7.8 },
    { day: 'Fri', hours: 6.2 },
    { day: 'Sat', hours: 9.0 },
    { day: 'Sun', hours: 8.5 },
  ];

  return (
    <div className="tracker-page">
      <header className="mb-8">
        <h1 className="text-3xl">Lifestyle & Devices</h1>
        <p className="opacity-60">Monitor your activity, sleep, and connected healthcare devices.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-secondary/20">
          <div className="flex justify-between items-center mb-4">
             <div className="p-2 bg-blue-500 text-white rounded-lg"><Zap size={20} /></div>
             <span className="text-xs font-bold text-success">Connected</span>
          </div>
          <h4 className="text-2xl font-black">Apple Watch S9</h4>
          <p className="text-xs opacity-60">Last synced: Just now</p>
        </div>
        <div className="card bg-secondary/20">
          <div className="flex justify-between items-center mb-4">
             <div className="p-2 bg-purple-500 text-white rounded-lg"><Bluetooth size={20} /></div>
             <span className="text-xs font-bold text-success">Connected</span>
          </div>
          <h4 className="text-2xl font-black">Dexcom G7</h4>
          <p className="text-xs opacity-60">Continuous Glucose Monitor</p>
        </div>
        <div className="card bg-secondary/20 dashed-border flex items-center justify-center cursor-pointer hover:bg-secondary/40">
           <p className="text-sm font-bold opacity-60">+ Pair New Device</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center gap-2"><Activity size={20} /> Steps Counter</h3>
            <span className="text-xs text-primary font-bold">Goal: 10,000</span>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={stepsData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="steps" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center gap-2"><Moon size={20} /> Sleep Analysis</h3>
            <span className="text-xs text-purple-600 font-bold">Goal: 8.0h</span>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#9333ea" fillOpacity={1} fill="url(#colorSleep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="card">
        <h3 className="mb-4">Diet & Nutrition</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Calories', val: '1,840', unit: 'kcal', target: '2000' },
            { label: 'Protien', val: '65', unit: 'g', target: '80' },
            { label: 'Carbs', val: '210', unit: 'g', target: '250' },
            { label: 'Fats', val: '52', unit: 'g', target: '60' }
          ].map(stat => (
            <div key={stat.label} className="p-4 bg-secondary/10 rounded-xl">
               <p className="text-xs opacity-60">{stat.label}</p>
               <h4 className="text-xl font-bold">{stat.val} <span className="text-xs font-normal">{stat.unit}</span></h4>
               <div className="w-full h-1 bg-white/50 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(parseInt(stat.val.replace(',',''))/parseInt(stat.target))*100}%` }}></div>
               </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .dashed-border {
          border-style: dashed !important;
          border-width: 2px !important;
        }
      `}</style>
    </div>
  );
}
