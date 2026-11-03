import { Course, CourseAssignment } from '../types/platform';

export const courses: Course[] = [
{
  id: 'c-1',
  title: 'Financial Management Fundamentals',
  category: 'Finance',
  level: 'Beginner',
  duration: '4 hours',
  rating: 4.8,
  description: 'Cash flow, budgeting and basic financial statements for small businesses.',
  modules: [
  { id: 'c1-m1', title: 'Understanding cash flow', type: 'video', duration: '45 min' },
  { id: 'c1-m2', title: 'Building a budget', type: 'interactive', duration: '60 min' },
  { id: 'c1-m3', title: 'Reading your income statement', type: 'video', duration: '45 min' },
  { id: 'c1-m4', title: 'Assessment', type: 'assessment', duration: '30 min' }]

},
{
  id: 'c-2',
  title: 'Market Entry Strategy for African Markets',
  category: 'Business Strategy',
  level: 'Intermediate',
  duration: '5 hours',
  rating: 4.7,
  description: 'Regulatory, cultural and distribution considerations for expanding across Africa.',
  modules: [
  { id: 'c2-m1', title: 'Market landscape overview', type: 'video', duration: '45 min' },
  { id: 'c2-m2', title: 'Distribution channels', type: 'video', duration: '45 min' },
  { id: 'c2-m3', title: 'Pricing workshop', type: 'interactive', duration: '60 min' },
  { id: 'c2-m4', title: 'Assessment', type: 'assessment', duration: '30 min' }]

},
{
  id: 'c-3',
  title: 'Food Safety & Agri Compliance Basics',
  category: 'Compliance',
  level: 'Beginner',
  duration: '3 hours',
  rating: 4.9,
  description: 'Food safety standards and certifications needed to supply retailers.',
  modules: [
  { id: 'c3-m1', title: 'Retail supplier requirements', type: 'video', duration: '40 min' },
  { id: 'c3-m2', title: 'Hygiene and traceability', type: 'interactive', duration: '60 min' },
  { id: 'c3-m3', title: 'Assessment', type: 'assessment', duration: '30 min' }]

},
{
  id: 'c-4',
  title: 'Pitching to Funders',
  category: 'Funding',
  level: 'Intermediate',
  duration: '3.5 hours',
  rating: 4.6,
  description: 'Prepare a funder-ready pitch for DFIs, grant makers and investors.',
  modules: [
  { id: 'c4-m1', title: 'What funders look for', type: 'video', duration: '40 min' },
  { id: 'c4-m2', title: 'Pitch practice lab', type: 'interactive', duration: '90 min' },
  { id: 'c4-m3', title: 'Assessment', type: 'assessment', duration: '30 min' }]

},
{
  id: 'c-5',
  title: 'Leading a Small Team',
  category: 'Leadership',
  level: 'Advanced',
  duration: '6 hours',
  rating: 4.9,
  description: 'Hiring, performance conversations and building culture in a growing business.',
  modules: [
  { id: 'c5-m1', title: 'Hiring your first employees', type: 'video', duration: '60 min' },
  { id: 'c5-m2', title: 'Performance and feedback', type: 'video', duration: '60 min' },
  { id: 'c5-m3', title: 'Culture workshop', type: 'interactive', duration: '90 min' },
  { id: 'c5-m4', title: 'Assessment', type: 'assessment', duration: '30 min' }]

}];


export const courseAssignments: CourseAssignment[] = [
{ id: 'ca-1', courseId: 'c-3', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', programmeId: 'prog-agri', dueDate: '2026-09-30', progress: 100, notes: 'Required before retailer audits.' },
{ id: 'ca-2', courseId: 'c-1', beneficiaryId: 'ben-1', mentorId: 'prov-sarah', programmeId: 'prog-agri', dueDate: '2026-11-15', progress: 50, notes: 'Focus on modules 1 and 2 before our forecast session.' },
{ id: 'ca-3', courseId: 'c-1', beneficiaryId: 'ben-3', mentorId: 'prov-sarah', programmeId: 'prog-agri', dueDate: '2026-11-10', progress: 25, notes: '' },
{ id: 'ca-4', courseId: 'c-4', beneficiaryId: 'ben-6', mentorId: 'prov-sarah', programmeId: 'prog-digital', dueDate: '2026-11-30', progress: 0, notes: 'Ahead of demo day.' }];