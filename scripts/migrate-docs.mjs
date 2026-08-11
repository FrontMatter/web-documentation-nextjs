// One-time migration: copy content/docs/**/*.md into the Starlight collection
// at src/content/docs/<targetSlug>/index.md so the entry `id` (== URL slug)
// exactly matches the old Next.js `/docs/<slug>` URLs.
//
// - targetSlug = "docs" for the Introduction (slug ""), else "docs/<slug>".
// - Frontmatter is normalised for Starlight: keep `title`, keep `description`
//   only when it is a non-empty string, map `lastmod` -> `lastUpdated`.
// - `hidden: true` pages are skipped (they 404 in production today).
// - Emits scripts/docs-manifest.json (slug/weight/title) to build the sidebar.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'content', 'docs');
const DEST = path.join(root, 'src', 'content', 'docs');

/** Recursively collect .md files. */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function yamlDate(value) {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

const files = walk(SRC);
const manifest = [];
let written = 0;
let skipped = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);

  if (data.hidden === true) {
    skipped++;
    continue;
  }

  const originalSlug = (data.slug ?? '').toString();
  const targetSlug = originalSlug === '' ? 'docs' : `docs/${originalSlug}`;
  const url = `/${targetSlug}`.replace(/\/$/, '');

  // Build normalised frontmatter for Starlight.
  const fm = { title: (data.title ?? '').toString() };
  if (typeof data.description === 'string' && data.description.trim() !== '') {
    fm.description = data.description;
  }
  const lastUpdated = yamlDate(data.lastmod);
  if (lastUpdated) fm.lastUpdated = lastUpdated;

  // Serialise frontmatter deterministically (avoid gray-matter quoting churn).
  const fmLines = ['---'];
  fmLines.push(`title: ${JSON.stringify(fm.title)}`);
  if (fm.description) fmLines.push(`description: ${JSON.stringify(fm.description)}`);
  if (fm.lastUpdated) fmLines.push(`lastUpdated: ${fm.lastUpdated}`);
  fmLines.push('---', '');

  // Strip the leading H1 — Starlight renders the frontmatter `title` as the page
  // heading, so the body's own `# Title` would duplicate it.
  const body = content
    .replace(/^\n+/, '')
    .replace(/^#\s+.*(\r?\n)+/, '');
  const output = fmLines.join('\n') + body;

  const destPath = path.join(DEST, targetSlug, 'index.md');
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, output, 'utf8');
  written++;

  manifest.push({
    slug: targetSlug,
    url,
    weight: typeof data.weight === 'number' ? data.weight : 99,
    title: fm.title,
    source: path.relative(root, file),
  });
}

manifest.sort((a, b) => a.weight - b.weight);
fs.writeFileSync(
  path.join(root, 'scripts', 'docs-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

console.log(`Migrated ${written} docs, skipped ${skipped} hidden. Manifest: ${manifest.length} entries.`);
