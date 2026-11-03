import { Role } from '../types/platform';

interface RoleTheme {
  label: string;
  portal: string;
  logo: string;
  navActive: string;
  badge: string;
  button: string;
  link: string;
  ring: string;
}

export const roleThemes: Record<Role, RoleTheme> = {
  organization: {
    label: 'Organization',
    portal: 'Organization Portal',
    logo: 'text-amber-600',
    navActive: 'bg-amber-50 text-amber-800',
    badge: 'bg-amber-100 text-amber-800',
    button: 'bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500',
    link: 'text-amber-700 hover:text-amber-900',
    ring: 'focus:ring-amber-500 focus:border-amber-500'
  },
  mentor: {
    label: 'Mentor / Service Provider',
    portal: 'Service Provider Portal',
    logo: 'text-green-700',
    navActive: 'bg-green-50 text-green-800',
    badge: 'bg-green-100 text-green-800',
    button: 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500',
    link: 'text-green-700 hover:text-green-900',
    ring: 'focus:ring-green-500 focus:border-green-500'
  },
  beneficiary: {
    label: 'Beneficiary',
    portal: 'Beneficiary Portal',
    logo: 'text-blue-600',
    navActive: 'bg-blue-50 text-blue-800',
    badge: 'bg-blue-100 text-blue-800',
    button: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    link: 'text-blue-700 hover:text-blue-900',
    ring: 'focus:ring-blue-500 focus:border-blue-500'
  }
};

export const inputClass =
'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0';