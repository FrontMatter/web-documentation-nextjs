import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Builds the Starlight sidebar from scripts/docs-manifest.json, reproducing the
 * legacy weight-based hierarchy:
 *   - integer weight  -> top-level section (a link, or a group if it has children)
 *   - decimal weight  -> child of the integer parent whose weight it falls within
 * Ordering is by ascending weight, matching the old sidebar.
 */
const dir = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(dir, '..', 'scripts', 'docs-manifest.json');

export function buildSidebar() {
  if (!fs.existsSync(manifestPath)) return [];
  const items = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  items.sort((a, b) => a.weight - b.weight);

  const roots = items.filter((i) => Number.isInteger(i.weight));
  const sidebar = [];

  for (const root of roots) {
    const children = items
      .filter((i) => i.weight > root.weight && i.weight < root.weight + 1)
      .sort((a, b) => a.weight - b.weight);

    if (children.length === 0) {
      sidebar.push({ label: root.title, slug: root.slug });
    } else {
      sidebar.push({
        label: root.title,
        items: [
          { label: 'Overview', slug: root.slug },
          ...children.map((c) => ({ label: c.title, slug: c.slug })),
        ],
      });
    }
  }

  return sidebar;
}
