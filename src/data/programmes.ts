import { Programme } from '../types/platform';

export const programmes: Programme[] = [
{
  id: 'prog-agri',
  organizationId: 'org-nyda',
  name: 'Youth Agri Incubator 2026',
  type: 'Incubation',
  startDate: '2026-02-01',
  endDate: '2027-01-31',
  budget: 4800000,
  disbursed: 1920000,
  kpis: ['Jobs created', 'Revenue growth', 'Market access contracts'],
  status: 'Active',
  description:
  '12-month incubation for youth-owned agribusinesses in Limpopo and Mpumalanga.',
  milestones: [
  { id: 'm-agri-1', title: 'Business model validated', dueDate: '2026-04-30', trancheAmount: 40000 },
  { id: 'm-agri-2', title: 'First offtake agreement signed', dueDate: '2026-08-31', trancheAmount: 80000 },
  { id: 'm-agri-3', title: 'Break-even month achieved', dueDate: '2026-12-15', trancheAmount: 80000 }]

},
{
  id: 'prog-digital',
  organizationId: 'org-nyda',
  name: 'Digital Founders Accelerator',
  type: 'Accelerator',
  startDate: '2026-06-01',
  endDate: '2026-12-15',
  budget: 2600000,
  disbursed: 650000,
  kpis: ['Paying customers', 'Investor readiness score', 'Jobs created'],
  status: 'Active',
  description: '6-month accelerator for youth-led tech start-ups in Gauteng.',
  milestones: [
  { id: 'm-dig-1', title: 'MVP live with first users', dueDate: '2026-08-15', trancheAmount: 50000 },
  { id: 'm-dig-2', title: '10 paying customers', dueDate: '2026-10-31', trancheAmount: 75000 }]

},
{
  id: 'prog-township',
  organizationId: 'org-nyda',
  name: 'Township Enterprise Grant 2027',
  type: 'Grant',
  startDate: '2027-01-15',
  endDate: '2027-12-15',
  budget: 3500000,
  disbursed: 0,
  kpis: ['Businesses formalised', 'Jobs created'],
  status: 'Open for applications',
  description:
  'Grant funding and coaching for township retail and service businesses.',
  milestones: [
  { id: 'm-town-1', title: 'Business registered and compliant', dueDate: '2027-03-31', trancheAmount: 25000 }]

},
{
  id: 'prog-sedfa-loan',
  organizationId: 'org-sedfa',
  name: 'SEDFA Manufacturing Loan Support',
  type: 'Loan',
  startDate: '2027-02-01',
  endDate: '2028-01-31',
  budget: 9000000,
  disbursed: 0,
  kpis: ['Repayment rate', 'Capacity utilisation'],
  status: 'Open for applications',
  description: 'Blended loan finance with post-investment mentorship for manufacturers.',
  milestones: []
}];