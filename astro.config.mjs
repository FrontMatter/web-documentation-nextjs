import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { buildSidebar } from './src/sidebar.mjs';
import remarkCallouts from './src/plugins/remark-callouts.mjs';
import remarkCodeTitles from './src/plugins/remark-code-titles.mjs';
import rehypeLegacyHeadingIds from './src/plugins/rehype-heading-ids.mjs';
import rehypeVscodeLinks from './src/plugins/rehype-vscode-links.mjs';

const GITHUB_DOCS = 'https://github.com/FrontMatter/web-documentation-nextjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://frontmatter.codes',
  markdown: {
    remarkPlugins: [remarkCallouts, remarkCodeTitles],
    // rehype plugins run after Astro's built-in heading-id plugin, so the legacy
    // slug plugin overrides those IDs (preserving dotted / non-deduped anchors).
    rehypePlugins: [rehypeLegacyHeadingIds, rehypeVscodeLinks],
  },
  redirects: {
    '/docs/content-types': '/docs/content-creation',
  },
  integrations: [
    starlight({
      title: 'Front Matter',
      // Use the marketing-styled 404 (src/pages/404.astro) instead of Starlight's.
      disable404Route: true,
      description:
        'Headless CMS running in Visual Studio Code that helps managing your static sites.',
      logo: { src: './public/frontmatter.svg', alt: 'Front Matter' },
      favicon: '/favicon.ico',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/estruyf/vscode-front-matter' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/JBVtNMsJFB' },
        { icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/did:plc:5bb7t7bwr53rrku6vr7osqy2' },
      ],
      editLink: { baseUrl: `${GITHUB_DOCS}/edit/main/` },
      lastUpdated: true,
      customCss: ['./src/styles/docs.css'],
      components: {
        Head: './src/components/DocsHead.astro',
        Banner: './src/components/DocsBanner.astro',
        Footer: './src/components/DocsFooter.astro',
      },
      sidebar: [
        ...buildSidebar(),
        { label: 'Changelog', link: '/updates' },
        { label: 'Support', link: 'https://github.com/sponsors/estruyf', attrs: { target: '_blank' } },
      ],
    }),
  ],
});
