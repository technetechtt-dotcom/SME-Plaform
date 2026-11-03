import React from 'react';
import { useOrgScope } from '../../../hooks/useOrgScope';
import { PageHeader } from '../../common/PageHeader';
import { ProgressBar } from '../../common/ProgressBar';
import { FundingAllocationOverview } from '../../widgets/government/FundingAllocationOverview';
import { PortfolioPerformance } from '../../widgets/investor/PortfolioPerformance';
import { ImpactTracking } from '../../widgets/government/ImpactTracking';
import { formatCurrency } from '../../../utils/format';

export function FundingOverviewPage() {
  const { programmes } = useOrgScope();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Funding & investment"
        description="Programme budgets, milestone-linked disbursements and your investment portfolio in one view." />
      

      <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <h2 className="px-5 py-4 border-b border-gray-200 text-base font-semibold text-gray-900">
          Programme disbursements
        </h2>
        <ul className="divide-y divide-gray-100">
          {programmes.map((p) =>
          <li key={p.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center px-5 py-3">
              <div className="sm:col-span-5">
                <p className="text-sm font-medium text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500">{p.type}</p>
              </div>
              <div className="sm:col-span-5">
                <ProgressBar value={p.disbursed / p.budget * 100} tone="amber" label={`${p.name} disbursed`} />
              </div>
              <p className="sm:col-span-2 text-sm text-right text-gray-900 whitespace-nowrap">
                {formatCurrency(p.disbursed)} <span className="text-gray-500">/ {formatCurrency(p.budget)}</span>
              </p>
            </li>
          )}
        </ul>
      </section>

      <FundingAllocationOverview />
      <PortfolioPerformance />
      <ImpactTracking />
    </div>);

}