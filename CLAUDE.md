# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a simple real-time chatroom application built with Node.js, Express, and Socket.io. The application allows users to exchange messages in real-time with notifications when users join or leave the chat.

## Development Commands

Here are the common commands used for development:

```bash
# Install dependencies
npm install

# Start the server (production mode)
npm start

# Start the server with auto-restart on file changes (development mode)
npm run dev
```

## Architecture

The application follows a client-server architecture:

### Server-Side (`src/`)
- Built with Node.js and Express
- Uses Socket.io for real-time bidirectional communication
- Handles events for user connections, disconnections, and messages
- Broadcasts messages to all connected clients
- Sends notifications when users join or leave

### Client-Side (`public/`)
- HTML/CSS for the user interface
- JavaScript for client-side functionality
- Connects to the server using Socket.io
- Displays real-time messages and notifications
- Assigns random usernames to users

### Key Components

1. **Express Server**: Handles HTTP requests and serves static files
2. **Socket.io**: Manages WebSocket connections for real-time communication
3. **Chat Interface**: Simple responsive UI for message display and input

### Data Flow

1. Client connects to server via WebSocket
2. Server sends welcome message to new user
3. Server notifies other users of new connection
4. User sends message via form submission
5. Server receives message and broadcasts to all connected clients
6. Clients display received messages
7. On disconnect, server notifies remaining users

## Project Structure

```
chatroom/
├── public/             # Static client-side files
│   ├── css/
│   │   └── styles.css  # Styling for chat interface
│   ├── js/
│   │   └── main.js     # Client-side JavaScript
│   └── index.html      # Main HTML page
├── src/
│   └── server.js       # Express and Socket.io server
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```