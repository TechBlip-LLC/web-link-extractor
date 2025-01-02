import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface UrlInputProps {
  onFetch: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function UrlInput({ onFetch, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onFetch(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 pl-10 bg-white rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            required
          />
          <Globe className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:bg-blue-400"
        >
          {isLoading ? 'Fetching...' : 'Fetch Content'}
        </button>
      </div>
    </form>
  );
}