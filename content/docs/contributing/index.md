---
title: Contributing
slug: contributing
description: null
date: 2023-08-20T11:51:04.814Z
lastmod: 2023-08-20T12:09:56.533Z
weight: 1200
---

# Contributing to Front Matter CMS

There are many ways you can contribute to Front Matter CMS. You can help us by:

- Reporting bugs
- Suggesting new features
- Improving the documentation
- Improving the code
- Translating the extension
- Spreading the word ❤️

## Reporting bugs and suggesting new features

If you find a bug or have an idea for a new feature,
please create an issue in the [GitHub repository][01].

## Improving the documentation

If you find a typo or want to improve the documentation,
you can do so by editing the documentation directly on GitHub.

The source of the documentation can be found in the [GitHub repository][02].

## Improving the code

If you want to improve the code, you can do so by creating a pull request.

The source code of the extension can be found in the [GitHub repository][03].

## Translating the extension

If you want to help us translate the extension to your language, you best follow these steps:

1. Fork the [GitHub repository][03]
1. Create a new `bundle.<language>.json` file in the `l10n` folder
1. Create a new `package.nls.<language>.json` file in root
1. Run the `npm run localization:sync` command, this will automatically fill the new files
with the default values
1. Translate all values prefixed with `🚧:`
1. Once the translation is done, create a pull request and we will review it

> **Important**: you can only add translations for languages that are
> supported by Visual Studio Code. Check the [available locales][04] for more information.

[01]: https://github.com/estruyf/vscode-front-matter/issues
[02]: https://github.com/FrontMatter/web-documentation-nextjs
[03]: https://github.com/estruyf/vscode-front-matter
[04]: https://code.visualstudio.com/docs/getstarted/locales#_available-locales
