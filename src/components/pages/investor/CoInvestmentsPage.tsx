import React, { useState } from 'react';
import {
  SearchIcon,
  FilterIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  UsersIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  HandshakeIcon,
  DollarSignIcon,
  CalendarIcon,
  UserIcon,
  BuildingIcon,
  MapPinIcon,
  BarChart2Icon,
  SlidersIcon,
  ClipboardListIcon,
  PlusIcon,
  ChevronDownIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
import { ScoreCard } from '../../common/ScoreCard';
export function CoInvestmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [expandedOpportunity, setExpandedOpportunity] = useState(null);
  // Co-investment opportunities
  const coInvestmentOpportunities = [
  {
    id: 1,
    company: 'MedTech Innovations',
    sector: 'Healthcare',
    location: 'Cape Town',
    round: 'Series A',
    totalRaise: 'R8.5M',
    available: 'R3.2M',
    minInvestment: 'R500K',
    leadInvestor: 'Venture Partners',
    leadInvestorProfile: {
      name: 'Venture Partners',
      deals: 28,
      successRate: '85%',
      focus: 'Healthcare, Technology',
      averageROI: '3.2x'
    },
    deadline: '2023-11-15',
    aiScore: 78,
    status: 'open',
    description:
    'AI-powered diagnostic tool for early detection of chronic diseases, with regulatory approval and partnerships with 5 major hospital groups.',
    traction: {
      revenue: 'R3.2M (LTM)',
      growth: '+120% YoY',
      users: '12 hospitals, 200+ doctors',
      metrics: 'Over 50,000 diagnoses performed'
    },
    team: [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO',
      background: 'Former Head of Innovation at National Health'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      background: 'AI Researcher, 3 previous healthtech exits'
    },
    {
      name: 'Dr. Robert Nkosi',
      role: 'Medical Director',
      background: '15 years in diagnostic medicine'
    }],

    investors: [
    'Venture Partners (Lead)',
    'Health Innovation Fund',
    'Angel Investor Group'],

    documents: [
    'Pitch Deck',
    'Financial Projections',
    'Market Analysis',
    'Technical Documentation',
    'Regulatory Approvals'],

    updates: [
    {
      date: '2023-10-10',
      title: 'Secured partnership with National Hospital Group'
    },
    {
      date: '2023-09-25',
      title: 'Regulatory approval for expanded use cases'
    },
    {
      date: '2023-09-12',
      title: 'Q3 financial results: 30% above projections'
    }]

  },
  {
    id: 2,
    company: 'EduTech Solutions',
    sector: 'Education',
    location: 'Johannesburg',
    round: 'Seed',
    totalRaise: 'R4.2M',
    available: 'R1.5M',
    minInvestment: 'R250K',
    leadInvestor: 'Angel Investors Group',
    leadInvestorProfile: {
      name: 'Angel Investors Group',
      deals: 42,
      successRate: '72%',
      focus: 'Education, Consumer Tech',
      averageROI: '2.8x'
    },
    deadline: '2023-10-30',
    aiScore: 72,
    status: 'open',
    description:
    'Mobile learning platform focused on vocational skills training with 50,000 active users across Southern Africa.',
    traction: {
      revenue: 'R850K (LTM)',
      growth: '+200% YoY',
      users: '50,000 active users',
      metrics: '85% course completion rate'
    },
    team: [
    {
      name: 'David Ndlovu',
      role: 'CEO',
      background: 'Former Education Policy Advisor'
    },
    {
      name: 'Lisa van der Merwe',
      role: 'COO',
      background: 'EdTech startup founder, 8 years experience'
    },
    {
      name: 'James Mokoena',
      role: 'CTO',
      background: 'Software Engineer, previously at Google'
    }],

    investors: [
    'Angel Investors Group (Lead)',
    'Education First Fund',
    '3 Angel Investors'],

    documents: [
    'Pitch Deck',
    'Financial Projections',
    'User Growth Analysis',
    'Product Roadmap'],

    updates: [
    {
      date: '2023-10-05',
      title: 'Launched enterprise offering with 3 corporate clients'
    },
    {
      date: '2023-09-18',
      title: 'Reached 50,000 user milestone'
    },
    {
      date: '2023-09-02',
      title: 'Signed partnership with Department of Higher Education'
    }]

  },
  {
    id: 3,
    company: 'GreenEnergy Solutions',
    sector: 'Renewable Energy',
    location: 'Durban',
    round: 'Series B',
    totalRaise: 'R12M',
    available: 'R4.5M',
    minInvestment: 'R750K',
    leadInvestor: 'Impact Capital',
    leadInvestorProfile: {
      name: 'Impact Capital',
      deals: 35,
      successRate: '80%',
      focus: 'Clean Energy, Sustainability',
      averageROI: '2.5x'
    },
    deadline: '2023-12-05',
    aiScore: 85,
    status: 'open',
    description:
    'Innovative solar and battery storage solutions for commercial and industrial clients, with proprietary energy management software.',
    traction: {
      revenue: 'R8.5M (LTM)',
      growth: '+85% YoY',
      users: '28 commercial installations',
      metrics: 'Average client energy cost reduction of 42%'
    },
    team: [
    {
      name: 'Emma Patel',
      role: 'CEO',
      background: 'Former Energy Sector Consultant, MBA'
    },
    {
      name: 'Thomas Green',
      role: 'CTO',
      background: 'Electrical Engineer, 12 years in renewable energy'
    },
    {
      name: 'Sipho Mbeki',
      role: 'COO',
      background:
      'Operations Executive, previously at major utility company'
    }],

    investors: [
    'Impact Capital (Lead)',
    'Green Future Fund',
    'Climate Tech Ventures',
    '2 Strategic Investors'],

    documents: [
    'Investment Memorandum',
    'Financial Statements',
    'Technical Specifications',
    'Market Analysis',
    'Customer Case Studies'],

    updates: [
    {
      date: '2023-10-12',
      title: 'Secured R15M government contract for municipal installations'
    },
    {
      date: '2023-09-30',
      title: 'Completed Series B first close (R7.5M)'
    },
    {
      date: '2023-09-05',
      title: 'Launched new energy management platform v2.0'
    }]

  },
  {
    id: 4,
    company: 'FinTech Connect',
    sector: 'Financial Services',
    location: 'Pretoria',
    round: 'Series A',
    totalRaise: 'R6.8M',
    available: 'R2.2M',
    minInvestment: 'R400K',
    leadInvestor: 'Digital Ventures',
    leadInvestorProfile: {
      name: 'Digital Ventures',
      deals: 45,
      successRate: '75%',
      focus: 'Fintech, B2B SaaS',
      averageROI: '3.0x'
    },
    deadline: '2023-11-25',
    aiScore: 76,
    status: 'open',
    description:
    'SME financial management platform combining payments, accounting, and business intelligence for small businesses.',
    traction: {
      revenue: 'R2.8M (LTM)',
      growth: '+150% YoY',
      users: '2,800 SME customers',
      metrics: '92% customer retention rate'
    },
    team: [
    {
      name: 'Anele Khumalo',
      role: 'CEO',
      background: 'Former Banking Executive'
    },
    {
      name: 'Ryan Peters',
      role: 'CTO',
      background:
      'Software Architect, previously at major payment provider'
    },
    {
      name: 'Fatima Ahmed',
      role: 'CFO',
      background: 'Chartered Accountant, fintech experience'
    }],

    investors: [
    'Digital Ventures (Lead)',
    'Fintech Growth Fund',
    'SME Capital'],

    documents: [
    'Pitch Deck',
    'Financial Projections',
    'Product Roadmap',
    'Competitive Analysis',
    'Customer Testimonials'],

    updates: [
    {
      date: '2023-10-08',
      title: 'Launched integrated payment processing feature'
    },
    {
      date: '2023-09-22',
      title: 'Partnered with major accounting software provider'
    },
    {
      date: '2023-09-10',
      title: 'Reached R250K MRR milestone'
    }]

  }];

  // Active co-investments
  const activeCoInvestments = [
  {
    id: 1,
    company: 'TechSolutions Ltd',
    sector: 'Technology',
    round: 'Series A',
    investmentDate: '2022-06-15',
    investedAmount: 'R1.2M',
    currentValuation: 'R1.5M',
    roi: '+25%',
    leadInvestor: 'Tech Ventures',
    status: 'performing',
    nextMilestone: 'International expansion',
    nextMilestoneDate: '2023-12-10'
  },
  {
    id: 2,
    company: 'AgriTech Solutions',
    sector: 'Agriculture',
    round: 'Seed',
    investmentDate: '2022-09-22',
    investedAmount: 'R750K',
    currentValuation: 'R680K',
    roi: '-9%',
    leadInvestor: 'Rural Development Fund',
    status: 'underperforming',
    nextMilestone: 'Product pivot completion',
    nextMilestoneDate: '2023-11-15'
  },
  {
    id: 3,
    company: 'HealthPlus Clinic',
    sector: 'Healthcare',
    round: 'Series B',
    investmentDate: '2023-02-10',
    investedAmount: 'R2.5M',
    currentValuation: 'R3.2M',
    roi: '+28%',
    leadInvestor: 'Healthcare Capital',
    status: 'performing',
    nextMilestone: 'New facility launch',
    nextMilestoneDate: '2023-12-05'
  }];

  // Syndicate partners
  const syndicatePartners = [
  {
    id: 1,
    name: 'Venture Partners',
    focus: 'Healthcare, Technology',
    dealsShared: 5,
    totalInvested: 'R8.5M',
    averageROI: '3.2x',
    status: 'active'
  },
  {
    id: 2,
    name: 'Impact Capital',
    focus: 'Renewable Energy, Sustainability',
    dealsShared: 3,
    totalInvested: 'R5.2M',
    averageROI: '2.5x',
    status: 'active'
  },
  {
    id: 3,
    name: 'Digital Ventures',
    focus: 'Fintech, B2B SaaS',
    dealsShared: 4,
    totalInvested: 'R6.8M',
    averageROI: '3.0x',
    status: 'active'
  },
  {
    id: 4,
    name: 'Angel Investors Group',
    focus: 'Education, Consumer Tech',
    dealsShared: 2,
    totalInvested: 'R2.2M',
    averageROI: '1.8x',
    status: 'active'
  }];

  // Filter opportunities based on search and filters
  const filteredOpportunities = coInvestmentOpportunities.filter(
    (opportunity) => {
      const matchesSearch =
      opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.
      toLowerCase().
      includes(searchQuery.toLowerCase()) ||
      opportunity.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
      sectorFilter === 'all' || opportunity.sector === sectorFilter;
      const matchesStage =
      stageFilter === 'all' || opportunity.round === stageFilter;
      const matchesStatus =
      statusFilter === 'all' || opportunity.status === statusFilter;
      return matchesSearch && matchesSector && matchesStage && matchesStatus;
    }
  );
  // Get unique values for filters
  const sectors = [
  'all',
  ...new Set(coInvestmentOpportunities.map((o) => o.sector))];

  const stages = [
  'all',
  ...new Set(coInvestmentOpportunities.map((o) => o.round))];

  const statuses = [
  'all',
  ...new Set(coInvestmentOpportunities.map((o) => o.status))];

  // Toggle opportunity details
  const toggleOpportunityDetails = (id) => {
    if (expandedOpportunity === id) {
      setExpandedOpportunity(null);
    } else {
      setExpandedOpportunity(id);
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Co-Investments</h2>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'opportunities' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('opportunities')}>
              
              Opportunities
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'active' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('active')}>
              
              Active Co-Investments
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'syndicate' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('syndicate')}>
              
              Syndicate Partners
            </button>
          </nav>
        </div>
        {activeTab === 'opportunities' &&
        <div className="p-4">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <ScoreCard
              title="Available Opportunities"
              score={12}
              maxScore={100}
              trend="up"
              trendValue={4}
              type="count"
              description="High-quality co-investments" />
            
              <ScoreCard
              title="Average AI Match Score"
              score={78}
              maxScore={100}
              trend="up"
              trendValue={5}
              type="ai"
              description="Based on your investment criteria" />
            
              <ScoreCard
              title="Projected Average ROI"
              score={2.9}
              maxScore={5}
              trend="up"
              trendValue={0.3}
              type="roi"
              description="Across all opportunities" />
            
              <ScoreCard
              title="Total Available Capital"
              score={15.8}
              maxScore={100}
              trend="up"
              trendValue={3.2}
              type="money"
              description="R15.8M in all rounds" />
            
            </div>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                type="text"
                placeholder="Search by company, sector, or description..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              
              </div>
              <div className="flex space-x-3">
                <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                
                  <FilterIcon className="w-4 h-4 mr-2" />
                  <span>Filters</span>
                </button>
                <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}>
                
                  {sectors.map((sector) =>
                <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </option>
                )}
                </select>
                <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}>
                
                  {stages.map((stage) =>
                <option key={stage} value={stage}>
                      {stage === 'all' ? 'All Stages' : stage}
                    </option>
                )}
                </select>
              </div>
            </div>
            {showFilters &&
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Advanced Filters
                  </h3>
                  <button
                onClick={() => {
                  setSectorFilter('all');
                  setStageFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-600 hover:text-amber-800">
                
                    Reset All Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Minimum AI Match Score
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                      <option value="0">Any Score</option>
                      <option value="60">60% and above</option>
                      <option value="70">70% and above</option>
                      <option value="80">80% and above</option>
                      <option value="90">90% and above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Investment Amount Range
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                      <option value="any">Any Amount</option>
                      <option value="small">R100K - R500K</option>
                      <option value="medium">R500K - R2M</option>
                      <option value="large">R2M+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Lead Investor
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                      <option value="any">Any Lead Investor</option>
                      <option value="Venture Partners">Venture Partners</option>
                      <option value="Impact Capital">Impact Capital</option>
                      <option value="Digital Ventures">Digital Ventures</option>
                      <option value="Angel Investors Group">
                        Angel Investors Group
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <SlidersIcon className="w-4 h-4 mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
          }
            <div className="space-y-4">
              {filteredOpportunities.length > 0 ?
            filteredOpportunities.map((opportunity) =>
            <div
              key={opportunity.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-sm transition-all">
              
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-800">
                              {opportunity.company}
                            </h3>
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {opportunity.round}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {opportunity.location}
                            <span className="mx-2">•</span>
                            {opportunity.sector}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <div className="bg-amber-50 px-3 py-1 rounded-full flex items-center">
                            <TrendingUpIcon className="w-4 h-4 text-amber-600 mr-1" />
                            <span className="text-sm font-medium text-amber-700">
                              {opportunity.aiScore}% Match
                            </span>
                          </div>
                          <button
                      onClick={() =>
                      toggleOpportunityDetails(opportunity.id)
                      }
                      className="ml-4 text-gray-400 hover:text-gray-500">
                      
                            <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${expandedOpportunity === opportunity.id ? 'transform rotate-180' : ''}`} />
                      
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Total Raise
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {opportunity.totalRaise}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Available for Co-Investment
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {opportunity.available}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Lead Investor
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {opportunity.leadInvestor}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Deadline
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {new Date(
                        opportunity.deadline
                      ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        {opportunity.description}
                      </p>
                      {expandedOpportunity === opportunity.id &&
                <div className="mt-6 border-t border-gray-200 pt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Company Traction
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Revenue
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {opportunity.traction.revenue}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Growth
                                  </p>
                                  <p className="text-sm font-medium text-green-600">
                                    {opportunity.traction.growth}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Users/Customers
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {opportunity.traction.users}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Key Metrics
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {opportunity.traction.metrics}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Lead Investor Profile
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Previous Deals
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {opportunity.leadInvestorProfile.deals}{' '}
                                    investments
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Success Rate
                                  </p>
                                  <p className="text-sm font-medium text-green-600">
                                    {
                            opportunity.leadInvestorProfile.
                            successRate
                            }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Investment Focus
                                  </p>
                                  <p className="text-sm font-medium text-gray-800">
                                    {opportunity.leadInvestorProfile.focus}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Average ROI
                                  </p>
                                  <p className="text-sm font-medium text-amber-600">
                                    {opportunity.leadInvestorProfile.averageROI}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                              Team
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {opportunity.team.map((member, index) =>
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3">
                        
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                      <UserIcon className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {member.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {member.role}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="mt-2 text-xs text-gray-600">
                                    {member.background}
                                  </p>
                                </div>
                      )}
                            </div>
                          </div>
                          <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                              Recent Updates
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <ul className="space-y-2">
                                {opportunity.updates.map((update, index) =>
                        <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 mt-0.5">
                                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 mt-1"></div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {update.title}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(
                                update.date
                              ).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </li>
                        )}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Other Investors
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <ul className="space-y-1">
                                  {opportunity.investors.map(
                            (investor, index) =>
                            <li
                              key={index}
                              className="text-sm text-gray-800">
                              
                                        • {investor}
                                      </li>

                          )}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Available Documents
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <ul className="space-y-1">
                                  {opportunity.documents.map(
                            (document, index) =>
                            <li
                              key={index}
                              className="flex items-center">
                              
                                        <ClipboardListIcon className="w-4 h-4 text-amber-500 mr-2" />
                                        <span className="text-sm text-gray-800">
                                          {document}
                                        </span>
                                      </li>

                          )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                }
                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center">
                          {opportunity.status === 'open' &&
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Open for Investment
                            </span>
                    }
                          <span className="ml-2 text-xs text-gray-500">
                            Min Investment: {opportunity.minInvestment}
                          </span>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-3">
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                            Request Documents
                          </button>
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                            <HandshakeIcon className="w-4 h-4 mr-2" />
                            Express Interest
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
            ) :

            <div className="text-center py-8">
                  <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No opportunities found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
            }
            </div>
          </div>
        }
        {activeTab === 'active' &&
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                Active Co-Investments
              </h3>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <BarChart2Icon className="w-4 h-4 mr-2" />
                Portfolio Analysis
              </button>
            </div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Total Co-Invested
                </p>
                <p className="text-lg font-semibold text-gray-800">R4.45M</p>
                <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +22% Portfolio Growth
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Current Value
                </p>
                <p className="text-lg font-semibold text-gray-800">R5.38M</p>
                <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +20.9% ROI
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Active Co-Investments
                </p>
                <p className="text-lg font-semibold text-gray-800">3</p>
                <div className="mt-1 text-xs text-gray-500">
                  Across 3 sectors
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Company
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Investment Details
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Performance
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Lead Investor
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Status
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeCoInvestments.map((investment) =>
                <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {investment.company}
                        </div>
                        <div className="text-xs text-gray-500">
                          {investment.sector}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {investment.investedAmount}
                        </div>
                        <div className="text-xs text-gray-500">
                          {investment.round}
                        </div>
                        <div className="text-xs text-gray-500">
                          Invested:{' '}
                          {new Date(
                        investment.investmentDate
                      ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Current: {investment.currentValuation}
                        </div>
                        <div
                      className={`text-sm font-medium flex items-center ${investment.roi.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      
                          {investment.roi.startsWith('+') ?
                      <TrendingUpIcon className="w-4 h-4 mr-1" /> :

                      <TrendingDownIcon className="w-4 h-4 mr-1" />
                      }
                          ROI: {investment.roi}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {investment.leadInvestor}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${investment.status === 'performing' ? 'bg-green-100 text-green-800' : investment.status === 'underperforming' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      
                          {investment.status.charAt(0).toUpperCase() +
                      investment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-100">
              <div className="flex items-start">
                <CalendarIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-800">
                    Upcoming Milestones
                  </h4>
                  <ul className="mt-2 space-y-3">
                    {activeCoInvestments.map((investment) =>
                  <li key={investment.id} className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800">
                            <span className="font-medium">
                              {investment.company}:
                            </span>{' '}
                            {investment.nextMilestone}
                          </p>
                          <p className="text-xs text-amber-700">
                            Due:{' '}
                            {new Date(
                          investment.nextMilestoneDate
                        ).toLocaleDateString()}
                          </p>
                        </div>
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
        {activeTab === 'syndicate' &&
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                Syndicate Partners
              </h3>
              <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Partner
              </button>
            </div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Active Syndicate Partners
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {syndicatePartners.length}
                </p>
                <div className="mt-1 text-xs text-gray-500">
                  Across multiple sectors
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Total Co-Invested with Partners
                </p>
                <p className="text-lg font-semibold text-gray-800">R22.7M</p>
                <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  14 deals in last 24 months
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500">
                  Average Partner ROI
                </p>
                <p className="text-lg font-semibold text-gray-800">2.6x</p>
                <div className="mt-1 text-xs text-green-500">
                  Above industry average
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {syndicatePartners.map((partner) =>
            <div
              key={partner.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-sm transition-all p-4">
              
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <BuildingIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-medium text-gray-800">
                          {partner.name}
                        </h4>
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${partner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      
                          {partner.status.charAt(0).toUpperCase() +
                      partner.status.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Investment Focus: {partner.focus}
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Deals Shared</p>
                          <p className="text-sm font-medium text-gray-800">
                            {partner.dealsShared}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            Total Invested
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {partner.totalInvested}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Average ROI</p>
                          <p className="text-sm font-medium text-amber-600">
                            {partner.averageROI}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <HandshakeIcon className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-gray-500">
                            Last deal: 45 days ago
                          </span>
                        </div>
                        <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                          View Partnership
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">
                    Syndicate Recommendations
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Based on your investment profile, we recommend exploring
                    partnerships with these firms:
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Green Future Ventures
                        </p>
                        <p className="text-xs text-blue-700">
                          Renewable energy focus, 3.1x average ROI, 85% success
                          rate
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          HealthTech Capital
                        </p>
                        <p className="text-xs text-blue-700">
                          Medical technology focus, 2.8x average ROI,
                          complementary to your portfolio
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 text-right">
                    <button className="text-sm font-medium text-blue-800 hover:text-blue-900">
                      Explore Recommendations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}