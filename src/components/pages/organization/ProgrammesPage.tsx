import React, { useState } from 'react';
import { CalendarIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { ProgressBar } from '../../common/ProgressBar';
import { CreateProgrammeModal } from '../../organization/CreateProgrammeModal';
import { ProgrammeDetail } from '../../organization/ProgrammeDetail';
import { formatCurrency, formatDate } from '../../../utils/format';

export function ProgrammesPage() {
  const { programmes, enrollments, appointments } = useOrgScope();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const selected = programmes.find((p) => p.id === selectedId);
  if (selected) return <ProgrammeDetail programme={selected} onBack={() => setSelectedId(null)} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Programmes"
        description="Each programme groups a cohort of beneficiaries with the service providers appointed to support them."
        actions={
        <Button onClick={() => setCreating(true)}>
            <PlusIcon className="w-4 h-4" />
            New programme
          </Button>
        } />
      

      <ul className="space-y-3">
        {programmes.map((p) => {
          const en = enrollments.filter((e) => e.programmeId === p.id);
          const providerCount = appointments.filter((a) => a.programmeId === p.id).length;
          return (
            <li key={p.id}>
              <button
                onClick={() => setSelectedId(p.id)}
                className="w-full text-left bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-150 p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-gray-900">{p.name}</h2>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">{p.description}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <CalendarIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {p.type} · {formatDate(p.startDate)} – {formatDate(p.endDate)}
                  </p>
                </div>
                <dl className="md:col-span-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-xs text-gray-500">Beneficiaries</dt>
                    <dd className="font-semibold text-gray-900">{en.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Providers</dt>
                    <dd className="font-semibold text-gray-900">{providerCount}</dd>
                  </div>
                </dl>
                <div className="md:col-span-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{formatCurrency(p.disbursed)} disbursed</span>
                    <span>{formatCurrency(p.budget)}</span>
                  </div>
                  <ProgressBar value={p.disbursed / p.budget * 100} tone="amber" label={`${p.name} funding disbursed`} />
                </div>
                <ChevronRightIcon className="hidden md:block md:col-span-1 justify-self-end w-5 h-5 text-gray-400" aria-hidden="true" />
              </button>
            </li>);

        })}
      </ul>

      {creating && <CreateProgrammeModal onClose={() => setCreating(false)} />}
    </div>);

}