import { MEReport, MilestoneSignoff, MonthlyReturn, Session, Task } from '../types/platform';

export const tasks: Task[] = [
{ id: 't-1', programmeId: 'prog-agri', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', title: 'Draft 12-month cash flow forecast', description: 'Use the template shared in our last session. Include seasonal harvest dips.', dueDate: '2026-11-04', evidenceRequired: 'Excel cash flow forecast', status: 'Assigned' },
{ id: 't-2', programmeId: 'prog-agri', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', title: 'Approach 3 local retailers for offtake', description: 'Record outcome of each meeting and any pricing discussed.', dueDate: '2026-10-20', evidenceRequired: 'Meeting notes or letters of intent', status: 'Submitted', evidenceFile: 'retailer-meetings.pdf', evidenceNote: 'Spar Nelspruit keen on weekly supply, awaiting volumes.' },
{ id: 't-3', programmeId: 'prog-agri', beneficiaryId: 'ben-2', mentorId: 'prov-sarah', title: 'Register for SARS tax clearance', description: 'Needed before the next funding tranche.', dueDate: '2026-10-15', evidenceRequired: 'Tax compliance status PIN', status: 'Overdue' },
{ id: 't-4', programmeId: 'prog-agri', beneficiaryId: 'ben-3', mentorId: 'prov-sarah', title: 'Fix irrigation cost breakdown', description: 'Separate capex and opex lines in your budget.', dueDate: '2026-10-25', evidenceRequired: 'Updated budget', status: 'Returned', evidenceFile: 'budget-v1.xlsx', mentorFeedback: 'Capex still includes monthly electricity – please split.' },
{ id: 't-5', programmeId: 'prog-agri', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', title: 'Complete food safety basics course', description: 'Assigned in the Training Hub.', dueDate: '2026-09-30', evidenceRequired: 'Course certificate', status: 'Done', evidenceFile: 'certificate.pdf' },
{ id: 't-6', programmeId: 'prog-digital', beneficiaryId: 'ben-6', mentorId: 'prov-sarah', title: 'Run 5 customer interviews', description: 'Validate pricing for school bundles.', dueDate: '2026-11-08', evidenceRequired: 'Interview summary', status: 'Assigned' }];


export const sessions: Session[] = [
{ id: 's-1', programmeId: 'prog-agri', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', date: '2026-10-28T10:00', durationMinutes: 60, topics: 'Offtake negotiation prep', outcomes: '', nextActions: '', status: 'Upcoming' },
{ id: 's-2', programmeId: 'prog-agri', beneficiaryId: 'ben-3', mentorId: 'prov-sarah', date: '2026-10-28T14:00', durationMinutes: 45, topics: 'Budget restructure', outcomes: '', nextActions: '', status: 'Upcoming' },
{ id: 's-3', programmeId: 'prog-agri', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', date: '2026-10-14T09:00', durationMinutes: 90, topics: 'Cash flow and seasonal planning', outcomes: 'Identified 2-month working capital gap in winter.', nextActions: 'Draft 12-month forecast; explore input-supplier credit.', status: 'Completed' },
{ id: 's-4', programmeId: 'prog-agri', beneficiaryId: 'ben-2', mentorId: 'prov-sarah', date: '2026-10-09T11:00', durationMinutes: 60, topics: 'Compliance check-in', outcomes: 'Tax clearance outstanding; CIPC annual return filed.', nextActions: 'Register on SARS eFiling this week.', status: 'Completed' },
{ id: 's-5', programmeId: 'prog-digital', beneficiaryId: 'ben-6', mentorId: 'prov-sarah', date: '2026-10-30T15:00', durationMinutes: 60, topics: 'Pricing workshop', outcomes: '', nextActions: '', status: 'Upcoming' }];


export const reports: MEReport[] = [
{ id: 'r-1', programmeId: 'prog-agri', mentorId: 'prov-sarah', period: 'September 2026', periodType: 'Monthly', dueDate: '2026-10-05', status: 'Approved', sessionsHeld: 7, tasksCompleted: 9, tasksTotal: 11, averageEvaluation: 3.8, summary: 'All three beneficiaries engaged. Mahlangu Fresh Produce validated business model.', challenges: 'Green Roots irrigation costs higher than planned.', submittedDate: '2026-10-03', orgComment: 'Thank you – good detail on risks.' },
{ id: 'r-2', programmeId: 'prog-agri', mentorId: 'prov-sarah', period: 'October 2026', periodType: 'Monthly', dueDate: '2026-11-05', status: 'Draft', sessionsHeld: 0, tasksCompleted: 0, tasksTotal: 0, averageEvaluation: 0, summary: '', challenges: '' },
{ id: 'r-3', programmeId: 'prog-digital', mentorId: 'prov-thabo', period: 'Q3 2026', periodType: 'Quarterly', dueDate: '2026-10-15', status: 'Submitted', sessionsHeld: 14, tasksCompleted: 18, tasksTotal: 22, averageEvaluation: 4.1, summary: 'PayLink Mobile MVP launched with 340 users. Strong cohort momentum.', challenges: 'Two founders struggling with time commitment.', submittedDate: '2026-10-14' },
{ id: 'r-4', programmeId: 'prog-agri', mentorId: 'prov-lerato', period: 'Q3 2026', periodType: 'Quarterly', dueDate: '2026-10-10', status: 'Submitted', sessionsHeld: 6, tasksCompleted: 0, tasksTotal: 0, averageEvaluation: 3.5, summary: 'Site visits to 4 beneficiaries. Data collection on jobs and revenue complete.', challenges: 'Kasi Poultry Farm still without assigned mentor.', submittedDate: '2026-10-09' },
{ id: 'r-5', programmeId: 'prog-digital', mentorId: 'prov-sarah', period: 'September 2026', periodType: 'Monthly', dueDate: '2026-10-05', status: 'Changes requested', sessionsHeld: 3, tasksCompleted: 2, tasksTotal: 4, averageEvaluation: 3.6, summary: 'TutorHub onboarding sessions completed.', challenges: '', submittedDate: '2026-10-06', orgComment: 'Please add training attendance numbers.' }];


export const signoffs: MilestoneSignoff[] = [
{ id: 'so-1', programmeId: 'prog-agri', milestoneId: 'm-agri-1', beneficiaryId: 'ben-2', mentorId: 'prov-sarah', evidence: 'Validated model with 20 customer interviews and pilot sales of R18,400.', status: 'Requested', requestedDate: '2026-10-22' },
{ id: 'so-2', programmeId: 'prog-digital', milestoneId: 'm-dig-1', beneficiaryId: 'ben-5', mentorId: 'prov-thabo', evidence: 'MVP live on Play Store, 340 active users.', status: 'Requested', requestedDate: '2026-10-19' },
{ id: 'so-3', programmeId: 'prog-agri', milestoneId: 'm-agri-1', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', evidence: 'Signed pilot supply with 2 retailers.', status: 'Approved', requestedDate: '2026-09-28' }];


export const monthlyReturns: MonthlyReturn[] = [
{ id: 'mr-1', beneficiaryId: 'ben-1', month: '2026-08', revenue: 46200, employees: 6, notes: '' },
{ id: 'mr-2', beneficiaryId: 'ben-1', month: '2026-09', revenue: 58900, employees: 8, notes: 'Added two seasonal pickers.' }];