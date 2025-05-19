import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type LanguageType = 'en' | 'ar';

interface I18nContextType {
  language: LanguageType;
  isRTL: boolean;
  changeLanguage: (lang: LanguageType) => void;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  isRTL: false,
  changeLanguage: () => {},
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n: i18nInstance } = useTranslation();
  const [language, setLanguage] = useState<LanguageType>('en');
  const isRTL = language === 'ar';

  // Handle RTL layout changes
  useEffect(() => {
    const setRTL = async () => {
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
      }
    };
    
    setRTL();
  }, [isRTL]);

  const changeLanguage = (lang: LanguageType) => {
    i18nInstance.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, isRTL, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};