const WebSocket = require('ws');

const socketServer = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

socketServer.on('connection', (webSocket) => {
  console.log('Client connected');
  clients.add(webSocket);

  webSocket.on('message', (message) => {
    // Handle incoming message
    console.log('Received: %s', message);
    
    // Broadcast the message to all other clients
    clients.forEach(client => {
      if (client !== webSocket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  webSocket.on('close', function() {
    // Handle connection close
    console.log('Client disconnected');
    clients.delete(webSocket);
  });
});