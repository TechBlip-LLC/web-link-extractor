interface EmailConfig {
  apiEndpoint: string;
  fromAddress: string;
  fromName: string;
}

const config: EmailConfig = {
  apiEndpoint: import.meta.env.VITE_EMAIL_API_ENDPOINT || '/mailpit/api/v1/send',
  fromAddress: import.meta.env.VITE_EMAIL_FROM_ADDRESS || 'links@webextractor.local',
  fromName: import.meta.env.VITE_EMAIL_FROM_NAME || 'Web Link Extractor'
};

export default config;