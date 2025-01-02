import React from 'react';
import { Link } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
          <Link className="w-16 h-16 text-white drop-shadow-md" strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Web Link Extractor</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Extract and analyze links from any website. Enter a URL below.
        </p>
      </div>
    </div>
  );
}