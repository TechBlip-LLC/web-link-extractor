import type { LinkInfo } from './linkExtractor';

export interface LinkAnalytics {
  totalLinks: number;
  uniqueDomains: number;
  topDomains: Array<{ domain: string; count: number }>;
  averageTextLength: number;
  protocolStats: {
    http: number;
    https: number;
    other: number;
  };
  externalLinks: number;
  internalLinks: number;
}

export function analyzeLinkData(links: LinkInfo[], currentDomain?: string): LinkAnalytics {
  const domains = new Map<string, number>();
  let totalTextLength = 0;
  const protocols = { http: 0, https: 0, other: 0 };
  let externalCount = 0;
  let internalCount = 0;

  links.forEach(link => {
    // Domain analysis
    const url = new URL(link.url);
    const domain = url.hostname;
    domains.set(domain, (domains.get(domain) || 0) + 1);

    // Text length
    totalTextLength += link.text.length;

    // Protocol analysis
    if (url.protocol === 'http:') protocols.http++;
    else if (url.protocol === 'https:') protocols.https++;
    else protocols.other++;

    // Internal/External analysis
    if (currentDomain && domain === currentDomain) {
      internalCount++;
    } else {
      externalCount++;
    }
  });

  // Sort domains by count
  const topDomains = Array.from(domains.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([domain, count]) => ({ domain, count }));

  return {
    totalLinks: links.length,
    uniqueDomains: domains.size,
    topDomains,
    averageTextLength: links.length ? Math.round(totalTextLength / links.length) : 0,
    protocolStats: protocols,
    externalLinks: externalCount,
    internalLinks: internalCount,
  };
}