import React, { useState } from 'react';
import {
  BanknoteIcon,
  BarChartIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  FileSpreadsheetIcon,
  HomeIcon,
  LayersIcon,
  ListChecksIcon,
  UserIcon } from
'lucide-react';
import { DashboardShell } from '../common/DashboardShell';
import { NavSection } from '../common/Sidebar';
import { ProgressBar } from '../common/ProgressBar';
import { usePlatform } from '../../contexts/PlatformContext';
import { useBeneficiaryScope } from '../../hooks/useBeneficiaryScope';
import { AIReadinessScorecard } from '../widgets/sme/AIReadinessScorecard';
import { ComplianceChecklist } from '../widgets/sme/ComplianceChecklist';
import { FundingMarketplace } from '../widgets/sme/FundingMarketplace';
import { GrowthTracker } from '../widgets/sme/GrowthTracker';
import { QuickActions } from '../widgets/sme/QuickActions';
import { MyProgrammePage } from '../pages/beneficiary/MyProgrammePage';
import { MyTasksPage } from '../pages/beneficiary/MyTasksPage';
import { MonthlyReturnsPage } from '../pages/beneficiary/MonthlyReturnsPage';
import { CompliancePage } from '../pages/sme/CompliancePage';
import { FundingPage } from '../pages/sme/FundingPage';
import { GrowthAnalyticsPage } from '../pages/sme/GrowthAnalyticsPage';
import { LearningHubPage } from '../pages/sme/LearningHubPage';
import { ProfilePage } from '../pages/sme/ProfilePage';
import { formatDate, formatDateTime } from '../../utils/format';

interface SMEDashboardProps {
  onLogout: () => void;
}

const icon = 'w-5 h-5';

export function SMEDashboard({ onLogout }: SMEDashboardProps) {
  const [active, setActive] = useState('dashboard');
  const { getProgramme, getProvider } = usePlatform();
  const { me, enrollments, tasks, sessions } = useBeneficiaryScope();

  const openTasks = tasks.
  filter((t) => t.status === 'Assigned' || t.status === 'Returned' || t.status === 'Overdue').
  sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const nextSession = sessions.filter((s) => s.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date))[0];
  const primary = enrollments[0];
  const primaryProgramme = primary ? getProgramme(primary.programmeId) : undefined;

  const sections: NavSection[] = [
  {
    items: [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className={icon} /> },
    { id: 'programme', label: 'My programme', icon: <LayersIcon className={icon} /> },
    { id: 'tasks', label: 'My tasks', icon: <ListChecksIcon className={icon} />, badge: openTasks.length },
    { id: 'returns', label: 'Monthly returns', icon: <FileSpreadsheetIcon className={icon} /> }]

  },
  {
    label: 'My business',
    items: [
    { id: 'compliance', label: 'Compliance', icon: <ClipboardCheckIcon className={icon} /> },
    { id: 'funding', label: 'Funding', icon: <BanknoteIcon className={icon} /> },
    { id: 'growth', label: 'Growth & analytics', icon: <BarChartIcon className={icon} /> },
    { id: 'learning', label: 'Learning hub', icon: <BookOpenIcon className={icon} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon className={icon} /> }]

  }];


  const renderHome = () =>
  <div className="space-y-6">
      {primary && primaryProgramme &&
    <section className="bg-white rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-5">
            <p className="text-xs text-gray-500">Programme</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{primaryProgramme.name}</p>
            <p className="text-xs text-gray-500">Mentor: {getProvider(primary.mentorId)?.name || 'To be assigned'}</p>
            <div className="mt-3 flex items-center gap-2">
              <ProgressBar value={primary.progress} tone="blue" label="Programme progress" />
              <span className="text-xs font-medium text-gray-700 w-9 text-right">{primary.progress}%</span>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-500">Next session</p>
            {nextSession ?
        <>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900">
                  <CalendarIcon className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  {formatDateTime(nextSession.date)}
                </p>
                <p className="text-xs text-gray-500">{nextSession.topics}</p>
              </> :

        <p className="mt-1 text-sm text-gray-600">Nothing scheduled</p>
        }
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-500">Tasks to do</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{openTasks.length} open</p>
            {openTasks[0] &&
        <p className="text-xs text-gray-500 truncate">
                Next: {openTasks[0].title} · {formatDate(openTasks[0].dueDate)}
              </p>
        }
            <button onClick={() => setActive('tasks')} className="mt-2 text-sm font-medium text-blue-700 hover:text-blue-900">
              Go to tasks
            </button>
          </div>
        </section>
    }
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <AIReadinessScorecard />
        </div>
        <div className="md:w-1/3">
          <QuickActions onNavigate={setActive} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <ComplianceChecklist />
        </div>
        <div className="lg:w-1/2">
          <FundingMarketplace />
        </div>
      </div>
      <GrowthTracker />
    </div>;


  const renderPage = () => {
    switch (active) {
      case 'programme':
        return <MyProgrammePage />;
      case 'tasks':
        return <MyTasksPage />;
      case 'returns':
        return <MonthlyReturnsPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'funding':
        return <FundingPage />;
      case 'growth':
        return <GrowthAnalyticsPage />;
      case 'learning':
        return <LearningHubPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return renderHome();
    }
  };

  return (
    <DashboardShell
      role="beneficiary"
      userName={me.businessName}
      subtitle={me.founder}
      contextLabel="Beneficiary portal"
      sections={sections}
      activeItem={active}
      onNavigate={setActive}
      onLogout={onLogout}>
      
      {renderPage()}
    </DashboardShell>);

}