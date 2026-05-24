import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const writeups = (await getCollection('writeups', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: 'moizxsec — Abdul Moiz',
    description:
      'Security research, vulnerability disclosures, and offensive engineering writeups.',
    site: context.site!,
    items: writeups.map((w) => ({
      title: w.data.title,
      description: w.data.summary,
      pubDate: w.data.date,
      link: `/writeups/${w.slug}/`,
      categories: w.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
