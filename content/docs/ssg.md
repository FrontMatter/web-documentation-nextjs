---
title: Static Site Generators
slug: ssg-and-frameworks
description: null
date: '2021-11-26T09:04:50.405Z'
lastmod: '2022-01-21T15:21:24.619Z'
weight: 6
---

# Static Site Generator and Frameworks

## Overview

Front Matter's goal is not to be opinionated on which static site generator or framework you are using. We want to support all of them out there, but they can have their requirements, configurations, ...

In this section of the documentation, we will list them up and tell more about how you can get started.

## Support additional file types

As there are many static site generators out there, we probably do not support all the file types by default. However, you do not have to worry, if there is a file type you want to support, you can easily add it to the `frontMatter.content.supportedFileTypes` setting.

By default, Front Matter supports: `md`, `markdown`, and `mdx`. If you want to support other types, just add these to the `frontMatter.content.supportedFileTypes` setting.

```json
{
  "frontMatter.content.supportedFileTypes": [ "md", "markdown", "mdx", "svx" ]
}
```

### Eleventy

*Are you up for the challenge of writing this part of the documentation?*

[Update the docs](https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md)

### Gatsby

*Are you up for the challenge of writing this part of the documentation?*

[Update the docs](https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md)

### Next.js

*Are you up for the challenge of writing this part of the documentation?*

[Update the docs](https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md)

### SvelteKit

*Are you up for the challenge of writing this part of the documentation?*

[Update the docs](https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md)

### ...

*Are you using one which hasn't been referenced yet? Feel free to add it here.*

[Update the docs](https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md)