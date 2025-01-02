/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_API_ENDPOINT?: string
  readonly VITE_EMAIL_FROM_ADDRESS?: string
  readonly VITE_EMAIL_FROM_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}