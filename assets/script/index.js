let languagePicker = document.querySelector(".language-picker");
let language = localStorage.getItem("language") || "ar";
let aboutUsBtn = document.querySelector(".about-us-btn");
let settingsBtn = document.querySelector(".settings-btn");



const translation = {
    "en": {
        "title": "M-Quiz Game",
        "get-started-btn": "Get Started",
        "settings-btn": "Settings",
        "about-us-btn": "About Us",
        "": "",
        "": "",
        "info-title": "M-Quiz",
        "info-description": "A quiz web application focused on Material Engineering questions, designed to test and enhance your knowledge with a simple and engaging interface.",
        "info-close-btn": "Tap To Close",
        "author-description": "This app was made by: ",
        "author-name": "Ali Mahdi",
        "": "",
        "": "",
        "text--version": "version",
        "text--difficulty": "Difficulty",
        "text--hard": "Hard",
        "text--easy": "Easy",
        "text--correct-answer-preview": "Correct Answer",
        "text--hide": "Hide",
        "text--show": "Show",
    },
    
    "ar": {
        "title": "لعبة الإختبار-ميم",
        "get-started-btn": "البدأ ",
        "settings-btn": "الإعدادات",
        "about-us-btn": "من نحن",
        "": "",
        "": "",
        "info-title": "الإختبار-ميم",
        "info-description": "تطبيق ويب يقدم إختبارات في هندسة المواد، صُمم لإختبار معرفتك وتعزيزها من خلال واجهة بسيطة وجذابة.",
        "info-close-btn": "أنقر للإغلاق",
        "author-description": "تم إنشاء هذا التطبيق بواسطة: ",
        "author-name": "علي مهدي",
        "": "",
        "": "",
        "text--version": "الإصدار",
        "text--difficulty": "الصعوبة",
        "text--hard": "صعب",
        "text--easy": "سهل",
        "text--correct-answer-preview": "الإجابة الصحيحة",
        "text--hide": "إخفاء",
        "text--show": "إظهار",
    }
}



function initializeTranslation() {
    if (languagePicker) { languagePicker.textContent = language.toUpperCase(); }
    // Change File Direction Automatically (rtl || ltr).
    let direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.style.direction = direction;
    updateHomeUI();
}
document.addEventListener("DOMContentLoaded", initializeTranslation);



function switchLanguage() {
    language = (language === "ar") ? "en" : "ar";
    localStorage.setItem("language", language);
    initializeTranslation();
}
languagePicker?.addEventListener("click", switchLanguage);




function updateHomeUI() {
    document.querySelector("title").textContent = translation[language]["title"]; // Window Title.
    document.querySelector(".title").textContent = translation[language]["title"];
    document.querySelector(".get-started-btn").textContent = translation[language]["get-started-btn"];
    document.querySelector(".settings-btn").textContent = translation[language]["settings-btn"];
    document.querySelector(".about-us-btn").textContent = translation[language]["about-us-btn"];
}
// updateUI();



function showAppSettings() {
    const appVersion = "[0.7.1]";
    // Add Sweet Alert Notification
    Swal.fire({
        title: `<span class="settings-title"> ${translation[language]["settings-btn"]} </span>`,
        html: `
            <div class="settings-container">
                <span class="settings">
                    <span class="difficulty" hidden="true">
                        ${translation[language]["text--difficulty"]}: 
                        <span id="easy" class="difficulty-select easy">${translation[language]["text--easy"]} </span>
                        <span id="hard" class="difficulty-select hard">${translation[language]["text--hard"]} </span>
                    </span>
                    <br>
                    <br>
                    <span class="correct-answer-preview">
                        ${translation[language]["text--correct-answer-preview"]}: 
                        <span id="hide" class="correct-answer-preview-select hide">${translation[language]["text--hide"]} </span>
                        <span id="show" class="correct-answer-preview-select show">${translation[language]["text--show"]} </span>
                    </span>
                </span>
            </div>
            <span class="version"> ${translation[language]["text--version"]}: ${appVersion} </span>
        `,
        imageUrl: "./assets/icons/settings.png",
        imageWidth: 90,
        imageHeight: 90,
        imageAlt: "Settings Icon",
        showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
        `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
        },
        confirmButtonText: `<span class="info-close-btn"> ${translation[language]["info-close-btn"]} </span>`,
    });
    
    
    
    // Select Difficulty (Easy, Hard)
    if (localStorage.getItem("difficulty") === "hard") {
        document.querySelector(".hard").style.opacity = "1";
    }else {
        document.querySelector(".easy").style.opacity = "1";
    }
    document.querySelectorAll(".difficulty-select").forEach((e)=>{
        e.addEventListener("click",()=>{
            document.querySelectorAll(".difficulty-select").forEach((e)=>{ e.style.opacity = "0.7"; });
            e.style.opacity = "1";
            localStorage.setItem("difficulty", e.id);
        });
    });
    // --------------------
    // Preview Correct Answer (Hide, Show)
    if (localStorage.getItem("preview-correct-answer") === "show") {
        document.querySelector(".show").style.opacity = "1";
    }else {
        document.querySelector(".hide").style.opacity = "1";
    }
    document.querySelectorAll(".correct-answer-preview-select").forEach((e)=>{
        e.addEventListener("click",()=>{
            document.querySelectorAll(".correct-answer-preview-select").forEach((e)=>{ e.style.opacity = "0.7"; });
            e.style.opacity = "1";
            localStorage.setItem("preview-correct-answer", e.id);
        });
    });
    // --------------------
    
}
settingsBtn?.addEventListener("click", showAppSettings);



function showAppInfo() {
    const authorHyperLink = "https://www.linkedin.com/in/ali-mahdi-88190730b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
    // Add Sweet Alert Notification
    Swal.fire({
        title: `<span class="info-title"> ${translation[language]["info-title"]} </span>`,
        html: `
            <div class="info-container">
                <span class="info-description"> ${translation[language]["info-description"]} </span>
            </div>
            <span class="author">
                <span class="author-description"> ${translation[language]["author-description"]} </span>
                <span class="author-name"> ${translation[language]["author-name"]} </span>
                <a class="author-hyper-link" href="${authorHyperLink}" hidden></a>
            </span>
        `,
        imageUrl: "./assets/icons/icon.png",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "App Icon",
        showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
        `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
        },
        confirmButtonText: `<span class="info-close-btn"> ${translation[language]["info-close-btn"]} </span>`,
    });
}
aboutUsBtn?.addEventListener("click", showAppInfo);





