import React from 'react';
import { BuildingIcon, LogOutIcon } from 'lucide-react';
import { Role } from '../../types/platform';
import { roleThemes } from '../../utils/roleTheme';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

interface SidebarProps {
  role: Role;
  contextLabel: string;
  sections: NavSection[];
  activeItem: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
}

export function Sidebar({
  role,
  contextLabel,
  sections,
  activeItem,
  onNavigate,
  onLogout
}: SidebarProps) {
  const theme = roleThemes[role];
  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className={`flex items-center gap-2 text-lg font-bold ${theme.logo}`}>
          <BuildingIcon className="w-6 h-6" aria-hidden="true" />
          <span>EDP Connect</span>
        </div>
        <p className="mt-1 text-xs text-gray-500 truncate">{contextLabel}</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Main">
        {sections.map((section, i) =>
        <div key={section.label || i}>
            {section.label &&
          <p className="px-3 mb-1 text-xs font-medium text-gray-400">{section.label}</p>
          }
            <ul className="space-y-0.5">
              {section.items.map((item) => {
              const active = activeItem === item.id;
              return (
                <li key={item.id}>
                    <button
                    onClick={() => onNavigate(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm transition-colors duration-150 ${active ? `${theme.navActive} font-semibold` : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                    
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {!!item.badge &&
                    <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-red-600 text-white text-xs font-semibold flex items-center justify-center">
                          {item.badge}
                        </span>
                    }
                    </button>
                  </li>);

            })}
            </ul>
          </div>
        )}
      </nav>
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150">
          
          <LogOutIcon className="w-5 h-5" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>);

}