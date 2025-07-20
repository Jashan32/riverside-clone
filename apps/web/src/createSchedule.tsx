import { Calendar, ChevronDown, Clock, Podcast, Text, UserRoundPen, UserRoundPlus } from "lucide-react";
import ToggleSwitch from "./components/buttons/toggleSwitch";
import { useState } from "react";

function getRoundedTime(offset = 0) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Round to nearest half hour
    if (minutes <= 30) {
        minutes = 30;
    } else {
        minutes = 0;
        hours += 1;
    }

    // Apply offset in hours
    hours += offset;

    // Normalize to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 === 0) ? 12 : (hours % 12);
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
}

export default function CreateSchedule() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="p-[60px] pb-[0px] h-full">
            <div className="flex flex-col items-center justify-center h-full">
                <input className="w-full max-w-[536px] h-[52px] px-[12px] py-[8px] outline-none text-[28px] font-extrabold placeholder-[#4e4e4e] border-b-[1px] border-[#383838]" placeholder="Session name*" />
                <div className="pt-[40px] w-full max-w-[536px] ">
                    <div className="flex flex-col gap-[8px]">
                        {/* Date and time picker */}
                        <div className="flex gap-[8px]">
                            <div className="w-[28px] h-[48px] flex items-center justify-center flex-shrink-0">
                                <Clock className="size-[20px]" />
                            </div>
                            <div className="flex justify-between items-center flex-1 gap-[8px]">
                                <div className="flex-1 h-[48px] flex items-center py-[14px] px-[12px] bg-[#222222] rounded-[8px] flex-shrink-0">
                                    <Calendar className="size-[20px]" />
                                    <div className="ml-[8px] text-[14px]">{formattedDate}</div>
                                </div>
                                <div className="flex items-center gap-[8px]">
                                    <div className="h-[48px] w-[99px] bg-[#222222] rounded-[8px] flex items-center justify-center text-[14px]">
                                        {getRoundedTime(0)}
                                    </div>
                                    <div className="flex items-center">-</div>
                                    <div className="h-[48px] w-[99px] bg-[#222222] rounded-[8px] flex items-center justify-center text-[14px]">
                                        {getRoundedTime(1)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Timezone selector */}
                        <div className="flex gap-[8px]">
                            <div className="w-[28px] flex-shrink-0"></div>
                            <div className="flex-1 bg-[#222222] rounded-[8px] h-[48px] py-[14px] px-[12px] flex items-center justify-between cursor-pointer">
                                <div className="text-[14px] truncate pr-[8px]">(GMT+05:30) India Standard Time - Calcutta</div>
                                <div className="flex-shrink-0"><ChevronDown className="size-[20px]" /></div>
                            </div>
                        </div>
                    </div>
                    {/* Invite section */}
                    <div className="flex gap-[8px] mt-[18px]">
                        <div className="w-[28px] h-[44px] flex items-center justify-center flex-shrink-0">
                            <UserRoundPlus className="size-[20px] text-[#717171]" />
                        </div>
                        <div className="flex-1 h-[44px] bg-[#222222] rounded-[8px] flex items-center justify-between">
                            <input className="flex-1 bg-transparent outline-none placeholder-[#717171] text-[14px] pl-[12px] min-w-0" placeholder="Invite people via email" />
                            <div className="flex items-center gap-[15px] pr-[12px] cursor-pointer flex-shrink-0">
                                <div className="text-[14px]">Guest</div>
                                <ChevronDown className="size-[20px]" />
                            </div>
                        </div>
                    </div>
                    {/* Description section */}
                    <div className="flex gap-[8px] mt-[15px]">
                        <div className="w-[28px] pt-[10px] flex justify-center flex-shrink-0">
                            <Text className="size-[20px] text-[#717171]" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[#BBBBBB] text-[12px] font-semibold">Description</div>
                            <textarea className="mt-[10px] w-full h-[80px] bg-[#222222] rounded-[8px] px-[12px] py-[8px] text-[14px] placeholder-[#717171] focus:outline focus:outline-[#917fcd] resize-none" placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col gap-[15px] mt-[100px]">
                        <div className="text-[14px] text-[#888888] font-semibold">Advanced</div>
                        <div className="h-[52px] flex gap-[12px]">
                            <div className="h-full flex items-center"><UserRoundPen className="size-[20px] text-[#717171]" /></div>
                            <div className="bg-[#222222] h-full w-full rounded-[8px] py-[14px] px-[16px] flex justify-between">
                                <div className="text-[14px] text-[#808080]">Audience registration</div>
                                <div onClick={() => setEnabled(!enabled)} className="flex items-center">
                                    <ToggleSwitch enabled={enabled} onChange={()=>{}}/>
                                </div>
                            </div>
                        </div>
                        <div className="h-[52px] flex gap-[12px]">
                            <div className="h-full flex items-center"><Podcast className="size-[20px] text-[#717171]" /></div>
                            <div className="bg-[#222222] h-full w-full rounded-[8px] py-[14px] px-[16px] flex justify-between">
                                <div className="text-[14px] text-[#808080]">Live stream destinations</div>
                                <div onClick={() => setEnabled(!enabled)} className="flex items-center">
                                    <ToggleSwitch enabled={enabled} onChange={()=>{}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}