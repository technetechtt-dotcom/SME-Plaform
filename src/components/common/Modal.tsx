import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

const sizes = {
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
};

export function Modal({ title, subtitle, onClose, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="overlay-enter absolute inset-0 bg-gray-900/50"
        onClick={onClose}
        aria-hidden="true" />
      
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`panel-enter relative w-full ${sizes[size]} bg-white rounded-t-xl sm:rounded-xl shadow-xl flex flex-col max-h-[92vh]`}>
        
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Close">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer &&
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex flex-wrap justify-end gap-3">
            {footer}
          </div>
        }
      </div>
    </div>);

}