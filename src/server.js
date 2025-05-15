const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

// Run when client connects
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Welcome current user
  socket.emit('message', {
    username: 'ChatBot',
    text: 'Welcome to the Chatroom!',
    time: formatTime()
  });
  
  // Broadcast when a user connects
  socket.broadcast.emit('message', {
    username: 'ChatBot',
    text: 'A user has joined the chat',
    time: formatTime()
  });
  
  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });
  
  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', {
      username: 'ChatBot',
      text: 'A user has left the chat',
      time: formatTime()
    });
  });
});

// Format the time
function formatTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
}

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));