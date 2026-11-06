import React from 'react';
import { UploadIcon, FileTextIcon, BanknoteIcon, BarChart2Icon, CalendarIcon, MessageSquareIcon } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (page: 'profile' | 'funding' | 'returns' | 'growth') => void;
}

const actions = [
  { id: 'upload', name: 'Business profile & documents', target: 'profile', icon: UploadIcon, color: 'bg-blue-100 text-blue-600' },
  { id: 'apply', name: 'Explore funding', target: 'funding', icon: BanknoteIcon, color: 'bg-green-100 text-green-600' },
  { id: 'reports', name: 'Monthly returns', target: 'returns', icon: FileTextIcon, color: 'bg-purple-100 text-purple-600' },
  { id: 'analytics', name: 'Growth analytics', target: 'growth', icon: BarChart2Icon, color: 'bg-amber-100 text-amber-600' }
] as const;

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" aria-labelledby="quick-actions-title">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 id="quick-actions-title" className="text-sm font-medium text-gray-700">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map(({ id, name, target, icon: Icon, color }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(target)}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
          >
            <span className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-2`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-gray-700 text-center">{name}</span>
          </button>
        ))}
      </div>
      <p className="px-4 pb-4 text-xs text-gray-500">
        Meeting scheduling and support messaging will be available once their services are connected.
      </p>
    </section>
  );
}
