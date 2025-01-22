import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import landingEn from './en/landing.json';
import landingEs from './es/landing.json';
import aboutEn from './en/about.json';
import aboutEs from './es/about.json';
import teamEn from './en/team.json';
import teamEs from './es/team.json';

export const defaultNS = 'ns1';

export default i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
    debug: true,
    resources: {
        en: {
            landing: landingEn,
            about: aboutEn,
            team: teamEn
        },
        es: {
            landing: landingEs,
            about: aboutEs,
            team: teamEs
        }
    },
});
