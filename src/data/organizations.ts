import { Organization } from '../types/platform';

export const organizations: Organization[] = [
{
  id: 'org-nyda',
  name: 'National Youth Development Agency',
  shortName: 'NYDA',
  mandate: 'Youth enterprise development and job creation'
},
{
  id: 'org-sedfa',
  name: 'Small Enterprise Development & Finance Agency',
  shortName: 'SEDFA',
  mandate: 'Finance and support for small enterprises'
},
{
  id: 'org-idc',
  name: 'Industrial Development Corporation',
  shortName: 'IDC',
  mandate: 'Industrial capacity and funding'
},
{
  id: 'org-nef',
  name: 'National Empowerment Fund',
  shortName: 'NEF',
  mandate: 'Black economic empowerment funding'
}];


export const currentOrganizationId = 'org-nyda';