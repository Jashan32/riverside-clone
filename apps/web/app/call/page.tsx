'use client';
import { useEffect, useRef, useState } from "react";

export default function CallPage() {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
    const signalingSocket = useRef<WebSocket | null>(null);

    useEffect(() => {
        signalingSocket.current = new WebSocket('wss://localhost:3001');
    }, []);
    const sendMessage = (message: any) => {
        if (signalingSocket.current)
            signalingSocket.current.send(JSON.stringify(message));
    };
    async function startCall() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            // Setup peer connection and add tracks as needed
            const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
            peerConnectionRef.current = peerConnection;
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    sendMessage({ candidate: event.candidate });
                }
            };
        } catch (error) {
            console.error("Error", error);
        }
    }

    return (
        <div className="bg-black h-[100vh] flex flex-col items-center justify-center">
            <span
                onClick={startCall}
                className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px] cursor-pointer"
            >
                Strat call
            </span>
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