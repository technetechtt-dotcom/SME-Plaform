import React, { useState } from 'react';
import {
  AlertTriangleIcon,
  XCircleIcon,
  CheckCircleIcon,
  BellIcon,
  FilterIcon,
  SearchIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart2Icon,
  PieChartIcon,
  FileTextIcon,
  ArrowRightIcon,
  CalendarIcon,
  EyeIcon } from
'lucide-react';
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
  ResponsiveContainer } from
'recharts';
export function RiskAlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  // Sample data for risk alerts
  const riskAlerts = [
  {
    id: 1,
    company: 'BuildRight Construction',
    issue: 'Missed financial reporting deadline for Q3',
    severity: 'critical',
    status: 'open',
    dateDetected: '2023-10-05',
    category: 'Financial',
    assignedTo: 'Sarah Johnson',
    action: 'Immediate intervention required'
  },
  {
    id: 2,
    company: 'GreenEnergy Innovations',
    issue: 'Cash flow issues detected from financial statements',
    severity: 'high',
    status: 'under_review',
    dateDetected: '2023-10-08',
    category: 'Financial',
    assignedTo: 'Michael Ndlovu',
    action: 'Financial assessment needed'
  },
  {
    id: 3,
    company: 'HealthPlus Clinic',
    issue: 'Project milestone delayed by 30+ days',
    severity: 'medium',
    status: 'open',
    dateDetected: '2023-10-10',
    category: 'Project',
    assignedTo: 'Unassigned',
    action: 'Schedule review meeting'
  },
  {
    id: 4,
    company: 'TechSolutions Ltd',
    issue: 'Staff turnover exceeds industry benchmark by 15%',
    severity: 'medium',
    status: 'under_review',
    dateDetected: '2023-10-12',
    category: 'Operational',
    assignedTo: 'Lisa van der Merwe',
    action: 'HR assessment needed'
  },
  {
    id: 5,
    company: 'AgriTech Solutions',
    issue: 'BBBEE certification expiring in 15 days',
    severity: 'low',
    status: 'open',
    dateDetected: '2023-10-15',
    category: 'Compliance',
    assignedTo: 'Unassigned',
    action: 'Send reminder'
  },
  {
    id: 6,
    company: 'BuildRight Construction',
    issue: 'Supplier payment delays affecting project timeline',
    severity: 'high',
    status: 'open',
    dateDetected: '2023-10-16',
    category: 'Operational',
    assignedTo: 'Unassigned',
    action: 'Supplier relationship review'
  },
  {
    id: 7,
    company: 'EduTech Learning',
    issue: 'Minor discrepancy in expense reporting',
    severity: 'low',
    status: 'resolved',
    dateDetected: '2023-10-02',
    resolvedDate: '2023-10-09',
    category: 'Financial',
    assignedTo: 'Michael Ndlovu',
    action: 'Documentation updated'
  }];

  // Chart data
  const riskCategoryData = [
  {
    name: 'Financial',
    value: 3,
    color: '#EF4444'
  },
  {
    name: 'Operational',
    value: 2,
    color: '#F59E0B'
  },
  {
    name: 'Compliance',
    value: 1,
    color: '#10B981'
  },
  {
    name: 'Project',
    value: 1,
    color: '#3B82F6'
  }];

  const riskTrendData = [
  {
    month: 'May',
    count: 2
  },
  {
    month: 'Jun',
    count: 3
  },
  {
    month: 'Jul',
    count: 2
  },
  {
    month: 'Aug',
    count: 4
  },
  {
    month: 'Sep',
    count: 3
  },
  {
    month: 'Oct',
    count: 7
  }];

  const riskSeverityData = [
  {
    name: 'Critical',
    value: 1,
    color: '#DC2626'
  },
  {
    name: 'High',
    value: 2,
    color: '#F59E0B'
  },
  {
    name: 'Medium',
    value: 2,
    color: '#FBBF24'
  },
  {
    name: 'Low',
    value: 2,
    color: '#10B981'
  }];

  const filteredRiskAlerts = riskAlerts.filter((alert) => {
    // Filter by search query
    const matchesSearch =
    alert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.issue.toLowerCase().includes(searchQuery.toLowerCase());
    // Filter by risk level
    const matchesRisk = riskFilter === 'all' || alert.severity === riskFilter;
    // Filter by status
    const matchesStatus =
    statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesRisk && matchesStatus;
  });
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="w-3.5 h-3.5 mr-1" />
            Critical
          </span>);

      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <AlertTriangleIcon className="w-3.5 h-3.5 mr-1" />
            High
          </span>);

      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertTriangleIcon className="w-3.5 h-3.5 mr-1" />
            Medium
          </span>);

      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <AlertTriangleIcon className="w-3.5 h-3.5 mr-1" />
            Low
          </span>);

      default:
        return null;
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Open
          </span>);

      case 'under_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Under Review
          </span>);

      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
            Resolved
          </span>);

      default:
        return null;
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Risk & Alerts Management
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-red-800">
                    Critical Alerts
                  </p>
                  <p className="text-lg font-semibold text-gray-800">1</p>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div className="mt-1 text-xs text-red-700">
                Requires immediate attention
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-orange-800">
                    High Risk Alerts
                  </p>
                  <p className="text-lg font-semibold text-gray-800">2</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="mt-1 text-xs text-orange-700">
                Requires prompt action
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-amber-800">
                    Medium Risk Alerts
                  </p>
                  <p className="text-lg font-semibold text-gray-800">2</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-1 text-xs text-amber-700">
                Requires monitoring
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-green-800">
                    Low Risk Alerts
                  </p>
                  <p className="text-lg font-semibold text-gray-800">2</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <AlertTriangleIcon className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="mt-1 text-xs text-green-700">
                Standard follow-up needed
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search alerts by company or issue..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Severity:
                </span>
                <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}>
                  
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Status:
                </span>
                <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}>
                  
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="under_review">Under Review</option>
                  <option value="resolved">Resolved</option>
                </select>
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
                    
                    Company & Issue
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Severity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Date Detected
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Assigned To
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRiskAlerts.map((alert) =>
                <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {alert.company}
                      </div>
                      <div className="text-sm text-gray-500">{alert.issue}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getSeverityBadge(alert.severity)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getStatusBadge(alert.status)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {alert.category}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {alert.dateDetected}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {alert.assignedTo}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {alert.status !== 'resolved' ?
                    <>
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            Review
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            Assign
                          </button>
                        </> :

                    <button className="text-gray-600 hover:text-gray-900">
                          Details
                        </button>
                    }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredRiskAlerts.length === 0 &&
          <div className="text-center py-8">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No alerts found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Risk Trend Analysis
            </h3>
          </div>
          <div className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={riskTrendData}
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
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Risk Alerts"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: '#EF4444'
                    }}
                    activeDot={{
                      r: 6
                    }} />
                  
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-center text-gray-700">
              <div className="font-medium">
                Risk Alert Trend (Last 6 Months)
              </div>
              <div className="text-xs text-gray-500 mt-1">
                October shows a 133% increase in risk alerts compared to the
                6-month average
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Risk Distribution
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2 text-center">
                  By Risk Category
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}>
                        
                        {riskCategoryData.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2 text-center">
                  By Severity Level
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskSeverityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}>
                        
                        {riskSeverityData.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {riskCategoryData.map((category) =>
              <div key={category.name} className="flex items-center">
                  <span
                  className="w-3 h-3 rounded-full inline-block mr-2"
                  style={{
                    backgroundColor: category.color
                  }}>
                </span>
                  <span className="text-xs text-gray-600">
                    {category.name}: {category.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              High Priority Alerts
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {riskAlerts.
            filter(
              (alert) =>
              ['critical', 'high'].includes(alert.severity) &&
              alert.status !== 'resolved'
            ).
            map((alert) =>
            <div key={alert.id} className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {alert.severity === 'critical' ?
                  <XCircleIcon className="w-5 h-5 text-red-500" /> :

                  <AlertTriangleIcon className="w-5 h-5 text-orange-500" />
                  }
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-800">
                          {alert.company}
                        </p>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {alert.issue}
                      </p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full mr-2">
                          {alert.category}
                        </span>
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        Detected: {alert.dateDetected}
                      </div>
                      <div className="mt-2 text-xs text-gray-700">
                        <span className="font-medium">
                          Recommended action:{' '}
                        </span>
                        {alert.action}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2">
                      Take Action
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Assign
                    </button>
                  </div>
                </div>
            )}
            {riskAlerts.filter(
              (alert) =>
              ['critical', 'high'].includes(alert.severity) &&
              alert.status !== 'resolved'
            ).length === 0 &&
            <div className="text-center py-8">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No high priority alerts
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  All high priority alerts have been resolved
                </p>
              </div>
            }
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Risk Management Actions
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                <h4 className="text-sm font-medium text-red-800 flex items-center">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Critical Alert Review
                </h4>
                <p className="mt-1 text-xs text-red-700">
                  Schedule emergency review meeting for BuildRight Construction
                  financial reporting issue
                </p>
                <button className="mt-2 text-xs font-medium text-red-800 hover:text-red-900 flex items-center">
                  Schedule Meeting
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                <h4 className="text-sm font-medium text-orange-800 flex items-center">
                  <AlertTriangleIcon className="w-4 h-4 mr-2" />
                  Financial Risk Assessment
                </h4>
                <p className="mt-1 text-xs text-orange-700">
                  Conduct financial health assessment for GreenEnergy
                  Innovations to identify cash flow issues
                </p>
                <button className="mt-2 text-xs font-medium text-orange-800 hover:text-orange-900 flex items-center">
                  Initiate Assessment
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 flex items-center">
                  <BellIcon className="w-4 h-4 mr-2" />
                  Risk Alert Notifications
                </h4>
                <p className="mt-1 text-xs text-blue-700">
                  Configure automated alert notifications for portfolio managers
                  when new risks are detected
                </p>
                <button className="mt-2 text-xs font-medium text-blue-800 hover:text-blue-900 flex items-center">
                  Configure Alerts
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <h4 className="text-sm font-medium text-green-800 flex items-center">
                  <BarChart2Icon className="w-4 h-4 mr-2" />
                  Risk Analytics Dashboard
                </h4>
                <p className="mt-1 text-xs text-green-700">
                  View comprehensive risk analytics dashboard with predictive
                  risk indicators
                </p>
                <button className="mt-2 text-xs font-medium text-green-800 hover:text-green-900 flex items-center">
                  View Dashboard
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Generate Risk Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}