import React from 'react';
import { BarChart3, Globe2, Link2, FileText } from 'lucide-react';
import type { LinkAnalytics } from '../utils/analytics';
import { StatCard } from './analytics/StatCard';
import { TopDomains } from './analytics/TopDomains';
import { ProtocolDistribution } from './analytics/ProtocolDistribution';

interface AnalyticsProps {
  analytics: LinkAnalytics;
}

export function Analytics({ analytics }: AnalyticsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-orange-500" />
        Analytics Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Link2 className="w-5 h-5 text-blue-500" />}
          label="Total Links"
          value={analytics.totalLinks.toString()}
        />
        <StatCard
          icon={<Globe2 className="w-5 h-5 text-green-500" />}
          label="Unique Domains"
          value={analytics.uniqueDomains.toString()}
        />
        <StatCard
          icon={<FileText className="w-5 h-5 text-purple-500" />}
          label="Avg. Text Length"
          value={`${analytics.averageTextLength} chars`}
        />
        <StatCard
          icon={<Link2 className="w-5 h-5 text-indigo-500" />}
          label="External Links"
          value={analytics.externalLinks.toString()}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopDomains domains={analytics.topDomains} />
        <ProtocolDistribution 
          protocols={analytics.protocolStats}
          totalLinks={analytics.totalLinks}
        />
      </div>
    </div>
  );
}