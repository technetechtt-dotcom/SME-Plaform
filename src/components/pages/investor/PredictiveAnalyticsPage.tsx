import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis } from
'recharts';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  SearchIcon,
  FilterIcon,
  RefreshCcwIcon,
  SlidersIcon,
  LightbulbIcon,
  BrainIcon,
  BarChart2Icon,
  ArrowRightIcon,
  PlusIcon,
  DownloadIcon } from
'lucide-react';
import { ScoreCard } from '../../common/ScoreCard';
export function PredictiveAnalyticsPage() {
  const [timeFrame, setTimeFrame] = useState('1y');
  const [selectedModel, setSelectedModel] = useState('ai');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('market');
  // Market Trends Data
  const marketTrendsData = [
  {
    month: 'Jan',
    technology: 12,
    healthcare: 8,
    energy: 5,
    finance: 10,
    consumer: 7
  },
  {
    month: 'Feb',
    technology: 14,
    healthcare: 7,
    energy: 6,
    finance: 11,
    consumer: 8
  },
  {
    month: 'Mar',
    technology: 15,
    healthcare: 9,
    energy: 8,
    finance: 12,
    consumer: 7
  },
  {
    month: 'Apr',
    technology: 16,
    healthcare: 11,
    energy: 7,
    finance: 13,
    consumer: 9
  },
  {
    month: 'May',
    technology: 18,
    healthcare: 13,
    energy: 9,
    finance: 14,
    consumer: 10
  },
  {
    month: 'Jun',
    technology: 17,
    healthcare: 15,
    energy: 11,
    finance: 15,
    consumer: 12
  },
  {
    month: 'Jul',
    technology: 19,
    healthcare: 16,
    energy: 12,
    finance: 16,
    consumer: 13
  },
  {
    month: 'Aug',
    technology: 21,
    healthcare: 18,
    energy: 14,
    finance: 17,
    consumer: 12
  },
  {
    month: 'Sep',
    technology: 22,
    healthcare: 20,
    energy: 15,
    finance: 18,
    consumer: 14
  },
  {
    month: 'Oct',
    technology: 24,
    healthcare: 21,
    energy: 16,
    finance: 19,
    consumer: 15
  },
  {
    month: 'Nov',
    technology: 26,
    healthcare: 23,
    energy: 18,
    finance: 20,
    consumer: 16
  },
  {
    month: 'Dec',
    technology: 28,
    healthcare: 25,
    energy: 19,
    finance: 21,
    consumer: 18
  }];

  // Opportunity Score Data (for bubble chart)
  const opportunityData = [
  {
    name: 'AI Solutions',
    x: 85,
    y: 80,
    z: 200,
    sector: 'Technology',
    roi: 3.2,
    risk: 'Medium'
  },
  {
    name: 'Renewable Energy',
    x: 75,
    y: 65,
    z: 150,
    sector: 'Energy',
    roi: 2.5,
    risk: 'Medium'
  },
  {
    name: 'Telemedicine',
    x: 90,
    y: 70,
    z: 180,
    sector: 'Healthcare',
    roi: 3.5,
    risk: 'Low'
  },
  {
    name: 'Fintech Payments',
    x: 80,
    y: 75,
    z: 160,
    sector: 'Finance',
    roi: 2.8,
    risk: 'Medium'
  },
  {
    name: 'E-commerce',
    x: 70,
    y: 60,
    z: 130,
    sector: 'Consumer',
    roi: 2.2,
    risk: 'High'
  },
  {
    name: 'Cybersecurity',
    x: 85,
    y: 90,
    z: 170,
    sector: 'Technology',
    roi: 3.0,
    risk: 'Low'
  },
  {
    name: 'Biotech',
    x: 95,
    y: 60,
    z: 190,
    sector: 'Healthcare',
    roi: 4.0,
    risk: 'High'
  },
  {
    name: 'Clean Water',
    x: 65,
    y: 75,
    z: 140,
    sector: 'Utilities',
    roi: 2.3,
    risk: 'Medium'
  },
  {
    name: 'Smart Manufacturing',
    x: 80,
    y: 85,
    z: 160,
    sector: 'Manufacturing',
    roi: 2.7,
    risk: 'Medium'
  }];

  // ROI Prediction Data
  const roiPredictionData = [
  {
    name: 'TechSolutions Ltd',
    current: 28,
    predicted: 42,
    sector: 'Technology'
  },
  {
    name: 'GreenEnergy Innovations',
    current: 16,
    predicted: 35,
    sector: 'Energy'
  },
  {
    name: 'MedTech Innovations',
    current: 40,
    predicted: 55,
    sector: 'Healthcare'
  },
  {
    name: 'AgriTech Solutions',
    current: -9,
    predicted: 15,
    sector: 'Agriculture'
  },
  {
    name: 'FinTech Connect',
    current: 22,
    predicted: 38,
    sector: 'Finance'
  }];

  // Market Insights
  const marketInsights = [
  {
    id: 1,
    title: 'Healthcare sector showing strong growth potential',
    description:
    'AI analysis indicates healthcare technology investments could see 35% higher returns in the next 12 months, particularly in telemedicine and diagnostic solutions.',
    confidence: 85,
    trend: 'up',
    impact: 'high'
  },
  {
    id: 2,
    title: 'Renewable energy market acceleration',
    description:
    'Policy changes and increased adoption are projected to accelerate growth in renewable energy investments, with an estimated 28% increase in market size by Q4 2024.',
    confidence: 78,
    trend: 'up',
    impact: 'medium'
  },
  {
    id: 3,
    title: 'Potential market correction in consumer tech',
    description:
    'Early indicators suggest a possible 15-20% market correction in consumer technology valuations within the next 6-9 months.',
    confidence: 72,
    trend: 'down',
    impact: 'medium'
  },
  {
    id: 4,
    title: 'Emerging opportunity in sustainable agriculture',
    description:
    'Precision farming and sustainable agriculture technologies are showing early signs of significant growth potential, with projected ROI increases of 40% year-over-year.',
    confidence: 68,
    trend: 'up',
    impact: 'medium'
  }];

  // Custom Scenario Models
  const scenarioModels = [
  {
    id: 1,
    name: 'Base Case Growth Model',
    description:
    'Standard growth projections based on current market conditions',
    lastRun: '2023-10-15',
    type: 'Market Growth'
  },
  {
    id: 2,
    name: 'Interest Rate Sensitivity',
    description:
    'Impact of 2% interest rate increase on portfolio performance',
    lastRun: '2023-10-12',
    type: 'Sensitivity Analysis'
  },
  {
    id: 3,
    name: 'Tech Sector Downturn',
    description: 'Portfolio resilience in case of 25% tech sector correction',
    lastRun: '2023-10-08',
    type: 'Stress Test'
  },
  {
    id: 4,
    name: 'Healthcare Expansion',
    description: 'Growth projections with 40% allocation to healthcare',
    lastRun: '2023-10-05',
    type: 'Portfolio Optimization'
  }];

  // Filter opportunityData based on sector
  const filteredOpportunityData = opportunityData.
  filter(
    (item) => selectedSector === 'all' || item.sector === selectedSector
  ).
  filter(
    (item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Filter roiPredictionData based on sector and search
  const filteredRoiData = roiPredictionData.
  filter(
    (item) => selectedSector === 'all' || item.sector === selectedSector
  ).
  filter(
    (item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Get unique sectors for filter
  const sectors = ['all', ...new Set(opportunityData.map((o) => o.sector))];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Predictive Analytics
          </h2>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'market' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('market')}>
              
              Market Trends
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'opportunities' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('opportunities')}>
              
              Opportunity Mapping
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'portfolio' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('portfolio')}>
              
              Portfolio Predictions
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'scenarios' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('scenarios')}>
              
              Scenario Modeling
            </button>
          </nav>
        </div>
        <div className="p-4">
          {activeTab === 'market' &&
          <div>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <ScoreCard
                title="AI Confidence Score"
                score={92}
                maxScore={100}
                trend="up"
                trendValue={3}
                type="ai"
                description="High prediction accuracy" />
              
                <ScoreCard
                title="Market Volatility"
                score={35}
                maxScore={100}
                trend="down"
                trendValue={5}
                type="risk"
                description="Below average volatility" />
              
                <ScoreCard
                title="Growth Momentum"
                score={78}
                maxScore={100}
                trend="up"
                trendValue={8}
                type="growth"
                description="Strong positive momentum" />
              
                <ScoreCard
                title="Opportunity Index"
                score={85}
                maxScore={100}
                trend="up"
                trendValue={12}
                type="opportunity"
                description="Favorable investment climate" />
              
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                  type="text"
                  placeholder="Search market insights..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                
                </div>
                <div className="flex space-x-3">
                  <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}>
                  
                    <option value="3m">Last 3 Months</option>
                    <option value="6m">Last 6 Months</option>
                    <option value="1y">Last 12 Months</option>
                    <option value="2y">Last 2 Years</option>
                  </select>
                  <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}>
                  
                    <option value="ai">AI Prediction Model</option>
                    <option value="traditional">Traditional Model</option>
                    <option value="hybrid">Hybrid Model</option>
                  </select>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    <RefreshCcwIcon className="w-4 h-4 mr-2" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Sector Growth Trends & Predictions
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={marketTrendsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                    
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                      type="monotone"
                      dataKey="technology"
                      name="Technology"
                      stroke="#1D4ED8"
                      strokeWidth={2}
                      activeDot={{
                        r: 8
                      }} />
                    
                      <Line
                      type="monotone"
                      dataKey="healthcare"
                      name="Healthcare"
                      stroke="#10B981"
                      strokeWidth={2} />
                    
                      <Line
                      type="monotone"
                      dataKey="energy"
                      name="Energy"
                      stroke="#F59E0B"
                      strokeWidth={2} />
                    
                      <Line
                      type="monotone"
                      dataKey="finance"
                      name="Finance"
                      stroke="#8B5CF6"
                      strokeWidth={2} />
                    
                      <Line
                      type="monotone"
                      dataKey="consumer"
                      name="Consumer"
                      stroke="#EC4899"
                      strokeWidth={2} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-center text-gray-500">
                  Showing sector growth trends with{' '}
                  {selectedModel === 'ai' ?
                'AI-powered' :
                selectedModel === 'hybrid' ?
                'Hybrid' :
                'Traditional'}{' '}
                  predictions for future periods
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  AI-Generated Market Insights
                </h4>
                <div className="space-y-4">
                  {marketInsights.map((insight) =>
                <div
                  key={insight.id}
                  className="bg-white rounded-lg p-4 border border-gray-200">
                  
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {insight.trend === 'up' ?
                      <TrendingUpIcon className="w-5 h-5 text-green-500" /> :

                      <TrendingDownIcon className="w-5 h-5 text-red-500" />
                      }
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-medium text-gray-800">
                              {insight.title}
                            </h5>
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${insight.impact === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                          
                              {insight.impact.charAt(0).toUpperCase() +
                          insight.impact.slice(1)}{' '}
                              Impact
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {insight.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <BrainIcon className="w-4 h-4 text-purple-500 mr-1" />
                              <span className="text-xs text-gray-500">
                                AI Confidence: {insight.confidence}%
                              </span>
                            </div>
                            <button className="text-xs font-medium text-amber-600 hover:text-amber-800">
                              View Detailed Analysis
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          }
          {activeTab === 'opportunities' &&
          <div>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
                  Investment Opportunity Mapping
                </h3>
                <div className="flex space-x-3">
                  <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                  
                    <FilterIcon className="w-4 h-4 mr-2" />
                    <span>Filters</span>
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              {showFilters &&
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Opportunity Filters
                    </h3>
                    <button
                  onClick={() => {
                    setSelectedSector('all');
                    setSearchQuery('');
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
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}>
                    
                        {sectors.map((sector) =>
                    <option key={sector} value={sector}>
                            {sector === 'all' ? 'All Sectors' : sector}
                          </option>
                    )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Search
                      </label>
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                      type="text"
                      placeholder="Search opportunities..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />
                    
                      </div>
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
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Opportunity Mapping (Growth vs Risk)
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20
                    }}>
                    
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                      type="number"
                      dataKey="x"
                      name="Growth Potential"
                      domain={[50, 100]}
                      label={{
                        value: 'Growth Potential',
                        position: 'bottom',
                        offset: 0
                      }} />
                    
                      <YAxis
                      type="number"
                      dataKey="y"
                      name="Risk-Adjusted Return"
                      domain={[50, 100]}
                      label={{
                        value: 'Risk-Adjusted Return',
                        angle: -90,
                        position: 'left'
                      }} />
                    
                      <ZAxis
                      type="number"
                      dataKey="z"
                      range={[60, 400]}
                      name="Market Size" />
                    
                      <Tooltip
                      cursor={{
                        strokeDasharray: '3 3'
                      }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
                                <p className="font-medium text-sm">
                                  {data.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Sector: {data.sector}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Growth Potential: {data.x}/100
                                </p>
                                <p className="text-xs text-gray-600">
                                  Risk-Adjusted Return: {data.y}/100
                                </p>
                                <p className="text-xs text-gray-600">
                                  Predicted ROI: {data.roi}x
                                </p>
                                <p className="text-xs text-gray-600">
                                  Risk Level: {data.risk}
                                </p>
                              </div>);

                        }
                        return null;
                      }} />
                    
                      <Scatter
                      name="Opportunities"
                      data={filteredOpportunityData}
                      fill="#FBBF24" />
                    
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-center text-gray-500">
                  Bubble size represents relative market size opportunity
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Opportunity
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Sector
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Growth Potential
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Risk-Adjusted Return
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Predicted ROI
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Risk Level
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOpportunityData.map((opportunity, index) =>
                  <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                          {opportunity.name}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                          {opportunity.sector}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-blue-600">
                              {opportunity.x}%
                            </span>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                              <div
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{
                              width: `${opportunity.x}%`
                            }}>
                          </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-green-600">
                              {opportunity.y}%
                            </span>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                              <div
                            className="h-1.5 rounded-full bg-green-500"
                            style={{
                              width: `${opportunity.y}%`
                            }}>
                          </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-amber-600">
                          {opportunity.roi}x
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${opportunity.risk === 'Low' ? 'bg-green-100 text-green-800' : opportunity.risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                        
                            {opportunity.risk}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-amber-600 hover:text-amber-900 mr-3">
                            View Deals
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            Analyze
                          </button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          }
          {activeTab === 'portfolio' &&
          <div>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <ScoreCard
                title="Portfolio Health"
                score={85}
                maxScore={100}
                trend="up"
                trendValue={3}
                type="growth"
                description="Strong overall performance" />
              
                <ScoreCard
                title="Growth Projection"
                score={28}
                maxScore={100}
                trend="up"
                trendValue={5}
                type="percentage"
                description="Expected 12-month growth" />
              
                <ScoreCard
                title="Risk Assessment"
                score={32}
                maxScore={100}
                trend="down"
                trendValue={8}
                type="risk"
                description="Well-balanced portfolio" />
              
                <ScoreCard
                title="AI Optimization"
                score={18}
                maxScore={100}
                trend="up"
                trendValue={4}
                type="percentage"
                description="Additional return potential" />
              
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    ROI Projections (Current vs AI-Predicted)
                  </h4>
                  <select
                  className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}>
                  
                    <option value="6m">Next 6 Months</option>
                    <option value="1y">Next 12 Months</option>
                    <option value="2y">Next 24 Months</option>
                  </select>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={filteredRoiData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                    
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar
                      dataKey="current"
                      name="Current ROI %"
                      fill="#6B7280"
                      radius={[4, 4, 0, 0]} />
                    
                      <Bar
                      dataKey="predicted"
                      name="Predicted ROI %"
                      fill="#FBBF24"
                      radius={[4, 4, 0, 0]} />
                    
                      <ReferenceLine y={0} stroke="#000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <LightbulbIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-amber-800">
                      Portfolio Optimization Recommendations
                    </h4>
                    <p className="mt-1 text-sm text-amber-700">
                      Our AI analysis suggests the following optimization
                      strategies:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-amber-700">
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          Increase healthcare sector allocation by 15% to
                          capture projected growth
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          Rebalance technology investments towards AI and
                          cybersecurity (potential 22% ROI improvement)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          Consider strategic exit from AgriTech Solutions within
                          6 months (projected continued underperformance)
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 text-right">
                      <button className="text-sm font-medium text-amber-800 hover:text-amber-900">
                        View Detailed Recommendations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Risk Analysis
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      AI Powered
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Comprehensive risk assessment across multiple dimensions,
                    highlighting potential vulnerabilities and mitigation
                    strategies.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Market Risk</span>
                        <span className="text-gray-800 font-medium">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-green-500"
                        style={{
                          width: '35%'
                        }}>
                      </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Liquidity Risk</span>
                        <span className="text-gray-800 font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-green-500"
                        style={{
                          width: '28%'
                        }}>
                      </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Concentration Risk
                        </span>
                        <span className="text-gray-800 font-medium">52%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-amber-500"
                        style={{
                          width: '52%'
                        }}>
                      </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Operational Risk</span>
                        <span className="text-gray-800 font-medium">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-amber-500"
                        style={{
                          width: '45%'
                        }}>
                      </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Interest Rate Risk
                        </span>
                        <span className="text-gray-800 font-medium">40%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-amber-500"
                        style={{
                          width: '40%'
                        }}>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                      View Detailed Risk Report
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      AI-Powered Insights
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <BrainIcon className="w-3 h-3 mr-1" />
                      92% Confidence
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h5 className="text-sm font-medium text-blue-800">
                        Growth Acceleration
                      </h5>
                      <p className="mt-1 text-xs text-blue-700">
                        MedTech Innovations is projected to accelerate growth by
                        35% in the next quarter, driven by new hospital
                        partnerships and regulatory approvals in international
                        markets.
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <h5 className="text-sm font-medium text-amber-800">
                        Emerging Risk
                      </h5>
                      <p className="mt-1 text-xs text-amber-700">
                        GreenEnergy Innovations may face supply chain
                        constraints in the next 4-6 months, potentially
                        impacting production capacity by 20-25%.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <h5 className="text-sm font-medium text-green-800">
                        Optimization Opportunity
                      </h5>
                      <p className="mt-1 text-xs text-green-700">
                        Restructuring the AgriTech Solutions investment could
                        improve overall portfolio ROI by 8% through strategic
                        pivot to precision farming technologies.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                      Generate More Insights
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          {activeTab === 'scenarios' &&
          <div>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
                  Scenario Modeling & Stress Testing
                </h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create New Scenario
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Saved Scenario Models
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Scenario Name
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Description
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Type
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Last Run
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scenarioModels.map((model) =>
                    <tr key={model.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                            {model.name}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-500">
                            {model.description}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                            {model.type}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                            {model.lastRun}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-amber-600 hover:text-amber-900 mr-3">
                              Run
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 mr-3">
                              Edit
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Stress Test Results
                    </h4>
                    <span className="text-xs text-gray-500">
                      Last run: Oct 12, 2023
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                      data={[
                      {
                        scenario: 'Base',
                        value: 100
                      },
                      {
                        scenario: '-10% Market',
                        value: 92
                      },
                      {
                        scenario: '-20% Market',
                        value: 83
                      },
                      {
                        scenario: '-30% Market',
                        value: 74
                      },
                      {
                        scenario: 'Recession',
                        value: 65
                      },
                      {
                        scenario: 'Severe Crisis',
                        value: 52
                      }]
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}>
                      
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <Tooltip />
                        <Line
                        type="monotone"
                        dataKey="value"
                        name="Portfolio Value (%)"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={{
                          r: 6
                        }} />
                      
                        <ReferenceLine
                        y={80}
                        stroke="#EF4444"
                        strokeDasharray="3 3" />
                      
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-500">
                    Red line indicates minimum acceptable portfolio value (80%)
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                      View Full Results
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Sensitivity Analysis
                    </h4>
                    <span className="text-xs text-gray-500">
                      Interest Rate Impact
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                      data={[
                      {
                        rate: 'Current',
                        tech: 100,
                        health: 100,
                        energy: 100,
                        finance: 100
                      },
                      {
                        rate: '+1%',
                        tech: 98,
                        health: 97,
                        energy: 96,
                        finance: 92
                      },
                      {
                        rate: '+2%',
                        tech: 95,
                        health: 94,
                        energy: 92,
                        finance: 85
                      },
                      {
                        rate: '+3%',
                        tech: 92,
                        health: 91,
                        energy: 88,
                        finance: 78
                      },
                      {
                        rate: '+4%',
                        tech: 88,
                        health: 89,
                        energy: 84,
                        finance: 72
                      },
                      {
                        rate: '+5%',
                        tech: 85,
                        health: 86,
                        energy: 80,
                        finance: 65
                      }]
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}>
                      
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="rate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                        type="monotone"
                        dataKey="tech"
                        name="Technology"
                        stroke="#1D4ED8"
                        strokeWidth={2} />
                      
                        <Line
                        type="monotone"
                        dataKey="health"
                        name="Healthcare"
                        stroke="#10B981"
                        strokeWidth={2} />
                      
                        <Line
                        type="monotone"
                        dataKey="energy"
                        name="Energy"
                        stroke="#F59E0B"
                        strokeWidth={2} />
                      
                        <Line
                        type="monotone"
                        dataKey="finance"
                        name="Finance"
                        stroke="#8B5CF6"
                        strokeWidth={2} />
                      
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-500">
                    Sector performance under different interest rate scenarios
                    (% of current value)
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                      Run New Simulation
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                  <BrainIcon className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">
                      AI Scenario Recommendations
                    </h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Based on current market conditions and portfolio
                      composition, our AI recommends running the following
                      scenario analyses:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-blue-700">
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Inflation Surge:</strong> Test portfolio
                          resilience against 3-5% higher than expected inflation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Tech Sector Correction:</strong> Model impact
                          of 25-30% technology sector valuation reduction
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Healthcare Expansion:</strong> Simulate
                          increasing healthcare allocation to capture projected
                          growth
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 text-right">
                      <button className="text-sm font-medium text-blue-800 hover:text-blue-900">
                        Create Recommended Scenarios
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}