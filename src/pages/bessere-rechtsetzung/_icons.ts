import IconAuto from "~icons/ic/baseline-auto-awesome";
import IconCategory from "~icons/ic/round-category";
import IconCopy from "~icons/ic/round-content-copy";

// Maps the simple names accepted by the `icon` prop to their
// `unplugin-icons`-generated Svelte components. astro-icon's <Icon> can't
// be used here since it's an Astro-only component and this Bubble is
// rendered inside a client-hydrated Svelte tree; unplugin-icons renders
// the same @iconify-json/ic icon set as tree-shaken Svelte components.
export const icons = {
  auto: IconAuto,
  copy: IconCopy,
  category: IconCategory,
} as const;
