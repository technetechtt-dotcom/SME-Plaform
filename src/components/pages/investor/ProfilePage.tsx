import React, { useState } from 'react';
import {
  UserIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  PenIcon,
  LockIcon,
  BellIcon,
  LogOutIcon,
  SaveIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BarChart2Icon,
  TagIcon,
  DollarSignIcon,
  TrendingUpIcon,
  GlobeIcon } from
'lucide-react';
export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  // Sample profile data
  const [profile, setProfile] = useState({
    name: 'Venture Capital Partners',
    type: 'Venture Capital Firm',
    email: 'contact@vcpartners.co.za',
    phone: '+27 21 555 1234',
    location: 'Cape Town, South Africa',
    website: 'www.vcpartners.co.za',
    bio: 'Venture Capital Partners is a leading South African venture capital firm focused on early and growth-stage investments in technology, healthcare, and renewable energy sectors across Sub-Saharan Africa.',
    founded: '2015',
    aum: 'R350 Million',
    investments: '28 companies',
    team: [
    {
      name: 'John Smith',
      position: 'Managing Partner',
      photo: null
    },
    {
      name: 'Sarah Johnson',
      position: 'Investment Director',
      photo: null
    },
    {
      name: 'Michael Ndlovu',
      position: 'Principal',
      photo: null
    }]

  });
  // Investment preferences
  const [preferences, setPreferences] = useState({
    sectors: [
    'Technology',
    'Healthcare',
    'Renewable Energy',
    'Financial Services'],

    stages: ['Seed', 'Series A', 'Series B'],
    ticketSize: 'R500K - R5M',
    geography: 'Southern Africa',
    returnTarget: '3x+',
    investmentThesis:
    'We invest in innovative companies leveraging technology to solve critical challenges in Africa, with strong founding teams and clear paths to scalability and profitability.'
  });
  // Notification settings
  const [notifications, setNotifications] = useState({
    newOpportunities: true,
    portfolioUpdates: true,
    marketInsights: true,
    coInvestmentAlerts: true,
    newsletters: false,
    smsAlerts: false
  });
  // Activity log
  const activityLog = [
  {
    id: 1,
    action: 'Viewed MedTech Innovations co-investment opportunity',
    date: '2023-10-15 14:32'
  },
  {
    id: 2,
    action: 'Updated investment preferences',
    date: '2023-10-14 09:15'
  },
  {
    id: 3,
    action: 'Requested documents for GreenEnergy Solutions',
    date: '2023-10-12 16:48'
  },
  {
    id: 4,
    action: 'Expressed interest in EduTech Solutions co-investment',
    date: '2023-10-10 11:23'
  },
  {
    id: 5,
    action: 'Generated portfolio performance report',
    date: '2023-10-08 15:10'
  }];

  // Toggle notification setting
  const toggleNotification = (setting) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting]
    });
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Account Settings
          </h2>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'profile' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('profile')}>
              
              Profile
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'preferences' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('preferences')}>
              
              Investment Preferences
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'notifications' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('notifications')}>
              
              Notifications
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'security' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('security')}>
              
              Security
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'activity' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('activity')}>
              
              Activity Log
            </button>
          </nav>
        </div>
        {activeTab === 'profile' &&
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                Profile Information
              </h3>
              <button
              onClick={() => setEditMode(!editMode)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              
                {editMode ?
              <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Changes
                  </> :

              <>
                    <PenIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
              }
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <BuildingIcon className="h-16 w-16 text-amber-500" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {profile.name}
                  </h4>
                  <p className="text-sm text-gray-500">{profile.type}</p>
                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center text-sm">
                      <MailIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{profile.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{profile.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{profile.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GlobeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{profile.website}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Key Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Founded</p>
                      <p className="text-sm font-medium text-gray-800">
                        {profile.founded}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Assets Under Management
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {profile.aum}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Portfolio Companies
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {profile.investments}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 h-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    About
                  </h4>
                  {editMode ?
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={profile.bio}
                  onChange={(e) =>
                  setProfile({
                    ...profile,
                    bio: e.target.value
                  })
                  } /> :


                <p className="text-sm text-gray-600">{profile.bio}</p>
                }
                  <h4 className="text-sm font-medium text-gray-700 mt-6 mb-3">
                    Team Members
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {profile.team.map((member, index) =>
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border border-gray-200">
                    
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <UserIcon className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.position}
                            </p>
                          </div>
                        </div>
                      </div>
                  )}
                    {editMode &&
                  <div className="bg-white rounded-lg p-3 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <span className="text-sm text-amber-600">
                          + Add Team Member
                        </span>
                      </div>
                  }
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mt-6 mb-3">
                    Account Verification
                  </h4>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          Your account is fully verified
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Email, phone, and company registration verified. You
                          have full access to all platform features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {activeTab === 'preferences' &&
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                Investment Preferences
              </h3>
              <button
              onClick={() => setEditMode(!editMode)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              
                {editMode ?
              <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Preferences
                  </> :

              <>
                    <PenIcon className="h-4 w-4 mr-2" />
                    Edit Preferences
                  </>
              }
              </button>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 mb-6">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-800">
                    Why this matters
                  </h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Your investment preferences help our AI matching algorithm
                    find the most relevant opportunities for you. The more
                    specific your preferences, the better we can match you with
                    suitable co-investment opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <TagIcon className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">
                      Sectors of Interest
                    </h4>
                  </div>
                  {editMode ?
                <div className="space-y-2">
                      {[
                  'Technology',
                  'Healthcare',
                  'Renewable Energy',
                  'Financial Services',
                  'Education',
                  'Agriculture',
                  'Manufacturing',
                  'Consumer',
                  'Logistics'].
                  map((sector) =>
                  <label key={sector} className="flex items-center">
                          <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                      checked={preferences.sectors.includes(sector)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferences({
                            ...preferences,
                            sectors: [...preferences.sectors, sector]
                          });
                        } else {
                          setPreferences({
                            ...preferences,
                            sectors: preferences.sectors.filter(
                              (s) => s !== sector
                            )
                          });
                        }
                      }} />
                    
                          <span className="ml-2 text-sm text-gray-700">
                            {sector}
                          </span>
                        </label>
                  )}
                    </div> :

                <div className="flex flex-wrap gap-2">
                      {preferences.sectors.map((sector) =>
                  <span
                    key={sector}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    
                          {sector}
                        </span>
                  )}
                    </div>
                }
                </div>
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <BarChart2Icon className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">
                      Investment Stages
                    </h4>
                  </div>
                  {editMode ?
                <div className="space-y-2">
                      {[
                  'Pre-seed',
                  'Seed',
                  'Series A',
                  'Series B',
                  'Series C',
                  'Growth',
                  'Expansion'].
                  map((stage) =>
                  <label key={stage} className="flex items-center">
                          <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                      checked={preferences.stages.includes(stage)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferences({
                            ...preferences,
                            stages: [...preferences.stages, stage]
                          });
                        } else {
                          setPreferences({
                            ...preferences,
                            stages: preferences.stages.filter(
                              (s) => s !== stage
                            )
                          });
                        }
                      }} />
                    
                          <span className="ml-2 text-sm text-gray-700">
                            {stage}
                          </span>
                        </label>
                  )}
                    </div> :

                <div className="flex flex-wrap gap-2">
                      {preferences.stages.map((stage) =>
                  <span
                    key={stage}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    
                          {stage}
                        </span>
                  )}
                    </div>
                }
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <DollarSignIcon className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">
                      Investment Parameters
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Ticket Size
                      </label>
                      {editMode ?
                    <select
                      className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      value={preferences.ticketSize}
                      onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        ticketSize: e.target.value
                      })
                      }>
                      
                          <option value="R100K - R500K">R100K - R500K</option>
                          <option value="R500K - R5M">R500K - R5M</option>
                          <option value="R5M - R20M">R5M - R20M</option>
                          <option value="R20M+">R20M+</option>
                        </select> :

                    <p className="text-sm font-medium text-gray-800">
                          {preferences.ticketSize}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Geographic Focus
                      </label>
                      {editMode ?
                    <select
                      className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      value={preferences.geography}
                      onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        geography: e.target.value
                      })
                      }>
                      
                          <option value="South Africa">South Africa</option>
                          <option value="Southern Africa">
                            Southern Africa
                          </option>
                          <option value="Sub-Saharan Africa">
                            Sub-Saharan Africa
                          </option>
                          <option value="Africa">Africa</option>
                          <option value="Global">Global</option>
                        </select> :

                    <p className="text-sm font-medium text-gray-800">
                          {preferences.geography}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Target Return
                      </label>
                      {editMode ?
                    <select
                      className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      value={preferences.returnTarget}
                      onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        returnTarget: e.target.value
                      })
                      }>
                      
                          <option value="2x+">2x+</option>
                          <option value="3x+">3x+</option>
                          <option value="5x+">5x+</option>
                          <option value="10x+">10x+</option>
                        </select> :

                    <p className="text-sm font-medium text-gray-800">
                          {preferences.returnTarget}
                        </p>
                    }
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <TrendingUpIcon className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">
                      Investment Thesis
                    </h4>
                  </div>
                  {editMode ?
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={preferences.investmentThesis}
                  onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    investmentThesis: e.target.value
                  })
                  } /> :


                <p className="text-sm text-gray-600">
                      {preferences.investmentThesis}
                    </p>
                }
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Last updated: October 14, 2023
              </div>
              {editMode &&
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save All Changes
                </button>
            }
            </div>
          </div>
        }
        {activeTab === 'notifications' &&
        <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Notification Settings
              </h3>
              <p className="text-sm text-gray-600">
                Customize how and when you receive notifications from the
                platform.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-700">
                  Email Notifications
                </h4>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      New Investment Opportunities
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive alerts about new co-investment opportunities that
                      match your criteria
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                    onClick={() => toggleNotification('newOpportunities')}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.newOpportunities ? 'bg-amber-600' : 'bg-gray-200'}`}>
                    
                      <span className="sr-only">Toggle notification</span>
                      <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.newOpportunities ? 'translate-x-5' : 'translate-x-0'}`} />
                    
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Portfolio Company Updates
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive updates about your portfolio companies
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                    onClick={() => toggleNotification('portfolioUpdates')}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.portfolioUpdates ? 'bg-amber-600' : 'bg-gray-200'}`}>
                    
                      <span className="sr-only">Toggle notification</span>
                      <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.portfolioUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                    
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Market Insights & Reports
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive AI-generated market insights and analysis
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                    onClick={() => toggleNotification('marketInsights')}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.marketInsights ? 'bg-amber-600' : 'bg-gray-200'}`}>
                    
                      <span className="sr-only">Toggle notification</span>
                      <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.marketInsights ? 'translate-x-5' : 'translate-x-0'}`} />
                    
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Co-Investment Alerts
                    </p>
                    <p className="text-xs text-gray-500">
                      Notifications when syndicate partners share new deals
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                    onClick={() => toggleNotification('coInvestmentAlerts')}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.coInvestmentAlerts ? 'bg-amber-600' : 'bg-gray-200'}`}>
                    
                      <span className="sr-only">Toggle notification</span>
                      <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.coInvestmentAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                    
                    </button>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Platform Newsletter
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive our monthly newsletter with platform updates
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                    onClick={() => toggleNotification('newsletters')}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.newsletters ? 'bg-amber-600' : 'bg-gray-200'}`}>
                    
                      <span className="sr-only">Toggle notification</span>
                      <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.newsletters ? 'translate-x-5' : 'translate-x-0'}`} />
                    
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-700">
                  SMS Notifications
                </h4>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    SMS Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive time-sensitive alerts via SMS
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                  onClick={() => toggleNotification('smsAlerts')}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${notifications.smsAlerts ? 'bg-amber-600' : 'bg-gray-200'}`}>
                  
                    <span className="sr-only">Toggle notification</span>
                    <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${notifications.smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </button>
            </div>
          </div>
        }
        {activeTab === 'security' &&
        <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Security Settings
              </h3>
              <p className="text-sm text-gray-600">
                Manage your account security and access settings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-4">
                  <LockIcon className="h-5 w-5 text-amber-500 mr-2" />
                  <h4 className="text-sm font-medium text-gray-700">
                    Password
                  </h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Current Password
                    </label>
                    <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="••••••••••••" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      New Password
                    </label>
                    <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="••••••••••••" />
                  
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Confirm New Password
                    </label>
                    <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="••••••••••••" />
                  
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    Update Password
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-4">
                  <BellIcon className="h-5 w-5 text-amber-500 mr-2" />
                  <h4 className="text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </h4>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 mb-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Two-factor authentication is enabled
                      </p>
                      <p className="mt-1 text-xs text-green-700">
                        Your account is protected with an additional layer of
                        security. We'll ask for a verification code when you
                        sign in on a new device.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <span className="text-sm font-medium text-gray-700">
                      Change Authentication Method
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <span className="text-sm font-medium text-gray-700">
                      View Backup Codes
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <span className="text-sm font-medium text-red-600">
                      Disable Two-Factor Authentication
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-4">
                <LogOutIcon className="h-5 w-5 text-amber-500 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">
                  Sessions & Devices
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                These are the devices that have logged into your account. Revoke
                any sessions that you do not recognize.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Current Session
                      </p>
                      <p className="text-xs text-gray-500">
                        Chrome on Windows • Cape Town, South Africa
                      </p>
                      <p className="text-xs text-gray-500">
                        IP: 196.25.XX.XX • Last active: Just now
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Current
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Safari on MacBook Pro
                      </p>
                      <p className="text-xs text-gray-500">
                        Safari on macOS • Johannesburg, South Africa
                      </p>
                      <p className="text-xs text-gray-500">
                        IP: 197.89.XX.XX • Last active: Yesterday at 15:42
                      </p>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-800">
                      Revoke
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        iPhone App
                      </p>
                      <p className="text-xs text-gray-500">
                        iOS App • Cape Town, South Africa
                      </p>
                      <p className="text-xs text-gray-500">
                        IP: 196.25.XX.XX • Last active: 3 days ago
                      </p>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-800">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Revoke All Other Sessions
                </button>
              </div>
            </div>
          </div>
        }
        {activeTab === 'activity' &&
        <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Activity Log
              </h3>
              <p className="text-sm text-gray-600">
                Review your recent account activity and interactions on the
                platform.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">
                  Recent Activities
                </h4>
                <button className="text-xs font-medium text-amber-600 hover:text-amber-800">
                  Export Log
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {activityLog.map((activity) =>
              <div
                key={activity.id}
                className="px-4 py-3 hover:bg-gray-100">
                
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-3 mt-1.5"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  </div>
              )}
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
                  View Full Activity History
                </button>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">
                    Activity Insights
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Based on your activity patterns, you might be interested in
                    these additional features:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        Portfolio analytics tools for deeper investment insights
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        Healthcare sector reports based on your recent interests
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}