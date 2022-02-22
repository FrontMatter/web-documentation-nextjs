---
title: Troubleshooting
slug: troubleshooting
description: null
date: '2021-12-21T09:53:30.176Z'
lastmod: '2021-12-21T09:53:30.668Z'
weight: 10
---

# Troubleshooting

## Overview

Unfortunately, sometimes you may encounter issues with the Front Matter extension. This can be due to the fact that there are misconfigurations, issues parsing your content, or bugs. We are constantly working to improve the extension and fix any issues you may encounter. In this section you can read what you can do to help you troubleshoot your Front Matter configuration.

## Content and front matter parsing

One of the main issues you may encounter is that there is something wrong in your markdown its front matter. This can be due to a typo, a missing comma, or a missing colon, ...

The extension uses a YAML or TOML parser, depending on the type of front matter you are using. If the extension would spot an error during the content parsing, it will highlight this in the editor and on the problems tab.

![Troubleshooting - Informing you of a parsing issue in the front matter of your article](/releases/v5.8.0/troubleshooting.png)

## Looking what is happening behind the scenes

The extension logs information, warnings, and errors into the Visual Studio Code output tab. You can find the log stream by selecting the `vscode-front-matter` or `vscode-front-matter-beta` extension from the output dropdown.

![Troubleshooting - Show the output of what the extension has been performing](/releases/v5.8.0/troubleshooting-output.png)