'use client'
import { useRef, useState } from "react";
import { start } from "repl";

export default function CallPage() {
    const [streams, setStreams] = useState<any[]>([]);
    const streamContainer = useRef<HTMLDivElement>(null);
    function addStream(newStream: MediaStream) {
        setStreams(prevStreams => [...prevStreams, newStream]);
    }
    async function startCall() {
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            addStream(localStream);
            if (streamContainer.current) {
            }
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    }

    return (
        <div className="bg-black h-[100vh]">
            <span 
            onClick={startCall}
             className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px]">Strat call</span>
            <div ref={streamContainer}>
                {streams.map((stream, index) => (
                    <video
                        key={index}
                        className="w-[400px] h-[400px] bg-gray-200 rounded-full"
                        autoPlay
                        ref={el => {
                            if (el && stream) el.srcObject = stream;
                        }}
                    />

                ))}
            </div>
        </div>
    );
}