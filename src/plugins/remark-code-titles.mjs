import { visit } from 'unist-util-visit';

/**
 * Translates the legacy code-fence title meta into Expressive Code's `title=`
 * attribute so the title bar renders natively:
 *
 *   ```json {{ "title": "Global settings" }}   ->   ```json title="Global settings"
 *
 * The legacy syntax doubled the braces (`{{ ... }}`); we normalise to single
 * braces and JSON-parse it. Any `description` is dropped (no EC equivalent).
 */
export default function remarkCodeTitles() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (!node.meta || !node.meta.includes('{{')) return;
      try {
        const normalised = node.meta.replace(/\{\{/g, '{').replace(/\}\}/g, '}');
        const parsed = JSON.parse(normalised);
        const attrs = [];
        if (parsed.title) attrs.push(`title=${JSON.stringify(parsed.title)}`);
        node.meta = attrs.join(' ');
      } catch {
        // Leave the meta untouched if it isn't the expected JSON shape.
      }
    });
  };
}
