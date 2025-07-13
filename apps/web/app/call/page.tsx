'use client';
import { create } from "domain";
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
                    case "receveOffer": {
                        const { offer, receverId, senderId, roomId } = message.data;
                        console.log(offer)
                        peerConnectionRef.current = new RTCPeerConnection({ iceServers: ICE_SERVERS });
                        if (peerConnectionRef.current) {
                            peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                        }
                        console.log("Offer received, creating answer...");
                        createAnser(message.data.roomId, receverId, senderId);
                            console.log("Adding local stream to peer connection");
                            peerConnectionRef.current.onicecandidate = (event) => {
                                if (event.candidate) {
                                    signalingSocket.current?.send(JSON.stringify({
                                        message: {
                                            type: 'ReceverIceCandidate',
                                            //here receverId is of this user who receved this offer
                                            //senderId is the user who sent the offer
                                            data: { roomId, receverId, senderId, candidate: event.candidate }
                                        }
                                    }));
                                }
                            };
                        peerConnectionRef.current.ontrack = (event) => {
                            setTimeout(() => {
                                setUserStreams(prevStreams => ({
                                    ...prevStreams,
                                    [senderId]: event.streams[0]
                                }));
                            }, 1000)

                        };
                        break;
                    }
                    case "ReceverIceCandidate": {
                        const { candidate } = message.data;
                        if (peerConnectionRef.current) {
                            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
                        }
                        break;
                    }
                    case "SendericeCandidate": {
                        const { candidate } = message.data;
                        if (peerConnectionRef.current) {
                            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
                        }
                        break;
                    }
                    case "sendAnswer": {
                        const { answer } = message.data;
                        if (peerConnectionRef.current) {
                            peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
                        }
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

    const createAnser = async (roomId: string, receverId: string, senderId: string) => {
        console.log("Creating answer for room:", roomId);
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        signalingSocket.current?.send(JSON.stringify({
            message: {
                type: 'sendAnswer',
                data: { roomId, answer, receverId, senderId }
            }
        }));
    }


    const createOffer = async (roomId: string, memberId: string) => {
        if (
            localVideoRef.current &&
            localVideoRef.current.srcObject &&
            localVideoRef.current.srcObject instanceof MediaStream
        ) {
            peerConnectionRef.current = new RTCPeerConnection({ iceServers: ICE_SERVERS });
            const stream = localVideoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => {
                peerConnectionRef.current?.addTrack(track, stream);
            });

            peerConnectionRef.current.onicecandidate = (event) => {
                console.log("Ice generated");
                if (event.candidate) {
                    signalingSocket.current?.send(JSON.stringify({
                        message: {
                            type: 'SendericeCandidate',
                            data: { roomId, receverId: memberId, candidate: event.candidate }
                        }
                    }));
                }
            };

            peerConnectionRef.current.ontrack = (event: any) => {
                console.log("Received Track");
                setUserStreams(prevStreams => ({
                    ...prevStreams,
                    [memberId]: event.streams[0]
                }));
            };

            const offer = await peerConnectionRef.current.createOffer();
            console.log("Offer created:");
            await peerConnectionRef.current.setLocalDescription(offer);

            signalingSocket.current?.send(JSON.stringify({
                message: {
                    type: 'sendOffer',
                    data: { roomId, offer, receverId: memberId, senderId: userIdRef.current?.value }
                }
            }));
        }
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
            console.log(ref.current.srcObject)
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