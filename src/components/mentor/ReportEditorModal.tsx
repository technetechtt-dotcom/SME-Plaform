import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { useMentorScope } from '../../hooks/useMentorScope';
import { MEReport } from '../../types/platform';
import { formatDate, todayISO } from '../../utils/format';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface ReportEditorModalProps {
  report: MEReport;
  onClose: () => void;
}

const field = `${inputClass} ${roleThemes.mentor.ring}`;

export function ReportEditorModal({ report, onClose }: ReportEditorModalProps) {
  const { saveReport, getProgramme } = usePlatform();
  const { notify } = useToast();
  const { sessions, tasks } = useMentorScope();

  // Activity figures are pulled from logged sessions and tasks so reports match the record.
  const programmeSessions = sessions.filter((s) => s.programmeId === report.programmeId && s.status === 'Completed');
  const programmeTasks = tasks.filter((t) => t.programmeId === report.programmeId);
  const derived = {
    sessionsHeld: report.sessionsHeld || programmeSessions.length,
    tasksCompleted: report.tasksCompleted || programmeTasks.filter((t) => t.status === 'Done').length,
    tasksTotal: report.tasksTotal || programmeTasks.length
  };

  const [summary, setSummary] = useState(report.summary);
  const [challenges, setChallenges] = useState(report.challenges);
  const [evaluation, setEvaluation] = useState(String(report.averageEvaluation || 3.5));
  const [error, setError] = useState('');

  const save = (submit: boolean) => {
    if (submit && summary.trim().length < 20) return setError('Add a progress summary (at least a couple of sentences)');
    saveReport(report.id, {
      ...derived,
      summary: summary.trim(),
      challenges: challenges.trim(),
      averageEvaluation: Number(evaluation),
      ...(submit ? { status: 'Submitted' as const, submittedDate: todayISO() } : {})
    });
    notify(submit ? 'Report submitted to the organization' : 'Draft saved');
    onClose();
  };

  return (
    <Modal
      title={`${report.period} ${report.periodType.toLowerCase()} report`}
      subtitle={`${getProgramme(report.programmeId)?.name} · due ${formatDate(report.dueDate)}`}
      onClose={onClose}
      size="lg"
      footer={
      <>
          <Button role="mentor" variant="secondary" onClick={() => save(false)}>
            Save draft
          </Button>
          <Button role="mentor" onClick={() => save(true)}>
            Submit for review
          </Button>
        </>
      }>
      
      <div className="space-y-5">
        {report.status === 'Changes requested' && report.orgComment &&
        <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-900">Organization requested changes</p>
            <p className="text-sm text-amber-900">{report.orgComment}</p>
          </div>
        }
        <dl className="grid grid-cols-3 gap-4 rounded-md bg-gray-50 p-4">
          <div>
            <dt className="text-xs text-gray-500">Sessions held</dt>
            <dd className="text-lg font-semibold text-gray-900">{derived.sessionsHeld}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">Tasks completed</dt>
            <dd className="text-lg font-semibold text-gray-900">
              {derived.tasksCompleted}/{derived.tasksTotal}
            </dd>
          </div>
          <div>
            <label htmlFor="re-eval" className="text-xs text-gray-500">
              Avg. evaluation (1–5)
            </label>
            <input id="re-eval" type="number" min={1} max={5} step={0.1} className={`${field} mt-1 py-1`} value={evaluation} onChange={(e) => setEvaluation(e.target.value)} />
          </div>
        </dl>
        <p className="text-xs text-gray-500 -mt-3">Sessions and tasks are calculated from your logs for this programme.</p>
        <FormField label="Progress summary" htmlFor="re-sum" required error={error}>
          <textarea id="re-sum" rows={4} className={field} value={summary} onChange={(e) => {setSummary(e.target.value);setError('');}} placeholder="Key progress per beneficiary, KPIs moved, milestones reached" />
        </FormField>
        <FormField label="Challenges & risks" htmlFor="re-ch">
          <textarea id="re-ch" rows={3} className={field} value={challenges} onChange={(e) => setChallenges(e.target.value)} placeholder="Blockers, at-risk beneficiaries, support needed from the organization" />
        </FormField>
      </div>
    </Modal>);

}