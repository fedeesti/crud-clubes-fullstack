import dotenv from 'dotenv';
import { defineConfig } from 'cypress';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      URL_APP: process.env.URL_APP_BASE,
      URL_API: process.env.VITE_URL_API_BASE,
    },
  },
});
