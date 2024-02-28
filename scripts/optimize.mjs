// @ts-check
import path from 'path';
import { MediaScript } from '@frontmatter/extensibility';

(async () => {
  const mediaScriptArgs = MediaScript.getArguments();

  if (!mediaScriptArgs || !mediaScriptArgs.mediaPath) {
    MediaScript.done(`No arguments found`);
    return;
  }
  const imagemin = (await import('imagemin')).default;
  const imageminJpegtran = (await import('imagemin-jpegtran')).default;
  const imageminPngquant = (await import('imagemin-pngquant')).default;

  await imagemin([mediaScriptArgs.mediaPath], {
    destination: path.dirname(mediaScriptArgs.mediaPath),
    glob: false,
    plugins: [
      imageminJpegtran(),
      imageminPngquant()
    ]
  });

  console.log(`Optimized image ${path.basename(mediaScriptArgs.mediaPath)}`)
})();