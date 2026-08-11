import { visit } from 'unist-util-visit';

/**
 * Replicates the legacy Next.js heading-slug scheme (utils/getHeadingLink.ts) so
 * that in-content `#anchor` links and external deep links keep resolving after the
 * migration. The legacy scheme differs from Starlight's default github-slugger in
 * two important ways:
 *   - dots are PRESERVED (`frontMatter.taxonomy.seoTitleField` -> `frontmatter.taxonomy.seotitlefield`)
 *   - duplicate headings are NOT de-duplicated (no `-1` suffixes)
 *
 * Legacy algorithm (applied to the heading's last text child):
 *   value.toLowerCase().replace(/\s/g,"-").replace(/[^a-zA-Z0-9.-]/g,"")
 *
 * This runs at the rehype stage AFTER Astro's built-in heading-id plugin, so it
 * overrides those IDs. It also rewrites the matching entries in
 * `file.data.astro.headings` so Starlight's "On this page" table of contents links
 * point at the same IDs.
 */
export function legacyHeadingSlug(value) {
  return value
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '');
}

/** Text used for slugging: the last direct text child (matching the legacy code). */
function slugSourceText(node) {
  const textChildren = (node.children || []).filter((c) => c.type === 'text');
  if (textChildren.length > 0) {
    return textChildren[textChildren.length - 1].value;
  }
  // Fallback: concatenate everything textual.
  let out = '';
  visit(node, 'text', (t) => {
    out += t.value;
  });
  return out;
}

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export default function rehypeLegacyHeadingIds() {
  return (tree, file) => {
    const headings = file.data?.astro?.headings ?? [];
    let i = 0;

    visit(tree, 'element', (node) => {
      if (!HEADING_TAGS.has(node.tagName)) return;
      const text = slugSourceText(node);
      const id = legacyHeadingSlug(text);
      node.properties = node.properties || {};
      node.properties.id = id;

      // Heading elements and Astro's TOC metadata are both in document order and
      // correspond 1:1, so align by index and keep the ToC anchors matching.
      const depth = Number(node.tagName.slice(1));
      if (headings[i] && headings[i].depth === depth) {
        headings[i].slug = id;
      }
      i++;
    });
  };
}
