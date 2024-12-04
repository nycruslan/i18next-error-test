import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    backend: {
      loadPath: 'https://jsonplaceholder.typicode.com/todos/{{ns}}',
    },
    ns: [],
    interpolation: {
      escapeValue: false, // React handles escaping by default
    },
    react: {
      useSuspense: true, // Enable Suspense for lazy loading translations
    },
    maxRetries: 0,
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
