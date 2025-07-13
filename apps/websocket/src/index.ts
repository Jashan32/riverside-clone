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
const users: Record<string, WebSocket> = {};

wss.on('connection', socket => {
    console.log('Client connected');
    socket.send(JSON.stringify({ type: 'connection', data: { status: "success" } }));
    socket.on('message', (message: any) => {
        const parsedMessage = JSON.parse(message.toString()).message;
        console.log('Received message:', parsedMessage);
        switch (parsedMessage.type) {
            case 'iniTiateRoom': {
                console.log(parsedMessage)
                const { roomId, memberId } = parsedMessage.data;
                rooms[roomId] = { memberSockets: [memberId, socket], };
                users[memberId] = socket;
                socket.send(JSON.stringify({ type: 'roomCreated', data: { roomId } }));
                break;
            }
            case 'joinRoom': {
                const { roomId, memberId } = parsedMessage.data;
                if (rooms[roomId]) {
                    rooms[roomId].memberSockets.push({ memberId: memberId, socket });
                    users[memberId] = socket;
                    const joindMembersLength = rooms[roomId].memberSockets.length;
                    if (joindMembersLength > 1) {
                        rooms[roomId].memberSockets.forEach(memberSocket => {
                            if (memberSocket.socket !== socket) {
                                console.log(memberSocket)
                                memberSocket.socket.send(JSON.stringify({
                                    type: 'newMemberJoined',
                                    data: { roomId, memberCount: rooms[roomId].memberSockets.length, memberId }
                                }));
                            }
                        });
                    }
                } else {

                }
                break;
            }
            case 'sendOffer': {
                const { roomId, offer, receverId, senderId } = parsedMessage.data;
                if (rooms[roomId]) {
                    users[receverId].send(JSON.stringify({
                        type: 'receveOffer',
                        data: { offer, receverId, senderId, roomId }
                    }));
                }
                break;
            }
        }
    });
});

server.listen(3001, () => {
    console.log('WebSocket server running on wss://localhost:3001');
});
