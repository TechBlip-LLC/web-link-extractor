import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { UrlInput } from './components/UrlInput';
import { LinkList } from './components/LinkList';
import { EmailDialog } from './components/EmailDialog';
import { ControlPanel } from './components/ControlPanel';
import { Analytics } from './components/Analytics';
import { fetchWebContent } from './utils/scraper';
import { extractLinks, type LinkInfo } from './utils/linkExtractor';
import { analyzeLinkData } from './utils/analytics';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';

export default function App() {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [pattern, setPattern] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const analytics = useMemo(() => analyzeLinkData(links), [links]);

  const handleFetchContent = async (url: string) => {
    setIsLoading(true);
    setError('');
    try {
      const html = await fetchWebContent(url);
      const extractedLinks = extractLinks(html);
      setLinks(extractedLinks);
    } catch (err) {
      setError('Failed to fetch website content. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <Header />

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Website URL</h2>
              <UrlInput onFetch={handleFetchContent} isLoading={isLoading} />
            </div>

            {error && <ErrorMessage message={error} />}

            {links.length > 0 && (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <Analytics analytics={analytics} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <ControlPanel
                    pattern={pattern}
                    setPattern={setPattern}
                    useRegex={useRegex}
                    setUseRegex={setUseRegex}
                    links={links}
                    onEmailClick={() => setShowEmailDialog(true)}
                  />

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>
                    <LinkList 
                      links={links}
                      searchPattern={pattern}
                      useRegex={useRegex}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />

      {showEmailDialog && (
        <EmailDialog
          links={links}
          onClose={() => setShowEmailDialog(false)}
        />
      )}
    </div>
  );
}