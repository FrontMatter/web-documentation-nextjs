import { visit } from 'unist-util-visit';

// Small inline VS Code logo markup, prepended inside `.open_vscode` links.
const VSCODE_ICON =
  '<svg class="vscode-icon" viewBox="0 0 100 100" aria-hidden="true" width="16" height="16">' +
  '<path fill="currentColor" d="M75.5 10 40 44 20 28 10 33l17 17-17 17 10 5 20-16 35.5 34L90 84V16zM75 34v32L54 50z"/>' +
  '</svg>';

/**
 * Fixes the legacy VS Code deep links that ship as raw HTML in the docs. Because
 * Astro passes raw HTML through as opaque `raw` nodes (no rehype-raw), we rewrite
 * the HTML string directly:
 *   - `<a href="" ... data-vscode="vscode:...">` -> real href from data-vscode.
 *   - `<a class="open_vscode" ...>` -> prepend a small VS Code icon.
 * The extension id keeps its production value (no beta swap).
 */
export default function rehypeVscodeLinks() {
  return (tree) => {
    visit(tree, (node) => {
      if (typeof node.value !== 'string') return;
      let value = node.value;
      if (!value.includes('data-vscode') && !value.includes('open_vscode')) return;

      // Empty href + data-vscode -> copy the deep link into href.
      value = value.replace(
        /<a\s+href=(["'])\1([^>]*?)data-vscode=(["'])(.*?)\3/g,
        (_m, _q1, mid, q2, url) => `<a href=${q2}${url}${q2}${mid}data-vscode=${q2}${url}${q2}`
      );

      // Prepend the icon to open_vscode links (only once).
      value = value.replace(
        /(<a class="open_vscode"[^>]*>)(?!<svg)/g,
        (_m, open) => `${open}${VSCODE_ICON}`
      );

      node.value = value;
    });
  };
}
