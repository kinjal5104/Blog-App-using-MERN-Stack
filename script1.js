document.addEventListener("DOMContentLoaded", function() {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesDiv = document.getElementById('messages');
  
    chatIcon.addEventListener('click', function() {
      chatContainer.style.display = 'block';
    });
  
    closeBtn.addEventListener('click', function() {
      chatContainer.style.display = 'none';
    });
  
    sendBtn.addEventListener('click', function() {
      const userMsg = userInput.value.trim();
      if (userMsg !== '') {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-msg');
        userDiv.textContent = userMsg;
        messagesDiv.appendChild(userDiv);
        userInput.value = '';
  
        // Send user message to server and get response
        fetch('/get?msg=' + userMsg)
          .then(response => response.text())
          .then(data => {
            const botDiv = document.createElement('div');
            botDiv.classList.add('bot-msg');
            botDiv.textContent = data;
            messagesDiv.appendChild(botDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
          });
      }
    });
  });
  