import React from 'react';

interface ProtocolBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

export function ProtocolBar({ label, count, total, color }: ProtocolBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-900 font-medium">{count}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}