# Using tailwind-variants for component variants

This project uses `tailwind-variants` to manage component variants. It provides a clean API to define variants and compose them.

## How to use

Here is an example of how to use `tailwind-variants` in an Astro component:

```typescript
// src/components/text/Badge.astro
---
import type { HTMLAttributes } from "astro/types";
import type { VariantProps } from "tailwind-variants";
import { tv } from "@/utils/tv";

interface Props extends HTMLAttributes<"mark">, VariantProps<typeof styles> {
  class?: string;
}

const styles = tv({
  base: "ds-label-02-reg inline-flex flex-row items-center gap-4 self-start rounded-md bg-transparent p-4",
  variants: {
    look: {
      hint: "text-cosmic-blue-base",
      gray: "bg-lavender-base",
      white: "bg-white",
    },
  },
});

const { class: className, look, ...attrs } = Astro.props;
---

<mark class={styles({ look, className })} {...attrs}>
  <slot name="icon" />
  <slot />
</mark>
```

In this example, the `Badge` component has a `look` variant that can be `hint`, `gray`, or `white`. The `tv` function is used to define the base classes and the variants. The `styles` function is then used to apply the correct classes to the `mark` element. A wrapper for the default `tv` function is defined in `@/utils/tv` to handle class resolution between the `styles` function and the CSS provided through the `class` prop.

Every new `--spacing-*` and `--container-*` token added in the `@theme` in `@/styles/global.css` must also be added in the merge configuration defined in `@/utils/tv`, otherwise class resolution will break silently.

More documentation can be found on the [tailwind-variants website](https://www.tailwind-variants.org/).
