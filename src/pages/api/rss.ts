import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// Preserves the legacy /api/rss feed. Only individual release notes (with a
// frontmatter title) are included — the aggregate CHANGELOG.md is excluded.
export async function GET(context: APIContext) {
  const entries = await getCollection('changelog', ({ data }) => Boolean(data.title));
  entries.sort(
    (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0)
  );

  return rss({
    title: 'Changelog RSS Feed',
    description: 'An overview of all updates from the Front Matter extension',
    site: context.site ?? 'https://frontmatter.codes',
    items: entries.map((entry) => ({
      title: entry.data.title ?? entry.id,
      description: entry.data.description,
      link: `/updates/${entry.id}`,
      pubDate: entry.data.date,
    })),
  });
}
