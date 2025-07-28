import { CircleQuestionMark, Link } from "lucide-react";
import { useEffect, useRef } from "react";

export default function RecordingOptions({ setIsRecordingOptionsOpen }: { setIsRecordingOptionsOpen: (state: boolean) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsRecordingOptionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsRecordingOptionsOpen]);

    return (
        <div className="h-[100px] w-[204px] p-[8px] bg-[#2b2b2b] rounded-[12px] flex flex-col items-center border-[1px] border-[#2b2b2b]"
            ref={cardRef}>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsRecordingOptionsOpen(false); }}>
                <div><CircleQuestionMark className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Need Help</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsRecordingOptionsOpen(false); }}>
                <div><Link className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Copy recording ID</div>
                </div>
            </div>
        </div>
    )
}