import { Trash, Pencil, GalleryHorizontalEnd, CalendarPlus } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ScheduleOptionsCard({ setDropDownState, setIsEditOpen }: { setDropDownState: (state: boolean) => void, setIsEditOpen: (state: boolean) => void }) {
    const dropdownref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!setDropDownState) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownref.current && !dropdownref.current.contains(event.target as Node)) {
                setDropDownState(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setDropDownState]);
    return (
        <div ref={dropdownref} className="absolute right-[10px] select-none flex flex-col gap-[4px] w-[270px] h-[188px] p-[8px] bg-[#2b2b2b] rounded-[12px]">
            <div className="flex gap-[12px] w-full h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]"
            onClick={() => {setIsEditOpen(true)}}>
                <Pencil className="size-[20px]" />
                <div className="text-[14px]">Edit session</div>
            </div>
            <div className="flex gap-[12px] w-full h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <GalleryHorizontalEnd className="size-[20px]" />
                <div className="text-[14px]">Go to project</div>
            </div>
            <div className="flex gap-[12px] w-full h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <CalendarPlus className="size-[20px]" />
                <div className="text-[14px]">Copy to Google Calendar</div>
            </div>
            <div className="flex gap-[12px] w-full h-[44px] py-[10px] px-[16px] hover:bg-[#383838] cursor-pointer rounded-[8px]">
                <Trash className="size-[20px] text-[#e0615d]" />
                <div className="text-[14px] text-[#e0615d]">Remove</div>
            </div>
        </div>
    );
}