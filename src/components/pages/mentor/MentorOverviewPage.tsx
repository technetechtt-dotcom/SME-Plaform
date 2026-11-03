import React, { useState } from 'react';
import { CalendarIcon, ClipboardCheckIcon, FileTextIcon, PlusIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useMentorScope } from '../../../hooks/useMentorScope';
import { Session, Task } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { LogSessionModal } from '../../mentor/LogSessionModal';
import { ReviewTaskModal } from '../../mentor/ReviewTaskModal';
import { formatDate, formatDateTime } from '../../../utils/format';

interface MentorOverviewPageProps {
  onNavigate: (id: string) => void;
}

export function MentorOverviewPage({ onNavigate }: MentorOverviewPageProps) {
  const { getBeneficiary, getProgramme } = usePlatform();
  const { mentor, programmes, enrollments, sessions, tasks, reports, myAppointments } = useMentorScope();
  const [logging, setLogging] = useState<Session | 'new' | null>(null);
  const [reviewing, setReviewing] = useState<Task | null>(null);

  const upcoming = sessions.
  filter((s) => s.status === 'Upcoming').
  sort((a, b) => a.date.localeCompare(b.date));
  const toReview = tasks.filter((t) => t.status === 'Submitted');
  const reportsDue = reports.filter((r) => r.status === 'Draft' || r.status === 'Changes requested' || r.status === 'Overdue');
  const atRisk = enrollments.filter((e) => e.risk !== 'On track');

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${mentor.name.split(' ').slice(-2).join(' ')}`}
        description={`${mentor.company} · appointed to ${programmes.length} programmes · ${enrollments.length} beneficiaries`}
        actions={
        <Button role="mentor" onClick={() => setLogging('new')}>
            <PlusIcon className="w-4 h-4" />
            Log session
          </Button>
        } />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Upcoming sessions</h2>
            <button onClick={() => onNavigate('sessions')} className="text-sm font-medium text-green-700 hover:text-green-900">
              All sessions
            </button>
          </div>
          {upcoming.length === 0 ?
          <EmptyState icon={<CalendarIcon className="w-5 h-5" />} title="No sessions scheduled" description="Schedule your next check-in with a beneficiary." /> :

          <ul className="divide-y divide-gray-100">
              {upcoming.map((s) =>
            <li key={s.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
                  <div className="w-28 flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{formatDateTime(s.date)}</p>
                    <p className="text-xs text-gray-500">{s.durationMinutes} min</p>
                  </div>
                  <div className="flex-1 min-w-[10rem]">
                    <p className="text-sm font-medium text-gray-900">{getBeneficiary(s.beneficiaryId)?.businessName}</p>
                    <p className="text-xs text-gray-500">{s.topics}</p>
                  </div>
                  <Button role="mentor" variant="secondary" size="sm" onClick={() => setLogging(s)}>
                    Log outcome
                  </Button>
                </li>
            )}
            </ul>
          }
        </section>

        <section className="bg-white rounded-lg border border-gray-200">
          <h2 className="px-5 py-4 border-b border-gray-200 text-base font-semibold text-gray-900">Waiting on you</h2>
          <ul className="divide-y divide-gray-100">
            {toReview.map((t) =>
            <li key={t.id} className="flex items-start gap-3 px-5 py-3">
                <ClipboardCheckIcon className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                  <p className="text-xs text-gray-500">{getBeneficiary(t.beneficiaryId)?.businessName} submitted evidence</p>
                </div>
                <button onClick={() => setReviewing(t)} className="text-sm font-medium text-green-700 hover:text-green-900">
                  Review
                </button>
              </li>
            )}
            {reportsDue.map((r) =>
            <li key={r.id} className="flex items-start gap-3 px-5 py-3">
                <FileTextIcon className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {r.period} report · {getProgramme(r.programmeId)?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {r.status === 'Changes requested' ? 'Changes requested' : `Due ${formatDate(r.dueDate)}`}
                  </p>
                </div>
                <button onClick={() => onNavigate('reports')} className="text-sm font-medium text-green-700 hover:text-green-900">
                  Open
                </button>
              </li>
            )}
            {toReview.length + reportsDue.length === 0 &&
            <li className="px-5 py-6 text-sm text-gray-500">Nothing outstanding.</li>
            }
          </ul>
        </section>
      </div>

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">My programmes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programmes.map((p) => {
            const appointment = myAppointments.find((a) => a.programmeId === p.id);
            const mine = enrollments.filter((e) => e.programmeId === p.id);
            return (
              <article key={p.id} className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col">
                <p className="text-xs text-gray-500">{getProgramme(p.id)?.type} · appointed for {appointment?.scope.join(', ')}</p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{p.name}</h3>
                <ul className="mt-3 space-y-2 flex-1">
                  {mine.map((e) =>
                  <li key={e.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-gray-800 truncate">{getBeneficiary(e.beneficiaryId)?.businessName}</span>
                      <StatusBadge status={e.risk} />
                    </li>
                  )}
                  {mine.length === 0 && <li className="text-sm text-gray-500">No beneficiaries assigned to you yet.</li>}
                </ul>
                <button onClick={() => onNavigate('beneficiaries')} className="mt-4 self-start text-sm font-medium text-green-700 hover:text-green-900">
                  View beneficiaries
                </button>
              </article>);

          })}
        </div>
      </section>

      {atRisk.length > 0 &&
      <p className="text-sm text-gray-600">
          <span className="font-semibold text-red-700">{atRisk.length} beneficiaries</span> need extra attention this month.
        </p>
      }

      {logging && <LogSessionModal session={logging === 'new' ? undefined : logging} onClose={() => setLogging(null)} />}
      {reviewing && <ReviewTaskModal task={reviewing} onClose={() => setReviewing(null)} />}
    </div>);

}