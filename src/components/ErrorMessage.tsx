import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="animate-fade-in rounded-lg bg-red-50 border border-red-200 p-4 flex items-center gap-3">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
        <span className="text-red-600">⚠️</span>
      </div>
      <p className="text-red-700">{message}</p>
    </div>
  );
}