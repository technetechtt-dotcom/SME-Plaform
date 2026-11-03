import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  UploadIcon,
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpIcon,
  ArrowDownIcon } from
'lucide-react';
import { ScoreCard } from '../../common/ScoreCard';
export function CompliancePage() {
  const [activeTab, setActiveTab] = useState('requirements');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const complianceRequirements = [
  {
    id: 'cipc',
    name: 'CIPC Registration',
    status: 'complete',
    lastUpdated: '2023-05-12',
    expiryDate: '2024-05-12',
    description: 'Company registration is active and in good standing',
    category: 'Registration',
    requiredDocuments: [
    'Certificate of Incorporation',
    'Memorandum of Incorporation'],

    deadline: '2024-05-12',
    priority: 'high'
  },
  {
    id: 'sars',
    name: 'SARS Tax Compliance',
    status: 'warning',
    lastUpdated: '2023-04-10',
    expiryDate: '2023-10-30',
    description: 'Tax clearance certificate expires in 15 days',
    category: 'Tax',
    requiredDocuments: [
    'Tax Clearance Certificate',
    'VAT Registration Certificate'],

    deadline: '2023-10-30',
    priority: 'high'
  },
  {
    id: 'bee',
    name: 'B-BBEE Certificate',
    status: 'complete',
    lastUpdated: '2023-02-15',
    expiryDate: '2024-02-15',
    description: 'Level 2 B-BBEE contributor status',
    category: 'Transformation',
    requiredDocuments: ['B-BBEE Certificate', 'Ownership Documents'],
    deadline: '2024-02-15',
    priority: 'medium'
  },
  {
    id: 'uif',
    name: 'UIF Registration',
    status: 'incomplete',
    lastUpdated: '2023-01-20',
    expiryDate: null,
    description: 'UIF registration needs to be updated',
    category: 'Labor',
    requiredDocuments: ['UIF Registration Form', 'Employee Records'],
    deadline: '2023-10-25',
    priority: 'high'
  },
  {
    id: 'financial',
    name: 'Financial Statements',
    status: 'complete',
    lastUpdated: '2023-03-30',
    expiryDate: null,
    description: 'Latest financial statements submitted',
    category: 'Financial',
    requiredDocuments: ['Annual Financial Statements', 'Audit Report'],
    deadline: '2024-03-30',
    priority: 'medium'
  },
  {
    id: 'coida',
    name: 'COIDA Registration',
    status: 'pending',
    lastUpdated: '2023-09-05',
    expiryDate: null,
    description:
    'Application for COIDA registration submitted, awaiting approval',
    category: 'Labor',
    requiredDocuments: ['COIDA Registration Form', 'Proof of Payment'],
    deadline: '2023-11-15',
    priority: 'medium'
  },
  {
    id: 'municipal',
    name: 'Municipal Accounts',
    status: 'complete',
    lastUpdated: '2023-09-10',
    expiryDate: null,
    description: 'Municipal accounts up to date',
    category: 'Utilities',
    requiredDocuments: ['Municipal Account Statements', 'Payment Receipts'],
    deadline: null,
    priority: 'low'
  }];

  const upcomingDeadlines = [
  {
    id: 'sars-renewal',
    name: 'SARS Tax Clearance Renewal',
    deadline: '2023-10-30',
    daysRemaining: 15,
    status: 'warning'
  },
  {
    id: 'uif-update',
    name: 'UIF Registration Update',
    deadline: '2023-10-25',
    daysRemaining: 10,
    status: 'warning'
  },
  {
    id: 'coida-approval',
    name: 'COIDA Registration Approval',
    deadline: '2023-11-15',
    daysRemaining: 31,
    status: 'pending'
  },
  {
    id: 'annual-return',
    name: 'CIPC Annual Return',
    deadline: '2024-01-15',
    daysRemaining: 92,
    status: 'upcoming'
  },
  {
    id: 'bee-renewal',
    name: 'B-BBEE Certificate Renewal',
    deadline: '2024-02-15',
    daysRemaining: 123,
    status: 'upcoming'
  }];

  const recentDocuments = [
  {
    id: 'doc1',
    name: 'Tax Clearance Certificate.pdf',
    uploadDate: '2023-04-10',
    size: '1.2 MB',
    category: 'Tax',
    status: 'verified'
  },
  {
    id: 'doc2',
    name: 'Annual Financial Statements.pdf',
    uploadDate: '2023-03-30',
    size: '3.5 MB',
    category: 'Financial',
    status: 'verified'
  },
  {
    id: 'doc3',
    name: 'B-BBEE Certificate.pdf',
    uploadDate: '2023-02-15',
    size: '0.8 MB',
    category: 'Transformation',
    status: 'verified'
  },
  {
    id: 'doc4',
    name: 'COIDA Registration Form.pdf',
    uploadDate: '2023-09-05',
    size: '1.5 MB',
    category: 'Labor',
    status: 'pending'
  },
  {
    id: 'doc5',
    name: 'Municipal Account Payment.pdf',
    uploadDate: '2023-09-10',
    size: '0.5 MB',
    category: 'Utilities',
    status: 'verified'
  }];

  const filteredRequirements = complianceRequirements.
  filter(
    (item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).
  sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ?
      a.name.localeCompare(b.name) :
      b.name.localeCompare(a.name);
    } else if (sortBy === 'deadline') {
      // Handle null deadlines
      if (!a.deadline) return sortOrder === 'asc' ? 1 : -1;
      if (!b.deadline) return sortOrder === 'asc' ? -1 : 1;
      return sortOrder === 'asc' ?
      new Date(a.deadline).getTime() - new Date(b.deadline).getTime() :
      new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    } else if (sortBy === 'status') {
      const statusOrder = {
        complete: 3,
        warning: 2,
        pending: 1,
        incomplete: 0
      };
      return sortOrder === 'asc' ?
      statusOrder[a.status] - statusOrder[b.status] :
      statusOrder[b.status] - statusOrder[a.status];
    } else if (sortBy === 'priority') {
      const priorityOrder = {
        high: 2,
        medium: 1,
        low: 0
      };
      return sortOrder === 'asc' ?
      priorityOrder[a.priority] - priorityOrder[b.priority] :
      priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });
  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'incomplete':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <CalendarIcon className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'complete':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Compliance Management
              </h2>
            </div>
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'requirements' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('requirements')}>
                  
                  Requirements
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'deadlines' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('deadlines')}>
                  
                  Upcoming Deadlines
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('documents')}>
                  
                  Documents
                </button>
              </nav>
            </div>
            {activeTab === 'requirements' &&
            <div className="p-4">
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                    type="text"
                    placeholder="Search requirements..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                  
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select
                    className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setSortOrder('asc');
                    }}>
                    
                      <option value="deadline">Deadline</option>
                      <option value="name">Name</option>
                      <option value="status">Status</option>
                      <option value="priority">Priority</option>
                    </select>
                    <button
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }>
                    
                      {sortOrder === 'asc' ?
                    <ArrowUpIcon className="w-4 h-4 text-gray-500" /> :

                    <ArrowDownIcon className="w-4 h-4 text-gray-500" />
                    }
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('name')}>
                        
                          <div className="flex items-center">
                            Requirement
                            {sortBy === 'name' && (
                          sortOrder === 'asc' ?
                          <ArrowUpIcon className="ml-1 w-3 h-3" /> :

                          <ArrowDownIcon className="ml-1 w-3 h-3" />)
                          }
                          </div>
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Category
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('status')}>
                        
                          <div className="flex items-center">
                            Status
                            {sortBy === 'status' && (
                          sortOrder === 'asc' ?
                          <ArrowUpIcon className="ml-1 w-3 h-3" /> :

                          <ArrowDownIcon className="ml-1 w-3 h-3" />)
                          }
                          </div>
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('deadline')}>
                        
                          <div className="flex items-center">
                            Deadline
                            {sortBy === 'deadline' && (
                          sortOrder === 'asc' ?
                          <ArrowUpIcon className="ml-1 w-3 h-3" /> :

                          <ArrowDownIcon className="ml-1 w-3 h-3" />)
                          }
                          </div>
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('priority')}>
                        
                          <div className="flex items-center">
                            Priority
                            {sortBy === 'priority' && (
                          sortOrder === 'asc' ?
                          <ArrowUpIcon className="ml-1 w-3 h-3" /> :

                          <ArrowDownIcon className="ml-1 w-3 h-3" />)
                          }
                          </div>
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRequirements.map((requirement) =>
                    <tr key={requirement.id}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                {getStatusIcon(requirement.status)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {requirement.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {requirement.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {requirement.category}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(requirement.status)}`}>
                          
                              {requirement.status.charAt(0).toUpperCase() +
                          requirement.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {requirement.deadline || 'N/A'}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(requirement.priority)}`}>
                          
                              {requirement.priority.charAt(0).toUpperCase() +
                          requirement.priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            }
            {activeTab === 'deadlines' &&
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Upcoming Compliance Deadlines
                </h3>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) =>
                <div
                  key={deadline.id}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getStatusIcon(deadline.status)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">
                              {deadline.name}
                            </h4>
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(deadline.status)}`}>
                          
                              {deadline.daysRemaining} days left
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Due by: {deadline.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Take Action
                        </button>
                      </div>
                    </div>
                )}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All Deadlines
                  </button>
                </div>
              </div>
            }
            {activeTab === 'documents' &&
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Document Repository
                  </h3>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <UploadIcon className="w-4 h-4 mr-1" />
                    Upload Document
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Document
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Category
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Upload Date
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Status
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDocuments.map((document) =>
                    <tr key={document.id}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileTextIcon className="w-5 h-5 text-gray-400 mr-2" />
                              <div className="text-sm font-medium text-gray-900">
                                {document.name}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 ml-7">
                              {document.size}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {document.category}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {document.uploadDate}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(document.status)}`}>
                          
                              {document.status.charAt(0).toUpperCase() +
                          document.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Download
                            </button>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View All Documents
                  </button>
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
                  Compliance Status
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <ScoreCard
                  title="Overall Compliance"
                  score={85}
                  trend="up"
                  trendValue={3}
                  type="compliance"
                  description="Strong compliance position with minor improvements needed" />
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Action Items
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <AlertTriangleIcon className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Renew SARS Tax Clearance Certificate by Oct 30
                      </span>
                    </li>
                    <li className="flex items-start text-sm">
                      <XCircleIcon className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Complete UIF Registration update by Oct 25
                      </span>
                    </li>
                    <li className="flex items-start text-sm">
                      <ClockIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-800">
                        Follow up on COIDA Registration approval
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Compliance by Category
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Registration</span>
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
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-800 font-medium">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{
                            width: '80%'
                          }}>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Labor</span>
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
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Financial</span>
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
                        <span className="text-gray-600">Transformation</span>
                        <span className="text-gray-800 font-medium">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: '90%'
                          }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View Compliance Report
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Compliance Calendar
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">
                      Calendar visualization would appear here
                    </p>
                    <p className="text-xs text-gray-500">
                      Shows upcoming compliance deadlines
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">
                    October 2023
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        <span className="text-gray-600">Oct 25</span>
                      </div>
                      <span className="text-gray-800">
                        UIF Registration Update
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        <span className="text-gray-600">Oct 30</span>
                      </div>
                      <span className="text-gray-800">
                        SARS Tax Clearance Renewal
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xs font-medium text-gray-700 mt-4 mb-2">
                    November 2023
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-gray-600">Nov 15</span>
                      </div>
                      <span className="text-gray-800">
                        COIDA Registration Approval
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}