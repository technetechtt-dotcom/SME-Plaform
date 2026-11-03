import React, { useState } from 'react';
import { CheckCircle2Icon, CircleIcon, ClockIcon, MailIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useToast } from '../../../contexts/ToastContext';
import { useBeneficiaryScope } from '../../../hooks/useBeneficiaryScope';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { ProgressBar } from '../../common/ProgressBar';
import { formatCurrency, formatDate, formatDateTime } from '../../../utils/format';

export function MyProgrammePage() {
  const { programmes, getProgramme, getProvider, applyToProgramme } = usePlatform();
  const { notify } = useToast();
  const { enrollments, sessions, signoffs, applications } = useBeneficiaryScope();
  const [selectedId, setSelectedId] = useState(enrollments[0]?.id || '');

  const enrollment = enrollments.find((e) => e.id === selectedId);
  const programme = enrollment ? getProgramme(enrollment.programmeId) : undefined;
  const mentor = enrollment ? getProvider(enrollment.mentorId) : undefined;
  const programmeSessions = sessions.filter((s) => s.programmeId === enrollment?.programmeId);
  const upcoming = programmeSessions.filter((s) => s.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const recent = programmeSessions.filter((s) => s.status === 'Completed').sort((a, b) => b.date.localeCompare(a.date));
  const enrolledIds = new Set(enrollments.map((e) => e.programmeId));
  const appliedIds = new Set(applications.map((a) => a.programmeId));
  const open = programmes.filter((p) => p.status === 'Open for applications' && !enrolledIds.has(p.id));

  return (
    <div className="space-y-6">
      <PageHeader title="My programme" description="Your programme, mentor, funded milestones and sessions." />

      {enrollments.length > 1 &&
      <div className="flex flex-wrap gap-2" role="tablist">
          {enrollments.map((e) =>
        <button
          key={e.id}
          role="tab"
          aria-selected={selectedId === e.id}
          onClick={() => setSelectedId(e.id)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-150 ${selectedId === e.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          
              {getProgramme(e.programmeId)?.name}
            </button>
        )}
        </div>
      }

      {enrollment && programme &&
      <>
          <section className="bg-white rounded-lg border border-gray-200 p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="text-xs text-gray-500">
                {programme.type} · {formatDate(programme.startDate)} – {formatDate(programme.endDate)}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">{programme.name}</h2>
              <p className="mt-1 text-sm text-gray-600">{programme.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={enrollment.progress} tone="blue" label="Programme progress" />
                <span className="text-sm font-semibold text-gray-900 w-12 text-right">{enrollment.progress}%</span>
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Your mentor</p>
              {mentor ?
            <>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{mentor.name}</p>
                  <p className="text-xs text-gray-500">{mentor.company}</p>
                  <a href={`mailto:${mentor.email}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900">
                    <MailIcon className="w-4 h-4" />
                    {mentor.email}
                  </a>
                </> :

            <p className="mt-1 text-sm text-gray-600">Your organization will assign a mentor soon.</p>
            }
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900">Funded milestones</h2>
              <ol className="mt-4 space-y-4">
                {programme.milestones.map((m) => {
                const signoff = signoffs.find((s) => s.milestoneId === m.id && s.status !== 'Rejected');
                const done = signoff?.status === 'Approved';
                const review = signoff?.status === 'Requested';
                return (
                  <li key={m.id} className="flex gap-3">
                      {done ?
                    <CheckCircle2Icon className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" /> :
                    review ?
                    <ClockIcon className="w-5 h-5 text-amber-500 flex-shrink-0" aria-hidden="true" /> :

                    <CircleIcon className="w-5 h-5 text-gray-300 flex-shrink-0" aria-hidden="true" />
                    }
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{m.title}</p>
                        <p className="text-xs text-gray-500">
                          {done ? 'Signed off · tranche released' : review ? 'Verified by mentor · awaiting organization approval' : `Due ${formatDate(m.dueDate)}`}
                        </p>
                      </div>
                      <span className={`text-sm ${done ? 'text-green-700 font-semibold' : 'text-gray-600'}`}>
                        {formatCurrency(m.trancheAmount)}
                      </span>
                    </li>);

              })}
              </ol>
            </section>

            <section className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="text-base font-semibold text-gray-900">Sessions</h2>
              {upcoming.length > 0 &&
            <div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs font-medium text-blue-900">Next session</p>
                  <p className="text-sm font-semibold text-blue-900">{formatDateTime(upcoming[0].date)}</p>
                  <p className="text-sm text-blue-900">{upcoming[0].topics}</p>
                </div>
            }
              <ul className="mt-4 space-y-4">
                {recent.slice(0, 3).map((s) =>
              <li key={s.id}>
                    <p className="text-sm font-medium text-gray-900">
                      {s.topics} <span className="font-normal text-gray-500">· {formatDate(s.date)}</span>
                    </p>
                    {s.nextActions && <p className="text-sm text-gray-600">Next: {s.nextActions}</p>}
                  </li>
              )}
                {recent.length === 0 && <li className="text-sm text-gray-500">No sessions logged yet.</li>}
              </ul>
            </section>
          </div>
        </>
      }

      {open.length > 0 &&
      <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Open for applications</h2>
          <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {open.map((p) =>
          <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="flex-1 min-w-[12rem]">
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
                {appliedIds.has(p.id) ?
            <span className="text-sm font-medium text-gray-500">Application submitted</span> :

            <Button role="beneficiary" variant="secondary" size="sm" onClick={() => {applyToProgramme(p.id);notify(`Applied to ${p.name}`);}}>
                    Apply
                  </Button>
            }
              </li>
          )}
          </ul>
        </section>
      }
    </div>);

}