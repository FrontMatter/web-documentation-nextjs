---
title: Field conditions
slug: content-creation/field-conditions
description: null
date: 2022-12-08T15:30:17.335Z
lastmod: 2022-12-08T15:30:17.335Z
weight: 200.3
---

# Field conditions
<!-- markdownlint-disable MD013-->
Field conditions allow you to show or hide fields based on the value of another field.
This is useful when you want to show a field only when a specific value is selected or provided.
<!-- markdownlint-enable MD013-->
## Show or hide fields

To show or hide a field, you need to add the `when` property to the field.

```json
{
  "title": "Show or hide field",
  "name": "showOrHideField",
  "type": "string",
  "when": {
    "fieldRef": "title",
    "operator": "contains",
    "value": "<the value to validate>",
    "caseSensitive": false
  }
}
```

| Property | Description |
| --- | --- |
| `fieldRef` | The name of the field to validate |
| `operator` | The operator to use to validate the field value. See [Supported operators](#supported-operators) |
| `value` | The value to validate |
| `caseSensitive` | If the validation should be case sensitive. Default: `true` |

## Supported operators

| Type | Value |
| --- | --- |
| Equals | `eq` |
| Not equals | `neq` |
| Contains | `contains` |
| Not contains | `notContains` |
| Starts with | `startsWith` |
| Ends with | `endsWith` |
| Greater than | `gt` |
| Greater than or equal | `gte` |
| Less than | `lt` |
| Less than or equal | `lte` |
