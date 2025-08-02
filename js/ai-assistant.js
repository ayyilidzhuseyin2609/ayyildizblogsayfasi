document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chatLog');
    const userInput = document.getElementById('userInput');
    const chatForm = document.getElementById('chatForm');
  
    const responses = {
      'merhaba': 'Merhaba! Ben Hüseyin Ayyıldız’ın yapay asistanıyım. Size nasıl yardımcı olabilirim?',
      'nasılsın': 'İyiyim, teşekkür ederim! Sen nasılsın?',
      'kimsin': 'Ben Hüseyin Ayyıldız’ın kişisel web sitesi için tasarlanmış yapay asistanım.',
      'ne iş yapıyorsun': 'Yazılım geliştiriciyim ve öğrenciyim. Sitenin dijital evinde sana yardımcı olmak için buradayım.',
      'motivasyon verir misin': 'Elbette! “Motivasyon başlatır, disiplin bitirir.” Unutma, her gün küçük bir adım büyük değişimdir!',
      'projelerin neler': 'Şu anda iki önemli projem var: "Eğitim Sahası" uygulaması, lise öğrencilerine yönelik sınava hazırlık notları ve testleri içeriyor. ÖSYM\'nin sınav sorularını da ekleyerek, puanlama sistemiyle öğrencilere motivasyon sağlıyor. İkinci projem ise kişisel asistan; şu anda planlama aşamasında.',
      'vatan sevgisi nedir': 'Vatan sevgisi, insanın doğduğu topraklara ve milletine olan derin bağlılığıdır. Bu benim için çok önemli.',
      'yardım eder misin': 'Tabii ki! Herhangi bir sorunuz varsa, elimden geldiğince yardımcı olmaya hazırım.',
      'teşekkür ederim': 'Rica ederim! Her zaman buradayım, çekinmeden sorabilirsin.'
    };
  
    function createMessage(text, sender) {
      const message = document.createElement('div');
      message.textContent = text;
      message.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
      return message;
    }
  
    function processInput(input) {
      const text = input.trim().toLowerCase();
  
      let reply = 'Üzgünüm, bunu anlayamadım. Başka bir şey sorabilir misin?';
  
      for (const key in responses) {
        if (text.includes(key)) {
          reply = responses[key];
          break;
        }
      }
  
      return reply;
    }
  
    function sendMessage(text) {
      if (!text.trim()) return;
  
      // Kullanıcı mesajı ekle
      chatLog.appendChild(createMessage(text, 'user'));
  
      // Scroll en sona
      chatLog.scrollTop = chatLog.scrollHeight;
  
      // Bot cevap yazıyor efekti için küçük gecikme
      setTimeout(() => {
        const botReply = processInput(text);
        chatLog.appendChild(createMessage(botReply, 'bot'));
        chatLog.scrollTop = chatLog.scrollHeight;
      }, 800);
    }
  
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = userInput.value;
      if (!input.trim()) return;
      sendMessage(input);
      userInput.value = '';
    });
  });
  