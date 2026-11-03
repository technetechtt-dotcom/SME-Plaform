import React, { useState } from 'react';
import {
  BuildingIcon,
  TargetIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  ClipboardCheckIcon,
  UserIcon,
  BookOpenIcon,
  MessageSquareIcon,
  PlusIcon,
  EditIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  BarChart2Icon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  CheckIcon } from
'lucide-react';
interface ViewDevelopmentPlanPageProps {
  planId?: number;
  onBack?: () => void;
}
export function ViewDevelopmentPlanPage({
  planId = 1,
  onBack
}: ViewDevelopmentPlanPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(
    'objectives'
  );
  const [showAddMeetingForm, setShowAddMeetingForm] = useState(false);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  // Mock data for the development plan
  const plan = {
    id: 1,
    smeName: 'TechSolutions Ltd',
    smeId: 1,
    industry: 'Technology',
    stage: 'Early Growth',
    location: 'Cape Town',
    startDate: '2023-06-15',
    endDate: '2023-12-15',
    status: 'active',
    progress: 65,
    lastUpdated: '2023-10-20',
    contactPerson: 'James Molefe',
    contactEmail: 'james.molefe@techsolutions.co.za',
    contactPhone: '+27 82 555 1234',
    description:
    'Development plan focused on building technical team capacity, creating a comprehensive product roadmap, and developing market expansion strategy for three key African markets.',
    focusAreas: [
    'Technical team building',
    'Product roadmap',
    'Go-to-market strategy'],

    objectives: [
    {
      id: 1,
      title: 'Establish technical hiring roadmap',
      description:
      'Develop comprehensive technical hiring plan with role definitions, interview process, and onboarding strategy',
      status: 'completed',
      deadline: '2023-08-10',
      completionDate: '2023-08-10',
      progress: 100,
      notes:
      'Completed ahead of schedule. Included detailed job descriptions for 5 key technical roles.',
      activities: [
      {
        date: '2023-07-05',
        description: 'Initial skills gap analysis completed'
      },
      {
        date: '2023-07-20',
        description: 'Draft hiring plan created'
      },
      {
        date: '2023-08-02',
        description: 'Interview process templates finalized'
      },
      {
        date: '2023-08-10',
        description: 'Complete hiring roadmap approved'
      }]

    },
    {
      id: 2,
      title: 'Create 18-month product roadmap',
      description:
      'Define product evolution strategy with clear milestones, resource requirements, and market alignment',
      status: 'in-progress',
      deadline: '2023-10-30',
      progress: 70,
      notes:
      'Working on resource allocation section. Need to align with technical hiring plan.',
      activities: [
      {
        date: '2023-08-15',
        description: 'Product vision workshop completed'
      },
      {
        date: '2023-09-02',
        description: 'Feature prioritization framework established'
      },
      {
        date: '2023-09-20',
        description: 'Core feature set defined'
      },
      {
        date: '2023-10-10',
        description: 'Timeline draft completed'
      }]

    },
    {
      id: 3,
      title: 'Develop market expansion strategy',
      description:
      'Research and develop strategy for entering 3 new African markets with competitive analysis and go-to-market approach',
      status: 'in-progress',
      deadline: '2023-11-15',
      progress: 40,
      notes: 'Kenya market research completed. Starting on Nigeria analysis.',
      activities: [
      {
        date: '2023-09-10',
        description: 'Market selection criteria defined'
      },
      {
        date: '2023-09-25',
        description: 'Kenya market analysis completed'
      },
      {
        date: '2023-10-15',
        description: 'Competitive landscape mapping started'
      }]

    }],

    meetings: [
    {
      id: 1,
      date: '2023-10-17',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      status: 'completed',
      summary:
      'Discussed product roadmap progress. Reviewed resource allocation for market expansion research. Identified bottleneck in UI design resources.',
      actionItems: [
      {
        description: 'James to share updated UI resource plan',
        dueDate: '2023-10-20',
        status: 'completed'
      },
      {
        description: 'Sarah to provide Nigeria market research template',
        dueDate: '2023-10-24',
        status: 'pending'
      }],

      attendees: ['James Molefe', 'Sarah Johnson', 'David Ndlovu']
    },
    {
      id: 2,
      date: '2023-10-10',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      status: 'completed',
      summary:
      'Reviewed technical hiring progress. Two senior developers interviewed, one offer extended. Product roadmap timeline adjusted due to design resource constraints.',
      actionItems: [
      {
        description: 'James to confirm candidate decision',
        dueDate: '2023-10-12',
        status: 'completed'
      },
      {
        description: 'Sarah to review revised product timeline',
        dueDate: '2023-10-14',
        status: 'completed'
      }],

      attendees: ['James Molefe', 'Sarah Johnson', 'Thabo Mbeki']
    },
    {
      id: 3,
      date: '2023-10-24',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      status: 'upcoming',
      summary: '',
      actionItems: [],
      attendees: ['James Molefe', 'Sarah Johnson']
    },
    {
      id: 4,
      date: '2023-10-31',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      status: 'upcoming',
      summary: '',
      actionItems: [],
      attendees: ['James Molefe', 'Sarah Johnson']
    }],

    notes: [
    {
      id: 1,
      date: '2023-10-17',
      author: 'Sarah Johnson',
      content:
      'James showed great progress on the product roadmap. The team has a clear vision for the core features and timeline. Still need to work on the resource allocation and market expansion strategy.'
    },
    {
      id: 2,
      date: '2023-10-10',
      author: 'Sarah Johnson',
      content:
      "Technical hiring is progressing well. James has implemented the structured interview process we developed, and it's yielding good candidates. Product roadmap needs adjustment due to design resource constraints."
    },
    {
      id: 3,
      date: '2023-09-20',
      author: 'Sarah Johnson',
      content:
      'Initial market analysis for Kenya looks promising. James has identified key competitors and potential partners. Need to develop a more detailed go-to-market strategy.'
    }],

    keyMetrics: [
    {
      name: 'Technical team growth',
      target: '5 new hires',
      current: '3 new hires',
      status: 'on-track'
    },
    {
      name: 'Product feature completion',
      target: '8 new features',
      current: '5 new features',
      status: 'on-track'
    },
    {
      name: 'Market expansion',
      target: '3 new countries',
      current: '1 new country',
      status: 'at-risk'
    }],

    trainingCompleted: [
    {
      id: 1,
      title: 'Technical Team Building & Management',
      completionDate: '2023-09-25',
      score: 88
    }],

    trainingInProgress: [
    {
      id: 1,
      title: 'Product Management Fundamentals',
      progress: 60,
      dueDate: '2023-11-14'
    },
    {
      id: 2,
      title: 'Market Entry Strategy for African Markets',
      progress: 40,
      dueDate: '2023-11-01'
    }],

    milestones: [
    {
      id: 1,
      title: 'Technical hiring plan completed',
      description:
      'Comprehensive technical hiring roadmap with role definitions, interview process, and onboarding strategy',
      dueDate: '2023-08-10',
      status: 'completed',
      completionDate: '2023-08-10'
    },
    {
      id: 2,
      title: 'Product roadmap draft review',
      description:
      'Initial draft of 18-month product roadmap with core features and timeline',
      dueDate: '2023-10-20',
      status: 'completed',
      completionDate: '2023-10-20'
    },
    {
      id: 3,
      title: 'Complete product roadmap',
      description:
      'Finalized 18-month product roadmap with resource allocation and market alignment',
      dueDate: '2023-10-30',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Kenya market entry strategy',
      description:
      'Detailed go-to-market strategy for Kenya including partnerships, pricing, and marketing',
      dueDate: '2023-11-05',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Finalize market expansion strategy',
      description:
      'Complete market expansion strategy for 3 African markets with implementation timeline',
      dueDate: '2023-11-15',
      status: 'upcoming'
    }],

    riskAssessment: [
    {
      id: 1,
      category: 'Resource',
      description:
      'Difficulty hiring senior technical talent within timeline',
      impact: 'high',
      likelihood: 'medium',
      mitigationStrategy:
      'Expand recruitment channels, consider remote work options, adjust salary bands',
      status: 'monitoring'
    },
    {
      id: 2,
      category: 'Market',
      description: 'Regulatory challenges in target expansion markets',
      impact: 'high',
      likelihood: 'high',
      mitigationStrategy:
      'Engage local regulatory consultants, develop market-specific compliance strategy',
      status: 'active-mitigation'
    },
    {
      id: 3,
      category: 'Product',
      description: 'UI/UX resource constraints affecting product roadmap',
      impact: 'medium',
      likelihood: 'high',
      mitigationStrategy:
      'Consider contract designers, prioritize critical UI components, stagger feature releases',
      status: 'active-mitigation'
    }]

  };
  // Format date function
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'behind':
        return 'bg-amber-100 text-amber-800';
      case 'active-mitigation':
        return 'bg-amber-100 text-amber-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // Toggle expanded section
  const toggleExpandedSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  // Calculate overall completion percentage
  const calculateCompletion = () => {
    const totalObjectives = plan.objectives.length;
    const completedObjectives = plan.objectives.filter(
      (obj) => obj.status === 'completed'
    ).length;
    const inProgressWeight =
    plan.objectives.
    filter((obj) => obj.status === 'in-progress').
    reduce((sum, obj) => sum + obj.progress, 0) / 100;
    return Math.round(
      (completedObjectives + inProgressWeight) / totalObjectives * 100
    );
  };
  // Get impact/likelihood badge color
  const getSeverityBadge = (level) => {
    switch (level) {
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
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {onBack &&
          <button
            onClick={onBack}
            className="mr-4 p-1 rounded-full hover:bg-gray-100">
            
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
          }
          <h1 className="text-2xl font-bold text-gray-800">Development Plan</h1>
        </div>
        <div className="flex items-center space-x-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(plan.status)}`}>
            
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <FileTextIcon className="w-4 h-4 mr-2" />
            Export Plan
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Plan
          </button>
        </div>
      </div>
      {/* SME Information Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
              <BuildingIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {plan.smeName}
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                      {plan.industry}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {plan.stage}
                    </span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span>
                      {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h3 className="text-xs font-medium text-gray-700 mb-2">
                    Overall Progress
                  </h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width: `${calculateCompletion()}%`
                        }}>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {calculateCompletion()}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {
                    plan.objectives.filter(
                      (obj) => obj.status === 'completed'
                    ).length
                    }{' '}
                    of {plan.objectives.length} objectives completed
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h3 className="text-xs font-medium text-gray-700 mb-2">
                    Next Milestone
                  </h3>
                  {plan.milestones.find((m) => m.status === 'upcoming') ?
                  <>
                      <p className="text-sm font-medium text-gray-800">
                        {
                      plan.milestones.find((m) => m.status === 'upcoming')?.
                      title
                      }
                      </p>
                      <div className="mt-1 flex items-center">
                        <ClockIcon className="w-3 h-3 text-amber-600 mr-1" />
                        <span className="text-xs text-gray-600">
                          Due:{' '}
                          {formatDate(
                          plan.milestones.find((m) => m.status === 'upcoming')?.
                          dueDate
                        )}
                        </span>
                      </div>
                    </> :

                  <p className="text-sm text-gray-600">
                      No upcoming milestones
                    </p>
                  }
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h3 className="text-xs font-medium text-gray-700 mb-2">
                    Next Meeting
                  </h3>
                  {plan.meetings.find((m) => m.status === 'upcoming') ?
                  <>
                      <p className="text-sm font-medium text-gray-800">
                        {
                      plan.meetings.find((m) => m.status === 'upcoming')?.
                      type
                      }
                      </p>
                      <div className="mt-1 flex items-center">
                        <CalendarIcon className="w-3 h-3 text-green-600 mr-1" />
                        <span className="text-xs text-gray-600">
                          {formatDate(
                          plan.meetings.find((m) => m.status === 'upcoming')?.
                          date
                        )}
                          ,{' '}
                          {
                        plan.meetings.find((m) => m.status === 'upcoming')?.
                        time
                        }
                        </span>
                      </div>
                    </> :

                  <p className="text-sm text-gray-600">
                      No upcoming meetings
                    </p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('overview')}>
              
              Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'objectives' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('objectives')}>
              
              Objectives
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'meetings' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('meetings')}>
              
              Meetings
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'training' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('training')}>
              
              Training
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'notes' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('notes')}>
              
              Notes
            </button>
          </nav>
        </div>
        {/* Tab Content */}
        <div className="p-4">
          {/* Overview Tab */}
          {activeTab === 'overview' &&
          <div className="space-y-6">
              {/* Plan Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Plan Description
                </h3>
                <p className="text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.focusAreas.map((area, index) =>
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    
                        {area}
                      </span>
                  )}
                  </div>
                </div>
              </div>
              {/* Key Metrics */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Key Metrics
                  </h3>
                  <button className="text-sm font-medium text-green-600 hover:text-green-800">
                    Edit Metrics
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plan.keyMetrics.map((metric, index) =>
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-sm font-medium text-gray-700">
                          {metric.name}
                        </h5>
                        <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(metric.status)}`}>
                      
                          {metric.status.
                      replace('-', ' ').
                      replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <TargetIcon className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">
                            Target: {metric.target}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">
                            Current: {metric.current}
                          </span>
                        </div>
                      </div>
                    </div>
                )}
                </div>
              </div>
              {/* Milestones Timeline */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Milestones
                  </h3>
                  <button className="text-sm font-medium text-green-600 hover:text-green-800">
                    Add Milestone
                  </button>
                </div>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-4 ml-9">
                    {plan.milestones.map((milestone, index) =>
                  <div key={milestone.id} className="relative">
                        {/* Timeline dot */}
                        <div
                      className={`absolute -left-9 top-1.5 w-4 h-4 rounded-full border-2 ${milestone.status === 'completed' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                      
                          {milestone.status === 'completed' &&
                      <CheckIcon className="w-3 h-3 text-white" />
                      }
                        </div>
                        <div
                      className={`bg-white rounded-lg p-3 border ${milestone.status === 'completed' ? 'border-green-200' : 'border-gray-200'}`}>
                      
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">
                                {milestone.title}
                              </h5>
                              <p className="mt-1 text-xs text-gray-600">
                                {milestone.description}
                              </p>
                            </div>
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(milestone.status)}`}>
                          
                              {milestone.status.charAt(0).toUpperCase() +
                          milestone.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              Due: {formatDate(milestone.dueDate)}
                              {milestone.status === 'completed' &&
                          milestone.completionDate &&
                          <span className="ml-2 text-green-600">
                                    (Completed:{' '}
                                    {formatDate(milestone.completionDate)})
                                  </span>
                          }
                            </span>
                          </div>
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>
              {/* Risk Assessment */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Risk Assessment
                  </h3>
                  <button className="text-sm font-medium text-green-600 hover:text-green-800">
                    Add Risk
                  </button>
                </div>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Risk
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Category
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Impact
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Likelihood
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plan.riskAssessment.map((risk) =>
                    <tr key={risk.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800">
                              {risk.description}
                            </div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {risk.category}
                            </div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(risk.impact)}`}>
                          
                              {risk.impact.charAt(0).toUpperCase() +
                          risk.impact.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(risk.likelihood)}`}>
                          
                              {risk.likelihood.charAt(0).toUpperCase() +
                          risk.likelihood.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(risk.status)}`}>
                          
                              {risk.status.
                          replace('-', ' ').
                          replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Contact Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-800">
                        {plan.contactPerson}
                      </h4>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                          {plan.contactEmail}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                          {plan.contactPhone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                          {plan.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {/* Objectives Tab */}
          {activeTab === 'objectives' &&
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Development Objectives
                </h3>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Objective
                </button>
              </div>
              <div className="space-y-4">
                {plan.objectives.map((objective) =>
              <div
                key={objective.id}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-md font-medium text-gray-800">
                          {objective.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {objective.description}
                        </p>
                      </div>
                      <div>
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(objective.status)}`}>
                      
                          {objective.status === 'completed' &&
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      }
                          {objective.status.charAt(0).toUpperCase() +
                      objective.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                          <span>
                            Deadline: {formatDate(objective.deadline)}
                            {objective.status === 'completed' &&
                        <span className="ml-2 text-green-600">
                                (Completed:{' '}
                                {formatDate(objective.completionDate)})
                              </span>
                        }
                          </span>
                        </div>
                        {objective.status === 'in-progress' &&
                    <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">
                                Progress
                              </span>
                              <span className="text-xs font-medium text-gray-700">
                                {objective.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${objective.progress}%`
                          }}>
                        </div>
                            </div>
                          </div>
                    }
                      </div>
                      <div>
                        {objective.notes &&
                    <div>
                            <p className="text-xs text-gray-500 mb-1">Notes:</p>
                            <p className="text-sm text-gray-600">
                              {objective.notes}
                            </p>
                          </div>
                    }
                      </div>
                    </div>
                    {/* Objective Activities Timeline */}
                    <div className="mt-4">
                      <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                    toggleExpandedSection(`objective-${objective.id}`)
                    }>
                    
                        <h5 className="text-sm font-medium text-gray-700">
                          Activity Timeline
                        </h5>
                        <ChevronDownIcon
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === `objective-${objective.id}` ? 'transform rotate-180' : ''}`} />
                    
                      </div>
                      {expandedSection === `objective-${objective.id}` &&
                  <div className="mt-2 relative pl-6">
                          {/* Timeline line */}
                          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          <div className="space-y-3">
                            {objective.activities.map((activity, idx) =>
                      <div key={idx} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-blue-500"></div>
                                <div className="bg-gray-50 rounded p-2 border border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">
                                      {activity.description}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(activity.date)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                      )}
                          </div>
                        </div>
                  }
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <EditIcon className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      {objective.status !== 'completed' &&
                  <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Mark Complete
                        </button>
                  }
                      <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
                        <PlusIcon className="w-3 h-3 mr-1" />
                        Add Activity
                      </button>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }
          {/* Meetings Tab */}
          {activeTab === 'meetings' &&
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Meetings & Check-ins
                </h3>
                <button
                onClick={() => setShowAddMeetingForm(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Schedule Meeting
                </button>
              </div>
              {showAddMeetingForm &&
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <h4 className="text-md font-medium text-gray-800 mb-3">
                    Schedule New Meeting
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meeting Type
                      </label>
                      <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>Weekly Check-in</option>
                        <option>Milestone Review</option>
                        <option>Training Session</option>
                        <option>Strategic Planning</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                    type="time"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                        <option>90 minutes</option>
                        <option>120 minutes</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Attendees
                      </label>
                      <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter attendee names separated by commas" />
                  
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Agenda
                      </label>
                      <textarea
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    placeholder="Enter meeting agenda items">
                  </textarea>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                  onClick={() => setShowAddMeetingForm(false)}
                  className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      Schedule Meeting
                    </button>
                  </div>
                </div>
            }
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">
                  Upcoming Meetings
                </h4>
                <div className="space-y-3">
                  {plan.meetings.
                filter((meeting) => meeting.status === 'upcoming').
                map((meeting) =>
                <div
                  key={meeting.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 text-gray-500 mr-1" />
                              <h5 className="text-md font-medium text-gray-800">
                                {meeting.type}
                              </h5>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {formatDate(meeting.date)}, {meeting.time}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Upcoming
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">
                            Attendees:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {meeting.attendees.map((attendee, idx) =>
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        
                                {attendee}
                              </span>
                      )}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                            <EditIcon className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                            <FileTextIcon className="w-3 h-3 mr-1" />
                            Prepare Agenda
                          </button>
                        </div>
                      </div>
                )}
                  {plan.meetings.filter(
                  (meeting) => meeting.status === 'upcoming'
                ).length === 0 &&
                <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        No upcoming meetings scheduled
                      </p>
                    </div>
                }
                </div>
                <h4 className="text-md font-medium text-gray-700 mt-6">
                  Past Meetings
                </h4>
                <div className="space-y-3">
                  {plan.meetings.
                filter((meeting) => meeting.status === 'completed').
                sort(
                  (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
                ).
                map((meeting) =>
                <div
                  key={meeting.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 text-gray-500 mr-1" />
                              <h5 className="text-md font-medium text-gray-800">
                                {meeting.type}
                              </h5>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {formatDate(meeting.date)}, {meeting.time}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">
                            Attendees:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {meeting.attendees.map((attendee, idx) =>
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        
                                {attendee}
                              </span>
                      )}
                          </div>
                        </div>
                        <div
                    className="mt-3 flex items-center justify-between cursor-pointer"
                    onClick={() =>
                    toggleExpandedSection(`meeting-${meeting.id}`)
                    }>
                    
                          <h6 className="text-sm font-medium text-gray-700">
                            Meeting Summary & Action Items
                          </h6>
                          <ChevronDownIcon
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === `meeting-${meeting.id}` ? 'transform rotate-180' : ''}`} />
                    
                        </div>
                        {expandedSection === `meeting-${meeting.id}` &&
                  <div className="mt-2">
                            <div className="bg-gray-50 rounded p-3 border border-gray-200 mb-3">
                              <p className="text-sm text-gray-700">
                                {meeting.summary}
                              </p>
                            </div>
                            {meeting.actionItems.length > 0 &&
                    <div>
                                <h6 className="text-xs font-medium text-gray-700 mb-2">
                                  Action Items
                                </h6>
                                <div className="space-y-2">
                                  {meeting.actionItems.map((item, idx) =>
                        <div key={idx} className="flex items-start">
                                      <div className="mr-2 mt-0.5">
                                        {item.status === 'completed' ?
                            <CheckCircleIcon className="w-4 h-4 text-green-500" /> :

                            <ClockIcon className="w-4 h-4 text-amber-500" />
                            }
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                          {item.description}
                                        </p>
                                        <div className="flex items-center mt-0.5">
                                          <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                                          <span className="text-xs text-gray-500">
                                            Due: {formatDate(item.dueDate)}
                                          </span>
                                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                            {item.status}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                        )}
                                </div>
                              </div>
                    }
                          </div>
                  }
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
                            <FileTextIcon className="w-3 h-3 mr-1" />
                            View Notes
                          </button>
                          <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                            <PlusIcon className="w-3 h-3 mr-1" />
                            Add Action Item
                          </button>
                        </div>
                      </div>
                )}
                  {plan.meetings.filter(
                  (meeting) => meeting.status === 'completed'
                ).length === 0 &&
                <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        No past meetings recorded
                      </p>
                    </div>
                }
                </div>
              </div>
            </div>
          }
          {/* Training Tab */}
          {activeTab === 'training' &&
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Training & Development
                </h3>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Assign Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Courses In Progress
                  </h4>
                  {plan.trainingInProgress.length > 0 ?
                <div className="space-y-3">
                      {plan.trainingInProgress.map((course) =>
                  <div
                    key={course.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <BookOpenIcon className="w-5 h-5 text-blue-500 mr-2" />
                              <h5 className="text-md font-medium text-gray-800">
                                {course.title}
                              </h5>
                            </div>
                            <span className="text-sm font-medium text-blue-600">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="mt-2 mb-3 w-full bg-gray-200 rounded-full h-2">
                            <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${course.progress}%`
                        }}>
                      </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-600">
                              <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                              <span>Due: {formatDate(course.dueDate)}</span>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              View Course
                            </button>
                          </div>
                        </div>
                  )}
                    </div> :

                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <BookOpenIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No courses in progress
                      </p>
                      <button className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Assign Course
                      </button>
                    </div>
                }
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Completed Courses
                  </h4>
                  {plan.trainingCompleted.length > 0 ?
                <div className="space-y-3">
                      {plan.trainingCompleted.map((course) =>
                  <div
                    key={course.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <BookOpenIcon className="w-5 h-5 text-green-500 mr-2" />
                              <h5 className="text-md font-medium text-gray-800">
                                {course.title}
                              </h5>
                            </div>
                            <div className="flex items-center">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                Completed
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Score: {course.score}%
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                              <span>
                                Completed: {formatDate(course.completionDate)}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-sm text-blue-600 hover:text-blue-800">
                                View Certificate
                              </button>
                            </div>
                          </div>
                        </div>
                  )}
                    </div> :

                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <AwardIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No courses completed yet
                      </p>
                    </div>
                }
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Recommended Courses
                </h4>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Course
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Category
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Duration
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Relevance
                        </th>
                        <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Advanced Product Roadmapping
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            Product Management
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">4 weeks</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="inline-flex items-center">
                            <ArrowUpRightIcon className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">High</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900">
                            Assign
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            African Market Entry Strategies
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            Market Expansion
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">6 weeks</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="inline-flex items-center">
                            <ArrowUpRightIcon className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">High</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900">
                            Assign
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Technical Team Leadership
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            Leadership
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">3 weeks</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="inline-flex items-center">
                            <TrendingUpIcon className="w-4 h-4 text-blue-500 mr-1" />
                            <span className="text-sm text-blue-600">
                              Medium
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900">
                            Assign
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
          {/* Notes Tab */}
          {activeTab === 'notes' &&
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Mentor Notes
                </h3>
                <button
                onClick={() => setShowAddNoteForm(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Note
                </button>
              </div>
              {showAddNoteForm &&
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <h4 className="text-md font-medium text-gray-800 mb-3">
                    Add New Note
                  </h4>
                  <div className="space-y-3">
                    <textarea
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={4}
                  placeholder="Enter your notes about the SME's progress, challenges, or other observations...">
                </textarea>
                    <div className="flex items-center">
                      <input
                    type="checkbox"
                    id="shareWithSme"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  
                      <label
                    htmlFor="shareWithSme"
                    className="ml-2 block text-sm text-gray-700">
                    
                        Share this note with the SME
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                  onClick={() => setShowAddNoteForm(false)}
                  className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      Save Note
                    </button>
                  </div>
                </div>
            }
              <div className="space-y-4">
                {plan.notes.map((note) =>
              <div
                key={note.id}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <UserIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {note.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(note.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <EditIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-700">
                      <p>{note.content}</p>
                    </div>
                  </div>
              )}
                {plan.notes.length === 0 &&
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <MessageSquareIcon className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      No notes have been added yet
                    </p>
                    <button
                  onClick={() => setShowAddNoteForm(true)}
                  className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add First Note
                    </button>
                  </div>
              }
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}