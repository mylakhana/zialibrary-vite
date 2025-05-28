import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from '../../locales/translations/en.json';
import arTranslation from '../../locales/translations/ar.json';

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: 'en',
    // debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

const initialLanguage = localStorage.getItem('language') || 'en';
const initialState = {
  currentLanguage: initialLanguage,
  isRTL: initialLanguage === 'ar',
};

// Apply initial language settings
document.documentElement.dir = initialState.isRTL ? 'rtl' : 'ltr';
document.documentElement.lang = initialState.currentLanguage;
i18n.changeLanguage(initialState.currentLanguage);

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      const newLanguage = action.payload;
      state.currentLanguage = newLanguage;
      state.isRTL = newLanguage === 'ar';
      
      // Update i18n
      i18n.changeLanguage(newLanguage);
      
      // Update document
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
      
      // Save to localStorage
      localStorage.setItem('language', newLanguage);
    },
    toggleLanguage: (state) => {
      const newLanguage = state.currentLanguage === 'en' ? 'ar' : 'en';
      state.currentLanguage = newLanguage;
      state.isRTL = newLanguage === 'ar';
      
      // Update i18n
      i18n.changeLanguage(newLanguage);
      
      // Update document
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
      
      // Save to localStorage
      localStorage.setItem('language', newLanguage);
    },
  },
});

export const { changeLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer; 