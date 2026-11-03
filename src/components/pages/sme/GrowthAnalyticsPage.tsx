import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from
'recharts';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart2Icon,
  PieChartIcon,
  LineChartIcon,
  UsersIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  ArrowRightIcon } from
'lucide-react';
import { ScoreCard } from '../../common/ScoreCard';
export function GrowthAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('6m');
  // Sample data for charts
  const revenueData = [
  {
    month: 'Jan',
    actual: 120000,
    predicted: 120000
  },
  {
    month: 'Feb',
    actual: 135000,
    predicted: 135000
  },
  {
    month: 'Mar',
    actual: 140000,
    predicted: 140000
  },
  {
    month: 'Apr',
    actual: 155000,
    predicted: 155000
  },
  {
    month: 'May',
    actual: 170000,
    predicted: 170000
  },
  {
    month: 'Jun',
    actual: 180000,
    predicted: 180000
  },
  {
    month: 'Jul',
    predicted: 195000
  },
  {
    month: 'Aug',
    predicted: 210000
  },
  {
    month: 'Sep',
    predicted: 225000
  }];

  const employeeData = [
  {
    month: 'Jan',
    employees: 12
  },
  {
    month: 'Feb',
    employees: 13
  },
  {
    month: 'Mar',
    employees: 15
  },
  {
    month: 'Apr',
    employees: 15
  },
  {
    month: 'May',
    employees: 16
  },
  {
    month: 'Jun',
    employees: 18
  },
  {
    month: 'Jul',
    employees: 20
  },
  {
    month: 'Aug',
    employees: 21
  },
  {
    month: 'Sep',
    employees: 22
  }];

  const salesData = [
  {
    month: 'Jan',
    sales: 85
  },
  {
    month: 'Feb',
    sales: 92
  },
  {
    month: 'Mar',
    sales: 88
  },
  {
    month: 'Apr',
    sales: 99
  },
  {
    month: 'May',
    sales: 110
  },
  {
    month: 'Jun',
    sales: 118
  }];

  const customerData = [
  {
    month: 'Jan',
    new: 12,
    returning: 45
  },
  {
    month: 'Feb',
    new: 15,
    returning: 48
  },
  {
    month: 'Mar',
    new: 18,
    returning: 52
  },
  {
    month: 'Apr',
    new: 22,
    returning: 55
  },
  {
    month: 'May',
    new: 25,
    returning: 58
  },
  {
    month: 'Jun',
    new: 28,
    returning: 62
  }];

  const revenueSourcesData = [
  {
    name: 'Product A',
    value: 45,
    color: '#1D4ED8'
  },
  {
    name: 'Product B',
    value: 25,
    color: '#10B981'
  },
  {
    name: 'Product C',
    value: 15,
    color: '#FBBF24'
  },
  {
    name: 'Services',
    value: 15,
    color: '#EC4899'
  }];

  const marketShareData = [
  {
    name: 'Your Company',
    value: 18,
    color: '#1D4ED8'
  },
  {
    name: 'Competitor A',
    value: 25,
    color: '#10B981'
  },
  {
    name: 'Competitor B',
    value: 22,
    color: '#FBBF24'
  },
  {
    name: 'Competitor C',
    value: 15,
    color: '#EC4899'
  },
  {
    name: 'Others',
    value: 20,
    color: '#6B7280'
  }];

  const growthOpportunities = [
  {
    id: 1,
    title: 'Export Market Expansion',
    description:
    'Potential to expand into neighboring countries with current product line',
    impact: 'high',
    timeframe: 'medium',
    roi: '2.5x',
    readiness: 75
  },
  {
    id: 2,
    title: 'Product Line Extension',
    description:
    'Develop complementary products to increase average order value',
    impact: 'medium',
    timeframe: 'short',
    roi: '1.8x',
    readiness: 85
  },
  {
    id: 3,
    title: 'E-commerce Channel',
    description: 'Establish direct-to-consumer online sales channel',
    impact: 'medium',
    timeframe: 'short',
    roi: '2.2x',
    readiness: 80
  },
  {
    id: 4,
    title: 'Strategic Partnership',
    description: 'Partner with complementary business for distribution',
    impact: 'high',
    timeframe: 'long',
    roi: '3.0x',
    readiness: 60
  }];

  const businessMetrics = [
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    value: 'R180,000',
    change: '+5.8%',
    trend: 'up',
    icon: <DollarSignIcon className="w-5 h-5 text-blue-500" />,
    prediction: 'R225,000 by Sep'
  },
  {
    id: 'employees',
    label: 'Employees',
    value: '18',
    change: '+2',
    trend: 'up',
    icon: <UsersIcon className="w-5 h-5 text-green-500" />,
    prediction: '22 by Sep'
  },
  {
    id: 'sales',
    label: 'Monthly Sales',
    value: '118 units',
    change: '+7.3%',
    trend: 'up',
    icon: <ShoppingCartIcon className="w-5 h-5 text-amber-500" />,
    prediction: '135 units by Sep'
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '90',
    change: '+12%',
    trend: 'up',
    icon: <BriefcaseIcon className="w-5 h-5 text-purple-500" />,
    prediction: '110 by Sep'
  }];

  const getImpactBadgeClass = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getTimeframeBadgeClass = (timeframe) => {
    switch (timeframe) {
      case 'short':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-purple-100 text-purple-800';
      case 'long':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Growth & Analytics
          </h2>
        </div>
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <nav className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('overview')}>
                
                Overview
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'revenue' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('revenue')}>
                
                Revenue
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'customers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('customers')}>
                
                Customers
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'opportunities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('opportunities')}>
                
                Growth Opportunities
              </button>
            </nav>
            <div className="px-4">
              <select
                className="border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}>
                
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
        {activeTab === 'overview' &&
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {businessMetrics.map((metric) =>
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
                    {metric.change} from previous month
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Predicted: {metric.prediction}
                  </div>
                </div>
            )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <LineChartIcon className="w-4 h-4 mr-1 text-blue-500" />
                    Revenue Growth
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    AI Predicted
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={revenueData}
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
                      name="Actual Revenue"
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
                      dataKey="predicted"
                      name="Predicted Revenue"
                      stroke="#93C5FD"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{
                        r: 3
                      }} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <PieChartIcon className="w-4 h-4 mr-1 text-green-500" />
                    Revenue Sources
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={revenueSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {revenueSourcesData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <BarChart2Icon className="w-4 h-4 mr-1 text-amber-500" />
                    Sales Trend
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={salesData}
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
                      <Bar
                      dataKey="sales"
                      name="Units Sold"
                      fill="#FBBF24"
                      radius={[4, 4, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <UsersIcon className="w-4 h-4 mr-1 text-purple-500" />
                    Customer Growth
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={customerData}
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
                      <Bar
                      dataKey="new"
                      name="New Customers"
                      stackId="a"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]} />
                    
                      <Bar
                      dataKey="returning"
                      name="Returning Customers"
                      stackId="a"
                      fill="#C4B5FD"
                      radius={[4, 4, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        }
        {activeTab === 'revenue' &&
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ScoreCard
              title="Revenue Growth"
              score={25}
              maxScore={100}
              trend="up"
              trendValue={5}
              type="growth"
              description="Year-over-year revenue growth rate" />
            
              <ScoreCard
              title="Profit Margin"
              score={18}
              maxScore={100}
              trend="up"
              trendValue={2}
              type="growth"
              description="Net profit as percentage of revenue" />
            
              <ScoreCard
              title="Cash Flow"
              score={85}
              maxScore={100}
              trend="up"
              trendValue={10}
              type="growth"
              description="Positive cash flow health indicator" />
            
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Revenue Breakdown
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  data={revenueData}
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
                    name="Actual Revenue"
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
                    dataKey="predicted"
                    name="Predicted Revenue"
                    stroke="#93C5FD"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{
                      r: 3
                    }} />
                  
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Revenue by Product
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={revenueSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {revenueSourcesData.map((entry, index) =>
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
                    Market Share
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {marketShareData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                AI Revenue Insights
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Product A is your highest margin product at 42% profit
                    margin
                  </span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Seasonal revenue patterns suggest increasing inventory for
                    Q4
                  </span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Price optimization opportunity for Product C could increase
                    revenue by 15%
                  </span>
                </li>
              </ul>
            </div>
          </div>
        }
        {activeTab === 'customers' &&
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UsersIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-500">
                      Total Customers
                    </p>
                    <p className="text-lg font-semibold text-gray-800">90</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +12% from previous month
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UsersIcon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-500">
                      New Customers
                    </p>
                    <p className="text-lg font-semibold text-gray-800">28</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +12% from previous month
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSignIcon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-500">
                      Avg. Order Value
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      R1,520
                    </p>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +5% from previous month
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UsersIcon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-500">
                      Retention Rate
                    </p>
                    <p className="text-lg font-semibold text-gray-800">78%</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  +3% from previous month
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Customer Growth
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={customerData}
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
                      <Bar
                      dataKey="new"
                      name="New Customers"
                      stackId="a"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]} />
                    
                      <Bar
                      dataKey="returning"
                      name="Returning Customers"
                      stackId="a"
                      fill="#C4B5FD"
                      radius={[4, 4, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Customer Segments
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                      data={[
                      {
                        name: 'Enterprise',
                        value: 35,
                        color: '#1D4ED8'
                      },
                      {
                        name: 'SME',
                        value: 45,
                        color: '#10B981'
                      },
                      {
                        name: 'Government',
                        value: 20,
                        color: '#FBBF24'
                      }]
                      }
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      
                        {[
                      {
                        name: 'Enterprise',
                        value: 35,
                        color: '#1D4ED8'
                      },
                      {
                        name: 'SME',
                        value: 45,
                        color: '#10B981'
                      },
                      {
                        name: 'Government',
                        value: 20,
                        color: '#FBBF24'
                      }].
                      map((entry, index) =>
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
                  Customer Acquisition Cost vs Lifetime Value
                </h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                  data={[
                  {
                    segment: 'Enterprise',
                    cac: 12000,
                    ltv: 85000
                  },
                  {
                    segment: 'SME',
                    cac: 5000,
                    ltv: 25000
                  },
                  {
                    segment: 'Government',
                    cac: 8000,
                    ltv: 60000
                  }]
                  }
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5
                  }}>
                  
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                    dataKey="cac"
                    name="Customer Acquisition Cost (R)"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]} />
                  
                    <Bar
                    dataKey="ltv"
                    name="Customer Lifetime Value (R)"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]} />
                  
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                AI Customer Insights
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Enterprise customers have the highest LTV:CAC ratio at 7.1x
                  </span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    Implementing a referral program could reduce CAC by up to
                    25%
                  </span>
                </li>
                <li className="flex items-start text-sm">
                  <ChevronRightIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-800">
                    SME segment shows strongest growth potential with 45%
                    increase YoY
                  </span>
                </li>
              </ul>
            </div>
          </div>
        }
        {activeTab === 'opportunities' &&
        <div className="p-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">
                    AI Growth Analysis
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Based on your business performance and market trends, we've
                    identified 4 high-potential growth opportunities. These
                    recommendations are tailored to your business profile,
                    capabilities, and market conditions.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {growthOpportunities.map((opportunity) =>
            <div
              key={opportunity.id}
              className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        {opportunity.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {opportunity.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactBadgeClass(opportunity.impact)}`}>
                    
                        {opportunity.impact.charAt(0).toUpperCase() +
                    opportunity.impact.slice(1)}{' '}
                        Impact
                      </span>
                      <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTimeframeBadgeClass(opportunity.timeframe)}`}>
                    
                        {opportunity.timeframe.charAt(0).toUpperCase() +
                    opportunity.timeframe.slice(1)}{' '}
                        Term
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Business Readiness
                        </span>
                        <span className="text-gray-800 font-medium">
                          {opportunity.readiness}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                      className={`h-2 rounded-full ${opportunity.readiness >= 80 ? 'bg-green-500' : opportunity.readiness >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{
                        width: `${opportunity.readiness}%`
                      }}>
                    </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        Projected ROI:
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        {opportunity.roi}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-right">
                    <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                      Explore Opportunity
                      <ArrowRightIcon className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
            )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Market Expansion Potential
                  </h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={[
                    {
                      market: 'Current',
                      value: 100
                    },
                    {
                      market: 'Regional',
                      value: 180
                    },
                    {
                      market: 'National',
                      value: 320
                    },
                    {
                      market: 'International',
                      value: 550
                    }]
                    }
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5
                    }}>
                    
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="market" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                      dataKey="value"
                      name="Market Size (% of current)"
                      fill="#1D4ED8"
                      radius={[4, 4, 0, 0]} />
                    
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Growth Readiness Factors
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Financial Capacity</span>
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
                      <span className="text-gray-600">
                        Operational Capacity
                      </span>
                      <span className="text-gray-800 font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: '70%'
                      }}>
                    </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Human Resources</span>
                      <span className="text-gray-800 font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: '65%'
                      }}>
                    </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">
                        Technology Infrastructure
                      </span>
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
                      <span className="text-gray-600">Market Intelligence</span>
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
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Get Detailed Growth Readiness Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}