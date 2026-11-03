import React, { useState } from 'react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useToast } from '../../../contexts/ToastContext';
import { useBeneficiaryScope } from '../../../hooks/useBeneficiaryScope';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { FormField } from '../../common/FormField';
import { inputClass, roleThemes } from '../../../utils/roleTheme';

const field = `${inputClass} ${roleThemes.beneficiary.ring}`;

function monthLabel(value: string) {
  return new Date(`${value}-01`).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
}

export function MonthlyReturnsPage() {
  const { addMonthlyReturn } = usePlatform();
  const { notify } = useToast();
  const { beneficiaryId, returns } = useBeneficiaryScope();
  const [month, setMonth] = useState('2026-10');
  const [revenue, setRevenue] = useState('');
  const [employees, setEmployees] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const sorted = [...returns].sort((a, b) => b.month.localeCompare(a.month));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (returns.some((r) => r.month === month)) return setError('You have already submitted this month');
    if (!revenue || !employees) return setError('Enter revenue and number of employees');
    addMonthlyReturn({ beneficiaryId, month, revenue: Number(revenue), employees: Number(employees), notes: notes.trim() });
    notify(`${monthLabel(month)} return submitted`);
    setRevenue('');
    setEmployees('');
    setNotes('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monthly returns"
        description="Revenue and jobs data your organization uses to measure programme impact." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="bg-white rounded-lg border border-gray-200 p-5 space-y-4 h-fit">
          <h2 className="text-base font-semibold text-gray-900">Submit a return</h2>
          <FormField label="Month" htmlFor="mr-month" required>
            <input id="mr-month" type="month" className={field} value={month} onChange={(e) => {setMonth(e.target.value);setError('');}} />
          </FormField>
          <FormField label="Revenue (R)" htmlFor="mr-rev" required>
            <input id="mr-rev" type="number" min={0} className={field} value={revenue} onChange={(e) => setRevenue(e.target.value)} />
          </FormField>
          <FormField label="Employees" htmlFor="mr-emp" required>
            <input id="mr-emp" type="number" min={0} className={field} value={employees} onChange={(e) => setEmployees(e.target.value)} />
          </FormField>
          <FormField label="Notes" htmlFor="mr-notes">
            <textarea id="mr-notes" rows={2} className={field} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </FormField>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <Button role="beneficiary" type="submit" className="w-full">
            Submit return
          </Button>
        </form>

        <section className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <tr>
                <th className="px-5 py-2">Month</th>
                <th className="px-5 py-2 text-right">Revenue</th>
                <th className="px-5 py-2 text-right">Employees</th>
                <th className="px-5 py-2">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((r) =>
              <tr key={r.id}>
                  <td className="px-5 py-3 font-medium text-gray-900">{monthLabel(r.month)}</td>
                  <td className="px-5 py-3 text-right text-gray-900">R{r.revenue.toLocaleString('en-ZA')}</td>
                  <td className="px-5 py-3 text-right text-gray-900">{r.employees}</td>
                  <td className="px-5 py-3 text-gray-600">{r.notes || '—'}</td>
                </tr>
              )}
              {sorted.length === 0 &&
              <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-gray-500">No returns submitted yet.</td>
                </tr>
              }
            </tbody>
          </table>
        </section>
      </div>
    </div>);

}