import { Check, Clock, ClockFading } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SessionSort({ setIsSessionSortOpen, setIsUpcomingSortOpen, isUpcomingSortOpen }: { setIsSessionSortOpen: (state: boolean) => void, setIsUpcomingSortOpen: (state: boolean) => void, isUpcomingSortOpen: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsSessionSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsSessionSortOpen]);

    return (
        <div className="h-[108px] w-[221px] p-[10px] bg-[#1d1d1d] rounded-[12px] flex flex-col items-center border-[1px] border-[#2b2b2b]"
            ref={cardRef}>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex gap-[12px] items-center cursor-pointer hover:bg-[#383838] rounded-[10px]"
            onClick={() => {setIsUpcomingSortOpen(true); setIsSessionSortOpen(false);}}>
                <div><Clock className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Upcoming</div>
                    <div className={`${isUpcomingSortOpen? "":"hidden"}`}><Check className="size-[20px]" /></div>
                </div>

            </div>
            <div className="h-[44px] w-full py-[10px] px-[16px] flex items-center gap-[12px] cursor-pointer hover:bg-[#383838] rounded-[10px]"
            onClick={() => {setIsUpcomingSortOpen(false); setIsSessionSortOpen(false);}}>
                <div><ClockFading className="size-[20px] mr-[16px]" /></div>
                <div className="w-full flex justify-between">
                    <div className="text-[14px] ">Past</div>
                    <div className={`${isUpcomingSortOpen? "hidden":""}`} ><Check className="size-[20px]" /></div>
                </div>

            </div>
        </div>
    )
}