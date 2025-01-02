import React from 'react';
import type { LinkAnalytics } from '../../utils/analytics';

interface TopDomainsProps {
  domains: LinkAnalytics['topDomains'];
}

export function TopDomains({ domains }: TopDomainsProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Top Domains</h3>
      <div className="space-y-2">
        {domains.map(({ domain, count }) => (
          <div key={domain} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate flex-1">{domain}</span>
            <span className="text-sm font-medium text-gray-900 ml-2">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}