import React, { useState } from 'react';
import {
  AlertTriangleIcon,
  BarChartIcon,
  BriefcaseIcon,
  ClipboardCheckIcon,
  FileCheckIcon,
  FileTextIcon,
  HandshakeIcon,
  HomeIcon,
  LayersIcon,
  PieChartIcon,
  SearchIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
  WalletIcon } from
'lucide-react';
import { DashboardShell } from '../common/DashboardShell';
import { NavSection } from '../common/Sidebar';
import { useOrgScope } from '../../hooks/useOrgScope';
import { OrgOverviewPage } from '../pages/organization/OrgOverviewPage';
import { ProgrammesPage } from '../pages/organization/ProgrammesPage';
import { ApplicationsPage } from '../pages/organization/ApplicationsPage';
import { ServiceProvidersPage } from '../pages/organization/ServiceProvidersPage';
import { MEReviewsPage } from '../pages/organization/MEReviewsPage';
import { FundingOverviewPage } from '../pages/organization/FundingOverviewPage';
import { DealFlowPage } from '../pages/investor/DealFlowPage';
import { PortfolioTrackingPage } from '../pages/investor/PortfolioTrackingPage';
import { CoInvestmentsPage } from '../pages/investor/CoInvestmentsPage';
import { PredictiveAnalyticsPage } from '../pages/investor/PredictiveAnalyticsPage';
import { ProfilePage } from '../pages/investor/ProfilePage';
import { ImpactReportsPage } from '../pages/government/ImpactReportsPage';
import { ComplianceMonitoringPage } from '../pages/government/ComplianceMonitoringPage';
import { RiskAlertsPage } from '../pages/government/RiskAlertsPage';

interface OrganizationDashboardProps {
  onLogout: () => void;
}

const icon = 'w-5 h-5';

export function OrganizationDashboard({ onLogout }: OrganizationDashboardProps) {
  const [active, setActive] = useState('overview');
  const { organization, pendingReports, pendingSignoffs, applications } = useOrgScope();

  const sections: NavSection[] = [
  {
    items: [
    { id: 'overview', label: 'Overview', icon: <HomeIcon className={icon} /> },
    { id: 'programmes', label: 'Programmes', icon: <LayersIcon className={icon} /> },
    {
      id: 'applications',
      label: 'Applications',
      icon: <FileTextIcon className={icon} />,
      badge: applications.filter((a) => a.status === 'Pending review').length
    },
    { id: 'providers', label: 'Service providers', icon: <BriefcaseIcon className={icon} /> },
    {
      id: 'reviews',
      label: 'M&E reviews',
      icon: <FileCheckIcon className={icon} />,
      badge: pendingReports.length + pendingSignoffs.length
    }]

  },
  {
    label: 'Funding & investment',
    items: [
    { id: 'funding', label: 'Funding overview', icon: <WalletIcon className={icon} /> },
    { id: 'dealflow', label: 'Deal flow', icon: <SearchIcon className={icon} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChartIcon className={icon} /> },
    { id: 'coinvestments', label: 'Co-investments', icon: <HandshakeIcon className={icon} /> },
    { id: 'analytics', label: 'Predictive analytics', icon: <TrendingUpIcon className={icon} /> }]

  },
  {
    label: 'Impact & compliance',
    items: [
    { id: 'impact', label: 'Impact reports', icon: <BarChartIcon className={icon} /> },
    { id: 'compliance', label: 'Compliance', icon: <ClipboardCheckIcon className={icon} /> },
    { id: 'risk', label: 'Risk & alerts', icon: <AlertTriangleIcon className={icon} /> }]

  },
  {
    items: [{ id: 'profile', label: 'Profile', icon: <UserIcon className={icon} /> }]
  }];


  const renderPage = () => {
    switch (active) {
      case 'programmes':
        return <ProgrammesPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'providers':
        return <ServiceProvidersPage />;
      case 'reviews':
        return <MEReviewsPage />;
      case 'funding':
        return <FundingOverviewPage />;
      case 'dealflow':
        return <DealFlowPage />;
      case 'portfolio':
        return <PortfolioTrackingPage />;
      case 'coinvestments':
        return <CoInvestmentsPage />;
      case 'analytics':
        return <PredictiveAnalyticsPage />;
      case 'impact':
        return <ImpactReportsPage />;
      case 'compliance':
        return <ComplianceMonitoringPage />;
      case 'risk':
        return <RiskAlertsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <OrgOverviewPage onNavigate={setActive} />;
    }
  };

  return (
    <DashboardShell
      role="organization"
      userName={organization.name}
      subtitle="Programme team"
      contextLabel={`${organization.shortName} · Organization portal`}
      sections={sections}
      activeItem={active}
      onNavigate={setActive}
      onLogout={onLogout}>
      
      {renderPage()}
    </DashboardShell>);

}