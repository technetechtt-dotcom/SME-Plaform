import React from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  ClockIcon } from
'lucide-react';
const complianceItems = [
{
  id: 'cipc',
  name: 'CIPC Registration',
  status: 'complete',
  lastUpdated: '2023-05-12',
  expiryDate: '2024-05-12',
  description: 'Company registration is active and in good standing'
},
{
  id: 'sars',
  name: 'SARS Tax Compliance',
  status: 'warning',
  lastUpdated: '2023-04-10',
  expiryDate: '2023-10-30',
  description: 'Tax clearance certificate expires in 15 days'
},
{
  id: 'bee',
  name: 'B-BBEE Certificate',
  status: 'complete',
  lastUpdated: '2023-02-15',
  expiryDate: '2024-02-15',
  description: 'Level 2 B-BBEE contributor status'
},
{
  id: 'uif',
  name: 'UIF Registration',
  status: 'incomplete',
  lastUpdated: '2023-01-20',
  expiryDate: null,
  description: 'UIF registration needs to be updated'
},
{
  id: 'financial',
  name: 'Financial Statements',
  status: 'complete',
  lastUpdated: '2023-03-30',
  expiryDate: null,
  description: 'Latest financial statements submitted'
}];

export function ComplianceChecklist() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'incomplete':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          Compliance Checklist
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {complianceItems.map((item) =>
        <li key={item.id} className="px-4 py-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                  
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>Updated: {item.lastUpdated}</span>
                  {item.expiryDate &&
                <span className="ml-4">Expires: {item.expiryDate}</span>
                }
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Update Compliance
        </button>
      </div>
    </div>);

}