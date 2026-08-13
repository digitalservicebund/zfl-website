declare module "~icons/*" {
  import type { SvelteHTMLElements } from "svelte/elements";
  const component: (props: SvelteHTMLElements["svg"]) => unknown;
  export default component;
}

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
