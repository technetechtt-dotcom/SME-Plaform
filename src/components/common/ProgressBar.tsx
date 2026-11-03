import React from 'react';

interface ProgressBarProps {
  value: number;
  tone?: 'green' | 'blue' | 'amber' | 'red';
  label?: string;
}

const toneClass = {
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  amber: 'bg-amber-500',
  red: 'bg-red-500'
};

export function ProgressBar({ value, tone = 'green', label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="w-full bg-gray-200 rounded-full h-2"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}>
      
      <div className={`${toneClass[tone]} h-2 rounded-full`} style={{ width: `${clamped}%` }} />
    </div>);

}