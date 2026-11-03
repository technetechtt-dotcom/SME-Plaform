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
  TrendingDownIcon,
  AlertCircleIcon,
  CheckCircleIcon } from
'lucide-react';
import { BlockchainBadge } from '../../common/BlockchainBadge';
const portfolioData = [
{
  month: 'Jan',
  actual: 12.5,
  predicted: 12.5
},
{
  month: 'Feb',
  actual: 14.2,
  predicted: 14.2
},
{
  month: 'Mar',
  actual: 15.8,
  predicted: 15.8
},
{
  month: 'Apr',
  actual: 17.3,
  predicted: 17.3
},
{
  month: 'May',
  actual: 18.5,
  predicted: 18.5
},
{
  month: 'Jun',
  actual: 19.2,
  predicted: 19.2
},
{
  month: 'Jul',
  predicted: 21.4
},
{
  month: 'Aug',
  predicted: 23.1
},
{
  month: 'Sep',
  predicted: 24.8
}];

const investmentsByStage = [
{
  name: 'Early Stage',
  value: 25,
  color: '#1D4ED8'
},
{
  name: 'Growth',
  value: 45,
  color: '#10B981'
},
{
  name: 'Expansion',
  value: 30,
  color: '#FBBF24'
}];

const investmentsBySector = [
{
  name: 'Technology',
  value: 40
},
{
  name: 'Manufacturing',
  value: 25
},
{
  name: 'Agriculture',
  value: 15
},
{
  name: 'Renewable Energy',
  value: 12
},
{
  name: 'Other',
  value: 8
}];

const portfolioCompanies = [
{
  id: 1,
  name: 'TechSolutions Ltd',
  investment: 'R2.5M',
  currentValue: 'R3.2M',
  roi: '+28%',
  trend: 'up',
  predictedValue: 'R4.1M by Q4',
  risk: 'low',
  blockchain: true
},
{
  id: 2,
  name: 'GreenEnergy Innovations',
  investment: 'R1.8M',
  currentValue: 'R2.1M',
  roi: '+16%',
  trend: 'up',
  predictedValue: 'R2.8M by Q4',
  risk: 'medium',
  blockchain: true
},
{
  id: 3,
  name: 'AgriTech Solutions',
  investment: 'R3.2M',
  currentValue: 'R2.9M',
  roi: '-9%',
  trend: 'down',
  predictedValue: 'R3.5M by Q4',
  risk: 'high',
  blockchain: true
}];

export function PortfolioPerformance() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          Portfolio Performance
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          AI Powered
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500">Total Invested</p>
            <p className="text-lg font-semibold text-gray-800">R12.5M</p>
            <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              +35% YoY
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500">Current Value</p>
            <p className="text-lg font-semibold text-gray-800">R19.2M</p>
            <div className="mt-1 text-xs font-medium text-green-600 flex items-center">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              +53.6% ROI
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500">
              Predicted EOY Value
            </p>
            <p className="text-lg font-semibold text-blue-700">R24.8M</p>
            <div className="mt-1 text-xs text-gray-500">
              +29.2% from current
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500">
              Active Investments
            </p>
            <p className="text-lg font-semibold text-gray-800">8</p>
            <div className="mt-1 text-xs text-gray-500">3 in due diligence</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Portfolio Value (Actual vs Predicted)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={portfolioData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5
                }}>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Value (R millions)"
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
                  dataKey="predicted"
                  name="Predicted Value (R millions)"
                  stroke="#FCD34D"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{
                    r: 4
                  }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Investment Distribution
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">
                By Stage
              </h5>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={investmentsByStage}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5
                    }}>
                    
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{
                        fontSize: 12
                      }} />
                    
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      name="Percentage"
                      fill="#1D4ED8"
                      radius={[0, 4, 4, 0]} />
                    
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-600 mb-2">
                By Sector
              </h5>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={investmentsBySector}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5
                    }}>
                    
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{
                        fontSize: 12
                      }} />
                    
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      name="Percentage"
                      fill="#FBBF24"
                      radius={[0, 4, 4, 0]} />
                    
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-xs font-medium text-gray-700 mb-3">
            Top Performing Investments
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prediction
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {portfolioCompanies.map((company) =>
                <tr key={company.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                      {company.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                      {company.investment}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                      {company.currentValue}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                      className={`flex items-center ${company.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      
                        {company.trend === 'up' ?
                      <TrendingUpIcon className="w-4 h-4 mr-1" /> :

                      <TrendingDownIcon className="w-4 h-4 mr-1" />
                      }
                        {company.roi}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600">
                      {company.predictedValue}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${company.risk === 'low' ? 'bg-green-100 text-green-800' : company.risk === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      
                        {company.risk}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      {company.blockchain &&
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
        <button className="text-sm font-medium text-amber-600 hover:text-amber-800">
          View All Investments
        </button>
      </div>
    </div>);

}