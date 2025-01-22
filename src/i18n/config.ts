import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import landingEn from './en/landing.json';
import landingEs from './es/landing.json';
import aboutEn from './en/about.json';
import aboutEs from './es/about.json';
import teamEn from './en/team.json';
import teamEs from './es/team.json';
import timelineEn from './en/timeline.json';
import timelineEs from './es/timeline.json';
import partnersEn from './en/partners.json';
import partnersEs from './es/partners.json';
import contactEn from './en/contact.json';
import contactEs from './es/contact.json';
import joinEn from './en/join.json';
import joinEs from './es/join.json';

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
            team: teamEn,
            timeline: timelineEn,
            partners: partnersEn,
            contact: contactEn,
            join: joinEn
        },
        es: {
            landing: landingEs,
            about: aboutEs,
            team: teamEs,
            timeline: timelineEs,
            partners: partnersEs,
            contact: contactEs,
            join: joinEs
        }
    },
});
