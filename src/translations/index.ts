import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Languages from './resources/index';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
  resources: Languages,
  ns: ['common'],
  defaultNS: 'common',
  debug: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
