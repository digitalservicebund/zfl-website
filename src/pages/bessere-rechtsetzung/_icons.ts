import IconAuto from "~icons/ic/baseline-auto-awesome";
import IconChecks from "~icons/ic/baseline-library-books";
import IconWidget from "~icons/ic/baseline-widgets";

// Maps tags to their `unplugin-icons`-generated Svelte components.
// astro-icon's <Icon> can't be used here since it's an Astro-only component
// and this Bubble is rendered inside a client-hydrated Svelte tree;
// unplugin-icons renders the same @iconify-json/ic icon set as
// tree-shaken Svelte components.

export const iconMap = {
  Prozess: IconWidget,
  KI: IconAuto,
  Checks: IconChecks,
} as const;

export type TagName = keyof typeof iconMap;
export type IconType = (typeof iconMap)[TagName];
