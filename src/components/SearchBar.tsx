import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  pattern: string;
  setPattern: (pattern: string) => void;
  useRegex: boolean;
  setUseRegex: (useRegex: boolean) => void;
  onSearch: () => void;
}

export function SearchBar({ pattern, setPattern, useRegex, setUseRegex }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Search links..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
      <label className="flex items-center gap-2 text-gray-700 whitespace-nowrap px-2">
        <input
          type="checkbox"
          checked={useRegex}
          onChange={(e) => setUseRegex(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        Use Regex
      </label>
    </div>
  );
}