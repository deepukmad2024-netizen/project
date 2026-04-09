'use client';

import { useGlobalState } from '@/context/StateContext';
import { 
  Pill, 
  Calendar, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

export default function Home() {
  const { role, meds, markMedTaken } = useGlobalState();

  const adherenceData = [
    { name: 'Mon', score: 85 },
    { name: 'Tue', score: 92 },
    { name: 'Wed', score: 78 },
    { name: 'Thu', score: 95 },
    { name: 'Fri', score: 88 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 94 },
  ];

  const criticalPatients = [
    { id: 1, name: 'Alice Johnson', score: 62, trend: 'down', issue: 'Missed 3 doses' },
    { id: 2, name: 'Bob Smith', score: 74, trend: 'stable', issue: 'Irregular timing' },
    { id: 3, name: 'Charlie Brown', score: 45, trend: 'down', issue: 'No data for 48h' },
  ];

  if (role === 'doctor') {
    // ... (rest of doctor view remains similar, but I'll provide truncated for speed)
    return (
      <div className="doctor-dashboard">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl">Provider Overview</h1>
            <p className="opacity-60">Monitoring 124 active patients</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} /> Add New Patient
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card flex items-center gap-4">
            <div className="icon-box bg-blue">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm opacity-60">Avg. Adherence</p>
              <h3 className="text-2xl font-bold">82.4%</h3>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="icon-box bg-red">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm opacity-60">Critical Alerts</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="icon-box bg-green">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm opacity-60">Follow-ups Done</p>
              <h3 className="text-2xl font-bold">48</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="card">
            <h3 className="mb-4">Global Adherence Trends</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={adherenceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="card">
            <h3 className="mb-4 text-error">High Risk Patients</h3>
            <div className="patient-list">
              {criticalPatients.map(p => (
                <div key={p.id} className="flex justify-between items-center p-4 border-b">
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-xs text-error">{p.issue}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${p.score < 50 ? 'text-error' : 'text-warning'}`}>
                      {p.score}%
                    </p>
                    <button className="text-primary text-xs flex items-center gap-1">
                      Review <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <style jsx>{`
          .icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
          .bg-blue { background: hsl(var(--primary)); }
          .bg-red { background: hsl(var(--error)); }
          .bg-green { background: hsl(var(--success)); }
          .text-error { color: hsl(var(--error)); }
        `}</style>
      </div>
    );
  }

  // Patient View
  return (
    <div className="patient-dashboard">
      <header className="mb-8">
        <h1 className="text-3xl">Good afternoon, John</h1>
        <p className="opacity-60">You have {meds.filter(m => !m.taken).length} doses remaining for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl font-black text-primary">
                {Math.round((meds.filter(m => m.taken).length / meds.length) * 100)}%
              </h3>
              <p className="text-sm opacity-60">Today's Adherence</p>
            </div>
            <div className="badge badge-success">On Track</div>
          </div>
          <div className="mt-4" style={{ height: 60 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adherenceData}>
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card text-center">
          <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-2">
            <Activity size={24} />
          </div>
          <h4 className="text-xl">120/80</h4>
          <p className="text-xs opacity-60">Latest Blood Pressure</p>
        </div>

        <div className="card text-center">
          <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mb-2">
            <TrendingUp size={24} />
          </div>
          <h4 className="text-xl">98 mg/dL</h4>
          <p className="text-xs opacity-60">Blood Sugar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3>Today's Schedule</h3>
            <button className="text-primary font-bold text-sm">+ Add Medicine</button>
          </div>
          <div className="timeline">
            {meds.map((item, i) => (
              <div key={i} className={`timeline-item ${item.taken ? 'completed' : ''}`}>
                <div className="time">{item.time}</div>
                <div className="med-card card flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`status-icon ${item.taken ? 'bg-success' : 'bg-warning'}`}>
                      {item.taken ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    </div>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs opacity-60">{item.dose}</p>
                    </div>
                  </div>
                  {!item.taken && (
                    <button 
                      className="btn btn-primary py-1 px-4 text-xs"
                      onClick={() => markMedTaken(item.id)}
                    >
                      Mark Taken
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="card bg-primary-grad text-white">
            <h4 className="mb-2">Next Appointment</h4>
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} />
              <div>
                <p className="font-bold">April 12, 2026</p>
                <p className="text-xs opacity-80">10:30 AM with Dr. Sarah Wilson</p>
              </div>
            </div>
            <button className="btn btn-secondary w-100 text-sm">Reschedule</button>
          </div>

          <div className="card">
            <h4 className="mb-4">AI Adherence Tip</h4>
            <div className="flex gap-3">
              <div className="text-accent"><AlertTriangle size={24} /></div>
              <p className="text-sm">
                We noticed you often miss your midday dose. Try setting an alarm for 12:15 PM or placing your meds near your lunch spot.
              </p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .bg-primary-grad {
          background: linear-gradient(135deg, hsl(var(--primary)), #2563eb);
        }
        .timeline-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .timeline-item::after {
          content: '';
          position: absolute;
          left: 4.5rem;
          top: 2rem;
          bottom: -1rem;
          width: 2px;
          background: hsl(var(--border));
        }
        .timeline-item:last-child::after { display: none; }
        .time { width: 70px; font-weight: 600; font-size: 0.8rem; padding-top: 1rem; }
        .med-card { flex: 1; padding: 1rem; }
        .status-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .bg-success { background: hsl(var(--success)); }
        .bg-warning { background: hsl(var(--warning)); }
        .w-100 { width: 100%; }
      `}</style>
    </div>
  );
}
