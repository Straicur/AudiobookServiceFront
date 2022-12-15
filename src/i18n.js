import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './Translates/en.json';
import pl from './Translates/pl.json';


i18n.use(LanguageDetector)
    .use (initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        resources:{
            en: {
                translation:en,
            },
            pl: {
                translation:pl,
            },},
        react: {
            wait: true,
        },
    })

export default i18n;
