import React from 'react';
import { ArrowRightIcon, FileCheckIcon, FlagIcon, InboxIcon, PlusIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { ProgressBar } from '../../common/ProgressBar';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { formatCurrency, formatDate } from '../../../utils/format';

interface OrgOverviewPageProps {
  onNavigate: (id: string) => void;
}

export function OrgOverviewPage({ onNavigate }: OrgOverviewPageProps) {
  const { getProvider, getBeneficiary, getProgramme } = usePlatform();
  const { organization, programmes, enrollments, appointments, pendingReports, pendingSignoffs } =
  useOrgScope();

  const budget = programmes.reduce((sum, p) => sum + p.budget, 0);
  const disbursed = programmes.reduce((sum, p) => sum + p.disbursed, 0);
  const jobs = enrollments.reduce((sum, e) => sum + e.jobsCreated, 0);
  const providerCount = new Set(appointments.map((a) => a.providerId)).size;
  const attention = enrollments.filter((e) => e.risk !== 'On track' || !e.mentorId);

  const queue = [
  ...pendingSignoffs.map((s) => {
    const programme = getProgramme(s.programmeId);
    const milestone = programme?.milestones.find((m) => m.id === s.milestoneId);
    return {
      id: s.id,
      kind: 'Milestone sign-off' as const,
      title: `${getBeneficiary(s.beneficiaryId)?.businessName} — ${milestone?.title}`,
      meta: `${getProvider(s.mentorId)?.name} · releases ${formatCurrency(milestone?.trancheAmount || 0)}`,
      date: s.requestedDate
    };
  }),
  ...pendingReports.map((r) => ({
    id: r.id,
    kind: 'Progress report' as const,
    title: `${r.period} ${r.periodType.toLowerCase()} report — ${getProgramme(r.programmeId)?.name}`,
    meta: `${getProvider(r.mentorId)?.company}`,
    date: r.submittedDate || r.dueDate
  }))].
  sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${organization.shortName} programmes`}
        description={organization.mandate}
        actions={
        <Button onClick={() => onNavigate('programmes')}>
            <PlusIcon className="w-4 h-4" />
            New programme
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Waiting for your review</h2>
              <p className="text-sm text-gray-500">
                Reports and milestone sign-offs submitted by your service providers
              </p>
            </div>
            <span className="text-2xl font-semibold text-gray-900">{queue.length}</span>
          </div>
          {queue.length === 0 ?
          <EmptyState
            icon={<InboxIcon className="w-5 h-5" />}
            title="You're all caught up"
            description="New reports and sign-off requests from providers will appear here." /> :


          <ul className="divide-y divide-gray-100">
              {queue.map((item) =>
            <li key={item.id} className="flex items-center gap-4 px-5 py-3">
                  <span
                className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${item.kind === 'Milestone sign-off' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}
                aria-hidden="true">
                
                    {item.kind === 'Milestone sign-off' ?
                <FlagIcon className="w-4 h-4" /> :

                <FileCheckIcon className="w-4 h-4" />
                }
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {item.kind} · {item.meta} · {formatDate(item.date)}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => onNavigate('reviews')}>
                    Review
                  </Button>
                </li>
            )}
            </ul>
          }
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-sm font-medium text-gray-500">Funding deployed</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(disbursed)}</p>
          <p className="text-sm text-gray-500">of {formatCurrency(budget)} committed</p>
          <div className="mt-3">
            <ProgressBar value={disbursed / budget * 100} tone="amber" label="Funding deployed" />
          </div>
          <dl className="mt-5 divide-y divide-gray-100 text-sm">
            <div className="flex justify-between py-2">
              <dt className="text-gray-500">Beneficiaries enrolled</dt>
              <dd className="font-medium text-gray-900">{enrollments.length}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-gray-500">Service providers appointed</dt>
              <dd className="font-medium text-gray-900">{providerCount}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-gray-500">Jobs created</dt>
              <dd className="font-medium text-gray-900">{jobs}</dd>
            </div>
          </dl>
          <button
            onClick={() => onNavigate('funding')}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900">
            
            Funding & investment
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </section>
      </div>

      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Programmes</h2>
          <button
            onClick={() => onNavigate('programmes')}
            className="text-sm font-medium text-amber-700 hover:text-amber-900">
            
            Manage
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <tr>
                <th className="px-5 py-2">Programme</th>
                <th className="px-5 py-2">Status</th>
                <th className="px-5 py-2 text-right">Beneficiaries</th>
                <th className="px-5 py-2 text-right">Providers</th>
                <th className="px-5 py-2 w-48">Avg. progress</th>
                <th className="px-5 py-2 text-right">At risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programmes.map((p) => {
                const en = enrollments.filter((e) => e.programmeId === p.id);
                const avg = en.length ? en.reduce((s, e) => s + e.progress, 0) / en.length : 0;
                return (
                  <tr key={p.id}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.type}</p>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3 text-right text-gray-900">{en.length}</td>
                    <td className="px-5 py-3 text-right text-gray-900">
                      {appointments.filter((a) => a.programmeId === p.id).length}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={avg} label={`${p.name} progress`} />
                        <span className="text-xs text-gray-600 w-9 text-right">{Math.round(avg)}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={en.some((e) => e.risk === 'At risk') ? 'font-semibold text-red-700' : 'text-gray-500'}>
                        {en.filter((e) => e.risk === 'At risk').length}
                      </span>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </section>

      {attention.length > 0 &&
      <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Beneficiaries needing attention</h2>
          <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {attention.map((e) =>
          <li key={e.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-[12rem]">
                  <p className="text-sm font-medium text-gray-900">
                    {getBeneficiary(e.beneficiaryId)?.businessName}
                  </p>
                  <p className="text-xs text-gray-500">{getProgramme(e.programmeId)?.name}</p>
                </div>
                {!e.mentorId &&
            <span className="text-xs font-medium text-red-700">No mentor assigned</span>
            }
                <StatusBadge status={e.risk} />
              </li>
          )}
          </ul>
        </section>
      }
    </div>);

}