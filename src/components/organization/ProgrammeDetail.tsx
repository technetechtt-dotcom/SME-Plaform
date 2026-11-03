import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon, UsersIcon } from 'lucide-react';
import { Programme } from '../../types/platform';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { ProgressBar } from '../common/ProgressBar';
import { EmptyState } from '../common/EmptyState';
import { AppointProviderModal } from './AppointProviderModal';
import { formatCurrency, formatDate } from '../../utils/format';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface ProgrammeDetailProps {
  programme: Programme;
  onBack: () => void;
}

type Tab = 'beneficiaries' | 'providers' | 'milestones';

export function ProgrammeDetail({ programme, onBack }: ProgrammeDetailProps) {
  const { enrollments, appointments, signoffs, getBeneficiary, getProvider, assignMentor } = usePlatform();
  const { notify } = useToast();
  const [tab, setTab] = useState<Tab>('beneficiaries');
  const [appointing, setAppointing] = useState(false);

  const en = enrollments.filter((e) => e.programmeId === programme.id);
  const ap = appointments.filter((a) => a.programmeId === programme.id);
  const developmentProviders = ap.filter((a) => a.scope.includes('Development'));

  const tabs: {id: Tab;label: string;count: number;}[] = [
  { id: 'beneficiaries', label: 'Beneficiaries', count: en.length },
  { id: 'providers', label: 'Service providers', count: ap.length },
  { id: 'milestones', label: 'Milestones & KPIs', count: programme.milestones.length }];


  return (
    <div className="space-y-6">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeftIcon className="w-4 h-4" />
        All programmes
      </button>

      <header className="bg-white rounded-lg border border-gray-200 p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">{programme.name}</h1>
            <StatusBadge status={programme.status} />
          </div>
          <p className="mt-1 text-sm text-gray-600">{programme.description}</p>
          <p className="mt-2 text-xs text-gray-500">
            {programme.type} · {formatDate(programme.startDate)} – {formatDate(programme.endDate)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Disbursed</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatCurrency(programme.disbursed)}{' '}
            <span className="text-sm font-normal text-gray-500">/ {formatCurrency(programme.budget)}</span>
          </p>
          <div className="mt-2">
            <ProgressBar value={programme.disbursed / programme.budget * 100} tone="amber" label="Disbursed" />
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200 flex gap-6 overflow-x-auto" role="tablist">
        {tabs.map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={tab === t.id}
          onClick={() => setTab(t.id)}
          className={`pb-3 -mb-px text-sm font-medium border-b-2 whitespace-nowrap transition-colors duration-150 ${tab === t.id ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          
            {t.label} <span className="text-gray-400">{t.count}</span>
          </button>
        )}
      </div>

      {tab === 'beneficiaries' &&
      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {en.length === 0 ?
        <EmptyState
          icon={<UsersIcon className="w-5 h-5" />}
          title="No beneficiaries enrolled yet"
          description="Enrol applicants from the Applications page to start this cohort." /> :


        <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
                  <tr>
                    <th className="px-5 py-2">Beneficiary</th>
                    <th className="px-5 py-2">Mentor</th>
                    <th className="px-5 py-2 w-40">Progress</th>
                    <th className="px-5 py-2 text-right">Milestones</th>
                    <th className="px-5 py-2 text-right">Jobs</th>
                    <th className="px-5 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {en.map((e) => {
                const b = getBeneficiary(e.beneficiaryId);
                return (
                  <tr key={e.id}>
                        <td className="px-5 py-3">
                          <p className="font-medium text-gray-900">{b?.businessName}</p>
                          <p className="text-xs text-gray-500">
                            {b?.founder} · {b?.province}
                          </p>
                        </td>
                        <td className="px-5 py-3">
                          <select
                        aria-label={`Mentor for ${b?.businessName}`}
                        className={`${inputClass} ${roleThemes.organization.ring} py-1.5 min-w-[11rem] ${!e.mentorId ? 'border-red-300' : ''}`}
                        value={e.mentorId || ''}
                        onChange={(ev) => {
                          assignMentor(e.id, ev.target.value);
                          notify(`${getProvider(ev.target.value)?.name} assigned to ${b?.businessName}`);
                        }}>
                        
                            <option value="" disabled>
                              Assign mentor…
                            </option>
                            {developmentProviders.map((a) =>
                        <option key={a.providerId} value={a.providerId}>
                                {getProvider(a.providerId)?.name}
                              </option>
                        )}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <ProgressBar value={e.progress} label="Progress" />
                            <span className="text-xs text-gray-600 w-9 text-right">{e.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right text-gray-900">
                          {e.milestonesDone}/{programme.milestones.length}
                        </td>
                        <td className="px-5 py-3 text-right text-gray-900">{e.jobsCreated}</td>
                        <td className="px-5 py-3">
                          <StatusBadge status={e.risk} />
                        </td>
                      </tr>);

              })}
                </tbody>
              </table>
            </div>
        }
        </section>
      }

      {tab === 'providers' &&
      <section className="space-y-3">
          <div className="flex justify-end">
            <Button onClick={() => setAppointing(true)}>
              <PlusIcon className="w-4 h-4" />
              Appoint provider
            </Button>
          </div>
          <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {ap.map((a) => {
            const provider = getProvider(a.providerId);
            const assigned = en.filter((e) => e.mentorId === a.providerId).length;
            return (
              <li key={a.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center px-5 py-4">
                  <div className="sm:col-span-5">
                    <p className="text-sm font-semibold text-gray-900">{provider?.company}</p>
                    <p className="text-xs text-gray-500">
                      {provider?.name} · {provider?.email}
                    </p>
                  </div>
                  <div className="sm:col-span-4 flex flex-wrap gap-1">
                    {a.scope.map((s) =>
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {s}
                      </span>
                  )}
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-xs text-gray-500 mb-1">
                      {assigned} of {a.capacity} beneficiaries
                    </p>
                    <ProgressBar value={assigned / a.capacity * 100} tone="green" label="Capacity used" />
                  </div>
                </li>);

          })}
            {ap.length === 0 &&
          <li>
                <EmptyState
              icon={<UsersIcon className="w-5 h-5" />}
              title="No providers appointed"
              description="Appoint mentors, trainers or M&E partners to support this cohort." />
            
              </li>
          }
          </ul>
        </section>
      }

      {tab === 'milestones' &&
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ol className="lg:col-span-2 bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {programme.milestones.map((m, i) => {
            const approved = signoffs.filter((s) => s.milestoneId === m.id && s.status === 'Approved').length;
            const pending = signoffs.filter((s) => s.milestoneId === m.id && s.status === 'Requested').length;
            return (
              <li key={m.id} className="flex items-start gap-4 px-5 py-4">
                  <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{m.title}</p>
                    <p className="text-xs text-gray-500">
                      Due {formatDate(m.dueDate)} · {formatCurrency(m.trancheAmount)} tranche per beneficiary
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-medium text-gray-900">
                      {approved}/{en.length} signed off
                    </p>
                    {pending > 0 && <p className="text-amber-700">{pending} awaiting review</p>}
                  </div>
                </li>);

          })}
            {programme.milestones.length === 0 &&
          <li className="px-5 py-6 text-sm text-gray-500">No funded milestones defined.</li>
          }
          </ol>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900">KPIs providers report on</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              {programme.kpis.map((k) =>
            <li key={k}>{k}</li>
            )}
            </ul>
          </div>
        </section>
      }

      {appointing && <AppointProviderModal programmeId={programme.id} onClose={() => setAppointing(false)} />}
    </div>);

}