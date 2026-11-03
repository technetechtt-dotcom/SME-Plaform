import { usePlatform } from '../contexts/PlatformContext';
import { currentBeneficiaryId } from '../data/beneficiaries';

export function useBeneficiaryScope() {
  const platform = usePlatform();
  const me = platform.getBeneficiary(currentBeneficiaryId)!;
  const enrollments = platform.enrollments.filter((e) => e.beneficiaryId === currentBeneficiaryId);
  const tasks = platform.tasks.filter((t) => t.beneficiaryId === currentBeneficiaryId);
  const sessions = platform.sessions.filter((s) => s.beneficiaryId === currentBeneficiaryId);
  const signoffs = platform.signoffs.filter((s) => s.beneficiaryId === currentBeneficiaryId);
  const returns = platform.monthlyReturns.filter((r) => r.beneficiaryId === currentBeneficiaryId);
  const applications = platform.applications.filter((a) => a.businessName === me.businessName);

  return { beneficiaryId: currentBeneficiaryId, me, enrollments, tasks, sessions, signoffs, returns, applications };
}