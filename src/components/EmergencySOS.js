'use client';

import { AlertCircle, Phone, MapPin, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function EmergencySOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState('initial'); // initial, alerting, sent

  const triggerSOS = () => {
    setStage('alerting');
    setTimeout(() => {
      setStage('sent');
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button 
        className="sos-trigger"
        onClick={() => setIsOpen(true)}
      >
        <AlertCircle size={24} />
        <span>SOS</span>
      </button>
    );
  }

  return (
    <div className="sos-overlay flex items-center justify-center">
      <div className="sos-modal card w-[400px] text-center p-8 relative">
        <button className="absolute right-4 top-4" onClick={() => {setIsOpen(false); setStage('initial');}}>
          <X size={24} className="opacity-40" />
        </button>

        {stage === 'initial' && (
          <>
            <div className="icon-pulse mx-auto mb-6 bg-error text-white p-6 rounded-full w-24 h-24 flex items-center justify-center">
              <Phone size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">Emergency Support</h2>
            <p className="opacity-60 mb-8 text-sm">
              Pressing the button below will alert your primary physician, emergency contacts, and local services with your current location.
            </p>
            <button 
              className="btn bg-error text-white w-full py-4 text-lg font-black uppercase tracking-widest animate-bounce"
              onClick={triggerSOS}
            >
              Confirm SOS Alert
            </button>
          </>
        )}

        {stage === 'alerting' && (
          <div className="py-12">
            <div className="spinner mx-auto mb-6" />
            <h3 className="text-xl font-bold">Sending Emergency Signal...</h3>
            <p className="text-xs opacity-60 mt-2">Connecting to GPS and Medical Services</p>
          </div>
        )}

        {stage === 'sent' && (
          <>
            <div className="bg-success text-white p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2 text-success">Help is on the way!</h2>
            <p className="opacity-60 mb-6 text-sm">
              Emergency services and Dr. Wilson have been notified. Please stay calm and remain at your location.
            </p>
            <div className="bg-secondary/20 p-4 rounded-xl flex items-center gap-3 text-left">
               <MapPin size={20} className="text-primary" />
               <div>
                  <p className="text-xs font-bold">Your shared location:</p>
                  <p className="text-xs opacity-60">123 Health Ave, Medical District, NY</p>
               </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .sos-trigger {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          background: hsl(var(--error));
          color: white;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4);
          z-index: 1000;
          transition: transform 0.2s;
        }
        .sos-trigger:hover {
          transform: scale(1.05) translateY(-5px);
        }
        .sos-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          z-index: 2000;
        }
        .icon-pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(0,0,0,0.1);
          border-top-color: hsl(var(--error));
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
