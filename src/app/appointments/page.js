'use client';

import { useGlobalState } from '@/context/StateContext';
import { Calendar, Clock, MapPin, Plus, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function AppointmentsPage() {
  const { appointments, rescheduleAppointment } = useGlobalState();
  const [reschedulingId, setReschedulingId] = useState(null);

  const handleReschedule = (id) => {
    const newDate = 'April 20, 2026';
    rescheduleAppointment(id, newDate);
    setReschedulingId(null);
  };

  return (
    <div className="appointments-page">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl">Appointments</h1>
          <p className="opacity-60">Manage your medical visits and consultations.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Book Appointment
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h3>Upcoming Visits</h3>
            <div className="mt-6">
              {appointments.map(app => (
                <div key={app.id} className="appointment-card card mb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="date-box bg-secondary text-primary">
                        <span className="font-bold text-lg">{app.date.split(' ')[1].replace(',', '')}</span>
                        <span className="text-xs uppercase">{app.date.split(' ')[0]}</span>
                      </div>
                      <div>
                        <h4 className="text-lg">{app.doctor}</h4>
                        <p className="text-sm opacity-60 mb-2">{app.specialty}</p>
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2 text-xs opacity-80"><Clock size={14} /> {app.time}</span>
                          <span className="flex items-center gap-2 text-xs opacity-80"><MapPin size={14} /> {app.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`badge ${app.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                        {app.status}
                      </span>
                      {reschedulingId === app.id ? (
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-primary py-1 px-3 text-xs"
                            onClick={() => handleReschedule(app.id)}
                          >
                            Confirm Apr 20
                          </button>
                          <button 
                            className="btn btn-secondary py-1 px-3 text-xs"
                            onClick={() => setReschedulingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="text-primary text-sm flex items-center gap-1 hover:underline"
                          onClick={() => setReschedulingId(app.id)}
                        >
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-secondary/30">
            <h3 className="flex items-center gap-2"><AlertCircle size={20} className="text-primary" /> Appointment Alerts</h3>
            <p className="text-sm mt-2 opacity-80">
              You have a missed appointment with the Dental Clinic from last week. Would you like to reschedule?
            </p>
            <button className="btn btn-primary mt-4 py-2 px-6 text-xs">Reschedule Now</button>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="card">
            <h4>Hospital Integration</h4>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center font-bold text-blue-600">CH</div>
              <div>
                <p className="text-sm font-bold">City Hospital Sync</p>
                <p className="text-xs opacity-60">Last synced: 2h ago</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>Quick Links</h4>
            <ul className="text-sm flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-2 text-primary cursor-pointer hover:underline"><ChevronRight size={14} /> Find a Doctor</li>
              <li className="flex items-center gap-2 text-primary cursor-pointer hover:underline"><ChevronRight size={14} /> View Lab Results</li>
              <li className="flex items-center gap-2 text-primary cursor-pointer hover:underline"><ChevronRight size={14} /> Insurance Portal</li>
            </ul>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .date-box {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .appointment-card {
          padding: 1.5rem;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
      `}</style>
    </div>
  );
}
