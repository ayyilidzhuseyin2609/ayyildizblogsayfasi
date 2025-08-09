document.addEventListener('DOMContentLoaded', () => {
  const chatLog = document.getElementById('chatLog');
  const userInput = document.getElementById('userInput');
  const chatForm = document.getElementById('chatForm');

  // Buraya kendi OpenAI API anahtarını koy
  const API_KEY = "YOUR_Osk-proj-bdQEJgt9ykdUumDLQ9N5Q5_7Cxa0kdSjVckWORTPVDz4DXL5uHdn6uOM2CXwlIStLQxikR9rE4T3BlbkFJuEilpu-vk5moLl-PZI8UnEL7Fa8H9Gp-ff-895Gz9pHvkoUjBrkgV0fb-y7NwhQKtYdCMa0rcA";
  const API_URL = "https://api.openai.com/v1/chat/completions";

  // Mesaj oluşturma fonksiyonu
  function createMessage(text, sender) {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    return message;
  }

  // OpenAI API çağrısı yapan async fonksiyon
  async function getAIResponse(userText) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Sen Hüseyin Ayyıldız’ın web sitesinde çalışan yardımcı bir asistansın." },
            { role: "user", content: userText }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("OpenAI API Hatası:", error);
      return "Üzgünüm, bir hata oluştu. Daha sonra tekrar deneyin.";
    }
  }

  // Mesaj gönderme fonksiyonu
  async function sendMessage(text) {
    if (!text.trim()) return;

    // Kullanıcı mesajını göster
    chatLog.appendChild(createMessage(text, 'user'));
    chatLog.scrollTop = chatLog.scrollHeight;

    // Bot "yazıyor..." efekti göster
    const typingMessage = createMessage("Yazıyor...", 'bot');
    chatLog.appendChild(typingMessage);
    chatLog.scrollTop = chatLog.scrollHeight;

    // API'den yanıt al
    const botReply = await getAIResponse(text);

    // Yazıyor mesajını kaldır ve gerçek cevabı ekle
    chatLog.removeChild(typingMessage);
    chatLog.appendChild(createMessage(botReply, 'bot'));
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Form gönderme olayını dinle
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = userInput.value;
    if (!input.trim()) return;
    sendMessage(input);
    userInput.value = '';
  });
});
