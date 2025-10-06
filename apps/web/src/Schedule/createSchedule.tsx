import { Calendar, ChevronDown, Clock, Podcast, Text, UserPlus, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import facebookSvg from "../assets/facebook.svg";
import youtubeSvg from "../assets/youtube.svg";
import linkdenSvg from "../assets/linkden.svg";
import twitchSvg from "../assets/twitch.svg";
import xSvg from "../assets/x.svg";
import TimezoneCard from "../components/cards/timezoneCard";
import TimePickerCard from "../components/cards/timePickerCard";
import CalendarCard from "../components/cards/calendar";
import { useNavigate, useParams } from "react-router-dom";
import InvitationType from "../components/dropdownMenu/invitationType";
import { z } from "zod";
import InvitationType2 from "../components/dropdownMenu/invitationType2";

const emailSchema = z.string().email();

// Mock toggle switch component
const ToggleSwitch = ({ enabled, onChange }: { enabled: any, onChange: any }) => (
    <div onClick={onChange}
        className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${enabled ? 'bg-purple-500' : 'bg-gray-600'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${enabled ? 'translate-x-6 ml-1' : 'translate-x-0 ml-0.5'}`} />
    </div>
);
function parseEnGBDateTime(dateStr: string, timeStr: string) {
    // dateStr: "DD/MM/YYYY", timeStr: "hh:mm AM/PM"
    const [day, month, year] = dateStr.split("/").map(Number);
    const m = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) throw new Error("Invalid time format");
    let hours = Number(m[1]);
    const minutes = Number(m[2]);
    const period = m[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

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

interface invitedEmail {
    email: string,
    invitationType: 'guest' | 'audience'
}

export default function CreateSchedule() {
    interface TimeZone {
        label: string;
        offset: string;
        value: string;
        currentTime: string;
    }
    const today = new Date();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // const formattedDate = today.toLocaleDateString("en-GB");
    const [audienceEnabled, setAudienceEnabled] = useState(false);
    const [liveStreamEnabled, setLiveStreamEnabled] = useState(false);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [filledTitle, setFilledTitle] = useState(false);
    const [isTimezoneCardOpen, setIsTimezoneCardOpen] = useState(false);
    const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZone>({ label: "", offset: "", value: "", currentTime: "" });
    const displayTimeZoneRef = useRef<HTMLDivElement>(null);
    const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
    const [ifFromTimePickerOpen, setIfFromTimePickerOpen] = useState(false);
    const [ifToTimePickerOpen, setIfToTimePickerOpen] = useState(false);
    const [selectedFromTime, setSelectedFromTime] = useState(getRoundedTime(0));
    const [selectedToTime, setSelectedToTime] = useState(getRoundedTime(1));
    const [isCalandarCardOpen, setIsCalendarCardOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today.toLocaleDateString("en-GB"));
    const { sessionId, projectId } = useParams<{ sessionId: string, projectId: string }>();
    const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
    const [invitationType, setInvitationType] = useState<"guest" | "audience">("guest");
    const [isAddEmailEnabled, setIsAddEmailEnabled] = useState<Boolean>(false)
    const invitedEmailRef = useRef<HTMLInputElement | null>(null)
    const [invitedEmailList, setInvitedEmailList] = useState<invitedEmail[]>([])

    useEffect(() => {
        if (displayTimeZoneRef.current) {
            displayTimeZoneRef.current.innerHTML = `(GMT${selectedTimeZone.offset}) ${selectedTimeZone.label}`;
        }
    }, [selectedTimeZone, displayTimeZoneRef]);

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
                tz.value === localTz || tz.label.includes(localTz)
            );
            if (foundTz) {
                setSelectedTimeZone(foundTz);
            }
        };
        fetchTimeZones();
    }, []);

    const handleCreateSession = async () => {
        if (projectId != "new") {
            const res = await fetch(`${backendUrl}/sessions/create/existingproject`, {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("authToken"),
                    sessionId: sessionId,
                    projectId: projectId,
                    sessionName: titleRef.current?.value,
                    scheduled: parseEnGBDateTime(selectedDate, selectedFromTime),
                    invites: invitedEmailList // [{ email: string, invitationType: 'guest' | 'audience' }
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json());
            console.log(res)
            navigate(`/dashboard/project/view/${projectId}`, { state: { tab: "Recordings" } });

        }
        else {
            const res = await fetch(`${backendUrl}/sessions/create/new`, {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("authToken"),
                    sessionId: sessionId,
                    sessionName: titleRef.current?.value,
                    scheduled: parseEnGBDateTime(selectedDate, selectedFromTime),
                    invites: invitedEmailList // [{ email: string, invitationType: 'guest' | 'audience' }
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json());
            console.log(res)
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        const result = emailSchema.safeParse(email);
        if (result.success) {
            setIsAddEmailEnabled(true)
        }
    };

    const addEmailHandler = () => {
        setInvitedEmailList([...invitedEmailList, { email: invitedEmailRef?.current?.value || "", invitationType: invitationType }])
        setIsAddEmailEnabled(false)
        if (invitedEmailRef.current) {
            invitedEmailRef.current.value = "";
        }
        setInvitationType('guest')
    }

    return (
        <div className="h-full flex flex-col text-white relative">
            <div className="flex-1 overflow-y-auto">
                <div className="p-[60px] pb-[100px]">
                    <div className="flex flex-col items-center justify-center min-h-full">
                        <input ref={titleRef}
                            onChange={(value) => { if (value.target.value.length > 0) setFilledTitle(true); else setFilledTitle(false) }}
                            className="w-full max-w-[536px] h-[52px] px-[12px] py-[8px] outline-none text-[28px] font-extrabold placeholder-[#4e4e4e] border-b-[1px] border-[#383838] bg-transparent" placeholder="Session name*" />
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
                                        <div ref={displayTimeZoneRef} className="text-[14px] truncate pr-[8px]">Select Time Zone</div>
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
                                <div className="w-full">
                                    <div className="flex-1 h-[44px] bg-[#222222] rounded-t-[8px] flex items-center justify-between">
                                        <input ref={invitedEmailRef} className="flex-1 bg-transparent outline-none placeholder-[#717171] text-[14px] pl-[12px] min-w-0" placeholder="Invite people via email" onChange={handleEmailChange} />
                                        <div className={`${isAddEmailEnabled ? "" : "pointer-events-none text-[#888888]"} hover:bg-[#383838] flex justify-center items-center gap-[15px] py-[5px] px-[10px] m-[5px] rounded-[8px] cursor-pointer flex-shrink-0`}
                                            onClick={addEmailHandler}>
                                            <div className="text-[14px]">Add</div>
                                        </div>
                                        <div className="relative">
                                            <div className={`${isCardOpen ? "pointer-events-none" : ""} flex items-center gap-[15px] pr-[12px] cursor-pointer flex-shrink-0`}
                                                onClick={() => { setIsCardOpen(!isCardOpen) }}>
                                                <div className="text-[14px]">{invitationType === "guest" ? "Guest" : "Audience"}</div>
                                                <ChevronDown className="size-[20px]" />
                                            </div>
                                            <div className={`absolute right-0 top-full z-1 mt-2 ${isCardOpen ? "opacity-100 translate-y-0 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-10 translate-x-5 scale-70 pointer-events-none"} transition-all duration-200 ease-in-out`}>
                                                <InvitationType setIsCardOpen={setIsCardOpen} setInvitationType={setInvitationType} isCardOpen={isCardOpen} invitationType={invitationType} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        invitedEmailList.length > 0 && <div className="p-[16px] pl-[24px] bg-[#1d1d1d] rounded-b-[8px]">
                                            <div className="flex flex-col gap-[16px]">
                                                <div className="text-[#888888] text-[14px] font-medium">An email with instructions on how to join will be sent to all invitees.</div>
                                                <div className="flex flex-col gap-[8px]">
                                                    {
                                                        invitedEmailList.map((invited) => (
                                                            <div className="flex flex-row justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-amber-400">
                                                                        <div className="text-[11px] font-bold text-[#222222]">{invited.email[0].toUpperCase()}</div>
                                                                    </div>
                                                                    <div className="ml-[8px] text-[14px] text-[#fafafa]">{invited.email}</div>
                                                                </div>
                                                                <InvitationType2 invitedEmail={invited.email} invitedEmailList={invitedEmailList} setInvitedEmailList={setInvitedEmailList}/>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
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
                </div>
            </div>

            <div className="w-full max-w-[100%] flex items-center justify-center absolute bottom-0 h-[100px] py-[24px] px-[48px] bg-[linear-gradient(rgba(14,14,14,0)_0%,rgb(14,14,14)_49.5%)]">
                <div className="h-[44px] mt-[8px] w-full max-w-[536px]  flex items-center justify-end gap-[16px]">
                    <div className="w-[93px] h-[44px] cursor-pointer bg-[#222222] py-[12px] px-[18px] flex items-center justify-center rounded-[10px] text-[14px]">Cancel</div>
                    <div className={`${filledTitle ? "test-white bg-[#7848FF] cursor-pointer" : "bg-[#2b2b2b] text-[#6b6b6b] cursor-default"} w-[133px] h-[44px]  py-[10px] px-[16px] flex items-center justify-center rounded-[10px] text-[14px]`}
                        onClick={handleCreateSession}
                    >Create session</div>
                </div>
            </div>
        </div>
    );
}