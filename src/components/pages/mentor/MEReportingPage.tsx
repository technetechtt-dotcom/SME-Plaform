import React, { useState } from 'react';
import { FlagIcon } from 'lucide-react';
import { usePlatform } from '../../../contexts/PlatformContext';
import { useMentorScope } from '../../../hooks/useMentorScope';
import { MEReport } from '../../../types/platform';
import { PageHeader } from '../../common/PageHeader';
import { Button } from '../../common/Button';
import { StatusBadge } from '../../common/StatusBadge';
import { ReportEditorModal } from '../../mentor/ReportEditorModal';
import { RequestSignoffModal } from '../../mentor/RequestSignoffModal';
import { formatCurrency, formatDate } from '../../../utils/format';

export function MEReportingPage() {
  const { getProgramme, getBeneficiary } = usePlatform();
  const { reports, signoffs } = useMentorScope();
  const [editing, setEditing] = useState<MEReport | null>(null);
  const [requesting, setRequesting] = useState(false);

  const order: Record<string, number> = { 'Changes requested': 0, Overdue: 1, Draft: 2, Submitted: 3, Approved: 4 };
  const sortedReports = [...reports].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="M&E reporting"
        description="Periodic progress reports and milestone sign-offs you submit to the organization for approval." />
      

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Progress reports</h2>
        <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {sortedReports.map((r) => {
            const editable = r.status === 'Draft' || r.status === 'Changes requested' || r.status === 'Overdue';
            return (
              <li key={r.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4">
                <div className="md:col-span-5">
                  <p className="text-sm font-semibold text-gray-900">
                    {r.period} · {r.periodType}
                  </p>
                  <p className="text-xs text-gray-500">{getProgramme(r.programmeId)?.name}</p>
                </div>
                <div className="md:col-span-4 text-sm">
                  {r.orgComment && r.status !== 'Draft' ?
                  <p className={r.status === 'Changes requested' ? 'text-amber-800' : 'text-gray-600'}>“{r.orgComment}”</p> :

                  <p className="text-gray-500">
                      {r.submittedDate ? `Submitted ${formatDate(r.submittedDate)}` : `Due ${formatDate(r.dueDate)}`}
                    </p>
                  }
                </div>
                <div className="md:col-span-3 flex items-center md:justify-end gap-3">
                  <StatusBadge status={r.status} />
                  {editable &&
                  <Button role="mentor" size="sm" onClick={() => setEditing(r)}>
                      {r.status === 'Changes requested' ? 'Revise' : 'Complete'}
                    </Button>
                  }
                </div>
              </li>);

          })}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Milestone sign-offs</h2>
          <Button role="mentor" variant="secondary" size="sm" onClick={() => setRequesting(true)}>
            <FlagIcon className="w-4 h-4" />
            Request sign-off
          </Button>
        </div>
        <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {signoffs.map((s) => {
            const milestone = getProgramme(s.programmeId)?.milestones.find((m) => m.id === s.milestoneId);
            return (
              <li key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4">
                <div className="md:col-span-5">
                  <p className="text-sm font-semibold text-gray-900">{milestone?.title}</p>
                  <p className="text-xs text-gray-500">{getBeneficiary(s.beneficiaryId)?.businessName}</p>
                </div>
                <p className="md:col-span-4 text-sm text-gray-600 line-clamp-2">{s.evidence}</p>
                <div className="md:col-span-3 flex items-center md:justify-end gap-3">
                  <span className="text-sm text-gray-900">{formatCurrency(milestone?.trancheAmount || 0)}</span>
                  <StatusBadge status={s.status} />
                </div>
              </li>);

          })}
          {signoffs.length === 0 && <li className="px-5 py-6 text-sm text-gray-500">No sign-offs requested yet.</li>}
        </ul>
      </section>

      {editing && <ReportEditorModal report={editing} onClose={() => setEditing(null)} />}
      {requesting && <RequestSignoffModal onClose={() => setRequesting(false)} />}
    </div>);

}