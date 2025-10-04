import { Clock, Ellipsis, Users } from "lucide-react";
import GenericButton from "../buttons/genericButton";
import { useRef, useState } from "react";
import ScheduleOptionsCard from "./scheduleOptionsCard";
import EditCard from "./editCard";

export default function SessionCard({ session }: { session: any }) {
    console.log(" Session", session)
    const dayName = new Date(session.scheduled).toLocaleDateString('en-US', { weekday: 'long' });
    const date = new Date(session.scheduled).getDate();
    const month = new Date(session.scheduled).toLocaleString('en-US', { month: 'short' });
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    return (
        <div className="h-[136px] p-[24px] bg-[#1d1d1d] rounded-[16px] mb-[16px] flex items-center justify-between">
            <div className="flex gap-[8px]">
                <div className="w-[82px] h-[96px] flex flex-col gap-[6px] items-start">
                    <div className="text-[12px] text-[#bbbbbb]">{dayName}</div>
                    <div className="text-[28px] font-bold leading-[28px]">{date}</div>
                    <div className="text-[28px] font-bold leading-[28px]">{month}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-[16px] leading-[24px] font-semibold mb-[8px]">{session.sessionName}</div>
                    <div className="flex items-center gap-[8px] mb-[12px]">
                        <div><Clock className="size-[20px] text-[#888888]" /></div>
                        <div className="text-[14px] leading-[24px] font-light"> {session.timeFrom + " "}-{" " + session.timeTo} </div>
                        <div className="text-[#bbbbbb] text-[14px] font-light">(GMT {session.timeOffset})</div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <div><Users className="size-[20px] text-[#888888]" /></div>
                        {session?.invited?.length > 0 ? <div></div> : <div className="text-[#888888] text-[12px]">No-one invited</div>}
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
                        <ScheduleOptionsCard setDropDownState={setIsOptionsOpen} setIsEditOpen={setIsEditOpen} />
                    </div>
                    <div className={`fixed top-0 left-0 w-screen h-screen z-50 transition-opacity duration-300 ${isEditOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="flex flex-col items-end justify-start h-screen bg-black/70 p-[10px]">
                            <div className={`h-screen transform transition-transform duration-500 ease-in-out ${isEditOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                                <EditCard session={session} setIsEditOpen={setIsEditOpen}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}