/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PUBLIC_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_API_LASTFM_URL: string;
  readonly VITE_APP_API_LASTFM_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}