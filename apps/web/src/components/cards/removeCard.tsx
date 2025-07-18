import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function RemoveCard({ title, setRemoveCardState }: { title: string, setRemoveCardState: (state: boolean) => void }) {

    const removeCardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (removeCardRef.current && !removeCardRef.current.contains(event.target as Node)) {
                setRemoveCardState(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={removeCardRef} className="relative w-[460px] h-[368px] bg-[#222222] rounded-[16px] m-[32px] p-[28px] pb-[0px]">
            <button onClick={()=>setRemoveCardState(false)} className="absolute top-4 right-4 bg-[#2b2b2b] hover:bg-[#383838] w-[28px] h-[28px] p-[4px] cursor-pointer flex justify-center items-center rounded-full"> <X className="size-[16px]"/> </button>
            <div className="text-[20px] font-extrabold  pb-[10px]">Remove project?</div>
            <div>
                <span className="text-[#888888] text-[14px]">This will permanently remove the entire {title} project, it can't be restored. </span>
                <span className="text-[#b196ff] text-[14px] cursor-pointer">Learn more</span>
            </div>
            <div className="mt-[16px] pb-[16px] pt-[13px] px-[20px] h-[141px] w-[396px] bg-[#2b2b2b] rounded-[12px]">
                <span className="text-[12px]">Important</span>
                <ul className="mt-[8px] pl-[16px] list-disc white-disc-color">
                    <li className="text-[12px] text-[#bbbbbb]">You'll lose access to everything in this project, including all recordings, files and edits.</li>
                    <li className="text-[12px] text-[#bbbbbb]">Files from this project used elsewhere will be removed from all other locations as well.</li>
                </ul>
            </div>
            <div className="py-[28px] flex justify-end w-[396px]">
                <div className="flex gap-[16px]">
                    <button className="w-[85px] h-[40px] text-[14px] py-[12px] px-[18px] rounded-[8px] cursor-pointer hover:bg-[#383838] flex items-center justify-center">Cancel</button>
                    <button className="w-[85px] h-[40px] text-[14px] py-[12px] px-[18px] rounded-[8px] cursor-pointer bg-[#e04040] hover:bg-[#b93e37] flex items-center justify-center">Remove</button>
                </div>
            </div>
        </div>
    );
}