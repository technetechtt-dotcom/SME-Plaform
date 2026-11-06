import React from 'react';
import { MenuIcon } from 'lucide-react';
import { Role } from '../../types/platform';
import { roleThemes } from '../../utils/roleTheme';
import { initials } from '../../utils/format';

interface TopbarProps {
  role: Role;
  userName: string;
  subtitle: string;
  onOpenMenu: () => void;
}

export function Topbar({ role, userName, subtitle, onOpenMenu }: TopbarProps) {
  const theme = roleThemes[role];
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button type="button" onClick={onOpenMenu} className="lg:hidden p-2 -ml-2 rounded-md text-gray-500 hover:bg-gray-100" aria-label="Open navigation">
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`hidden sm:inline-flex text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${theme.badge}`}>{theme.label}</span>
        <span className="h-9 w-9 rounded-full bg-gray-900 text-white text-sm font-semibold flex items-center justify-center" aria-label={userName}>
          {initials(userName)}
        </span>
      </div>
    </header>
  );
}
