// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from '../locales/pt-BR/translation.json';
import enUS from '../locales/en/translation.json';
import es from '../locales/es/translation.json';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        pt: { translation: ptBR },
        en: { translation: enUS },
        es: { translation: es }
      },
      fallbackLng: 'pt-BR',
      lng: 'pt-BR',
      interpolation: { escapeValue: false },
      react: { useSuspense: true }
    });
}

export default i18n;
