import React, { useState } from 'react';
import { UsersIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useMentorScope } from '../../../hooks/useMentorScope';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { LogSessionModal } from '../../mentor/LogSessionModal';
import { AssignTaskModal } from '../../mentor/AssignTaskModal';
import { formatDate } from '../../../utils/format';

export function MyBeneficiariesPage() {
  const { getBeneficiary, getProgramme } = usePlatform();
  const { programmes, enrollments, tasks, sessions } = useMentorScope();
  const [programmeFilter, setProgrammeFilter] = useState('all');
  const [action, setAction] = useState<{type: 'session' | 'task';enrollmentId: string;} | null>(null);

  const visible = enrollments.filter((e) => programmeFilter === 'all' || e.programmeId === programmeFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My beneficiaries"
        description="Only beneficiaries assigned to you in programmes you're appointed to are shown." />
      

      <div className="flex flex-wrap gap-2">
        {[{ id: 'all', name: 'All programmes' }, ...programmes].map((p) =>
        <button
          key={p.id}
          onClick={() => setProgrammeFilter(p.id)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-150 ${programmeFilter === p.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          
            {p.name}
          </button>
        )}
      </div>

      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {visible.length === 0 ?
        <EmptyState icon={<UsersIcon className="w-5 h-5" />} title="No beneficiaries" description="The organization hasn't assigned anyone to you in this programme yet." /> :

        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-5 py-2">Beneficiary</th>
                  <th className="px-5 py-2 w-40">Progress</th>
                  <th className="px-5 py-2 text-right">Open tasks</th>
                  <th className="px-5 py-2">Last session</th>
                  <th className="px-5 py-2">Next milestone</th>
                  <th className="px-5 py-2">Status</th>
                  <th className="px-5 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visible.map((e) => {
                const b = getBeneficiary(e.beneficiaryId);
                const programme = getProgramme(e.programmeId);
                const open = tasks.filter((t) => t.beneficiaryId === e.beneficiaryId && t.programmeId === e.programmeId && t.status !== 'Done').length;
                const last = sessions.
                filter((s) => s.beneficiaryId === e.beneficiaryId && s.status === 'Completed').
                sort((a, z) => z.date.localeCompare(a.date))[0];
                const nextMilestone = programme?.milestones[e.milestonesDone];
                return (
                  <tr key={e.id}>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{b?.businessName}</p>
                        <p className="text-xs text-gray-500">
                          {b?.founder} · {programme?.name}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <ProgressBar value={e.progress} label="Progress" />
                          <span className="text-xs text-gray-600 w-9 text-right">{e.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right text-gray-900">{open}</td>
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{last ? formatDate(last.date) : '—'}</td>
                      <td className="px-5 py-3 text-gray-700">{nextMilestone?.title || 'All complete'}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={e.risk} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <Button role="mentor" variant="secondary" size="sm" onClick={() => setAction({ type: 'session', enrollmentId: e.id })}>
                            Log session
                          </Button>
                          <Button role="mentor" variant="secondary" size="sm" onClick={() => setAction({ type: 'task', enrollmentId: e.id })}>
                            Assign task
                          </Button>
                        </div>
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
        }
      </section>

      {action?.type === 'session' && <LogSessionModal defaultEnrollmentId={action.enrollmentId} onClose={() => setAction(null)} />}
      {action?.type === 'task' && <AssignTaskModal defaultEnrollmentId={action.enrollmentId} onClose={() => setAction(null)} />}
    </div>);

}