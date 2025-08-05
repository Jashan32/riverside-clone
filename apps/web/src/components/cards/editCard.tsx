import { useEffect, useRef, useState } from "react";
import TimePickerCard from "./timePickerCard";
import CalendarCard from "./calendar";
import { Calendar, ChevronDown, Clock, Podcast, Text, UserPlus, Users, X } from "lucide-react";
import TimezoneCard from "./timezoneCard";
import ToggleSwitch from "../buttons/toggleSwitch";
import youtubeSvg from "../../assets/youtube.svg";
import facebookSvg from "../../assets/facebook.svg";
import linkdenSvg from "../../assets/linkden.svg";
import twitchSvg from "../../assets/twitch.svg";
import xSvg from "../../assets/x.svg";


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

    return `${displayHours <= 9 ? "0" + displayHours : displayHours}:${displayMinutes} ${period}`;
}
function formatDateToDDMMYYYY(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

export default function EditCard({ session, setIsEditOpen }: { session: any, setIsEditOpen: (state: boolean) => void }) {
    interface TimeZone {
        label: string;
        offset: string;
        value: string;
        currentTime: string;
    }
    const today = new Date();
    // const formattedDate = today.toLocaleDateString("en-GB");
    const [audienceEnabled, setAudienceEnabled] = useState(false);
    const [liveStreamEnabled, setLiveStreamEnabled] = useState(false);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [filledTitle, setFilledTitle] = useState(session.title.length > 0);
    const [isTimezoneCardOpen, setIsTimezoneCardOpen] = useState(false);
    const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZone>({ label: "", offset: "", value: "", currentTime: "" });
    const displayTimeZoneRef = useRef<HTMLDivElement>(null);
    const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
    const [ifFromTimePickerOpen, setIfFromTimePickerOpen] = useState(false);
    const [ifToTimePickerOpen, setIfToTimePickerOpen] = useState(false);
    const [selectedFromTime, setSelectedFromTime] = useState(session.timeFrom || getRoundedTime(0));
    const [selectedToTime, setSelectedToTime] = useState(session.timeTo || getRoundedTime(1));
    const [isCalandarCardOpen, setIsCalendarCardOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDateToDDMMYYYY(session.date) || today.toISOString().split("T")[0]);
    const editMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editMenuRef.current) return;
        function handleClickOutside(event: MouseEvent) {
            if (editMenuRef.current && !editMenuRef.current.contains(event.target as Node)) {
                setIsEditOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsEditOpen]);


    useEffect(() => {
        const fetchTimeZones = async () => {
            const response = await fetch('/timeZone.json');
            const timeZones = await response.json();

            const timeZonesWithCurrentTime = timeZones.map((tz: any) => {
                // Parse offset, e.g. "-11:00" or "+05:30"
                const match = /^([+-])(\d{2}):(\d{2})$/.exec(tz.offset);
                let offsetMinutes = 0;
                if (match) {
                    const sign = match[1] === '+' ? 1 : -1;
                    const hours = parseInt(match[2], 10);
                    const minutes = parseInt(match[3], 10);
                    offsetMinutes = sign * (hours * 60 + minutes);
                }
                // Get current UTC time and apply offset
                const now = new Date();
                const utc = now.getTime() + now.getTimezoneOffset() * 60000;
                const tzDate = new Date(utc + offsetMinutes * 60000);
                // Format as hh:mm AM/PM
                const currentTime = tzDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

                return { ...tz, currentTime };
            });
            setTimeZones(timeZonesWithCurrentTime);
            const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const foundTz = timeZonesWithCurrentTime.find((tz: any) =>
                tz.label === tz.label.includes(session.timeZoneName) || tz.value === localTz
            );
            if (foundTz) {
                setSelectedTimeZone(foundTz);
            }
        };
        fetchTimeZones();
    }, []);




    return (
        <div ref={editMenuRef} className="bg-[#151515] h-full p-[24px] flex flex-col justify-between gap-[30px] rounded-[16px] overflow-y-auto">
            <div>
                <div className="flex items-center justify-between mb-[40px] px-[16px] pt-[16px]">
                    <div className="text-[20px] font-bold">Edit session</div>
                    <div className="w-[28px] h-[28px] rounded-full bg-[#2b2b2b] hover:bg-[#383838] flex items-center justify-center p-[4px] cursor-pointer"
                        onClick={() => { setIsEditOpen(false) }}><X className="size-[16px] text-[#dbdbdb]" /></div>
                </div>
                <input ref={titleRef}
                    onChange={(value) => { if (value.target.value.length > 0) setFilledTitle(true); else setFilledTitle(false) }}
                    className="w-full max-w-[536px] h-[52px] px-[12px] py-[8px] outline-none text-[28px] font-extrabold placeholder-[#4e4e4e] border-b-[1px] border-[#383838] bg-transparent" placeholder="Session name*" defaultValue={session.title} />
                <div className="pt-[40px] w-full max-w-[536px]">
                    <div className="flex flex-col gap-[8px]">
                        {/* Date and time picker */}
                        <div className="flex gap-[8px]">
                            <div className="w-[28px] h-[48px] flex items-center justify-center flex-shrink-0">
                                <Clock className="size-[20px]" />
                            </div>
                            <div className="flex justify-between items-center flex-1 gap-[8px]">
                                <div className="w-full relative">
                                    <div className={`${isCalandarCardOpen ? "pointer-events-none" : ""} flex-1 h-[48px] cursor-pointer relative flex items-center py-[14px] px-[12px] bg-[#222222] rounded-[8px] flex-shrink-0`}
                                        onClick={() => setIsCalendarCardOpen(!isCalandarCardOpen)}>
                                        <Calendar className="size-[20px]" />
                                        <div className="ml-[8px] text-[14px]">{selectedDate}</div>
                                    </div>
                                    {isCalandarCardOpen && <CalendarCard setIsCalendarCardOpen={setIsCalendarCardOpen} setSelectedDate={setSelectedDate} />}
                                </div>
                                <div className="flex items-center gap-[8px]">
                                    <div className="relative">
                                        <div className={`${ifFromTimePickerOpen ? "pointer-events-none" : ""} cursor-pointer h-[48px] w-[99px] bg-[#222222] rounded-[8px] flex items-center justify-center text-[14px]`}
                                            onClick={() => setIfFromTimePickerOpen(!ifFromTimePickerOpen)}>
                                            {selectedFromTime}
                                        </div>
                                        <TimePickerCard isOpen={ifFromTimePickerOpen} setIsOpen={setIfFromTimePickerOpen} selectedTime={selectedFromTime} setSelectedTime={setSelectedFromTime} />
                                    </div>
                                    <div className="flex items-center">-</div>
                                    <div className="relative">
                                        <div className={`${ifToTimePickerOpen ? "pointer-events-none" : ""} cursor-pointer h-[48px] w-[99px] bg-[#222222] rounded-[8px] flex items-center justify-center text-[14px]`}
                                            onClick={() => setIfToTimePickerOpen(!ifToTimePickerOpen)}>
                                            {selectedToTime}
                                        </div>
                                        <TimePickerCard isOpen={ifToTimePickerOpen} setIsOpen={setIfToTimePickerOpen} selectedTime={selectedToTime} setSelectedTime={setSelectedToTime} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Timezone selector */}
                        <div className="flex gap-[8px] relative">
                            <div className="w-[28px] flex-shrink-0"></div>
                            <div className={`${isTimezoneCardOpen ? "pointer-events-none" : ""} flex-1 bg-[#222222] rounded-[8px] h-[48px] py-[14px] px-[12px] flex items-center justify-between cursor-pointer`}
                                onClick={() => setIsTimezoneCardOpen(!isTimezoneCardOpen)}>
                                <div ref={displayTimeZoneRef} className="text-[14px] truncate pr-[8px]">{session.timeZoneName}</div>
                                <div className="flex-shrink-0"><ChevronDown className="size-[20px]" /></div>
                            </div>
                            {
                                isTimezoneCardOpen && <TimezoneCard isTimezoneCardOpen={isTimezoneCardOpen} setIsTimezoneCardOpen={setIsTimezoneCardOpen} selectedTimeZone={selectedTimeZone} setSelectedTimeZone={setSelectedTimeZone} timeZones={timeZones} />
                            }
                        </div>
                    </div>
                    {/* Invite section */}
                    <div className="flex gap-[8px] mt-[18px] group focus-within:text-white">
                        <div className="w-[28px] h-[44px] flex items-center justify-center flex-shrink-0">
                            <UserPlus className="size-[20px] text-[#717171] group-focus-within:text-white" />
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
                    <div className="flex gap-[8px] mt-[15px] group focus-within:text-white">
                        <div className="w-[28px] pt-[10px] flex justify-center flex-shrink-0">
                            <Text className="size-[20px] text-[#717171] group-focus-within:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[#BBBBBB] text-[12px] font-semibold">Description</div>
                            <textarea
                                className="mt-[10px] w-full h-[80px] bg-[#222222] rounded-[8px] px-[12px] py-[8px] text-[14px] placeholder-[#717171] focus:outline focus:outline-[#917fcd] resize-none"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col gap-[15px] mt-[100px]">
                        <div className="text-[14px] text-[#888888] font-semibold">Advanced</div>
                        <div className="h-[52px] flex gap-[12px]">
                            <div className="h-full flex items-center"><Users className={`size-[20px] ${audienceEnabled ? "text-white" : "text-[#808080]"}`} /></div>
                            <div className="bg-[#222222] h-full w-full rounded-[8px] py-[14px] px-[16px] flex justify-between">
                                <div className={`text-[14px] ${audienceEnabled ? "text-white" : "text-[#808080]"}`}>Audience registration</div>
                                <div onClick={() => setAudienceEnabled(!audienceEnabled)} className="flex items-center">
                                    <ToggleSwitch enabled={audienceEnabled} onChange={() => setAudienceEnabled(!audienceEnabled)} />
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex gap-[12px]">
                            <div className="pt-[15px]"><Podcast className={`size-[20px] ${liveStreamEnabled ? "text-white" : "text-[#808080]"}`} /></div>
                            <div className="bg-[#222222] h-full w-full rounded-[8px] py-[14px] px-[16px]">
                                <div className="flex w-full justify-between items-center">
                                    <div className={`text-[14px] ${liveStreamEnabled ? "text-white" : "text-[#808080]"}`}>Live stream destinations</div>
                                    <div onClick={() => setLiveStreamEnabled(!liveStreamEnabled)} className="flex items-center">
                                        <ToggleSwitch enabled={liveStreamEnabled} onChange={() => setLiveStreamEnabled(!liveStreamEnabled)} />
                                    </div>
                                </div>
                                {liveStreamEnabled && <div className="h-[152px] w-full pt-[22px]">
                                    <div className="flex flex-col gap-[16px]">
                                        <div className="text-[14px] text-[#888888]">Schedule and stream this event directly on your social platforms.</div>
                                        <div className="flex gap-[8px]">
                                            <div className="cursor-pointer w-[38px] h-[38px] p-[8px] bg-[#2477ff] rounded-full flex items-center justify-center">
                                                <img src={facebookSvg} className="h-[16px]" />
                                            </div>
                                            <div className="cursor-pointer w-[38px] h-[38px] p-[8px] bg-[#FF3333] rounded-full flex items-center justify-center">
                                                <img src={youtubeSvg} className="h-[16px]" />
                                            </div>
                                            <div className="cursor-pointer w-[38px] h-[38px] p-[8px] bg-[#0090D6] rounded-full flex items-center justify-center">
                                                <img src={linkdenSvg} className="h-[16px]" />
                                            </div>
                                            <div className="cursor-pointer w-[38px] h-[38px] p-[8px] bg-[#A161FF] rounded-full flex items-center justify-center">
                                                <img src={twitchSvg} className="h-[16px]" />
                                            </div>
                                            <div className="cursor-pointer w-[38px] h-[38px] p-[8px] bg-[#131313] rounded-full flex items-center justify-center">
                                                <img src={xSvg} className="h-[16px]" />
                                            </div>
                                        </div>
                                        <div className="text-[12px] text-[#888888]">More streaming destinations coming soon.</div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[44px] mt-[8px] w-full max-w-[536px]  flex items-center justify-end gap-[16px]">
                <div className="w-[93px] h-[44px] cursor-pointer bg-[#222222] py-[12px] px-[18px] flex items-center justify-center rounded-[10px] text-[14px]"
                    onClick={() => { setIsEditOpen(false) }}>Cancel</div>
                <div className={`${filledTitle ? "test-white bg-[#7848FF] cursor-pointer" : "bg-[#2b2b2b] text-[#6b6b6b] cursor-default"} w-[133px] h-[44px]  py-[10px] px-[16px] flex items-center justify-center rounded-[10px] text-[14px]`}
                    onClick={() => { setIsEditOpen(false) }}>Create session</div>
            </div>
        </div>
    )
}