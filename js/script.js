<style>
  /* Popup varsayılan gizli */
  .popup {
    display: none;
    position: fixed;
    z-index: 10000;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  /* Popup gösterildiğinde flex yap */
  .popup.show {
    display: flex;
  }
  .popup-content {
    background-color: white;
    border-radius: 15px;
    padding: 30px 40px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  /* Diğer stiller aynı kalabilir */
</style>

<div id="welcomePopup" class="popup" role="dialog" aria-modal="true" aria-labelledby="popupTitle" aria-describedby="popupDesc">
  <div class="popup-content">
    <h2 id="popupTitle">Hoş Geldin!</h2>
    <p id="popupDesc">Ben Hüseyin Ayyıldız. Bu benim kişisel sitem. Umarım hoşuna gider!</p>
    <button id="closePopup" aria-label="Popup'ı kapat">Kapat</button>
  </div>
</div>

<script>
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      const hedefID = this.getAttribute('href');
      if (hedefID.startsWith('#')) {
        e.preventDefault();
        const hedefElement = document.querySelector(hedefID);
        if (hedefElement) {
          hedefElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("welcomePopup");
    const closeBtn = document.getElementById("closePopup");

    if (!localStorage.getItem("visited") && popup) {
      popup.classList.add("show");
      localStorage.setItem("visited", "true");
    }

    if (closeBtn && popup) {
      closeBtn.addEventListener("click", function () {
        popup.classList.remove("show");
      });
    }

    const form = document.getElementById("contact-form");
    if (form) {
      emailjs.init("ke5QPYfW3DP2i5J6N");
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs
          .sendForm("service_fwkwa2t", "template_7nor3i8", this)
          .then(
            function () {
              document.getElementById("gonderim-durumu").textContent =
                "Mesaj başarıyla gönderildi. Teşekkür ederiz!";
              form.reset();
            },
            function (error) {
              document.getElementById("gonderim-durumu").textContent =
                "Bir hata oluştu. Lütfen tekrar deneyin.";
              console.error("FAILED...", error);
            }
          );
      });
    }
  });
</script>
