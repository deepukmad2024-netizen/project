'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [role, setRole] = useState('patient'); // 'patient' or 'doctor'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'medication', message: 'Time to take Metformin', time: '10:00 AM', read: false },
    { id: 2, type: 'appointment', message: 'Visit Dr. Smith tomorrow', time: '2:00 PM', read: false },
  ]);

  const [meds, setMeds] = useState([
    { id: 1, time: '08:00 AM', name: 'Metformin', dose: '500mg', taken: true },
    { id: 2, time: '12:30 PM', name: 'Lisinopril', dose: '10mg', taken: false },
    { id: 3, time: '06:00 PM', name: 'Atorvastatin', dose: '20mg', taken: false },
    { id: 4, time: '09:00 PM', name: 'Aspirin', dose: '81mg', taken: false },
  ]);

  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      doctor: 'Dr. Sarah Wilson', 
      specialty: 'Cardiologist', 
      date: 'April 12, 2026', 
      time: '10:30 AM', 
      location: 'Central Heart Clinic, Room 402',
      status: 'confirmed'
    },
    { 
      id: 2, 
      doctor: 'Dr. James Miller', 
      specialty: 'General Practitioner', 
      date: 'May 05, 2026', 
      time: '02:00 PM', 
      location: 'City Hospital, Wing B',
      status: 'pending'
    }
  ]);

  const toggleRole = () => setRole(role === 'patient' ? 'doctor' : 'patient');
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markMedTaken = (id) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: true } : m));
  };

  const rescheduleAppointment = (id, newDate) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, date: newDate, status: 'confirmed' } : a));
  };

  return (
    <StateContext.Provider value={{ 
      role, 
      setRole, 
      toggleRole, 
      isSidebarOpen, 
      toggleSidebar, 
      notifications,
      setNotifications,
      meds,
      markMedTaken,
      appointments,
      rescheduleAppointment
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(StateContext);
}
