import * as cheerio from 'cheerio';

export interface LinkInfo {
  url: string;
  text: string;
}

export function extractLinks(html: string): LinkInfo[] {
  const $ = cheerio.load(html);
  const links: LinkInfo[] = [];

  $('a').each((_, element) => {
    const $link = $(element);
    const url = $link.attr('href');
    const text = $link.text().trim();

    if (url && text && !url.startsWith('#')) {
      // Convert relative URLs to absolute
      const absoluteUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).href;
      links.push({ url: absoluteUrl, text });
    }
  });

  return links;
}