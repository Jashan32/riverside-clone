'use client';
import { useEffect, useRef, useState } from "react";

export default function CallPage() {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
    const signalingSocket = useRef<WebSocket | null>(null);
    const randomRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const setup = async () => {
            signalingSocket.current = new WebSocket('wss://localhost:3001');
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        };
        setup();
    }, []);
    const sendMessage = (data: any) => {
        if (signalingSocket.current)
            signalingSocket.current.send(JSON.stringify(data));
    };
    async function startCall() {
        try {

            // Setup peer connection and add tracks as needed
            const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
            peerConnectionRef.current = peerConnection;
            if (localVideoRef.current && localVideoRef.current.srcObject) {
                const stream = localVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track: any) => {
                    peerConnection.addTrack(track, localVideoRef.current!.srcObject as MediaStream);
                });
            }
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log(event)
                    sendMessage({ data: { type: "ice-Candidates", candidate: event.candidate } });
                }
            };
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            const random = Math.floor(100000 + Math.random() * 900000);
            randomRef.current!.innerText = random.toString();
            sendMessage({
                data: {
                    type: 'offer',
                    content: { offer: offer, roomId: random }
                }
            });
        } catch (error) {
            console.error("Error", error);
        }
    }
    async function startCall2() {
        const roomId = randomRef.current?.value;
        if (!roomId) {
            console.error("Room ID is required");
            return;
        }
        sendMessage({
            data: {
                type: 'iniTiateRoom',
                content: { roomId: roomId }
            }
        })

    }

    async function joinCall() {
        const roomId = randomRef.current?.value;
        if (!roomId) {
            console.error("Room ID is required");
            return;
        }
        sendMessage({
            data: {
                type: 'joinRoom',
                content: { roomId: roomId }
            }
        })

    }

    return (
        <div className="bg-black h-[100vh] flex flex-col items-center justify-center">
            <span
                onClick={startCall2}
                className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px] cursor-pointer"
            >
                Strat call
            </span>
            <input ref={randomRef} className="text-black, bg-white"></input>
            <div className="mt-8">
                <video
                    ref={localVideoRef}
                    autoPlay
                    className="w-[400px] h-[400px] bg-gray-200 rounded-full"
                />
            </div>
        </div>
    );
}