import React, { useState } from 'react';
import { ClipboardListIcon, PlusIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useMentorScope } from '../../../hooks/useMentorScope';
import { Task } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { EmptyState } from '../../common/EmptyState';
import { AssignTaskModal } from '../../mentor/AssignTaskModal';
import { ReviewTaskModal } from '../../mentor/ReviewTaskModal';
import { formatDate } from '../../../utils/format';

type Filter = 'review' | 'open' | 'done';

export function TasksPage() {
  const { getBeneficiary } = usePlatform();
  const { tasks } = useMentorScope();
  const [filter, setFilter] = useState<Filter>('review');
  const [assigning, setAssigning] = useState(false);
  const [reviewing, setReviewing] = useState<Task | null>(null);

  const groups: Record<Filter, Task[]> = {
    review: tasks.filter((t) => t.status === 'Submitted'),
    open: tasks.filter((t) => t.status === 'Assigned' || t.status === 'Returned' || t.status === 'Overdue'),
    done: tasks.filter((t) => t.status === 'Done')
  };
  const labels: Record<Filter, string> = { review: 'Needs review', open: 'Open', done: 'Done' };
  const visible = [...groups[filter]].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Tasks you set for beneficiaries. Review submitted evidence to mark them done."
        actions={
        <Button role="mentor" onClick={() => setAssigning(true)}>
            <PlusIcon className="w-4 h-4" />
            Assign task
          </Button>
        } />
      

      <div className="border-b border-gray-200 flex gap-6" role="tablist">
        {(Object.keys(groups) as Filter[]).map((f) =>
        <button
          key={f}
          role="tab"
          aria-selected={filter === f}
          onClick={() => setFilter(f)}
          className={`pb-3 -mb-px text-sm font-medium border-b-2 transition-colors duration-150 ${filter === f ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          
            {labels[f]} <span className="text-gray-400">{groups[f].length}</span>
          </button>
        )}
      </div>

      <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {visible.length === 0 &&
        <li>
            <EmptyState icon={<ClipboardListIcon className="w-5 h-5" />} title="No tasks here" description="Tasks will appear here as they move through review." />
          </li>
        }
        {visible.map((t) =>
        <li key={t.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4">
            <div className="md:col-span-6">
              <p className="text-sm font-semibold text-gray-900">{t.title}</p>
              <p className="text-xs text-gray-500">
                {getBeneficiary(t.beneficiaryId)?.businessName} · evidence: {t.evidenceRequired}
              </p>
              {t.status === 'Returned' && t.mentorFeedback &&
            <p className="mt-1 text-xs text-amber-800">Your feedback: {t.mentorFeedback}</p>
            }
            </div>
            <p className={`md:col-span-2 text-sm ${t.status === 'Overdue' ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
              Due {formatDate(t.dueDate)}
            </p>
            <div className="md:col-span-2">
              <StatusBadge status={t.status} />
            </div>
            <div className="md:col-span-2 md:text-right">
              {t.status === 'Submitted' &&
            <Button role="mentor" size="sm" onClick={() => setReviewing(t)}>
                  Review evidence
                </Button>
            }
            </div>
          </li>
        )}
      </ul>

      {assigning && <AssignTaskModal onClose={() => setAssigning(false)} />}
      {reviewing && <ReviewTaskModal task={reviewing} onClose={() => setReviewing(null)} />}
    </div>);

}