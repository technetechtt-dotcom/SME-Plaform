import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine } from
'recharts';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  BarChart2Icon,
  PieChartIcon,
  ArrowRightIcon,
  CalendarIcon,
  FileTextIcon,
  DownloadIcon,
  SlidersIcon,
  ChevronDownIcon,
  ChevronRightIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
import { ScoreCard } from '../../common/ScoreCard';
export function PortfolioTrackingPage() {
  const [timeFrame, setTimeFrame] = useState('1y');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Portfolio data
  const portfolioData = [
  {
    month: 'Jan',
    actual: 12.5,
    predicted: 12.5
  },
  {
    month: 'Feb',
    actual: 14.2,
    predicted: 14.2
  },
  {
    month: 'Mar',
    actual: 15.8,
    predicted: 15.8
  },
  {
    month: 'Apr',
    actual: 17.3,
    predicted: 17.3
  },
  {
    month: 'May',
    actual: 18.5,
    predicted: 18.5
  },
  {
    month: 'Jun',
    actual: 19.2,
    predicted: 19.2
  },
  {
    month: 'Jul',
    predicted: 21.4
  },
  {
    month: 'Aug',
    predicted: 23.1
  },
  {
    month: 'Sep',
    predicted: 24.8
  }];

  const investmentsByStage = [
  {
    name: 'Early Stage',
    value: 25,
    color: '#1D4ED8'
  },
  {
    name: 'Growth',
    value: 45,
    color: '#10B981'
  },
  {
    name: 'Expansion',
    value: 30,
    color: '#FBBF24'
  }];

  const investmentsBySector = [
  {
    name: 'Technology',
    value: 40
  },
  {
    name: 'Manufacturing',
    value: 25
  },
  {
    name: 'Agriculture',
    value: 15
  },
  {
    name: 'Renewable Energy',
    value: 12
  },
  {
    name: 'Other',
    value: 8
  }];

  const monthlyReturns = [
  {
    month: 'Jan',
    returns: 2.5
  },
  {
    month: 'Feb',
    returns: 3.8
  },
  {
    month: 'Mar',
    returns: 3.2
  },
  {
    month: 'Apr',
    returns: 4.1
  },
  {
    month: 'May',
    returns: 5.3
  },
  {
    month: 'Jun',
    returns: 4.8
  },
  {
    month: 'Jul',
    returns: 5.1
  },
  {
    month: 'Aug',
    returns: 6.2
  },
  {
    month: 'Sep',
    returns: 5.7
  },
  {
    month: 'Oct',
    returns: 6.5
  },
  {
    month: 'Nov',
    returns: 7.1
  },
  {
    month: 'Dec',
    returns: 7.8
  }];

  const portfolioCompanies = [
  {
    id: 1,
    name: 'TechSolutions Ltd',
    investment: 'R2.5M',
    investmentDate: '2022-06-15',
    currentValue: 'R3.2M',
    roi: '+28%',
    trend: 'up',
    predictedValue: 'R4.1M by Q4',
    risk: 'low',
    blockchain: true,
    kpis: [
    {
      name: 'Revenue Growth',
      value: '+32% YoY',
      status: 'positive'
    },
    {
      name: 'Customer Acquisition',
      value: '+45% YoY',
      status: 'positive'
    },
    {
      name: 'Burn Rate',
      value: 'R120K/month',
      status: 'neutral'
    },
    {
      name: 'Runway',
      value: '18 months',
      status: 'positive'
    }],

    milestones: [
    {
      name: 'Product Launch v2.0',
      status: 'completed',
      date: '2023-03-15'
    },
    {
      name: 'Enterprise Client Acquisition',
      status: 'completed',
      date: '2023-05-22'
    },
    {
      name: 'International Expansion',
      status: 'in_progress',
      date: '2023-11-30'
    },
    {
      name: 'Series B Funding',
      status: 'planned',
      date: '2024-04-15'
    }]

  },
  {
    id: 2,
    name: 'GreenEnergy Innovations',
    investment: 'R1.8M',
    investmentDate: '2022-09-10',
    currentValue: 'R2.1M',
    roi: '+16%',
    trend: 'up',
    predictedValue: 'R2.8M by Q4',
    risk: 'medium',
    blockchain: true,
    kpis: [
    {
      name: 'Revenue Growth',
      value: '+18% YoY',
      status: 'positive'
    },
    {
      name: 'Customer Acquisition',
      value: '+22% YoY',
      status: 'positive'
    },
    {
      name: 'Burn Rate',
      value: 'R150K/month',
      status: 'caution'
    },
    {
      name: 'Runway',
      value: '12 months',
      status: 'neutral'
    }],

    milestones: [
    {
      name: 'Patent Approval',
      status: 'completed',
      date: '2023-02-28'
    },
    {
      name: 'Manufacturing Scale-up',
      status: 'in_progress',
      date: '2023-10-15'
    },
    {
      name: 'Government Contract',
      status: 'in_progress',
      date: '2023-12-10'
    },
    {
      name: 'Series A Funding',
      status: 'planned',
      date: '2024-03-01'
    }]

  },
  {
    id: 3,
    name: 'AgriTech Solutions',
    investment: 'R3.2M',
    investmentDate: '2022-03-22',
    currentValue: 'R2.9M',
    roi: '-9%',
    trend: 'down',
    predictedValue: 'R3.5M by Q4',
    risk: 'high',
    blockchain: true,
    kpis: [
    {
      name: 'Revenue Growth',
      value: '-5% YoY',
      status: 'negative'
    },
    {
      name: 'Customer Acquisition',
      value: '+8% YoY',
      status: 'neutral'
    },
    {
      name: 'Burn Rate',
      value: 'R200K/month',
      status: 'negative'
    },
    {
      name: 'Runway',
      value: '9 months',
      status: 'caution'
    }],

    milestones: [
    {
      name: 'Product Development',
      status: 'completed',
      date: '2023-01-20'
    },
    {
      name: 'Beta Testing',
      status: 'completed',
      date: '2023-04-15'
    },
    {
      name: 'Market Launch',
      status: 'delayed',
      date: '2023-08-30'
    },
    {
      name: 'Break-even',
      status: 'at_risk',
      date: '2024-06-01'
    }]

  },
  {
    id: 4,
    name: 'MedTech Innovations',
    investment: 'R4.5M',
    investmentDate: '2022-11-05',
    currentValue: 'R6.3M',
    roi: '+40%',
    trend: 'up',
    predictedValue: 'R8.1M by Q4',
    risk: 'low',
    blockchain: true,
    kpis: [
    {
      name: 'Revenue Growth',
      value: '+65% YoY',
      status: 'positive'
    },
    {
      name: 'Customer Acquisition',
      value: '+70% YoY',
      status: 'positive'
    },
    {
      name: 'Burn Rate',
      value: 'R180K/month',
      status: 'neutral'
    },
    {
      name: 'Runway',
      value: '24 months',
      status: 'positive'
    }],

    milestones: [
    {
      name: 'Regulatory Approval',
      status: 'completed',
      date: '2023-02-10'
    },
    {
      name: 'Hospital Partnerships',
      status: 'completed',
      date: '2023-05-15'
    },
    {
      name: 'International Certification',
      status: 'in_progress',
      date: '2023-12-20'
    },
    {
      name: 'Series B Funding',
      status: 'planned',
      date: '2024-02-15'
    }]

  }];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <TrendingUpIcon className="w-4 h-4 text-blue-500" />;
      case 'planned':
        return <CalendarIcon className="w-4 h-4 text-gray-500" />;
      case 'delayed':
        return <AlertCircleIcon className="w-4 h-4 text-amber-500" />;
      case 'at_risk':
        return <AlertCircleIcon className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>);

      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            In Progress
          </span>);

      case 'planned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Planned
          </span>);

      case 'delayed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Delayed
          </span>);

      case 'at_risk':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            At Risk
          </span>);

      default:
        return null;
    }
  };
  const getKpiStatusColor = (status) => {
    switch (status) {
      case 'positive':
        return 'text-green-600';
      case 'neutral':
        return 'text-blue-600';
      case 'caution':
        return 'text-amber-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Portfolio Tracking
          </h2>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('overview')}>
              
              Portfolio Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'companies' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('companies')}>
              
              Company Performance
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'reports' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('reports')}>
              
              Reports & Analytics
            </button>
          </nav>
        </div>
        {activeTab === 'overview' &&
        <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">
                  Total Invested
                </p>
                <p className="text-lg font-semibold text-gray-800">R12.5M</p>
                <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +35% YoY
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">
                  Current Value
                </p>
                <p className="text-lg font-semibold text-gray-800">R19.2M</p>
                <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +53.6% ROI
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">
                  Predicted EOY Value
                </p>
                <p className="text-lg font-semibold text-blue-700">R24.8M</p>
                <div className="mt-1 text-xs text-gray-500">
                  +29.2% from current
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500">
                  Active Investments
                </p>
                <p className="text-lg font-semibold text-gray-800">8</p>
                <div className="mt-1 text-xs text-gray-500">
                  3 in due diligence
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Portfolio Value (Actual vs Predicted)
                </h4>
                <select
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}>
                
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last 12 Months</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  data={portfolioData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5
                  }}>
                  
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual Value (R millions)"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    dot={{
                      r: 4
                    }}
                    activeDot={{
                      r: 6
                    }} />
                  
                    <Line
                    type="monotone"
                    dataKey="predicted"
                    name="Predicted Value (R millions)"
                    stroke="#FCD34D"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{
                      r: 4
                    }} />
                  
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Investment Distribution by Stage
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                        data={investmentsByStage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                        }>
                        
                          {investmentsByStage.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        )}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Monthly Returns
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                      data={monthlyReturns}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5
                      }}>
                      
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar
                        dataKey="returns"
                        name="Monthly Return %"
                        fill="#FBBF24"
                        radius={[4, 4, 0, 0]} />
                      
                        <ReferenceLine
                        y={3}
                        stroke="#10B981"
                        strokeDasharray="3 3" />
                      
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-500">
                    Green line indicates target monthly return (3%)
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Top Performing Investments
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Investment
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Value
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROI
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prediction
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verified
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {portfolioCompanies.map((company) =>
                  <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                          {company.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                          {company.investment}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                          {company.currentValue}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span
                        className={`flex items-center ${company.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        
                            {company.trend === 'up' ?
                        <TrendingUpIcon className="w-4 h-4 mr-1" /> :

                        <TrendingDownIcon className="w-4 h-4 mr-1" />
                        }
                            {company.roi}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600">
                          {company.predictedValue}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${company.risk === 'low' ? 'bg-green-100 text-green-800' : company.risk === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                        
                            {company.risk}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {company.blockchain &&
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                      }
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800">
                  View All Investments
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        }
        {activeTab === 'companies' &&
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                Company Performance Tracking
              </h3>
              <div className="flex space-x-2">
                <select
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}>
                
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last 12 Months</option>
                  <option value="all">All Time</option>
                </select>
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            {selectedCompany ?
          <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <button
                      onClick={() => setSelectedCompany(null)}
                      className="mr-2 text-amber-600 hover:text-amber-800">
                      
                          <ChevronRightIcon className="w-5 h-5 transform rotate-180" />
                        </button>
                        <h3 className="text-lg font-medium text-gray-800">
                          {selectedCompany.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Invested: {selectedCompany.investment} on{' '}
                        {new Date(
                      selectedCompany.investmentDate
                    ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedCompany.risk === 'low' ? 'bg-green-100 text-green-800' : selectedCompany.risk === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    
                        {selectedCompany.risk.charAt(0).toUpperCase() +
                    selectedCompany.risk.slice(1)}{' '}
                        Risk
                      </span>
                      {selectedCompany.blockchain &&
                  <BlockchainBadge compact />
                  }
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className="text-xs font-medium text-gray-500">
                        Current Value
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedCompany.currentValue}
                      </p>
                      <div className="mt-1 text-xs font-medium flex items-center">
                        <span
                      className={
                      selectedCompany.trend === 'up' ?
                      'text-green-600' :
                      'text-red-600'
                      }>
                      
                          {selectedCompany.trend === 'up' ?
                      <TrendingUpIcon className="w-3 h-3 mr-1 inline" /> :

                      <TrendingDownIcon className="w-3 h-3 mr-1 inline" />
                      }
                          {selectedCompany.roi}
                        </span>
                        <span className="text-gray-500 ml-2">
                          since investment
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className="text-xs font-medium text-gray-500">
                        Predicted Value
                      </p>
                      <p className="text-lg font-semibold text-blue-700">
                        {selectedCompany.predictedValue}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Based on AI growth projections
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className="text-xs font-medium text-gray-500">
                        Next Milestone
                      </p>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {selectedCompany.milestones.find(
                      (m) =>
                      m.status === 'in_progress' ||
                      m.status === 'planned'
                    )?.name || 'No upcoming milestones'}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Due:{' '}
                        {new Date(
                      selectedCompany.milestones.find(
                        (m) =>
                        m.status === 'in_progress' ||
                        m.status === 'planned'
                      )?.date || new Date()
                    ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Key Performance Indicators
                      </h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                                KPI
                              </th>
                              <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedCompany.kpis.map((kpi, index) =>
                        <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {kpi.name}
                                </td>
                                <td
                            className={`px-3 py-2 whitespace-nowrap text-sm ${getKpiStatusColor(kpi.status)}`}>
                            
                                  {kpi.value}
                                </td>
                              </tr>
                        )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Milestones
                      </h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                                Milestone
                              </th>
                              <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                                Status
                              </th>
                              <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedCompany.milestones.map(
                          (milestone, index) =>
                          <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                                    {milestone.name}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap">
                                    {getStatusBadge(milestone.status)}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                milestone.date
                              ).toLocaleDateString()}
                                  </td>
                                </tr>

                        )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Contact Team
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div> :

          <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioCompanies.map((company) =>
              <div
                key={company.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedCompany(company)}>
                
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            {company.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Invested: {company.investment}
                          </p>
                        </div>
                        <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${company.risk === 'low' ? 'bg-green-100 text-green-800' : company.risk === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    
                          {company.risk.charAt(0).toUpperCase() +
                    company.risk.slice(1)}{' '}
                          Risk
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Current Value</p>
                          <p className="text-sm font-medium text-gray-800">
                            {company.currentValue}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ROI</p>
                          <p className="text-sm font-medium flex items-center">
                            <span
                        className={
                        company.trend === 'up' ?
                        'text-green-600' :
                        'text-red-600'
                        }>
                        
                              {company.trend === 'up' ?
                        <TrendingUpIcon className="w-3 h-3 mr-1 inline" /> :

                        <TrendingDownIcon className="w-3 h-3 mr-1 inline" />
                        }
                              {company.roi}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Prediction</p>
                          <p className="text-sm font-medium text-blue-600">
                            {company.predictedValue.split(' ')[0]}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {
                    company.milestones.filter(
                      (m) => m.status === 'completed'
                    ).length
                    }{' '}
                          of {company.milestones.length} milestones completed
                        </div>
                        <div className="flex items-center">
                          {company.blockchain && <BlockchainBadge compact />}
                          <ChevronRightIcon className="w-5 h-5 text-amber-500 ml-2" />
                        </div>
                      </div>
                    </div>
              )}
                </div>
              </div>
          }
          </div>
        }
        {activeTab === 'reports' &&
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                Portfolio Reports & Analytics
              </h3>
              <div className="flex space-x-2">
                <select
                className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}>
                
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last 12 Months</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100 mr-3">
                    <BarChart2Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Portfolio Performance
                    </h4>
                    <p className="text-xs text-gray-500">
                      Comprehensive analysis
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  Complete breakdown of portfolio performance metrics, ROI
                  analysis, and benchmarking against market indices.
                </p>
                <button className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center">
                  View Report
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <TrendingUpIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Growth Analysis
                    </h4>
                    <p className="text-xs text-gray-500">
                      Company growth metrics
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  Detailed analysis of growth metrics across all portfolio
                  companies, including revenue, customers, and market share.
                </p>
                <button className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center">
                  View Report
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <PieChartIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Allocation Report
                    </h4>
                    <p className="text-xs text-gray-500">
                      Portfolio diversification
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  Analysis of investment allocation across sectors, stages, and
                  regions with recommendations for optimization.
                </p>
                <button className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center">
                  View Report
                  <ArrowRightIcon className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Recent Reports
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Report Name
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Generated On
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Type
                      </th>
                      <th
                      scope="col"
                      className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        Q3 2023 Portfolio Performance
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Oct 15, 2023
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Quarterly Review
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        MedTech Innovations Deep Dive
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Oct 10, 2023
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Company Analysis
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        Healthcare Sector Outlook
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Oct 5, 2023
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Sector Analysis
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        Portfolio Risk Assessment
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Sep 28, 2023
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        Risk Analysis
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <FileTextIcon className="w-4 h-4 mr-2" />
                Generate Custom Report
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}