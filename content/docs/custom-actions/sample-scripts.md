---
title: Sample scripts
slug: custom-actions/sample-scripts
description: null
date: 2024-08-12T14:42:34.817Z
lastmod: 2024-08-13T08:02:31.555Z
weight: 500.4
---

# Sample scripts

Here are some sample scripts you can use to extend Front Matter CMS.

## Content scripts

### Share content

The following script can be used to share content on Twitter or LinkedIn.

```javascript {{ "title": "Share script" }}
import { ContentScript } from '@frontmatter/extensibility';

(() => {
  const contentScriptArgs = ContentScript.getArguments();
  if (contentScriptArgs) {
    const { frontMatter: { title, slug }, answers } = contentScriptArgs;

    if (!answers) {
      ContentScript.askQuestions([{
        name: "platform",
        message: "Where do you want to share the article?",
        options: ["Twitter", "LinkedIn"]
      }]);
      return;
    }

    const platform = answers.platform;
    if (!platform) {
      ContentScript.done(`No platform provided`);
      return;
    }

    const url = `https://<YOUR-URL>${slug.startsWith("/") ? slug : `/${slug}`}`;
    let shareUrl = "";
    if (platform === "Twitter") {
      shareUrl = `http://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    } else if (platform === "LinkedIn") {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
    }

    ContentScript.open(shareUrl);
  }
})();
```

#### Configuration

```json {{ "title": "Share script configuration" }}
{
  "frontMatter.custom.scripts": [
    {
      "title": "Share blog post",
      "script": "./scripts/share.mjs",
      "command": "~/.nvm/versions/node/v20.11.1/bin/node",
      "type": "content"
    }
  ]
}
```

## Media scripts

### Optimize image

The following script can be used to optimize the image using the `imagemin` dependency.

```javascript {{ "title": "Optimize image" }}
import { MediaScript } from '@frontmatter/extensibility';
import { dirname } from 'path';

(async () => {
  const mediaScriptArgs = MediaScript.getArguments();
  if (!mediaScriptArgs) {
    MediaScript.done(`No arguments found`);
    return;
  }

  const { mediaPath } = mediaScriptArgs;
  if (!mediaPath) {
    MediaScript.done(`No media path found`);
    return;
  }

  const imagemin = (await import("imagemin")).default;
  const imageminJpegtran = (await import("imagemin-jpegtran")).default;
  const imageminPngquant = (await import("imagemin-pngquant")).default;

  await imagemin([mediaPath], {
    destination: dirname(mediaPath),
    glob: false,
    plugins: [imageminJpegtran(), imageminPngquant()],
  });

  MediaScript.done(`Optimized image ${mediaPath}`);
})();
```

**Prerequisites**:

- `npm i imagemin imagemin-jpegtran imagemin-pngquant`

#### Configuration

```json {{ "title": "Optimize image script configuration" }}
{
  "frontMatter.custom.scripts": [
    {
      "title": "Optimize image",
      "script": "./scripts/optimize-image.mjs",
      "command": "~/.nvm/versions/node/v18.17.1/bin/node",
      "type": "mediaFile"
    }
  ]
}
```

### Convert image to webp

The following script converts an image to the webp format, copies the metadata, and deletes
the original file.

```javascript {{ "title": "Convert image to webp script" }}
import { MediaScript } from '@frontmatter/extensibility';
import sharp from 'sharp';

(async () => {
  const mediaScriptArgs = MediaScript.getArguments();

  if (!mediaScriptArgs) {
    MediaScript.done(`No arguments found`);
    return;
  }

  const imagePath = mediaScriptArgs.mediaPath;

  let image = sharp(imagePath);
  const extension = imagePath.split(`.`).pop();
  let newFilePath = imagePath.replace(`.${extension}`, `.webp`);

  await image.toFormat("webp").toFile(newFilePath);
  MediaScript.copyMetadataAndDelete(imagePath, newFilePath);
})();
```

**Prerequisites**:

- `npm i sharp`

#### Configuration

```json {{ "title": "Convert image script configuration" }}
{
  "frontMatter.custom.scripts": [
    {
      "title": "Convert image to webp",
      "script": "./scripts/convert-image-to-webp.mjs",
      "command": "~/.nvm/versions/node/v18.17.1/bin/node",
      "type": "mediaFile"
    }
  ]
}
```

## Other languages

### Bash starter

```bash {{ "title": "Bash starter" }}
echo "workspaceArg: $1"
echo "fileArg: $2"
echo "frontMatterArg: $3"
```

### Python starter

```python {{ "title": "Python starter" }}
#!/usr/bin/python3

import sys

print(f'workspaceArg: {sys.argv[1]}')
print(f'fileArg: {sys.argv[2]}')
print(f'frontMatterArg: {sys.argv[3]}')
```
