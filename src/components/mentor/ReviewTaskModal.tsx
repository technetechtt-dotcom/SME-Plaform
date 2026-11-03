import React, { useState } from 'react';
import { PaperclipIcon } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { Task } from '../../types/platform';
import { formatDate } from '../../utils/format';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface ReviewTaskModalProps {
  task: Task;
  onClose: () => void;
}

export function ReviewTaskModal({ task, onClose }: ReviewTaskModalProps) {
  const { updateTask, getBeneficiary } = usePlatform();
  const { notify } = useToast();
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const name = getBeneficiary(task.beneficiaryId)?.businessName;

  const accept = () => {
    updateTask(task.id, { status: 'Done', mentorFeedback: feedback.trim() || undefined });
    notify(`Marked "${task.title}" as done`);
    onClose();
  };
  const sendBack = () => {
    if (!feedback.trim()) return setError('Explain what needs to change');
    updateTask(task.id, { status: 'Returned', mentorFeedback: feedback.trim() });
    notify(`Task returned to ${name}`);
    onClose();
  };

  return (
    <Modal
      title={task.title}
      subtitle={`${name} · due ${formatDate(task.dueDate)}`}
      onClose={onClose}
      footer={
      <>
          <Button role="mentor" variant="secondary" onClick={sendBack}>
            Return with feedback
          </Button>
          <Button role="mentor" onClick={accept}>
            Accept as done
          </Button>
        </>
      }>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500">Evidence required</p>
          <p className="text-sm text-gray-900">{task.evidenceRequired}</p>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          {task.evidenceFile ?
          <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <PaperclipIcon className="w-4 h-4 text-gray-500" aria-hidden="true" />
              {task.evidenceFile}
            </p> :

          <p className="text-sm text-gray-500">No file attached</p>
          }
          {task.evidenceNote && <p className="mt-2 text-sm text-gray-700">“{task.evidenceNote}”</p>}
        </div>
        <FormField label="Feedback" htmlFor="rt-fb" error={error} hint="Required when returning the task.">
          <textarea id="rt-fb" rows={3} className={`${inputClass} ${roleThemes.mentor.ring}`} value={feedback} onChange={(e) => {setFeedback(e.target.value);setError('');}} />
        </FormField>
      </div>
    </Modal>);

}