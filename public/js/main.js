document.addEventListener('DOMContentLoaded', () => {
  // Connect to Socket.io
  const socket = io();
  
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('msg');
  
  // Generate a random username for this session
  const username = 'User_' + Math.floor(Math.random() * 1000);
  
  // Message storage
  const messages = [];
  
  // Add message to DOM
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    
    // Add class based on if it's the current user's message
    if (message.username === username) {
      div.classList.add('self-message');
    } else {
      div.classList.add('other-message');
    }
    
    div.innerHTML = `
      <p class="meta">${message.username} <span>${message.time}</span></p>
      <p class="text">${message.text}</p>
    `;
    chatMessages.appendChild(div);
    
    // Scroll down to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Format the time
  function formatTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
  
  // Listen for messages from server
  socket.on('message', (message) => {
    outputMessage(message);
  });
  
  // Message submit event
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get message text
    const msg = messageInput.value.trim();
    
    if (!msg) return;
    
    // Create message object
    const message = {
      username,
      text: msg,
      time: formatTime()
    };
    
    // Send message to server
    socket.emit('chatMessage', message);
    
    // Clear input
    messageInput.value = '';
    messageInput.focus();
  });
});