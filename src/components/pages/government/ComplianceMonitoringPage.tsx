import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  FileTextIcon,
  BellIcon,
  CalendarIcon,
  BarChart2Icon } from
'lucide-react';
export function ComplianceMonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  // Sample data for compliance monitoring
  const complianceData = [
  {
    id: 1,
    company: 'TechSolutions Ltd',
    fundingProgram: 'SME Growth Fund',
    amount: 'R250,000',
    lastAudit: '2023-09-15',
    nextAudit: '2023-12-15',
    riskLevel: 'low',
    complianceScore: 92,
    status: 'compliant',
    sector: 'Technology',
    issues: 0
  },
  {
    id: 2,
    company: 'GreenEnergy Innovations',
    fundingProgram: 'Innovation Challenge',
    amount: 'R180,000',
    lastAudit: '2023-08-20',
    nextAudit: '2023-11-20',
    riskLevel: 'medium',
    complianceScore: 78,
    status: 'action_required',
    sector: 'Energy',
    issues: 2
  },
  {
    id: 3,
    company: 'AgriTech Solutions',
    fundingProgram: 'Rural Development Grant',
    amount: 'R320,000',
    lastAudit: '2023-09-05',
    nextAudit: '2023-12-05',
    riskLevel: 'low',
    complianceScore: 85,
    status: 'compliant',
    sector: 'Agriculture',
    issues: 0
  },
  {
    id: 4,
    company: 'BuildRight Construction',
    fundingProgram: 'Infrastructure Development Fund',
    amount: 'R450,000',
    lastAudit: '2023-07-10',
    nextAudit: '2023-10-10',
    riskLevel: 'high',
    complianceScore: 62,
    status: 'non_compliant',
    sector: 'Construction',
    issues: 4
  },
  {
    id: 5,
    company: 'EduTech Learning',
    fundingProgram: 'Skills Development Grant',
    amount: 'R150,000',
    lastAudit: '2023-09-25',
    nextAudit: '2023-12-25',
    riskLevel: 'low',
    complianceScore: 95,
    status: 'compliant',
    sector: 'Education',
    issues: 0
  },
  {
    id: 6,
    company: 'HealthPlus Clinic',
    fundingProgram: 'Healthcare Innovation Fund',
    amount: 'R275,000',
    lastAudit: '2023-08-15',
    nextAudit: '2023-11-15',
    riskLevel: 'medium',
    complianceScore: 75,
    status: 'action_required',
    sector: 'Healthcare',
    issues: 1
  }];

  const complianceAlerts = [
  {
    id: 1,
    company: 'BuildRight Construction',
    issue: 'Missing financial statements for Q3 2023',
    dueDate: '2023-10-15',
    severity: 'high',
    status: 'overdue'
  },
  {
    id: 2,
    company: 'GreenEnergy Innovations',
    issue: 'Tax clearance certificate expiring in 15 days',
    dueDate: '2023-10-25',
    severity: 'medium',
    status: 'pending'
  },
  {
    id: 3,
    company: 'HealthPlus Clinic',
    issue: 'Employment equity report due',
    dueDate: '2023-10-30',
    severity: 'medium',
    status: 'pending'
  },
  {
    id: 4,
    company: 'BuildRight Construction',
    issue: 'BBBEE certificate renewal required',
    dueDate: '2023-10-20',
    severity: 'high',
    status: 'pending'
  }];

  const upcomingAudits = [
  {
    id: 1,
    company: 'BuildRight Construction',
    date: '2023-10-10',
    type: 'Full Compliance Audit',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 2,
    company: 'GreenEnergy Innovations',
    date: '2023-11-20',
    type: 'Financial Compliance Review',
    assignedTo: 'Michael Ndlovu'
  },
  {
    id: 3,
    company: 'HealthPlus Clinic',
    date: '2023-11-15',
    type: 'Progress Verification',
    assignedTo: 'Lisa van der Merwe'
  }];

  const filteredComplianceData = complianceData.filter((item) => {
    // Filter by search query
    const matchesSearch = item.company.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    // Filter by risk level
    const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;
    // Filter by sector
    const matchesSector = sectorFilter === 'all' || item.sector === sectorFilter;
    return matchesSearch && matchesRisk && matchesSector;
  });
  const getStatusBadge = (status) => {
    switch (status) {
      case 'compliant':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
            Compliant
          </span>);

      case 'non_compliant':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="w-3.5 h-3.5 mr-1" />
            Non-Compliant
          </span>);

      case 'action_required':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertTriangleIcon className="w-3.5 h-3.5 mr-1" />
            Action Required
          </span>);

      default:
        return null;
    }
  };
  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low Risk
          </span>);

      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium Risk
          </span>);

      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High Risk
          </span>);

      default:
        return null;
    }
  };
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  const getAlertSeverityBadge = (severity, status) => {
    if (status === 'overdue') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Overdue
        </span>);

    }
    switch (severity) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>);

      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>);

      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low
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
            Compliance Monitoring
          </h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by company name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Risk Level:
                </span>
                <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}>
                  
                  <option value="all">All Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Sector:
                </span>
                <select
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}>
                  
                  <option value="all">All Sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Energy">Energy</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Construction">Construction</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
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
                    
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Funding Program
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Risk Level
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Compliance Score
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Next Audit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplianceData.map((item) =>
                <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.company}
                      </div>
                      <div className="text-sm text-gray-500">{item.sector}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.fundingProgram}
                      <div className="text-xs text-gray-500">{item.amount}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getRiskBadge(item.riskLevel)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                        className={`text-sm font-medium ${getScoreColor(item.complianceScore)}`}>
                        
                          {item.complianceScore}%
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                          className={`h-1.5 rounded-full ${item.complianceScore >= 80 ? 'bg-green-500' : item.complianceScore >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{
                            width: `${item.complianceScore}%`
                          }}>
                        </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                      {item.issues > 0 &&
                    <div className="mt-1 text-xs text-red-600">
                          {item.issues} issue{item.issues > 1 ? 's' : ''} to
                          resolve
                        </div>
                    }
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.nextAudit}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Review
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        History
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredComplianceData.length === 0 &&
          <div className="text-center py-8">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No companies found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">
              Compliance Alerts
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {complianceAlerts.length} Active
            </span>
          </div>
          <div className="divide-y divide-gray-200">
            {complianceAlerts.map((alert) =>
            <div key={alert.id} className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.status === 'overdue' ?
                  <XCircleIcon className="w-5 h-5 text-red-500" /> :
                  alert.severity === 'high' ?
                  <AlertTriangleIcon className="w-5 h-5 text-red-500" /> :

                  <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
                  }
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {alert.company}
                      </p>
                      {getAlertSeverityBadge(alert.severity, alert.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{alert.issue}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      Due: {alert.dueDate}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <button className="text-sm font-medium text-green-600 hover:text-green-800 mr-3">
                    Take Action
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
            <button className="text-sm font-medium text-green-600 hover:text-green-800">
              View All Alerts
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Upcoming Compliance Audits
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingAudits.map((audit) =>
            <div key={audit.id} className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <CalendarIcon className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {audit.company}
                      </p>
                      <span className="text-xs text-gray-500">
                        {audit.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{audit.type}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Assigned to: {audit.assignedTo}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <button className="text-sm font-medium text-green-600 hover:text-green-800 mr-3">
                    Prepare
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                    Reschedule
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
            <button className="text-sm font-medium text-green-600 hover:text-green-800">
              View Full Audit Schedule
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Compliance by Status
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Compliant</span>
                  <span className="font-medium text-gray-800">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: '50%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Action Required</span>
                  <span className="font-medium text-gray-800">2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: '33%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Non-Compliant</span>
                  <span className="font-medium text-gray-800">1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: '17%'
                    }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-center">
                <span className="font-medium text-gray-800">83%</span>
                <span className="text-gray-600 ml-1">
                  Overall Compliance Rate
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Compliance by Risk Level
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">High Risk</span>
                  <span className="font-medium text-gray-800">1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: '17%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Medium Risk</span>
                  <span className="font-medium text-gray-800">2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: '33%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Low Risk</span>
                  <span className="font-medium text-gray-800">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: '50%'
                    }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-center">
                <span className="font-medium text-gray-800">33%</span>
                <span className="text-gray-600 ml-1">
                  Companies at Medium/High Risk
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Common Compliance Issues
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Financial Reporting</span>
                  <span className="font-medium text-gray-800">4</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: '40%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tax Compliance</span>
                  <span className="font-medium text-gray-800">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: '30%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">BBBEE Certification</span>
                  <span className="font-medium text-gray-800">2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: '20%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Employment Equity</span>
                  <span className="font-medium text-gray-800">1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: '10%'
                    }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm font-medium text-green-600 hover:text-green-800">
                View Detailed Compliance Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}