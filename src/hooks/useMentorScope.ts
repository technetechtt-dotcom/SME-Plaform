import { usePlatform } from '../contexts/PlatformContext';
import { currentProviderId } from '../data/providers';

export function useMentorScope() {
  const platform = usePlatform();
  const mentor = platform.getProvider(currentProviderId)!;
  const myAppointments = platform.appointments.filter((a) => a.providerId === currentProviderId);
  const programmeIds = new Set(myAppointments.map((a) => a.programmeId));
  const programmes = platform.programmes.filter((p) => programmeIds.has(p.id));
  // Mentors only see beneficiaries assigned to them inside programmes they are appointed to.
  const enrollments = platform.enrollments.filter(
    (e) => programmeIds.has(e.programmeId) && e.mentorId === currentProviderId
  );
  const tasks = platform.tasks.filter((t) => t.mentorId === currentProviderId);
  const sessions = platform.sessions.filter((s) => s.mentorId === currentProviderId);
  const reports = platform.reports.filter((r) => r.mentorId === currentProviderId);
  const signoffs = platform.signoffs.filter((s) => s.mentorId === currentProviderId);

  return {
    mentorId: currentProviderId,
    mentor,
    myAppointments,
    programmes,
    enrollments,
    tasks,
    sessions,
    reports,
    signoffs
  };
}