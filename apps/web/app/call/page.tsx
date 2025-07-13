'use client';
import { useEffect, useRef, useState } from "react";

export default function CallPage() {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
    const signalingSocket = useRef<WebSocket | null>(null);
    const randomRef = useRef<HTMLInputElement>(null);
    const userIdRef = useRef<HTMLInputElement>(null);
    const [userStreams, setUserStreams] = useState<Record<string, MediaStream>>({});

    useEffect(() => {
        const setup = async () => {
            signalingSocket.current = new WebSocket('wss://localhost:3001');
            signalingSocket.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("Received message:", message);
                switch (message.type) {
                    case "connection":
                        console.log("Connected to websocket server:", message.data.status);
                        break;
                    case "roomCreated": {
                        console.log("Room created with ID:", message.data.roomId);
                        break;
                    }
                    case "newMemberJoined": {
                        console.log("New member joined:", message.data);
                        createOffer(message.data.roomId, message.data.memberId);
                        break;
                    }
                    case "ReceveOffer": {
                        const { offer, receverId, senderId, roomId } = message.data;
                        if (peerConnectionRef.current) {
                            peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                        }
                        peerConnectionRef.current = new RTCPeerConnection({ iceServers: ICE_SERVERS });
                        peerConnectionRef.current.onicecandidate = (event) => {
                            if (event.candidate) {
                                signalingSocket.current?.send(JSON.stringify({
                                    message: {
                                        type: 'iceCandidate',
                                        data: { roomId, memberId: receverId, candidate: event.candidate }
                                    }
                                }));
                            }
                        };
                        peerConnectionRef.current.ontrack = (event) => {
                            setUserStreams(prevStreams => ({
                                ...prevStreams,
                                [senderId]: event.streams[0]
                            }));
                        };
                        break;
                    }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        };
        setup();
    }, []);

    const createOffer = async (roomId: string, memberId: string) => {
        if (!localStream) return;

        peerConnectionRef.current = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        localStream.getTracks().forEach(track => {
            peerConnectionRef.current?.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                signalingSocket.current?.send(JSON.stringify({
                    message: {
                        type: 'iceCandidate',
                        //memberId is of recever
                        data: { roomId, memberId, candidate: event.candidate }
                    }
                }));
            }
        };

        peerConnectionRef.current.ontrack = (event: any) => {
            setUserStreams(prevStreams => ({
                ...prevStreams,
                [memberId]: event.streams[0]
            }));
        };

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        signalingSocket.current?.send(JSON.stringify({
            message: {
                type: 'sendOffer',
                //memberId is of recever
                data: { roomId, offer, receverId: memberId, senderId: userIdRef.current?.value}
            }
        }));
    };

    const sendMessage = (data: any) => {
        if (signalingSocket.current)
            signalingSocket.current.send(JSON.stringify({ message: data }));
    };

    async function startCall() {
        const roomId = randomRef.current?.value;
        if (!roomId) {
            console.error("Room ID is required");
            return;
        }
        sendMessage({
            type: 'iniTiateRoom',
            data: { roomId: roomId, memberId: userIdRef.current?.value }
        })

    }

    async function joinCall() {
        const roomId = randomRef.current?.value;
        if (!roomId) {
            console.error("Room ID is required");
            return;
        }
        sendMessage({
            type: 'joinRoom',
            data: { roomId: roomId, memberId: userIdRef.current?.value }
        })

    }

    function RemoteVideo({ stream }: { stream: MediaStream }) {
        const ref = useRef<HTMLVideoElement>(null);
        useEffect(() => {
            if (ref.current) ref.current.srcObject = stream;
        }, [stream]);
        return (
            <video
                ref={ref}
                autoPlay
                className="w-[400px] h-[400px] bg-gray-200 rounded-full"
            />
        );
    }

    return (
        <div className="bg-black h-[100vh] flex flex-col items-center justify-center">
            <div className="flex gap-4">
                <span
                    onClick={startCall}
                    className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px] cursor-pointer">
                    Strat call
                </span>
                <span
                    onClick={joinCall}
                    className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px] cursor-pointer">
                    Join Call
                </span>
            </div>
            <div className="mt-4 flex gap-4">
                <input ref={randomRef} className="text-black, bg-white" placeholder="RoomId"></input>
                <input ref={userIdRef} className="text-black, bg-white" placeholder="UserId"></input>
            </div>
            <div className="mt-8">
                <video
                    ref={localVideoRef}
                    autoPlay
                    className="w-[400px] h-[400px] bg-gray-200 rounded-full"
                />
            </div>
            {
                Object.entries(userStreams).map(([memberId, stream]) => (
                    <RemoteVideo key={memberId} stream={stream} />
                ))
            }
        </div>
    );
}