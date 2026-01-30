# Using Icons

This project uses [astro-icon](https://github.com/natemoo-re/astro-icon) to display icons. `astro-icon` is a powerful tool that allows us to use icons from various icon sets directly in our Astro components.

## Icon Set

We are using the [Material Symbols](https://icon-sets.iconify.design/material-symbols/) icon set from [Iconify](https://iconify.design/).

## How to use

To use an icon, you need to import the `Icon` component from `astro-icon/components` and then use it in your component.

### Example

Here is an example of how to use the `timer-outline` icon from the `material-symbols` collection:

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="material-symbols:timer-outline" />
```

### Finding Icons

You can find all available icons in the [Material Symbols](https://icon-sets.iconify.design/material-symbols/) collection on the Iconify website.

When you find an icon you want to use, just copy the name (e.g., `timer-outline`) and prefix it with `material-symbols:`.
