import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { LinkInfo } from '../utils/linkExtractor';

interface LinkListProps {
  links: LinkInfo[];
  searchPattern?: string;
  useRegex?: boolean;
}

export function LinkList({ links, searchPattern, useRegex }: LinkListProps) {
  const filterLinks = (links: LinkInfo[]): LinkInfo[] => {
    if (!searchPattern) return links;

    try {
      const regex = useRegex
        ? new RegExp(searchPattern, 'i')
        : new RegExp(searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

      return links.filter(link => 
        regex.test(link.text) || regex.test(link.url)
      );
    } catch {
      return links;
    }
  };

  const filteredLinks = filterLinks(links);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-500 px-4">
        <span>Found {filteredLinks.length} links</span>
        {searchPattern && (
          <span>Filtering by: {useRegex ? 'regex' : 'text'} "{searchPattern}"</span>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {filteredLinks.map((link, index) => (
          <div 
            key={index} 
            className="group p-4 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-gray-700 group-hover:text-blue-600"
            >
              <ExternalLink className="w-5 h-5 mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110" />
              <div>
                <div className="font-medium mb-1 break-words">{link.text}</div>
                <div className="text-sm text-gray-500 break-all group-hover:text-blue-500">
                  {link.url}
                </div>
              </div>
            </a>
          </div>
        ))}
        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No links found</div>
            <p className="text-gray-500 text-sm">
              {searchPattern 
                ? "Try adjusting your search criteria"
                : "No links were extracted from the provided URL"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}