import { ArrowDownToLine, Copy, File, FolderPlus, Forward, Link, Pencil, Scissors, Share2, Trash, Upload } from "lucide-react";
import { useEffect, useRef } from "react";

export default function EditOptions({ setIsEditOptionsOpen }: { setIsEditOptionsOpen: (state: boolean) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsEditOptionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsEditOptionsOpen]);

    return (
        <div className="min-h-[100px] w-[204px] p-[8px] bg-[#2b2b2b] rounded-[12px] flex flex-col items-center border-[1px] border-[#2b2b2b]"
            ref={cardRef}>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><FolderPlus className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Move to project</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Link className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Copy preview link</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Scissors className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Edit</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Pencil className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Rename</div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-white/10 my-[5px]"></div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Upload className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Export</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Copy className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Dublicate</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><File className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Copy ID</div>
                </div>
            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
                onClick={() => { setIsEditOptionsOpen(false); }}>
                <div><Trash className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Remove</div>
                </div>
            </div>
        </div>
    )
}