import React from 'react';
import { ScoreCard } from '../../common/ScoreCard';
import { ChevronRightIcon } from 'lucide-react';
export function AIReadinessScorecard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          AI Readiness Scorecard
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          AI Powered
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <ScoreCard
            title="Overall Readiness"
            score={78}
            trend="up"
            trendValue={5}
            type="compliance"
            description="Your business is well-positioned for funding opportunities" />
          
          <ScoreCard
            title="Compliance Score"
            score={85}
            trend="up"
            trendValue={3}
            type="compliance"
            description="Strong compliance position with minor improvements needed" />
          
          <ScoreCard
            title="Funding Likelihood"
            score={72}
            trend="up"
            trendValue={8}
            type="funding"
            description="Good chance of securing funding in the next quarter" />
          
          <ScoreCard
            title="Growth Potential"
            score={82}
            trend="up"
            trendValue={4}
            type="growth"
            description="Strong growth indicators based on current trajectory" />
          
        </div>
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800">
            AI Recommendations
          </h4>
          <ul className="mt-2 space-y-2">
            <li className="flex items-start">
              <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-600">
                Update your UIF registration to improve compliance score
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-600">
                Prepare for SARS tax clearance renewal to avoid compliance gaps
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-sm text-gray-600">
                Apply for the SME Growth Fund with an 85% match to your business
                profile
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View Detailed Analysis
        </button>
      </div>
    </div>);

}