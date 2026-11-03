import React, { useState } from 'react';
import {
  ActivityIcon,
  BookOpenIcon,
  CalendarCheckIcon,
  ClipboardListIcon,
  FileCheckIcon,
  HomeIcon,
  ListChecksIcon,
  TargetIcon,
  UserIcon,
  UsersIcon } from
'lucide-react';
import { DashboardShell } from '../common/DashboardShell';
import { NavSection } from '../common/Sidebar';
import { useMentorScope } from '../../hooks/useMentorScope';
import { MentorOverviewPage } from '../pages/mentor/MentorOverviewPage';
import { MyBeneficiariesPage } from '../pages/mentor/MyBeneficiariesPage';
import { SessionsPage } from '../pages/mentor/SessionsPage';
import { TasksPage } from '../pages/mentor/TasksPage';
import { MEReportingPage } from '../pages/mentor/MEReportingPage';
import { DevelopmentPlansPage } from '../pages/mentor/DevelopmentPlansPage';
import { TrainingHubPage } from '../pages/mentor/TrainingHubPage';
import { SMEProgressPage } from '../pages/mentor/SMEProgressPage';
import { EvaluationsPage } from '../pages/mentor/EvaluationsPage';
import { ProfilePage } from '../pages/investor/ProfilePage';

interface MentorDashboardProps {
  onLogout: () => void;
}

const icon = 'w-5 h-5';

export function MentorDashboard({ onLogout }: MentorDashboardProps) {
  const [active, setActive] = useState('overview');
  const { mentor, tasks, reports } = useMentorScope();

  const sections: NavSection[] = [
  {
    items: [
    { id: 'overview', label: 'Overview', icon: <HomeIcon className={icon} /> },
    { id: 'beneficiaries', label: 'My beneficiaries', icon: <UsersIcon className={icon} /> },
    { id: 'sessions', label: 'Session logs', icon: <CalendarCheckIcon className={icon} /> },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <ListChecksIcon className={icon} />,
      badge: tasks.filter((t) => t.status === 'Submitted').length
    },
    {
      id: 'reports',
      label: 'M&E reporting',
      icon: <FileCheckIcon className={icon} />,
      badge: reports.filter((r) => r.status === 'Changes requested').length
    }]

  },
  {
    label: 'Development & training',
    items: [
    { id: 'development', label: 'Development plans', icon: <TargetIcon className={icon} /> },
    { id: 'training', label: 'Training hub', icon: <BookOpenIcon className={icon} /> },
    { id: 'progress', label: 'Progress tracking', icon: <ActivityIcon className={icon} /> },
    { id: 'evaluations', label: 'Evaluations', icon: <ClipboardListIcon className={icon} /> }]

  },
  { items: [{ id: 'profile', label: 'Profile', icon: <UserIcon className={icon} /> }] }];


  const renderPage = () => {
    switch (active) {
      case 'beneficiaries':
        return <MyBeneficiariesPage />;
      case 'sessions':
        return <SessionsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'reports':
        return <MEReportingPage />;
      case 'development':
        return <DevelopmentPlansPage />;
      case 'training':
        return <TrainingHubPage />;
      case 'progress':
        return <SMEProgressPage />;
      case 'evaluations':
        return <EvaluationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <MentorOverviewPage onNavigate={setActive} />;
    }
  };

  return (
    <DashboardShell
      role="mentor"
      userName={mentor.name}
      subtitle={mentor.company}
      contextLabel="Service provider portal"
      sections={sections}
      activeItem={active}
      onNavigate={setActive}
      onLogout={onLogout}>
      
      {renderPage()}
    </DashboardShell>);

}