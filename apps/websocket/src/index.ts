import https from 'https';
import fs from 'fs';
import WebSocket, { WebSocketServer } from 'ws';

const server = https.createServer({
    cert: fs.readFileSync('./certs/cert.pem'),
    key: fs.readFileSync('./certs/key.pem')
});

const wss = new WebSocketServer({ server });
type RoomData = {
    memberSockets: { memberId: String, socket: WebSocket }[];
};
const rooms: Record<string, RoomData> = {};

wss.on('connection', socket => {
    console.log('Client connected');
    socket.send('Hello Secure Client!');
    socket.on('message', (message: any) => {
        switch (message.data.type) {
            case 'iniTiateRoom': {
                const { roomId, memberId } = message.data.content;
                rooms[roomId] = { memberSockets: [memberId, socket], };
                socket.send(JSON.stringify({ type: 'roomCreated', roomId }));
                break;
            }
            case 'joinRoom': {
                const { roomId } = message.data.content;
                if (rooms[roomId]) {
                    const joindMembersLength = rooms[roomId].memberSockets.length;
                    rooms[roomId].memberSockets.push({ memberId: message.data.content.memberId, socket });
                    if (joindMembersLength > 0) {
                        rooms[roomId].memberSockets.forEach(memberSocket => {
                            if (memberSocket.socket !== socket) {
                                memberSocket.socket.send(JSON.stringify({
                                    type: 'newMemberJoined',
                                    content: { roomId, memberCount: rooms[roomId].memberSockets.length }
                                }));
                            }
                        });
                    }
                } else {

                }
                break;
            }
        }
    });
});

server.listen(3001, () => {
    console.log('WebSocket server running on wss://localhost:3001');
});
