# Using Icons

This project uses [unplugin-icons](https://github.com/unplugin/unplugin-icons) to display icons as tree-shaken Svelte components — works in both `.astro` and `.svelte` files.

## Icon Set

We are using the [Google Material Icons](https://icon-sets.iconify.design/ic/) icon set from [Iconify](https://iconify.design/).

## How to use

Import the icon directly from `~icons/ic/<name>` and use it like any other component — including in `.astro` files, since the Svelte compiler renders it to static HTML/SVG at build time.

### Example

Here is an example of how to use the `outline-timer` icon:

```astro
---
import IconTimer from "~icons/ic/outline-timer";
---

<IconTimer />
```

### Finding Icons

You can find all available icons in the [Google Material Icons](https://icon-sets.iconify.design/ic/) collection on the Iconify website.

When you find an icon you want to use, copy its name (e.g., `outline-timer`) and import it from `~icons/ic/<name>`.
