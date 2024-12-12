/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_STATIC_FILES_URL: string;
  readonly VITE_APP_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
