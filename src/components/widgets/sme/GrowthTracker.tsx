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
  BanknoteIcon } from
'lucide-react';
const growthData = [
{
  month: 'Jan',
  revenue: 120000,
  employees: 12,
  funding: 0
},
{
  month: 'Feb',
  revenue: 135000,
  employees: 13,
  funding: 0
},
{
  month: 'Mar',
  revenue: 140000,
  employees: 15,
  funding: 250000
},
{
  month: 'Apr',
  revenue: 155000,
  employees: 15,
  funding: 0
},
{
  month: 'May',
  revenue: 170000,
  employees: 16,
  funding: 0
},
{
  month: 'Jun',
  revenue: 180000,
  employees: 18,
  funding: 0
}];

const predictedData = [
{
  month: 'Jul',
  revenue: 195000,
  employees: 20,
  funding: 0
},
{
  month: 'Aug',
  revenue: 210000,
  employees: 21,
  funding: 0
},
{
  month: 'Sep',
  revenue: 225000,
  employees: 22,
  funding: 300000
}];

export function GrowthTracker() {
  const metrics = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: 'R180,000',
    change: '+5.8%',
    icon: <TrendingUpIcon className="w-5 h-5 text-green-500" />,
    prediction: 'R225,000 by Sep'
  },
  {
    id: 'employees',
    label: 'Employees',
    value: '18',
    change: '+2',
    icon: <UsersIcon className="w-5 h-5 text-blue-500" />,
    prediction: '22 by Sep'
  },
  {
    id: 'funding',
    label: 'Funding Received',
    value: 'R250,000',
    change: '',
    icon: <BanknoteIcon className="w-5 h-5 text-amber-500" />,
    prediction: 'R300,000 more by Sep'
  },
  {
    id: 'jobs',
    label: 'Jobs Created',
    value: '6',
    change: '+3',
    icon: <BriefcaseIcon className="w-5 h-5 text-purple-500" />,
    prediction: '10 by Sep'
  }];

  const allData = [...growthData, ...predictedData];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Growth Tracker</h3>
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
                {metric.change} from previous month
              </div>
          }
            <div className="mt-1 text-xs text-gray-500">
              Predicted: {metric.prediction}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Revenue Growth
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={allData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5
                }}>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
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
                  dataKey="revenue"
                  stroke="#1D4ED8"
                  strokeWidth={2}
                  dot={{
                    r: 3
                  }}
                  activeDot={{
                    r: 5
                  }}
                  isAnimationActive={false} />
                
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#93C5FD"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  data={predictedData}
                  dot={{
                    r: 3
                  }}
                  isAnimationActive={false} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-600 rounded-full inline-block mr-1"></span>
              Actual
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-300 rounded-full inline-block mr-1"></span>
              Predicted
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Funding & Employees
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={allData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5
                }}>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 10
                  }} />
                
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{
                    fontSize: 10
                  }} />
                
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{
                    fontSize: 10
                  }} />
                
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="employees"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]} />
                
                <Bar
                  yAxisId="right"
                  dataKey="funding"
                  fill="#FBBF24"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1"></span>
              Employees
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-amber-400 rounded-full inline-block mr-1"></span>
              Funding (R)
            </div>
          </div>
        </div>
      </div>
    </div>);

}