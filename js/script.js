// Dil metinleri objesi
const texts = {
  tr: {
    navHome: "Anasayfa",
    navProject: "Projeler",
    navContact: "İletişim",
    title: "Merhaba, benim web siteme hoş geldiniz!",
    intro: "Bu benim kişisel projem.",
    projectsTitle: "Projelerim",
    contactTitle: "İletişim",
    namePlaceholder: "İsminiz",
    emailPlaceholder: "E-posta adresiniz",
    messagePlaceholder: "Mesajınız",
    sendBtn: "Gönder",
    popupMessage: "Hoş geldiniz! Sitemizi ziyaret ettiğiniz için teşekkürler."
  },
  en: {
    navHome: "Home",
    navProject: "Projects",
    navContact: "Contact",
    title: "Hello, welcome to my website!",
    intro: "This is my personal project.",
    projectsTitle: "My Projects",
    contactTitle: "Contact",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Email Address",
    messagePlaceholder: "Your Message",
    sendBtn: "Send",
    popupMessage: "Welcome! Thank you for visiting our site."
  }
};

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
  // Menü ve başlıklar
  document.querySelectorAll("[data-key]").forEach(elem => {
    const key = elem.getAttribute("data-key");
    if (texts[lang][key]) {
      elem.textContent = texts[lang][key];
    }
  });

  // Diğer metinler, input placeholderları
  document.getElementById("title").textContent = texts[lang].title;
  document.getElementById("intro").textContent = texts[lang].intro;
  document.getElementById("project-list"); // boş, eklemeye uygun (isteğe bağlı)

  // Form input placeholderları
  document.getElementById("name").placeholder = texts[lang].namePlaceholder;
  document.getElementById("email").placeholder = texts[lang].emailPlaceholder;
  document.getElementById("message").placeholder = texts[lang].messagePlaceholder;
  document.querySelector("#contact-form button[type='submit']").textContent = texts[lang].sendBtn;

  // Popup mesajı
  const popupMsg = document.querySelector("#welcomePopup p");
  if (popupMsg) {
    popupMsg.textContent = texts[lang].popupMessage;
  }

  // Dil tercihini localStorage'a kaydet
  localStorage.setItem("language", lang);
}

// Sayfa yüklendiğinde kaydedilmiş dili uygula, yoksa Türkçe
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "tr";
  changeLanguage(savedLang);
});

// Dil butonları eventleri
document.addEventListener("DOMContentLoaded", () => {
  const btnTR = document.getElementById("btn-tr");
  const btnEN = document.getElementById("btn-en");
  if (btnTR) btnTR.addEventListener("click", () => changeLanguage("tr"));
  if (btnEN) btnEN.addEventListener("click", () => changeLanguage("en"));
});

// ------------------ Senin orijinal kodun aşağıda -------------------

// Smooth Scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Popup management with localStorage
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("welcomePopup");
  const closeBtn = document.getElementById("closePopup");

  // Show popup only if not visited before
  if (!localStorage.getItem("visited") && popup) {
    popup.classList.add("show");
    localStorage.setItem("visited", "true");
  }

  // Close popup on button click
  if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => {
      popup.classList.add("fadeOut");
      setTimeout(() => {
        popup.classList.remove("show", "fadeOut");
      }, 300); // Fade out animation time
    });
  }

  // Initialize EmailJS form submission
  const form = document.getElementById("contact-form");
  if (form) {
    emailjs.init("ke5QPYfW3DP2i5J6N");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      emailjs.sendForm("service_fwkwa2t", "template_7nor3i8", form)
        .then(() => {
          const statusElem = document.getElementById("gonderim-durumu");
          if (statusElem) {
            statusElem.textContent = "Mesaj başarıyla gönderildi. Teşekkür ederiz!";
            statusElem.classList.add("success");
            setTimeout(() => {
              statusElem.textContent = "";
              statusElem.classList.remove("success");
            }, 5000);
          }
          form.reset();
        }, (error) => {
          const statusElem = document.getElementById("gonderim-durumu");
          if (statusElem) {
            statusElem.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
            statusElem.classList.add("error");
            setTimeout(() => {
              statusElem.textContent = "";
              statusElem.classList.remove("error");
            }, 5000);
          }
          console.error("EmailJS Hatası:", error);
        });
    });
  }

  // Fade-in animasyonları sayfadaki tüm elementlere uygula
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => {
    el.classList.add("visible");
  });

  // Buton hover animasyonu - ekstra görsel efekt
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("btn-hover");
    });
    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("btn-hover");
    });
  });
});
