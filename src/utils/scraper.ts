export async function fetchWebContent(url: string): Promise<string> {
  // Using AllOrigins as a CORS proxy
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch website content');
    }
    const html = await response.text();
    return html;
  } catch (error) {
    throw new Error('Failed to fetch website content');
  }
}

export function extractTextContent(html: string): string {
  // Using DOMParser to extract text content
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove script and style elements
  const scripts = doc.getElementsByTagName('script');
  const styles = doc.getElementsByTagName('style');
  
  Array.from(scripts).forEach(script => script.remove());
  Array.from(styles).forEach(style => style.remove());
  
  // Get text content
  return doc.body.textContent || '';
}