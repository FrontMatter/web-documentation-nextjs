---
title: Snippets
slug: snippets
description: null
date: 2022-03-04T14:40:10.952Z
lastmod: 2022-03-04T14:40:11.495Z
weight: 9
---

# Snippets

## Overview

Snippets are a pre-defined chunk of code/text that can be used to insert in your content. It provides the editor an easy way to add various elements to the content that is defined for your project/website.

All snippets can be found on the snippets dashboard.

![Snippet dashboard](/releases/v7.0.0/snippet-dashboard.png)

## Create a snippet

*Todo*

- Setting: title, description, body
- UI: how to create

## Variables

The snippet logic is based on that of Visual Studio Code / Textmate, with the difference that Front Matter makes use of actual variable names instead of index numbers. We choose to use variable names, in order to present the editor with meaningful input forms.

Defining variables in you snippets can be done in the following ways:

- `${variable}`: Creates a variable with the name of `variable`.
- `${variable:default}`: Creates a variable with the name of `variable` and sets the default value to `default`.
- `${variable|choice 1,choice 2,choice 3|}`: Creates a choice variable with the name of `variable` and sets the choices to `choice 1`, `choice 2` and `choice 3`.

There are also special placeholders for your variables:

- `FM_SELECTED_TEXT`: This placeholder can be used to insert the selected text from the editor. It can be used as the variable name (`${FM_SELECTED_TEXT}`) or value (`${selection:FM_SELECTED_TEXT}`).
- `FM_TEXT_`: This is a prefix placeholder for your variable name to define if it needs to render a single line input field on the form. Use it as follows: `${FM_TEXT_variable}`.
- `FM_MULTILINE_`: Similar to the previous placeholder, but for multi-line input fields (textarea). Use it as follows: `${FM_MULTILINE_variable}`.

## Using a snippet

*Todo*