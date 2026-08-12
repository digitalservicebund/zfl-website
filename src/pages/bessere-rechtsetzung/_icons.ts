import IconAuto from "~icons/ic/baseline-auto-awesome";
import IconChecks from "~icons/ic/baseline-library-books";
import IconWidget from "~icons/ic/baseline-widgets";

// Maps tags to unplugin-icons Svelte components (not astro-icon's <Icon>,
// which is Astro-only and can't render inside this client-hydrated tree).
export const iconMap = {
  Prozess: IconWidget,
  KI: IconAuto,
  Checks: IconChecks,
} as const;

export type TagName = keyof typeof iconMap;
export type IconType = (typeof iconMap)[TagName];
