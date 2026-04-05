import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'tr' | 'it' | 'de' | 'es' | 'uz' | 'fr' | 'bg' | 'ru';

export interface Translations {
  // Nav
  logIn: string;
  signUp: string;
  // Sidebar
  homePage: string;
  buildNetwork: string;
  myCV: string;
  jobSimulations: string;
  internshipOpportunities: string;
  aboutUs: string;
  contact: string;
  howToUse: string;
  demo: string;
  privacyPolicy: string;
  // Hero
  the: string;
  future: string;
  starts: string;
  today: string;
  aboutUsBtn: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    logIn: 'Log In',
    signUp: 'Sign Up',
    homePage: '🏠 Home Page',
    buildNetwork: 'Build Network',
    myCV: 'My CV',
    jobSimulations: 'Job Simulations',
    internshipOpportunities: 'Internship Opportunities',
    aboutUs: 'About Us',
    contact: 'Contact',
    howToUse: 'How to use',
    demo: 'Demo',
    privacyPolicy: 'Privacy Policy',
    the: 'The',
    future: 'Future',
    starts: 'Starts',
    today: 'Today',
    aboutUsBtn: 'About Us',
  },
  tr: {
    logIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    homePage: '🏠 Ana Sayfa',
    buildNetwork: 'Ağ Oluştur',
    myCV: 'Özgeçmişim',
    jobSimulations: 'İş Simülasyonları',
    internshipOpportunities: 'Staj Fırsatları',
    aboutUs: 'Hakkımızda',
    contact: 'İletişim',
    howToUse: 'Nasıl Kullanılır',
    demo: 'Demo',
    privacyPolicy: 'Gizlilik Politikası',
    the: 'Geleceğin',
    future: 'Başladığı',
    starts: 'Yer',
    today: 'Burası',
    aboutUsBtn: 'Hakkımızda',
  },
  it: {
    logIn: 'Accedi',
    signUp: 'Registrati',
    homePage: '🏠 Home',
    buildNetwork: 'Crea Rete',
    myCV: 'Il Mio CV',
    jobSimulations: 'Simulazioni Lavoro',
    internshipOpportunities: 'Opportunità di Stage',
    aboutUs: 'Chi Siamo',
    contact: 'Contatti',
    howToUse: 'Come usare',
    demo: 'Demo',
    privacyPolicy: 'Informativa sulla privacy',
    the: 'Il',
    future: 'Futuro',
    starts: 'Inizia',
    today: 'Oggi',
    aboutUsBtn: 'Chi Siamo',
  },
  de: {
    logIn: 'Anmelden',
    signUp: 'Registrieren',
    homePage: '🏠 Startseite',
    buildNetwork: 'Netzwerk aufbauen',
    myCV: 'Mein Lebenslauf',
    jobSimulations: 'Job-Simulationen',
    internshipOpportunities: 'Praktikumsmöglichkeiten',
    aboutUs: 'Über uns',
    contact: 'Kontakt',
    howToUse: 'Wie benutzen',
    demo: 'Demo',
    privacyPolicy: 'Datenschutzrichtlinie',
    the: 'Die',
    future: 'Zukunft',
    starts: 'Beginnt',
    today: 'Heute',
    aboutUsBtn: 'Über uns',
  },
  es: {
    logIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    homePage: '🏠 Inicio',
    buildNetwork: 'Crear Red',
    myCV: 'Mi CV',
    jobSimulations: 'Simulaciones de Trabajo',
    internshipOpportunities: 'Oportunidades de Prácticas',
    aboutUs: 'Sobre Nosotros',
    contact: 'Contacto',
    howToUse: 'Cómo usar',
    demo: 'Demo',
    privacyPolicy: 'Política de Privacidad',
    the: 'El',
    future: 'Futuro',
    starts: 'Empieza',
    today: 'Hoy',
    aboutUsBtn: 'Sobre Nosotros',
  },
  uz: {
    logIn: 'Kirish',
    signUp: "Ro'yxatdan o'tish",
    homePage: '🏠 Bosh sahifa',
    buildNetwork: 'Tarmoq yaratish',
    myCV: 'Mening CV',
    jobSimulations: 'Ish simulyatsiyalari',
    internshipOpportunities: 'Amaliyot imkoniyatlari',
    aboutUs: 'Biz haqimizda',
    contact: 'Aloqa',
    howToUse: 'Qanday ishlatish',
    demo: 'Demo',
    privacyPolicy: 'Maxfiylik siyosati',
    the: 'Kelajak',
    future: 'Boshlanadi',
    starts: 'Aynan',
    today: 'Bugun',
    aboutUsBtn: 'Biz haqimizda',
  },
  fr: {
    logIn: 'Connexion',
    signUp: "S'inscrire",
    homePage: '🏠 Accueil',
    buildNetwork: 'Créer un réseau',
    myCV: 'Mon CV',
    jobSimulations: "Simulations d'emploi",
    internshipOpportunities: 'Opportunités de stage',
    aboutUs: 'À propos de nous',
    contact: 'Contact',
    howToUse: 'Comment utiliser',
    demo: 'Demo',
    privacyPolicy: 'Politique de confidentialité',
    the: 'Le',
    future: 'Futur',
    starts: 'Commence',
    today: "Aujourd'hui",
    aboutUsBtn: 'À propos de nous',
  },
  bg: {
    logIn: 'Вход',
    signUp: 'Регистрация',
    homePage: '🏠 Начална страница',
    buildNetwork: 'Изгради мрежа',
    myCV: 'Моето CV',
    jobSimulations: 'Симулации на работа',
    internshipOpportunities: 'Възможности за стаж',
    aboutUs: 'За нас',
    contact: 'Контакт',
    howToUse: 'Как се използва',
    demo: 'Демо',
    privacyPolicy: 'Политика за поверителност',
    the: 'Бъдещето',
    future: 'Започва',
    starts: 'Точно',
    today: 'Днес',
    aboutUsBtn: 'За нас',
  },
  ru: {
    logIn: 'Войти',
    signUp: 'Зарегистрироваться',
    homePage: '🏠 Главная страница',
    buildNetwork: 'Создать сеть',
    myCV: 'Мое резюме',
    jobSimulations: 'Симуляторы работы',
    internshipOpportunities: 'Возможности стажировки',
    aboutUs: 'О нас',
    contact: 'Контакт',
    howToUse: 'Как использовать',
    demo: 'Демо',
    privacyPolicy: 'Политика конфиденциальности',
    the: 'Будущее',
    future: 'Начинается',
    starts: 'Прямо',
    today: 'Сегодня',
    aboutUsBtn: 'О нас',
  },
};

export const languageLabels: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  tr: { label: 'Türkçe', flag: '🇹🇷' },
  it: { label: 'Italiano', flag: '🇮🇹' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  es: { label: 'Español', flag: '🇪🇸' },
  uz: { label: "O'zbekcha", flag: '🇺🇿' },
  fr: { label: 'Français', flag: '🇫🇷' },
  bg: { label: 'Български', flag: '🇧🇬' },
  ru: { label: 'Русский', flag: '🇷🇺' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
