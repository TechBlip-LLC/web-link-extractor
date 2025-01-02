import React from 'react';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

export function TextInput({ text, setText }: TextInputProps) {
  return (
    <div className="w-full max-w-3xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full h-48 p-4 bg-white rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
      />
    </div>
  );
}