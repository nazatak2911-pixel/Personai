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
  // new
  jobSimDesc: string;
  howToUseDesc: string;
  personaiDesc: string;
  networkDesc: string;
  tryNow: string;
  aboutUsP1: string;
  aboutUsP2: string;
  myCVDesc: string;
  internshipsDesc: string;
  demoDesc: string;
  demoList1: string;
  demoList2: string;
  demoList3: string;
  demoNote: string;
  emailHeader: string;
  numberHeader: string;
  placeholderDesc: string;
  privacyPolicyContent: string;
  simDisclaimer: string;
  doctorHistory: string;
  architectBrief: string;
  developerReport: string;
  lawyerDetails: string;
}

export const translations: Record<Language, Translations> = {
  "en": {
    "logIn": "Log In",
    "signUp": "Sign Up",
    "homePage": "🏠 Home Page",
    "buildNetwork": "Build Network",
    "myCV": "My CV",
    "jobSimulations": "Job Simulations",
    "internshipOpportunities": "Internship Opportunities",
    "aboutUs": "About Us",
    "contact": "Contact",
    "howToUse": "How to use",
    "demo": "Demo",
    "privacyPolicy": "Privacy Policy",
    "the": "The",
    "future": "Future",
    "starts": "Starts",
    "today": "Today",
    "aboutUsBtn": "About Us",
    "jobSimDesc": "For our job simulation feature, which grants you the experience of the prefered job, It challenges you in AI generated scenarios for you to improve yourself via the internet. You can use your computer for this experience or you could use VR glasses for a more realistic experience.",
    "howToUseDesc": "Personai is a mentor that illuminates our future. It's a system that provides us with information about the profession we want to pursue (the right career paths, professional environment, etc.). It also assists us with our portfolio. It includes an AI program that uses a data model system comprised of experts, leaders, and role models in their respective fields. One-on-one consultations can also be arranged with Personai. It supports the individual every step of the way and serves as a source of motivation.",
    "personaiDesc": "personai is our AI chatbot that makes the user feel as if they are talking to an actual person who has a career in a certain field. It gives tips and suggestions and does not only help with career planning but also with actual work life",
    "networkDesc": "With displaying inspiring peoples stories, Personai provides the opportunity of being able to interact with those people",
    "tryNow": "Try Now",
    "aboutUsP1": "Found in 2026 by a group of students who met in Bilfen Private High Schools, came along together and found this company. Our goal was to combine education and AI while also staying on the lines of ethic. Coming from diverse backgrounds and perspectives we combine our strengths to develop innovative ideas and a meaningful project.",
    "aboutUsP2": "As young individuals growing in a dynamic educational environment, we aim to think critically, collaborate effectively, and contribute positively to society. Together, we believe that small steps can lead to big changes.",
    "myCVDesc": "Personai helps you create the perfect CV for your ideal future by using other peoples inspiring stories and suggesting/explaining what you need added in and what will be useful",
    "internshipsDesc": "One of the most key points in choosing your ideal line of job is attending internships which do an efficient job at introducing lines of work to young people. Our program allows our users to see and search internship postings that we have gathered from trusted companies, schools or businesses.",
    "demoDesc": "Our website is currently being innovated and developed. Unfortunately due to the fact that this isn’t our final version some features may not be able to function properly and some features are not available at the moment. The features which are not available at the moment are:",
    "demoList1": "VR adjustment for job simulations",
    "demoList2": "Graphic demonstrations for job simulations",
    "demoList3": "Actual internship postings",
    "demoNote": "(Build my network may not function properly since there are no users submitting their stories except for our team members)",
    "emailHeader": "Email",
    "numberHeader": "Number",
    "placeholderDesc": "This page is currently under construction. Please check back later!",
    "privacyPolicyContent": "This Privacy Policy explains how our artificial intelligence application collects, uses, stores, and protects information when used by minors. We are committed to protecting the privacy, safety, and rights of children and ensuring all data is handled ethically.",
    "simDisclaimer": "These are currently available simulations. Our team is working on adding more professional fields and interactive scenarios soon.",
    "doctorHistory": "Detailed History: Mr. Henderson has a history of mild hypertension. No recent travel. Digital artist (high screen time). Peripheral vision loss is sporadic but increasing.",
    "architectBrief": "Detailed Brief: Site on a 45-degree slope. Local laws require 40% renewable energy. Client insists on glass but is worried about heating costs.",
    "developerReport": "Incident Report: Database latency spiked at 02:00 AM. Error logs show 'Too many connections'. New deployment happened 15 minutes prior.",
    "lawyerDetails": "Case Details: Plea deal is 2 years. Witness claims to have seen James at the scene, but initial statement was uncertain due to darkness."
  },
  "tr": {
    "logIn": "Giriş Yap",
    "signUp": "Kayıt Ol",
    "homePage": "🏠 Ana Sayfa",
    "buildNetwork": "Ağ Oluştur",
    "myCV": "Özgeçmişim",
    "jobSimulations": "İş Simülasyonları",
    "internshipOpportunities": "Staj Fırsatları",
    "aboutUs": "Hakkımızda",
    "contact": "İletişim",
    "howToUse": "Nasıl Kullanılır",
    "demo": "Demo",
    "privacyPolicy": "Gizlilik Politikası",
    "the": "Geleceğin",
    "future": "Başladığı",
    "starts": "Yer",
    "today": "Burası",
    "aboutUsBtn": "Hakkımızda",
    "jobSimDesc": "Tercih ettiğiniz işin deneyimini sunan iş simülasyonu özelliğimiz, internet üzerinden kendinizi geliştirmeniz için yapay zeka tarafından oluşturulan senaryolarda size meydan okur. Bu deneyim için bilgisayarınızı kullanabilir veya daha gerçekçi bir deneyim için VR gözlükleri kullanabilirsiniz.",
    "networkDesc": "İlham verici insanların hikayelerini sergileyerek, Personai bu insanlarla etkileşim kurma fırsatı sunar.",
    "howToUseDesc": "Personai, geleceğimizi aydınlatan bir mentordur. Takip etmek istediğimiz meslek hakkında (doğru kariyer yolları, mesleki ortam vb.) bize bilgi sağlayan bir sistemdir. Ayrıca portfolyomuz konusunda da bize yardımcı olur. Kendi alanlarında uzmanlardan, liderlerden ve rol modellerinden oluşan bir veri modeli sistemini kullanan bir yapay zeka programı içerir. Personai ile birebir danışmanlık da ayarlanabilir. Bireyi her adımda destekler ve bir motivasyon kaynağı olarak hizmet eder.",
    "personaiDesc": "Personai, kullanıcının belirli bir alanda kariyer sahibi gerçek bir insanla konuşuyormuş gibi hissetmesini sağlayan yapay zeka sohbet robotumuzdur. Sadece kariyer planlamasında değil, aynı zamanda gerçek iş hayatında da yardımcı olan ipuçları ve öneriler sunar.",
    "tryNow": "Şimdi Dene",
    "aboutUsP1": "2026 yılında Bilfen Özel Liseleri'nde tanışan bir grup öğrenci tarafından kurulmuştur. Amacımız etik kurallarına bağlı kalarak eğitimi ve yapay zekayı birleştirmekti. Farklı geçmişlerden ve bakış açılarından gelerek yenilikçi fikirler ve anlamlı bir proje geliştirmek için güçlerimizi birleştiriyoruz.",
    "aboutUsP2": "Dinamik bir eğitim ortamında büyüyen geç bireyler olarak eleştirel düşünmeyi, etkili işbirliği yapmayı ve topluma olumlu katkıda bulunmayı amaçlıyoruz. Birlikte, küçük adımların büyük değişimlere yol açabileceğine inanıyoruz.",
    "myCVDesc": "Personai, diğer insanların ilham verici hikayelerini kullanarak ve nelerin eklenmesi gerektiğini ve nelerin yararlı olacağını önererek/açıklayarak ideal geleceğiniz için mükemmel CV'yi oluşturmanıza yardımcı olur.",
    "internshipsDesc": "İdeal mesleğinizi seçmenin en önemli noktalarından biri, işkollarını gençlere tanıtmada etkili olan stajlara katılmaktır. Programımız, kullanıcılarımızın güvenilir şirketlerden, okullardan veya işletmelerden topladığımız staj ilanlarını görmelerini ve aramalarını sağlar.",
    "demoDesc": "Web sitemiz şu anda yenilenmekte ve geliştirilmektedir. Ne yazık ki bu nihai sürümümüz olmadığı için bazı özellikler düzgün çalışmayabilir ve bazı özellikler şu anda mevcut değildir. Şu anda mevcut olmayan özellikler şunlardır:",
    "demoList1": "İş simülasyonları için VR ayarı",
    "demoList2": "İş simülasyonları için grafik gösterimler",
    "demoList3": "Gerçek staj ilanları",
    "demoNote": "(Ağ oluşturma özelliği, ekip üyelerimiz dışında hikayelerini gönderen kullanıcı olmadığı için düzgün çalışmayabilir)",
    "emailHeader": "E-posta",
    "numberHeader": "Numara",
    "placeholderDesc": "Bu sayfa şu anda yapım aşamasındadır. Lütfen daha sonra tekrar kontrol edin!",
    "privacyPolicyContent": "Bu Gizlilik Politikası, reşit olmayan kişiler tarafından kullanıldığında yapay zeka uygulamamızın bilgileri nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklar. Çocukların gizliliğini, güvenliğini ve haklarını korumaya ve tüm verilerin etik olarak ele alınmasını sağlamaya kararlıyız.",
    "simDisclaimer": "Bunlar şu an kullanılabilir simülasyonlardır. Ekibimiz yakında daha fazla profesyonel alan ve interaktif senaryolar eklemek için çalışıyor.",
    "doctorHistory": "Detaylı Geçmiş: Bay Henderson'ın hafif hipertansiyon öyküsü var. Yakın zamanda seyahat etmemiş. Dijital sanatçı. Yan görüş kaybı düzensiz ama artıyor.",
    "architectBrief": "Detaylı Özet: Saha 45 derecelik bir eğimde. Yerel yasalar %40 yenilenebilir enerji gerektiriyor. Müşteri cam ısrarı yapıyor ama ısıtma maliyetlerinden korkuyor.",
    "developerReport": "Olay Raporu: Veritabanı gecikmesi saat 02:00'de pik yaptı. Hata günlükleri 'Çok fazla bağlantı' gösteriyor. Pikten 15 dakika önce yeni dağıtım yapıldı.",
    "lawyerDetails": "Vaka Detayları: Savcılık anlaşması 2 yıl. Tanık, James'i olay yerinde gördüğünü iddia ediyor ancak ilk ifadesi karanlık nedeniyle belirsizdi."
  },
  "it": {
    "logIn": "Accedi",
    "signUp": "Registrati",
    "homePage": "🏠 Home",
    "buildNetwork": "Crea Rete",
    "myCV": "Il Mio CV",
    "jobSimulations": "Simulazioni Lavoro",
    "internshipOpportunities": "Opportunità di Stage",
    "aboutUs": "Chi Siamo",
    "contact": "Contatti",
    "howToUse": "Come usare",
    "demo": "Demo",
    "privacyPolicy": "Informativa sulla privacy",
    "the": "Il",
    "future": "Futuro",
    "starts": "Inizia",
    "today": "Oggi",
    "aboutUsBtn": "Chi Siamo",
    "jobSimDesc": "Per la nostra funzione di simulazione del lavoro, ti sfida in scenari generati dall'intelligenza artificiale per farti migliorare tramite Internet. Puoi usare il tuo computer per questa esperienza o potresti usare occhiali VR per un'esperienza più realistica.",
    "networkDesc": "Mostrando storie di persone ispiratrici, Personai offre l'opportunità di poter interagire con quelle persone.",
    "howToUseDesc": "Personai è un mentore che illumina il nostro futuro. È un sistema che ci fornisce informazioni sulla professione che vogliamo intraprendere. Ci assiste anche con il nostro portfolio. Supporta l'individuo in ogni fase del percorso e funge da fonte di motivazione.",
    "personaiDesc": "personai è il nostro chatbot IA che fa sentire l'utente come se stesse parlando con una persona reale che ha una carriera in un determinato campo. Dà suggerimenti e non aiuta solo nella pianificazione della carriera, ma anche nella reale vita lavorativa",
    "tryNow": "Prova Ora",
    "aboutUsP1": "Fondata nel 2026 da un gruppo di studenti che si sono conosciuti nelle scuole private Bilfen. Il nostro obiettivo era unire istruzione e intelligenza artificiale rimanendo fedeli all'etica. Uniamo le nostre forze per sviluppare idee innovative.",
    "aboutUsP2": "Come giovani in un ambiente educativo dinamico, miriamo a pensare in modo critico ea collaborare efficacemente. Insieme crediamo che piccoli passi possano portare a grandi cambiamenti.",
    "myCVDesc": "Personai ti aiuta a creare il CV perfetto per il tuo futuro ideale utilizzando le storie stimolanti di altre persone.",
    "internshipsDesc": "Il nostro programma consente ai nostri utenti di visualizzare gli annunci di stage che abbiamo raccolto da aziende fidate, scuole o imprese.",
    "demoDesc": "Il nostro sito web è attualmente in fase di innovazione e sviluppo. Sfortunatamente alcune funzionalità non sono disponibili al momento:",
    "demoList1": "Regolazione VR per simulazioni di lavoro",
    "demoList2": "Dimostrazioni grafiche per simulazioni di lavoro",
    "demoList3": "Annunci di stage reali",
    "demoNote": "(La rete potrebbe non funzionare correttamente poiché non ci sono ancora utenti che inviano storie)",
    "emailHeader": "Email",
    "numberHeader": "Numero",
    "placeholderDesc": "Questa pagina è attualmente in costruzione. Torna a controllare più tardi!",
    "privacyPolicyContent": "La presente Informativa sulla privacy spiega in che modo la nostra applicazione di intelligenza artificiale raccoglie, utilizza e protegge le informazioni per i minori.",
    "simDisclaimer": "Queste sono le simulazioni attualmente disponibili. Il nostro team sta lavorando per aggiungere presto altri campi professionali.",
    "doctorHistory": "Storia dettagliata: Il signor Henderson ha una storia di lieve ipertensione. Nessun viaggio recente. Perdita della visione periferica sporadica.",
    "architectBrief": "Brief dettagliato: Sito su un pendio di 45 gradi. Il cliente insiste sul vetro ma è preoccupato per i costi di riscaldamento.",
    "developerReport": "Rapporto sull'incidente: La latenza del database è aumentata alle 02:00. I log mostrano 'Troppe connessioni'.",
    "lawyerDetails": "Dettagli del caso: Il patteggiamento è di 2 anni. Il testimone afferma di aver visto James, ma la dichiarazione iniziale era incerta."
  },
  "de": {
    "logIn": "Anmelden",
    "signUp": "Registrieren",
    "homePage": "🏠 Startseite",
    "buildNetwork": "Netzwerk aufbauen",
    "myCV": "Mein Lebenslauf",
    "jobSimulations": "Job-Simulationen",
    "internshipOpportunities": "Praktikumsmöglichkeiten",
    "aboutUs": "Über uns",
    "contact": "Kontakt",
    "howToUse": "Wie benutzen",
    "demo": "Demo",
    "privacyPolicy": "Datenschutzrichtlinie",
    "the": "Die",
    "future": "Zukunft",
    "starts": "Beginnt",
    "today": "Heute",
    "aboutUsBtn": "Über uns",
    "jobSimDesc": "Unsere Job-Simulationsfunktion fordert Sie in von KI generierten Szenarien heraus, um sich über das Internet zu verbessern. Sie können für diese Erfahrung Ihren Computer verwenden oder eine VR-Brille.",
    "networkDesc": "Durch die Anzeige inspirierender Geschichten von Menschen bietet Personai die Möglichkeit, mit diesen Menschen in Kontakt zu treten.",
    "howToUseDesc": "Personai ist ein Mentor, der unsere Zukunft beleuchtet. Es ist ein System, das uns Informationen über den Beruf liefert, den wir ausüben wollen. Es unterstützt uns auch bei unserem Portfolio.",
    "personaiDesc": "personai ist unser KI-Chatbot, der dem Benutzer das Gefühl gibt, mit einer echten Person zu sprechen, die Karriere in einem bestimmten Bereich macht.",
    "tryNow": "Jetzt Testen",
    "aboutUsP1": "Gegründet 2026 von einer Gruppe von Schülern der Bilfen Private High Schools. Unser Ziel war es, Bildung und KI zu kombinieren und dabei die Ethik zu wahren.",
    "aboutUsP2": "Als junge Menschen in einem dynamischen Umfeld wollen wir kritisch denken und effektiv zusammenarbeiten. Wir glauben, dass kleine Schritte zu großen Veränderungen führen.",
    "myCVDesc": "Personai hilft Ihnen bei der Erstellung des perfekten Lebenslaufs für Ihre ideale Zukunft, indem es die inspirierenden Geschichten anderer nutzt.",
    "internshipsDesc": "Unser Programm ermöglicht es Benutzern, Stellenangebote für Praktika zu sehen und zu durchsuchen, die wir von vertrauenswürdigen Unternehmen gesammelt haben.",
    "demoDesc": "Unsere Website wird derzeit entwickelt. Daher sind einige Funktionen möglicherweise nicht verfügbar:",
    "demoList1": "VR-Anpassung für Jobsimulationen",
    "demoList2": "Grafische Demonstrationen",
    "demoList3": "Aktuelle Praktikumsangebote",
    "demoNote": "(Das Netzwerk funktioniert möglicherweise nicht richtig, da noch keine Nutzer Geschichten eingereicht haben)",
    "emailHeader": "E-Mail",
    "numberHeader": "Nummer",
    "placeholderDesc": "Diese Seite befindet sich im Aufbau. Bitte schauen Sie später wieder vorbei!",
    "privacyPolicyContent": "Diese Datenschutzrichtlinie erklärt, wie unsere KI-Anwendung Informationen von Minderjährigen sammelt, nutzt und schützt.",
    "simDisclaimer": "Dies sind aktuell verfügbare Simulationen. Unser Team arbeitet daran, bald weitere Berufsfelder hinzuzufügen.",
    "doctorHistory": "Detaillierte Anamnese: Herr Henderson leidet an leichtem Bluthochdruck. Kein Reiseverlauf. Sporadischer Verlust des peripheren Sehens.",
    "architectBrief": "Detailliertes Briefing: Grundstück mit 45 Grad Neigung. Kunde besteht auf Glas, sorgt sich aber um Heizkosten.",
    "developerReport": "Vorfallbericht: Datenbank-Latenz stieg um 02:00 Uhr an. Logs zeigen 'Zu viele Verbindungen'.",
    "lawyerDetails": "Falldetails: Das Plädoyer-Angebot beträgt 2 Jahre. Zeuge behauptet, James gesehen zu haben, war aber anfangs unsicher."
  },
  "es": {
    "logIn": "Iniciar Sesión",
    "signUp": "Registrarse",
    "homePage": "🏠 Inicio",
    "buildNetwork": "Crear Red",
    "myCV": "Mi CV",
    "jobSimulations": "Simulaciones de Trabajo",
    "internshipOpportunities": "Oportunidades de Prácticas",
    "aboutUs": "Sobre Nosotros",
    "contact": "Contacto",
    "howToUse": "Cómo usar",
    "demo": "Demo",
    "privacyPolicy": "Política de Privacidad",
    "the": "El",
    "future": "Futuro",
    "starts": "Empieza",
    "today": "Hoy",
    "aboutUsBtn": "Sobre Nosotros",
    "jobSimDesc": "Para nuestra función de simulación de trabajo, lo desafía en escenarios generados por IA para que mejore a través de Internet. Puede usar su computadora o gafas VR.",
    "networkDesc": "Al mostrar historias inspiradoras de personas, Personai brinda la oportunidad de interactuar con esas personas.",
    "howToUseDesc": "Personai es un mentor que ilumina nuestro futuro. Nos proporciona información sobre la profesión que queremos seguir. También nos ayuda con nuestra cartera.",
    "personaiDesc": "personai es nuestro chatbot de IA que hace que el usuario sienta que está hablando con una persona real que tiene una carrera en un campo determinado.",
    "tryNow": "Probar Ahora",
    "aboutUsP1": "Fundada en 2026 por un grupo de estudiantes de Bilfen. Nuestro objetivo fue combinar la educación y la IA manteniéndonos éticos.",
    "aboutUsP2": "Como jóvenes en un entorno dinámico, nuestro objetivo es pensar críticamente. Juntos, creemos que los pequeños pasos conducen a grandes cambios.",
    "myCVDesc": "Personai te ayuda a crear el CV perfecto utilizando historias inspiradoras de otras personas y sugiriendo qué te será útil.",
    "internshipsDesc": "Nuestro programa permite ver y buscar publicaciones de pasantías que hemos recopilado de empresas confiables.",
    "demoDesc": "Nuestro sitio web se encuentra en desarrollo. Es posible que algunas funciones no estén disponibles por ahora:",
    "demoList1": "Ajuste de realidad virtual para simulaciones",
    "demoList2": "Demostraciones gráficas para simulaciones",
    "demoList3": "Publicaciones actuales de pasantías",
    "demoNote": "(La red puede no funcionar correctamente ya que aún no hay usuarios enviando historias)",
    "emailHeader": "Correo",
    "numberHeader": "Número",
    "placeholderDesc": "Esta página está actualmente en construcción. ¡Por favor, vuelva más tarde!",
    "privacyPolicyContent": "Esta Política de privacidad explica cómo nuestra aplicación de IA recopila y protege la información de los menores.",
    "simDisclaimer": "Estas son simulaciones disponibles actualmente. Nuestro equipo está trabajando para añadir más campos profesionales pronto.",
    "doctorHistory": "Historia detallada: El Sr. Henderson tiene antecedentes de hipertensión leve. Pérdida de visión periférica esporádica pero creciente.",
    "architectBrief": "Breve detallado: Sitio en una pendiente de 45 grados. El cliente insiste en el vidrio pero le preocupan los costes de calefacción.",
    "developerReport": "Informe de incidentes: La latencia de la base de datos aumentó a las 02:00 AM. Los registros muestran 'Demasiadas conexiones'.",
    "lawyerDetails": "Detalles del caso: El acuerdo de culpabilidad es de 2 años. El testigo afirma haber visto a James, pero la declaración inicial era incierta."
  },
  "uz": {
    "logIn": "Kirish",
    "signUp": "Ro'yxatdan o'tish",
    "homePage": "🏠 Bosh sahifa",
    "buildNetwork": "Tarmoq yaratish",
    "myCV": "Mening CV",
    "jobSimulations": "Ish simulyatsiyalari",
    "internshipOpportunities": "Amaliyot imkoniyatlari",
    "aboutUs": "Biz haqimizda",
    "contact": "Aloqa",
    "howToUse": "Qanday ishlatish",
    "demo": "Demo",
    "privacyPolicy": "Maxfiylik siyosati",
    "the": "Kelajak",
    "future": "Boshlanadi",
    "starts": "Aynan",
    "today": "Bugun",
    "aboutUsBtn": "Biz haqimizda",
    "jobSimDesc": "Sizni AI tomonidan yaratilgan ssenariylarda sinab ko'radi. Kompyuteringizdan yoki VR ko'zoynaklaridan foydalanishingiz mumkin.",
    "networkDesc": "Ilhomlantiruvchi odamlarning hikoyalarini namoyish etish orqali Personai ushbu odamlar bilan muloqot qilish imkoniyatini taqdim etadi.",
    "howToUseDesc": "Personai bizning kelajagimizni yoritadigan murabbiydir. Bu bizga o'zimiz intilmoqchi bo'lgan kasb haqida ma'lumot beruvchi dastur.",
    "personaiDesc": "personai yordamida foydalanuvchiga xuddi haqiqiy odam bilan gaplashayotgandek his qiladi.",
    "tryNow": "Sinab Ko'rish",
    "aboutUsP1": "2026 yilda Bilfen o'quvchilari tomonidan tashkil etilgan. Bizning maqsadimiz axloqiy me'yorlarga rioya qilgan holda ta'lim va AIni birlashtirish edi.",
    "aboutUsP2": "Dinamik muhitda yoshlar sifatida biz tanqidiy fikrlashni maqsad qilganmiz. Birgalikda kichik qadamlar katta o'zgarishlarga olib kelishiga ishonamiz.",
    "myCVDesc": "Personai boshqa odamlarning ilhomlantiruvchi hikoyalaridan foydalanib ideal kelajagingiz uchun mukammal CV yaratishga yordam beradi.",
    "internshipsDesc": "Bizning dasturimiz foydalanuvchilarga ishonchli kompaniyalardan to'plangan amaliyot e'lonlarini ko'rish imkonini beradi.",
    "demoDesc": "Bizning veb-saytimiz hozirda ishlab chiqilmoqda. Afsuski, ba'zi xususiyatlar hozirda mavjud emas:",
    "demoList1": "Ish simulyatsiyalari uchun VR sozlamalari",
    "demoList2": "Grafik namoyishlar",
    "demoList3": "Haqiqiy amaliyot e'lonlari",
    "demoNote": "(Trarmoq hali unchalik yaxshi ishlamasligi mumkin)",
    "emailHeader": "Elektron pochta",
    "numberHeader": "Raqam",
    "placeholderDesc": "Ushbu sahifa hozirda qurilmoqda. Iltimos, keyinroq qayta tekshiring!",
    "privacyPolicyContent": "Ushbu maxfiylik siyosati bizning ilovamiz ma'lumotlarni qanday to'plashi va himoya qilishini tushuntiradi.",
    "simDisclaimer": "Bular hozirda mavjud simulyatsiyalar. Bizning jamoamiz yaqinda yangi sohalarni qo'shish ustida ishlamoqda.",
    "doctorHistory": "Batafsil tarix: Janob Hendersonda engil gipertoniya bor. Periferik ko'rish qobiliyatini yo'qotish ortib bormoqda.",
    "architectBrief": "Batafsil ma'lumot: Joy 45 darajali nishabda. Mijoz oynali devorlarni xohlaydi, lekin isitish xarajatlaridan xavotirda.",
    "developerReport": "Hodisa hisoboti: Ma'lumotlar bazasi kechikishi soat 02:00 da oshdi. Tizimda 'Ulanishlar juda ko'p' xatosi.",
    "lawyerDetails": "Ish tafsilotlari: Kelishuv 2 yil. Guvoh Jeymsni ko'rganini aytmoqda, lekin avvalgi ko'rsatmasi noaniq edi."
  },
  "fr": {
    "logIn": "Connexion",
    "signUp": "S'inscrire",
    "homePage": "🏠 Accueil",
    "buildNetwork": "Créer un réseau",
    "myCV": "Mon CV",
    "jobSimulations": "Simulations d'emploi",
    "internshipOpportunities": "Opportunités de stage",
    "aboutUs": "À propos de nous",
    "contact": "Contact",
    "howToUse": "Comment utiliser",
    "demo": "Demo",
    "privacyPolicy": "Politique de confidentialité",
    "the": "Le",
    "future": "Futur",
    "starts": "Commence",
    "today": "Aujourd'hui",
    "aboutUsBtn": "À propos de nous",
    "jobSimDesc": "Il vous met au défi dans des scénarios générés par l'IA via Internet. Vous pouvez utiliser votre ordinateur ou des lunettes VR.",
    "networkDesc": "En affichant les histoires inspirantes, Personai offre l'opportunité d'interagir avec ces personnes.",
    "howToUseDesc": "Personai est un mentor qui illumine notre avenir. Il nous fournit des informations sur la profession que nous voulons exercer.",
    "personaiDesc": "personai est notre chatbot IA qui donne à l'utilisateur l'impression de parler à une personne réelle ayant une carrière.",
    "tryNow": "Essayer",
    "aboutUsP1": "Fondée en 2026 par des étudiants de Bilfen. Notre objectif était de combiner éducation et IA en respectant l'éthique.",
    "aboutUsP2": "En tant que jeunes, notre objectif est de penser de manière critique. Ensemble, nous croyons que les petits pas mènent à de grands changements.",
    "myCVDesc": "Personai vous aide à créer le CV parfait pour votre avenir idéal en utilisant des histoires inspirantes.",
    "internshipsDesc": "Notre programme permet aux utilisateurs de rechercher des offres de stage d'entreprises de confiance.",
    "demoDesc": "Notre site Web est en cours de développement. Certaines fonctionnalités ne sont pas disponibles :",
    "demoList1": "Ajustement VR pour les simulations",
    "demoList2": "Démonstrations graphiques",
    "demoList3": "Offres de stage réelles",
    "demoNote": "(Le réseau peut ne pas fonctionner correctement pour le moment)",
    "emailHeader": "Email",
    "numberHeader": "Numéro",
    "placeholderDesc": "Cette page est en cours de construction. Revenez plus tard !",
    "privacyPolicyContent": "Cette politique de confidentialité explique comment notre application IA collecte et protège les informations des mineurs.",
    "simDisclaimer": "Ce sont les simulations actuellement disponibles. Notre équipe travaille pour ajouter d'autres domaines bientôt.",
    "doctorHistory": "Histoire détaillée : M. Henderson a des antécédents d'hypertension légère. Perte de vision périphérique sporadique.",
    "architectBrief": "Brief détaillé : Terrain sur une pente de 45 degrés. Le client insiste sur le verre mais s'inquiète des coûts de chauffage.",
    "developerReport": "Rapport d'incident : La latence de la base de datos a bondi à 02h00. Les journaux indiquent 'Trop de connexions'.",
    "lawyerDetails": "Détails de l'affaire : Le plaidoyer est de 2 ans. Le témoin prétend avoir vu James, mais la déclaration initiale était incertaine."
  },
  "bg": {
    "logIn": "Вход",
    "signUp": "Регистрация",
    "homePage": "🏠 Начална страница",
    "buildNetwork": "Изгради мрежа",
    "myCV": "Моето CV",
    "jobSimulations": "Симулации на работа",
    "internshipOpportunities": "Възможности за стаж",
    "aboutUs": "За нас",
    "contact": "Контакт",
    "howToUse": "Как се използва",
    "demo": "Демо",
    "privacyPolicy": "Политика за поверителност",
    "the": "Бъдещето",
    "future": "Започва",
    "starts": "Точно",
    "today": "Днес",
    "aboutUsBtn": "За нас",
    "jobSimDesc": "Предизвиква ви в генерирани от AI сценарии, за да се усъвършенствате. Можете да използвате компютъра си или VR очила.",
    "networkDesc": "Показвайки вдъхновяващи истории, Personai предоставя възможността да взаимодействате с тези хора.",
    "howToUseDesc": "Personai е ментор, който осветява нашето бъдеще и ни предоставя информация за професията, която искаме.",
    "personaiDesc": "personai е нашият AI чатбот, който кара потребителя да се чувства все едно говори с действителен човек.",
    "tryNow": "Опитай",
    "aboutUsP1": "Основана през 2026 г. от група ученици. Нашата цел беше да комбинираме образованието и AI етично.",
    "aboutUsP2": "Като млади хора ние се стремим да мислим критично. Заедно вярваме, че малките стъпки водят до големи промени.",
    "myCVDesc": "Personai ви помага да създадете перфектното CV за вашето идеално бъдеще.",
    "internshipsDesc": "Нашата програма позволява на потребителите да разглеждат обяви за стаж от доверени компании.",
    "demoDesc": "Нашият уебсайт в момента се разработва. Някои функции може да не са налични:",
    "demoList1": "VR корекция за симулации",
    "demoList2": "Графични демонстрации",
    "demoList3": "Действителни публикации за стаж",
    "demoNote": "(Мрежата все още няма достатъчно потребители)",
    "emailHeader": "Имейл",
    "numberHeader": "Номер",
    "placeholderDesc": "Тази страница в момента се изгражда. Моля, проверете отново по-късно!",
    "privacyPolicyContent": "Тази Политика обяснява как нашето AI приложение събира и защитава информацията.",
    "simDisclaimer": "Това са наличните в момента симулации. Нашият екип работи по добавянето на още професионални области скоро.",
    "doctorHistory": "Подробна история: Г-н Хендерсън има история на лека хипертония. Загубата на периферно зрение се засилва.",
    "architectBrief": "Подробен брифинг: Обект на 45-градусов наклон. Клиентът настоява за стъкло, но се притеснява от разходите за отопление.",
    "developerReport": "Доклад за инцидент: Закъснението на базата данни скочи в 02:00 ч. Логовете показват 'Твърде много връзки'.",
    "lawyerDetails": "Подробности за случая: Сделката е 2 години. Свидетелят твърди, че е видял Джеймс, но първоначалното изявление беше несигурно."
  },
  "ru": {
    "logIn": "Войти",
    "signUp": "Регистрация",
    "homePage": "🏠 Главная страница",
    "buildNetwork": "Создать сеть",
    "myCV": "Мое резюме",
    "jobSimulations": "Симуляторы работы",
    "internshipOpportunities": "Стажировки",
    "aboutUs": "О нас",
    "contact": "Контакт",
    "howToUse": "Как использовать",
    "demo": "Демо",
    "privacyPolicy": "Конфиденциальность",
    "the": "Будущее",
    "future": "Начинается",
    "starts": "Прямо",
    "today": "Сегодня",
    "aboutUsBtn": "О нас",
    "jobSimDesc": "Функция симуляции работы бросает вам вызов в сценариях ИИ. Вы можете использовать свой компьютер или VR-очки.",
    "networkDesc": "Показывая истории людей, Personai предоставляет возможность общаться с ними.",
    "howToUseDesc": "Personai — это наставник, который освещает наше будущее и предоставляет информацию о профессии.",
    "personaiDesc": "personai — это наш чат-бот для карьерных советов от лица реальных людей.",
    "tryNow": "Попробовать",
    "aboutUsP1": "Основано в 2026 году группой студентов. Наша цель — объединить образование и ИИ с соблюдением этических норм.",
    "aboutUsP2": "Как молодое поколение, мы стремимся мыслить критически. Мы верим, что маленькие шаги ведут к большим изменениям.",
    "myCVDesc": "Personai помогает вам создать идеальное резюме с помощью историй других людей.",
    "internshipsDesc": "Наша программа позволяет пользователям искать стажировки от проверенных компаний.",
    "demoDesc": "Наш сайт в стадии разработки. Некоторые функции пока недоступны:",
    "demoList1": "Настройка VR",
    "demoList2": "Графические демонстрации",
    "demoList3": "Реальные объявления о стажировках",
    "demoNote": "(Функция сети пока находится в разработке)",
    "emailHeader": "Эл. почта",
    "numberHeader": "Номер",
    "placeholderDesc": "Эта страница находится в разработке. Пожалуйста, зайдите позже!",
    "privacyPolicyContent": "Эта политика объясняет, как наше ИИ-приложение собирает и защищает информацию несовершеннолетних.",
    "simDisclaimer": "Это доступные на данный момент симуляции. Наша команда работает над добавлением новых областей в ближайшее время.",
    "doctorHistory": "Подробная история: У мистера Хендерсона легкая гипертония. Потеря периферического зрения носит спорадический характер.",
    "architectBrief": "Подробный бриф: Участок на склоне 45 градусов. Клиент настаивает на стекле, но обеспокоен затратами на отопление.",
    "developerReport": "Отчет об инциденте: Задержка БД подскочила в 02:00. Логи показывают 'Слишком много соединений'.",
    "lawyerDetails": "Детали дела: Сделка о признании вины составляет 2 года. Свидетель утверждает, что видел Джеймса, но первые показания были сбивчивыми."
  }
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
