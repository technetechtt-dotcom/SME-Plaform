import React, { useState } from 'react';
import { InboxIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useToast } from '../../../contexts/ToastContext';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { Application } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { Modal } from '../../common/Modal';
import { FormField } from '../../common/FormField';
import { formatDate } from '../../../utils/format';
import { inputClass, roleThemes } from '../../../utils/roleTheme';

export function ApplicationsPage() {
  const { setApplicationStatus, enrollApplication, getProgramme, getProvider } = usePlatform();
  const { notify } = useToast();
  const { programmes, applications, appointments } = useOrgScope();
  const [programmeFilter, setProgrammeFilter] = useState('all');
  const [enrolling, setEnrolling] = useState<Application | null>(null);
  const [mentorId, setMentorId] = useState('');

  const visible = applications.
  filter((a) => programmeFilter === 'all' || a.programmeId === programmeFilter).
  sort((a, b) => b.score - a.score);
  const mentorsForEnrolling = enrolling ?
  appointments.filter((a) => a.programmeId === enrolling.programmeId && a.scope.includes('Development')) :
  [];

  const confirmEnrol = () => {
    if (!enrolling) return;
    enrollApplication(enrolling.id, mentorId || null);
    notify(`${enrolling.businessName} enrolled in ${getProgramme(enrolling.programmeId)?.name}`);
    setEnrolling(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Shortlist applicants and enrol them into a programme with a mentor."
        actions={
        <select
          aria-label="Filter by programme"
          className={`${inputClass} ${roleThemes.organization.ring} w-64`}
          value={programmeFilter}
          onChange={(e) => setProgrammeFilter(e.target.value)}>
          
            <option value="all">All programmes</option>
            {programmes.map((p) =>
          <option key={p.id} value={p.id}>
                {p.name}
              </option>
          )}
          </select>
        } />
      

      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {visible.length === 0 ?
        <EmptyState icon={<InboxIcon className="w-5 h-5" />} title="No applications" description="Applications for this programme will appear here." /> :

        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-5 py-2">Applicant</th>
                  <th className="px-5 py-2">Programme</th>
                  <th className="px-5 py-2 text-right">Readiness score</th>
                  <th className="px-5 py-2">Submitted</th>
                  <th className="px-5 py-2">Status</th>
                  <th className="px-5 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visible.map((a) => {
                const open = a.status === 'Pending review' || a.status === 'Shortlisted';
                return (
                  <tr key={a.id}>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{a.businessName}</p>
                        <p className="text-xs text-gray-500">
                          {a.founder} · {a.sector} · {a.province}
                        </p>
                      </td>
                      <td className="px-5 py-3 text-gray-700">{getProgramme(a.programmeId)?.name}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`font-semibold ${a.score >= 75 ? 'text-green-700' : a.score >= 65 ? 'text-gray-900' : 'text-red-700'}`}>
                          {a.score}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{formatDate(a.submittedDate)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-5 py-3">
                        {open &&
                      <div className="flex justify-end gap-2">
                            <Button variant="secondary" size="sm" onClick={() => {setApplicationStatus(a.id, 'Declined');notify(`${a.businessName} declined`);}}>
                              Decline
                            </Button>
                            {a.status === 'Pending review' &&
                        <Button variant="secondary" size="sm" onClick={() => {setApplicationStatus(a.id, 'Shortlisted');notify(`${a.businessName} shortlisted`);}}>
                                Shortlist
                              </Button>
                        }
                            <Button size="sm" onClick={() => {setEnrolling(a);setMentorId('');}}>
                              Enrol
                            </Button>
                          </div>
                      }
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
        }
      </section>

      {enrolling &&
      <Modal
        title={`Enrol ${enrolling.businessName}`}
        subtitle={getProgramme(enrolling.programmeId)?.name}
        onClose={() => setEnrolling(null)}
        footer={
        <>
              <Button variant="secondary" onClick={() => setEnrolling(null)}>
                Cancel
              </Button>
              <Button onClick={confirmEnrol}>Confirm enrolment</Button>
            </>
        }>
        
          <FormField label="Assign a mentor" htmlFor="enrol-mentor" hint="Only providers appointed to this programme for mentoring are listed. You can assign later.">
            <select id="enrol-mentor" className={`${inputClass} ${roleThemes.organization.ring}`} value={mentorId} onChange={(e) => setMentorId(e.target.value)}>
              <option value="">Assign later</option>
              {mentorsForEnrolling.map((m) =>
            <option key={m.providerId} value={m.providerId}>
                  {getProvider(m.providerId)?.name} — {getProvider(m.providerId)?.company}
                </option>
            )}
            </select>
          </FormField>
        </Modal>
      }
    </div>);

}