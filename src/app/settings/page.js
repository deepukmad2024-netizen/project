'use client';

import { Bell, Shield, User, Globe, Moon, Eye, Save, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Moon }
  ];

  return (
    <div className="settings-page">
      <header className="mb-8">
        <h1 className="text-3xl">Settings & Personalization</h1>
        <p className="opacity-60">Manage your account preferences and application settings.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="card p-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'hover:bg-secondary/50'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="card p-8">
             {activeTab === 'profile' && (
               <div className="profile-settings">
                 <h3 className="mb-6">Profile Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="form-group">
                     <label className="text-sm opacity-60 block mb-2">Full Name</label>
                     <input type="text" defaultValue="John Doe" className="w-full p-3 bg-secondary/20 border rounded-xl" />
                   </div>
                   <div className="form-group">
                     <label className="text-sm opacity-60 block mb-2">Email Address</label>
                     <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 bg-secondary/20 border rounded-xl" />
                   </div>
                   <div className="form-group">
                     <label className="text-sm opacity-60 block mb-2">Phone Number</label>
                     <input type="tel" defaultValue="+1 (555) 124-5678" className="w-full p-3 bg-secondary/20 border rounded-xl" />
                   </div>
                   <div className="form-group">
                     <label className="text-sm opacity-60 block mb-2">Patient ID</label>
                     <input type="text" defaultValue="MED-889201" disabled className="w-full p-3 bg-secondary/10 border rounded-xl opacity-60" />
                   </div>
                 </div>
                 <button className="btn btn-primary px-8">
                   <Save size={18} /> Save Changes
                 </button>
               </div>
             )}

             {activeTab === 'notifications' && (
               <div className="notification-settings">
                 <h3 className="mb-6">Notification Preferences</h3>
                 <div className="flex flex-col gap-6">
                    {[
                      { title: 'Medicine Reminders', desc: 'Push notifications for every scheduled dose', checked: true },
                      { title: 'Appointment Alerts', desc: 'Alerts for upcoming and rescheduled visits', checked: true },
                      { title: 'Doctor Messages', desc: 'Real-time alerts for new chat messages', checked: false },
                      { title: 'Weekly Reports', desc: 'Email digest of your adherence trends', checked: true }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-secondary/10 rounded-xl">
                        <div>
                           <p className="font-bold">{item.title}</p>
                           <p className="text-sm opacity-60">{item.desc}</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${item.checked ? 'bg-primary' : 'bg-secondary'}`}>
                           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.checked ? 'right-1' : 'left-1'}`} />
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
             )}

             {activeTab === 'appearance' && (
               <div className="appearance-settings">
                 <h3 className="mb-6">App Appearance</h3>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="card border-primary p-4 cursor-pointer text-center bg-secondary/10">
                       <div className="w-full h-24 bg-white rounded-lg mb-4 shadow-sm border" />
                       <p className="font-bold">Light Mode</p>
                    </div>
                    <div className="card p-4 cursor-pointer text-center hover:bg-secondary/10 transition-colors">
                       <div className="w-full h-24 bg-slate-900 rounded-lg mb-4 shadow-sm border border-slate-700" />
                       <p className="font-bold">Dark Mode</p>
                    </div>
                 </div>
               </div>
             )}
          </div>
        </section>
      </div>
    </div>
  );
}
