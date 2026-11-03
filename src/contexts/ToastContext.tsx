import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircleIcon, AlertCircleIcon, XIcon } from 'lucide-react';

type ToastTone = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue>({ notify: () => undefined });

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm"
        role="status"
        aria-live="polite">
        
        {toasts.map((toast) =>
        <div
          key={toast.id}
          className="toast-enter flex items-start gap-3 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3">
          
            {toast.tone === 'success' ?
          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" /> :

          <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
          }
            <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
            <button
            onClick={() => dismiss(toast.id)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss notification">
            
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>);

}

export function useToast() {
  return useContext(ToastContext);
}