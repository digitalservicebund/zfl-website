declare module "~icons/*" {
  import type { SvelteHTMLElements } from "svelte/elements";
  const component: (props: SvelteHTMLElements["svg"]) => unknown;
  export default component;
}

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
  /** Backend for the live-AI prototypes; see doc/live-ai-prototypes.md. */
  readonly PUBLIC_TOOL_API?: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
