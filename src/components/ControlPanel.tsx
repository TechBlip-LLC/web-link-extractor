import React from 'react';
import { SearchBar } from './SearchBar';
import { DownloadButton } from './DownloadButton';
import { Mail } from 'lucide-react';
import type { LinkInfo } from '../utils/linkExtractor';

interface ControlPanelProps {
  pattern: string;
  setPattern: (pattern: string) => void;
  useRegex: boolean;
  setUseRegex: (useRegex: boolean) => void;
  links: LinkInfo[];
  onEmailClick: () => void;
}

export function ControlPanel({
  pattern,
  setPattern,
  useRegex,
  setUseRegex,
  links,
  onEmailClick
}: ControlPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pb-6 border-b border-gray-200">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search and Filter</h2>
        <SearchBar
          pattern={pattern}
          setPattern={setPattern}
          useRegex={useRegex}
          setUseRegex={setUseRegex}
          onSearch={() => {}}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
        <DownloadButton links={links} />
        <button
          onClick={onEmailClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors w-full sm:w-auto justify-center"
        >
          <Mail className="w-4 h-4" />
          Email Links
        </button>
      </div>
    </div>
  );
}