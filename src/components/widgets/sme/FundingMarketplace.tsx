import React from 'react';
import {
  TrendingUpIcon,
  ArrowRightIcon,
  TagIcon,
  PercentIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
const fundingOpportunities = [
{
  id: 1,
  title: 'SME Growth Fund',
  type: 'Grant',
  provider: 'Department of Small Business',
  amount: 'R250,000 - R1,000,000',
  eligibility: 85,
  description: 'Funding for established SMEs looking to expand operations',
  deadline: '2023-12-15',
  tags: ['Manufacturing', 'Technology', 'Export'],
  isBlockchainVerified: true
},
{
  id: 2,
  title: 'Innovation Challenge',
  type: 'Grant',
  provider: 'Technology Innovation Agency',
  amount: 'Up to R500,000',
  eligibility: 72,
  description:
  'Funding for innovative tech solutions addressing social challenges',
  deadline: '2023-11-30',
  tags: ['Innovation', 'Technology', 'Social Impact'],
  isBlockchainVerified: true
},
{
  id: 3,
  title: 'Working Capital Loan',
  type: 'Loan',
  provider: 'First National Bank',
  amount: 'R100,000 - R5,000,000',
  interestRate: '9.5% - 12.5%',
  eligibility: 64,
  description: 'Low-interest loans for working capital requirements',
  deadline: 'Ongoing',
  tags: ['Working Capital', 'Short-term'],
  isBlockchainVerified: false
}];

export function FundingMarketplace() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          Funding Marketplace
        </h3>
        <span className="text-xs text-gray-500">3 matched opportunities</span>
      </div>
      <div className="divide-y divide-gray-200">
        {fundingOpportunities.map((opportunity) =>
        <div key={opportunity.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {opportunity.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {opportunity.provider}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {opportunity.type}
                </span>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  {opportunity.eligibility}% Match
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-600">{opportunity.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-700">
                    {opportunity.amount}
                    {opportunity.interestRate &&
                  <span className="ml-2 flex items-center text-xs text-gray-500">
                        <PercentIcon className="w-3 h-3 mr-1" />
                        {opportunity.interestRate}
                      </span>
                  }
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Deadline:{' '}
                    {opportunity.deadline === 'Ongoing' ?
                  'Ongoing' :
                  new Date(opportunity.deadline).toLocaleDateString()}
                  </div>
                </div>
                {opportunity.isBlockchainVerified &&
              <BlockchainBadge compact />
              }
              </div>
              <div className="mt-3 flex items-center flex-wrap gap-2">
                {opportunity.tags.map((tag, index) =>
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                
                    <TagIcon className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
              )}
              </div>
            </div>
            <div className="mt-3 text-right">
              <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                View Details
                <ArrowRightIcon className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View All Opportunities
        </button>
      </div>
    </div>);

}