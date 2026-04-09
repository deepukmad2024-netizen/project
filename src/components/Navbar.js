'use client';

import { useGlobalState } from '@/context/StateContext';
import { Bell, Search, User as UserIcon, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { role, toggleSidebar, notifications } = useGlobalState();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search data, patients, meds..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="notification-wrap">
          <button 
            className="navbar-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown card">
              <div className="flex justify-between items-center mb-4">
                <h4>Notifications</h4>
                <button className="text-sm text-primary">Mark all read</button>
              </div>
              <div className="notification-list">
                {notifications.map(n => (
                  <div key={n.id} className="notification-item">
                    <div className={`notification-icon ${n.type}`} />
                    <div className="notification-content">
                      <p className="text-sm font-medium">{n.message}</p>
                      <span className="text-xs opacity-60">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="user-profile flex items-center">
          <div className="user-info text-right">
            <p className="user-name">{role === 'patient' ? 'John Doe' : 'Dr. Sarah Wilson'}</p>
            <p className="user-role">{role === 'patient' ? 'Premium Member' : 'Chief Medical Officer'}</p>
          </div>
          <div className="avatar">
            <UserIcon size={24} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 90;
          border-bottom: 1px solid hsl(var(--border));
        }

        .navbar-left, .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-menu-btn {
          display: none;
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-box input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: 999px;
          border: 1px solid hsl(var(--border));
          background: hsla(var(--background), 0.5);
          font-size: 0.875rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
        }

        .navbar-btn {
          position: relative;
          padding: 0.5rem;
          border-radius: 50%;
          background: hsla(var(--foreground), 0.05);
          transition: transform 0.2s;
        }

        .navbar-btn:hover {
          transform: scale(1.1);
        }

        .notification-dot {
          position: absolute;
          top: 0;
          right: 0;
          width: 16px;
          height: 16px;
          background: hsl(var(--error));
          color: white;
          font-size: 10px;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: 50px;
          width: 320px;
          padding: 1.25rem;
          z-index: 100;
        }

        .notification-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid hsl(var(--border));
        }

        .notification-icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 5px;
        }

        .notification-icon.medication { background: hsl(var(--primary)); }
        .notification-icon.appointment { background: hsl(var(--accent)); }

        .user-name { font-weight: 600; font-size: 0.9rem; }
        .user-role { font-size: 0.75rem; opacity: 0.6; }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--primary));
          border: 2px solid hsl(var(--primary));
        }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: block; }
          .search-box, .user-info { display: none; }
          .navbar { padding: 0 1rem; }
        }
      `}</style>
    </header>
  );
}
