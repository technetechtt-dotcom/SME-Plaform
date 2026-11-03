export type Role = 'organization' | 'mentor' | 'beneficiary';

export type ProgrammeType = 'Incubation' | 'Accelerator' | 'Grant' | 'Loan';

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  mandate: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  trancheAmount: number;
}

export interface Programme {
  id: string;
  organizationId: string;
  name: string;
  type: ProgrammeType;
  startDate: string;
  endDate: string;
  budget: number;
  disbursed: number;
  kpis: string[];
  milestones: Milestone[];
  status: 'Open for applications' | 'Active' | 'Completed';
  description: string;
}

export type ProviderScope = 'M&E' | 'Training' | 'Development';

export interface ServiceProvider {
  id: string;
  name: string;
  company: string;
  specialties: string[];
  email: string;
}

export interface Appointment {
  id: string;
  providerId: string;
  programmeId: string;
  scope: ProviderScope[];
  capacity: number;
}

export type RiskLevel = 'On track' | 'Needs attention' | 'At risk';

export interface Beneficiary {
  id: string;
  businessName: string;
  founder: string;
  sector: string;
  province: string;
}

export interface Enrollment {
  id: string;
  beneficiaryId: string;
  programmeId: string;
  mentorId: string | null;
  progress: number;
  milestonesDone: number;
  risk: RiskLevel;
  jobsCreated: number;
  revenueGrowth: number;
}

export type ApplicationStatus = 'Pending review' | 'Shortlisted' | 'Enrolled' | 'Declined';

export interface Application {
  id: string;
  businessName: string;
  founder: string;
  sector: string;
  province: string;
  programmeId: string;
  submittedDate: string;
  score: number;
  status: ApplicationStatus;
}

export type TaskStatus = 'Assigned' | 'Submitted' | 'Returned' | 'Done' | 'Overdue';

export interface Task {
  id: string;
  programmeId: string;
  beneficiaryId: string;
  mentorId: string;
  title: string;
  description: string;
  dueDate: string;
  evidenceRequired: string;
  status: TaskStatus;
  evidenceFile?: string;
  evidenceNote?: string;
  mentorFeedback?: string;
}

export interface Session {
  id: string;
  programmeId: string;
  beneficiaryId: string;
  mentorId: string;
  date: string;
  durationMinutes: number;
  topics: string;
  outcomes: string;
  nextActions: string;
  status: 'Upcoming' | 'Completed';
}

export type ReportStatus = 'Draft' | 'Submitted' | 'Changes requested' | 'Approved' | 'Overdue';

export interface MEReport {
  id: string;
  programmeId: string;
  mentorId: string;
  period: string;
  periodType: 'Monthly' | 'Quarterly';
  dueDate: string;
  status: ReportStatus;
  sessionsHeld: number;
  tasksCompleted: number;
  tasksTotal: number;
  averageEvaluation: number;
  summary: string;
  challenges: string;
  orgComment?: string;
  submittedDate?: string;
}

export type SignoffStatus = 'Requested' | 'Approved' | 'Rejected';

export interface MilestoneSignoff {
  id: string;
  programmeId: string;
  milestoneId: string;
  beneficiaryId: string;
  mentorId: string;
  evidence: string;
  status: SignoffStatus;
  requestedDate: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  modules: {id: string;title: string;type: 'video' | 'interactive' | 'assessment';duration: string;}[];
  rating: number;
}

export interface CourseAssignment {
  id: string;
  courseId: string;
  beneficiaryId: string;
  mentorId: string;
  programmeId: string;
  dueDate: string;
  progress: number;
  notes: string;
}

export interface MonthlyReturn {
  id: string;
  beneficiaryId: string;
  month: string;
  revenue: number;
  employees: number;
  notes: string;
}