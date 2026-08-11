import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

/**
 * Converts the legacy "bold-prefixed blockquote" callouts into tagged callouts,
 * matching the old markup so the ported CSS applies:
 *
 *   > **Info**: some text        ->  <blockquote><p class="tag">Info</p><p>some text</p></blockquote>
 *   > **Important**: some text   ->  <blockquote class="important"> ... </blockquote>
 *
 * Used 84x (Info) + 39x (Important) + a few one-offs across the docs.
 */
export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const first = node.children[0];
      if (!first || first.type !== 'paragraph') return;
      const strong = first.children[0];
      if (!strong || strong.type !== 'strong') return;

      const label = toString(strong).trim();
      if (!label) return;

      // Drop the leading strong node and any following ": " separator text.
      first.children.shift();
      const next = first.children[0];
      if (next && next.type === 'text') {
        next.value = next.value.replace(/^\s*:?\s*/, '');
        if (next.value === '') first.children.shift();
      }

      const isImportant = label.toLowerCase() === 'important';
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      if (isImportant) node.data.hProperties.className = ['important'];

      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['tag'] } },
        children: [{ type: 'text', value: label }],
      });
    });
  };
}
