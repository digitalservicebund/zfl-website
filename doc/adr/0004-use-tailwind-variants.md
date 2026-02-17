# 4. Use tailwind-variants for component variants

## Status

- 2026-02-03: Accepted

## Context

We need a way to manage component variants in a clean and maintainable way. Components often have different styles based on their properties. For example, a badge can have different colors. We want to avoid complex and hard-to-read class strings in our components.

## Decision

We will use `tailwind-variants` to manage component variants. It provides a clean API to define variants and compose them. It also integrates well with Tailwind CSS and Astro.

## Consequences

### Positive

- **Clean API**: `tailwind-variants` provides a clean and readable API to define component variants.
- **Maintainable**: It's easy to add, remove, or change variants.
- **Type-Safe**: It provides type safety for variants.
- **Composition**: It allows composing variants.
- **Integration**: It integrates well with Tailwind CSS and Astro.

### Negative

- **New Dependency**: It adds a new dependency to the project.

## Example

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
