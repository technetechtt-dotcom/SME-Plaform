import { usePlatform } from '../contexts/PlatformContext';
import { currentOrganizationId, organizations } from '../data/organizations';

export function useOrgScope() {
  const platform = usePlatform();
  const organization = organizations.find((o) => o.id === currentOrganizationId)!;
  const programmes = platform.programmes.filter((p) => p.organizationId === currentOrganizationId);
  const programmeIds = new Set(programmes.map((p) => p.id));
  const enrollments = platform.enrollments.filter((e) => programmeIds.has(e.programmeId));
  const appointments = platform.appointments.filter((a) => programmeIds.has(a.programmeId));
  const reports = platform.reports.filter((r) => programmeIds.has(r.programmeId));
  const signoffs = platform.signoffs.filter((s) => programmeIds.has(s.programmeId));
  const applications = platform.applications.filter((a) => programmeIds.has(a.programmeId));
  const pendingReports = reports.filter((r) => r.status === 'Submitted');
  const pendingSignoffs = signoffs.filter((s) => s.status === 'Requested');

  return {
    organization,
    programmes,
    enrollments,
    appointments,
    reports,
    signoffs,
    applications,
    pendingReports,
    pendingSignoffs
  };
}