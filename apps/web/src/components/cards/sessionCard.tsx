import { Clock, Ellipsis, Users } from "lucide-react";
import GenericButton from "../buttons/genericButton";
import { useRef, useState } from "react";
import ScheduleOptionsCard from "./scheduleOptionsCard";

export default function SessionCard({ session }: { session: any }) {
    const dayName = new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' });
    const date = new Date(session.date).getDate();
    const month = new Date(session.date).toLocaleString('en-US', { month: 'short' });
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    return (
        <div className="h-[136px] p-[24px] bg-[#1d1d1d] rounded-[16px] mb-[16px] flex items-center justify-between">
            <div className="flex gap-[8px]">
                <div className="w-[82px] h-[96px] flex flex-col gap-[6px] items-start">
                    <div className="text-[12px] text-[#bbbbbb]">{dayName}</div>
                    <div className="text-[28px] font-bold leading-[28px]">{date}</div>
                    <div className="text-[28px] font-bold leading-[28px]">{month}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-[16px] leading-[24px] font-semibold mb-[8px]">{session.title}</div>
                    <div className="flex items-center gap-[8px] mb-[12px]">
                        <div><Clock className="size-[20px] text-[#888888]" /></div>
                        <div className="text-[14px] leading-[24px] font-light"> {session.timeFrom + " "}-{" " + session.timeTo} </div>
                        <div className="text-[#bbbbbb] text-[14px] font-light">(GMT {session.timeOffset})</div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <div><Users className="size-[20px] text-[#888888]" /></div>
                        {session.invited.length > 0 ? <div></div> : <div className="text-[#888888] text-[12px]">No-one invited</div>}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-[30px] mr-[30px]">
                <div>
                    <GenericButton textColor="text-[#d5c7ff]" bgColor="bg-[#b196ff33]" hoverBg="hover:bg-[#3b315f]" text="Join session" type="medium" onClickFunction={() => { }} />
                </div>
                <div className="relative">
                    <div className={`${isOptionsOpen ? "pointer-events-none" : ""} cursor-pointer w-[32px] h-[32px] p-[4px] rounded-[10px] hover:bg-[#383838] flex items-center justify-center`}
                        onClick={() => setIsOptionsOpen(!isOptionsOpen)}><Ellipsis className="size-[20px]" />
                    </div>
                    <div ref={dropdownRef} className={`absolute right-0 top-full z-1 mt-2 ${isOptionsOpen ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                        <ScheduleOptionsCard setDropDownState={setIsOptionsOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}