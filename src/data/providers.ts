import { Appointment, ServiceProvider } from '../types/platform';

export const providers: ServiceProvider[] = [
{
  id: 'prov-sarah',
  name: 'Dr. Sarah Johnson',
  company: 'Thrive Business Advisory',
  specialties: ['Agribusiness', 'Financial management'],
  email: 'sarah@thriveadvisory.co.za'
},
{
  id: 'prov-thabo',
  name: 'Thabo Nkosi',
  company: 'mLab Venture Coaching',
  specialties: ['Product', 'Go-to-market'],
  email: 'thabo@mlabcoach.co.za'
},
{
  id: 'prov-lerato',
  name: 'Lerato Mokoena',
  company: 'Impact Metrics SA',
  specialties: ['Monitoring & evaluation', 'Compliance'],
  email: 'lerato@impactmetrics.co.za'
},
{
  id: 'prov-pieter',
  name: 'Pieter van Wyk',
  company: 'AB4iR Digital Skills',
  specialties: ['Digital transformation', 'Training'],
  email: 'pieter@ab4ir.org'
}];


export const currentProviderId = 'prov-sarah';

export const appointments: Appointment[] = [
{ id: 'app-1', providerId: 'prov-sarah', programmeId: 'prog-agri', scope: ['Development', 'M&E'], capacity: 8 },
{ id: 'app-2', providerId: 'prov-sarah', programmeId: 'prog-digital', scope: ['Training'], capacity: 4 },
{ id: 'app-3', providerId: 'prov-thabo', programmeId: 'prog-digital', scope: ['Development', 'Training'], capacity: 6 },
{ id: 'app-4', providerId: 'prov-lerato', programmeId: 'prog-agri', scope: ['M&E'], capacity: 12 }];