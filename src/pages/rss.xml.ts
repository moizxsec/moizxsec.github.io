import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, byDateDesc, getPublished } from '../lib/writeups';

export async function GET(context: APIContext) {
  const writeups = (await getPublished()).sort(byDateDesc);

  return rss({
    title: `${SITE.handle} — ${SITE.name}`,
    description: 'Vulnerability research, CVE disclosures, and offensive security engineering writeups.',
    site: context.site!,
    items: writeups.map((w) => {
      // Lead with the identifier so a feed reader shows "CVE-… — title" for disclosures.
      const prefix = w.data.cve ?? w.data.ghsa;
      return {
        title: prefix ? `${prefix} — ${w.data.title}` : w.data.title,
        description: w.data.summary,
        pubDate: w.data.date,
        link: `/writeups/${w.slug}/`,
        categories: [w.data.type, ...w.data.tags],
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
