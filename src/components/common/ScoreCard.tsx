import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  type: 'percentage' | 'count' | 'currency' | 'ai' | 'roi' | 'money';
  description: string;
}
export function ScoreCard({
  title,
  score,
  maxScore,
  trend,
  trendValue,
  type,
  description
}: ScoreCardProps) {
  const formatScore = () => {
    if (score === undefined || score === null) {
      return '-';
    }
    if (type === 'percentage' || type === 'ai') {
      return `${score}%`;
    } else if (type === 'currency' || type === 'money') {
      return `R${score.toLocaleString()}`;
    } else if (type === 'roi') {
      return `${score}x`;
    } else {
      return score.toLocaleString();
    }
  };
  const formatMax = () => {
    if (maxScore === undefined || maxScore === null) {
      return '-';
    }
    if (type === 'percentage' || type === 'ai') {
      return `${maxScore}%`;
    } else if (type === 'currency' || type === 'money') {
      return `R${maxScore.toLocaleString()}`;
    } else if (type === 'roi') {
      return `${maxScore}x`;
    } else {
      return maxScore.toLocaleString();
    }
  };
  const getProgressColor = () => {
    if (
    score === undefined ||
    score === null ||
    maxScore === undefined ||
    maxScore === null ||
    maxScore === 0)
    {
      return 'bg-gray-500';
    }
    const percentage = score / maxScore * 100;
    if (percentage >= 75) {
      return 'bg-green-500';
    } else if (percentage >= 50) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };
  const getProgressWidth = () => {
    if (
    score === undefined ||
    score === null ||
    maxScore === undefined ||
    maxScore === null ||
    maxScore === 0)
    {
      return 0;
    }
    return Math.min(score / maxScore * 100, 100);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {trend !== 'neutral' &&
        <div
          className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          
            {trend === 'up' ?
          <TrendingUpIcon className="w-3 h-3 mr-1" /> :

          <TrendingDownIcon className="w-3 h-3 mr-1" />
          }
            <span>{trendValue}%</span>
          </div>
        }
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{formatScore()}</p>
        {type !== 'currency' && type !== 'money' &&
        <p className="ml-1 text-sm text-gray-500">/ {formatMax()}</p>
        }
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor()}`}
            style={{
              width: `${getProgressWidth()}%`
            }}>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>);

}