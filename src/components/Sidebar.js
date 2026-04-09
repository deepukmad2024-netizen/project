'use client';

import { useGlobalState } from '@/context/StateContext';
import { 
  Home, 
  Pill, 
  Calendar, 
  Activity, 
  User, 
  MessageSquare, 
  Settings, 
  AlertCircle,
  Users,
  BarChart3,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Stethoscope as DoctorIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { role, isSidebarOpen, toggleSidebar, toggleRole } = useGlobalState();
  const pathname = usePathname();

  const patientLinks = [
    { label: 'Dashboard', icon: Home, href: '/' },
    { label: 'Medications', icon: Pill, href: '/medications' },
    { label: 'Appointments', icon: Calendar, href: '/appointments' },
    { label: 'Health Tracker', icon: Activity, href: '/tracker' },
    { label: 'Consultations', icon: MessageSquare, href: '/chat' },
  ];

  const doctorLinks = [
    { label: 'Overview', icon: BarChart3, href: '/' },
    { label: 'Patients', icon: Users, href: '/patients' },
    { label: 'Interventions', icon: AlertCircle, href: '/interventions' },
    { label: 'Reports', icon: Stethoscope, href: '/reports' },
    { label: 'Messages', icon: MessageSquare, href: '/messages' },
  ];

  const links = role === 'patient' ? patientLinks : doctorLinks;

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} glass`}>
      <div className="sidebar-header flex justify-between items-center">
        <h2 className={`logo ${!isSidebarOpen && 'hidden'}`}>
          <span className="text-primary italic">Medi</span>Care
        </h2>
        <button onClick={toggleSidebar} className="toggle-btn">
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link href={link.href} className={`nav-item ${isActive ? 'active' : ''}`}>
                  <Icon size={22} className="nav-icon" />
                  <span className={`nav-label ${!isSidebarOpen && 'hidden'}`}>{link.label}</span>
                  {isActive && <div className="active-indicator" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={toggleRole} className="role-switcher nav-item">
          {role === 'patient' ? <DoctorIcon size={22} /> : <User size={22} />}
          <span className={`nav-label ${!isSidebarOpen && 'hidden'}`}>
            Switch to {role === 'patient' ? 'Doctor' : 'Patient'}
          </span>
        </button>
        <div className="nav-item">
          <Settings size={22} />
          <span className={`nav-label ${!isSidebarOpen && 'hidden'}`}>Settings</span>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          height: 100vh;
          width: 260px;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-right: 1px solid hsl(var(--border));
        }

        .sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          margin-bottom: 2.5rem;
          height: 40px;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: hsl(var(--foreground));
        }

        .text-primary { color: hsl(var(--primary)); }

        .sidebar-nav {
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.875rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: var(--radius);
          color: hsl(var(--foreground));
          opacity: 0.7;
          transition: all 0.2s ease;
          position: relative;
          width: 100%;
          cursor: pointer;
        }

        .nav-item:hover, .nav-item.active {
          opacity: 1;
          background: hsla(var(--primary), 0.1);
          color: hsl(var(--primary));
        }

        .nav-icon {
          flex-shrink: 0;
        }

        .nav-label {
          margin-left: 1rem;
          font-weight: 500;
          white-space: nowrap;
          transition: opacity 0.2s ease;
        }

        .active-indicator {
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 4px;
          background: hsl(var(--primary));
          border-radius: 4px 0 0 4px;
        }

        .sidebar-footer {
          border-top: 1px solid hsl(var(--border));
          padding-top: 1.5rem;
        }

        .hidden {
          opacity: 0;
          pointer-events: none;
        }

        .role-switcher {
          background: hsla(var(--accent), 0.1);
          color: hsl(var(--accent));
          margin-bottom: 0.5rem;
        }
          
        .role-switcher:hover {
          background: hsla(var(--accent), 0.2);
        }

        .toggle-btn {
          padding: 0.25rem;
          border-radius: 6px;
          background: hsla(var(--foreground), 0.05);
          transition: background 0.2s;
        }

        .toggle-btn:hover {
          background: hsla(var(--foreground), 0.1);
        }
      `}</style>
    </aside>
  );
}
