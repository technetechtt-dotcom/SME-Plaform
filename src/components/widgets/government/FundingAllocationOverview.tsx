import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend } from
'recharts';
import { TrendingUpIcon, TrendingDownIcon, AlertCircleIcon } from 'lucide-react';
const allocationData = [
{
  name: 'Manufacturing',
  value: 35,
  color: '#1D4ED8'
},
{
  name: 'Technology',
  value: 25,
  color: '#10B981'
},
{
  name: 'Agriculture',
  value: 15,
  color: '#FBBF24'
},
{
  name: 'Tourism',
  value: 10,
  color: '#EC4899'
},
{
  name: 'Other Sectors',
  value: 15,
  color: '#6B7280'
}];

const regionData = [
{
  name: 'Gauteng',
  value: 40,
  color: '#1D4ED8'
},
{
  name: 'Western Cape',
  value: 25,
  color: '#10B981'
},
{
  name: 'KZN',
  value: 20,
  color: '#FBBF24'
},
{
  name: 'Other Provinces',
  value: 15,
  color: '#6B7280'
}];

const summaryStats = [
{
  id: 'total',
  label: 'Total Allocated',
  value: 'R125.5M',
  change: '+12%',
  trend: 'up',
  color: 'text-green-600'
},
{
  id: 'disbursed',
  label: 'Disbursed',
  value: 'R78.3M',
  percentage: '62%',
  change: '+8%',
  trend: 'up',
  color: 'text-green-600'
},
{
  id: 'pending',
  label: 'Pending Approval',
  value: 'R32.2M',
  percentage: '26%',
  change: '-3%',
  trend: 'down',
  color: 'text-amber-500'
},
{
  id: 'remaining',
  label: 'Remaining Budget',
  value: 'R15.0M',
  percentage: '12%',
  change: '-15%',
  trend: 'down',
  color: 'text-red-500'
}];

export function FundingAllocationOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          Funding Allocation Overview
        </h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {summaryStats.map((stat) =>
          <div key={stat.id} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {stat.value}
              </p>
              {stat.percentage &&
            <p className="text-xs text-gray-600">
                  {stat.percentage} of total
                </p>
            }
              {stat.change &&
            <div
              className={`mt-1 text-xs font-medium flex items-center ${stat.color}`}>
              
                  {stat.trend === 'up' ?
              <TrendingUpIcon className="w-3 h-3 mr-1" /> :

              <TrendingDownIcon className="w-3 h-3 mr-1" />
              }
                  {stat.change} YoY
                </div>
            }
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-xs font-medium text-gray-700 mb-3">
              Allocation by Sector
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}>
                    
                    {allocationData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-xs font-medium text-gray-700 mb-3">
              Allocation by Region
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}>
                    
                    {regionData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-200 flex items-start">
          <AlertCircleIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-amber-800">Budget Alert</h4>
            <p className="mt-1 text-sm text-amber-700">
              Manufacturing sector allocation is nearing its annual cap (85%
              utilized). Consider reallocating funds from lower-demand sectors.
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
        <button className="text-sm font-medium text-green-600 hover:text-green-800">
          View Detailed Allocation
        </button>
      </div>
    </div>);

}