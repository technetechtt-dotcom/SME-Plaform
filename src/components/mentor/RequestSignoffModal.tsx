import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { useMentorScope } from '../../hooks/useMentorScope';
import { formatCurrency } from '../../utils/format';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface RequestSignoffModalProps {
  onClose: () => void;
}

const field = `${inputClass} ${roleThemes.mentor.ring}`;

export function RequestSignoffModal({ onClose }: RequestSignoffModalProps) {
  const { requestSignoff, signoffs, getBeneficiary, getProgramme } = usePlatform();
  const { notify } = useToast();
  const { mentorId, enrollments } = useMentorScope();
  const [enrollmentId, setEnrollmentId] = useState(enrollments[0]?.id || '');
  const [milestoneId, setMilestoneId] = useState('');
  const [evidence, setEvidence] = useState('');
  const [error, setError] = useState('');

  const enrollment = enrollments.find((e) => e.id === enrollmentId);
  const programme = enrollment ? getProgramme(enrollment.programmeId) : undefined;
  const taken = new Set(
    signoffs.
    filter((s) => s.beneficiaryId === enrollment?.beneficiaryId && s.status !== 'Rejected').
    map((s) => s.milestoneId)
  );
  const options = programme?.milestones.filter((m) => !taken.has(m.id)) || [];

  const submit = () => {
    if (!enrollment || !milestoneId) return setError('Choose a beneficiary and milestone');
    if (evidence.trim().length < 15) return setError('Describe the evidence you verified');
    requestSignoff({
      programmeId: enrollment.programmeId,
      beneficiaryId: enrollment.beneficiaryId,
      milestoneId,
      mentorId,
      evidence: evidence.trim()
    });
    notify('Sign-off sent to the organization for approval');
    onClose();
  };

  return (
    <Modal
      title="Request milestone sign-off"
      subtitle="Confirm a beneficiary reached a funded milestone. The organization approves and releases the tranche."
      onClose={onClose}
      footer={
      <>
          <Button role="mentor" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button role="mentor" onClick={submit}>
            Send for sign-off
          </Button>
        </>
      }>
      
      <div className="space-y-4">
        <FormField label="Beneficiary" htmlFor="rs-ben" required>
          <select id="rs-ben" className={field} value={enrollmentId} onChange={(e) => {setEnrollmentId(e.target.value);setMilestoneId('');}}>
            {enrollments.map((e) =>
            <option key={e.id} value={e.id}>
                {getBeneficiary(e.beneficiaryId)?.businessName} — {getProgramme(e.programmeId)?.name}
              </option>
            )}
          </select>
        </FormField>
        <FormField label="Milestone" htmlFor="rs-ms" required hint={options.length === 0 ? 'All milestones for this beneficiary are signed off or under review.' : undefined}>
          <select id="rs-ms" className={field} value={milestoneId} onChange={(e) => setMilestoneId(e.target.value)} disabled={options.length === 0}>
            <option value="">Select milestone</option>
            {options.map((m) =>
            <option key={m.id} value={m.id}>
                {m.title} ({formatCurrency(m.trancheAmount)})
              </option>
            )}
          </select>
        </FormField>
        <FormField label="Evidence verified" htmlFor="rs-ev" required>
          <textarea id="rs-ev" rows={3} className={field} value={evidence} onChange={(e) => setEvidence(e.target.value)} placeholder="e.g. Signed offtake agreement with Spar Nelspruit, 400kg/week from November" />
        </FormField>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </div>
    </Modal>);

}