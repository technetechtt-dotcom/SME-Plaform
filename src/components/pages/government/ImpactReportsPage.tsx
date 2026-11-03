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
  PieChart,
  Pie,
  Cell } from
'recharts';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon,
  DownloadIcon,
  CalendarIcon,
  FilterIcon,
  MapIcon,
  FileTextIcon,
  Share2Icon } from
'lucide-react';
export function ImpactReportsPage() {
  const [timeFrame, setTimeFrame] = useState('1y');
  const [reportType, setReportType] = useState('overview');
  // Sample data for charts
  const jobsCreatedData = [
  {
    quarter: 'Q1 2022',
    jobs: 320
  },
  {
    quarter: 'Q2 2022',
    jobs: 450
  },
  {
    quarter: 'Q3 2022',
    jobs: 580
  },
  {
    quarter: 'Q4 2022',
    jobs: 620
  },
  {
    quarter: 'Q1 2023',
    jobs: 750
  },
  {
    quarter: 'Q2 2023',
    jobs: 880
  },
  {
    quarter: 'Q3 2023',
    jobs: 1050
  }];

  const economicImpactData = [
  {
    quarter: 'Q1 2022',
    gdpContribution: 12,
    taxRevenue: 4,
    exports: 8
  },
  {
    quarter: 'Q2 2022',
    gdpContribution: 15,
    taxRevenue: 5,
    exports: 9
  },
  {
    quarter: 'Q3 2022',
    gdpContribution: 18,
    taxRevenue: 6,
    exports: 11
  },
  {
    quarter: 'Q4 2022',
    gdpContribution: 20,
    taxRevenue: 7,
    exports: 13
  },
  {
    quarter: 'Q1 2023',
    gdpContribution: 22,
    taxRevenue: 8,
    exports: 14
  },
  {
    quarter: 'Q2 2023',
    gdpContribution: 25,
    taxRevenue: 9,
    exports: 16
  },
  {
    quarter: 'Q3 2023',
    gdpContribution: 28,
    taxRevenue: 10,
    exports: 18
  }];

  const sectoralImpactData = [
  {
    name: 'Manufacturing',
    value: 35,
    color: '#1D4ED8'
  },
  {
    name: 'Technology',
    value: 25,
    color: '#10B981'
  },
  {
    name: 'Agriculture',
    value: 15,
    color: '#FBBF24'
  },
  {
    name: 'Tourism',
    value: 10,
    color: '#EC4899'
  },
  {
    name: 'Healthcare',
    value: 8,
    color: '#8B5CF6'
  },
  {
    name: 'Other Sectors',
    value: 7,
    color: '#6B7280'
  }];

  const regionalImpactData = [
  {
    name: 'Gauteng',
    value: 40,
    color: '#1D4ED8'
  },
  {
    name: 'Western Cape',
    value: 25,
    color: '#10B981'
  },
  {
    name: 'KZN',
    value: 20,
    color: '#FBBF24'
  },
  {
    name: 'Eastern Cape',
    value: 8,
    color: '#EC4899'
  },
  {
    name: 'Other Provinces',
    value: 7,
    color: '#6B7280'
  }];

  const sdgAlignmentData = [
  {
    name: 'SDG 8: Decent Work',
    value: 35,
    color: '#1D4ED8'
  },
  {
    name: 'SDG 9: Industry & Innovation',
    value: 25,
    color: '#10B981'
  },
  {
    name: 'SDG 1: No Poverty',
    value: 15,
    color: '#FBBF24'
  },
  {
    name: 'SDG 13: Climate Action',
    value: 10,
    color: '#EC4899'
  },
  {
    name: 'Other SDGs',
    value: 15,
    color: '#6B7280'
  }];

  const impactMetrics = [
  {
    id: 'jobs',
    label: 'Jobs Created',
    value: '1,050',
    change: '+19.3%',
    trend: 'up',
    icon: <UsersIcon className="w-5 h-5 text-green-500" />
  },
  {
    id: 'businesses',
    label: 'Businesses Supported',
    value: '485',
    change: '+15.5%',
    trend: 'up',
    icon: <BuildingIcon className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'gdp',
    label: 'GDP Contribution',
    value: 'R28.5M',
    change: '+12%',
    trend: 'up',
    icon: <TrendingUpIcon className="w-5 h-5 text-amber-500" />
  },
  {
    id: 'roi',
    label: 'Funding ROI',
    value: '3.2x',
    change: '+0.4x',
    trend: 'up',
    icon: <BriefcaseIcon className="w-5 h-5 text-purple-500" />
  }];

  const reportsList = [
  {
    id: 1,
    title: 'Q3 2023 Economic Impact Report',
    date: 'October 10, 2023',
    type: 'Quarterly',
    format: 'PDF',
    size: '3.2 MB'
  },
  {
    id: 2,
    title: 'SME Growth Fund Impact Assessment',
    date: 'September 28, 2023',
    type: 'Program-specific',
    format: 'PDF',
    size: '2.8 MB'
  },
  {
    id: 3,
    title: 'Regional Development Impact Analysis',
    date: 'September 15, 2023',
    type: 'Thematic',
    format: 'PDF',
    size: '4.5 MB'
  },
  {
    id: 4,
    title: 'Q2 2023 Economic Impact Report',
    date: 'July 12, 2023',
    type: 'Quarterly',
    format: 'PDF',
    size: '3.1 MB'
  },
  {
    id: 5,
    title: 'Annual Impact Report 2022-2023',
    date: 'June 30, 2023',
    type: 'Annual',
    format: 'PDF',
    size: '8.5 MB'
  }];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Impact Reports & Analysis
          </h2>
        </div>
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${reportType === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setReportType('overview')}>
                
                Overview
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${reportType === 'economic' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setReportType('economic')}>
                
                Economic Impact
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${reportType === 'sectoral' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setReportType('sectoral')}>
                
                Sectoral Analysis
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${reportType === 'regional' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setReportType('regional')}>
                
                Regional Impact
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${reportType === 'reports' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setReportType('reports')}>
                
                Reports Library
              </button>
            </nav>
            <div className="px-4">
              <select
                className="border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}>
                
                <option value="1y">Last 12 Months</option>
                <option value="2y">Last 2 Years</option>
                <option value="3y">Last 3 Years</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
        {reportType === 'overview' &&
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {impactMetrics.map((metric) =>
            <div
              key={metric.id}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              
                  <div className="flex items-center">
                    <div className="flex-shrink-0">{metric.icon}</div>
                    <div className="ml-2">
                      <p className="text-xs font-medium text-gray-500">
                        {metric.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                    {metric.trend === 'up' ?
                <TrendingUpIcon className="w-3 h-3 mr-1" /> :

                <TrendingDownIcon className="w-3 h-3 mr-1" />
                }
                    {metric.change} YoY
                  </div>
                </div>
            )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Jobs Created Over Time
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +65% YoY
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={jobsCreatedData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5
                    }}>
                    
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                      dataKey="jobs"
                      name="Jobs Created"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Sectoral Impact Distribution
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={sectoralImpactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {sectoralImpactData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Economic Impact Metrics
                </h3>
                <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-md">
                  <DownloadIcon className="w-3 h-3 mr-1" />
                  Export Data
                </button>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  data={economicImpactData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5
                  }}>
                  
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                    type="monotone"
                    dataKey="gdpContribution"
                    name="GDP Contribution (R Millions)"
                    stroke="#1D4ED8"
                    strokeWidth={2}
                    dot={{
                      r: 3
                    }}
                    activeDot={{
                      r: 5
                    }} />
                  
                    <Line
                    type="monotone"
                    dataKey="taxRevenue"
                    name="Tax Revenue (R Millions)"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{
                      r: 3
                    }}
                    activeDot={{
                      r: 5
                    }} />
                  
                    <Line
                    type="monotone"
                    dataKey="exports"
                    name="Export Growth (R Millions)"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    dot={{
                      r: 3
                    }}
                    activeDot={{
                      r: 5
                    }} />
                  
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Regional Impact Distribution
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={regionalImpactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {regionalImpactData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Sustainable Development Goals Alignment
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={sdgAlignmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {sdgAlignmentData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        }
        {reportType === 'economic' &&
        <div className="p-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
              <div className="flex items-start">
                <TrendingUpIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Economic Impact Summary
                  </h3>
                  <p className="mt-1 text-sm text-green-700">
                    Funding programs have generated R28.5M in GDP contribution,
                    with a 3.2x return on investment. Tax revenue has increased
                    by 25% year-over-year, and export growth is up 38% in
                    supported businesses.
                  </p>
                </div>
              </div>
            </div>
            {/* Economic impact charts would go here - similar to the overview charts but more detailed */}
            <div className="text-center py-16">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Detailed economic impact analysis
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This section would contain detailed economic impact metrics and
                analysis
              </p>
            </div>
          </div>
        }
        {reportType === 'sectoral' &&
        <div className="p-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
              <div className="flex items-start">
                <BuildingIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Sectoral Impact Summary
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Manufacturing sector shows the highest job creation at 35%
                    of total jobs created, while Technology sector demonstrates
                    the highest growth rate at 42% year-over-year. Agriculture
                    sector shows the highest rural impact.
                  </p>
                </div>
              </div>
            </div>
            {/* Sectoral impact charts would go here */}
            <div className="text-center py-16">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Detailed sectoral impact analysis
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This section would contain detailed sectoral impact metrics and
                analysis
              </p>
            </div>
          </div>
        }
        {reportType === 'regional' &&
        <div className="p-4">
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 mb-6">
              <div className="flex items-start">
                <MapIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    Regional Impact Summary
                  </h3>
                  <p className="mt-1 text-sm text-amber-700">
                    Gauteng leads with 40% of funding impact, while Eastern Cape
                    shows the highest growth rate at 48% year-over-year. Rural
                    areas have seen a 32% increase in business establishment
                    through targeted rural development grants.
                  </p>
                </div>
              </div>
            </div>
            {/* Regional impact visualization would go here */}
            <div className="text-center py-16">
              <MapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Regional impact visualization
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This section would contain an interactive map showing regional
                impact distribution
              </p>
            </div>
          </div>
        }
        {reportType === 'reports' &&
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative flex-1">
                <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <FileTextIcon className="w-4 h-4 mr-1" />
                  Generate New Report
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {reportsList.map((report) =>
              <div key={report.id} className="p-4 hover:bg-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                          <FileTextIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            {report.title}
                          </h4>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            {report.date}
                            <span className="mx-2">•</span>
                            <span>{report.type}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {report.format}, {report.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-800">
                          <DownloadIcon className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Share2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 5 of 24 reports
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-green-500 bg-green-50 rounded-md text-sm font-medium text-green-700 hover:bg-green-100">
                  Next
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}