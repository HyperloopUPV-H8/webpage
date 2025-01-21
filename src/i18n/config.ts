import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en/home.json';
import es from './es/home.json';

export const defaultNS = 'ns1';

export default i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
    debug: true,
    resources: {
        en: {
            translation: en
        },
        es: {
            translation: es
        }
    },
});
