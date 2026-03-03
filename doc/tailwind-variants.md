# Using tailwind-variants for component variants

This project uses `tailwind-variants` to manage component variants. It provides a clean API to define variants and compose them.

## How to use

Here is an example of how to use `tailwind-variants` in an Astro component:

```typescript
// src/components/text/Badge.astro
---
import type { HTMLAttributes } from "astro/types";
import { tv, type VariantProps } from "tailwind-variants";

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

In this example, the `Badge` component has a `look` variant that can be `hint`, `gray`, or `white`. The `tv` function is used to define the base classes and the variants. The `styles` function is then used to apply the correct classes to the `mark` element.

More documentation can be found on the [tailwind-variants website](https://www.tailwind-variants.org/).
