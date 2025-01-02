import React from 'react';

interface ResultsProps {
  matches: string[];
  pattern: string;
  useRegex: boolean;
}

export function Results({ matches, pattern, useRegex }: ResultsProps) {
  const highlightMatch = (text: string) => {
    if (!pattern) return text;
    
    if (useRegex) {
      try {
        const regex = new RegExp(pattern, 'gi');
        return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`);
      } catch {
        return text;
      }
    }
    
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedPattern, 'gi');
    return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`);
  };

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Results ({matches.length})
      </h2>
      <div className="space-y-2">
        {matches.map((match, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-lg border border-gray-200"
            dangerouslySetInnerHTML={{ __html: highlightMatch(match) }}
          />
        ))}
        {matches.length === 0 && pattern && (
          <p className="text-gray-500 italic">No matches found</p>
        )}
      </div>
    </div>
  );
}