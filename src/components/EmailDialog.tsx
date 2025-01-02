import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { sendEmail } from '../utils/emailService';
import { formatLinksForEmail } from '../utils/formatEmail';
import type { LinkInfo } from '../utils/linkExtractor';

interface EmailDialogProps {
  links: LinkInfo[];
  onClose: () => void;
}

export function EmailDialog({ links, onClose }: EmailDialogProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await sendEmail({
        to: email,
        subject: 'Your Extracted Links',
        html: formatLinksForEmail(links),
      });
      setStatus('success');
      setTimeout(onClose, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send email. Please ensure Mailpit Docker container is running with ports 1025 and 8025 mapped.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Email Links</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={status === 'sending' || status === 'success'}
              placeholder="Enter recipient email"
            />
          </div>

          {status === 'error' && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}

          {status === 'success' && (
            <div className="text-green-600 text-sm">Email sent successfully! Check Mailpit UI at localhost:8025</div>
          )}

          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-blue-400"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
}