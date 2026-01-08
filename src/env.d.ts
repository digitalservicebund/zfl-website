interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string;
  readonly PUBLIC_POSTHOG_API_HOST: string;
  readonly PUBLIC_POSTHOG_UI_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
