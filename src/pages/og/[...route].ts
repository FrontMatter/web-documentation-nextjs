import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

// Build-time Open Graph cards for docs and changelog pages, reproducing the
// legacy /api/og cards (dark background, brand logo, title/description, teal
// accent bar). Served at /og/<entry-id>.png.
const docs = await getCollection('docs');
const changelog = await getCollection('changelog', ({ data }) => Boolean(data.title));

const pages: Record<string, { title: string; description: string }> = {};
for (const entry of docs) {
  pages[entry.id] = { title: entry.data.title, description: entry.data.description ?? '' };
}
for (const entry of changelog) {
  pages[`updates/${entry.id}`] = {
    title: entry.data.title ?? entry.id,
    description: entry.data.description ?? '',
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[14, 19, 31]], // vulcan-500 #0e131f
    border: { color: [41, 214, 223], width: 24, side: 'block-end' }, // teal-300 accent bar
    padding: 70,
    logo: { path: './public/android-chrome-512x512.png', size: [96] },
    font: {
      title: { color: [243, 239, 245], size: 64, weight: 'ExtraBold', families: ['Open Sans'] },
      description: { color: [180, 182, 197], size: 30, families: ['Open Sans'] },
    },
    fonts: ['./src/assets/fonts/open-sans-400.ttf', './src/assets/fonts/open-sans-800.ttf'],
  }),
});
