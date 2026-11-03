import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { OrganizationDashboard } from './components/dashboards/OrganizationDashboard';
import { MentorDashboard } from './components/dashboards/MentorDashboard';
import { SMEDashboard } from './components/dashboards/SMEDashboard';
import { PlatformProvider } from './contexts/PlatformContext';
import { ToastProvider } from './contexts/ToastContext';
import { Role } from './types/platform';

export function App() {
  const [role, setRole] = useState<Role | null>(null);
  const logout = () => setRole(null);

  return (
    <ToastProvider>
      <PlatformProvider>
        {role === null && <LoginPage onLogin={setRole} />}
        {role === 'organization' && <OrganizationDashboard onLogout={logout} />}
        {role === 'mentor' && <MentorDashboard onLogout={logout} />}
        {role === 'beneficiary' && <SMEDashboard onLogout={logout} />}
      </PlatformProvider>
    </ToastProvider>);

}