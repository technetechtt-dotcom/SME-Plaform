import React, { useEffect, useState } from 'react';
import { Role } from '../../types/platform';
import { NavSection, Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardShellProps {
  role: Role;
  userName: string;
  subtitle: string;
  contextLabel: string;
  sections: NavSection[];
  activeItem: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function DashboardShell({
  role,
  userName,
  subtitle,
  contextLabel,
  sections,
  activeItem,
  onNavigate,
  onLogout,
  children
}: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
    if(!menuOpen)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenuOpen(false);};
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  },[menuOpen]);

  const navigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const sidebar =
  <Sidebar
    role={role}
    contextLabel={contextLabel}
    sections={sections}
    activeItem={activeItem}
    onNavigate={navigate}
    onLogout={onLogout} />;



  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="hidden lg:block flex-shrink-0">{sidebar}</div>
      {menuOpen &&
      <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
          className="overlay-enter absolute inset-0 bg-gray-900/50"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true" />
        
          <div className="relative panel-enter h-full" role="dialog" aria-label="Mobile navigation" aria-modal="true">
            <button type="button" className="absolute right-3 top-3 z-10 rounded bg-gray-100 px-3 py-2 text-sm text-gray-800" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}>Close</button>
            {sidebar}
          </div>
        </div>
      }
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          role={role}
          userName={userName}
          subtitle={subtitle}
          onOpenMenu={() => setMenuOpen(true)} />
        
        <main id="main-content" className="flex-1 overflow-y-auto min-w-0 p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>);

}