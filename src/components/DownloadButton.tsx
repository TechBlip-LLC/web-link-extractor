import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { downloadLinks } from '../utils/downloadLinks';
import type { LinkInfo } from '../utils/linkExtractor';

interface DownloadButtonProps {
  links: LinkInfo[];
}

export function DownloadButton({ links }: DownloadButtonProps) {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-100 focus:border-green-400"
      >
        <option value="csv">CSV Format</option>
        <option value="json">JSON Format</option>
      </select>
      <button
        onClick={() => downloadLinks(links, format)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors flex-1 sm:flex-initial justify-center"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}