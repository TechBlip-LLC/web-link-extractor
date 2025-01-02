import type { LinkInfo } from './linkExtractor';

export function formatLinksForEmail(links: LinkInfo[]): string {
  const linksList = links
    .map(link => `
      <div style="margin-bottom: 16px;">
        <div style="font-weight: bold;">${link.text}</div>
        <a href="${link.url}" style="color: #2563eb;">${link.url}</a>
      </div>
    `)
    .join('');

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1f2937; font-size: 24px; margin-bottom: 24px;">Extracted Links</h1>
      ${linksList}
    </div>
  `;
}