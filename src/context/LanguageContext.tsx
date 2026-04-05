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
  howToUseDesc?: string;
  personaiDesc?: string;
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
    howToUseDesc: `Personai is a mentor that illuminates our future. It\'s a system that provides us with information about the profession we want to pursue (the right career paths, professional environment, etc.). It also assists us with our portfolio. It includes an AI program that uses a data model system comprised of experts, leaders, and role models in their respective fields. One-on-one consultations can also be arranged with Personai. It supports the individual every step of the way and serves as a source of motivation.`,
    personaiDesc: `personai is our AI chatbot that makes the user feel as if they are talking to an actual person who has a career in a certain field. It gives tips and suggestions and does not only help with career planning but also with actual work life`,
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
    howToUseDesc: `Personai, geleceğimizi aydınlatan bir mentordur. Takip etmek istediğimiz meslek hakkında (doğru kariyer yolları, mesleki ortam vb.) bize bilgi sağlayan bir sistemdir. Ayrıca portfolyomuz konusunda da bize yardımcı olur. Kendi alanlarında uzmanlardan, liderlerden ve rol modellerinden oluşan bir veri modeli sistemini kullanan bir yapay zeka programı içerir. Personai ile birebir danışmanlık da ayarlanabilir. Bireyi her adımda destekler ve bir motivasyon kaynağı olarak hizmet eder.`,
    personaiDesc: `Personai, kullanıcının belirli bir alanda kariyer sahibi gerçek bir insanla konuşuyormuş gibi hissetmesini sağlayan yapay zeka sohbet robotumuzdur. Sadece kariyer planlamasında değil, aynı zamanda gerçek iş hayatında da yardımcı olan ipuçları ve öneriler sunar.`,
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
    howToUseDesc: `Personai è un mentore che illumina il nostro futuro. È un sistema che ci fornisce informazioni sulla professione che vogliamo intraprendere (i giusti percorsi di carriera, l\'ambiente professionale, ecc.). Ci assiste anche con il nostro portfolio. Include un programma di intelligenza artificiale che utilizza un sistema di modelli di dati composto da esperti, leader e modelli di ruolo nei rispettivi campi. È inoltre possibile organizzare consulenze individuali con Personai. Supporta l\'individuo in ogni fase del percorso e funge da fonte di motivazione.`,
    personaiDesc: `personai è il nostro chatbot basato sull\'intelligenza artificiale che fa sentire l\'utente come se stesse parlando con una persona reale che ha una carriera in un determinato campo. Dà suggerimenti e consigli e non aiuta solo nella pianificazione della carriera, ma anche nella reale vita lavorativa`,
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
    howToUseDesc: `Personai ist ein Mentor, der unsere Zukunft beleuchtet. Es ist ein System, das uns Informationen über den Beruf liefert, den wir ausüben wollen (die richtigen Karrierewege, berufliche Umgebung usw.). Es unterstützt uns auch bei unserem Portfolio. Es enthält ein KI-Programm, das ein Datenmodellsystem verwendet, das aus Experten, Führungskräften und Vorbildern in ihren jeweiligen Bereichen besteht. Mit Personai können auch Einzelberatungen vereinbart werden. Es unterstützt den Einzelnen bei jedem Schritt und dient als Motivationsquelle.`,
    personaiDesc: `personai ist unser KI-Chatbot, der dem Benutzer das Gefühl gibt, mit einer echten Person zu sprechen, die Karriere in einem bestimmten Bereich macht. Er gibt Tipps und Vorschläge und hilft nicht nur bei der Karriereplanung, sondern auch im echten Arbeitsleben`,
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
    howToUseDesc: `Personai es un mentor que ilumina nuestro futuro. Es un sistema que nos proporciona información sobre la profesión que queremos seguir (las trayectorias profesionales adecuadas, el entorno profesional, etc.). También nos ayuda con nuestra cartera. Incluye un programa de inteligencia artificial que utiliza un sistema de modelos de datos compuesto por expertos, líderes y modelos a seguir en sus respectivos campos. También se pueden organizar consultas personalizadas con Personai. Apoya al individuo en cada paso del camino y sirve como fuente de motivación.`,
    personaiDesc: `personai es nuestro chatbot de IA que hace que el usuario sienta que está hablando con una persona real que tiene una carrera en un campo determinado. Da consejos y sugerencias y no solo ayuda con la planificación de la carrera, sino también con la vida laboral real`,
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
    howToUseDesc: `Personai bizning kelajagimizni yoritadigan murabbiydir. Bu bizga o\'zimiz intilmoqchi bo\'lgan kasb (to\'g\'ri martaba yo\'llari, kasbiy muhit va boshqalar) haqida ma\'lumot beruvchi dastur. Shuningdek, u bizning portfelimiz bo\'yicha ham yordam beradi. U o\'z sohasidagi mutaxassislar, yetakchilar va namunalardan tashkil topgan ma\'lumotlar modeli tizimidan foydalanadigan AI dasturini o\'z ichiga oladi. Personai bilan yuzma-yuz maslahatlashuvlar ham tashkil etilishi mumkin. U har bir qadamda shaxsni qo\'llab-quvvatlaydi va turtki manbai bo\'lib xizmat qiladi.`,
    personaiDesc: `personai - bu bizning sun\'iy intellektga asoslangan chatbotimiz bo\'lib, u foydalanuvchiga xuddi ma\'lum bir sohada martabaga ega bo\'lgan haqiqiy odam bilan gaplashayotgandek his qiladi. U maslahatlar va takliflar beradi va nafaqat martaba rejalashtirishda, balki amaliy mehnat hayotida ham yordam beradi.`,
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
    howToUseDesc: `Personai est un mentor qui illumine notre avenir. C\'est un système qui nous fournit des informations sur la profession que nous voulons exercer (les bons parcours professionnels, l\'environnement professionnel, etc.). Il nous assiste également avec notre portfolio. Il comprend un programme d\'IA qui utilise un système de modèle de données composé d\'experts, de dirigeants et de modèles dans leurs domaines respectifs. Des consultations individuelles peuvent également être organisées avec Personai. Il soutient l\'individu à chaque étape et sert de source de motivation.`,
    personaiDesc: `personai est notre chatbot IA qui donne à l\'utilisateur l\'impression de parler à une personne réelle qui a une carrière dans un certain domaine. Il donne des conseils et des suggestions et n\'aide pas seulement à la planification de carrière mais aussi à la vie professionnelle réelle`,
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
    howToUseDesc: `Personai е ментор, който осветява нашето бъдеще. Това е система, която ни предоставя информация за професията, която искаме да упражняваме (правилните кариерни пътеки, професионална среда и т.н.). Също така ни помага с нашето портфолио. Включва AI програма, която използва система от модели на данни, съставена от експерти, лидери и модели за подражание в съответните им области. Индивидуални консултации могат да бъдат организирани и с Personai. Той подкрепя индивида на всяка стъпка и служи като източник на мотивация.`,
    personaiDesc: `personai е нашият AI чатбот, който кара потребителя да се чувства така, сякаш говори с действителен човек, който има кариера в определена област. Той дава съвети и предложения и не само помага за планиране на кариерата, но и за реалния трудов живот`,
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
    howToUseDesc: `Personai — это наставник, который освещает наше будущее. Это система, которая предоставляет нам информацию о профессии, которой мы хотим заниматься (правильные карьерные пути, профессиональная среда и т. д.). Она также помогает нам с нашим портфолио. Включает в себя программу ИИ, использующую систему моделей данных, состоящую из экспертов, лидеров и образцов для подражания в соответствующих областях. С Personai также можно организовать индивидуальные консультации. Она поддерживает человека на каждом этапе пути и служит источником мотивации.`,
    personaiDesc: `personai — это наш чат-бот с ИИ, который заставляет пользователя чувствовать себя так, как будто он разговаривает с реальным человеком, у которого есть карьера в определенной области. Он дает советы и предложения и помогает не только в планировании карьеры, но и в реальной рабочей жизни`,
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
