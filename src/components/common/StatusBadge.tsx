import React from 'react';

const tones: Record<string, string> = {
  // tasks
  Assigned: 'bg-gray-100 text-gray-700',
  Submitted: 'bg-blue-100 text-blue-800',
  Returned: 'bg-amber-100 text-amber-800',
  Done: 'bg-green-100 text-green-800',
  Overdue: 'bg-red-100 text-red-800',
  // reports
  Draft: 'bg-gray-100 text-gray-700',
  'Changes requested': 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
  // sign-offs
  Requested: 'bg-blue-100 text-blue-800',
  Rejected: 'bg-red-100 text-red-800',
  // risk
  'On track': 'bg-green-100 text-green-800',
  'Needs attention': 'bg-amber-100 text-amber-800',
  'At risk': 'bg-red-100 text-red-800',
  // programmes / applications
  Active: 'bg-green-100 text-green-800',
  'Open for applications': 'bg-blue-100 text-blue-800',
  Completed: 'bg-gray-100 text-gray-700',
  Upcoming: 'bg-blue-100 text-blue-800',
  'Pending review': 'bg-gray-100 text-gray-700',
  Shortlisted: 'bg-blue-100 text-blue-800',
  Enrolled: 'bg-green-100 text-green-800',
  Declined: 'bg-red-100 text-red-800'
};

export function StatusBadge({ status }: {status: string;}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap px-2 py-0.5 rounded-full text-xs font-medium ${tones[status] || 'bg-gray-100 text-gray-700'}`}>
      
      {status}
    </span>);

}