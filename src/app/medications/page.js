'use client';

import { useGlobalState } from '@/context/StateContext';
import { Pill, Plus, Search, Trash2, Edit3, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function MedicationsPage() {
  const { role } = useGlobalState();
  const [activeMeds, setActiveMeds] = useState([
    { id: 1, name: 'Metformin', dose: '500mg', frequency: 'Twice daily', timing: 'After meals', icon: Pill },
    { id: 2, name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', timing: 'Morning', icon: Pill },
    { id: 3, name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily', timing: 'Bedtime', icon: Pill },
  ]);

  return (
    <div className="meds-page">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl">Medication Management</h1>
          <p className="opacity-60">View and manage your current prescriptions.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add Medication
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3>Active Medications</h3>
              <div className="flex gap-2">
                <button className="btn btn-secondary py-1 px-3 text-sm">Sort</button>
                <button className="btn btn-secondary py-1 px-3 text-sm">Filter</button>
              </div>
            </div>
            
            <div className="med-list">
              {activeMeds.map(med => (
                <div key={med.id} className="med-item card mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="med-icon bg-secondary">
                      <Pill size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">{med.name} - {med.dose}</p>
                      <div className="flex gap-4 mt-1 opacity-60 text-xs">
                        <span className="flex items-center gap-1"><Clock size={12} /> {med.frequency}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {med.timing}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors"><Edit3 size={18} /></button>
                    <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Adherence History</h3>
            <p className="opacity-60 text-sm mb-4">You have taken 95% of your doses this week.</p>
            <div className="history-graph bg-secondary rounded-lg" style={{ height: 150 }}>
               {/* Mock graph area */}
               <div className="flex items-end justify-around h-full p-4">
                  {[40, 60, 80, 70, 90, 100, 85].map((h, i) => (
                    <div key={i} className="bg-primary opacity-40 rounded-t-sm" style={{ width: 30, height: `${h}%` }}></div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="card bg-accent text-white">
            <h4 className="flex items-center gap-2 mb-2"><Clock size={18} /> Smart Reminders</h4>
            <p className="text-sm opacity-90 mb-4">
              Next dose: <b>Lisinopril (10mg)</b> at 12:30 PM.
            </p>
            <button className="btn btn-secondary w-full text-xs">Set New Reminder</button>
          </div>

          <div className="card">
            <h4>Pharmacy Integration</h4>
            <p className="text-xs opacity-60 mb-4">Connected to: <b>CVS Pharmacy #4920</b></p>
            <button className="btn btn-primary w-full text-xs">Order Refills</button>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .med-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .med-item {
          padding: 1.25rem;
          transition: transform 0.2s;
        }
        .med-item:hover {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}
