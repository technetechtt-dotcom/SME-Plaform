import React, { useState } from 'react';
import {
  BookOpenIcon,
  PlayIcon,
  FileTextIcon,
  CalendarIcon,
  UsersIcon,
  SearchIcon,
  TagIcon,
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  ArrowRightIcon,
  FilterIcon,
  GraduationCapIcon,
  AwardIcon } from
'lucide-react';
export function LearningHubPage() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const courses = [
  {
    id: 1,
    title: 'Financial Management for SMEs',
    description:
    'Learn essential financial management skills for small and medium enterprises',
    category: 'Finance',
    level: 'Intermediate',
    duration: '6 hours',
    modules: 8,
    completion: 25,
    instructor: 'Sarah Johnson',
    image:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Finance', 'Accounting', 'Budgeting']
  },
  {
    id: 2,
    title: 'Digital Marketing Fundamentals',
    description:
    'Master the basics of digital marketing to grow your business online',
    category: 'Marketing',
    level: 'Beginner',
    duration: '4 hours',
    modules: 6,
    completion: 100,
    instructor: 'Michael Chen',
    image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Marketing', 'Social Media', 'SEO']
  },
  {
    id: 3,
    title: 'Business Compliance in South Africa',
    description:
    'Understand the regulatory requirements for businesses in South Africa',
    category: 'Compliance',
    level: 'Intermediate',
    duration: '5 hours',
    modules: 7,
    completion: 0,
    instructor: 'Thabo Mbeki',
    image:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxlZ2FsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tags: ['Legal', 'Compliance', 'Regulation']
  },
  {
    id: 4,
    title: 'Export Market Development',
    description:
    'Learn how to expand your business into international markets',
    category: 'Growth',
    level: 'Advanced',
    duration: '8 hours',
    modules: 10,
    completion: 60,
    instructor: 'Emma Watson',
    image:
    'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV4cG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Export', 'International', 'Growth']
  },
  {
    id: 5,
    title: 'HR Management for Small Business',
    description: 'Develop effective HR practices for your small business',
    category: 'Management',
    level: 'Intermediate',
    duration: '5 hours',
    modules: 7,
    completion: 0,
    instructor: 'Priya Patel',
    image:
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGh1bWFuJTIwcmVzb3VyY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tags: ['HR', 'Management', 'Team Building']
  }];

  const resources = [
  {
    id: 1,
    title: 'Guide to SME Funding Options',
    type: 'PDF',
    description:
    'Comprehensive guide to funding options available for SMEs in South Africa',
    category: 'Finance',
    author: 'Department of Small Business Development',
    date: '2023-06-15',
    downloadCount: 1245,
    image:
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Funding', 'Finance', 'Grants']
  },
  {
    id: 2,
    title: 'Tax Compliance Checklist',
    type: 'PDF',
    description:
    'Step-by-step checklist for ensuring tax compliance for your business',
    category: 'Compliance',
    author: 'South African Revenue Service',
    date: '2023-04-10',
    downloadCount: 978,
    image:
    'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGF4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tags: ['Tax', 'Compliance', 'Checklist']
  },
  {
    id: 3,
    title: 'Digital Transformation for SMEs',
    type: 'Whitepaper',
    description:
    'How small businesses can leverage digital technologies for growth',
    category: 'Technology',
    author: 'Technology Innovation Agency',
    date: '2023-02-22',
    downloadCount: 756,
    image:
    'https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlnaXRhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Digital', 'Technology', 'Transformation']
  },
  {
    id: 4,
    title: 'Market Research Toolkit',
    type: 'Template',
    description:
    'Templates and tools for conducting effective market research',
    category: 'Marketing',
    author: 'Small Enterprise Development Agency',
    date: '2023-01-05',
    downloadCount: 623,
    image:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc2VhcmNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tags: ['Market Research', 'Analysis', 'Templates']
  }];

  const events = [
  {
    id: 1,
    title: 'SME Funding Workshop',
    type: 'Workshop',
    description:
    'Learn about available funding options and how to prepare successful applications',
    date: '2023-11-15',
    time: '09:00 - 12:00',
    location: 'Johannesburg Convention Centre',
    organizer: 'Department of Small Business Development',
    registration: true,
    image:
    'https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvcmtzaG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tags: ['Funding', 'Workshop', 'Networking']
  },
  {
    id: 2,
    title: 'Export Market Opportunities',
    type: 'Webinar',
    description:
    'Discover opportunities for South African businesses in international markets',
    date: '2023-10-28',
    time: '14:00 - 15:30',
    location: 'Online',
    organizer: 'Department of Trade and Industry',
    registration: true,
    image:
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYmluYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Export', 'International', 'Webinar']
  },
  {
    id: 3,
    title: 'SME Technology Expo',
    type: 'Exhibition',
    description:
    'Showcase of the latest technologies and solutions for small businesses',
    date: '2023-12-05',
    time: '10:00 - 17:00',
    location: 'Cape Town International Convention Centre',
    organizer: 'Technology Innovation Agency',
    registration: true,
    image:
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXhoaWJpdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Technology', 'Exhibition', 'Networking']
  },
  {
    id: 4,
    title: 'Business Compliance Updates',
    type: 'Seminar',
    description:
    'Stay updated on the latest regulatory changes affecting small businesses',
    date: '2023-11-22',
    time: '13:00 - 16:00',
    location: 'Durban Business Centre',
    organizer: 'South African Revenue Service',
    registration: true,
    image:
    'https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlbWluYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    tags: ['Compliance', 'Regulation', 'Seminar']
  }];

  const filteredItems = () => {
    const items =
    activeTab === 'courses' ?
    courses :
    activeTab === 'resources' ?
    resources :
    events;
    return items.filter(
      (item) =>
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags &&
      item.tags.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
      )) && (
      selectedCategory === 'all' || item.category === selectedCategory)
    );
  };
  const allCategories = () => {
    const items =
    activeTab === 'courses' ?
    courses :
    activeTab === 'resources' ?
    resources :
    events;
    const categories = ['all', ...new Set(items.map((item) => item.category))];
    return categories;
  };
  const getCompletionBadge = (completion) => {
    if (completion === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Not Started
        </span>);

    } else if (completion === 100) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="w-3 h-3 mr-1" />
          Completed
        </span>);

    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {completion}% Complete
        </span>);

    }
  };
  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getEventTypeBadgeClass = (type) => {
    switch (type) {
      case 'Workshop':
        return 'bg-blue-100 text-blue-800';
      case 'Webinar':
        return 'bg-green-100 text-green-800';
      case 'Exhibition':
        return 'bg-purple-100 text-purple-800';
      case 'Seminar':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const isUpcoming = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Learning Hub</h2>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('courses')}>
              
              <BookOpenIcon className="w-4 h-4 inline mr-1" />
              Courses
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'resources' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('resources')}>
              
              <FileTextIcon className="w-4 h-4 inline mr-1" />
              Resources
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'events' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('events')}>
              
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Events
            </button>
          </nav>
        </div>
        <div className="p-4">
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-500" />
              <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                
                {allCategories().map((category) =>
                <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                )}
              </select>
            </div>
          </div>
          {activeTab === 'courses' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems().length > 0 ?
            filteredItems().map((course) =>
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
                    <div className="h-40 bg-gray-200 relative">
                      <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover" />
                
                      <div className="absolute top-2 right-2">
                        {getCompletionBadge(course.completion)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-800">
                          {course.title}
                        </h3>
                        <span
                    className={`inline-flex items-center px-2 5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeClass(course.level)}`}>
                    
                          {course.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {course.duration}
                        </div>
                        <span className="mx-2">•</span>
                        <div>{course.modules} modules</div>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <UsersIcon className="w-3 h-3 mr-1" />
                        Instructor: {course.instructor}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {course.tags.map((tag, index) =>
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                  )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                          {course.completion === 0 ?
                    <>
                              Start Course <PlayIcon className="ml-1 w-4 h-4" />
                            </> :
                    course.completion === 100 ?
                    <>
                              Review Course{' '}
                              <ArrowRightIcon className="ml-1 w-4 h-4" />
                            </> :

                    <>
                              Continue{' '}
                              <ArrowRightIcon className="ml-1 w-4 h-4" />
                            </>
                    }
                        </button>
                      </div>
                    </div>
                  </div>
            ) :

            <div className="col-span-full text-center py-8">
                  <BookOpenIcon className="w-12 h-12 mx-auto text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No courses found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
            }
            </div>
          }
          {activeTab === 'resources' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems().length > 0 ?
            filteredItems().map((resource) =>
            <div
              key={resource.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
                    <div className="h-40 bg-gray-200 relative">
                      <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover" />
                
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800">
                        {resource.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <div>By: {resource.author}</div>
                        <div>{formatDate(resource.date)}</div>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <DownloadIcon className="w-3 h-3 mr-1" />
                        {resource.downloadCount} downloads
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {resource.tags.map((tag, index) =>
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                  )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                          Download <ArrowRightIcon className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
            ) :

            <div className="col-span-full text-center py-8">
                  <FileTextIcon className="w-12 h-12 mx-auto text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No resources found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
            }
            </div>
          }
          {activeTab === 'events' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems().length > 0 ?
            filteredItems().map((event) =>
            <div
              key={event.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
                    <div className="h-40 bg-gray-200 relative">
                      <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover" />
                
                      <div className="absolute top-2 right-2">
                        <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeBadgeClass(event.type)}`}>
                    
                          {event.type}
                        </span>
                      </div>
                      {!isUpcoming(event.date) &&
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="px-3 py-1 bg-red-500 text-white font-medium rounded-full transform -rotate-12">
                            Past Event
                          </span>
                        </div>
                }
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDate(event.date)}
                        <span className="mx-2">•</span>
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <MapPinIcon className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <UsersIcon className="w-3 h-3 mr-1" />
                        Organizer: {event.organizer}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {event.tags.map((tag, index) =>
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                  )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        {isUpcoming(event.date) ?
                  <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                            Register <ArrowRightIcon className="ml-1 w-4 h-4" />
                          </button> :

                  <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                            View Details{' '}
                            <ArrowRightIcon className="ml-1 w-4 h-4" />
                          </button>
                  }
                      </div>
                    </div>
                  </div>
            ) :

            <div className="col-span-full text-center py-8">
                  <CalendarIcon className="w-12 h-12 mx-auto text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No events found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
            }
            </div>
          }
          {filteredItems().length > 0 &&
          <div className="mt-6 text-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View All{' '}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </button>
            </div>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              My Learning Progress
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    Courses Completed
                  </span>
                  <span className="text-gray-600">1/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: '20%'
                    }}>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-gray-700">In Progress</span>
                  <span className="text-gray-600">2/5</span>
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
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    Resources Downloaded
                  </span>
                  <span className="text-gray-600">8</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    Events Attended
                  </span>
                  <span className="text-gray-600">3</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Continue Learning
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpenIcon className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-800">
                        Financial Management for SMEs
                      </h5>
                      <p className="text-xs text-gray-500">25% complete</p>
                      <button className="mt-1 text-xs font-medium text-blue-600">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <BookOpenIcon className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-800">
                        Export Market Development
                      </h5>
                      <p className="text-xs text-gray-500">60% complete</p>
                      <button className="mt-1 text-xs font-medium text-blue-600">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Recommended for You
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <BookOpenIcon className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      Business Compliance in South Africa
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended based on your compliance needs
                    </p>
                    <button className="mt-2 text-xs font-medium text-blue-600">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <FileTextIcon className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      Guide to SME Funding Options
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Relevant for your funding application plans
                    </p>
                    <button className="mt-2 text-xs font-medium text-blue-600">
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      SME Funding Workshop
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      Nov 15, 2023 • Johannesburg
                    </p>
                    <button className="mt-2 text-xs font-medium text-blue-600">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Learning Achievements
            </h3>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <GraduationCapIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800">
                John's Learning Journey
              </h4>
              <p className="text-xs text-gray-500">Joined September 2023</p>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: '35%'
                  }}>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Level 2 • 35/100 XP to Level 3
              </p>
            </div>
            <div className="mt-2 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Badges Earned
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                    <AwardIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    Finance Pro
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                    <StarIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    First Course
                  </p>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                    <LockIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-xs text-center text-gray-400">Locked</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Certificates
                </h4>
                <button className="text-xs font-medium text-blue-600">
                  View All
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileTextIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h5 className="text-sm font-medium text-gray-800">
                      Digital Marketing Fundamentals
                    </h5>
                    <p className="text-xs text-gray-500">
                      Completed on Sep 28, 2023
                    </p>
                  </div>
                  <button className="text-xs font-medium text-blue-600">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>);

}
function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>);

}
function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>);

}