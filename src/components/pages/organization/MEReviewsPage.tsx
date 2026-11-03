import React, { useState } from 'react';
import { CheckCircleIcon, InboxIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useToast } from '../../../contexts/ToastContext';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { MEReport, MilestoneSignoff } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { Modal } from '../../common/Modal';
import { FormField } from '../../common/FormField';
import { formatCurrency, formatDate } from '../../../utils/format';
import { inputClass, roleThemes } from '../../../utils/roleTheme';

type Tab = 'reports' | 'signoffs';
const reportFilters = ['Submitted', 'Changes requested', 'Approved', 'Draft'] as const;

export function MEReviewsPage() {
  const { reviewReport, reviewSignoff, getProgramme, getProvider, getBeneficiary } = usePlatform();
  const { notify } = useToast();
  const { reports, signoffs, pendingReports, pendingSignoffs } = useOrgScope();
  const [tab, setTab] = useState<Tab>('reports');
  const [filter, setFilter] = useState<(typeof reportFilters)[number]>('Submitted');
  const [reviewing, setReviewing] = useState<MEReport | null>(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [confirming, setConfirming] = useState<MilestoneSignoff | null>(null);

  const visibleReports = reports.filter((r) => r.status === filter);
  const sortedSignoffs = [...signoffs].sort((a, b) =>
  a.status === b.status ? b.requestedDate.localeCompare(a.requestedDate) : a.status === 'Requested' ? -1 : 1
  );

  const openReview = (r: MEReport) => {
    setReviewing(r);
    setComment('');
    setCommentError('');
  };

  const decide = (status: 'Approved' | 'Changes requested') => {
    if (!reviewing) return;
    if (status === 'Changes requested' && !comment.trim()) {
      setCommentError('Tell the provider what needs to change');
      return;
    }
    reviewReport(reviewing.id, status, comment.trim());
    notify(status === 'Approved' ? 'Report approved' : 'Changes requested — the provider has been notified');
    setReviewing(null);
  };

  const milestoneFor = (s: MilestoneSignoff) =>
  getProgramme(s.programmeId)?.milestones.find((m) => m.id === s.milestoneId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="M&E reviews"
        description="Approve progress reports and sign off milestones submitted by your service providers." />
      

      <div className="border-b border-gray-200 flex gap-6" role="tablist">
        {[
        { id: 'reports' as Tab, label: 'Progress reports', count: pendingReports.length },
        { id: 'signoffs' as Tab, label: 'Milestone sign-offs', count: pendingSignoffs.length }].
        map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={tab === t.id}
          onClick={() => setTab(t.id)}
          className={`pb-3 -mb-px flex items-center gap-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors duration-150 ${tab === t.id ? 'border-amber-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          
            {t.label}
            {t.count > 0 &&
          <span className="px-1.5 min-w-[1.25rem] h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                {t.count}
              </span>
          }
          </button>
        )}
      </div>

      {tab === 'reports' &&
      <section className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {reportFilters.map((f) =>
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-150 ${filter === f ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            
                {f === 'Submitted' ? 'Awaiting review' : f} ({reports.filter((r) => r.status === f).length})
              </button>
          )}
          </div>
          <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {visibleReports.length === 0 &&
          <li>
                <EmptyState icon={<InboxIcon className="w-5 h-5" />} title="Nothing here" description="Reports with this status will appear here." />
              </li>
          }
            {visibleReports.map((r) =>
          <li key={r.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4">
                <div className="md:col-span-5">
                  <p className="text-sm font-semibold text-gray-900">
                    {r.period} · {r.periodType}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getProvider(r.mentorId)?.company} · {getProgramme(r.programmeId)?.name}
                  </p>
                </div>
                <dl className="md:col-span-4 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-gray-500">Sessions</dt>
                    <dd className="font-semibold text-gray-900">{r.sessionsHeld}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Tasks</dt>
                    <dd className="font-semibold text-gray-900">
                      {r.tasksCompleted}/{r.tasksTotal}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Avg. eval</dt>
                    <dd className="font-semibold text-gray-900">{r.averageEvaluation ? r.averageEvaluation.toFixed(1) : '—'}</dd>
                  </div>
                </dl>
                <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3">
                  <span className="text-xs text-gray-500">
                    {r.submittedDate ? `Submitted ${formatDate(r.submittedDate)}` : `Due ${formatDate(r.dueDate)}`}
                  </span>
                  {r.status !== 'Draft' &&
              <Button variant={r.status === 'Submitted' ? 'primary' : 'secondary'} size="sm" onClick={() => openReview(r)}>
                      {r.status === 'Submitted' ? 'Review' : 'View'}
                    </Button>
              }
                </div>
              </li>
          )}
          </ul>
        </section>
      }

      {tab === 'signoffs' &&
      <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {sortedSignoffs.map((s) => {
          const milestone = milestoneFor(s);
          return (
            <li key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-4">
                <div className="md:col-span-4">
                  <p className="text-sm font-semibold text-gray-900">{milestone?.title}</p>
                  <p className="text-xs text-gray-500">
                    {getBeneficiary(s.beneficiaryId)?.businessName} · {getProgramme(s.programmeId)?.name}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-gray-700">{s.evidence}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Verified by {getProvider(s.mentorId)?.name} · {formatDate(s.requestedDate)}
                  </p>
                </div>
                <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(milestone?.trancheAmount || 0)}</span>
                  {s.status === 'Requested' ?
                <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => {reviewSignoff(s.id, 'Rejected');notify('Sign-off rejected');}}>
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => setConfirming(s)}>
                        Approve
                      </Button>
                    </div> :

                <StatusBadge status={s.status} />
                }
                </div>
              </li>);

        })}
        </ul>
      }

      {reviewing &&
      <Modal
        title={`${reviewing.period} report`}
        subtitle={`${getProvider(reviewing.mentorId)?.company} · ${getProgramme(reviewing.programmeId)?.name}`}
        onClose={() => setReviewing(null)}
        size="lg"
        footer={
        reviewing.status === 'Submitted' ?
        <>
                <Button variant="secondary" onClick={() => decide('Changes requested')}>
                  Request changes
                </Button>
                <Button onClick={() => decide('Approved')}>
                  <CheckCircleIcon className="w-4 h-4" />
                  Approve report
                </Button>
              </> :

        <Button variant="secondary" onClick={() => setReviewing(null)}>
                Close
              </Button>

        }>
        
          <div className="space-y-5">
            <dl className="grid grid-cols-3 gap-4 pb-5 border-b border-gray-100">
              <div>
                <dt className="text-xs text-gray-500">Sessions held</dt>
                <dd className="text-xl font-semibold text-gray-900">{reviewing.sessionsHeld}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Tasks completed</dt>
                <dd className="text-xl font-semibold text-gray-900">
                  {reviewing.tasksCompleted}/{reviewing.tasksTotal}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Average evaluation</dt>
                <dd className="text-xl font-semibold text-gray-900">{reviewing.averageEvaluation.toFixed(1)} / 5</dd>
              </div>
            </dl>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Progress summary</h3>
              <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{reviewing.summary || '—'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Challenges & risks</h3>
              <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{reviewing.challenges || '—'}</p>
            </div>
            {reviewing.status === 'Submitted' ?
          <FormField label="Comment to provider" htmlFor="review-comment" error={commentError} hint="Required when requesting changes.">
                <textarea
              id="review-comment"
              rows={3}
              className={`${inputClass} ${roleThemes.organization.ring}`}
              value={comment}
              onChange={(e) => {setComment(e.target.value);setCommentError('');}} />
            
              </FormField> :

          reviewing.orgComment &&
          <div className="rounded-md bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500">Your comment</p>
                  <p className="text-sm text-gray-800">{reviewing.orgComment}</p>
                </div>

          }
          </div>
        </Modal>
      }

      {confirming &&
      <Modal
        title="Approve milestone and release tranche?"
        onClose={() => setConfirming(null)}
        footer={
        <>
              <Button variant="secondary" onClick={() => setConfirming(null)}>
                Cancel
              </Button>
              <Button
            onClick={() => {
              reviewSignoff(confirming.id, 'Approved');
              notify(`${formatCurrency(milestoneFor(confirming)?.trancheAmount || 0)} tranche released`);
              setConfirming(null);
            }}>
            
                Approve & release
              </Button>
            </>
        }>
        
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{getBeneficiary(confirming.beneficiaryId)?.businessName}</span> will be marked as
            having completed <span className="font-semibold">{milestoneFor(confirming)?.title}</span>, and{' '}
            <span className="font-semibold">{formatCurrency(milestoneFor(confirming)?.trancheAmount || 0)}</span> will be
            recorded as disbursed against the programme budget.
          </p>
        </Modal>
      }
    </div>);

}