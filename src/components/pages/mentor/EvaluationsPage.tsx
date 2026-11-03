import React, { useState } from 'react';
import {
  BuildingIcon,
  SearchIcon,
  FilterIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  ChevronDownIcon,
  StarIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BarChart2Icon,
  UserIcon,
  PlusIcon,
  SaveIcon } from
'lucide-react';
export function EvaluationsPage() {
  const [expandedEvaluation, setExpandedEvaluation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewEvaluationForm, setShowNewEvaluationForm] = useState(false);
  const [selectedSme, setSelectedSme] = useState('');
  const [evaluationType, setEvaluationType] = useState('');
  // Mock data for evaluations
  const evaluations = [
  {
    id: 1,
    smeId: 1,
    smeName: 'TechSolutions Ltd',
    type: 'Quarterly Review',
    date: '2023-09-30',
    status: 'completed',
    submittedDate: '2023-10-02',
    overallScore: 78,
    categories: [
    {
      name: 'Technical Team Development',
      score: 85,
      maxScore: 100,
      comments:
      'Good progress on technical hiring and team structure. Onboarding process has been significantly improved.'
    },
    {
      name: 'Product Development',
      score: 70,
      maxScore: 100,
      comments:
      'Product roadmap is progressing but behind schedule. Need to focus on prioritization and resource allocation.'
    },
    {
      name: 'Market Expansion',
      score: 65,
      maxScore: 100,
      comments:
      'Initial market research for Kenya is promising, but strategy needs more detail on go-to-market approach.'
    },
    {
      name: 'Financial Management',
      score: 80,
      maxScore: 100,
      comments:
      'Burn rate is well-managed. Could improve financial forecasting for new market entry.'
    }],

    strengths: [
    'Strong technical leadership and hiring process',
    'Effective cash management',
    'Product development methodology'],

    areasForImprovement: [
    'Market expansion planning needs more detail',
    'Product roadmap prioritization',
    'Customer feedback incorporation into product cycles'],

    recommendations: [
    'Focus on completing detailed market entry strategy for Kenya before moving to additional markets',
    'Implement structured customer feedback process',
    'Consider additional product management training for leadership team'],

    nextSteps: [
    'Schedule product roadmap review session',
    'Finalize Kenya market entry strategy by Nov 15',
    'Implement weekly customer feedback review']

  },
  {
    id: 2,
    smeId: 4,
    smeName: 'AgriTech Solutions',
    type: 'Development Plan Review',
    date: '2023-10-15',
    status: 'completed',
    submittedDate: '2023-10-16',
    overallScore: 92,
    categories: [
    {
      name: 'Farmer Onboarding Process',
      score: 95,
      maxScore: 100,
      comments:
      'Excellent optimization of the onboarding process. Reduced time from 3 days to 1 day with 40% increase in conversion.'
    },
    {
      name: 'Technology Adoption Program',
      score: 90,
      maxScore: 100,
      comments:
      'Comprehensive training materials developed in multiple languages. Pilot program showed excellent results.'
    },
    {
      name: 'Revenue Model Optimization',
      score: 85,
      maxScore: 100,
      comments:
      'Good progress on revenue model analysis. Identified opportunities for 15% margin improvement.'
    },
    {
      name: 'Operational Efficiency',
      score: 88,
      maxScore: 100,
      comments:
      'Field operations have been streamlined. Support system is effective but could be more scalable.'
    }],

    strengths: [
    'Exceptional user-centered design approach',
    'Strong focus on localization and cultural context',
    'Effective training methodology',
    'Data-driven decision making'],

    areasForImprovement: [
    'Scalability of support systems',
    'Long-term financial sustainability planning',
    'Technology infrastructure robustness'],

    recommendations: [
    'Develop plan for scaling support systems to accommodate 5x growth',
    'Implement premium service tiers as identified in revenue model analysis',
    'Strengthen offline functionality for areas with limited connectivity'],

    nextSteps: [
    'Finalize revenue model refinement by Nov 15',
    'Begin development of premium feature set',
    'Create support system scaling plan']

  },
  {
    id: 3,
    smeId: 1,
    smeName: 'TechSolutions Ltd',
    type: 'Objective Completion',
    date: '2023-08-10',
    status: 'completed',
    submittedDate: '2023-08-10',
    objective: 'Technical Hiring Roadmap',
    rating: 4,
    maxRating: 5,
    assessment:
    'The technical hiring roadmap has been successfully completed. The plan includes detailed role definitions, interview process, and onboarding strategy. The implementation has already resulted in 3 successful technical hires.',
    strengths: [
    'Comprehensive role definitions',
    'Well-structured interview process',
    'Detailed onboarding plan'],

    recommendations: [
    'Consider adding technical assessment components to the interview process',
    'Develop metrics to evaluate hiring effectiveness',
    'Create plan for ongoing team skills development']

  },
  {
    id: 4,
    smeId: 4,
    smeName: 'AgriTech Solutions',
    type: 'Training Completion',
    date: '2023-09-12',
    status: 'completed',
    submittedDate: '2023-09-12',
    course: 'Technology Adoption Strategies for Rural Communities',
    score: 92,
    maxScore: 100,
    assessment:
    'Excellent understanding of technology adoption challenges and strategies. Successfully applied concepts to farmer onboarding process. The implementation plan shows strong adaptation of course concepts to the specific context of rural farmers in South Africa.',
    keyLearnings: [
    'User-centered design for low-tech users',
    'Training program development for rural contexts',
    'Support system design for technology adoption',
    'Measuring adoption and impact'],

    implementation:
    'The team has already implemented key learnings from the course, including redesigned training materials and a peer support system for technology adoption. These changes have resulted in a 40% increase in adoption rates.'
  },
  {
    id: 5,
    smeId: 1,
    smeName: 'TechSolutions Ltd',
    type: 'Quarterly Review',
    date: '2023-12-31',
    status: 'scheduled',
    categories: [
    'Technical Team Development',
    'Product Development',
    'Market Expansion',
    'Financial Management']

  }];

  // Mock data for SMEs
  const smes = [
  {
    id: 1,
    name: 'TechSolutions Ltd'
  },
  {
    id: 4,
    name: 'AgriTech Solutions'
  }];

  // Filter evaluations based on search and filters
  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
    evaluation.smeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evaluation.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
    statusFilter === 'all' || evaluation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Toggle expanded state
  const toggleExpandedEvaluation = (id) => {
    setExpandedEvaluation(expandedEvaluation === id ? null : id);
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
  // Handle new evaluation submission
  const handleNewEvaluationSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new evaluation:', {
      selectedSme,
      evaluationType
    });
    setShowNewEvaluationForm(false);
    setSelectedSme('');
    setEvaluationType('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">SME Evaluations</h1>
        <button
          onClick={() => setShowNewEvaluationForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          
          <PlusIcon className="w-5 h-5 mr-2" />
          New Evaluation
        </button>
      </div>
      {showNewEvaluationForm &&
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Create New Evaluation
            </h2>
            <button
            onClick={() => setShowNewEvaluationForm(false)}
            className="text-gray-400 hover:text-gray-500">
            
              <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
              
              </svg>
            </button>
          </div>
          <form onSubmit={handleNewEvaluationSubmit}>
            <div className="space-y-4">
              <div>
                <label
                htmlFor="sme"
                className="block text-sm font-medium text-gray-700 mb-1">
                
                  Select SME
                </label>
                <select
                id="sme"
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={selectedSme}
                onChange={(e) => setSelectedSme(e.target.value)}
                required>
                
                  <option value="">Select an SME</option>
                  {smes.map((sme) =>
                <option key={sme.id} value={sme.id}>
                      {sme.name}
                    </option>
                )}
                </select>
              </div>
              <div>
                <label
                htmlFor="evaluationType"
                className="block text-sm font-medium text-gray-700 mb-1">
                
                  Evaluation Type
                </label>
                <select
                id="evaluationType"
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={evaluationType}
                onChange={(e) => setEvaluationType(e.target.value)}
                required>
                
                  <option value="">Select evaluation type</option>
                  <option value="Quarterly Review">Quarterly Review</option>
                  <option value="Development Plan Review">
                    Development Plan Review
                  </option>
                  <option value="Objective Completion">
                    Objective Completion
                  </option>
                  <option value="Training Completion">
                    Training Completion
                  </option>
                </select>
              </div>
              <div>
                <label
                htmlFor="evaluationDate"
                className="block text-sm font-medium text-gray-700 mb-1">
                
                  Evaluation Date
                </label>
                <input
                type="date"
                id="evaluationDate"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required />
              
              </div>
              <div className="flex justify-end space-x-3">
                <button
                type="button"
                onClick={() => setShowNewEvaluationForm(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                
                  Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                
                  Create Evaluation
                </button>
              </div>
            </div>
          </form>
        </div>
      }
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search evaluations by SME or type..."
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
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
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
                Evaluation Type
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Types</option>
                <option value="Quarterly Review">Quarterly Review</option>
                <option value="Development Plan Review">
                  Development Plan Review
                </option>
                <option value="Objective Completion">
                  Objective Completion
                </option>
                <option value="Training Completion">Training Completion</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="thisYear">This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Score Range
              </label>
              <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="all">All Scores</option>
                <option value="90-100">90-100%</option>
                <option value="80-89">80-89%</option>
                <option value="70-79">70-79%</option>
                <option value="0-69">Below 70%</option>
              </select>
            </div>
          </div>
        </div>
      }
      <div className="space-y-6">
        {filteredEvaluations.length > 0 ?
        filteredEvaluations.map((evaluation) =>
        <div
          key={evaluation.id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
          
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <BuildingIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {evaluation.smeName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <ClipboardCheckIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {evaluation.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    {evaluation.status === 'completed' ?
                <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircleIcon className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-700">
                          Completed
                        </span>
                      </div> :
                evaluation.status === 'draft' ?
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <FileTextIcon className="w-4 h-4 text-gray-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">
                          Draft
                        </span>
                      </div> :

                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <CalendarIcon className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-blue-700">
                          Scheduled
                        </span>
                      </div>
                }
                    <button
                  onClick={() => toggleExpandedEvaluation(evaluation.id)}
                  className="ml-4 text-gray-400 hover:text-gray-500">
                  
                      <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${expandedEvaluation === evaluation.id ? 'transform rotate-180' : ''}`} />
                  
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center">
                  <div className="flex items-center mr-6 mb-2 sm:mb-0">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {evaluation.status === 'completed' ?
                  `Submitted: ${formatDate(evaluation.submittedDate)}` :
                  `Scheduled: ${formatDate(evaluation.date)}`}
                    </span>
                  </div>
                  {evaluation.overallScore &&
              <div className="flex items-center">
                      <BarChart2Icon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        Overall Score:{' '}
                        <span className="font-medium">
                          {evaluation.overallScore}%
                        </span>
                      </span>
                    </div>
              }
                  {evaluation.rating &&
              <div className="flex items-center ml-6">
                      <div className="flex">
                        {[...Array(evaluation.maxRating)].map((_, i) =>
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < evaluation.rating ? 'text-yellow-400' : 'text-gray-300'}`} />

                  )}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        {evaluation.rating}/{evaluation.maxRating}
                      </span>
                    </div>
              }
                </div>
                {expandedEvaluation === evaluation.id &&
            <div className="mt-6 border-t border-gray-200 pt-4">
                    {/* Quarterly or Development Plan Review */}
                    {(evaluation.type === 'Quarterly Review' ||
              evaluation.type === 'Development Plan Review') &&
              evaluation.status === 'completed' &&
              <div>
                          <h4 className="text-md font-medium text-gray-800 mb-3">
                            Evaluation Categories
                          </h4>
                          <div className="space-y-3 mb-6">
                            {evaluation.categories.map((category, index) =>
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    
                                <div className="flex justify-between items-center mb-1">
                                  <h5 className="text-sm font-medium text-gray-800">
                                    {category.name}
                                  </h5>
                                  <span className="text-sm font-medium text-gray-700">
                                    {category.score}/{category.maxScore}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                  <div
                        className={`h-2 rounded-full ${category.score >= 80 ? 'bg-green-600' : category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{
                          width: `${category.score / category.maxScore * 100}%`
                        }}>
                      </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {category.comments}
                                </p>
                              </div>
                  )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="text-md font-medium text-gray-800 mb-3">
                                Strengths
                              </h4>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                <ul className="space-y-2">
                                  {evaluation.strengths.map(
                          (strength, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-green-800">
                                          {strength}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-md font-medium text-gray-800 mb-3">
                                Areas for Improvement
                              </h4>
                              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                <ul className="space-y-2">
                                  {evaluation.areasForImprovement.map(
                          (area, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-amber-800">
                                          {area}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-md font-medium text-gray-800 mb-3">
                                Recommendations
                              </h4>
                              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                <ul className="space-y-2">
                                  {evaluation.recommendations.map(
                          (recommendation, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 font-medium text-xs mr-2 flex-shrink-0">
                                          {index + 1}
                                        </div>
                                        <span className="text-sm text-blue-800">
                                          {recommendation}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-md font-medium text-gray-800 mb-3">
                                Next Steps
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <ul className="space-y-2">
                                  {evaluation.nextSteps.map((step, index) =>
                        <li
                          key={index}
                          className="flex items-start">
                          
                                      <input
                            type="checkbox"
                            className="h-5 w-5 text-green-600 border-gray-300 rounded mr-2 mt-0.5" />
                          
                                      <span className="text-sm text-gray-800">
                                        {step}
                                      </span>
                                    </li>
                        )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
              }
                    {/* Objective Completion */}
                    {evaluation.type === 'Objective Completion' &&
              evaluation.status === 'completed' &&
              <div>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-md font-medium text-gray-800">
                                Objective: {evaluation.objective}
                              </h4>
                              <div className="flex">
                                {[...Array(evaluation.maxRating)].map(
                        (_, i) =>
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${i < evaluation.rating ? 'text-yellow-400' : 'text-gray-300'}`} />


                      )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {evaluation.assessment}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Strengths
                                </h5>
                                <ul className="space-y-1">
                                  {evaluation.strengths.map(
                          (strength, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-600">
                                          {strength}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Recommendations
                                </h5>
                                <ul className="space-y-1">
                                  {evaluation.recommendations.map(
                          (recommendation, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <AlertCircleIcon className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-600">
                                          {recommendation}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
              }
                    {/* Training Completion */}
                    {evaluation.type === 'Training Completion' &&
              evaluation.status === 'completed' &&
              <div>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-md font-medium text-gray-800">
                                Course: {evaluation.course}
                              </h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Score: {evaluation.score}/{evaluation.maxScore}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {evaluation.assessment}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Key Learnings
                                </h5>
                                <ul className="space-y-1">
                                  {evaluation.keyLearnings.map(
                          (learning, index) =>
                          <li
                            key={index}
                            className="flex items-start">
                            
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-600">
                                          {learning}
                                        </span>
                                      </li>

                        )}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">
                                  Implementation
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {evaluation.implementation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
              }
                    {/* Scheduled Evaluation */}
                    {evaluation.status === 'scheduled' &&
              <div>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                          <div className="flex items-start">
                            <CalendarIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-md font-medium text-blue-800">
                                Scheduled Evaluation
                              </h4>
                              <p className="text-sm text-blue-700 mt-1">
                                This evaluation is scheduled for{' '}
                                {formatDate(evaluation.date)}. You can prepare
                                the evaluation form in advance.
                              </p>
                            </div>
                          </div>
                          {evaluation.categories &&
                  <div className="mt-4">
                              <h5 className="text-sm font-medium text-blue-800 mb-2">
                                Evaluation Categories
                              </h5>
                              <ul className="space-y-1">
                                {evaluation.categories.map(
                        (category, index) =>
                        <li
                          key={index}
                          className="flex items-start">
                          
                                      <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-200 rounded-full text-xs font-medium text-blue-800 mr-2">
                                        {index + 1}
                                      </span>
                                      <span className="text-sm text-blue-700">
                                        {category}
                                      </span>
                                    </li>

                      )}
                              </ul>
                            </div>
                  }
                        </div>
                        <div className="flex justify-center">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                            <FileTextIcon className="w-4 h-4 mr-2" />
                            Prepare Evaluation Form
                          </button>
                        </div>
                      </div>
              }
                    {evaluation.status === 'completed' &&
              <div className="mt-6 flex justify-end space-x-3">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <FileTextIcon className="w-4 h-4 mr-2" />
                          Export as PDF
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                          <PlusIcon className="w-4 h-4 mr-2" />
                          Create Follow-up
                        </button>
                      </div>
              }
                  </div>
            }
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      Evaluated by: Dr. Sarah Johnson
                    </span>
                  </div>
                  <div className="mt-3 sm:mt-0 flex space-x-3">
                    {evaluation.status === 'completed' ?
                <>
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          View SME Profile
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                          <FileTextIcon className="w-4 h-4 mr-2" />
                          Share Evaluation
                        </button>
                      </> :
                evaluation.status === 'draft' ?
                <>
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Delete Draft
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                          <SaveIcon className="w-4 h-4 mr-2" />
                          Continue Editing
                        </button>
                      </> :

                <>
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Reschedule
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                          <FileTextIcon className="w-4 h-4 mr-2" />
                          Start Evaluation
                        </button>
                      </>
                }
                  </div>
                </div>
              </div>
            </div>
        ) :

        <div className="text-center py-8">
            <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No evaluations found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        }
      </div>
    </div>);

}