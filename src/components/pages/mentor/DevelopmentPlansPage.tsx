import React, { useState } from 'react';
import {
  BuildingIcon,
  TargetIcon,
  PlusIcon,
  ClipboardCheckIcon,
  ClockIcon,
  CalendarIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  EditIcon,
  TrashIcon,
  AlertCircleIcon,
  SearchIcon,
  FilterIcon,
  ArrowRightIcon,
  SaveIcon,
  XIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon } from
'lucide-react';
export function DevelopmentPlansPage() {
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingObjective, setEditingObjective] = useState(null);
  const [newObjectiveTitle, setNewObjectiveTitle] = useState('');
  const [newObjectiveDescription, setNewObjectiveDescription] = useState('');
  const [newObjectiveDeadline, setNewObjectiveDeadline] = useState('');
  const [showAddObjectiveForm, setShowAddObjectiveForm] = useState(false);
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);
  // New state variables for SME Profile and Schedule Meeting
  const [showSMEProfile, setShowSMEProfile] = useState(false);
  const [selectedSME, setSelectedSME] = useState(null);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [selectedPlanForMeeting, setSelectedPlanForMeeting] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    type: 'Weekly Check-in',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: '60 minutes',
    attendees: '',
    agenda: '',
    location: 'Virtual (Google Meet)',
    sendReminder: true
  });
  // New state variables for Create Plan form
  const [newPlan, setNewPlan] = useState({
    smeName: '',
    industry: '',
    stage: 'Early Growth',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).
    toISOString().
    split('T')[0],
    focusAreas: ['', '', ''],
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: ''
  });
  // New state variables for the new functionality
  const [showScheduleNewMeeting, setShowScheduleNewMeeting] = useState(false);
  const [showAddNewMetric, setShowAddNewMetric] = useState(false);
  const [showExportPlan, setShowExportPlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [selectedPlanForEdit, setSelectedPlanForEdit] = useState(null);
  const [editPlan, setEditPlan] = useState({
    smeName: '',
    industry: '',
    stage: '',
    startDate: '',
    endDate: '',
    focusAreas: [],
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: ''
  });
  const [newMetric, setNewMetric] = useState({
    name: '',
    target: '',
    current: '',
    status: 'on-track'
  });
  // Handle input change for the new plan form
  const handleNewPlanChange = (field, value) => {
    setNewPlan({
      ...newPlan,
      [field]: value
    });
  };
  // Handle focus area change
  const handleFocusAreaChange = (index, value) => {
    const updatedFocusAreas = [...newPlan.focusAreas];
    updatedFocusAreas[index] = value;
    setNewPlan({
      ...newPlan,
      focusAreas: updatedFocusAreas
    });
  };
  // Add focus area
  const addFocusArea = () => {
    setNewPlan({
      ...newPlan,
      focusAreas: [...newPlan.focusAreas, '']
    });
  };
  // Remove focus area
  const removeFocusArea = (index) => {
    const updatedFocusAreas = [...newPlan.focusAreas];
    updatedFocusAreas.splice(index, 1);
    setNewPlan({
      ...newPlan,
      focusAreas: updatedFocusAreas
    });
  };
  // Handle create plan submission
  const handleCreatePlan = () => {
    // This would typically make an API call to create a new development plan
    console.log('Creating new development plan:', newPlan);
    // Reset form and close modal
    setNewPlan({
      smeName: '',
      industry: '',
      stage: 'Early Growth',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).
      toISOString().
      split('T')[0],
      focusAreas: ['', '', ''],
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      description: ''
    });
    setShowCreatePlanForm(false);
  };
  // Handle viewing SME profile
  const handleViewSMEProfile = (smeId) => {
    // Find the SME based on the ID (in a real app, this would fetch from an API)
    const plan = developmentPlans.find((p) => p.smeId === smeId);
    if (plan) {
      setSelectedSME({
        id: plan.smeId,
        name: plan.smeName,
        industry: plan.industry,
        // Mock data for the SME profile
        stage: 'Early Growth',
        foundedYear: '2019',
        employees: '15-20',
        location: 'Cape Town, South Africa',
        website: 'www.techsolutions.co.za',
        contactPerson: 'James Molefe',
        contactEmail: 'james.molefe@techsolutions.co.za',
        contactPhone: '+27 82 555 1234',
        description:
        'TechSolutions is a growing technology company focused on providing innovative solutions for agricultural businesses across Africa. Their flagship product is a mobile platform that connects small-scale farmers with markets, suppliers, and agricultural expertise.',
        keyProducts: [
        'FarmConnect - Mobile platform for farmers',
        'SupplyChain Pro - Logistics management system',
        'AgriInsights - Data analytics platform'],

        keyMarkets: ['South Africa', 'Kenya', 'Nigeria (planned expansion)'],
        fundingStatus: 'Series A completed (R12M)',
        keyMetrics: {
          monthlyActiveUsers: '4,500',
          revenueGrowth: '+28% YoY',
          customerRetention: '82%'
        }
      });
      setShowSMEProfile(true);
    }
  };
  // Handle scheduling meeting
  const handleScheduleMeeting = (planId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlanForMeeting(plan);
      setNewMeeting({
        ...newMeeting,
        attendees: `${plan.smeName} team`
      });
      setShowScheduleMeeting(true);
    }
  };
  // Handle meeting form input change
  const handleMeetingChange = (field, value) => {
    setNewMeeting({
      ...newMeeting,
      [field]: value
    });
  };
  // Handle save meeting
  const handleSaveMeeting = () => {
    // In a real app, this would save to an API
    console.log('Scheduling meeting:', {
      ...newMeeting,
      planId: selectedPlanForMeeting?.id,
      smeName: selectedPlanForMeeting?.smeName
    });
    // Reset form and close modal
    setNewMeeting({
      type: 'Weekly Check-in',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: '60 minutes',
      attendees: '',
      agenda: '',
      location: 'Virtual (Google Meet)',
      sendReminder: true
    });
    setShowScheduleMeeting(false);
    setSelectedPlanForMeeting(null);
  };
  // New handler for Schedule New Meeting button
  const handleScheduleNewMeeting = (planId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlanForMeeting(plan);
      setNewMeeting({
        type: 'Weekly Check-in',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: '60 minutes',
        attendees: `${plan.smeName} team`,
        agenda: '',
        location: 'Virtual (Google Meet)',
        sendReminder: true
      });
      setShowScheduleNewMeeting(true);
    }
  };
  // New handler for saving a new meeting
  const handleSaveNewMeeting = () => {
    // In a real app, this would save to an API
    console.log('Scheduling new meeting:', {
      ...newMeeting,
      planId: selectedPlanForMeeting?.id,
      smeName: selectedPlanForMeeting?.smeName
    });
    // Reset form and close modal
    setNewMeeting({
      type: 'Weekly Check-in',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: '60 minutes',
      attendees: '',
      agenda: '',
      location: 'Virtual (Google Meet)',
      sendReminder: true
    });
    setShowScheduleNewMeeting(false);
    setSelectedPlanForMeeting(null);
    // Show a success message
    alert('Meeting scheduled successfully!');
  };
  // New handler for Add New Metric button
  const handleAddNewMetric = (planId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlanForMeeting(plan);
      setNewMetric({
        name: '',
        target: '',
        current: '',
        status: 'on-track'
      });
      setShowAddNewMetric(true);
    }
  };
  // New handler for saving a new metric
  const handleSaveNewMetric = () => {
    // In a real app, this would save to an API
    console.log('Adding new metric:', {
      ...newMetric,
      planId: selectedPlanForMeeting?.id
    });
    // Reset form and close modal
    setNewMetric({
      name: '',
      target: '',
      current: '',
      status: 'on-track'
    });
    setShowAddNewMetric(false);
    setSelectedPlanForMeeting(null);
    // Show a success message
    alert('Metric added successfully!');
  };
  // New handler for Export Plan button
  const handleExportPlan = (planId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlanForMeeting(plan);
      setShowExportPlan(true);
    }
  };
  // New handler for Edit Plan button
  const handleEditPlan = (planId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlanForEdit(plan);
      setEditPlan({
        smeName: plan.smeName,
        industry: plan.industry,
        stage: 'Early Growth',
        startDate: plan.startDate,
        endDate: plan.endDate,
        focusAreas: [...plan.focusAreas],
        contactPerson: 'James Molefe',
        contactEmail: 'james.molefe@techsolutions.co.za',
        contactPhone: '+27 82 555 1234',
        description: 'Development plan for ' + plan.smeName // Mock description
      });
      setShowEditPlan(true);
    }
  };
  // Handle input change for the edit plan form
  const handleEditPlanChange = (field, value) => {
    setEditPlan({
      ...editPlan,
      [field]: value
    });
  };
  // Handle focus area change for edit plan
  const handleEditFocusAreaChange = (index, value) => {
    const updatedFocusAreas = [...editPlan.focusAreas];
    updatedFocusAreas[index] = value;
    setEditPlan({
      ...editPlan,
      focusAreas: updatedFocusAreas
    });
  };
  // Add focus area for edit plan
  const addEditFocusArea = () => {
    setEditPlan({
      ...editPlan,
      focusAreas: [...editPlan.focusAreas, '']
    });
  };
  // Remove focus area for edit plan
  const removeEditFocusArea = (index) => {
    const updatedFocusAreas = [...editPlan.focusAreas];
    updatedFocusAreas.splice(index, 1);
    setEditPlan({
      ...editPlan,
      focusAreas: updatedFocusAreas
    });
  };
  // Handle save edited plan
  const handleSaveEditedPlan = () => {
    // In a real app, this would save to an API
    console.log('Saving edited plan:', {
      ...editPlan,
      id: selectedPlanForEdit?.id
    });
    // Reset form and close modal
    setShowEditPlan(false);
    setSelectedPlanForEdit(null);
    // Show a success message
    alert('Plan updated successfully!');
  };
  // Handle input change for the new metric form
  const handleNewMetricChange = (field, value) => {
    setNewMetric({
      ...newMetric,
      [field]: value
    });
  };
  // Mock data for development plans
  const developmentPlans = [
  {
    id: 1,
    smeName: 'TechSolutions Ltd',
    smeId: 1,
    industry: 'Technology',
    startDate: '2023-06-15',
    endDate: '2023-12-15',
    status: 'active',
    progress: 65,
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
      notes:
      'Completed ahead of schedule. Included detailed job descriptions for 5 key technical roles.'
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
      'Working on resource allocation section. Need to align with technical hiring plan.'
    },
    {
      id: 3,
      title: 'Develop market expansion strategy',
      description:
      'Research and develop strategy for entering 3 new African markets with competitive analysis and go-to-market approach',
      status: 'in-progress',
      deadline: '2023-11-15',
      progress: 40,
      notes:
      'Kenya market research completed. Starting on Nigeria analysis.'
    }],

    meetings: [
    {
      id: 1,
      date: '2023-10-17',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      notes:
      'Discussed product roadmap progress and technical hiring challenges.',
      completed: true
    },
    {
      id: 2,
      date: '2023-10-24',
      time: '10:00-11:30',
      type: 'Weekly Check-in',
      notes: '',
      completed: false
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
    }]

  },
  {
    id: 2,
    smeName: 'AgriTech Solutions',
    smeId: 4,
    industry: 'Agriculture',
    startDate: '2023-05-20',
    endDate: '2023-11-20',
    status: 'active',
    progress: 82,
    focusAreas: [
    'Farmer onboarding strategy',
    'Technology adoption',
    'Revenue model refinement'],

    objectives: [
    {
      id: 1,
      title: 'Optimize farmer onboarding process',
      description:
      'Streamline farmer registration and onboarding to reduce time and increase conversion rates',
      status: 'completed',
      deadline: '2023-07-25',
      completionDate: '2023-07-25',
      notes:
      'Reduced onboarding time from 3 days to 1 day. Conversion rate improved by 40%.'
    },
    {
      id: 2,
      title: 'Develop technology adoption program',
      description:
      'Create training materials and support system to improve technology adoption rates among farmers',
      status: 'completed',
      deadline: '2023-09-18',
      completionDate: '2023-09-18',
      notes:
      'Created comprehensive training materials in 3 local languages. Piloted with 50 farmers with positive feedback.'
    },
    {
      id: 3,
      title: 'Refine revenue model',
      description:
      'Analyze current revenue streams and develop optimization strategy with focus on sustainability',
      status: 'in-progress',
      deadline: '2023-11-15',
      progress: 75,
      notes:
      'Identified opportunities to increase margins by 15% through service bundling and premium features.'
    }],

    meetings: [
    {
      id: 1,
      date: '2023-10-18',
      time: '09:00-10:30',
      type: 'Weekly Check-in',
      notes:
      'Reviewed revenue model analysis and discussed potential premium features.',
      completed: true
    },
    {
      id: 2,
      date: '2023-10-25',
      time: '09:00-10:30',
      type: 'Weekly Check-in',
      notes: '',
      completed: false
    }],

    keyMetrics: [
    {
      name: 'Farmer onboarding',
      target: '5,000 farmers',
      current: '3,800 farmers',
      status: 'on-track'
    },
    {
      name: 'Technology adoption rate',
      target: '75%',
      current: '68%',
      status: 'on-track'
    },
    {
      name: 'Revenue per farmer',
      target: 'R250/month',
      current: 'R210/month',
      status: 'on-track'
    }]

  }];

  // Filter development plans based on search and filters
  const filteredPlans = developmentPlans.filter((plan) => {
    const matchesSearch = plan.smeName.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Toggle expanded state for a plan
  const toggleExpandedPlan = (id) => {
    setExpandedPlan(expandedPlan === id ? null : id);
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
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      case 'on-track':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // Handle edit objective
  const handleEditObjective = (planId, objectiveId) => {
    const plan = developmentPlans.find((p) => p.id === planId);
    const objective = plan.objectives.find((o) => o.id === objectiveId);
    setEditingObjective(objective);
    setNewObjectiveTitle(objective.title);
    setNewObjectiveDescription(objective.description);
    setNewObjectiveDeadline(objective.deadline);
  };
  // Handle save objective
  const handleSaveObjective = () => {
    // This would typically make an API call to update the database
    console.log('Saving objective:', {
      ...editingObjective,
      title: newObjectiveTitle,
      description: newObjectiveDescription,
      deadline: newObjectiveDeadline
    });
    // In a real app, this would update the objective in the database
    // For now, we'll just close the edit form
    setEditingObjective(null);
    // Show a success message
    alert('Objective updated successfully!');
  };
  // Handle add new objective
  const handleAddObjective = (planId) => {
    // This would typically make an API call to update the database
    console.log('Adding new objective to plan', planId, {
      title: newObjectiveTitle,
      description: newObjectiveDescription,
      deadline: newObjectiveDeadline
    });
    setShowAddObjectiveForm(false);
    setNewObjectiveTitle('');
    setNewObjectiveDescription('');
    setNewObjectiveDeadline('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Development Plans</h1>
        <button
          onClick={() => setShowCreatePlanForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          
          <PlusIcon className="w-5 h-5 mr-2" />
          Create New Plan
        </button>
      </div>
      {/* Create New Plan Modal */}
      {showCreatePlanForm &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Create New Development Plan
              </h2>
              <button
              onClick={() => setShowCreatePlanForm(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-6">
                {/* SME Information Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    SME Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                      htmlFor="smeName"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        SME Name *
                      </label>
                      <input
                      type="text"
                      id="smeName"
                      value={newPlan.smeName}
                      onChange={(e) =>
                      handleNewPlanChange('smeName', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. TechSolutions Ltd"
                      required />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Industry *
                      </label>
                      <select
                      id="industry"
                      value={newPlan.industry}
                      onChange={(e) =>
                      handleNewPlanChange('industry', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required>
                      
                        <option value="">Select an industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Services">Services</option>
                        <option value="Energy">Energy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                      htmlFor="stage"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Business Stage
                      </label>
                      <select
                      id="stage"
                      value={newPlan.stage}
                      onChange={(e) =>
                      handleNewPlanChange('stage', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      
                        <option value="Idea">Idea</option>
                        <option value="Startup">Startup</option>
                        <option value="Early Growth">Early Growth</option>
                        <option value="Expansion">Expansion</option>
                        <option value="Mature">Mature</option>
                      </select>
                    </div>
                    <div>
                      <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Primary Contact Person
                      </label>
                      <input
                      type="text"
                      id="contactPerson"
                      value={newPlan.contactPerson}
                      onChange={(e) =>
                      handleNewPlanChange('contactPerson', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. John Doe" />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="contactEmail"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Contact Email
                      </label>
                      <input
                      type="email"
                      id="contactEmail"
                      value={newPlan.contactEmail}
                      onChange={(e) =>
                      handleNewPlanChange('contactEmail', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. john.doe@example.com" />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="contactPhone"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Contact Phone
                      </label>
                      <input
                      type="tel"
                      id="contactPhone"
                      value={newPlan.contactPhone}
                      onChange={(e) =>
                      handleNewPlanChange('contactPhone', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g. +27 82 123 4567" />
                    
                    </div>
                  </div>
                </div>
                {/* Plan Details Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Plan Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Start Date *
                      </label>
                      <input
                      type="date"
                      id="startDate"
                      value={newPlan.startDate}
                      onChange={(e) =>
                      handleNewPlanChange('startDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        End Date *
                      </label>
                      <input
                      type="date"
                      id="endDate"
                      value={newPlan.endDate}
                      onChange={(e) =>
                      handleNewPlanChange('endDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required />
                    
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Plan Description *
                    </label>
                    <textarea
                    id="description"
                    value={newPlan.description}
                    onChange={(e) =>
                    handleNewPlanChange('description', e.target.value)
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the purpose and goals of this development plan..."
                    required>
                  </textarea>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Focus Areas *
                      </label>
                      <button
                      type="button"
                      onClick={addFocusArea}
                      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                      
                        <PlusIcon className="w-3 h-3 mr-1" />
                        Add Focus Area
                      </button>
                    </div>
                    <div className="space-y-2">
                      {newPlan.focusAreas.map((area, index) =>
                    <div key={index} className="flex items-center">
                          <input
                        type="text"
                        value={area}
                        onChange={(e) =>
                        handleFocusAreaChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={`Focus area ${index + 1} (e.g. Team Building, Marketing Strategy)`} />
                      
                          {newPlan.focusAreas.length > 1 &&
                      <button
                        type="button"
                        onClick={() => removeFocusArea(index)}
                        className="ml-2 text-gray-400 hover:text-gray-500">
                        
                              <TrashIcon className="w-5 h-5" />
                            </button>
                      }
                        </div>
                    )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Add key focus areas for this development plan. These
                      should align with the SME's most critical needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 -mx-6 px-6 py-3 mt-6 flex justify-between items-center">
                <div className="text-xs text-gray-500">* Required fields</div>
                <div className="flex space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowCreatePlanForm(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  
                    Cancel
                  </button>
                  <button
                  type="button"
                  onClick={handleCreatePlan}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  
                    Create Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    What happens next?
                  </h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      After creating the development plan, you'll be able to:
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Add specific objectives and milestones</li>
                      <li>Schedule initial meetings with the SME</li>
                      <li>Define key metrics to track progress</li>
                      <li>Assign relevant training courses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* SME Profile Modal */}
      {showSMEProfile && selectedSME &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">SME Profile</h2>
              <button
              onClick={() => setShowSMEProfile(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <BuildingIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedSME.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                      {selectedSME.industry}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedSME.stage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {/* Company Overview */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Company Overview
                  </h4>
                  <p className="text-gray-600">{selectedSME.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Founded
                      </h5>
                      <p className="text-gray-800">{selectedSME.foundedYear}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Employees
                      </h5>
                      <p className="text-gray-800">{selectedSME.employees}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Location
                      </h5>
                      <p className="text-gray-800">{selectedSME.location}</p>
                    </div>
                  </div>
                </div>
                {/* Products & Markets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Products & Services
                    </h4>
                    <ul className="space-y-2">
                      {selectedSME.keyProducts.map((product, index) =>
                    <li key={index} className="flex items-start">
                          <div className="mt-1 mr-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-gray-600">{product}</span>
                        </li>
                    )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Key Markets
                    </h4>
                    <ul className="space-y-2">
                      {selectedSME.keyMarkets.map((market, index) =>
                    <li key={index} className="flex items-start">
                          <div className="mt-1 mr-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-gray-600">{market}</span>
                        </li>
                    )}
                    </ul>
                  </div>
                </div>
                {/* Business Metrics */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Business Metrics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        Monthly Active Users
                      </h5>
                      <p className="text-xl font-semibold text-gray-800">
                        {selectedSME.keyMetrics.monthlyActiveUsers}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        Revenue Growth
                      </h5>
                      <p className="text-xl font-semibold text-green-600">
                        {selectedSME.keyMetrics.revenueGrowth}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        Customer Retention
                      </h5>
                      <p className="text-xl font-semibold text-gray-800">
                        {selectedSME.keyMetrics.customerRetention}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Funding Status */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-md font-medium text-blue-800 mb-1">
                    Funding Status
                  </h4>
                  <p className="text-blue-900">{selectedSME.fundingStatus}</p>
                </div>
                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    Primary Contact
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <UserIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <h5 className="text-md font-medium text-gray-800">
                          {selectedSME.contactPerson}
                        </h5>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                            {selectedSME.contactEmail}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                            {selectedSME.contactPhone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <GlobeIcon className="w-4 h-4 text-gray-400 mr-2" />
                            {selectedSME.website}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowSMEProfile(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Close
                </button>
                <button
                onClick={() => {
                  setShowSMEProfile(false);
                  handleScheduleMeeting(
                    developmentPlans.find((p) => p.smeId === selectedSME.id).
                    id
                  );
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Schedule Meeting Modal */}
      {showScheduleMeeting && selectedPlanForMeeting &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Schedule Meeting with {selectedPlanForMeeting.smeName}
              </h2>
              <button
              onClick={() => setShowScheduleMeeting(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label
                  htmlFor="meetingType"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Meeting Type
                  </label>
                  <select
                  id="meetingType"
                  value={newMeeting.type}
                  onChange={(e) =>
                  handleMeetingChange('type', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  
                    <option value="Weekly Check-in">Weekly Check-in</option>
                    <option value="Milestone Review">Milestone Review</option>
                    <option value="Training Session">Training Session</option>
                    <option value="Strategic Planning">
                      Strategic Planning
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                    htmlFor="meetingDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Date
                    </label>
                    <input
                    id="meetingDate"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) =>
                    handleMeetingChange('date', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="meetingTime"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Time
                    </label>
                    <input
                    id="meetingTime"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) =>
                    handleMeetingChange('time', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                    htmlFor="meetingDuration"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Duration
                    </label>
                    <select
                    id="meetingDuration"
                    value={newMeeting.duration}
                    onChange={(e) =>
                    handleMeetingChange('duration', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="60 minutes">60 minutes</option>
                      <option value="90 minutes">90 minutes</option>
                      <option value="120 minutes">120 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label
                    htmlFor="meetingLocation"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Location
                    </label>
                    <select
                    id="meetingLocation"
                    value={newMeeting.location}
                    onChange={(e) =>
                    handleMeetingChange('location', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    
                      <option value="Virtual (Google Meet)">
                        Virtual (Google Meet)
                      </option>
                      <option value="Virtual (Zoom)">Virtual (Zoom)</option>
                      <option value="Virtual (Microsoft Teams)">
                        Virtual (Microsoft Teams)
                      </option>
                      <option value="In-person (SME office)">
                        In-person (SME office)
                      </option>
                      <option value="In-person (Mentor office)">
                        In-person (Mentor office)
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                  htmlFor="meetingAttendees"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Attendees
                  </label>
                  <input
                  id="meetingAttendees"
                  type="text"
                  value={newMeeting.attendees}
                  onChange={(e) =>
                  handleMeetingChange('attendees', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter attendee names separated by commas" />
                
                </div>
                <div>
                  <label
                  htmlFor="meetingAgenda"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Agenda
                  </label>
                  <textarea
                  id="meetingAgenda"
                  value={newMeeting.agenda}
                  onChange={(e) =>
                  handleMeetingChange('agenda', e.target.value)
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter meeting agenda items...">
                </textarea>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                    id="sendReminder"
                    type="checkbox"
                    checked={newMeeting.sendReminder}
                    onChange={(e) =>
                    handleMeetingChange('sendReminder', e.target.checked)
                    }
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" />
                  
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                    htmlFor="sendReminder"
                    className="font-medium text-gray-700">
                    
                      Send calendar invites and reminders
                    </label>
                    <p className="text-gray-500">
                      Automatically send calendar invites to all attendees and
                      reminders 24 hours before the meeting.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowScheduleMeeting(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Cancel
                </button>
                <button
                onClick={handleSaveMeeting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Schedule Meeting
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    Meeting Best Practices
                  </h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Share the agenda with attendees at least 24 hours in
                        advance
                      </li>
                      <li>
                        Clearly define the meeting objectives and expected
                        outcomes
                      </li>
                      <li>
                        Allocate specific time for discussing development plan
                        progress
                      </li>
                      <li>End with clear action items and responsibilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Schedule New Meeting Modal */}
      {showScheduleNewMeeting && selectedPlanForMeeting &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Schedule New Meeting with {selectedPlanForMeeting.smeName}
              </h2>
              <button
              onClick={() => setShowScheduleNewMeeting(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label
                  htmlFor="meetingType"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Meeting Type
                  </label>
                  <select
                  id="meetingType"
                  value={newMeeting.type}
                  onChange={(e) =>
                  handleMeetingChange('type', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  
                    <option value="Weekly Check-in">Weekly Check-in</option>
                    <option value="Milestone Review">Milestone Review</option>
                    <option value="Training Session">Training Session</option>
                    <option value="Strategic Planning">
                      Strategic Planning
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                    htmlFor="meetingDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Date
                    </label>
                    <input
                    id="meetingDate"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) =>
                    handleMeetingChange('date', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="meetingTime"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Time
                    </label>
                    <input
                    id="meetingTime"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) =>
                    handleMeetingChange('time', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                    htmlFor="meetingDuration"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Duration
                    </label>
                    <select
                    id="meetingDuration"
                    value={newMeeting.duration}
                    onChange={(e) =>
                    handleMeetingChange('duration', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="60 minutes">60 minutes</option>
                      <option value="90 minutes">90 minutes</option>
                      <option value="120 minutes">120 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label
                    htmlFor="meetingLocation"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Location
                    </label>
                    <select
                    id="meetingLocation"
                    value={newMeeting.location}
                    onChange={(e) =>
                    handleMeetingChange('location', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    
                      <option value="Virtual (Google Meet)">
                        Virtual (Google Meet)
                      </option>
                      <option value="Virtual (Zoom)">Virtual (Zoom)</option>
                      <option value="Virtual (Microsoft Teams)">
                        Virtual (Microsoft Teams)
                      </option>
                      <option value="In-person (SME office)">
                        In-person (SME office)
                      </option>
                      <option value="In-person (Mentor office)">
                        In-person (Mentor office)
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                  htmlFor="meetingAttendees"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Attendees
                  </label>
                  <input
                  id="meetingAttendees"
                  type="text"
                  value={newMeeting.attendees}
                  onChange={(e) =>
                  handleMeetingChange('attendees', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter attendee names separated by commas" />
                
                </div>
                <div>
                  <label
                  htmlFor="meetingAgenda"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Agenda
                  </label>
                  <textarea
                  id="meetingAgenda"
                  value={newMeeting.agenda}
                  onChange={(e) =>
                  handleMeetingChange('agenda', e.target.value)
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter meeting agenda items...">
                </textarea>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                    id="sendReminder"
                    type="checkbox"
                    checked={newMeeting.sendReminder}
                    onChange={(e) =>
                    handleMeetingChange('sendReminder', e.target.checked)
                    }
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" />
                  
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                    htmlFor="sendReminder"
                    className="font-medium text-gray-700">
                    
                      Send calendar invites and reminders
                    </label>
                    <p className="text-gray-500">
                      Automatically send calendar invites to all attendees and
                      reminders 24 hours before the meeting.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowScheduleNewMeeting(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Cancel
                </button>
                <button
                onClick={handleSaveNewMeeting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Add New Metric Modal */}
      {showAddNewMetric && selectedPlanForMeeting &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Add New Performance Metric
              </h2>
              <button
              onClick={() => setShowAddNewMetric(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label
                  htmlFor="metricName"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Metric Name *
                  </label>
                  <input
                  id="metricName"
                  type="text"
                  value={newMetric.name}
                  onChange={(e) =>
                  handleNewMetricChange('name', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. Customer Acquisition Cost"
                  required />
                
                </div>
                <div>
                  <label
                  htmlFor="metricTarget"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Target Value *
                  </label>
                  <input
                  id="metricTarget"
                  type="text"
                  value={newMetric.target}
                  onChange={(e) =>
                  handleNewMetricChange('target', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. R200 per customer"
                  required />
                
                </div>
                <div>
                  <label
                  htmlFor="metricCurrent"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Current Value *
                  </label>
                  <input
                  id="metricCurrent"
                  type="text"
                  value={newMetric.current}
                  onChange={(e) =>
                  handleNewMetricChange('current', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g. R250 per customer"
                  required />
                
                </div>
                <div>
                  <label
                  htmlFor="metricStatus"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  
                    Status
                  </label>
                  <select
                  id="metricStatus"
                  value={newMetric.status}
                  onChange={(e) =>
                  handleNewMetricChange('status', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  
                    <option value="on-track">On Track</option>
                    <option value="at-risk">At Risk</option>
                    <option value="behind">Behind</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowAddNewMetric(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Cancel
                </button>
                <button
                onClick={handleSaveNewMetric}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Add Metric
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Export Plan Modal */}
      {showExportPlan && selectedPlanForMeeting &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Export Development Plan
              </h2>
              <button
              onClick={() => setShowExportPlan(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Plan Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <BuildingIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">
                        {selectedPlanForMeeting.smeName}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                          {selectedPlanForMeeting.industry}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(selectedPlanForMeeting.startDate)} -{' '}
                          {formatDate(selectedPlanForMeeting.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-800">
                  Export Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        
                          <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800">
                          PDF Report
                        </h4>
                        <p className="text-sm text-gray-500">
                          Complete development plan with all details
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        
                          <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                        
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800">
                          Excel Report
                        </h4>
                        <p className="text-sm text-gray-500">
                          Spreadsheet with metrics and objectives
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CalendarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800">
                          Calendar Export
                        </h4>
                        <p className="text-sm text-gray-500">
                          Export meetings and deadlines to calendar
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        
                          <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800">
                          Presentation
                        </h4>
                        <p className="text-sm text-gray-500">
                          PowerPoint slides for presenting to stakeholders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Customize Export
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                      id="includeObjectives"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    
                      <label
                      htmlFor="includeObjectives"
                      className="ml-2 text-sm text-gray-700">
                      
                        Include Objectives & Progress
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                      id="includeMeetings"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    
                      <label
                      htmlFor="includeMeetings"
                      className="ml-2 text-sm text-gray-700">
                      
                        Include Meetings & Check-ins
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                      id="includeMetrics"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    
                      <label
                      htmlFor="includeMetrics"
                      className="ml-2 text-sm text-gray-700">
                      
                        Include Performance Metrics
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                      id="includeNotes"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    
                      <label
                      htmlFor="includeNotes"
                      className="ml-2 text-sm text-gray-700">
                      
                        Include Notes & Comments
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowExportPlan(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Cancel
                </button>
                <button
                onClick={() => {
                  setShowExportPlan(false);
                  alert('Development plan exported successfully!');
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Export Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Edit Plan Modal */}
      {showEditPlan && selectedPlanForEdit &&
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-medium text-gray-900">
                Edit Development Plan
              </h2>
              <button
              onClick={() => setShowEditPlan(false)}
              className="text-gray-400 hover:text-gray-500">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-6">
                {/* SME Information Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    SME Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                      htmlFor="smeName"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        SME Name *
                      </label>
                      <input
                      type="text"
                      id="smeName"
                      value={editPlan.smeName}
                      onChange={(e) =>
                      handleEditPlanChange('smeName', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Industry *
                      </label>
                      <select
                      id="industry"
                      value={editPlan.industry}
                      onChange={(e) =>
                      handleEditPlanChange('industry', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required>
                      
                        <option value="">Select an industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Services">Services</option>
                        <option value="Energy">Energy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                      htmlFor="stage"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Business Stage
                      </label>
                      <select
                      id="stage"
                      value={editPlan.stage}
                      onChange={(e) =>
                      handleEditPlanChange('stage', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      
                        <option value="Idea">Idea</option>
                        <option value="Startup">Startup</option>
                        <option value="Early Growth">Early Growth</option>
                        <option value="Expansion">Expansion</option>
                        <option value="Mature">Mature</option>
                      </select>
                    </div>
                    <div>
                      <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Primary Contact Person
                      </label>
                      <input
                      type="text"
                      id="contactPerson"
                      value={editPlan.contactPerson}
                      onChange={(e) =>
                      handleEditPlanChange('contactPerson', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="contactEmail"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Contact Email
                      </label>
                      <input
                      type="email"
                      id="contactEmail"
                      value={editPlan.contactEmail}
                      onChange={(e) =>
                      handleEditPlanChange('contactEmail', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="contactPhone"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Contact Phone
                      </label>
                      <input
                      type="tel"
                      id="contactPhone"
                      value={editPlan.contactPhone}
                      onChange={(e) =>
                      handleEditPlanChange('contactPhone', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    
                    </div>
                  </div>
                </div>
                {/* Plan Details Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Plan Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        Start Date *
                      </label>
                      <input
                      type="date"
                      id="startDate"
                      value={editPlan.startDate}
                      onChange={(e) =>
                      handleEditPlanChange('startDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required />
                    
                    </div>
                    <div>
                      <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      
                        End Date *
                      </label>
                      <input
                      type="date"
                      id="endDate"
                      value={editPlan.endDate}
                      onChange={(e) =>
                      handleEditPlanChange('endDate', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required />
                    
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Plan Description *
                    </label>
                    <textarea
                    id="description"
                    value={editPlan.description}
                    onChange={(e) =>
                    handleEditPlanChange('description', e.target.value)
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required>
                  </textarea>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Focus Areas *
                      </label>
                      <button
                      type="button"
                      onClick={addEditFocusArea}
                      className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                      
                        <PlusIcon className="w-3 h-3 mr-1" />
                        Add Focus Area
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editPlan.focusAreas.map((area, index) =>
                    <div key={index} className="flex items-center">
                          <input
                        type="text"
                        value={area}
                        onChange={(e) =>
                        handleEditFocusAreaChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      
                          {editPlan.focusAreas.length > 1 &&
                      <button
                        type="button"
                        onClick={() => removeEditFocusArea(index)}
                        className="ml-2 text-gray-400 hover:text-gray-500">
                        
                              <TrashIcon className="w-5 h-5" />
                            </button>
                      }
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                onClick={() => setShowEditPlan(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Cancel
                </button>
                <button
                onClick={handleSaveEditedPlan}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search development plans..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
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
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-green-600 hover:text-green-800">
            
              Reset All Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Industries</option>
                <option value="technology">Technology</option>
                <option value="agriculture">Agriculture</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Progress
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">Any Progress</option>
                <option value="high">High (75-100%)</option>
                <option value="medium">Medium (25-74%)</option>
                <option value="low">Low (0-24%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Time</option>
                <option value="current">Current Quarter</option>
                <option value="past">Past Quarter</option>
                <option value="future">Next Quarter</option>
              </select>
            </div>
          </div>
        </div>
      }
      <div className="space-y-6">
        {filteredPlans.length > 0 ?
        filteredPlans.map((plan) =>
        <div
          key={plan.id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
          
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <BuildingIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {plan.smeName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                          {plan.industry}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {plan.status.charAt(0).toUpperCase() +
                      plan.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <TargetIcon className="w-4 h-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {plan.progress}% Complete
                      </span>
                    </div>
                    <button
                  onClick={() => toggleExpandedPlan(plan.id)}
                  className="ml-4 text-gray-400 hover:text-gray-500">
                  
                      <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${expandedPlan === plan.id ? 'transform rotate-180' : ''}`} />
                  
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span>
                      Duration: {formatDate(plan.startDate)} -{' '}
                      {formatDate(plan.endDate)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 mb-1">
                      Focus Areas:
                    </div>
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
                {expandedPlan === plan.id &&
            <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-medium text-gray-800">
                          Development Objectives
                        </h4>
                        <button
                    onClick={() => {
                      setShowAddObjectiveForm(true);
                      setNewObjectiveTitle('');
                      setNewObjectiveDescription('');
                      setNewObjectiveDeadline('');
                    }}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                    
                          <PlusIcon className="w-3 h-3 mr-1" />
                          Add Objective
                        </button>
                      </div>
                      {showAddObjectiveForm &&
                <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Add New Objective
                          </h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Title
                              </label>
                              <input
                        type="text"
                        value={newObjectiveTitle}
                        onChange={(e) =>
                        setNewObjectiveTitle(e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Objective title" />
                      
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                        value={newObjectiveDescription}
                        onChange={(e) =>
                        setNewObjectiveDescription(e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Detailed description of the objective"
                        rows={3} />
                      
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Deadline
                              </label>
                              <input
                        type="date"
                        value={newObjectiveDeadline}
                        onChange={(e) =>
                        setNewObjectiveDeadline(e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                      
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                        onClick={() => setShowAddObjectiveForm(false)}
                        className="px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        
                                Cancel
                              </button>
                              <button
                        onClick={() => handleAddObjective(plan.id)}
                        className="px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        
                                Add Objective
                              </button>
                            </div>
                          </div>
                        </div>
                }
                      <div className="space-y-4">
                        {plan.objectives.map((objective) =>
                  <div
                    key={objective.id}
                    className={`bg-gray-50 rounded-lg p-4 border ${editingObjective && editingObjective.id === objective.id ? 'border-green-300 ring-1 ring-green-500' : 'border-gray-200'}`}>
                    
                            {editingObjective &&
                    editingObjective.id === objective.id ?
                    <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Title
                                  </label>
                                  <input
                          type="text"
                          value={newObjectiveTitle}
                          onChange={(e) =>
                          setNewObjectiveTitle(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                        
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Description
                                  </label>
                                  <textarea
                          value={newObjectiveDescription}
                          onChange={(e) =>
                          setNewObjectiveDescription(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          rows={3} />
                        
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Deadline
                                  </label>
                                  <input
                          type="date"
                          value={newObjectiveDeadline}
                          onChange={(e) =>
                          setNewObjectiveDeadline(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                        
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <button
                          onClick={() => setEditingObjective(null)}
                          className="px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          
                                    Cancel
                                  </button>
                                  <button
                          onClick={handleSaveObjective}
                          className="px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                          
                                    <SaveIcon className="w-3 h-3 mr-1 inline" />
                                    Save Changes
                                  </button>
                                </div>
                              </div> :

                    <>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-800">
                                      {objective.title}
                                    </h5>
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
                                      {objective.status.
                            charAt(0).
                            toUpperCase() +
                            objective.status.
                            slice(1).
                            replace('-', ' ')}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                                      <span>
                                        Deadline:{' '}
                                        {formatDate(objective.deadline)}
                                        {objective.status === 'completed' &&
                              <span className="ml-2 text-green-600">
                                            (Completed:{' '}
                                            {formatDate(
                                  objective.completionDate
                                )}
                                            )
                                          </span>
                              }
                                      </span>
                                    </div>
                                    {objective.status === 'in-progress' &&
                          <div className="mt-2">
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
                                        <p className="text-xs text-gray-500 mb-1">
                                          Notes:
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {objective.notes}
                                        </p>
                                      </div>
                          }
                                  </div>
                                </div>
                                <div className="mt-3 flex justify-end space-x-2">
                                  <button
                          onClick={() =>
                          handleEditObjective(plan.id, objective.id)
                          }
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                          
                                    <EditIcon className="w-3 h-3 mr-1" />
                                    Edit
                                  </button>
                                  {objective.status !== 'completed' &&
                        <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                                      Mark Complete
                                    </button>
                        }
                                </div>
                              </>
                    }
                          </div>
                  )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-3">
                          Meetings & Check-ins
                        </h4>
                        <div className="space-y-3">
                          {plan.meetings.map((meeting) =>
                    <div
                      key={meeting.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 text-gray-500 mr-1" />
                                    <span className="text-sm font-medium text-gray-700">
                                      {formatDate(meeting.date)}, {meeting.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {meeting.type}
                                  </p>
                                </div>
                                <div>
                                  {meeting.completed ?
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                                      Completed
                                    </span> :

                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      Upcoming
                                    </span>
                          }
                                </div>
                              </div>
                              {meeting.notes &&
                      <div className="mt-2">
                                  <p className="text-xs text-gray-500">
                                    Notes:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {meeting.notes}
                                  </p>
                                </div>
                      }
                              {!meeting.completed &&
                      <div className="mt-2 flex justify-end">
                                  <button className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                                    Prepare Agenda
                                  </button>
                                </div>
                      }
                            </div>
                    )}
                          <button
                      onClick={() => handleScheduleNewMeeting(plan.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full justify-center">
                      
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Schedule New Meeting
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-3">
                          Key Performance Metrics
                        </h4>
                        <div className="space-y-3">
                          {plan.keyMetrics.map((metric, index) =>
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="text-sm font-medium text-gray-700">
                                  {metric.name}
                                </h5>
                                <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(metric.status)}`}>
                          
                                  {metric.status.replace('-', ' ')}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-1" />
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
                          <button
                      onClick={() => handleAddNewMetric(plan.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full justify-center">
                      
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add New Metric
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                  onClick={() => handleExportPlan(plan.id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                        Export Plan
                      </button>
                      <button
                  onClick={() => handleEditPlan(plan.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  
                        <EditIcon className="w-4 h-4 mr-2" />
                        Edit Plan
                      </button>
                    </div>
                  </div>
            }
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center">
                    <ClipboardCheckIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {
                  plan.objectives.filter((o) => o.status === 'completed').
                  length
                  }{' '}
                      of {plan.objectives.length} objectives completed
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-0 flex space-x-3">
                    <button
                  onClick={() => handleViewSMEProfile(plan.smeId)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                      <BuildingIcon className="w-4 h-4 mr-2" />
                      View SME Profile
                    </button>
                    <button
                  onClick={() => handleScheduleMeeting(plan.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ) :

        <div className="text-center py-8">
            <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No development plans found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        }
      </div>
    </div>);

}