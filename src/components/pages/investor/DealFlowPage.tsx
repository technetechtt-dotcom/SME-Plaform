import React, { useState } from 'react';
import {
  SearchIcon,
  FilterIcon,
  TagIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  MapPinIcon,
  UsersIcon,
  BarChart2Icon,
  AlertCircleIcon,
  CheckCircleIcon,
  SlidersIcon,
  DownloadIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
import { ScoreCard } from '../../common/ScoreCard';
export function DealFlowPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const dealOpportunities = [
  {
    id: 1,
    name: 'TechSolutions Ltd',
    sector: 'Technology',
    location: 'Johannesburg',
    stage: 'Growth',
    fundingNeeded: 'R2.5M',
    equity: '15%',
    valuation: 'R16.7M',
    readinessScore: 82,
    predictedROI: 3.2,
    riskScore: 28,
    growthRate: '42% YoY',
    tags: ['SaaS', 'B2B', 'AI'],
    teamSize: 12,
    foundedYear: 2019,
    description:
    'Enterprise SaaS platform for AI-driven business analytics with proven traction in financial services.',
    isBlockchainVerified: true,
    matchScore: 92
  },
  {
    id: 2,
    name: 'GreenEnergy Innovations',
    sector: 'Renewable Energy',
    location: 'Cape Town',
    stage: 'Early Growth',
    fundingNeeded: 'R1.8M',
    equity: '12%',
    valuation: 'R15M',
    readinessScore: 75,
    predictedROI: 2.8,
    riskScore: 35,
    growthRate: '35% YoY',
    tags: ['CleanTech', 'Solar', 'Manufacturing'],
    teamSize: 8,
    foundedYear: 2020,
    description:
    'Innovative solar panel technology with 30% higher efficiency than market standards.',
    isBlockchainVerified: true,
    matchScore: 85
  },
  {
    id: 3,
    name: 'AgriTech Solutions',
    sector: 'Agriculture',
    location: 'Stellenbosch',
    stage: 'Expansion',
    fundingNeeded: 'R3.2M',
    equity: '18%',
    valuation: 'R17.8M',
    readinessScore: 68,
    predictedROI: 2.5,
    riskScore: 42,
    growthRate: '28% YoY',
    tags: ['IoT', 'Sustainable', 'Export'],
    teamSize: 15,
    foundedYear: 2018,
    description:
    'IoT solutions for precision farming, reducing water usage by 40% while increasing crop yields.',
    isBlockchainVerified: false,
    matchScore: 78
  },
  {
    id: 4,
    name: 'MedTech Innovations',
    sector: 'Healthcare',
    location: 'Durban',
    stage: 'Series A',
    fundingNeeded: 'R8.5M',
    equity: '22%',
    valuation: 'R38.6M',
    readinessScore: 88,
    predictedROI: 3.5,
    riskScore: 30,
    growthRate: '45% YoY',
    tags: ['Medical', 'AI', 'Diagnostics'],
    teamSize: 20,
    foundedYear: 2017,
    description:
    'AI-powered diagnostic tool for early detection of chronic diseases, with regulatory approval.',
    isBlockchainVerified: true,
    matchScore: 90
  },
  {
    id: 5,
    name: 'EduTech Solutions',
    sector: 'Education',
    location: 'Pretoria',
    stage: 'Seed',
    fundingNeeded: 'R4.2M',
    equity: '20%',
    valuation: 'R21M',
    readinessScore: 72,
    predictedROI: 2.9,
    riskScore: 38,
    growthRate: '50% YoY',
    tags: ['EdTech', 'Mobile', 'SaaS'],
    teamSize: 6,
    foundedYear: 2021,
    description:
    'Mobile learning platform focused on vocational skills training with 50,000 active users.',
    isBlockchainVerified: true,
    matchScore: 82
  },
  {
    id: 6,
    name: 'FinTech Connect',
    sector: 'Financial Services',
    location: 'Johannesburg',
    stage: 'Early Growth',
    fundingNeeded: 'R2.8M',
    equity: '14%',
    valuation: 'R20M',
    readinessScore: 78,
    predictedROI: 3.0,
    riskScore: 32,
    growthRate: '38% YoY',
    tags: ['Payments', 'Mobile', 'B2B'],
    teamSize: 10,
    foundedYear: 2019,
    description:
    'Digital payment solution for SMEs with integrated accounting and inventory management.',
    isBlockchainVerified: true,
    matchScore: 86
  }];

  // Filter and sort opportunities
  const filteredOpportunities = dealOpportunities.filter((opportunity) => {
    const matchesSearch =
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.description.
    toLowerCase().
    includes(searchQuery.toLowerCase()) ||
    opportunity.tags.some((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesSector =
    sectorFilter === 'all' || opportunity.sector === sectorFilter;
    const matchesStage =
    stageFilter === 'all' || opportunity.stage === stageFilter;
    return matchesSearch && matchesSector && matchesStage;
  });
  // Sort opportunities
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'roi':
        return b.predictedROI - a.predictedROI;
      case 'risk':
        return a.riskScore - b.riskScore;
      case 'funding':
        return (
          parseFloat(b.fundingNeeded.replace(/[^\d.-]/g, '')) -
          parseFloat(a.fundingNeeded.replace(/[^\d.-]/g, '')));

      default:
        return b.matchScore - a.matchScore;
    }
  });
  // Get unique sectors for filter
  const sectors = ['all', ...new Set(dealOpportunities.map((o) => o.sector))];
  const stages = ['all', ...new Set(dealOpportunities.map((o) => o.stage))];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Deal Flow</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <ScoreCard
              title="Deal Flow Quality"
              score={78}
              maxScore={100}
              trend="up"
              trendValue={5}
              type="growth"
              description="Improving deal quality metrics" />
            
            <ScoreCard
              title="Matching Efficiency"
              score={85}
              maxScore={100}
              trend="up"
              trendValue={3}
              type="growth"
              description="AI matching algorithm performance" />
            
            <ScoreCard
              title="Average Predicted ROI"
              score={3.0}
              maxScore={5}
              trend="up"
              trendValue={0.2}
              type="growth"
              description="3.0x projected returns" />
            
            <ScoreCard
              title="Deals in Pipeline"
              score={24}
              maxScore={100}
              trend="up"
              trendValue={8}
              type="count"
              description="6 highly matched deals" />
            
          </div>
          <div className="mb-6 bg-amber-50 rounded-lg p-3 border border-amber-200">
            <div className="flex items-start">
              <AlertCircleIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="ml-2">
                <h4 className="text-sm font-medium text-amber-800">
                  AI Deal Insight
                </h4>
                <p className="mt-0.5 text-sm text-amber-700">
                  Healthcare sector deals are showing 25% higher ROI potential
                  than last quarter. MedTech Innovations matches your investment
                  criteria with a 90% alignment.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by company, description, or tags..."
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                
                <option value="match">Sort by: Match Score</option>
                <option value="roi">Sort by: Predicted ROI</option>
                <option value="risk">Sort by: Lowest Risk</option>
                <option value="funding">Sort by: Funding Amount</option>
              </select>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-amber-50 text-amber-600' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('grid')}>
                  
                  Grid
                </button>
                <button
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-amber-50 text-amber-600' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('list')}>
                  
                  List
                </button>
              </div>
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
                }}
                className="text-xs text-amber-600 hover:text-amber-800">
                
                  Reset Filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Sector
                  </label>
                  <select
                  className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}>
                  
                    {sectors.map((sector) =>
                  <option key={sector} value={sector}>
                        {sector === 'all' ? 'All Sectors' : sector}
                      </option>
                  )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <select
                  className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}>
                  
                    {stages.map((stage) =>
                  <option key={stage} value={stage}>
                        {stage === 'all' ? 'All Stages' : stage}
                      </option>
                  )}
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <SlidersIcon className="w-4 h-4 mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          }
          {viewMode === 'grid' ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedOpportunities.map((deal) =>
            <div
              key={deal.id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-800">
                      {deal.name}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {deal.stage}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPinIcon className="w-3 h-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{deal.location}</p>
                    <span className="mx-1 text-gray-300">•</span>
                    <p className="text-xs text-gray-500">{deal.sector}</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                    {deal.description}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Funding Needed</p>
                      <p className="text-sm font-medium text-gray-800">
                        {deal.fundingNeeded}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Equity Offered</p>
                      <p className="text-sm font-medium text-gray-800">
                        {deal.equity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Predicted ROI</p>
                      <p className="text-sm font-medium text-green-600">
                        {deal.predictedROI}x
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Risk Score</p>
                      <p
                    className={`text-sm font-medium ${deal.riskScore < 30 ? 'text-green-600' : deal.riskScore < 60 ? 'text-amber-500' : 'text-red-500'}`}>
                    
                        {deal.riskScore}/100
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                      <TrendingUpIcon className="w-3 h-3 text-amber-600 mr-1" />
                      <span className="text-xs font-medium text-amber-700">
                        {deal.matchScore}% Match
                      </span>
                    </div>
                    <div className="ml-2 flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                      className="h-1.5 rounded-full bg-amber-500"
                      style={{
                        width: `${deal.matchScore}%`
                      }}>
                    </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center flex-wrap gap-1.5">
                    {deal.tags.map((tag, index) =>
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                )}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    {deal.isBlockchainVerified && <BlockchainBadge compact />}
                    <button className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800">
                      View Details
                      <ArrowRightIcon className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
            )}
            </div> :

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
                    
                      Funding
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Metrics
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Match
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Verified
                    </th>
                    <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedOpportunities.map((deal) =>
                <tr key={deal.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {deal.sector} • {deal.stage}
                        </div>
                        <div className="mt-1 flex items-center">
                          <MapPinIcon className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {deal.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.fundingNeeded}
                        </div>
                        <div className="text-xs text-gray-500">
                          Equity: {deal.equity}
                        </div>
                        <div className="text-xs text-gray-500">
                          Valuation: {deal.valuation}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-green-600">
                          <TrendingUpIcon className="w-3 h-3 mr-1" />
                          ROI: {deal.predictedROI}x
                        </div>
                        <div className="text-xs text-gray-500">
                          Risk: {deal.riskScore}/100
                        </div>
                        <div className="text-xs text-gray-500">
                          Growth: {deal.growthRate}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-amber-600">
                            {deal.matchScore}%
                          </span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                            <div
                          className="h-1.5 rounded-full bg-amber-500"
                          style={{
                            width: `${deal.matchScore}%`
                          }}>
                        </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {deal.isBlockchainVerified ?
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" /> :

                    <span className="text-xs text-gray-500">
                            Unverified
                          </span>
                    }
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Save
                        </button>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          }
          {sortedOpportunities.length === 0 &&
          <div className="text-center py-8">
              <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No deals found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          }
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {sortedOpportunities.length} of {dealOpportunities.length}{' '}
              opportunities
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export Deal List
            </button>
          </div>
        </div>
      </div>
    </div>);

}