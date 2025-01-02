import type { LinkInfo } from './linkExtractor';

export function downloadLinks(links: LinkInfo[], format: 'csv' | 'json' = 'csv') {
  const data = format === 'csv' 
    ? convertToCSV(links)
    : JSON.stringify(links, null, 2);

  const blob = new Blob([data], { 
    type: format === 'csv' ? 'text/csv' : 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `extracted-links.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function convertToCSV(links: LinkInfo[]): string {
  const header = 'Text,URL\n';
  const rows = links.map(link => 
    `"${link.text.replace(/"/g, '""')}","${link.url}"`
  ).join('\n');
  
  return header + rows;
}