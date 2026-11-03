import React, { useState } from 'react';
import {
  BuildingIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  BarChart2Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  CalendarIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  TargetIcon,
  PlusIcon,
  ArrowRightIcon,
  UserIcon,
  MapPinIcon } from
'lucide-react';
export function SMEProgressPage() {
  const [expandedSme, setExpandedSme] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [industryFilter, setIndustryFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  // Mock data for SMEs
  const smes = [
  {
    id: 1,
    name: 'TechSolutions Ltd',
    industry: 'Technology',
    stage: 'Early Growth',
    location: 'Cape Town',
    contactPerson: 'James Molefe',
    contactEmail: 'james.molefe@techsolutions.co.za',
    contactPhone: '+27 82 555 1234',
    overallProgress: 65,
    developmentProgress: 70,
    trainingProgress: 60,
    lastActivity: '2023-10-20',
    nextMeeting: '2023-10-24',
    status: 'on-track',
    keyAreas: [
    {
      name: 'Technical Team Building',
      progress: 90,
      status: 'on-track',
      lastUpdate: '2023-10-15'
    },
    {
      name: 'Product Roadmap Development',
      progress: 70,
      status: 'on-track',
      lastUpdate: '2023-10-20'
    },
    {
      name: 'Market Expansion Strategy',
      progress: 40,
      status: 'at-risk',
      lastUpdate: '2023-10-18'
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

    recentMilestones: [
    {
      title: 'Technical hiring plan completed',
      date: '2023-08-10',
      status: 'completed'
    },
    {
      title: 'Product roadmap draft review',
      date: '2023-10-20',
      status: 'completed'
    },
    {
      title: 'Kenya market analysis',
      date: '2023-10-18',
      status: 'in-progress'
    }],

    upcomingMilestones: [
    {
      title: 'Complete product roadmap',
      date: '2023-10-30',
      status: 'upcoming'
    },
    {
      title: 'Finalize market expansion strategy',
      date: '2023-11-15',
      status: 'upcoming'
    }]

  },
  {
    id: 4,
    name: 'AgriTech Solutions',
    industry: 'Agriculture',
    stage: 'Early Growth',
    location: 'Bloemfontein',
    contactPerson: 'Nomsa Dlamini',
    contactEmail: 'nomsa.dlamini@agritech.co.za',
    contactPhone: '+27 83 555 5678',
    overallProgress: 82,
    developmentProgress: 85,
    trainingProgress: 80,
    lastActivity: '2023-10-18',
    nextMeeting: '2023-10-25',
    status: 'on-track',
    keyAreas: [
    {
      name: 'Farmer Onboarding Strategy',
      progress: 100,
      status: 'completed',
      lastUpdate: '2023-07-25'
    },
    {
      name: 'Technology Adoption Program',
      progress: 100,
      status: 'completed',
      lastUpdate: '2023-09-18'
    },
    {
      name: 'Revenue Model Refinement',
      progress: 75,
      status: 'on-track',
      lastUpdate: '2023-10-15'
    }],

    trainingCompleted: [
    {
      id: 1,
      title: 'Technology Adoption Strategies for Rural Communities',
      completionDate: '2023-09-12',
      score: 92
    }],

    trainingInProgress: [
    {
      id: 1,
      title: 'Sustainable Revenue Models for Social Enterprises',
      progress: 80,
      dueDate: '2023-10-20'
    }],

    recentMilestones: [
    {
      title: 'Farmer onboarding optimization',
      date: '2023-07-25',
      status: 'completed'
    },
    {
      title: 'Technology adoption program implementation',
      date: '2023-09-18',
      status: 'completed'
    },
    {
      title: 'Revenue model analysis',
      date: '2023-10-15',
      status: 'completed'
    }],

    upcomingMilestones: [
    {
      title: 'Finalize revenue model refinement',
      date: '2023-11-15',
      status: 'upcoming'
    },
    {
      title: 'Develop Q1 2024 growth strategy',
      date: '2023-12-10',
      status: 'upcoming'
    }]

  }];

  // Filter SMEs based on search and filters
  const filteredSmes = smes.filter((sme) => {
    const matchesSearch =
    sme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sme.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sme.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
    industryFilter === 'all' || sme.industry === industryFilter;
    const matchesProgress =
    progressFilter === 'all' ||
    progressFilter === 'high' && sme.overallProgress >= 75 ||
    progressFilter === 'medium' &&
    sme.overallProgress >= 50 &&
    sme.overallProgress < 75 ||
    progressFilter === 'low' && sme.overallProgress < 50;
    return matchesSearch && matchesIndustry && matchesProgress;
  });
  // Get unique industries for filter
  const industries = ['all', ...new Set(smes.map((s) => s.industry))];
  // Toggle expanded state
  const toggleExpandedSme = (id) => {
    setExpandedSme(expandedSme === id ? null : id);
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
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      case 'behind':
        return 'bg-amber-100 text-amber-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        SME Progress Tracking
      </h1>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search SMEs by name, industry, or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}>
            
            {industries.map((industry) =>
            <option key={industry} value={industry}>
                {industry === 'all' ? 'All Industries' : industry}
              </option>
            )}
          </select>
          <select
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}>
            
            <option value="all">All Progress</option>
            <option value="high">High Progress (75%+)</option>
            <option value="medium">Medium Progress (50-74%)</option>
            <option value="low">Low Progress (0-49%)</option>
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
              setIndustryFilter('all');
              setProgressFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-green-600 hover:text-green-800">
            
              Reset All Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Company Stage
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">Any Stage</option>
                <option value="seed">Seed</option>
                <option value="early">Early Growth</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Location
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">Any Location</option>
                <option value="Cape Town">Cape Town</option>
                <option value="Johannesburg">Johannesburg</option>
                <option value="Durban">Durban</option>
                <option value="Pretoria">Pretoria</option>
                <option value="Bloemfontein">Bloemfontein</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Status</option>
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
                <option value="behind">Behind Schedule</option>
              </select>
            </div>
          </div>
        </div>
      }
      <div className="space-y-6">
        {filteredSmes.length > 0 ?
        filteredSmes.map((sme) =>
        <div
          key={sme.id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
          
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <BuildingIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {sme.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                          {sme.industry}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {sme.stage}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {sme.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <BarChart2Icon className="w-4 h-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {sme.overallProgress}% Progress
                      </span>
                    </div>
                    <button
                  onClick={() => toggleExpandedSme(sme.id)}
                  className="ml-4 text-gray-400 hover:text-gray-500">
                  
                      <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${expandedSme === sme.id ? 'transform rotate-180' : ''}`} />
                  
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Development Progress
                    </h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{
                        width: `${sme.developmentProgress}%`
                      }}>
                    </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {sme.developmentProgress}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <TargetIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-600">
                        {
                    sme.keyAreas.filter((a) => a.status === 'completed').
                    length
                    }{' '}
                        of {sme.keyAreas.length} key areas completed
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Training Progress
                    </h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${sme.trainingProgress}%`
                      }}>
                    </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {sme.trainingProgress}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <BookOpenIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-600">
                        {sme.trainingCompleted.length} courses completed,{' '}
                        {sme.trainingInProgress.length} in progress
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Next Steps
                    </h4>
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-700">
                        Next Meeting: {formatDate(sme.nextMeeting)}
                      </span>
                    </div>
                    {sme.upcomingMilestones.length > 0 &&
                <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 text-amber-500 mr-1" />
                        <span className="text-xs text-amber-700">
                          Next milestone: {sme.upcomingMilestones[0].title} (
                          {formatDate(sme.upcomingMilestones[0].date)})
                        </span>
                      </div>
                }
                  </div>
                </div>
                {expandedSme === sme.id &&
            <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-3">
                          Key Development Areas
                        </h4>
                        <div className="space-y-3">
                          {sme.keyAreas.map((area, index) =>
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="text-sm font-medium text-gray-800">
                                  {area.name}
                                </h5>
                                <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(area.status)}`}>
                          
                                  {area.status === 'completed' &&
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          }
                                  {area.status.
                          replace('-', ' ').
                          replace(/\b\w/g, (l) => l.toUpperCase())}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                            className={`h-2 rounded-full ${area.status === 'at-risk' ? 'bg-red-500' : area.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{
                              width: `${area.progress}%`
                            }}>
                          </div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {area.progress}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                  Last updated: {formatDate(area.lastUpdate)}
                                </span>
                                <button className="text-xs text-green-600 hover:text-green-800">
                                  Update Progress
                                </button>
                              </div>
                            </div>
                    )}
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full justify-center">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add Development Area
                          </button>
                        </div>
                        <h4 className="text-md font-medium text-gray-800 mt-6 mb-3">
                          Milestones
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              Recent Milestones
                            </h5>
                            <div className="space-y-2">
                              {sme.recentMilestones.map((milestone, index) =>
                        <div key={index} className="flex items-start">
                                  <div className="mr-2 mt-0.5">
                                    {milestone.status === 'completed' ?
                            <CheckCircleIcon className="w-4 h-4 text-green-500" /> :

                            <ClockIcon className="w-4 h-4 text-blue-500" />
                            }
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-800">
                                      {milestone.title}
                                    </p>
                                    <div className="flex items-center">
                                      <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                                      <span className="text-xs text-gray-500">
                                        {formatDate(milestone.date)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                        )}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              Upcoming Milestones
                            </h5>
                            <div className="space-y-2">
                              {sme.upcomingMilestones.map(
                          (milestone, index) =>
                          <div key={index} className="flex items-start">
                                    <div className="mr-2 mt-0.5">
                                      <ClockIcon className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-800">
                                        {milestone.title}
                                      </p>
                                      <div className="flex items-center">
                                        <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                                        <span className="text-xs text-gray-500">
                                          {formatDate(milestone.date)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                        )}
                            </div>
                          </div>
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full justify-center">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add Milestone
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-3">
                          Training & Development
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              Completed Courses
                            </h5>
                            {sme.trainingCompleted.length > 0 ?
                      <div className="space-y-2">
                                {sme.trainingCompleted.map((course) =>
                        <div
                          key={course.id}
                          className="bg-white rounded border border-gray-200 p-2">
                          
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <BookOpenIcon className="w-4 h-4 text-green-500 mr-2" />
                                        <p className="text-sm text-gray-800">
                                          {course.title}
                                        </p>
                                      </div>
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        {course.score}%
                                      </span>
                                    </div>
                                    <div className="mt-1 flex items-center">
                                      <CalendarIcon className="w-3 h-3 text-gray-400 mr-1" />
                                      <span className="text-xs text-gray-500">
                                        Completed:{' '}
                                        {formatDate(course.completionDate)}
                                      </span>
                                    </div>
                                  </div>
                        )}
                              </div> :

                      <p className="text-sm text-gray-500">
                                No courses completed yet.
                              </p>
                      }
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              Courses In Progress
                            </h5>
                            {sme.trainingInProgress.length > 0 ?
                      <div className="space-y-2">
                                {sme.trainingInProgress.map((course) =>
                        <div
                          key={course.id}
                          className="bg-white rounded border border-gray-200 p-2">
                          
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm text-gray-800">
                                        {course.title}
                                      </p>
                                      <span className="text-xs font-medium text-gray-700">
                                        {course.progress}%
                                      </span>
                                    </div>
                                    <div className="mt-1 mb-2 w-full bg-gray-200 rounded-full h-1.5">
                                      <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${course.progress}%`
                              }}>
                            </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                                        <span className="text-xs text-gray-500">
                                          Due: {formatDate(course.dueDate)}
                                        </span>
                                      </div>
                                      <button className="text-xs text-green-600 hover:text-green-800">
                                        View Details
                                      </button>
                                    </div>
                                  </div>
                        )}
                              </div> :

                      <p className="text-sm text-gray-500">
                                No courses in progress.
                              </p>
                      }
                          </div>
                          <button className="inline-flex items-center px-3 py-1.5 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 w-full justify-center">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Assign New Course
                          </button>
                        </div>
                        <h4 className="text-md font-medium text-gray-800 mt-6 mb-3">
                          Contact Information
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center mb-2">
                            <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-800">
                              {sme.contactPerson}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Email: {sme.contactEmail}</p>
                            <p>Phone: {sme.contactPhone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <FileTextIcon className="w-4 h-4 mr-2" />
                        Generate Progress Report
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
            }
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      Last activity: {formatDate(sme.lastActivity)}
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-0 flex space-x-3">
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View Development Plan
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      <BarChart2Icon className="w-4 h-4 mr-2" />
                      Update Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ) :

        <div className="text-center py-8">
            <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No SMEs found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        }
      </div>
    </div>);

}