import { Upload, Video } from "lucide-react";
import RecordingBlock from "./recordingBlock";

export default function Recordings({ linkedRecordings, setLinkedRecordings }: { linkedRecordings: any[], setLinkedRecordings: (recordings: any[]) => void }) {
    return (
        <div className="h-full w-full">
            {linkedRecordings.length > 0 ? <div>
                {linkedRecordings.map((recording, index) => (
                    <RecordingBlock recording={recording} index={index}/>))}
            </div> : <div className="flex flex-col items-center h-full">
                <div className="text-[16px] font-medium">No recordings yet</div>
                <div className="text-[16px] text-[#9e9e9e] mt-[24px]">All your edits will show up here.</div>
                <div className="mt-[24px] flex gap-[16px]">
                    <div className="w-[120px] h-[52px] cursor-pointer hover:bg-[#593cbc] bg-[#7848ff] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><Video className="size-[20px]" /></div>
                        <div className="text-[14px]">Record</div>
                    </div>
                    <div className="w-[120px] h-[52px] cursor-pointer hover:bg-[#383838] bg-[#2b2b2b] px-[16px] py-[10px] flex items-center justify-around rounded-[10px]">
                        <div><Upload className="size-[20px]" /></div>
                        <div className="text-[14px]">Upload</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}