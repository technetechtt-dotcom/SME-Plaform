import React, { useState } from 'react';
import { ListChecksIcon, PaperclipIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useToast } from '../../../contexts/ToastContext';
import { useBeneficiaryScope } from '../../../hooks/useBeneficiaryScope';
import { Task } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { Modal } from '../../common/Modal';
import { FormField } from '../../common/FormField';
import { formatDate } from '../../../utils/format';
import { inputClass, roleThemes } from '../../../utils/roleTheme';

export function MyTasksPage() {
  const { updateTask, getProvider } = usePlatform();
  const { notify } = useToast();
  const { tasks } = useBeneficiaryScope();
  const [submitting, setSubmitting] = useState<Task | null>(null);
  const [fileName, setFileName] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const todo = tasks.
  filter((t) => t.status === 'Assigned' || t.status === 'Returned' || t.status === 'Overdue').
  sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const waiting = tasks.filter((t) => t.status === 'Submitted');
  const done = tasks.filter((t) => t.status === 'Done');

  const open = (t: Task) => {
    setSubmitting(t);
    setFileName('');
    setNote('');
    setError('');
  };

  const submit = () => {
    if (!submitting) return;
    if (!fileName) return setError('Attach your evidence file');
    updateTask(submitting.id, { status: 'Submitted', evidenceFile: fileName, evidenceNote: note.trim() });
    notify('Evidence submitted to your mentor');
    setSubmitting(null);
  };

  const renderGroup = (title: string, list: Task[], actionable: boolean) =>
  <section>
      <h2 className="text-sm font-semibold text-gray-900 mb-2">
        {title} <span className="text-gray-400 font-normal">{list.length}</span>
      </h2>
      <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {list.map((t) =>
      <li key={t.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start px-5 py-4">
            <div className="md:col-span-7">
              <p className="text-sm font-semibold text-gray-900">{t.title}</p>
              {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
              <p className="mt-1 text-xs text-gray-500">
                From {getProvider(t.mentorId)?.name} · Evidence: {t.evidenceRequired}
              </p>
              {t.status === 'Returned' && t.mentorFeedback &&
          <p className="mt-2 text-sm rounded-md bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2">
                  Mentor feedback: {t.mentorFeedback}
                </p>
          }
            </div>
            <p className={`md:col-span-2 text-sm ${t.status === 'Overdue' ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
              Due {formatDate(t.dueDate)}
            </p>
            <div className="md:col-span-3 flex items-center md:justify-end gap-3">
              <StatusBadge status={t.status} />
              {actionable &&
          <Button role="beneficiary" size="sm" onClick={() => open(t)}>
                  {t.status === 'Returned' ? 'Resubmit' : 'Submit evidence'}
                </Button>
          }
            </div>
          </li>
      )}
        {list.length === 0 && <li className="px-5 py-5 text-sm text-gray-500">Nothing here.</li>}
      </ul>
    </section>;


  return (
    <div className="space-y-6">
      <PageHeader title="My tasks" description="Tasks from your mentor. Submit evidence so they can sign off your progress." />
      {tasks.length === 0 ?
      <EmptyState icon={<ListChecksIcon className="w-5 h-5" />} title="No tasks yet" description="Your mentor will assign tasks after your first session." /> :

      <>
          {renderGroup('To do', todo, true)}
          {renderGroup('With your mentor', waiting, false)}
          {renderGroup('Done', done, false)}
        </>
      }

      {submitting &&
      <Modal
        title="Submit evidence"
        subtitle={submitting.title}
        onClose={() => setSubmitting(null)}
        footer={
        <>
              <Button role="beneficiary" variant="secondary" onClick={() => setSubmitting(null)}>
                Cancel
              </Button>
              <Button role="beneficiary" onClick={submit}>
                Submit to mentor
              </Button>
            </>
        }>
        
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Required: <span className="font-medium text-gray-900">{submitting.evidenceRequired}</span>
            </p>
            <FormField label="Evidence file" htmlFor="ev-file" required error={error}>
              <label htmlFor="ev-file" className="flex items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-4 text-sm text-gray-600 cursor-pointer hover:border-gray-400">
                <PaperclipIcon className="w-4 h-4" aria-hidden="true" />
                {fileName || 'Choose a file to upload'}
              </label>
              <input id="ev-file" type="file" className="sr-only" onChange={(e) => {setFileName(e.target.files?.[0]?.name || '');setError('');}} />
            </FormField>
            <FormField label="Note to mentor" htmlFor="ev-note">
              <textarea id="ev-note" rows={3} className={`${inputClass} ${roleThemes.beneficiary.ring}`} value={note} onChange={(e) => setNote(e.target.value)} />
            </FormField>
          </div>
        </Modal>
      }
    </div>);

}