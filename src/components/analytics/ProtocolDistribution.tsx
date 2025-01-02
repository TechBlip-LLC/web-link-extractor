import React from 'react';
import { ProtocolBar } from './ProtocolBar';
import type { LinkAnalytics } from '../../utils/analytics';

interface ProtocolDistributionProps {
  protocols: LinkAnalytics['protocolStats'];
  totalLinks: number;
}

export function ProtocolDistribution({ protocols, totalLinks }: ProtocolDistributionProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Protocol Distribution</h3>
      <div className="space-y-2">
        <ProtocolBar
          label="HTTPS"
          count={protocols.https}
          total={totalLinks}
          color="bg-green-500"
        />
        <ProtocolBar
          label="HTTP"
          count={protocols.http}
          total={totalLinks}
          color="bg-yellow-500"
        />
        <ProtocolBar
          label="Other"
          count={protocols.other}
          total={totalLinks}
          color="bg-gray-500"
        />
      </div>
    </div>
  );
}