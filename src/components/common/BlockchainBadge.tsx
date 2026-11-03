import React from 'react';
import { CheckCircleIcon, LinkIcon } from 'lucide-react';
interface BlockchainBadgeProps {
  verified?: boolean;
  transactionId?: string;
  amount?: string;
  compact?: boolean;
}
export function BlockchainBadge({
  verified = true,
  transactionId = '0x7a69...4c2e',
  amount,
  compact = false
}: BlockchainBadgeProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1">
        <LinkIcon className="w-3 h-3 text-blue-600 mr-1" />
        <span className="text-xs font-medium text-blue-700">Verified</span>
      </div>);

  }
  return (
    <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-3">
      <div className="flex-shrink-0">
        <LinkIcon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <p className="text-sm font-medium text-blue-900 truncate">
            Blockchain Verified
          </p>
          {verified &&
          <CheckCircleIcon className="ml-1.5 h-4 w-4 flex-shrink-0 text-green-500" />
          }
        </div>
        <p className="text-xs text-gray-500 truncate">{transactionId}</p>
        {amount &&
        <p className="text-xs font-medium text-gray-700 mt-0.5">
            Amount: {amount}
          </p>
        }
      </div>
    </div>);

}