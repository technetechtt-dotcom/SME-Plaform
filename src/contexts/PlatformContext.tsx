import React, { createContext, useContext, useState } from 'react';
import {
  Application,
  ApplicationStatus,
  Appointment,
  Beneficiary,
  CourseAssignment,
  Enrollment,
  MEReport,
  MilestoneSignoff,
  MonthlyReturn,
  Programme,
  Session,
  Task } from
'../types/platform';
import { programmes as initialProgrammes } from '../data/programmes';
import { appointments as initialAppointments, providers } from '../data/providers';
import {
  applications as initialApplications,
  beneficiaries as initialBeneficiaries,
  enrollments as initialEnrollments,
  currentBeneficiaryId } from
'../data/beneficiaries';
import {
  monthlyReturns as initialReturns,
  reports as initialReports,
  sessions as initialSessions,
  signoffs as initialSignoffs,
  tasks as initialTasks } from
'../data/delivery';
import { courseAssignments as initialCourseAssignments, courses } from '../data/courses';
import { createId, todayISO } from '../utils/format';

interface PlatformContextValue {
  programmes: Programme[];
  appointments: Appointment[];
  beneficiaries: Beneficiary[];
  enrollments: Enrollment[];
  applications: Application[];
  tasks: Task[];
  sessions: Session[];
  reports: MEReport[];
  signoffs: MilestoneSignoff[];
  courseAssignments: CourseAssignment[];
  monthlyReturns: MonthlyReturn[];
  createProgramme: (p: Omit<Programme, 'id' | 'disbursed'>) => void;
  appointProvider: (a: Omit<Appointment, 'id'>) => void;
  setApplicationStatus: (id: string, status: ApplicationStatus) => void;
  enrollApplication: (applicationId: string, mentorId: string | null) => void;
  assignMentor: (enrollmentId: string, mentorId: string) => void;
  reviewReport: (id: string, status: 'Approved' | 'Changes requested', comment: string) => void;
  saveReport: (id: string, patch: Partial<MEReport>) => void;
  requestSignoff: (s: Omit<MilestoneSignoff, 'id' | 'status' | 'requestedDate'>) => void;
  reviewSignoff: (id: string, status: 'Approved' | 'Rejected') => void;
  addTask: (t: Omit<Task, 'id' | 'status'>) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  addSession: (s: Omit<Session, 'id'>) => void;
  updateSession: (id: string, patch: Partial<Session>) => void;
  assignCourse: (a: Omit<CourseAssignment, 'id' | 'progress'>) => void;
  addMonthlyReturn: (r: Omit<MonthlyReturn, 'id'>) => void;
  applyToProgramme: (programmeId: string) => void;
  getProgramme: (id: string) => Programme | undefined;
  getBeneficiary: (id: string) => Beneficiary | undefined;
  getProvider: (id: string | null) => (typeof providers)[number] | undefined;
  getCourse: (id: string) => (typeof courses)[number] | undefined;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: {children: React.ReactNode;}) {
  const [programmes, setProgrammes] = useState(initialProgrammes);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [applications, setApplications] = useState(initialApplications);
  const [tasks, setTasks] = useState(initialTasks);
  const [sessions, setSessions] = useState(initialSessions);
  const [reports, setReports] = useState(initialReports);
  const [signoffs, setSignoffs] = useState(initialSignoffs);
  const [courseAssignments, setCourseAssignments] = useState(initialCourseAssignments);
  const [monthlyReturns, setMonthlyReturns] = useState(initialReturns);

  const value: PlatformContextValue = {
    programmes,
    appointments,
    beneficiaries,
    enrollments,
    applications,
    tasks,
    sessions,
    reports,
    signoffs,
    courseAssignments,
    monthlyReturns,
    createProgramme: (p) =>
    setProgrammes((prev) => [{ ...p, id: createId('prog'), disbursed: 0 }, ...prev]),
    appointProvider: (a) =>
    setAppointments((prev) => [...prev, { ...a, id: createId('app') }]),
    setApplicationStatus: (id, status) =>
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a)),
    enrollApplication: (applicationId, mentorId) => {
      const app = applications.find((a) => a.id === applicationId);
      if (!app) return;
      const beneficiaryId = createId('ben');
      setBeneficiaries((prev) => [
      ...prev,
      {
        id: beneficiaryId,
        businessName: app.businessName,
        founder: app.founder,
        sector: app.sector,
        province: app.province
      }]
      );
      setEnrollments((prev) => [
      ...prev,
      {
        id: createId('en'),
        beneficiaryId,
        programmeId: app.programmeId,
        mentorId,
        progress: 0,
        milestonesDone: 0,
        risk: 'On track',
        jobsCreated: 0,
        revenueGrowth: 0
      }]
      );
      setApplications((prev) =>
      prev.map((a) => a.id === applicationId ? { ...a, status: 'Enrolled' } : a)
      );
    },
    assignMentor: (enrollmentId, mentorId) =>
    setEnrollments((prev) =>
    prev.map((e) => e.id === enrollmentId ? { ...e, mentorId } : e)
    ),
    reviewReport: (id, status, comment) =>
    setReports((prev) =>
    prev.map((r) => r.id === id ? { ...r, status, orgComment: comment } : r)
    ),
    saveReport: (id, patch) =>
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, ...patch } : r)),
    requestSignoff: (s) =>
    setSignoffs((prev) => [
    { ...s, id: createId('so'), status: 'Requested', requestedDate: todayISO() },
    ...prev]
    ),
    reviewSignoff: (id, status) => {
      const signoff = signoffs.find((s) => s.id === id);
      setSignoffs((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
      if (signoff && status === 'Approved') {
        const programme = programmes.find((p) => p.id === signoff.programmeId);
        const milestone = programme?.milestones.find((m) => m.id === signoff.milestoneId);
        setProgrammes((prev) =>
        prev.map((p) =>
        p.id === signoff.programmeId ?
        { ...p, disbursed: p.disbursed + (milestone?.trancheAmount || 0) } :
        p
        )
        );
        setEnrollments((prev) =>
        prev.map((e) =>
        e.beneficiaryId === signoff.beneficiaryId && e.programmeId === signoff.programmeId ?
        { ...e, milestonesDone: e.milestonesDone + 1 } :
        e
        )
        );
      }
    },
    addTask: (t) => setTasks((prev) => [{ ...t, id: createId('t'), status: 'Assigned' }, ...prev]),
    updateTask: (id, patch) =>
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, ...patch } : t)),
    addSession: (s) => setSessions((prev) => [{ ...s, id: createId('s') }, ...prev]),
    updateSession: (id, patch) =>
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s)),
    assignCourse: (a) =>
    setCourseAssignments((prev) => [{ ...a, id: createId('ca'), progress: 0 }, ...prev]),
    addMonthlyReturn: (r) =>
    setMonthlyReturns((prev) => [...prev, { ...r, id: createId('mr') }]),
    applyToProgramme: (programmeId) => {
      const me = beneficiaries.find((b) => b.id === currentBeneficiaryId);
      if (!me) return;
      setApplications((prev) => [
      {
        id: createId('apl'),
        businessName: me.businessName,
        founder: me.founder,
        sector: me.sector,
        province: me.province,
        programmeId,
        submittedDate: todayISO(),
        score: 72,
        status: 'Pending review'
      },
      ...prev]
      );
    },
    getProgramme: (id) => programmes.find((p) => p.id === id),
    getBeneficiary: (id) => beneficiaries.find((b) => b.id === id),
    getProvider: (id) => providers.find((p) => p.id === id),
    getCourse: (id) => courses.find((c) => c.id === id)
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used inside PlatformProvider');
  return ctx;
}