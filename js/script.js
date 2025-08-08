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
