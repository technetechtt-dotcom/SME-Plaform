import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { useMentorScope } from '../../hooks/useMentorScope';
import { addDaysISO } from '../../utils/format';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface AssignTaskModalProps {
  defaultEnrollmentId?: string;
  onClose: () => void;
}

const field = `${inputClass} ${roleThemes.mentor.ring}`;

export function AssignTaskModal({ defaultEnrollmentId, onClose }: AssignTaskModalProps) {
  const { addTask, getBeneficiary, getProgramme } = usePlatform();
  const { notify } = useToast();
  const { mentorId, enrollments } = useMentorScope();
  const [enrollmentId, setEnrollmentId] = useState(defaultEnrollmentId || enrollments[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(addDaysISO(14));
  const [evidenceRequired, setEvidenceRequired] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const next: Record<string, string> = {};
    if (!enrollmentId) next.enrollment = 'Choose a beneficiary';
    if (!title.trim()) next.title = 'Give the task a title';
    if (!dueDate) next.dueDate = 'Required';
    if (!evidenceRequired.trim()) next.evidence = 'What should they upload as proof?';
    setErrors(next);
    if (Object.keys(next).length) return;
    const enrollment = enrollments.find((e) => e.id === enrollmentId)!;
    addTask({
      programmeId: enrollment.programmeId,
      beneficiaryId: enrollment.beneficiaryId,
      mentorId,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      evidenceRequired: evidenceRequired.trim()
    });
    notify(`Task assigned to ${getBeneficiary(enrollment.beneficiaryId)?.businessName}`);
    onClose();
  };

  return (
    <Modal
      title="Assign a task"
      subtitle="The beneficiary sees this in their task list and submits evidence for you to review."
      onClose={onClose}
      footer={
      <>
          <Button role="mentor" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button role="mentor" onClick={submit}>
            Assign task
          </Button>
        </>
      }>
      
      <div className="space-y-4">
        <FormField label="Beneficiary" htmlFor="at-ben" required error={errors.enrollment}>
          <select id="at-ben" className={field} value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)}>
            {enrollments.map((e) =>
            <option key={e.id} value={e.id}>
                {getBeneficiary(e.beneficiaryId)?.businessName} — {getProgramme(e.programmeId)?.name}
              </option>
            )}
          </select>
        </FormField>
        <FormField label="Task" htmlFor="at-title" required error={errors.title}>
          <input id="at-title" className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Draft a 12-month cash flow forecast" />
        </FormField>
        <FormField label="Instructions" htmlFor="at-desc">
          <textarea id="at-desc" rows={3} className={field} value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Due date" htmlFor="at-due" required error={errors.dueDate}>
            <input id="at-due" type="date" className={field} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </FormField>
          <FormField label="Evidence required" htmlFor="at-ev" required error={errors.evidence}>
            <input id="at-ev" className={field} value={evidenceRequired} onChange={(e) => setEvidenceRequired(e.target.value)} placeholder="e.g. Excel forecast" />
          </FormField>
        </div>
      </div>
    </Modal>);

}