---
title: Static Site Generators
slug: ssg-and-frameworks
description: null
date: 2021-11-26T09:04:50.405Z
lastmod: 2023-07-10T09:14:13.619Z
weight: 600
---
<!-- markdownlint-disable MD013 -->
# Static Site Generator and Frameworks

## Overview

Front Matter's goal is not to be opinionated on which static site generator or framework you are
using. We want to support all of them out there, but they can have their requirements,
configurations, ...

In this section of the documentation, we will list them up and tell more about how you can get started.

## Support additional file types

As there are many static site generators out there, we probably do not support all the file types by
default. However, you do not have to worry, if there is a file type you want to support, you can
easily add it to the `frontMatter.content.supportedFileTypes` setting.

By default, Front Matter supports: `md`, `markdown`, and `mdx`. If you want to support other types,
just add these to the `frontMatter.content.supportedFileTypes` setting.

```json
{
  "frontMatter.content.supportedFileTypes": [ "md", "markdown", "mdx", "svx" ]
}
```

### Astro

To use Front Matter with Astro, you can check out the following guide on the Astro website:
[Front Matter CMS & Astro][03]

### Hugo

Check out our Hugo configuration documentation to get you started using Front Matter:
[Front Matter configuration with Hugo][01].

### Next.js

Check out our Next.js configuration documentation to get you started using Front Matter:
 [Front Matter configuration with Next.js][04].

### Other static site generators

In case you are using a static site generator which is not listed here, feel free to reach out
to us to check how we can help you configure Front Matter CMS in your project.

You can help us by adding the documentation for your static site generator to this documentation.

[Update the docs][02]

<!-- Link Reference -->
[01]: /docs/ssg-and-frameworks/hugo-configuration
[02]: https://github.com/FrontMatter/web-documentation-nextjs/edit/main/content/docs/ssg.md
[03]: https://docs.astro.build/en/guides/cms/frontmatter-cms/
[04]: /docs/ssg-and-frameworks/nextjs-configuration

<!-- markdownlint-enable MD013 -->