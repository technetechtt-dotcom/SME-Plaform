import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { useMentorScope } from '../../hooks/useMentorScope';
import { Session } from '../../types/platform';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface LogSessionModalProps {
  session?: Session;
  defaultEnrollmentId?: string;
  onClose: () => void;
}

const field = `${inputClass} ${roleThemes.mentor.ring}`;

export function LogSessionModal({ session, defaultEnrollmentId, onClose }: LogSessionModalProps) {
  const { addSession, updateSession, getBeneficiary, getProgramme } = usePlatform();
  const { notify } = useToast();
  const { mentorId, enrollments } = useMentorScope();
  const completing = !!session;
  const initialEnrollment =
  enrollments.find((e) => session && e.beneficiaryId === session.beneficiaryId && e.programmeId === session.programmeId)?.id ||
  defaultEnrollmentId ||
  enrollments[0]?.id ||
  '';

  const [enrollmentId, setEnrollmentId] = useState(initialEnrollment);
  const [mode, setMode] = useState<'Completed' | 'Upcoming'>('Completed');
  const [date, setDate] = useState(session?.date || '');
  const [duration, setDuration] = useState(String(session?.durationMinutes || 60));
  const [topics, setTopics] = useState(session?.topics || '');
  const [outcomes, setOutcomes] = useState('');
  const [nextActions, setNextActions] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isCompleted = completing || mode === 'Completed';

  const submit = () => {
    const next: Record<string, string> = {};
    if (!enrollmentId) next.enrollment = 'Choose a beneficiary';
    if (!date) next.date = 'Required';
    if (!topics.trim()) next.topics = 'What was covered?';
    if (isCompleted && !outcomes.trim()) next.outcomes = 'Record the outcome for M&E';
    setErrors(next);
    if (Object.keys(next).length) return;

    const enrollment = enrollments.find((e) => e.id === enrollmentId)!;
    const payload = {
      programmeId: enrollment.programmeId,
      beneficiaryId: enrollment.beneficiaryId,
      mentorId,
      date,
      durationMinutes: Number(duration) || 60,
      topics: topics.trim(),
      outcomes: outcomes.trim(),
      nextActions: nextActions.trim(),
      status: isCompleted ? 'Completed' as const : 'Upcoming' as const
    };
    if (session) updateSession(session.id, payload);else
    addSession(payload);
    const name = getBeneficiary(enrollment.beneficiaryId)?.businessName;
    notify(isCompleted ? `Session with ${name} logged` : `Session with ${name} scheduled`);
    onClose();
  };

  return (
    <Modal
      title={completing ? 'Complete session log' : 'Log or schedule a session'}
      subtitle="Session logs feed your M&E reports to the organization."
      onClose={onClose}
      size="lg"
      footer={
      <>
          <Button role="mentor" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button role="mentor" onClick={submit}>
            {isCompleted ? 'Save session log' : 'Schedule session'}
          </Button>
        </>
      }>
      
      <div className="space-y-4">
        {!completing &&
        <div className="inline-flex rounded-md border border-gray-200 p-0.5 bg-gray-50" role="radiogroup" aria-label="Session type">
            {(['Completed', 'Upcoming'] as const).map((m) =>
          <button
            key={m}
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-sm rounded transition-colors duration-150 ${mode === m ? 'bg-white shadow-sm font-medium text-gray-900' : 'text-gray-600'}`}>
            
                {m === 'Completed' ? 'Log a past session' : 'Schedule upcoming'}
              </button>
          )}
          </div>
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FormField label="Beneficiary" htmlFor="ls-ben" required error={errors.enrollment}>
              <select id="ls-ben" className={field} value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)} disabled={completing}>
                {enrollments.map((e) =>
                <option key={e.id} value={e.id}>
                    {getBeneficiary(e.beneficiaryId)?.businessName} — {getProgramme(e.programmeId)?.name}
                  </option>
                )}
              </select>
            </FormField>
          </div>
          <FormField label="Date & time" htmlFor="ls-date" required error={errors.date}>
            <input id="ls-date" type="datetime-local" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          </FormField>
          <FormField label="Duration (minutes)" htmlFor="ls-dur">
            <input id="ls-dur" type="number" min={15} step={15} className={field} value={duration} onChange={(e) => setDuration(e.target.value)} />
          </FormField>
        </div>
        <FormField label="Topics covered" htmlFor="ls-topics" required error={errors.topics}>
          <input id="ls-topics" className={field} value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="e.g. Pricing strategy, cash flow review" />
        </FormField>
        {isCompleted &&
        <>
            <FormField label="Outcomes" htmlFor="ls-out" required error={errors.outcomes}>
              <textarea id="ls-out" rows={3} className={field} value={outcomes} onChange={(e) => setOutcomes(e.target.value)} placeholder="What was decided, learned or achieved" />
            </FormField>
            <FormField label="Agreed next actions" htmlFor="ls-next" hint="Tip: turn these into tasks so progress is tracked.">
              <textarea id="ls-next" rows={2} className={field} value={nextActions} onChange={(e) => setNextActions(e.target.value)} />
            </FormField>
          </>
        }
      </div>
    </Modal>);

}