import React, { useState } from 'react';
import {
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingIcon,
  PlusIcon,
  PlayIcon,
  LockIcon,
  ArrowRightIcon,
  StarIcon,
  BarChart2Icon,
  UsersIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  FileTextIcon,
  DownloadIcon,
  ExternalLinkIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  TrendingUpIcon,
  XIcon,
  TrashIcon,
  InfoIcon,
  EyeIcon } from
'lucide-react';
export function TrainingHubPage() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignCourse, setAssignCourse] = useState(null);
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);
  const [showMarkCompleteModal, setShowMarkCompleteModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({
    smeId: '',
    dueDate: '',
    notes: ''
  });
  const [completionForm, setCompletionForm] = useState({
    completionDate: '',
    score: '',
    feedback: ''
  });
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Intermediate',
    duration: '',
    modules: [
    {
      title: '',
      duration: '',
      type: 'video'
    }],

    resources: [
    {
      title: '',
      type: 'template',
      format: 'PDF'
    }],

    tags: ''
  });
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);
  const [courseDetailsAssignment, setCourseDetailsAssignment] = useState(null);
  const [courseDetailsActiveSectionIndex, setCourseDetailsActiveSectionIndex] =
  useState(0);
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };
  // Handle module changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value
    };
    setNewCourse({
      ...newCourse,
      modules: updatedModules
    });
  };
  // Add a new module
  const addModule = () => {
    setNewCourse({
      ...newCourse,
      modules: [
      ...newCourse.modules,
      {
        title: '',
        duration: '',
        type: 'video'
      }]

    });
  };
  // Remove a module
  const removeModule = (index) => {
    const updatedModules = newCourse.modules.filter((_, i) => i !== index);
    setNewCourse({
      ...newCourse,
      modules: updatedModules
    });
  };
  // Handle resource changes
  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...newCourse.resources];
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value
    };
    setNewCourse({
      ...newCourse,
      resources: updatedResources
    });
  };
  // Add a new resource
  const addResource = () => {
    setNewCourse({
      ...newCourse,
      resources: [
      ...newCourse.resources,
      {
        title: '',
        type: 'template',
        format: 'PDF'
      }]

    });
  };
  // Remove a resource
  const removeResource = (index) => {
    const updatedResources = newCourse.resources.filter((_, i) => i !== index);
    setNewCourse({
      ...newCourse,
      resources: updatedResources
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process tags from comma-separated string to array
    const processedCourse = {
      ...newCourse,
      tags: newCourse.tags.split(',').map((tag) => tag.trim())
    };
    // Here you would typically send the data to your backend
    console.log('New course data:', processedCourse);
    // Reset form and close modal
    setNewCourse({
      title: '',
      description: '',
      category: '',
      level: 'Intermediate',
      duration: '',
      modules: [
      {
        title: '',
        duration: '',
        type: 'video'
      }],

      resources: [
      {
        title: '',
        type: 'template',
        format: 'PDF'
      }],

      tags: ''
    });
    setShowCreateModal(false);
    // Show success message (in a real app, this would be more sophisticated)
    alert('Course created successfully!');
  };
  // Handle preview course
  const handlePreviewCourse = (course) => {
    setPreviewCourse(course);
    setActiveModuleIndex(0);
    setShowPreviewModal(true);
  };
  // Handle assign course
  const handleAssignCourse = (course) => {
    setAssignCourse(course);
    setAssignmentForm({
      smeId: '',
      dueDate: formatDateForInput(getDefaultDueDate()),
      notes: ''
    });
    setShowAssignModal(true);
  };
  // Format date for input field
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };
  // Get default due date (30 days from now)
  const getDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  };
  // Handle assignment form input change
  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentForm({
      ...assignmentForm,
      [name]: value
    });
  };
  // Handle assignment form submission
  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Assignment data:', {
      courseId: assignCourse.id,
      courseTitle: assignCourse.title,
      ...assignmentForm
    });
    // Close modal
    setShowAssignModal(false);
    // Show success message
    alert(`Course "${assignCourse.title}" successfully assigned to SME!`);
  };
  // Handle new assignment
  const handleNewAssignment = () => {
    setAssignmentForm({
      smeId: '',
      courseId: '',
      dueDate: formatDateForInput(getDefaultDueDate()),
      notes: ''
    });
    setShowNewAssignmentModal(true);
  };
  // Handle edit assignment
  const handleEditAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    setAssignmentForm({
      smeId: assignment.smeId.toString(),
      courseId: assignment.courseId.toString(),
      dueDate: formatDateForInput(new Date(assignment.dueDate)),
      notes: assignment.notes || ''
    });
    setShowEditAssignmentModal(true);
  };
  // Handle mark complete
  const handleMarkComplete = (assignment) => {
    setCurrentAssignment(assignment);
    setCompletionForm({
      completionDate: formatDateForInput(new Date()),
      score: '',
      feedback: ''
    });
    setShowMarkCompleteModal(true);
  };
  // Handle new assignment submission
  const handleNewAssignmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New assignment data:', assignmentForm);
    // Close modal
    setShowNewAssignmentModal(false);
    // Show success message
    alert('Assignment created successfully!');
  };
  // Handle edit assignment submission
  const handleEditAssignmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Updated assignment data:', {
      id: currentAssignment.id,
      ...assignmentForm
    });
    // Close modal
    setShowEditAssignmentModal(false);
    // Show success message
    alert('Assignment updated successfully!');
  };
  // Handle mark complete submission
  const handleMarkCompleteSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Completion data:', {
      id: currentAssignment.id,
      ...completionForm
    });
    // Close modal
    setShowMarkCompleteModal(false);
    // Show success message
    alert('Assignment marked as complete successfully!');
  };
  // Handle completion form input change
  const handleCompletionInputChange = (e) => {
    const { name, value } = e.target;
    setCompletionForm({
      ...completionForm,
      [name]: value
    });
  };
  // Handle view course details
  const handleViewCourseDetails = (assignment) => {
    setCourseDetailsAssignment(assignment);
    setCourseDetailsActiveSectionIndex(0);
    setShowCourseDetailsModal(true);
  };
  // Get course by ID from the assignment
  const getCourseFromAssignment = (assignment) => {
    return courses.find((course) => course.id === assignment.courseId) || null;
  };
  // Mock data for SMEs
  const smes = [
  {
    id: 1,
    name: 'TechSolutions Ltd',
    sector: 'Technology'
  },
  {
    id: 2,
    name: 'HealthPlus',
    sector: 'Healthcare'
  },
  {
    id: 3,
    name: 'EcoFarms',
    sector: 'Agriculture'
  },
  {
    id: 4,
    name: 'AgriTech Solutions',
    sector: 'Agriculture/Technology'
  },
  {
    id: 5,
    name: 'FinServe',
    sector: 'Financial Services'
  }];

  // Mock data for courses
  const courses = [
  {
    id: 1,
    title: 'Product Management Fundamentals',
    description:
    'Learn the core principles of product management, including roadmap development, feature prioritization, and stakeholder management.',
    category: 'Product Development',
    level: 'Intermediate',
    duration: '4 hours',
    modules: [
    {
      id: 1,
      title: 'Product Strategy Fundamentals',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 2,
      title: 'Roadmap Development Workshop',
      duration: '60 minutes',
      type: 'interactive'
    },
    {
      id: 3,
      title: 'Feature Prioritization Frameworks',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 4,
      title: 'Stakeholder Management',
      duration: '30 minutes',
      type: 'video'
    },
    {
      id: 5,
      title: 'Product Management Assessment',
      duration: '30 minutes',
      type: 'assessment'
    }],

    resources: [
    {
      id: 1,
      title: 'Product Roadmap Template',
      type: 'template',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Feature Prioritization Matrix',
      type: 'template',
      format: 'Excel'
    },
    {
      id: 3,
      title: 'Stakeholder Communication Plan',
      type: 'guide',
      format: 'PDF'
    }],

    rating: 4.8,
    reviews: 45,
    completionRate: 92,
    tags: ['Product Management', 'Roadmapping', 'Strategic Planning']
  },
  {
    id: 2,
    title: 'Technical Team Building & Management',
    description:
    'Develop skills for building, leading, and scaling technical teams. Learn hiring strategies, performance management, and team culture development.',
    category: 'Leadership',
    level: 'Advanced',
    duration: '6 hours',
    modules: [
    {
      id: 1,
      title: 'Technical Hiring Strategies',
      duration: '60 minutes',
      type: 'video'
    },
    {
      id: 2,
      title: 'Building Effective Interview Processes',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 3,
      title: 'Onboarding for Technical Teams',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 4,
      title: 'Performance Management & Feedback',
      duration: '60 minutes',
      type: 'video'
    },
    {
      id: 5,
      title: 'Technical Team Culture Workshop',
      duration: '90 minutes',
      type: 'interactive'
    },
    {
      id: 6,
      title: 'Leadership Assessment',
      duration: '30 minutes',
      type: 'assessment'
    }],

    resources: [
    {
      id: 1,
      title: 'Technical Interview Question Bank',
      type: 'template',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Technical Onboarding Checklist',
      type: 'template',
      format: 'PDF'
    },
    {
      id: 3,
      title: 'Performance Review Framework',
      type: 'guide',
      format: 'PDF'
    }],

    rating: 4.9,
    reviews: 38,
    completionRate: 88,
    tags: ['Team Building', 'Technical Leadership', 'Hiring']
  },
  {
    id: 3,
    title: 'Market Entry Strategy for African Markets',
    description:
    'Comprehensive guide to developing and executing market entry strategies for different African regions, with focus on regulatory, cultural, and economic considerations.',
    category: 'Business Strategy',
    level: 'Intermediate',
    duration: '5 hours',
    modules: [
    {
      id: 1,
      title: 'African Market Landscape Overview',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 2,
      title: 'Regulatory & Compliance Considerations',
      duration: '60 minutes',
      type: 'video'
    },
    {
      id: 3,
      title: 'Market Research Methodologies',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 4,
      title: 'Distribution Channel Development',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 5,
      title: 'Pricing Strategy Workshop',
      duration: '60 minutes',
      type: 'interactive'
    },
    {
      id: 6,
      title: 'Market Entry Strategy Assessment',
      duration: '30 minutes',
      type: 'assessment'
    }],

    resources: [
    {
      id: 1,
      title: 'Market Research Template',
      type: 'template',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Regulatory Checklist by Country',
      type: 'guide',
      format: 'PDF'
    },
    {
      id: 3,
      title: 'Distribution Channel Evaluation Framework',
      type: 'template',
      format: 'Excel'
    }],

    rating: 4.7,
    reviews: 32,
    completionRate: 85,
    tags: ['Market Entry', 'Africa', 'Business Development']
  },
  {
    id: 4,
    title: 'Technology Adoption Strategies for Rural Communities',
    description:
    'Learn effective approaches to introduce and scale technology solutions in rural and underserved communities, with a focus on training, support, and sustainable adoption.',
    category: 'Technology',
    level: 'Beginner',
    duration: '4.5 hours',
    modules: [
    {
      id: 1,
      title: 'Understanding Rural Tech Adoption Challenges',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 2,
      title: 'User-Centered Design for Rural Users',
      duration: '60 minutes',
      type: 'video'
    },
    {
      id: 3,
      title: 'Training Program Development',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 4,
      title: 'Support System Design',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 5,
      title: 'Measuring Adoption & Impact',
      duration: '30 minutes',
      type: 'video'
    },
    {
      id: 6,
      title: 'Technology Adoption Assessment',
      duration: '30 minutes',
      type: 'assessment'
    }],

    resources: [
    {
      id: 1,
      title: 'Training Material Templates',
      type: 'template',
      format: 'PPT'
    },
    {
      id: 2,
      title: 'Support System Design Framework',
      type: 'guide',
      format: 'PDF'
    },
    {
      id: 3,
      title: 'Adoption Metrics Dashboard',
      type: 'template',
      format: 'Excel'
    }],

    rating: 4.9,
    reviews: 28,
    completionRate: 94,
    tags: ['Rural Development', 'Technology Adoption', 'Training']
  },
  {
    id: 5,
    title: 'Sustainable Revenue Models for Social Enterprises',
    description:
    'Explore various revenue models for social enterprises, focusing on balancing social impact with financial sustainability.',
    category: 'Finance',
    level: 'Intermediate',
    duration: '5 hours',
    modules: [
    {
      id: 1,
      title: 'Revenue Model Fundamentals',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 2,
      title: 'Pricing Strategy for Social Impact',
      duration: '60 minutes',
      type: 'video'
    },
    {
      id: 3,
      title: 'Freemium & Tiered Pricing Models',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 4,
      title: 'Cross-Subsidization Strategies',
      duration: '45 minutes',
      type: 'video'
    },
    {
      id: 5,
      title: 'Revenue Model Workshop',
      duration: '60 minutes',
      type: 'interactive'
    },
    {
      id: 6,
      title: 'Financial Sustainability Assessment',
      duration: '30 minutes',
      type: 'assessment'
    }],

    resources: [
    {
      id: 1,
      title: 'Revenue Model Canvas',
      type: 'template',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Pricing Strategy Calculator',
      type: 'template',
      format: 'Excel'
    },
    {
      id: 3,
      title: 'Financial Sustainability Metrics Guide',
      type: 'guide',
      format: 'PDF'
    }],

    rating: 4.8,
    reviews: 35,
    completionRate: 89,
    tags: ['Revenue Models', 'Pricing Strategy', 'Financial Sustainability']
  }];

  // Mock data for course assignments
  const courseAssignments = [
  {
    id: 1,
    courseId: 1,
    courseTitle: 'Product Management Fundamentals',
    smeId: 1,
    smeName: 'TechSolutions Ltd',
    assignedDate: '2023-10-14',
    dueDate: '2023-11-14',
    status: 'in-progress',
    progress: 60,
    completedModules: 3,
    totalModules: 5,
    lastActivity: '2023-10-20',
    notes:
    'Assigned to help with product roadmap development. Focus on modules 2 and 3.'
  },
  {
    id: 2,
    courseId: 4,
    courseTitle: 'Technology Adoption Strategies for Rural Communities',
    smeId: 4,
    smeName: 'AgriTech Solutions',
    assignedDate: '2023-08-15',
    dueDate: '2023-09-15',
    status: 'completed',
    progress: 100,
    completedModules: 6,
    totalModules: 6,
    lastActivity: '2023-09-12',
    completionDate: '2023-09-12',
    assessment: {
      score: 92,
      feedback:
      'Excellent understanding of technology adoption challenges and strategies. Successfully applied concepts to farmer onboarding process.'
    },
    notes:
    'Assigned to support farmer technology adoption program development.'
  },
  {
    id: 3,
    courseId: 3,
    courseTitle: 'Market Entry Strategy for African Markets',
    smeId: 1,
    smeName: 'TechSolutions Ltd',
    assignedDate: '2023-10-01',
    dueDate: '2023-11-01',
    status: 'in-progress',
    progress: 40,
    completedModules: 2,
    totalModules: 6,
    lastActivity: '2023-10-18',
    notes: 'Assigned to support Kenya market expansion strategy.'
  },
  {
    id: 4,
    courseId: 5,
    courseTitle: 'Sustainable Revenue Models for Social Enterprises',
    smeId: 4,
    smeName: 'AgriTech Solutions',
    assignedDate: '2023-09-20',
    dueDate: '2023-10-20',
    status: 'in-progress',
    progress: 80,
    completedModules: 5,
    totalModules: 6,
    lastActivity: '2023-10-15',
    notes: 'Assigned to help with revenue model refinement.'
  }];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory =
    categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  // Filter course assignments based on search
  const filteredAssignments = courseAssignments.filter((assignment) => {
    return (
      assignment.courseTitle.
      toLowerCase().
      includes(searchQuery.toLowerCase()) ||
      assignment.smeName.toLowerCase().includes(searchQuery.toLowerCase()));

  });
  // Get unique categories for filter
  const categories = ['all', ...new Set(courses.map((c) => c.category))];
  // Get unique levels for filter
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  // Toggle expanded state for course
  const toggleExpandedCourse = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };
  // Toggle expanded state for assignment
  const toggleExpandedAssignment = (id) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
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
  // Get module icon
  const getModuleIcon = (type) => {
    switch (type) {
      case 'video':
        return <PlayIcon className="w-3 h-3 text-blue-600" />;
      case 'interactive':
        return <UsersIcon className="w-3 h-3 text-purple-600" />;
      case 'assessment':
        return <ClipboardCheckIcon className="w-3 h-3 text-green-600" />;
      default:
        return <BookOpenIcon className="w-3 h-3 text-gray-600" />;
    }
  };
  // Get resource icon
  const getResourceIcon = (format) => {
    switch (format) {
      case 'PDF':
        return <FileTextIcon className="w-3 h-3 text-red-600" />;
      case 'Excel':
        return <BarChart2Icon className="w-3 h-3 text-green-600" />;
      case 'PPT':
        return <FileTextIcon className="w-3 h-3 text-orange-600" />;
      default:
        return <FileTextIcon className="w-3 h-3 text-gray-600" />;
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Training Hub</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Custom Course
        </button>
      </div>
      {/* Create Custom Course Modal */}
      {showCreateModal &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Create Custom Course
                </h3>
                <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <form
              onSubmit={handleSubmit}
              className="px-6 py-4 max-h-[80vh] overflow-y-auto">
              
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Basic Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700">
                        
                          Course Title <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        value={newCourse.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      
                      </div>
                      <div>
                        <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700">
                        
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                        id="description"
                        name="description"
                        value={newCourse.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700">
                          
                            Category <span className="text-red-500">*</span>
                          </label>
                          <input
                          type="text"
                          id="category"
                          name="category"
                          value={newCourse.category}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Leadership"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                        
                        </div>
                        <div>
                          <label
                          htmlFor="level"
                          className="block text-sm font-medium text-gray-700">
                          
                            Level <span className="text-red-500">*</span>
                          </label>
                          <select
                          id="level"
                          name="level"
                          value={newCourse.level}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                          
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label
                          htmlFor="duration"
                          className="block text-sm font-medium text-gray-700">
                          
                            Duration <span className="text-red-500">*</span>
                          </label>
                          <input
                          type="text"
                          id="duration"
                          name="duration"
                          value={newCourse.duration}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 4 hours"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                        
                        </div>
                      </div>
                      <div>
                        <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700">
                        
                          Tags (comma separated)
                        </label>
                        <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={newCourse.tags}
                        onChange={handleInputChange}
                        placeholder="e.g. Leadership, Team Building, Management"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      
                      </div>
                    </div>
                  </div>
                  {/* Course Modules */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Course Modules
                      </h4>
                      <button
                      type="button"
                      onClick={addModule}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                      
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Module
                      </button>
                    </div>
                    <div className="space-y-3">
                      {newCourse.modules.map((module, index) =>
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="text-sm font-medium text-gray-700">
                              Module {index + 1}
                            </h5>
                            {newCourse.modules.length > 1 &&
                        <button
                          type="button"
                          onClick={() => removeModule(index)}
                          className="text-red-500 hover:text-red-700">
                          
                                <TrashIcon className="w-4 h-4" />
                              </button>
                        }
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <input
                            type="text"
                            value={module.title}
                            onChange={(e) =>
                            handleModuleChange(
                              index,
                              'title',
                              e.target.value
                            )
                            }
                            required
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                          
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Duration{' '}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                              type="text"
                              value={module.duration}
                              onChange={(e) =>
                              handleModuleChange(
                                index,
                                'duration',
                                e.target.value
                              )
                              }
                              required
                              placeholder="e.g. 45 minutes"
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                            
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Type <span className="text-red-500">*</span>
                                </label>
                                <select
                              value={module.type}
                              onChange={(e) =>
                              handleModuleChange(
                                index,
                                'type',
                                e.target.value
                              )
                              }
                              required
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                              
                                  <option value="video">Video</option>
                                  <option value="interactive">
                                    Interactive
                                  </option>
                                  <option value="assessment">Assessment</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                  {/* Course Resources */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        Course Resources
                      </h4>
                      <button
                      type="button"
                      onClick={addResource}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200">
                      
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Resource
                      </button>
                    </div>
                    <div className="space-y-3">
                      {newCourse.resources.map((resource, index) =>
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="text-sm font-medium text-gray-700">
                              Resource {index + 1}
                            </h5>
                            {newCourse.resources.length > 1 &&
                        <button
                          type="button"
                          onClick={() => removeResource(index)}
                          className="text-red-500 hover:text-red-700">
                          
                                <TrashIcon className="w-4 h-4" />
                              </button>
                        }
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <input
                            type="text"
                            value={resource.title}
                            onChange={(e) =>
                            handleResourceChange(
                              index,
                              'title',
                              e.target.value
                            )
                            }
                            required
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                          
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Type <span className="text-red-500">*</span>
                                </label>
                                <select
                              value={resource.type}
                              onChange={(e) =>
                              handleResourceChange(
                                index,
                                'type',
                                e.target.value
                              )
                              }
                              required
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                              
                                  <option value="template">Template</option>
                                  <option value="guide">Guide</option>
                                  <option value="case study">Case Study</option>
                                  <option value="worksheet">Worksheet</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Format <span className="text-red-500">*</span>
                                </label>
                                <select
                              value={resource.format}
                              onChange={(e) =>
                              handleResourceChange(
                                index,
                                'format',
                                e.target.value
                              )
                              }
                              required
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                              
                                  <option value="PDF">PDF</option>
                                  <option value="Excel">Excel</option>
                                  <option value="PPT">PPT</option>
                                  <option value="Word">Word</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {/* Preview Course Modal */}
      {showPreviewModal && previewCourse &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {previewCourse.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                      {previewCourse.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      {previewCourse.level}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {previewCourse.duration}
                    </span>
                  </div>
                </div>
                <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 border-r border-gray-200 pr-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Course Modules
                    </h4>
                    <div className="space-y-2">
                      {previewCourse.modules.map((module, index) =>
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg cursor-pointer ${activeModuleIndex === index ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200 hover:border-green-200'}`}
                      onClick={() => setActiveModuleIndex(index)}>
                      
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getModuleIcon(module.type)}
                              <span className="ml-2 text-sm font-medium text-gray-800">
                                {index + 1}. {module.title}
                              </span>
                            </div>
                            {activeModuleIndex === index &&
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        }
                          </div>
                          <div className="mt-1 flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {module.duration}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {module.type.charAt(0).toUpperCase() +
                          module.type.slice(1)}
                            </span>
                          </div>
                        </div>
                    )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 mt-6">
                      Course Resources
                    </h4>
                    <div className="space-y-2">
                      {previewCourse.resources.map((resource) =>
                    <div
                      key={resource.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {getResourceIcon(resource.format)}
                              <span className="ml-2 text-sm text-gray-800">
                                {resource.title}
                              </span>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {resource.format}
                            </span>
                          </div>
                          <div className="mt-1 flex justify-end">
                            <button className="text-xs text-green-600 hover:text-green-800 flex items-center">
                              <DownloadIcon className="w-3 h-3 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    {previewCourse.modules[activeModuleIndex] &&
                  <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {previewCourse.modules[activeModuleIndex].title}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {previewCourse.modules[activeModuleIndex].duration}
                          </span>
                        </div>
                        {/* Module content preview based on type */}
                        {previewCourse.modules[activeModuleIndex].type ===
                    'video' &&
                    <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                            <div className="text-center">
                              <div className="bg-white/20 rounded-full p-4 inline-flex mb-2">
                                <PlayIcon className="w-12 h-12 text-white" />
                              </div>
                              <p className="text-white text-sm">
                                Video Preview
                              </p>
                            </div>
                          </div>
                    }
                        {previewCourse.modules[activeModuleIndex].type ===
                    'interactive' &&
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
                            <div className="text-center">
                              <UsersIcon className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                              <h4 className="text-lg font-medium text-purple-800 mb-2">
                                Interactive Workshop
                              </h4>
                              <p className="text-purple-700 mb-4">
                                This module contains interactive elements that
                                will engage SMEs in practical exercises.
                              </p>
                              <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <p className="text-sm text-gray-600">
                                  Workshop activities include:
                                </p>
                                <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
                                  <li>Group discussions</li>
                                  <li>Case study analysis</li>
                                  <li>Role-playing exercises</li>
                                  <li>Real-world problem solving</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                    }
                        {previewCourse.modules[activeModuleIndex].type ===
                    'assessment' &&
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                            <div className="text-center">
                              <ClipboardCheckIcon className="w-12 h-12 text-green-600 mx-auto mb-2" />
                              <h4 className="text-lg font-medium text-green-800 mb-2">
                                Assessment Module
                              </h4>
                              <p className="text-green-700 mb-4">
                                This module evaluates understanding of the
                                course material through various assessment
                                methods.
                              </p>
                              <div className="bg-white rounded-lg p-4 border border-green-200">
                                <p className="text-sm text-gray-600">
                                  Assessment includes:
                                </p>
                                <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
                                  <li>Multiple choice questions</li>
                                  <li>Short answer responses</li>
                                  <li>Practical application tasks</li>
                                  <li>Case study analysis</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                    }
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Module Description
                          </h4>
                          <p className="text-sm text-gray-600">
                            {previewCourse.modules[activeModuleIndex].type ===
                        'video' &&
                        `This video module covers key concepts and principles related to ${previewCourse.modules[activeModuleIndex].title.toLowerCase()}. The content is designed to provide SMEs with practical knowledge they can apply immediately to their business operations.`}
                            {previewCourse.modules[activeModuleIndex].type ===
                        'interactive' &&
                        `This interactive workshop guides SMEs through hands-on exercises related to ${previewCourse.modules[activeModuleIndex].title.toLowerCase()}. Participants will engage in collaborative activities designed to reinforce learning and develop practical skills.`}
                            {previewCourse.modules[activeModuleIndex].type ===
                        'assessment' &&
                        `This assessment evaluates understanding of concepts covered in previous modules. It includes a mix of question types designed to test both theoretical knowledge and practical application of ${previewCourse.title.toLowerCase()} principles.`}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button
                        onClick={() =>
                        setActiveModuleIndex(
                          Math.max(0, activeModuleIndex - 1)
                        )
                        }
                        disabled={activeModuleIndex === 0}
                        className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md ${activeModuleIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}>
                        
                            <ArrowRightIcon className="w-4 h-4 mr-2 transform rotate-180" />
                            Previous Module
                          </button>
                          <button
                        onClick={() =>
                        setActiveModuleIndex(
                          Math.min(
                            previewCourse.modules.length - 1,
                            activeModuleIndex + 1
                          )
                        )
                        }
                        disabled={
                        activeModuleIndex ===
                        previewCourse.modules.length - 1
                        }
                        className={`inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md ${activeModuleIndex === previewCourse.modules.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}>
                        
                            Next Module
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                      </div>
                  }
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {previewCourse.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({previewCourse.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {previewCourse.completionRate}% completion rate
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                  onClick={() => setShowPreviewModal(false)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Close Preview
                  </button>
                  <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleAssignCourse(previewCourse);
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Assign to SME
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Assign to SME Modal */}
      {showAssignModal && assignCourse &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Assign Course to SME
                </h3>
                <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAssignmentSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center">
                        <BookOpenIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-800">
                          {assignCourse.title}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs text-gray-500">
                          {assignCourse.duration} • {assignCourse.level} •{' '}
                          {assignCourse.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                    htmlFor="smeId"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Select SME <span className="text-red-500">*</span>
                    </label>
                    <select
                    id="smeId"
                    name="smeId"
                    value={assignmentForm.smeId}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    
                      <option value="">Select an SME</option>
                      {smes.map((sme) =>
                    <option key={sme.id} value={sme.id}>
                          {sme.name} ({sme.sector})
                        </option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={assignmentForm.dueDate}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Assignment Notes
                    </label>
                    <textarea
                    id="notes"
                    name="notes"
                    value={assignmentForm.notes}
                    onChange={handleAssignmentInputChange}
                    rows={3}
                    placeholder="Add any specific instructions or focus areas for this assignment..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Confirm Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {/* New Assignment Modal */}
      {showNewAssignmentModal &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Create New Assignment
                </h3>
                <button
                onClick={() => setShowNewAssignmentModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleNewAssignmentSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label
                    htmlFor="courseId"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Select Course <span className="text-red-500">*</span>
                    </label>
                    <select
                    id="courseId"
                    name="courseId"
                    value={assignmentForm.courseId}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    
                      <option value="">Select a course</option>
                      {courses.map((course) =>
                    <option key={course.id} value={course.id}>
                          {course.title} ({course.level}, {course.duration})
                        </option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label
                    htmlFor="smeId"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Select SME <span className="text-red-500">*</span>
                    </label>
                    <select
                    id="smeId"
                    name="smeId"
                    value={assignmentForm.smeId}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    
                      <option value="">Select an SME</option>
                      {smes.map((sme) =>
                    <option key={sme.id} value={sme.id}>
                          {sme.name} ({sme.sector})
                        </option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={assignmentForm.dueDate}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Assignment Notes
                    </label>
                    <textarea
                    id="notes"
                    name="notes"
                    value={assignmentForm.notes}
                    onChange={handleAssignmentInputChange}
                    rows={3}
                    placeholder="Add any specific instructions or focus areas for this assignment..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Create Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {/* Edit Assignment Modal */}
      {showEditAssignmentModal && currentAssignment &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Edit Assignment
                </h3>
                <button
                onClick={() => setShowEditAssignmentModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditAssignmentSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center">
                        <BookOpenIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-800">
                          {currentAssignment.courseTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center">
                        <BuildingIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-800">
                          {currentAssignment.smeName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assignment Status
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center">
                        {currentAssignment.status === 'completed' ?
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> :

                      <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
                      }
                        <span className="text-sm font-medium text-gray-800">
                          {currentAssignment.status === 'completed' ?
                        'Completed' :
                        'In Progress'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">
                            Progress:
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            {currentAssignment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                          className={`h-2 rounded-full ${currentAssignment.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                          style={{
                            width: `${currentAssignment.progress}%`
                          }}>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={assignmentForm.dueDate}
                    onChange={handleAssignmentInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Assignment Notes
                    </label>
                    <textarea
                    id="notes"
                    name="notes"
                    value={assignmentForm.notes}
                    onChange={handleAssignmentInputChange}
                    rows={3}
                    placeholder="Add any specific instructions or focus areas for this assignment..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowEditAssignmentModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {/* Mark Complete Modal */}
      {showMarkCompleteModal && currentAssignment &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Mark Assignment as Complete
                </h3>
                <button
                onClick={() => setShowMarkCompleteModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleMarkCompleteSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-4">
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-800">
                            Marking as Complete
                          </h4>
                          <p className="mt-1 text-sm text-green-700">
                            You are marking the following assignment as
                            complete:
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-800">
                            {currentAssignment.courseTitle}
                          </p>
                          <p className="text-sm text-gray-600">
                            Assigned to: {currentAssignment.smeName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                    htmlFor="completionDate"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Completion Date <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="date"
                    id="completionDate"
                    name="completionDate"
                    value={completionForm.completionDate}
                    onChange={handleCompletionInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="score"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Assessment Score (%){' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="number"
                    id="score"
                    name="score"
                    min="0"
                    max="100"
                    value={completionForm.score}
                    onChange={handleCompletionInputChange}
                    required
                    placeholder="e.g. 85"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                  <div>
                    <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    
                      Assessment Feedback{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                    id="feedback"
                    name="feedback"
                    value={completionForm.feedback}
                    onChange={handleCompletionInputChange}
                    required
                    rows={4}
                    placeholder="Provide feedback on the SME's performance and understanding..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                  
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                  type="button"
                  onClick={() => setShowMarkCompleteModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Confirm Completion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {/* Course Details Modal */}
      {showCourseDetailsModal && courseDetailsAssignment &&
      <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true">
            
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {courseDetailsAssignment.courseTitle} - Course Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Assigned to: {courseDetailsAssignment.smeName}
                  </p>
                </div>
                <button
                onClick={() => setShowCourseDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {/* Assignment status overview */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Assignment Status
                      </p>
                      <div className="flex items-center">
                        {courseDetailsAssignment.status === 'completed' ?
                      <>
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1.5" />
                            <span className="text-sm font-medium text-green-700">
                              Completed
                            </span>
                          </> :

                      <>
                            <ClockIcon className="w-4 h-4 text-blue-500 mr-1.5" />
                            <span className="text-sm font-medium text-blue-700">
                              In Progress
                            </span>
                          </>
                      }
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Progress</p>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {courseDetailsAssignment.completedModules} of{' '}
                            {courseDetailsAssignment.totalModules} modules
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {courseDetailsAssignment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                          className={`h-2 rounded-full ${courseDetailsAssignment.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                          style={{
                            width: `${courseDetailsAssignment.progress}%`
                          }}>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Timeline</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-500">Assigned:</p>
                          <p className="text-sm text-gray-700">
                            {formatDate(courseDetailsAssignment.assignedDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Due:</p>
                          <p className="text-sm text-gray-700">
                            {formatDate(courseDetailsAssignment.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {courseDetailsAssignment.status === 'completed' &&
                courseDetailsAssignment.assessment &&
                <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-start">
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Assessment Results
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${courseDetailsAssignment.assessment.score}%`
                            }}>
                          </div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {courseDetailsAssignment.assessment.score}%
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {courseDetailsAssignment.assessment.feedback}
                            </p>
                          </div>
                        </div>
                      </div>
                }
                </div>
                {/* Course navigation tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 ${courseDetailsActiveSectionIndex === 0 ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setCourseDetailsActiveSectionIndex(0)}>
                    
                      Overview
                    </button>
                    <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 ${courseDetailsActiveSectionIndex === 1 ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setCourseDetailsActiveSectionIndex(1)}>
                    
                      Modules
                    </button>
                    <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 ${courseDetailsActiveSectionIndex === 2 ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setCourseDetailsActiveSectionIndex(2)}>
                    
                      Resources
                    </button>
                    {courseDetailsAssignment.status === 'completed' &&
                  <button
                    className={`py-2 px-1 text-sm font-medium border-b-2 ${courseDetailsActiveSectionIndex === 3 ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setCourseDetailsActiveSectionIndex(3)}>
                    
                        Assessment
                      </button>
                  }
                  </nav>
                </div>
                {/* Content sections */}
                <div>
                  {/* Overview section */}
                  {courseDetailsActiveSectionIndex === 0 &&
                <div>
                      {getCourseFromAssignment(courseDetailsAssignment) &&
                  <>
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            {
                      getCourseFromAssignment(courseDetailsAssignment).
                      title
                      }
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {
                        getCourseFromAssignment(courseDetailsAssignment).
                        category
                        }
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {
                        getCourseFromAssignment(courseDetailsAssignment).
                        level
                        }
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {
                        getCourseFromAssignment(courseDetailsAssignment).
                        duration
                        }
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <StarIcon className="w-3 h-3 mr-1" />
                              {
                        getCourseFromAssignment(courseDetailsAssignment).
                        rating
                        }{' '}
                              (
                              {
                        getCourseFromAssignment(courseDetailsAssignment).
                        reviews
                        }{' '}
                              reviews)
                            </span>
                          </div>
                          <p className="text-gray-600 mb-6">
                            {
                      getCourseFromAssignment(courseDetailsAssignment).
                      description
                      }
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Course Statistics
                              </h5>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">
                                      Completion Rate:
                                    </span>
                                    <span className="text-sm font-medium text-gray-800">
                                      {
                                getCourseFromAssignment(
                                  courseDetailsAssignment
                                ).completionRate
                                }
                                      %
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${getCourseFromAssignment(courseDetailsAssignment).completionRate}%`
                                }}>
                              </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Total Modules
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                      {
                                getCourseFromAssignment(
                                  courseDetailsAssignment
                                ).modules.length
                                }
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Total Resources
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                      {
                                getCourseFromAssignment(
                                  courseDetailsAssignment
                                ).resources.length
                                }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                SME Progress
                              </h5>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <BuildingIcon className="w-4 h-4 text-gray-500 mr-1.5" />
                                    <span className="text-sm text-gray-800">
                                      {courseDetailsAssignment.smeName}
                                    </span>
                                  </div>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {courseDetailsAssignment.status ===
                              'completed' ?
                              'Completed' :
                              'In Progress'}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500">
                                      Module Completion:
                                    </span>
                                    <span className="text-xs text-gray-700">
                                      {courseDetailsAssignment.completedModules}
                                      /{courseDetailsAssignment.totalModules}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${courseDetailsAssignment.completedModules / courseDetailsAssignment.totalModules * 100}%`
                                }}>
                              </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Last Activity
                                  </p>
                                  <p className="text-sm text-gray-800">
                                    {formatDate(
                                courseDetailsAssignment.lastActivity
                              )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                  }
                      {!getCourseFromAssignment(courseDetailsAssignment) &&
                  <div className="text-center py-8">
                          <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            Course details not found
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            The detailed information for this course could not
                            be retrieved.
                          </p>
                        </div>
                  }
                    </div>
                }
                  {/* Modules section */}
                  {courseDetailsActiveSectionIndex === 1 &&
                <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Course Modules
                      </h4>
                      {getCourseFromAssignment(courseDetailsAssignment) ?
                  <div className="space-y-4">
                          {getCourseFromAssignment(
                      courseDetailsAssignment
                    ).modules.map((module, index) => {
                      // Determine module status based on progress
                      const isCompleted =
                      courseDetailsAssignment.progress >=
                      (index + 1) /
                      getCourseFromAssignment(courseDetailsAssignment).
                      modules.length *
                      100;
                      const isLocked =
                      courseDetailsAssignment.progress <
                      index /
                      getCourseFromAssignment(courseDetailsAssignment).
                      modules.length *
                      100;
                      return (
                        <div
                          key={module.id}
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          
                                <div className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3 text-sm font-medium text-gray-800">
                                        {index + 1}
                                      </div>
                                      <div>
                                        <h5 className="text-sm font-medium text-gray-800">
                                          {module.title}
                                        </h5>
                                        <div className="flex items-center mt-1">
                                          {getModuleIcon(module.type)}
                                          <span className="text-xs text-gray-500 ml-1">
                                            {module.type.
                                      charAt(0).
                                      toUpperCase() +
                                      module.type.slice(1)}{' '}
                                            • {module.duration}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      {isCompleted ?
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                                          Completed
                                        </span> :
                                isLocked ?
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                          <LockIcon className="w-3 h-3 mr-1" />
                                          Locked
                                        </span> :

                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                          <ClockIcon className="w-3 h-3 mr-1" />
                                          In Progress
                                        </span>
                                }
                                    </div>
                                  </div>
                                  {module.type === 'assessment' &&
                            courseDetailsAssignment.status ===
                            'completed' &&
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm text-gray-600">
                                            Assessment Score:
                                          </span>
                                          <span className="text-sm font-medium text-gray-800">
                                            {courseDetailsAssignment.assessment?.
                                  score || 'N/A'}
                                            %
                                          </span>
                                        </div>
                                      </div>
                            }
                                </div>
                              </div>);

                    })}
                        </div> :

                  <div className="text-center py-8">
                          <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            Module information not available
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            The module details for this course could not be
                            retrieved.
                          </p>
                        </div>
                  }
                    </div>
                }
                  {/* Resources section */}
                  {courseDetailsActiveSectionIndex === 2 &&
                <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Course Resources
                      </h4>
                      {getCourseFromAssignment(courseDetailsAssignment) ?
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {getCourseFromAssignment(
                      courseDetailsAssignment
                    ).resources.map((resource) =>
                    <div
                      key={resource.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      
                              <div className="flex items-start">
                                {getResourceIcon(resource.format)}
                                <div className="ml-3 flex-1">
                                  <h5 className="text-sm font-medium text-gray-800">
                                    {resource.title}
                                  </h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center">
                                      <span className="text-xs text-gray-500 mr-2">
                                        {resource.type} • {resource.format}
                                      </span>
                                    </div>
                                    <button className="inline-flex items-center text-xs text-green-600 hover:text-green-800">
                                      <DownloadIcon className="w-3 h-3 mr-1" />
                                      Download
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                    )}
                        </div> :

                  <div className="text-center py-8">
                          <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            Resource information not available
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            The resource details for this course could not be
                            retrieved.
                          </p>
                        </div>
                  }
                    </div>
                }
                  {/* Assessment section */}
                  {courseDetailsActiveSectionIndex === 3 &&
                courseDetailsAssignment.status === 'completed' &&
                <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Assessment Results
                        </h4>
                        {courseDetailsAssignment.assessment ?
                  <div>
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="text-lg font-medium text-green-800">
                                  {courseDetailsAssignment.assessment.score}%
                                </h5>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                                  Passed
                                </span>
                              </div>
                              <div className="w-full bg-white rounded-full h-4 mb-4">
                                <div
                          className="bg-green-600 h-4 rounded-full"
                          style={{
                            width: `${courseDetailsAssignment.assessment.score}%`
                          }}>
                        </div>
                              </div>
                              <div>
                                <h6 className="text-sm font-medium text-green-800 mb-2">
                                  Feedback:
                                </h6>
                                <p className="text-sm text-green-700">
                                  {courseDetailsAssignment.assessment.feedback}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-3">
                                Assessment Details
                              </h5>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Completion Date
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                      {formatDate(
                                courseDetailsAssignment.completionDate
                              )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Time Taken
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                      35 minutes
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Questions Answered
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                      15/15
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Certificate
                                    </p>
                                    <button className="mt-1 text-sm text-green-600 hover:text-green-800 inline-flex items-center">
                                      <DownloadIcon className="w-3 h-3 mr-1" />
                                      Download
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> :

                  <div className="text-center py-8">
                            <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              Assessment details not available
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              The detailed assessment results could not be
                              retrieved.
                            </p>
                          </div>
                  }
                      </div>
                }
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                onClick={() => setShowCourseDetailsModal(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                
                  Close
                </button>
                {courseDetailsAssignment.status !== 'completed' &&
              <button
                onClick={() => {
                  setShowCourseDetailsModal(false);
                  handleMarkComplete(courseDetailsAssignment);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </button>
              }
              </div>
            </div>
          </div>
        </div>
      }
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'catalog' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('catalog')}>
              
              Course Catalog
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'assignments' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('assignments')}>
              
              SME Assignments
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('analytics')}>
              
              Training Analytics
            </button>
          </nav>
        </div>
        {/* Course Catalog Tab */}
        {activeTab === 'catalog' &&
        <div className="p-4">
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                type="text"
                placeholder="Search courses by title, description, or tags..."
                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none"
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
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}>
                
                  {categories.map((category) =>
                <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                )}
                </select>
                <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}>
                
                  {levels.map((level) =>
                <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                )}
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
                  setCategoryFilter('all');
                  setLevelFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-green-600 hover:text-green-800">
                
                    Reset All Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none">
                      <option value="any">Any Duration</option>
                      <option value="short">Short ( 3 hours)</option>
                      <option value="medium">Medium (3-5 hours)</option>
                      <option value="long">Long ({'>'} 5 hours)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none">
                      <option value="any">Any Rating</option>
                      <option value="4.5">4.5+ stars</option>
                      <option value="4.0">4.0+ stars</option>
                      <option value="3.5">3.5+ stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sort By
                    </label>
                    <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none">
                      <option value="relevance">Relevance</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                </div>
              </div>
          }
            <div className="space-y-4">
              {filteredCourses.length > 0 ?
            filteredCourses.map((course) =>
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
              
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-800 mr-2">
                              {course.title}
                            </h3>
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-medium text-gray-700 ml-1">
                                {course.rating}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                ({course.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                              {course.category}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                              {course.level}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {course.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {course.tags.map((tag, index) =>
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                        
                                #{tag}
                              </span>
                      )}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                          <button
                      onClick={() => toggleExpandedCourse(course.id)}
                      className="ml-4 text-gray-400 hover:text-gray-500">
                      
                            <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${expandedCourse === course.id ? 'transform rotate-180' : ''}`} />
                      
                          </button>
                        </div>
                      </div>
                      {expandedCourse === course.id &&
                <div className="mt-6 border-t border-gray-200 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-3">
                                Course Modules
                              </h4>
                              <div className="space-y-2">
                                {course.modules.map((module) =>
                        <div
                          key={module.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        {getModuleIcon(module.type)}
                                        <span className="ml-2 text-sm text-gray-800">
                                          {module.title}
                                        </span>
                                      </div>
                                      <div className="flex items-center">
                                        <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                                        <span className="text-xs text-gray-500">
                                          {module.duration}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-1 flex justify-between items-center">
                                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                        {module.type.charAt(0).toUpperCase() +
                              module.type.slice(1)}
                                      </span>
                                      <button className="text-xs text-green-600 hover:text-green-800">
                                        Preview
                                      </button>
                                    </div>
                                  </div>
                        )}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-800 mb-3">
                                Course Resources
                              </h4>
                              <div className="space-y-2">
                                {course.resources.map((resource) =>
                        <div
                          key={resource.id}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        {getResourceIcon(resource.format)}
                                        <span className="ml-2 text-sm text-gray-800">
                                          {resource.title}
                                        </span>
                                      </div>
                                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                        {resource.format}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex justify-end">
                                      <button className="text-xs text-green-600 hover:text-green-800 flex items-center">
                                        <DownloadIcon className="w-3 h-3 mr-1" />
                                        Download
                                      </button>
                                    </div>
                                  </div>
                        )}
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-800 mb-3">
                                  Course Statistics
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">
                                      Completion Rate:
                                    </span>
                                    <span className="text-sm font-medium text-gray-800">
                                      {course.completionRate}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${course.completionRate}%`
                              }}>
                            </div>
                                  </div>
                                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center">
                                      <UsersIcon className="w-4 h-4 text-gray-400 mr-1" />
                                      <span className="text-gray-600">
                                        156 SMEs enrolled
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                                      <span className="text-gray-600">
                                        Last updated: 1 month ago
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                }
                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center">
                          <BookOpenIcon className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {course.modules.length} modules, including{' '}
                            {
                      course.modules.filter(
                        (m) => m.type === 'interactive'
                      ).length
                      }{' '}
                            interactive sessions
                          </span>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-3">
                          <button
                      onClick={() => handlePreviewCourse(course)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      
                            <ExternalLinkIcon className="w-4 h-4 mr-2" />
                            Preview Course
                          </button>
                          <button
                      onClick={() => handleAssignCourse(course)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Assign to SME
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
            ) :

            <div className="text-center py-8">
                  <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No courses found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
            }
            </div>
          </div>
        }
        {/* SME Assignments Tab */}
        {activeTab === 'assignments' &&
        <div className="p-4">
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                type="text"
                placeholder="Search assignments by course or SME..."
                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              
              </div>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none">
                  <option value="all">All Status</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not-started">Not Started</option>
                </select>
                <button
                onClick={handleNewAssignment}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Assignment
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredAssignments.length > 0 ?
            filteredAssignments.map((assignment) =>
            <div
              key={assignment.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
              
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-800">
                              {assignment.courseTitle}
                            </h3>
                            {assignment.status === 'completed' ?
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                Completed
                              </span> :

                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                In Progress
                              </span>
                      }
                          </div>
                          <div className="flex items-center mt-1">
                            <BuildingIcon className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              Assigned to: {assignment.smeName}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              Due: {formatDate(assignment.dueDate)}
                            </span>
                            <button
                        onClick={() =>
                        toggleExpandedAssignment(assignment.id)
                        }
                        className="ml-4 text-gray-400 hover:text-gray-500">
                        
                              <ChevronDownIcon
                          className={`w-5 h-5 transition-transform ${expandedAssignment === assignment.id ? 'transform rotate-180' : ''}`} />
                        
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <BookOpenIcon className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              {assignment.completedModules} of{' '}
                              {assignment.totalModules} modules completed
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {assignment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                      className={`h-2.5 rounded-full ${assignment.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                      style={{
                        width: `${assignment.progress}%`
                      }}>
                    </div>
                        </div>
                      </div>
                      {expandedAssignment === assignment.id &&
                <div className="mt-4 border-t border-gray-200 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Assignment Details
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="grid grid-cols-2 gap-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Assigned Date
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      {formatDate(assignment.assignedDate)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Due Date
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      {formatDate(assignment.dueDate)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Last Activity
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      {formatDate(assignment.lastActivity)}
                                    </p>
                                  </div>
                                  {assignment.completionDate &&
                          <div>
                                      <p className="text-xs text-gray-500">
                                        Completion Date
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        {formatDate(assignment.completionDate)}
                                      </p>
                                    </div>
                          }
                                </div>
                                {assignment.notes &&
                        <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-1">
                                      Notes:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {assignment.notes}
                                    </p>
                                  </div>
                        }
                              </div>
                              {assignment.status === 'completed' &&
                      assignment.assessment &&
                      <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                      Assessment Results
                                    </h4>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-700">
                                          Assessment Score:
                                        </span>
                                        <span className="text-sm font-medium text-gray-800">
                                          {assignment.assessment.score}%
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${assignment.assessment.score}%`
                              }}>
                            </div>
                                      </div>
                                      <div className="mt-3">
                                        <p className="text-xs text-gray-700 mb-1">
                                          Feedback:
                                        </p>
                                        <p className="text-sm text-gray-800">
                                          {assignment.assessment.feedback}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                      }
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Module Progress
                              </h4>
                              <div className="space-y-2">
                                {/* This would typically be populated with actual module data */}
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <PlayIcon className="w-4 h-4 text-blue-600 mr-1" />
                                      <span className="text-sm text-gray-800">
                                        Course Introduction
                                      </span>
                                    </div>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                                      Completed
                                    </span>
                                  </div>
                                  <div className="mt-1 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                      Completed on{' '}
                                      {formatDate(assignment.lastActivity)}
                                    </span>
                                    <button className="text-xs text-green-600 hover:text-green-800">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <UsersIcon className="w-4 h-4 text-purple-600 mr-1" />
                                      <span className="text-sm text-gray-800">
                                        Interactive Workshop
                                      </span>
                                    </div>
                                    {assignment.progress >= 40 ?
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                        Completed
                                      </span> :

                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        In Progress
                                      </span>
                            }
                                  </div>
                                  <div className="mt-1 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                      45 minutes
                                    </span>
                                    <button className="text-xs text-green-600 hover:text-green-800">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <ClipboardCheckIcon className="w-4 h-4 text-green-600 mr-1" />
                                      <span className="text-sm text-gray-800">
                                        Final Assessment
                                      </span>
                                    </div>
                                    {assignment.status === 'completed' ?
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                        Completed
                                      </span> :

                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        <LockIcon className="w-3 h-3 mr-1" />
                                        Locked
                                      </span>
                            }
                                  </div>
                                  <div className="mt-1 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                      30 minutes
                                    </span>
                                    <button className="text-xs text-green-600 hover:text-green-800">
                                      {assignment.status === 'completed' ?
                              'View Results' :
                              'View Details'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-3">
                            <button
                      onClick={() =>
                      handleViewCourseDetails(assignment)
                      }
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      
                              <EyeIcon className="w-4 h-4 mr-2" />
                              View Course Details
                            </button>
                            {assignment.status !== 'completed' ?
                    <button
                      onClick={() => handleEditAssignment(assignment)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      
                                Edit Assignment
                              </button> :

                    <button
                      onClick={() => handleMarkComplete(assignment)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      
                                <CheckCircleIcon className="w-4 h-4 mr-2" />
                                Mark Complete
                              </button>
                    }
                          </div>
                        </div>
                }
                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            Last activity: {formatDate(assignment.lastActivity)}
                          </span>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-3">
                          <button
                      onClick={() => handleViewCourseDetails(assignment)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      
                            <EyeIcon className="w-4 h-4 mr-2" />
                            View Course Details
                          </button>
                          {assignment.status !== 'completed' ?
                    <button
                      onClick={() => handleMarkComplete(assignment)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      
                              <CheckCircleIcon className="w-4 h-4 mr-2" />
                              Mark Complete
                            </button> :

                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                              <PlusIcon className="w-4 h-4 mr-2" />
                              Assign New Course
                            </button>
                    }
                        </div>
                      </div>
                    </div>
                  </div>
            ) :

            <div className="text-center py-8">
                  <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No assignments found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search criteria or create a new
                    assignment.
                  </p>
                </div>
            }
            </div>
          </div>
        }
        {/* Training Analytics Tab */}
        {activeTab === 'analytics' &&
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Course Completion
                </h3>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">82%</div>
                    <p className="text-sm text-gray-600 mt-1">
                      Overall completion rate
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">
                        +5% from last month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">
                      TechSolutions Ltd
                    </span>
                    <span className="text-xs font-medium text-gray-800">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: '75%'
                    }}>
                  </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 mb-1">
                    <span className="text-xs text-gray-500">
                      AgriTech Solutions
                    </span>
                    <span className="text-xs font-medium text-gray-800">
                      92%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: '92%'
                    }}>
                  </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Course Engagement
                </h3>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">4.2</div>
                    <p className="text-sm text-gray-600 mt-1">
                      Average hours per week
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">
                        +0.8 from last month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Most Active Day</p>
                    <p className="text-sm font-medium text-gray-800">
                      Wednesday
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Most Active Time</p>
                    <p className="text-sm font-medium text-gray-800">
                      10:00 - 12:00
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Avg. Session Length</p>
                    <p className="text-sm font-medium text-gray-800">
                      32 minutes
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Completion Streak</p>
                    <p className="text-sm font-medium text-gray-800">8 days</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Top Performing Courses
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Technology Adoption Strategies
                        </p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-500 ml-1">
                            4.9
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        94% completion
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Technical Team Building
                        </p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-500 ml-1">
                            4.9
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        88% completion
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Sustainable Revenue Models
                        </p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-3 h-3 text-yellow-400" />
                          <StarIcon className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-500 ml-1">
                            4.8
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        89% completion
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <button className="text-sm text-green-600 hover:text-green-800">
                    View All Courses
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  SME Training Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-800">
                          TechSolutions Ltd
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        5 courses assigned
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Overall Progress
                        </span>
                        <span className="text-xs font-medium text-gray-800">
                          65%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: '65%'
                        }}>
                      </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-gray-600">
                            2 courses completed
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 text-blue-500 mr-1" />
                          <span className="text-gray-600">
                            3 courses in progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-800">
                          AgriTech Solutions
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        4 courses assigned
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Overall Progress
                        </span>
                        <span className="text-xs font-medium text-gray-800">
                          82%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: '82%'
                        }}>
                      </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-gray-600">
                            3 courses completed
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 text-blue-500 mr-1" />
                          <span className="text-gray-600">
                            1 course in progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm text-green-600 hover:text-green-800">
                    View All SME Progress
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Assessment Performance
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-800">
                        Average Assessment Score
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        87%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: '87%'
                      }}>
                    </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Highest Score</p>
                        <p className="text-sm font-medium text-gray-800">98%</p>
                        <p className="text-xs text-gray-600">
                          AgriTech Solutions
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Lowest Score</p>
                        <p className="text-sm font-medium text-gray-800">72%</p>
                        <p className="text-xs text-gray-600">
                          TechSolutions Ltd
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Top Performing Areas
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Technology Adoption
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                          94% avg. score
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Revenue Modeling
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                          91% avg. score
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Market Research
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                          88% avg. score
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Recent Training Activity
                </h3>
                <select className="border border-gray-300 rounded-md py-1 pl-2 pr-8 text-sm bg-white focus:outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SME
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {formatDate('2023-10-20')}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        TechSolutions Ltd
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Product Management Fundamentals
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Completed Module 3
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {formatDate('2023-10-18')}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        TechSolutions Ltd
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Market Entry Strategy
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Completed Module 2
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {formatDate('2023-10-15')}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        AgriTech Solutions
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Sustainable Revenue Models
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Started Module 6
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {formatDate('2023-10-15')}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        AgriTech Solutions
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Sustainable Revenue Models
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Completed Module 5
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        {formatDate('2023-10-12')}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        TechSolutions Ltd
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Product Management Fundamentals
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                        Started Module 3
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-green-600 hover:text-green-800">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}