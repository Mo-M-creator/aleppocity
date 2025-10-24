// ============================================
// PREMIUM ALEPPO CITY EVENTS GUIDE
// Theme & Language Management System
// ============================================

// Global state
let currentLang = 'ar';
let currentTheme = 'light';
let eventsData = [];

// Embedded translations (to avoid CORS issues with fetch)
const translations = {
  "navbar": {
    "brand": { "ar": "مدينة حلب", "en": "Aleppo City" },
    "home": { "ar": "الرئيسية", "en": "Home" },
    "events": { "ar": "الفعاليات", "en": "Events" },
    "about": { "ar": "دليل الموقع", "en": "Site Guide" },
    "contact": { "ar": "اتصل بنا", "en": "Contact Us" },
    "students": { "ar": "الطلاب", "en": "Students" }
  },
  "footer": {
    "copyright": { "ar": "© حقوق النشر 2025 - دليل فعاليات مدينة حلب", "en": "© Copyright 2025 - Aleppo City Events Guide" },
    "email": { "ar": "البريد: mofidadaikh321@gmail.com", "en": "Email: mofidadaikh321@gmail.com" }
  },
  "home": {
    "featuredTitle": { "ar": "فعاليات بارزة هذا الأسبوع", "en": "Featured Events This Week" },
    "quickCategories": { "ar": "تصنيفات سريعة", "en": "Quick Categories" },
    "latestEvents": { "ar": "أحدث الفعاليات", "en": "Latest Events" },
    "viewAllEvents": { "ar": "عرض كل الفعاليات", "en": "View All Events" },
    "details": { "ar": "التفاصيل", "en": "Details" },
    "addToCalendar": { "ar": "أضف للتقويم", "en": "Add to Calendar" }
  },
  "events": {
    "title": { "ar": "قائمة الفعاليات", "en": "Events List" },
    "searchPlaceholder": { "ar": "ابحث باسم الفعالية أو الوصف", "en": "Search by event name or description" },
    "allCategories": { "ar": "كل التصنيفات", "en": "All Categories" },
    "sortNearest": { "ar": "الأقرب", "en": "Nearest" },
    "sortLatest": { "ar": "الأحدث", "en": "Latest" },
    "clear": { "ar": "مسح", "en": "Clear" },
    "noEvents": { "ar": "لا توجد فعاليات حسب الفلترة الحالية.", "en": "No events found with current filters." }
  },
  "eventDetail": {
    "relatedEvents": { "ar": "فعاليات ذات صلة", "en": "Related Events" },
    "information": { "ar": "معلومات", "en": "Information" },
    "category": { "ar": "التصنيف:", "en": "Category:" },
    "location": { "ar": "المكان:", "en": "Location:" },
    "date": { "ar": "التاريخ:", "en": "Date:" },
    "share": { "ar": "مشاركة", "en": "Share" },
    "booking": { "ar": "حجز وهمي", "en": "Mock Booking" },
    "bookingTitle": { "ar": "حجز مكان (وهمي)", "en": "Book a Spot (Mock)" },
    "name": { "ar": "الاسم", "en": "Name" },
    "email": { "ar": "البريد", "en": "Email" },
    "confirmBooking": { "ar": "تأكيد الحجز", "en": "Confirm Booking" },
    "bookingSuccess": { "ar": "تم تأكيد الحجز (وهمي). شكرًا", "en": "Booking confirmed (mock). Thank you" },
    "view": { "ar": "عرض", "en": "View" },
    "notFound": { "ar": "الفعالية غير موجودة.", "en": "Event not found." }
  },
  "about": {
    "title": { "ar": "نبذة عن الدليل", "en": "About the Guide" },
    "description": { "ar": '"دليل فعاليات المدينة" هو منصة الكترونية تهدف إلى جمع ونشر جميع الفعاليات الثقافية، الرياضية، العائلية والفنية في مكان واحد. رؤيتنا هي بناء جسر بين المنظمين والجمهور، ورسالتنا هي تمكين كل فرد من الوصول بسهولة إلى أنشطة مدينته والمشاركة فيها.', "en": '"City Events Guide" is an electronic platform aimed at collecting and publishing all cultural, sports, family and artistic events in one place. Our vision is to build a bridge between organizers and the public, and our mission is to enable everyone to easily access and participate in their city\'s activities.' },
    "teamTitle": { "ar": "فريق العمل", "en": "Team" },
    "teamMembers": {
      "member1": {
        "name": { "ar": "مفيدة دايخ", "en": "Mofida Daikh" },
        "role": { "ar": "مدير المشروع", "en": "Project Manager" }
      },
      "member2": {
        "name": { "ar": "أبي الرفاعي", "en": "Abi Al-Rifai" },
        "role": { "ar": "مصمم واجهة", "en": "UI Designer" }
      },
      "member3": {
        "name": { "ar": "بتول مسوتي", "en": "Batoul Maswati" },
        "role": { "ar": "مبرمجة", "en": "Developer" }
      },
      "member4": {
        "name": { "ar": "أمل", "en": "Amal" },
        "role": { "ar": "خبيرة تواصل اجتماعي", "en": "Social Media Expert" }
      }
    },
    "policiesTitle": { "ar": "سياسات نشر الفعاليات", "en": "Event Publishing Policies" },
    "policiesIntro": { "ar": "نحن نشجع جميع الأفراد والجهات على تقديم فعالياتهم ليتم نشرها في الدليل. حرصًا على جودة المحتوى، نعتمد السياسات التالية:", "en": "We encourage all individuals and organizations to submit their events to be published in the guide. To ensure content quality, we adopt the following policies:" },
    "policies": {
      "policy1": { "ar": "يجب أن تكون الفعالية عامة ومفتوحة للمجتمع.", "en": "Events must be public and open to the community." },
      "policy2": { "ar": "تقديم التفاصيل الأساسية: العنوان، التاريخ، المكان، صورة.", "en": "Provide basic details: title, date, location, image." },
      "policy3": { "ar": "الابتعاد عن أي محتوى مسيء أو مخالف للقوانين المحلية.", "en": "Avoid any offensive content or violations of local laws." },
      "policy4": { "ar": "المراجعة والموافقة تتم من قِبل فريق التحرير قبل النشر.", "en": "Review and approval is done by the editorial team before publishing." }
    },
    "submitInfo": { "ar": "لتقديم فعالية، يرجى استخدام صفحة", "en": "To submit an event, please use the" },
    "submitLink": { "ar": "اتصل بنا", "en": "Contact Us" },
    "submitInfoEnd": { "ar": "وإرسال تفاصيل الحدث. سنقوم بمراجعتها والرد في أقرب وقت.", "en": "page and send the event details. We will review them and respond as soon as possible." }
  },
  "contact": {
    "title": { "ar": "اتصل بنا", "en": "Contact Us" },
    "nameLabel": { "ar": "الاسم", "en": "Name" },
    "emailLabel": { "ar": "البريد الإلكتروني", "en": "Email" },
    "messageLabel": { "ar": "الرسالة", "en": "Message" },
    "submit": { "ar": "إرسال", "en": "Send" },
    "successMessage": { "ar": "تم إرسال الرسالة بنجاح. شكرًا لتواصلك معنا.", "en": "Message sent successfully. Thank you for contacting us." },
    "errorRequired": { "ar": "يرجى ملء الحقول المطلوبة.", "en": "Please fill in the required fields." },
    "errorEmail": { "ar": "صيغة البريد غير صحيحة.", "en": "Invalid email format." }
  },
  "wishlist": {
    "title": { "ar": "قائمة المفضلة", "en": "Wishlist" },
    "addToWishlist": { "ar": "أضف للمفضلة", "en": "Add to Wishlist" },
    "removeFromWishlist": { "ar": "إزالة من المفضلة", "en": "Remove from Wishlist" },
    "added": { "ar": "تمت الإضافة للمفضلة", "en": "Added to Wishlist" },
    "removed": { "ar": "تمت الإزالة من المفضلة", "en": "Removed from Wishlist" },
    "empty": { "ar": "قائمة المفضلة فارغة", "en": "Your wishlist is empty" },
    "emptyMessage": { "ar": "لم تقم بإضافة أي فعاليات إلى قائمة المفضلة بعد.", "en": "You haven't added any events to your wishlist yet." },
    "browseEvents": { "ar": "تصفح الفعاليات", "en": "Browse Events" },
    "remove": { "ar": "إزالة", "en": "Remove" }
  },
  "students": {
    "title": { "ar": "الطلاب", "en": "Students" },
    "list": [
      {
        "id": "mofeda_269223",
        "name": { "ar": "مفيدة", "en": "Mofeda" },
        "fullName": { "ar": "مفيدة دايخ", "en": "Mofeda Daikh" },
        "username": "mofeda_269223"
      },
      {
        "id": "batool_134152",
        "name": { "ar": "بتول", "en": "Batool" },
        "fullName": { "ar": "بتول مسوتي", "en": "Batool Maswati" },
        "username": "Batool_134152"
      },
      {
        "id": "obai_283912",
        "name": { "ar": "أبي", "en": "Obai" },
        "fullName": { "ar": "أبي الرفاعي", "en": "Abi Al-Rifai" },
        "username": "obai_283912"
      },
      {
        "id": "amal_285505",
        "name": { "ar": "أمل", "en": "Amal" },
        "fullName": { "ar": "أمل حسن المحمود", "en": "Amal Hassan Al-Mahmoud" },
        "username": "amal_285505"
      }
    ]
  },
  "eventData": [
    {
      "id": "e1",
      "title": { "ar": "جولة تاريخية لا تنسى", "en": "Unforgettable Historical Tour" },
      "location": { "ar": "وسط المدينة", "en": "Downtown" },
      "category": { "ar": "تاريخي", "en": "Historical" },
      "shortDesc": { "ar": "جولة تاريخية من قلب قلعة حلب الاثرية.", "en": "Historical tour from the heart of Aleppo's archaeological citadel." },
      "fullDesc": { "ar": "وصف كامل للقلعة مع تفاصيل المكان وبرنامج اليوم.", "en": "Full description of the citadel with location details and daily program." }
    },
    {
      "id": "e2",
      "title": { "ar": "مطعم عريق", "en": "Heritage Restaurant" },
      "location": { "ar": "امام قلعة حلب", "en": "In front of Aleppo Citadel" },
      "category": { "ar": "مأكولات", "en": "Food" },
      "shortDesc": { "ar": "مذاق رائع مع اطلالة ساحرة تخطف الانفاس.", "en": "Wonderful taste with breathtaking views." },
      "fullDesc": { "ar": "مطعم عريق يضم اشهى المأكولات الحلبية بالاضافة الى حفلات موسيقية تضم اشهر الفنانين.", "en": "A heritage restaurant featuring the most delicious Aleppan cuisine along with musical concerts featuring the most famous artists." }
    },
    {
      "id": "e3",
      "title": { "ar": "معرض الفن المتنوع", "en": "Diverse Art Exhibition" },
      "location": { "ar": "قاعة المعارض", "en": "Exhibition Hall" },
      "category": { "ar": "ثقافة", "en": "Culture" },
      "shortDesc": { "ar": "تجتمع مختلف الاعمال والشركات الصغيرة لكي تبرز جزء من اعمالها.", "en": "Various works and small businesses come together to showcase part of their work." },
      "fullDesc": { "ar": "عرض العديد من التشكيلات والفنون والمأكولات لدعم المشاريع الصغيرة.", "en": "Display of many art forms, crafts and foods to support small projects." }
    },
    {
      "id": "e4",
      "title": { "ar": "جولة في الهواء الطلق", "en": "Outdoor Tour" },
      "location": { "ar": "الحديقة العامة", "en": "Public Park" },
      "category": { "ar": "عائلي", "en": "Family" },
      "shortDesc": { "ar": "جولة مشي او ركض في الهواء الطلق.", "en": "Walking or jogging tour in the open air." },
      "fullDesc": { "ar": "تعتبر الحديقة العامة رمز للترفيه والمناسبات السعيدة العائلية بجانب العديد من المناظر الخلابة المحيطة.", "en": "The public park is a symbol of entertainment and happy family occasions alongside many stunning surrounding views." }
    },
    {
      "id": "e5",
      "title": { "ar": "سوق المدينة", "en": "City Market" },
      "location": { "ar": "الاحياء الشرقية", "en": "Eastern Districts" },
      "category": { "ar": "عائلي", "en": "Family" },
      "shortDesc": { "ar": "اسواق متنوعة من جميع الاصناف.", "en": "Diverse markets of all kinds." },
      "fullDesc": { "ar": "تسوق عائلي ممتع.", "en": "Enjoyable family shopping." }
    }
  ]
};

// ============ Initialize Application ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Prepare events data
    prepareEventsData();
    
    // Initialize language (this will update static content)
    initLanguage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render page content
    renderPageContent();
    
    // Update translations after rendering
    setTimeout(() => {
        updateTranslatableContent();
    }, 100);
    
    // Add animations
    addScrollAnimations();
});

// ============ Prepare Events Data ============
function prepareEventsData() {
    const baseEvents = [
        {
            id: "e1",
            date: "2025-10-20T21:00:00",
            image: "assets/img/war-torn-Aleppo.jpg",
            featured: true
        },
        {
            id: "e2",
            date: "2025-10-22T22:00:00",
            image: "assets/img/beroya.webp",
            featured: true
        },
        {
            id: "e3",
            date: "2025-10-30T10:00:00",
            image: "assets/img/معرض.png",
            featured: true
        },
        {
            id: "e4",
            date: "2025-10-22T11:45:00",
            image: "assets/img/حديقةة.jpeg",
            featured: true
        },
        {
            id: "e5",
            date: "2025-10-28T20:00:00",
            image: "assets/img/سوق.webp",
            featured: true
        }
    ];

    // Merge with translation data
    eventsData = baseEvents.map((event, index) => {
        const translationData = translations.eventData?.[index] || {};
        return {
            ...event,
            title: translationData.title || { ar: 'Event', en: 'Event' },
            location: translationData.location || { ar: 'Location', en: 'Location' },
            category: translationData.category || { ar: 'Category', en: 'Category' },
            shortDesc: translationData.shortDesc || { ar: 'Description', en: 'Description' },
            fullDesc: translationData.fullDesc || { ar: 'Full description', en: 'Full description' }
        };
    });
}

// ============ Theme Management ============
function initTheme() {
    // Get saved theme or default to light
    currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.classList.add('active');
        } else {
            themeToggle.classList.remove('active');
        }
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ============ Language Management ============
function initLanguage() {
    // Get saved language or default to Arabic
    currentLang = localStorage.getItem('lang') || 'ar';
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update HTML attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        // Show the current language flag prominently:
        // active => Arabic (left flag visible), not active => English (right flag visible)
        if (lang === 'ar') {
            langToggle.classList.add('active');
        } else {
            langToggle.classList.remove('active');
        }
    }
    
    // Update all translatable content
    updateTranslatableContent();
}

function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(newLang);
    
    // Re-render page content with new language
    renderPageContent();
}

// ============ Translation Helper ============
function t(path) {
    const keys = path.split('.');
    let value = translations;
    
    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) return path;
    }
    
    // If value is an object with language keys, return the current language
    if (typeof value === 'object' && value[currentLang]) {
        return value[currentLang];
    }
    
    return value || path;
}

// ============ Update Translatable Content ============
function updateTranslatableContent() {
    // Update navbar
    const navBrand = document.querySelector('[data-i18n="navbar.brand"]');
    if (navBrand) navBrand.textContent = t('navbar.brand');
    
    const navHome = document.querySelector('[data-i18n="navbar.home"]');
    if (navHome) navHome.textContent = t('navbar.home');
    
    const navEvents = document.querySelector('[data-i18n="navbar.events"]');
    if (navEvents) navEvents.textContent = t('navbar.events');
    
    const navAbout = document.querySelector('[data-i18n="navbar.about"]');
    if (navAbout) navAbout.textContent = t('navbar.about');
    
    const navContact = document.querySelector('[data-i18n="navbar.contact"]');
    if (navContact) navContact.textContent = t('navbar.contact');
    
    const navStudents = document.querySelector('[data-i18n="navbar.students"]');
    if (navStudents) navStudents.textContent = t('navbar.students');
    
    // Update footer
    const footerCopyright = document.querySelector('[data-i18n="footer.copyright"]');
    if (footerCopyright) footerCopyright.textContent = t('footer.copyright');
    
    const footerEmail = document.querySelector('[data-i18n="footer.email"]');
    if (footerEmail) footerEmail.textContent = t('footer.email');
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });
    
    // Update students popup translations
    updateStudentsPopupTranslations();
}

// ============ Event Listeners Setup ============
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Students popup
    setupStudentsPopup();
}

// ============ Students Popup Management ============
function setupStudentsPopup() {
    const studentsToggle = document.getElementById('students-toggle');
    const floatingStudentsBtn = document.getElementById('floating-students-btn');
    const studentsPopup = document.getElementById('students-popup');
    const studentsClose = document.getElementById('students-close');
    const studentsOverlay = document.querySelector('.students-popup-overlay');
    
    if (!studentsPopup) return;
    
    // Open popup from navbar button
    if (studentsToggle) {
        studentsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openStudentsPopup();
        });
    }
    
    // Open popup from floating button
    if (floatingStudentsBtn) {
        floatingStudentsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openStudentsPopup();
        });
    }
    
    // Close popup
    if (studentsClose) {
        studentsClose.addEventListener('click', closeStudentsPopup);
    }
    
    if (studentsOverlay) {
        studentsOverlay.addEventListener('click', closeStudentsPopup);
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && studentsPopup.classList.contains('active')) {
            closeStudentsPopup();
        }
    });
}

function openStudentsPopup() {
    const studentsPopup = document.getElementById('students-popup');
    if (!studentsPopup) return;
    
    studentsPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Render students list
    renderStudentsList();
}

function closeStudentsPopup() {
    const studentsPopup = document.getElementById('students-popup');
    if (!studentsPopup) return;
    
    studentsPopup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function renderStudentsList() {
    const studentsListContainer = document.getElementById('students-list');
    if (!studentsListContainer) return;
    
    const studentsData = translations.students?.list || [];
    
    if (studentsData.length === 0) {
        studentsListContainer.innerHTML = `
            <div class="students-loading">
                <div class="students-loading-spinner"></div>
                <p>${currentLang === 'ar' ? 'لا توجد بيانات طلاب' : 'No student data available'}</p>
            </div>
        `;
        return;
    }
    
    // Generate student cards
    const studentsHTML = studentsData.map((student, index) => {
        const firstLetter = student.name[currentLang].charAt(0).toUpperCase();
        
        return `
            <div class="student-card" style="animation-delay: ${(index + 1) * 0.1}s">
                <div class="student-info">
                    <div class="student-avatar">
                        ${firstLetter}
                    </div>
                    <div class="student-details">
                        <h6 class="student-name">${student.fullName[currentLang]}</h6>
                        <div class="student-id">${student.username}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    studentsListContainer.innerHTML = studentsHTML;
}

// Update students popup title when language changes
function updateStudentsPopupTranslations() {
    const studentsTitle = document.querySelector('#students-popup [data-i18n="students.title"]');
    if (studentsTitle) {
        studentsTitle.textContent = t('students.title');
    }
    
    // Update floating button text
    const floatingBtnText = document.querySelector('.floating-students-btn [data-i18n="students.title"]');
    if (floatingBtnText) {
        floatingBtnText.textContent = t('students.title');
    }
    
    // Update floating button title attribute
    const floatingBtn = document.getElementById('floating-students-btn');
    if (floatingBtn) {
        const titleText = currentLang === 'ar' ? 'عرض قائمة الطلاب' : 'Show Students List';
        floatingBtn.setAttribute('title', titleText);
    }
    
    // Re-render students list if popup is open
    const studentsPopup = document.getElementById('students-popup');
    if (studentsPopup && studentsPopup.classList.contains('active')) {
        renderStudentsList();
    }
}

// ============ Page Content Rendering ============
function renderPageContent() {
    // Determine current page
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    // Update wishlist badge on all pages
    updateWishlistBadge();
    
    if (page.includes('index') || page === '') {
        renderHomePage();
    } else if (page.includes('wishlist')) {
        renderWishlistPage();
    } else if (page.includes('events')) {
        renderEventsPage();
    } else if (page.includes('event.html')) {
        renderEventDetailPage();
    } else if (page.includes('about')) {
        renderAboutPage();
    } else if (page.includes('contact')) {
        renderContactPage();
    }
}

// ============ Home Page Rendering ============
function renderHomePage() {
    renderFeaturedCarousel();
    renderCategoryBadges();
    renderLatestCards();
}

function renderFeaturedCarousel() {
    const carouselInner = document.getElementById('featured-carousel-inner');
    if (!carouselInner) return;
    
    const featured = eventsData.filter(e => e.featured);
    if (featured.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-item active"><img src="https://picsum.photos/800/400?random=1" class="d-block w-100" alt="placeholder"></div>';
        return;
    }
    
    carouselInner.innerHTML = featured.map((ev, idx) => `
        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
            <img src="${ev.image}" class="d-block w-100" alt="${ev.title[currentLang]}">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>${ev.title[currentLang]}</h5>
                <p>${formatDate(ev.date)} - ${ev.location[currentLang]}</p>
                <a href="event.html?id=${ev.id}" class="btn btn-sm btn-light" data-i18n="home.details">${t('home.details')}</a>
            </div>
        </div>
    `).join('');
}

function renderCategoryBadges() {
    const el = document.getElementById('category-badges');
    if (!el) return;
    
    const cats = [...new Set(eventsData.map(e => e.category[currentLang]))];
    el.innerHTML = cats.map(c => `<span class="badge bg-secondary badge-cat p-2" onclick="filterByCategory('${c}')">${c}</span>`).join(' ');
}

function renderLatestCards() {
    const container = document.getElementById('latest-cards');
    if (!container) return;
    
    const latest = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
    container.innerHTML = latest.map(ev => `
        <div class="col-md-6 col-lg-3 mb-3 animate-fade-in-up">
            <div class="card card-event h-100">
                <img src="${ev.image}" class="card-img-top event-thumbnail mx-auto mt-3" alt="${ev.title[currentLang]}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${ev.title[currentLang]}</h5>
                    <p class="card-text small text-muted">${formatDate(ev.date)} | ${ev.location[currentLang]}</p>
                    <p class="card-text">${ev.shortDesc[currentLang]}</p>
                    <div class="mt-auto">
                        <a href="event.html?id=${ev.id}" class="btn btn-primary btn-sm" data-i18n="home.details">${t('home.details')}</a>
                        <button class="btn btn-outline-secondary btn-sm" onclick="addToCalendar('${ev.id}')" data-i18n="home.addToCalendar">${t('home.addToCalendar')}</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ============ Events Page Rendering ============
function renderEventsPage() {
    const listEl = document.getElementById('events-list');
    if (!listEl) return;
    
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-select');
    const clearBtn = document.getElementById('clear-filters');
    
    // Fill category options
    const cats = [''].concat([...new Set(eventsData.map(e => e.category[currentLang]))]);
    categorySelect.innerHTML = cats.map(c => 
        c ? `<option value="${c}">${c}</option>` : `<option value="">${t('events.allCategories')}</option>`
    ).join('');
    
    // URL parameters
    const urlParams = new URLSearchParams(location.search);
    const preCat = urlParams.get('category') || localStorage.getItem('preferredCategory') || '';
    if (preCat) {
        categorySelect.value = preCat;
        localStorage.removeItem('preferredCategory');
    }
    
    function renderFiltered() {
        const q = searchInput.value.trim().toLowerCase();
        const cat = categorySelect.value;
        const sort = sortSelect.value;
        
        let filtered = eventsData.filter(e => {
            const searchText = (e.title[currentLang] + ' ' + e.shortDesc[currentLang] + ' ' + e.fullDesc[currentLang]).toLowerCase();
            const matchesQ = !q || searchText.includes(q);
            const matchesCat = !cat || e.category[currentLang] === cat;
            return matchesQ && matchesCat;
        });
        
        if (sort === 'date_asc') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        else filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        listEl.innerHTML = filtered.map(ev => `
            <div class="col-md-6 mb-3 animate-fade-in-up">
                <div class="card h-100">
                    <div class="row g-0">
                        <div class="col-5 d-flex align-items-center justify-content-center p-3">
                            <img src="${ev.image}" class="event-thumbnail events-list-img" alt="${ev.title[currentLang]}">
                        </div>
                        <div class="col-7">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${ev.title[currentLang]}</h5>
                                <p class="card-text small text-muted">${formatDate(ev.date)} - ${ev.location[currentLang]}</p>
                                <p class="card-text">${ev.shortDesc[currentLang]}</p>
                                <div class="mt-auto d-flex justify-content-between align-items-center">
                                    <div>
                                        <a href="event.html?id=${ev.id}" class="btn btn-primary btn-sm">${t('home.details')}</a>
                                        <button class="btn btn-outline-secondary btn-sm" onclick="addToCalendar('${ev.id}')">${t('home.addToCalendar')}</button>
                                    </div>
                                    <span class="badge bg-info">${ev.category[currentLang]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        if (filtered.length === 0) {
            listEl.innerHTML = `<div class="col-12"><div class="alert alert-warning">${t('events.noEvents')}</div></div>`;
        }
    }
    
    [searchInput, categorySelect, sortSelect].forEach(inp => inp.addEventListener('input', renderFiltered));
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = '';
        sortSelect.value = 'date_asc';
        renderFiltered();
    });
    
    renderFiltered();
}

// ============ Event Detail Page ============
function renderEventDetailPage() {
    const container = document.getElementById('event-detail-container');
    if (!container) return;
    
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    const ev = eventsData.find(x => x.id === id);
    
    if (!ev) {
        container.innerHTML = `<div class="alert alert-danger">${t('eventDetail.notFound')}</div>`;
        return;
    }
    
    container.innerHTML = `
        <div class="row animate-fade-in-up">
            <div class="col-md-8">
                <img src="${ev.image}" class="img-fluid mb-3 rounded" alt="${ev.title[currentLang]}">
                <h2>${ev.title[currentLang]}</h2>
                <p class="text-muted">${formatDate(ev.date)} - ${ev.location[currentLang]}</p>
                <p>${ev.fullDesc[currentLang]}</p>
                <div class="mb-3 d-flex flex-wrap gap-2">
                    <button class="btn-wishlist ${isInWishlist(ev.id) ? 'active' : ''}" onclick="toggleWishlistButton('${ev.id}')">
                        <span class="heart-icon">${isInWishlist(ev.id) ? '❤️' : '🤍'}</span>
                        <span>${isInWishlist(ev.id) ? t('wishlist.removeFromWishlist') : t('wishlist.addToWishlist')}</span>
                    </button>
                    <button class="btn btn-success" onclick="addToCalendar('${ev.id}')">${t('home.addToCalendar')}</button>
                    <button class="btn btn-outline-primary" onclick="shareEvent('${ev.id}')">${t('eventDetail.share')}</button>
                    <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#fakeBookModal">${t('eventDetail.booking')}</button>
                </div>
                <h5>${t('eventDetail.relatedEvents')}</h5>
                <div id="related-cards" class="row"></div>
            </div>
            <div class="col-md-4">
                <div class="card p-3">
                    <h5>${t('eventDetail.information')}</h5>
                    <p><strong>${t('eventDetail.category')}</strong> ${ev.category[currentLang]}</p>
                    <p><strong>${t('eventDetail.location')}</strong> ${ev.location[currentLang]}</p>
                    <p><strong>${t('eventDetail.date')}</strong> ${formatDate(ev.date)}</p>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="fakeBookModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${t('eventDetail.bookingTitle')}</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="book-form">
                            <div class="mb-2">
                                <input class="form-control" id="book-name" placeholder="${t('eventDetail.name')}" required>
                            </div>
                            <div class="mb-2">
                                <input class="form-control" id="book-email" type="email" placeholder="${t('eventDetail.email')}" required>
                            </div>
                            <button class="btn btn-primary" type="submit">${t('eventDetail.confirmBooking')}</button>
                        </form>
                        <div id="book-alert" class="mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Related events
    const related = eventsData.filter(x => x.category[currentLang] === ev.category[currentLang] && x.id !== ev.id).slice(0, 3);
    const relatedEl = document.getElementById('related-cards');
    relatedEl.innerHTML = related.map(r => `
        <div class="col-12 mb-2">
            <div class="card">
                <div class="card-body d-flex align-items-center">
                    <img src="${r.image}" class="event-thumbnail" alt="" style="width:80px;height:80px;margin-${currentLang === 'ar' ? 'left' : 'right'}:10px;">
                    <div>
                        <h6 class="mb-0">${r.title[currentLang]}</h6>
                        <small class="text-muted">${formatDate(r.date)}</small>
                    </div>
                    <div class="ms-auto"><a href="event.html?id=${r.id}" class="btn btn-sm btn-outline-primary">${t('eventDetail.view')}</a></div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Booking handler
    const bookForm = document.getElementById('book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('book-name').value;
            document.getElementById('book-alert').innerHTML = 
                `<div class="alert alert-success">${t('eventDetail.bookingSuccess')} ${name}.</div>`;
            bookForm.reset();
        });
    }
}

// ============ About Page ============
function renderAboutPage() {
    // Update team member names and roles
    updateTranslatableContent();
}

// ============ Contact Page ============
function renderContactPage() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const alertBox = document.getElementById('contact-alert');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const msg = document.getElementById('contact-message').value.trim();
        
        if (!name || !email || !msg) {
            showInlineAlert(alertBox, t('contact.errorRequired'), 'danger');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showInlineAlert(alertBox, t('contact.errorEmail'), 'danger');
            return;
        }
        
        showInlineAlert(alertBox, t('contact.successMessage'), 'success');
        form.reset();
    });
}

// ============ Utility Functions ============
function formatDate(iso) {
    const d = new Date(iso);
    const locale = currentLang === 'ar' ? 'ar-EG' : 'en-US';
    return d.toLocaleString(locale, { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function showInlineAlert(container, text, type = 'success') {
    container.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
}

// ============ Event Actions ============
window.filterByCategory = function(cat) {
    localStorage.setItem('preferredCategory', cat);
    location.href = 'events.html?category=' + encodeURIComponent(cat);
};

window.shareEvent = function(id) {
    const ev = eventsData.find(x => x.id === id);
    if (!ev) return;
    
    const url = location.origin + location.pathname.replace(/[^\/]*$/, 'event.html') + '?id=' + id;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert(currentLang === 'ar' ? 'تم نسخ رابط الفعالية' : 'Event link copied');
        });
    } else {
        prompt(currentLang === 'ar' ? 'انسخ الرابط:' : 'Copy link:', url);
    }
};

window.addToCalendar = function(id) {
    const ev = eventsData.find(x => x.id === id);
    if (!ev) return;
    
    const start = new Date(ev.date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    
    function formatICS(d) {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    
    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `UID:${ev.id}@aleppo-events`,
        `DTSTAMP:${formatICS(new Date())}`,
        `DTSTART:${formatICS(start)}`,
        `DTEND:${formatICS(end)}`,
        `SUMMARY:${ev.title[currentLang]}`,
        `DESCRIPTION:${ev.fullDesc[currentLang]}`,
        `LOCATION:${ev.location[currentLang]}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${ev.title[currentLang].replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

// ============ Scroll Animations ============
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-fade-in-up, .card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============ Wishlist Management ============
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
}

function isInWishlist(eventId) {
    const wishlist = getWishlist();
    return wishlist.includes(eventId);
}

function toggleWishlist(eventId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(eventId);
    
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        showNotification(t('wishlist.removed'));
        return false;
    } else {
        // Add to wishlist
        wishlist.push(eventId);
        saveWishlist(wishlist);
        showNotification(t('wishlist.added'));
        return true;
    }
}

function updateWishlistBadge() {
    const wishlist = getWishlist();
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
        if (wishlist.length > 0) {
            badge.textContent = wishlist.length;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        border-left: 4px solid var(--primary);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update wishlist button state
function updateWishlistButton(eventId) {
    const button = document.querySelector('.btn-wishlist');
    if (button) {
        const inWishlist = isInWishlist(eventId);
        if (inWishlist) {
            button.classList.add('active');
            button.querySelector('span').textContent = t('wishlist.removeFromWishlist');
        } else {
            button.classList.remove('active');
            button.querySelector('span').textContent = t('wishlist.addToWishlist');
        }
    }
}

// Render wishlist page
function renderWishlistPage() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;
    
    const wishlist = getWishlist();
    
    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="wishlist-empty animate-fade-in-up">
                <div class="wishlist-empty-icon">💝</div>
                <h3 data-i18n="wishlist.empty">${t('wishlist.empty')}</h3>
                <p data-i18n="wishlist.emptyMessage">${t('wishlist.emptyMessage')}</p>
                <a href="events.html" class="btn btn-primary mt-3" data-i18n="wishlist.browseEvents">${t('wishlist.browseEvents')}</a>
            </div>
        `;
        return;
    }
    
    const wishlistEvents = eventsData.filter(ev => wishlist.includes(ev.id));
    
    container.innerHTML = `
        <div class="row animate-stagger">
            ${wishlistEvents.map(ev => `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-event h-100">
                        <img src="${ev.image}" class="card-img-top event-thumbnail mx-auto mt-3" alt="${ev.title[currentLang]}">
                        <div class="card-body d-flex flex-column">
                            <span class="badge bg-secondary mb-2 align-self-start">${ev.category[currentLang]}</span>
                            <h5 class="card-title">${ev.title[currentLang]}</h5>
                            <p class="card-text small text-muted">${formatDate(ev.date)} | ${ev.location[currentLang]}</p>
                            <p class="card-text">${ev.shortDesc[currentLang]}</p>
                            <div class="mt-auto d-flex gap-2">
                                <a href="event.html?id=${ev.id}" class="btn btn-primary btn-sm flex-grow-1" data-i18n="home.details">${t('home.details')}</a>
                                <button class="btn btn-remove-wishlist btn-sm" onclick="removeFromWishlistPage('${ev.id}')" data-i18n="wishlist.remove">
                                    ${t('wishlist.remove')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Remove from wishlist on wishlist page
window.removeFromWishlistPage = function(eventId) {
    toggleWishlist(eventId);
    renderWishlistPage();
};

// Toggle wishlist from event detail page
window.toggleWishlistButton = function(eventId) {
    const isAdded = toggleWishlist(eventId);
    // Re-render event detail to update button state
    renderEventDetailPage();
};

// Add CSS animations for notifications
if (!document.getElementById('wishlist-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'wishlist-notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
