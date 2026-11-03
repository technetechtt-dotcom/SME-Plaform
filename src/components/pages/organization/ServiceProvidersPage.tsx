import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { providers } from '../../../data/providers';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { AppointProviderModal } from '../../organization/AppointProviderModal';

export function ServiceProvidersPage() {
  const { sessions, tasks, getProgramme } = usePlatform();
  const { appointments, enrollments, reports } = useOrgScope();
  const [appointing, setAppointing] = useState<{providerId?: string;} | null>(null);

  const appointed = providers.filter((p) => appointments.some((a) => a.providerId === p.id));
  const notAppointed = providers.filter((p) => !appointments.some((a) => a.providerId === p.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service providers"
        description="Mentors, coaches, trainers and M&E partners appointed to your programmes, and how they're delivering."
        actions={
        <Button onClick={() => setAppointing({})}>
            <PlusIcon className="w-4 h-4" />
            Appoint provider
          </Button>
        } />
      

      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <tr>
                <th className="px-5 py-2">Provider</th>
                <th className="px-5 py-2">Programmes & scope</th>
                <th className="px-5 py-2 text-right">Beneficiaries</th>
                <th className="px-5 py-2 text-right">Sessions logged</th>
                <th className="px-5 py-2 text-right">Tasks done</th>
                <th className="px-5 py-2">Latest report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointed.map((p) => {
                const ap = appointments.filter((a) => a.providerId === p.id);
                const myTasks = tasks.filter((t) => t.mentorId === p.id);
                const latest = reports.
                filter((r) => r.mentorId === p.id).
                sort((a, b) => b.dueDate.localeCompare(a.dueDate))[0];
                return (
                  <tr key={p.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{p.company}</p>
                      <p className="text-xs text-gray-500">{p.name}</p>
                      <p className="mt-1 text-xs text-gray-400">{p.specialties.join(' · ')}</p>
                    </td>
                    <td className="px-5 py-4">
                      <ul className="space-y-1">
                        {ap.map((a) =>
                        <li key={a.id} className="text-xs text-gray-700">
                            <span className="font-medium">{getProgramme(a.programmeId)?.name}</span>
                            <span className="text-gray-500"> — {a.scope.join(', ')}</span>
                          </li>
                        )}
                      </ul>
                    </td>
                    <td className="px-5 py-4 text-right text-gray-900">
                      {enrollments.filter((e) => e.mentorId === p.id).length}
                    </td>
                    <td className="px-5 py-4 text-right text-gray-900">
                      {sessions.filter((s) => s.mentorId === p.id && s.status === 'Completed').length}
                    </td>
                    <td className="px-5 py-4 text-right text-gray-900">
                      {myTasks.filter((t) => t.status === 'Done').length}/{myTasks.length}
                    </td>
                    <td className="px-5 py-4">
                      {latest ?
                      <div>
                          <StatusBadge status={latest.status} />
                          <p className="mt-1 text-xs text-gray-500">{latest.period}</p>
                        </div> :

                      <span className="text-xs text-gray-400">None yet</span>
                      }
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </section>

      {notAppointed.length > 0 &&
      <section>
          <h2 className="text-base font-semibold text-gray-900">Available in the provider network</h2>
          <ul className="mt-3 bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {notAppointed.map((p) =>
          <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-[12rem]">
                  <p className="text-sm font-medium text-gray-900">{p.company}</p>
                  <p className="text-xs text-gray-500">
                    {p.name} · {p.specialties.join(', ')}
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setAppointing({ providerId: p.id })}>
                  Appoint
                </Button>
              </li>
          )}
          </ul>
        </section>
      }

      {appointing &&
      <AppointProviderModal providerId={appointing.providerId} onClose={() => setAppointing(null)} />
      }
    </div>);

}