import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error ?
      <p className="mt-1 text-xs text-red-600">{error}</p> :

      hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>
      }
    </div>);

}