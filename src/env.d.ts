/// <reference types="unplugin-icons/types/svelte5" />

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
