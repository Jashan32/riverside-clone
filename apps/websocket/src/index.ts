import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const server = https.createServer({
  cert: fs.readFileSync('./certs/cert.pem'),
  key: fs.readFileSync('./certs/key.pem')
});

const wss = new WebSocketServer({ server });

wss.on('connection', socket => {
  console.log('Client connected');
  socket.send('Hello Secure Client!');
});

server.listen(3001, () => {
  console.log('WebSocket server running on wss://localhost:3001');
});
