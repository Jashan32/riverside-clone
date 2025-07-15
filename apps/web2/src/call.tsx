import { useEffect, useRef, useState } from "react";

export default function CallPage() {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
    const signalingSocket = useRef<WebSocket | null>(null);
    const randomRef = useRef<HTMLInputElement>(null);
    const userIdRef = useRef<HTMLInputElement>(null);
    const [userStreams, setUserStreams] = useState<Record<string, MediaStream>>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
        const setup = async () => {
            signalingSocket.current = new WebSocket('wss://192.168.1.2:3001');
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
                        startRecording(message.data.memberId);
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
                        if (
                            localVideoRef.current &&
                            localVideoRef.current.srcObject &&
                            localVideoRef.current.srcObject instanceof MediaStream
                        ) {
                            const stream = localVideoRef.current.srcObject as MediaStream;
                            stream.getTracks().forEach(track => {
                                peerConnectionRef.current?.addTrack(track, stream);
                            });
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
            const constraints = {
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                // video: true,
                audio: false
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const videoTrack = stream.getVideoTracks()[0];
            const settings = videoTrack?.getSettings();
            console.log(`Resolution: ${settings?.width}x${settings?.height}`);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        };
        setup();
    }, []);

    const createAnser = async (roomId: string, receverId: string, senderId: string) => {
        console.log("Creating answer for room:", roomId);
        const answer = await peerConnectionRef.current?.createAnswer();
        await peerConnectionRef.current?.setLocalDescription(answer);
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
        }, [stream]);
        return (
            <video
                ref={ref}
                autoPlay
                className="w-[400px] h-[400px] bg-gray-200 rounded-full"
            />
        );
    }

    async function startRecording(userId: string) {
        
        let mediaRecorder: MediaRecorder;
        let chunkCounter = 0;
        const constraints = {
            video: {
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: true
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp8, opus' // or "video/webm"
        });

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                const chunkId = `${userId}_chunk${chunkCounter++}`;
                saveChunkToIndexedDB(e.data, chunkId);
            }
        };

        mediaRecorder.start(3000); // Emits ondataavailable every 3 seconds

        function saveChunkToIndexedDB(blob: Blob, id: string) {
            const request = indexedDB.open("recordingDB", 1);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains("chunks")) {
                    db.createObjectStore("chunks", { keyPath: "id" });
                }
            };

            request.onsuccess = () => {
                const db = request.result;
                const tx = db.transaction("chunks", "readwrite");
                const store = tx.objectStore("meeting 1");
                store.put({ id, data: blob, uploaded: false });
            };
        }
    }

    async function uploadUnsentChunks(userId: string) {
        const db = await openDB();
        const tx = db.transaction("chunks", "readonly");
        const store = tx.objectStore("chunks");
        const chunks: any[] = [];

        // 1. Collect all unuploaded chunks synchronously
        await new Promise<void>((resolve, reject) => {
            const cursorReq = store.openCursor();
            cursorReq.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>).result;
                if (cursor) {
                    if (!cursor.value.uploaded) {
                        chunks.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve();
                }
            };
            cursorReq.onerror = reject;
        });

        // 2. Asynchronously upload and mark as uploaded
        for (const chunk of chunks) {
            try {
                const file = new File([chunk.data], `${chunk.id}.webm`, { type: chunk.data.type });
                const res = await fetch(`https://localhost:3000/api/upload-url?fileName=${file.name}&fileType=${file.type}`);
                const { url } = await res.json();
                const putRes = await fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                if (!putRes.ok) throw new Error("Upload failed");

                // Mark as uploaded in a new transaction
                const tx2 = db.transaction("chunks", "readwrite");
                const store2 = tx2.objectStore("chunks");
                await new Promise<void>((resolve, reject) => {
                    const req = store2.put({ ...chunk, uploaded: true });
                    req.onsuccess = () => resolve();
                    req.onerror = reject;
                });

                console.log(`✅ Uploaded and marked: ${chunk.id}`);
            } catch (err) {
                console.error(`❌ Failed to upload ${chunk.id}:`, err);
            }
        }
    }

    function openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("recordingDB", 1);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Failed to open IndexedDB");
        });
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
                <span
                    onClick={() => uploadUnsentChunks(userIdRef.current?.value || '')}
                    className="bg-orange-600 py-[20px] rounded-2xl flex flex-col items-center justify-center w-[150px] cursor-pointer">
                    upload unsent chunks
                </span>
            </div>
            <div className="mt-4 flex gap-4">
                <input ref={randomRef} className="text-black, bg-white" placeholder="RoomId"></input>
                <input ref={userIdRef} className="text-black, bg-white" placeholder="UserId"></input>
            </div>
            <div className="mt-8">
                {isClient &&
                    <video
                        ref={localVideoRef}
                        autoPlay
                        className="w-[400px] h-[400px] bg-gray-200 rounded-full"
                    />}
            </div>
            {
                Object.entries(userStreams).map(([memberId, stream]) => (
                    <RemoteVideo key={memberId} stream={stream} />
                ))
            }
        </div>
    );
}