import React from 'react';
import {
  UploadIcon,
  FileTextIcon,
  BanknoteIcon,
  BarChart2Icon,
  CalendarIcon,
  MessageSquareIcon } from
'lucide-react';
export function QuickActions() {
  const actions = [
  {
    id: 'upload',
    name: 'Upload Documents',
    icon: <UploadIcon className="w-5 h-5 text-blue-500" />,
    color: 'bg-blue-100'
  },
  {
    id: 'apply',
    name: 'Apply for Funding',
    icon: <BanknoteIcon className="w-5 h-5 text-green-500" />,
    color: 'bg-green-100'
  },
  {
    id: 'reports',
    name: 'View Reports',
    icon: <FileTextIcon className="w-5 h-5 text-purple-500" />,
    color: 'bg-purple-100'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: <BarChart2Icon className="w-5 h-5 text-amber-500" />,
    color: 'bg-amber-100'
  },
  {
    id: 'schedule',
    name: 'Schedule Meeting',
    icon: <CalendarIcon className="w-5 h-5 text-red-500" />,
    color: 'bg-red-100'
  },
  {
    id: 'support',
    name: 'Get Support',
    icon: <MessageSquareIcon className="w-5 h-5 text-indigo-500" />,
    color: 'bg-indigo-100'
  }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action) =>
        <button
          key={action.id}
          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
          
            <div
            className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center mb-2`}>
            
              {action.icon}
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
              {action.name}
            </span>
          </button>
        )}
      </div>
    </div>);

}