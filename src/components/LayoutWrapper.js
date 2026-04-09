'use client';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import EmergencySOS from './EmergencySOS';
import { useGlobalState } from '@/context/StateContext';

export default function LayoutWrapper({ children }) {
  const { isSidebarOpen } = useGlobalState();

  return (
    <div className="layout-container">
      <Sidebar />
      <div className={`main-wrapper ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <Navbar />
        <main className="content-area">
          {children}
        </main>
      </div>
      <EmergencySOS />

      <style jsx>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
        }

        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-wrapper.expanded {
          margin-left: 260px;
        }

        .main-wrapper.collapsed {
          margin-left: 80px;
        }

        .content-area {
          padding: 2rem;
          background: hsl(var(--background));
          min-height: calc(100vh - 70px);
        }

        @media (max-width: 768px) {
          .main-wrapper.expanded, .main-wrapper.collapsed {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
