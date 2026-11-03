import React, { useState } from 'react';
import {
  UserIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  ShieldCheckIcon,
  BellIcon,
  KeyIcon,
  SettingsIcon,
  CheckCircleIcon,
  PencilIcon,
  SaveIcon,
  XIcon,
  EyeIcon,
  EyeOffIcon,
  LogOutIcon,
  CameraIcon,
  LinkIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John's Manufacturing",
    contactPerson: 'John Smith',
    email: 'john@johnsmanufacturing.co.za',
    phone: '+27 82 123 4567',
    address: '123 Industrial Park, Johannesburg, 2000',
    website: 'www.johnsmanufacturing.co.za',
    industry: 'Manufacturing',
    founded: '2015',
    employees: '18',
    taxNumber: '987654321',
    registrationNumber: '2015/123456/07',
    bbbeeLevel: '2',
    bio: "John's Manufacturing is a leading producer of industrial components for the automotive and mining sectors. Founded in 2015, we've grown to become a trusted supplier with a commitment to quality and innovation."
  });
  // Mock notification settings
  const [notifications, setNotifications] = useState({
    email: {
      funding: true,
      compliance: true,
      events: true,
      news: false
    },
    sms: {
      funding: false,
      compliance: true,
      events: false,
      news: false
    },
    app: {
      funding: true,
      compliance: true,
      events: true,
      news: true
    }
  });
  // Form handling
  const [formData, setFormData] = useState({
    ...userData
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveProfile = () => {
    setUserData(formData);
    setEditMode(false);
  };
  const handleCancelEdit = () => {
    setFormData({
      ...userData
    });
    setEditMode(false);
  };
  const handleNotificationChange = (channel, type) => {
    setNotifications((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Profile & Settings
              </h2>
            </div>
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('profile')}>
                  
                  <UserIcon className="w-4 h-4 inline mr-1" />
                  Company Profile
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('security')}>
                  
                  <ShieldCheckIcon className="w-4 h-4 inline mr-1" />
                  Security
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('notifications')}>
                  
                  <BellIcon className="w-4 h-4 inline mr-1" />
                  Notifications
                </button>
              </nav>
            </div>
            {activeTab === 'profile' &&
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Company Information
                  </h3>
                  {!editMode ?
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setEditMode(true)}>
                  
                      <PencilIcon className="w-3 h-3 mr-1" />
                      Edit Profile
                    </button> :

                <div className="flex space-x-2">
                      <button
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCancelEdit}>
                    
                        <XIcon className="w-3 h-3 mr-1" />
                        Cancel
                      </button>
                      <button
                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleSaveProfile}>
                    
                        <SaveIcon className="w-3 h-3 mr-1" />
                        Save Changes
                      </button>
                    </div>
                }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">{userData.name}</p>
                      </div>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Contact Person
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.contactPerson}
                        </p>
                      </div>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {editMode ?
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <MailIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.email}
                        </p>
                      </div>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {editMode ?
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.phone}
                        </p>
                      </div>
                  }
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.address}
                        </p>
                      </div>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <GlobeIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.website}
                        </p>
                      </div>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">
                          {userData.industry}
                        </p>
                      </div>
                  }
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company Bio
                  </label>
                  {editMode ?
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                <p className="text-sm text-gray-700">{userData.bio}</p>
                }
                </div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">
                  Business Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Year Founded
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="founded"
                    value={formData.founded}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <p className="text-sm text-gray-900">
                        {userData.founded}
                      </p>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Number of Employees
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <p className="text-sm text-gray-900">
                        {userData.employees}
                      </p>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tax Number
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <p className="text-sm text-gray-900">
                        {userData.taxNumber}
                      </p>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Registration Number
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <p className="text-sm text-gray-900">
                        {userData.registrationNumber}
                      </p>
                  }
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      B-BBEE Level
                    </label>
                    {editMode ?
                  <input
                    type="text"
                    name="bbbeeLevel"
                    value={formData.bbbeeLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> :


                  <p className="text-sm text-gray-900">
                        Level {userData.bbbeeLevel}
                      </p>
                  }
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <LinkIcon className="w-4 h-4 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium text-blue-800">
                      Blockchain Verification Status
                    </h4>
                  </div>
                  <p className="text-xs text-blue-700 mb-3">
                    Your business information has been verified and securely
                    stored on the blockchain, ensuring data integrity and trust
                    for funding applications.
                  </p>
                  <BlockchainBadge
                  verified={true}
                  transactionId="0x7a69c8e7c5d271eb4b8b42c986de7c28f3a4e4c2e" />
                
                </div>
              </div>
            }
            {activeTab === 'security' &&
            <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                      htmlFor="current-password"
                      className="block text-xs font-medium text-gray-700 mb-1">
                      
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                        id="current-password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••" />
                      
                        <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}>
                        
                          {showPassword ?
                        <EyeOffIcon className="h-4 w-4 text-gray-400" /> :

                        <EyeIcon className="h-4 w-4 text-gray-400" />
                        }
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                      htmlFor="new-password"
                      className="block text-xs font-medium text-gray-700 mb-1">
                      
                        New Password
                      </label>
                      <div className="relative">
                        <input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••" />
                      
                      </div>
                    </div>
                    <div>
                      <label
                      htmlFor="confirm-password"
                      className="block text-xs font-medium text-gray-700 mb-1">
                      
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••" />
                      
                      </div>
                    </div>
                    <div>
                      <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      
                        <KeyIcon className="w-4 h-4 mr-1" />
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Two-Factor Authentication
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">
                          Two-Factor Authentication is enabled
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">
                          Your account is protected with an additional layer of
                          security. When you sign in, you'll need to provide a
                          code from your authenticator app.
                        </p>
                        <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Manage 2FA Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Login Sessions
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            Current Session
                          </h4>
                          <p className="text-xs text-gray-500">
                            Chrome on Windows • Johannesburg, South Africa
                          </p>
                          <p className="text-xs text-gray-500">
                            Started: Today, 10:25 AM
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active Now
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">
                            Previous Session
                          </h4>
                          <p className="text-xs text-gray-500">
                            Safari on iPhone • Johannesburg, South Africa
                          </p>
                          <p className="text-xs text-gray-500">
                            Yesterday, 3:42 PM
                          </p>
                        </div>
                        <button className="text-xs font-medium text-red-600 hover:text-red-800">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeTab === 'notifications' &&
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Notification Preferences
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Manage how you receive notifications about funding
                  opportunities, compliance updates, and platform activities.
                </p>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Notification Type
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          Email
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          SMS
                        </th>
                        <th
                        scope="col"
                        className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        
                          App
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            Funding Opportunities
                          </div>
                          <div className="text-xs text-gray-500">
                            New matching funding opportunities
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.email.funding}
                            onChange={() =>
                            handleNotificationChange('email', 'funding')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.sms.funding}
                            onChange={() =>
                            handleNotificationChange('sms', 'funding')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.app.funding}
                            onChange={() =>
                            handleNotificationChange('app', 'funding')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            Compliance Updates
                          </div>
                          <div className="text-xs text-gray-500">
                            Upcoming deadlines and compliance requirements
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.email.compliance}
                            onChange={() =>
                            handleNotificationChange('email', 'compliance')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.sms.compliance}
                            onChange={() =>
                            handleNotificationChange('sms', 'compliance')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.app.compliance}
                            onChange={() =>
                            handleNotificationChange('app', 'compliance')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            Events & Webinars
                          </div>
                          <div className="text-xs text-gray-500">
                            Upcoming events and learning opportunities
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.email.events}
                            onChange={() =>
                            handleNotificationChange('email', 'events')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.sms.events}
                            onChange={() =>
                            handleNotificationChange('sms', 'events')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.app.events}
                            onChange={() =>
                            handleNotificationChange('app', 'events')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            News & Updates
                          </div>
                          <div className="text-xs text-gray-500">
                            Platform news and feature updates
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.email.news}
                            onChange={() =>
                            handleNotificationChange('email', 'news')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.sms.news}
                            onChange={() =>
                            handleNotificationChange('sms', 'news')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-center">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.app.news}
                            onChange={() =>
                            handleNotificationChange('app', 'news')
                            } />
                          
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  
                    Save Preferences
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">
                Company Profile
              </h3>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <BuildingIcon className="w-12 h-12 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {userData.name}
              </h3>
              <p className="text-sm text-gray-500">
                {userData.industry} • Founded {userData.founded}
              </p>
              <div className="w-full mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Verification Status
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Company Registration
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Tax Compliance
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">B-BBEE Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Level 2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bank Account</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">
                Account Settings
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <UserIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        Account Information
                      </h4>
                      <p className="text-xs text-gray-500">
                        Manage your account details
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        Security Settings
                      </h4>
                      <p className="text-xs text-gray-500">
                        Manage login and security
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <BellIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        Notifications
                      </h4>
                      <p className="text-xs text-gray-500">
                        Manage notification preferences
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <SettingsIcon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        Preferences
                      </h4>
                      <p className="text-xs text-gray-500">
                        Customize your experience
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center p-3 text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
function ChevronRightIcon(props) {
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
      
      <path d="m9 18 6-6-6-6" />
    </svg>);

}