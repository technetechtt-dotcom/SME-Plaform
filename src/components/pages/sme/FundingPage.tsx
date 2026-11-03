import React, { useState } from 'react';
import {
  TrendingUpIcon,
  ArrowRightIcon,
  TagIcon,
  PercentIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  SearchIcon,
  FilterIcon,
  BarChart2Icon,
  CalendarIcon,
  BanknoteIcon,
  FileTextIcon,
  AlertCircleIcon,
  ChevronRightIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
import { ScoreCard } from '../../common/ScoreCard';
export function FundingPage() {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
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
    isBlockchainVerified: true,
    requirements: [
    'Minimum 2 years in operation',
    'Annual turnover between R1M - R20M',
    'Valid tax clearance',
    'B-BBEE compliant']

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
    isBlockchainVerified: true,
    requirements: [
    'Prototype or proof of concept',
    'Intellectual property protection',
    'Market validation',
    'Team with technical expertise']

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
    isBlockchainVerified: false,
    requirements: [
    'Minimum 1 year in operation',
    'Good credit history',
    'Collateral may be required',
    'Business bank account']

  },
  {
    id: 4,
    title: 'Export Market Development Program',
    type: 'Grant',
    provider: 'Department of Trade and Industry',
    amount: 'Up to R750,000',
    eligibility: 78,
    description:
    'Support for businesses looking to expand into international markets',
    deadline: '2024-01-20',
    tags: ['Export', 'International', 'Market Development'],
    isBlockchainVerified: true,
    requirements: [
    'Export-ready product or service',
    'Export marketing plan',
    'Minimum 3 years in operation',
    'South African ownership > 50%']

  },
  {
    id: 5,
    title: 'Green Energy Transition Fund',
    type: 'Blended Finance',
    provider: 'Development Bank',
    amount: 'R500,000 - R3,000,000',
    eligibility: 70,
    description:
    'Funding for businesses transitioning to renewable energy solutions',
    deadline: '2023-12-10',
    tags: ['Green Energy', 'Sustainability', 'Manufacturing'],
    isBlockchainVerified: true,
    requirements: [
    'Demonstrable energy efficiency improvements',
    'Reduction in carbon footprint',
    'Minimum 2 years in operation',
    'Valid environmental assessment']

  }];

  const applications = [
  {
    id: 'app1',
    fundName: 'SME Growth Fund',
    amount: 'R500,000',
    submissionDate: '2023-09-15',
    status: 'under_review',
    progress: 60,
    nextStep: 'Due diligence review',
    dueDate: '2023-10-30'
  },
  {
    id: 'app2',
    fundName: 'Innovation Challenge',
    amount: 'R350,000',
    submissionDate: '2023-08-22',
    status: 'additional_info',
    progress: 40,
    nextStep: 'Submit additional financial information',
    dueDate: '2023-10-25'
  },
  {
    id: 'app3',
    fundName: 'Export Market Development Program',
    amount: 'R450,000',
    submissionDate: '2023-07-10',
    status: 'approved',
    progress: 100,
    nextStep: 'Funding disbursement',
    dueDate: '2023-11-05'
  },
  {
    id: 'app4',
    fundName: 'Digital Transformation Grant',
    amount: 'R280,000',
    submissionDate: '2023-06-18',
    status: 'rejected',
    progress: 100,
    nextStep: 'Reapplication possible after 3 months',
    dueDate: null
  }];

  const fundingHistory = [
  {
    id: 'fund1',
    name: 'Business Development Grant',
    provider: 'Small Enterprise Development Agency',
    amount: 'R250,000',
    dateReceived: '2022-11-20',
    purpose: 'Equipment purchase and staff training',
    status: 'completed',
    outcomes: 'Increased production capacity by 35%',
    transactionId: '0x7a69c8e7c5d271eb4b8b42c986de7c28f3a4e4c2e'
  },
  {
    id: 'fund2',
    name: 'Innovation Grant',
    provider: 'Technology Innovation Agency',
    amount: 'R120,000',
    dateReceived: '2022-05-15',
    purpose: 'Product development and prototype testing',
    status: 'completed',
    outcomes: 'Successfully launched new product line',
    transactionId: '0x3b58c6d4e9a2f78b1c9d5e6f7a8b9c0d1e2f3a4b'
  },
  {
    id: 'fund3',
    name: 'Working Capital Loan',
    provider: 'First National Bank',
    amount: 'R350,000',
    dateReceived: '2021-08-10',
    purpose: 'Inventory expansion and operational costs',
    status: 'repaid',
    outcomes: 'Managed seasonal demand increase',
    transactionId: null
  }];

  const filteredOpportunities = fundingOpportunities.filter(
    (opportunity) =>
    (opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.provider.
    toLowerCase().
    includes(searchQuery.toLowerCase()) ||
    opportunity.description.
    toLowerCase().
    includes(searchQuery.toLowerCase()) ||
    opportunity.tags.some((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
    )) && (
    selectedFilter === 'all' ||
    opportunity.type.toLowerCase() === selectedFilter.toLowerCase())
  );
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'under_review':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'additional_info':
        return <AlertCircleIcon className="w-5 h-5 text-amber-500" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'repaid':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
      case 'completed':
      case 'repaid':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'additional_info':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'under_review':
        return 'Under Review';
      case 'additional_info':
        return 'Additional Info Required';
      case 'completed':
        return 'Completed';
      case 'repaid':
        return 'Repaid';
      default:
        return status;
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Funding Management
              </h2>
            </div>
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'opportunities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('opportunities')}>
                  
                  Opportunities
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'applications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('applications')}>
                  
                  My Applications
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('history')}>
                  
                  Funding History
                </button>
              </nav>
            </div>
            {activeTab === 'opportunities' &&
            <div className="p-4">
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                    type="text"
                    placeholder="Search funding opportunities..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                  
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Filter by:</span>
                    <select
                    className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}>
                    
                      <option value="all">All Types</option>
                      <option value="grant">Grants</option>
                      <option value="loan">Loans</option>
                      <option value="blended finance">Blended Finance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredOpportunities.length > 0 ?
                filteredOpportunities.map((opportunity) =>
                <div
                  key={opportunity.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  
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
                          <p className="text-xs text-gray-600">
                            {opportunity.description}
                          </p>
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
                          new Date(
                            opportunity.deadline
                          ).toLocaleDateString()}
                              </div>
                            </div>
                            {opportunity.isBlockchainVerified &&
                      <BlockchainBadge compact />
                      }
                          </div>
                          <div className="mt-3">
                            <h5 className="text-xs font-medium text-gray-700 mb-1">
                              Key Requirements:
                            </h5>
                            <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                              {opportunity.requirements.map((req, index) =>
                        <li key={index}>{req}</li>
                        )}
                            </ul>
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
                        <div className="mt-3 flex justify-end space-x-3">
                          <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                            Check Eligibility
                          </button>
                          <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                            Apply Now
                            <ArrowRightIcon className="ml-1 w-4 h-4" />
                          </button>
                        </div>
                      </div>
                ) :

                <div className="text-center py-6">
                      <p className="text-gray-500">
                        No matching funding opportunities found.
                      </p>
                    </div>
                }
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All Opportunities
                  </button>
                </div>
              </div>
            }
            {activeTab === 'applications' &&
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  My Funding Applications
                </h3>
                <div className="space-y-4">
                  {applications.map((application) =>
                <div
                  key={application.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {getStatusIcon(application.status)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">
                              {application.fundName}
                            </h4>
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(application.status)}`}>
                          
                              {getStatusLabel(application.status)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">
                              Amount: {application.amount}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {application.submissionDate}
                            </p>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                Application Progress
                              </span>
                              <span className="text-gray-800 font-medium">
                                {application.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                            className={`h-2 rounded-full ${application.status === 'approved' ? 'bg-green-500' : application.status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{
                              width: `${application.progress}%`
                            }}>
                          </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-700">
                                Next Step:
                              </p>
                              <p className="text-xs text-gray-600">
                                {application.nextStep}
                              </p>
                              {application.dueDate &&
                          <p className="text-xs text-gray-500 mt-1">
                                  Due by: {application.dueDate}
                                </p>
                          }
                            </div>
                            {application.status !== 'rejected' &&
                        <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                {application.status === 'additional_info' ?
                          'Submit Info' :
                          application.status === 'approved' ?
                          'View Details' :
                          'Track Progress'}
                                <ArrowRightIcon className="ml-1 w-4 h-4" />
                              </button>
                        }
                          </div>
                        </div>
                      </div>
                    </div>
                )}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All Applications
                  </button>
                </div>
              </div>
            }
            {activeTab === 'history' &&
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Funding History
                </h3>
                <div className="space-y-4">
                  {fundingHistory.map((funding) =>
                <div
                  key={funding.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            {funding.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {funding.provider}
                          </p>
                        </div>
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(funding.status)}`}>
                      
                          {getStatusLabel(funding.status)}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs font-medium text-gray-700">
                            Amount:
                          </p>
                          <p className="text-sm text-gray-800">
                            {funding.amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">
                            Date Received:
                          </p>
                          <p className="text-sm text-gray-800">
                            {funding.dateReceived}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-medium text-gray-700">
                            Purpose:
                          </p>
                          <p className="text-sm text-gray-800">
                            {funding.purpose}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-medium text-gray-700">
                            Outcomes:
                          </p>
                          <p className="text-sm text-gray-800">
                            {funding.outcomes}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        {funding.transactionId ?
                    <BlockchainBadge
                      verified={true}
                      transactionId={funding.transactionId}
                      amount={funding.amount} /> :


                    <div></div>
                    }
                        <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                          View Details
                          <ArrowRightIcon className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                )}
                </div>
              </div>
            }
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Funding Readiness
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <ScoreCard
                  title="Funding Eligibility"
                  score={72}
                  trend="up"
                  trendValue={8}
                  type="funding"
                  description="Good chance of securing funding in the next quarter" />
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Funding Recommendations
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Apply for SME Growth Fund (85% match)
                      </span>
                    </li>
                    <li className="flex items-start text-sm">
                      <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Complete UIF registration to improve eligibility
                      </span>
                    </li>
                    <li className="flex items-start text-sm">
                      <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Prepare financial projections for loan applications
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Funding Requirements Status
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Financial Documents
                        </span>
                        <span className="text-gray-800 font-medium">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: '100%'
                          }}>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Business Plan</span>
                        <span className="text-gray-800 font-medium">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: '80%'
                          }}>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Compliance Documents
                        </span>
                        <span className="text-gray-800 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: '85%'
                          }}>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Market Analysis</span>
                        <span className="text-gray-800 font-medium">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{
                            width: '60%'
                          }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Funding Summary
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <BanknoteIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Total Funding Received
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        R720,000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FileTextIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Active Applications
                      </p>
                      <p className="text-lg font-semibold text-gray-800">2</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <BarChart2Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROI on Funding</p>
                      <p className="text-lg font-semibold text-gray-800">
                        2.4x
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <CalendarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Deadline</p>
                      <p className="text-lg font-semibold text-gray-800">
                        Oct 25, 2023
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Prepare New Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}