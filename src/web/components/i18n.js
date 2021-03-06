import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import i18n from 'i18next'

i18n.use(LanguageDetector).use(Backend).use(initReactI18next).init({
  fallbackLng: 'en',
  backend: {
    loadPath: '/locales/{{lng}}/client.json'
  },
  load: 'languageOnly',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
