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
  jobSimDesc?: string;
  networkDesc?: string;
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
    jobSimDesc: 'For our job simulation feature, which grants you the experience of the prefered job, It challenges you in AI generated scenarios for you to improve yourself via the internet. You can use your computer for this experience or you could use VR glasses for a more realistic experience.',
    networkDesc: 'With displaying inspiring peoples stories, Personai provides the opportunity of being able to interact with those people',
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
    jobSimDesc: 'Tercih ettiğiniz işin deneyimini sunan iş simülasyonu özelliğimiz, internet üzerinden kendinizi geliştirmeniz için yapay zeka tarafından oluşturulan senaryolarda size meydan okur. Bu deneyim için bilgisayarınızı kullanabilir veya daha gerçekçi bir deneyim için VR gözlükleri kullanabilirsiniz.',
    networkDesc: 'İlham verici insanların hikayelerini sergileyerek, Personai bu insanlarla etkileşim kurma fırsatı sunar.',
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
    jobSimDesc: 'Per la nostra funzione di simulazione del lavoro, che ti garantisce l\'esperienza del lavoro preferito, ti sfida in scenari generati dall\'intelligenza artificiale per farti migliorare tramite Internet. Puoi usare il tuo computer per questa esperienza o potresti usare occhiali VR per un\'esperienza più realistica.',
    networkDesc: 'Mostrando storie di persone ispiratrici, Personai offre l\'opportunità di poter interagire con quelle persone.',
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
    jobSimDesc: 'Unsere Job-Simulationsfunktion, die Ihnen die Erfahrung Ihres bevorzugten Jobs vermittelt, fordert Sie in von KI generierten Szenarien heraus, um sich über das Internet zu verbessern. Sie können für diese Erfahrung Ihren Computer verwenden oder für eine realistischere Erfahrung eine VR-Brille.',
    networkDesc: 'Durch die Anzeige inspirierender Geschichten von Menschen bietet Personai die Möglichkeit, mit diesen Menschen in Kontakt zu treten.',
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
    jobSimDesc: 'Para nuestra función de simulación de trabajo, que le otorga la experiencia del trabajo preferido, lo desafía en escenarios generados por IA para que mejore a través de Internet. Puede usar su computadora para esta experiencia o podría usar gafas de realidad virtual para una experiencia más realista.',
    networkDesc: 'Al mostrar historias inspiradoras de personas, Personai brinda la oportunidad de poder interactuar con esas personas.',
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
    jobSimDesc: 'Sizga o\'zingiz yoqtirgan ish tajribasini taqdim etuvchi ish simulyatsiyasi xususiyatimiz uchun u sizni internet orqali o\'zingizni takomillashtirish uchun sun\'iy intellekt tomonidan yaratilgan ssenariylarda sinab ko\'radi. Ushbu tajriba uchun kompyuteringizdan yoki yanada real tajriba uchun VR ko\'zoynaklaridan foydalanishingiz mumkin.',
    networkDesc: 'Ilhomlantiruvchi odamlarning hikoyalarini namoyish etish orqali Personai ushbu odamlar bilan muloqot qilish imkoniyatini taqdim etadi.',
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
    jobSimDesc: 'Pour notre fonctionnalité de simulation d\'emploi, qui vous donne l\'expérience du travail préféré, elle vous met au défi dans des scénarios générés par l\'IA pour que vous vous amélioriez via Internet. Vous pouvez utiliser votre ordinateur pour cette expérience ou utiliser des lunettes VR pour une expérience plus réaliste.',
    networkDesc: 'En affichant les histoires inspirantes des personnes, Personai offre l\'opportunité de pouvoir interagir avec ces personnes.',
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
    jobSimDesc: 'За нашата функция за симулация на работа, която ви дава опита от предпочитаната работа, тя ви предизвиква в генерирани от AI сценарии, за да се усъвършенствате чрез интернет. Можете да използвате компютъра си за това изживяване или бихте могли да използвате VR очила за по-реалистично изживяване.',
    networkDesc: 'Показвайки вдъхновяващи истории на хора, Personai предоставя възможността да можете да взаимодействате с тези хора.',
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
    jobSimDesc: 'Наша функция симуляции работы, которая предоставляет вам опыт предпочтительной работы, бросает вам вызов в сценариях, созданных ИИ, чтобы вы могли улучшить себя через интернет. Для этого опыта вы можете использовать свой компьютер, или можете использовать VR-очки для более реалистичного опыта.',
    networkDesc: 'Показывая вдохновляющие истории людей, Personai предоставляет возможность общаться с этими людьми.',
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
