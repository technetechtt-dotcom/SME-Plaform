import { Application, Beneficiary, Enrollment } from '../types/platform';

export const beneficiaries: Beneficiary[] = [
{ id: 'ben-1', businessName: 'Mahlangu Fresh Produce', founder: 'Sipho Mahlangu', sector: 'Agriculture', province: 'Mpumalanga' },
{ id: 'ben-2', businessName: 'Limpopo Honey Co.', founder: 'Naledi Baloyi', sector: 'Agriculture', province: 'Limpopo' },
{ id: 'ben-3', businessName: 'Green Roots Hydroponics', founder: 'Kagiso Maluleke', sector: 'Agriculture', province: 'Limpopo' },
{ id: 'ben-4', businessName: 'Kasi Poultry Farm', founder: 'Zanele Mthembu', sector: 'Agriculture', province: 'Mpumalanga' },
{ id: 'ben-5', businessName: 'PayLink Mobile', founder: 'Ayanda Dube', sector: 'Fintech', province: 'Gauteng' },
{ id: 'ben-6', businessName: 'TutorHub SA', founder: 'Neo Molefe', sector: 'Edtech', province: 'Gauteng' }];


export const currentBeneficiaryId = 'ben-1';

export const enrollments: Enrollment[] = [
{ id: 'en-1', beneficiaryId: 'ben-1', programmeId: 'prog-agri', mentorId: 'prov-sarah', progress: 62, milestonesDone: 1, risk: 'On track', jobsCreated: 4, revenueGrowth: 38 },
{ id: 'en-2', beneficiaryId: 'ben-2', programmeId: 'prog-agri', mentorId: 'prov-sarah', progress: 48, milestonesDone: 1, risk: 'Needs attention', jobsCreated: 2, revenueGrowth: 12 },
{ id: 'en-3', beneficiaryId: 'ben-3', programmeId: 'prog-agri', mentorId: 'prov-sarah', progress: 24, milestonesDone: 0, risk: 'At risk', jobsCreated: 0, revenueGrowth: -6 },
{ id: 'en-4', beneficiaryId: 'ben-4', programmeId: 'prog-agri', mentorId: null, progress: 10, milestonesDone: 0, risk: 'Needs attention', jobsCreated: 1, revenueGrowth: 4 },
{ id: 'en-5', beneficiaryId: 'ben-5', programmeId: 'prog-digital', mentorId: 'prov-thabo', progress: 55, milestonesDone: 1, risk: 'On track', jobsCreated: 3, revenueGrowth: 64 },
{ id: 'en-6', beneficiaryId: 'ben-6', programmeId: 'prog-digital', mentorId: 'prov-sarah', progress: 40, milestonesDone: 0, risk: 'On track', jobsCreated: 2, revenueGrowth: 22 },
{ id: 'en-7', beneficiaryId: 'ben-1', programmeId: 'prog-digital', mentorId: 'prov-sarah', progress: 15, milestonesDone: 0, risk: 'On track', jobsCreated: 0, revenueGrowth: 0 }];


export const applications: Application[] = [
{ id: 'apl-1', businessName: 'Soweto Spaza Collective', founder: 'Lindiwe Khumalo', sector: 'Retail', province: 'Gauteng', programmeId: 'prog-township', submittedDate: '2026-10-12', score: 81, status: 'Pending review' },
{ id: 'apl-2', businessName: 'Umlazi Auto Repairs', founder: 'Bongani Zulu', sector: 'Services', province: 'KwaZulu-Natal', programmeId: 'prog-township', submittedDate: '2026-10-15', score: 74, status: 'Shortlisted' },
{ id: 'apl-3', businessName: 'Tembisa Bakery', founder: 'Palesa Ndlovu', sector: 'Food', province: 'Gauteng', programmeId: 'prog-township', submittedDate: '2026-10-18', score: 68, status: 'Pending review' },
{ id: 'apl-4', businessName: 'Venda Macadamia Growers', founder: 'Rudzani Netshitenzhe', sector: 'Agriculture', province: 'Limpopo', programmeId: 'prog-agri', submittedDate: '2026-10-20', score: 77, status: 'Pending review' },
{ id: 'apl-5', businessName: 'CodeCrafters Studio', founder: 'Tumi Sithole', sector: 'Software', province: 'Gauteng', programmeId: 'prog-digital', submittedDate: '2026-10-21', score: 59, status: 'Declined' }];