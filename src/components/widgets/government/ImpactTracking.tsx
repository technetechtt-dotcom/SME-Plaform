import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line } from
'recharts';
import {
  TrendingUpIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon } from
'lucide-react';
const impactData = [
{
  quarter: 'Q1',
  jobsCreated: 450,
  businessesSupported: 120,
  revenueGrowth: 8,
  predictedJobs: 450,
  predictedBusinesses: 120,
  predictedGrowth: 8
},
{
  quarter: 'Q2',
  jobsCreated: 580,
  businessesSupported: 145,
  revenueGrowth: 12,
  predictedJobs: 580,
  predictedBusinesses: 145,
  predictedGrowth: 12
},
{
  quarter: 'Q3',
  jobsCreated: 720,
  businessesSupported: 175,
  revenueGrowth: 15,
  predictedJobs: 720,
  predictedBusinesses: 175,
  predictedGrowth: 15
},
{
  quarter: 'Q4',
  predictedJobs: 850,
  predictedBusinesses: 210,
  predictedGrowth: 18
},
{
  quarter: 'Q1 (Next)',
  predictedJobs: 920,
  predictedBusinesses: 230,
  predictedGrowth: 20
}];

export function ImpactTracking() {
  const metrics = [
  {
    id: 'jobs',
    label: 'Jobs Created',
    value: '1,750',
    change: '+24%',
    icon: <UsersIcon className="w-5 h-5 text-blue-500" />,
    prediction: '2,670 by Q1 next year'
  },
  {
    id: 'businesses',
    label: 'Businesses Supported',
    value: '440',
    change: '+18%',
    icon: <BuildingIcon className="w-5 h-5 text-green-500" />,
    prediction: '670 by Q1 next year'
  },
  {
    id: 'revenue',
    label: 'Avg. Revenue Growth',
    value: '15%',
    change: '+3%',
    icon: <TrendingUpIcon className="w-5 h-5 text-amber-500" />,
    prediction: '20% by Q1 next year'
  },
  {
    id: 'roi',
    label: 'Funding ROI',
    value: '3.2x',
    change: '+0.4x',
    icon: <BriefcaseIcon className="w-5 h-5 text-purple-500" />,
    prediction: '3.8x by Q1 next year'
  }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          Impact Tracking + Predictive Analytics
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          AI Powered
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {metrics.map((metric) =>
        <div key={metric.id} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">{metric.icon}</div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-500">
                  {metric.label}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {metric.value}
                </p>
              </div>
            </div>
            {metric.change &&
          <div className="mt-1 text-xs font-medium text-green-600">
                {metric.change} YTD
              </div>
          }
            <div className="mt-1 text-xs text-gray-500">
              Predicted: {metric.prediction}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Jobs Created vs Businesses Supported
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={impactData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="quarter" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="jobsCreated"
                  name="Jobs Created"
                  fill="#1D4ED8"
                  radius={[4, 4, 0, 0]} />
                
                <Bar
                  yAxisId="left"
                  dataKey="predictedJobs"
                  name="Predicted Jobs"
                  fill="#93C5FD"
                  radius={[4, 4, 0, 0]} />
                
                <Bar
                  yAxisId="right"
                  dataKey="businessesSupported"
                  name="Businesses"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]} />
                
                <Bar
                  yAxisId="right"
                  dataKey="predictedBusinesses"
                  name="Predicted Businesses"
                  fill="#6EE7B7"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Revenue Growth Trend (Actual vs Predicted)
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={impactData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5
                }}>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="quarter"
                  tick={{
                    fontSize: 10
                  }} />
                
                <YAxis
                  tick={{
                    fontSize: 10
                  }} />
                
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenueGrowth"
                  name="Actual Growth %"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  dot={{
                    r: 4
                  }}
                  activeDot={{
                    r: 6
                  }} />
                
                <Line
                  type="monotone"
                  dataKey="predictedGrowth"
                  name="Predicted Growth %"
                  stroke="#FCD34D"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{
                    r: 4
                  }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full inline-block mr-1"></span>
              Actual
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-amber-300 rounded-full inline-block mr-1"></span>
              Predicted
            </div>
          </div>
        </div>
      </div>
    </div>);

}