import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Changelog entries (content/changelog/*.md) power the /updates pages and RSS.
// The aggregate CHANGELOG.md has no frontmatter title; individual v*.md files do.
const changelog = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './content/changelog',
    // Preserve the exact filename as the id so dotted versions keep their old
    // URLs (e.g. v5.0.0.md -> /updates/v5.0.0). The default slugifier strips dots.
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      lastmod: z.coerce.date().optional(),
      slug: z.string().optional(),
      fmContentType: z.string().optional(),
    })
    .passthrough(),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  changelog,
};
