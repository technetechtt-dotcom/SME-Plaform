import React, { useState } from 'react';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useMentorScope } from '../../../hooks/useMentorScope';
import { Session } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { LogSessionModal } from '../../mentor/LogSessionModal';
import { formatDateTime } from '../../../utils/format';

export function SessionsPage() {
  const { getBeneficiary, getProgramme } = usePlatform();
  const { sessions } = useMentorScope();
  const [logging, setLogging] = useState<Session | 'new' | null>(null);

  const upcoming = sessions.filter((s) => s.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const completed = sessions.filter((s) => s.status === 'Completed').sort((a, b) => b.date.localeCompare(a.date));
  const hours = completed.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Session logs"
        description={`${completed.length} sessions logged · ${hours.toFixed(1)} contact hours on record`}
        actions={
        <Button role="mentor" onClick={() => setLogging('new')}>
            <PlusIcon className="w-4 h-4" />
            Log or schedule
          </Button>
        } />
      

      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Upcoming</h2>
        <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {upcoming.length === 0 &&
          <li>
              <EmptyState icon={<CalendarIcon className="w-5 h-5" />} title="Nothing scheduled" description="Schedule a session to see it here." />
            </li>
          }
          {upcoming.map((s) =>
          <li key={s.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
              <p className="w-32 text-sm font-semibold text-gray-900">{formatDateTime(s.date)}</p>
              <div className="flex-1 min-w-[10rem]">
                <p className="text-sm font-medium text-gray-900">{getBeneficiary(s.beneficiaryId)?.businessName}</p>
                <p className="text-xs text-gray-500">
                  {s.topics} · {s.durationMinutes} min
                </p>
              </div>
              <Button role="mentor" variant="secondary" size="sm" onClick={() => setLogging(s)}>
                Log outcome
              </Button>
            </li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Completed</h2>
        <ol className="space-y-3">
          {completed.map((s) =>
          <li key={s.id} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  {getBeneficiary(s.beneficiaryId)?.businessName}
                  <span className="font-normal text-gray-500"> · {s.topics}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatDateTime(s.date)} · {s.durationMinutes} min · {getProgramme(s.programmeId)?.name}
                </p>
              </div>
              <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-gray-500">Outcomes</dt>
                  <dd className="text-gray-800">{s.outcomes || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Next actions</dt>
                  <dd className="text-gray-800">{s.nextActions || '—'}</dd>
                </div>
              </dl>
            </li>
          )}
        </ol>
      </section>

      {logging && <LogSessionModal session={logging === 'new' ? undefined : logging} onClose={() => setLogging(null)} />}
    </div>);

}