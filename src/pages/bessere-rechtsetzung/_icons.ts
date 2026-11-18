import IconAuto from "~icons/ic/baseline-auto-awesome";
import IconChecks from "~icons/ic/baseline-library-books";
import IconWidget from "~icons/ic/baseline-widgets";

// Maps tags to unplugin-icons Svelte components so they can render inside
// this client-hydrated tree.
export const iconMap = {
  Prozess: IconWidget,
  KI: IconAuto,
  Checks: IconChecks,
} as const;

export type TagName = keyof typeof iconMap;
export type IconType = (typeof iconMap)[TagName];
